/* eslint "react/react-in-jsx-scope":"off" */
/* eslint "react/jsx-no-undef":"off" */
import React from 'react';
import ReactDOM from 'react-dom';
import debug from 'debug';

import controller from './Controller';
import UserSearchSidebarView from "./component/UserSearchSidebarView";
import ChatSidebarView from "./component/ChatSidebarView";
import BoardGameSearchSidebarView from "./component/BoardGameSearchSidebarView";
import BoardGameView from "./component/BoardGameView";
import {Decorator} from "./AppTypes";
import browserUtil from "./util/BrowserUtil";
import {ScoreSheetController} from "./component/ScoreSheetController";
import {ScoreSheetView} from "./component/ScoreSheetView";
import ScoreSheetSidebarView from "./component/ScoreSheetSidebarView";
import {UnreadMessageCountListener} from "./socket/UnreadMessageCountListener";


const logger = debug('app');

class Root extends React.Component implements UnreadMessageCountListener {
    private titleEl: any;
    private contentEl: any;
    private modalEl: any;
    // @ts-ignore
    private commentView: CommentSidebarView;
    // @ts-ignore
    private detailsView: DetailsSidebarView;

    // @ts-ignore
    private userSearchView: UserSearchSidebarView;
    // @ts-ignore
    private bggSearchView: BoardGameSearchSidebarView;
    // @ts-ignore
    private chatView: ChatSidebarView;
    // @ts-ignore
    private scoreSheetView: ScoreSheetView;
    // @ts-ignore
    private scoresView: ScoreSheetSidebarView;

    // @ts-ignore
    private cancelBtnEl: HTMLElement | null;
    // @ts-ignore
    private confirmBtnEl: HTMLElement | null;
    // @ts-ignore
    private closeBtnEl: HTMLElement | null;

    // @ts-ignore
    private thisEl: HTMLDivElement | null;
    // @ts-ignore
    private scoreSheetEl: HTMLDivElement | null;
    // @ts-ignore
    private chatNavigationItem: HTMLAnchorElement | null;

