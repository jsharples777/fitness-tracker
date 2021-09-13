import {Form} from "./ui-framework/form/Form";

//localStorage.debug = 'linked-controller api-ts exercise-types-view app controller-ts controller-ts-detail api-ts socket-ts user-search user-search-detail list-view-renderer';
localStorage.debug = 'collection-view-ts collection-view-ts-detail form-detail-view-renderer linked-controller linked-controller-detail exercise-types-view app validation-manager-rule-failure validation-manager';

import debug from 'debug';
debug.log = console.info.bind(console);

import Controller from './Controller';
import UserSearchView from "./component/view/UserSearchView";
import ChatLogsView from "./component/view/ChatLogsView";
import {API_Config, NAVIGATION, STATE_NAMES, VIEW_CONTAINER, VIEW_NAME} from "./AppTypes";
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
import {FormDetailViewRenderer} from "./ui-framework/view/delegate/FormDetailViewRenderer";
import {ObjectDefinitionRegistry} from "./model/ObjectDefinitionRegistry";
import {DataObjectDefinition} from "./model/DataObjectTypeDefs";
import {DetailViewRenderer} from "./ui-framework/view/interface/DetailViewRenderer";
import {DetailViewImplementation} from "./ui-framework/view/implementation/DetailViewImplementation";
import {DetailView} from "./ui-framework/view/interface/DetailView";
import {LinkedCollectionDetailController} from "./ui-framework/view/implementation/LinkedCollectionDetailController";


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

        /*
          Exercise Types - sidebar, list view and linked detail view
        */
        this.exerciseTypesSidebar = new ExerciseTypesSidebar();
        const exerciseTypes = new ExerciseTypesView();
        this.exerciseTypesSidebar.addView(exerciseTypes,{containerId:ExerciseTypesSidebar.SidebarContainers.container});

        const exerciseTypeDefinition:DataObjectDefinition|null = ObjectDefinitionRegistry.getInstance().findDefinition(STATE_NAMES.exerciseTypes);

        if (exerciseTypeDefinition) {
            let exerciseTypeDetailRenderer:FormDetailViewRenderer = new FormDetailViewRenderer(VIEW_CONTAINER.exerciseTypeDetail,exerciseTypeDefinition);

            let exerciseTypeDetailView:DetailView = new DetailViewImplementation(
                {
                    resultsContainerId: VIEW_CONTAINER.exerciseTypeDetail,
                    dataSourceId: VIEW_NAME.exerciseTypes
                },exerciseTypeDetailRenderer);
            let viewLinker:LinkedCollectionDetailController = new LinkedCollectionDetailController(STATE_NAMES.exerciseTypes,exerciseTypes);
            viewLinker.addLinkedDetailView(exerciseTypeDetailView);
            this.exerciseTypesSidebar.onDocumentLoaded();

            const detailForm:Form|null = exerciseTypeDetailRenderer.getForm();

            if (detailForm) {
                logger(`Setting up validation rules for ${detailForm.getId()}`);
                logger(detailForm);
                this.setupValidationForExerciseTypeDetailsForm(detailForm);
            }

        }



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

    }

    private setupValidationForExerciseTypeDetailsForm(form:Form) {
        let rule: ValidationRule = {
            targetDataFieldId: 'sets',
            response: ConditionResponse.show,
            conditions: [
                {
                    sourceDataFieldId: 'type',
                    comparison: ComparisonType.hasValue,
                    values:'cardio'
                }
            ]
        }
        ValidationManager.getInstance().addRuleToForm(form, rule);
        rule = {
            targetDataFieldId: 'reps',
            response: ConditionResponse.show,
            conditions: [
                {
                    sourceDataFieldId: 'type',
                    comparison: ComparisonType.hasValue,
                    values:'cardio'
                }
            ]
        }
        ValidationManager.getInstance().addRuleToForm(form, rule);
        rule = {
            targetDataFieldId: 'weight',
            response: ConditionResponse.show,
            conditions: [
                {
                    sourceDataFieldId: 'type',
                    comparison: ComparisonType.hasValue,
                    values:'cardio'
                }
            ]
        }
        ValidationManager.getInstance().addRuleToForm(form, rule);
        rule = {
            targetDataFieldId: 'reps',
            response: ConditionResponse.hide,
            conditions: [
                {
                    sourceDataFieldId: 'type',
                    comparison: ComparisonType.hasValue,
                    values:'strength'
                }
            ]
        }
        ValidationManager.getInstance().addRuleToForm(form, rule);
        rule = {
            targetDataFieldId: 'sets',
            response: ConditionResponse.hide,
            conditions: [
                {
                    sourceDataFieldId: 'type',
                    comparison: ComparisonType.hasValue,
                    values:'strength'
                }
            ]
        }

        ValidationManager.getInstance().addRuleToForm(form, rule);
        rule = {
            targetDataFieldId: 'weight',
            response: ConditionResponse.hide,
            conditions: [
                {
                    sourceDataFieldId: 'type',
                    comparison: ComparisonType.hasValue,
                    values:'strength'
                }
            ]
        }

        ValidationManager.getInstance().addRuleToForm(form, rule);
        rule = {
            targetDataFieldId: 'distance',
            response: ConditionResponse.show,
            conditions: [
                {
                    sourceDataFieldId: 'type',
                    comparison: ComparisonType.hasValue,
                    values: 'strength'
                }
            ]
        }
        ValidationManager.getInstance().addRuleToForm(form, rule);
        rule = {
            targetDataFieldId: 'distance',
            response: ConditionResponse.hide,
            conditions: [
                {
                    sourceDataFieldId: 'type',
                    comparison: ComparisonType.hasValue,
                    values: 'cardio'
                }
            ]
        }
        ValidationManager.getInstance().addRuleToForm(form, rule);
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


$(function() {
    const root = new Root();
    root.onDocumentLoad();
});