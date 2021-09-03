import debug from 'debug';
import MemoryBufferStateManager from "./state/MemoryBufferStateManager";
import StateChangeListener from "./state/StateChangeListener";
import {StateManager} from "./state/StateManager";
import {RESTApiStateManager} from "./state/RESTApiStateManager";
import socketManager from "./socket/SocketManager";
import AsyncStateManagerWrapper from "./state/AsyncStateManagerWrapper";
import {AggregateStateManager} from "./state/AggregateStateManager";
import SocketListenerDelegate from "./SocketListenerDelegate";
import {ChatManager} from "./socket/ChatManager";
import {NotificationController} from "./socket/NotificationController";
import {GraphQLApiStateManager} from "./state/GraphQLApiStateManager";
import {Decorator} from "./AppTypes";
import downloader from "./network/DownloadManager";
import BrowserStorageStateManager from "./state/BrowserStorageStateManager";
import {ScoreSheetController} from "./component/ScoreSheetController";
import {isSameGame} from "./util/EqualityFunctions";

const cLogger = debug('controller-ts');
const cLoggerDetail = debug('controller-ts-detail');

class Controller implements StateChangeListener {
    protected applicationView: any;
    protected clientSideStorage: any;
    protected config: any;
    // @ts-ignore
    protected stateManager: StateManager;
    // @ts-ignore
    protected displayedBoardGamesStateManager: StateManager;


    constructor() {
    }

    connectToApplication(applicationView: any, clientSideStorage: any) {
        this.applicationView = applicationView;
        this.clientSideStorage = clientSideStorage;
        this.config = this.applicationView.state;
        // setup the API calls
        let apiStateManager = RESTApiStateManager.getInstance();
        apiStateManager.initialise([
            {
                stateName: this.config.stateNames.boardGames,
                serverURL: this.getServerAPIURL(),
                api: this.config.apis.entries,
                isActive: true
            },
            {
                stateName: this.config.stateNames.scores,
                serverURL: this.getServerAPIURL(),
                api: this.config.apis.comments,
                isActive: true
            }
        ]);

        let graphSM = new GraphQLApiStateManager();
        graphSM.initialise([
            {
                stateName: this.config.stateNames.users,
                apiURL: this.getServerAPIURL() + this.config.apis.graphQL,
                apis: {
                    find: '',
                    create: '',
                    destroy: '',
                    update: '',
                    findAll: this.config.apis.findUsers.queryString,
                },
                data: {
                    find: '',
                    create: '',
                    destroy: '',
                    update: '',
                    findAll: this.config.apis.findUsers.resultName,
                },
                isActive: true

            }

        ]);


        let aggregateSM = AggregateStateManager.getInstance();
        let memorySM = MemoryBufferStateManager.getInstance();

        let asyncDBSM = new AsyncStateManagerWrapper(aggregateSM, apiStateManager);
        let asyncQLSM = new AsyncStateManagerWrapper(aggregateSM, graphSM);


        aggregateSM.addStateManager(memorySM, [], false);
        aggregateSM.addStateManager(asyncQLSM, [this.config.stateNames.selectedEntry, this.config.stateNames.recentUserSearches, this.config.stateNames.boardGames, this.config.stateNames.scores], false);
        aggregateSM.addStateManager(asyncDBSM, [this.config.stateNames.users, this.config.stateNames.boardGames, this.config.stateNames.scores, this.config.stateNames.selectedEntry, this.config.stateNames.recentUserSearches], false);

        this.stateManager = aggregateSM;

        // state listener
        this.stateChanged = this.stateChanged.bind(this);
        this.stateChangedItemAdded = this.stateChangedItemAdded.bind(this);
        this.stateChangedItemRemoved = this.stateChangedItemRemoved.bind(this);
        this.stateChangedItemUpdated = this.stateChangedItemUpdated.bind(this);

        // call backs
        this.callbackBoardGameDetails = this.callbackBoardGameDetails.bind(this);
        this.callbackAddToCollection = this.callbackAddToCollection.bind(this);
        this.callbackRemoveFromCollection = this.callbackRemoveFromCollection.bind(this);
        this.callbackGetCollection = this.callbackGetCollection.bind(this);

        //event handlers
        this.addBoardGameToCollection = this.addBoardGameToCollection.bind(this);
        this.removeBoardGameFromCollection = this.removeBoardGameFromCollection.bind(this);
        this.removeBoardGameFromDisplay = this.removeBoardGameFromDisplay.bind(this);

        // further state management
        this.displayedBoardGamesStateManager = new BrowserStorageStateManager(true);

        return this;
    }