    constructor() {
        // @ts-ignore
        super();
        this.state = {
            isLoggedIn: false,
            loggedInUserId: -1,
            boardGames: [],
            scoreSheet: {
                room: '',
                boardGameName: '',
                sheetLayoutOptions: {},
                timer: 0,
                sheetData: {}
            },
            stateNames: {
                users: 'users',
                boardGames: 'boardGames',
                scores: 'scores',
                selectedEntry: 'selectedEntry',
                recentUserSearches: 'recentUserSearches',
                bggSearchResults: 'bggSearchResults',
                scoreSheet: 'scoreSheet'
            },
            apis: {
                login: '/login',
                graphQL: '/graphql',
                bggSearchCall: 'query search($queryString: String!) {findBoardGames(query: $queryString) {gameId, name, year}}',
                bggSearchCallById: {
                    queryString: 'query getDetails($gameId:Int!) {getBoardGameDetails(gameId:$gameId) {gameId,thumb,image,name,description,year, minPlayers, maxPlayers, minPlayTime, maxPlayTime, minAge, designers, artists, publisher, numOfRaters, averageScore, rank, categories}}',
                    resultName: 'getBoardGameDetails',
                },
                findUsers: {
                    queryString: 'query {findUsers {id, username}}',
                    resultName: 'findUsers',
                },
                addToMyCollection: {
                    queryString: 'mutation addBoardGame($userId: Int!, $boardGame: BoardGameDetailInput!){addToMyCollection(userId: $userId, boardGame: $boardGame) {id,gameId}}',
                    resultName: 'addToMyCollection',
                },
                removeFromMyCollection: {
                    queryString: 'mutation removeBoardGame($userId: Int!, $boardGameId: Int!) {removeFromMyCollection(userId: $userId, boardGameId: $boardGameId) {result}}',
                    resultName: 'removeFromMyCollection'
                },
                getMyBoardGameCollection: {
                    queryString: 'query myCollection($userId: Int!) {getMyBoardGameCollection(userId: $userId) {id,gameId,thumb,image,name,description,year, minPlayers, maxPlayers, minPlayTime, maxPlayTime, minAge, designers, artists, publisher, numOfRaters, averageScore, rank, categories,scoresheets {id, player1, score1, player2, score2, player3, score3, player4, score4, player5, score5, player6, score6, player7, score7, createdOn}}}',
                    resultName: 'getMyBoardGameCollection',
                },
                addScoreSheetToBoardGame: {
                    queryString: 'mutation addScore($userId: Int!, $boardGameId: Int!, $sheet: ScoreSheetInput) {addScoreSheetToBoardGame(userId: $userId, boardGameId: $boardGameId, sheet: $sheet){id}}',
                    resultName: 'addScoreSheetToBoardGame'
                },
                removeScoreSheet: {
                    queryString: 'mutation removeSheet($sheetId: String!) {removeScoreSheet(sheetId: $sheetId) {result}}',
                    resultName: 'removeFromMyCollection'
                },


            },
            ui: {
                draggable: {
                    draggableDataKeyId: 'text/plain',
                    draggedType: 'draggedType',
                    draggedFrom: 'draggedFrom',
                    draggedTypeUser: 'user',
                    draggedTypeBoardGame: 'boardGame',
                    draggedFromUserSearch: 'userSearch',
                    draggedFromBoardGameSearch: 'boardGameSearch',
                },
                alert: {
                    modalId: "alert",
                    titleId: "alert-title",
                    contentId: "alert-content",
                    cancelButtonId: "alert-cancel",
                    confirmButtonId: "alert-confirm",
                    closeButtonId: "alert-close",
                    hideClass: "d-none",
                    showClass: "d-block",
                },
                navigation: {
                    showMyCollection: 'navigationItemMyCollection',
                    boardGameSearchId: 'navigationItemBoardGameSearch',
                    userSearchId: 'navigationItemUserSearch',
                    chatId: 'navigationItemChat',
                    showScoreSheet: 'navigationItemScoreSheet',

                },
                chatSideBar: {
                    dom: {
                        sideBarId: 'chatSideBar',
                        resultsId: 'chatLogs',
                        resultsElementType: 'a',
                        resultsElementAttributes: [
                            ['href', '#'],
                        ],
                        resultsClasses: 'list-group-item my-list-item truncate-comment list-group-item-action',
                        resultDataKeyId: 'room',
                        resultLegacyDataKeyId: 'room',
                        resultDataSourceId: 'chatLogs',
                        modifierClassNormal: '',
                        modifierClassInactive: 'list-group-item-dark',
                        modifierClassActive: 'list-group-item-primary',
                        modifierClassWarning: '',
                        iconNormal: '',
                        iconInactive: '',
                        iconActive: '',
                        iconWarning: '',
                        isDraggable: false,
                        isClickable: true,
                        isDeleteable: true,
                        deleteButtonClasses: 'btn btn-circle bg-warning btn-sm',
                        deleteButtonText: '',
                        deleteButtonIconClasses: 'text-black fas fa-sign-out-alt',
                        hasBadge: true,
                        resultContentDivClasses: 'd-flex w-100 justify-content-between',
                        resultContentTextElementType: 'span',
                        resultContentTextClasses: 'mb-1',
                        badgeElementType: 'span',
                        badgeElementAttributes: [
                            ['style', 'font-size:12pt'],
                        ],
                        badgeClasses: 'badge badge-pill badge-primary mr-1',
                        newFormId: "newMessage",
                        commentId: "message",
                        submitCommentId: "submitMessage",
                        chatLogId: 'chatLog',
                        chatLogRoomId: 'chatLogRoom',
                        leaveChatId: 'leaveChat',
                        chatFastSearchUserNames: 'chatFastSearchUserNames'
                    },
                },
                userSearchSideBar: {
                    dom: {
                        sideBarId: 'userSearchSideBar',
                        resultsId: 'recentUserSearches',
                        favouriteUsersId: 'favouriteUsers',
                        blockedUsersId: 'blockedUsers',
                        favouriteUsersDropZone: 'favouriteUsersDropZone',
                        blockedUsersDropZone: 'blockedUsersDropZone',
                        resultsElementType: 'a',
                        resultsElementAttributes: [
                            ['href', '#'],
                        ],
                        resultsClasses: 'list-group-item my-list-item truncate-notification list-group-item-action',
                        resultDataKeyId: 'user-id',
                        resultLegacyDataKeyId: 'legacy-user-id',
                        resultDataSourceId: 'data-source',
                        resultDataSourceValue: 'recentUserSearches',
                        resultDataSourceFavUsers: 'favouriteUsers',
                        resultDataSourceBlockedUsers: 'blockedUsers',
                        modifierClassNormal: 'list-group-item-primary',
                        modifierClassInactive: 'list-group-item-light',
                        modifierClassActive: 'list-group-item-info',
                        modifierClassWarning: 'list-group-item-danger',
                        iconNormal: '   <i class="fas fa-comment"></i>',
                        iconInactive: '   <i class="fas fa-comment"></i>',
                        iconActive: '   <i class="fas fa-heart"></i>',
                        iconWarning: '  <i class="fas fa-exclamation-circle"></i>',
                        resultContentDivClasses: 'd-flex w-100 justify-content-between',
                        resultContentTextElementType: 'span',
                        resultContentTextClasses: 'mb-1',
                        isDraggable: true,
                        isClickable: true,
                        isDeleteable: true,
                        deleteButtonClasses: 'btn bg-danger text-white btn-circle btn-sm',
                        deleteButtonText: '',
                        deleteButtonIconClasses: 'fas fa-trash-alt',
                        extra: {
                            fastSearchInputId: 'fastSearchUserNames',
                        },
                        extraAction1Classes: 'btn bg-info text-white btn-circle btn-sm mr-1',
                        extraAction1Text: '',
                        extraAction1IconClasses: 'fas fa-user-plus',
                        extraAction2Classes: 'btn bg-warning text-white btn-circle btn-sm mr-1',
                        extraAction2Text: '',
                        extraAction2IconClasses: 'fas fa-user-slash'
                    },
                },
                boardGameSearchSideBar: {
                    dom: {
                        sideBarId: 'boardGameSearchSidebar',
                        resultsId: 'bggSearchResults',
                        resultsElementType: 'a',
                        resultsElementAttributes: [
                            ['href', '#'],
                        ],
                        resultsClasses: 'list-group-item my-list-item truncate-notification list-group-item-action',
                        resultDataKeyId: 'bgg-id',
                        resultLegacyDataKeyId: 'bgg-id',
                        resultDataSourceId: 'data-source',
                        resultDataSourceValue: 'bggSearch',
                        modifierClassNormal: 'list-group-item-primary',
                        modifierClassInactive: 'list-group-item-light',
                        modifierClassActive: 'list-group-item-info',
                        modifierClassWarning: 'list-group-item-danger',
                        iconNormal: '   <i class="fas fa-dice"></i>',
                        iconInactive: '   <i class="fas fa-dice"></i>',
                        iconActive: '   <i class="fas fa-dice"></i>',
                        iconWarning: '  <i class="fas fa-dice"></i>',
                        resultContentDivClasses: 'd-flex w-100 justify-content-between',
                        resultContentTextElementType: 'span',
                        resultContentTextClasses: 'mb-1',
                        isDraggable: true,
                        isClickable: true,
                        formId: 'bggSearch',
                        queryId: 'queryText',
                        buttonId: 'bggSearchButton'
                    },
                },
                scoreSheetSideBar: {
                    dom: {
                        sideBarId: 'scoreSheetSidebar',
                        resultsId: 'scoreSheets',
                        resultsElementType: 'div',
                        resultsElementAttributes: [],
                        resultsClasses: 'text-white bg-info col-sm-6 col-md-3 col-lg-2 score-card',
                        resultDataKeyId: 'bgg-id',
                        resultLegacyDataKeyId: 'bgg-id',
                        resultDataSourceId: 'data-source',
                        resultDataSourceValue: 'scoreSheet',
                        modifierClassNormal: '',
                        modifierClassInactive: '',
                        modifierClassActive: '',
                        modifierClassWarning: '',
                        iconNormal: ' ',
                        iconInactive: ' ',
                        iconActive: ' ',
                        iconWarning: ' ',
                        isDraggable: false,
                        isClickable: false,
                        isDeleteable: true,
                        deleteButtonClasses: 'btn btn-rounded btn-warning ml-6 mt-4',
                        deleteButtonText: 'Delete&nbsp;',
                        deleteButtonIconClasses: 'fas fa-trash-alt',
                        resultContentDivClasses: 'card-img-overlay',
                        resultContentTextElementType: 'div',
                        resultContentTextClasses: 'ml-2',
                        hasBackgroundImage: true,
                        imgElementType: 'img',
                        imgClasses: 'score-card-img',
                    },
                },
                scoreSheet: {
                    dom: {
                        dropZone: "scoreSheetZone",
                        boardGame: "selectedBoardGame",
                        startStopTimer: "startStopTimer",
                        timer: "timerDisplay",
                        end: "leaveScoreSheet",
                        scoreSheet: "scoreSheet",
                        iconStart: "<i class='fas fa-hourglass-start'></i>",
                        iconInProgress: "<i class='fas fa-hourglass-half'></i>",
                        iconEnd: "<i class='fas fa-hourglass-end'></i>",
                        iconLeave: "<i class='fas fa-sign-out-alt'></i>",
                        ssFastSearchUserNames: 'ssFastSearchUserNames',
                        webrtc: 'webrtc'

                    }
                }
            },
            uiPrefs: {
                navigation: {},
                blogEntry: {},
                userSearchSideBar: {
                    view: {
                        location: 'left',
                        expandedSize: '35%',
                    },
                },
                boardGameSearchSideBar: {
                    view: {
                        location: 'left',
                        expandedSize: '35%',
                    },
                },
                chatSideBar: {
                    view: {
                        location: 'right',
                        expandedSize: '50%',
                    },
                },
                scoreSheetSideBar: {
                    view: {
                        location: 'bottom',
                        expandedSize: '30%',
                    },
                },
            },
            controller: {
                events: {
                    boardGames: {
                        eventDataKeyId: 'board-game-id',
                    },
                },
                dataLimit: {
                    recentUserSearches: 10,
                },
            },
        };
        // event handlers
        this.cancelDelete = this.cancelDelete.bind(this);
        this.confirmDelete = this.confirmDelete.bind(this);
        this.handleDeleteBoardGame = this.handleDeleteBoardGame.bind(this);

        this.handleShowUserSearch = this.handleShowUserSearch.bind(this);
        this.handleShowChat = this.handleShowChat.bind(this);
        this.handleShowBGGSearch = this.handleShowBGGSearch.bind(this);

        this.handleDragOver = this.handleDragOver.bind(this);
        this.handleDrop = this.handleDrop.bind(this);

        this.handleShowCollection = this.handleShowCollection.bind(this);
        this.handleShowScoreSheet = this.handleShowScoreSheet.bind(this);
        this.handleStartScoreSheet = this.handleStartScoreSheet.bind(this);
        this.handleShowScores = this.handleShowScores.bind(this);

        controller.connectToApplication(this, window.localStorage);
    }

