import debug from 'debug';

import {Invitation, InviteType, JoinLeft, Message, Priority} from "../../socket/Types";
import {ChatReceiver} from "../../socket/ChatReceiver";
import NotificationManager from "../../notification/NotificationManager";
import {ScoreSheetDetailView} from "../view/ScoreSheetDetailView";
import {ScoreSheet, STATE_NAMES} from "../../AppTypes";
import {v4} from 'uuid';
import {ChatManager} from "../../socket/ChatManager";
import {StateManager} from "../../state/StateManager";
import moment from "moment";
import Controller from "../../Controller";
import {TemplateManager} from "../../template/TemplateManager";
import {CallManager} from "./CallManager";
import MemoryBufferStateManager from "../../state/MemoryBufferStateManager";
import SocketManager from "../../socket/SocketManager";

const sscLogger = debug('score-sheet-controller');

export class ScoreSheetController implements ChatReceiver {
    private static _instance: ScoreSheetController;

    public static getInstance(): ScoreSheetController {
        if (!(ScoreSheetController._instance)) {
            ScoreSheetController._instance = new ScoreSheetController();
        }
        return ScoreSheetController._instance;
    }
    public static SOURCE_View: string = 'ssv';

    private applicationView: any | null = null;
    private currentScoreRoom: string | null = null;
    private currentlySelectedBoardGame: any | null = null;
    private currentScoreSheet: ScoreSheet | null = null;
    private currentUsername: string = '';
    private isRoomCreator: boolean = false;
    private stateManager: StateManager;
    private currentUsersInScoreSheet: string[] = [];
    private intervalTimer: number = -1;



    private constructor() {
        this.stateManager = new MemoryBufferStateManager();
        SocketManager.getInstance().addChatReceiver(this);

        // bind events
        this.receiveLogin = this.receiveLogin.bind(this);
        this.receiveLogout = this.receiveLogout.bind(this);
        this.receiveInvitation = this.receiveInvitation.bind(this);
        this.receiveMessage = this.receiveMessage.bind(this);
        this.receiveQueuedMessages = this.receiveQueuedMessages.bind(this);
        this.receiveQueuedInvites = this.receiveQueuedInvites.bind(this);
        this.receiveJoinedRoom = this.receiveJoinedRoom.bind(this);
        this.receivedLeftRoom = this.receivedLeftRoom.bind(this);
        this.userChangedValue = this.userChangedValue.bind(this);
        this.endScoreSheet = this.endScoreSheet.bind(this);
        this.pauseTimer = this.pauseTimer.bind(this);
        this.isSheetOwner = this.isSheetOwner.bind(this);
        this.inviteUser = this.inviteUser.bind(this);
        this.getCurrentRoom = this.getCurrentRoom.bind(this);
        this.getSelectedBoardGame = this.getSelectedBoardGame.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.stopTimerStoppedByAnotherUser = this.stopTimerStoppedByAnotherUser.bind(this);
        this.isTimerGoing = this.isTimerGoing.bind(this);
        this.reset = this.reset.bind(this);


        // reset state
        this.reset();

    }

    public isTimerGoing(): boolean {
        let result = false;
        if (this.currentScoreSheet) {
            result = this.currentScoreSheet.timerGoing;
        }
        return result;
    }

    public getStateManager() {
        return this.stateManager;
    }

    public getCurrentRoom(): string | null {
        return this.currentScoreRoom;
    }

    receiveLogin(username: string): void {
    }

    receiveLogout(username: string): void {
    }

    public setCurrentUser(username: string): void {
        sscLogger(`Setting current user ${username}`);
        this.currentUsername = username;
    }

    public getCurrentUser(): string {
        return this.currentUsername;
    }

    public initialise(applicationView: any) {
        this.applicationView = applicationView;
        CallManager.getInstance().initialise();
    }

