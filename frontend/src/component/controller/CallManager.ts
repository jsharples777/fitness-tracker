import debug from 'debug';
import browserUtil from "../../util/BrowserUtil";
import Controller from "../../Controller";
import {ScoreSheetDetailView} from "../view/ScoreSheetDetailView";

const callLogger = debug('call-manager');

export class CallManager {
    private static _instance: CallManager;
    

    public static getInstance(): CallManager {
        if (!(CallManager._instance)) {
            CallManager._instance = new CallManager();
        }
        return CallManager._instance;
    }

    private peer: any | null = null;
    private webrtcDiv: HTMLElement | null = null;
    private myVideoStream: MediaStream | null = null;
    private myVideo: HTMLVideoElement | null = null;
    private currentUserList:string[];
    
    private constructor() {
        this.callUser = this.callUser.bind(this);
        this.currentUserList = [];
    }

    private startPeerConnection() {
        if (Controller.getInstance().isLoggedIn()) {
            // @ts-ignore  - is for the WebRTC peer via Nodejs
            this.peer = new Peer(Controller.getInstance().getLoggedInUsername(), {path: '/peerjs', host: '/', debug: 2, secure:true});
            //this.peer = new Peer(Controller.getInstance().getLoggedInUsername(), {path: '/peerjs', host: '/', port: '3000', debug:1, secure:false});
            this.peer.on('open', (id:any) => {
                callLogger('My peer ID is: ' + id);
            });
        }
    }
    
    public initialise() {
        this.startPeerConnection();
        // @ts-ignore
        this.webrtcDiv = document.getElementById(ScoreSheetDetailView.ScoreSheetDom.webrtc);
        //this.reset();
    }

    public startScoreSheet() {
        try {
            if (Controller.getInstance().isLoggedIn()) {
                if (navigator.mediaDevices.getUserMedia) {
                    callLogger('Starting scoresheet stream');
                    navigator.mediaDevices.getUserMedia({
                        audio: true,
                        video: true,
                    }).then((stream) => {
                        callLogger('Scoresheet stream started - adding video element');
                        this.myVideoStream = stream;
                        this.addVideoStream(Controller.getInstance().getLoggedInUsername(), this.myVideoStream, true);
                    });

                }
            }
        }
        catch (err) {
            callLogger(err);
            callLogger(`Non-secure context or no camera capability`);
        }
    }
    
    public reset() {
        callLogger('Reset');
        if (this.currentUserList && this.currentUserList.length > 0) {
            callLogger('Removing previous users');
            this.currentUserList.forEach((user) => {
                callLogger('Removing previous user ${user}');
                this.removeUser(user);
            })
        }
        if (this.webrtcDiv) browserUtil.removeAllChildren(this.webrtcDiv);
        this.currentUserList = [];
        if (this.peer) {
            callLogger('Stopping video stream');
            //this.peer.disconnect();
            if (this.myVideoStream) {
                this.myVideoStream.getTracks().forEach((track) => track.stop());
            }
            if (this.myVideo) this.myVideo.srcObject = null;
            this.myVideoStream = null;
        }
    }