    public addBoardGameToDisplay(draggedObject: any) {
        // ok, we are just the dumb view, pass this onto the controller to work out the logic for us
        controller.addBoardGameToDisplay(draggedObject);
    }

    getCurrentUser() {
        return controller.getLoggedInUserId();
    }

    alert(title: string, content: string) {
        this.titleEl.textContent = title;
        this.contentEl.textContent = content;
        // @ts-ignore
        this.modalEl.classList.remove(this.state.ui.alert.hideClass);
        // @ts-ignore
        this.modalEl.classList.add(this.state.ui.alert.showClass);
    }

    render() {
        logger("Rendering App");
        // @ts-ignore
        let boardGames: any[] = this.state.boardGames;
        logger(boardGames);

        const games = boardGames.map((entry, index: number) =>
            <BoardGameView
                key={index}
                boardGame={entry}
                showScoresHandler={this.handleShowScores}
                addToCollectionHandler={controller.addBoardGameToCollection}
                removeFromCollectionHandler={this.handleDeleteBoardGame}
                startScoreSheetHandler={this.handleStartScoreSheet}
            />
        );

        return (
            <div className="root container-fluid">
                <div className="card-group">
                    {games}
                </div>
            </div>
        );
    }

    cancelDelete(event: MouseEvent) {
        // @ts-ignore
        this.modalEl.classList.remove(this.state.ui.alert.showClass);
        // @ts-ignore
        this.modalEl.classList.add(this.state.ui.alert.hideClass);
        event.preventDefault();
    }