    receiveInvitation(invite: Invitation): void {
        if (!this.isLoggedIn()) return;  // we are not logged in
        if (invite.type !== InviteType.ScoreSheet) return; //ignore non-score sheets

        if (ChatManager.getInstance().isUserInBlockedList(invite.from)) {
            sscLogger(`Received invite from blocked user - ignoring`);
            return;
        }

        // are we already in a scoresheet?
        if (this.currentScoreSheet) {
            sscLogger(`Received invite - already in score sheet - declining`);
            // are we already in this score sheet?
            if (this.currentScoreSheet.room !== invite.room) {
                // decline the invite, only one score sheet at a time
                sscLogger(`Received invite - already in score sheet - declining`);
                SocketManager.getInstance().sendDeclineInvite(invite.room, this.getCurrentUser(), InviteType.ScoreSheet);// user declines to join the scoresheet
                return;
            }
        }

        if (invite.requiresAcceptDecline) {
            // notify the user of the invitation
            if (!confirm(`You have been invited by user ${invite.from} to joint a chat room for the board game ${invite.subject} score sheet`)) {
                SocketManager.getInstance().sendDeclineInvite(invite.room, this.getCurrentUser(), InviteType.ScoreSheet);// user declines to join the scoresheet
                return;
            }

        }

        // prepare to receive a call
        CallManager.getInstance().prepareToAnswerCallFrom(invite.from);


        // notify the user of the new chat
        NotificationManager.getInstance().show('Score Sheet', `Joining score sheet`, 'info', 7000);
        SocketManager.getInstance().joinChat(this.getCurrentUser(), invite.room, InviteType.ScoreSheet);
        this.currentScoreRoom = invite.room;
        this.currentlySelectedBoardGame = invite.attachment.boardGame;
        this.currentScoreSheet = invite.attachment.scoreSheet;

        Controller.getInstance().addBoardGameToDisplay(invite.attachment.boardGame);

        // check to see if the timer should be going
        if (this.isTimerGoing()) {
            this.stopTimerStoppedByAnotherUser();
            this.startTimer();
        }
        // ask the view to initialise with these values
        ScoreSheetDetailView.getInstance().stateChanged("", "", this.currentScoreSheet);



        // change to the score sheet
        this.applicationView.handleShowScoreSheet(null);
    }

    public getSelectedBoardGame(): any | null {
        return this.currentlySelectedBoardGame;
    }

    receiveQueuedMessages(messages: any): void {
        if (!this.isLoggedIn()) return;  // we are not logged in

        if (!this.currentScoreRoom) return; // we are not in a room

        messages.forEach((message: Message) => {
            if (message.type === InviteType.ScoreSheet) {  // only process offline messages for scoresheet and our current room
                if (this.currentScoreRoom === message.room) {
                    this.receiveMessage(message);
                }
            }
        });
    }

    receiveQueuedInvites(invites: any): void {
        if (!this.isLoggedIn()) return;  // we are not logged in

        invites.forEach((invite: Invitation) => {
            if (invite.type === InviteType.ScoreSheet) {  // only process offline invites to scoresheet
                this.receiveInvitation(invite);
            }
        });
    }

    receiveDecline(room: string, username: string, type: number): void {
        if (type !== InviteType.ScoreSheet) return; //ignore non-score sheets
        sscLogger(`Receive decline for room ${room} from ${username}`);
        if (this.currentScoreRoom) {
            if (this.currentScoreRoom === room) {
                NotificationManager.getInstance().show('Score Sheet', `User ${username} declined the invitation.`, 'warning');
            }
        }
    }

    receiveJoinedRoom(users: JoinLeft): void {
        if (users.type !== InviteType.ScoreSheet) return; //ignore non-score sheets
        if (!this.isLoggedIn()) return;  // we are not logged in
        if (users.username === this.getCurrentUser()) return;

        if (this.currentScoreRoom !== users.room) return;

        sscLogger(`Handling user joined ${users.username}`)
        // update the sheet to include the user
        let index = this.currentUsersInScoreSheet.findIndex((username) => username === users.username);
        if (index < 0) {
            this.currentUsersInScoreSheet.push(users.username);
            // update the sheet data

            // the owner of the sheet should send a sync message of the data
            if (this.currentScoreSheet) this.saveCurrentScoreSheet(this.currentScoreSheet);
        }
        if (this.isRoomCreator && this.currentScoreSheet) {
            sscLogger(`Handling user joined ${users.username} - sending`)
            this.addUserToScoreSheet(users.username);
            this.sendScoreSheetState(this.currentScoreSheet, false);
        }
        NotificationManager.getInstance().show(this.currentlySelectedBoardGame.name, `User ${users.username} joined the scoresheet.`, 'message', 120000);
    }

