import {Form} from "./ui-framework/form/Form";

//localStorage.debug = 'linked-controller api-ts exercise-types-view app controller-ts controller-ts-detail api-ts socket-ts user-search user-search-detail list-view-renderer';
//localStorage.debug = 'collection-view-ts collection-view-ts-detail form-detail-view-renderer linked-controller linked-controller-detail exercise-types-view app validation-manager-rule-failure validation-manager';
//localStorage.debug = 'validation-manager validation-manager-rule-failure abstract-form-detail-validation';
localStorage.debug = 'app api-ts';

import debug from 'debug';
debug.log = console.info.bind(console);

import Controller from './Controller';
import UserSearchView from "./component/view/UserSearchView";
import ChatLogsView from "./component/view/ChatLogsView";
import {API_Config, BUTTON, NAVIGATION, STATE_NAMES, VIEW_CONTAINER, VIEW_NAME} from "./AppTypes";
import {UnreadMessageCountListener} from "./socket/UnreadMessageCountListener";
import UserSearchSidebar from "./component/sidebar/UserSearchSidebar";
import ChatRoomsSidebar from "./component/sidebar/ChatRoomsSidebar";
import ExerciseTypesSidebar from "./component/sidebar/ExerciseTypesSidebar";
import ChatLogDetailView from "./component/view/ChatLogDetailView";
import FavouriteUserView from "./component/view/FavouriteUserView";
import BlockedUserView from "./component/view/BlockedUserView";
import {ExerciseTypesView} from "./component/view/ExerciseTypesView";
import {ComparisonType, ConditionResponse, ValidationRule} from "./ui-framework/form/validation/ValidationTypeDefs";
import {ValidationManager} from "./ui-framework/form/validation/ValidationManager";
import {FormDetailViewRenderer} from "./ui-framework/view/renderer/FormDetailViewRenderer";
import {ObjectDefinitionRegistry} from "./model/ObjectDefinitionRegistry";
import {DataObjectDefinition} from "./model/DataObjectTypeDefs";
import {DetailViewImplementation} from "./ui-framework/view/implementation/DetailViewImplementation";
import {DetailView} from "./ui-framework/view/interface/DetailView";
import {LinkedCollectionDetailController} from "./ui-framework/helper/LinkedCollectionDetailController";
import {BasicObjectDefinitionFactory} from "./model/BasicObjectDefinitionFactory";
import {CreatedByPermissionChecker} from "./CreatedByPermissionChecker";
import {WorkoutsView} from "./component/view/WorkoutsView";
import {ExerciseTypesCompositeView} from "./component/view/ExerciseTypesCompositeView";
import WorkoutSummarySidebar from "./component/sidebar/WorkoutSummarySidebar";
import {WorkoutSummaryView} from "./component/view/WorkoutSummaryView";
import CurrentWorkoutSidebar from "./component/sidebar/CurrentWorkoutSidebar";
import {CurrentWorkoutCompositeView} from "./component/view/CurrentWorkoutCompositeView";
import {v4} from "uuid";
import {StateManager} from "./state/StateManager";
import {WorkoutsViewUsingContext} from "./component/view/WorkoutsViewUsingContext";


const logger = debug('app');

export default class App implements UnreadMessageCountListener {

    private static _instance: App;

    public static getInstance(): App {
        if (!(App._instance)) {
            App._instance = new App();
        }
        return App._instance;
    }

    // @ts-ignore
    private exerciseTypesSidebar: ExerciseTypesSidebar;
    // @ts-ignore
    private userSearchSidebar: UserSearchSidebar;
    // @ts-ignore
    private chatSidebar: ChatRoomsSidebar;
    // @ts-ignore
    private workoutSummarySidebar: WorkoutSummarySidebar;
    // @ts-ignore
    private currentWorkoutSidebar: CurrentWorkoutSidebar;
    // @ts-ignore
    private currentWorkoutView: CurrentWorkoutCompositeView;
    // @ts-ignore
    private chatView: ChatLogsView;

    // @ts-ignore
    private thisEl: HTMLDivElement | null;
    // @ts-ignore
    private chatNavigationItem: HTMLAnchorElement | null;

    private constructor() {
        // event handlers
        this.handleShowUserSearch = this.handleShowUserSearch.bind(this);
        this.handleShowExerciseTypes = this.handleShowExerciseTypes.bind(this);
        this.handleShowChat = this.handleShowChat.bind(this);
        this.handleShowWorkoutSummary = this.handleShowWorkoutSummary.bind(this);
        this.handleShowCurrentWorkout = this.handleShowCurrentWorkout.bind(this);

        Controller.getInstance().connectToApplication(this, window.localStorage);
    }

    getCurrentUser() {
        return Controller.getInstance().getLoggedInUserId();
    }