    confirmDelete(event: MouseEvent) {
        // @ts-ignore
        this.modalEl.classList.remove(this.state.ui.alert.showClass);
        // @ts-ignore
        this.modalEl.classList.add(this.state.ui.alert.hideClass);
        event.preventDefault();
        // @ts-ignore
        let id = this.modalEl.getAttribute(this.state.controller.events.boardGames.eventDataKeyId);
        id = parseInt(id);
        logger(`Handling Delete with id ${id}`);
        // @ts-ignore
        const currentBoardGamesOnDisplay = this.state.boardGames;
        let index = currentBoardGamesOnDisplay.findIndex((game: any) => game.gameId === id);
        if (index >= 0) {
            const boardGame = currentBoardGamesOnDisplay[index];
            controller.removeBoardGameFromCollection(boardGame);
        }
    }

    handleStartScoreSheet(event: MouseEvent) {
        event.preventDefault();
        // do we already have an active score sheet?
        if (ScoreSheetController.getInstance().hasActiveScoreSheet()) {
            if (confirm("You already have an active score sheet, do you want to finish that one and start a new one?")) {
                ScoreSheetController.getInstance().endScoreSheet();
            } else {
                // user cancelled, finish
                return;
            }
        }

        this.hideAllSideBars();
        // @ts-ignore
        let id = event.target.getAttribute(this.state.controller.events.boardGames.eventDataKeyId);
        logger(`Handling starting score sheet for ${id}`)
        if (id) {
            // find the entry from the state manager
            id = parseInt(id);
            // @ts-ignore
            const currentBoardGamesOnDisplay = this.state.boardGames;
            let index = currentBoardGamesOnDisplay.findIndex((game: any) => game.gameId === id);
            if (index >= 0) {
                const boardGame = currentBoardGamesOnDisplay[index];
                logger(boardGame);
                ScoreSheetController.getInstance().startScoreSheet(boardGame);
                this.switchBetweenCollectionAndScoreSheet(false);
            }
        }
    }