    /*
        Get the base data for the application (users, entries)
    */
    public initialise(): void {
        cLogger('Initialising data state');
        // listen for socket events
        let socketListerDelegate = new SocketListenerDelegate(this.config);
        socketManager.setListener(socketListerDelegate);

        // now that we have all the user we can setup the chat system but only if we are logged in
        cLogger(`Setting up chat system for user ${this.getLoggedInUserId()}: ${this.getLoggedInUsername()}`);
        if (this.getLoggedInUserId() > 0) {
            // setup the chat system
            let chatManager = ChatManager.getInstance(); // this connects the manager to the socket system

            // setup the chat notification system
            NotificationController.getInstance();
            chatManager.setCurrentUser(this.getLoggedInUsername());
            ScoreSheetController.getInstance().setCurrentUser(this.getLoggedInUsername());

            // let the application view know about message counts
            chatManager.setUnreadCountListener(this.applicationView);

            chatManager.login();


            // load the users
            this.getStateManager().getStateByName(this.config.stateNames.users);
        }
        let currentGameList: any[] = this.displayedBoardGamesStateManager.getStateByName(this.config.stateNames.boardGames);
        currentGameList = this.cleanupBoardGameState(currentGameList);


        // load board games from local storage if any
        this.applicationView.setState({boardGames: currentGameList});

        // download the current board game collection
        this.downloadAndSyncSavedBoardGameCollection();
    }

    public getStateManager(): StateManager {
        return this.stateManager;
    }

    public isLoggedIn(): boolean {
        let isLoggedIn = false;
        try {
            // @ts-ignore
            if (loggedInUserId) {
                isLoggedIn = true;
            }
        } catch (error) {
        }
        return isLoggedIn;
    }

    public getLoggedInUserId(): number {
        let result = -1;
        try {
            // @ts-ignore
            if (loggedInUserId) {
                // @ts-ignore
                result = loggedInUserId;
            }
        } catch (error) {
        }
        cLoggerDetail(`Logged in user id is ${result}`);
        return result;
    }

    public getLoggedInUsername(): string {
        let result = '';
        try {
            // @ts-ignore
            if (loggedInUsername) {
                // @ts-ignore
                result = loggedInUsername;
            }
        } catch (error) {
        }
        cLoggerDetail(`Logged in user is ${result}`);
        return result;
    }

    public handleMessage(message: string): void {
        cLogger(message);
    }

    public getCurrentUser(): number {
        return this.getLoggedInUserId();
    }

    //  State Management listening
    stateChangedItemAdded(managerName: string, name: string, itemAdded: any): void {
        cLogger(`State changed ${name} from ${managerName} - item Added`);
        cLogger(itemAdded);
        switch (managerName) {
            case 'aggregate':
            case 'memory': {
                cLogger(`received state from ${managerName} for state ${name} - updating application view`);
                switch (name) {
                    case this.config.stateNames.entries: {
                        break;
                    }
                }
                break;
            }
        }
    }


    /*
    *  sockets -
    *  Handling data changes by other users
    *
     */

    stateChangedItemRemoved(managerName: string, name: string, itemRemoved: any): void {
        cLogger(`State changed ${name} from ${managerName}  - item Removed`);
        cLogger(itemRemoved);
        switch (managerName) {
            case 'aggregate':
            case 'memory': {
                cLogger(`received state from ${managerName} for state ${name} - updating application view`);
                switch (name) {
                    case this.config.stateNames.comments: {
                        break;
                    }
                }
                break;
            }
        }
    }

    stateChangedItemUpdated(managerName: string, name: string, itemUpdated: any, itemNewValue: any): void {
        cLogger(`State changed ${name} from ${managerName} - item updated`);
        cLogger(itemUpdated);
        switch (managerName) {
            case 'aggregate':
            case 'memory': {
                cLogger(`received state from ${managerName} for state ${name} - updating application view`);
                switch (name) {
                    case this.config.stateNames.entries: {
                        break;
                    }
                }
                break;
            }
        }

    }