    receivedLeftRoom(users: JoinLeft): void {
        if (users.type !== InviteType.ScoreSheet) return; //ignore non-score sheets
        if (!this.isLoggedIn()) return;  // we are not logged in
        if (users.username === this.getCurrentUser()) return;

        if (this.currentScoreRoom !== users.room) return;
        // update the sheet to remove the user
        sscLogger(`Handling user left ${users.username}`)

        let index = this.currentUsersInScoreSheet.findIndex((username) => username === users.username);
        if (index >= 0) {
            this.currentUsersInScoreSheet.splice(index, 1);
            // update the sheet data
            this.removeUserFromScoreSheet(users.username);
            // the owner of the sheet should send a sync message of the data
            if (this.currentScoreSheet) this.saveCurrentScoreSheet(this.currentScoreSheet);
        }
        if (this.isRoomCreator && this.currentScoreSheet) {
            sscLogger(`Handling user left ${users.username} - sending`)
            this.sendScoreSheetState(this.currentScoreSheet, false);
        }
        NotificationManager.getInstance().show(this.currentlySelectedBoardGame.name, `User ${users.username} left the scoresheet.`, 'warning', 100000);
    }

    receiveUserList(users: string[]): void {
    } // will be managed in the transfer of sheet data

    public endScoreSheet(): void { // this can only be done by the room creator
        // send the final score to everyone
        sscLogger(`Handling end of score sheet`)
        if (this.isRoomCreator && this.currentScoreSheet) this.saveScoreSheetToBoardGame(this.currentScoreSheet);
        if (this.isLoggedIn()) {
            if (this.currentScoreRoom && this.currentScoreSheet) {
                sscLogger(`Handling end of score sheet - sending`)
                this.sendScoreSheetState(this.currentScoreSheet, true);
                // if we are logged in and the scoresheet creator then we need to save the score sheet to the selected board game
            }
            // close the room
            this.leave();
        }
        // reset the controller
        this.reset();
        this.applicationView.switchBetweenCollectionAndScoreSheet(true);
    }

    public startScoreSheet(boardGame: any): void {
        if (boardGame) {
            sscLogger(`Starting score sheet for ${boardGame.name}`);
            this.currentlySelectedBoardGame = boardGame;
            if (this.isLoggedIn()) this.currentUsersInScoreSheet = [this.getCurrentUser()];
            this.isRoomCreator = true;
            this.currentScoreRoom = v4();
            this.currentScoreSheet = {
                room: this.currentScoreRoom,
                boardGameName: boardGame.name,
                sheetLayoutOptions: TemplateManager.getInstance().getScoreSheetTemplate(boardGame),
                timer: 0,
                timerGoing: false,
                data: TemplateManager.getInstance().getScoreSheetStartingData(boardGame),
                isFinished: false
            }
            sscLogger(this.currentScoreSheet);

            CallManager.getInstance().startScoreSheet();

            // store the score sheet locally
            this.stateManager.setStateByName(STATE_NAMES.scoreSheet, this.currentScoreSheet, true);

            // start a new chat room, will automatically manage if logged in or not
            if (this.isLoggedIn()) SocketManager.getInstance().joinChat(this.getCurrentUser(), this.currentScoreRoom, InviteType.ScoreSheet);

        }
    }

    public hasActiveScoreSheet(): boolean {
        let result = false;
        if (this.currentScoreRoom && (this.currentScoreRoom !== null)) {
            sscLogger(this.currentScoreRoom);
            result = true;
        }
        return result;
    }

    public inviteUser(username: string) {
        if (!this.isLoggedIn()) return;  // we are not logged in
        // only the user who created the score sheet can do this as they are the only ones with a selected board game
        if ((this.currentScoreRoom) && (this.currentlySelectedBoardGame)) {
            sscLogger(`Inviting user ${username} to score sheet`);
            if (this.isRoomCreator) {
                NotificationManager.getInstance().show(this.currentlySelectedBoardGame.name, `You have invited user ${username} to the scoresheet`, 'message');
                SocketManager.getInstance().sendInvite(this.getCurrentUser(), username, this.currentScoreRoom, InviteType.ScoreSheet, true, this.currentlySelectedBoardGame.name, {
                    scoreSheet: this.currentScoreSheet,
                    boardGame: this.currentlySelectedBoardGame
                });
            } else {
                alert("Only the score sheet creator can invite other users.");
            }
        }
    }