    handleDeleteBoardGame(event: MouseEvent) {
        event.preventDefault();
        //this.hideAllSideBars();
        // @ts-ignore
        let id = event.target.getAttribute(this.state.controller.events.boardGames.eventDataKeyId);
        logger(`Handling Delete Board Game ${id}`);
        if (id) {
            // find the entry from the state manager
            id = parseInt(id);
            // @ts-ignore
            const currentBoardGamesOnDisplay = this.state.boardGames;
            let index = currentBoardGamesOnDisplay.findIndex((game: any) => game.gameId === id);
            if (index >= 0) {
                const boardGame = currentBoardGamesOnDisplay[index];
                if (boardGame.decorator && (boardGame.decorator === Decorator.Persisted)) {
                    logger(`Handling Delete Board Game ${id} - persisted, confirming with user, but only if logged in`);
                    if (controller.isLoggedIn()) {
                        // @ts-ignore
                        this.modalEl.setAttribute(this.state.controller.events.boardGames.eventDataKeyId, id);
                        this.alert(`${boardGame.name} (${boardGame.year})`, "Are you sure you want to delete this board game from your collection?");
                    } else {
                        logger(`Handling Delete Board Game ${id} - IS persisted but not logged in, just deleting from local storage  asking controller to remove`);
                        // not persisted yet, let the controller manage this one
                        controller.removeBoardGameFromDisplay(boardGame);

                    }
                } else {
                    logger(`Handling Delete Board Game ${id} - NOT persisted, asking controller to remove`);
                    // not persisted yet, let the controller manage this one
                    controller.removeBoardGameFromDisplay(boardGame);
                }
            }
        }
    }