    stateChanged(managerName: string, name: string, values: any) {
        cLogger(`State changed ${name} from ${managerName} `);
        cLogger(values);
        // what has changed and by whom?
        switch (managerName) {
            case 'aggregate':
            case 'memory': {
                cLogger(`received state from ${managerName} for state ${name} - sending to application view`);
                switch (name) {
                    case this.config.stateNames.entries: {
                        break;
                    }
                    case this.config.stateNames.comments: {
                        break;
                    }
                    case this.config.stateNames.users: {
                        break;
                    }
                }
                break;
            }
        }
    }

    // Data logic
    public addBoardGameToDisplay(boardGame: any): void {
        // this will just the basics of a board game from the search then click/dragged over
        cLogger(`Handling addition of board game`);
        cLogger(boardGame);

        // don't add if already in the users display
        let currentListOfGames: any[] = this.applicationView.state.boardGames;
        let index = currentListOfGames.findIndex((value) => value.gameId === boardGame.gameId);
        if (index >= 0) {
            cLogger(`Board game in display already`);
            return;
        }

        // start with what we have and let the main view know, but mark it incomplete for partial rendering with user information
        boardGame.decorator = Decorator.Incomplete;
        currentListOfGames.push(boardGame);
        cLogger(`Adding received board game to application`);
        cLogger(boardGame);

        this.displayedBoardGamesStateManager.setStateByName(this.config.stateNames.boardGames, currentListOfGames, false);
        this.applicationView.setState({boardGames: currentListOfGames});

        // now we need an API call to fill in the details
        downloader.addQLApiRequest(this.config.apis.graphQL, this.config.apis.bggSearchCallById.queryString, {gameId: boardGame.gameId}, this.callbackBoardGameDetails, this.config.stateNames.boardGames, false);
    }

    public callbackBoardGameDetails(data: any, status: number, associatedStateName: string): void {
        cLogger(`callback for bgg search for single board game ${associatedStateName} with status ${status}`);
        if (status >= 200 && status <= 299) { // do we have any data?
            cLogger(data);
            const boardGameDetails = data.data[this.config.apis.bggSearchCallById.resultName];
            cLogger(boardGameDetails);
            let regex = /&#10;/g;
            boardGameDetails.description = boardGameDetails.description.replace(regex, '\r\n');
            regex = /&ldquo;/g
            boardGameDetails.description = boardGameDetails.description.replace(regex, '"');
            regex = /&rdquo;/g
            boardGameDetails.description = boardGameDetails.description.replace(regex, '"');
            regex = /&quot;/g
            boardGameDetails.description = boardGameDetails.description.replace(regex, '"');
            regex = /&mdash;/g
            boardGameDetails.description = boardGameDetails.description.replace(regex, '"');


            //this.getStateManager().addNewItemToState(this.config.stateNames.boardGames,data.data[this.config.apis.bggSearchCallById.resultName],true);
            let currentListOfGames: any[] = this.applicationView.state.boardGames;
            let index = currentListOfGames.findIndex((value) => value.gameId === boardGameDetails.gameId);
            if (index >= 0) {
                cLogger(`Updating application state`);
                currentListOfGames.splice(index, 1, boardGameDetails);
                cLogger(currentListOfGames);
                boardGameDetails.decorator = Decorator.PersistedLocally;
                this.displayedBoardGamesStateManager.setStateByName(this.config.stateNames.boardGames, currentListOfGames, false);
                this.applicationView.setState({boardGames: currentListOfGames});
            } else {
                cLogger(`Board game ${boardGameDetails.id} not found in current state`);
            }

        }

    }