    public receiveMessage(message: Message): void {
        sscLogger(`'Handling receive message`);
        sscLogger(message);
        if (!this.isLoggedIn()) return;  // we are not logged in
        if (message.type !== InviteType.ScoreSheet) return; //ignore non-score sheets
        if (message.from === this.getCurrentUser()) return; // my own messages can be ignored

        if (this.currentScoreRoom) { // are we in a room?
            if (this.currentScoreRoom === message.room) { // are we listening to this score sheet room?
                if (ChatManager.getInstance().isUserInBlockedList(message.from)) {
                    sscLogger(`Received message from blocked user - ignoring`);
                    return;
                }
                // are we scoring the right sheet?
                sscLogger(`Received message for score sheet ${message.room}`);
                sscLogger(message);
                if (message.attachment) {
                    // the attachment should be a ScoreSheet object
                    let scoreSheet: ScoreSheet = message.attachment;
                    sscLogger(scoreSheet);

                    // @ts-ignore
                    if (this.currentScoreSheet) {
                        let timerWasGoing = this.currentScoreSheet.timerGoing;
                        this.currentScoreSheet.room = message.room;
                        this.currentScoreSheet.boardGameName = scoreSheet.boardGameName;
                        this.currentScoreSheet.data = scoreSheet.data;
                        this.currentScoreSheet.timer = (scoreSheet.timer > this.currentScoreSheet.timer) ? scoreSheet.timer : this.currentScoreSheet.timer;
                        this.currentScoreSheet.timerGoing = scoreSheet.timerGoing;
                        this.currentScoreSheet.sheetLayoutOptions = scoreSheet.sheetLayoutOptions;
                        this.currentScoreSheet.isFinished = scoreSheet.isFinished;

                        // has the timer changed?
                        if (scoreSheet.timerGoing) {
                            if (timerWasGoing) {
                                // both timers going, no need to do anything
                            } else {
                                // timer is going with another user, but we aren't going - start timer
                                this.stopTimerStoppedByAnotherUser();
                                this.startTimer();
                            }
                        } else { // timer not going at the other users end
                            if (timerWasGoing) {
                                // our timer is active - pause it
                                this.stopTimerStoppedByAnotherUser();
                            } else {
                                // neither timer going
                            }
                        }


                    }
                    sscLogger('Updated score sheet');
                    sscLogger(this.currentScoreSheet);
                    // save the new state
                    if (this.currentScoreSheet) this.saveCurrentScoreSheet(this.currentScoreSheet, true);
                    if (scoreSheet.isFinished) {
                        alert('Score sheet has been finished - closing');
                        // reset the controller
                        this.reset();

                        // close the room
                        this.leave();

                        // reset the view
                        ScoreSheetDetailView.getInstance().resetDisplay();

                        this.applicationView.switchBetweenCollectionAndScoreSheet(true);
                    }
                }
            }

        }
    }

    public isSheetOwner(): boolean {
        return this.isRoomCreator;
    }

    public createScoreSheetFromTable(): ScoreSheet | null {
        let scoreSheet: ScoreSheet | null = null;
        let tableData = ScoreSheetDetailView.getInstance().getTableData();
        if (this.currentScoreSheet && this.currentScoreRoom) {
            scoreSheet = {
                room: this.currentScoreRoom,
                data: tableData,
                boardGameName: this.currentlySelectedBoardGame.name,
                timer: this.currentScoreSheet.timer,
                sheetLayoutOptions: (this.currentlySelectedBoardGame) ? TemplateManager.getInstance().getScoreSheetTemplate(this.currentlySelectedBoardGame) : null,
                timerGoing: this.currentScoreSheet.timerGoing,
                isFinished: false
            }
        }
        return scoreSheet;
    }

    public sendScoreSheetState(scoreSheet: ScoreSheet, isFinished: boolean = false): void {
        if (this.currentScoreRoom && this.isLoggedIn()) {
            const created = parseInt(moment().format('YYYYMMDDHHmmss'));
            // @ts-ignore
            SocketManager.getInstance().sendMessage(
                this.getCurrentUser(),
                this.currentScoreRoom,
                'data',
                created,
                InviteType.ScoreSheet,
                Priority.Normal,
                scoreSheet);
        }
    }

    public startTimer() {
        sscLogger(`Handling pause timer`);
        if (!this.currentScoreSheet) return;

        this.currentScoreSheet.timerGoing = true;
        // @ts-ignore
        this.intervalTimer = setInterval(() => {
            if (this.currentScoreSheet && this.currentScoreSheet.timerGoing) {
                this.currentScoreSheet.timer++;
                ScoreSheetDetailView.getInstance().updateTimer(this.currentScoreSheet.timer, !this.currentScoreSheet.timerGoing);
            } else {
                if (this.currentScoreSheet) {
                    this.currentScoreSheet.timerGoing = false;
                    ScoreSheetDetailView.getInstance().updateTimer(this.currentScoreSheet.timer, !this.currentScoreSheet.timerGoing);
                }
            }
        }, 1000);
        if (this.currentScoreSheet) {
            this.saveCurrentScoreSheet(this.currentScoreSheet);
        }
        if (this.isLoggedIn() && this.currentScoreSheet) {
            // start the timer for everyone
            sscLogger(`Handling pause timer - sending score sheet`);
            this.sendScoreSheetState(this.currentScoreSheet, false);
        }
    }