    private addVideoStream(username: string, stream: MediaStream, isCurrentUser = false) {
        // check to see if they are already there
        let index = this.currentUserList.findIndex((user) => user === username);
        if (index >= 0) return;

        this.currentUserList.push(username);

        const videoCardHolder = document.createElement('div');
        videoCardHolder.setAttribute("id", username);
        browserUtil.addRemoveClasses(videoCardHolder, 'col-sm-12 col-md-4 col-lg-3');
        const videoCard = document.createElement('div');
        browserUtil.addRemoveClasses(videoCard,'card');
        const videoCardTitle = document.createElement('div');
        browserUtil.addRemoveClasses(videoCardTitle, 'card-header');
        videoCardTitle.innerHTML = `<h5 class="card-title">${username}</h5>`;
        const videoCardBody = document.createElement('div');
        browserUtil.addRemoveClasses(videoCardBody, 'card-body p-0 text-center');
        const video = document.createElement('video');
        browserUtil.addRemoveClasses(video, 'video ');

        videoCard.appendChild(videoCardTitle);
        videoCard.appendChild(videoCardBody);
        videoCardBody.appendChild(video);

        if (isCurrentUser) {
            const videoCardFooter = document.createElement('div');
            browserUtil.addRemoveClasses(videoCardFooter, 'card-footer');
            const footerContent = document.createElement('div');
            browserUtil.addRemoveClasses(footerContent,'d-flex w-100 justify-content-between mt-2');
            const stopVideoButton = document.createElement('button');
            stopVideoButton.setAttribute('type','button');
            browserUtil.addRemoveClasses(stopVideoButton,'btn btn-circle btn-warning');
            stopVideoButton.innerHTML = '<i class="fas fa-video-slash"></i>';
            const muteMicButton = document.createElement('button');
            muteMicButton.setAttribute('type','button');
            browserUtil.addRemoveClasses(muteMicButton,'btn btn-circle btn-warning');
            muteMicButton.innerHTML = '<i class="fa fa-microphone"></i>';

            footerContent.appendChild(stopVideoButton);
            footerContent.appendChild(muteMicButton);

            videoCardFooter.appendChild(footerContent);

            videoCard.appendChild(videoCardFooter);

            stopVideoButton.addEventListener('click',() => {
                const isPaused = video.paused;
                if (isPaused) {
                    try {
                        video.play();
                    }
                    catch (error) { }// account for user with no video
                    browserUtil.addRemoveClasses(stopVideoButton,'btn-success',false);
                    browserUtil.addRemoveClasses(stopVideoButton,'btn-warning',true);

                }
                else {
                    try {
                        video.pause();
                    } catch (error) {}// account for user with no video
                    browserUtil.addRemoveClasses(stopVideoButton,'btn-success',true);
                    browserUtil.addRemoveClasses(stopVideoButton,'btn-warning',false);
                }

            });
            muteMicButton.addEventListener('click',() => {
                const isMuted = video.muted;
                if (isMuted) {
                    video.muted = false;
                    browserUtil.addRemoveClasses(muteMicButton,'btn-success',false);
                    browserUtil.addRemoveClasses(muteMicButton,'btn-warning',true);

                }
                else {
                    video.muted = true;
                    browserUtil.addRemoveClasses(muteMicButton,'btn-success',true);
                    browserUtil.addRemoveClasses(muteMicButton,'btn-warning',false);
                }

            });

            this.myVideo = video;
        }

        videoCardHolder.appendChild(videoCard);
        video.srcObject = stream;
        video.addEventListener("loadedmetadata", () => {
            try {
                video.play();
            }
            catch (error) {} // account for user with no video
            if (this.webrtcDiv) this.webrtcDiv.append(videoCardHolder);
        });
    };

    public callUser(userId: string) {
        callLogger(`Asked to call user ${userId}`);
        if (userId === Controller.getInstance().getLoggedInUsername()) return; // don't call ourself
        let numberOfAttempts:number = 0;

        let index = this.currentUserList.findIndex((user) => user === userId); // don't call the same users
        if (index >= 0) return;
        // wait a small time for the sockets and peer to sync
        const interval = setInterval(() => {
            callLogger(`Calling user ${userId}`);
            if (this.myVideoStream) {
                const call = this.peer.call(userId, this.myVideoStream);
                if (call) {
                    call.on('stream', (userVideoStream: any) => {
                        callLogger(`User ${userId} answered, showing stream`);
                        this.addVideoStream(userId, userVideoStream, false);
                    });
                    clearInterval(interval);
                }
                else {
                    // try again shortly
                    numberOfAttempts ++;
                    if (numberOfAttempts > 3) clearInterval(interval);
                }
            }
        },5000);
    };

    public removeUser(userId:string) {
        callLogger(`Asked to remove user ${userId}`);
        let index = this.currentUserList.findIndex((user) => user === userId);
        if (index >= 0) {
            this.currentUserList.splice(index,1);
        }
        const userVideoCard = document.getElementById(userId);
        if (userVideoCard) {
            callLogger(`Asked to remove user ${userId} - removing video element`);
            const videoEl:HTMLVideoElement|null = userVideoCard.querySelector(".video");
            if (videoEl) {
                videoEl.srcObject = null;
            }

            browserUtil.removeAllChildren(userVideoCard);
            const parentNode = userVideoCard.parentNode;
            if (parentNode) parentNode.removeChild(userVideoCard);
        }
    }

    prepareToAnswerCallFrom(userId: string) {
        try {
            if (Controller.getInstance().isLoggedIn()) {
                callLogger(`Preparing to answer call from ${userId}`);
                if (navigator.mediaDevices.getUserMedia) {
                    navigator.mediaDevices.getUserMedia({
                        audio: true,
                        video: false,
                    }).then((stream) => {
                        this.myVideoStream = stream;
                        this.addVideoStream(Controller.getInstance().getLoggedInUsername(), this.myVideoStream, true);
                        callLogger(`Awaiting call from ${userId}`);
                        this.peer.on('call', (call: any) => {
                            callLogger(`Answering call from ${userId}`);
                            call.answer(this.myVideoStream);
                            call.on('stream', (userVideoStream: any) => {
                                alert("Answered");
                                callLogger(`Have answered, showing stream`);
                                this.addVideoStream(userId, userVideoStream, false);
                            });
                        });
                    });
                }
            }
        }
        catch (err) {
            callLogger(err);
            callLogger(`Insecure context or no video capability`);
        }

    }
}