    public callbackAddToCollection(data: any, status: number, associatedStateName: string): void {
        cLogger(`callback for add single board game ${associatedStateName} to my collection with status ${status}`);
        if (status >= 200 && status <= 299) { // do we have any data?
            cLogger(data);
            const id = data.data[this.config.apis.addToMyCollection.resultName];
            cLogger(id);

            // Find and update the board game in the state
            let currentGameList = this.applicationView.state.boardGames;
            let index = currentGameList.findIndex((game: any) => game.gameId === id.gameId);
            if (index >= 0) {
                let updatingBoardGame = currentGameList[index];
                cLogger(`Updating board game ${updatingBoardGame.gameId} with database id ${id.id} and new Persisted state`);
                updatingBoardGame.decorator = Decorator.Persisted;
                updatingBoardGame.id = id.id;

                if (updatingBoardGame.scoresheets) {
                    const cb = (data: any, status: number, associatedStateName: string) => {
                    };

                    // add the scoresheets to database
                    updatingBoardGame.scoresheets.forEach((scoreSheet: any) => {
                        this.convertScoreSheetToApiCallFormat(scoreSheet);
                        downloader.addQLApiRequest(this.config.apis.graphQL, this.config.apis.addScoreSheetToBoardGame.queryString,
                            {userId: this.getCurrentUser(), boardGameId: updatingBoardGame.id, sheet: scoreSheet},
                            cb,
                            this.config.stateNames.scoreSheet,
                            false);
                        this.convertScoreSheetToDatabaseFormat(scoreSheet);
                        scoreSheet.decorator = Decorator.Persisted;

                    });

                }

                this.applicationView.setState({boardGames: currentGameList});
                this.displayedBoardGamesStateManager.updateItemInState(this.config.stateNames.boardGames, updatingBoardGame, isSameGame, false);
            }
        }
    }

    public callbackRemoveFromCollection(data: any, status: number, associatedStateName: string): void {
        cLogger(`callback for remove single board game ${associatedStateName} from my collection with status ${status}`);
        if (status >= 200 && status <= 299) { // do we have any data?
            cLogger(data);
            const id = data.data[this.config.apis.removeFromMyCollection.resultName];
            cLogger(id);
        }
    }

    public callbackGetCollection(data: any, status: number, associatedStateName: string): void {
        cLogger(`callback for getting my collection of board games ${associatedStateName} to my collection with status ${status}`);
        if (status >= 200 && status <= 299) { // do we have any data?
            cLogger(data);
            const collectionData = data.data[this.config.apis.getMyBoardGameCollection.resultName];

            // loop through the collection data and see if it already exists in the state
            let currentGameList = this.applicationView.state.boardGames;
            cLoggerDetail(`Starting with local state of ${currentGameList.length}`);
            collectionData.forEach((boardGame: any) => {
                boardGame.decorator = Decorator.Persisted;
                cLoggerDetail(`Loading board game from collection `);
                cLoggerDetail(boardGame);

                this.decorateScoreSheets(boardGame);

                let index = currentGameList.findIndex((game: any) => game.gameId === boardGame.gameId);
                cLoggerDetail(`have found the board game locally? ${index >= 0}`);
                if (index >= 0) {
                    const locallySaveBoardGame = currentGameList[index];

                    cLoggerDetail(`in current state, replacing`);
                    // copy any locally saved score sheets to the database object
                    this.copyLocallySavedScoreSheetsToBoardGame(boardGame, locallySaveBoardGame);

                    // replace the current entry
                    currentGameList.splice(index, 1, boardGame);
                } else {
                    cLoggerDetail(`not in current state, adding`);
                    currentGameList.push(boardGame);
                }
            });
            currentGameList = this.cleanupBoardGameState(currentGameList);
            cLoggerDetail(`Ending with local state of ${currentGameList.length}`);
            this.applicationView.setState({boardGames: currentGameList});
            this.displayedBoardGamesStateManager.setStateByName(this.config.stateNames.boardGames, currentGameList, false);
        }
    }

