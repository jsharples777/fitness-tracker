/* eslint "react/react-in-jsx-scope":"off" */
/* eslint "react/jsx-no-undef":"off" */
import React from 'react';
import ReactDOM from 'react-dom';
import debug from 'debug';

import Controller from './Controller';
import UserSearchView from "./component/view/UserSearchView";
import ChatLogsView from "./component/view/ChatLogsView";
import BoardGameView from "./component/view/BoardGameView";
import {ALERT, API_Config, Decorator, DRAGGABLE, NAVIGATION} from "./AppTypes";
import browserUtil from "./util/BrowserUtil";
import {ScoreSheetController} from "./component/controller/ScoreSheetController";
import {ScoreSheetDetailView} from "./component/view/ScoreSheetDetailView";
import ScoreSheetsView from "./component/view/ScoreSheetsView";
import {UnreadMessageCountListener} from "./socket/UnreadMessageCountListener";
import UserSearchSidebar from "./component/sidebar/UserSearchSidebar";
import ChatRoomsSidebar from "./component/sidebar/ChatRoomsSidebar";
import ScoreSheetsSidebar from "./component/sidebar/ScoreSheetsSidebar";
import ChatLogDetailView from "./component/view/ChatLogDetailView";
import FavouriteUserView from "./component/view/FavouriteUserView";
import BlockedUserView from "./component/view/BlockedUserView";
import BoardGameSearchSidebar from "./component/sidebar/BoardGameSearchSidebar";
import BGGSearchView from "./component/view/BGGSearchView";
import {DRAGGABLE_KEY_ID, DRAGGABLE_TYPE} from "./ui-framework/ConfigurationTypes";
import {View} from "./ui-framework/view/interface/View";
import {DataObjectDefinition, FieldType} from "./ui-framework/form/DataObjectTypeDefs";
import {
    BasicObjectDefinitionFactory,
    FIELD_CreatedBy,
    FIELD_CreatedOn,
    FIELD_ID
} from "./model/BasicObjectDefinitionFactory";
import {SimpleValueDataSource} from "./ui-framework/helper/SimpleValueDataSource";
import {ComparisonType, ConditionResponse, ValidationRule} from "./ui-framework/form/validation/ValidationTypeDefs";
import {ValidationManager} from "./ui-framework/form/validation/ValidationManager";
import {DetailViewImplementation} from "./ui-framework/view/implementation/DetailViewImplementation";
import {FormDetailViewRenderer} from "./ui-framework/view/delegate/FormDetailViewRenderer";
import {ViewListener} from "./ui-framework/view/interface/ViewListener";
import {CollectionViewListener} from "./ui-framework/view/interface/CollectionViewListener";
import {CollectionView} from "./ui-framework/view/interface/CollectionView";


const logger = debug('app');

class Root extends React.Component implements UnreadMessageCountListener, CollectionViewListener {
    private titleEl: any;
    private contentEl: any;
    private modalEl: any;

