//localStorage.debug = 'linked-controller api-ts exercise-types-view app controller-ts controller-ts-detail api-ts socket-ts user-search user-search-detail list-view-renderer';
//localStorage.debug = 'collection-view-ts collection-view-ts-detail form-detail-view-renderer linked-controller linked-controller-detail exercise-types-view app validation-manager-rule-failure validation-manager';
//localStorage.debug = 'validation-manager validation-manager-rule-failure abstract-form-detail-validation';


import debug from 'debug';

import Controller from './Controller';
import {API_Config, NAVIGATION, STATE_NAMES} from "./AppTypes";
import ExerciseTypesSidebar from "./component/sidebar/ExerciseTypesSidebar";
import {ExerciseTypesCompositeView} from "./component/view/ExerciseTypesCompositeView";
import WorkoutSummarySidebar from "./component/sidebar/WorkoutSummarySidebar";
import {WorkoutSummaryView} from "./component/view/WorkoutSummaryView";
import CurrentWorkoutSidebar from "./component/sidebar/CurrentWorkoutSidebar";
import {CurrentWorkoutCompositeView} from "./component/view/CurrentWorkoutCompositeView";
import {WorkoutsViewUsingContext} from "./component/view/WorkoutsViewUsingContext";
import {
    ChatLogsView,
    ChatRoomsSidebar,
    ContextualInformationHelper,
    UnreadMessageCountListener,
    UserSearchSidebar
} from "ui-framework-jps";


const logger = debug('app');

export default class App implements UnreadMessageCountListener {

    private static _instance: App;
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

    public static getInstance(): App {
        if (!(App._instance)) {
            App._instance = new App();
        }
        return App._instance;
    }

    getCurrentUser() {
        return Controller.getInstance().getLoggedInUserId();
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
        const workoutsView = new WorkoutsViewUsingContext();
        workoutsView.onDocumentLoaded();
        workoutsView.show();

        this.workoutSummarySidebar = new WorkoutSummarySidebar();
        this.workoutSummarySidebar.addView(new WorkoutSummaryView(), {containerId: WorkoutSummarySidebar.SidebarContainers.container});
        this.workoutSummarySidebar.onDocumentLoaded();

        this.currentWorkoutSidebar = new CurrentWorkoutSidebar();
        this.currentWorkoutView = new CurrentWorkoutCompositeView(this.currentWorkoutSidebar);
        this.currentWorkoutView.onDocumentLoaded();


        ContextualInformationHelper.getInstance().onDocumentLoaded();
        Controller.getInstance().onDocumentLoaded();

    }

    hideAllSideBars() {
        this.chatSidebar.hide();
        this.userSearchSidebar.hide();
        this.exerciseTypesSidebar.hide();
        this.currentWorkoutSidebar.hide();
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
        this.userSearchSidebar.show();
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
        this.workoutSummarySidebar.show();
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
        this.currentWorkoutSidebar.show();
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
        this.exerciseTypesSidebar.show();
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
        this.chatSidebar.show();
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

    addingExerciseToCurrentWorkout(exerciseType: any) {
        //this.exerciseTypesSidebar.eventHide(null);
        this.currentWorkoutSidebar.show();
        this.currentWorkoutView.getStateManager().addNewItemToState(STATE_NAMES.exercises, exerciseType, false);
    }

    showCurrentWorkout() {
        this.currentWorkoutSidebar.show();
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
        this.userSearchSidebar = UserSearchSidebar.getInstance(Controller.getInstance().getStateManager());
        this.userSearchSidebar.onDocumentLoaded();
    }

    private setupChatViews() {
        // add the views to the chat side bar
        this.chatSidebar = ChatRoomsSidebar.getInstance(Controller.getInstance().getStateManager());
        this.chatSidebar.onDocumentLoaded();
    }
}

/*
const flogger = debug('validation-manager-rule-failure');
const erLogger = debug('validation-manager-execute-rule');
const merLogger = debug('validation-manager-multiple-condition-rule-results');
 */
$(function () {
    localStorage.debug = 'api-ts-results controller-ts current-workout-composite-view validation-manager-rule-failure validation-manager-execute-rule validation-manager-multiple-condition-rule-results';
    debug.log = console.info.bind(console);
    App.getInstance().onDocumentLoad();
});