    scoreSheetAddedToBoardGame(boardGame: any, scoreSheet: any) {
        const cb = (data: any, status: number, associatedStateName: string) => {
        };

        if (this.isLoggedIn() && (boardGame.decorator && (boardGame.decorator === Decorator.Persisted))) {
            //mutation addScore($userId: Int!, $boardGameId: Int!, $sheet: ScoreSheetInput) {addScoreSheetToBoardGame(userId: $userId, boardGameId: $boardGameId, sheet: $sheet){id}
            downloader.addQLApiRequest(this.config.apis.graphQL, this.config.apis.addScoreSheetToBoardGame.queryString,
                {userId: this.getCurrentUser(), boardGameId: boardGame.id, sheet: scoreSheet},
                cb,
                this.config.stateNames.scoreSheet,
                false);
            scoreSheet.decorator = Decorator.Persisted;
        } else {
            scoreSheet.decorator = Decorator.PersistedLocally;
        }
        // convert the scoresheet into the usual received format from the database
        this.convertScoreSheetToDatabaseFormat(scoreSheet);

        let currentListOfGames: any[] = this.applicationView.state.boardGames;
        let index = currentListOfGames.findIndex((value) => value.gameId === boardGame.gameId);
        if (index >= 0) {
            const oldBoardGame = currentListOfGames[index];
            boardGame.decorator = oldBoardGame.decorator;

            cLogger(`Updating application state`);
            currentListOfGames.splice(index, 1, boardGame);
            cLogger(currentListOfGames);
            this.displayedBoardGamesStateManager.setStateByName(this.config.stateNames.boardGames, currentListOfGames, false);
            this.applicationView.setState({boardGames: currentListOfGames});
        } else {
            cLogger(`Board game ${boardGame.id} not found in current state`);
        }

    }

    scoreSheetRemovedFromBoardGame(boardGame: any, scoreSheetId: string) {
        const cb = (data: any, status: number, associatedStateName: string) => {
        };

        if (this.isLoggedIn() && (boardGame.decorator && (boardGame.decorator === Decorator.Persisted))) {
            //mutation addScore($userId: Int!, $boardGameId: Int!, $sheet: ScoreSheetInput) {addScoreSheetToBoardGame(userId: $userId, boardGameId: $boardGameId, sheet: $sheet){id}
            downloader.addQLApiRequest(this.config.apis.graphQL, this.config.apis.removeScoreSheet.queryString,
                {sheetId: scoreSheetId},
                cb,
                this.config.stateNames.scoreSheet,
                false);
        }

        let currentListOfGames: any[] = this.applicationView.state.boardGames;
        let index = currentListOfGames.findIndex((value) => value.gameId === boardGame.gameId);
        if (index >= 0) {
            const oldBoardGame = currentListOfGames[index];
            boardGame.decorator = oldBoardGame.decorator;

            cLogger(`Updating application state`);
            currentListOfGames.splice(index, 1, boardGame);
            cLogger(currentListOfGames);
            this.displayedBoardGamesStateManager.setStateByName(this.config.stateNames.boardGames, currentListOfGames, false);
            this.applicationView.setState({boardGames: currentListOfGames});
        } else {
            cLogger(`Board game ${boardGame.id} not found in current state`);
        }

    }

    addBoardGameToCollection(event: MouseEvent) {
        cLogger(`Handling Add Board Game to collection`);
        const boardGame: any | null = this.findBoardGameInStateFromEvent(event);
        if (boardGame) {
            if (boardGame.decorator) {
                switch (boardGame.decorator) {
                    case (Decorator.Persisted): {
                        // already in collection, nothing to do
                        break;
                    }
                    case (Decorator.Incomplete): {
                        // not ready to add to collection yet, do nothing
                        break;
                    }
                    case (Decorator.PersistedLocally):
                    case (Decorator.Complete): {
                        // loaded and ready to save
                        this.displayedBoardGamesStateManager.addNewItemToState(this.config.stateNames.boardGames, boardGame, true);
                        // add the board game to my collection
                        // now we need an API call to fill in the details
                        delete boardGame.decorator;
                        delete boardGame.id;
                        if (this.isLoggedIn()) {
                            let scoreSheets = boardGame.scoresheets;
                            delete boardGame.scoresheets;

                            downloader.addQLApiRequest(this.config.apis.graphQL, this.config.apis.addToMyCollection.queryString,
                                {userId: this.getCurrentUser(), boardGame: boardGame},
                                this.callbackAddToCollection,
                                this.config.stateNames.boardGames,
                                true);
                            boardGame.decorator = Decorator.Complete;
                            boardGame.scoresheets = scoreSheets;


                        } else {
                            boardGame.decorator = Decorator.PersistedLocally;
                        }
                        break;
                    }
                }
            }
        }
    }