    public pauseTimer() {
        sscLogger(`Handling pause timer`);
        if (this.intervalTimer > 0) {
            clearInterval(this.intervalTimer);
            this.intervalTimer = -1;

            if (this.currentScoreSheet) {
                this.currentScoreSheet.timerGoing = false;
                this.saveCurrentScoreSheet(this.currentScoreSheet);
                ScoreSheetDetailView.getInstance().updateTimer(this.currentScoreSheet.timer, !this.currentScoreSheet.timerGoing)
            }


            // ask everyone to pause their timers
            if (this.isLoggedIn() && this.currentScoreSheet) {
                sscLogger(`Handling pause timer - updating all users`);
                this.sendScoreSheetState(this.currentScoreSheet, false);
            }
        }
    }

    public userChangedValue(value: any, source: string) {
        sscLogger(`Handling user changed value ${source}`)
        if (source === ScoreSheetController.SOURCE_View) return;

        // is the source an edit?
        if (source !== 'edit') return;

        let scoreSheet: ScoreSheet | null = this.createScoreSheetFromTable();
        sscLogger(`Handling user changed Value`);
        sscLogger(value);
        sscLogger(scoreSheet);
        if (scoreSheet) {
            sscLogger(`Letting the template manager change any values`);
            const changedByTM: boolean = TemplateManager.getInstance().transformDataAfterUserChange(this.currentlySelectedBoardGame, scoreSheet);
            if (changedByTM) {
                sscLogger(scoreSheet);
            }

            this.saveCurrentScoreSheet(scoreSheet, changedByTM);
            if (this.isLoggedIn()) {
                sscLogger(`Handling user change - updating all users`);
                this.sendScoreSheetState(scoreSheet, false);
            }
        }
    }

    public leave() {
        sscLogger(`Handling user leaving`);
        if (this.currentScoreSheet && this.currentScoreRoom) {
            if (this.isLoggedIn()) {
                SocketManager.getInstance().leaveChat(this.getCurrentUser(), this.currentScoreRoom, InviteType.ScoreSheet);
            }
            this.reset();
            this.applicationView.switchBetweenCollectionAndScoreSheet(true);
        }
    }

    protected addUserToScoreSheet(username: string): void {
        if (Controller.getInstance().isLoggedIn()) {
            sscLogger(`Calling user ${username}`);
            CallManager.getInstance().callUser(username);
        }
    }

    protected removeUserFromScoreSheet(username: string): void {
        sscLogger(`Removing user ${username}`);
        CallManager.getInstance().removeUser(username);
    }

    private reset(): void {
        this.currentScoreRoom = null;
        this.currentScoreSheet = null;
        this.currentlySelectedBoardGame = null;
        this.isRoomCreator = false;
        this.currentUsersInScoreSheet = [];
        this.stopTimerStoppedByAnotherUser();
        CallManager.getInstance().reset();
    }

    private isLoggedIn(): boolean {
        return (this.getCurrentUser().trim().length > 0);
    }

    private saveScoreSheetToBoardGame(scoreSheet: ScoreSheet) {
        sscLogger('Handling save');

        // add the data to the selected board game
        if (this.currentlySelectedBoardGame) {
            const saveData = TemplateManager.getInstance().getSaveData(this.currentlySelectedBoardGame, scoreSheet);
            sscLogger(saveData);
            if (!this.currentlySelectedBoardGame.scoresheets) {
                this.currentlySelectedBoardGame.scoresheets = [];
            }
            this.currentlySelectedBoardGame.scoresheets.push(saveData);
            Controller.getInstance().scoreSheetAddedToBoardGame(this.currentlySelectedBoardGame, saveData);
        }
    }

    private saveCurrentScoreSheet(scoreSheet: ScoreSheet, informListeners: boolean = true) {
        this.currentScoreSheet = scoreSheet;
        this.stateManager.setStateByName(STATE_NAMES.scoreSheet, this.currentScoreSheet, informListeners);
    }

    private stopTimerStoppedByAnotherUser() {
        sscLogger(`Handling timer stopped by another user`);
        if (this.intervalTimer > 0) {
            clearInterval(this.intervalTimer);
            if (this.currentScoreSheet) ScoreSheetDetailView.getInstance().updateTimer(this.currentScoreSheet.timer, true);
        }
        this.intervalTimer = -1;
    }

}