    async componentDidMount() {
        logger('component Did Mount');


        this.chatView = new ChatSidebarView(this, document, controller.getStateManager());
        this.chatView.onDocumentLoaded();

        this.userSearchView = new UserSearchSidebarView(this, document, controller.getStateManager());
        this.userSearchView.onDocumentLoaded();


        this.bggSearchView = new BoardGameSearchSidebarView(this, document, controller.getStateManager());
        this.bggSearchView.onDocumentLoaded();

        this.scoresView = new ScoreSheetSidebarView(this, document, controller.getStateManager());
        this.scoresView.onDocumentLoaded();


        this.scoreSheetView = ScoreSheetView.getInstance();
        this.scoreSheetView.setApplication(this);
        this.scoreSheetView.onDocumentLoaded(this);

        // navigation item handlers
        if (document) {
            // @ts-ignore
            document.getElementById(this.state.ui.navigation.boardGameSearchId).addEventListener('click', this.handleShowBGGSearch);
            // @ts-ignore
            document.getElementById(this.state.ui.navigation.userSearchId).addEventListener('click', this.handleShowUserSearch);
            // @ts-ignore
            this.chatNavigationItem = document.getElementById(this.state.ui.navigation.chatId);

            // @ts-ignore
            this.chatNavigationItem.addEventListener('click', this.handleShowChat);
            // @ts-ignore
            document.getElementById(this.state.ui.navigation.showMyCollection).addEventListener('click', this.handleShowCollection);
            // @ts-ignore
            document.getElementById(this.state.ui.navigation.showScoreSheet).addEventListener('click', this.handleShowScoreSheet);
        }

        // alert modal dialog setup
        // @ts-ignore
        this.modalEl = document.getElementById(this.state.ui.alert.modalId);
        // @ts-ignore
        this.titleEl = document.getElementById(this.state.ui.alert.titleId);
        // @ts-ignore
        this.contentEl = document.getElementById(this.state.ui.alert.contentId);
        // @ts-ignore
        this.cancelBtnEl = document.getElementById(this.state.ui.alert.cancelButtonId);
        // @ts-ignore
        this.confirmBtnEl = document.getElementById(this.state.ui.alert.confirmButtonId);
        // @ts-ignore
        this.closeBtnEl = document.getElementById(this.state.ui.alert.closeButtonId);

        // event listeners for the confirm delete of entry
        if (this.cancelBtnEl) this.cancelBtnEl.addEventListener('click', this.cancelDelete);
        if (this.confirmBtnEl) this.confirmBtnEl.addEventListener('click', this.confirmDelete);
        if (this.closeBtnEl) this.closeBtnEl.addEventListener('click', this.cancelDelete);

        // a reference to the div containing ourselves
        // @ts-ignore
        this.thisEl = document.getElementById('root');
        // @ts-ignore
        this.scoreSheetEl = document.getElementById('scoreSheetZone');
        if (this.thisEl) {
            this.thisEl.addEventListener('dragover', this.handleDragOver);
            this.thisEl.addEventListener('drop', this.handleDrop);
        }

        // ok lets try get things done
        ScoreSheetController.getInstance().initialise(this);
        controller.initialise();
    }

    hideAllSideBars() {
        this.chatView.eventHide(null);
        this.userSearchView.eventHide(null);
        this.bggSearchView.eventHide(null);
    }

    handleShowCollection(event: MouseEvent) {
        this.switchBetweenCollectionAndScoreSheet(true);
    }

    handleShowScoreSheet(event: MouseEvent) {
        this.switchBetweenCollectionAndScoreSheet(false);
    }

    handleShowUserSearch(event: Event) {
        logger('Handling Show User Search');
        event.preventDefault();
        //this.hideAllSideBars();
        // prevent anything from happening if we are not logged in
        if (!controller.isLoggedIn()) {
            // @ts-ignore
            window.location.href = this.state.apis.login;
            return;
        }
        this.userSearchView.eventShow(event);
    }

    handleShowScores(event: Event) {
        logger(`Handling show board game scores`);
        event.preventDefault();
        // @ts-ignore
        let id = event.target.getAttribute(this.state.controller.events.boardGames.eventDataKeyId);
        logger(`Handling Show board game scores ${id}`);
        if (id) {
            // find the entry from the state manager
            id = parseInt(id);
            // @ts-ignore
            const currentBoardGamesOnDisplay = this.state.boardGames;
            let index = currentBoardGamesOnDisplay.findIndex((game: any) => game.gameId === id);
            if (index >= 0) {
                const boardGame = currentBoardGamesOnDisplay[index];
                this.scoresView.setSelectedBoardGame(boardGame);
                this.scoresView.eventShow(null);
            }
        }
    }