    removeBoardGameFromCollection(boardGame: any) { // should be persisted
        cLogger(`Handling Remove Board Game from collection with id ${boardGame.gameId}`);
        if (boardGame) {
            if (boardGame.decorator) {
                switch (boardGame.decorator) {
                    case (Decorator.PersistedLocally):
                    case (Decorator.Persisted): {
                        // already in collection,
                        this.removeBoardGameFromState(boardGame);
                        if (this.isLoggedIn()) {
                            downloader.addQLApiRequest(this.config.apis.graphQL, this.config.apis.removeFromMyCollection.queryString,
                                {userId: this.getCurrentUser(), boardGameId: boardGame.gameId},
                                this.callbackRemoveFromCollection,
                                this.config.stateNames.boardGames,
                                false);
                        }
                        break;
                    }
                    case (Decorator.Incomplete): {
                        // not ready to add to collection yet, do nothing
                        break;
                    }
                    case (Decorator.Complete): {
                        // loaded and ready to save, but not yet saved, nothing to delete
                        break;
                    }
                }
            }
        }
    }

    removeBoardGameFromDisplay(boardGame: any) { // shouldn't be persisted yet
        cLogger(`Handling Remove Board Game from display ${boardGame.gameId}`);
        if (boardGame) {
            if (boardGame.decorator) {
                switch (boardGame.decorator) {
                    case (Decorator.Incomplete): {
                        // not ready to add to collection yet, do nothing
                        break;
                    }
                    case (Decorator.Persisted):
                    case (Decorator.PersistedLocally):
                    case (Decorator.Complete): {
                        // loaded and ready to save
                        this.removeBoardGameFromState(boardGame);
                        break;
                    }
                }
            }
        }
    }

    private cleanupBoardGameState(boardGames: any[]): any[] { // lets tidy up any duplicates, keeping Persisted ones by preference
        let cleanedUpList: any[] = [];
        boardGames.forEach((boardGame) => {
            // is already in the list?
            let index = cleanedUpList.findIndex((game) => game.gameId === boardGame.gameId);
            if (index >= 0) { // found in the list
                // is this a persisted board game?
                let existingListGame = cleanedUpList[index]
                if (existingListGame.decorator && existingListGame.decorator === Decorator.Persisted) {
                    // leave the persisted version in the cleaned up list
                } else {
                    // do we have persisted game to replace the one in the list
                    if (boardGame.decorator && boardGame.decorator === Decorator.Persisted) {
                        // replace the existing one with this one
                        cleanedUpList.splice(index, 1, boardGame);
                    } else {
                        // just leave the one there, neither are persisted to a database
                    }
                }
            } else {
                // not found yet, add to list
                cleanedUpList.push(boardGame);
            }

        });
        return cleanedUpList;

    }

    private downloadAndSyncSavedBoardGameCollection() {
        if (this.isLoggedIn()) {
            // start the call to retrieve the saved collection of board games
            downloader.addQLApiRequest(this.config.apis.graphQL, this.config.apis.getMyBoardGameCollection.queryString, {userId: this.getLoggedInUserId()}, this.callbackGetCollection, this.config.stateNames.boardGames, false);
        }
    }

    /*
    *
    * Simple Application state (URL, logged in user)
    *
     */
    private getServerAPIURL(): string {
        let result = "";
        // @ts-ignore
        if ((window.ENV) && (window.ENV.serverURL)) {
            // @ts-ignore
            result = window.ENV.serverURL;
        }
        return result;
    }

    private removeBoardGameFromState(boardGame: any) {
        const currentBoardGamesOnDisplay = this.applicationView.state.boardGames;
        let index = currentBoardGamesOnDisplay.findIndex((game: any) => game.gameId === boardGame.gameId);
        if (index >= 0) {
            currentBoardGamesOnDisplay.splice(index, 1);
            this.applicationView.setState({boardGames: currentBoardGamesOnDisplay});
        }
        // save locally
        this.displayedBoardGamesStateManager.setStateByName(this.config.stateNames.boardGames, currentBoardGamesOnDisplay, false);
    }

