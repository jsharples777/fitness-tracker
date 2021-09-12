/* eslint "react/react-in-jsx-scope":"off" */
/* eslint "react/jsx-no-undef":"off" */
import debug from 'debug';

import Controller from './Controller';
import UserSearchView from "./component/view/UserSearchView";
import ChatLogsView from "./component/view/ChatLogsView";
import {API_Config, NAVIGATION} from "./AppTypes";
import {UnreadMessageCountListener} from "./socket/UnreadMessageCountListener";
import UserSearchSidebar from "./component/sidebar/UserSearchSidebar";
import ChatRoomsSidebar from "./component/sidebar/ChatRoomsSidebar";
import ExerciseTypesSidebar from "./component/sidebar/ExerciseTypesSidebar";
import ChatLogDetailView from "./component/view/ChatLogDetailView";
import FavouriteUserView from "./component/view/FavouriteUserView";
import BlockedUserView from "./component/view/BlockedUserView";
import {ExerciseTypesView} from "./component/view/ExerciseTypesView";


const logger = debug('app');

class Root implements UnreadMessageCountListener {

    // @ts-ignore
    private exerciseTypesSidebar: ExerciseTypesSidebar;
    // @ts-ignore
    private userSearchSidebar: UserSearchSidebar;
    // @ts-ignore
    private chatSidebar: ChatRoomsSidebar;
    // @ts-ignore
    private chatView: ChatLogsView;

    // @ts-ignore
    private thisEl: HTMLDivElement | null;
    // @ts-ignore
    private chatNavigationItem: HTMLAnchorElement | null;

    constructor() {
        // event handlers
        this.handleShowUserSearch = this.handleShowUserSearch.bind(this);
        this.handleShowExerciseTypes = this.handleShowExerciseTypes.bind(this);
        this.handleShowChat = this.handleShowChat.bind(this);

        Controller.getInstance().connectToApplication(this, window.localStorage);
    }

    getCurrentUser() {
        return Controller.getInstance().getLoggedInUserId();
    }

    onDocumentLoad() {
        logger('document loaded');

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

        this.exerciseTypesSidebar = new ExerciseTypesSidebar();
        const exerciseTypes = new ExerciseTypesView();
        this.exerciseTypesSidebar.addView(exerciseTypes,{containerId:ExerciseTypesSidebar.SidebarContainers.container});
        this.exerciseTypesSidebar.onDocumentLoaded();


        // navigation item handlers
        if (document) {
            // @ts-ignore
            document.getElementById(NAVIGATION.userSearchId).addEventListener('click', this.handleShowUserSearch);
            // @ts-ignore
            document.getElementById(NAVIGATION.exerciseTypesId).addEventListener('click', this.handleShowExerciseTypes);
            // @ts-ignore
            this.chatNavigationItem = document.getElementById(NAVIGATION.chatId);

            // @ts-ignore
            this.chatNavigationItem.addEventListener('click', this.handleShowChat);
            // @ts-ignore
            //document.getElementById(NAVIGATION.showMyWorkouts).addEventListener('click', this.handleShowWorkouts);
        }

        // a reference to the div containing ourselves
        // @ts-ignore
        this.thisEl = document.getElementById('root');

        Controller.getInstance().initialise();

        // // now lets break things with a new form
        // let dataObjDef: DataObjectDefinition = BasicObjectDefinitionFactory.getInstance().createBasicObjectDefinition("test", "Test", true, true);
        // let renderer = new FormDetailViewRenderer("testForm",dataObjDef);
        // let view = new DetailViewImplementation({},renderer);
        //
        // // create a test object
        // let dataObj = {
        //     email: 'jamie.sharples@gmail.com',
        //     float1: 3.1,
        //     float2: 2.3,
        //     checkbox: true,
        //     date: '20210910',
        //     time: '12:32',
        //     textarea: 'Test',
        //     select: 'jl',
        //     rbg: 'marvel'
        // };
        // // @ts-ignore
        // dataObj[FIELD_ID] = '2';
        // // @ts-ignore
        // dataObj[FIELD_CreatedOn] = '20201009000000';
        // // @ts-ignore
        // dataObj[FIELD_CreatedBy] = 'Jim';
        //
        // view.onDocumentLoaded();
        // const form = renderer.getForm();
        //
        //
        //
        // // change the select options
        // dataSource.addValueOption('X-Men', 'xmen');
        //
        // // add a simple validation rule to the two numbers
        // let rule: ValidationRule = {
        //     targetDataFieldId: 'float1',
        //     response: ConditionResponse.invalid,
        //     conditions: [
        //         {
        //             sourceDataFieldId: 'float2',
        //             comparison: ComparisonType.lessThanEqual,
        //         }
        //     ]
        // }
        // ValidationManager.getInstance().addRuleToForm(form, rule);
        // rule = {
        //     targetDataFieldId: 'select',
        //     response: ConditionResponse.hide,
        //     conditions: [
        //         {
        //             sourceDataFieldId: 'rbg',
        //             comparison: ComparisonType.hasValue,
        //             values: 'other'
        //         }
        //     ]
        // }
        // ValidationManager.getInstance().addRuleToForm(form, rule);
        // rule = {
        //     targetDataFieldId: 'select',
        //     response: ConditionResponse.show,
        //     conditions: [
        //         {
        //             sourceDataFieldId: 'rbg',
        //             comparison: ComparisonType.hasValue,
        //             values: 'jl,marvel'
        //         }
        //     ]
        // }
        // ValidationManager.getInstance().addRuleToForm(form, rule);
        // view.displayItem(dataObj);
        // view.show();

    }

    hideAllSideBars() {
        this.chatSidebar.eventHide(null);
        this.userSearchSidebar.eventHide(null);
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

    handleShowExerciseTypes(event: Event) {
        logger('Handling Show Exercise Types');
        event.preventDefault();
        //this.hideAllSideBars();
        // prevent anything from happening if we are not logged in
        if (!Controller.getInstance().isLoggedIn()) {
            // @ts-ignore
            window.location.href = API_Config.login;
            return;
        }
        this.exerciseTypesSidebar.eventShow(event);
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


    countChanged(newCount: number): void {
        //
        let buffer = 'Chat <i class="fas fa-inbox"></i>';
        if (newCount > 0) {
            buffer += ` <span class="badge badge-pill badge-primary">&nbsp;${newCount}&nbsp;</span>`;
        }
        if (this.chatNavigationItem) this.chatNavigationItem.innerHTML = `${buffer}`;
    }
}

//localStorage.debug = 'app controller-ts controller-ts-detail api-ts socket-ts abstract-form bootstrap-form-config-helper basic-form basic-form-detail chat-sidebar chat-sidebar:detail socket-listener notification-controller chat-manager board-game-search-sidebar board-game-search-sidebar:detail score-sheet-controller score-sheet-view score-sheet-sidebar score-sheet-sidebar:detail view-ts view-ts-detail user-search user-search-detail template-manager sidebar-container' ;
//localStorage.debug = 'basic-field-operations-generator basic-field-operations-renderer basic-field-operations-validator basic-field-operations-formatter' ;
//localStorage.debug = 'basic-form basic-form-detail validation-manager abstract-field';
localStorage.debug = 'app controller-ts controller-ts-detail api-ts socket-ts user-search user-search-detail list-view-renderer';
debug.log = console.info.bind(console);

$(function() {
    console.log("Hello")
    const root = new Root();
    root.onDocumentLoad();
});