    handleShowChat(event: Event, roomName: string | null) {
        logger('Handling Show Chat');
        event.preventDefault();
        //this.hideAllSideBars();
        // prevent anything from happening if we are not logged in
        if (!controller.isLoggedIn()) {
            // @ts-ignore
            window.location.href = this.state.apis.login;
            return;
        }
        this.chatView.eventShow(event);
        if (roomName) {
            this.chatView.selectChatRoom(roomName);
        }
    }

    handleShowBGGSearch(event: Event) {
        logger('Handling Show BGG Search View');
        event.preventDefault();
        // prevent anything from happening if we are not logged in
        if (!controller.isLoggedIn()) {
            this.hideAllSideBars();
            // @ts-ignore
        }
        this.bggSearchView.eventShow(event);
    }

    countChanged(newCount: number): void {
        //
        let buffer = 'Chat <i class="fas fa-inbox"></i>';
        if (newCount > 0) {
            buffer += ` <span class="badge badge-pill badge-primary">&nbsp;${newCount}&nbsp;</span>`;
        }
        if (this.chatNavigationItem) this.chatNavigationItem.innerHTML = `${buffer}`;
    }

    private handleDragOver(event: DragEvent) {
        event.preventDefault();
    }

    private handleDrop(event: Event) {
        // @ts-ignore
        const draggedObjectJSON = event.dataTransfer.getData(this.state.ui.draggable.draggableDataKeyId);
        logger(draggedObjectJSON);
        const draggedObject = JSON.parse(draggedObjectJSON);
        logger(draggedObject);
        // @ts-ignore
        if (draggedObject[this.state.ui.draggable.draggedType] === this.state.ui.draggable.draggedTypeBoardGame) {
            this.addBoardGameToDisplay(draggedObject);
        }

    }

    private switchBetweenCollectionAndScoreSheet(showCollection: boolean) {
        if (showCollection) {
            if (this.thisEl) browserUtil.addRemoveClasses(this.thisEl, 'd-none', false);
            if (this.thisEl) browserUtil.addRemoveClasses(this.thisEl, 'd-block', true);
            if (this.scoreSheetEl) browserUtil.addRemoveClasses(this.scoreSheetEl, 'd-none', true);
            if (this.scoreSheetEl) browserUtil.addRemoveClasses(this.scoreSheetEl, 'd-block', false);
        } else {
            if (ScoreSheetController.getInstance().hasActiveScoreSheet()) {
                if (this.thisEl) browserUtil.addRemoveClasses(this.thisEl, 'd-none', true);
                if (this.thisEl) browserUtil.addRemoveClasses(this.thisEl, 'd-block', false);
                if (this.scoreSheetEl) browserUtil.addRemoveClasses(this.scoreSheetEl, 'd-none', false);
                if (this.scoreSheetEl) browserUtil.addRemoveClasses(this.scoreSheetEl, 'd-block', true);
            }
        }
    }

}

//localStorage.debug = 'app view-ts controller-ts socket-ts api-ts local-storage-ts state-manager-ts view-ts:blogentry view-ts:comments view-ts:details';
//localStorage.debug = 'app controller-ts socket-ts api-ts local-storage-ts state-manager-ts indexeddb-ts user-search-sidebar user-search-sidebar:detail state-manager-ms state-manager-api state-manager-aggregate state-manager-async';
//localStorage.debug = 'app controller-ts  chat-sidebar chat-sidebar:detail board-game-search-sidebar board-game-search-sidebar:detail ';
//localStorage.debug = 'app controller-ts controller-ts-detail api-ts socket-ts chat-sidebar chat-sidebar:detail socket-listener notification-controller chat-manager board-game-search-sidebar board-game-search-sidebar:detail score-sheet-controller score-sheet-view score-sheet-sidebar score-sheet-sidebar:detail view-ts template-manager' ;
localStorage.debug = 'score-sheet-controller call-manager peer';
debug.log = console.info.bind(console);

// @ts-ignore
const element = <Root className="container-fluid justify-content-around"/>;

ReactDOM.render(element, document.getElementById('root'));