    private findBoardGameInStateFromEvent(event: Event) {
        let boardGame: any | null = null;
        cLoggerDetail(`Finding board game id in event`);
        // @ts-ignore
        let id = event.target.getAttribute(this.config.controller.events.boardGames.eventDataKeyId);
        cLoggerDetail(id);
        if (id) {
            // find the entry from the state manager
            id = parseInt(id);
            // @ts-ignore
            const currentBoardGamesOnDisplay = this.applicationView.state.boardGames;
            let index = currentBoardGamesOnDisplay.findIndex((game: any) => game.gameId === id);
            cLoggerDetail(index);
            if (index >= 0) {
                boardGame = currentBoardGamesOnDisplay[index];
            }
        }
        cLoggerDetail(boardGame);
        return boardGame;
    }

    private decorateScoreSheets(boardGame: any) {
        if (boardGame) {
            if (boardGame.scoresheets) {
                boardGame.scoresheets.forEach((sheet: any) => {
                    sheet.decorator = Decorator.Persisted;
                })
            } else {
                boardGame.scoresheets = [];
            }
        }
    }

    private copyLocallySavedScoreSheetsToBoardGame(target: any, source: any) {
        if (source.scoresheets) {
            let toSave: any[] = [];
            source.scoresheets.forEach((sheet: any) => {
                // is the scoresheet already in the target?
                let index = target.scoresheets.findIndex((item: any) => item.id === sheet.id);
                if (index < 0) {
                    sheet.decorator = Decorator.PersistedLocally;
                    target.scoresheets.push(sheet);
                    toSave.push(sheet);
                }
            });

            // do we have any sheets to save?
            if (toSave.length > 0) {
                const cb = (data: any, status: number, associatedStateName: string) => {
                };

                toSave.forEach((sheetToSave: any) => {
                    this.convertScoreSheetToApiCallFormat(sheetToSave);


                    downloader.addQLApiRequest(this.config.apis.graphQL, this.config.apis.addScoreSheetToBoardGame.queryString,
                        {userId: this.getCurrentUser(), boardGameId: target.id, sheet: sheetToSave},
                        cb,
                        this.config.stateNames.scoreSheet,
                        false);

                    this.convertScoreSheetToDatabaseFormat(sheetToSave);
                    sheetToSave.decorator = Decorator.Persisted;
                });
            }
        }
    }

    private convertScoreSheetToDatabaseFormat(scoreSheet: any) {
        if (scoreSheet.players) {
            if (scoreSheet.players.length >= 1) {
                scoreSheet.player1 = scoreSheet.players[0];
                scoreSheet.score1 = scoreSheet.scores[0];
            }
            if (scoreSheet.players.length >= 2) {
                scoreSheet.player2 = scoreSheet.players[1];
                scoreSheet.score2 = scoreSheet.scores[1];
            }
            if (scoreSheet.players.length >= 3) {
                scoreSheet.player3 = scoreSheet.players[2];
                scoreSheet.score3 = scoreSheet.scores[2];
            }
            if (scoreSheet.players.length >= 4) {
                scoreSheet.player4 = scoreSheet.players[3];
                scoreSheet.score4 = scoreSheet.scores[3];
            }
            if (scoreSheet.players.length >= 5) {
                scoreSheet.player5 = scoreSheet.players[4];
                scoreSheet.score5 = scoreSheet.scores[4];
            }
            if (scoreSheet.players.length >= 6) {
                scoreSheet.player6 = scoreSheet.players[5];
                scoreSheet.score6 = scoreSheet.scores[5];
            }
            if (scoreSheet.players.length >= 7) {
                scoreSheet.player7 = scoreSheet.players[6];
                scoreSheet.score7 = scoreSheet.scores[6];
            }

        }
    }

    private convertScoreSheetToApiCallFormat(scoreSheet: any) {
        delete scoreSheet.decorator;
        delete scoreSheet.player1;
        delete scoreSheet.score1;
        delete scoreSheet.player2;
        delete scoreSheet.score2;
        delete scoreSheet.player3;
        delete scoreSheet.score3;
        delete scoreSheet.player4;
        delete scoreSheet.score4;
        delete scoreSheet.player5;
        delete scoreSheet.score5;
        delete scoreSheet.player6;
        delete scoreSheet.score6;
        delete scoreSheet.player7;
        delete scoreSheet.score7;
    }


}

const controller = new Controller();

export default controller;