    // @ts-ignore
    private userSearchSidebar: UserSearchSidebar;
    // @ts-ignore
    private bggSearchSidebar: BoardGameSearchSidebar;
    // @ts-ignore
    private chatSidebar: ChatRoomsSidebar;
    // @ts-ignore
    private scoreSheetSidebar: ScoreSheetsSidebar;
    // @ts-ignore
    private scoresView: ScoreSheetsView;
    // @ts-ignore
    private chatView: ChatLogsView;

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
            boardGames: [],
        };
        // event handlers
        this.cancelDelete = this.cancelDelete.bind(this);
        this.confirmDelete = this.confirmDelete.bind(this);
        this.handleDeleteBoardGame = this.handleDeleteBoardGame.bind(this);

        this.handleShowUserSearch = this.handleShowUserSearch.bind(this);
        this.handleShowChat = this.handleShowChat.bind(this);
        this.handleShowBGGSearch = this.handleShowBGGSearch.bind(this);

        this.handleDrop = this.handleDrop.bind(this);

        this.handleShowCollection = this.handleShowCollection.bind(this);
        this.handleShowScoreSheet = this.handleShowScoreSheet.bind(this);
        this.handleStartScoreSheet = this.handleStartScoreSheet.bind(this);
        this.handleShowScores = this.handleShowScores.bind(this);

        Controller.getInstance().connectToApplication(this, window.localStorage);
    }

    public addBoardGameToDisplay(draggedObject: any) {
        // ok, we are just the dumb view, pass this onto the controller to work out the logic for us
        Controller.getInstance().addBoardGameToDisplay(draggedObject);
    }

    getCurrentUser() {
        return Controller.getInstance().getLoggedInUserId();
    }

    alert(title: string, content: string) {
        this.titleEl.textContent = title;
        this.contentEl.textContent = content;
        // @ts-ignore
        this.modalEl.classList.remove(ALERT.hideClass);
        // @ts-ignore
        this.modalEl.classList.add(ALERT.showClass);
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
                addToCollectionHandler={Controller.getInstance().addBoardGameToCollection}
                removeFromCollectionHandler={this.handleDeleteBoardGame}
                startScoreSheetHandler={this.handleStartScoreSheet}
            />
        );

        return (
            <div className="root container-fluid">
                <div className="card-group">

                </div>
            </div>
        );
    }

    cancelDelete(event: MouseEvent) {
        // @ts-ignore
        this.modalEl.classList.remove(ALERT.showClass);
        // @ts-ignore
        this.modalEl.classList.add(ALERT.hideClass);
        event.preventDefault();
    }

    confirmDelete(event: MouseEvent) {
        // @ts-ignore
        this.modalEl.classList.remove(ALERT.showClass);
        // @ts-ignore
        this.modalEl.classList.add(ALERT.hideClass);
        event.preventDefault();
        let id = this.modalEl.getAttribute(Controller.eventDataKeyId);
        id = parseInt(id);
        logger(`Handling Delete with id ${id}`);
        // @ts-ignore
        const currentBoardGamesOnDisplay = this.state.boardGames;
        let index = currentBoardGamesOnDisplay.findIndex((game: any) => game.gameId === id);
        if (index >= 0) {
            const boardGame = currentBoardGamesOnDisplay[index];
            Controller.getInstance().removeBoardGameFromCollection(boardGame);
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
        let id = event.target.getAttribute(Controller.eventDataKeyId);
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
        let id = event.target.getAttribute(Controller.eventDataKeyId);
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
                    if (Controller.getInstance().isLoggedIn()) {
                        // @ts-ignore
                        this.modalEl.setAttribute(Controller.eventDataKeyId, id);
                        this.alert(`${boardGame.name} (${boardGame.year})`, "Are you sure you want to delete this board game from your collection?");
                    } else {
                        logger(`Handling Delete Board Game ${id} - IS persisted but not logged in, just deleting from local storage  asking controller to remove`);
                        // not persisted yet, let the controller manage this one
                        Controller.getInstance().removeBoardGameFromDisplay(boardGame);

                    }
                } else {
                    logger(`Handling Delete Board Game ${id} - NOT persisted, asking controller to remove`);
                    // not persisted yet, let the controller manage this one
                    Controller.getInstance().removeBoardGameFromDisplay(boardGame);
                }
            }
        }
    }

    async componentDidMount() {
        logger('component Did Mount');


        this.chatSidebar = new ChatRoomsSidebar();
        // add the views to the chat side bar
        this.chatView = new ChatLogsView();
        this.chatSidebar.addView(this.chatView, {containerId: ChatRoomsSidebar.SidebarContainers.chatLogs});

        const chatLogView = new ChatLogDetailView(Controller.getInstance().getStateManager());
        this.chatSidebar.addView(chatLogView, {containerId: ChatRoomsSidebar.SidebarContainers.chatLog});
        this.chatView.addEventListener(chatLogView);

        this.chatSidebar.onDocumentLoaded();


        this.userSearchSidebar = new UserSearchSidebar();
        // add the subviews for the user search
        const recentSearches = new UserSearchView(Controller.getInstance().getStateManager());
        this.userSearchSidebar.addView(recentSearches, {containerId: UserSearchSidebar.SidebarContainers.recentSearches});
        const favouriteUsers = new FavouriteUserView(Controller.getInstance().getStateManager());
        this.userSearchSidebar.addView(favouriteUsers, {containerId: UserSearchSidebar.SidebarContainers.favourites});
        const blockedUsers = new BlockedUserView(Controller.getInstance().getStateManager());
        this.userSearchSidebar.addView(blockedUsers, {containerId: UserSearchSidebar.SidebarContainers.blocked});
        this.userSearchSidebar.onDocumentLoaded();


        this.bggSearchSidebar = new BoardGameSearchSidebar();
        const bggSearch = new BGGSearchView();
        this.bggSearchSidebar.addView(bggSearch, {containerId: BoardGameSearchSidebar.bggSearchResults})
        this.bggSearchSidebar.onDocumentLoaded();
        bggSearch.addEventListener(this);

        this.scoreSheetSidebar = new ScoreSheetsSidebar();
        this.scoresView = new ScoreSheetsView();
        this.scoreSheetSidebar.addView(this.scoresView, {containerId: ScoreSheetsSidebar.scoreSheets});
        this.scoreSheetSidebar.onDocumentLoaded();


        ScoreSheetDetailView.getInstance().onDocumentLoaded();
        // navigation item handlers
        if (document) {
            // @ts-ignore
            document.getElementById(NAVIGATION.boardGameSearchId).addEventListener('click', this.handleShowBGGSearch);
            // @ts-ignore
            document.getElementById(NAVIGATION.userSearchId).addEventListener('click', this.handleShowUserSearch);
            // @ts-ignore
            this.chatNavigationItem = document.getElementById(NAVIGATION.chatId);

            // @ts-ignore
            this.chatNavigationItem.addEventListener('click', this.handleShowChat);
            // @ts-ignore
            document.getElementById(NAVIGATION.showMyCollection).addEventListener('click', this.handleShowCollection);
            // @ts-ignore
            document.getElementById(NAVIGATION.showScoreSheet).addEventListener('click', this.handleShowScoreSheet);
        }

        // alert modal dialog setup
        // @ts-ignore
        this.modalEl = document.getElementById(ALERT.modalId);
        // @ts-ignore
        this.titleEl = document.getElementById(ALERT.titleId);
        // @ts-ignore
        this.contentEl = document.getElementById(ALERT.contentId);
        // @ts-ignore
        this.cancelBtnEl = document.getElementById(ALERT.cancelButtonId);
        // @ts-ignore
        this.confirmBtnEl = document.getElementById(ALERT.confirmButtonId);
        // @ts-ignore
        this.closeBtnEl = document.getElementById(ALERT.closeButtonId);

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
            this.thisEl.addEventListener('dragover', (event) => {
                event.preventDefault();
            });
            this.thisEl.addEventListener('drop', this.handleDrop);
        }

        // ok lets try get things done
        ScoreSheetController.getInstance().initialise(this);
        Controller.getInstance().initialise();

        // now lets break things with a new form
        let dataObjDef: DataObjectDefinition = BasicObjectDefinitionFactory.getInstance().createBasicObjectDefinition("test", "Test", true, true);
        BasicObjectDefinitionFactory.getInstance().addStringFieldToObjDefinition(dataObjDef, "email", "Email", FieldType.email, true, "We totally won't message with this...");
        BasicObjectDefinitionFactory.getInstance().addStringFieldToObjDefinition(dataObjDef, "float1", "Float", FieldType.float, true, "A number yo....");
        BasicObjectDefinitionFactory.getInstance().addStringFieldToObjDefinition(dataObjDef, "float2", "Float2", FieldType.float, true, "A number 2");
        BasicObjectDefinitionFactory.getInstance().addStringFieldToObjDefinition(dataObjDef, "checkbox", "Checkbox?", FieldType.boolean, true, "Yes or No?");
        BasicObjectDefinitionFactory.getInstance().addStringFieldToObjDefinition(dataObjDef, "date", "Date", FieldType.date, true, "Date yep");
        BasicObjectDefinitionFactory.getInstance().addStringFieldToObjDefinition(dataObjDef, "time", "Time", FieldType.shortTime, true, "How long till we get there?");
        BasicObjectDefinitionFactory.getInstance().addStringFieldToObjDefinition(dataObjDef, "textarea", "TextArea", FieldType.largeText, true, "An essay");

        let dataSource: SimpleValueDataSource = new SimpleValueDataSource([
            {name: ' ', value: ' '},
            {name: 'Justice League', value: 'jl'},
            {name: 'Marvel', value: 'marvel'},
            {name: 'Other', value: 'other'},

        ]);
        BasicObjectDefinitionFactory.getInstance().addStringFieldToObjDefinition(dataObjDef, "select", "Select", FieldType.choice, true, "Some choices", dataSource);
        BasicObjectDefinitionFactory.getInstance().addStringFieldToObjDefinition(dataObjDef, "rbg", "RBG", FieldType.limitedChoice, true, "Some similar choices",
            new SimpleValueDataSource([
                {name: 'Justice League', value: 'jl'},
                {name: 'Marvel', value: 'marvel'},
                {name: 'Other', value: 'other'},

            ]));
        // okay lets make a form
        let renderer = new FormDetailViewRenderer("testForm",dataObjDef);
        let view = new DetailViewImplementation({},renderer);

        // create a test object
        let dataObj = {
            email: 'jamie.sharples@gmail.com',
            float1: 3.1,
            float2: 2.3,
            checkbox: true,
            date: '20210910',
            time: '12:32',
            textarea: 'Test',
            select: 'jl',
            rbg: 'marvel'
        };
        // @ts-ignore
        dataObj[FIELD_ID] = '2';
        // @ts-ignore
        dataObj[FIELD_CreatedOn] = '20201009000000';
        // @ts-ignore
        dataObj[FIELD_CreatedBy] = 'Jim';

        view.onDocumentLoaded();
        const form = renderer.getForm();



        // change the select options
        dataSource.addValueOption('X-Men', 'xmen');

        // add a simple validation rule to the two numbers
        let rule: ValidationRule = {
            targetDataFieldId: 'float1',
            response: ConditionResponse.invalid,
            conditions: [
                {
                    sourceDataFieldId: 'float2',
                    comparison: ComparisonType.lessThanEqual,
                }
            ]
        }
        ValidationManager.getInstance().addRuleToForm(form, rule);
        rule = {
            targetDataFieldId: 'select',
            response: ConditionResponse.hide,
            conditions: [
                {
                    sourceDataFieldId: 'rbg',
                    comparison: ComparisonType.hasValue,
                    values: 'other'
                }
            ]
        }
        ValidationManager.getInstance().addRuleToForm(form, rule);
        rule = {
            targetDataFieldId: 'select',
            response: ConditionResponse.show,
            conditions: [
                {
                    sourceDataFieldId: 'rbg',
                    comparison: ComparisonType.hasValue,
                    values: 'jl,marvel'
                }
            ]
        }
        ValidationManager.getInstance().addRuleToForm(form, rule);
        view.displayItem(dataObj);
        view.show();

    }

    hideAllSideBars() {
        this.chatSidebar.eventHide(null);
        this.userSearchSidebar.eventHide(null);
        this.bggSearchSidebar.eventHide(null);
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
        if (!Controller.getInstance().isLoggedIn()) {
            // @ts-ignore
            window.location.href = API_Config.login;
            return;
        }
        this.userSearchSidebar.eventShow(event);
    }

    handleShowScores(event: Event) {
        logger(`Handling show board game scores`);
        event.preventDefault();
        // @ts-ignore
        let id = event.target.getAttribute(Controller.eventDataKeyId);
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
                this.scoreSheetSidebar.eventShow(null);
            }
        }
    }

    handleShowChat(roomName: string | null) {
        logger('Handling Show Chat');
        //event.preventDefault();
        //this.hideAllSideBars();
        // prevent anything from happening if we are not logged in
        if (!Controller.getInstance().isLoggedIn()) {
            // @ts-ignore
            window.location.href = API_Config.login;
            return;
        }
        this.chatSidebar.eventShow(null);
        if (roomName) {
            this.chatView.selectChatRoom(roomName);
        }
    }

    handleShowBGGSearch(event: Event) {
        logger('Handling Show BGG Search View');
        event.preventDefault();
        // prevent anything from happening if we are not logged in
        if (!Controller.getInstance().isLoggedIn()) {
            this.hideAllSideBars();
            // @ts-ignore
        }
        this.bggSearchSidebar.eventShow(event);
    }

    countChanged(newCount: number): void {
        //
        let buffer = 'Chat <i class="fas fa-inbox"></i>';
        if (newCount > 0) {
            buffer += ` <span class="badge badge-pill badge-primary">&nbsp;${newCount}&nbsp;</span>`;
        }
        if (this.chatNavigationItem) this.chatNavigationItem.innerHTML = `${buffer}`;
    }

    private handleDrop(event: Event) {
        // @ts-ignore
        const draggedObjectJSON = event.dataTransfer.getData(DRAGGABLE_KEY_ID);
        logger(draggedObjectJSON);
        const draggedObject = JSON.parse(draggedObjectJSON);
        logger(draggedObject);
        // @ts-ignore
        if (draggedObject[DRAGGABLE_TYPE] === DRAGGABLE.typeBoardGame) {
            draggedObject.gameId = parseInt(draggedObject.gameId);
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

    documentLoaded(view: View): void {
    }

    hideRequested(view: View): void {
    }

    showRequested(view: View): void {
    }

    itemAction(view: View, actionName: string, selectedItem: any): void {
    }

    canDeleteItem(view: View, selectedItem: any): boolean {
        return true;
    }

    itemDeleted(view: View, selectedItem: any): void {
    }

    itemDeselected(view: View, selectedItem: any): void {
    }

    itemDragStarted(view: View, selectedItem: any): void {
    }

    itemDropped(view: View, droppedItem: any): void {
    }

    itemSelected(view: View, selectedItem: any): void {
        // add a new board game to the display
        selectedItem.gameId = parseInt(selectedItem.gameId);
        this.addBoardGameToDisplay(selectedItem);
    }

    canSelectItem(view: CollectionView, selectedItem: any): boolean {
        return true;
    }


}

//localStorage.debug = 'app controller-ts controller-ts-detail api-ts socket-ts abstract-form bootstrap-form-config-helper basic-form basic-form-detail chat-sidebar chat-sidebar:detail socket-listener notification-controller chat-manager board-game-search-sidebar board-game-search-sidebar:detail score-sheet-controller score-sheet-view score-sheet-sidebar score-sheet-sidebar:detail view-ts view-ts-detail user-search user-search-detail template-manager sidebar-container' ;
//localStorage.debug = 'basic-field-operations-generator basic-field-operations-renderer basic-field-operations-validator basic-field-operations-formatter' ;
//localStorage.debug = 'basic-form basic-form-detail validation-manager abstract-field';
localStorage.debug = 'validation-manager-rule-failure abstract-form';
debug.log = console.info.bind(console);

// @ts-ignore
const element = <Root className="container-fluid justify-content-around"/>;

ReactDOM.render(element, document.getElementById('root'));