    private setupNavigationItemHandling() {
        // @ts-ignore
        document.getElementById(NAVIGATION.userSearchId).addEventListener('click', this.handleShowUserSearch);
        // @ts-ignore
        document.getElementById(NAVIGATION.exerciseTypesId).addEventListener('click', this.handleShowExerciseTypes);
        // @ts-ignore
        document.getElementById(NAVIGATION.workoutSummary).addEventListener('click', this.handleShowWorkoutSummary);
        // @ts-ignore
        document.getElementById(NAVIGATION.currentWorkout).addEventListener('click', this.handleShowCurrentWorkout);
        // @ts-ignore
        this.chatNavigationItem = document.getElementById(NAVIGATION.chatId);

        // @ts-ignore
        this.chatNavigationItem.addEventListener('click', this.handleShowChat);
    }

    private setupUserSearchViews() {
        // add the subviews for the user search
        this.userSearchSidebar = new UserSearchSidebar();
        const recentSearches = new UserSearchView(Controller.getInstance().getStateManager());
        this.userSearchSidebar.addView(recentSearches, {containerId: UserSearchSidebar.SidebarContainers.recentSearches});
        const favouriteUsers = new FavouriteUserView(Controller.getInstance().getStateManager());
        this.userSearchSidebar.addView(favouriteUsers, {containerId: UserSearchSidebar.SidebarContainers.favourites});
        const blockedUsers = new BlockedUserView(Controller.getInstance().getStateManager());
        this.userSearchSidebar.addView(blockedUsers, {containerId: UserSearchSidebar.SidebarContainers.blocked});
        this.userSearchSidebar.onDocumentLoaded();
    }

    private setupChatViews() {
        // add the views to the chat side bar
        this.chatSidebar = new ChatRoomsSidebar();
        this.chatView = new ChatLogsView();
        this.chatSidebar.addView(this.chatView, {containerId: ChatRoomsSidebar.SidebarContainers.chatLogs});

        const chatLogView = new ChatLogDetailView(Controller.getInstance().getStateManager());
        this.chatSidebar.addView(chatLogView, {containerId: ChatRoomsSidebar.SidebarContainers.chatLog});
        this.chatView.addEventListener(chatLogView);
        this.chatSidebar.onDocumentLoaded();
    }

    onDocumentLoad() {
        logger('document loaded');
        // @ts-ignore
        this.thisEl = document.getElementById('root');

        this.setupUserSearchViews();
        this.setupChatViews();
        this.setupNavigationItemHandling();

        this.exerciseTypesSidebar = new ExerciseTypesSidebar();
        new ExerciseTypesCompositeView(this.exerciseTypesSidebar).onDocumentLoaded();

        //new WorkoutsView().onDocumentLoaded(); // carousel view
        new WorkoutsViewUsingContext().onDocumentLoaded();

        this.workoutSummarySidebar = new WorkoutSummarySidebar();
        this.workoutSummarySidebar.addView(new WorkoutSummaryView(),{containerId: WorkoutSummarySidebar.SidebarContainers.container});
        this.workoutSummarySidebar.onDocumentLoaded();

        this.currentWorkoutSidebar = new CurrentWorkoutSidebar();
        this.currentWorkoutView = new CurrentWorkoutCompositeView(this.currentWorkoutSidebar);
        this.currentWorkoutView.onDocumentLoaded();

        Controller.getInstance().initialise();

    }


    hideAllSideBars() {
        this.chatSidebar.eventHide(null);
        this.userSearchSidebar.eventHide(null);
        this.exerciseTypesSidebar.eventHide(null);
        this.currentWorkoutSidebar.eventHide(null);
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

    handleShowWorkoutSummary(event: Event) {
        logger('Handling Show Workout Summary');
        event.preventDefault();
        //this.hideAllSideBars();
        // prevent anything from happening if we are not logged in
        if (!Controller.getInstance().isLoggedIn()) {
            // @ts-ignore
            window.location.href = API_Config.login;
            return;
        }
        this.hideAllSideBars();
        this.workoutSummarySidebar.eventShow(event);
    }

    handleShowCurrentWorkout(event: Event) {
        logger('Handling Show Current Workout');
        event.preventDefault();
        //this.hideAllSideBars();
        // prevent anything from happening if we are not logged in
        if (!Controller.getInstance().isLoggedIn()) {
            // @ts-ignore
            window.location.href = API_Config.login;
            return;
        }
        this.currentWorkoutSidebar.eventShow(event);
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

    addingExerciseToCurrentWorkout(exerciseType:any) {
        this.exerciseTypesSidebar.eventHide(null);
        this.currentWorkoutSidebar.eventShow(null);
        this.currentWorkoutView.getStateManager().addNewItemToState(STATE_NAMES.exerciseTypes,exerciseType, false);
    }

    showCurrentWorkout() {
        this.currentWorkoutSidebar.eventShow(null);
    }
}


$(function() {
    App.getInstance().onDocumentLoad();
});