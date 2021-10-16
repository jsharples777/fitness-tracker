/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/App.ts":
/*!********************!*\
  !*** ./src/App.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ App)
/* harmony export */ });
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Controller */ "./src/Controller.ts");
/* harmony import */ var _AppTypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AppTypes */ "./src/AppTypes.ts");
/* harmony import */ var _component_sidebar_ExerciseTypesSidebar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./component/sidebar/ExerciseTypesSidebar */ "./src/component/sidebar/ExerciseTypesSidebar.ts");
/* harmony import */ var _component_view_ExerciseTypesCompositeView__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./component/view/ExerciseTypesCompositeView */ "./src/component/view/ExerciseTypesCompositeView.ts");
/* harmony import */ var _component_sidebar_WorkoutSummarySidebar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./component/sidebar/WorkoutSummarySidebar */ "./src/component/sidebar/WorkoutSummarySidebar.ts");
/* harmony import */ var _component_view_WorkoutSummaryView__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./component/view/WorkoutSummaryView */ "./src/component/view/WorkoutSummaryView.ts");
/* harmony import */ var _component_sidebar_CurrentWorkoutSidebar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./component/sidebar/CurrentWorkoutSidebar */ "./src/component/sidebar/CurrentWorkoutSidebar.ts");
/* harmony import */ var _component_view_CurrentWorkoutCompositeView__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./component/view/CurrentWorkoutCompositeView */ "./src/component/view/CurrentWorkoutCompositeView.ts");
/* harmony import */ var _component_view_WorkoutsViewUsingContext__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./component/view/WorkoutsViewUsingContext */ "./src/component/view/WorkoutsViewUsingContext.ts");
/* harmony import */ var _framework_ui_context_ContextualInformationHelper__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./framework/ui/context/ContextualInformationHelper */ "./src/framework/ui/context/ContextualInformationHelper.ts");
/* harmony import */ var _framework_ui_chat_ChatRoomsSidebar__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./framework/ui/chat/ChatRoomsSidebar */ "./src/framework/ui/chat/ChatRoomsSidebar.ts");
/* harmony import */ var _framework_ui_chat_UserSearchSidebar__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./framework/ui/chat/UserSearchSidebar */ "./src/framework/ui/chat/UserSearchSidebar.ts");
//localStorage.debug = 'linked-controller api-ts exercise-types-view app controller-ts controller-ts-detail api-ts socket-ts user-search user-search-detail list-view-renderer';
//localStorage.debug = 'collection-view-ts collection-view-ts-detail form-detail-view-renderer linked-controller linked-controller-detail exercise-types-view app validation-manager-rule-failure validation-manager';
//localStorage.debug = 'validation-manager validation-manager-rule-failure abstract-form-detail-validation';













const logger = debug__WEBPACK_IMPORTED_MODULE_0___default()('app');
class App {
  static getInstance() {
    if (!App._instance) {
      App._instance = new App();
    }

    return App._instance;
  } // @ts-ignore


  constructor() {
    // event handlers
    this.handleShowUserSearch = this.handleShowUserSearch.bind(this);
    this.handleShowExerciseTypes = this.handleShowExerciseTypes.bind(this);
    this.handleShowChat = this.handleShowChat.bind(this);
    this.handleShowWorkoutSummary = this.handleShowWorkoutSummary.bind(this);
    this.handleShowCurrentWorkout = this.handleShowCurrentWorkout.bind(this);
    _Controller__WEBPACK_IMPORTED_MODULE_1__["default"].getInstance().connectToApplication(this, window.localStorage);
  }

  getCurrentUser() {
    return _Controller__WEBPACK_IMPORTED_MODULE_1__["default"].getInstance().getLoggedInUserId();
  }

  setupNavigationItemHandling() {
    // @ts-ignore
    document.getElementById(_AppTypes__WEBPACK_IMPORTED_MODULE_2__.NAVIGATION.userSearchId).addEventListener('click', this.handleShowUserSearch); // @ts-ignore

    document.getElementById(_AppTypes__WEBPACK_IMPORTED_MODULE_2__.NAVIGATION.exerciseTypesId).addEventListener('click', this.handleShowExerciseTypes); // @ts-ignore

    document.getElementById(_AppTypes__WEBPACK_IMPORTED_MODULE_2__.NAVIGATION.workoutSummary).addEventListener('click', this.handleShowWorkoutSummary); // @ts-ignore

    document.getElementById(_AppTypes__WEBPACK_IMPORTED_MODULE_2__.NAVIGATION.currentWorkout).addEventListener('click', this.handleShowCurrentWorkout); // @ts-ignore

    this.chatNavigationItem = document.getElementById(_AppTypes__WEBPACK_IMPORTED_MODULE_2__.NAVIGATION.chatId); // @ts-ignore

    this.chatNavigationItem.addEventListener('click', this.handleShowChat);
  }

  setupUserSearchViews() {
    // add the subviews for the user search
    this.userSearchSidebar = _framework_ui_chat_UserSearchSidebar__WEBPACK_IMPORTED_MODULE_12__.UserSearchSidebar.getInstance(_Controller__WEBPACK_IMPORTED_MODULE_1__["default"].getInstance().getStateManager());
    this.userSearchSidebar.onDocumentLoaded();
  }

  setupChatViews() {
    // add the views to the chat side bar
    this.chatSidebar = _framework_ui_chat_ChatRoomsSidebar__WEBPACK_IMPORTED_MODULE_11__.ChatRoomsSidebar.getInstance(_Controller__WEBPACK_IMPORTED_MODULE_1__["default"].getInstance().getStateManager());
    this.chatSidebar.onDocumentLoaded();
  }

  onDocumentLoad() {
    logger('document loaded'); // @ts-ignore

    this.thisEl = document.getElementById('root');
    this.setupUserSearchViews();
    this.setupChatViews();
    this.setupNavigationItemHandling();
    this.exerciseTypesSidebar = new _component_sidebar_ExerciseTypesSidebar__WEBPACK_IMPORTED_MODULE_3__["default"]();
    new _component_view_ExerciseTypesCompositeView__WEBPACK_IMPORTED_MODULE_4__.ExerciseTypesCompositeView(this.exerciseTypesSidebar).onDocumentLoaded(); //new WorkoutsView().onDocumentLoaded(); // carousel view

    new _component_view_WorkoutsViewUsingContext__WEBPACK_IMPORTED_MODULE_9__.WorkoutsViewUsingContext().onDocumentLoaded();
    this.workoutSummarySidebar = new _component_sidebar_WorkoutSummarySidebar__WEBPACK_IMPORTED_MODULE_5__["default"]();
    this.workoutSummarySidebar.addView(new _component_view_WorkoutSummaryView__WEBPACK_IMPORTED_MODULE_6__.WorkoutSummaryView(), {
      containerId: _component_sidebar_WorkoutSummarySidebar__WEBPACK_IMPORTED_MODULE_5__["default"].SidebarContainers.container
    });
    this.workoutSummarySidebar.onDocumentLoaded();
    this.currentWorkoutSidebar = new _component_sidebar_CurrentWorkoutSidebar__WEBPACK_IMPORTED_MODULE_7__["default"]();
    this.currentWorkoutView = new _component_view_CurrentWorkoutCompositeView__WEBPACK_IMPORTED_MODULE_8__.CurrentWorkoutCompositeView(this.currentWorkoutSidebar);
    this.currentWorkoutView.onDocumentLoaded();
    _framework_ui_context_ContextualInformationHelper__WEBPACK_IMPORTED_MODULE_10__.ContextualInformationHelper.getInstance().onDocumentLoaded();
    _Controller__WEBPACK_IMPORTED_MODULE_1__["default"].getInstance().onDocumentLoaded();
  }

  hideAllSideBars() {
    this.chatSidebar.eventHide(null);
    this.userSearchSidebar.eventHide(null);
    this.exerciseTypesSidebar.eventHide(null);
    this.currentWorkoutSidebar.eventHide(null);
  }

  handleShowUserSearch(event) {
    logger('Handling Show User Search');
    event.preventDefault(); //this.hideAllSideBars();
    // prevent anything from happening if we are not logged in

    if (!_Controller__WEBPACK_IMPORTED_MODULE_1__["default"].getInstance().isLoggedIn()) {
      // @ts-ignore
      window.location.href = _AppTypes__WEBPACK_IMPORTED_MODULE_2__.API_Config.login;
      return;
    }

    this.userSearchSidebar.eventShow(event);
  }

  handleShowWorkoutSummary(event) {
    logger('Handling Show Workout Summary');
    event.preventDefault(); //this.hideAllSideBars();
    // prevent anything from happening if we are not logged in

    if (!_Controller__WEBPACK_IMPORTED_MODULE_1__["default"].getInstance().isLoggedIn()) {
      // @ts-ignore
      window.location.href = _AppTypes__WEBPACK_IMPORTED_MODULE_2__.API_Config.login;
      return;
    }

    this.hideAllSideBars();
    this.workoutSummarySidebar.eventShow(event);
  }

  handleShowCurrentWorkout(event) {
    logger('Handling Show Current Workout');
    event.preventDefault(); //this.hideAllSideBars();
    // prevent anything from happening if we are not logged in

    if (!_Controller__WEBPACK_IMPORTED_MODULE_1__["default"].getInstance().isLoggedIn()) {
      // @ts-ignore
      window.location.href = _AppTypes__WEBPACK_IMPORTED_MODULE_2__.API_Config.login;
      return;
    }

    this.currentWorkoutSidebar.eventShow(event);
  }

  handleShowExerciseTypes(event) {
    logger('Handling Show Exercise Types');
    event.preventDefault(); //this.hideAllSideBars();
    // prevent anything from happening if we are not logged in

    if (!_Controller__WEBPACK_IMPORTED_MODULE_1__["default"].getInstance().isLoggedIn()) {
      // @ts-ignore
      window.location.href = _AppTypes__WEBPACK_IMPORTED_MODULE_2__.API_Config.login;
      return;
    }

    this.exerciseTypesSidebar.eventShow(event);
  }

  handleShowChat(roomName) {
    logger('Handling Show Chat'); //event.preventDefault();
    //this.hideAllSideBars();
    // prevent anything from happening if we are not logged in

    if (!_Controller__WEBPACK_IMPORTED_MODULE_1__["default"].getInstance().isLoggedIn()) {
      // @ts-ignore
      window.location.href = _AppTypes__WEBPACK_IMPORTED_MODULE_2__.API_Config.login;
      return;
    }

    this.chatSidebar.eventShow(null);

    if (roomName) {
      this.chatView.selectChatRoom(roomName);
    }
  }

  countChanged(newCount) {
    //
    let buffer = 'Chat <i class="fas fa-inbox"></i>';

    if (newCount > 0) {
      buffer += ` <span class="badge badge-pill badge-primary">&nbsp;${newCount}&nbsp;</span>`;
    }

    if (this.chatNavigationItem) this.chatNavigationItem.innerHTML = `${buffer}`;
  }

  addingExerciseToCurrentWorkout(exerciseType) {
    //this.exerciseTypesSidebar.eventHide(null);
    this.currentWorkoutSidebar.eventShow(null);
    this.currentWorkoutView.getStateManager().addNewItemToState(_AppTypes__WEBPACK_IMPORTED_MODULE_2__.STATE_NAMES.exerciseTypes, exerciseType, false);
  }

  showCurrentWorkout() {
    this.currentWorkoutSidebar.eventShow(null);
  }

}
$(function () {
  //localStorage.debug = 'abstract-field validation-manager validation-manager-rule-failure';
  localStorage.debug = 'api-ts validation-manager-execute-rule validation-manager-rule-failure';
  (debug__WEBPACK_IMPORTED_MODULE_0___default().log) = console.info.bind(console);
  App.getInstance().onDocumentLoad();
});

/***/ }),

/***/ "./src/AppTypes.ts":
/*!*************************!*\
  !*** ./src/AppTypes.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Decorator": () => (/* binding */ Decorator),
/* harmony export */   "STATE_NAMES": () => (/* binding */ STATE_NAMES),
/* harmony export */   "API_Config": () => (/* binding */ API_Config),
/* harmony export */   "NAVIGATION": () => (/* binding */ NAVIGATION),
/* harmony export */   "DRAGGABLE": () => (/* binding */ DRAGGABLE),
/* harmony export */   "VIEW_NAME": () => (/* binding */ VIEW_NAME),
/* harmony export */   "VIEW_CONTAINER": () => (/* binding */ VIEW_CONTAINER),
/* harmony export */   "BUTTON": () => (/* binding */ BUTTON),
/* harmony export */   "INPUT": () => (/* binding */ INPUT)
/* harmony export */ });
let Decorator;

(function (Decorator) {
  Decorator[Decorator["Incomplete"] = 0] = "Incomplete";
  Decorator[Decorator["Complete"] = 1] = "Complete";
  Decorator[Decorator["Persisted"] = 2] = "Persisted";
  Decorator[Decorator["PersistedLocally"] = 3] = "PersistedLocally";
})(Decorator || (Decorator = {}));

const STATE_NAMES = {
  users: 'user',
  chatLogs: 'chatLog',
  exerciseTypes: 'exerciseType',
  workouts: 'workout',
  recentUserSearches: 'recentUserSearch'
};
const API_Config = {
  login: '/login',
  users: '/api/users',
  exerciseTypes: '/api/exercise-types',
  workouts: '/api/workouts'
};
const NAVIGATION = {
  showMyWorkouts: 'navigationItemMyWorkouts',
  userSearchId: 'navigationItemUserSearch',
  exerciseTypesId: 'navigationItemExerciseTypes',
  chatId: 'navigationItemChat',
  workoutSummary: 'navigationItemWorkoutSummary',
  currentWorkout: 'navigationItemCurrentWorkout'
};
const DRAGGABLE = {
  typeUser: 'user',
  typeExerciseType: 'exerciseType',
  fromUserSearch: 'userSearch',
  fromFavourites: 'favourites',
  fromExerciseTypes: 'exerciseTypes'
};
const VIEW_NAME = {
  blockedUsers: 'blockedUsers',
  chatLog: 'chatLog',
  chatLogs: 'chatLogs',
  favouriteUsers: 'favouriteUsers',
  exerciseTypes: 'exerciseTypes',
  userSearch: 'userSearch',
  workouts: 'workouts',
  workoutSummary: 'workoutSummary',
  exercises: 'exercises'
};
const VIEW_CONTAINER = {
  exerciseTypeDetail: "exerciseTypeDetail",
  currentWorkoutDetail: 'workoutDetail',
  exerciseDropZone: 'exerciseDropZone'
};
const BUTTON = {
  createNewExerciseType: 'addNewExerciseType',
  completeWorkout: 'completeWorkout'
};
const INPUT = {
  workoutName: 'workoutName'
};

/***/ }),

/***/ "./src/Controller.ts":
/*!***************************!*\
  !*** ./src/Controller.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Controller)
/* harmony export */ });
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AppTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AppTypes */ "./src/AppTypes.ts");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");
/* harmony import */ var _SocketListenerDelegate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SocketListenerDelegate */ "./src/SocketListenerDelegate.ts");
/* harmony import */ var _framework_ui_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./framework/ui/ConfigurationTypes */ "./src/framework/ui/ConfigurationTypes.ts");
/* harmony import */ var _framework_model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./framework/model/DataObjectTypeDefs */ "./src/framework/model/DataObjectTypeDefs.ts");
/* harmony import */ var _framework_model_ObjectDefinitionRegistry__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./framework/model/ObjectDefinitionRegistry */ "./src/framework/model/ObjectDefinitionRegistry.ts");
/* harmony import */ var _framework_state_MemoryBufferStateManager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./framework/state/MemoryBufferStateManager */ "./src/framework/state/MemoryBufferStateManager.ts");
/* harmony import */ var _framework_ui_helper_SimpleValueDataSource__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./framework/ui/helper/SimpleValueDataSource */ "./src/framework/ui/helper/SimpleValueDataSource.ts");
/* harmony import */ var _framework_state_AggregateStateManager__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./framework/state/AggregateStateManager */ "./src/framework/state/AggregateStateManager.ts");
/* harmony import */ var _framework_state_AsyncStateManagerWrapper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./framework/state/AsyncStateManagerWrapper */ "./src/framework/state/AsyncStateManagerWrapper.ts");
/* harmony import */ var _framework_model_BasicObjectDefinitionFactory__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./framework/model/BasicObjectDefinitionFactory */ "./src/framework/model/BasicObjectDefinitionFactory.ts");
/* harmony import */ var _framework_state_RESTApiStateManager__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./framework/state/RESTApiStateManager */ "./src/framework/state/RESTApiStateManager.ts");
/* harmony import */ var _framework_util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./framework/util/EqualityFunctions */ "./src/framework/util/EqualityFunctions.ts");
/* harmony import */ var _framework_socket_ChatManager__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./framework/socket/ChatManager */ "./src/framework/socket/ChatManager.ts");
/* harmony import */ var _framework_socket_NotificationController__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./framework/socket/NotificationController */ "./src/framework/socket/NotificationController.ts");
/* harmony import */ var _framework_socket_SocketManager__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./framework/socket/SocketManager */ "./src/framework/socket/SocketManager.ts");

















const cLogger = debug__WEBPACK_IMPORTED_MODULE_0___default()('controller-ts');
const cLoggerDetail = debug__WEBPACK_IMPORTED_MODULE_0___default()('controller-ts-detail');
class Controller {
  static getInstance() {
    if (!Controller._instance) {
      Controller._instance = new Controller();
    }

    return Controller._instance;
  }

  constructor() {}

  connectToApplication(applicationView, clientSideStorage) {
    this.applicationView = applicationView;
    this.clientSideStorage = clientSideStorage; // setup the API calls

    let restSM = _framework_state_RESTApiStateManager__WEBPACK_IMPORTED_MODULE_11__.RESTApiStateManager.getInstance();
    restSM.initialise([{
      stateName: _AppTypes__WEBPACK_IMPORTED_MODULE_1__.STATE_NAMES.users,
      serverURL: '',
      api: _AppTypes__WEBPACK_IMPORTED_MODULE_1__.API_Config.users,
      isActive: true,
      find: false,
      findAll: true,
      create: true,
      update: true,
      destroy: true
    }, {
      stateName: _AppTypes__WEBPACK_IMPORTED_MODULE_1__.STATE_NAMES.exerciseTypes,
      serverURL: '',
      api: _AppTypes__WEBPACK_IMPORTED_MODULE_1__.API_Config.exerciseTypes,
      isActive: true,
      idField: '_id',
      find: false,
      findAll: true,
      create: true,
      update: true,
      destroy: true
    }, {
      stateName: _AppTypes__WEBPACK_IMPORTED_MODULE_1__.STATE_NAMES.workouts,
      serverURL: '',
      api: _AppTypes__WEBPACK_IMPORTED_MODULE_1__.API_Config.workouts,
      isActive: true,
      idField: '_id',
      find: false,
      findAll: true,
      create: true,
      update: true,
      destroy: true
    }]);
    let aggregateSM = new _framework_state_AggregateStateManager__WEBPACK_IMPORTED_MODULE_8__.AggregateStateManager(_framework_util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_12__.isSameMongo);
    let memorySM = new _framework_state_MemoryBufferStateManager__WEBPACK_IMPORTED_MODULE_6__.MemoryBufferStateManager(_framework_util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_12__.isSameMongo);
    let asyncSM = new _framework_state_AsyncStateManagerWrapper__WEBPACK_IMPORTED_MODULE_9__.AsyncStateManagerWrapper(aggregateSM, restSM, _framework_util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_12__.isSameMongo);
    aggregateSM.addStateManager(memorySM, [], false);
    aggregateSM.addStateManager(asyncSM, [], false);
    this.stateManager = aggregateSM; // state listener

    this.stateChanged = this.stateChanged.bind(this);
    this.stateChangedItemAdded = this.stateChangedItemAdded.bind(this);
    this.stateChangedItemRemoved = this.stateChangedItemRemoved.bind(this);
    this.stateChangedItemUpdated = this.stateChangedItemUpdated.bind(this); // data objects

    this.setupDataObjectDefinitions();
    return this;
  }

  setupDataObjectDefinitions() {
    // create the object definitions for the exercise type and workout
    let exerciseTypeDefinition = _framework_model_ObjectDefinitionRegistry__WEBPACK_IMPORTED_MODULE_5__.ObjectDefinitionRegistry.getInstance().addDefinition(_AppTypes__WEBPACK_IMPORTED_MODULE_1__.STATE_NAMES.exerciseTypes, 'Exercise', true, true, true, '_id');
    _framework_model_BasicObjectDefinitionFactory__WEBPACK_IMPORTED_MODULE_10__.BasicObjectDefinitionFactory.getInstance().addStringFieldToObjDefinition(exerciseTypeDefinition, "name", "Name", _framework_model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_4__.FieldType.text, true, "Exercise name");
    _framework_model_BasicObjectDefinitionFactory__WEBPACK_IMPORTED_MODULE_10__.BasicObjectDefinitionFactory.getInstance().addStringFieldToObjDefinition(exerciseTypeDefinition, "type", "Type", _framework_model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_4__.FieldType.limitedChoice, true, "Choose cardio or strength", new _framework_ui_helper_SimpleValueDataSource__WEBPACK_IMPORTED_MODULE_7__.SimpleValueDataSource([{
      name: 'Cardio',
      value: 'cardio'
    }, {
      name: 'Strength',
      value: 'strength'
    }]));
    _framework_model_BasicObjectDefinitionFactory__WEBPACK_IMPORTED_MODULE_10__.BasicObjectDefinitionFactory.getInstance().addStringFieldToObjDefinition(exerciseTypeDefinition, "duration", "Duration", _framework_model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_4__.FieldType.duration, true, "Exercise time");
    _framework_model_BasicObjectDefinitionFactory__WEBPACK_IMPORTED_MODULE_10__.BasicObjectDefinitionFactory.getInstance().addStringFieldToObjDefinition(exerciseTypeDefinition, "sets", "Sets", _framework_model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_4__.FieldType.integer, false, "Number of sets");
    _framework_model_BasicObjectDefinitionFactory__WEBPACK_IMPORTED_MODULE_10__.BasicObjectDefinitionFactory.getInstance().addStringFieldToObjDefinition(exerciseTypeDefinition, "reps", "Repetitions", _framework_model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_4__.FieldType.integer, false, "Number of reps");
    _framework_model_BasicObjectDefinitionFactory__WEBPACK_IMPORTED_MODULE_10__.BasicObjectDefinitionFactory.getInstance().addStringFieldToObjDefinition(exerciseTypeDefinition, "weight", "Weight", _framework_model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_4__.FieldType.float, false, "Weight used");
    _framework_model_BasicObjectDefinitionFactory__WEBPACK_IMPORTED_MODULE_10__.BasicObjectDefinitionFactory.getInstance().addStringFieldToObjDefinition(exerciseTypeDefinition, "distance", "Distance", _framework_model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_4__.FieldType.float, false, "Distance travelled");
    cLogger(`Exercise type data object definition`);
    cLogger(exerciseTypeDefinition);
    cLoggerDetail(_framework_model_ObjectDefinitionRegistry__WEBPACK_IMPORTED_MODULE_5__.ObjectDefinitionRegistry.getInstance().findDefinition('exerciseType'));
    let workoutDefinition = _framework_model_ObjectDefinitionRegistry__WEBPACK_IMPORTED_MODULE_5__.ObjectDefinitionRegistry.getInstance().addDefinition(_AppTypes__WEBPACK_IMPORTED_MODULE_1__.STATE_NAMES.workouts, 'Workout', true, true, true, '_id');
    _framework_model_BasicObjectDefinitionFactory__WEBPACK_IMPORTED_MODULE_10__.BasicObjectDefinitionFactory.getInstance().addStringFieldToObjDefinition(workoutDefinition, "name", "Name", _framework_model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_4__.FieldType.text, false, "Give the workout a name");
    _framework_model_BasicObjectDefinitionFactory__WEBPACK_IMPORTED_MODULE_10__.BasicObjectDefinitionFactory.getInstance().addStringFieldToObjDefinition(workoutDefinition, "completed", "Completed", _framework_model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_4__.FieldType.boolean, true, "Have completed the workout");
    let exercisesFieldDefinition = _framework_model_BasicObjectDefinitionFactory__WEBPACK_IMPORTED_MODULE_10__.BasicObjectDefinitionFactory.getInstance().addStringFieldToObjDefinition(workoutDefinition, "exercises", "Exercises", _framework_model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_4__.FieldType.collection, true, "Exercises in this workout");
    exercisesFieldDefinition.idType = _framework_ui_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_3__.KeyType.collection;
    exercisesFieldDefinition.linkedDataObjectId = exerciseTypeDefinition.id;
    cLogger(`Workout data object definition`);
    cLogger(workoutDefinition);
    cLoggerDetail(_framework_model_ObjectDefinitionRegistry__WEBPACK_IMPORTED_MODULE_5__.ObjectDefinitionRegistry.getInstance().findDefinition('workout'));
  }
  /*
      Get the base data for the application (users, entries)
  */


  onDocumentLoaded() {
    cLogger('Initialising data state'); // listen for socket events

    let socketListerDelegate = new _SocketListenerDelegate__WEBPACK_IMPORTED_MODULE_2__["default"]();
    _framework_socket_SocketManager__WEBPACK_IMPORTED_MODULE_15__.SocketManager.getInstance().setListener(socketListerDelegate); // now that we have all the user we can setup the chat system but only if we are logged in

    cLogger(`Setting up chat system for user ${this.getLoggedInUserId()}: ${this.getLoggedInUsername()}`);

    if (this.getLoggedInUserId().trim().length > 0) {
      // setup the chat system
      let chatManager = _framework_socket_ChatManager__WEBPACK_IMPORTED_MODULE_13__.ChatManager.getInstance(); // this connects the manager to the socket system
      // setup the chat notification system

      _framework_socket_NotificationController__WEBPACK_IMPORTED_MODULE_14__.NotificationController.getInstance();
      chatManager.setCurrentUser(this.getLoggedInUsername()); // let the application view know about message counts

      chatManager.setUnreadCountListener(this.applicationView);
      chatManager.login(); // load the users

      this.getStateManager().getStateByName(_AppTypes__WEBPACK_IMPORTED_MODULE_1__.STATE_NAMES.users);
      this.getStateManager().getStateByName(_AppTypes__WEBPACK_IMPORTED_MODULE_1__.STATE_NAMES.exerciseTypes);
      this.getStateManager().getStateByName(_AppTypes__WEBPACK_IMPORTED_MODULE_1__.STATE_NAMES.workouts);
    }
  }

  getStateManager() {
    return this.stateManager;
  }

  getListenerName() {
    return 'Controller';
  }

  isLoggedIn() {
    let isLoggedIn = false;

    try {
      // @ts-ignore
      if (loggedInUser) {
        isLoggedIn = true;
      }
    } catch (error) {}

    return isLoggedIn;
  }

  getLoggedInUserId() {
    let result = '';

    try {
      // @ts-ignore
      if (loggedInUser) {
        // @ts-ignore
        result = loggedInUser._id;
      }
    } catch (error) {}

    cLoggerDetail(`Logged in user id is ${result}`);
    return result;
  }

  getLoggedInUsername() {
    let result = '';

    try {
      // @ts-ignore
      if (loggedInUser) {
        // @ts-ignore
        result = loggedInUser.username;
      }
    } catch (error) {}

    cLoggerDetail(`Logged in user is ${result}`);
    return result;
  }

  handleMessage(message) {
    cLogger(message);
  }

  getCurrentUser() {
    return this.getLoggedInUserId();
  }

  stateChangedItemAdded(managerName, name, itemAdded) {}

  stateChangedItemRemoved(managerName, name, itemRemoved) {}

  stateChangedItemUpdated(managerName, name, itemUpdated, itemNewValue) {}

  stateChanged(managerName, name, values) {}
  /*
  *
  * Simple Application state (URL, logged in user)
  *
   */


  getServerAPIURL() {
    let result = ""; // @ts-ignore

    if (window.ENV && window.ENV.serverURL) {
      // @ts-ignore
      result = window.ENV.serverURL;
    }

    return result;
  }

  handleShowChat(roomName) {
    this.applicationView.handleShowChat(roomName);
  }

  create(controller, typeName, dataObj) {
    switch (typeName) {
      case _AppTypes__WEBPACK_IMPORTED_MODULE_1__.STATE_NAMES.exerciseTypes:
        {
          cLogger(`Handling create new exercise type`);
          cLoggerDetail(dataObj);
          this.stateManager.addNewItemToState(typeName, dataObj, false);
          break;
        }
    }
  }

  delete(controller, typeName, dataObj) {
    switch (typeName) {
      case _AppTypes__WEBPACK_IMPORTED_MODULE_1__.STATE_NAMES.exerciseTypes:
        {
          cLogger(`Handling delete exercise type - already managed by stateful collection view`);
          cLoggerDetail(dataObj);
          break;
        }
    }
  }

  update(controller, typeName, dataObj) {
    switch (typeName) {
      case _AppTypes__WEBPACK_IMPORTED_MODULE_1__.STATE_NAMES.exerciseTypes:
        {
          cLogger(`Handling update exercise type`);
          cLoggerDetail(dataObj);
          this.stateManager.updateItemInState(typeName, dataObj, false);
          break;
        }
    }
  }

  addExerciseToCurrentWorkout(exerciseType) {
    let copyOfExercise = { ...exerciseType
    };
    copyOfExercise._id = (0,uuid__WEBPACK_IMPORTED_MODULE_16__["default"])(); // update the id to be unique for the workout

    this.applicationView.addingExerciseToCurrentWorkout(copyOfExercise);
  }

  addWorkoutExercisesToCurrentWorkout(workout) {
    if (workout.exercises) {
      workout.exercises.forEach(exercise => {
        this.addExerciseToCurrentWorkout(exercise);
      });
    }
  }

  filterResults(managerName, name, filterResults) {}

}

/***/ }),

/***/ "./src/CreatedByPermissionChecker.ts":
/*!*******************************************!*\
  !*** ./src/CreatedByPermissionChecker.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreatedByPermissionChecker": () => (/* binding */ CreatedByPermissionChecker)
/* harmony export */ });
/* harmony import */ var _Controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Controller */ "./src/Controller.ts");

class CreatedByPermissionChecker {
  hasPermissionToUpdateItem(item) {
    let result = false;

    if (item.createdBy) {
      result = item.createdBy === _Controller__WEBPACK_IMPORTED_MODULE_0__["default"].getInstance().getLoggedInUsername();
    }

    return result;
  }

  hasPermissionToDeleteItem(item) {
    let result = false;

    if (item.createdBy) {
      result = item.createdBy === _Controller__WEBPACK_IMPORTED_MODULE_0__["default"].getInstance().getLoggedInUsername();
    }

    return result;
  }

  hasPermissionToEditField(dataObj, field) {
    return true;
  }

}

/***/ }),

/***/ "./src/SocketListenerDelegate.ts":
/*!***************************************!*\
  !*** ./src/SocketListenerDelegate.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SocketListenerDelegate)
/* harmony export */ });
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Controller */ "./src/Controller.ts");
/* harmony import */ var _AppTypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AppTypes */ "./src/AppTypes.ts");
/* harmony import */ var _framework_notification_NotificationManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./framework/notification/NotificationManager */ "./src/framework/notification/NotificationManager.ts");




const slLogger = debug__WEBPACK_IMPORTED_MODULE_0___default()('socket-listener');
class SocketListenerDelegate {
  constructor() {}

  handleDataChangedByAnotherUser(message) {
    slLogger(`Handling data change ${message.type} on object type ${message.stateName} made by user ${message.user}`);
    const changeUser = _Controller__WEBPACK_IMPORTED_MODULE_1__["default"].getInstance().getStateManager().findItemInState(_AppTypes__WEBPACK_IMPORTED_MODULE_2__.STATE_NAMES.users, {
      _id: message.user
    });
    let username = "unknown";

    if (changeUser) {
      username = changeUser.username;
    }

    slLogger(`Handling data change ${message.type} on object type ${message.stateName} made by user ${username}`);
    let stateObj = message.data;
    slLogger(stateObj); // ok lets work out where this change belongs

    try {
      switch (message.type) {
        case "create":
          {
            switch (message.stateName) {
              case _AppTypes__WEBPACK_IMPORTED_MODULE_2__.STATE_NAMES.users:
                {
                  _Controller__WEBPACK_IMPORTED_MODULE_1__["default"].getInstance().getStateManager().addNewItemToState(_AppTypes__WEBPACK_IMPORTED_MODULE_2__.STATE_NAMES.users, stateObj, true);
                  _framework_notification_NotificationManager__WEBPACK_IMPORTED_MODULE_3__.NotificationManager.getInstance().show(stateObj.username, `${stateObj.username} has just registered.`, _framework_notification_NotificationManager__WEBPACK_IMPORTED_MODULE_3__.NotificationType.message);
                  break;
                }

              case _AppTypes__WEBPACK_IMPORTED_MODULE_2__.STATE_NAMES.exerciseTypes:
                {
                  _Controller__WEBPACK_IMPORTED_MODULE_1__["default"].getInstance().getStateManager().addNewItemToState(_AppTypes__WEBPACK_IMPORTED_MODULE_2__.STATE_NAMES.exerciseTypes, stateObj, true);
                  break;
                }
            }

            break;
          }

        case "update":
          {
            switch (message.stateName) {
              case _AppTypes__WEBPACK_IMPORTED_MODULE_2__.STATE_NAMES.exerciseTypes:
                {
                  _Controller__WEBPACK_IMPORTED_MODULE_1__["default"].getInstance().getStateManager().updateItemInState(_AppTypes__WEBPACK_IMPORTED_MODULE_2__.STATE_NAMES.exerciseTypes, stateObj, true);
                  break;
                }
            }

            break;
          }

        case "delete":
          {
            switch (message.stateName) {
              case _AppTypes__WEBPACK_IMPORTED_MODULE_2__.STATE_NAMES.exerciseTypes:
                {
                  _Controller__WEBPACK_IMPORTED_MODULE_1__["default"].getInstance().getStateManager().removeItemFromState(_AppTypes__WEBPACK_IMPORTED_MODULE_2__.STATE_NAMES.exerciseTypes, stateObj, true);
                  break;
                }
            }

            break;
          }
      }
    } catch (err) {
      slLogger(err);
    }
  }

  handleMessage(message) {
    slLogger(`Received message: ${message}`);
  }

  getCurrentUser() {
    return _Controller__WEBPACK_IMPORTED_MODULE_1__["default"].getInstance().getLoggedInUserId();
  }

}

/***/ }),

/***/ "./src/component/helper/ValidationHelper.ts":
/*!**************************************************!*\
  !*** ./src/component/helper/ValidationHelper.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidationHelper": () => (/* binding */ ValidationHelper)
/* harmony export */ });
/* harmony import */ var _framework_ui_form_validation_ValidationTypeDefs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../framework/ui/form/validation/ValidationTypeDefs */ "./src/framework/ui/form/validation/ValidationTypeDefs.ts");
/* harmony import */ var _framework_ui_form_FormUITypeDefs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../framework/ui/form/FormUITypeDefs */ "./src/framework/ui/form/FormUITypeDefs.ts");
/* harmony import */ var _framework_CommonTypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../framework/CommonTypes */ "./src/framework/CommonTypes.ts");
/* harmony import */ var _framework_ui_form_validation_ValidationManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../framework/ui/form/validation/ValidationManager */ "./src/framework/ui/form/validation/ValidationManager.ts");




class ValidationHelper {
  static getInstance() {
    if (!ValidationHelper._instance) {
      ValidationHelper._instance = new ValidationHelper();
    }

    return ValidationHelper._instance;
  }

  constructor() {}

  setupValidationForExerciseTypeDetailsForm(form) {
    let rule = {
      formMode: _framework_ui_form_FormUITypeDefs__WEBPACK_IMPORTED_MODULE_1__.FormMode.any,
      targetDataFieldId: 'sets',
      response: _framework_ui_form_validation_ValidationTypeDefs__WEBPACK_IMPORTED_MODULE_0__.ConditionResponse.show,
      conditions: [{
        sourceDataFieldId: 'type',
        comparison: _framework_CommonTypes__WEBPACK_IMPORTED_MODULE_2__.ComparisonType.hasValue,
        values: 'strength'
      }]
    };
    _framework_ui_form_validation_ValidationManager__WEBPACK_IMPORTED_MODULE_3__.ValidationManager.getInstance().addRuleToForm(form, rule);
    rule = {
      formMode: _framework_ui_form_FormUITypeDefs__WEBPACK_IMPORTED_MODULE_1__.FormMode.any,
      targetDataFieldId: 'reps',
      response: _framework_ui_form_validation_ValidationTypeDefs__WEBPACK_IMPORTED_MODULE_0__.ConditionResponse.show,
      conditions: [{
        sourceDataFieldId: 'type',
        comparison: _framework_CommonTypes__WEBPACK_IMPORTED_MODULE_2__.ComparisonType.hasValue,
        values: 'strength'
      }]
    };
    _framework_ui_form_validation_ValidationManager__WEBPACK_IMPORTED_MODULE_3__.ValidationManager.getInstance().addRuleToForm(form, rule);
    rule = {
      formMode: _framework_ui_form_FormUITypeDefs__WEBPACK_IMPORTED_MODULE_1__.FormMode.any,
      targetDataFieldId: 'weight',
      response: _framework_ui_form_validation_ValidationTypeDefs__WEBPACK_IMPORTED_MODULE_0__.ConditionResponse.show,
      conditions: [{
        sourceDataFieldId: 'type',
        comparison: _framework_CommonTypes__WEBPACK_IMPORTED_MODULE_2__.ComparisonType.hasValue,
        values: 'strength'
      }]
    };
    _framework_ui_form_validation_ValidationManager__WEBPACK_IMPORTED_MODULE_3__.ValidationManager.getInstance().addRuleToForm(form, rule);
    rule = {
      formMode: _framework_ui_form_FormUITypeDefs__WEBPACK_IMPORTED_MODULE_1__.FormMode.any,
      targetDataFieldId: 'reps',
      response: _framework_ui_form_validation_ValidationTypeDefs__WEBPACK_IMPORTED_MODULE_0__.ConditionResponse.hide,
      conditions: [{
        sourceDataFieldId: 'type',
        comparison: _framework_CommonTypes__WEBPACK_IMPORTED_MODULE_2__.ComparisonType.hasValue,
        values: 'cardio'
      }]
    };
    _framework_ui_form_validation_ValidationManager__WEBPACK_IMPORTED_MODULE_3__.ValidationManager.getInstance().addRuleToForm(form, rule);
    rule = {
      formMode: _framework_ui_form_FormUITypeDefs__WEBPACK_IMPORTED_MODULE_1__.FormMode.any,
      targetDataFieldId: 'sets',
      response: _framework_ui_form_validation_ValidationTypeDefs__WEBPACK_IMPORTED_MODULE_0__.ConditionResponse.hide,
      conditions: [{
        sourceDataFieldId: 'type',
        comparison: _framework_CommonTypes__WEBPACK_IMPORTED_MODULE_2__.ComparisonType.hasValue,
        values: 'cardio'
      }]
    };
    _framework_ui_form_validation_ValidationManager__WEBPACK_IMPORTED_MODULE_3__.ValidationManager.getInstance().addRuleToForm(form, rule);
    rule = {
      formMode: _framework_ui_form_FormUITypeDefs__WEBPACK_IMPORTED_MODULE_1__.FormMode.any,
      targetDataFieldId: 'weight',
      response: _framework_ui_form_validation_ValidationTypeDefs__WEBPACK_IMPORTED_MODULE_0__.ConditionResponse.hide,
      conditions: [{
        sourceDataFieldId: 'type',
        comparison: _framework_CommonTypes__WEBPACK_IMPORTED_MODULE_2__.ComparisonType.hasValue,
        values: 'cardio'
      }]
    };
    _framework_ui_form_validation_ValidationManager__WEBPACK_IMPORTED_MODULE_3__.ValidationManager.getInstance().addRuleToForm(form, rule);
    rule = {
      formMode: _framework_ui_form_FormUITypeDefs__WEBPACK_IMPORTED_MODULE_1__.FormMode.any,
      targetDataFieldId: 'distance',
      response: _framework_ui_form_validation_ValidationTypeDefs__WEBPACK_IMPORTED_MODULE_0__.ConditionResponse.show,
      conditions: [{
        sourceDataFieldId: 'type',
        comparison: _framework_CommonTypes__WEBPACK_IMPORTED_MODULE_2__.ComparisonType.hasValue,
        values: 'cardio'
      }]
    };
    _framework_ui_form_validation_ValidationManager__WEBPACK_IMPORTED_MODULE_3__.ValidationManager.getInstance().addRuleToForm(form, rule);
    rule = {
      formMode: _framework_ui_form_FormUITypeDefs__WEBPACK_IMPORTED_MODULE_1__.FormMode.any,
      targetDataFieldId: 'distance',
      response: _framework_ui_form_validation_ValidationTypeDefs__WEBPACK_IMPORTED_MODULE_0__.ConditionResponse.hide,
      conditions: [{
        sourceDataFieldId: 'type',
        comparison: _framework_CommonTypes__WEBPACK_IMPORTED_MODULE_2__.ComparisonType.hasValue,
        values: 'strength'
      }]
    };
    _framework_ui_form_validation_ValidationManager__WEBPACK_IMPORTED_MODULE_3__.ValidationManager.getInstance().addRuleToForm(form, rule);
    rule = {
      formMode: _framework_ui_form_FormUITypeDefs__WEBPACK_IMPORTED_MODULE_1__.FormMode.any,
      targetDataFieldId: 'sets',
      response: _framework_ui_form_validation_ValidationTypeDefs__WEBPACK_IMPORTED_MODULE_0__.ConditionResponse.invalid,
      multipleConditionLogic: _framework_ui_form_validation_ValidationTypeDefs__WEBPACK_IMPORTED_MODULE_0__.MultipleConditionLogic.failOnlyIfFinalConditionIsAFailAndPreviousConditionsAreNotFails,
      conditions: [{
        sourceDataFieldId: 'type',
        comparison: _framework_CommonTypes__WEBPACK_IMPORTED_MODULE_2__.ComparisonType.hasValue,
        values: 'strength'
      }, {
        comparison: _framework_CommonTypes__WEBPACK_IMPORTED_MODULE_2__.ComparisonType.greaterThan,
        values: '0'
      }]
    };
    _framework_ui_form_validation_ValidationManager__WEBPACK_IMPORTED_MODULE_3__.ValidationManager.getInstance().addRuleToForm(form, rule);
  }

}

/***/ }),

/***/ "./src/component/renderer/WorkoutSummaryRenderer.ts":
/*!**********************************************************!*\
  !*** ./src/component/renderer/WorkoutSummaryRenderer.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WorkoutSummaryRenderer": () => (/* binding */ WorkoutSummaryRenderer)
/* harmony export */ });
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var chart_js_auto__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! chart.js/auto */ "./node_modules/chart.js/auto/auto.esm.js");



const avLogger = debug__WEBPACK_IMPORTED_MODULE_0___default()('workout-summary-renderer');
class WorkoutSummaryRenderer {
  currentChart = null;

  constructor(view, eventHandler) {
    this.view = view;
    this.eventHandler = eventHandler;
  }

  generateRandomExerciseColourAndBorder(isStrength = true) {
    let red = 0;
    let blue = 0;
    let green = 50;
    const newColour = Math.floor(Math.random() * 100) + 155;
    if (isStrength) red = newColour;
    if (!isStrength) blue = newColour;
    const transparency = 0.4;
    const background = `rgba(${red},${green},${blue},${transparency})`;
    const border = `rgb(${red},${green},${blue})`;
    return [background, border];
  }

  createDisplayElementForCollectionItem(collectionName, item) {
    return document.createElement('a');
  }

  setDisplayElementsForCollectionInContainer(containerEl, collectionName, newState) {
    avLogger(`view ${this.view.getName()}: creating workout summary`);
    avLogger(newState);
    if (this.currentChart) this.currentChart.destroy(); // okay we need to go through the last 7 workouts

    let sevenWorkouts = newState;

    if (newState.length > 7) {
      sevenWorkouts = newState.slice(newState.length - 7);
    } // go through the workouts and find all the unique exercise names as data series names


    let exerciseNames = [];
    let exerciseBG = [];
    let exerciseBR = [];
    let exerciseTypes = [];
    let labels = [];
    sevenWorkouts.forEach(workout => {
      const label = moment__WEBPACK_IMPORTED_MODULE_1___default()(workout.createdOn, 'YYYYMMDDHHmmss').format('ddd DD/MM/YYYY HH:mm');
      labels.push(label);
      avLogger(`Added label ${label}`);

      if (workout.exercises) {
        workout.exercises.forEach(exercise => {
          const exerciseName = exercise.name; // do we have this exercise already?

          let foundIndex = exerciseNames.findIndex(name => name == exerciseName);

          if (foundIndex < 0) {
            avLogger(`Adding exercise ${exerciseName} of type ${exercise.type} to datasets`);
            exerciseNames.push(exerciseName);
            exerciseTypes.push(exercise.type);
            const colours = this.generateRandomExerciseColourAndBorder(exercise.type === 'strength');
            exerciseBG.push(colours[0]);
            exerciseBR.push(colours[1]);
          }
        });
      }
    }); // construct the data series, for each series (exercise), go through the workouts and create a data entry for that item

    let datasets = [];
    exerciseNames.forEach((name, index) => {
      const exerciseType = exerciseTypes[index];
      const itemBG = exerciseBG[index];
      const itemBR = exerciseBR[index];
      avLogger(`Constructing dataset ${name} of type ${exerciseType} to datasets`);
      let data = [];
      let bg = [];
      let br = [];
      sevenWorkouts.forEach(workout => {
        bg.push(itemBG);
        br.push(itemBR); // find the exercise name

        if (workout.exercises) {
          const didntFindExercise = workout.exercises.every(exercise => {
            if (exercise.name == name) {
              if (exerciseType === 'strength') {
                avLogger(`Found exercise ${name} with value ${exercise.weight}`);
                data.push(exercise.weight);
              } else {
                avLogger(`Found exercise ${name} with value ${exercise.distance}`);
                data.push(exercise.distance);
              }

              return false;
            }

            return true;
          }); // not found - zero value

          if (didntFindExercise) {
            data.push(0);
          }
        } else {
          data.push(0);
        }
      });
      let dataset = {
        label: name,
        data: data,
        backgroundColor: bg,
        borderColor: br,
        borderWidth: 1,
        order: 1
      };
      let lineDataSet = {
        label: name,
        data: data,
        backgroundColor: bg,
        borderColor: br,
        order: 0,
        type: 'line'
      };
      avLogger(dataset);
      datasets.push(dataset); //datasets.push(lineDataSet);
    });
    let chartData = {
      labels: labels,
      datasets: datasets
    };
    let config = {
      type: 'bar',
      data: chartData,
      options: {
        responsive: true,
        animation: true,
        maintainAspectRatio: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    };
    avLogger(chartData); // @ts-ignore

    this.currentChart = new chart_js_auto__WEBPACK_IMPORTED_MODULE_2__["default"](containerEl, config);
  }

  onDocumentLoaded() {}

}

/***/ }),

/***/ "./src/component/sidebar/CurrentWorkoutSidebar.ts":
/*!********************************************************!*\
  !*** ./src/component/sidebar/CurrentWorkoutSidebar.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CurrentWorkoutSidebar)
/* harmony export */ });
/* harmony import */ var _framework_ui_container_SidebarViewContainer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../framework/ui/container/SidebarViewContainer */ "./src/framework/ui/container/SidebarViewContainer.ts");
/* harmony import */ var _framework_ui_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../framework/ui/ConfigurationTypes */ "./src/framework/ui/ConfigurationTypes.ts");


class CurrentWorkoutSidebar extends _framework_ui_container_SidebarViewContainer__WEBPACK_IMPORTED_MODULE_0__.SidebarViewContainer {
  static SidebarPrefs = {
    id: 'currentWorkoutSidebar',
    expandedSize: '50%',
    location: _framework_ui_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.SidebarLocation.right
  };
  static SidebarContainers = {
    list: 'exercises',
    detail: 'workoutDetail'
  };

  constructor() {
    super(CurrentWorkoutSidebar.SidebarPrefs);
  }

}

/***/ }),

/***/ "./src/component/sidebar/ExerciseTypesSidebar.ts":
/*!*******************************************************!*\
  !*** ./src/component/sidebar/ExerciseTypesSidebar.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ExerciseTypesSidebar)
/* harmony export */ });
/* harmony import */ var _framework_ui_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../framework/ui/ConfigurationTypes */ "./src/framework/ui/ConfigurationTypes.ts");
/* harmony import */ var _framework_ui_container_SidebarViewContainer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../framework/ui/container/SidebarViewContainer */ "./src/framework/ui/container/SidebarViewContainer.ts");


class ExerciseTypesSidebar extends _framework_ui_container_SidebarViewContainer__WEBPACK_IMPORTED_MODULE_1__.SidebarViewContainer {
  static SidebarPrefs = {
    id: 'exerciseTypesSidebar',
    expandedSize: '50%',
    location: _framework_ui_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_0__.SidebarLocation.left
  };
  static SidebarContainers = {
    container: 'exerciseTypesContainer'
  };

  constructor() {
    super(ExerciseTypesSidebar.SidebarPrefs);
  }

}

/***/ }),

/***/ "./src/component/sidebar/WorkoutSummarySidebar.ts":
/*!********************************************************!*\
  !*** ./src/component/sidebar/WorkoutSummarySidebar.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ WorkoutSummarySidebar)
/* harmony export */ });
/* harmony import */ var _framework_ui_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../framework/ui/ConfigurationTypes */ "./src/framework/ui/ConfigurationTypes.ts");
/* harmony import */ var _framework_ui_container_SidebarViewContainer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../framework/ui/container/SidebarViewContainer */ "./src/framework/ui/container/SidebarViewContainer.ts");


class WorkoutSummarySidebar extends _framework_ui_container_SidebarViewContainer__WEBPACK_IMPORTED_MODULE_1__.SidebarViewContainer {
  static SidebarPrefs = {
    id: 'workoutSummarySidebar',
    expandedSize: '100%',
    location: _framework_ui_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_0__.SidebarLocation.bottom
  };
  static SidebarContainers = {
    container: 'workoutSummary'
  };

  constructor() {
    super(WorkoutSummarySidebar.SidebarPrefs);
  }

}

/***/ }),

/***/ "./src/component/view/CurrentWorkoutCompositeView.ts":
/*!***********************************************************!*\
  !*** ./src/component/view/CurrentWorkoutCompositeView.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CurrentWorkoutCompositeView": () => (/* binding */ CurrentWorkoutCompositeView)
/* harmony export */ });
/* harmony import */ var _AppTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../AppTypes */ "./src/AppTypes.ts");
/* harmony import */ var _Controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Controller */ "./src/Controller.ts");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _helper_ValidationHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helper/ValidationHelper */ "./src/component/helper/ValidationHelper.ts");
/* harmony import */ var _CurrentWorkoutExercisesView__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./CurrentWorkoutExercisesView */ "./src/component/view/CurrentWorkoutExercisesView.ts");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../App */ "./src/App.ts");
/* harmony import */ var _framework_ui_view_renderer_FormDetailViewRenderer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../framework/ui/view/renderer/FormDetailViewRenderer */ "./src/framework/ui/view/renderer/FormDetailViewRenderer.ts");
/* harmony import */ var _framework_ui_helper_BootstrapFormConfigHelper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../framework/ui/helper/BootstrapFormConfigHelper */ "./src/framework/ui/helper/BootstrapFormConfigHelper.ts");
/* harmony import */ var _framework_model_ObjectDefinitionRegistry__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../framework/model/ObjectDefinitionRegistry */ "./src/framework/model/ObjectDefinitionRegistry.ts");
/* harmony import */ var _framework_ui_form_DefaultFormFieldPermissionChecker__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../framework/ui/form/DefaultFormFieldPermissionChecker */ "./src/framework/ui/form/DefaultFormFieldPermissionChecker.ts");
/* harmony import */ var _framework_ui_view_implementation_DetailViewImplementation__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../framework/ui/view/implementation/DetailViewImplementation */ "./src/framework/ui/view/implementation/DetailViewImplementation.ts");
/* harmony import */ var _framework_state_MemoryBufferStateManager__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../framework/state/MemoryBufferStateManager */ "./src/framework/state/MemoryBufferStateManager.ts");
/* harmony import */ var _framework_ui_helper_LinkedCollectionDetailController__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../framework/ui/helper/LinkedCollectionDetailController */ "./src/framework/ui/helper/LinkedCollectionDetailController.ts");
/* harmony import */ var _framework_model_BasicObjectDefinitionFactory__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../framework/model/BasicObjectDefinitionFactory */ "./src/framework/model/BasicObjectDefinitionFactory.ts");
/* harmony import */ var _framework_util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../framework/util/EqualityFunctions */ "./src/framework/util/EqualityFunctions.ts");
















const logger = debug__WEBPACK_IMPORTED_MODULE_2___default()('current-workout-composite-view');
class CurrentWorkoutCompositeView {
  currentWorkout = {};
  workoutDef = null;
  workoutNameEl = null;

  constructor(sideBar) {
    this.sideBar = sideBar;
    this.stateManager = new _framework_state_MemoryBufferStateManager__WEBPACK_IMPORTED_MODULE_12__.MemoryBufferStateManager(_framework_util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_15__.isSameMongo);
    this.stateManager.addChangeListenerForName(_AppTypes__WEBPACK_IMPORTED_MODULE_0__.STATE_NAMES.exerciseTypes, this);
    _Controller__WEBPACK_IMPORTED_MODULE_1__["default"].getInstance().getStateManager().addChangeListenerForName(_AppTypes__WEBPACK_IMPORTED_MODULE_0__.STATE_NAMES.workouts, this);
  }

  getListenerName() {
    return 'Current Workout Composite View';
  }

  onDocumentLoaded() {
    var _this$workoutNameEl;

    this.workoutNameEl = document.getElementById(_AppTypes__WEBPACK_IMPORTED_MODULE_0__.INPUT.workoutName);
    (_this$workoutNameEl = this.workoutNameEl) === null || _this$workoutNameEl === void 0 ? void 0 : _this$workoutNameEl.addEventListener('blur', event => {
      if (event.target) {
        // @ts-ignore
        this.currentWorkout.name = event.target.value;
        this.saveWorkout();
      }
    });
    this.workoutDef = _framework_model_ObjectDefinitionRegistry__WEBPACK_IMPORTED_MODULE_9__.ObjectDefinitionRegistry.getInstance().findDefinition(_AppTypes__WEBPACK_IMPORTED_MODULE_0__.STATE_NAMES.workouts);
    if (!this.workoutDef) throw new Error('Workout definition not found');
    const exerciseTypes = new _CurrentWorkoutExercisesView__WEBPACK_IMPORTED_MODULE_4__.CurrentWorkoutExercisesView(this.stateManager);
    this.sideBar.addView(exerciseTypes, {
      containerId: _AppTypes__WEBPACK_IMPORTED_MODULE_0__.VIEW_CONTAINER.exerciseDropZone
    });
    const exerciseTypeDefinition = _framework_model_ObjectDefinitionRegistry__WEBPACK_IMPORTED_MODULE_9__.ObjectDefinitionRegistry.getInstance().findDefinition(_AppTypes__WEBPACK_IMPORTED_MODULE_0__.STATE_NAMES.exerciseTypes);

    if (exerciseTypeDefinition) {
      let exerciseTypeDetailRenderer = new _framework_ui_view_renderer_FormDetailViewRenderer__WEBPACK_IMPORTED_MODULE_7__.FormDetailViewRenderer(_AppTypes__WEBPACK_IMPORTED_MODULE_0__.VIEW_CONTAINER.currentWorkoutDetail, exerciseTypeDefinition, new _framework_ui_form_DefaultFormFieldPermissionChecker__WEBPACK_IMPORTED_MODULE_10__.DefaultFormFieldPermissionChecker(), _framework_ui_helper_BootstrapFormConfigHelper__WEBPACK_IMPORTED_MODULE_8__.BootstrapFormConfigHelper.getInstance());
      let exerciseTypeDetailView = new _framework_ui_view_implementation_DetailViewImplementation__WEBPACK_IMPORTED_MODULE_11__.DetailViewImplementation({
        resultsContainerId: _AppTypes__WEBPACK_IMPORTED_MODULE_0__.VIEW_CONTAINER.currentWorkoutDetail,
        dataSourceId: _AppTypes__WEBPACK_IMPORTED_MODULE_0__.VIEW_NAME.exercises
      }, exerciseTypeDetailRenderer);
      let viewLinker = new _framework_ui_helper_LinkedCollectionDetailController__WEBPACK_IMPORTED_MODULE_13__.LinkedCollectionDetailController(_AppTypes__WEBPACK_IMPORTED_MODULE_0__.STATE_NAMES.exerciseTypes, exerciseTypes);
      viewLinker.addLinkedDetailView(exerciseTypeDetailView);
      this.sideBar.onDocumentLoaded();
      let startingDisplayOrder = _framework_model_BasicObjectDefinitionFactory__WEBPACK_IMPORTED_MODULE_14__.BasicObjectDefinitionFactory.getInstance().generateStartingDisplayOrder(exerciseTypeDefinition);
      exerciseTypeDetailView.initialise(startingDisplayOrder, false, true);
      const detailForm = exerciseTypeDetailRenderer.getForm();

      if (detailForm) {
        logger(`Setting up validation rules for ${detailForm.getId()}`);
        logger(detailForm);
        _helper_ValidationHelper__WEBPACK_IMPORTED_MODULE_3__.ValidationHelper.getInstance().setupValidationForExerciseTypeDetailsForm(detailForm);
      } // setup the event handling for the create new exercise type button


      let createExerciseType = document.getElementById(_AppTypes__WEBPACK_IMPORTED_MODULE_0__.BUTTON.completeWorkout);
      logger(`Setting up button for completing the workout`);
      logger(createExerciseType);

      if (createExerciseType) {
        createExerciseType.addEventListener('click', event => {
          logger(`Completing the workout`);
          this.currentWorkout.completed = true;
          this.currentWorkout.createdOn = moment__WEBPACK_IMPORTED_MODULE_5___default()().format('YYYYMMDDHHmmss');

          if (detailForm) {
            detailForm.reset();
            detailForm.setReadOnly();
          }

          this.saveWorkout();
          this.createWorkout();
          _App__WEBPACK_IMPORTED_MODULE_6__["default"].getInstance().hideAllSideBars();
        });
      }

      viewLinker.addListener(this);
    }
  }

  getStateManager() {
    return this.stateManager;
  }

  createWorkout() {
    logger(`Creating new current workout`);
    this.currentWorkout = _framework_model_ObjectDefinitionRegistry__WEBPACK_IMPORTED_MODULE_9__.ObjectDefinitionRegistry.getInstance().createInstance(_AppTypes__WEBPACK_IMPORTED_MODULE_0__.STATE_NAMES.workouts);
    logger(this.currentWorkout);
    this.currentWorkout.name = '';
    if (this.workoutNameEl) this.workoutNameEl.value = '';
    _Controller__WEBPACK_IMPORTED_MODULE_1__["default"].getInstance().getStateManager().addNewItemToState(_AppTypes__WEBPACK_IMPORTED_MODULE_0__.STATE_NAMES.workouts, this.currentWorkout, false);
    this.stateManager.setStateByName(_AppTypes__WEBPACK_IMPORTED_MODULE_0__.STATE_NAMES.exerciseTypes, this.currentWorkout.exercises, true);
  }

  saveWorkout() {
    logger(`Saving current workout`);
    logger(this.currentWorkout);
    this.currentWorkout.createdOn = moment__WEBPACK_IMPORTED_MODULE_5___default()().format('YYYYMMDDHHmmss');
    this.currentWorkout.modifiedOn = moment__WEBPACK_IMPORTED_MODULE_5___default()().format('YYYYMMDDHHmmss');
    _Controller__WEBPACK_IMPORTED_MODULE_1__["default"].getInstance().getStateManager().updateItemInState(_AppTypes__WEBPACK_IMPORTED_MODULE_0__.STATE_NAMES.workouts, this.currentWorkout, false);
  }

  stateChanged(managerName, name, newValue) {
    logger(`${managerName},${name}`);

    if (name === _AppTypes__WEBPACK_IMPORTED_MODULE_0__.STATE_NAMES.workouts) {
      logger(`Workouts loaded`); // is there a current workout?

      this.currentWorkout = null;
      newValue.forEach(workout => {
        if (!workout.completed || workout.completed === 'false') {
          this.currentWorkout = workout;
        }
      });

      if (this.currentWorkout) {
        logger(`Workouts loaded found existing current workout`);
        if (this.workoutNameEl && this.currentWorkout.name) this.workoutNameEl.value = this.currentWorkout.name;
        this.stateManager.setStateByName(_AppTypes__WEBPACK_IMPORTED_MODULE_0__.STATE_NAMES.exerciseTypes, this.currentWorkout.exercises, true);
      } else {
        logger(`Workouts loaded no existing current workout, creating and saving`);
        this.createWorkout();
      }
    }
  }

  stateChangedItemAdded(managerName, name, itemAdded) {
    if (name === _AppTypes__WEBPACK_IMPORTED_MODULE_0__.STATE_NAMES.exerciseTypes) {
      logger(`Added a new exercise to workout`);
      logger(itemAdded);
      this.currentWorkout.exercises.push(itemAdded);
      this.saveWorkout();
    }
  }

  stateChangedItemRemoved(managerName, name, itemRemoved) {
    if (name === _AppTypes__WEBPACK_IMPORTED_MODULE_0__.STATE_NAMES.exerciseTypes) {
      // find the exercise in the current workout
      let foundIndex = this.currentWorkout.exercises.findIndex(exercise => exercise._id === itemRemoved._id);
      logger(`Removing exercise to workout at index ${foundIndex}`);
      logger(itemRemoved);

      if (foundIndex >= 0) {
        this.currentWorkout.exercises.splice(foundIndex, 1);
      }

      this.saveWorkout();
    }
  }

  stateChangedItemUpdated(managerName, name, itemUpdated, itemNewValue) {
    if (name === _AppTypes__WEBPACK_IMPORTED_MODULE_0__.STATE_NAMES.exerciseTypes) {
      // find the exercise in the current workout
      let foundIndex = this.currentWorkout.exercises.findIndex(exercise => exercise._id === itemNewValue._id);
      logger(`Updating exercise to workout at index ${foundIndex}`);
      logger(itemNewValue);

      if (foundIndex >= 0) {
        this.currentWorkout.exercises.splice(foundIndex, 1, itemNewValue);
      }

      this.saveWorkout();
    }
  }

  create(controller, typeName, dataObj) {
    logger(`Added a new exercise to workout from view`);
    logger(dataObj);
    this.stateManager.addNewItemToState(_AppTypes__WEBPACK_IMPORTED_MODULE_0__.STATE_NAMES.exerciseTypes, dataObj, false);
  }

  update(controller, typeName, dataObj) {
    logger(`Updating exercise in workout from view`);
    logger(dataObj);
    this.stateManager.updateItemInState(_AppTypes__WEBPACK_IMPORTED_MODULE_0__.STATE_NAMES.exerciseTypes, dataObj, false);
  }

  delete(controller, typeName, dataObj) {
    logger(`Deleting exercise from workout from view`);
    logger(dataObj);
    this.stateManager.removeItemFromState(_AppTypes__WEBPACK_IMPORTED_MODULE_0__.STATE_NAMES.exerciseTypes, dataObj, false);
  }

  filterResults(managerName, name, filterResults) {}

}

/***/ }),

/***/ "./src/component/view/CurrentWorkoutExercisesView.ts":
/*!***********************************************************!*\
  !*** ./src/component/view/CurrentWorkoutExercisesView.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CurrentWorkoutExercisesView": () => (/* binding */ CurrentWorkoutExercisesView)
/* harmony export */ });
/* harmony import */ var _AppTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../AppTypes */ "./src/AppTypes.ts");
/* harmony import */ var _Controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Controller */ "./src/Controller.ts");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _framework_ui_context_ContextualInformationHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../framework/ui/context/ContextualInformationHelper */ "./src/framework/ui/context/ContextualInformationHelper.ts");
/* harmony import */ var _framework_ui_view_implementation_AbstractStatefulCollectionView__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../framework/ui/view/implementation/AbstractStatefulCollectionView */ "./src/framework/ui/view/implementation/AbstractStatefulCollectionView.ts");
/* harmony import */ var _framework_ui_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../framework/ui/ConfigurationTypes */ "./src/framework/ui/ConfigurationTypes.ts");
/* harmony import */ var _framework_ui_view_delegate_CollectionViewEventHandlerDelegateUsingContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../framework/ui/view/delegate/CollectionViewEventHandlerDelegateUsingContext */ "./src/framework/ui/view/delegate/CollectionViewEventHandlerDelegateUsingContext.ts");
/* harmony import */ var _framework_ui_view_renderer_ListViewRendererUsingContext__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../framework/ui/view/renderer/ListViewRendererUsingContext */ "./src/framework/ui/view/renderer/ListViewRendererUsingContext.ts");
/* harmony import */ var _framework_util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../framework/util/EqualityFunctions */ "./src/framework/util/EqualityFunctions.ts");









const logger = debug__WEBPACK_IMPORTED_MODULE_2___default()('current-workout-exercises-view');
class CurrentWorkoutExercisesView extends _framework_ui_view_implementation_AbstractStatefulCollectionView__WEBPACK_IMPORTED_MODULE_4__.AbstractStatefulCollectionView {
  static DOMConfig = {
    viewConfig: {
      resultsContainerId: 'exercises',
      dataSourceId: _AppTypes__WEBPACK_IMPORTED_MODULE_0__.VIEW_NAME.exercises,
      drop: {
        acceptFrom: [_AppTypes__WEBPACK_IMPORTED_MODULE_0__.DRAGGABLE.fromExerciseTypes],
        acceptTypes: [_AppTypes__WEBPACK_IMPORTED_MODULE_0__.DRAGGABLE.typeExerciseType]
      }
    },
    resultsElement: {
      type: 'a',
      attributes: [{
        name: 'href',
        value: '#'
      }],
      classes: 'list-group-item my-list-item truncate-notification list-group-item-action'
    },
    keyId: '_id',
    keyType: _framework_ui_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_5__.KeyType.string,
    modifiers: {
      normal: '',
      inactive: 'list-group-item-light',
      active: 'list-group-item-primary',
      warning: ''
    },
    icons: {
      normal: '',
      inactive: '',
      active: '',
      warning: ''
    },
    detail: {
      containerClasses: 'd-flex w-100 justify-content-between',
      textElement: {
        type: 'span',
        classes: 'mb-1'
      },
      select: true,
      icons: (name, item) => {
        if (item.type) {
          if (item.type === 'cardio') {
            return ['fas fa-running ml-2'];
          } else {
            return ['fas fa-dumbbell ml-2'];
          }
        }

        return [];
      },
      delete: {
        classes: 'btn bg-danger text-white btn-circle btn-md',
        iconClasses: 'fas fa-trash-alt',
        attributes: [{
          name: 'data-toggle',
          value: "tooltip"
        }, {
          name: 'data-placement',
          value: "right"
        }, {
          name: 'title',
          value: "Delete this exercise from the workout."
        }]
      }
    }
  };

  constructor(stateManager) {
    super(CurrentWorkoutExercisesView.DOMConfig, stateManager, _AppTypes__WEBPACK_IMPORTED_MODULE_0__.STATE_NAMES.exerciseTypes);
    this.renderer = new _framework_ui_view_renderer_ListViewRendererUsingContext__WEBPACK_IMPORTED_MODULE_7__.ListViewRendererUsingContext(this, this);
    this.eventHandlerDelegate = new _framework_ui_view_delegate_CollectionViewEventHandlerDelegateUsingContext__WEBPACK_IMPORTED_MODULE_6__.CollectionViewEventHandlerDelegateUsingContext(this, this.eventForwarder);
    this.getIdForItemInNamedCollection = this.getIdForItemInNamedCollection.bind(this);
    this.getItemId = this.getItemId.bind(this);
    _framework_ui_context_ContextualInformationHelper__WEBPACK_IMPORTED_MODULE_3__.ContextualInformationHelper.getInstance().addContextFromView(this, _AppTypes__WEBPACK_IMPORTED_MODULE_0__.STATE_NAMES.exerciseTypes, 'Exercise Types');
  }

  getItemDescription(from, item) {
    let buffer = '';
    buffer += '<strong>' + item.name + '</strong>: ';

    if (item.type === 'cardio') {
      buffer += item.distance + ' km in ' + item.duration;
    } else {
      buffer += item.sets + ' sets of ' + item.reps + ' reps in ' + item.duration;
    }

    buffer += '<br/>';
    return buffer;
  }

  canDeleteItem(view, selectedItem) {
    return true;
  }

  compareItemsForEquality(item1, item2) {
    return (0,_framework_util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_8__.isSameMongo)(item1, item2);
  }

  getIdForItemInNamedCollection(name, item) {
    return item._id;
  }

  renderDisplayForItemInNamedCollection(containerEl, name, item) {
    containerEl.innerHTML = item.name;
  }

  hasPermissionToDeleteItemInNamedCollection(name, item) {
    return true;
  }

  itemDropped(view, droppedItem) {
    _Controller__WEBPACK_IMPORTED_MODULE_1__["default"].getInstance().addExerciseToCurrentWorkout(droppedItem);
  }

}

/***/ }),

/***/ "./src/component/view/ExerciseTypesCompositeView.ts":
/*!**********************************************************!*\
  !*** ./src/component/view/ExerciseTypesCompositeView.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ExerciseTypesCompositeView": () => (/* binding */ ExerciseTypesCompositeView)
/* harmony export */ });
/* harmony import */ var _AppTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../AppTypes */ "./src/AppTypes.ts");
/* harmony import */ var _Controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Controller */ "./src/Controller.ts");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _helper_ValidationHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helper/ValidationHelper */ "./src/component/helper/ValidationHelper.ts");
/* harmony import */ var _ExerciseTypesViewUsingContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ExerciseTypesViewUsingContext */ "./src/component/view/ExerciseTypesViewUsingContext.ts");
/* harmony import */ var _CreatedByPermissionChecker__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../CreatedByPermissionChecker */ "./src/CreatedByPermissionChecker.ts");
/* harmony import */ var _sidebar_ExerciseTypesSidebar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../sidebar/ExerciseTypesSidebar */ "./src/component/sidebar/ExerciseTypesSidebar.ts");
/* harmony import */ var _framework_ui_view_renderer_FormDetailViewRenderer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../framework/ui/view/renderer/FormDetailViewRenderer */ "./src/framework/ui/view/renderer/FormDetailViewRenderer.ts");
/* harmony import */ var _framework_ui_helper_BootstrapFormConfigHelper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../framework/ui/helper/BootstrapFormConfigHelper */ "./src/framework/ui/helper/BootstrapFormConfigHelper.ts");
/* harmony import */ var _framework_model_ObjectDefinitionRegistry__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../framework/model/ObjectDefinitionRegistry */ "./src/framework/model/ObjectDefinitionRegistry.ts");
/* harmony import */ var _framework_model_BasicObjectDefinitionFactory__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../framework/model/BasicObjectDefinitionFactory */ "./src/framework/model/BasicObjectDefinitionFactory.ts");
/* harmony import */ var _framework_ui_view_implementation_DetailViewImplementation__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../framework/ui/view/implementation/DetailViewImplementation */ "./src/framework/ui/view/implementation/DetailViewImplementation.ts");
/* harmony import */ var _framework_ui_helper_LinkedCollectionDetailController__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../framework/ui/helper/LinkedCollectionDetailController */ "./src/framework/ui/helper/LinkedCollectionDetailController.ts");













const logger = debug__WEBPACK_IMPORTED_MODULE_2___default()('exercise-types-composite-view');
class ExerciseTypesCompositeView {
  constructor(sideBar) {
    this.sideBar = sideBar;
  }

  onDocumentLoaded() {
    const exerciseTypes = new _ExerciseTypesViewUsingContext__WEBPACK_IMPORTED_MODULE_4__.ExerciseTypesViewUsingContext(_Controller__WEBPACK_IMPORTED_MODULE_1__["default"].getInstance().getStateManager());
    this.sideBar.addView(exerciseTypes, {
      containerId: _sidebar_ExerciseTypesSidebar__WEBPACK_IMPORTED_MODULE_6__["default"].SidebarContainers.container
    });
    const exerciseTypeDefinition = _framework_model_ObjectDefinitionRegistry__WEBPACK_IMPORTED_MODULE_9__.ObjectDefinitionRegistry.getInstance().findDefinition(_AppTypes__WEBPACK_IMPORTED_MODULE_0__.STATE_NAMES.exerciseTypes);

    if (exerciseTypeDefinition) {
      let exerciseTypeDetailRenderer = new _framework_ui_view_renderer_FormDetailViewRenderer__WEBPACK_IMPORTED_MODULE_7__.FormDetailViewRenderer(_AppTypes__WEBPACK_IMPORTED_MODULE_0__.VIEW_CONTAINER.exerciseTypeDetail, exerciseTypeDefinition, new _CreatedByPermissionChecker__WEBPACK_IMPORTED_MODULE_5__.CreatedByPermissionChecker(), _framework_ui_helper_BootstrapFormConfigHelper__WEBPACK_IMPORTED_MODULE_8__.BootstrapFormConfigHelper.getInstance());
      let exerciseTypeDetailView = new _framework_ui_view_implementation_DetailViewImplementation__WEBPACK_IMPORTED_MODULE_11__.DetailViewImplementation({
        resultsContainerId: _AppTypes__WEBPACK_IMPORTED_MODULE_0__.VIEW_CONTAINER.exerciseTypeDetail,
        dataSourceId: _AppTypes__WEBPACK_IMPORTED_MODULE_0__.VIEW_NAME.exerciseTypes
      }, exerciseTypeDetailRenderer);
      let viewLinker = new _framework_ui_helper_LinkedCollectionDetailController__WEBPACK_IMPORTED_MODULE_12__.LinkedCollectionDetailController(_AppTypes__WEBPACK_IMPORTED_MODULE_0__.STATE_NAMES.exerciseTypes, exerciseTypes);
      viewLinker.addLinkedDetailView(exerciseTypeDetailView);
      this.sideBar.onDocumentLoaded();
      let startingDisplayOrder = _framework_model_BasicObjectDefinitionFactory__WEBPACK_IMPORTED_MODULE_10__.BasicObjectDefinitionFactory.getInstance().generateStartingDisplayOrder(exerciseTypeDefinition);
      exerciseTypeDetailView.initialise(startingDisplayOrder, false, true);
      const detailForm = exerciseTypeDetailRenderer.getForm();

      if (detailForm) {
        logger(`Setting up validation rules for ${detailForm.getId()}`);
        logger(detailForm);
        _helper_ValidationHelper__WEBPACK_IMPORTED_MODULE_3__.ValidationHelper.getInstance().setupValidationForExerciseTypeDetailsForm(detailForm);
      } // setup the event handling for the create new exercise type button


      let createExerciseType = document.getElementById(_AppTypes__WEBPACK_IMPORTED_MODULE_0__.BUTTON.createNewExerciseType);
      logger(`Setting up button for creating exercise types`);
      logger(createExerciseType);

      if (createExerciseType) {
        createExerciseType.addEventListener('click', event => {
          logger(`Asking view linker to start a new object`);
          viewLinker.startNewObject();
        });
      }

      viewLinker.addListener(_Controller__WEBPACK_IMPORTED_MODULE_1__["default"].getInstance());
    }
  }

}

/***/ }),

/***/ "./src/component/view/ExerciseTypesViewUsingContext.ts":
/*!*************************************************************!*\
  !*** ./src/component/view/ExerciseTypesViewUsingContext.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ExerciseTypesViewUsingContext": () => (/* binding */ ExerciseTypesViewUsingContext)
/* harmony export */ });
/* harmony import */ var _AppTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../AppTypes */ "./src/AppTypes.ts");
/* harmony import */ var _Controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Controller */ "./src/Controller.ts");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _framework_ui_context_ContextualInformationHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../framework/ui/context/ContextualInformationHelper */ "./src/framework/ui/context/ContextualInformationHelper.ts");
/* harmony import */ var _framework_ui_view_implementation_AbstractStatefulCollectionView__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../framework/ui/view/implementation/AbstractStatefulCollectionView */ "./src/framework/ui/view/implementation/AbstractStatefulCollectionView.ts");
/* harmony import */ var _framework_ui_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../framework/ui/ConfigurationTypes */ "./src/framework/ui/ConfigurationTypes.ts");
/* harmony import */ var _framework_ui_view_delegate_CollectionViewEventHandlerDelegateUsingContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../framework/ui/view/delegate/CollectionViewEventHandlerDelegateUsingContext */ "./src/framework/ui/view/delegate/CollectionViewEventHandlerDelegateUsingContext.ts");
/* harmony import */ var _framework_model_BasicObjectDefinitionFactory__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../framework/model/BasicObjectDefinitionFactory */ "./src/framework/model/BasicObjectDefinitionFactory.ts");
/* harmony import */ var _framework_ui_view_renderer_ListViewRendererUsingContext__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../framework/ui/view/renderer/ListViewRendererUsingContext */ "./src/framework/ui/view/renderer/ListViewRendererUsingContext.ts");
/* harmony import */ var _framework_util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../framework/util/EqualityFunctions */ "./src/framework/util/EqualityFunctions.ts");










const logger = debug__WEBPACK_IMPORTED_MODULE_2___default()('exercise-types-view');
class ExerciseTypesViewUsingContext extends _framework_ui_view_implementation_AbstractStatefulCollectionView__WEBPACK_IMPORTED_MODULE_4__.AbstractStatefulCollectionView {
  static DOMConfig = {
    viewConfig: {
      resultsContainerId: 'exerciseTypes',
      dataSourceId: _AppTypes__WEBPACK_IMPORTED_MODULE_0__.VIEW_NAME.exerciseTypes
    },
    resultsElement: {
      type: 'a',
      attributes: [{
        name: 'href',
        value: '#'
      }],
      classes: 'list-group-item my-list-item truncate-notification list-group-item-action'
    },
    keyId: '_id',
    keyType: _framework_ui_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_5__.KeyType.string,
    modifiers: {
      normal: '',
      inactive: 'list-group-item-light',
      active: 'list-group-item-primary',
      warning: ''
    },
    icons: {
      normal: '',
      inactive: '',
      active: '',
      warning: ''
    },
    sorter: function (item1, item2) {
      let result = 1;
      if (item1.name < item2.name) result = -1;
      return result;
    },
    detail: {
      containerClasses: 'd-flex w-100 justify-content-between',
      textElement: {
        type: 'span',
        classes: 'mb-1'
      },
      select: true,
      icons: (name, item) => {
        if (item.type) {
          if (item.type === 'cardio') {
            return ['fas fa-running ml-2'];
          } else {
            return ['fas fa-dumbbell ml-2'];
          }
        }

        return [];
      },
      delete: {
        classes: 'btn bg-danger text-white btn-circle btn-md',
        iconClasses: 'text-black fas fa-trash-alt',
        attributes: [{
          name: 'data-toggle',
          value: "tooltip"
        }, {
          name: 'data-placement',
          value: "right"
        }, {
          name: 'title',
          value: "Delete this exercise type."
        }]
      },
      drag: {
        type: _AppTypes__WEBPACK_IMPORTED_MODULE_0__.DRAGGABLE.typeExerciseType,
        from: _AppTypes__WEBPACK_IMPORTED_MODULE_0__.DRAGGABLE.fromExerciseTypes
      }
    },
    extraActions: [{
      name: 'addToWorkout',
      button: {
        classes: 'btn bg-primary text-white btn-circle btn-md mr-1',
        iconClasses: 'fas fa-arrow-alt-circle-right',
        attributes: [{
          name: 'data-toggle',
          value: "tooltip"
        }, {
          name: 'data-placement',
          value: "right"
        }, {
          name: 'data-html',
          value: 'true'
        }, {
          name: 'title',
          value: "Add this <strong>exercise</strong> to the current workout."
        }]
      }
    }]
  };

  constructor(stateManager) {
    super(ExerciseTypesViewUsingContext.DOMConfig, stateManager, _AppTypes__WEBPACK_IMPORTED_MODULE_0__.STATE_NAMES.exerciseTypes);
    this.renderer = new _framework_ui_view_renderer_ListViewRendererUsingContext__WEBPACK_IMPORTED_MODULE_8__.ListViewRendererUsingContext(this, this);
    this.eventHandlerDelegate = new _framework_ui_view_delegate_CollectionViewEventHandlerDelegateUsingContext__WEBPACK_IMPORTED_MODULE_6__.CollectionViewEventHandlerDelegateUsingContext(this, this.eventForwarder);
    this.getIdForItemInNamedCollection = this.getIdForItemInNamedCollection.bind(this);
    this.getItemId = this.getItemId.bind(this);
    let context = _framework_ui_context_ContextualInformationHelper__WEBPACK_IMPORTED_MODULE_3__.ContextualInformationHelper.getInstance().addContextFromView(this, _AppTypes__WEBPACK_IMPORTED_MODULE_0__.STATE_NAMES.exerciseTypes, 'Exercise Types');
    _framework_ui_context_ContextualInformationHelper__WEBPACK_IMPORTED_MODULE_3__.ContextualInformationHelper.getInstance().addActionToContext(context, 'addToWorkout', 'Add To Workout', this.eventHandlerDelegate.eventActionClicked, 'fas fa-arrow-alt-circle-right');
  }

  getItemDescription(from, item) {
    let buffer = '';
    buffer += '<strong>' + item.name + '</strong>: ';

    if (item.type === 'cardio') {
      buffer += item.distance + ' km in ' + item.duration;
    } else {
      buffer += item.sets + ' sets of ' + item.reps + ' reps in ' + item.duration;
    }

    buffer += '<br/>';
    return buffer;
  }

  canDeleteItem(view, selectedItem) {
    logger(`Can Delete ${selectedItem}`);
    logger(selectedItem[_framework_model_BasicObjectDefinitionFactory__WEBPACK_IMPORTED_MODULE_7__.FIELD_CreatedBy]);

    if (selectedItem[_framework_model_BasicObjectDefinitionFactory__WEBPACK_IMPORTED_MODULE_7__.FIELD_CreatedBy]) {
      if (selectedItem[_framework_model_BasicObjectDefinitionFactory__WEBPACK_IMPORTED_MODULE_7__.FIELD_CreatedBy] === _Controller__WEBPACK_IMPORTED_MODULE_1__["default"].getInstance().getLoggedInUsername()) {
        return true;
      }
    }

    return false;
  }

  compareItemsForEquality(item1, item2) {
    return (0,_framework_util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_9__.isSameMongo)(item1, item2);
  }

  getIdForItemInNamedCollection(name, item) {
    return item._id;
  }

  renderDisplayForItemInNamedCollection(containerEl, name, item) {
    containerEl.innerHTML = item.name;
  }

  hasPermissionToDeleteItemInNamedCollection(name, item) {
    logger(`Has delete permission ${item}`);
    logger(item[_framework_model_BasicObjectDefinitionFactory__WEBPACK_IMPORTED_MODULE_7__.FIELD_CreatedBy]);

    if (item[_framework_model_BasicObjectDefinitionFactory__WEBPACK_IMPORTED_MODULE_7__.FIELD_CreatedBy]) {
      if (item[_framework_model_BasicObjectDefinitionFactory__WEBPACK_IMPORTED_MODULE_7__.FIELD_CreatedBy] === _Controller__WEBPACK_IMPORTED_MODULE_1__["default"].getInstance().getLoggedInUsername()) {
        return true;
      }
    }

    return false;
  }

  itemAction(view, actionName, selectedItem) {
    super.itemAction(view, actionName, selectedItem); // @ts-ignore

    if (actionName === ExerciseTypesViewUsingContext.DOMConfig.extraActions[0].name) {
      // add the exercise type the current workout
      _Controller__WEBPACK_IMPORTED_MODULE_1__["default"].getInstance().addExerciseToCurrentWorkout(selectedItem);
    }
  }

}

/***/ }),

/***/ "./src/component/view/WorkoutSummaryView.ts":
/*!**************************************************!*\
  !*** ./src/component/view/WorkoutSummaryView.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WorkoutSummaryView": () => (/* binding */ WorkoutSummaryView)
/* harmony export */ });
/* harmony import */ var _AppTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../AppTypes */ "./src/AppTypes.ts");
/* harmony import */ var _Controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Controller */ "./src/Controller.ts");
/* harmony import */ var _renderer_WorkoutSummaryRenderer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../renderer/WorkoutSummaryRenderer */ "./src/component/renderer/WorkoutSummaryRenderer.ts");
/* harmony import */ var _framework_ui_view_implementation_AbstractStatefulCollectionView__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../framework/ui/view/implementation/AbstractStatefulCollectionView */ "./src/framework/ui/view/implementation/AbstractStatefulCollectionView.ts");
/* harmony import */ var _framework_ui_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../framework/ui/ConfigurationTypes */ "./src/framework/ui/ConfigurationTypes.ts");
/* harmony import */ var _framework_util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../framework/util/EqualityFunctions */ "./src/framework/util/EqualityFunctions.ts");






class WorkoutSummaryView extends _framework_ui_view_implementation_AbstractStatefulCollectionView__WEBPACK_IMPORTED_MODULE_3__.AbstractStatefulCollectionView {
  static DOMConfig = {
    viewConfig: {
      resultsContainerId: 'workoutSummaryChart',
      dataSourceId: _AppTypes__WEBPACK_IMPORTED_MODULE_0__.VIEW_NAME.workoutSummary
    },
    resultsElement: {
      type: 'canvas',
      classes: ''
    },
    keyId: '_id',
    keyType: _framework_ui_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_4__.KeyType.string,
    detail: {
      containerClasses: '',
      textElement: {
        type: '',
        classes: ''
      },
      select: false
    }
  };

  constructor() {
    super(WorkoutSummaryView.DOMConfig, _Controller__WEBPACK_IMPORTED_MODULE_1__["default"].getInstance().getStateManager(), _AppTypes__WEBPACK_IMPORTED_MODULE_0__.STATE_NAMES.workouts);
    this.renderer = new _renderer_WorkoutSummaryRenderer__WEBPACK_IMPORTED_MODULE_2__.WorkoutSummaryRenderer(this, this);
  }

  canDeleteItem(view, selectedItem) {
    return false;
  }

  compareItemsForEquality(item1, item2) {
    return (0,_framework_util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_5__.isSameMongo)(item1, item2);
  }

  getIdForItemInNamedCollection(name, item) {
    return item._id;
  }

  renderDisplayForItemInNamedCollection(containerEl, name, item) {}

  hasPermissionToDeleteItemInNamedCollection(name, item) {
    return false;
  }

  hasPermissionToActionItemInNamedCollection(actionName, name, item) {
    return false;
  }

  renderBackgroundForItemInNamedCollection(containerEl, name, item) {}

}

/***/ }),

/***/ "./src/component/view/WorkoutsViewUsingContext.ts":
/*!********************************************************!*\
  !*** ./src/component/view/WorkoutsViewUsingContext.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WorkoutsViewUsingContext": () => (/* binding */ WorkoutsViewUsingContext)
/* harmony export */ });
/* harmony import */ var _AppTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../AppTypes */ "./src/AppTypes.ts");
/* harmony import */ var _Controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Controller */ "./src/Controller.ts");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var chart_js_auto__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! chart.js/auto */ "./node_modules/chart.js/auto/auto.esm.js");
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../App */ "./src/App.ts");
/* harmony import */ var _framework_ui_context_ContextualInformationHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../framework/ui/context/ContextualInformationHelper */ "./src/framework/ui/context/ContextualInformationHelper.ts");
/* harmony import */ var _framework_ui_view_implementation_AbstractStatefulCollectionView__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../framework/ui/view/implementation/AbstractStatefulCollectionView */ "./src/framework/ui/view/implementation/AbstractStatefulCollectionView.ts");
/* harmony import */ var _framework_ui_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../framework/ui/ConfigurationTypes */ "./src/framework/ui/ConfigurationTypes.ts");
/* harmony import */ var _framework_ui_view_delegate_CollectionViewEventHandlerDelegateUsingContext__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../framework/ui/view/delegate/CollectionViewEventHandlerDelegateUsingContext */ "./src/framework/ui/view/delegate/CollectionViewEventHandlerDelegateUsingContext.ts");
/* harmony import */ var _framework_util_MiscFunctions__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../framework/util/MiscFunctions */ "./src/framework/util/MiscFunctions.ts");
/* harmony import */ var _framework_util_DurationFunctions__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../framework/util/DurationFunctions */ "./src/framework/util/DurationFunctions.ts");
/* harmony import */ var _framework_ui_view_renderer_CarouselViewRendererUsingContext__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../framework/ui/view/renderer/CarouselViewRendererUsingContext */ "./src/framework/ui/view/renderer/CarouselViewRendererUsingContext.ts");
/* harmony import */ var _framework_util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../framework/util/EqualityFunctions */ "./src/framework/util/EqualityFunctions.ts");














const logger = debug__WEBPACK_IMPORTED_MODULE_2___default()('workouts-view');
class WorkoutsViewUsingContext extends _framework_ui_view_implementation_AbstractStatefulCollectionView__WEBPACK_IMPORTED_MODULE_7__.AbstractStatefulCollectionView {
  static DOMConfig = {
    itemsPerRow: {
      small: 1,
      medium: 2,
      large: 3,
      xlarge: 4
    },
    rowContainer: {
      classes: "carousel-item",
      type: 'div'
    },
    activeRow: {
      type: '',
      classes: 'active'
    },
    activeRowPosition: _framework_ui_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_8__.RowPosition.last,
    row: {
      classes: "row",
      type: 'div'
    },
    multipleItemsPerRowContainer: {
      type: 'div',
      classes: 'col-sm-12 col-md-4 col-lg-3 mb-2'
    },
    actionContainer: {
      type: 'div',
      classes: 'card-footer d-flex w-100 justify-content-end'
    },
    collectionConfig: {
      viewConfig: {
        resultsContainerId: 'workouts',
        dataSourceId: _AppTypes__WEBPACK_IMPORTED_MODULE_0__.VIEW_NAME.workouts,
        drop: {
          acceptTypes: [_AppTypes__WEBPACK_IMPORTED_MODULE_0__.DRAGGABLE.typeExerciseType],
          acceptFrom: [_AppTypes__WEBPACK_IMPORTED_MODULE_0__.DRAGGABLE.fromExerciseTypes]
        }
      },
      resultsElement: {
        type: 'div',
        classes: 'card'
      },
      keyId: '_id',
      keyType: _framework_ui_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_8__.KeyType.string,
      modifiers: {
        normal: 'bg-light',
        inactive: 'bg-light',
        active: 'bg-light',
        warning: 'bg-light'
      },
      detail: {
        containerClasses: 'card-body',
        textElement: {
          classes: '',
          type: 'div'
        },
        select: true,
        delete: {
          classes: 'btn btn-danger btn-circle btn-md',
          iconClasses: 'fas fa-trash-alt text-white',
          attributes: [{
            name: 'data-toggle',
            value: "tooltip"
          }, {
            name: 'data-placement',
            value: "top"
          }, {
            name: 'title',
            value: "Delete this workout"
          }]
        },
        background: {
          type: 'div',
          classes: ''
        }
      },
      extraActions: [{
        name: 'template',
        button: {
          text: '',
          classes: 'btn btn-primary btn-circle btn-md mr-2',
          iconClasses: 'fas fa-copy',
          attributes: [{
            name: 'data-toggle',
            value: "tooltip"
          }, {
            name: 'data-placement',
            value: "top"
          }, {
            name: 'title',
            value: "Add the exercises from this workout to the current workout."
          }]
        }
      }, {
        name: 'continue',
        button: {
          text: '',
          iconClasses: 'text-white fas fa-clipboard-list',
          classes: 'btn btn-warning btn-circle btn-md mr-2',
          attributes: [{
            name: 'data-toggle',
            value: "tooltip"
          }, {
            name: 'data-placement',
            value: "top"
          }, {
            name: 'title',
            value: "Continue this current workout"
          }]
        }
      }]
    }
  };

  constructor() {
    super(WorkoutsViewUsingContext.DOMConfig.collectionConfig, _Controller__WEBPACK_IMPORTED_MODULE_1__["default"].getInstance().getStateManager(), _AppTypes__WEBPACK_IMPORTED_MODULE_0__.STATE_NAMES.workouts);
    this.renderer = new _framework_ui_view_renderer_CarouselViewRendererUsingContext__WEBPACK_IMPORTED_MODULE_12__.CarouselViewRendererUsingContext(this, this, WorkoutsViewUsingContext.DOMConfig);
    this.eventHandlerDelegate = new _framework_ui_view_delegate_CollectionViewEventHandlerDelegateUsingContext__WEBPACK_IMPORTED_MODULE_9__.CollectionViewEventHandlerDelegateUsingContext(this, this.eventForwarder);
    this.chartRefs = [];
    this.getIdForItemInNamedCollection = this.getIdForItemInNamedCollection.bind(this);
    this.getItemId = this.getItemId.bind(this);
    let context = _framework_ui_context_ContextualInformationHelper__WEBPACK_IMPORTED_MODULE_6__.ContextualInformationHelper.getInstance().addContextFromView(this, _AppTypes__WEBPACK_IMPORTED_MODULE_0__.STATE_NAMES.workouts, 'Workouts');
    _framework_ui_context_ContextualInformationHelper__WEBPACK_IMPORTED_MODULE_6__.ContextualInformationHelper.getInstance().addActionToContext(context, 'template', 'Copy exercises to Current Workout', this.eventHandlerDelegate.eventActionClicked, 'fas fa-copy');
    _framework_ui_context_ContextualInformationHelper__WEBPACK_IMPORTED_MODULE_6__.ContextualInformationHelper.getInstance().addActionToContext(context, 'continue', 'Continue Current Workout', this.eventHandlerDelegate.eventActionClicked, 'fas fa-clipboard-list');
  }

  getItemDescription(from, item) {
    let buffer = '';

    if (item.exercises) {
      item.exercises.forEach(exercise => {
        buffer += `<strong>${exercise.name}</strong>: `;

        if (exercise.type === 'cardio') {
          buffer += `${exercise.distance} km in ${exercise.duration}`;
        } else {
          buffer += `${exercise.sets} sets of ${exercise.reps} reps in ${exercise.duration}`;
        }

        buffer += `<br/>`;
      });
    }

    return buffer;
  }

  canDeleteItem(view, selectedItem) {
    return selectedItem.completed;
  }

  compareItemsForEquality(item1, item2) {
    return (0,_framework_util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_13__.isSameMongo)(item1, item2);
  }

  getItemId(from, item) {
    return this.getIdForItemInNamedCollection(from, item);
  }

  getIdForItemInNamedCollection(name, item) {
    return item._id;
  }

  calculateExerciseSummary(item) {
    let result = {
      weight: 0,
      distance: 0,
      duration: '00:00'
    };

    if (item.exercises) {
      for (let index = 0; index < item.exercises.length; index++) {
        const exercise = item.exercises[index];
        result.weight += exercise.weight;
        result.distance += exercise.distance;
        result.duration = (0,_framework_util_DurationFunctions__WEBPACK_IMPORTED_MODULE_11__.addDurations)(result.duration, exercise.duration);
      }
    }

    return result;
  }

  renderDisplayForItemInNamedCollection(containerEl, name, item) {
    let summary = this.calculateExerciseSummary(item);
    let buffer = '';
    buffer += `<h5 class="card-title">`;

    if (item.name) {
      buffer += `${item.name}</h5>`;
      buffer += `<h6 class="card-subtitle">${moment__WEBPACK_IMPORTED_MODULE_3___default()(item.createdOn, 'YYYYMMDDHHmmss').format('ddd, DD/MM/YYYY HH:mm')}</h6>`;
    } else {
      if (item.completed) {
        buffer += `${moment__WEBPACK_IMPORTED_MODULE_3___default()(item.createdOn, 'YYYYMMDDHHmmss').format('ddd, DD/MM/YYYY HH:mm')}</h5>`;
      } else {
        buffer += 'Current</h5>';
      }
    }

    buffer += `<ul class="list-group list-group-flush">`;
    buffer += `<li class="list-group-item"><strong>Duration:</strong> ${summary.duration}</li>`;
    if (summary.weight > 0) buffer += `<li class="list-group-item"><strong>Total Weight:</strong> ${summary.weight}</li>`;
    if (summary.distance > 0) buffer += `<li class="list-group-item"><strong>Total Distance: </strong> ${summary.distance}</li>`;
    buffer += `</ul>`;
    containerEl.innerHTML = buffer;
  }

  hasPermissionToDeleteItemInNamedCollection(name, item) {
    return item.completed;
  }

  hasPermissionToActionItemInNamedCollection(actionName, name, item) {
    let result = false;

    if (actionName === 'template') {
      if (item.completed && item.completed === true) {
        result = true;
      }
    }

    if (actionName === 'continue') {
      if (item.completed === false) {
        result = true;
      }
    }

    return result;
  }

  getModifierForItemInNamedCollection(name, item) {
    let result = _framework_ui_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_8__.Modifier.inactive;

    if (item.completed) {
      if (item.completed !== true) {
        result = _framework_ui_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_8__.Modifier.active;
      }
    }

    return result;
  }

  renderBackgroundForItemInNamedCollection(containerEl, name, item) {
    /*
    Remove a previous chart reference
     */
    let foundIndex = this.chartRefs.findIndex(ref => ref._id === item._id);

    if (foundIndex) {
      //this.chartRefs[foundIndex].chart?.destroy();
      logger(`Removing old chart reference for workout ${item._id}`);
      this.chartRefs.splice(foundIndex, 1);
    }

    logger(`Rendering chart for`);
    logger(item); // we are going to render a chart for the workout

    if (item.exercises) {
      const dataSourceKeyId = this.getDataSourceKeyId();
      const resultDataKeyId = this.getIdForItemInNamedCollection(name, item);
      let canvas = document.createElement('canvas'); //browserUtil.addAttributes(canvas,[{name:'style',value:'height:100%; width:100%'}]);

      canvas.setAttribute(this.collectionUIConfig.keyId, resultDataKeyId);
      canvas.setAttribute(dataSourceKeyId, this.collectionUIConfig.viewConfig.dataSourceId); // chart labels are the exercise names (shortened to 10 characters)

      let labels = [];
      let data = [];
      let bgColour = [];
      let brColour = [];
      item.exercises.forEach(exercise => {
        labels.push((0,_framework_util_MiscFunctions__WEBPACK_IMPORTED_MODULE_10__.truncateString)(exercise.name, 10));

        if (exercise.type === 'cardio') {
          data.push(exercise.distance);
          bgColour.push(WorkoutsViewUsingContext.bgCardio);
          brColour.push(WorkoutsViewUsingContext.borderCardio);
        } else {
          data.push(exercise.weight);
          bgColour.push(WorkoutsViewUsingContext.bgStrength);
          brColour.push(WorkoutsViewUsingContext.borderStrength);
        }
      });
      let chartData = {
        labels: labels,
        datasets: [{
          label: 'Exercises',
          data: data,
          backgroundColor: bgColour,
          borderColor: brColour,
          borderWidth: 1
        }]
      };
      const config = {
        type: 'bar',
        data: chartData,
        options: {
          responsive: false,
          animation: false,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      };
      logger(config);

      try {
        // @ts-ignore
        let ref = {
          _id: item._id,
          chart: new chart_js_auto__WEBPACK_IMPORTED_MODULE_4__["default"](canvas, config)
        };
        this.chartRefs.push(ref);
        containerEl.appendChild(canvas);
      } catch (err) {
        console.log(err);
      }
    }
  }

  static bgStrength = 'rgba(255, 0, 0, 0.2)';
  static bgCardio = 'rgba(0, 50, 255, 0.2)';
  static borderStrength = 'rgb(255, 50, 0)';
  static borderCardio = 'rgb(0, 50 , 255)';

  itemAction(view, actionName, selectedItem) {
    super.itemAction(view, actionName, selectedItem); // @ts-ignore

    if (actionName === WorkoutsViewUsingContext.DOMConfig.collectionConfig.extraActions[0].name) {
      // add the current list of exercises to the current workout
      _Controller__WEBPACK_IMPORTED_MODULE_1__["default"].getInstance().addWorkoutExercisesToCurrentWorkout(selectedItem);
    } // @ts-ignore


    if (actionName === WorkoutsViewUsingContext.DOMConfig.collectionConfig.extraActions[1].name) {
      // continue the current workout
      _App__WEBPACK_IMPORTED_MODULE_5__["default"].getInstance().showCurrentWorkout();
    }
  }

}

/***/ }),

/***/ "./src/framework/CommonTypes.ts":
/*!**************************************!*\
  !*** ./src/framework/CommonTypes.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ComparisonType": () => (/* binding */ ComparisonType)
/* harmony export */ });
let ComparisonType;

(function (ComparisonType) {
  ComparisonType[ComparisonType["equals"] = 0] = "equals";
  ComparisonType[ComparisonType["lessThan"] = 1] = "lessThan";
  ComparisonType[ComparisonType["lessThanEqual"] = 2] = "lessThanEqual";
  ComparisonType[ComparisonType["greaterThan"] = 3] = "greaterThan";
  ComparisonType[ComparisonType["greaterThanEqual"] = 4] = "greaterThanEqual";
  ComparisonType[ComparisonType["isNull"] = 5] = "isNull";
  ComparisonType[ComparisonType["isNotNull"] = 6] = "isNotNull";
  ComparisonType[ComparisonType["hasValue"] = 7] = "hasValue";
})(ComparisonType || (ComparisonType = {}));

/***/ }),

/***/ "./src/framework/model/BasicFieldOperations.ts":
/*!*****************************************************!*\
  !*** ./src/framework/model/BasicFieldOperations.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BasicFieldOperations": () => (/* binding */ BasicFieldOperations)
/* harmony export */ });
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");
/* harmony import */ var _DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DataObjectTypeDefs */ "./src/framework/model/DataObjectTypeDefs.ts");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ui_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ui/ConfigurationTypes */ "./src/framework/ui/ConfigurationTypes.ts");
/* harmony import */ var _security_SecurityManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../security/SecurityManager */ "./src/framework/security/SecurityManager.ts");






const flogger = debug__WEBPACK_IMPORTED_MODULE_2___default()('basic-field-operations-formatter');
const vlogger = debug__WEBPACK_IMPORTED_MODULE_2___default()('basic-field-operations-validator');
const glogger = debug__WEBPACK_IMPORTED_MODULE_2___default()('basic-field-operations-generator');
const rlogger = debug__WEBPACK_IMPORTED_MODULE_2___default()('basic-field-operations-renderer');
class BasicFieldOperations {
  static dateRegex = /^((0?[1-9]|[12]\d|31)\/(0?[13578]|1[02])\/(\d{2}|\d{4})|(0?[1-9]|[12]\d|30)\/(0?[469]|11])\/(\d{2}|\d{4})|(0?[1-9]|1\d|2[0-8])\/02\/(\d{2}|\d{4})|(29\/02\/(\d{2})?(0[48]|[2468][048]|[13579][26]))|(29\/02\/([02468][048]|[13579][26])00))$/;
  static emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/;
  static shortTimeRegex = /^([01]\d|2[0-3]):?([0-5]\d)$/;
  static timeRegex = /^([01]\d|2[0-3]):?([0-5]\d):?([0-5]\d)$/;
  static dateTimeRegex = /^((0?[1-9]|[12]\d|31)\/(0?[13578]|1[02])\/(\d{2}|\d{4})|(0?[1-9]|[12]\d|30)\/(0?[469]|11])\/(\d{2}|\d{4})|(0?[1-9]|1\d|2[0-8])\/02\/(\d{2}|\d{4})|(29\/02\/(\d{2})?(0[48]|[2468][048]|[13579][26]))|(29\/02\/([02468][048]|[13579][26])00))\s([01]\d|2[0-3]):?([0-5]\d):?([0-5]\d)$/;
  static basicPasswordRegex = /^[a-zA-Z0-9]{8,15}$/;
  static integerRegex = /^[+-]?\d+$/;
  static floatRegexp = /^[+-]?\d+(\.\d+)?$/;
  static booleanRegexp = /^true|false$/;
  static durationRegexp = /^(\d+:)?[0-5]?\d:[0-5]\d$/;
  static colourRegexp = /^#[0-9a-f]{6}$/;

  constructor() {
    this.previousFieldValues = [];
  }

  setSubElements(elements) {} // called when saving, change to final values


  formatValue(field, currentValue) {
    flogger(`Handling format value for field ${field.displayName} with value ${currentValue}`);
    let result = currentValue;

    switch (field.type) {
      // only need to change dates
      case _DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.date:
        {
          //convert to underlying number format
          result = moment__WEBPACK_IMPORTED_MODULE_0___default()(currentValue, 'DD/MM/YYYY').format('YYYYMMDD');
          break;
        }

      case _DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.datetime:
        {
          //convert to underlying number format
          result = moment__WEBPACK_IMPORTED_MODULE_0___default()(currentValue, 'DD/MM/YYYY HH:mm:ss').format('YYYYMMDDHHmmss');
          break;
        }

      case _DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.boolean:
        {
          result = currentValue.toLowerCase() === 'true';
          break;
        }

      case _DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.id:
        {
          if (field.idType === _ui_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_3__.KeyType.number) {
            result = parseInt(currentValue);
          }

          break;
        }

      case _DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.float:
        {
          let parsed = parseFloat(currentValue);

          if (!isNaN(parsed)) {
            result = parsed;
          }

          break;
        }

      case _DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.integer:
        {
          let parsed = parseFloat(currentValue);

          if (!isNaN(parsed)) {
            result = parsed;
          }

          break;
        }
    }

    flogger(`Handling format value for field ${field.displayName} with value ${currentValue} - result is ${result}`);
    return result;
  }

  isValidValue(field, currentValue) {
    vlogger(`Handling is valid value for field ${field.displayName} with value ${currentValue}`);
    let response = {
      isValid: true,
      resetOnFailure: false
    }; // basics first, is the field mandatory?

    if (field.mandatory) {
      // do we have any content?
      if (!currentValue || currentValue.trim().length === 0) {
        response.isValid = false;
        response.message = `${field.displayName} is required. Please enter a valid value.`;
        vlogger(`Handling is valid value for field ${field.displayName} with value ${currentValue} - is valid is ${response.isValid} with message ${response.message}`);
        return response;
      } // boolean is a special case, and must be true


      if (field.type === _DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.boolean) {
        if (currentValue.trim().toLowerCase() !== 'true') {
          response.isValid = false;
          response.message = `${field.displayName} is required and must be selected.`;
          vlogger(`Handling is valid value for field ${field.displayName} with value ${currentValue} - is valid is ${response.isValid} with message ${response.message}`);
          return response;
        }
      }
    } // ok, so we have some content, we need to check if the value is a valid format with regular expressions


    if (currentValue) {
      switch (field.type) {
        case _DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.datetime:
          {
            response.isValid = BasicFieldOperations.dateTimeRegex.test(currentValue);

            if (!response.isValid) {
              response.message = `${field.displayName} must be DD/MM/YYYY hh:mm`;
            }

            break;
          }

        case _DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.date:
          {
            response.isValid = BasicFieldOperations.dateRegex.test(currentValue);

            if (!response.isValid) {
              response.message = `${field.displayName} must be DD/MM/YYYY`;
            }

            break;
          }

        case _DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.float:
          {
            response.isValid = BasicFieldOperations.floatRegexp.test(currentValue);

            if (!response.isValid) {
              response.message = `${field.displayName} must be 00.00`;
            }

            break;
          }

        case _DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.id:
          {
            response.isValid = BasicFieldOperations.integerRegex.test(currentValue);

            if (!response.isValid) {
              response.message = `${field.displayName} must be an integer`;
            }

            break;
          }

        case _DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.email:
          {
            response.isValid = BasicFieldOperations.emailRegex.test(currentValue);

            if (!response.isValid) {
              response.message = `${field.displayName} must be an email address`;
            }

            break;
          }

        case _DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.integer:
          {
            response.isValid = BasicFieldOperations.integerRegex.test(currentValue);

            if (!response.isValid) {
              response.message = `${field.displayName} must be an integer`;
            }

            break;
          }

        case _DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.text:
          {
            break;
          }

        case _DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.password:
          {
            response.isValid = BasicFieldOperations.basicPasswordRegex.test(currentValue);

            if (!response.isValid) {
              response.message = `${field.displayName} must be 8 to 15 letters and digits only`;
            }

            break;
          }

        case _DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.time:
          {
            response.isValid = BasicFieldOperations.timeRegex.test(currentValue);

            if (!response.isValid) {
              response.message = `${field.displayName} must be 24 hour time format HH:MM:SS`;
            }

            break;
          }

        case _DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.shortTime:
          {
            response.isValid = BasicFieldOperations.shortTimeRegex.test(currentValue);

            if (!response.isValid) {
              response.message = `${field.displayName} must be 24 hour time format HH:MM`;
            }

            break;
          }

        case _DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.duration:
          {
            response.isValid = BasicFieldOperations.durationRegexp.test(currentValue);

            if (!response.isValid) {
              response.message = `${field.displayName} must be in the format MM:SS or 999:MM:SS`;
            }

            break;
          }

        case _DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.boolean:
          {
            response.isValid = BasicFieldOperations.booleanRegexp.test(currentValue);

            if (!response.isValid) {
              response.message = `${field.displayName} must be true or false`;
            }

            break;
          }

        case _DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.colour:
          {
            response.isValid = BasicFieldOperations.colourRegexp.test(currentValue);

            if (!response.isValid) {
              response.message = `${field.displayName} must be a hex colour value #ffffff`;
            }

            break;
          }
      }
    }

    vlogger(`Handling is valid value for field ${field.displayName} with value ${currentValue} - is valid is ${response.isValid} with message ${response.message}`);
    return response;
  }

  renderValue(field, fieldDef, currentValue) {
    rlogger(`Rendering value for field ${fieldDef.displayName} with new value ${currentValue}`); // ensure we don't end up in an endless loop
    // if the value hasn't changed return null
    // let index = this.previousFieldValues.findIndex((fieldValue) => fieldValue.id === field.id);
    // if (index >= 0) {
    //     //we have a previous value
    //     let fieldValue: FieldNameValue = this.previousFieldValues[index];
    //     rlogger(`Rendering value for field ${field.displayName} with new value ${currentValue} - previous value ${fieldValue.value}`);
    //     if (fieldValue.value === currentValue) return null;
    // }
    // either not yet seen or value has changed from previous

    if (currentValue) {
      // only attempt to render non-empty dates
      let newValue = currentValue;

      switch (fieldDef.type) {
        case _DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.date:
          {
            newValue = moment__WEBPACK_IMPORTED_MODULE_0___default()(currentValue, 'YYYYMMDD').format('DD/MM/YYYY');
            break;
          }

        case _DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.datetime:
          {
            newValue = moment__WEBPACK_IMPORTED_MODULE_0___default()(currentValue, 'YYYYMMDDHHmmss').format('DD/MM/YYYY HH:mm:ss');
            break;
          }
      } // store the previous value


      this.setPreviousValue(fieldDef, newValue);
      rlogger(`Rendering value for field ${fieldDef.displayName} with new value ${currentValue} - rendered to ${newValue}`);
      return newValue;
    } else {
      // empty value, no rendering required
      rlogger(`Rendering value for field ${fieldDef.displayName} with new value is empty - no rendering required`);
      return null;
    }
  }

  generate(field, isCreate) {
    let result = ''; // are we generating the field?

    if (field.generator) {
      // are we only generating on create
      if (field.generator.onCreation && isCreate) {
        result = this.generateValue(field);
        glogger(`Generating value for field ${field.displayName} with on creation ${result}`);
      } // or if we are modifying and should also be modifying the value


      if (field.generator.onModify && !isCreate) {
        result = this.generateValue(field);
        glogger(`Generating value for field ${field.displayName} with on modify ${result}`);
      }
    }

    return result;
  }

  setPreviousValue(field, newValue) {
    rlogger(`Storing previous value for field ${field.displayName} with  new value ${newValue}`);
    let fieldValue;
    let index = this.previousFieldValues.findIndex(fieldValue => fieldValue.id === field.id);

    if (index >= 0) {
      //we have a previous value
      fieldValue = this.previousFieldValues[index];
      rlogger(`Storing previous value for field ${field.displayName} with new value ${newValue} - old value was ${fieldValue}`);
      fieldValue.value = newValue;
    } else {
      // create a new record of the value
      fieldValue = {
        id: field.id,
        value: newValue
      };
      rlogger(`Storing previous value for field ${field.displayName} with new value ${newValue} - NO previous`);
      this.previousFieldValues.push(fieldValue);
    }
  }

  generateValue(field) {
    let result = '';

    switch (field.type) {
      case _DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.datetime:
        {
          result = moment__WEBPACK_IMPORTED_MODULE_0___default()().format('YYYYMMDDHHmmss');
          break;
        }

      case _DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.date:
        {
          result = moment__WEBPACK_IMPORTED_MODULE_0___default()().format('YYYYMMDD');
          break;
        }

      case _DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.float:
        {
          result = '0.0';
          break;
        }

      case _DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.id:
        {
          result = '-1';
          break;
        }

      case _DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.email:
        {
          result = 'me@me.com';
          break;
        }

      case _DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.integer:
        {
          result = '0';
          break;
        }

      case _DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.text:
        {
          result = '';
          break;
        }

      case _DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.password:
        {
          result = '';
          break;
        }

      case _DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.time:
        {
          result = '00:00:00';
          break;
        }

      case _DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.shortTime:
        {
          result = '00:00';
          break;
        }

      case _DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.duration:
        {
          result = '00:00';
          break;
        }

      case _DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.boolean:
        {
          result = 'false';
          break;
        }

      case _DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.uuid:
        {
          result = (0,uuid__WEBPACK_IMPORTED_MODULE_5__["default"])();
          break;
        }

      case _DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.userId:
        {
          result = `${_security_SecurityManager__WEBPACK_IMPORTED_MODULE_4__.SecurityManager.getInstance().getLoggedInUsername()}`;
          break;
        }

      case _DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.colour:
        {
          result = `#ffffff`;
          break;
        }
    }

    return result;
  }

}

/***/ }),

/***/ "./src/framework/model/BasicObjectDefinitionFactory.ts":
/*!*************************************************************!*\
  !*** ./src/framework/model/BasicObjectDefinitionFactory.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FIELD_ID": () => (/* binding */ FIELD_ID),
/* harmony export */   "FIELD_CreatedBy": () => (/* binding */ FIELD_CreatedBy),
/* harmony export */   "FIELD_ModifiedBy": () => (/* binding */ FIELD_ModifiedBy),
/* harmony export */   "FIELD_CreatedOn": () => (/* binding */ FIELD_CreatedOn),
/* harmony export */   "FIELD_ModifiedOn": () => (/* binding */ FIELD_ModifiedOn),
/* harmony export */   "FIELD_CreatedBy_Desc": () => (/* binding */ FIELD_CreatedBy_Desc),
/* harmony export */   "FIELD_ModifiedBy_Desc": () => (/* binding */ FIELD_ModifiedBy_Desc),
/* harmony export */   "FIELD_CreatedOn_Desc": () => (/* binding */ FIELD_CreatedOn_Desc),
/* harmony export */   "FIELD_ModifiedOn_Desc": () => (/* binding */ FIELD_ModifiedOn_Desc),
/* harmony export */   "BasicObjectDefinitionFactory": () => (/* binding */ BasicObjectDefinitionFactory)
/* harmony export */ });
/* harmony import */ var _ui_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ui/ConfigurationTypes */ "./src/framework/ui/ConfigurationTypes.ts");
/* harmony import */ var _BasicFieldOperations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BasicFieldOperations */ "./src/framework/model/BasicFieldOperations.ts");
/* harmony import */ var _DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DataObjectTypeDefs */ "./src/framework/model/DataObjectTypeDefs.ts");



const FIELD_ID = 'id';
const FIELD_CreatedBy = 'createdBy';
const FIELD_ModifiedBy = 'modifiedBy';
const FIELD_CreatedOn = 'createdOn';
const FIELD_ModifiedOn = 'modifiedOn';
const FIELD_CreatedBy_Desc = 'Created By';
const FIELD_ModifiedBy_Desc = 'Last Modified By';
const FIELD_CreatedOn_Desc = 'Created On';
const FIELD_ModifiedOn_Desc = 'Last Modified On';
class BasicObjectDefinitionFactory {
  constructor() {}

  static getInstance() {
    if (!BasicObjectDefinitionFactory._instance) {
      BasicObjectDefinitionFactory._instance = new BasicObjectDefinitionFactory();
    }

    return BasicObjectDefinitionFactory._instance;
  }

  generateStartingDisplayOrder(dataObjDef) {
    let result = [];
    dataObjDef.fields.forEach((fieldDef, index) => {
      let order = {
        fieldId: fieldDef.id,
        displayOrder: index
      }; // is this the created or modified date

      if (fieldDef.id === FIELD_CreatedOn) {
        order.displayOrder += 100;
      }

      if (fieldDef.id === FIELD_ModifiedOn) {
        order.displayOrder += 101;
      }

      if (fieldDef.type === _DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.userId) {
        order.displayOrder += 100;
      }

      result.push(order);
    });
    return result;
  }

  createBasicObjectDefinition(id, displayName, hasDataId, dataIdIsUUID, createModifierFields = true, idFieldName = FIELD_ID) {
    let objDef = {
      id: id,
      displayName: displayName,
      fields: []
    };
    let ops = new _BasicFieldOperations__WEBPACK_IMPORTED_MODULE_1__.BasicFieldOperations(); // do we need an id field?

    if (hasDataId) {
      let fieldType = _DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.id;

      if (dataIdIsUUID) {
        fieldType = _DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.uuid;
      }

      let fieldDef = {
        id: idFieldName,
        isKey: true,
        idType: _ui_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_0__.KeyType.number,
        type: fieldType,
        displayName: 'Id',
        mandatory: true,
        generator: {
          generator: ops,
          onModify: false,
          onCreation: true
        }
      };
      objDef.fields.push(fieldDef);
    } // add fields for created and modified


    if (createModifierFields) {
      this.addCreatedDateToArray(objDef.fields);
      this.addCreatedByToArray(objDef.fields);
      this.addModifiedByToArray(objDef.fields);
      this.addModifiedDateToArray(objDef.fields);
    }

    return objDef;
  }

  addStringFieldToObjDefinition(objDef, id, displayName, type, isMandatory = false, description = null, datasource = null) {
    return this.addStringFieldToArray(objDef.fields, id, displayName, type, isMandatory, description, datasource);
  }

  addNumericFieldToObjDefinition(objDef, id, displayName, type, isMandatory = false, description = null, datasource = null) {
    return this.addNumericFieldToArray(objDef.fields, id, displayName, type, isMandatory, description, datasource);
  }

  addDerivedFieldToObjDefinition(objDef, id, displayName, type, keyType, calculator, isMandatory = false, description = null, dataSource = null) {
    let fieldDef;

    if (keyType === _ui_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_0__.KeyType.number) {
      fieldDef = this.addNumericFieldToObjDefinition(objDef, id, displayName, type, isMandatory, description, dataSource);
    } else {
      fieldDef = this.addStringFieldToObjDefinition(objDef, id, displayName, type, isMandatory, description, dataSource);
    }

    fieldDef.derivedValue = calculator;
    return fieldDef;
  }

  addCreatedDateToArray(fields) {
    let fieldDef = this.addStringFieldToArray(fields, FIELD_CreatedOn, FIELD_CreatedOn_Desc, _DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.datetime, true, FIELD_CreatedOn_Desc); // add generator

    fieldDef.generator = {
      generator: new _BasicFieldOperations__WEBPACK_IMPORTED_MODULE_1__.BasicFieldOperations(),
      onCreation: true,
      onModify: false
    };
    fieldDef.displayOnly = true;
  }

  addModifiedDateToArray(fields) {
    let fieldDef = this.addStringFieldToArray(fields, FIELD_ModifiedOn, FIELD_ModifiedOn_Desc, _DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.datetime, true, FIELD_ModifiedOn_Desc); // add generator

    fieldDef.generator = {
      generator: new _BasicFieldOperations__WEBPACK_IMPORTED_MODULE_1__.BasicFieldOperations(),
      onCreation: true,
      onModify: true
    };
    fieldDef.displayOnly = true;
  }

  addCreatedByToArray(fields) {
    let fieldDef = this.addNumericFieldToArray(fields, FIELD_CreatedBy, FIELD_CreatedBy_Desc, _DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.userId, true, FIELD_CreatedBy_Desc); // add generator

    fieldDef.generator = {
      generator: new _BasicFieldOperations__WEBPACK_IMPORTED_MODULE_1__.BasicFieldOperations(),
      onCreation: true,
      onModify: false
    };
    fieldDef.displayOnly = true;
  }

  addModifiedByToArray(fields) {
    let fieldDef = this.addStringFieldToArray(fields, FIELD_ModifiedBy, FIELD_ModifiedBy_Desc, _DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.userId, true, FIELD_ModifiedBy_Desc); // add generator

    fieldDef.generator = {
      generator: new _BasicFieldOperations__WEBPACK_IMPORTED_MODULE_1__.BasicFieldOperations(),
      onCreation: true,
      onModify: true
    };
    fieldDef.displayOnly = true;
  }

  addFieldToArray(fields, keyType, id, displayName, type, isMandatory = false, description = null, datasource = null) {
    let fieldDef = {
      id: id,
      isKey: false,
      idType: keyType,
      type: type,
      displayName: displayName,
      mandatory: isMandatory,
      displayOnly: false
    };

    if (isMandatory) {
      // add generator
      fieldDef.generator = {
        generator: new _BasicFieldOperations__WEBPACK_IMPORTED_MODULE_1__.BasicFieldOperations(),
        onCreation: true,
        onModify: false
      };
    }

    if (description) fieldDef.description = description;
    if (datasource) fieldDef.dataSource = datasource;
    fields.push(fieldDef);
    return fieldDef;
  }

  addStringFieldToArray(fields, id, displayName, type, isMandatory = false, description = null, datasource = null) {
    return this.addFieldToArray(fields, _ui_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_0__.KeyType.string, id, displayName, type, isMandatory, description, datasource);
  }

  addNumericFieldToArray(fields, id, displayName, type, isMandatory = false, description = null, datasource = null) {
    return this.addFieldToArray(fields, _ui_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_0__.KeyType.string, id, displayName, type, isMandatory, description, datasource);
  }

}

/***/ }),

/***/ "./src/framework/model/DataObjectController.ts":
/*!*****************************************************!*\
  !*** ./src/framework/model/DataObjectController.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DataObjectController": () => (/* binding */ DataObjectController)
/* harmony export */ });
class DataObjectController {
  isCreatingNew = false;

  constructor(typeName) {
    this.typeName = typeName;
    this.listeners = [];
  }

  addListener(listener) {
    this.listeners.push(listener);
  }

  startNewObject() {
    let result = false;

    if (!this.isCreatingNew) {
      result = this._startNewObject();
      this.isCreatingNew = result;
    }

    return result;
  }

  isCreatingNewObject() {
    return this.isCreatingNew;
  }

  informListenersOfCreate(dataObj) {
    this.isCreatingNew = false;
    this.listeners.forEach(listener => listener.create(this, this.typeName, dataObj));
  }

  informListenersOfUpdate(dataObj) {
    this.isCreatingNew = false;
    this.listeners.forEach(listener => listener.update(this, this.typeName, dataObj));
  }

  informListenersOfDelete(dataObj) {
    this.isCreatingNew = false;
    this.listeners.forEach(listener => listener.delete(this, this.typeName, dataObj));
  } // return false, if the creation was cancelled


}

/***/ }),

/***/ "./src/framework/model/DataObjectTypeDefs.ts":
/*!***************************************************!*\
  !*** ./src/framework/model/DataObjectTypeDefs.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FieldType": () => (/* binding */ FieldType)
/* harmony export */ });
let FieldType;

(function (FieldType) {
  FieldType["id"] = "Id";
  FieldType["uuid"] = "UUID";
  FieldType["text"] = "Text";
  FieldType["integer"] = "Integer";
  FieldType["float"] = "Number";
  FieldType["date"] = "Date";
  FieldType["time"] = "Time";
  FieldType["shortTime"] = "Short Time";
  FieldType["datetime"] = "Datetime";
  FieldType["email"] = "Email";
  FieldType["password"] = "Password";
  FieldType["boolean"] = "True/False";
  FieldType["userId"] = "User";
  FieldType["choice"] = "Choice";
  FieldType["limitedChoice"] = "Limited Choice";
  FieldType["largeText"] = "TextArea";
  FieldType["collection"] = "Collection";
  FieldType["duration"] = "Duration";
  FieldType["colour"] = "Colour";
  FieldType["subObject"] = "Sub Object";
})(FieldType || (FieldType = {}));

/***/ }),

/***/ "./src/framework/model/ObjectDefinitionRegistry.ts":
/*!*********************************************************!*\
  !*** ./src/framework/model/ObjectDefinitionRegistry.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ObjectDefinitionRegistry": () => (/* binding */ ObjectDefinitionRegistry)
/* harmony export */ });
/* harmony import */ var _DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DataObjectTypeDefs */ "./src/framework/model/DataObjectTypeDefs.ts");
/* harmony import */ var _BasicObjectDefinitionFactory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BasicObjectDefinitionFactory */ "./src/framework/model/BasicObjectDefinitionFactory.ts");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _BasicFieldOperations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./BasicFieldOperations */ "./src/framework/model/BasicFieldOperations.ts");




const logger = debug__WEBPACK_IMPORTED_MODULE_2___default()('object-definition-registry');
class ObjectDefinitionRegistry {
  constructor() {
    this.definitions = [];
  }

  static getInstance() {
    if (!ObjectDefinitionRegistry._instance) {
      ObjectDefinitionRegistry._instance = new ObjectDefinitionRegistry();
    }

    return ObjectDefinitionRegistry._instance;
  }

  findDefinition(id) {
    let result = null;
    const index = this.definitions.findIndex(definition => definition.id === id);

    if (index >= 0) {
      result = this.definitions[index];
    }

    return result;
  }

  addDefinition(id, displayName, hasDataId, dataIdIsUUID, createModifierFields = true, idFieldName = _BasicObjectDefinitionFactory__WEBPACK_IMPORTED_MODULE_1__.FIELD_ID) {
    logger(`Adding definition for ${id} with name ${displayName}`);
    let result = this.findDefinition(id);

    if (result) {
      return result;
    } else {
      let definition = _BasicObjectDefinitionFactory__WEBPACK_IMPORTED_MODULE_1__.BasicObjectDefinitionFactory.getInstance().createBasicObjectDefinition(id, displayName, hasDataId, dataIdIsUUID, createModifierFields, idFieldName);
      this.definitions.push(definition);
      return definition;
    }
  }

  createInstanceFromDef(definition) {
    logger(`Creating instance for definition ${definition.displayName}`);
    let result = {};
    const fieldOps = new _BasicFieldOperations__WEBPACK_IMPORTED_MODULE_3__.BasicFieldOperations();
    definition.fields.forEach(fieldDef => {
      if (fieldDef.generator && fieldDef.generator.onCreation) {
        let fieldValue = fieldDef.generator.generator.generate(fieldDef, true);

        switch (fieldDef.type) {
          case _DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_0__.FieldType.date:
          case _DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_0__.FieldType.datetime:
            {
              break;
            }

          default:
            {
              fieldValue = fieldOps.formatValue(fieldDef, fieldValue);
              break;
            }
        }

        logger(`Setting default values for ${fieldDef.displayName} to ${fieldValue}`);
        result[fieldDef.id] = fieldValue;
      }

      if (fieldDef.type === _DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_0__.FieldType.collection) {
        result[fieldDef.id] = [];
      }
    });
    return result;
  }

  createInstance(id) {
    logger(`Creating instance for definition ${id}`);
    let result = {};
    const definition = this.findDefinition(id);

    if (definition) {
      result = this.createInstanceFromDef(definition);
    }

    return result;
  }

}

/***/ }),

/***/ "./src/framework/network/ApiUtil.ts":
/*!******************************************!*\
  !*** ./src/framework/network/ApiUtil.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ApiUtil": () => (/* binding */ ApiUtil)
/* harmony export */ });
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);

const apiLogger = debug__WEBPACK_IMPORTED_MODULE_0___default()('api-ts');
const apiResultsLogger = debug__WEBPACK_IMPORTED_MODULE_0___default()('api-ts-results');
class ApiUtil {
  static getInstance() {
    if (!ApiUtil._instance) {
      ApiUtil._instance = new ApiUtil();
    }

    return ApiUtil._instance;
  }

  async postFetchJSON(url, query) {
    const postParameters = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query
      })
    };
    const response = await fetch(url, postParameters);
    return response.json();
  }
  /*
      Utility function for calling JSON POST requests
      Parameters:
      1.  URL to send the POST request too;
      2.  parameters object whose attribute (name/values) are the request parameters; and
      3.  A function to receive the results when the fetch has completed
          The callback function should have the following form
          callback (jsonDataReturned, httpStatusCode)
          a)  A successful fetch will return the JSON data in the first parameter and a status code of the server
          b)  Parameters that cannot be converted to JSON format will give a null data and code 404
          c)  A server error will give that code and no data
    */


  apiFetchJSONWithPost(request) {
    apiLogger(`Executing fetch with URL ${request.originalRequest.url} with body ${request.originalRequest.params}`);

    try {
      JSON.stringify(request.originalRequest.params);
    } catch (error) {
      apiLogger('Unable to convert parameters to JSON');
      apiLogger(request.originalRequest.params, 100);
      request.callback(null, 404, request.queueType, request.requestId);
    }

    const postParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...request.originalRequest.params
      })
    };
    this.fetchJSON(request.originalRequest.url, postParameters, request.callback, request.queueType, request.requestId);
  }

  apiFetchJSONWithGet(request) {
    apiLogger(`Executing GET fetch with URL ${request.originalRequest.url} with id ${request.originalRequest.params.id}`);
    const getParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    if (request.originalRequest.params.id && !request.wasOffline) request.originalRequest.url += `/${request.originalRequest.params.id}`;
    this.fetchJSON(request.originalRequest.url, getParameters, request.callback, request.queueType, request.requestId);
  }

  apiFetchJSONWithDelete(request) {
    apiLogger(`Executing DELETE fetch with URL ${request.originalRequest.url} with id ${request.originalRequest.params.id}`);
    const delParameters = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    if (request.originalRequest.params.id && !request.wasOffline) request.originalRequest.url += `/${request.originalRequest.params.id}`;
    this.fetchJSON(request.originalRequest.url, delParameters, request.callback, request.queueType, request.requestId);
  }

  apiFetchJSONWithPut(request) {
    apiLogger(`Executing PUT fetch with URL ${request.originalRequest.url} with id ${request.originalRequest.params.id}`);
    const putParameters = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...request.originalRequest.params
      })
    };
    if (request.originalRequest.params.id && !request.wasOffline) request.originalRequest.url += `/${request.originalRequest.params.id}`;
    this.fetchJSON(request.originalRequest.url, putParameters, request.callback, request.queueType, request.requestId);
  }

  fetchJSON(url, parameters, callback, queueType, requestId) {
    fetch(url, parameters).then(response => {
      apiLogger(`Response code was ${response.status}`);

      if (response.status >= 200 && response.status <= 299) {
        return response.json();
      }

      if (response.status === 400) {
        apiResultsLogger(response.json());
      }
    }).then(data => {
      apiResultsLogger(data);
      callback(data, 200, queueType, requestId);
    }).catch(error => {
      apiLogger(error);
      callback(null, 500, queueType, requestId);
    });
  }

}

/***/ }),

/***/ "./src/framework/network/CallbackRegistry.ts":
/*!***************************************************!*\
  !*** ./src/framework/network/CallbackRegistry.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CallbackRegistry": () => (/* binding */ CallbackRegistry)
/* harmony export */ });
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);

const logger = debug__WEBPACK_IMPORTED_MODULE_0___default()('callback-registry');
class CallbackRegistry {
  callbacks = [];

  constructor() {}

  static getInstance() {
    if (!CallbackRegistry._instance) {
      CallbackRegistry._instance = new CallbackRegistry();
    }

    return CallbackRegistry._instance;
  }

  addRegisterCallback(id, fn) {
    logger(`Adding callback function with id ${id}`);
    this.callbacks.push({
      id: id,
      fn: fn
    });
  }

  getCallbackById(id) {
    const defaultFn = function (data, status, associatedStateName) {
      console.error(`Callback received with status ${status}, state name ${associatedStateName} where the callback was never registered`);
    };

    const foundIndex = this.callbacks.findIndex(callback => callback.id === id);

    if (foundIndex >= 0) {
      return this.callbacks[foundIndex].fn;
    }

    return defaultFn;
  }

}

/***/ }),

/***/ "./src/framework/network/DownloadManager.ts":
/*!**************************************************!*\
  !*** ./src/framework/network/DownloadManager.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DownloadManager": () => (/* binding */ DownloadManager)
/* harmony export */ });
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");
/* harmony import */ var _Types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Types */ "./src/framework/network/Types.ts");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _CallbackRegistry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CallbackRegistry */ "./src/framework/network/CallbackRegistry.ts");
/* harmony import */ var _OfflineManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./OfflineManager */ "./src/framework/network/OfflineManager.ts");
/* harmony import */ var _ApiUtil__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ApiUtil */ "./src/framework/network/ApiUtil.ts");






const logger = debug__WEBPACK_IMPORTED_MODULE_1___default()('api-ts');
class DownloadManager {
  constructor() {
    this.backgroundQueue = [];
    this.priorityQueue = [];
    this.inProgress = [];
    this.backgroundChangeListener = null;
    this.priorityChangeListener = null;
    this.callbackForQueueRequest = this.callbackForQueueRequest.bind(this);
  }

  static getInstance() {
    if (!DownloadManager._instance) {
      DownloadManager._instance = new DownloadManager();
    }

    return DownloadManager._instance;
  }

  processOfflineItems() {
    logger(`Checking for offline items`);
    _OfflineManager__WEBPACK_IMPORTED_MODULE_3__.OfflineManager.getInstance().processQueuedResults();
  }

  setBackgroundChangeListener(uiChangeListener) {
    this.backgroundChangeListener = uiChangeListener;
  }

  setPriorityChangeListener(uiChangeListener) {
    this.priorityChangeListener = uiChangeListener;
  }

  getPriorityQueueCount() {
    return this.priorityQueue.length;
  }

  getBackgroundQueueCount() {
    return this.backgroundQueue.length;
  }

  addQLApiRequest(url, query, variables, callbackId, state, isPriority = false) {
    let request = {
      url: url,
      type: _Types__WEBPACK_IMPORTED_MODULE_0__.RequestType.POST,
      params: {
        query: query,
        variables: variables
      },
      callbackId: callbackId,
      associatedStateName: state
    };
    this.addApiRequest(request, isPriority);
  }

  addQLMutationRequest(url, mutation, variables, callbackId, state, isPriority = false) {
    let request = {
      url: url,
      type: _Types__WEBPACK_IMPORTED_MODULE_0__.RequestType.POST,
      params: {
        mutation: mutation,
        variables: variables
      },
      callbackId: callbackId,
      associatedStateName: state
    };
    this.addApiRequest(request, isPriority);
  }

  async addApiRequest(jsonRequest, isPriority = false, wasOffline = false) {
    // add a new requestId to the request for future tracking
    const requestId = (0,uuid__WEBPACK_IMPORTED_MODULE_5__["default"])();
    logger(`Adding Queue Request ${requestId}`);
    logger(jsonRequest); // are we currently offline?

    if (_OfflineManager__WEBPACK_IMPORTED_MODULE_3__.OfflineManager.getInstance().areWeOffline()) {
      logger(`We are offline, queueing request for when server back online.`);
      _OfflineManager__WEBPACK_IMPORTED_MODULE_3__.OfflineManager.getInstance().addOfflineRequest(jsonRequest); // let the callback function know, with a custom code to let the receiver know there was a problem

      _CallbackRegistry__WEBPACK_IMPORTED_MODULE_2__.CallbackRegistry.getInstance().getCallbackById(jsonRequest.callbackId)(jsonRequest.params, 500, jsonRequest.associatedStateName, false);
      return;
    } // we are online (hopefully), continue for now, we will catch offline errors later


    if (isPriority) {
      let managerRequest = {
        originalRequest: jsonRequest,
        requestId: requestId,
        queueType: _Types__WEBPACK_IMPORTED_MODULE_0__.queueType.PRIORITY,
        callback: this.callbackForQueueRequest,
        wasOffline: wasOffline
      };
      this.priorityQueue.push(managerRequest);
      if (this.priorityChangeListener) this.priorityChangeListener.handleEventAddToQueue();
    } else {
      let managerRequest = {
        originalRequest: jsonRequest,
        requestId: requestId,
        queueType: _Types__WEBPACK_IMPORTED_MODULE_0__.queueType.BACKGROUND,
        callback: this.callbackForQueueRequest,
        wasOffline: wasOffline
      };
      this.backgroundQueue.push(managerRequest);
      if (this.backgroundChangeListener) this.backgroundChangeListener.handleEventAddToQueue();
    }

    this.processQueues();
  }

  async processPriorityQueue() {
    const queueItem = this.priorityQueue.shift();
    if (queueItem !== undefined) this.inProgress.push(queueItem);
    if (queueItem !== undefined) this.initiateFetchForQueueItem(queueItem);
  }

  async processBackgroundQueue() {
    const queueItem = this.backgroundQueue.shift();
    if (queueItem !== undefined) this.inProgress.push(queueItem);
    if (queueItem !== undefined) this.initiateFetchForQueueItem(queueItem);
  }

  async processQueues() {
    let totalQueuedItems = this.priorityQueue.length + this.backgroundQueue.length;

    while (totalQueuedItems > 0) {
      logger(`processing queue, items remaining ${totalQueuedItems}`); // priority queue takes priority

      if (this.priorityQueue.length > 0) {
        await this.processPriorityQueue();
      } else if (this.backgroundQueue.length > 0) {
        await this.processBackgroundQueue();
      }

      totalQueuedItems = this.priorityQueue.length + this.backgroundQueue.length;
    }
  }

  callbackForQueueRequest(jsonData, httpStatus, queueId, requestId) {
    // let the listeners know about the completion
    if (queueId === _Types__WEBPACK_IMPORTED_MODULE_0__.queueType.PRIORITY) {
      // priority
      if (this.priorityChangeListener) this.priorityChangeListener.handleEventRemoveFromQueue();
    } else if (this.backgroundChangeListener) this.backgroundChangeListener.handleEventRemoveFromQueue();

    logger(`received callback for queue ${queueId} request ${requestId} with status ${httpStatus}`); // find the item in the in progress

    const foundIndex = this.inProgress.findIndex(element => element.requestId === requestId);

    if (foundIndex >= 0) {
      // remove from in progress
      const queueItem = this.inProgress[foundIndex];
      this.inProgress.splice(foundIndex, 1);
      logger(queueItem); // are we offline http status of 500

      if (httpStatus === 500) {
        logger(`queue item ${queueItem.requestId} - server offline, queueing for later`);
        _OfflineManager__WEBPACK_IMPORTED_MODULE_3__.OfflineManager.getInstance().addOfflineRequest(queueItem.originalRequest); // let the callback function know, with a custom code to let the receiver know there was a problem

        _CallbackRegistry__WEBPACK_IMPORTED_MODULE_2__.CallbackRegistry.getInstance().getCallbackById(queueItem.originalRequest.callbackId)(queueItem.originalRequest.params, httpStatus, queueItem.originalRequest.associatedStateName, queueItem.wasOffline);
      } else {
        logger(`finished for queue item ${queueItem.requestId} with possible offline id of ${queueItem.originalRequest._id}`); // let the callback function know

        _CallbackRegistry__WEBPACK_IMPORTED_MODULE_2__.CallbackRegistry.getInstance().getCallbackById(queueItem.originalRequest.callbackId)(jsonData, httpStatus, queueItem.originalRequest.associatedStateName, queueItem.wasOffline);
      }
    }
  }

  initiateFetchForQueueItem(item) {
    logger(`Download Manager: initiating fetch for queue item ${item.requestId}`);
    logger(item);

    switch (item.originalRequest.type) {
      case _Types__WEBPACK_IMPORTED_MODULE_0__.RequestType.POST:
        {
          _ApiUtil__WEBPACK_IMPORTED_MODULE_4__.ApiUtil.getInstance().apiFetchJSONWithPost(item);
          break;
        }

      case _Types__WEBPACK_IMPORTED_MODULE_0__.RequestType.GET:
        {
          _ApiUtil__WEBPACK_IMPORTED_MODULE_4__.ApiUtil.getInstance().apiFetchJSONWithGet(item);
          break;
        }

      case _Types__WEBPACK_IMPORTED_MODULE_0__.RequestType.DELETE:
        {
          _ApiUtil__WEBPACK_IMPORTED_MODULE_4__.ApiUtil.getInstance().apiFetchJSONWithDelete(item);
          break;
        }

      case _Types__WEBPACK_IMPORTED_MODULE_0__.RequestType.PUT:
        {
          _ApiUtil__WEBPACK_IMPORTED_MODULE_4__.ApiUtil.getInstance().apiFetchJSONWithPut(item);
          break;
        }
    }
  }

}

/***/ }),

/***/ "./src/framework/network/OfflineManager.ts":
/*!*************************************************!*\
  !*** ./src/framework/network/OfflineManager.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OfflineManager": () => (/* binding */ OfflineManager)
/* harmony export */ });
/* harmony import */ var _Poller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Poller */ "./src/framework/network/Poller.ts");
/* harmony import */ var _state_IndexedDBStateManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../state/IndexedDBStateManager */ "./src/framework/state/IndexedDBStateManager.ts");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");
/* harmony import */ var _DownloadManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DownloadManager */ "./src/framework/network/DownloadManager.ts");
/* harmony import */ var _notification_NotificationManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../notification/NotificationManager */ "./src/framework/notification/NotificationManager.ts");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_4__);






const logger = debug__WEBPACK_IMPORTED_MODULE_4___default()('offline-manager');
class OfflineManager {
  static DB_NAME = 'offline.manager.db';
  static OBJECT_STORE = 'offline.manager.db.requests';

  constructor() {
    this.serverBackOnline = this.serverBackOnline.bind(this);
    const indexedDB = new _state_IndexedDBStateManager__WEBPACK_IMPORTED_MODULE_1__.IndexedDBStateManager();
    indexedDB.initialise(OfflineManager.DB_NAME, [{
      name: OfflineManager.OBJECT_STORE,
      keyField: '_id'
    }]);
    this.persistence = indexedDB;
    this.persistence.addChangeListenerForName(OfflineManager.OBJECT_STORE, this);
  }

  static getInstance() {
    if (!OfflineManager._instance) {
      OfflineManager._instance = new OfflineManager();
    }

    return OfflineManager._instance;
  }

  processQueuedResults() {
    // find any requests in the persistence
    this.persistence.getStateByName(OfflineManager.OBJECT_STORE);
  }

  serverBackOnline() {
    _notification_NotificationManager__WEBPACK_IMPORTED_MODULE_3__.NotificationManager.getInstance().show('Server', 'Server is back online.');
    this.processQueuedResults();
  }

  areWeOffline() {
    return _Poller__WEBPACK_IMPORTED_MODULE_0__.Poller.getInstance().isPolling();
  }

  addOfflineRequest(jsonRequest) {
    if (!_Poller__WEBPACK_IMPORTED_MODULE_0__.Poller.getInstance().isPolling()) {
      _Poller__WEBPACK_IMPORTED_MODULE_0__.Poller.getInstance().startPolling(this.serverBackOnline);
      _notification_NotificationManager__WEBPACK_IMPORTED_MODULE_3__.NotificationManager.getInstance().show('Server', 'Server is offline, queueing local changes for when server is available', _notification_NotificationManager__WEBPACK_IMPORTED_MODULE_3__.NotificationType.warning);
    } // save the request with an id


    jsonRequest._id = (0,uuid__WEBPACK_IMPORTED_MODULE_5__["default"])();
    logger('Adding offline request');
    logger(jsonRequest);
    this.persistence.addNewItemToState(OfflineManager.OBJECT_STORE, jsonRequest, false);
  }

  getListenerName() {
    return "Offline manager";
  }

  stateChanged(managerName, name, offlineResults) {
    if (offlineResults && offlineResults.length > 0) {
      _notification_NotificationManager__WEBPACK_IMPORTED_MODULE_3__.NotificationManager.getInstance().show('Queued Changes', `There are ${offlineResults.length} queued changes, sending to server.`, _notification_NotificationManager__WEBPACK_IMPORTED_MODULE_3__.NotificationType.warning);
      offlineResults.forEach(request => {
        this.persistence.removeItemFromState(OfflineManager.OBJECT_STORE, request, false);
        logger(`Processing offline request with priority and from offline`);
        logger(request);
        _DownloadManager__WEBPACK_IMPORTED_MODULE_2__.DownloadManager.getInstance().addApiRequest(request, true, true);
      });
    }

    this.persistence.forceResetForGet(OfflineManager.OBJECT_STORE);
  }

  stateChangedItemAdded(managerName, name, itemAdded) {}

  stateChangedItemRemoved(managerName, name, itemRemoved) {}

  stateChangedItemUpdated(managerName, name, itemUpdated, itemNewValue) {}

  filterResults(managerName, name, filterResults) {}

}

/***/ }),

/***/ "./src/framework/network/Poller.ts":
/*!*****************************************!*\
  !*** ./src/framework/network/Poller.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Poller": () => (/* binding */ Poller)
/* harmony export */ });
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);

const logger = debug__WEBPACK_IMPORTED_MODULE_0___default()('poller');
class Poller {
  static INTERVAL_DEFAULT = 10000; // 30 seconds

  static URL_CALL = '/ping';
  interval = null;
  isPollingBool = false;

  constructor() {}

  static getInstance() {
    if (!Poller._instance) {
      Poller._instance = new Poller();
    }

    return Poller._instance;
  }

  startPolling(callback, delay = Poller.INTERVAL_DEFAULT) {
    this.isPollingBool = true;
    this.interval = setInterval(() => {
      logger(`Checking for server availability`);
      fetch(Poller.URL_CALL, {
        method: 'GET'
      }).then(response => {
        logger(`Response code was ${response.status} - server is now available`);
        this.stopPolling();
        callback();
      }).catch(error => {
        logger(error);
      });
    }, delay);
  }

  isPolling() {
    return this.isPollingBool;
  }

  stopPolling() {
    if (this.interval) clearInterval(this.interval);
    this.interval = null;
    this.isPollingBool = false;
  }

}

/***/ }),

/***/ "./src/framework/network/Types.ts":
/*!****************************************!*\
  !*** ./src/framework/network/Types.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RequestType": () => (/* binding */ RequestType),
/* harmony export */   "queueType": () => (/* binding */ queueType)
/* harmony export */ });
let RequestType;

(function (RequestType) {
  RequestType[RequestType["POST"] = 0] = "POST";
  RequestType[RequestType["GET"] = 1] = "GET";
  RequestType[RequestType["PUT"] = 2] = "PUT";
  RequestType[RequestType["DELETE"] = 3] = "DELETE";
})(RequestType || (RequestType = {}));

let queueType;

(function (queueType) {
  queueType[queueType["PRIORITY"] = 0] = "PRIORITY";
  queueType[queueType["BACKGROUND"] = 1] = "BACKGROUND";
})(queueType || (queueType = {}));

/***/ }),

/***/ "./src/framework/notification/BootstrapNotification.ts":
/*!*************************************************************!*\
  !*** ./src/framework/notification/BootstrapNotification.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BootstrapNotification": () => (/* binding */ BootstrapNotification)
/* harmony export */ });
/* harmony import */ var _Notification__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Notification */ "./src/framework/notification/Notification.ts");
/* harmony import */ var _NotificationManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NotificationManager */ "./src/framework/notification/NotificationManager.ts");


class BootstrapNotification extends _Notification__WEBPACK_IMPORTED_MODULE_0__.Notification {
  constructor(notificationManager) {
    super(notificationManager);
  } // Make the notification visible on the screen


  show(title, message, topOffset = 0, context, duration = 3000) {
    let containerId = this.notificationManager.getContainerId(); // convert the context to a background colour

    let bgColorClass = '';

    switch (context) {
      case _NotificationManager__WEBPACK_IMPORTED_MODULE_1__.NotificationType.info:
        {
          bgColorClass = 'bg-info';
          break;
        }

      case _NotificationManager__WEBPACK_IMPORTED_MODULE_1__.NotificationType.warning:
        {
          bgColorClass = 'bg-warning';
          break;
        }

      case _NotificationManager__WEBPACK_IMPORTED_MODULE_1__.NotificationType.message:
        {
          bgColorClass = 'bg-primary';
          break;
        }

      case _NotificationManager__WEBPACK_IMPORTED_MODULE_1__.NotificationType.priority:
        {
          bgColorClass = 'bg-danger';
          break;
        }

      default:
        {
          bgColorClass = "bg-info";
        }
    } // Creating the notification container div


    const containerNode = document.createElement('div');
    containerNode.className = 'notification toast';
    containerNode.style.top = `${topOffset}px`;
    containerNode.setAttribute("role", "alert");
    containerNode.setAttribute("data-autohide", "false"); // Adding the notification title node

    const titleNode = document.createElement('div');
    titleNode.className = `toast-header text-white ${bgColorClass}`;
    const titleTextNode = document.createElement('strong');
    titleTextNode.className = "mr-auto";
    titleTextNode.textContent = title; // Adding a little button on the notification

    const closeButtonNode = document.createElement('button');
    closeButtonNode.className = 'ml-2 mb-1 close';
    closeButtonNode.textContent = 'x';
    closeButtonNode.addEventListener('click', () => {
      this.notificationManager.remove(containerNode);
    }); // Adding the notification message content node

    const messageNode = document.createElement('div');
    messageNode.className = 'toast-body';
    messageNode.textContent = message; // Appending the container with all the elements newly created

    titleNode.appendChild(titleTextNode);
    titleNode.appendChild(closeButtonNode);
    containerNode.appendChild(titleNode);
    containerNode.appendChild(messageNode);
    containerNode.classList.add(`is-${context}`); // Inserting the notification to the page body

    const containerEl = document.getElementById(containerId);
    if (containerEl) containerEl.appendChild(containerNode); // activate it
    // @ts-ignore

    $(".notification").toast('show'); // Default duration delay

    if (duration <= 0) {
      duration = 2000;
    }

    setTimeout(() => {
      this.notificationManager.remove(containerNode);
    }, duration);
    return containerNode;
  }

}

/***/ }),

/***/ "./src/framework/notification/Notification.ts":
/*!****************************************************!*\
  !*** ./src/framework/notification/Notification.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Notification": () => (/* binding */ Notification)
/* harmony export */ });
class Notification {
  constructor(notificationManager) {
    this.show = this.show.bind(this);
    this.notificationManager = notificationManager; // Create DOM notification structure when instantiated

    this.containerId = this.notificationManager.getContainerId();
  } // Make the notification visible on the screen


}

/***/ }),

/***/ "./src/framework/notification/NotificationFactory.ts":
/*!***********************************************************!*\
  !*** ./src/framework/notification/NotificationFactory.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NotificationFactory": () => (/* binding */ NotificationFactory)
/* harmony export */ });
/* harmony import */ var _BootstrapNotification__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BootstrapNotification */ "./src/framework/notification/BootstrapNotification.ts");

class NotificationFactory {
  static getInstance() {
    if (!NotificationFactory._instance) {
      NotificationFactory._instance = new NotificationFactory();
    }

    return NotificationFactory._instance;
  }

  constructor() {}

  createNotification(manager) {
    return new _BootstrapNotification__WEBPACK_IMPORTED_MODULE_0__.BootstrapNotification(manager);
  }

}

/***/ }),

/***/ "./src/framework/notification/NotificationManager.ts":
/*!***********************************************************!*\
  !*** ./src/framework/notification/NotificationManager.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NotificationType": () => (/* binding */ NotificationType),
/* harmony export */   "NotificationManager": () => (/* binding */ NotificationManager)
/* harmony export */ });
/* harmony import */ var _NotificationFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NotificationFactory */ "./src/framework/notification/NotificationFactory.ts");

let NotificationType;

(function (NotificationType) {
  NotificationType[NotificationType["info"] = 0] = "info";
  NotificationType[NotificationType["warning"] = 1] = "warning";
  NotificationType[NotificationType["message"] = 2] = "message";
  NotificationType[NotificationType["priority"] = 3] = "priority";
})(NotificationType || (NotificationType = {}));

class NotificationManager {
  constructor() {
    this.notifications = [];
    this.currentCount = 0;
    this.offsetPerNotification = 120;
    this.containerId = 'notifications';
    this.show = this.show.bind(this);
  }

  static getInstance() {
    if (!NotificationManager._instance) {
      NotificationManager._instance = new NotificationManager();
    }

    return NotificationManager._instance;
  }

  getContainerId() {
    return this.containerId;
  }

  show(title, message, context = NotificationType.info, duration = 5000) {
    const notification = _NotificationFactory__WEBPACK_IMPORTED_MODULE_0__.NotificationFactory.getInstance().createNotification(this);
    const notificationNode = notification.show(title, message, this.currentCount * this.offsetPerNotification, context, duration);
    this.currentCount++;
    this.notifications.push(notificationNode);
  }

  remove(notificationNode) {
    const foundIndex = this.notifications.findIndex(element => element === notificationNode);

    if (foundIndex >= 0) {
      this.notifications.splice(foundIndex, 1); // re-arrange the remaining notifications

      this.notifications.map((notificationNode, index) => {
        // @ts-ignore
        notificationNode.style.top = `${this.offsetPerNotification * index}px`;
      });
    }

    const parentEl = notificationNode.parentElement;
    if (parentEl !== null) parentEl.removeChild(notificationNode);
    this.currentCount--;
    if (this.currentCount < 0) this.currentCount = 0;
  }

}

/***/ }),

/***/ "./src/framework/security/SecurityManager.ts":
/*!***************************************************!*\
  !*** ./src/framework/security/SecurityManager.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SecurityManager": () => (/* binding */ SecurityManager)
/* harmony export */ });
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);

const logger = debug__WEBPACK_IMPORTED_MODULE_0___default()('security-manager');
class SecurityManager {
  hash = null;
  logoutEl = null;

  constructor() {}

  static getInstance() {
    if (!SecurityManager._instance) {
      SecurityManager._instance = new SecurityManager();
    }

    return SecurityManager._instance;
  }

  onDocumentLoaded(logoutElementId) {
    this.logoutEl = document.getElementById(logoutElementId); // find the secret hash for the current user (if any)

    const username = this.getLoggedInUsername();

    if (username && username.trim().length > 0) {
      logger(`found user ${username}`);
      this.hash = localStorage.getItem(username);

      if (this.hash) {
        sessionStorage.setItem(username, this.hash);
      } else {
        this.hash = sessionStorage.getItem(username);
      }

      localStorage.removeItem(username);
      logger(`found user ${username} hash - removed from local storage`);
    }

    if (this.logoutEl) {
      this.logoutEl.addEventListener('click', event => {
        localStorage.removeItem(username);
        sessionStorage.removeItem(username);
      });
    }
  }

  isLoggedIn() {
    let isLoggedIn = false;

    try {
      // @ts-ignore
      if (loggedInUser) {
        isLoggedIn = true;
      }
    } catch (error) {}

    return isLoggedIn;
  }

  getLoggedInUserId() {
    let result = '';

    try {
      // @ts-ignore
      if (loggedInUser) {
        // @ts-ignore
        result = loggedInUser._id;
      }
    } catch (error) {}

    logger(`Logged in user id is ${result}`);
    return result;
  }

  getLoggedInUsername() {
    let result = '';

    try {
      // @ts-ignore
      if (loggedInUser) {
        // @ts-ignore
        result = loggedInUser.username;
      }
    } catch (error) {}

    logger(`Logged in user is ${result}`);
    return result;
  }

  getCurrentUser() {
    return this.getLoggedInUserId();
  }

  encryptString(value) {
    let result = value;

    if (this.hash) {
      // @ts-ignore
      result = CryptoJS.AES.encrypt(value, this.hash).toString();
    }

    return result;
  }

  decryptString(value) {
    let result = value;

    if (this.hash) {
      // @ts-ignore
      result = CryptoJS.AES.decrypt(value, this.hash).toString(CryptoJS.enc.Utf8);
    }

    return result;
  }

  encryptObject(dataObj) {
    return this.encryptString(JSON.stringify(dataObj));
  }

  decryptObject(value) {
    return JSON.parse(this.decryptString(value));
  }

}

/***/ }),

/***/ "./src/framework/socket/ChatManager.ts":
/*!*********************************************!*\
  !*** ./src/framework/socket/ChatManager.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ChatManager": () => (/* binding */ ChatManager)
/* harmony export */ });
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _SocketManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SocketManager */ "./src/framework/socket/SocketManager.ts");
/* harmony import */ var _Types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Types */ "./src/framework/socket/Types.ts");
/* harmony import */ var _state_BrowserStorageStateManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../state/BrowserStorageStateManager */ "./src/framework/state/BrowserStorageStateManager.ts");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");
/* harmony import */ var _util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../util/EqualityFunctions */ "./src/framework/util/EqualityFunctions.ts");







var UserStatus;

(function (UserStatus) {
  UserStatus[UserStatus["LoggedOut"] = 0] = "LoggedOut";
  UserStatus[UserStatus["LoggedIn"] = 1] = "LoggedIn";
})(UserStatus || (UserStatus = {}));

const cmLogger = debug__WEBPACK_IMPORTED_MODULE_0___default()('chat-manager');
class ChatManager {
  static chatLogKey = 'im-board-chat-logs';
  static blockedListKey = 'im-board-blocked-list';
  static favouriteListKey = 'im-board-favourite-list'; // TO DO chat logs, blocked list, favourites per user

  blockedList = [];
  favouriteList = [];
  loggedInUsers = [];
  currentUsername = '';
  unreadListener = null;

  constructor() {
    cmLogger('Setting up chat logs, blocked list, and favourites');
    this.chatLogs = [];
    this.chatListeners = [];
    this.chatUserListeners = [];
    this.localStorage = new _state_BrowserStorageStateManager__WEBPACK_IMPORTED_MODULE_4__.BrowserStorageStateManager(true, true, _util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_5__.isSameRoom); // connect to the socket manager

    _SocketManager__WEBPACK_IMPORTED_MODULE_2__.SocketManager.getInstance().addChatReceiver(this); // bind the receiver methods

    this.receiveLogin = this.receiveLogin.bind(this);
    this.receiveLogout = this.receiveLogout.bind(this);
    this.receiveInvitation = this.receiveInvitation.bind(this);
    this.receiveMessage = this.receiveMessage.bind(this);
    this.receiveQueuedMessages = this.receiveQueuedMessages.bind(this);
    this.receiveQueuedInvites = this.receiveQueuedInvites.bind(this);
    this.receiveJoinedRoom = this.receiveJoinedRoom.bind(this);
    this.receivedLeftRoom = this.receivedLeftRoom.bind(this);
  }

  static getInstance() {
    if (!ChatManager._instance) {
      ChatManager._instance = new ChatManager();
    }

    return ChatManager._instance;
  }

  addChatEventHandler(receiver) {
    this.chatListeners.push(receiver);
  }

  addChatUserEventHandler(receiver) {
    this.chatUserListeners.push(receiver);
  }

  isUserLoggedIn(username) {
    return this.loggedInUsers.findIndex(name => name === username) >= 0;
  }

  receiveUserList(users) {
    this.loggedInUsers = users;
    this.chatUserListeners.forEach(listener => listener.handleLoggedInUsersUpdated(users));
  }

  addUserToBlockedList(username) {
    let index = this.blockedList.findIndex(blocked => blocked === username);

    if (index < 0) {
      this.blockedList.push(username);
      this.saveBlockedList();
      this.chatUserListeners.forEach(listener => listener.handleBlockedUsersChanged(this.favouriteList));
    }
  }

  removeUserFromBlockedList(username) {
    let index = this.blockedList.findIndex(blocked => blocked === username);

    if (index >= 0) {
      this.blockedList.splice(index, 1);
      this.saveBlockedList();
      this.chatUserListeners.forEach(listener => listener.handleBlockedUsersChanged(this.favouriteList));
    }
  }

  isUserInBlockedList(username) {
    return this.blockedList.findIndex(blocked => blocked === username) >= 0;
  }

  addUserToFavouriteList(username) {
    let index = this.favouriteList.findIndex(favourite => favourite === username);

    if (index < 0) {
      this.favouriteList.push(username);
      this.saveFavouriteList();
      this.chatUserListeners.forEach(listener => listener.handleFavouriteUsersChanged(this.favouriteList));
    }
  }

  removeUserFromFavouriteList(username) {
    let index = this.favouriteList.findIndex(blocked => blocked === username);

    if (index >= 0) {
      this.favouriteList.splice(index, 1);
      this.saveFavouriteList();
      this.chatUserListeners.forEach(listener => listener.handleFavouriteUsersChanged(this.favouriteList));
    }
  }

  isUserInFavouriteList(username) {
    return this.favouriteList.findIndex(user => user === username) >= 0;
  }

  getFavouriteUserList() {
    return [...this.favouriteList];
  }

  getBlockedUserList() {
    return [...this.blockedList];
  }

  setCurrentUser(username) {
    cmLogger(`Setting current user ${username}`);
    this.currentUsername = username; // load previous logs

    let savedLogs = this.localStorage.getStateByName(ChatManager.chatLogKey + this.currentUsername);
    cmLogger(savedLogs);

    if (savedLogs) {
      this.chatLogs = savedLogs;
    } // load previous blocked list


    let blockedList = this.localStorage.getStateByName(ChatManager.blockedListKey + this.currentUsername);
    cmLogger(blockedList);

    if (blockedList) {
      this.blockedList = blockedList;
    } // load previous favourite list


    let favouriteList = this.localStorage.getStateByName(ChatManager.favouriteListKey + this.currentUsername);
    cmLogger(favouriteList);

    if (favouriteList) {
      this.favouriteList = favouriteList;
    }

    this.chatListeners.forEach(listener => listener.handleChatLogsUpdated());
  }

  getCurrentUser() {
    return this.currentUsername;
  }

  receiveJoinedRoom(users) {
    // we get this for all changes to a room, if the username is us can safely ignore
    //if (users.username === this.currentUsername) return;
    if (users.type !== _Types__WEBPACK_IMPORTED_MODULE_3__.InviteType.ChatRoom) return;
    let log = this.ensureChatLogExists(users.room);
    cmLogger(`User list for room ${users.room} - ${users.userList.join(',')}`);
    log.users = users.userList; // add a "message" for joined user

    let created = parseInt(moment__WEBPACK_IMPORTED_MODULE_1___default()().format('YYYYMMDDHHmmss'));
    const joinDateTime = moment__WEBPACK_IMPORTED_MODULE_1___default()().format('DD/MM/YYYY HH:mm');
    let message = {
      from: '',
      created: created,
      room: users.room,
      priority: _Types__WEBPACK_IMPORTED_MODULE_3__.Priority.Normal,
      type: _Types__WEBPACK_IMPORTED_MODULE_3__.InviteType.ChatRoom,
      message: `${users.username} joined the chat on ${joinDateTime}`
    };
    log.messages.push(message);
    this.saveLogs();
    this.chatListeners.forEach(listener => listener.handleChatLogUpdated(log, false));
  }

  receivedLeftRoom(users) {
    // we get this for all changes to a room, if the username is us can safely ignore
    if (users.type !== _Types__WEBPACK_IMPORTED_MODULE_3__.InviteType.ChatRoom) return;
    if (users.username === this.currentUsername) return;
    let log = this.ensureChatLogExists(users.room);
    cmLogger(`User list for room ${users.room} - ${users.userList.join(',')}`);
    log.users = users.userList; // add a "message" for leaving user

    let created = parseInt(moment__WEBPACK_IMPORTED_MODULE_1___default()().format('YYYYMMDDHHmmss'));
    const joinDateTime = moment__WEBPACK_IMPORTED_MODULE_1___default()().format('DD/MM/YYYY HH:mm');
    let message = {
      from: '',
      created: created,
      room: users.room,
      priority: _Types__WEBPACK_IMPORTED_MODULE_3__.Priority.Normal,
      type: _Types__WEBPACK_IMPORTED_MODULE_3__.InviteType.ChatRoom,
      message: `${users.username} left the chat on ${joinDateTime}`
    };
    log.messages.push(message);
    this.saveLogs();
    this.chatListeners.forEach(listener => listener.handleChatLogUpdated(log, false));
  }

  receiveInvitation(invite) {
    if (invite.type !== _Types__WEBPACK_IMPORTED_MODULE_3__.InviteType.ChatRoom) return; //  unless we are receiving an invite from someone in our blocked list, we automatically accept this invite

    if (!this.isUserInBlockedList(invite.from)) {
      cmLogger(`Invited to chat ${invite.room}`);
      const didChatAlreadyExist = this.doesChatRoomExist(invite.room);
      cmLogger(invite);
      cmLogger(`Letting the listeners know, if they are all happy to accept then we will join the room`);
      let happyToProceed = true;

      if (!didChatAlreadyExist) {
        this.chatListeners.forEach(listener => {
          if (!listener.handleNewInviteReceived(invite)) {
            happyToProceed = false;
          }
        });
      }

      if (happyToProceed) {
        let chatLog = this.ensureChatLogExists(invite.room); // keep a record of the type of invite

        chatLog.type = invite.type; // add the users in the invitation user list for the room, if not already added

        if (invite.userList) {
          invite.userList.forEach(username => {
            if (chatLog.users.findIndex(user => user === username) < 0) chatLog.users.push(invite.from);
          });
        }

        if (chatLog.users.findIndex(user => user === invite.from) < 0) chatLog.users.push(invite.from);
        this.saveLogs();
        cmLogger(`Joining chat ${invite.room}`);
        _SocketManager__WEBPACK_IMPORTED_MODULE_2__.SocketManager.getInstance().joinChat(this.getCurrentUser(), invite.room, _Types__WEBPACK_IMPORTED_MODULE_3__.InviteType.ChatRoom);
        this.chatListeners.forEach(listener => listener.handleChatLogUpdated(chatLog, false));
      }
    } else {
      cmLogger(`User ${invite.from} blocked`);
    }
  }

  receiveLogin(username) {
    cmLogger(`Handle login received for ${username}`); // keep track of the logged in users

    let index = this.loggedInUsers.findIndex(user => user === username);
    if (index < 0) this.loggedInUsers.push(username);
    cmLogger(this.loggedInUsers);
    this.chatUserListeners.forEach(listener => listener.handleLoggedInUsersUpdated(this.loggedInUsers)); // if the user in in favourites and not in blocked list passing this on to the listener

    if (!this.isUserInBlockedList(username) && this.isUserInFavouriteList(username)) {
      cmLogger(`User ${username} logging in`);
      this.chatUserListeners.forEach(listener => listener.handleFavouriteUserLoggedIn(username));
    }
  }

  receiveLogout(username) {
    let index = this.loggedInUsers.findIndex(user => user === username);
    if (index >= 0) this.loggedInUsers.splice(index, 1);
    this.chatUserListeners.forEach(listener => listener.handleLoggedInUsersUpdated(this.loggedInUsers)); // if the user in in favourites and not in blocked list passing this on to the listener

    if (!this.isUserInBlockedList(username) && this.isUserInFavouriteList(username)) {
      cmLogger(`User ${username} logging out`);
      this.chatUserListeners.forEach(listener => listener.handleFavouriteUserLoggedOut(username));
    }
  }

  receiveDecline(room, username, type) {
    if (type !== _Types__WEBPACK_IMPORTED_MODULE_3__.InviteType.ChatRoom) return; // we get this for all changes to a room, if the username is us can safely ignore

    if (username === this.currentUsername) return;

    if (!this.isUserInBlockedList(username)) {
      cmLogger(`User ${username} declined invitation to room`);
      this.chatListeners.forEach(listener => listener.handleInvitationDeclined(room, username));
    }
  }

  setUnreadCountListener(listener) {
    this.unreadListener = listener;
  }

  touchChatLog(room) {
    let chatLog = this.ensureChatLogExists(room);
    chatLog.unreadMessages = 0;
    chatLog.unreadHighMessages = 0;
    chatLog.unreadUrgentMessages = 0;
    chatLog.lastViewed = parseInt(moment__WEBPACK_IMPORTED_MODULE_1___default()().format('YYYYMMDDHHmmss'));
    this.emitUnreadMessageCountChanged();
    this.saveLogs();
  }

  getChatLog(room) {
    let log = null;
    let index = this.chatLogs.findIndex(log => log.roomName === room);
    if (index >= 0) log = this.chatLogs[index];
    return log;
  }

  receiveMessage(message, wasOffline = false) {
    if (message.type !== _Types__WEBPACK_IMPORTED_MODULE_3__.InviteType.ChatRoom) return; // ignore messages that aren't for chat rooms
    // double check the message is not from us somehow

    if (message.from === this.getCurrentUser()) return; // don't receive messages from the blocked users

    if (!this.isUserInBlockedList(message.from)) {
      // ok, so we need to add the message to the chat log, increase the new message count, save the logs and pass it on
      let chatLog = this.ensureChatLogExists(message.room);
      this.addSenderToRoomIfNotAlreadyPresent(chatLog, message.from);
      this.addMessageToChatLog(chatLog, message);
      cmLogger(`Message received`);
      cmLogger(message);
      this.chatListeners.forEach(listener => listener.handleChatLogUpdated(chatLog, wasOffline));
    } else {
      cmLogger(`Message received from user ${message.from} - is in blocked list, not passed on.`);
    }
  }

  receiveQueuedInvites(invites) {
    // just loop through and process each invite
    invites.forEach(invite => {
      this.receiveInvitation(invite);
    });
  }

  receiveQueuedMessages(messages) {
    // just loop through a process each message
    messages.forEach(message => {
      this.receiveMessage(message, true);
    });
    this.chatListeners.forEach(listener => listener.handleOfflineMessagesReceived(messages));
  }

  joinChat(room) {
    if (this.getCurrentUser().trim().length === 0) return; // we are not logged in

    this.ensureChatLogExists(room);
    _SocketManager__WEBPACK_IMPORTED_MODULE_2__.SocketManager.getInstance().joinChat(this.getCurrentUser(), room, _Types__WEBPACK_IMPORTED_MODULE_3__.InviteType.ChatRoom);
  }

  leaveChat(room) {
    if (this.getCurrentUser().trim().length === 0) return; // we are not logged in

    this.removeChatLog(room);
    _SocketManager__WEBPACK_IMPORTED_MODULE_2__.SocketManager.getInstance().leaveChat(this.getCurrentUser(), room, _Types__WEBPACK_IMPORTED_MODULE_3__.InviteType.ChatRoom);
    this.emitUnreadMessageCountChanged();
  }

  login() {
    if (this.getCurrentUser().trim().length === 0) return; // we are not logged in

    _SocketManager__WEBPACK_IMPORTED_MODULE_2__.SocketManager.getInstance().login(this.getCurrentUser()); // get the current user list

    _SocketManager__WEBPACK_IMPORTED_MODULE_2__.SocketManager.getInstance().getUserList(); // connect to the chat rooms already in logs

    this.chatLogs.forEach(log => {
      if (log.type === _Types__WEBPACK_IMPORTED_MODULE_3__.InviteType.ChatRoom) {
        _SocketManager__WEBPACK_IMPORTED_MODULE_2__.SocketManager.getInstance().joinChat(this.currentUsername, log.roomName, _Types__WEBPACK_IMPORTED_MODULE_3__.InviteType.ChatRoom);
      }
    });
  }

  logout() {
    if (this.getCurrentUser().trim().length === 0) return; // we are not logged in

    _SocketManager__WEBPACK_IMPORTED_MODULE_2__.SocketManager.getInstance().logout(this.getCurrentUser());
  }

  declineInvite(room) {
    if (this.getCurrentUser().trim().length === 0) return; // we are not logged in

    _SocketManager__WEBPACK_IMPORTED_MODULE_2__.SocketManager.getInstance().sendDeclineInvite(room, this.getCurrentUser(), _Types__WEBPACK_IMPORTED_MODULE_3__.InviteType.ChatRoom);
  }

  sendInvite(to, room, type = _Types__WEBPACK_IMPORTED_MODULE_3__.InviteType.ChatRoom, requiresAcceptDecline = false, subject = '') {
    if (this.getCurrentUser().trim().length === 0) return; // we are not logged in
    // can't accidentally send an invite to blacklisted

    if (this.isUserInBlockedList(to)) return; // only send an invite if the user isn't already in the room

    const log = this.ensureChatLogExists(room);

    if (log.users.findIndex(user => user === to) < 0) {
      _SocketManager__WEBPACK_IMPORTED_MODULE_2__.SocketManager.getInstance().sendInvite(this.getCurrentUser(), to, room, type, requiresAcceptDecline, subject);
    }
  }

  sendMessage(room, content, priority = _Types__WEBPACK_IMPORTED_MODULE_3__.Priority.Normal, simpleAttachement, attachment) {
    if (this.getCurrentUser().trim().length === 0) return null; // we are not logged in

    let log = this.ensureChatLogExists(room); // send the message

    let created = parseInt(moment__WEBPACK_IMPORTED_MODULE_1___default()().format('YYYYMMDDHHmmss'));
    if (!simpleAttachement) simpleAttachement = {
      identifier: '',
      type: '',
      displayText: ''
    };
    _SocketManager__WEBPACK_IMPORTED_MODULE_2__.SocketManager.getInstance().sendMessage(this.getCurrentUser(), room, content, created, _Types__WEBPACK_IMPORTED_MODULE_3__.InviteType.ChatRoom, priority, simpleAttachement, {}); // add the message to the chat log

    if (!attachment) attachment = {};
    let sent = {
      from: this.getCurrentUser(),
      room: room,
      message: content,
      created: created,
      priority: priority,
      type: _Types__WEBPACK_IMPORTED_MODULE_3__.InviteType.ChatRoom,
      simpleAttachment: simpleAttachement,
      attachment: attachment
    };
    this.addMessageToChatLog(log, sent);
    return sent;
  }

  getChatLogs() {
    return [...this.chatLogs];
  }

  startChatWithUser(username) {
    let roomName = null;

    if (username) {
      cmLogger(`Starting chat with ${username}`); // first thing, do we have a chat log with this user (and just this user) already?

      let chatLog = this.ensureChatLogExistsWithUser(username);
      this.chatListeners.forEach(listener => listener.handleChatLogUpdated(chatLog, false)); // invite the other user

      _SocketManager__WEBPACK_IMPORTED_MODULE_2__.SocketManager.getInstance().sendInvite(this.getCurrentUser(), username, chatLog.roomName, _Types__WEBPACK_IMPORTED_MODULE_3__.InviteType.ChatRoom, false, ''); // ok, lets connect to the server

      _SocketManager__WEBPACK_IMPORTED_MODULE_2__.SocketManager.getInstance().joinChat(this.getCurrentUser(), chatLog.roomName, _Types__WEBPACK_IMPORTED_MODULE_3__.InviteType.ChatRoom);
      roomName = chatLog.roomName;
    }

    return roomName;
  }

  saveLogs() {
    this.localStorage.setStateByName(ChatManager.chatLogKey + this.currentUsername, this.chatLogs, false);
  }

  saveBlockedList() {
    this.localStorage.setStateByName(ChatManager.blockedListKey + this.currentUsername, this.blockedList, false);
  }

  saveFavouriteList() {
    this.localStorage.setStateByName(ChatManager.favouriteListKey + this.currentUsername, this.favouriteList, false);
  }

  ensureChatLogExists(room) {
    let log;
    let index = this.chatLogs.findIndex(log => log.roomName === room);

    if (index < 0) {
      log = {
        roomName: room,
        users: [this.getCurrentUser()],
        messages: [],
        lastViewed: parseInt(moment__WEBPACK_IMPORTED_MODULE_1___default()().format('YYYYMMDDHHmmss')),
        unreadMessages: 0,
        unreadHighMessages: 0,
        unreadUrgentMessages: 0,
        type: _Types__WEBPACK_IMPORTED_MODULE_3__.InviteType.ChatRoom
      };
      this.chatLogs.push(log);
      this.saveLogs();
    } else {
      log = this.chatLogs[index];
    }

    return log;
  }

  ensureChatLogExistsWithUser(username) {
    let foundLog = null;
    let index = 0;

    while (index < this.chatLogs.length) {
      let log = this.chatLogs[index];

      if (log.users.length === 2) {
        // is the username in the two of this room?
        if (log.users.findIndex(value => value === username) >= 0) {
          foundLog = log;
          index = this.chatLogs.length;
        }
      }

      index++;
    }

    if (!foundLog) {
      foundLog = {
        roomName: (0,uuid__WEBPACK_IMPORTED_MODULE_6__["default"])(),
        users: [this.getCurrentUser(), username],
        messages: [],
        lastViewed: parseInt(moment__WEBPACK_IMPORTED_MODULE_1___default()().format('YYYYMMDDHHmmss')),
        unreadMessages: 0,
        unreadHighMessages: 0,
        unreadUrgentMessages: 0,
        type: _Types__WEBPACK_IMPORTED_MODULE_3__.InviteType.ChatRoom
      };
      this.chatLogs.push(foundLog);
      this.saveLogs();
    }

    return foundLog;
  }

  doesChatRoomExist(room) {
    let index = this.chatLogs.findIndex(log => log.roomName === room);
    return index >= 0;
  }

  emitUnreadMessageCountChanged() {
    var _this$unreadListener;

    let unreadNormalMessages = 0;
    let unreadHighMessages = 0;
    let unreadUrgentMessages = 0;
    this.chatLogs.forEach(log => {
      unreadNormalMessages += log.unreadMessages;
      unreadHighMessages += log.unreadHighMessages;
      unreadUrgentMessages += log.unreadUrgentMessages;
    });
    (_this$unreadListener = this.unreadListener) === null || _this$unreadListener === void 0 ? void 0 : _this$unreadListener.countChanged(unreadNormalMessages, unreadHighMessages, unreadUrgentMessages);
  }

  addMessageToChatLog(log, message) {
    switch (message.priority) {
      case _Types__WEBPACK_IMPORTED_MODULE_3__.Priority.Normal:
        {
          log.unreadMessages++;
          break;
        }

      case _Types__WEBPACK_IMPORTED_MODULE_3__.Priority.High:
        {
          log.unreadHighMessages++;
          break;
        }

      case _Types__WEBPACK_IMPORTED_MODULE_3__.Priority.Urgent:
        {
          log.unreadUrgentMessages++;
          break;
        }
    }

    log.messages.push(message);
    this.emitUnreadMessageCountChanged();

    if (message.from === this.getCurrentUser()) {
      this.touchChatLog(log.roomName); // this will also save the logs
    } else {
      this.saveLogs();
    }
  }

  addSenderToRoomIfNotAlreadyPresent(chatLog, sender) {
    let index = chatLog.users.findIndex(user => user === sender);

    if (index < 0) {
      chatLog.users.push(sender);
    }
  }

  removeChatLog(room) {
    let index = this.chatLogs.findIndex(log => log.roomName === room);

    if (index >= 0) {
      cmLogger(`Removing Chat log for room ${room}`);
      let result = this.chatLogs.splice(index, 1);
      cmLogger(result.length);
      this.saveLogs();
    }
  }

}

/***/ }),

/***/ "./src/framework/socket/NotificationController.ts":
/*!********************************************************!*\
  !*** ./src/framework/socket/NotificationController.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NotificationController": () => (/* binding */ NotificationController)
/* harmony export */ });
/* harmony import */ var _ChatManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ChatManager */ "./src/framework/socket/ChatManager.ts");
/* harmony import */ var _notification_NotificationManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../notification/NotificationManager */ "./src/framework/notification/NotificationManager.ts");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Types */ "./src/framework/socket/Types.ts");




const notLogger = debug__WEBPACK_IMPORTED_MODULE_2___default()('notification-controller');
class NotificationController {
  constructor() {
    this.chatManager = _ChatManager__WEBPACK_IMPORTED_MODULE_0__.ChatManager.getInstance();
    this.chatListeners = [];
    this.chatUserListeners = [];
    this.notificationOptions = {
      showNormalPriorityMessageNotifications: true,
      showHighPriorityMessageNotifications: true,
      showUrgentPriorityMessageNotifications: true,
      showInvitationDeclinedNotifications: true,
      showInvitedNotifications: true,
      showOfflineMessageNotification: true,
      showFavouriteUserLoggedInNotification: true,
      showFavouriteUserLoggedOutNotification: true,
      showUserJoinLeaveChatNotification: true
    }; //bind the methods

    this.handleChatLogUpdated = this.handleChatLogUpdated.bind(this);
    this.handleLoggedInUsersUpdated = this.handleLoggedInUsersUpdated.bind(this);
    this.handleFavouriteUserLoggedIn = this.handleFavouriteUserLoggedIn.bind(this);
    this.handleFavouriteUserLoggedOut = this.handleFavouriteUserLoggedOut.bind(this);
    this.chatManager.addChatEventHandler(this);
    this.chatManager.addChatUserEventHandler(this);
  }

  static getInstance() {
    if (!NotificationController._instance) {
      NotificationController._instance = new NotificationController();
    }

    return NotificationController._instance;
  }

  handleInvitationDeclined(room, username) {
    if (!this.notificationOptions.showInvitationDeclinedNotifications) return; // notify the user of the new chat

    _notification_NotificationManager__WEBPACK_IMPORTED_MODULE_1__.NotificationManager.getInstance().show('Room', `User ${username} has declined the invitation to join you.`, _notification_NotificationManager__WEBPACK_IMPORTED_MODULE_1__.NotificationType.info, 7000);
  }

  handleNewInviteReceived(invite) {
    let result = true; // is this a chat room or score sheet?

    if (invite.type !== _Types__WEBPACK_IMPORTED_MODULE_3__.InviteType.ChatRoom) return true;
    if (!invite.requiresAcceptDecline) return result;

    if (invite.requiresAcceptDecline) {// notify the user of the invitation
      //result = controller.askUserAboutInvitation(invite); ///////TO FIX
    } else {
      // notify the user of the new chat
      if (this.notificationOptions.showInvitedNotifications) _notification_NotificationManager__WEBPACK_IMPORTED_MODULE_1__.NotificationManager.getInstance().show('Chat Room', `User ${invite.from} has invited you.`, _notification_NotificationManager__WEBPACK_IMPORTED_MODULE_1__.NotificationType.info, 7000);
    }

    return result;
  }

  addListener(listener) {
    this.chatListeners.push(listener);
  }

  addUserListener(listener) {
    this.chatUserListeners.push(listener);
  }

  blackListUser(username, isBlackedListed = true) {
    if (isBlackedListed) {
      this.chatManager.addUserToBlockedList(username);
    } else {
      this.chatManager.removeUserFromBlockedList(username);
    }
  }

  favouriteUser(username, isFavourited = true) {
    if (isFavourited) {
      this.chatManager.addUserToFavouriteList(username);
    } else {
      this.chatManager.removeUserFromFavouriteList(username);
    }
  }

  isFavouriteUser(username) {
    return this.chatManager.isUserInFavouriteList(username);
  }

  isBlockedUser(username) {
    return this.chatManager.isUserInBlockedList(username);
  }

  handleChatLogsUpdated() {
    this.chatListeners.forEach(listener => listener.handleChatLogsUpdated());
  }

  handleChatLogUpdated(log, wasOffline = false) {
    notLogger(`Handle chat log updated`);
    notLogger(log); // pass on the changes

    this.chatListeners.forEach(listener => listener.handleChatLogUpdated(log, wasOffline));

    if (!wasOffline) {
      // get the last message added, it won't be from ourselves (the chat manager takes care of that)
      if (log.messages.length > 0) {
        const displayMessage = log.messages[log.messages.length - 1]; // is this a user join/leave?

        if (displayMessage.from.trim().length === 0 && !this.notificationOptions.showUserJoinLeaveChatNotification) return; // provide visual notifications if do not disturb is not on, unless the message is marked priority

        let notificationType = _notification_NotificationManager__WEBPACK_IMPORTED_MODULE_1__.NotificationType.message;
        let showNotification = this.notificationOptions.showNormalPriorityMessageNotifications;

        switch (displayMessage.priority) {
          case _Types__WEBPACK_IMPORTED_MODULE_3__.Priority.High:
            {
              notificationType = _notification_NotificationManager__WEBPACK_IMPORTED_MODULE_1__.NotificationType.warning;
              showNotification = this.notificationOptions.showHighPriorityMessageNotifications;
              break;
            }

          case _Types__WEBPACK_IMPORTED_MODULE_3__.Priority.Urgent:
            {
              notificationType = _notification_NotificationManager__WEBPACK_IMPORTED_MODULE_1__.NotificationType.priority;
              showNotification = this.notificationOptions.showUrgentPriorityMessageNotifications;
              break;
            }
        }

        if (showNotification) _notification_NotificationManager__WEBPACK_IMPORTED_MODULE_1__.NotificationManager.getInstance().show(displayMessage.from, displayMessage.message, notificationType, 3000);
      }
    }
  }

  handleLoggedInUsersUpdated(usernames) {
    notLogger(`Handle logged in users updated`);
    notLogger(usernames); // allow the view to change the user statuses

    this.chatUserListeners.forEach(listener => listener.handleLoggedInUsersUpdated(usernames));
  }

  handleFavouriteUserLoggedIn(username) {
    notLogger(`Handle favourite user ${username} logged in`); // allow the view to change the user statuses

    this.chatUserListeners.forEach(listener => listener.handleFavouriteUserLoggedIn(username)); // provide visual notifications if do not disturb is not on

    if (this.notificationOptions.showFavouriteUserLoggedInNotification) _notification_NotificationManager__WEBPACK_IMPORTED_MODULE_1__.NotificationManager.getInstance().show(username, `User ${username} has logged in.`, _notification_NotificationManager__WEBPACK_IMPORTED_MODULE_1__.NotificationType.warning, 5000);
  }

  handleFavouriteUserLoggedOut(username) {
    notLogger(`Handle favourite user ${username} logged out`); // allow the view to change the user statuses

    this.chatUserListeners.forEach(listener => listener.handleFavouriteUserLoggedOut(username));
    if (this.notificationOptions.showFavouriteUserLoggedOutNotification) _notification_NotificationManager__WEBPACK_IMPORTED_MODULE_1__.NotificationManager.getInstance().show(username, `User ${username} has logged out.`, _notification_NotificationManager__WEBPACK_IMPORTED_MODULE_1__.NotificationType.priority, 4000);
  }

  handleBlockedUsersChanged(usernames) {
    notLogger(`Handle blocked users changed to ${usernames}`);
    this.chatUserListeners.forEach(listener => listener.handleBlockedUsersChanged(usernames));
  }

  handleFavouriteUsersChanged(usernames) {
    notLogger(`Handle favourite users changed to ${usernames}`);
    this.chatUserListeners.forEach(listener => listener.handleFavouriteUsersChanged(usernames));
  }

  startChatWithUser(username) {
    return _ChatManager__WEBPACK_IMPORTED_MODULE_0__.ChatManager.getInstance().startChatWithUser(username);
  }

  handleChatStarted(log) {
    this.chatListeners.forEach(listener => listener.handleChatStarted(log));
  }

  handleOfflineMessagesReceived(messages) {
    // provide visual notifications if do not disturb is not on
    if (messages.length === 0) return;
    if (this.notificationOptions.showOfflineMessageNotification) _notification_NotificationManager__WEBPACK_IMPORTED_MODULE_1__.NotificationManager.getInstance().show("Offline messages received", `You have received ${messages.length} messages since you last logged out.`);
  }

  setOptions(options) {
    this.notificationOptions = options;
  }

}

/***/ }),

/***/ "./src/framework/socket/SocketManager.ts":
/*!***********************************************!*\
  !*** ./src/framework/socket/SocketManager.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SocketManager": () => (/* binding */ SocketManager)
/* harmony export */ });
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Types */ "./src/framework/socket/Types.ts");


const sDebug = debug__WEBPACK_IMPORTED_MODULE_0___default()('socket-ts');
class SocketManager {
  chatReceivers = [];

  constructor() {
    this.callbackForMessage = this.callbackForMessage.bind(this);
    this.callbackForData = this.callbackForData.bind(this);
    this.listener = null;
    this.socket = null;
    this.chatReceivers = [];
    this.callbackForMessage = this.callbackForMessage.bind(this);
    this.callbackForLogin = this.callbackForLogin.bind(this);
    this.callbackForLogout = this.callbackForLogout.bind(this);
    this.callbackForJoinRoom = this.callbackForJoinRoom.bind(this);
    this.callbackForExitRoom = this.callbackForExitRoom.bind(this);
    this.callbackForInvite = this.callbackForInvite.bind(this);
    this.callbackForChat = this.callbackForChat.bind(this);
    this.callbackForQueue = this.callbackForQueue.bind(this);
    this.callbackForUserList = this.callbackForUserList.bind(this);
    this.callbackForDeclineInvite = this.callbackForDeclineInvite.bind(this);
  }

  static getInstance() {
    if (!SocketManager._instance) {
      SocketManager._instance = new SocketManager();
    }

    return SocketManager._instance;
  }

  addChatReceiver(receiver) {
    this.chatReceivers.push(receiver);
  }

  setListener(listener) {
    sDebug('Setting listener');
    this.listener = listener;
    sDebug('Creating socket connection'); // @ts-ignore

    this.socket = io();
    sDebug('Waiting for messages');
    this.socket.on('message', this.callbackForMessage);
    this.socket.on('data', this.callbackForData);
    this.socket.on('login', this.callbackForLogin);
    this.socket.on('logout', this.callbackForLogout);
    this.socket.on('joinroom', this.callbackForJoinRoom);
    this.socket.on('exitroom', this.callbackForExitRoom);
    this.socket.on('invite', this.callbackForInvite);
    this.socket.on('declineinvite', this.callbackForDeclineInvite);
    this.socket.on('chat', this.callbackForChat);
    this.socket.on('queue', this.callbackForQueue);
    this.socket.on('userlist', this.callbackForUserList);
  }

  login(username) {
    this.socket.emit('login', {
      username
    });
  }

  logout(username) {
    this.socket.emit('logout', {
      username
    });
  }

  joinChat(username, room, type) {
    this.socket.emit('joinroom', {
      username,
      room,
      type
    });
  }

  leaveChat(username, room, type) {
    this.socket.emit('exitroom', {
      username,
      room,
      type
    });
  }

  sendInvite(from, to, room, type = _Types__WEBPACK_IMPORTED_MODULE_1__.InviteType.ChatRoom, requiresAcceptDecline = false, subject = '', attachment = {}) {
    let inviteObj = {
      from: from,
      to: to,
      room: room,
      type: type,
      requiresAcceptDecline: requiresAcceptDecline,
      subject: subject,
      attachment: attachment
    };
    sDebug(`Sending invite`);
    sDebug(inviteObj);
    this.socket.emit('invite', inviteObj);
  }

  sendMessage(from, room, message, created, type, priority = _Types__WEBPACK_IMPORTED_MODULE_1__.Priority.Normal, simpleAttachment, attachment = {}) {
    let messageObj = {
      from: from,
      room: room,
      message: message,
      created: created,
      priority: priority,
      type: type,
      simpleAttachment: simpleAttachment,
      attachment: attachment
    };
    this.socket.emit('chat', messageObj);
  }

  getUserList() {
    this.socket.emit('userlist');
  }

  sendDeclineInvite(room, from, type) {
    this.socket.emit('declineinvite', {
      room,
      from,
      type
    });
  }

  callbackForMessage(content) {
    sDebug(`Received message : ${content}`);

    try {
      sDebug(content); // should be a server side ChatMessage {room, message,user}

      const dataObj = JSON.parse(content);
      this.chatReceivers.forEach(receiver => receiver.receiveMessage(dataObj));
    } catch (err) {
      sDebug(err);
      sDebug('Not JSON data');
    }
  }

  callbackForLogin(message) {
    sDebug(`Received login : ${message}`);
    this.chatReceivers.forEach(receiver => receiver.receiveLogin(message));
  }

  callbackForUserList(message) {
    sDebug(`Received user list : ${message}`);
    this.chatReceivers.forEach(receiver => receiver.receiveUserList(message));
  }

  callbackForLogout(message) {
    sDebug(`Received logout : ${message}`);
    this.chatReceivers.forEach(receiver => receiver.receiveLogout(message));
  }

  callbackForJoinRoom(data) {
    sDebug(`Received joined room : ${data}`);

    try {
      const dataObj = JSON.parse(data);
      sDebug(dataObj);
      this.chatReceivers.forEach(receiver => receiver.receiveJoinedRoom(dataObj));
    } catch (err) {
      sDebug('Not JSON data');
    }
  }

  callbackForExitRoom(data) {
    sDebug(`Received left room : ${data}`);

    try {
      const dataObj = JSON.parse(data);
      sDebug(dataObj);
      this.chatReceivers.forEach(receiver => receiver.receivedLeftRoom(dataObj));
    } catch (err) {
      sDebug('Not JSON data');
    }
  }

  callbackForInvite(data) {
    sDebug(`Received invite : ${data}`);

    try {
      const dataObj = JSON.parse(data);
      sDebug(dataObj);
      this.chatReceivers.forEach(receiver => receiver.receiveInvitation(dataObj));
    } catch (err) {
      sDebug('Not JSON data');
    }
  }

  callbackForDeclineInvite(data) {
    sDebug(`Received declined invite : ${data}`);

    try {
      const dataObj = JSON.parse(data);
      sDebug(dataObj);
      this.chatReceivers.forEach(receiver => receiver.receiveDecline(dataObj.room, dataObj.username, dataObj.type));
    } catch (err) {
      sDebug(err);
      sDebug('Not JSON data');
    }
  }

  callbackForChat(content) {
    sDebug(`Received chat : ${content}`);

    try {
      // should be a server side ChatMessage {room, message,user}
      const dataObj = JSON.parse(content);
      sDebug(dataObj);
      this.chatReceivers.forEach(receiver => receiver.receiveMessage(dataObj));
    } catch (err) {
      sDebug('Not JSON data');
    }
  }

  callbackForQueue(data) {
    sDebug(`Received queued items : ${data}`);

    try {
      const dataObj = JSON.parse(data);
      sDebug(dataObj); // this object should contain two arrays of invites and messages

      if (dataObj.invites && dataObj.invites.length > 0) {
        this.chatReceivers.forEach(receiver => receiver.receiveQueuedInvites(dataObj.invites));
      }

      if (dataObj.messages && dataObj.messages.length > 0) {
        this.chatReceivers.forEach(receiver => receiver.receiveQueuedMessages(dataObj.messages));
      }
    } catch (err) {
      sDebug('Not JSON data');
    }
  }
  /*
  *
  *  expecting a JSON data object with the following attributes
  *  1.  type: "create"|"update"|"delete"
  *  2.  objectType: string name of the object type changed
  *  3.  data: the new representation of the object
  *  4.  user: application specific id for the user who made the change
  *        - the application view is required to implement getCurrentUser() to compare the user who made the change
  *
   */


  callbackForData(message) {
    sDebug(`Received data`);

    try {
      const dataObj = JSON.parse(message);
      sDebug(dataObj);
      if (this.listener === null) return;

      if (dataObj.user === this.listener.getCurrentUser()) {
        sDebug("change made by this user, ignoring");
      } else {
        sDebug("change made by another user, passing off to the application");
        this.listener.handleDataChangedByAnotherUser(dataObj);
      }
    } catch (err) {
      sDebug('Not JSON data');
    }
  }

}

/***/ }),

/***/ "./src/framework/socket/Types.ts":
/*!***************************************!*\
  !*** ./src/framework/socket/Types.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Priority": () => (/* binding */ Priority),
/* harmony export */   "InviteType": () => (/* binding */ InviteType)
/* harmony export */ });
let Priority;

(function (Priority) {
  Priority[Priority["Normal"] = 0] = "Normal";
  Priority[Priority["High"] = 1] = "High";
  Priority[Priority["Urgent"] = 2] = "Urgent";
})(Priority || (Priority = {}));

let InviteType;

(function (InviteType) {
  InviteType[InviteType["ChatRoom"] = 0] = "ChatRoom";
  InviteType[InviteType["CustomType1"] = 1] = "CustomType1";
  InviteType[InviteType["CustomType2"] = 2] = "CustomType2";
  InviteType[InviteType["CustomType3"] = 3] = "CustomType3";
  InviteType[InviteType["CustomType4"] = 4] = "CustomType4";
  InviteType[InviteType["CustomType5"] = 5] = "CustomType5";
  InviteType[InviteType["CustomType6"] = 6] = "CustomType6";
  InviteType[InviteType["CustomType7"] = 7] = "CustomType7";
  InviteType[InviteType["CustomType8"] = 8] = "CustomType8";
  InviteType[InviteType["CustomType9"] = 9] = "CustomType9";
})(InviteType || (InviteType = {}));

/***/ }),

/***/ "./src/framework/state/AbstractStateManager.ts":
/*!*****************************************************!*\
  !*** ./src/framework/state/AbstractStateManager.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbstractStateManager": () => (/* binding */ AbstractStateManager)
/* harmony export */ });
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _StateManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./StateManager */ "./src/framework/state/StateManager.ts");
/* harmony import */ var _StateChangedDelegate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./StateChangedDelegate */ "./src/framework/state/StateChangedDelegate.ts");
/* harmony import */ var _CommonTypes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../CommonTypes */ "./src/framework/CommonTypes.ts");




const smLogger = debug__WEBPACK_IMPORTED_MODULE_0___default()('state-manager-ts');
const smLoggerDetail = debug__WEBPACK_IMPORTED_MODULE_0___default()('state-manager-ts:detail');
class AbstractStateManager {
  forceSaves = true;
  managerName = '';
  equalityFns = null;

  constructor(managerName, defaultEquality, fnPerState = null) {
    this.delegate = new _StateChangedDelegate__WEBPACK_IMPORTED_MODULE_2__.StateChangedDelegate(managerName);
    this.managerName = managerName;
    this.defaultEquality = defaultEquality;

    if (fnPerState) {
      this.equalityFns = fnPerState;
    }

    this.emitEvents();
    this.forceSaves = true;
  }

  receivedFilterResults(name, filterResults) {
    this.delegate.informChangeListenersForStateWithName(name, filterResults, _StateManager__WEBPACK_IMPORTED_MODULE_1__.StateEventType.FilterResults, null);
  }

  suppressEvents() {
    this.delegate.suppressEvents();
  }

  emitEvents() {
    this.delegate.emitEvents();
  }

  dontForceSavesOnAddRemoveUpdate() {
    this.forceSaves = false;
  }

  forceSavesOnAddRemoveUpdate() {
    this.forceSaves = true;
  }

  informChangeListenersForStateWithName(name, stateObjValue, eventType = _StateManager__WEBPACK_IMPORTED_MODULE_1__.StateEventType.StateChanged, previousObjValue = null) {
    this.delegate.informChangeListenersForStateWithName(name, stateObjValue, eventType, previousObjValue);
  }

  addChangeListenerForName(name, listener) {
    this.delegate.addChangeListenerForName(name, listener);
  }

  _findItemInState(name, item) {
    let result = {};
    const state = this.getStateByName(name);
    const foundIndex = state.findIndex(element => this.getEqualityFnForName(name)(element, item));
    smLogger(`Finding item in state ${name} - found index ${foundIndex}`);
    smLogger(item);

    if (foundIndex >= 0) {
      result = state[foundIndex];
    }

    return result;
  }

  _findItemsInState(name, filters) {
    // default implementation assumes local values and simple comparisons
    let results = [];

    const state = this._getState(name);

    try {
      state.value.forEach(item => {
        let isMatch = false;
        filters.forEach(filter => {
          smLogger(`filter, finding state value for ${state.name} with filter and item`);
          smLoggerDetail(filter);
          smLoggerDetail(filter);

          if (!isMatch) {
            // don't bother with other filters if we have already failed
            let attributeValue = item[filter.attributeName];
            smLoggerDetail(`filter, finding state value for ${state.name} with attribute value ${attributeValue}`);

            if (filter.evaluator) {
              isMatch = filter.evaluator(item, filter);
              smLoggerDetail(`filter (evaluator), with attribute ${attributeValue}`);
            } else {
              switch (filter.comparison) {
                case _CommonTypes__WEBPACK_IMPORTED_MODULE_3__.ComparisonType.isNull:
                  {
                    smLoggerDetail(`filter (is Null), with attribute ${attributeValue}`);
                    isMatch = !attributeValue;
                    break;
                  }

                case _CommonTypes__WEBPACK_IMPORTED_MODULE_3__.ComparisonType.isNotNull:
                  {
                    smLoggerDetail(`filter (is Not Null), with attribute ${attributeValue}`);

                    if (attributeValue) {
                      isMatch = true;
                    }

                    break;
                  }

                case _CommonTypes__WEBPACK_IMPORTED_MODULE_3__.ComparisonType.equals:
                  {
                    smLoggerDetail(`filter (===), with attribute ${attributeValue} and filter value ${filter.value}`);
                    isMatch = attributeValue && attributeValue === filter.value;
                    break;
                  }

                case _CommonTypes__WEBPACK_IMPORTED_MODULE_3__.ComparisonType.lessThan:
                  {
                    smLoggerDetail(`filter (<), with attribute ${attributeValue} and filter value ${filter.value}`);
                    isMatch = attributeValue && attributeValue < filter.value;
                    break;
                  }

                case _CommonTypes__WEBPACK_IMPORTED_MODULE_3__.ComparisonType.greaterThan:
                  {
                    smLoggerDetail(`filter (>), with attribute ${attributeValue} and filter value ${filter.value}`);
                    isMatch = attributeValue && attributeValue > filter.value;
                    break;
                  }

                case _CommonTypes__WEBPACK_IMPORTED_MODULE_3__.ComparisonType.lessThanEqual:
                  {
                    smLoggerDetail(`filter (<=), with attribute ${attributeValue} and filter value ${filter.value}`);
                    isMatch = attributeValue && attributeValue <= filter.value;
                    break;
                  }

                case _CommonTypes__WEBPACK_IMPORTED_MODULE_3__.ComparisonType.greaterThanEqual:
                  {
                    smLoggerDetail(`filter (>=), with attribute ${attributeValue} and filter value ${filter.value}`);
                    isMatch = attributeValue && attributeValue >= filter.value;
                    break;
                  }
              }
            }
          }
        });
        smLoggerDetail(`filter, finding state value for ${state.name} is match? ${isMatch}`);
        if (isMatch) results.push(item);
      });
    } catch (err) {
      smLogger(`filter, state value for ${state.name} is not any array`);
    }

    smLoggerDetail('Match results');
    smLoggerDetail(results);
    return results;
  }

  addStateByName(name, stateObjForName) {
    this._ensureStatePresent(name);
    /* create a new state attribute for the application state */


    const state = {
      name,
      value: stateObjForName
    };
    /* get the current state value and replace it */

    this._replaceNamedStateInStorage(state);

    this.informChangeListenersForStateWithName(name, stateObjForName, _StateManager__WEBPACK_IMPORTED_MODULE_1__.StateEventType.StateChanged);
    return stateObjForName;
  }

  getStateByName(name) {
    this._ensureStatePresent(name);

    smLogger(`State Manager: Getting state for ${name}`);
    let stateValueObj = {}; // get the current state

    const state = this._getState(name);

    stateValueObj = state.value;
    smLogger(`State Manager: Found previous state for ${name}`);
    smLogger(stateValueObj);
    return stateValueObj;
  }

  setStateByName(name, stateObjectForName, informListeners = true) {
    this._ensureStatePresent(name);

    smLogger(`State Manager: Setting state for ${name}`);
    smLogger(stateObjectForName); // set the current state

    const state = this._getState(name);

    state.value = stateObjectForName;
    if (this.forceSaves) this._saveState(name, stateObjectForName);
    if (informListeners) this.informChangeListenersForStateWithName(name, stateObjectForName);
    return stateObjectForName;
  }

  addNewItemToState(name, item, isPersisted = false) {
    // assumes state is an array
    this._ensureStatePresent(name);

    smLogger(`State Manager: Adding item to state ${name}`); // const state = this.getStateByName(name);
    // state.push(item);
    // smLogger(state);

    this._addItemToState(name, item, isPersisted);

    this.informChangeListenersForStateWithName(name, item, _StateManager__WEBPACK_IMPORTED_MODULE_1__.StateEventType.ItemAdded);
  }

  findItemInState(name, item) {
    // assumes state is an array
    this._ensureStatePresent(name);

    return this._findItemInState(name, item);
  }

  isItemInState(name, item) {
    // assumes state is an array
    this._ensureStatePresent(name);

    let result = false;
    const state = this.getStateByName(name);
    const foundIndex = state.findIndex(element => this.getEqualityFnForName(name)(element, item));

    if (foundIndex >= 0) {
      result = true;
    }

    return result;
  }

  removeItemFromState(name, item, isPersisted) {
    this._ensureStatePresent(name);

    let result = true;
    let oldItem = this.findItemInState(name, item); // remove the item from the state

    smLogger(`State Manager: Found item - removing, is persisted ${isPersisted}`);

    this._removeItemFromState(name, item, isPersisted);

    this.informChangeListenersForStateWithName(name, oldItem, _StateManager__WEBPACK_IMPORTED_MODULE_1__.StateEventType.ItemDeleted);
    return result;
  }

  updateItemInState(name, item, isPersisted) {
    this._ensureStatePresent(name);

    let result = true;
    let oldItem = this.findItemInState(name, item);
    smLogger('State Manager: Found item - replacing ');

    this._updateItemInState(name, item, isPersisted);

    this.informChangeListenersForStateWithName(name, item, _StateManager__WEBPACK_IMPORTED_MODULE_1__.StateEventType.ItemUpdated, oldItem);
    return result;
  }

  findItemsInState(name, filters) {
    this._ensureStatePresent(name);

    return this._findItemsInState(name, filters);
  }

  getType() {
    return _StateManager__WEBPACK_IMPORTED_MODULE_1__.StateManagerType.Local;
  }

  getEqualityFnForName(name) {
    let result = this.defaultEquality;

    if (this.equalityFns) {
      const foundIndex = this.equalityFns.findIndex(fn => fn.name === name);
      if (foundIndex >= 0) result = this.equalityFns[foundIndex].equality;
    }

    return result;
  }

}

/***/ }),

/***/ "./src/framework/state/AggregateStateManager.ts":
/*!******************************************************!*\
  !*** ./src/framework/state/AggregateStateManager.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AggregateStateManager": () => (/* binding */ AggregateStateManager)
/* harmony export */ });
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AbstractStateManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AbstractStateManager */ "./src/framework/state/AbstractStateManager.ts");


const aggLogger = debug__WEBPACK_IMPORTED_MODULE_0___default()('state-manager-aggregate');
class AggregateStateManager extends _AbstractStateManager__WEBPACK_IMPORTED_MODULE_1__.AbstractStateManager {
  constructor(defaultEq, equalityFns = null) {
    super('aggregate', defaultEq, equalityFns);
    this.stateManagers = [];
    this.emitEvents();
  }

  addStateManager(stateManager, filters = [], emitEvents) {
    let mWF = {
      manager: stateManager,
      filters: filters
    };
    this.stateManagers.push(mWF);
    if (!emitEvents) stateManager.suppressEvents();
    aggLogger('adding state manager with/without filters');
  }

  _addNewNamedStateToStorage(state) {
    this.stateManagers.forEach(managerWithFilters => {
      if (!this.stateNameInFilters(state.name, managerWithFilters.filters)) {
        managerWithFilters.manager._addNewNamedStateToStorage(state);
      }
    });
  }

  _getState(name) {
    let state = {
      name: name,
      value: []
    };
    this.stateManagers.forEach(sm => {
      if (!this.stateNameInFilters(state.name, sm.filters)) {
        aggLogger(`get state from state manager for state ${name}`);
        aggLogger(sm.manager);

        sm.manager._getState(name);
      }
    }); // assuming the state manager is holding all the values

    if (this.stateManagers.length > 0) {
      state = this.stateManagers[0].manager._getState(name);
    }

    return state;
  }

  _ensureStatePresent(name) {
    this.stateManagers.forEach(managerWithFilters => {
      if (!this.stateNameInFilters(name, managerWithFilters.filters)) {
        managerWithFilters.manager._ensureStatePresent(name);
      }
    });
  }

  _replaceNamedStateInStorage(state) {
    this.stateManagers.forEach(managerWithFilters => {
      if (!this.stateNameInFilters(state.name, managerWithFilters.filters)) {
        managerWithFilters.manager._replaceNamedStateInStorage(state);
      }
    });
  }

  _saveState(name, stateObj) {
    this.stateManagers.forEach(managerWithFilters => {
      if (!this.stateNameInFilters(name, managerWithFilters.filters)) {
        aggLogger(`saving state in state manager for state ${name}`);
        aggLogger(managerWithFilters.manager);
        aggLogger(stateObj);

        managerWithFilters.manager._saveState(name, stateObj);
      }
    });
  }

  _addItemToState(name, stateObj, isPersisted = false) {
    this.stateManagers.forEach(managerWithFilters => {
      if (!this.stateNameInFilters(name, managerWithFilters.filters)) {
        aggLogger(`adding item to state in  state manager for state ${name}, is persisted = ${isPersisted}`);
        aggLogger(managerWithFilters.manager);
        aggLogger(stateObj);

        managerWithFilters.manager._addItemToState(name, stateObj, isPersisted);
      }
    });
  }

  _removeItemFromState(name, stateObj, isPersisted) {
    this.stateManagers.forEach(managerWithFilters => {
      if (!this.stateNameInFilters(name, managerWithFilters.filters)) {
        aggLogger(`removing item from state in state manager for state ${name}, is persisted = ${isPersisted}`);
        aggLogger(managerWithFilters.manager);
        aggLogger(stateObj);

        managerWithFilters.manager._removeItemFromState(name, stateObj, isPersisted);
      }
    });
  }

  _updateItemInState(name, stateObj, isPersisted) {
    this.stateManagers.forEach(managerWithFilters => {
      if (!this.stateNameInFilters(name, managerWithFilters.filters)) {
        aggLogger(`updating item in state in  state manager for state ${name}`);
        aggLogger(managerWithFilters.manager);
        aggLogger(stateObj);

        managerWithFilters.manager._updateItemInState(name, stateObj, isPersisted);
      }
    });
  }

  _findItemsInState(name, filters) {
    let state = {
      name: name,
      value: []
    };
    this.stateManagers.forEach(sm => {
      if (!this.stateNameInFilters(state.name, sm.filters)) {
        aggLogger(`get state from state manager for state ${name}`);
        aggLogger(sm.manager);

        sm.manager._findItemsInState(name, filters);
      }
    }); // assuming the state manager is holding all the values

    let results = [];

    if (this.stateManagers.length > 0) {
      results = this.stateManagers[0].manager._findItemsInState(name, filters);
    }

    return results;
  }

  _findItemInState(name, item) {
    let result = {};
    this.stateManagers.forEach(sm => {
      if (!this.stateNameInFilters(name, sm.filters)) {
        aggLogger(`finding item from state manager for state ${name}`);
        aggLogger(sm.manager);

        sm.manager._findItemInState(name, item);
      }
    }); // assuming the state manager is holding all the values

    if (this.stateManagers.length > 0) {
      result = this.stateManagers[0].manager._findItemInState(name, item);
    }

    return result;
  }

  stateNameInFilters(name, filters) {
    let foundIndex = filters.findIndex(filter => filter === name);
    return foundIndex >= 0;
  }

}

/***/ }),

/***/ "./src/framework/state/AsyncStateManagerWrapper.ts":
/*!*********************************************************!*\
  !*** ./src/framework/state/AsyncStateManagerWrapper.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AsyncStateManagerWrapper": () => (/* binding */ AsyncStateManagerWrapper)
/* harmony export */ });
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AbstractStateManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AbstractStateManager */ "./src/framework/state/AbstractStateManager.ts");


const asyncLogger = debug__WEBPACK_IMPORTED_MODULE_0___default()('state-manager-async');
class AsyncStateManagerWrapper extends _AbstractStateManager__WEBPACK_IMPORTED_MODULE_1__.AbstractStateManager {
  constructor(topLevelSM, wrappedSM, defaultEq) {
    super('async', defaultEq);
    this.topLevelSM = topLevelSM;
    this.wrappedSM = wrappedSM;
    this.forceSaves = false;
    this.wrappedSM.emitEvents();
    let stateNamesToMonitor = this.wrappedSM.getConfiguredStateNames();
    this.stateChanged = this.stateChanged.bind(this);
    this.stateChangedItemAdded = this.stateChangedItemAdded.bind(this);
    this.stateChangedItemRemoved = this.stateChangedItemRemoved.bind(this);
    this.stateChangedItemUpdated = this.stateChangedItemUpdated.bind(this);
    stateNamesToMonitor.forEach(stateName => {
      this.wrappedSM.addChangeListenerForName(stateName, this);
    });
  }

  getType() {
    return this.wrappedSM.getType();
  }

  _findItemsInState(name, filters) {
    asyncLogger(`finding items with filters`);
    return this.wrappedSM.findItemsInState(name, filters);
  }

  _findItemInState(name, stateObj) {
    asyncLogger(`finding item `);
    return this.wrappedSM.findItemInState(name, stateObj);
  }

  _addItemToState(name, stateObj, isPersisted = false) {
    asyncLogger(`adding item to state ${name} - is persisted ${isPersisted}`);
    this.wrappedSM.addNewItemToState(name, stateObj, isPersisted);
  }

  _getState(name) {
    // assume wrapped SM is asynchronous
    // make the call to get state but supply the caller with an empty state for now
    asyncLogger(`getting state ${name}`);
    this.wrappedSM.getStateByName(name);
    return {
      name: name,
      value: []
    };
  }

  _removeItemFromState(name, stateObj, isPersisted) {
    asyncLogger(`removing item from state ${name} is persisted ${isPersisted}`);
    this.wrappedSM.removeItemFromState(name, stateObj, isPersisted);
  }

  _updateItemInState(name, stateObj, isPersisted) {
    asyncLogger(`updating item in state ${name}`);
    this.wrappedSM.updateItemInState(name, stateObj, isPersisted);
  }

  _ensureStatePresent(name) {} // assume already present


  _addNewNamedStateToStorage(state) {} // assume already present


  _replaceNamedStateInStorage(state) {} // not implemented, not replacing state wholesale


  _saveState(name, stateObj) {} // not implemented, not replacing state wholesale


  stateChangedItemRemoved(managerName, name, itemRemoved) {} // not implemented, assumes called to wrapped SM worked


  stateChangedItemUpdated(managerName, name, itemUpdated, itemNewValue) {} // not implemented, assumes called to wrapped SM worked


  stateChanged(managerName, name, newValue) {
    // received new state from the wrapped SM
    // pass the received state to the top level SM
    asyncLogger(`Wrapped SM has supplied new state ${name} passing to top level SM`);
    asyncLogger(newValue);
    this.topLevelSM.setStateByName(name, newValue);
  }

  stateChangedItemAdded(managerName, name, itemAdded) {
    asyncLogger(`Wrapped SM has supplied new completed item for state ${name} passing to top level SM`);
    this.topLevelSM.addNewItemToState(name, itemAdded, true);
  }

  getListenerName() {
    return "Async Manager";
  }

  filterResults(managerName, name, filterResults) {
    asyncLogger(`Wrapped SM has supplied filter results ${name} passing to top level SM`);
    this.topLevelSM.receivedFilterResults(name, filterResults);
  }

}

/***/ }),

/***/ "./src/framework/state/BrowserStorageStateManager.ts":
/*!***********************************************************!*\
  !*** ./src/framework/state/BrowserStorageStateManager.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BrowserStorageStateManager": () => (/* binding */ BrowserStorageStateManager)
/* harmony export */ });
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AbstractStateManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AbstractStateManager */ "./src/framework/state/AbstractStateManager.ts");


const lsLogger = debug__WEBPACK_IMPORTED_MODULE_0___default()('browser-storage');
class BrowserStorageStateManager extends _AbstractStateManager__WEBPACK_IMPORTED_MODULE_1__.AbstractStateManager {
  // @ts-ignore
  configuration = [];

  constructor(useLocalStorage = false, allowPersistence = false, defaultEq, equalFns = null) {
    super('browser', defaultEq, equalFns);
    this.storage = window.sessionStorage;
    this.allowPersistence = allowPersistence;
    if (useLocalStorage) this.storage = window.localStorage;
    this.forceSaves = true;
  }

  _ensureStatePresent(name) {
    if (this.storage.getItem(name) === null) {
      this._addNewNamedStateToStorage({
        name: name,
        value: []
      });
    }
  }

  _addNewNamedStateToStorage(state) {
    lsLogger(`Local Storage: Saving with key ${state.name}`);
    lsLogger(state);
    const stringifiedSaveData = JSON.stringify(state.value);
    lsLogger(stringifiedSaveData);
    this.storage.setItem(state.name, stringifiedSaveData);
  }

  _replaceNamedStateInStorage(state) {
    this._addNewNamedStateToStorage(state);
  }

  _getState(name) {
    let savedResults = [];
    lsLogger(`Local Storage: Loading with key ${name}`);
    const savedResultsJSON = this.storage.getItem(name);
    lsLogger(savedResultsJSON);

    if (savedResultsJSON !== null) {
      savedResults = JSON.parse(savedResultsJSON);
    }

    return {
      name: name,
      value: savedResults
    };
  }

  _saveState(name, newValue) {
    this._addNewNamedStateToStorage({
      name: name,
      value: newValue
    });
  }

  _addItemToState(name, stateObj, isPersisted = false) {
    if (!isPersisted) {
      if (!this.allowPersistence) {
        return;
      }
    }

    let state = this._getState(name);

    lsLogger(`adding item to state ${name}`);
    lsLogger(stateObj);
    state.value.push(stateObj);

    this._replaceNamedStateInStorage(state);
  }

  _removeItemFromState(name, stateObj, isPersisted) {
    let state = this._getState(name);

    const valueIndex = state.value.findIndex(element => this.getEqualityFnForName(name)(element, stateObj));

    if (valueIndex >= 0) {
      lsLogger(`removing item from state ${name}`);
      lsLogger(stateObj);
      state.value.splice(valueIndex, 1);
    }

    this._replaceNamedStateInStorage(state);
  }

  _updateItemInState(name, stateObj, isPersisted) {
    let state = this._getState(name);

    const valueIndex = state.value.findIndex(element => this.getEqualityFnForName(name)(element, stateObj));

    if (valueIndex >= 0) {
      state.value.splice(valueIndex, 1, stateObj);
      lsLogger(`updating item in state ${name}`);
      lsLogger(stateObj);
    }

    this._replaceNamedStateInStorage(state);
  }

  forceResetForGet(stateName) {}

  getConfiguredStateNames() {
    return this.configuration;
  }

  hasCompletedRun(stateName) {
    return false;
  }

  initialise(config) {
    this.configuration = config;
  }

}

/***/ }),

/***/ "./src/framework/state/IndexedDBStateManager.ts":
/*!******************************************************!*\
  !*** ./src/framework/state/IndexedDBStateManager.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IndexedDBStateManager": () => (/* binding */ IndexedDBStateManager)
/* harmony export */ });
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var idb__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! idb */ "./node_modules/idb/build/esm/index.js");
/* harmony import */ var _StateManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./StateManager */ "./src/framework/state/StateManager.ts");
/* harmony import */ var _StateChangedDelegate__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./StateChangedDelegate */ "./src/framework/state/StateChangedDelegate.ts");




const logger = debug__WEBPACK_IMPORTED_MODULE_0___default()('indexeddb-ts');
class IndexedDBStateManager {
  constructor() {
    this.dbName = 'default';
    this.delegate = new _StateChangedDelegate__WEBPACK_IMPORTED_MODULE_3__.StateChangedDelegate('indexeddb');
    this.emitEvents();
    this.bHasCompletedRun = [];
    this.collections = [];
    this.callbackForAddItem = this.callbackForAddItem.bind(this);
    this.callbackForRemoveItem = this.callbackForRemoveItem.bind(this);
    this.callbackForUpdateItem = this.callbackForUpdateItem.bind(this);
    this.callbackForGetItems = this.callbackForGetItems.bind(this);
  }

  static getInstance() {
    if (!IndexedDBStateManager.instance) {
      IndexedDBStateManager.instance = new IndexedDBStateManager();
    }

    return IndexedDBStateManager.instance;
  }

  hasCompletedRun(stateName) {
    let result = false;
    let foundIndex = this.collections.findIndex(collection => collection.name === stateName);

    if (foundIndex >= 0) {
      result = this.bHasCompletedRun[foundIndex];
    }

    return result;
  }

  setCompletedRun(stateName) {
    let foundIndex = this.collections.findIndex(collection => collection.name === stateName);

    if (foundIndex >= 0) {
      this.bHasCompletedRun[foundIndex] = true;
    }
  }

  forceResetForGet(stateName) {
    let foundIndex = this.collections.findIndex(collection => collection.name === stateName);

    if (foundIndex >= 0) {
      this.bHasCompletedRun[foundIndex] = false;
    }
  }

  async initialise(dbName, collections) {
    logger(`opening database for ${dbName} with collections`);
    logger(collections);
    this.dbName = dbName;
    this.collections = collections;
    let runsComplete = [];
    this.collections.forEach(collection => {
      runsComplete.push(false);
    });
    this.bHasCompletedRun = runsComplete;
    await (0,idb__WEBPACK_IMPORTED_MODULE_1__.openDB)(dbName, 1, {
      upgrade(db, oldVersion, newVersion, transaction) {
        collections.forEach(collection => {
          logger(`creating collection for ${collection.name} with key ${collection.keyField}`);
          db.createObjectStore(collection.name, {
            keyPath: collection.keyField,
            autoIncrement: false
          });
        });
      },

      blocked() {// …
      },

      blocking() {// …
      },

      terminated() {// …
      }

    });
  }

  _addNewNamedStateToStorage(state) {}

  _getState(name) {
    if (this.hasCompletedRun(name)) {
      logger(`Getting All ${name} - not done - previously retrieved`);
    } else {
      logger(`getting state ${name}`);
      this.getWithCollectionKey(name, this.getKeyFieldForKey(name));
    }

    let state = {
      name: name,
      value: []
    };
    return state;
  }

  _ensureStatePresent(name) {} // should be present with initialise


  _replaceNamedStateInStorage(state) {
    let fn = async () => {
      logger(`replacing item in storage ${state.name}`);
      logger(state.value);
      await this.removeAllItemsFromCollectionKey(state.name, this.getKeyFieldForKey(state.name));
      await this.saveWithCollectionKey(state.name, state.value, this.getKeyFieldForKey(state.name));
    };

    fn();
  }

  _addItemToState(name, stateObj, isPersisted = false) {
    if (isPersisted) return;
    this.addNewItemToCollection(name, stateObj, this.getKeyFieldForKey(name));
  }

  _removeItemFromState(name, stateObj, isPersisted) {
    if (isPersisted) return;
    this.removeItemFromCollection(name, stateObj, this.getKeyFieldForKey(name));
  }

  _updateItemInState(name, stateObj, isPersisted) {
    if (isPersisted) return;
    this.updateItemInCollection(name, stateObj, this.getKeyFieldForKey(name));
  }

  _saveState(name, stateObj) {
    let fn = async () => {
      logger(`saving state ${name}`);
      await this.removeAllItemsFromCollectionKey(name, this.getKeyFieldForKey(name));
      await this.saveWithCollectionKey(name, stateObj, this.getKeyFieldForKey(name));
    };

    fn();
  }

  async saveWithCollectionKey(key, saveData, keyField = 'id') {
    logger(`Saving array with key ${key}`);
    logger(saveData);
    let db = await (0,idb__WEBPACK_IMPORTED_MODULE_1__.openDB)(this.dbName, 1); // @ts-ignore

    let transaction = db.transaction([key], "readwrite");

    transaction.oncomplete = function (ev) {
      logger('Success');
      logger(ev);
    };

    transaction.onerror = function (ev) {
      logger('Error');
      logger(ev);
    }; // @ts-ignore


    let objectStore = transaction.store; // @ts-ignore

    await this.saveItemsToCollection(objectStore, saveData, keyField);
  }
  /* add a new item to the local storage if not already there */


  async addNewItemToCollection(key, item, keyField = 'id') {
    if (item !== null) {
      logger(`Adding with key ${key}`);
      logger(item);
      let db = await (0,idb__WEBPACK_IMPORTED_MODULE_1__.openDB)(this.dbName, 1); // @ts-ignore

      let transaction = db.transaction([key], "readwrite").objectStore(key).add(item);

      transaction.oncomplete = function (ev) {
        logger('Success');
        logger(ev);
      };

      transaction.onerror = function (ev) {
        logger('Error');
        logger(ev);
      };

      this.callbackForAddItem(item, key);
    }
  }

  async removeItemFromCollection(key, item, keyField = 'id') {
    if (item !== null) {
      logger(`Removing with key ${key} item ${item[keyField]}`);
      logger(item);
      let db = await (0,idb__WEBPACK_IMPORTED_MODULE_1__.openDB)(this.dbName, 1); // @ts-ignore

      let transaction = db.transaction([key], "readwrite").objectStore(key).delete(item[keyField]);

      transaction.oncomplete = function (ev) {
        logger('Success');
        logger(ev);
      };

      transaction.onerror = function (ev) {
        logger('Error');
        logger(ev);
      };

      await transaction.done;
      this.callbackForRemoveItem(item, key);
    }
  }

  async updateItemInCollection(key, item, keyField = 'id') {
    if (item) {
      logger(`Updating item in storage ${key}`);
      logger(item);
      let db = await (0,idb__WEBPACK_IMPORTED_MODULE_1__.openDB)(this.dbName, 1); // @ts-ignore

      let transaction = db.transaction([key], "readwrite").objectStore(key).put(item);

      transaction.oncomplete = function (ev) {
        logger('Success');
        logger(ev);
      };

      transaction.onerror = function (ev) {
        logger('Error');
        logger(ev);
      }; // @ts-ignore


      await transaction.done;
      this.callbackForUpdateItem(item, key);
    }
  }

  addChangeListenerForName(name, listener) {
    this.delegate.addChangeListenerForName(name, listener);
  }

  addNewItemToState(name, item, isPersisted) {
    this._addItemToState(name, item, isPersisted);
  }

  emitEvents() {
    this.delegate.emitEvents();
  }

  findItemInState(name, item) {
    throw Error("not implemented");
  }

  getStateByName(name) {
    this._getState(name);
  }

  informChangeListenersForStateWithName(name, stateObjValue, eventType, previousObjValue) {
    this.delegate.informChangeListenersForStateWithName(name, stateObjValue, eventType, previousObjValue);
  }

  isItemInState(name, item) {
    return true;
  }

  removeItemFromState(name, item, isPersisted) {
    logger(`Removing item from state ${name} is persisted ${isPersisted}`);
    logger(item);

    this._removeItemFromState(name, item, isPersisted);

    return true;
  }

  setStateByName(name, stateObjectForName, informListeners) {
    this._replaceNamedStateInStorage({
      name: name,
      value: stateObjectForName
    });

    if (informListeners) this.delegate.informChangeListenersForStateWithName(name, stateObjectForName, _StateManager__WEBPACK_IMPORTED_MODULE_2__.StateEventType.StateChanged, null);
  }

  suppressEvents() {
    this.delegate.suppressEvents();
  }

  updateItemInState(name, item, isPersisted) {
    this._updateItemInState(name, item, isPersisted);

    return true;
  }

  async getWithCollectionKey(key, keyField = 'id') {
    let savedResults = [];
    logger(`Loading with key ${key}`);
    let db = await (0,idb__WEBPACK_IMPORTED_MODULE_1__.openDB)(this.dbName, 1);
    await this.checkForObjectStore(db, key, keyField); // @ts-ignore

    let transaction = db.transaction([key]); // @ts-ignore

    let objectStore = transaction.store; // @ts-ignore

    let cursor = await objectStore.openCursor();

    while (cursor) {
      // @ts-ignore
      savedResults.push(cursor.value); // @ts-ignore

      cursor = await cursor.continue();
    }

    logger(savedResults);
    this.callbackForGetItems(savedResults, key);
  }

  getConfiguredStateNames() {
    let result = [];
    this.collections.forEach(collection => {
      result.push(collection.name);
    });
    return result;
  }

  _findItemsInState(name, filters) {
    return [];
  }

  findItemsInState(name, filters) {
    return [];
  }

  getType() {
    return _StateManager__WEBPACK_IMPORTED_MODULE_2__.StateManagerType.AsyncLocal;
  }

  getKeyFieldForKey(key) {
    let result = '_id';
    const foundIndex = this.collections.findIndex(collection => collection.name === key);

    if (foundIndex >= 0) {
      result = this.collections[foundIndex].keyField;
    }

    return result;
  }

  async checkForObjectStore(db, key, keyField) {
    logger(`Checking for collection ${key}`);

    if (!db.objectStoreNames.contains(key)) {
      // @ts-ignore
      logger(`Checking for collection ${key} - NOT found, creating`);
      await db.createObjectStore(key, {
        keyPath: keyField,
        autoIncrement: false
      });
    }
  }

  async saveItemsToCollection(objectStore, saveData, keyField = 'id') {
    logger(`Saving items to collection`);
    saveData.forEach(data => {
      // @ts-ignore
      objectStore.add(data);
    });
  }

  async removeAllItemsFromCollectionKey(key, keyField = 'id') {
    logger(`Clearing collection ${key}`);
    let db = await (0,idb__WEBPACK_IMPORTED_MODULE_1__.openDB)(this.dbName, 1);
    await this.checkForObjectStore(db, key, keyField); // @ts-ignore

    let transaction = db.transaction([key], "readwrite"); // @ts-ignore

    let objectStore = transaction.store; // @ts-ignore

    await objectStore.clear();
  }

  async callbackForRemoveItem(data, associatedStateName) {
    logger(`callback for remove item for state ${associatedStateName}  - not forwarded`);
    logger(data);
  }

  async callbackForUpdateItem(data, associatedStateName) {
    logger(`callback for update item for state ${associatedStateName}  - not forwarded`);
    logger(data);
  }

  callbackForGetItems(data, associatedStateName) {
    logger(`callback for get items for state ${associatedStateName} - FORWARDING`);
    logger(data);
    this.setCompletedRun(associatedStateName);
    this.delegate.informChangeListenersForStateWithName(associatedStateName, data, _StateManager__WEBPACK_IMPORTED_MODULE_2__.StateEventType.StateChanged, null);
  }

  async callbackForAddItem(data, associatedStateName) {
    logger(`callback for add item for state ${associatedStateName}  - FORWARDING`);
    logger(data);
    this.delegate.informChangeListenersForStateWithName(associatedStateName, data, _StateManager__WEBPACK_IMPORTED_MODULE_2__.StateEventType.ItemAdded, null);
  }

  _findItemInState(name, item) {}

}

/***/ }),

/***/ "./src/framework/state/MemoryBufferStateManager.ts":
/*!*********************************************************!*\
  !*** ./src/framework/state/MemoryBufferStateManager.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MemoryBufferStateManager": () => (/* binding */ MemoryBufferStateManager)
/* harmony export */ });
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AbstractStateManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AbstractStateManager */ "./src/framework/state/AbstractStateManager.ts");


const msManager = debug__WEBPACK_IMPORTED_MODULE_0___default()('state-manager-ms');
/** To Do - make state unchangeable outside of this class (i.e. deep copies) */

class MemoryBufferStateManager extends _AbstractStateManager__WEBPACK_IMPORTED_MODULE_1__.AbstractStateManager {
  constructor(defaultEq, equalFns = null) {
    super('memory', defaultEq, equalFns);
    this.applicationState = [];
    this.forceSaves = true;
  }

  _ensureStatePresent(name) {
    let foundIndex = this.applicationState.findIndex(element => element.name === name);

    if (foundIndex < 0) {
      let state = {
        name: name,
        value: []
      };
      this.applicationState.push(state);
    }
  }

  _addNewNamedStateToStorage(state) {
    msManager(`Adding new complete state ${name}`);
    msManager(state.value);
    this.applicationState.push(state);
  }

  _replaceNamedStateInStorage(state) {
    let foundIndex = this.applicationState.findIndex(element => element.name === state.name);

    if (foundIndex >= 0) {
      msManager(`replacing complete state ${name}`);
      msManager(state.value);
      this.applicationState.splice(foundIndex, 1, state);
    }
  }

  _getState(name) {
    // @ts-ignore
    let state = this.applicationState.find(element => element.name === name);
    msManager(`getting complete state ${name}`);
    msManager(state.value);
    return state;
  }

  _saveState(name, stateObject) {
    let foundIndex = this.applicationState.findIndex(element => element.name === name);

    if (foundIndex >= 0) {
      let state = this.applicationState[foundIndex];
      msManager(`SAVING complete state ${name}`);
      msManager(state.value);
      state.value = stateObject;
    }
  }

  _addItemToState(name, stateObj, isPersisted = false) {
    if (!isPersisted) return; // dont add incomplete objects to the state

    let foundIndex = this.applicationState.findIndex(element => element.name === name);

    if (foundIndex >= 0) {
      let state = this.applicationState[foundIndex];
      msManager(`adding item to state ${name}`);
      msManager(stateObj);
      state.value.push(stateObj);
    }
  }

  _removeItemFromState(name, stateObj, isPersisted) {
    let foundIndex = this.applicationState.findIndex(element => element.name === name);

    if (foundIndex >= 0) {
      let state = this.applicationState[foundIndex];
      const valueIndex = state.value.findIndex(element => this.getEqualityFnForName(name)(element, stateObj));

      if (valueIndex >= 0) {
        msManager(`removing item from state ${name}`);
        msManager(stateObj);
        state.value.splice(valueIndex, 1);
      }
    }
  }

  _updateItemInState(name, stateObj, isPersisted) {
    let foundIndex = this.applicationState.findIndex(element => element.name === name);

    if (foundIndex >= 0) {
      let state = this.applicationState[foundIndex];
      const valueIndex = state.value.findIndex(element => this.getEqualityFnForName(name)(element, stateObj));

      if (valueIndex >= 0) {
        state.value.splice(valueIndex, 1, stateObj);
        msManager(`updating item in state ${name}`);
        msManager(stateObj);
      }
    } else {
      this._addItemToState(name, stateObj, true);
    }
  }

}

/***/ }),

/***/ "./src/framework/state/RESTApiStateManager.ts":
/*!****************************************************!*\
  !*** ./src/framework/state/RESTApiStateManager.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RESTApiStateManager": () => (/* binding */ RESTApiStateManager)
/* harmony export */ });
/* harmony import */ var _StateManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StateManager */ "./src/framework/state/StateManager.ts");
/* harmony import */ var _network_Types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../network/Types */ "./src/framework/network/Types.ts");
/* harmony import */ var _network_DownloadManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../network/DownloadManager */ "./src/framework/network/DownloadManager.ts");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _StateChangedDelegate__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./StateChangedDelegate */ "./src/framework/state/StateChangedDelegate.ts");
/* harmony import */ var _network_CallbackRegistry__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../network/CallbackRegistry */ "./src/framework/network/CallbackRegistry.ts");






const logger = debug__WEBPACK_IMPORTED_MODULE_3___default()('state-manager-api');
class RESTApiStateManager {
  static FUNCTION_ID_ADD_ITEM = 'rest.api.state.manager.add.item';
  static FUNCTION_ID_REMOVE_ITEM = 'rest.api.state.manager.remove.item';
  static FUNCTION_ID_UPDATE_ITEM = 'rest.api.state.manager.update.item';
  static FUNCTION_ID_GET_ITEMS = 'rest.api.state.manager.get.items';
  static FUNCTION_ID_FIND_ITEM = 'rest.api.state.manager.find.item';
  configuration = [];

  constructor() {
    this.delegate = new _StateChangedDelegate__WEBPACK_IMPORTED_MODULE_4__.StateChangedDelegate('restapi');
    this.emitEvents();
    this.bHasCompletedRun = [];
    this.callbackForAddItem = this.callbackForAddItem.bind(this);
    this.callbackForRemoveItem = this.callbackForRemoveItem.bind(this);
    this.callbackForUpdateItem = this.callbackForUpdateItem.bind(this);
    this.callbackForGetItems = this.callbackForGetItems.bind(this);
    this.callbackForFindItem = this.callbackForFindItem.bind(this);
    _network_CallbackRegistry__WEBPACK_IMPORTED_MODULE_5__.CallbackRegistry.getInstance().addRegisterCallback(RESTApiStateManager.FUNCTION_ID_ADD_ITEM, this.callbackForAddItem);
    _network_CallbackRegistry__WEBPACK_IMPORTED_MODULE_5__.CallbackRegistry.getInstance().addRegisterCallback(RESTApiStateManager.FUNCTION_ID_REMOVE_ITEM, this.callbackForRemoveItem);
    _network_CallbackRegistry__WEBPACK_IMPORTED_MODULE_5__.CallbackRegistry.getInstance().addRegisterCallback(RESTApiStateManager.FUNCTION_ID_UPDATE_ITEM, this.callbackForUpdateItem);
    _network_CallbackRegistry__WEBPACK_IMPORTED_MODULE_5__.CallbackRegistry.getInstance().addRegisterCallback(RESTApiStateManager.FUNCTION_ID_GET_ITEMS, this.callbackForGetItems);
    _network_CallbackRegistry__WEBPACK_IMPORTED_MODULE_5__.CallbackRegistry.getInstance().addRegisterCallback(RESTApiStateManager.FUNCTION_ID_FIND_ITEM, this.callbackForFindItem);
  }

  static getInstance() {
    if (!RESTApiStateManager._instance) {
      RESTApiStateManager._instance = new RESTApiStateManager();
    }

    return RESTApiStateManager._instance;
  }

  getConfiguredStateNames() {
    let results = [];
    this.configuration.forEach(config => {
      results.push(config.stateName);
    });
    return results;
  }

  hasCompletedRun(stateName) {
    let result = false;
    let foundIndex = this.configuration.findIndex(config => config.stateName === stateName);

    if (foundIndex >= 0) {
      result = this.bHasCompletedRun[foundIndex];
    }

    return result;
  }

  setCompletedRun(stateName) {
    let foundIndex = this.configuration.findIndex(config => config.stateName === stateName);

    if (foundIndex >= 0) {
      this.bHasCompletedRun[foundIndex] = true;
    }
  }

  forceResetForGet(stateName) {
    let foundIndex = this.configuration.findIndex(config => config.stateName === stateName);

    if (foundIndex >= 0) {
      this.bHasCompletedRun[foundIndex] = false;
    }
  }

  initialise(config) {
    this.configuration = config;
    let runsComplete = [];
    this.configuration.forEach(configItem => {
      runsComplete.push(false);
    });
    this.bHasCompletedRun = runsComplete;
  }

  _addNewNamedStateToStorage(state) {
    /* assume model on the other end exists */
  }

  _getState(name) {
    logger(`Getting All ${name}`);

    if (this.hasCompletedRun(name)) {
      logger(`Getting All ${name} - not done - previously retrieved`);
    } else {
      let config = this.getConfigurationForStateName(name);

      if (config.isActive && config.findAll) {
        const jsonRequest = {
          url: config.serverURL + config.api,
          type: _network_Types__WEBPACK_IMPORTED_MODULE_1__.RequestType.GET,
          params: {},
          callbackId: RESTApiStateManager.FUNCTION_ID_GET_ITEMS,
          associatedStateName: name
        };
        _network_DownloadManager__WEBPACK_IMPORTED_MODULE_2__.DownloadManager.getInstance().addApiRequest(jsonRequest, true);
      } else {
        logger(`No configuration for state ${name}`);
      }
    }

    let state = {
      name: name,
      value: []
    };
    return state;
  }

  _ensureStatePresent(name) {
    /* assume state exists */
  }

  _replaceNamedStateInStorage(state) {
    /* not going to replace all state */
  }

  _saveState(name, stateObj) {
    /* not going to replace all state */
  }

  _addItemToState(name, stateObj, isPersisted = false) {
    if (isPersisted) return; // dont add complete objects to the state - they are already processed

    logger(`Adding item to ${name}`);
    logger(stateObj);
    let config = this.getConfigurationForStateName(name);

    if (config.isActive && config.create) {
      const jsonRequest = {
        url: config.serverURL + config.api,
        type: _network_Types__WEBPACK_IMPORTED_MODULE_1__.RequestType.POST,
        params: stateObj,
        callbackId: RESTApiStateManager.FUNCTION_ID_ADD_ITEM,
        associatedStateName: name
      };
      _network_DownloadManager__WEBPACK_IMPORTED_MODULE_2__.DownloadManager.getInstance().addApiRequest(jsonRequest, true);
    } else {
      logger(`No configuration for state ${name}`);
    }
  }

  _removeItemFromState(name, stateObj, isPersisted) {
    if (isPersisted) return; // dont remove complete objects to the state - they are already processed

    logger(`Removing item from ${name}`);
    logger(stateObj);
    let config = this.getConfigurationForStateName(name);
    let identifier = stateObj.id;

    if (config.idField) {
      identifier = stateObj[config.idField];
    }

    if (config.isActive && config.destroy) {
      const jsonRequest = {
        url: config.serverURL + config.api,
        type: _network_Types__WEBPACK_IMPORTED_MODULE_1__.RequestType.DELETE,
        params: {
          id: identifier
        },
        callbackId: RESTApiStateManager.FUNCTION_ID_REMOVE_ITEM,
        associatedStateName: name
      };
      _network_DownloadManager__WEBPACK_IMPORTED_MODULE_2__.DownloadManager.getInstance().addApiRequest(jsonRequest, true);
    } else {
      logger(`No configuration for state ${name}`);
    }
  }

  _updateItemInState(name, stateObj, isPersisted) {
    if (isPersisted) return; // dont update complete objects to the state - they are already processed

    logger(`Updating item in ${name}`);
    logger(stateObj);
    let config = this.getConfigurationForStateName(name);

    if (config.isActive && config.update) {
      const jsonRequest = {
        url: config.serverURL + config.api,
        type: _network_Types__WEBPACK_IMPORTED_MODULE_1__.RequestType.PUT,
        params: stateObj,
        callbackId: RESTApiStateManager.FUNCTION_ID_UPDATE_ITEM,
        associatedStateName: name
      };
      _network_DownloadManager__WEBPACK_IMPORTED_MODULE_2__.DownloadManager.getInstance().addApiRequest(jsonRequest, true);
    } else {
      logger(`No configuration for state ${name}`);
    }
  }

  addChangeListenerForName(name, listener) {
    this.delegate.addChangeListenerForName(name, listener);
  }

  addNewItemToState(name, item, isPersisted) {
    this._addItemToState(name, item, isPersisted);
  }

  emitEvents() {
    this.delegate.emitEvents();
  }

  findItemInState(name, item) {
    return this._findItemInState(name, item);
  }

  getStateByName(name) {
    this._getState(name);
  }

  informChangeListenersForStateWithName(name, stateObjValue, eventType, previousObjValue) {
    this.delegate.informChangeListenersForStateWithName(name, stateObjValue, eventType, previousObjValue);
  }

  isItemInState(name, item) {
    return true;
  }

  removeItemFromState(name, item, isPersisted) {
    logger(`Removing item from state ${name} is persisted ${isPersisted}`);
    logger(item);

    this._removeItemFromState(name, item, isPersisted);

    return true;
  }

  setStateByName(name, stateObjectForName, informListeners) {}

  suppressEvents() {
    this.delegate.suppressEvents();
  }

  updateItemInState(name, item, isPersisted) {
    this._updateItemInState(name, item, isPersisted);

    return true;
  }

  _findItemsInState(name, filters) {
    // TO DO
    return [];
  }

  findItemsInState(name, filters) {
    return this._findItemsInState(name, filters);
  }

  getType() {
    return _StateManager__WEBPACK_IMPORTED_MODULE_0__.StateManagerType.AsyncRemote;
  }

  getConfigurationForStateName(name) {
    let config = {
      stateName: name,
      serverURL: '',
      api: '',
      isActive: false,
      find: false,
      findAll: false,
      create: false,
      update: false,
      destroy: false
    };
    let foundIndex = this.configuration.findIndex(config => config.stateName === name);

    if (foundIndex >= 0) {
      config = this.configuration[foundIndex];
    }

    return config;
  }

  callbackForRemoveItem(data, status, associatedStateName) {
    logger(`callback for remove item for state ${associatedStateName} with status ${status} - not forwarded`);

    if (status >= 200 && status <= 299) {// do we have any data?
    }

    logger(data);
  }

  callbackForUpdateItem(data, status, associatedStateName) {
    logger(`callback for update item for state ${associatedStateName} with status ${status} - not forwarded`);

    if (status >= 200 && status <= 299) {// do we have any data?
    }

    logger(data);
  }

  callbackForGetItems(data, status, associatedStateName) {
    logger(`callback for get items for state ${associatedStateName} with status ${status} - FORWARDING`);
    logger(data);

    if (status >= 200 && status <= 299) {
      // do we have any data?
      this.setCompletedRun(associatedStateName);
      this.delegate.informChangeListenersForStateWithName(associatedStateName, data, _StateManager__WEBPACK_IMPORTED_MODULE_0__.StateEventType.StateChanged, null);
    }
  }

  callbackForFindItem(data, status, associatedStateName) {
    logger(`callback for find item for state ${associatedStateName} with status ${status} - FORWARDING`);

    if (status >= 200 && status <= 299) {
      // do we have any data?
      logger(data);
      this.delegate.informChangeListenersForStateWithName(associatedStateName, data, _StateManager__WEBPACK_IMPORTED_MODULE_0__.StateEventType.ItemAdded, null);
    }
  }

  callbackForAddItem(data, status, associatedStateName, wasOffline) {
    logger(`callback for add item for state ${associatedStateName} with status ${status} - FORWARDING`);

    if (status >= 200 && status <= 299) {
      // do we have any data?
      logger(data);

      if (!wasOffline) {
        this.delegate.informChangeListenersForStateWithName(associatedStateName, data, _StateManager__WEBPACK_IMPORTED_MODULE_0__.StateEventType.ItemAdded, null);
      } else {
        logger('Item was added offline, update the current data');
        this.delegate.informChangeListenersForStateWithName(associatedStateName, data, _StateManager__WEBPACK_IMPORTED_MODULE_0__.StateEventType.ItemUpdated, null);
      }
    } // did the call fail? (server loss)


    if (status === 500) {
      logger(data);
      logger(`Item adding - offline, but will be queued later`);
      this.delegate.informChangeListenersForStateWithName(associatedStateName, data, _StateManager__WEBPACK_IMPORTED_MODULE_0__.StateEventType.ItemAdded, null);
    }
  }

  _findItemInState(name, item) {
    logger(`Finding item from ${name}`);
    logger(item);
    let config = this.getConfigurationForStateName(name);
    let identifier = item.id;

    if (config.idField) {
      identifier = item[config.idField];
    }

    if (config.isActive && config.find) {
      const jsonRequest = {
        url: config.serverURL + config.api,
        type: _network_Types__WEBPACK_IMPORTED_MODULE_1__.RequestType.GET,
        params: {
          id: identifier
        },
        callbackId: RESTApiStateManager.FUNCTION_ID_FIND_ITEM,
        associatedStateName: name
      };
      _network_DownloadManager__WEBPACK_IMPORTED_MODULE_2__.DownloadManager.getInstance().addApiRequest(jsonRequest, true);
    } else {
      logger(`No configuration for state ${name}`);
    }
  }

}

/***/ }),

/***/ "./src/framework/state/StateChangedDelegate.ts":
/*!*****************************************************!*\
  !*** ./src/framework/state/StateChangedDelegate.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StateChangedDelegate": () => (/* binding */ StateChangedDelegate)
/* harmony export */ });
/* harmony import */ var _StateManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StateManager */ "./src/framework/state/StateManager.ts");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_1__);


const smLogger = debug__WEBPACK_IMPORTED_MODULE_1___default()('state-manager-delegate');
class StateChangedDelegate {
  suppressEventEmits = false;

  constructor(managerName) {
    this.managerName = managerName;
    this.stateChangeListeners = [];
  }

  suppressEvents() {
    this.suppressEventEmits = true;
  }

  emitEvents() {
    this.suppressEventEmits = false;
  }

  informChangeListenersForStateWithName(name, stateObjValue, eventType = _StateManager__WEBPACK_IMPORTED_MODULE_0__.StateEventType.StateChanged, previousObjValue = null) {
    smLogger(`State Manager: Informing state listeners of ${name}`);

    if (this.suppressEventEmits) {
      smLogger(`State Manager: Events suppressed`);
      return;
    }

    const foundIndex = this.stateChangeListeners.findIndex(element => element.name === name);

    if (foundIndex >= 0) {
      smLogger(`State Manager: Found state listeners of ${name} with event type ${eventType}`);
      /* let each state change listener know */

      const changeListenersForName = this.stateChangeListeners[foundIndex];
      changeListenersForName.listeners.forEach(listener => {
        smLogger(`State Manager: Found state listener of ${name} with name ${listener.getListenerName()} - informing`);

        try {
          switch (eventType) {
            case _StateManager__WEBPACK_IMPORTED_MODULE_0__.StateEventType.StateChanged:
              {
                listener.stateChanged(this.managerName, name, stateObjValue);
                break;
              }

            case _StateManager__WEBPACK_IMPORTED_MODULE_0__.StateEventType.ItemAdded:
              {
                listener.stateChangedItemAdded(this.managerName, name, stateObjValue);
                break;
              }

            case _StateManager__WEBPACK_IMPORTED_MODULE_0__.StateEventType.ItemUpdated:
              {
                listener.stateChangedItemUpdated(this.managerName, name, previousObjValue, stateObjValue);
                break;
              }

            case _StateManager__WEBPACK_IMPORTED_MODULE_0__.StateEventType.ItemDeleted:
              {
                listener.stateChangedItemRemoved(this.managerName, name, stateObjValue);
                break;
              }

            case _StateManager__WEBPACK_IMPORTED_MODULE_0__.StateEventType.FilterResults:
              {
                listener.filterResults(this.managerName, name, stateObjValue);
                break;
              }
          }
        } catch (err) {
          console.log(err);
        }
      });
    }
  }
  /*
        Add a state listener for a given state name
        the listener should be a function with two parameters
        name - string - the name of the state variable that they want to be informed about
        stateObjValue - object - the new state value
       */


  addChangeListenerForName(name, listener) {
    this.ensureListenerSetupForName(name);
    smLogger(`State Manager: Adding state listener for ${name} with name ${listener.getListenerName()}`);
    const foundIndex = this.stateChangeListeners.findIndex(element => element.name === name);

    if (foundIndex >= 0) {
      smLogger(`State Manager: Adding state listener for ${name} with name ${listener.getListenerName()} with index ${foundIndex}`);
      let changeListenersForName = this.stateChangeListeners[foundIndex];
      changeListenersForName.listeners.push(listener);
    }
  }

  ensureListenerSetupForName(name) {
    const foundIndex = this.stateChangeListeners.findIndex(element => element.name === name);

    if (foundIndex < 0) {
      const listenersNameArrayPair = {
        name,
        listeners: []
      };
      this.stateChangeListeners.push(listenersNameArrayPair);
    }
  }

}

/***/ }),

/***/ "./src/framework/state/StateManager.ts":
/*!*********************************************!*\
  !*** ./src/framework/state/StateManager.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StateEventType": () => (/* binding */ StateEventType),
/* harmony export */   "StateManagerType": () => (/* binding */ StateManagerType)
/* harmony export */ });
let StateEventType;

(function (StateEventType) {
  StateEventType[StateEventType["ItemAdded"] = 0] = "ItemAdded";
  StateEventType[StateEventType["ItemUpdated"] = 1] = "ItemUpdated";
  StateEventType[StateEventType["ItemDeleted"] = 2] = "ItemDeleted";
  StateEventType[StateEventType["StateChanged"] = 3] = "StateChanged";
  StateEventType[StateEventType["FilterResults"] = 4] = "FilterResults";
})(StateEventType || (StateEventType = {}));

let StateManagerType;

(function (StateManagerType) {
  StateManagerType[StateManagerType["Local"] = 0] = "Local";
  StateManagerType[StateManagerType["AsyncLocal"] = 1] = "AsyncLocal";
  StateManagerType[StateManagerType["AsyncRemote"] = 2] = "AsyncRemote";
})(StateManagerType || (StateManagerType = {}));

/***/ }),

/***/ "./src/framework/ui/ConfigurationTypes.ts":
/*!************************************************!*\
  !*** ./src/framework/ui/ConfigurationTypes.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DRAGGABLE_KEY_ID": () => (/* binding */ DRAGGABLE_KEY_ID),
/* harmony export */   "DRAGGABLE_TYPE": () => (/* binding */ DRAGGABLE_TYPE),
/* harmony export */   "DRAGGABLE_FROM": () => (/* binding */ DRAGGABLE_FROM),
/* harmony export */   "EXTRA_ACTION_ATTRIBUTE_NAME": () => (/* binding */ EXTRA_ACTION_ATTRIBUTE_NAME),
/* harmony export */   "Modifier": () => (/* binding */ Modifier),
/* harmony export */   "KeyType": () => (/* binding */ KeyType),
/* harmony export */   "SidebarLocation": () => (/* binding */ SidebarLocation),
/* harmony export */   "RowPosition": () => (/* binding */ RowPosition),
/* harmony export */   "SCREEN_WIDTH_LARGE": () => (/* binding */ SCREEN_WIDTH_LARGE),
/* harmony export */   "SCREEN_WIDTH_MEDIUM": () => (/* binding */ SCREEN_WIDTH_MEDIUM),
/* harmony export */   "SCREEN_WIDTH_SMALL": () => (/* binding */ SCREEN_WIDTH_SMALL)
/* harmony export */ });
const DRAGGABLE_KEY_ID = 'text/plain';
const DRAGGABLE_TYPE = 'draggedType';
const DRAGGABLE_FROM = 'draggedFrom';
const EXTRA_ACTION_ATTRIBUTE_NAME = 'view-extra-action';
let Modifier;

(function (Modifier) {
  Modifier[Modifier["normal"] = 0] = "normal";
  Modifier[Modifier["active"] = 1] = "active";
  Modifier[Modifier["inactive"] = 2] = "inactive";
  Modifier[Modifier["warning"] = 3] = "warning";
})(Modifier || (Modifier = {}));

let KeyType;

(function (KeyType) {
  KeyType[KeyType["number"] = 0] = "number";
  KeyType[KeyType["string"] = 1] = "string";
  KeyType[KeyType["boolean"] = 2] = "boolean";
  KeyType[KeyType["collection"] = 3] = "collection";
})(KeyType || (KeyType = {}));

let SidebarLocation;

(function (SidebarLocation) {
  SidebarLocation[SidebarLocation["top"] = 0] = "top";
  SidebarLocation[SidebarLocation["right"] = 1] = "right";
  SidebarLocation[SidebarLocation["left"] = 2] = "left";
  SidebarLocation[SidebarLocation["bottom"] = 3] = "bottom";
})(SidebarLocation || (SidebarLocation = {}));

let RowPosition;

(function (RowPosition) {
  RowPosition[RowPosition["first"] = 0] = "first";
  RowPosition[RowPosition["last"] = 1] = "last";
})(RowPosition || (RowPosition = {}));

const SCREEN_WIDTH_LARGE = 992;
const SCREEN_WIDTH_MEDIUM = 769;
const SCREEN_WIDTH_SMALL = 415;

/***/ }),

/***/ "./src/framework/ui/alert/AlertListener.ts":
/*!*************************************************!*\
  !*** ./src/framework/ui/alert/AlertListener.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AlertType": () => (/* binding */ AlertType)
/* harmony export */ });
let AlertType;

(function (AlertType) {
  AlertType[AlertType["cancelled"] = 0] = "cancelled";
  AlertType[AlertType["confirmed"] = 1] = "confirmed";
})(AlertType || (AlertType = {}));

/***/ }),

/***/ "./src/framework/ui/alert/AlertManager.ts":
/*!************************************************!*\
  !*** ./src/framework/ui/alert/AlertManager.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AlertManager": () => (/* binding */ AlertManager)
/* harmony export */ });
/* harmony import */ var _AlertListener__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AlertListener */ "./src/framework/ui/alert/AlertListener.ts");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_1__);


const ALERT_MODAL_ID = 'alert';
const ALERT_TITLE = 'alert-title';
const ALERT_CONTENT = 'alert-content';
const ALERT_CANCEL = 'alert-cancel';
const ALERT_CONFRIM = 'alert-confirm';
const ALERT_hideClass = "d-none";
const ALERT_showClass = "d-block";
const logger = debug__WEBPACK_IMPORTED_MODULE_1___default()('alert');
class AlertManager {
  constructor() {
    this.alertDiv = document.getElementById(ALERT_MODAL_ID);
    this.alertTitle = document.getElementById(ALERT_TITLE);
    this.alertContent = document.getElementById(ALERT_CONTENT);
    this.cancelButton = document.getElementById(ALERT_CANCEL);
    this.confirmButton = document.getElementById(ALERT_CONFRIM);
  }

  static getInstance() {
    if (!AlertManager._instance) {
      AlertManager._instance = new AlertManager();
    }

    return AlertManager._instance;
  }

  startAlert(listener, title, content, context) {
    this.alertTitle.innerHTML = title;
    this.alertContent.innerHTML = content; // @ts-ignore

    this.alertDiv.classList.remove(ALERT_hideClass); // @ts-ignore

    this.alertDiv.classList.add(ALERT_showClass);

    const confirmHandler = event => {
      logger(`Handling confirm event from alert`);
      listener.completed({
        outcome: _AlertListener__WEBPACK_IMPORTED_MODULE_0__.AlertType.confirmed,
        context: context
      }); // @ts-ignore

      this.alertDiv.classList.add(ALERT_hideClass); // @ts-ignore

      this.alertDiv.classList.remove(ALERT_showClass); // @ts-ignore

      event.target.removeEventListener('click', confirmHandler);
    };

    const cancelHandler = event => {
      logger(`Handling cancel event from alert`);
      listener.completed({
        outcome: _AlertListener__WEBPACK_IMPORTED_MODULE_0__.AlertType.cancelled,
        context: context
      }); // @ts-ignore

      this.alertDiv.classList.add(ALERT_hideClass); // @ts-ignore

      this.alertDiv.classList.remove(ALERT_showClass); // @ts-ignore

      event.target.removeEventListener('click', cancelHandler);
    };

    this.confirmButton.addEventListener('click', confirmHandler);
    this.cancelButton.addEventListener('click', cancelHandler);
  }

}

/***/ }),

/***/ "./src/framework/ui/chat/BlockedUserView.ts":
/*!**************************************************!*\
  !*** ./src/framework/ui/chat/BlockedUserView.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BlockedUserView": () => (/* binding */ BlockedUserView)
/* harmony export */ });
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _socket_NotificationController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../socket/NotificationController */ "./src/framework/socket/NotificationController.ts");
/* harmony import */ var _socket_ChatManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../socket/ChatManager */ "./src/framework/socket/ChatManager.ts");
/* harmony import */ var _view_implementation_AbstractStatefulCollectionView__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../view/implementation/AbstractStatefulCollectionView */ "./src/framework/ui/view/implementation/AbstractStatefulCollectionView.ts");
/* harmony import */ var _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../ConfigurationTypes */ "./src/framework/ui/ConfigurationTypes.ts");
/* harmony import */ var _view_renderer_ListViewRenderer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../view/renderer/ListViewRenderer */ "./src/framework/ui/view/renderer/ListViewRenderer.ts");
/* harmony import */ var _ChatTypes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ChatTypes */ "./src/framework/ui/chat/ChatTypes.ts");







const vLogger = debug__WEBPACK_IMPORTED_MODULE_0___default()('user-search-sidebar');
class BlockedUserView extends _view_implementation_AbstractStatefulCollectionView__WEBPACK_IMPORTED_MODULE_3__.AbstractStatefulCollectionView {
  static getInstance(stateManager) {
    if (!BlockedUserView._instance) {
      BlockedUserView._instance = new BlockedUserView(stateManager);
    }

    return BlockedUserView._instance;
  }

  static DOMConfig = {
    viewConfig: {
      resultsContainerId: 'blockedUsers',
      dataSourceId: _ChatTypes__WEBPACK_IMPORTED_MODULE_6__.VIEW_NAME.blockedUsers,
      drop: {
        acceptFrom: [_ChatTypes__WEBPACK_IMPORTED_MODULE_6__.DRAGGABLE.fromUserSearch, _ChatTypes__WEBPACK_IMPORTED_MODULE_6__.DRAGGABLE.fromFavourites],
        acceptTypes: [_ChatTypes__WEBPACK_IMPORTED_MODULE_6__.DRAGGABLE.typeUser]
      }
    },
    resultsElement: {
      type: 'a',
      attributes: [{
        name: 'href',
        value: '#'
      }],
      classes: 'list-group-item my-list-item truncate-notification list-group-item-action'
    },
    keyId: '_id',
    keyType: _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_4__.KeyType.string,
    modifiers: {
      normal: 'list-group-item-primary',
      inactive: 'list-group-item-light',
      active: 'list-group-item-info',
      warning: 'list-group-item-danger'
    },
    icons: {
      normal: 'fas fa-comment',
      inactive: 'fas fa-comment',
      active: 'fas fa-heart',
      warning: 'fas fa-exclamation-circle'
    },
    detail: {
      containerClasses: 'd-flex w-100 justify-content-between',
      textElement: {
        type: 'span',
        classes: 'mb-1'
      },
      select: true,
      quickDelete: true,
      delete: {
        classes: 'btn bg-danger text-white btn-circle btn-sm',
        iconClasses: 'fas fa-trash-alt'
      }
    }
  };

  constructor(stateManager) {
    super(BlockedUserView.DOMConfig, stateManager, _ChatTypes__WEBPACK_IMPORTED_MODULE_6__.STATE_NAMES.users); // list renderer

    this.renderer = new _view_renderer_ListViewRenderer__WEBPACK_IMPORTED_MODULE_5__.ListViewRenderer(this, this); // handler binding

    this.handleLoggedInUsersUpdated = this.handleLoggedInUsersUpdated.bind(this);
    this.handleFavouriteUserLoggedIn = this.handleFavouriteUserLoggedIn.bind(this);
    this.handleFavouriteUserLoggedOut = this.handleFavouriteUserLoggedOut.bind(this);
    this.handleFavouriteUsersChanged = this.handleFavouriteUsersChanged.bind(this);
    this.handleBlockedUsersChanged = this.handleBlockedUsersChanged.bind(this);
    this.handleLoggedInUsersUpdated = this.handleLoggedInUsersUpdated.bind(this);
    _socket_NotificationController__WEBPACK_IMPORTED_MODULE_1__.NotificationController.getInstance().addUserListener(this);
  }

  onDocumentLoaded() {
    super.onDocumentLoaded();
    this.addEventListener(this);
  }

  canDeleteItem(view, selectedItem) {
    return true;
  }

  documentLoaded(view) {}

  itemDeleted(view, selectedItem) {
    // @ts-ignore
    vLogger(`Blocked user ${selectedItem.username} with id ${selectedItem.id} deleted - removing`);
    _socket_ChatManager__WEBPACK_IMPORTED_MODULE_2__.ChatManager.getInstance().removeUserFromBlockedList(selectedItem.username);
  }

  itemSelected(view, selectedItem) {
    throw new Error('Method not implemented.');
  }

  itemDragStarted(view, selectedItem) {
    throw new Error('Method not implemented.');
  }

  itemAction(view, actionName, selectedItem) {
    throw new Error('Method not implemented.');
  }

  hideRequested(view) {
    throw new Error('Method not implemented.');
  }

  showRequested(view) {
    throw new Error('Method not implemented.');
  }

  handleLoggedInUsersUpdated(usernames) {}

  handleFavouriteUserLoggedIn(username) {}

  handleFavouriteUserLoggedOut(username) {}

  handleFavouriteUsersChanged(usernames) {}

  handleBlockedUsersChanged(usernames) {
    vLogger(`Handle Blocked Users changed to ${usernames}`);
    this.updateViewForNamedCollection('', {});
  }

  renderDisplayForItemInNamedCollection(containerEl, name, item) {
    containerEl.innerHTML = item.username;
  }

  getSecondaryModifierForItemInNamedCollection(name, item) {
    return _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_4__.Modifier.warning;
  }

  getIdForItemInNamedCollection(name, item) {
    return item._id;
  }

  updateViewForNamedCollection(name, newState) {
    var _this$stateManager; // find the blocked users in the user list


    let blockedUsers = [];
    const users = (_this$stateManager = this.stateManager) === null || _this$stateManager === void 0 ? void 0 : _this$stateManager.getStateByName(_ChatTypes__WEBPACK_IMPORTED_MODULE_6__.STATE_NAMES.users);

    if (users) {
      users.forEach(user => {
        if (_socket_ChatManager__WEBPACK_IMPORTED_MODULE_2__.ChatManager.getInstance().isUserInBlockedList(user.username)) {
          blockedUsers.push(user);
        }
      });
    }

    super.updateViewForNamedCollection(name, blockedUsers);
  }

  itemDropped(view, droppedItem) {
    if (_socket_ChatManager__WEBPACK_IMPORTED_MODULE_2__.ChatManager.getInstance().isUserInBlockedList(droppedItem.username)) {
      vLogger(`${droppedItem.username} already in blocked list, ignoring`);
      return;
    } // add the user to the Chat Manager and we should get an event about it


    _socket_ChatManager__WEBPACK_IMPORTED_MODULE_2__.ChatManager.getInstance().addUserToBlockedList(droppedItem.username);
  }

  itemDeselected(view, selectedItem) {}

  canSelectItem(view, selectedItem) {
    return false;
  }

}

/***/ }),

/***/ "./src/framework/ui/chat/ChatLogDetailView.ts":
/*!****************************************************!*\
  !*** ./src/framework/ui/chat/ChatLogDetailView.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ChatLogDetailView": () => (/* binding */ ChatLogDetailView)
/* harmony export */ });
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _socket_NotificationController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../socket/NotificationController */ "./src/framework/socket/NotificationController.ts");
/* harmony import */ var _socket_ChatManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../socket/ChatManager */ "./src/framework/socket/ChatManager.ts");
/* harmony import */ var _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../util/BrowserUtil */ "./src/framework/util/BrowserUtil.ts");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _socket_Types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../socket/Types */ "./src/framework/socket/Types.ts");
/* harmony import */ var _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../ConfigurationTypes */ "./src/framework/ui/ConfigurationTypes.ts");
/* harmony import */ var _notification_NotificationManager__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../notification/NotificationManager */ "./src/framework/notification/NotificationManager.ts");
/* harmony import */ var _ChatTypes__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ChatTypes */ "./src/framework/ui/chat/ChatTypes.ts");
/* harmony import */ var _security_SecurityManager__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../security/SecurityManager */ "./src/framework/security/SecurityManager.ts");










const csLoggerDetail = debug__WEBPACK_IMPORTED_MODULE_0___default()('chat-sidebar:detail');
class ChatLogDetailView {
  static getInstance(stateManager) {
    if (!ChatLogDetailView._instance) {
      ChatLogDetailView._instance = new ChatLogDetailView(stateManager);
    }

    return ChatLogDetailView._instance;
  }

  static newFormId = "newMessage";
  static commentId = "message";
  static submitCommentId = "submitMessage";
  static chatLogId = 'chatLog';
  static chatLogRoomId = 'chatLogRoom';
  static leaveChatId = 'leaveChat';
  static chatFastSearchUserNames = 'chatFastSearchUserNames'; // @ts-ignore

  constructor(stateManager) {
    this.stateManager = stateManager;
    this.selectedChatLog = null; // handler binding

    this.handleAddMessage = this.handleAddMessage.bind(this);
    this.handleChatLogsUpdated = this.handleChatLogsUpdated.bind(this);
    this.handleChatLogUpdated = this.handleChatLogUpdated.bind(this);
    this.handleChatStarted = this.handleChatStarted.bind(this);
    this.handleUserDrop = this.handleUserDrop.bind(this);
    this.leaveChat = this.leaveChat.bind(this);
    this.eventUserSelected = this.eventUserSelected.bind(this);
    _socket_NotificationController__WEBPACK_IMPORTED_MODULE_1__.NotificationController.getInstance().addListener(this);
    this.stateManager.addChangeListenerForName(_ChatTypes__WEBPACK_IMPORTED_MODULE_8__.STATE_NAMES.users, this);
  }

  hasActionPermission(actionName, from, item) {
    return true;
  }

  getListenerName() {
    return 'Chat Log Details';
  }

  canSelectItem(view, selectedItem) {
    return true;
  }

  hasPermissionToDeleteItemInNamedCollection(name, item) {
    return true;
  }

  hasPermissionToUpdateItemInNamedCollection(name, item) {
    return true;
  }

  hasChanged() {
    return false;
  }

  setContainedBy(container) {}

  addEventListener(listener) {}

  getIdForItemInNamedCollection(name, item) {
    throw new Error('Method not implemented.');
  }

  getDisplayValueForItemInNamedCollection(name, item) {
    throw new Error('Method not implemented.');
  }

  compareItemsForEquality(item1, item2) {
    throw new Error('Method not implemented.');
  }

  getModifierForItemInNamedCollection(name, item) {
    throw new Error('Method not implemented.');
  }

  getSecondaryModifierForItemInNamedCollection(name, item) {
    throw new Error('Method not implemented.');
  }

  getBadgeValueForItemInNamedCollection(name, item) {
    throw new Error('Method not implemented.');
  }

  getBackgroundImageForItemInNamedCollection(name, item) {
    throw new Error('Method not implemented.');
  }

  updateViewForNamedCollection(name, newState) {
    throw new Error('Method not implemented.');
  }

  itemDeselected(view, selectedItem) {
    csLoggerDetail(`Chat Log with id ${selectedItem.roomName} deselected`);

    if (this.selectedChatLog && selectedItem.roomName === this.selectedChatLog.roomName) {
      this.selectedChatLog = null;
      this.checkCanComment();
      this.clearChatLog();
    }
  }

  itemSelected(view, selectedItem) {
    this.selectedChatLog = selectedItem;

    if (this.selectedChatLog) {
      csLoggerDetail(`Chat Log with id ${selectedItem.roomName} selected`);
      this.checkCanComment();
      this.renderChatLog(this.selectedChatLog);
    }
  }

  canDeleteItem(view, selectedItem) {
    return true;
  }

  itemDeleted(view, selectedItem) {
    csLoggerDetail(`Chat Log with ${selectedItem.roomName} deleting`);

    if (this.selectedChatLog && this.selectedChatLog.roomName === selectedItem.roomName) {
      this.checkCanComment();
      this.renderChatLog(this.selectedChatLog);
    }
  }

  hideRequested(view) {
    this.selectedChatLog = null;
    this.checkCanComment();
    this.clearChatLog();
  }

  handleUserDrop(event) {
    csLoggerDetail('drop event on current chat room');

    if (this.selectedChatLog) {
      // @ts-ignore
      const draggedObjectJSON = event.dataTransfer.getData(_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_6__.DRAGGABLE_KEY_ID);
      const draggedObject = JSON.parse(draggedObjectJSON);
      csLoggerDetail(draggedObject);

      if (draggedObject[_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_6__.DRAGGABLE_TYPE] === _ChatTypes__WEBPACK_IMPORTED_MODULE_8__.DRAGGABLE.typeUser) {
        //add the user to the current chat if not already there
        _socket_ChatManager__WEBPACK_IMPORTED_MODULE_2__.ChatManager.getInstance().sendInvite(draggedObject.username, this.selectedChatLog.roomName);
        _notification_NotificationManager__WEBPACK_IMPORTED_MODULE_7__.NotificationManager.getInstance().show('Chat', `Invited ${draggedObject.username} to the chat.`);
      }
    }
  }

  handleChatLogUpdated(log) {
    csLoggerDetail(`Handling chat log updates`);
    this.checkCanComment();
    this.renderChatLog(log);
  }

  handleAddMessage(event) {
    event.preventDefault();
    event.stopPropagation();
    csLoggerDetail(`Handling message event`);

    if (this.selectedChatLog) {
      // @ts-ignore
      if (this.commentEl && this.commentEl.value.trim().length === 0) return; // @ts-ignore

      const messageContent = this.commentEl.value.trim(); // @ts-ignore

      this.commentEl.value = '';
      const simpleAttachment = {
        identifier: '',
        type: '',
        displayText: ''
      };
      let sentMessage = _socket_ChatManager__WEBPACK_IMPORTED_MODULE_2__.ChatManager.getInstance().sendMessage(this.selectedChatLog.roomName, messageContent, _socket_Types__WEBPACK_IMPORTED_MODULE_5__.Priority.Normal, simpleAttachment, {});

      if (sentMessage) {
        // add the message to our display
        let messageEl = this.addChatMessage(sentMessage); // scroll to bottom

        _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_3__["default"].scrollSmoothTo(messageEl);
      }
    }
  }

  onDocumentLoaded() {
    // @ts-ignore
    this.chatLogDiv = document.getElementById(ChatLogDetailView.chatLogId); // @ts-ignore

    this.commentEl = document.getElementById(ChatLogDetailView.commentId); // @ts-ignore

    this.chatForm = document.getElementById(ChatLogDetailView.newFormId); // @ts-ignore

    this.sendMessageButton = document.getElementById(ChatLogDetailView.submitCommentId); // @ts-ignore

    this.leaveChatButton = document.getElementById(ChatLogDetailView.leaveChatId); // @ts-ignore

    this.chatRoomDiv = document.getElementById(ChatLogDetailView.chatLogRoomId); // @ts-ignore

    this.fastUserSearch = document.getElementById(ChatLogDetailView.chatFastSearchUserNames);
    this.chatRoomDiv.addEventListener('dragover', event => {
      csLoggerDetail('Dragged over');
      if (this.selectedChatLog) event.preventDefault();
    });
    this.chatRoomDiv.addEventListener('drop', this.handleUserDrop);
    this.chatForm.addEventListener('submit', this.handleAddMessage);
    this.leaveChatButton.addEventListener('click', this.leaveChat);
    this.checkCanComment(); // fast user search
    // @ts-ignore

    const fastSearchEl = $(`#${ChatLogDetailView.chatFastSearchUserNames}`); // @ts-ignore

    fastSearchEl.on('autocompleteselect', this.eventUserSelected);
  }

  eventUserSelected(event, ui) {
    event.preventDefault();
    event.stopPropagation();
    csLoggerDetail(`User ${ui.item.label} with id ${ui.item.value} selected`); // @ts-ignore

    event.target.innerText = ''; // add to the chat, if one selected

    if (this.selectedChatLog) _socket_ChatManager__WEBPACK_IMPORTED_MODULE_2__.ChatManager.getInstance().sendInvite(ui.item.label, this.selectedChatLog.roomName);
    _notification_NotificationManager__WEBPACK_IMPORTED_MODULE_7__.NotificationManager.getInstance().show('Chat', `Invited ${ui.item.label} to the chat.`);
  }

  addChatMessage(message) {
    let chatMessageEl = document.createElement('div');
    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_3__["default"].addRemoveClasses(chatMessageEl, "message"); // are we dealing with an "join"/"exit" message?

    if (message.from.trim().length === 0) {
      let messageSenderEl = document.createElement('div');
      _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_3__["default"].addRemoveClasses(messageSenderEl, 'message-sender');
      messageSenderEl.innerText = message.message;
      chatMessageEl.appendChild(messageSenderEl);
    } else {
      if (message.from === _socket_ChatManager__WEBPACK_IMPORTED_MODULE_2__.ChatManager.getInstance().getCurrentUser()) {
        _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_3__["default"].addRemoveClasses(chatMessageEl, "my-message");
      } else {
        let messageSenderEl = document.createElement('div');
        _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_3__["default"].addRemoveClasses(messageSenderEl, 'message-sender');
        messageSenderEl.innerText = message.from + '   ' + moment__WEBPACK_IMPORTED_MODULE_4___default()(message.created, 'YYYYMMDDHHmmss').format('DD/MM/YYYY ');
        chatMessageEl.appendChild(messageSenderEl);
      }

      let contentEl = document.createElement('div');

      if (message.from === _socket_ChatManager__WEBPACK_IMPORTED_MODULE_2__.ChatManager.getInstance().getCurrentUser()) {
        _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_3__["default"].addRemoveClasses(contentEl, "my-message-content");
      } else {
        _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_3__["default"].addRemoveClasses(contentEl, 'message-content');
      }

      contentEl.innerText = message.message;
      chatMessageEl.appendChild(contentEl);
    }

    this.chatLogDiv.appendChild(chatMessageEl);
    return chatMessageEl;
  }

  reRenderChatMessages(chatLog) {
    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_3__["default"].removeAllChildren(this.chatLogDiv);
    let messageEl = null;
    chatLog.messages.forEach(message => {
      messageEl = this.addChatMessage(message);
    }); // scroll to the last message (if any)

    if (messageEl) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_3__["default"].scrollTo(messageEl);
  }

  renderChatLog(chatLog) {
    csLoggerDetail(`Chat Log ${chatLog.roomName} rendering`);

    if (this.selectedChatLog) {
      if (this.selectedChatLog.roomName === chatLog.roomName) {
        this.selectedChatLog = chatLog;
        _socket_ChatManager__WEBPACK_IMPORTED_MODULE_2__.ChatManager.getInstance().touchChatLog(chatLog.roomName); // render the chat conversation

        this.reRenderChatMessages(chatLog);
      }
    }
  }

  handleChatLogsUpdated() {
    if (this.selectedChatLog) {
      _socket_ChatManager__WEBPACK_IMPORTED_MODULE_2__.ChatManager.getInstance().touchChatLog(this.selectedChatLog.roomName); // render the chat conversation

      this.reRenderChatMessages(this.selectedChatLog);
    }

    this.checkCanComment();
  }

  handleChatStarted(log) {
    this.selectedChatLog = log;
    this.renderChatLog(log);
  }

  stateChanged(managerName, name, newValue) {
    if (name === _ChatTypes__WEBPACK_IMPORTED_MODULE_8__.STATE_NAMES.users) {
      // @ts-ignore
      const fastSearchEl = $(`#${ChatLogDetailView.ssFastSearchUserNames}`); // what is my username?

      let myUsername = _security_SecurityManager__WEBPACK_IMPORTED_MODULE_9__.SecurityManager.getInstance().getLoggedInUsername(); // for each name, construct the patient details to display and the id referenced

      const fastSearchValues = [];
      newValue.forEach(item => {
        const searchValue = {
          label: item.username,
          value: item._id
        }; // @ts-ignore

        if (myUsername !== item.username) fastSearchValues.push(searchValue); // don't search for ourselves
      });
      fastSearchEl.autocomplete({
        source: fastSearchValues
      });
      fastSearchEl.autocomplete('option', {
        disabled: false,
        minLength: 1
      });
    }
  }

  stateChangedItemAdded(managerName, name, itemAdded) {
    this.stateChanged(managerName, name, this.stateManager.getStateByName(name));
  }

  stateChangedItemRemoved(managerName, name, itemRemoved) {}

  stateChangedItemUpdated(managerName, name, itemUpdated, itemNewValue) {}

  handleOfflineMessagesReceived(messages) {}

  handleInvitationDeclined(room, username) {}

  handleNewInviteReceived(invite) {
    return true;
  }

  itemDragStarted(view, selectedItem) {}

  itemAction(view, actionName, selectedItem) {}

  documentLoaded(view) {}

  showRequested(view) {}

  itemDropped(view, droppedItem) {}

  getName() {
    return _ChatTypes__WEBPACK_IMPORTED_MODULE_8__.VIEW_NAME.chatLog;
  }

  hidden() {
    this.hideRequested(this);
  }

  getDataSourceKeyId() {
    return "";
  }

  getUIConfig() {
    // @ts-ignore
    return undefined;
  }

  render() {}

  show() {}

  getItemDescription(from, item) {
    return "";
  }

  getItemId(from, item) {
    return "";
  }

  filterResults(managerName, name, filterResults) {}

  leaveChat(event) {
    event.preventDefault();
    event.stopPropagation();

    if (this.selectedChatLog) {
      _socket_ChatManager__WEBPACK_IMPORTED_MODULE_2__.ChatManager.getInstance().leaveChat(this.selectedChatLog.roomName);
      this.selectedChatLog = null;
      this.clearChatLog();
      this.checkCanComment();
    }
  }

  checkCanComment() {
    if (this.selectedChatLog) {
      if (this.commentEl) this.commentEl.removeAttribute("readonly");
      if (this.commentEl) this.commentEl.removeAttribute("disabled");
      if (this.sendMessageButton) this.sendMessageButton.removeAttribute("disabled");
      if (this.leaveChatButton) this.leaveChatButton.removeAttribute("disabled");
      if (this.fastUserSearch) this.fastUserSearch.removeAttribute("disabled");
    } else {
      if (this.commentEl) this.commentEl.setAttribute("readonly", "true");
      if (this.commentEl) this.commentEl.setAttribute("disabled", "true");
      if (this.sendMessageButton) this.sendMessageButton.setAttribute("disabled", "true");
      if (this.leaveChatButton) this.leaveChatButton.setAttribute("disabled", "true");
      if (this.fastUserSearch) this.fastUserSearch.setAttribute("disabled", "true");
    }
  }

  clearChatLog() {
    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_3__["default"].removeAllChildren(this.chatLogDiv);
  }

}

/***/ }),

/***/ "./src/framework/ui/chat/ChatLogsView.ts":
/*!***********************************************!*\
  !*** ./src/framework/ui/chat/ChatLogsView.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ChatLogsView": () => (/* binding */ ChatLogsView)
/* harmony export */ });
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _socket_NotificationController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../socket/NotificationController */ "./src/framework/socket/NotificationController.ts");
/* harmony import */ var _socket_ChatManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../socket/ChatManager */ "./src/framework/socket/ChatManager.ts");
/* harmony import */ var _view_implementation_AbstractStatefulCollectionView__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../view/implementation/AbstractStatefulCollectionView */ "./src/framework/ui/view/implementation/AbstractStatefulCollectionView.ts");
/* harmony import */ var _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../ConfigurationTypes */ "./src/framework/ui/ConfigurationTypes.ts");
/* harmony import */ var _state_MemoryBufferStateManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../state/MemoryBufferStateManager */ "./src/framework/state/MemoryBufferStateManager.ts");
/* harmony import */ var _util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../util/EqualityFunctions */ "./src/framework/util/EqualityFunctions.ts");
/* harmony import */ var _view_renderer_ListViewRenderer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../view/renderer/ListViewRenderer */ "./src/framework/ui/view/renderer/ListViewRenderer.ts");
/* harmony import */ var _ChatTypes__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ChatTypes */ "./src/framework/ui/chat/ChatTypes.ts");









const csLogger = debug__WEBPACK_IMPORTED_MODULE_0___default()('chat-sidebar');
class ChatLogsView extends _view_implementation_AbstractStatefulCollectionView__WEBPACK_IMPORTED_MODULE_3__.AbstractStatefulCollectionView {
  static getInstance() {
    if (!ChatLogsView._instance) {
      ChatLogsView._instance = new ChatLogsView();
    }

    return ChatLogsView._instance;
  }

  static DOMConfig = {
    viewConfig: {
      resultsContainerId: 'chatLogs',
      dataSourceId: _ChatTypes__WEBPACK_IMPORTED_MODULE_8__.VIEW_NAME.chatLogs
    },
    resultsElement: {
      type: 'a',
      attributes: [{
        name: 'href',
        value: '#'
      }],
      classes: 'list-group-item my-list-item truncate-notification list-group-item-action'
    },
    keyId: 'roomName',
    keyType: _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_4__.KeyType.string,
    modifiers: {
      normal: '',
      inactive: 'list-group-item-dark',
      active: 'list-group-item-primary',
      warning: ''
    },
    detail: {
      containerClasses: 'd-flex w-100 justify-content-between',
      textElement: {
        type: 'span',
        classes: 'mb-1'
      },
      select: true,
      delete: {
        classes: 'btn bg-danger text-white btn-circle btn-sm',
        iconClasses: 'text-black fas fa-sign-out-alt'
      },
      badge: {
        type: 'span',
        classes: 'badge badge-pill badge-primary mr-1'
      }
    }
  };
  selectedChatLog = null;

  constructor() {
    super(ChatLogsView.DOMConfig, new _state_MemoryBufferStateManager__WEBPACK_IMPORTED_MODULE_5__.MemoryBufferStateManager(_util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_6__.isSameRoom), _ChatTypes__WEBPACK_IMPORTED_MODULE_8__.STATE_NAMES.chatLogs);
    this.renderer = new _view_renderer_ListViewRenderer__WEBPACK_IMPORTED_MODULE_7__.ListViewRenderer(this, this); // handler binding

    this.handleChatLogsUpdated = this.handleChatLogsUpdated.bind(this);
    this.handleChatLogUpdated = this.handleChatLogUpdated.bind(this);
    this.handleChatStarted = this.handleChatStarted.bind(this);
    _socket_NotificationController__WEBPACK_IMPORTED_MODULE_1__.NotificationController.getInstance().addListener(this);
  }

  compareItemsForEquality(item1, item2) {
    return (0,_util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_6__.isSameRoom)(item1, item2);
  }

  handleNewInviteReceived(invite) {
    return true;
  }

  handleChatLogUpdated(log) {
    csLogger(`Handling chat log updates`);
    this.updateStateManager();
  }

  onDocumentLoaded() {
    super.onDocumentLoaded();
    this.addEventCollectionListener(this);
    this.updateStateManager();
  }

  getIdForItemInNamedCollection(name, item) {
    return item.roomName;
  }

  renderDisplayForItemInNamedCollection(containerEl, name, item) {
    containerEl.innerHTML = item.users.join(',');
  }

  getModifierForItemInNamedCollection(name, item) {
    let result = _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_4__.Modifier.inactive;

    if (this.selectedChatLog) {
      if (this.selectedChatLog.roomName === item.roomName) {
        result = _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_4__.Modifier.active;
      }
    }

    return result;
  }

  getSecondaryModifierForItemInNamedCollection(name, item) {
    return this.getModifierForItemInNamedCollection(name, item);
  }

  selectChatRoom(roomName) {
    let room = _socket_ChatManager__WEBPACK_IMPORTED_MODULE_2__.ChatManager.getInstance().getChatLog(roomName);
    this.selectedChatLog = room;
    this.eventForwarder.itemSelected(this, this.selectedChatLog);
    this.updateStateManager();
  }

  handleChatLogsUpdated() {
    if (this.selectedChatLog) {
      _socket_ChatManager__WEBPACK_IMPORTED_MODULE_2__.ChatManager.getInstance().touchChatLog(this.selectedChatLog.roomName);
    }

    this.updateStateManager();
  }

  handleChatStarted(log) {
    this.selectedChatLog = log;
    this.eventForwarder.itemSelected(this, this.selectedChatLog);
    this.updateStateManager();
  }

  getBadgeValueForItemInNamedCollection(name, item) {
    return item.unreadMessages + item.unreadHighMessages + item.unreadUrgentMessages;
  }

  canDeleteItem(view, selectedItem) {
    return true;
  }

  itemDeleted(view, selectedItem) {
    csLogger(`Deleting chat ${selectedItem.roomName}`);
    _socket_ChatManager__WEBPACK_IMPORTED_MODULE_2__.ChatManager.getInstance().leaveChat(selectedItem.roomName);

    if (this.selectedChatLog && this.selectedChatLog.roomName === selectedItem.roomName) {
      this.eventForwarder.itemDeselected(this, this.selectedChatLog);
      this.selectedChatLog = null;
    }

    this.updateStateManager();
  }

  hideRequested(view) {
    if (this.selectedChatLog) {
      this.eventForwarder.itemDeselected(this, this.selectedChatLog);
      this.selectedChatLog = null;
    }
  }

  hidden() {
    this.hideRequested(this);
  }

  documentLoaded(view) {}

  itemAction(view, actionName, selectedItem) {}

  itemDragStarted(view, selectedItem) {}

  itemDropped(view, droppedItem) {}

  itemSelected(view, selectedItem) {
    this.selectedChatLog = selectedItem;
    this.updateStateManager();
  }

  itemDeselected(view, selectedItem) {
    this.selectedChatLog = null;
    this.updateStateManager();
  }

  showRequested(view) {}

  handleOfflineMessagesReceived(messages) {}

  handleInvitationDeclined(room, username) {}

  canSelectItem(view, selectedItem) {
    return true;
  }

  updateStateManager() {
    csLogger(`Updating state with chat manager`);
    let newState = _socket_ChatManager__WEBPACK_IMPORTED_MODULE_2__.ChatManager.getInstance().getChatLogs();
    csLogger(newState);
    this.stateManager.setStateByName(_ChatTypes__WEBPACK_IMPORTED_MODULE_8__.STATE_NAMES.chatLogs, newState, true);
  }

}

/***/ }),

/***/ "./src/framework/ui/chat/ChatRoomsSidebar.ts":
/*!***************************************************!*\
  !*** ./src/framework/ui/chat/ChatRoomsSidebar.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ChatRoomsSidebar": () => (/* binding */ ChatRoomsSidebar)
/* harmony export */ });
/* harmony import */ var _container_SidebarViewContainer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../container/SidebarViewContainer */ "./src/framework/ui/container/SidebarViewContainer.ts");
/* harmony import */ var _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ConfigurationTypes */ "./src/framework/ui/ConfigurationTypes.ts");
/* harmony import */ var _ChatLogsView__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ChatLogsView */ "./src/framework/ui/chat/ChatLogsView.ts");
/* harmony import */ var _ChatLogDetailView__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ChatLogDetailView */ "./src/framework/ui/chat/ChatLogDetailView.ts");




class ChatRoomsSidebar extends _container_SidebarViewContainer__WEBPACK_IMPORTED_MODULE_0__.SidebarViewContainer {
  static getInstance(stateManager) {
    if (!ChatRoomsSidebar._instance) {
      ChatRoomsSidebar._instance = new ChatRoomsSidebar(stateManager);
    }

    return ChatRoomsSidebar._instance;
  }

  static SidebarPrefs = {
    id: 'chatSideBar',
    expandedSize: '35%',
    location: _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.SidebarLocation.right
  };
  static SidebarContainers = {
    chatLogs: 'chatLogs',
    chatLog: 'chatLogRoom'
  };

  constructor(stateManager) {
    super(ChatRoomsSidebar.SidebarPrefs);
    const chatView = _ChatLogsView__WEBPACK_IMPORTED_MODULE_2__.ChatLogsView.getInstance();
    this.addView(chatView, {
      containerId: ChatRoomsSidebar.SidebarContainers.chatLogs
    });
    const chatLogView = _ChatLogDetailView__WEBPACK_IMPORTED_MODULE_3__.ChatLogDetailView.getInstance(stateManager);
    this.addView(chatLogView, {
      containerId: ChatRoomsSidebar.SidebarContainers.chatLog
    });
    chatView.addEventListener(chatLogView);
  }

}

/***/ }),

/***/ "./src/framework/ui/chat/ChatTypes.ts":
/*!********************************************!*\
  !*** ./src/framework/ui/chat/ChatTypes.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "STATE_NAMES": () => (/* binding */ STATE_NAMES),
/* harmony export */   "DRAGGABLE": () => (/* binding */ DRAGGABLE),
/* harmony export */   "VIEW_NAME": () => (/* binding */ VIEW_NAME)
/* harmony export */ });
const STATE_NAMES = {
  users: 'user',
  chatLogs: 'chatLog',
  recentUserSearches: 'recentUserSearch'
};
const DRAGGABLE = {
  typeUser: 'user',
  fromUserSearch: 'userSearch',
  fromFavourites: 'favourites'
};
const VIEW_NAME = {
  blockedUsers: 'blockedUsers',
  chatLog: 'chatLog',
  chatLogs: 'chatLogs',
  favouriteUsers: 'favouriteUsers',
  userSearch: 'userSearch'
};

/***/ }),

/***/ "./src/framework/ui/chat/FavouriteUserView.ts":
/*!****************************************************!*\
  !*** ./src/framework/ui/chat/FavouriteUserView.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FavouriteUserView": () => (/* binding */ FavouriteUserView)
/* harmony export */ });
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _socket_NotificationController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../socket/NotificationController */ "./src/framework/socket/NotificationController.ts");
/* harmony import */ var _socket_ChatManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../socket/ChatManager */ "./src/framework/socket/ChatManager.ts");
/* harmony import */ var _view_implementation_AbstractStatefulCollectionView__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../view/implementation/AbstractStatefulCollectionView */ "./src/framework/ui/view/implementation/AbstractStatefulCollectionView.ts");
/* harmony import */ var _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../ConfigurationTypes */ "./src/framework/ui/ConfigurationTypes.ts");
/* harmony import */ var _view_renderer_ListViewRenderer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../view/renderer/ListViewRenderer */ "./src/framework/ui/view/renderer/ListViewRenderer.ts");
/* harmony import */ var _ChatTypes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ChatTypes */ "./src/framework/ui/chat/ChatTypes.ts");







const vLogger = debug__WEBPACK_IMPORTED_MODULE_0___default()('user-search-sidebar');
const vLoggerDetail = debug__WEBPACK_IMPORTED_MODULE_0___default()('user-search-sidebar:detail');
class FavouriteUserView extends _view_implementation_AbstractStatefulCollectionView__WEBPACK_IMPORTED_MODULE_3__.AbstractStatefulCollectionView {
  static getInstance(stateManager) {
    if (!FavouriteUserView._instance) {
      FavouriteUserView._instance = new FavouriteUserView(stateManager);
    }

    return FavouriteUserView._instance;
  }

  static DOMConfig = {
    viewConfig: {
      resultsContainerId: 'favouriteUsers',
      drop: {
        acceptFrom: [_ChatTypes__WEBPACK_IMPORTED_MODULE_6__.DRAGGABLE.fromUserSearch],
        acceptTypes: [_ChatTypes__WEBPACK_IMPORTED_MODULE_6__.DRAGGABLE.typeUser]
      },
      dataSourceId: _ChatTypes__WEBPACK_IMPORTED_MODULE_6__.VIEW_NAME.favouriteUsers
    },
    resultsElement: {
      type: 'a',
      attributes: [{
        name: 'href',
        value: '#'
      }],
      classes: 'list-group-item my-list-item truncate-notification list-group-item-action'
    },
    keyId: '_id',
    keyType: _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_4__.KeyType.string,
    modifiers: {
      normal: 'list-group-item-primary',
      inactive: 'list-group-item-light',
      active: 'list-group-item-info',
      warning: 'list-group-item-danger'
    },
    icons: {
      normal: 'fas fa-comment',
      inactive: 'fas fa-comment',
      active: 'fas fa-heart',
      warning: 'fas fa-exclamation-circle'
    },
    detail: {
      containerClasses: 'd-flex w-100 justify-content-between',
      textElement: {
        type: 'span',
        classes: 'mb-1'
      },
      select: true,
      quickDelete: true,
      delete: {
        classes: 'btn bg-danger text-white btn-circle btn-sm',
        iconClasses: 'fas fa-trash-alt'
      },
      drag: {
        type: _ChatTypes__WEBPACK_IMPORTED_MODULE_6__.DRAGGABLE.typeUser,
        from: _ChatTypes__WEBPACK_IMPORTED_MODULE_6__.DRAGGABLE.fromFavourites
      }
    },
    extraActions: [{
      name: 'block',
      button: {
        classes: 'btn bg-warning text-white btn-circle btn-sm mr-1',
        iconClasses: 'fas fa-user-slash'
      }
    }]
  };

  constructor(stateManager) {
    super(FavouriteUserView.DOMConfig, stateManager, _ChatTypes__WEBPACK_IMPORTED_MODULE_6__.STATE_NAMES.users);
    this.renderer = new _view_renderer_ListViewRenderer__WEBPACK_IMPORTED_MODULE_5__.ListViewRenderer(this, this); // handler binding

    this.handleLoggedInUsersUpdated = this.handleLoggedInUsersUpdated.bind(this);
    this.handleFavouriteUserLoggedIn = this.handleFavouriteUserLoggedIn.bind(this);
    this.handleFavouriteUserLoggedOut = this.handleFavouriteUserLoggedOut.bind(this);
    this.handleFavouriteUsersChanged = this.handleFavouriteUsersChanged.bind(this);
    this.handleBlockedUsersChanged = this.handleBlockedUsersChanged.bind(this);
    this.handleLoggedInUsersUpdated = this.handleLoggedInUsersUpdated.bind(this);
    _socket_NotificationController__WEBPACK_IMPORTED_MODULE_1__.NotificationController.getInstance().addUserListener(this);
  }

  onDocumentLoaded() {
    super.onDocumentLoaded();
    this.addEventCollectionListener(this);
  }

  handleLoggedInUsersUpdated(usernames) {
    vLogger(`Received new list of users who are logged in `);
    this.updateViewForNamedCollection('', {});
  }

  handleFavouriteUserLoggedIn(username) {
    vLogger(`Handle Favourite User ${username} logged in`);
    this.updateViewForNamedCollection('', {});
  }

  handleFavouriteUserLoggedOut(username) {
    vLogger(`Handle Favourite User ${username} logged in`);
    this.updateViewForNamedCollection('', {});
  }

  handleFavouriteUsersChanged(usernames) {
    vLogger(`Handle Favourite Users changed to ${usernames}`);
    this.updateViewForNamedCollection('', {});
  }

  getIdForItemInNamedCollection(name, item) {
    return item._id;
  }

  renderDisplayForItemInNamedCollection(containerEl, name, item) {
    containerEl.innerHTML = item.username;
  }

  getModifierForItemInNamedCollection(name, item) {
    let result = _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_4__.Modifier.normal; // if the user is currently logged out make the item inactive

    if (!_socket_ChatManager__WEBPACK_IMPORTED_MODULE_2__.ChatManager.getInstance().isUserLoggedIn(item.username)) {
      result = _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_4__.Modifier.inactive;
    }

    return result;
  }

  getSecondaryModifierForItemInNamedCollection(name, item) {
    let result = _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_4__.Modifier.normal;
    vLoggerDetail(`Checking for item secondary modifiers ${item.username}`); // if the user is in the black list then show warning and a favourite user is highlighted

    if (_socket_NotificationController__WEBPACK_IMPORTED_MODULE_1__.NotificationController.getInstance().isFavouriteUser(item.username)) {
      vLoggerDetail(`is favourite`);
      result = _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_4__.Modifier.active;
    }

    if (_socket_NotificationController__WEBPACK_IMPORTED_MODULE_1__.NotificationController.getInstance().isBlockedUser(item.username)) {
      vLoggerDetail(`is blocked`);
      result = _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_4__.Modifier.warning;
    }

    return result;
  }

  updateViewForNamedCollection(name, newState) {
    var _this$stateManager; // find the blocked users in the user list


    let favUsers = [];
    const users = (_this$stateManager = this.stateManager) === null || _this$stateManager === void 0 ? void 0 : _this$stateManager.getStateByName(_ChatTypes__WEBPACK_IMPORTED_MODULE_6__.STATE_NAMES.users);

    if (users) {
      users.forEach(user => {
        if (_socket_ChatManager__WEBPACK_IMPORTED_MODULE_2__.ChatManager.getInstance().isUserInFavouriteList(user.username)) {
          favUsers.push(user);
        }
      });
    }

    super.updateViewForNamedCollection(name, favUsers);
  }

  documentLoaded(view) {}

  handleBlockedUsersChanged(usernames) {
    this.updateViewForNamedCollection('', {});
  }

  hideRequested(view) {}

  itemAction(view, actionName, selectedItem) {
    // @ts-ignore
    if (actionName === this.collectionUIConfig.extraActions[0].name) {
      if (_socket_ChatManager__WEBPACK_IMPORTED_MODULE_2__.ChatManager.getInstance().isUserInBlockedList(selectedItem.username)) {
        vLogger(`${selectedItem.username} already in fav list, ignoring`);
        return;
      }

      _socket_ChatManager__WEBPACK_IMPORTED_MODULE_2__.ChatManager.getInstance().addUserToBlockedList(selectedItem.username);
    }
  }

  canDeleteItem(view, selectedItem) {
    return true;
  }

  itemDeleted(view, selectedItem) {
    vLogger(`Favourite user ${selectedItem.username} with id ${selectedItem.id} deleted - removing`);
    _socket_ChatManager__WEBPACK_IMPORTED_MODULE_2__.ChatManager.getInstance().removeUserFromFavouriteList(selectedItem.username);
  }

  itemDragStarted(view, selectedItem) {}

  itemDeselected(view, selectedItem) {}

  itemDropped(view, droppedItem) {
    vLogger(`Handling item dropped ${droppedItem.username}`);

    if (_socket_ChatManager__WEBPACK_IMPORTED_MODULE_2__.ChatManager.getInstance().isUserInFavouriteList(droppedItem.username)) {
      vLogger(`${droppedItem.username} already in fav list, ignoring`);
      return;
    } // add the user to the Chat Manager and we should get an event about it


    _socket_ChatManager__WEBPACK_IMPORTED_MODULE_2__.ChatManager.getInstance().addUserToFavouriteList(droppedItem.username);
  }

  itemSelected(view, selectedItem) {
    const roomName = _socket_NotificationController__WEBPACK_IMPORTED_MODULE_1__.NotificationController.getInstance().startChatWithUser(selectedItem.username);
  }

  showRequested(view) {}

  canSelectItem(view, selectedItem) {
    return true;
  }

}

/***/ }),

/***/ "./src/framework/ui/chat/UserSearchSidebar.ts":
/*!****************************************************!*\
  !*** ./src/framework/ui/chat/UserSearchSidebar.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserSearchSidebar": () => (/* binding */ UserSearchSidebar)
/* harmony export */ });
/* harmony import */ var _container_SidebarViewContainer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../container/SidebarViewContainer */ "./src/framework/ui/container/SidebarViewContainer.ts");
/* harmony import */ var _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ConfigurationTypes */ "./src/framework/ui/ConfigurationTypes.ts");
/* harmony import */ var _UserSearchView__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UserSearchView */ "./src/framework/ui/chat/UserSearchView.ts");
/* harmony import */ var _FavouriteUserView__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./FavouriteUserView */ "./src/framework/ui/chat/FavouriteUserView.ts");
/* harmony import */ var _BlockedUserView__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./BlockedUserView */ "./src/framework/ui/chat/BlockedUserView.ts");
/* harmony import */ var _ChatRoomsSidebar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ChatRoomsSidebar */ "./src/framework/ui/chat/ChatRoomsSidebar.ts");






class UserSearchSidebar extends _container_SidebarViewContainer__WEBPACK_IMPORTED_MODULE_0__.SidebarViewContainer {
  static getInstance(stateManager) {
    if (!UserSearchSidebar._instance) {
      UserSearchSidebar._instance = new UserSearchSidebar(stateManager);
    }

    return UserSearchSidebar._instance;
  }

  static SidebarPrefs = {
    id: 'userSearchSideBar',
    expandedSize: '35%',
    location: _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.SidebarLocation.left
  };
  static SidebarContainers = {
    recentSearches: 'userSearchZone',
    favourites: 'favouriteUsersDropZone',
    blocked: 'blockedUsersDropZone'
  };

  constructor(stateManager) {
    super(UserSearchSidebar.SidebarPrefs);
    const recentSearches = _UserSearchView__WEBPACK_IMPORTED_MODULE_2__.UserSearchView.getInstance(stateManager);
    this.addView(recentSearches, {
      containerId: UserSearchSidebar.SidebarContainers.recentSearches
    });
    const favouriteUsers = _FavouriteUserView__WEBPACK_IMPORTED_MODULE_3__.FavouriteUserView.getInstance(stateManager);
    this.addView(favouriteUsers, {
      containerId: UserSearchSidebar.SidebarContainers.favourites
    });
    const blockedUsers = _BlockedUserView__WEBPACK_IMPORTED_MODULE_4__.BlockedUserView.getInstance(stateManager);
    this.addView(blockedUsers, {
      containerId: UserSearchSidebar.SidebarContainers.blocked
    });
    this.logSB = _ChatRoomsSidebar__WEBPACK_IMPORTED_MODULE_5__.ChatRoomsSidebar.getInstance(stateManager);
  }

}

/***/ }),

/***/ "./src/framework/ui/chat/UserSearchView.ts":
/*!*************************************************!*\
  !*** ./src/framework/ui/chat/UserSearchView.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserSearchView": () => (/* binding */ UserSearchView)
/* harmony export */ });
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util/EqualityFunctions */ "./src/framework/util/EqualityFunctions.ts");
/* harmony import */ var _socket_NotificationController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../socket/NotificationController */ "./src/framework/socket/NotificationController.ts");
/* harmony import */ var _state_BrowserStorageStateManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../state/BrowserStorageStateManager */ "./src/framework/state/BrowserStorageStateManager.ts");
/* harmony import */ var _socket_ChatManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../socket/ChatManager */ "./src/framework/socket/ChatManager.ts");
/* harmony import */ var _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../ConfigurationTypes */ "./src/framework/ui/ConfigurationTypes.ts");
/* harmony import */ var _view_implementation_AbstractStatefulCollectionView__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../view/implementation/AbstractStatefulCollectionView */ "./src/framework/ui/view/implementation/AbstractStatefulCollectionView.ts");
/* harmony import */ var _view_renderer_ListViewRenderer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../view/renderer/ListViewRenderer */ "./src/framework/ui/view/renderer/ListViewRenderer.ts");
/* harmony import */ var _ChatTypes__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ChatTypes */ "./src/framework/ui/chat/ChatTypes.ts");
/* harmony import */ var _security_SecurityManager__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../security/SecurityManager */ "./src/framework/security/SecurityManager.ts");
/* harmony import */ var _ChatRoomsSidebar__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./ChatRoomsSidebar */ "./src/framework/ui/chat/ChatRoomsSidebar.ts");
/* harmony import */ var _ChatLogsView__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./ChatLogsView */ "./src/framework/ui/chat/ChatLogsView.ts");












const vLogger = debug__WEBPACK_IMPORTED_MODULE_0___default()('user-search');
const vLoggerDetail = debug__WEBPACK_IMPORTED_MODULE_0___default()('user-search-detail');
class UserSearchView extends _view_implementation_AbstractStatefulCollectionView__WEBPACK_IMPORTED_MODULE_6__.AbstractStatefulCollectionView {
  static getInstance(stateManager) {
    if (!UserSearchView._instance) {
      UserSearchView._instance = new UserSearchView(stateManager);
    }

    return UserSearchView._instance;
  }

  static fastSearchInputId = 'fastSearchUserNames';
  static dataLimit = 10;
  static DOMConfig = {
    viewConfig: {
      resultsContainerId: 'recentUserSearches',
      dataSourceId: _ChatTypes__WEBPACK_IMPORTED_MODULE_8__.VIEW_NAME.userSearch
    },
    resultsElement: {
      type: 'a',
      attributes: [{
        name: 'href',
        value: '#'
      }],
      classes: 'list-group-item my-list-item truncate-notification list-group-item-action'
    },
    keyId: '_id',
    keyType: _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_5__.KeyType.string,
    modifiers: {
      normal: 'list-group-item-primary',
      inactive: 'list-group-item-light',
      active: 'list-group-item-info',
      warning: 'list-group-item-danger'
    },
    icons: {
      normal: 'fas fa-comment',
      inactive: 'fas fa-comment',
      active: 'fas fa-heart',
      warning: 'fas fa-exclamation-circle'
    },
    detail: {
      containerClasses: 'd-flex w-100 justify-content-between',
      textElement: {
        type: 'span',
        classes: 'mb-1'
      },
      select: true,
      quickDelete: true,
      delete: {
        classes: 'btn bg-danger text-white btn-circle btn-sm',
        iconClasses: 'fas fa-trash-alt'
      },
      drag: {
        type: _ChatTypes__WEBPACK_IMPORTED_MODULE_8__.DRAGGABLE.typeUser,
        from: _ChatTypes__WEBPACK_IMPORTED_MODULE_8__.DRAGGABLE.fromUserSearch
      }
    },
    extraActions: [{
      name: 'favourite',
      button: {
        classes: 'btn bg-info text-white btn-circle btn-sm mr-1',
        iconClasses: 'fas fa-user-plus'
      }
    }, {
      name: 'block',
      button: {
        classes: 'btn bg-warning text-white btn-circle btn-sm mr-1',
        iconClasses: 'fas fa-user-slash'
      }
    }]
  };

  constructor(stateManager) {
    super(UserSearchView.DOMConfig, stateManager, _ChatTypes__WEBPACK_IMPORTED_MODULE_8__.STATE_NAMES.users);
    this.loggedInUsers = [];
    this.renderer = new _view_renderer_ListViewRenderer__WEBPACK_IMPORTED_MODULE_7__.ListViewRenderer(this, this); // handler binding

    this.updateViewForNamedCollection = this.updateViewForNamedCollection.bind(this);
    this.eventUserSelected = this.eventUserSelected.bind(this);
    this.handleLoggedInUsersUpdated = this.handleLoggedInUsersUpdated.bind(this);
    this.handleFavouriteUserLoggedIn = this.handleFavouriteUserLoggedIn.bind(this);
    this.handleFavouriteUserLoggedOut = this.handleFavouriteUserLoggedOut.bind(this);
    this.handleFavouriteUsersChanged = this.handleFavouriteUsersChanged.bind(this);
    this.handleBlockedUsersChanged = this.handleBlockedUsersChanged.bind(this);
    this.handleLoggedInUsersUpdated = this.handleLoggedInUsersUpdated.bind(this);
    this.itemDeleted = this.itemDeleted.bind(this); // register state change listening

    this.localisedSM = new _state_BrowserStorageStateManager__WEBPACK_IMPORTED_MODULE_3__.BrowserStorageStateManager(true, false, _util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_1__.isSameMongo);
    this.localisedSM.addChangeListenerForName(_ChatTypes__WEBPACK_IMPORTED_MODULE_8__.STATE_NAMES.recentUserSearches, this);
    _socket_NotificationController__WEBPACK_IMPORTED_MODULE_2__.NotificationController.getInstance().addUserListener(this);
    vLogger(this.localisedSM.getStateByName(_ChatTypes__WEBPACK_IMPORTED_MODULE_8__.STATE_NAMES.recentUserSearches));
  }

  handleLoggedInUsersUpdated(usernames) {
    vLogger(`Received new list of users who are logged in `);
    vLogger(usernames);
    this.loggedInUsers = usernames;
    this.updateViewForNamedCollection(_ChatTypes__WEBPACK_IMPORTED_MODULE_8__.STATE_NAMES.recentUserSearches, {});
  }

  handleFavouriteUserLoggedIn(username) {
    vLogger(`Handle Favourite User ${username} logged in`);
    this.updateViewForNamedCollection(_ChatTypes__WEBPACK_IMPORTED_MODULE_8__.STATE_NAMES.recentUserSearches, {});
  }

  handleFavouriteUserLoggedOut(username) {
    vLogger(`Handle Favourite User ${username} logged in`);
    this.updateViewForNamedCollection(_ChatTypes__WEBPACK_IMPORTED_MODULE_8__.STATE_NAMES.recentUserSearches, {});
  }

  handleFavouriteUsersChanged(usernames) {
    vLogger(`Handle Favourite Users changed to ${usernames}`);
    this.updateViewForNamedCollection(_ChatTypes__WEBPACK_IMPORTED_MODULE_8__.STATE_NAMES.recentUserSearches, {});
  }

  handleBlockedUsersChanged(usernames) {
    vLogger(`Handle Blocked Users changed to ${usernames}`);
    this.updateViewForNamedCollection(_ChatTypes__WEBPACK_IMPORTED_MODULE_8__.STATE_NAMES.recentUserSearches, {});
  }

  onDocumentLoaded() {
    super.onDocumentLoaded(); // @ts-ignore

    const fastSearchEl = $(`#${UserSearchView.fastSearchInputId}`); // @ts-ignore

    fastSearchEl.on('autocompleteselect', this.eventUserSelected);
  }

  getIdForItemInNamedCollection(name, item) {
    return item._id;
  }

  renderDisplayForItemInNamedCollection(containerEl, name, item) {
    containerEl.innerHTML = item.username;
  }

  getModifierForItemInNamedCollection(name, item) {
    let result = _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_5__.Modifier.normal;
    vLoggerDetail(`Checking for item modifiers`);
    vLoggerDetail(item); // if the user is currently logged out make the item inactive

    if (!_socket_ChatManager__WEBPACK_IMPORTED_MODULE_4__.ChatManager.getInstance().isUserLoggedIn(item.username)) {
      result = _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_5__.Modifier.inactive;
    }

    return result;
  }

  getSecondaryModifierForItemInNamedCollection(name, item) {
    let result = _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_5__.Modifier.normal;
    vLoggerDetail(`Checking for item secondary modifiers ${item.username}`); // if the user is in the black list then show warning and a favourite user is highlighted

    if (_socket_NotificationController__WEBPACK_IMPORTED_MODULE_2__.NotificationController.getInstance().isFavouriteUser(item.username)) {
      vLoggerDetail(`is favourite`);
      result = _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_5__.Modifier.active;
    }

    if (_socket_NotificationController__WEBPACK_IMPORTED_MODULE_2__.NotificationController.getInstance().isBlockedUser(item.username)) {
      vLoggerDetail(`is blocked`);
      result = _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_5__.Modifier.warning;
    }

    return result;
  }

  eventUserSelected(event, ui) {
    event.preventDefault();
    event.stopPropagation();
    vLogger(`User ${ui.item.label} with id ${ui.item.value} selected`); // @ts-ignore

    event.target.innerText = ''; // add the selected user to the recent user searches

    if (this.localisedSM.isItemInState(_ChatTypes__WEBPACK_IMPORTED_MODULE_8__.STATE_NAMES.recentUserSearches, {
      _id: ui.item.value
    })) return;
    const recentUserSearches = this.localisedSM.getStateByName(_ChatTypes__WEBPACK_IMPORTED_MODULE_8__.STATE_NAMES.recentUserSearches);
    vLogger(`saved searches too long? ${_ChatTypes__WEBPACK_IMPORTED_MODULE_8__.STATE_NAMES.recentUserSearches}`);

    if (recentUserSearches.length >= UserSearchView.dataLimit) {
      vLogger('saved searches too long - removing first'); // remove the first item from recent searches

      const item = recentUserSearches.shift();
      this.localisedSM.removeItemFromState(_ChatTypes__WEBPACK_IMPORTED_MODULE_8__.STATE_NAMES.recentUserSearches, item, true);
    } // save the searches


    this.localisedSM.addNewItemToState(_ChatTypes__WEBPACK_IMPORTED_MODULE_8__.STATE_NAMES.recentUserSearches, {
      _id: ui.item.value,
      username: ui.item.label
    }, true);
  }

  updateViewForNamedCollection(name, newState) {
    if (name === _ChatTypes__WEBPACK_IMPORTED_MODULE_8__.STATE_NAMES.recentUserSearches) {
      vLogger(`Updating for recent searches`);
      newState = this.localisedSM.getStateByName(_ChatTypes__WEBPACK_IMPORTED_MODULE_8__.STATE_NAMES.recentUserSearches);
      vLogger(newState);
      super.updateViewForNamedCollection(name, newState);
    }

    if (name === _ChatTypes__WEBPACK_IMPORTED_MODULE_8__.STATE_NAMES.users) {
      // load the search names into the search field
      // what is my username?
      let myUsername = _security_SecurityManager__WEBPACK_IMPORTED_MODULE_9__.SecurityManager.getInstance().getLoggedInUsername(); // @ts-ignore

      const fastSearchEl = $(`#${UserSearchView.fastSearchInputId}`); // for each name, construct the patient details to display and the id referenced

      const fastSearchValues = [];
      newState.forEach(item => {
        const searchValue = {
          label: item.username,
          value: item._id
        };
        if (myUsername !== item.username) fastSearchValues.push(searchValue); // don't search for ourselves
      });
      fastSearchEl.autocomplete({
        source: fastSearchValues
      });
      fastSearchEl.autocomplete('option', {
        disabled: false,
        minLength: 1
      });
    }
  }

  itemAction(view, actionName, selectedItem) {
    // @ts-ignore
    if (actionName === this.collectionUIConfig.extraActions[0].name) {
      if (_socket_ChatManager__WEBPACK_IMPORTED_MODULE_4__.ChatManager.getInstance().isUserInFavouriteList(selectedItem.username)) {
        vLogger(`${selectedItem.username} already in fav list, ignoring`);
        return;
      }

      _socket_ChatManager__WEBPACK_IMPORTED_MODULE_4__.ChatManager.getInstance().addUserToFavouriteList(selectedItem.username);
    } // @ts-ignore


    if (actionName === this.collectionUIConfig.extraActions[1].name) {
      if (_socket_ChatManager__WEBPACK_IMPORTED_MODULE_4__.ChatManager.getInstance().isUserInBlockedList(selectedItem.username)) {
        vLogger(`${selectedItem.username} already in blocked list, ignoring`);
        return;
      }

      _socket_ChatManager__WEBPACK_IMPORTED_MODULE_4__.ChatManager.getInstance().addUserToBlockedList(selectedItem.username);
    }
  }

  compareItemsForEquality(item1, item2) {
    return (0,_util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_1__.isSameMongo)(item1, item2);
  }

  itemDeleted(view, selectedItem) {
    vLoggerDetail(selectedItem);
    vLogger(`Recent search user ${selectedItem.username} with id ${selectedItem.id} deleted - removing`);
    this.localisedSM.removeItemFromState(_ChatTypes__WEBPACK_IMPORTED_MODULE_8__.STATE_NAMES.recentUserSearches, selectedItem, true);
  }

  itemSelected(view, selectedItem) {
    const roomName = _socket_NotificationController__WEBPACK_IMPORTED_MODULE_2__.NotificationController.getInstance().startChatWithUser(selectedItem.username);
    _ChatRoomsSidebar__WEBPACK_IMPORTED_MODULE_10__.ChatRoomsSidebar.getInstance(this.stateManager).eventShow(null);
    if (roomName) _ChatLogsView__WEBPACK_IMPORTED_MODULE_11__.ChatLogsView.getInstance().selectChatRoom(roomName);
  }

}

/***/ }),

/***/ "./src/framework/ui/container/SidebarViewContainer.ts":
/*!************************************************************!*\
  !*** ./src/framework/ui/container/SidebarViewContainer.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SidebarViewContainer": () => (/* binding */ SidebarViewContainer)
/* harmony export */ });
/* harmony import */ var _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ConfigurationTypes */ "./src/framework/ui/ConfigurationTypes.ts");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_1__);


const sbvcLogger = debug__WEBPACK_IMPORTED_MODULE_1___default()('sidebar-container');
class SidebarViewContainer {
  constructor(prefs) {
    this.prefs = prefs;
    this.views = []; // event handlers

    this.eventHide = this.eventHide.bind(this);
    this.eventShow = this.eventShow.bind(this);
  }

  addView(view, config) {
    sbvcLogger(`Adding view to container, with containing div of ${config.containerId}`);
    const viewContainer = document.getElementById(config.containerId);

    if (viewContainer) {
      sbvcLogger(`Adding view to container, with containing div of ${config.containerId} - FOUND`);
      view.setContainedBy(viewContainer);
    }

    this.views.push(view);
    view.addEventListener(this);
  }

  onDocumentLoaded() {
    // this should be called once at startup
    // hide the side bar panel
    this.eventHide(null); // add the event listener for the close button

    const sidePanelEl = document.getElementById(this.prefs.id);
    if (sidePanelEl === null) return;
    const closeButtonEl = sidePanelEl.querySelector('.close');

    if (closeButtonEl) {
      closeButtonEl.addEventListener('click', this.eventHide);
    }

    this.views.forEach(view => {
      view.onDocumentLoaded();
    });
  }

  eventHide(event) {
    if (event) event.preventDefault();
    this.showHide('0%');
    this.views.forEach(view => {
      view.hidden();
    });
  }

  eventShow(event) {
    //414,768,1024
    let size = this.prefs.expandedSize;

    if (window.outerWidth < 769) {
      size = '50%';
    }

    if (window.outerWidth < 415) {
      size = '100%';
    }

    this.showHide(size);
  }

  documentLoaded(view) {}

  itemAction(view, actionName, selectedItem) {}

  canDeleteItem(view, selectedItem) {
    return true;
  }

  itemDeleted(view, selectedItem) {}

  itemDragStarted(view, selectedItem) {}

  itemSelected(view, selectedItem) {}

  itemDeselected(view, selectedItem) {}

  itemDropped(view, droppedItem) {}

  showRequested(view) {
    this.eventShow(null);
  }
  /*
    Contained views can request show and hide of the sidebar container
   */


  hideRequested(view) {
    this.eventHide(null);
  }

  canSelectItem(view, selectedItem) {
    return true;
  }

  showHide(newStyleValue) {
    const sidePanelEl = document.getElementById(this.prefs.id);
    if (sidePanelEl === null) return;

    switch (this.prefs.location) {
      case _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_0__.SidebarLocation.left:
        {
          sidePanelEl.style.width = newStyleValue;
          break;
        }

      case _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_0__.SidebarLocation.right:
        {
          sidePanelEl.style.width = newStyleValue;
          break;
        }

      case _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_0__.SidebarLocation.bottom:
        {
          sidePanelEl.style.height = newStyleValue;
          break;
        }

      case _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_0__.SidebarLocation.top:
        {
          sidePanelEl.style.height = newStyleValue;
          break;
        }
    }
  }

}

/***/ }),

/***/ "./src/framework/ui/context/ContextualInformationHelper.ts":
/*!*****************************************************************!*\
  !*** ./src/framework/ui/context/ContextualInformationHelper.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TogglePlacement": () => (/* binding */ TogglePlacement),
/* harmony export */   "ContextualInformationHelper": () => (/* binding */ ContextualInformationHelper)
/* harmony export */ });
/* harmony import */ var _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ConfigurationTypes */ "./src/framework/ui/ConfigurationTypes.ts");
/* harmony import */ var _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util/BrowserUtil */ "./src/framework/util/BrowserUtil.ts");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _view_implementation_AbstractCollectionView__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../view/implementation/AbstractCollectionView */ "./src/framework/ui/view/implementation/AbstractCollectionView.ts");




const logger = debug__WEBPACK_IMPORTED_MODULE_2___default()('context-helper');
let TogglePlacement;

(function (TogglePlacement) {
  TogglePlacement[TogglePlacement["top"] = 0] = "top";
  TogglePlacement[TogglePlacement["bottom"] = 1] = "bottom";
  TogglePlacement[TogglePlacement["right"] = 2] = "right";
  TogglePlacement[TogglePlacement["left"] = 3] = "left";
})(TogglePlacement || (TogglePlacement = {}));

const defaultIdentifier = function (name, item) {
  return '';
};

class ContextualInformationHelper {
  static SOURCE = 'context-source';
  static TYPE = 'context-type';
  static DISPLAYNAME = 'context-display-name';
  static IDENTIFIER = 'context-id';
  static DESCRIPTION = 'title';
  static BOOTSTRAP_TOGGLE = 'data-toggle';
  static BOOTSTRAP_PLACEMENT = 'data-placement';
  static BOOTSTRAP_TOOLTIP_VALUE = 'tooltip';
  static BOOTSTRAP_POPOVER_VALUE = 'popover';
  static BOOTSTRAP_TOGGLE_HTML = 'data-html';
  static BOOTSTRAP_TOGGLE_HTML_VALUE = 'true';
  static BOOTSTRAP_PLACEMENT_TOP = 'top';
  static BOOTSTRAP_PLACEMENT_BOTTOM = 'bottom';
  static BOOTSTRAP_PLACEMENT_RIGHT = 'right';
  static BOOTSTRAP_PLACEMENT_LEFT = 'left';
  registry = [];
  menuDivEl = null;
  menuContentEl = null;

  constructor() {
    this.handleContextMenu = this.handleContextMenu.bind(this);
    this.hideContextMenu = this.hideContextMenu.bind(this);
  }

  static getInstance() {
    if (!ContextualInformationHelper._instance) {
      ContextualInformationHelper._instance = new ContextualInformationHelper();
    }

    return ContextualInformationHelper._instance;
  }

  onDocumentLoaded() {
    // @ts-ignore
    document.addEventListener('click', this.hideContextMenu);
    this.menuDivEl = document.getElementById('contextmenu');
    this.menuContentEl = document.getElementById('contextMenuItems');
  }

  addContextFromView(view, internalType, displayName) {
    let context = this.ensureInRegistry(view.getName());
    context.view = view;
    context.defaultType.internalType = internalType;
    context.defaultType.displayName = displayName;
    context.defaultType.identifier = view.getItemId;
    context.defaultType.description = view.getItemDescription;
    return context;
  }

  addContextToElement(source, type, item, element, addTooltip = false, placement = TogglePlacement.bottom) {
    const context = this.ensureInRegistry(source);
    element.setAttribute(ContextualInformationHelper.SOURCE, context.source);
    element.setAttribute(ContextualInformationHelper.TYPE, context.defaultType.internalType);
    element.setAttribute(ContextualInformationHelper.DISPLAYNAME, context.defaultType.displayName);
    element.setAttribute(ContextualInformationHelper.IDENTIFIER, context.defaultType.identifier(type, item));
    element.setAttribute(ContextualInformationHelper.DESCRIPTION, context.defaultType.description(type, item));

    if (addTooltip) {
      element.setAttribute(ContextualInformationHelper.BOOTSTRAP_TOGGLE, ContextualInformationHelper.BOOTSTRAP_TOOLTIP_VALUE);
      element.setAttribute(ContextualInformationHelper.BOOTSTRAP_TOGGLE_HTML, ContextualInformationHelper.BOOTSTRAP_TOGGLE_HTML_VALUE);

      switch (placement) {
        case TogglePlacement.bottom:
          {
            element.setAttribute(ContextualInformationHelper.BOOTSTRAP_PLACEMENT, ContextualInformationHelper.BOOTSTRAP_PLACEMENT_BOTTOM);
            break;
          }

        case TogglePlacement.top:
          {
            element.setAttribute(ContextualInformationHelper.BOOTSTRAP_PLACEMENT, ContextualInformationHelper.BOOTSTRAP_PLACEMENT_TOP);
            break;
          }

        case TogglePlacement.left:
          {
            element.setAttribute(ContextualInformationHelper.BOOTSTRAP_PLACEMENT, ContextualInformationHelper.BOOTSTRAP_PLACEMENT_LEFT);
            break;
          }

        case TogglePlacement.right:
          {
            element.setAttribute(ContextualInformationHelper.BOOTSTRAP_PLACEMENT, ContextualInformationHelper.BOOTSTRAP_PLACEMENT_RIGHT);
            break;
          }
      } // @ts-ignore


      $('[data-toggle="tooltip"]').tooltip({
        html: true
      });
    }
  }

  findContextFromEvent(event) {
    let result = null;

    if (event.target) {
      let target = event.target; // @ts-ignore

      result = this.findContextFromElement(event.target);
    }

    return result;
  }

  addActionToContext(context, actionName, displayName, handler, icon, permissionCheck) {
    let action = {
      actionName: actionName,
      displayName: displayName,
      handler: handler,
      hasPermission: permissionCheck,
      elementDefinition: {
        type: 'a',
        attributes: [{
          name: 'href',
          value: '#'
        }],
        classes: 'list-group-item list-group-item-action bg-dark text-white'
      },
      iconClasses: icon
    };
    this.addContextActionToContext(context, action);
  }

  handleContextMenu(event) {
    logger('Right click');
    logger(event.target); // are we over a context sensitive item?
    // find a context if possible
    // @ts-ignore

    const context = this.findContextFromElement(event.target);
    logger(context);

    if (context && this.buildContextMenu(context)) {
      event.preventDefault();
      event.stopPropagation();
      this.showContextMenu(event);
      return false;
    } // otherwise let the default behaviour happen


    return true;
  }

  ensureInRegistry(source) {
    let result;
    let foundIndex = this.registry.findIndex(context => context.source === source);

    if (foundIndex < 0) {
      result = {
        source: source,
        defaultType: {
          internalType: '',
          displayName: '',
          identifier: defaultIdentifier,
          description: defaultIdentifier,
          actions: []
        }
      };
      this.registry.push(result);
    } else {
      result = this.registry[foundIndex];
    }

    return result;
  }

  findContextFromElement(element) {
    // do we have context information in this element?
    let result = null;
    const source = element.getAttribute(ContextualInformationHelper.SOURCE);

    if (source) {
      const type = element.getAttribute(ContextualInformationHelper.TYPE);
      const name = element.getAttribute(ContextualInformationHelper.DISPLAYNAME);
      const id = element.getAttribute(ContextualInformationHelper.IDENTIFIER);
      const desc = element.getAttribute(ContextualInformationHelper.DESCRIPTION); // @ts-ignore

      result = {
        source: source,
        internalType: type,
        displayName: name,
        identifier: id,
        description: desc
      };
    } else {
      const parent = element.parentElement;

      if (parent) {
        result = this.findContextFromElement(parent);
      }
    }

    return result;
  }

  findAllContextsFromElement(element, contexts) {
    // do we have context information in this element?
    const source = element.getAttribute(ContextualInformationHelper.SOURCE);

    if (source) {
      const type = element.getAttribute(ContextualInformationHelper.TYPE);
      const name = element.getAttribute(ContextualInformationHelper.DISPLAYNAME);
      const id = element.getAttribute(ContextualInformationHelper.IDENTIFIER);
      const desc = element.getAttribute(ContextualInformationHelper.DESCRIPTION); // @ts-ignore

      if (type && name && id && desc) {
        let result = {
          source: source,
          internalType: type,
          displayName: name,
          identifier: id,
          description: desc
        };
        contexts.push(result);
      }
    }

    const parent = element.parentElement;

    if (parent) {
      this.findAllContextsFromElement(parent, contexts);
    }
  }

  addContextActionToContext(context, action) {
    logger(`Adding action to context ${context.source}`);
    logger(action);
    context.defaultType.actions.push(action);
  }

  buildContextMenu(context) {
    logger(`building context menu`);
    let result = false; // find the context for these details

    const contextDef = this.ensureInRegistry(context.source);
    let selectedItem = null;

    if (contextDef && contextDef.view && contextDef.view instanceof _view_implementation_AbstractCollectionView__WEBPACK_IMPORTED_MODULE_3__.AbstractCollectionView) {
      logger(`collection view context - finding item with identifier ${context.identifier}`);
      let collectionView = contextDef.view;
      let compareWith = {}; // @ts-ignore

      compareWith[collectionView.getCollectionUIConfig().keyId] = context.identifier;
      selectedItem = collectionView.getItemInNamedCollection(context.internalType, compareWith);
    }

    logger(`found item for context menu`);
    logger(selectedItem);

    if (contextDef.defaultType.actions.length > 0) {
      if (this.menuContentEl && this.menuContentEl) {
        _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].removeAllChildren(this.menuContentEl);
        contextDef.defaultType.actions.forEach(action => {
          logger('Adding action');
          logger(action);

          if (selectedItem && action.hasPermission && action.hasPermission(action.actionName, contextDef.defaultType.internalType, selectedItem) || !action.hasPermission) {
            let itemEl = document.createElement(action.elementDefinition.type);

            if (itemEl && this.menuContentEl) {
              _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addAttributes(itemEl, action.elementDefinition.attributes);
              _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addRemoveClasses(itemEl, action.elementDefinition.classes);
              itemEl.setAttribute(ContextualInformationHelper.SOURCE, context.source);
              itemEl.setAttribute(ContextualInformationHelper.TYPE, context.internalType);
              itemEl.setAttribute(ContextualInformationHelper.DISPLAYNAME, context.displayName);
              itemEl.setAttribute(ContextualInformationHelper.IDENTIFIER, context.identifier);
              itemEl.setAttribute(ContextualInformationHelper.DESCRIPTION, context.description);
              itemEl.setAttribute(_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_0__.EXTRA_ACTION_ATTRIBUTE_NAME, action.actionName);
              itemEl.addEventListener('click', event => {
                this.hideContextMenu(event);
                action.handler(event);
              });
              itemEl.innerHTML = `${action.displayName}`;

              if (action.iconClasses) {
                itemEl.innerHTML += `&nbsp;&nbsp;<i class="${action.iconClasses}"></i>`;
              }

              this.menuContentEl.appendChild(itemEl);
              logger('new menu element is ');
              logger(this.menuContentEl);
              result = true;
            }
          }
        });
      }
    } else {
      logger(`building context menu - no actions for ${context.source}`);
    }

    return result;
  }

  hideContextMenu(event) {
    if (this.menuDivEl) {
      _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addRemoveClasses(this.menuDivEl, 'd-none');
    }
  }

  showContextMenu(event) {
    if (this.menuDivEl) {
      logger(`Showing context menu at ${event.pageX},${event.pageY}`);
      _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addRemoveClasses(this.menuDivEl, 'd-none', false);
      this.menuDivEl.style.left = event.pageX + 'px';
      this.menuDivEl.style.top = event.pageY + 'px';
    }
  }

}

/***/ }),

/***/ "./src/framework/ui/form/AbstractForm.ts":
/*!***********************************************!*\
  !*** ./src/framework/ui/form/AbstractForm.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbstractForm": () => (/* binding */ AbstractForm)
/* harmony export */ });
/* harmony import */ var _FormListener__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FormListener */ "./src/framework/ui/form/FormListener.ts");
/* harmony import */ var _FormUITypeDefs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FormUITypeDefs */ "./src/framework/ui/form/FormUITypeDefs.ts");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _validation_ValidationManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./validation/ValidationManager */ "./src/framework/ui/form/validation/ValidationManager.ts");
/* harmony import */ var _alert_AlertListener__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../alert/AlertListener */ "./src/framework/ui/alert/AlertListener.ts");
/* harmony import */ var _alert_AlertManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../alert/AlertManager */ "./src/framework/ui/alert/AlertManager.ts");
/* harmony import */ var _validation_ValidationTypeDefs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./validation/ValidationTypeDefs */ "./src/framework/ui/form/validation/ValidationTypeDefs.ts");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");
/* harmony import */ var _factory_FieldInputElementFactory__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./factory/FieldInputElementFactory */ "./src/framework/ui/form/factory/FieldInputElementFactory.ts");









const logger = debug__WEBPACK_IMPORTED_MODULE_2___default()('abstract-form');
const dlogger = debug__WEBPACK_IMPORTED_MODULE_2___default()('abstract-form-detail');
const vlogger = debug__WEBPACK_IMPORTED_MODULE_2___default()('abstract-form-detail-validation');
class AbstractForm {
  formListeners = [];
  fieldListeners = [];
  uiDef = null;
  isVisible = false;
  fields = [];
  isInitialised = false;
  hasChangedBoolean = false;

  constructor(containerId, dataObjDef, configHelper, permissionChecker, hasExternalControl = false) {
    this.containerEl = document.getElementById(containerId);
    if (!this.containerEl) throw new Error(`container ${containerId} for form ${dataObjDef.id} does not exist`);
    this.map = [];
    this.dataObjDef = dataObjDef;
    this.configHelper = configHelper;
    this.hasExternalControl = hasExternalControl;
    this.permissionChecker = permissionChecker;
    this.currentDataObj = {};
    this.id = (0,uuid__WEBPACK_IMPORTED_MODULE_8__["default"])();
    this.formMode = _FormUITypeDefs__WEBPACK_IMPORTED_MODULE_1__.FormMode.unset; // sub-classes need to create the form and it's fields
    // listen to ourselves

    this.addFormListener(this);
  }

  getFormMode() {
    return this.formMode;
  }

  getCurrentDataObj() {
    return this.currentDataObj;
  }

  getDataObjectDefinition() {
    return this.dataObjDef;
  }

  cancel() {
    if (this.uiDef) {
      let formEvent = {
        target: this,
        formId: this.uiDef.id,
        eventType: _FormListener__WEBPACK_IMPORTED_MODULE_0__.FormEventType.CANCELLING
      };
      this.formChanged(formEvent);
    }
  }

  delete() {
    if (this.uiDef && !this.isReadOnly()) {
      let formEvent = {
        target: this,
        formId: this.uiDef.id,
        eventType: _FormListener__WEBPACK_IMPORTED_MODULE_0__.FormEventType.DELETING
      };
      this.formChanged(formEvent);
    }
  }

  save() {
    if (this.uiDef && !this.isReadOnly()) {
      let formEvent = {
        target: this,
        formId: this.uiDef.id,
        eventType: _FormListener__WEBPACK_IMPORTED_MODULE_0__.FormEventType.SAVING
      };
      this.formChanged(formEvent);
    }
  }

  hasChanged() {
    return this.hasChangedBoolean;
  }

  getName() {
    return this.dataObjDef.displayName;
  }

  valueChanged(form, field, fieldDef, newValue) {
    this.hasChangedBoolean = true;
    this.setUnsavedMessage();
    logger(`Form has changed`);
  }

  failedValidation(form, field, currentValue, message) {
    this.hasChangedBoolean = true;
    logger(`Form has changed`);
  }

  initialise(displayOrder, hasDeleteButton, hideModifierFields = false) {
    if (this.isInitialised) return;
    this.isInitialised = true;

    this._initialise(displayOrder, hasDeleteButton, hideModifierFields);
  }

  addFieldListener(listener) {
    this.fieldListeners.push(listener);
  }

  addFormListener(listener) {
    this.formListeners.push(listener);
  }

  reset() {
    logger(`Resetting form`);
    this.clearUnsavedMessage();
    this.formMode = _FormUITypeDefs__WEBPACK_IMPORTED_MODULE_1__.FormMode.unset;
    this.hasChangedBoolean = false; // inform the listeners

    if (this.uiDef) {
      let formEvent = {
        formId: this.id,
        target: this,
        eventType: _FormListener__WEBPACK_IMPORTED_MODULE_0__.FormEventType.RESETTING
      };
      this.informFormListeners(formEvent, this.currentDataObj);
    }

    this.currentDataObj = {};

    this._reset(); // reset all the fields


    this.fields.forEach(field => {
      field.reset();
    });
    this.hasChangedBoolean = false;
  }

  setIsVisible(isVisible) {
    logger(`Changing visibility to ${isVisible}`);
    this.isVisible = isVisible;

    if (this.uiDef) {
      let eventType = _FormListener__WEBPACK_IMPORTED_MODULE_0__.FormEventType.HIDDEN;

      if (this.isVisible) {
        this._visible();

        eventType = _FormListener__WEBPACK_IMPORTED_MODULE_0__.FormEventType.SHOWN;
      } else {
        this._hidden();
      } // inform the listeners


      let formEvent = {
        formId: this.id,
        target: this,
        eventType: eventType
      };
      this.informFormListeners(formEvent, this.currentDataObj);
    }

    if (isVisible && !(this.formMode === _FormUITypeDefs__WEBPACK_IMPORTED_MODULE_1__.FormMode.displayOnly)) this.checkFormValidationOnDisplay();
    if (isVisible && this.formMode === _FormUITypeDefs__WEBPACK_IMPORTED_MODULE_1__.FormMode.displayOnly) this.checkForVisualValidationForDisplayOnly();
  }

  startCreateNew() {
    this.clearUnsavedMessage();
    logger(`Starting create new`);
    this.reset();
    this.currentDataObj = {};
    this.formMode = _FormUITypeDefs__WEBPACK_IMPORTED_MODULE_1__.FormMode.create;
    this.hasChangedBoolean = false;

    if (this.uiDef) {
      let eventType = _FormListener__WEBPACK_IMPORTED_MODULE_0__.FormEventType.CREATING; // inform the listeners

      let formEvent = {
        formId: this.id,
        target: this,
        eventType: eventType
      };

      this._startCreate();

      this.informFormListeners(formEvent, this.currentDataObj);
    }

    this.clearReadOnly();
    return this.currentDataObj;
  }

  startUpdate(objectToEdit) {
    this.clearUnsavedMessage();
    logger(`Starting modify existing on `);
    this.formMode = _FormUITypeDefs__WEBPACK_IMPORTED_MODULE_1__.FormMode.update;
    this.hasChangedBoolean = false;
    logger(objectToEdit);
    this.currentDataObj = { ...objectToEdit
    }; // take a copy

    if (this.uiDef) {
      let eventType = _FormListener__WEBPACK_IMPORTED_MODULE_0__.FormEventType.MODIFYING; // inform the listeners

      let formEvent = {
        formId: this.id,
        target: this,
        eventType: eventType
      };

      this._startUpdate();

      this.informFormListeners(formEvent, this.currentDataObj);
    }

    this.clearReadOnly();
  }

  displayOnly(objectToView) {
    this.clearUnsavedMessage();
    logger(`Starting display only `);
    logger(objectToView);
    this.formMode = _FormUITypeDefs__WEBPACK_IMPORTED_MODULE_1__.FormMode.displayOnly;
    this.hasChangedBoolean = false;
    this.currentDataObj = { ...objectToView
    }; // take a copy

    if (this.uiDef) {
      this._displayOnly();
    }

    this.setReadOnly();
  }

  formChanged(event, formValues) {
    // catch form events for user leaving the form
    let shouldCancelChange = false;

    switch (event.eventType) {
      case _FormListener__WEBPACK_IMPORTED_MODULE_0__.FormEventType.CANCELLING:
        {
          logger(`Form is cancelling`);

          if (this.hasChangedBoolean && !(this.formMode === _FormUITypeDefs__WEBPACK_IMPORTED_MODULE_1__.FormMode.displayOnly)) {
            if (this.uiDef) {
              _alert_AlertManager__WEBPACK_IMPORTED_MODULE_5__.AlertManager.getInstance().startAlert(this, this.uiDef.displayName, `Lose any unsaved changes?`, _FormListener__WEBPACK_IMPORTED_MODULE_0__.FormEventType.CANCELLING);
            }
          } else {
            if (this.uiDef) {
              let formEvent = {
                formId: this.id,
                target: this,
                eventType: _FormListener__WEBPACK_IMPORTED_MODULE_0__.FormEventType.CANCELLED
              };
              this.informFormListeners(formEvent, this.currentDataObj);
            }
          }

          break;
        }

      case _FormListener__WEBPACK_IMPORTED_MODULE_0__.FormEventType.CANCELLING_ABORTED:
        {
          logger(`Form is cancelling - aborted`);
          break;
        }

      case _FormListener__WEBPACK_IMPORTED_MODULE_0__.FormEventType.CANCELLED:
        {
          logger(`Form is cancelled - resetting`); // user cancelled the form, will become invisible

          this.formMode = _FormUITypeDefs__WEBPACK_IMPORTED_MODULE_1__.FormMode.displayOnly;
          this.reset(); // reset the form state

          this.setReadOnly();
          break;
        }

      case _FormListener__WEBPACK_IMPORTED_MODULE_0__.FormEventType.DELETING:
        {
          logger(`Form is deleting`);

          if (this.uiDef) {
            _alert_AlertManager__WEBPACK_IMPORTED_MODULE_5__.AlertManager.getInstance().startAlert(this, this.uiDef.displayName, `Are you sure you want to delete this information?`, _FormListener__WEBPACK_IMPORTED_MODULE_0__.FormEventType.DELETING);
          }

          break;
        }

      case _FormListener__WEBPACK_IMPORTED_MODULE_0__.FormEventType.DELETE_ABORTED:
        {
          logger(`Form is deleting - aborted`);
          break;
        }

      case _FormListener__WEBPACK_IMPORTED_MODULE_0__.FormEventType.DELETED:
        {
          logger(`Form is deleted - resetting`); // user is deleting the object, will become invisible

          this.reset();
          break;
        }

      case _FormListener__WEBPACK_IMPORTED_MODULE_0__.FormEventType.SAVE_ABORTED:
        {
          this._saveFinishedOrAborted();

          logger(`Form save cancelled`);
          break;
        }

      case _FormListener__WEBPACK_IMPORTED_MODULE_0__.FormEventType.SAVED:
        {
          this._saveFinishedOrAborted();

          logger(`Form is saved with data`);
          logger(formValues);
          this.formMode = _FormUITypeDefs__WEBPACK_IMPORTED_MODULE_1__.FormMode.update;
          this.hasChangedBoolean = false;
          break;
        }

      case _FormListener__WEBPACK_IMPORTED_MODULE_0__.FormEventType.SAVING:
        {
          logger(`Form is saving, checking validation and storing values`);

          this._saveIsActive();

          if (this.uiDef) {
            let allFieldsValid = true; // user attempting to save the form, lets check the field validation

            this.fields.forEach(field => {
              const currentValue = field.getValue();

              if (!field.isValid()) {
                vlogger(`Field ${field.getId()} is invalid`);
                field.setInvalid(`${field.getName()} has an invalid format or is required.`);
                allFieldsValid = false;
              } else {
                // does the field fulfil any rules from the Validation manager
                const response = _validation_ValidationManager__WEBPACK_IMPORTED_MODULE_3__.ValidationManager.getInstance().applyRulesToTargetField(this, this.formMode, field.getFieldDefinition(), _validation_ValidationTypeDefs__WEBPACK_IMPORTED_MODULE_6__.ConditionResponse.invalid);

                if (response.ruleFailed) {
                  if (response.message) field.setInvalid(response.message);
                  vlogger(`Field ${field.getId()} is invalid from validation manager with message ${response.message}`);
                  allFieldsValid = false;
                } else {
                  this.setFieldValueToDataObject(this.currentDataObj, field, currentValue);
                }
              }
            }); // is every field valid?

            if (!allFieldsValid) {
              logger(`Form is saving, checking validation - FAILED`);
              let formEvent = {
                formId: this.id,
                target: this,
                eventType: _FormListener__WEBPACK_IMPORTED_MODULE_0__.FormEventType.SAVE_ABORTED
              };
              this.informFormListeners(formEvent, this.currentDataObj);
              shouldCancelChange = true;
            } else {
              logger(`formatted data object is`);
              const formattedDataObject = this.getFormattedDataObject();
              let formEvent = {
                formId: this.id,
                target: this,
                eventType: _FormListener__WEBPACK_IMPORTED_MODULE_0__.FormEventType.SAVED
              };
              this.informFormListeners(formEvent, formattedDataObject);
            }

            break;
          }
        }
    }

    return shouldCancelChange;
  }

  getId() {
    return this.id;
  }

  getFieldFromDataFieldId(dataFieldId) {
    let result = undefined;
    dlogger(`Finding field for attribute ${dataFieldId} `);
    const mapItem = this.map.find(mapItem => mapItem.attributeId === dataFieldId);

    if (mapItem) {
      dlogger(`Mapped attribute ${mapItem.attributeId} to field ${mapItem.fieldId}`); // find the field with that id

      result = this.fields.find(field => field.getId() === mapItem.attributeId);
    }

    return result;
  }

  completed(event) {
    logger(`Handling alert completed`);
    logger(event);

    if (event.context && this.uiDef) {
      switch (event.context) {
        case _FormListener__WEBPACK_IMPORTED_MODULE_0__.FormEventType.CANCELLING:
          {
            if (event.outcome === _alert_AlertListener__WEBPACK_IMPORTED_MODULE_4__.AlertType.confirmed) {
              let formEvent = {
                formId: this.id,
                target: this,
                eventType: _FormListener__WEBPACK_IMPORTED_MODULE_0__.FormEventType.CANCELLED
              };
              this.informFormListeners(formEvent, this.currentDataObj);
            } else {
              let formEvent = {
                formId: this.id,
                target: this,
                eventType: _FormListener__WEBPACK_IMPORTED_MODULE_0__.FormEventType.CANCELLING_ABORTED
              };
              this.informFormListeners(formEvent, this.currentDataObj);
            }

            break;
          }

        case _FormListener__WEBPACK_IMPORTED_MODULE_0__.FormEventType.DELETING:
          {
            if (event.outcome === _alert_AlertListener__WEBPACK_IMPORTED_MODULE_4__.AlertType.confirmed) {
              let formEvent = {
                formId: this.id,
                target: this,
                eventType: _FormListener__WEBPACK_IMPORTED_MODULE_0__.FormEventType.DELETED
              };
              this.informFormListeners(formEvent, this.currentDataObj);
            } else {
              let formEvent = {
                formId: this.id,
                target: this,
                eventType: _FormListener__WEBPACK_IMPORTED_MODULE_0__.FormEventType.DELETE_ABORTED
              };
              this.informFormListeners(formEvent, this.currentDataObj);
            }

            break;
          }
      }
    }
  }

  clearReadOnly() {
    this.fields.forEach(field => {
      if (this.currentDataObj) {
        if (this.permissionChecker.hasPermissionToEditField(this.currentDataObj, field)) {
          field.clearReadOnly();
        }
      } else {
        field.clearReadOnly();
      }
    });
  }

  setReadOnly() {
    this.fields.forEach(field => {
      field.setReadOnly();
    });
  }

  isDisplayingItem(dataObj) {
    if (this.currentDataObj) {
      return this._isSameObjectAsDisplayed(dataObj);
    }

    return false;
  }

  isReadOnly() {
    return this.formMode === _FormUITypeDefs__WEBPACK_IMPORTED_MODULE_1__.FormMode.displayOnly;
  }
  /* methods to be implemented in the subclass */


  informFormListeners(formEvent, dataObj) {
    this.formListeners.forEach(listener => listener.formChanged(formEvent, dataObj));
  }

  findFieldUiConfig(fieldDef) {
    dlogger(`Finding field UI Config for field ${fieldDef.displayName}`);
    let result = null;

    if (this.uiDef) {
      let index = 0;

      while (index < this.uiDef.fieldGroups.length) {
        const fieldGroup = this.uiDef.fieldGroups[index];
        result = fieldGroup.fields.find(uiConfig => uiConfig.field.id === fieldDef.id);

        if (result) {
          dlogger(`Finding field UI Config for field ${fieldDef.displayName} - Found`);
          break;
        }

        index++;
      }
    }

    return result;
  }

  checkForVisualValidationForDisplayOnly() {
    logger(`Checking display validation for display only`);
    this.fields.forEach(field => {
      field.show();
      let response = _validation_ValidationManager__WEBPACK_IMPORTED_MODULE_3__.ValidationManager.getInstance().applyRulesToTargetField(this, this.formMode, field.getFieldDefinition(), _validation_ValidationTypeDefs__WEBPACK_IMPORTED_MODULE_6__.ConditionResponse.hide);

      if (response.ruleFailed) {
        field.hide();
        vlogger(`Field ${field.getId()} is hidden from validation manager with message ${response.message}`);
      }
    });
  }

  checkFormValidationOnDisplay() {
    logger(`Checking display validation`);
    this.fields.forEach(field => {
      field.show();
      const currentValue = field.getValue();

      if (!field.isValid()) {
        logger(`Field ${field.getId()} is invalid`);
        field.setInvalid(`${field.getName()} has an invalid format or is required.`);
      } else {
        // does the field fulfil any rules from the Validation manager
        let response = _validation_ValidationManager__WEBPACK_IMPORTED_MODULE_3__.ValidationManager.getInstance().applyRulesToTargetField(this, this.formMode, field.getFieldDefinition(), _validation_ValidationTypeDefs__WEBPACK_IMPORTED_MODULE_6__.ConditionResponse.invalid);

        if (response.ruleFailed) {
          if (response.message) field.setInvalid(response.message);
          vlogger(`Field ${field.getId()} is invalid from validation manager with message ${response.message}`);
        }

        response = _validation_ValidationManager__WEBPACK_IMPORTED_MODULE_3__.ValidationManager.getInstance().applyRulesToTargetField(this, this.formMode, field.getFieldDefinition(), _validation_ValidationTypeDefs__WEBPACK_IMPORTED_MODULE_6__.ConditionResponse.hide);

        if (response.ruleFailed) {
          field.hide();
          vlogger(`Field ${field.getId()} is hidden from validation manager with message ${response.message}`);
        }
      }
    });
  }

  getElementIdForField(fieldId) {
    return _factory_FieldInputElementFactory__WEBPACK_IMPORTED_MODULE_7__.FieldInputElementFactory.getElementIdForFieldId(this, fieldId);
  }

}

/***/ }),

/***/ "./src/framework/ui/form/BasicFormImplementation.ts":
/*!**********************************************************!*\
  !*** ./src/framework/ui/form/BasicFormImplementation.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BasicFormImplementation": () => (/* binding */ BasicFormImplementation)
/* harmony export */ });
/* harmony import */ var _FormUITypeDefs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FormUITypeDefs */ "./src/framework/ui/form/FormUITypeDefs.ts");
/* harmony import */ var _AbstractForm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AbstractForm */ "./src/framework/ui/form/AbstractForm.ts");
/* harmony import */ var _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../model/DataObjectTypeDefs */ "./src/framework/model/DataObjectTypeDefs.ts");
/* harmony import */ var _factory_FormElementFactory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./factory/FormElementFactory */ "./src/framework/ui/form/factory/FormElementFactory.ts");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../util/BrowserUtil */ "./src/framework/util/BrowserUtil.ts");
/* harmony import */ var _field_TextAreaField__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./field/TextAreaField */ "./src/framework/ui/form/field/TextAreaField.ts");
/* harmony import */ var _field_RadioButtonGroupField__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./field/RadioButtonGroupField */ "./src/framework/ui/form/field/RadioButtonGroupField.ts");
/* harmony import */ var _field_SelectField__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./field/SelectField */ "./src/framework/ui/form/field/SelectField.ts");
/* harmony import */ var _field_InputField__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./field/InputField */ "./src/framework/ui/form/field/InputField.ts");
/* harmony import */ var _field_ColourInputField__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./field/ColourInputField */ "./src/framework/ui/form/field/ColourInputField.ts");











const logger = debug__WEBPACK_IMPORTED_MODULE_4___default()('basic-form');
const dlogger = debug__WEBPACK_IMPORTED_MODULE_4___default()('basic-form-detail');
class BasicFormImplementation extends _AbstractForm__WEBPACK_IMPORTED_MODULE_1__.AbstractForm {
  factoryElements = null;

  constructor(containerId, dataObjDef, configHelper, permissionChecker, hasExternalControl = false) {
    super(containerId, dataObjDef, configHelper, permissionChecker, hasExternalControl);
  }

  getFormattedDataObject() {
    logger(`Getting current formatted data`);
    let formattedResult = {};
    this.dataObjDef.fields.forEach(fieldDef => {
      let fieldValue = this.currentDataObj[fieldDef.id];
      formattedResult[fieldDef.id] = this.getFormattedFieldValue(fieldDef);
    });
    logger(formattedResult);
    return formattedResult;
  }

  clearReadOnly() {
    super.clearReadOnly();
    this.enableButtons();
  }

  setReadOnly() {
    super.setReadOnly();
    this.disableButtons();
  }

  _hidden() {
    var _this$containerEl;

    if (this.factoryElements) (_this$containerEl = this.containerEl) === null || _this$containerEl === void 0 ? void 0 : _this$containerEl.removeChild(this.factoryElements.form);
  }

  setupFieldObject(fieldEl, subElements = []) {
    // get the data-id field from the field element
    const dataId = fieldEl.getAttribute(_FormUITypeDefs__WEBPACK_IMPORTED_MODULE_0__.DATA_ID_ATTRIBUTE);
    const fieldId = fieldEl.getAttribute('id');
    dlogger(`Converting field input element ${fieldId} with data-id of ${dataId}`);

    if (dataId && fieldId) {
      // find the corresponding field definition
      const index = this.dataObjDef.fields.findIndex(value => value.id === dataId);
      const fieldDef = this.dataObjDef.fields.find(value => value.id === dataId);

      if (fieldDef) {
        dlogger(`Converting field input element ${fieldId} with data-id of ${dataId} field definition is`);
        logger(fieldDef); // find the corresponding ui definition

        const fieldUIConfig = this.findFieldUiConfig(fieldDef);
        dlogger(`Converting field input element ${fieldId} with data-id of ${dataId} field ui config is`);
        logger(fieldUIConfig);

        if (fieldUIConfig) {
          if (this.uiDef) {
            let field;

            switch (fieldUIConfig.elementType) {
              case _FormUITypeDefs__WEBPACK_IMPORTED_MODULE_0__.UIFieldType.textarea:
                {
                  field = new _field_TextAreaField__WEBPACK_IMPORTED_MODULE_6__.TextAreaField(this, fieldUIConfig, fieldDef, fieldEl);
                  break;
                }

              case _FormUITypeDefs__WEBPACK_IMPORTED_MODULE_0__.UIFieldType.radioGroup:
                {
                  field = new _field_RadioButtonGroupField__WEBPACK_IMPORTED_MODULE_7__.RadioButtonGroupField(this, fieldUIConfig, fieldDef, fieldEl, subElements);
                  break;
                }

              case _FormUITypeDefs__WEBPACK_IMPORTED_MODULE_0__.UIFieldType.select:
                {
                  field = new _field_SelectField__WEBPACK_IMPORTED_MODULE_8__.SelectField(this, fieldUIConfig, fieldDef, fieldEl);
                  break;
                }

              default:
                {
                  if (fieldDef.type === _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.colour) {
                    field = new _field_ColourInputField__WEBPACK_IMPORTED_MODULE_10__.ColourInputField(this, fieldUIConfig, fieldDef, fieldEl);
                  } else {
                    field = new _field_InputField__WEBPACK_IMPORTED_MODULE_9__.InputField(this, fieldUIConfig, fieldDef, fieldEl);
                  }

                  break;
                }
            }

            this.fields.push(field);
            field.addFieldListener(this);
            this.map.push({
              attributeId: dataId,
              fieldId: fieldId
            });
          }
        }
      } else {
        dlogger(`Converting field input element ${fieldId} with data-id of ${dataId} field definition is NOT FOUND`);
      }
    }
  }

  clearUnsavedMessage() {
    if (this.factoryElements) this.factoryElements.unsavedMessage.innerHTML = '';
  }

  setUnsavedMessage() {
    if (this.factoryElements && this.uiDef && this.uiDef.unsavedChanges.innerHTML) {
      this.factoryElements.unsavedMessage.innerHTML = this.uiDef.unsavedChanges.innerHTML;
    } else if (this.factoryElements) {
      this.factoryElements.unsavedMessage.innerHTML = 'Pending changes to save';
    }
  }

  _initialise(displayOrder, hasDeleteButton, hideModifierFields = false) {
    logger(`Initialising`); // ok, so given a Data Object definition we are going to create the form ui config

    this.uiDef = this.configHelper.generateFormConfig(this.dataObjDef, displayOrder, hasDeleteButton, hideModifierFields, this.hasExternalControl);
    logger(this.uiDef); // now we need to create all the form elements from the ui definition

    this.factoryElements = _factory_FormElementFactory__WEBPACK_IMPORTED_MODULE_3__.FormElementFactory.getInstance().createFormElements(this, this.formListeners, this.uiDef, this.fieldListeners);
    logger(this.factoryElements); // create field elements for each field element, and the basic map

    logger(`Converting field input elements to Field objects`);
    this.factoryElements.fields.forEach(fieldEl => {
      fieldEl.addEventListener('keyup', event => {
        dlogger(`key up in form ${this.getName()}`);
        this.hasChangedBoolean = true;
        this.setUnsavedMessage();
      });
      this.setupFieldObject(fieldEl);
    });
    logger(`Converting field text area elements to Field objects`);
    this.factoryElements.textFields.forEach(fieldEl => {
      fieldEl.addEventListener('keyup', event => {
        dlogger(`key up in form ${this.getName()}`);
        this.hasChangedBoolean = true;
        this.setUnsavedMessage();
      });
      this.setupFieldObject(fieldEl);
    });
    logger(`Converting field select elements to Field objects`);
    this.factoryElements.selectFields.forEach(fieldEl => {
      fieldEl.addEventListener('change', event => {
        dlogger(`change in form ${this.getName()}`);
        this.hasChangedBoolean = true;
        this.setUnsavedMessage();
      });
      this.setupFieldObject(fieldEl);
    });
    logger(`Converting field rbg elements to Field objects`);
    this.factoryElements.radioButtonGroups.forEach(rbg => {
      this.setupFieldObject(rbg.container, rbg.radioButtons);
      rbg.radioButtons.forEach(radioButton => {
        radioButton.addEventListener('change', event => {
          dlogger(`radio button change in form ${this.getName()}`);
          this.hasChangedBoolean = true;
          this.setUnsavedMessage();
        });
      });
    });
    logger(`field/data map is `);
    logger(this.map);
    logger('fields are');
    logger(this.fields);
  }

  _reset() {
    this.clearUnsavedMessage();
  }

  validateField(fieldDef) {
    const field = this.getFieldFromDataFieldId(fieldDef.id);

    if (field) {
      field.validate();

      if (this.currentDataObj) {
        if (!this.permissionChecker.hasPermissionToEditField(this.currentDataObj, field)) {
          field.setReadOnly();
        } else {
          field.clearReadOnly();
        }
      }
    }
  }

  renderField(fieldDef, currentValue) {
    let result = currentValue;
    const field = this.getFieldFromDataFieldId(fieldDef.id);

    if (field) {
      result = field.render(result);
    }

    return result;
  }

  _startCreate() {
    this.clearUnsavedMessage(); // we have a new object, there might be some values to generate

    this.dataObjDef.fields.forEach(fieldDef => {
      if (fieldDef.generator && fieldDef.generator.onCreation) {
        let fieldValue = fieldDef.generator.generator.generate(fieldDef, true);
        dlogger(`Setting default values for ${fieldDef.displayName} to ${fieldValue}`);
        this.currentDataObj[fieldDef.id] = fieldValue;
      }

      let fieldValue = this.currentDataObj[fieldDef.id];

      if (fieldValue) {
        fieldValue = this.renderField(fieldDef, fieldValue);
        this.setFieldValueFromDataObject(fieldDef, fieldValue);
      } // run the validation to let the user know what is required


      this.validateField(fieldDef);
    }); // delete button can go

    if (this.factoryElements && this.factoryElements.deleteButton) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_5__["default"].addAttributes(this.factoryElements.deleteButton, [{
      name: 'style',
      value: 'display:none'
    }]);
  }

  _startUpdate() {
    this.clearUnsavedMessage(); // we have an existing object, there might be some values to generate

    logger(this.currentDataObj);
    this.dataObjDef.fields.forEach(fieldDef => {
      if (fieldDef.generator && fieldDef.generator.onModify) {
        let fieldValue = fieldDef.generator.generator.generate(fieldDef, false);
        dlogger(`Setting default modified values for ${fieldDef.displayName} to ${fieldValue}`);
        this.currentDataObj[fieldDef.id] = fieldValue;
      }

      let fieldValue = this.currentDataObj[fieldDef.id];
      if (fieldValue) fieldValue = this.renderField(fieldDef, fieldValue);
      this.setFieldValueFromDataObject(fieldDef, fieldValue);
      this.validateField(fieldDef);
    }); // delete button make visible again

    if (this.factoryElements && this.factoryElements.deleteButton) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_5__["default"].removeAttributes(this.factoryElements.deleteButton, ['style']);
  }

  _displayOnly() {
    this.clearUnsavedMessage(); // we have an existing object, there might be some values to generate

    logger(this.currentDataObj);
    this.dataObjDef.fields.forEach(fieldDef => {
      let fieldValue = this.currentDataObj[fieldDef.id];
      if (fieldValue) fieldValue = this.renderField(fieldDef, fieldValue);
      this.setFieldValueFromDataObject(fieldDef, fieldValue);
    }); // delete button can go

    if (this.factoryElements && this.factoryElements.deleteButton) if (this.factoryElements) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_5__["default"].addAttributes(this.factoryElements.deleteButton, [{
      name: 'style',
      value: 'display:none'
    }]);
  }

  _visible() {
    var _this$containerEl2;

    if (this.factoryElements) (_this$containerEl2 = this.containerEl) === null || _this$containerEl2 === void 0 ? void 0 : _this$containerEl2.appendChild(this.factoryElements.form);
  }

  setFieldValueToDataObject(dataObj, field, currentValue) {
    // find the attribute id from the map
    const mapItem = this.map.find(mapItem => mapItem.attributeId === field.getId());

    if (mapItem) {
      dlogger(`Mapped field ${mapItem.fieldId} to attribute ${mapItem.attributeId} with value ${currentValue}`);
      this.currentDataObj[mapItem.attributeId] = currentValue;
    } else {
      logger(`Mapped field ${field.getId()} to attribute NOT FOUND`);
    }
  }

  setFieldValueFromDataObject(fieldDef, currentValue) {
    const field = this.getFieldFromDataFieldId(fieldDef.id); // find the field id from the map

    if (field) {
      if (currentValue) {
        field.setValue(currentValue);
      } else {
        field.clearValue();
      }
    }
  }

  getFormattedFieldValue(fieldDef) {
    let result = null;
    const mapItem = this.map.find(mapItem => mapItem.attributeId === fieldDef.id);

    if (mapItem) {
      dlogger(`Mapped attribute ${mapItem.attributeId} to field ${mapItem.fieldId} with for getting formatted value`); // find the field with that id

      const field = this.fields.find(field => field.getId() === mapItem.attributeId);

      if (field) {
        result = field.getFormattedValue();
      }
    }

    return result;
  }

  _isSameObjectAsDisplayed(dataObj) {
    // we can only be sure for objects with keys
    let isSameObject = false;
    dlogger(`is same object as current`);
    dlogger(dataObj);
    dlogger(this.currentDataObj);
    this.dataObjDef.fields.every(field => {
      if (field.isKey) {
        var _this$getFieldFromDat;

        const currentObjId = (_this$getFieldFromDat = this.getFieldFromDataFieldId(field.id)) === null || _this$getFieldFromDat === void 0 ? void 0 : _this$getFieldFromDat.getValue();
        const suppliedObjId = dataObj[field.id];
        dlogger(`is same object id ${suppliedObjId} as current ${currentObjId}`);

        if (currentObjId && !suppliedObjId || currentObjId && !suppliedObjId) {
          isSameObject = false;
        }

        if (currentObjId && suppliedObjId && currentObjId == suppliedObjId) {
          isSameObject = true;
        }

        return false;
      }

      return true;
    });
    return isSameObject;
  }

  enableButtons() {
    if (this.factoryElements && this.uiDef) {
      if (this.factoryElements.deleteButton) {
        this.factoryElements.deleteButton.removeAttribute('disabled');
      }

      if (this.factoryElements.cancelButton) this.factoryElements.cancelButton.removeAttribute('disabled');

      if (this.factoryElements.submitButton) {
        this.factoryElements.submitButton.removeAttribute('disabled'); // if (this.uiDef.submitButton) { // @ts-ignore
        //     this.factoryElements.submitButton.innerText = this.uiDef.submitButton.text;
        // }
      }
    }
  }

  disableButtons() {
    if (this.factoryElements) {
      if (this.factoryElements.deleteButton) {
        this.factoryElements.deleteButton.setAttribute('disabled', 'true');
      }

      if (this.factoryElements.cancelButton) this.factoryElements.cancelButton.setAttribute('disabled', 'true');
      if (this.factoryElements.submitButton) this.factoryElements.submitButton.setAttribute('disabled', 'true');
    }
  }

  _saveFinishedOrAborted() {
    dlogger(`save is finished or aborted`);
    this.enableButtons();
    this.clearUnsavedMessage();
  }

  _saveIsActive() {
    dlogger(`save is active`);
    this.disableButtons();

    if (this.factoryElements && this.uiDef) {
      if (this.uiDef.activeSave && this.uiDef.submitButton && this.factoryElements.submitButton) {
        dlogger(`save is active ${this.uiDef.activeSave}`); // this.factoryElements.submitButton.innerHTML = this.uiDef.activeSave + this.uiDef.submitButton.text;
      }
    }
  }

}

/***/ }),

/***/ "./src/framework/ui/form/DefaultFormFieldPermissionChecker.ts":
/*!********************************************************************!*\
  !*** ./src/framework/ui/form/DefaultFormFieldPermissionChecker.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DefaultFormFieldPermissionChecker": () => (/* binding */ DefaultFormFieldPermissionChecker)
/* harmony export */ });
class DefaultFormFieldPermissionChecker {
  hasPermissionToDeleteItem(item) {
    return true;
  }

  hasPermissionToEditField(dataObj, field) {
    return true;
  }

  hasPermissionToUpdateItem(item) {
    return true;
  }

}

/***/ }),

/***/ "./src/framework/ui/form/FormListener.ts":
/*!***********************************************!*\
  !*** ./src/framework/ui/form/FormListener.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FormEventType": () => (/* binding */ FormEventType)
/* harmony export */ });
let FormEventType;

(function (FormEventType) {
  FormEventType["SHOWN"] = "shown";
  FormEventType["HIDDEN"] = "hidden";
  FormEventType["CANCELLING"] = "cancelling";
  FormEventType["CANCELLING_ABORTED"] = "cancelling-aborted";
  FormEventType["CANCELLED"] = "cancelled";
  FormEventType["SAVING"] = "saving";
  FormEventType["SAVE_ABORTED"] = "save-aborted";
  FormEventType["SAVED"] = "saved";
  FormEventType["DELETING"] = "deleting";
  FormEventType["DELETE_ABORTED"] = "delete-aborted";
  FormEventType["DELETED"] = "deleted";
  FormEventType["CREATING"] = "creating";
  FormEventType["MODIFYING"] = "modifying";
  FormEventType["RESETTING"] = "reset";
})(FormEventType || (FormEventType = {}));

/***/ }),

/***/ "./src/framework/ui/form/FormUITypeDefs.ts":
/*!*************************************************!*\
  !*** ./src/framework/ui/form/FormUITypeDefs.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UIFieldType": () => (/* binding */ UIFieldType),
/* harmony export */   "defaultGetValue": () => (/* binding */ defaultGetValue),
/* harmony export */   "FormMode": () => (/* binding */ FormMode),
/* harmony export */   "DATA_ID_ATTRIBUTE": () => (/* binding */ DATA_ID_ATTRIBUTE)
/* harmony export */ });
let UIFieldType;

(function (UIFieldType) {
  UIFieldType[UIFieldType["checkbox"] = 0] = "checkbox";
  UIFieldType[UIFieldType["email"] = 1] = "email";
  UIFieldType[UIFieldType["hidden"] = 2] = "hidden";
  UIFieldType[UIFieldType["number"] = 3] = "number";
  UIFieldType[UIFieldType["password"] = 4] = "password";
  UIFieldType[UIFieldType["text"] = 5] = "text";
  UIFieldType[UIFieldType["textarea"] = 6] = "textarea";
  UIFieldType[UIFieldType["select"] = 7] = "select";
  UIFieldType[UIFieldType["radioGroup"] = 8] = "radioGroup";
  UIFieldType[UIFieldType["tableData"] = 9] = "tableData";
})(UIFieldType || (UIFieldType = {}));

const defaultGetValue = (fieldUIConfig, currentValue) => {
  let result = currentValue;

  if (fieldUIConfig.renderer) {
    let value = fieldUIConfig.renderer.renderValue(null, fieldUIConfig.field, currentValue);
    if (value) result = value;
  }

  return result;
};
let FormMode;

(function (FormMode) {
  FormMode[FormMode["unset"] = -1] = "unset";
  FormMode[FormMode["create"] = 0] = "create";
  FormMode[FormMode["update"] = 1] = "update";
  FormMode[FormMode["displayOnly"] = 2] = "displayOnly";
  FormMode[FormMode["any"] = 3] = "any";
})(FormMode || (FormMode = {}));

const DATA_ID_ATTRIBUTE = 'data-id';

/***/ }),

/***/ "./src/framework/ui/form/event-handlers/EditingEventListener.ts":
/*!**********************************************************************!*\
  !*** ./src/framework/ui/form/event-handlers/EditingEventListener.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EditingEventListener": () => (/* binding */ EditingEventListener)
/* harmony export */ });
class EditingEventListener {
  constructor(form, field, fieldConfig, listeners) {
    this.form = form;
    this.formId = form.getId();
    this.field = field;
    this.fieldConfig = fieldConfig;
    this.listeners = listeners;
    this.handleEditEvent = this.handleEditEvent.bind(this);
    this.handleEditCompletedEvent = this.handleEditCompletedEvent.bind(this);
  }

  handleEditEvent(event) {
    event.preventDefault();
    event.stopPropagation(); // @ts-ignore

    const fieldElement = event.target;

    if (this.fieldConfig.editor) {
      const fieldDef = this.fieldConfig.field;
      const value = fieldElement.value;
      const newValue = this.fieldConfig.editor.editValue(this.field, fieldDef, value);

      if (newValue && newValue !== value) {
        fieldElement.value = newValue;
        this.listeners.forEach(listener => listener.valueChanged(this.form, this.field, fieldDef, newValue));
      }
    }
  }

  handleEditCompletedEvent(event) {
    event.preventDefault();
    event.stopPropagation();

    if (this.fieldConfig.editor) {
      const fieldDef = this.fieldConfig.field;
      this.fieldConfig.editor.editCompleted(this.field, fieldDef);
    }
  }

}

/***/ }),

/***/ "./src/framework/ui/form/event-handlers/RenderingEventListener.ts":
/*!************************************************************************!*\
  !*** ./src/framework/ui/form/event-handlers/RenderingEventListener.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RenderingEventListener": () => (/* binding */ RenderingEventListener)
/* harmony export */ });
class RenderingEventListener {
  constructor(form, field, fieldConfig, listeners, subElements = null) {
    this.form = form;
    this.formId = form.getId();
    this.field = field;
    this.fieldConfig = fieldConfig;
    this.listeners = listeners;
    this.subElements = subElements;
    this.handleEvent = this.handleEvent.bind(this);
  }

  processRendering(fieldElement) {
    let newValue = '';

    if (this.fieldConfig.renderer) {
      const fieldDef = this.fieldConfig.field;
      const value = fieldElement.value;
      if (this.subElements) this.fieldConfig.renderer.setSubElements(this.subElements);
      newValue = this.fieldConfig.renderer.renderValue(this.field, fieldDef, value);

      if (newValue) {
        fieldElement.value = newValue;
        this.listeners.forEach(listener => listener.valueChanged(this.form, this.field, fieldDef, newValue));
      }
    }

    if (newValue) {
      return newValue;
    } else {
      return '';
    }
  }

  handleEvent(event) {
    event.preventDefault();
    event.stopPropagation(); // @ts-ignore

    const fieldElement = event.target;
    this.processRendering(fieldElement);
  }

}

/***/ }),

/***/ "./src/framework/ui/form/event-handlers/ValidationEventHandler.ts":
/*!************************************************************************!*\
  !*** ./src/framework/ui/form/event-handlers/ValidationEventHandler.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidationEventHandler": () => (/* binding */ ValidationEventHandler)
/* harmony export */ });
/* harmony import */ var _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../model/DataObjectTypeDefs */ "./src/framework/model/DataObjectTypeDefs.ts");
/* harmony import */ var _FormUITypeDefs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../FormUITypeDefs */ "./src/framework/ui/form/FormUITypeDefs.ts");
/* harmony import */ var _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../util/BrowserUtil */ "./src/framework/util/BrowserUtil.ts");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_3__);




const logger = debug__WEBPACK_IMPORTED_MODULE_3___default()('validation-event-handler');
class ValidationEventHandler {
  constructor(form, fieldConfig, listeners, subElements = null) {
    this.form = form;
    this.formId = form.getId();
    this.fieldConfig = fieldConfig;
    this.listeners = listeners;
    this.subElements = subElements;
    this.handleEvent = this.handleEvent.bind(this);
  }

  setValidationStatusAndMessage(fieldElement, isValid, value, message = undefined, resetOnFailure = false) {
    logger(`Handling validation for field ${this.fieldConfig.field.id}: ${isValid} with message ${message}`);
    logger(this.fieldConfig);

    if (this.fieldConfig.validator && fieldElement) {
      logger(`Handling validation for field ${this.fieldConfig.field.id}: ${isValid} with message ${message} - have validator and element`);
      const field = this.fieldConfig.field;
      let validationElementTarget = fieldElement; // we are providing user feedback on the field element, unless...

      if (this.subElements) {
        // sub elements change the validation target
        this.fieldConfig.validator.validator.setSubElements(this.subElements);

        if (this.fieldConfig.subElement) {
          // should be targetting the parentelement
          let parentEl = fieldElement.parentElement;

          if (parentEl) {
            validationElementTarget = parentEl;

            if (this.fieldConfig.subElement.container) {
              // another layer up required
              parentEl = parentEl.parentElement;

              if (parentEl) {
                validationElementTarget = parentEl;
              }
            }
          }
        }
      }

      let divId = `${this.form.getDataObjectDefinition().id}.field.${this.fieldConfig.field.id}.error`;
      logger(`Handling validation for field ${this.fieldConfig.field.id}: ${isValid} with message ${message} - div is ${divId}`);
      const errorMessageDiv = document.getElementById(divId);
      const errorMessageEl = document.getElementById(`${divId}.message`); // clear any previous message

      errorMessageDiv === null || errorMessageDiv === void 0 ? void 0 : errorMessageDiv.setAttribute('style', 'display:none');
      if (errorMessageEl) errorMessageEl.innerHTML = '';
      if (this.fieldConfig.validator.invalidClasses) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(validationElementTarget, this.fieldConfig.validator.invalidClasses, false);
      if (this.fieldConfig.validator.validClasses) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(validationElementTarget, this.fieldConfig.validator.validClasses);

      if (!isValid) {
        if (this.fieldConfig.validator.invalidClasses) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(validationElementTarget, this.fieldConfig.validator.invalidClasses);
        if (this.fieldConfig.validator.validClasses) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(validationElementTarget, this.fieldConfig.validator.validClasses, false);

        if (!message) {
          message = `${field.displayName} does not have a valid value.`;
        } // show the error message


        errorMessageDiv === null || errorMessageDiv === void 0 ? void 0 : errorMessageDiv.setAttribute('style', 'display:block');
        if (errorMessageEl) errorMessageEl.innerHTML = message;

        if (resetOnFailure) {
          switch (field.type) {
            case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_0__.FieldType.boolean:
              {
                // @ts-ignore
                fieldElement.checked = false;
                break;
              }

            case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_0__.FieldType.integer:
              {
                // @ts-ignore
                fieldElement.value = '0';
                break;
              }

            case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_0__.FieldType.float:
              {
                // @ts-ignore
                fieldElement.value = '0.0';
                break;
              }

            default:
              {
                // @ts-ignore
                fieldElement.value = '';
                break;
              }
          }
        } // @ts-ignore


        this.listeners.forEach(listener => listener.failedValidation(this.formId, field, value, message));
      }
    }
  }

  processValidation(fieldElement) {
    if (this.fieldConfig.validator && fieldElement) {
      const field = this.fieldConfig.field; // @ts-ignore

      let value = fieldElement.value; // checkboxes store values differently

      if (this.fieldConfig.elementType === _FormUITypeDefs__WEBPACK_IMPORTED_MODULE_1__.UIFieldType.checkbox) {
        // @ts-ignore
        value = '' + fieldElement.checked;
      }

      if (this.subElements) {
        value = '';
        this.subElements.forEach(subElement => {
          if (subElement.checked) {
            value = subElement.value;
          }
        });
      }

      const validationResp = this.fieldConfig.validator.validator.isValidValue(field, value);
      this.setValidationStatusAndMessage(fieldElement, validationResp.isValid, value, validationResp.message, validationResp.resetOnFailure);
    }
  }

  handleEvent(event) {
    event.preventDefault();
    event.stopPropagation(); // @ts-ignore

    const fieldElement = event.target;
    this.processValidation(fieldElement);
  }

}

/***/ }),

/***/ "./src/framework/ui/form/factory/FieldInputElementFactory.ts":
/*!*******************************************************************!*\
  !*** ./src/framework/ui/form/factory/FieldInputElementFactory.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FieldInputElementFactory": () => (/* binding */ FieldInputElementFactory)
/* harmony export */ });
/* harmony import */ var _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../util/BrowserUtil */ "./src/framework/util/BrowserUtil.ts");
/* harmony import */ var _FormUITypeDefs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../FormUITypeDefs */ "./src/framework/ui/form/FormUITypeDefs.ts");
/* harmony import */ var _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../model/DataObjectTypeDefs */ "./src/framework/model/DataObjectTypeDefs.ts");




class DefaultFieldOptionsListener {
  constructor(formId, parentElement, fieldUIConfig) {
    this.formId = formId;
    this.parentElement = parentElement;
    this.fieldUIConfig = fieldUIConfig;
  }

  optionsChanged(newOptions) {
    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].removeAllChildren(this.parentElement);
    let subEls = FieldInputElementFactory.createSubElements(this.formId, this.parentElement, this.fieldUIConfig, newOptions);
  }

}

class FieldInputElementFactory {
  constructor() {}

  static getInstance() {
    if (!FieldInputElementFactory._instance) {
      FieldInputElementFactory._instance = new FieldInputElementFactory();
    }

    return FieldInputElementFactory._instance;
  }

  static getElementIdForFieldId(form, fieldId) {
    return `${form.getId()}.field.${fieldId}`;
  }

  static initialiseFieldElementAndEventHandlers(fieldElement, formId, fieldConfig, listeners, subElements = null) {
    fieldElement.setAttribute('id', `${formId}.field.${fieldConfig.field.id}`);
    fieldElement.setAttribute(_FormUITypeDefs__WEBPACK_IMPORTED_MODULE_1__.DATA_ID_ATTRIBUTE, fieldConfig.field.id);
    fieldElement.setAttribute('name', fieldConfig.field.id);
    if (fieldConfig.elementAttributes) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addAttributes(fieldElement, fieldConfig.elementAttributes);
    if (fieldConfig.elementClasses) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(fieldElement, fieldConfig.elementClasses); // readonly field?

    if (fieldConfig.field.displayOnly) {
      _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addAttributes(fieldElement, [{
        name: 'disabled',
        value: 'true'
      }, {
        name: 'readonly',
        value: 'true'
      }]);
    }
    /*
    setup event handlers
    */
    // if (fieldConfig.validator) { // is the value in the field valid
    //     const eventHandler = new ValidationEventHandler(formId, fieldConfig, listeners, subElements);
    //     if (subElements) { // event for the subelements
    //         subElements.forEach((subElement) => {
    //             subElement.addEventListener('blur', eventHandler);
    //         });
    //
    //     } else {
    //         fieldElement.addEventListener('blur', eventHandler);
    //     }
    //
    // }
    // if (fieldConfig.editor) { // render the value when the field gains focus
    //     fieldElement.addEventListener('focus', new EditingEventListener(formId, fieldConfig, listeners));
    // } // care for endless loops here, renderer needs to return null if no changes
    // date picker for date fields


    if (fieldConfig.field.type === _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.date) {
      $(fieldElement).datepicker();
      $(fieldElement).datepicker("option", "dateFormat", 'dd/mm/yy');
    }
  }

  static createFieldComponentsAndContainer(fieldElement, formId, containerEl, fieldConfig, listeners) {
    // if the field has a validator, then we need a div for error messages
    let errorMessageDivEl = null;

    if (fieldConfig.validator) {
      errorMessageDivEl = document.createElement('div');
      errorMessageDivEl.setAttribute('id', `${formId}.field.${fieldConfig.field.id}.error`);
      errorMessageDivEl.setAttribute('style', 'display: none'); // default to not visible

      _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(errorMessageDivEl, fieldConfig.validator.messageDisplay.classes);
      let messageEl = document.createElement(fieldConfig.validator.messageDisplay.type);

      if (messageEl) {
        messageEl.setAttribute('id', `${formId}.field.${fieldConfig.field.id}.error.message`);
        if (fieldConfig.validator.messageDisplay.attributes) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addAttributes(messageEl, fieldConfig.validator.messageDisplay.attributes);
        errorMessageDivEl.appendChild(messageEl);
      }
    } // ok, so is the field contained?


    if (fieldConfig.containedBy) {
      // we need to create a container for the field and option label and description text
      let containedByEl = document.createElement(fieldConfig.containedBy.type);

      if (containedByEl) {
        _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(containedByEl, fieldConfig.containedBy.classes);
        containedByEl.setAttribute('id', `${formId}.field.${fieldConfig.field.id}.container`);
        if (fieldConfig.containedBy.attributes) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addAttributes(containerEl, fieldConfig.containedBy.attributes); // do we have a label also?

        if (fieldConfig.label) {
          let labelEl = document.createElement('label');
          labelEl.setAttribute('for', `${formId}.field.${fieldConfig.field.id}`);
          labelEl.innerHTML = fieldConfig.field.displayName;
          if (fieldConfig.label.attributes) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addAttributes(labelEl, fieldConfig.label.attributes);
          if (fieldConfig.label.classes) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(labelEl, fieldConfig.label.classes);
          containedByEl.appendChild(labelEl);
        }

        if (fieldConfig.describedBy) {
          let descEl = document.createElement(fieldConfig.describedBy.elementType);

          if (descEl) {
            // link the field and the description
            descEl.setAttribute('id', `${formId}.field.${fieldConfig.field.id}.desc`);
            if (fieldConfig.field.description) descEl.innerHTML = fieldConfig.field.description;
            fieldElement.setAttribute('aria-describedby', `${formId}.field.${fieldConfig.field.id}.desc`);
            if (fieldConfig.describedBy.elementClasses) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(descEl, fieldConfig.describedBy.elementClasses);
            containedByEl.appendChild(fieldElement);
            containedByEl.appendChild(descEl);
            if (errorMessageDivEl) containedByEl.appendChild(errorMessageDivEl);
          } else {
            // description failure, add the field
            containedByEl.appendChild(fieldElement);
            if (errorMessageDivEl) containedByEl.appendChild(errorMessageDivEl);
          }
        } else {
          // no description, add field to container
          containedByEl.appendChild(fieldElement);
          if (errorMessageDivEl) containedByEl.appendChild(errorMessageDivEl);
        }

        containerEl.appendChild(containedByEl);
      } else {
        // errors should keep making something!
        containerEl.appendChild(fieldElement);
        if (errorMessageDivEl) containerEl.appendChild(errorMessageDivEl);
      }
    } else {
      containerEl.appendChild(fieldElement);
      if (errorMessageDivEl) containerEl.appendChild(errorMessageDivEl);
    }
  }

  static createSubElements(formId, parentEl, fieldConfig, valueOptions) {
    let results = [];
    valueOptions.forEach((valueOption, index) => {
      if (fieldConfig.subElement) {
        let containerEl = parentEl; // is there a container?

        if (fieldConfig.subElement.container) {
          containerEl = document.createElement(fieldConfig.subElement.container.type);
          _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(containerEl, fieldConfig.subElement.container.classes);
          if (fieldConfig.subElement.container.attributes) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addAttributes(containerEl, fieldConfig.subElement.container.attributes);
          parentEl.appendChild(containerEl);
        }

        let valueEl = document.createElement(fieldConfig.subElement.element.type);
        valueEl.setAttribute('value', valueOption.value);
        valueEl.setAttribute('id', `${formId}.field.${fieldConfig.field.id}.${index}`);
        valueEl.setAttribute('name', `${formId}.field.${fieldConfig.field.id}`);
        _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(valueEl, fieldConfig.subElement.element.classes);
        if (fieldConfig.subElement.element.attributes) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addAttributes(valueEl, fieldConfig.subElement.element.attributes);
        containerEl.appendChild(valueEl);

        if (fieldConfig.subElement.label) {
          let labelEl = document.createElement('label');
          if (fieldConfig.subElement.label.classes) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(labelEl, fieldConfig.subElement.label.classes);
          if (fieldConfig.subElement.label.attributes) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addAttributes(labelEl, fieldConfig.subElement.label.attributes);
          labelEl.innerHTML = valueOption.name;
          containerEl.appendChild(labelEl);
        } else {
          if (fieldConfig.elementType === _FormUITypeDefs__WEBPACK_IMPORTED_MODULE_1__.UIFieldType.radioGroup) {
            containerEl.innerHTML += valueOption.name;
          } else if (fieldConfig.elementType === _FormUITypeDefs__WEBPACK_IMPORTED_MODULE_1__.UIFieldType.select) {
            valueEl.innerText = valueOption.name;
          }
        }

        results.push(valueEl);
      }
    });
    return results;
  }

  createInputFormFieldComponentElement(formId, containerEl, fieldConfig, listeners) {
    // return the input element
    let fieldElement = document.createElement('input');

    switch (fieldConfig.elementType) {
      case _FormUITypeDefs__WEBPACK_IMPORTED_MODULE_1__.UIFieldType.checkbox:
        {
          fieldElement.setAttribute('type', 'checkbox');
          fieldElement.setAttribute('value', fieldConfig.field.id);
          break;
        }

      case _FormUITypeDefs__WEBPACK_IMPORTED_MODULE_1__.UIFieldType.email:
        {
          fieldElement.setAttribute('type', 'email');
          break;
        }

      case _FormUITypeDefs__WEBPACK_IMPORTED_MODULE_1__.UIFieldType.hidden:
        {
          fieldElement.setAttribute('type', 'hidden');
          break;
        }

      case _FormUITypeDefs__WEBPACK_IMPORTED_MODULE_1__.UIFieldType.number:
        {
          fieldElement.setAttribute('type', 'number');
          break;
        }

      case _FormUITypeDefs__WEBPACK_IMPORTED_MODULE_1__.UIFieldType.password:
        {
          fieldElement.setAttribute('type', 'password');
          break;
        }

      case _FormUITypeDefs__WEBPACK_IMPORTED_MODULE_1__.UIFieldType.text:
        {
          fieldElement.setAttribute('type', 'text');
          break;
        }
    }

    FieldInputElementFactory.initialiseFieldElementAndEventHandlers(fieldElement, formId, fieldConfig, listeners);
    FieldInputElementFactory.createFieldComponentsAndContainer(fieldElement, formId, containerEl, fieldConfig, listeners);
    return fieldElement;
  }

  createTAFormFieldComponentElement(formId, containerEl, fieldConfig, listeners) {
    // return the input element
    let fieldElement = document.createElement('textarea');

    if (fieldConfig.textarea) {
      fieldElement.setAttribute('rows', `${fieldConfig.textarea.rows}`);
      fieldElement.setAttribute('cols', `${fieldConfig.textarea.cols}`);
    }

    FieldInputElementFactory.initialiseFieldElementAndEventHandlers(fieldElement, formId, fieldConfig, listeners);
    FieldInputElementFactory.createFieldComponentsAndContainer(fieldElement, formId, containerEl, fieldConfig, listeners);
    return fieldElement;
  }

  createSelectFormFieldComponentElement(formId, containerEl, fieldConfig, listeners) {
    // return the input element
    let fieldElement = document.createElement('select'); // create the options from the data source

    if (fieldConfig.datasource) {
      FieldInputElementFactory.createSubElements(formId, fieldElement, fieldConfig, fieldConfig.datasource.getOptions()); // listen for data source changes

      fieldConfig.datasource.addListener(new DefaultFieldOptionsListener(formId, fieldElement, fieldConfig));
    }

    FieldInputElementFactory.initialiseFieldElementAndEventHandlers(fieldElement, formId, fieldConfig, listeners);
    FieldInputElementFactory.createFieldComponentsAndContainer(fieldElement, formId, containerEl, fieldConfig, listeners);
    return fieldElement;
  }

  createRadioGroupFormFieldComponentElement(formId, containerEl, fieldConfig, listeners) {
    // create a div for each option in the source
    // create the div for the radio group
    let radioGroupElement = document.createElement('div');
    if (fieldConfig.elementAttributes) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addAttributes(radioGroupElement, fieldConfig.elementAttributes);
    if (fieldConfig.elementClasses) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(radioGroupElement, fieldConfig.elementClasses);
    let subElements = []; // create the options from the data source

    if (fieldConfig.datasource) {
      // we should get the radio buttons back
      subElements = FieldInputElementFactory.createSubElements(formId, radioGroupElement, fieldConfig, fieldConfig.datasource.getOptions()); // listen for data source changes

      fieldConfig.datasource.addListener(new DefaultFieldOptionsListener(formId, radioGroupElement, fieldConfig)); // setup the subelements for the validator, formatter, and renderer

      if (fieldConfig.validator) fieldConfig.validator.validator.setSubElements(subElements);
      if (fieldConfig.renderer) fieldConfig.renderer.setSubElements(subElements);
      if (fieldConfig.formatter) fieldConfig.formatter.setSubElements(subElements);
    }

    FieldInputElementFactory.initialiseFieldElementAndEventHandlers(radioGroupElement, formId, fieldConfig, listeners, subElements);
    FieldInputElementFactory.createFieldComponentsAndContainer(radioGroupElement, formId, containerEl, fieldConfig, listeners);
    return {
      container: radioGroupElement,
      radioButtons: subElements
    };
  }

}

/***/ }),

/***/ "./src/framework/ui/form/factory/FormElementFactory.ts":
/*!*************************************************************!*\
  !*** ./src/framework/ui/form/factory/FormElementFactory.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FormElementFactory": () => (/* binding */ FormElementFactory)
/* harmony export */ });
/* harmony import */ var _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../util/BrowserUtil */ "./src/framework/util/BrowserUtil.ts");
/* harmony import */ var _FieldInputElementFactory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FieldInputElementFactory */ "./src/framework/ui/form/factory/FieldInputElementFactory.ts");
/* harmony import */ var _FormUITypeDefs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../FormUITypeDefs */ "./src/framework/ui/form/FormUITypeDefs.ts");
/* harmony import */ var _FormListener__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../FormListener */ "./src/framework/ui/form/FormListener.ts");




class FormElementFactory {
  constructor() {}

  static getInstance() {
    if (!FormElementFactory._instance) {
      FormElementFactory._instance = new FormElementFactory();
    }

    return FormElementFactory._instance;
  }

  createFormElements(form, formListeners, formConfig, fieldListeners) {
    let formEl = document.createElement('form');
    formEl.setAttribute('id', formConfig.id);
    formEl.setAttribute('name', formConfig.displayName);
    if (formConfig.classes) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(formEl, formConfig.classes); // create each of the fields and collect them

    let formInputElements = [];
    let formTAElements = [];
    let formRBGElements = [];
    let formSelectElements = [];
    let unsavedMessage = document.createElement(formConfig.unsavedChanges.type);
    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(unsavedMessage, formConfig.unsavedChanges.classes);
    if (formConfig.unsavedChanges.attributes) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addAttributes(unsavedMessage, formConfig.unsavedChanges.attributes);
    formEl.appendChild(unsavedMessage);
    formConfig.fieldGroups.forEach(group => {
      // if the group has a container make that, otherwise the form is the container
      let containerEl = formEl;

      if (group.containedBy) {
        // @ts-ignore
        containerEl = document.createElement(group.containedBy.type);

        if (containerEl) {
          if (group.containedBy.attributes) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addAttributes(containerEl, group.containedBy.attributes);
          if (group.containedBy.classes) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(containerEl, group.containedBy.classes);
          formEl.appendChild(containerEl);
        }
      }

      group.fields.forEach(field => {
        switch (field.elementType) {
          case _FormUITypeDefs__WEBPACK_IMPORTED_MODULE_2__.UIFieldType.textarea:
            {
              const fieldEl = _FieldInputElementFactory__WEBPACK_IMPORTED_MODULE_1__.FieldInputElementFactory.getInstance().createTAFormFieldComponentElement(formConfig.id, containerEl, field, fieldListeners);
              formTAElements.push(fieldEl);
              break;
            }

          case _FormUITypeDefs__WEBPACK_IMPORTED_MODULE_2__.UIFieldType.select:
            {
              const fieldEl = _FieldInputElementFactory__WEBPACK_IMPORTED_MODULE_1__.FieldInputElementFactory.getInstance().createSelectFormFieldComponentElement(formConfig.id, containerEl, field, fieldListeners);
              formSelectElements.push(fieldEl);
              break;
            }

          case _FormUITypeDefs__WEBPACK_IMPORTED_MODULE_2__.UIFieldType.radioGroup:
            {
              const fieldEl = _FieldInputElementFactory__WEBPACK_IMPORTED_MODULE_1__.FieldInputElementFactory.getInstance().createRadioGroupFormFieldComponentElement(formConfig.id, containerEl, field, fieldListeners);
              formRBGElements.push(fieldEl);
              break;
            }

          default:
            {
              const fieldEl = _FieldInputElementFactory__WEBPACK_IMPORTED_MODULE_1__.FieldInputElementFactory.getInstance().createInputFormFieldComponentElement(formConfig.id, containerEl, field, fieldListeners);
              formInputElements.push(fieldEl);
            }
        }
      });
    });
    /* setup the buttons */

    let buttonContainer = formEl;

    if (formConfig.buttonsContainedBy) {
      buttonContainer = document.createElement(formConfig.buttonsContainedBy.type);

      if (buttonContainer) {
        if (formConfig.buttonsContainedBy.attributes) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addAttributes(buttonContainer, formConfig.buttonsContainedBy.attributes);
        _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(buttonContainer, formConfig.buttonsContainedBy.classes);
        formEl.appendChild(buttonContainer);
      } else {
        buttonContainer = formEl; // couldn't create the button container, use the form
      }
    }

    let deleteButtonEl = undefined;

    if (formConfig.deleteButton) {
      deleteButtonEl = this.createFormButton(form, formConfig, formListeners, formConfig.deleteButton, _FormListener__WEBPACK_IMPORTED_MODULE_3__.FormEventType.DELETING);
      buttonContainer.appendChild(deleteButtonEl);
    }

    let cancelButtonEl = undefined;

    if (formConfig.cancelButton) {
      cancelButtonEl = this.createFormButton(form, formConfig, formListeners, formConfig.cancelButton, _FormListener__WEBPACK_IMPORTED_MODULE_3__.FormEventType.CANCELLING);
      buttonContainer.appendChild(cancelButtonEl);
    }

    let submitButtonEl = undefined;

    if (formConfig.submitButton) {
      submitButtonEl = this.createFormButton(form, formConfig, formListeners, formConfig.submitButton, _FormListener__WEBPACK_IMPORTED_MODULE_3__.FormEventType.SAVING);
      buttonContainer.appendChild(submitButtonEl);
    }

    let result = {
      form: formEl,
      unsavedMessage: unsavedMessage,
      fields: formInputElements,
      selectFields: formSelectElements,
      radioButtonGroups: formRBGElements,
      textFields: formTAElements,
      deleteButton: deleteButtonEl,
      cancelButton: cancelButtonEl,
      submitButton: submitButtonEl
    };
    return result;
  }

  createFormButton(form, formConfig, formListeners, buttonDef, eventType) {
    let buttonEl = document.createElement('button');
    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(buttonEl, buttonDef.classes);
    buttonEl.setAttribute('id', `${formConfig.id}.${eventType}`);

    if (buttonDef.text) {
      buttonEl.innerText = buttonDef.text;
    }

    if (buttonDef.iconClasses) {
      let iconEl = document.createElement('i');

      if (iconEl) {
        _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(iconEl, buttonDef.iconClasses);
        buttonEl.appendChild(iconEl);
      }
    }
    /* setup the event handler for the button */


    buttonEl.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      let formEvent = {
        target: form,
        formId: formConfig.id,
        eventType: eventType
      };
      formListeners.forEach(listener => listener.formChanged(formEvent));
    });
    return buttonEl;
  }

}

/***/ }),

/***/ "./src/framework/ui/form/field/AbstractField.ts":
/*!******************************************************!*\
  !*** ./src/framework/ui/form/field/AbstractField.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbstractField": () => (/* binding */ AbstractField)
/* harmony export */ });
/* harmony import */ var _FormUITypeDefs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../FormUITypeDefs */ "./src/framework/ui/form/FormUITypeDefs.ts");
/* harmony import */ var _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../model/DataObjectTypeDefs */ "./src/framework/model/DataObjectTypeDefs.ts");
/* harmony import */ var _event_handlers_ValidationEventHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../event-handlers/ValidationEventHandler */ "./src/framework/ui/form/event-handlers/ValidationEventHandler.ts");
/* harmony import */ var _event_handlers_RenderingEventListener__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../event-handlers/RenderingEventListener */ "./src/framework/ui/form/event-handlers/RenderingEventListener.ts");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _event_handlers_EditingEventListener__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../event-handlers/EditingEventListener */ "./src/framework/ui/form/event-handlers/EditingEventListener.ts");






const logger = debug__WEBPACK_IMPORTED_MODULE_4___default()('abstract-field');
class AbstractField {
  config = null;
  subElements = [];
  listeners = [];
  hidden = false;

  constructor(form, config, fieldDef, element, subElements = null) {
    this.form = form;
    this.formId = form.getId();
    this.config = config;
    this.definition = fieldDef;
    this.element = element;
    if (subElements) this.subElements = subElements;
    this.validationHandler = new _event_handlers_ValidationEventHandler__WEBPACK_IMPORTED_MODULE_2__.ValidationEventHandler(form, config, [this], subElements);
    this.renderingHandler = new _event_handlers_RenderingEventListener__WEBPACK_IMPORTED_MODULE_3__.RenderingEventListener(form, this, config, [this], subElements);
    const editingHandler = new _event_handlers_EditingEventListener__WEBPACK_IMPORTED_MODULE_5__.EditingEventListener(form, this, config, [this]);

    if (config.editor) {
      // render the value when the field gains focus
      this.element.addEventListener('focus', editingHandler.handleEditEvent);
      this.element.addEventListener('blur', editingHandler.handleEditCompletedEvent);
      this.element.addEventListener('click', editingHandler.handleEditEvent);
    }

    if (config.validator) {
      // is the value in the field valid
      const eventHandler = new _event_handlers_ValidationEventHandler__WEBPACK_IMPORTED_MODULE_2__.ValidationEventHandler(this.form, config, this.listeners, subElements);

      if (subElements && subElements.length > 0) {
        // event for the subelements
        subElements.forEach(subElement => {
          subElement.addEventListener('blur', eventHandler);
        });
      } else {
        this.element.addEventListener('blur', eventHandler);
      }
    } // listen for our own change events


    this.handleChangeEvent = this.handleChangeEvent.bind(this);

    if (this.subElements && this.subElements.length > 0) {
      logger(`Adding change listeners to subelements of ${config.field.id}`);
      this.subElements.forEach(subElement => {
        subElement.addEventListener('change', this.handleChangeEvent);
      });
    } else {
      this.element.addEventListener('change', this.handleChangeEvent);
    }
  }

  isHidden() {
    return this.hidden;
  }

  addFieldListener(listener) {
    logger(`${this.getName()} - adding listener ${listener.getName()}`); // don't duplicate listeners

    let index = this.listeners.findIndex(listenerInList => listenerInList.getName() === listener.getName());

    if (index < 0) {
      this.listeners.push(listener);
    } else {
      logger(`${this.getName()} - duplicate listener ${listener.getName()} ignored`);
    }
  }

  getFieldDefinition() {
    return this.definition;
  }

  setInvalid(message) {
    this.validationHandler.setValidationStatusAndMessage(this.element, false, '', message, false); // @ts-ignore

    this.listeners.forEach(listener => listener.failedValidation(this.formId, this.definition, this.getValue(), message));
  }

  initialise() {}

  getValue() {
    let result = null;

    if (this.config && this.element) {
      // derived values are calculated from the data object overall
      if (this.definition.derivedValue) {
        result = this.definition.derivedValue.getValue(this.form.getCurrentDataObj(), this.definition, this.form.getFormMode() === _FormUITypeDefs__WEBPACK_IMPORTED_MODULE_0__.FormMode.create);
      } else {
        switch (this.config.elementType) {
          case _FormUITypeDefs__WEBPACK_IMPORTED_MODULE_0__.UIFieldType.radioGroup:
            {
              logger(`${this.definition.id} - getting value - rbg`);

              if (this.subElements && this.subElements.length > 0) {
                this.subElements.forEach(subElement => {
                  if (subElement.checked) {
                    logger(`${this.definition.id} - getting value - rbg - checked ${subElement.value}`);
                    result = subElement.value;
                    subElement.checked = true;
                  }
                });
              }

              break;
            }

          case _FormUITypeDefs__WEBPACK_IMPORTED_MODULE_0__.UIFieldType.checkbox:
            {
              // @ts-ignore
              result = '' + this.element.checked;
              break;
            }

          default:
            {
              // @ts-ignore
              result = this.element.value;
              break;
            }
        }
      }
    }

    logger(`${this.definition.id} - getting value - ${result}`);
    return result;
  }

  getFormattedValue() {
    let result = null;

    if (this.config && this.element) {
      // @ts-ignore
      result = this.element.value;

      if (this.config.elementType === _FormUITypeDefs__WEBPACK_IMPORTED_MODULE_0__.UIFieldType.checkbox) {
        // @ts-ignore
        result = '' + this.element.checked;
      }

      if (this.config.formatter) {
        result = this.config.formatter.formatValue(this.definition, result);
      }
    }

    return result;
  }

  isValid() {
    let result = true;

    if (this.config && this.element) {
      if (this.config.validator) {
        if (this.config.validator.validator) {
          const validator = this.config.validator.validator;
          const response = validator.isValidValue(this.definition, this.getValue());
          result = response.isValid;
        }
      }
    }

    return result;
  }

  getId() {
    return this.definition.id;
  }

  setValue(newValue) {
    newValue = '' + newValue;

    if (this.element && this.config) {
      // derived fields have no "setter"
      if (this.definition.derivedValue) return; // @ts-ignore

      switch (this.config.elementType) {
        case _FormUITypeDefs__WEBPACK_IMPORTED_MODULE_0__.UIFieldType.radioGroup:
          {
            if (this.subElements && this.subElements.length > 0) {
              this.subElements.forEach(subElement => {
                if (subElement.value === newValue) {
                  subElement.checked = true;
                }
              });
            }

            break;
          }

        case _FormUITypeDefs__WEBPACK_IMPORTED_MODULE_0__.UIFieldType.checkbox:
          {
            // @ts-ignore
            this.element.checked = newValue.toLowerCase() === 'true';
            break;
          }

        case _FormUITypeDefs__WEBPACK_IMPORTED_MODULE_0__.UIFieldType.select:
          {
            logger(`${this.definition.id} - setting value - ${newValue}`);
            const selectEl = this.element;
            let selectedIndex = -1;

            for (let index = 0; index < selectEl.options.length; index++) {
              // @ts-ignore
              const option = selectEl.options.item(index);
              logger(`${this.definition.id} - option value - ${option.value}`);

              if (option.value === newValue) {
                logger(`${this.definition.id} - option value - ${option.value} - SELECTED`);
                option.selected = true;
                selectedIndex = index;
              }
            }

            logger(`${this.definition.id} - selected index ${selectedIndex}`);
            selectEl.selectedIndex = selectedIndex;
            break;
          }

        default:
          {
            logger(`${this.definition.id} - setting value - ${newValue}`); // @ts-ignore

            this.element.value = newValue;
            break;
          }
      }
    }
  }

  reset() {
    if (this.element) {
      switch (this.definition.type) {
        case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.boolean:
          {
            // @ts-ignore
            this.element.checked = false;
            break;
          }

        case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.integer:
          {
            // @ts-ignore
            this.element.value = '0';
            break;
          }

        case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.float:
          {
            // @ts-ignore
            this.element.value = '0.0';
            break;
          }

        case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.limitedChoice:
          {
            if (this.subElements && this.subElements.length > 0) {
              this.subElements.forEach(subElement => {
                subElement.checked = false;
              });
            }

            break;
          }

        default:
          {
            // @ts-ignore
            this.element.value = '';
            break;
          }
      }
    }

    this.show();
  }

  clearValue() {
    this.reset();
  }

  validate() {
    if (this.element) {
      this.validationHandler.processValidation(this.element);
    }
  }

  render(currentValue) {
    var _this$config;

    let result = currentValue;

    if ((_this$config = this.config) !== null && _this$config !== void 0 && _this$config.renderer) {
      let value = this.config.renderer.renderValue(this, this.definition, currentValue);
      if (value) result = value;
    }

    return result;
  }

  failedValidation(form, field, currentValue, message) {}

  valueChanged(form, field, fieldDef, newValue) {}

  getName() {
    return this.definition.displayName;
  }

  hide() {
    /*
      if we have an enclosing container (per the config) then we can hide
      otherwise we become readonly and disabled
     */
    if (this.config) {
      if (this.config.containedBy) {
        const parentEl = this.element.parentElement;

        if (parentEl) {
          parentEl.setAttribute('style', 'display:none');
        }
      } else {
        this.setReadOnly();
      }
    }

    this.hidden = true;
  }

  setValid() {
    this.validationHandler.setValidationStatusAndMessage(this.element, true, '');
  }

  show() {
    /*
      if we have an enclosing container (per the config) then we can hide
      otherwise we become readonly and disabled
     */
    if (this.config) {
      if (this.config.containedBy) {
        const parentEl = this.element.parentElement;

        if (parentEl) {
          parentEl.removeAttribute('style');
        }
      } else {
        this.clearReadOnly();
      }
    }

    this.hidden = true;
  }

  clearReadOnly() {
    if (this.definition.displayOnly) return;
    this.element.removeAttribute('readonly');
    this.element.removeAttribute('disabled'); // do the same for subelements

    if (this.subElements && this.subElements.length > 0) {
      this.subElements.forEach(subElement => {
        subElement.removeAttribute('readonly');
        subElement.removeAttribute('disabled');
      });
    }
  }

  setReadOnly() {
    this.element.setAttribute('readonly', 'true');
    this.element.setAttribute('disabled', 'true'); // do the same for subelements

    if (this.subElements && this.subElements.length > 0) {
      this.subElements.forEach(subElement => {
        subElement.setAttribute('readonly', 'true');
        subElement.setAttribute('disabled', 'true');
      });
    }
  }

  handleChangeEvent(event) {
    logger(`Handling change event`);

    if (this.config) {
      let value = this.getValue();
      logger(`Handling change event - informing listeners`);
      this.listeners.forEach(listener => listener.valueChanged(this.form, this, this.definition, value));
    }
  }

  getElement() {
    return this.element;
  }

}

/***/ }),

/***/ "./src/framework/ui/form/field/ColourInputField.ts":
/*!*********************************************************!*\
  !*** ./src/framework/ui/form/field/ColourInputField.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ColourInputField": () => (/* binding */ ColourInputField)
/* harmony export */ });
/* harmony import */ var _AbstractField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractField */ "./src/framework/ui/form/field/AbstractField.ts");
/* harmony import */ var _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../util/BrowserUtil */ "./src/framework/util/BrowserUtil.ts");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _util_MiscFunctions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../util/MiscFunctions */ "./src/framework/util/MiscFunctions.ts");




const logger = debug__WEBPACK_IMPORTED_MODULE_2___default()('colour-input-field');
class ColourInputField extends _AbstractField__WEBPACK_IMPORTED_MODULE_0__.AbstractField {
  constructor(form, config, fieldDef, element) {
    super(form, config, fieldDef, element);
    this.setValue = this.setValue.bind(this);
  }

  setValue(newValue) {
    logger(`Setting background style to colour ${newValue}`);
    super.setValue(newValue); // special case of colour types

    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].removeAttributes(this.element, ["style"]);
    let styleOptions = [{
      name: "style",
      value: `background-color:${newValue};colour:black`
    }];

    if ((0,_util_MiscFunctions__WEBPACK_IMPORTED_MODULE_3__.isHexValueDark)(newValue)) {
      styleOptions = [{
        name: "style",
        value: `background-color:${newValue};color:white`
      }];
    }

    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addAttributes(this.element, styleOptions);
  }

}

/***/ }),

/***/ "./src/framework/ui/form/field/InputField.ts":
/*!***************************************************!*\
  !*** ./src/framework/ui/form/field/InputField.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InputField": () => (/* binding */ InputField)
/* harmony export */ });
/* harmony import */ var _AbstractField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractField */ "./src/framework/ui/form/field/AbstractField.ts");

class InputField extends _AbstractField__WEBPACK_IMPORTED_MODULE_0__.AbstractField {
  constructor(form, config, fieldDef, element) {
    super(form, config, fieldDef, element);
  }

}

/***/ }),

/***/ "./src/framework/ui/form/field/RadioButtonGroupField.ts":
/*!**************************************************************!*\
  !*** ./src/framework/ui/form/field/RadioButtonGroupField.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RadioButtonGroupField": () => (/* binding */ RadioButtonGroupField)
/* harmony export */ });
/* harmony import */ var _AbstractField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractField */ "./src/framework/ui/form/field/AbstractField.ts");

class RadioButtonGroupField extends _AbstractField__WEBPACK_IMPORTED_MODULE_0__.AbstractField {
  constructor(form, config, fieldDef, element, subElements) {
    super(form, config, fieldDef, element, subElements);
  }

}

/***/ }),

/***/ "./src/framework/ui/form/field/SelectField.ts":
/*!****************************************************!*\
  !*** ./src/framework/ui/form/field/SelectField.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SelectField": () => (/* binding */ SelectField)
/* harmony export */ });
/* harmony import */ var _AbstractField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractField */ "./src/framework/ui/form/field/AbstractField.ts");

class SelectField extends _AbstractField__WEBPACK_IMPORTED_MODULE_0__.AbstractField {
  constructor(form, config, fieldDef, element) {
    super(form, config, fieldDef, element);
  }

}

/***/ }),

/***/ "./src/framework/ui/form/field/TextAreaField.ts":
/*!******************************************************!*\
  !*** ./src/framework/ui/form/field/TextAreaField.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TextAreaField": () => (/* binding */ TextAreaField)
/* harmony export */ });
/* harmony import */ var _AbstractField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractField */ "./src/framework/ui/form/field/AbstractField.ts");

class TextAreaField extends _AbstractField__WEBPACK_IMPORTED_MODULE_0__.AbstractField {
  constructor(form, config, fieldDef, element) {
    super(form, config, fieldDef, element);
  }

}

/***/ }),

/***/ "./src/framework/ui/form/validation/ValidationHelperFunctions.ts":
/*!***********************************************************************!*\
  !*** ./src/framework/ui/form/validation/ValidationHelperFunctions.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidationHelperFunctions": () => (/* binding */ ValidationHelperFunctions)
/* harmony export */ });
/* harmony import */ var _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../model/DataObjectTypeDefs */ "./src/framework/model/DataObjectTypeDefs.ts");
/* harmony import */ var _CommonTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../CommonTypes */ "./src/framework/CommonTypes.ts");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_2__);



const logger = debug__WEBPACK_IMPORTED_MODULE_2___default()('validation-helper-functions');
class ValidationHelperFunctions {
  constructor() {}

  static getInstance() {
    if (!ValidationHelperFunctions._instance) {
      ValidationHelperFunctions._instance = new ValidationHelperFunctions();
    }

    return ValidationHelperFunctions._instance;
  }

  areTwoFieldsEqual(targetField, sourceField) {
    let result = {
      ruleFailed: false
    };

    if (targetField.getValue() !== sourceField.getValue()) {
      result = {
        ruleFailed: true,
        message: `${targetField.getName()} must be equal to ${sourceField.getName()}`
      };
    }

    return result;
  }

  isFieldAndValueEqual(field, value) {
    let result = {
      ruleFailed: false
    };

    if (field.getValue() !== value) {
      result = {
        ruleFailed: true,
        message: `${field.getName()} must be equal to ${value}`
      };
    }

    return result;
  }

  compareTwoValuesWithTypes(targetType, targetValue, sourceType, sourceValue, comparison) {
    if (!targetValue || !sourceValue) return false; // no null comparisons

    logger(`Comparing two values with types and comparison ${comparison} - target value (type:${targetType},value:${targetValue}), source value (type:${sourceType},value:${sourceValue})`);

    switch (targetType) {
      case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_0__.FieldType.date:
        {
          targetValue += ' 00:00:00';

          if (sourceType === _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_0__.FieldType.date) {
            sourceValue += ' 00:00:00';
          }

          break;
        }

      case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_0__.FieldType.datetime:
        {
          if (sourceType === _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_0__.FieldType.date) {
            sourceValue += ' 00:00:00';
          }

          break;
        }

      case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_0__.FieldType.time:
        {
          if (sourceType === _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_0__.FieldType.shortTime) {
            sourceValue += ':00';
          }

          break;
        }

      case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_0__.FieldType.shortTime:
        {
          targetValue += ':00';

          if (sourceType === _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_0__.FieldType.shortTime) {
            sourceValue += ':00';
          }

          break;
        }
    }

    logger(`Comparing ${targetValue} of type ${targetType} against ${sourceValue} of type ${sourceType}`);

    switch (comparison) {
      case _CommonTypes__WEBPACK_IMPORTED_MODULE_1__.ComparisonType.lessThan:
        {
          return targetValue < sourceValue;
        }

      case _CommonTypes__WEBPACK_IMPORTED_MODULE_1__.ComparisonType.lessThanEqual:
        {
          return targetValue <= sourceValue;
        }

      case _CommonTypes__WEBPACK_IMPORTED_MODULE_1__.ComparisonType.greaterThanEqual:
        {
          return targetValue >= sourceValue;
        }

      case _CommonTypes__WEBPACK_IMPORTED_MODULE_1__.ComparisonType.greaterThan:
        {
          return targetValue > sourceValue;
        }

      case _CommonTypes__WEBPACK_IMPORTED_MODULE_1__.ComparisonType.equals:
        {
          return targetValue === sourceValue;
        }
    }

    return false;
  }

  isTargetLessThanSource(targetField, sourceField) {
    let result = {
      ruleFailed: false
    };
    let sourceType = sourceField.getFieldDefinition().type;
    let targetType = targetField.getFieldDefinition().type;
    let sourceValue = sourceField.getValue();
    let targetValue = targetField.getValue();

    if (!this.compareTwoValuesWithTypes(targetType, targetValue, sourceType, sourceValue, _CommonTypes__WEBPACK_IMPORTED_MODULE_1__.ComparisonType.lessThan)) {
      result = {
        ruleFailed: true,
        message: `${targetField.getName()} must be less than ${sourceField.getName()}`
      };
    }

    return result;
  }

  isFieldLessThanValue(field, value) {
    let result = {
      ruleFailed: false
    };
    let type = field.getFieldDefinition().type;
    let sourceValue = field.getValue();

    if (!this.compareTwoValuesWithTypes(type, sourceValue, type, value, _CommonTypes__WEBPACK_IMPORTED_MODULE_1__.ComparisonType.lessThan)) {
      result = {
        ruleFailed: true,
        message: `${field.getName()} must be less than ${value}`
      };
    }

    return result;
  }

  isFieldLessThanEqualValue(field, value) {
    let result = {
      ruleFailed: false
    };
    let check = this.isFieldAndValueEqual(field, value);

    if (check.ruleFailed) {
      check = this.isFieldLessThanValue(field, value);

      if (check.ruleFailed) {
        result = {
          ruleFailed: true,
          message: `${field.getName()} must be less than or equal to ${value}`
        };
      }
    }

    return result;
  }

  isFieldGreaterThanValue(field, value) {
    let result = {
      ruleFailed: false
    };
    let type = field.getFieldDefinition().type;
    let sourceValue = field.getValue();

    if (!this.compareTwoValuesWithTypes(type, sourceValue, type, value, _CommonTypes__WEBPACK_IMPORTED_MODULE_1__.ComparisonType.greaterThan)) {
      result = {
        ruleFailed: true,
        message: `${field.getName()} must be greater than ${value}`
      };
    }

    return result;
  }

  isFieldGreaterThanEqualValue(field, value) {
    let result = {
      ruleFailed: false
    };
    let check = this.isFieldAndValueEqual(field, value);

    if (check.ruleFailed) {
      check = this.isFieldGreaterThanValue(field, value);

      if (check.ruleFailed) {
        result = {
          ruleFailed: true,
          message: `${field.getName()} must be greater than or equal to ${value}`
        };
      }
    }

    return result;
  }

  isTargetLessThanEqualSource(targetField, sourceField) {
    let result = {
      ruleFailed: false
    };
    let check = this.areTwoFieldsEqual(targetField, sourceField);

    if (check.ruleFailed) {
      check = this.isTargetLessThanSource(targetField, sourceField);

      if (check.ruleFailed) {
        result = {
          ruleFailed: true,
          message: `${targetField.getName()} must be less than or equal to ${sourceField.getName()}`
        };
      }
    }

    return result;
  }

  isTargetGreaterThan(targetField, sourceField) {
    let result = {
      ruleFailed: false
    };
    let sourceType = sourceField.getFieldDefinition().type;
    let targetType = targetField.getFieldDefinition().type;
    let sourceValue = sourceField.getValue();
    let targetValue = targetField.getValue();

    if (!this.compareTwoValuesWithTypes(targetType, targetValue, sourceType, sourceValue, _CommonTypes__WEBPACK_IMPORTED_MODULE_1__.ComparisonType.greaterThan)) {
      result = {
        ruleFailed: true,
        message: `${targetField.getName()} must be greater than ${sourceField.getName()}`
      };
    }

    return result;
  }

  isFieldNull(sourceField) {
    let result = {
      ruleFailed: false
    };
    let targetValue = sourceField.getValue(); // @ts-ignore

    logger(`field ${field.getId()} is null - current value is '${targetValue}'`);

    if (targetValue && targetValue.trim().length > 0) {
      result = {
        ruleFailed: true,
        message: `${sourceField.getName()} must be empty`
      };
    }

    return result;
  }

  isFieldNotNull(field) {
    let result = {
      ruleFailed: false
    };
    let targetValue = field.getValue();
    logger(`field ${field.getId()} is NOT null - current value is '${targetValue}'`); // @ts-ignore

    if (targetValue) {
      if (targetValue.trim().length === 0) {
        result = {
          ruleFailed: true,
          message: `${field.getName()} must not be empty`
        };
      }
    } else {
      result = {
        ruleFailed: true,
        message: `${field.getName()} must not be empty`
      };
    }

    return result;
  }

  doesFieldHaveValue(field, values) {
    let result = {
      ruleFailed: false
    };
    let targetValue = field.getValue();
    logger(`does field ${field.getId()} have value from ${values} - current value is ${targetValue}`);

    if (targetValue) {
      // split the values by commas
      let splits = values.split(',');
      let foundInValue = false;
      splits.forEach(split => {
        if (targetValue === split) {
          logger(`does field ${field.getId()} have value from ${values} - current value is ${targetValue} - found in value(s)`);
          foundInValue = true;
        }
      });

      if (!foundInValue) {
        result = {
          ruleFailed: true,
          message: `${field.getName()} must be have a value in ${values}`
        };
      }
    }

    return result;
  }

  doesSourceFieldHaveValue(field, values) {
    return this.doesFieldHaveValue(field, values);
  }

  isTargetGreaterThanEqualSource(targetField, sourceField) {
    let result = {
      ruleFailed: false
    };
    let check = this.areTwoFieldsEqual(targetField, sourceField);

    if (check.ruleFailed) {
      check = this.isTargetGreaterThan(targetField, sourceField);

      if (check.ruleFailed) {
        result = {
          ruleFailed: true,
          message: `${targetField.getName()} must be greater than or equal to ${sourceField.getName()}`
        };
      }
    }

    return result;
  }

  compareFields(targetField, sourceField, comparison, value) {
    switch (comparison) {
      case _CommonTypes__WEBPACK_IMPORTED_MODULE_1__.ComparisonType.equals:
        {
          return this.areTwoFieldsEqual(targetField, sourceField);
          break;
        }

      case _CommonTypes__WEBPACK_IMPORTED_MODULE_1__.ComparisonType.lessThan:
        {
          return this.isTargetLessThanSource(targetField, sourceField);
          break;
        }

      case _CommonTypes__WEBPACK_IMPORTED_MODULE_1__.ComparisonType.lessThanEqual:
        {
          return this.isTargetLessThanEqualSource(targetField, sourceField);
          break;
        }

      case _CommonTypes__WEBPACK_IMPORTED_MODULE_1__.ComparisonType.greaterThan:
        {
          return this.isTargetGreaterThan(targetField, sourceField);
          break;
        }

      case _CommonTypes__WEBPACK_IMPORTED_MODULE_1__.ComparisonType.greaterThanEqual:
        {
          return this.isTargetGreaterThanEqualSource(targetField, sourceField);
          break;
        }

      case _CommonTypes__WEBPACK_IMPORTED_MODULE_1__.ComparisonType.isNull:
        {
          return this.isFieldNull(sourceField);
          break;
        }

      case _CommonTypes__WEBPACK_IMPORTED_MODULE_1__.ComparisonType.isNotNull:
        {
          return this.isFieldNotNull(sourceField);
          break;
        }

      case _CommonTypes__WEBPACK_IMPORTED_MODULE_1__.ComparisonType.hasValue:
        {
          return this.doesSourceFieldHaveValue(sourceField, value);
          break;
        }
    }
  }

  compareFieldWithValue(field, comparison, value) {
    switch (comparison) {
      case _CommonTypes__WEBPACK_IMPORTED_MODULE_1__.ComparisonType.equals:
        {
          return this.isFieldAndValueEqual(field, value);
          break;
        }

      case _CommonTypes__WEBPACK_IMPORTED_MODULE_1__.ComparisonType.lessThan:
        {
          return this.isFieldLessThanValue(field, value);
          break;
        }

      case _CommonTypes__WEBPACK_IMPORTED_MODULE_1__.ComparisonType.lessThanEqual:
        {
          return this.isFieldLessThanEqualValue(field, value);
          break;
        }

      case _CommonTypes__WEBPACK_IMPORTED_MODULE_1__.ComparisonType.greaterThan:
        {
          return this.isFieldGreaterThanValue(field, value);
          break;
        }

      case _CommonTypes__WEBPACK_IMPORTED_MODULE_1__.ComparisonType.greaterThanEqual:
        {
          return this.isFieldGreaterThanEqualValue(field, value);
          break;
        }

      case _CommonTypes__WEBPACK_IMPORTED_MODULE_1__.ComparisonType.isNull:
        {
          return this.isFieldNull(field);
          break;
        }

      case _CommonTypes__WEBPACK_IMPORTED_MODULE_1__.ComparisonType.isNotNull:
        {
          return this.isFieldNotNull(field);
          break;
        }

      case _CommonTypes__WEBPACK_IMPORTED_MODULE_1__.ComparisonType.hasValue:
        {
          return this.doesSourceFieldHaveValue(field, value);
          break;
        }
    }
  }

}

/***/ }),

/***/ "./src/framework/ui/form/validation/ValidationManager.ts":
/*!***************************************************************!*\
  !*** ./src/framework/ui/form/validation/ValidationManager.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidationManager": () => (/* binding */ ValidationManager)
/* harmony export */ });
/* harmony import */ var _ValidationTypeDefs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ValidationTypeDefs */ "./src/framework/ui/form/validation/ValidationTypeDefs.ts");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../model/DataObjectTypeDefs */ "./src/framework/model/DataObjectTypeDefs.ts");
/* harmony import */ var _FormUITypeDefs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../FormUITypeDefs */ "./src/framework/ui/form/FormUITypeDefs.ts");
/* harmony import */ var _ValidationHelperFunctions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ValidationHelperFunctions */ "./src/framework/ui/form/validation/ValidationHelperFunctions.ts");





const logger = debug__WEBPACK_IMPORTED_MODULE_1___default()('validation-manager');
const flogger = debug__WEBPACK_IMPORTED_MODULE_1___default()('validation-manager-rule-failure');
const erLogger = debug__WEBPACK_IMPORTED_MODULE_1___default()('validation-manager-execute-rule');
const merLogger = debug__WEBPACK_IMPORTED_MODULE_1___default()('validation-manager-multiple-condition-rule-results');
class ValidationManager {
  constructor() {
    this.formRules = [];
    this.formValidators = [];
  }

  static getInstance() {
    if (!ValidationManager._instance) {
      ValidationManager._instance = new ValidationManager();
    }

    return ValidationManager._instance;
  }

  addFormValidator(validator) {
    this.formValidators.push(validator);
  }

  getName() {
    return "Validation Manager";
  }

  addRuleToForm(form, rule) {
    // returns whether the rule was added
    logger(`Adding rule on form ${form.getId()} for target field ${rule.targetDataFieldId}`);
    /*
     validate the rule
     1. does the rule have a comparison field or static for each condition?
     2. do the fields exist?
     3. are the comparisons valid types to compare?
    */

    let targetField = form.getFieldFromDataFieldId(rule.targetDataFieldId);

    if (!targetField) {
      flogger(`Rule not added for form ${form.getId()} for target field ${rule.targetDataFieldId} - NOT FOUND in form`);
      return false;
    }

    let convertedRule = {
      formMode: rule.formMode,
      targetField: targetField,
      response: rule.response,
      conditions: [],
      multipleConditionLogic: _ValidationTypeDefs__WEBPACK_IMPORTED_MODULE_0__.MultipleConditionLogic.failIfAnyConditionFails //fieldConditions: [],
      //valueConditions: []

    };

    if (rule.multipleConditionLogic) {
      convertedRule.multipleConditionLogic = rule.multipleConditionLogic;
    }

    rule.conditions.forEach(condition => {
      // do we have one of values or source field?
      if (!condition.values && !condition.sourceDataFieldId) {
        flogger(`Rule not added for form ${form.getId()} for target field ${rule.targetDataFieldId} - a condition is missing both values and source field`);
        return false;
      } // is this a target field value comparison?


      if (condition.values && condition.sourceDataFieldId) {
        logger(`Rule adding for form ${form.getId()} for target field ${rule.targetDataFieldId} - source field ${condition.sourceDataFieldId} with values ${condition.values}`);
        let sourceField = form.getFieldFromDataFieldId(condition.sourceDataFieldId);

        if (!sourceField) {
          flogger(`Rule not added for form ${form.getId()} for target field ${rule.targetDataFieldId} - source field ${condition.sourceDataFieldId} NOT FOUND`);
          return false;
        } //                convertedRule.fieldConditions.push({


        convertedRule.conditions.push({
          sourceField: sourceField,
          comparison: condition.comparison,
          values: condition.values
        });
        sourceField.addFieldListener(this);
      } else if (condition.values && !condition.sourceDataFieldId) {
        // is this a value comparison?
        logger(`Rule adding for form ${form.getId()} for target field ${rule.targetDataFieldId} - values ${condition.values}`); // add a new value rule to the internal structure
        // convertedRule.valueConditions.push({values: condition.values, comparison: condition.comparison});

        convertedRule.conditions.push({
          values: condition.values,
          comparison: condition.comparison
        });
        if (targetField) targetField.addFieldListener(this);
      } else if (condition.sourceDataFieldId && !condition.values) {
        // is this a field vs field comparison
        logger(`Rule adding for form ${form.getId()} for target field ${rule.targetDataFieldId} - source field ${condition.sourceDataFieldId}`);
        let sourceField = form.getFieldFromDataFieldId(condition.sourceDataFieldId);

        if (!sourceField) {
          flogger(`Rule not added for form ${form.getId()} for target field ${rule.targetDataFieldId} - source field ${condition.sourceDataFieldId} NOT FOUND`);
          return false;
        }
        /*
           are we comparing two fields that can be compared?
           allowed combinations are:
           date|datetime vs date|datetime
           time|short time vs time|short time
           boolean vs boolean
           integer|float vs number|float
           any other vs any other
         */


        let sourceType = sourceField.getFieldDefinition().type; // @ts-ignore

        let targetType = targetField.getFieldDefinition().type;

        switch (targetType) {
          case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.date:
          case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.datetime:
            {
              if (sourceType !== _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.datetime && sourceType !== _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.date) {
                flogger(`Rule not added for form ${form.getId()} for target field ${rule.targetDataFieldId} - target is date(time), source is NOT`);
                return false;
              }

              break;
            }

          case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.time:
          case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.shortTime:
            {
              if (sourceType !== _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.time && sourceType !== _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.shortTime) {
                flogger(`Rule not added for form ${form.getId()} for target field ${rule.targetDataFieldId} - target is time, source is NOT`);
                return false;
              }

              break;
            }

          case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.boolean:
            {
              if (sourceType !== _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.boolean) {
                flogger(`Rule not added for form ${form.getId()} for target field ${rule.targetDataFieldId} - target is boolean, source is NOT`);
                return false;
              }

              break;
            }

          case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.integer:
          case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.float:
            {
              if (sourceType !== _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.integer && sourceType !== _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.float) {
                flogger(`Rule not added for form ${form.getId()} for target field ${rule.targetDataFieldId} - target is number, source is NOT`);
                return false;
              }

              break;
            }
        } // convertedRule.fieldConditions.push({sourceField: sourceField, comparison: condition.comparison});


        convertedRule.conditions.push({
          sourceField: sourceField,
          comparison: condition.comparison
        });
        sourceField.addFieldListener(this);
      }
    });
    logger(`Converted rule to `);
    logger(convertedRule);
    let index = this.formRules.findIndex(formRule => formRule.form.getId() === form.getId());
    let formRuleSet; // store the rules for later execution

    if (index < 0) {
      formRuleSet = {
        form: form,
        rules: []
      };
      formRuleSet.rules.push(convertedRule);
      this.formRules.push(formRuleSet);
    } else {
      formRuleSet = this.formRules[index];
      formRuleSet.rules.push(convertedRule);
    }

    logger(`Current set of rules for form ${form.getId()}`);
    logger(formRuleSet);
    return true;
  }

  failedValidation(form, field, currentValue, message) {} // ignored, we might be causing


  applyRulesToTargetField(form, formMode, field, onlyRulesOfType) {
    logger(`Checking rules for form ${form.getId()}, data field ${field.id} of type ${onlyRulesOfType}`); // which rules apply?

    let rules = this.getRulesForFieldChange(form, field.id, false);
    let result = {
      ruleFailed: false
    }; // get the rules for the field, filtered by the condition response type

    if (onlyRulesOfType) {
      logger(`Only validating rules of type ${onlyRulesOfType}`);
      let ruleSubset = [];
      rules.forEach(rule => {
        if (rule.response === onlyRulesOfType) {
          ruleSubset.push(rule);
        }
      });
      rules = ruleSubset;
    }

    rules.forEach(rule => {
      let response = this.executeRule(rule);

      if (response.ruleFailed) {
        flogger(`Rule failed for form ${form.getId()} with field ${field.displayName} with message ${response.message}`);
        result.ruleFailed = true;
        result.message = response.message;
      }
    }); // if we haven't failed yet and we have validators

    this.formValidators.forEach(validator => {
      let ruleCheck = validator.applyRulesToTargetField(form, formMode, field, onlyRulesOfType);

      if (ruleCheck.ruleFailed) {
        flogger(`FormFieldValidator - Rule failed for form ${form.getId()} with field ${field.displayName} with message ${ruleCheck.message}`);
        result.ruleFailed = true;
        result.message = ruleCheck.message;
      }
    });
    return result;
  }

  valueChanged(form, field, fieldDef, newValue) {
    logger(`Handling field change - form ${form}, data field ${fieldDef.id}, value ${newValue}`); // a field we are listening to has changed
    // which rules apply?

    const rules = this.getRulesForFieldChange(form, fieldDef.id, true); // execute each rule and collect the responses

    let failedResponses = [];
    rules.forEach(rule => {
      let response = this.executeRule(rule);

      if (response.ruleFailed) {
        failedResponses.push(response);
      }
    });
    logger(`Have ${failedResponses.length} failed rules - applying each`); // for each failed response let the target field know based on the response type

    failedResponses.forEach(response => {
      switch (response.response) {
        case _ValidationTypeDefs__WEBPACK_IMPORTED_MODULE_0__.ConditionResponse.hide:
          {
            logger(`Apply hide ${response.field.getId()}`);
            response.field.hide();
            break;
          }

        case _ValidationTypeDefs__WEBPACK_IMPORTED_MODULE_0__.ConditionResponse.show:
          {
            logger(`Apply show ${response.field.getId()}`);
            response.field.show();
            break;
          }

        case _ValidationTypeDefs__WEBPACK_IMPORTED_MODULE_0__.ConditionResponse.invalid:
          {
            logger(`Apply invalid ${response.field.getId()}`);
            if (response.message) response.field.setInvalid(response.message);
            break;
          }

        case _ValidationTypeDefs__WEBPACK_IMPORTED_MODULE_0__.ConditionResponse.valid:
          {
            logger(`Apply valid ${response.field.getId()}`);
            response.field.setValid();
            break;
          }
      }
    });
  }

  executeRule(rule) {
    let response = {
      field: rule.targetField,
      ruleFailed: false,
      response: rule.response
    }; // run each field comparison

    erLogger(`Executing rule with response ${rule.response} for target ${rule.targetField.getId()}`);
    erLogger(rule);
    let ruleChecks = [];
    rule.conditions.forEach(condition => {
      erLogger('condition rule');
      erLogger(condition);
      let values = condition.values ? condition.values : '';
      let ruleCheck;

      if (condition.sourceField) {
        erLogger('condition rule - source field present');
        ruleCheck = _ValidationHelperFunctions__WEBPACK_IMPORTED_MODULE_4__.ValidationHelperFunctions.getInstance().compareFields(rule.targetField, condition.sourceField, condition.comparison, values);
      } else {
        erLogger(`condition rule - target field value check - ${values}`);
        ruleCheck = _ValidationHelperFunctions__WEBPACK_IMPORTED_MODULE_4__.ValidationHelperFunctions.getInstance().compareFieldWithValue(rule.targetField, condition.comparison, values);
      }

      ruleChecks.push(ruleCheck);

      if (ruleCheck.ruleFailed) {
        flogger('condition rule FAILED');
      } else {
        flogger('condition rule PASSED');
      }
    }); // are we dealing with one rule check or multiple?

    if (ruleChecks.length === 1) {
      flogger(`Single rule check - rule failed? ${ruleChecks[0].ruleFailed}`);
      response.message = ruleChecks[0].message;
      response.ruleFailed = ruleChecks[0].ruleFailed;
    } else {
      let errorMessageBuffer = '';
      let failedRuleChecks = [];
      ruleChecks.forEach((ruleCheck, index) => {
        if (ruleCheck.ruleFailed) {
          ruleCheck.index = index;
          failedRuleChecks.push(ruleCheck);
          errorMessageBuffer += ruleCheck.message + ', ';
        }
      });

      if (errorMessageBuffer.length > 0) {
        errorMessageBuffer = errorMessageBuffer.substr(0, errorMessageBuffer.length - 2);
      }

      merLogger(`Multiple rule check - number of failures ${failedRuleChecks.length} with message ${errorMessageBuffer}`);

      switch (rule.multipleConditionLogic) {
        case _ValidationTypeDefs__WEBPACK_IMPORTED_MODULE_0__.MultipleConditionLogic.failIfAnyConditionFails:
          {
            if (failedRuleChecks.length > 0) {
              flogger(`Multiple rule check - when any conditions fail - rule FAILED`);
              merLogger(`Multiple rule check - when any conditions fail - rule FAILED`);
              response.message = errorMessageBuffer;
              response.ruleFailed = true;
            }

            break;
          }

        case _ValidationTypeDefs__WEBPACK_IMPORTED_MODULE_0__.MultipleConditionLogic.onlyFailIfAllConditionsFail:
          {
            if (failedRuleChecks.length === ruleChecks.length) {
              flogger(`Multiple rule check - when all conditions fail - rule FAILED`);
              merLogger(`Multiple rule check - when all conditions fail - rule FAILED`);
              response.ruleFailed = true;
              response.message = errorMessageBuffer;
            }

            break;
          }

        case _ValidationTypeDefs__WEBPACK_IMPORTED_MODULE_0__.MultipleConditionLogic.failWhenTheNextInSequenceFails:
          {
            if (failedRuleChecks.length > 0) {
              flogger(`Multiple rule check - when next in sequence fails - rule FAILED`);
              merLogger(`Multiple rule check - when next in sequence fails - rule FAILED`);
              response.message = errorMessageBuffer;
              response.ruleFailed = true;
            }

            break;
          }

        case _ValidationTypeDefs__WEBPACK_IMPORTED_MODULE_0__.MultipleConditionLogic.whenAllConditionsFailRuleShouldNotBeApplied:
          {
            if (failedRuleChecks.length === ruleChecks.length || failedRuleChecks.length === 0) {
              merLogger(`Multiple rule check - when all fail rule does not apply - rule PASSED`);
              response.ruleFailed = false;
              response.message = errorMessageBuffer;
            } else {
              flogger(`Multiple rule check - when all fail rule does not apply - rule FAILED`);
              merLogger(`Multiple rule check - when all fail rule does not apply - rule FAILED`);
              response.ruleFailed = true;
              response.message = errorMessageBuffer;
            }

            break;
          }

        case _ValidationTypeDefs__WEBPACK_IMPORTED_MODULE_0__.MultipleConditionLogic.failOnlyIfFinalConditionIsAFailAndPreviousConditionsAreNotFails:
          {
            if (failedRuleChecks.length === 1) {
              const failedRuleIndex = failedRuleChecks[0].index; // is this the last rule in the chain of conditions?

              if (failedRuleIndex === ruleChecks.length - 1) {
                flogger(`Multiple rule check - only if final is a fail, others are not fails - rule FAILED`);
                merLogger(`Multiple rule check - only if final is a fail, others are not fails - rule FAILED`);
                response.message = errorMessageBuffer;
                response.ruleFailed = true;
              }
            }

            break;
          }
      }
    } // for show and hide rules, we want the opposite effect (i.e. a success on conditions show cause the action)


    if (response.response === _ValidationTypeDefs__WEBPACK_IMPORTED_MODULE_0__.ConditionResponse.hide || response.response === _ValidationTypeDefs__WEBPACK_IMPORTED_MODULE_0__.ConditionResponse.show) {
      response.ruleFailed = !response.ruleFailed;
      erLogger(`Changing show/hide rule result to opposite boolean value to cause activation if the conditions were PASSED`);
    }

    return response;
  }

  getRulesForFieldChange(form, dataFieldId, includeSourceFields) {
    let rules = [];
    const formMode = form.getFormMode(); // lets go through the rules for the form

    logger(`Finding rules for form ${form} and data field ${dataFieldId}`);
    let index = this.formRules.findIndex(formRule => formRule.form.getId() === form.getId());

    if (index >= 0) {
      const ruleSet = this.formRules[index]; // the dataFieldId could be the target or one of the sources

      ruleSet.rules.forEach(rule => {
        // check the rule applies to the current form mode
        const ruleFormMode = rule.formMode;
        logger(`Rule applies to mode ${ruleFormMode} (any? ${ruleFormMode === _FormUITypeDefs__WEBPACK_IMPORTED_MODULE_3__.FormMode.any}) and current form mode is ${formMode}`);

        if (ruleFormMode === _FormUITypeDefs__WEBPACK_IMPORTED_MODULE_3__.FormMode.any || ruleFormMode === formMode) {
          if (rule.targetField.getId() === dataFieldId) {
            logger(`Found rule where data field ${dataFieldId} is target`);

            if (rule.targetField.isValid()) {
              rules.push(rule);
            } else {
              flogger(`Found rule where data field ${dataFieldId} is target but value is not currently valid`);
            }
          } else {
            if (includeSourceFields) {
              // rule.fieldConditions.every((value: { sourceField: Field, comparison: ComparisonType }) => {
              rule.conditions.forEach(condition => {
                if (condition.sourceField) {
                  if (condition.sourceField.getId() === dataFieldId) {
                    logger(`Found rule where data field ${dataFieldId} is source`);

                    if (condition.sourceField.isValid()) {
                      rules.push(rule);
                    } else {
                      flogger(`Found rule where data field ${dataFieldId} is source but value is not currently valid`);
                    }
                  }
                }
              });
            }
          }
        }
      });
    }

    return rules;
  }

}

/***/ }),

/***/ "./src/framework/ui/form/validation/ValidationTypeDefs.ts":
/*!****************************************************************!*\
  !*** ./src/framework/ui/form/validation/ValidationTypeDefs.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConditionResponse": () => (/* binding */ ConditionResponse),
/* harmony export */   "MultipleConditionLogic": () => (/* binding */ MultipleConditionLogic)
/* harmony export */ });
let ConditionResponse;

(function (ConditionResponse) {
  ConditionResponse[ConditionResponse["show"] = 0] = "show";
  ConditionResponse[ConditionResponse["hide"] = 1] = "hide";
  ConditionResponse[ConditionResponse["invalid"] = 2] = "invalid";
  ConditionResponse[ConditionResponse["valid"] = 3] = "valid";
})(ConditionResponse || (ConditionResponse = {}));

let MultipleConditionLogic;

(function (MultipleConditionLogic) {
  MultipleConditionLogic[MultipleConditionLogic["onlyFailIfAllConditionsFail"] = 0] = "onlyFailIfAllConditionsFail";
  MultipleConditionLogic[MultipleConditionLogic["failIfAnyConditionFails"] = 1] = "failIfAnyConditionFails";
  MultipleConditionLogic[MultipleConditionLogic["failWhenTheNextInSequenceFails"] = 2] = "failWhenTheNextInSequenceFails";
  MultipleConditionLogic[MultipleConditionLogic["whenAllConditionsFailRuleShouldNotBeApplied"] = 3] = "whenAllConditionsFailRuleShouldNotBeApplied";
  MultipleConditionLogic[MultipleConditionLogic["failOnlyIfFinalConditionIsAFailAndPreviousConditionsAreNotFails"] = 4] = "failOnlyIfFinalConditionIsAFailAndPreviousConditionsAreNotFails";
})(MultipleConditionLogic || (MultipleConditionLogic = {}));

/***/ }),

/***/ "./src/framework/ui/helper/BootstrapFormConfigHelper.ts":
/*!**************************************************************!*\
  !*** ./src/framework/ui/helper/BootstrapFormConfigHelper.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BootstrapFormConfigHelper": () => (/* binding */ BootstrapFormConfigHelper)
/* harmony export */ });
/* harmony import */ var _model_BasicFieldOperations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../model/BasicFieldOperations */ "./src/framework/model/BasicFieldOperations.ts");
/* harmony import */ var _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../model/DataObjectTypeDefs */ "./src/framework/model/DataObjectTypeDefs.ts");
/* harmony import */ var _form_FormUITypeDefs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../form/FormUITypeDefs */ "./src/framework/ui/form/FormUITypeDefs.ts");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _RBGFieldOperations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./RBGFieldOperations */ "./src/framework/ui/helper/RBGFieldOperations.ts");
/* harmony import */ var _model_BasicObjectDefinitionFactory__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../model/BasicObjectDefinitionFactory */ "./src/framework/model/BasicObjectDefinitionFactory.ts");
/* harmony import */ var _ColourEditor__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ColourEditor */ "./src/framework/ui/helper/ColourEditor.ts");







const logger = debug__WEBPACK_IMPORTED_MODULE_3___default()('bootstrap-form-config-helper');
class BootstrapFormConfigHelper {
  static COLOUR_PICKER_CONTAINER = 'framework-colour-picker-container';

  constructor() {}

  static getInstance() {
    if (!BootstrapFormConfigHelper._instance) {
      BootstrapFormConfigHelper._instance = new BootstrapFormConfigHelper();
    }

    return BootstrapFormConfigHelper._instance;
  }

  generateFormConfig(dataObjDef, displayOrders, hasDeleteButton, hideModifierFields = false, hasExternalControl = false) {
    let fieldOperations = new _model_BasicFieldOperations__WEBPACK_IMPORTED_MODULE_0__.BasicFieldOperations();
    let rbgFieldOperation = new _RBGFieldOperations__WEBPACK_IMPORTED_MODULE_4__.RBGFieldOperations(); // create the Field UI config for each field

    let fieldUIConfigs = [];
    dataObjDef.fields.forEach((fieldDef, index) => {
      let fieldType = _form_FormUITypeDefs__WEBPACK_IMPORTED_MODULE_2__.UIFieldType.text;

      switch (fieldDef.type) {
        case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.time:
        case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.text:
        case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.date:
        case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.shortTime:
        case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.colour:
        case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.duration:
          {
            break;
          }

        case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.datetime:
          {
            // is this the created or modified date
            if (hideModifierFields) {
              if (fieldDef.id === _model_BasicObjectDefinitionFactory__WEBPACK_IMPORTED_MODULE_5__.FIELD_CreatedOn) {
                fieldType = _form_FormUITypeDefs__WEBPACK_IMPORTED_MODULE_2__.UIFieldType.hidden;
              }

              if (fieldDef.id === _model_BasicObjectDefinitionFactory__WEBPACK_IMPORTED_MODULE_5__.FIELD_ModifiedOn) {
                fieldType = _form_FormUITypeDefs__WEBPACK_IMPORTED_MODULE_2__.UIFieldType.hidden;
              }
            }

            break;
          }

        case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.userId:
          {
            if (hideModifierFields) {
              fieldType = _form_FormUITypeDefs__WEBPACK_IMPORTED_MODULE_2__.UIFieldType.hidden;
            } else {
              fieldType = _form_FormUITypeDefs__WEBPACK_IMPORTED_MODULE_2__.UIFieldType.text;
            }

            break;
          }

        case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.uuid:
        case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.id:
          {
            fieldType = _form_FormUITypeDefs__WEBPACK_IMPORTED_MODULE_2__.UIFieldType.hidden;
            break;
          }

        case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.integer:
        case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.float:
          {
            fieldType = _form_FormUITypeDefs__WEBPACK_IMPORTED_MODULE_2__.UIFieldType.number;
            break;
          }

        case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.email:
          {
            fieldType = _form_FormUITypeDefs__WEBPACK_IMPORTED_MODULE_2__.UIFieldType.email;
            break;
          }

        case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.password:
          {
            fieldType = _form_FormUITypeDefs__WEBPACK_IMPORTED_MODULE_2__.UIFieldType.password;
            break;
          }

        case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.boolean:
          {
            fieldType = _form_FormUITypeDefs__WEBPACK_IMPORTED_MODULE_2__.UIFieldType.checkbox;
            break;
          }

        case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.largeText:
          {
            fieldType = _form_FormUITypeDefs__WEBPACK_IMPORTED_MODULE_2__.UIFieldType.textarea;
            break;
          }

        case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.choice:
          {
            fieldType = _form_FormUITypeDefs__WEBPACK_IMPORTED_MODULE_2__.UIFieldType.select;
            break;
          }

        case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.limitedChoice:
          {
            fieldType = _form_FormUITypeDefs__WEBPACK_IMPORTED_MODULE_2__.UIFieldType.radioGroup;
            break;
          }
      } // see if the field was supplied with a display order


      const displayOrder = displayOrders.find(value => value.fieldId === fieldDef.id);
      let displayOrderValue = index;

      if (displayOrder) {
        displayOrderValue = displayOrder.displayOrder;
      } // construct the field ui config


      let fieldUIConfig = {
        field: fieldDef,
        displayOrder: displayOrderValue,
        elementType: fieldType,
        elementClasses: 'form-control col-sm-9',
        renderer: fieldOperations,
        formatter: fieldOperations,
        getValue: _form_FormUITypeDefs__WEBPACK_IMPORTED_MODULE_2__.defaultGetValue
      };

      if (fieldDef.type !== _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.id && fieldDef.type !== _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.uuid && fieldType !== _form_FormUITypeDefs__WEBPACK_IMPORTED_MODULE_2__.UIFieldType.hidden) {
        // no labels, descriptions, container for id,uuid
        fieldUIConfig.containedBy = {
          type: 'div',
          classes: 'form-group row'
        };
        fieldUIConfig.label = {
          label: fieldDef.displayName,
          classes: 'col-md-12 col-lg-3 col-form-label'
        };

        if (fieldDef.description) {
          // descriptions if the field has one
          fieldUIConfig.describedBy = {
            message: fieldDef.description,
            elementType: 'small',
            elementClasses: 'text-muted col-md-12 col-lg-9 offset-lg-3 mt-1'
          };
        }

        if (!fieldDef.displayOnly) {
          // no validator for readonly items
          fieldUIConfig.validator = {
            validator: fieldOperations,
            messageDisplay: {
              type: 'div',
              classes: 'invalid-feedback col-md-12 col-lg-9 offset-lg-3'
            },
            validClasses: 'is-valid',
            invalidClasses: 'is-invalid'
          };
        }
      } // text areas


      if (fieldDef.type === _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.largeText) {
        fieldUIConfig.textarea = {
          rows: 5,
          cols: 20
        };
      } // select


      if (fieldDef.type === _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.choice) {
        // subelements are options, with no classes, no labels, and no other container
        fieldUIConfig.subElement = {
          element: {
            type: 'option',
            classes: ''
          }
        };
        fieldUIConfig.datasource = fieldDef.dataSource;
      } // radio button group


      if (fieldDef.type === _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.limitedChoice) {
        fieldUIConfig.subElement = {
          element: {
            type: 'input',
            classes: 'form-check-input',
            attributes: [{
              name: 'type',
              value: 'radio'
            }]
          },
          container: {
            type: 'div',
            classes: 'form-check form-check-inline'
          },
          label: {
            label: 'label',
            classes: 'form-check-label'
          }
        };
        fieldUIConfig.renderer = rbgFieldOperation;
        if (fieldUIConfig.validator) fieldUIConfig.validator.validator = rbgFieldOperation;
        fieldUIConfig.formatter = rbgFieldOperation;
        fieldUIConfig.datasource = fieldDef.dataSource;
      }

      if (fieldDef.type === _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.colour) {
        fieldUIConfig.editor = new _ColourEditor__WEBPACK_IMPORTED_MODULE_6__.ColourEditor(BootstrapFormConfigHelper.COLOUR_PICKER_CONTAINER);
      }

      fieldUIConfigs.push(fieldUIConfig);
    }); // create a form with a single group and button container with Bootstrap styles

    const fieldGroup = {
      containedBy: {
        type: 'div',
        classes: 'col-sm-12'
      },
      fields: fieldUIConfigs
    };
    const formConfig = {
      id: dataObjDef.id,
      displayName: dataObjDef.displayName,
      fieldGroups: [fieldGroup],
      unsavedChanges: {
        type: 'div',
        classes: 'invalid-feedback text-right col-md-12 col-lg-9 offset-lg-3',
        attributes: [{
          name: 'style',
          value: 'display:block'
        }],
        innerHTML: `Pending changes to ${dataObjDef.displayName}`
      }
    };

    if (!hasExternalControl) {
      formConfig.buttonsContainedBy = {
        type: 'div',
        classes: 'd-flex w-100 justify-space-between'
      };
      formConfig.cancelButton = {
        text: 'Cancel  ',
        classes: 'btn-info rounded p-1 mr-2 mt-2 w-100',
        iconClasses: 'fas fa-ban'
      };
      formConfig.submitButton = {
        text: 'Save  ',
        classes: 'btn-primary rounded p-1 mt-2 w-100',
        iconClasses: 'fas fa-save'
      };
      formConfig.activeSave = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>&nbsp;';
    } // sort the fields into display order


    formConfig.fieldGroups.forEach(group => {
      group.fields.sort((a, b) => {
        return a.displayOrder - b.displayOrder;
      });
    });

    if (hasDeleteButton && !hasExternalControl) {
      formConfig.deleteButton = {
        text: 'Delete  ',
        classes: 'btn-warning rounded p-1 mr-2 mt-2 w-100',
        iconClasses: 'fas fa-trash-alt'
      };
    }

    logger(formConfig);
    return formConfig;
  }

  getElementIdForDataFieldId(fieldId) {
    return undefined;
  }

}

/***/ }),

/***/ "./src/framework/ui/helper/ColourEditor.ts":
/*!*************************************************!*\
  !*** ./src/framework/ui/helper/ColourEditor.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ColourEditor": () => (/* binding */ ColourEditor)
/* harmony export */ });
/* harmony import */ var _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util/BrowserUtil */ "./src/framework/util/BrowserUtil.ts");

class ColourEditor {
  field = null;
  container = null;

  constructor(colourPickerContainerId) {
    this.colourPickerContainerId = colourPickerContainerId;
    this.editValue = this.editValue.bind(this);
    this.cbColourChange = this.cbColourChange.bind(this);
    this.container = document.getElementById(this.colourPickerContainerId);

    if (this.container) {
      _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(this.container, 'd-none');
      $(this.container).farbtastic(this.cbColourChange);
    }
  }

  editCompleted(field, fieldDef) {
    if (this.container) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(this.container, 'd-none');
  }

  editValue(field, fieldDef, currentValue) {
    this.field = field; // do we have a valid value?

    if (/^#[0-9a-f]{6}$/.test(currentValue) && this.container) {
      $.farbtastic(this.container).setColor(currentValue);
    }

    if (field && this.container) {
      let element = field.getElement();
      let offset = (0,_util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__.getElementOffset)(element);
      offset.top += element.offsetHeight;
      _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].removeAttributes(this.container, ['style']);
      _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addAttributes(this.container, [{
        name: 'style',
        value: `top:${offset.top}px; left: ${offset.left}px;`
      }]);
      _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(this.container, 'd-none', false);
    }

    return currentValue;
  }

  cbColourChange(colour) {
    if (/^#[0-9a-f]{6}$/.test(colour)) {
      if (this.field) this.field.setValue(colour);
      if (this.container) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(this.container, 'd-none', true);
    }
  }

}

/***/ }),

/***/ "./src/framework/ui/helper/LinkedCollectionDetailController.ts":
/*!*********************************************************************!*\
  !*** ./src/framework/ui/helper/LinkedCollectionDetailController.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ChangeDataObjectDelegate": () => (/* binding */ ChangeDataObjectDelegate),
/* harmony export */   "LinkedCollectionDetailController": () => (/* binding */ LinkedCollectionDetailController)
/* harmony export */ });
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _model_DataObjectController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../model/DataObjectController */ "./src/framework/model/DataObjectController.ts");
/* harmony import */ var _alert_AlertListener__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../alert/AlertListener */ "./src/framework/ui/alert/AlertListener.ts");
/* harmony import */ var _alert_AlertManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../alert/AlertManager */ "./src/framework/ui/alert/AlertManager.ts");




const logger = debug__WEBPACK_IMPORTED_MODULE_0___default()('linked-controller');
const dlogger = debug__WEBPACK_IMPORTED_MODULE_0___default()('linked-controller-detail');

class ChildViewListenerDelegate {
  constructor(controller) {
    this.controller = controller;
  }

  addView(view) {
    view.addEventListener(this);
  }

  canDeleteItem(view, selectedItem) {
    return true;
  }

  documentLoaded(view) {}

  hideRequested(view) {}

  itemAction(view, actionName, selectedItem) {}

  itemDeleted(view, selectedItem) {}

  itemDropped(view, droppedItem) {}

  showRequested(view) {}

  cancelled(view, dataObj) {
    this.controller.cancelled(view, dataObj);
  }

  deletedItem(view, dataObj) {
    this.controller.deletedItem(view, dataObj);
  }

  saveNewItem(view, dataObj) {
    this.controller.saveNewItem(view, dataObj);
  }

  updateItem(view, dataObj) {
    this.controller.updateItem(view, dataObj);
  }

}

class ChangeDataObjectDelegate {
  constructor(callback) {
    this.callback = callback;
  }

  shouldDiscardChanges() {
    _alert_AlertManager__WEBPACK_IMPORTED_MODULE_3__.AlertManager.getInstance().startAlert(this, 'Discard Changes', 'There are unsaved changes.  Discard?', {});
  }

  completed(event) {
    if (event.outcome === _alert_AlertListener__WEBPACK_IMPORTED_MODULE_2__.AlertType.confirmed) {
      this.callback();
    }
  }

}
class LinkedCollectionDetailController extends _model_DataObjectController__WEBPACK_IMPORTED_MODULE_1__.DataObjectController {
  children = [];

  constructor(typeName, parentView) {
    super(typeName);
    logger(`Starting with parent view ${parentView.getName()}`);
    this.parentView = parentView;
    this.delegate = new ChildViewListenerDelegate(this);
    this.parentView.addEventListener(this);
  }

  addLinkedDetailView(childView) {
    logger(`Adding child view ${childView.getName()}`);
    this.children.push(childView);
    this.delegate.addView(childView); // this delegate will only pass us the unique detail view events (save, new, etc)
  }

  initialise() {// call when all views are ready
  }

  canDeleteItem(view, selectedItem) {
    logger(`Handling delete item from view ${view.getName()}`);
    dlogger(selectedItem);
    return this.parentView.hasPermissionToDeleteItemInNamedCollection('', selectedItem);
  }

  documentLoaded(view) {
    logger(`Handling document loaded view ${view.getName()}`); // let the children know

    this.children.forEach(childView => {
      childView.onDocumentLoaded();
    });
  }

  hideRequested(view) {
    // let the children know
    logger(`Handling hide  from view ${view.getName()}`);
    this.children.forEach(childView => {
      childView.hidden();
    });
  }

  itemAction(view, actionName, selectedItem) {
    logger(`Handling item action ${actionName} from view ${view.getName()}`);
    dlogger(selectedItem);
    this.children.forEach(childView => {
      childView.handleActionItem(actionName, selectedItem);
    });
  }

  itemDeleted(view, selectedItem) {
    logger(`Handling item deleted from view ${view.getName()}`);
    dlogger(selectedItem);
    this.children.forEach(childView => {
      // clear the child display and set readonly
      childView.clearDisplay();
      childView.setReadOnly();
    });
  }

  itemDeselected(view, selectedItem) {
    logger(`Handling item deselected from view ${view.getName()}`);
    dlogger(selectedItem);
    this.children.forEach(childView => {
      // clear the child display and set readonly
      childView.clearDisplay();
      childView.setReadOnly();
    });
  }

  itemDragStarted(view, selectedItem) {// nothing to do here
  }

  itemDropped(view, droppedItem) {// nothing to do here
  }

  itemSelected(view, selectedItem) {
    logger(`Handling item selected from view ${view.getName()}`);
    dlogger(selectedItem);
    this.children.forEach(childView => {
      childView.displayItem(selectedItem);
    });
  }

  showRequested(view) {
    logger(`Handling show from view ${view.getName()}`); // let the children know

    this.children.forEach(childView => {
      childView.show();
    });
  }

  canSelectItem(view, selectedItem) {
    logger(`Handling can select item from view ${view.getName()}`);
    dlogger(selectedItem); // are we currently in the middle of creating a new object?

    if (this.isCreatingNew) return false; // prevent selection if the children views have modified this item

    let canProceedWithSelection = true;
    this.children.forEach(childView => {
      if (childView.hasChanged()) {
        dlogger(`child view ${childView.getName()} has changed - cancelling`);
        canProceedWithSelection = false;
      }
    });

    if (!canProceedWithSelection) {
      canProceedWithSelection = confirm(`${view.getName()} - unsaved changes.  Discard them?`);
    }

    return canProceedWithSelection;
  }

  cancelled(view, dataObj) {
    logger(`Handling cancelled from child view ${view.getName()}`);
    dlogger(dataObj);
    this.isCreatingNew = false;
  }

  deletedItem(view, dataObj) {
    logger(`Handling deleted from child view ${view.getName()}`);
    dlogger(dataObj);
    this.informListenersOfDelete(dataObj);
  }

  saveNewItem(view, dataObj) {
    logger(`Handling save new from child view ${view.getName()}`);
    dlogger(dataObj);
    this.informListenersOfCreate(dataObj);
  }

  updateItem(view, dataObj) {
    logger(`Handling update from child view ${view.getName()}`);
    dlogger(dataObj);
    this.informListenersOfUpdate(dataObj);
  }

  _startNewObject() {
    logger(`Handling start new object`); // assume the first detail view will create the object for us

    let canProceedWithCreateNew = true;
    this.children.forEach(childView => {
      if (childView.hasChanged()) {
        dlogger(`child view ${childView.getName()} has changed - cancelling`);
        canProceedWithCreateNew = false;
      }
    });

    if (!canProceedWithCreateNew) {
      canProceedWithCreateNew = confirm(`There are unsaved changes.  Discard them?`);
    }

    if (this.children.length > 0) {
      logger(`Handling start new object with child view ${this.children[0].getName()}`);
      let dataObj = this.children[0].createItem();

      if (dataObj) {
        canProceedWithCreateNew = true;
        this.children[0].show();
      }
    }

    return canProceedWithCreateNew;
  }

}

/***/ }),

/***/ "./src/framework/ui/helper/RBGFieldOperations.ts":
/*!*******************************************************!*\
  !*** ./src/framework/ui/helper/RBGFieldOperations.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RBGFieldOperations": () => (/* binding */ RBGFieldOperations)
/* harmony export */ });
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ConfigurationTypes */ "./src/framework/ui/ConfigurationTypes.ts");


const flogger = debug__WEBPACK_IMPORTED_MODULE_0___default()('basic-field-operations-formatter');
const vlogger = debug__WEBPACK_IMPORTED_MODULE_0___default()('basic-field-operations-validator');
const glogger = debug__WEBPACK_IMPORTED_MODULE_0___default()('basic-field-operations-generator');
const rlogger = debug__WEBPACK_IMPORTED_MODULE_0___default()('basic-field-operations-renderer');
class RBGFieldOperations {
  radioButtons = [];

  constructor() {} // called when saving, change to final values


  formatValue(field, currentValue) {
    flogger(`Handling format value for RBG ${field.displayName} with value ${currentValue}`);
    let result = currentValue; // find the current selected radio button

    this.radioButtons.forEach(radioButton => {
      if (radioButton.checked) {
        result = radioButton.value;

        if (field.idType === _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.KeyType.number) {
          result = parseInt(result);
        }
      }
    });
    flogger(`Handling format value for field ${field.displayName} with value ${currentValue} - result is ${result}`);
    return result;
  }

  isValidValue(field, currentValue) {
    vlogger(`Handling is valid value for field ${field.displayName} with value ${currentValue}`);
    let response = {
      isValid: false,
      resetOnFailure: false
    }; // basics first, is the field mandatory?

    if (field.mandatory) {
      this.radioButtons.forEach(radioButton => {
        if (radioButton.checked) {
          response.isValid = true;
        }
      });

      if (!response.isValid) {
        response.message = `${field.displayName} is required. Please select one of the values.`;
        vlogger(`Handling is valid value for field ${field.displayName} with value ${currentValue} - is valid is ${response.isValid} with message ${response.message}`);
        return response;
      }
    } else {
      response.isValid = true;
    } // ok, so we have some content, we need to check if the value is a valid format with regular expressions


    vlogger(`Handling is valid value for field ${field.displayName} with value ${currentValue} - is valid is ${response.isValid} with message ${response.message}`);
    return response;
  }

  renderValue(field, fieldDef, currentValue) {
    rlogger(`Rendering value for field ${fieldDef.displayName} with new value ${currentValue}`);
    this.radioButtons.forEach(radioButton => {
      if (radioButton.value === currentValue) radioButton.checked = true;
    });
    return null;
  }

  generate(field, isCreate) {
    return '';
  }

  setSubElements(elements) {
    this.radioButtons = elements;
  }

}

/***/ }),

/***/ "./src/framework/ui/helper/SimpleValueDataSource.ts":
/*!**********************************************************!*\
  !*** ./src/framework/ui/helper/SimpleValueDataSource.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SimpleValueDataSource": () => (/* binding */ SimpleValueDataSource)
/* harmony export */ });
class SimpleValueDataSource {
  // static value list
  constructor(options) {
    this.options = options;
    this.listeners = [];
  }

  addValueOption(name, value) {
    this.options.push({
      name,
      value
    });
    this.listeners.forEach(listener => listener.optionsChanged(this.options));
  }

  addListener(listener) {
    this.listeners.push(listener);
  }

  getOptions() {
    return this.options;
  }

}

/***/ }),

/***/ "./src/framework/ui/view/delegate/CollectionViewEventHandlerDelegate.ts":
/*!******************************************************************************!*\
  !*** ./src/framework/ui/view/delegate/CollectionViewEventHandlerDelegate.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CollectionViewEventHandlerDelegate": () => (/* binding */ CollectionViewEventHandlerDelegate)
/* harmony export */ });
/* harmony import */ var _implementation_AbstractView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../implementation/AbstractView */ "./src/framework/ui/view/implementation/AbstractView.ts");
/* harmony import */ var _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../ConfigurationTypes */ "./src/framework/ui/ConfigurationTypes.ts");
/* harmony import */ var _alert_AlertManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../alert/AlertManager */ "./src/framework/ui/alert/AlertManager.ts");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _alert_AlertListener__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../alert/AlertListener */ "./src/framework/ui/alert/AlertListener.ts");





const logger = debug__WEBPACK_IMPORTED_MODULE_3___default()('collection-view-event-handler-delegate');
class CollectionViewEventHandlerDelegate {
  selectedItem = null;

  constructor(view, forwarder) {
    this.view = view;
    this.eventForwarder = forwarder; // event handlers

    this.eventStartDrag = this.eventStartDrag.bind(this);
    this.eventActionClicked = this.eventActionClicked.bind(this);
    this.eventClickItem = this.eventClickItem.bind(this);
    this.eventDeleteClickItem = this.eventDeleteClickItem.bind(this);
  }

  getDragData(event) {
    const context = this.getItemContext(event);
    let itemId = context.itemId;
    const dataSource = context.dataSource;

    if (this.view.getCollectionUIConfig().keyType === _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.KeyType.number) {
      // @ts-ignore
      itemId = parseInt(itemId);
    }

    logger(`view ${this.view.getName()}: Item with id ${itemId} getting drag data from ${dataSource}`);
    let compareWith = {}; // @ts-ignore

    compareWith[this.view.getCollectionUIConfig().keyId] = itemId;
    let selectedItem = {};
    selectedItem = this.view.getItemInNamedCollection(this.view.getCollectionName(), compareWith);

    if (selectedItem) {
      var _this$view$getCollect, _this$view$getCollect2; // @ts-ignore


      selectedItem[_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.DRAGGABLE_TYPE] = (_this$view$getCollect = this.view.getCollectionUIConfig().detail.drag) === null || _this$view$getCollect === void 0 ? void 0 : _this$view$getCollect.type; // @ts-ignore

      selectedItem[_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.DRAGGABLE_FROM] = (_this$view$getCollect2 = this.view.getCollectionUIConfig().detail.drag) === null || _this$view$getCollect2 === void 0 ? void 0 : _this$view$getCollect2.from;
    }

    return selectedItem;
  }

  eventStartDrag(event) {
    logger(`view ${this.view.getName()}: drag start`);
    logger(event.target);
    const data = JSON.stringify(this.getDragData(event));
    logger(data); // @ts-ignore

    event.dataTransfer.setData(_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.DRAGGABLE_KEY_ID, data);
    this.eventForwarder.itemDragStarted(this.view, data);
  }

  eventClickItem(event) {
    event.preventDefault();
    event.stopPropagation();
    const context = this.getItemContext(event);
    let itemId = context.itemId;
    const dataSource = context.dataSource;

    if (this.view.getCollectionUIConfig().keyType === _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.KeyType.number) {
      // @ts-ignore
      itemId = parseInt(itemId);
    }

    logger(`view ${this.view.getName()}: Item with id ${itemId} clicked from ${dataSource}`);
    let compareWith = {}; // @ts-ignore

    compareWith[this.view.getCollectionUIConfig().keyId] = itemId;
    logger(compareWith);
    let selectedItem = this.view.getItemInNamedCollection(this.view.getCollectionName(), compareWith);
    logger(selectedItem);

    if (selectedItem) {
      const shouldSelect = this.eventForwarder.canSelectItem(this.view, selectedItem);
      logger(`view ${this.view.getName()}: Item with id ${itemId} attempting selected from ${dataSource} - ${shouldSelect}`);

      if (shouldSelect) {
        this.selectedItem = selectedItem;
        logger(selectedItem);
        this.eventForwarder.itemSelected(this.view, selectedItem);
      }
    }
  }

  eventDeleteClickItem(event) {
    event.preventDefault();
    event.stopPropagation();
    const context = this.getItemContext(event);
    let itemId = context.itemId;
    const dataSource = context.dataSource;

    if (this.view.getCollectionUIConfig().keyType === _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.KeyType.number) {
      // @ts-ignore
      itemId = parseInt(itemId);
    }

    logger(`view ${this.view.getName()}: Item with id ${itemId} attempting delete from ${dataSource}`);
    let compareWith = {}; // @ts-ignore

    compareWith[this.view.getCollectionUIConfig().keyId] = itemId;
    logger(compareWith);
    let selectedItem = this.view.getItemInNamedCollection(this.view.getCollectionName(), compareWith);

    if (selectedItem) {
      const shouldDelete = this.eventForwarder.canDeleteItem(this.view, selectedItem);
      logger(`view ${this.view.getName()}: Item with id ${itemId} attempting delete from ${dataSource} - ${shouldDelete}`);

      if (shouldDelete) {
        // do we need to confirm?
        if (this.view.getCollectionUIConfig().detail.quickDelete) {
          this.selectedItem = null;
          this.eventForwarder.itemDeleted(this.view, selectedItem);
        } else {
          _alert_AlertManager__WEBPACK_IMPORTED_MODULE_2__.AlertManager.getInstance().startAlert(this, this.view.getName(), `Are you sure you want to delete this information?`, selectedItem);
        }
      }
    }
  }

  eventActionClicked(event) {
    event.preventDefault();
    event.stopPropagation();
    const context = this.getItemContext(event);
    let itemId = context.itemId;
    const dataSource = context.dataSource; // @ts-ignore

    const actionName = event.target.getAttribute(_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.EXTRA_ACTION_ATTRIBUTE_NAME);

    if (this.view.getCollectionUIConfig().keyType === _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.KeyType.number) {
      // @ts-ignore
      itemId = parseInt(itemId);
    }

    logger(`view ${this.view.getName()}: Item with id ${itemId} attempting action ${actionName} from ${dataSource}`);
    let compareWith = {}; // @ts-ignore

    compareWith[this.view.getCollectionUIConfig().keyId] = itemId;
    logger(compareWith);
    let selectedItem = this.view.getItemInNamedCollection(this.view.getCollectionName(), compareWith);

    if (selectedItem) {
      const shouldSelect = this.eventForwarder.canSelectItem(this.view, selectedItem);
      logger(`view ${this.view.getName()}: Item with id ${itemId} attempting action ${actionName} from ${dataSource} - ${shouldSelect}`);

      if (shouldSelect) {
        this.selectedItem = selectedItem;
        logger(selectedItem);
        this.eventForwarder.itemAction(this.view, actionName, selectedItem);
      }
    }
  }

  completed(event) {
    logger(event.context);

    if (event.outcome === _alert_AlertListener__WEBPACK_IMPORTED_MODULE_4__.AlertType.confirmed) {
      this.selectedItem = null;
      this.eventForwarder.itemDeleted(this.view, event.context);
    }
  }

  getItemContext(event) {
    // @ts-ignore
    const itemId = event.target.getAttribute(this.view.getCollectionUIConfig().keyId); // @ts-ignore

    const dataSource = event.target.getAttribute(_implementation_AbstractView__WEBPACK_IMPORTED_MODULE_0__.AbstractView.DATA_SOURCE);
    let context = {
      itemId: itemId,
      dataSource: dataSource
    };
    return context;
  }

}

/***/ }),

/***/ "./src/framework/ui/view/delegate/CollectionViewEventHandlerDelegateUsingContext.ts":
/*!******************************************************************************************!*\
  !*** ./src/framework/ui/view/delegate/CollectionViewEventHandlerDelegateUsingContext.ts ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CollectionViewEventHandlerDelegateUsingContext": () => (/* binding */ CollectionViewEventHandlerDelegateUsingContext)
/* harmony export */ });
/* harmony import */ var _CollectionViewEventHandlerDelegate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CollectionViewEventHandlerDelegate */ "./src/framework/ui/view/delegate/CollectionViewEventHandlerDelegate.ts");
/* harmony import */ var _context_ContextualInformationHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../context/ContextualInformationHelper */ "./src/framework/ui/context/ContextualInformationHelper.ts");


class CollectionViewEventHandlerDelegateUsingContext extends _CollectionViewEventHandlerDelegate__WEBPACK_IMPORTED_MODULE_0__.CollectionViewEventHandlerDelegate {
  constructor(view, forwarder) {
    super(view, forwarder);
  }

  getItemContext(event) {
    const contextDetail = _context_ContextualInformationHelper__WEBPACK_IMPORTED_MODULE_1__.ContextualInformationHelper.getInstance().findContextFromEvent(event);
    let context;

    if (contextDetail) {
      context = {
        itemId: contextDetail.identifier,
        dataSource: contextDetail.source
      };
    } else {
      context = {
        itemId: '',
        dataSource: this.view.getName()
      };
    }

    return context;
  }

}

/***/ }),

/***/ "./src/framework/ui/view/delegate/CollectionViewListenerForwarder.ts":
/*!***************************************************************************!*\
  !*** ./src/framework/ui/view/delegate/CollectionViewListenerForwarder.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CollectionViewListenerForwarder": () => (/* binding */ CollectionViewListenerForwarder)
/* harmony export */ });
/* harmony import */ var _ViewListenerForwarder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ViewListenerForwarder */ "./src/framework/ui/view/delegate/ViewListenerForwarder.ts");

class CollectionViewListenerForwarder extends _ViewListenerForwarder__WEBPACK_IMPORTED_MODULE_0__.ViewListenerForwarder {
  constructor() {
    super();
    this.collectionViewListeners = [];
  }

  addListener(listener) {
    super.addListener(listener);
    this.collectionViewListeners.push(listener);
  }

  itemDragStarted(view, selectedItem) {
    if (!this.suppressEventEmits) {
      this.collectionViewListeners.forEach(listener => listener.itemDragStarted(view, selectedItem));
    }
  }

  itemSelected(view, selectedItem) {
    if (!this.suppressEventEmits) {
      this.collectionViewListeners.forEach(listener => listener.itemSelected(view, selectedItem));
    }
  }

  itemDeselected(view, deselectedItem) {
    if (!this.suppressEventEmits) {
      this.collectionViewListeners.forEach(listener => listener.itemDeselected(view, deselectedItem));
    }
  }

  canSelectItem(view, selectedItem) {
    let result = true; // return false if cancelling delete

    if (!this.suppressEventEmits) {
      this.collectionViewListeners.forEach(listener => {
        if (!listener.canSelectItem(view, selectedItem)) {
          result = false;
        }
      });
    }

    return result;
  }

}

/***/ }),

/***/ "./src/framework/ui/view/delegate/DetailViewListenerForwarder.ts":
/*!***********************************************************************!*\
  !*** ./src/framework/ui/view/delegate/DetailViewListenerForwarder.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DetailViewListenerForwarder": () => (/* binding */ DetailViewListenerForwarder)
/* harmony export */ });
/* harmony import */ var _ViewListenerForwarder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ViewListenerForwarder */ "./src/framework/ui/view/delegate/ViewListenerForwarder.ts");

class DetailViewListenerForwarder extends _ViewListenerForwarder__WEBPACK_IMPORTED_MODULE_0__.ViewListenerForwarder {
  constructor() {
    super();
    this.detailViewListeners = [];
  }

  addListener(listener) {
    super.addListener(listener);
    this.detailViewListeners.push(listener);
  }

  saveNewItem(view, dataObj) {
    if (!this.suppressEventEmits) {
      this.detailViewListeners.forEach(listener => listener.saveNewItem(view, dataObj));
    }
  }

  updateItem(view, dataObj) {
    if (!this.suppressEventEmits) {
      this.detailViewListeners.forEach(listener => listener.updateItem(view, dataObj));
    }
  }

  deletedItem(view, dataObj) {
    if (!this.suppressEventEmits) {
      this.detailViewListeners.forEach(listener => listener.deletedItem(view, dataObj));
    }
  }

  cancelled(view, dataObj) {
    if (!this.suppressEventEmits) {
      this.detailViewListeners.forEach(listener => listener.cancelled(view, dataObj));
    }
  }

}

/***/ }),

/***/ "./src/framework/ui/view/delegate/ViewListenerForwarder.ts":
/*!*****************************************************************!*\
  !*** ./src/framework/ui/view/delegate/ViewListenerForwarder.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ViewListenerForwarder": () => (/* binding */ ViewListenerForwarder)
/* harmony export */ });
class ViewListenerForwarder {
  suppressEventEmits = false;

  constructor() {
    this.viewListeners = [];
  }

  addListener(listener) {
    this.viewListeners.push(listener);
  }

  suppressEvents() {
    this.suppressEventEmits = true;
  }

  emitEvents() {
    this.suppressEventEmits = false;
  }

  itemDeleted(view, selectedItem) {
    if (!this.suppressEventEmits) {
      this.viewListeners.forEach(listener => listener.itemDeleted(view, selectedItem));
    }
  }

  documentLoaded(view) {
    if (!this.suppressEventEmits) {
      this.viewListeners.forEach(listener => listener.documentLoaded(view));
    }
  }

  itemAction(view, actionName, selectedItem) {
    if (!this.suppressEventEmits) {
      this.viewListeners.forEach(listener => listener.itemAction(view, actionName, selectedItem));
    }
  }

  canDeleteItem(view, selectedItem) {
    let result = true; // return false if cancelling delete

    if (!this.suppressEventEmits) {
      this.viewListeners.forEach(listener => {
        if (!listener.canDeleteItem(view, selectedItem)) {
          result = false;
        }
      });
    }

    return result;
  }

  hideRequested(view) {
    if (!this.suppressEventEmits) {
      this.viewListeners.forEach(listener => listener.hideRequested(view));
    }
  }

  showRequested(view) {
    if (!this.suppressEventEmits) {
      this.viewListeners.forEach(listener => listener.showRequested(view));
    }
  }

  itemDropped(view, droppedItem) {
    if (!this.suppressEventEmits) {
      this.viewListeners.forEach(listener => listener.itemDropped(view, droppedItem));
    }
  }

}

/***/ }),

/***/ "./src/framework/ui/view/implementation/AbstractCollectionView.ts":
/*!************************************************************************!*\
  !*** ./src/framework/ui/view/implementation/AbstractCollectionView.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbstractCollectionView": () => (/* binding */ AbstractCollectionView)
/* harmony export */ });
/* harmony import */ var _AbstractView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractView */ "./src/framework/ui/view/implementation/AbstractView.ts");
/* harmony import */ var _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../ConfigurationTypes */ "./src/framework/ui/ConfigurationTypes.ts");
/* harmony import */ var _util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../util/EqualityFunctions */ "./src/framework/util/EqualityFunctions.ts");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _delegate_CollectionViewListenerForwarder__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../delegate/CollectionViewListenerForwarder */ "./src/framework/ui/view/delegate/CollectionViewListenerForwarder.ts");
/* harmony import */ var _delegate_CollectionViewEventHandlerDelegate__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../delegate/CollectionViewEventHandlerDelegate */ "./src/framework/ui/view/delegate/CollectionViewEventHandlerDelegate.ts");






const avLogger = debug__WEBPACK_IMPORTED_MODULE_3___default()('collection-view-ts');
const avLoggerDetails = debug__WEBPACK_IMPORTED_MODULE_3___default()('collection-view-ts-detail');
class AbstractCollectionView extends _AbstractView__WEBPACK_IMPORTED_MODULE_0__.AbstractView {
  constructor(uiConfig, collectionName) {
    super(uiConfig.viewConfig);
    this.collectionUIConfig = uiConfig;
    this.collectionName = collectionName;
    this.renderer = null;
    let forwarder = new _delegate_CollectionViewListenerForwarder__WEBPACK_IMPORTED_MODULE_4__.CollectionViewListenerForwarder();
    this.eventForwarder = forwarder;
    this.eventHandlerDelegate = new _delegate_CollectionViewEventHandlerDelegate__WEBPACK_IMPORTED_MODULE_5__.CollectionViewEventHandlerDelegate(this, forwarder);
    this.updateViewForNamedCollection = this.updateViewForNamedCollection.bind(this); // event handlers

    this.eventStartDrag = this.eventStartDrag.bind(this);
    this.eventActionClicked = this.eventActionClicked.bind(this);
    this.eventClickItem = this.eventClickItem.bind(this);
    this.eventDeleteClickItem = this.eventDeleteClickItem.bind(this);
  }

  eventStartDrag(event) {
    this.eventHandlerDelegate.eventStartDrag(event);
  }

  eventClickItem(event) {
    this.eventHandlerDelegate.eventClickItem(event);
  }

  eventDeleteClickItem(event) {
    this.eventHandlerDelegate.eventDeleteClickItem(event);
  }

  eventActionClicked(event) {
    this.eventHandlerDelegate.eventActionClicked(event);
  }

  getCollectionName() {
    return this.collectionName;
  }

  getItemId(from, item) {
    return this.getIdForItemInNamedCollection(from, item);
  }

  getCollectionUIConfig() {
    return this.collectionUIConfig;
  }

  addEventCollectionListener(listener) {
    this.eventForwarder.addListener(listener);
  }

  setContainedBy(container) {
    super.setContainedBy(container);

    if (this.uiConfig.drop) {
      avLoggerDetails(`view ${this.getName()}: Adding dragover events to ${this.uiConfig.dataSourceId}`);
      avLoggerDetails(container);
      container.addEventListener('dragover', event => {
        event.preventDefault();
      });
      container.addEventListener('drop', this.handleDrop);
    }
  }

  onDocumentLoaded() {
    super.onDocumentLoaded();
    if (this.renderer) this.renderer.onDocumentLoaded();
  }

  renderBackgroundForItemInNamedCollection(containerEl, name, item) {}

  compareItemsForEquality(item1, item2) {
    return (0,_util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_2__.isSame)(item1, item2);
  }

  getModifierForItemInNamedCollection(name, item) {
    return _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.Modifier.normal;
  }

  getSecondaryModifierForItemInNamedCollection(name, item) {
    return _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.Modifier.normal;
  }

  getBadgeValueForItemInNamedCollection(name, item) {
    return 0;
  }

  getBackgroundImageForItemInNamedCollection(name, item) {
    return '';
  }

  updateViewForNamedCollection(name, newState) {
    if (this.viewEl && this.renderer) {
      if (this.collectionUIConfig.sorter) {
        // pre sort the collection for display
        newState = newState.sort(this.collectionUIConfig.sorter);
      }

      this.renderer.setDisplayElementsForCollectionInContainer(this.viewEl, name, newState);
    }
  }

  hasPermissionToDeleteItemInNamedCollection(name, item) {
    return true;
  }

  hasPermissionToUpdateItemInNamedCollection(name, item) {
    return true;
  }

  hasPermissionToActionItemInNamedCollection(actionName, name, item) {
    return true;
  }

  setRenderer(renderer) {
    this.renderer = renderer;
  }

  getSecondaryBadgeValueForItemInNamedCollection(name, item) {
    return 0;
  }

  getTertiaryBadgeValueForItemInNamedCollection(name, item) {
    return 0;
  }

}

/***/ }),

/***/ "./src/framework/ui/view/implementation/AbstractStatefulCollectionView.ts":
/*!********************************************************************************!*\
  !*** ./src/framework/ui/view/implementation/AbstractStatefulCollectionView.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbstractStatefulCollectionView": () => (/* binding */ AbstractStatefulCollectionView)
/* harmony export */ });
/* harmony import */ var _AbstractCollectionView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractCollectionView */ "./src/framework/ui/view/implementation/AbstractCollectionView.ts");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_1__);


const logger = debug__WEBPACK_IMPORTED_MODULE_1___default()('ab-stateful-collection-view');
class AbstractStatefulCollectionView extends _AbstractCollectionView__WEBPACK_IMPORTED_MODULE_0__.AbstractCollectionView {
  constructor(uiConfig, stateManager, stateName) {
    super(uiConfig, stateName);
    this.stateManager = stateManager; // state change listening

    this.stateChanged = this.stateChanged.bind(this); // setup state listener

    this.stateManager.addChangeListenerForName(this.collectionName, this);
  }

  getItemDescription(from, item) {
    return "";
  }

  hasActionPermission(actionName, from, item) {
    return true;
  }

  onDocumentLoaded() {
    super.onDocumentLoaded();
    this.addEventCollectionListener(this);
  }

  getItemInNamedCollection(name, compareWith) {
    return this.stateManager.findItemInState(name, compareWith);
  }

  stateChanged(managerName, name, newValue) {
    logger(`handling state ${name} changed`);
    logger(newValue);
    this.updateViewForNamedCollection(name, newValue);
  }

  stateChangedItemAdded(managerName, name, itemAdded) {
    logger(`handling state ${name} new item added`);
    logger(itemAdded);
    if (this.stateManager && this.collectionName) this.updateViewForNamedCollection(name, this.stateManager.getStateByName(name));
  }

  stateChangedItemRemoved(managerName, name, itemRemoved) {
    logger(`handling state ${name} new item removed`);
    logger(itemRemoved);
    if (this.stateManager && this.collectionName) this.updateViewForNamedCollection(name, this.stateManager.getStateByName(name));
  }

  stateChangedItemUpdated(managerName, name, itemUpdated, itemNewValue) {
    logger(`handling state ${name} new item updated`);
    logger(itemNewValue);
    if (this.stateManager && this.collectionName) this.updateViewForNamedCollection(name, this.stateManager.getStateByName(name));
  }

  render() {
    this.updateViewForNamedCollection(this.collectionName, this.stateManager.getStateByName(this.collectionName));
  }

  show() {}

  hidden() {}

  documentLoaded(view) {}

  hideRequested(view) {}

  itemDragStarted(view, selectedItem) {}

  itemDropped(view, droppedItem) {}

  showRequested(view) {}

  itemDeselected(view, selectedItem) {}

  itemSelected(view, selectedItem) {}

  itemAction(view, actionName, selectedItem) {}

  itemDeleted(view, selectedItem) {
    this.stateManager.removeItemFromState(this.collectionName, selectedItem, false);
  }

  canSelectItem(view, selectedItem) {
    return true;
  }

  canDeleteItem(view, selectedItem) {
    return true;
  }

  getListenerName() {
    return this.getName();
  }

  filterResults(managerName, name, filterResults) {}

}

/***/ }),

/***/ "./src/framework/ui/view/implementation/AbstractView.ts":
/*!**************************************************************!*\
  !*** ./src/framework/ui/view/implementation/AbstractView.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbstractView": () => (/* binding */ AbstractView)
/* harmony export */ });
/* harmony import */ var _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../ConfigurationTypes */ "./src/framework/ui/ConfigurationTypes.ts");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _delegate_ViewListenerForwarder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../delegate/ViewListenerForwarder */ "./src/framework/ui/view/delegate/ViewListenerForwarder.ts");



const avLogger = debug__WEBPACK_IMPORTED_MODULE_1___default()('abstract-view-ts');
const avLoggerDetails = debug__WEBPACK_IMPORTED_MODULE_1___default()('abstract-view-ts-detail');
class AbstractView {
  static DATA_SOURCE = 'data-source';
  containerEl = null;

  constructor(uiConfig) {
    this.uiConfig = uiConfig;
    this.viewEl = null;
    this.eventForwarder = new _delegate_ViewListenerForwarder__WEBPACK_IMPORTED_MODULE_2__.ViewListenerForwarder();
    this.handleDrop = this.handleDrop.bind(this);
  }

  getItemId(from, item) {
    throw new Error("Method not implemented.");
  }

  getItemDescription(from, item) {
    throw new Error("Method not implemented.");
  }

  hasActionPermission(actionName, from, item) {
    throw new Error("Not implemented");
  }

  getUIConfig() {
    return this.uiConfig;
  }

  addEventListener(listener) {
    this.eventForwarder.addListener(listener);
  }

  onDocumentLoaded() {
    this.viewEl = document.getElementById(this.uiConfig.resultsContainerId);
    this.eventForwarder.documentLoaded(this);
  }

  setContainedBy(container) {
    this.containerEl = container;
  }

  getName() {
    return this.uiConfig.dataSourceId;
  }

  hasChanged() {
    return false;
  }

  getDataSourceKeyId() {
    return AbstractView.DATA_SOURCE;
  }

  handleDrop(event) {
    avLogger(`view ${this.getName()}: drop event`);
    avLoggerDetails(event.target); // @ts-ignore

    const draggedObjectJSON = event.dataTransfer.getData(_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_0__.DRAGGABLE_KEY_ID);
    const draggedObject = JSON.parse(draggedObjectJSON);
    avLoggerDetails(draggedObject); // check to see if we accept the dropped type and source

    const droppedObjectType = draggedObject[_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_0__.DRAGGABLE_TYPE];
    const droppedObjectFrom = draggedObject[_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_0__.DRAGGABLE_FROM];
    avLogger(`view ${this.getName()}: drop event from ${droppedObjectFrom} with type ${droppedObjectType}`);

    if (this.uiConfig.drop) {
      const acceptType = this.uiConfig.drop.acceptTypes.findIndex(objectType => objectType === droppedObjectType) >= 0;
      let acceptFrom = true;

      if (acceptType) {
        if (this.uiConfig.drop.acceptFrom) {
          acceptFrom = this.uiConfig.drop.acceptFrom.findIndex(from => from === droppedObjectFrom) >= 0;
        }

        avLoggerDetails(`view ${this.getName()}: accepted type? ${acceptType} and from? ${acceptFrom}`);

        if (acceptType && acceptFrom) {
          this.eventForwarder.itemDropped(this, draggedObject);
        }
      }
    }
  }

}

/***/ }),

/***/ "./src/framework/ui/view/implementation/DetailViewImplementation.ts":
/*!**************************************************************************!*\
  !*** ./src/framework/ui/view/implementation/DetailViewImplementation.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DetailViewImplementation": () => (/* binding */ DetailViewImplementation)
/* harmony export */ });
/* harmony import */ var _AbstractView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractView */ "./src/framework/ui/view/implementation/AbstractView.ts");
/* harmony import */ var _delegate_DetailViewListenerForwarder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../delegate/DetailViewListenerForwarder */ "./src/framework/ui/view/delegate/DetailViewListenerForwarder.ts");


class DetailViewImplementation extends _AbstractView__WEBPACK_IMPORTED_MODULE_0__.AbstractView {
  currentItem = null;

  constructor(uiConfig, renderer) {
    super(uiConfig);
    this.renderer = renderer;
    const forwarder = new _delegate_DetailViewListenerForwarder__WEBPACK_IMPORTED_MODULE_1__.DetailViewListenerForwarder();
    this.eventForwarder = forwarder;
    this.renderer.setView(this);
    this.renderer.setEventForwarder(forwarder);
  }

  addEventDetailListener(listener) {
    this.eventForwarder.addListener(listener);
  }

  getItemId(name, item) {
    return '';
  }

  getItemDescription(name, item) {
    return '';
  }

  hasActionPermission(actionName, from, item) {
    return true;
  }

  getItem(from, identifier) {
    return this.currentItem;
  }

  clearDisplay() {
    this.renderer.reset();
  }

  clearReadOnly() {
    this.renderer.clearReadOnly();
  }

  setReadOnly() {
    this.renderer.setReadOnly();
  }

  isReadOnly() {
    return this.renderer.isReadOnly();
  }

  createItem() {
    return this.renderer.createItem();
  }

  displayItem(dataObj) {
    this.currentItem = dataObj;

    if (this.renderer.hasPermissionToUpdateItem(dataObj)) {
      this.renderer.displayItem(dataObj);
    } else {
      this.renderer.displayItemReadonly(dataObj);
    }

    this.show();
  }

  hidden() {
    this.renderer.hidden();
  }

  show() {
    this.renderer.show();
  }

  render() {
    this.displayItem(this.currentItem);
  }

  onDocumentLoaded() {
    this.renderer.onDocumentLoaded();
    super.onDocumentLoaded();
  }

  hasPermissionToDeleteItem(item) {
    return this.renderer.hasPermissionToDeleteItem(item);
  }

  hasPermissionToUpdateItem(item) {
    return this.renderer.hasPermissionToUpdateItem(item);
  }

  handleActionItem(actionName, selectedItem) {
    this.renderer.handleActionItem(actionName, selectedItem);
  }

  isDisplayingItem(dataObj) {
    return this.renderer.isDisplayingItem(dataObj);
  }

  hasChanged() {
    return this.renderer.hasChanged();
  }

  initialise(displayOrder, hasDeleteButton, hideModifierFields = false) {
    this.renderer.initialise(displayOrder, hasDeleteButton, hideModifierFields);
  }

}

/***/ }),

/***/ "./src/framework/ui/view/renderer/CarouselViewRendererUsingContext.ts":
/*!****************************************************************************!*\
  !*** ./src/framework/ui/view/renderer/CarouselViewRendererUsingContext.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CarouselViewRendererUsingContext": () => (/* binding */ CarouselViewRendererUsingContext)
/* harmony export */ });
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../ConfigurationTypes */ "./src/framework/ui/ConfigurationTypes.ts");
/* harmony import */ var _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../util/BrowserUtil */ "./src/framework/util/BrowserUtil.ts");
/* harmony import */ var _context_ContextualInformationHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../context/ContextualInformationHelper */ "./src/framework/ui/context/ContextualInformationHelper.ts");




const logger = debug__WEBPACK_IMPORTED_MODULE_0___default()('carousel-renderer');
class CarouselViewRendererUsingContext {
  lastRenderedContainer = null;
  lastRenderedCollectionName = null;
  lastRenderedCollection = null;
  previousWindowWidth = 0;

  constructor(view, eventHandler, config) {
    this.view = view;
    this.eventHandler = eventHandler;
    this.config = config;
  }

  onDocumentLoaded() {
    // we need to track window resizing
    this.previousWindowWidth = window.innerWidth;
    window.addEventListener('resize', event => {
      const newWindowWidth = window.innerWidth;
      let reRenderRequired = false;

      if (newWindowWidth < this.previousWindowWidth) {
        if (this.previousWindowWidth > _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.SCREEN_WIDTH_LARGE) {
          if (newWindowWidth <= _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.SCREEN_WIDTH_LARGE) {
            // need to re-render carousel
            reRenderRequired = true;
            logger(`window reduced and is now smaller or equal to large`);
          }
        }

        if (this.previousWindowWidth > _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.SCREEN_WIDTH_MEDIUM) {
          if (newWindowWidth <= _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.SCREEN_WIDTH_MEDIUM) {
            // need to re-render carousel
            reRenderRequired = true;
            logger(`window reduced and is now smaller or equal to medium`);
          }
        }

        if (this.previousWindowWidth > _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.SCREEN_WIDTH_SMALL) {
          if (newWindowWidth <= _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.SCREEN_WIDTH_SMALL) {
            // need to re-render carousel
            reRenderRequired = true;
            logger(`window reduced and is now smaller or equal to small`);
          }
        }
      } else {
        if (this.previousWindowWidth <= _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.SCREEN_WIDTH_SMALL) {
          if (newWindowWidth > _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.SCREEN_WIDTH_SMALL) {
            // need to re-render carousel
            logger(`window increased and is now larger than small`);
            reRenderRequired = true;
          }
        }

        if (this.previousWindowWidth <= _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.SCREEN_WIDTH_MEDIUM) {
          if (newWindowWidth > _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.SCREEN_WIDTH_MEDIUM) {
            logger(`window increased and is now larger than medium`); // need to re-render carousel

            reRenderRequired = true;
          }
        }

        if (this.previousWindowWidth <= _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.SCREEN_WIDTH_LARGE) {
          if (newWindowWidth > _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.SCREEN_WIDTH_LARGE) {
            logger(`window increased and is now larger than large`); // need to re-render carousel

            reRenderRequired = true;
          }
        }
      }

      this.previousWindowWidth = newWindowWidth;

      if (this.lastRenderedContainer && this.lastRenderedCollection && this.lastRenderedCollectionName && reRenderRequired) {
        this.setDisplayElementsForCollectionInContainer(this.lastRenderedContainer, this.lastRenderedCollectionName, this.lastRenderedCollection);
      }
    });
  }

  createDisplayElementForCollectionItem(collectionName, item) {
    const canDeleteItem = this.view.hasPermissionToDeleteItemInNamedCollection(collectionName, item);
    logger(`view ${this.view.getName()}: creating carousel item`);
    logger(item);
    const collectionConfig = this.view.getCollectionUIConfig();
    let childEl = document.createElement(collectionConfig.resultsElement.type);
    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(childEl, collectionConfig.resultsElement.classes);
    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addAttributes(childEl, collectionConfig.resultsElement.attributes);

    if (collectionConfig.detail.background) {
      let backgroundEl = document.createElement(collectionConfig.detail.background.type);
      _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(backgroundEl, collectionConfig.detail.background.classes);
      _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addAttributes(backgroundEl, collectionConfig.detail.background.attributes);
      childEl.appendChild(backgroundEl);
      this.view.renderBackgroundForItemInNamedCollection(backgroundEl, collectionName, item);
    } // the content may be structured


    let textEl = childEl;

    if (collectionConfig.detail.containerClasses) {
      let contentEl = document.createElement('div');
      _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(contentEl, collectionConfig.detail.containerClasses);
      textEl = document.createElement(collectionConfig.detail.textElement.type);
      _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(textEl, collectionConfig.detail.textElement.type);
      _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addAttributes(textEl, collectionConfig.detail.textElement.attributes);
      contentEl.appendChild(textEl);

      if (collectionConfig.extraActions || collectionConfig.detail.delete) {
        let buttonsEl = document.createElement(this.config.actionContainer.type);
        _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(buttonsEl, this.config.actionContainer.classes);
        contentEl.appendChild(buttonsEl);

        if (collectionConfig.extraActions) {
          collectionConfig.extraActions.forEach(extraAction => {
            const hasPermissionForAction = this.view.hasPermissionToActionItemInNamedCollection(extraAction.name, collectionName, item);

            if (hasPermissionForAction) {
              let action = document.createElement('button');
              action.setAttribute('type', 'button');
              _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(action, extraAction.button.classes);
              _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addAttributes(action, extraAction.button.attributes);

              if (extraAction.button.text) {
                action.innerHTML = extraAction.button.text;
              }

              if (extraAction.button.iconClasses) {
                let iconEl = document.createElement('i');
                _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(iconEl, extraAction.button.iconClasses);
                iconEl.setAttribute(_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.EXTRA_ACTION_ATTRIBUTE_NAME, extraAction.name);
                action.appendChild(iconEl);
              }

              action.setAttribute(_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.EXTRA_ACTION_ATTRIBUTE_NAME, extraAction.name);
              action.addEventListener('click', event => {
                event.preventDefault();
                event.stopPropagation();
                this.eventHandler.eventActionClicked(event);
              });
              buttonsEl.appendChild(action);
            }
          });
        }

        if (collectionConfig.detail.delete && collectionConfig && canDeleteItem) {
          let deleteButtonEl = document.createElement('button');
          deleteButtonEl.setAttribute('type', 'button');
          _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(deleteButtonEl, collectionConfig.detail.delete.classes);
          _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addAttributes(deleteButtonEl, collectionConfig.detail.delete.attributes);

          if (collectionConfig.detail.delete.text) {
            deleteButtonEl.innerHTML = collectionConfig.detail.delete.text;
          }

          if (collectionConfig.detail.delete.iconClasses) {
            let iconEl = document.createElement('i');
            _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(iconEl, collectionConfig.detail.delete.iconClasses);
            deleteButtonEl.appendChild(iconEl);
          }

          deleteButtonEl.addEventListener('click', event => {
            event.preventDefault();
            event.stopPropagation();
            this.eventHandler.eventDeleteClickItem(event);
          });
          buttonsEl.appendChild(deleteButtonEl);
        }
      }

      childEl.appendChild(contentEl);

      if (collectionConfig.detail.drag) {
        childEl.setAttribute('draggable', 'true');
        childEl.addEventListener('dragstart', this.eventHandler.eventStartDrag);
      } // add selection actions


      if (collectionConfig.detail.select) {
        childEl.addEventListener('click', this.eventHandler.eventClickItem);
      }
    }

    const displayText = this.view.renderDisplayForItemInNamedCollection(textEl, collectionName, item); // add icons
    // add modifiers for patient state

    if (collectionConfig.modifiers) {
      const modifier = this.view.getModifierForItemInNamedCollection(collectionName, item);
      const secondModifier = this.view.getSecondaryModifierForItemInNamedCollection(collectionName, item);

      switch (modifier) {
        case _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.Modifier.normal:
          {
            logger(`view ${this.view.getName()}: normal item`);
            _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(childEl, collectionConfig.modifiers.normal);

            if (collectionConfig.icons && collectionConfig.icons.normal) {
              let iconEl = document.createElement('i');
              _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(iconEl, collectionConfig.icons.normal);
              textEl.appendChild(iconEl);
            }

            switch (secondModifier) {
              case _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.Modifier.warning:
                {
                  _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(childEl, collectionConfig.modifiers.normal, false);
                  _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(childEl, collectionConfig.modifiers.warning, true);

                  if (collectionConfig.icons && collectionConfig.icons.warning) {
                    let iconEl = document.createElement('i');
                    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(iconEl, collectionConfig.icons.warning);
                    textEl.appendChild(iconEl);
                  }

                  break;
                }

              case _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.Modifier.active:
                {
                  if (collectionConfig.icons && collectionConfig.icons.active) {
                    let iconEl = document.createElement('i');
                    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(iconEl, collectionConfig.icons.active);
                    textEl.appendChild(iconEl);
                  }
                }
            }

            break;
          }

        case _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.Modifier.active:
          {
            logger(`view ${this.view.getName()}: active item`);
            _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(childEl, collectionConfig.modifiers.active);

            if (collectionConfig.icons && collectionConfig.icons.active) {
              let iconEl = document.createElement('i');
              _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(iconEl, collectionConfig.icons.active);
              textEl.appendChild(iconEl);
            }

            switch (secondModifier) {
              case _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.Modifier.warning:
                {
                  _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(childEl, collectionConfig.modifiers.active, false);
                  _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(childEl, collectionConfig.modifiers.warning, true);

                  if (collectionConfig.icons && collectionConfig.icons.warning) {
                    let iconEl = document.createElement('i');
                    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(iconEl, collectionConfig.icons.warning);
                    textEl.appendChild(iconEl);
                  }

                  break;
                }
            }

            break;
          }

        case _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.Modifier.inactive:
          {
            logger(`view ${this.view.getName()}: inactive item`);
            _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(childEl, collectionConfig.modifiers.inactive);

            if (collectionConfig.icons && collectionConfig.icons.inactive) {
              let iconEl = document.createElement('i');
              _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(iconEl, collectionConfig.icons.inactive);
              textEl.appendChild(iconEl);
            }

            switch (secondModifier) {
              case _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.Modifier.warning:
                {
                  if (collectionConfig.icons && collectionConfig.icons.warning) {
                    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(childEl, collectionConfig.modifiers.inactive, false);
                    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(childEl, collectionConfig.modifiers.warning, true);
                    let iconEl = document.createElement('i');
                    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(iconEl, collectionConfig.icons.warning);
                    textEl.appendChild(iconEl);
                  }

                  break;
                }

              case _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.Modifier.active:
                {
                  if (collectionConfig.icons && collectionConfig.icons.active) {
                    let iconEl = document.createElement('i');
                    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(iconEl, collectionConfig.icons.active);
                    textEl.appendChild(iconEl);
                  }

                  break;
                }
            }

            break;
          }
      }
    }

    return childEl;
  }

  setDisplayElementsForCollectionInContainer(containerEl, collectionName, newState) {
    logger(`view ${this.view.getName()}: creating carousel results`);
    logger(newState); // remove the previous items from list

    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].removeAllChildren(containerEl); // need to break the items up by row, and the last row is active (assumes increasing time order)

    const numberOfResults = newState.length; // number of items per row depends on view port

    let itemsPerRow = this.config.itemsPerRow.xlarge;

    if (window.innerWidth <= _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.SCREEN_WIDTH_LARGE) {
      itemsPerRow = this.config.itemsPerRow.large;
    }

    if (window.innerWidth <= _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.SCREEN_WIDTH_MEDIUM) {
      itemsPerRow = this.config.itemsPerRow.medium;
    }

    if (window.innerWidth <= _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.SCREEN_WIDTH_SMALL) {
      itemsPerRow = this.config.itemsPerRow.small;
    }

    const numberOfRows = Math.ceil(numberOfResults / itemsPerRow);
    logger(`view ${this.view.getName()}: creating carousel with number of results per row of ${itemsPerRow} with rows ${numberOfRows}`);

    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
      // create the row
      let rowContainerEl = document.createElement(this.config.rowContainer.type);
      _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(rowContainerEl, this.config.rowContainer.classes);
      _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addAttributes(rowContainerEl, this.config.rowContainer.attributes); //browserUtil.addAttributes(rowContainerEl,[{name:'style',value:'display:block'}]);

      let rowEl = document.createElement(this.config.row.type);
      _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(rowEl, this.config.row.classes);
      _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addAttributes(rowEl, this.config.row.attributes);
      rowContainerEl.appendChild(rowEl); // if this the active row?

      if (rowIndex === 0 && this.config.activeRowPosition === _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.RowPosition.first || rowIndex === numberOfRows - 1 && this.config.activeRowPosition === _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.RowPosition.last) {
        _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(rowContainerEl, this.config.activeRow.classes);
        _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addAttributes(rowContainerEl, this.config.activeRow.attributes);
      }

      let itemIndex = rowIndex * itemsPerRow;

      while (itemIndex < (rowIndex + 1) * itemsPerRow && itemIndex < numberOfResults) {
        logger(`rowIndex ${rowIndex} item index ${itemIndex}`);
        const item = newState[itemIndex];
        let itemContainerEl = rowEl;

        if (this.config.multipleItemsPerRowContainer) {
          itemContainerEl = document.createElement(this.config.multipleItemsPerRowContainer.type);
          _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(itemContainerEl, this.config.multipleItemsPerRowContainer.classes);
          _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addAttributes(itemContainerEl, this.config.multipleItemsPerRowContainer.attributes);
          rowEl.appendChild(itemContainerEl);
        }

        const itemEl = this.createDisplayElementForCollectionItem(collectionName, item);
        itemContainerEl.appendChild(itemEl);
        _context_ContextualInformationHelper__WEBPACK_IMPORTED_MODULE_3__.ContextualInformationHelper.getInstance().addContextToElement(this.view.getName(), collectionName, item, itemEl, true, _context_ContextualInformationHelper__WEBPACK_IMPORTED_MODULE_3__.TogglePlacement.bottom);
        itemEl.addEventListener('contextmenu', _context_ContextualInformationHelper__WEBPACK_IMPORTED_MODULE_3__.ContextualInformationHelper.getInstance().handleContextMenu);
        itemIndex++;
      }

      containerEl.appendChild(rowContainerEl);
    }

    $('[data-toggle="tooltip"]').tooltip();
    this.lastRenderedContainer = containerEl;
    this.lastRenderedCollectionName = collectionName;
    this.lastRenderedCollection = newState;
  }

}

/***/ }),

/***/ "./src/framework/ui/view/renderer/FormDetailViewRenderer.ts":
/*!******************************************************************!*\
  !*** ./src/framework/ui/view/renderer/FormDetailViewRenderer.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FormDetailViewRenderer": () => (/* binding */ FormDetailViewRenderer)
/* harmony export */ });
/* harmony import */ var _form_BasicFormImplementation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../form/BasicFormImplementation */ "./src/framework/ui/form/BasicFormImplementation.ts");
/* harmony import */ var _form_FormListener__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../form/FormListener */ "./src/framework/ui/form/FormListener.ts");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_2__);



const logger = debug__WEBPACK_IMPORTED_MODULE_2___default()('form-detail-view-renderer');
class FormDetailViewRenderer {
  form = null;

  constructor(containerId, objDef, permissionChecker, configHelper, hasExternalControl = false) {
    this.containerId = containerId;
    this.objDef = objDef;
    this.currentItem = {};
    this.isNewItem = false;
    this.forwarder = null;
    this.view = null;
    this.permissionChecker = permissionChecker;
    this.configHelper = configHelper;
    this.hasExternalControl = hasExternalControl;
  }

  hasActionPermission(actionName, from, item) {
    throw new Error("Method not implemented.");
  }

  setEventForwarder(forwarder) {
    this.forwarder = forwarder;
  }

  setView(view) {
    this.view = view;
  }

  onDocumentLoaded() {
    this.form = new _form_BasicFormImplementation__WEBPACK_IMPORTED_MODULE_0__.BasicFormImplementation(this.containerId, this.objDef, this.configHelper, this.permissionChecker, this.hasExternalControl);
    this.form.addFormListener(this);
  }

  reset() {
    if (this.form) this.form.reset();
  }

  initialise(displayOrder, hasDeleteButton, hideModifierFields) {
    if (this.form) this.form.initialise(displayOrder, hasDeleteButton, hideModifierFields);
  }

  displayItemReadonly(dataObject) {
    this.isNewItem = false;
    if (this.form) this.form.displayOnly(dataObject);
    $(`#${this.containerId}`).animate({
      scrollTop: 0
    }, "fast");
  }

  getName() {
    return this.objDef.displayName;
  }

  setContainedBy(container) {
    throw new Error("Method not implemented.");
  }

  addEventListener(listener) {
    throw new Error("Method not implemented.");
  }

  hasChanged() {
    let result = false;
    if (this.form) result = this.form.hasChanged();
    return result;
  }

  getUIConfig() {
    throw new Error("Method not implemented.");
  }

  getDataSourceKeyId() {
    throw new Error("Method not implemented.");
  }

  clearDisplay() {
    this.isNewItem = false;
    if (this.form) this.form.reset();
    $(`#${this.containerId}`).animate({
      scrollTop: 0
    }, "fast");
  }

  clearReadOnly() {
    if (this.form) this.form.clearReadOnly();
  }

  setReadOnly() {
    if (this.form) this.form.setReadOnly();
  }

  isReadOnly() {
    let result = false;
    if (this.form) result = this.form.isReadOnly();
    return result;
  }

  createItem() {
    var _this$form;

    this.currentItem = {};
    logger(`Creating new item with form ${(_this$form = this.form) === null || _this$form === void 0 ? void 0 : _this$form.getId()}`);

    if (this.form) {
      this.isNewItem = true;
      this.currentItem = this.form.startCreateNew();
    }

    $('[data-toggle="tooltip"]').tooltip();
    $(`#${this.containerId}`).animate({
      scrollTop: 0
    }, "fast");
    return this.currentItem;
  }

  displayItem(dataObj) {
    this.currentItem = dataObj;
    this.isNewItem = false;

    if (this.hasPermissionToUpdateItem(dataObj)) {
      if (this.form) this.form.startUpdate(dataObj);
    } else {
      if (this.form) this.form.displayOnly(dataObj);
    }

    $('[data-toggle="tooltip"]').tooltip();
    $(`#${this.containerId}`).animate({
      scrollTop: 0
    }, "fast");
  }

  hidden() {
    if (this.form) this.form.setIsVisible(false);
  }

  show() {
    if (this.form) this.form.setIsVisible(true);
    $(`#${this.containerId}`).animate({
      scrollTop: 0
    }, "fast");
  }

  render() {
    this.displayItem(this.currentItem);
    this.show();
  }

  hasPermissionToDeleteItem(item) {
    return this.permissionChecker.hasPermissionToDeleteItem(item);
  }

  hasPermissionToUpdateItem(item) {
    return this.permissionChecker.hasPermissionToUpdateItem(item);
  }

  getForm() {
    return this.form;
  }

  handleActionItem(actionName, selectedItem) {}

  isDisplayingItem(dataObj) {
    let result = false;

    if (this.currentItem) {
      if (this.form) {
        result = this.form.isDisplayingItem(dataObj);
      }
    }

    return result;
  }

  formChanged(event, formValues) {
    // catch form events for user leaving the form
    switch (event.eventType) {
      case _form_FormListener__WEBPACK_IMPORTED_MODULE_1__.FormEventType.CANCELLING:
        {
          logger(`Form is cancelling`);
          break;
        }

      case _form_FormListener__WEBPACK_IMPORTED_MODULE_1__.FormEventType.CANCELLING_ABORTED:
        {
          logger(`Form is cancelling - aborted`);
          break;
        }

      case _form_FormListener__WEBPACK_IMPORTED_MODULE_1__.FormEventType.CANCELLED:
        {
          logger(`Form is cancelled - resetting`);
          this.currentItem = formValues;
          if (this.forwarder && this.view) this.forwarder.cancelled(this.view, this.currentItem);
          $(`#${this.containerId}`).animate({
            scrollTop: 0
          }, "fast");
          break;
        }

      case _form_FormListener__WEBPACK_IMPORTED_MODULE_1__.FormEventType.DELETING:
        {
          logger(`Form is deleting`);
          break;
        }

      case _form_FormListener__WEBPACK_IMPORTED_MODULE_1__.FormEventType.DELETE_ABORTED:
        {
          logger(`Form is deleting - aborted`);
          break;
        }

      case _form_FormListener__WEBPACK_IMPORTED_MODULE_1__.FormEventType.DELETED:
        {
          logger(`Form is deleted - resetting`);
          this.currentItem = formValues;
          if (this.forwarder && this.view) this.forwarder.deletedItem(this.view, this.currentItem);
          $(`#${this.containerId}`).animate({
            scrollTop: 0
          }, "fast"); // user is deleting the object, will become invisible

          break;
        }

      case _form_FormListener__WEBPACK_IMPORTED_MODULE_1__.FormEventType.SAVE_ABORTED:
        {
          $(`#${this.containerId}`).animate({
            scrollTop: 0
          }, "fast");
          logger(`Form save cancelled`);
          break;
        }

      case _form_FormListener__WEBPACK_IMPORTED_MODULE_1__.FormEventType.SAVED:
        {
          logger(`Form is saved with data`);

          if (this.form) {
            var _this$form2;

            let formattedObj = (_this$form2 = this.form) === null || _this$form2 === void 0 ? void 0 : _this$form2.getFormattedDataObject();

            if (this.isNewItem) {
              if (this.forwarder && this.view) this.forwarder.saveNewItem(this.view, formattedObj);
            } else {
              if (this.forwarder && this.view) this.forwarder.updateItem(this.view, formattedObj);
            }

            this.isNewItem = false;
          }

          $(`#${this.containerId}`).animate({
            scrollTop: 0
          }, "fast");
          break;
        }

      case _form_FormListener__WEBPACK_IMPORTED_MODULE_1__.FormEventType.SAVING:
        {
          logger(`Form is saving`);
          break;
        }
    }

    return false;
  }

  getItemDescription(from, item) {
    return "";
  }

  getItemId(from, item) {
    return "";
  }

}

/***/ }),

/***/ "./src/framework/ui/view/renderer/ListViewRenderer.ts":
/*!************************************************************!*\
  !*** ./src/framework/ui/view/renderer/ListViewRenderer.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ListViewRenderer": () => (/* binding */ ListViewRenderer)
/* harmony export */ });
/* harmony import */ var _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../util/BrowserUtil */ "./src/framework/util/BrowserUtil.ts");
/* harmony import */ var _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../ConfigurationTypes */ "./src/framework/ui/ConfigurationTypes.ts");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_2__);



const avLogger = debug__WEBPACK_IMPORTED_MODULE_2___default()('list-view-renderer');
class ListViewRenderer {
  constructor(view, eventHandler) {
    this.view = view;
    this.eventHandler = eventHandler;
  }

  createDisplayElementForCollectionItem(collectionName, item) {
    const canDeleteItem = this.view.hasPermissionToDeleteItemInNamedCollection(collectionName, item);
    const uiConfig = this.view.getCollectionUIConfig();
    const dataSourceKeyId = this.view.getDataSourceKeyId();
    avLogger(`view ${this.view.getName()}: creating List item`);
    avLogger(item);
    const resultDataKeyId = this.view.getIdForItemInNamedCollection(collectionName, item);
    let childEl = document.createElement(uiConfig.resultsElement.type);
    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(childEl, uiConfig.resultsElement.classes);
    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addAttributes(childEl, uiConfig.resultsElement.attributes);
    childEl.setAttribute(uiConfig.keyId, resultDataKeyId);
    childEl.setAttribute(dataSourceKeyId, uiConfig.viewConfig.dataSourceId); // the content may be structured

    let textEl = childEl;

    if (uiConfig.detail.containerClasses) {
      let contentEl = document.createElement('div');
      _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(contentEl, uiConfig.detail.containerClasses);
      contentEl.setAttribute(uiConfig.keyId, resultDataKeyId);
      contentEl.setAttribute(dataSourceKeyId, uiConfig.viewConfig.dataSourceId);
      textEl = document.createElement(uiConfig.detail.textElement.type);
      _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(textEl, uiConfig.detail.textElement.classes);
      _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addAttributes(textEl, uiConfig.detail.textElement.attributes);
      textEl.setAttribute(uiConfig.keyId, resultDataKeyId);
      textEl.setAttribute(dataSourceKeyId, uiConfig.viewConfig.dataSourceId);
      contentEl.appendChild(textEl);

      if (uiConfig.detail.background) {
        let imgEl = document.createElement(uiConfig.detail.background.type);
        _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(imgEl, uiConfig.detail.background.classes);
        imgEl.setAttribute('src', this.view.getBackgroundImageForItemInNamedCollection(collectionName, item));
        childEl.appendChild(imgEl);
      }

      let buttonsEl = document.createElement('div');
      contentEl.appendChild(buttonsEl);

      if (uiConfig.detail.badge) {
        const badgeValue = this.view.getBadgeValueForItemInNamedCollection(collectionName, item);

        if (badgeValue > 0) {
          let badgeEl = document.createElement(uiConfig.detail.badge.type);
          _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(badgeEl, uiConfig.detail.badge.classes);
          _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addAttributes(badgeEl, uiConfig.detail.badge.attributes);
          badgeEl.setAttribute(uiConfig.keyId, resultDataKeyId);
          badgeEl.setAttribute(dataSourceKeyId, uiConfig.viewConfig.dataSourceId);
          buttonsEl.appendChild(badgeEl);
          badgeEl.innerHTML = `&nbsp;&nbsp;&nbsp;${badgeValue}&nbsp;&nbsp;&nbsp;`;
        }
      }

      if (uiConfig.detail.secondBadge) {
        const badgeValue = this.view.getSecondaryBadgeValueForItemInNamedCollection(collectionName, item);

        if (badgeValue > 0) {
          let badgeEl = document.createElement(uiConfig.detail.secondBadge.type);
          _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(badgeEl, uiConfig.detail.secondBadge.classes);
          _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addAttributes(badgeEl, uiConfig.detail.secondBadge.attributes);
          badgeEl.setAttribute(uiConfig.keyId, resultDataKeyId);
          badgeEl.setAttribute(dataSourceKeyId, uiConfig.viewConfig.dataSourceId);
          buttonsEl.appendChild(badgeEl);
          badgeEl.innerHTML = `&nbsp;&nbsp;&nbsp;${badgeValue}&nbsp;&nbsp;&nbsp;`;
        }
      }

      if (uiConfig.detail.thirdBadge) {
        const badgeValue = this.view.getTertiaryBadgeValueForItemInNamedCollection(collectionName, item);

        if (badgeValue > 0) {
          let badgeEl = document.createElement(uiConfig.detail.thirdBadge.type);
          _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(badgeEl, uiConfig.detail.thirdBadge.classes);
          _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addAttributes(badgeEl, uiConfig.detail.thirdBadge.attributes);
          badgeEl.setAttribute(uiConfig.keyId, resultDataKeyId);
          badgeEl.setAttribute(dataSourceKeyId, uiConfig.viewConfig.dataSourceId);
          buttonsEl.appendChild(badgeEl);
          badgeEl.innerHTML = `&nbsp;&nbsp;&nbsp;${badgeValue}&nbsp;&nbsp;&nbsp;`;
        }
      }

      if (uiConfig.extraActions) {
        uiConfig.extraActions.forEach(extraAction => {
          const hasPermissionForAction = this.view.hasPermissionToActionItemInNamedCollection(extraAction.name, collectionName, item);

          if (hasPermissionForAction) {
            let action = document.createElement('button');
            action.setAttribute('type', 'button');
            _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(action, extraAction.button.classes);
            _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addAttributes(action, extraAction.button.attributes);

            if (extraAction.button.text) {
              action.innerHTML = extraAction.button.text;
            }

            if (extraAction.button.iconClasses) {
              let iconEl = document.createElement('i');
              _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(iconEl, extraAction.button.iconClasses);
              iconEl.setAttribute(uiConfig.keyId, resultDataKeyId);
              iconEl.setAttribute(dataSourceKeyId, uiConfig.viewConfig.dataSourceId);
              iconEl.setAttribute(_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.EXTRA_ACTION_ATTRIBUTE_NAME, extraAction.name);
              action.appendChild(iconEl);
            }

            action.setAttribute(uiConfig.keyId, resultDataKeyId);
            action.setAttribute(dataSourceKeyId, uiConfig.viewConfig.dataSourceId);
            action.setAttribute(_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.EXTRA_ACTION_ATTRIBUTE_NAME, extraAction.name);
            action.addEventListener('click', event => {
              event.preventDefault();
              event.stopPropagation();
              this.eventHandler.eventActionClicked(event);
            });
            buttonsEl.appendChild(action);
          }
        });
      }

      if (uiConfig.detail.delete && canDeleteItem) {
        let deleteButtonEl = document.createElement('button');
        deleteButtonEl.setAttribute('type', 'button');
        _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(deleteButtonEl, uiConfig.detail.delete.classes);
        _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addAttributes(deleteButtonEl, uiConfig.detail.delete.attributes);

        if (uiConfig.detail.delete.text) {
          deleteButtonEl.innerHTML = uiConfig.detail.delete.text;
        }

        if (uiConfig.detail.delete.iconClasses) {
          let iconEl = document.createElement('i');
          _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(iconEl, uiConfig.detail.delete.iconClasses);
          iconEl.setAttribute(uiConfig.keyId, resultDataKeyId);
          iconEl.setAttribute(dataSourceKeyId, uiConfig.viewConfig.dataSourceId);
          deleteButtonEl.appendChild(iconEl);
        }

        deleteButtonEl.setAttribute(uiConfig.keyId, resultDataKeyId);
        deleteButtonEl.setAttribute(dataSourceKeyId, uiConfig.viewConfig.dataSourceId);
        deleteButtonEl.addEventListener('click', event => {
          event.preventDefault();
          event.stopPropagation();
          this.eventHandler.eventDeleteClickItem(event);
        });
        buttonsEl.appendChild(deleteButtonEl);
      }

      childEl.appendChild(contentEl);

      if (uiConfig.detail.drag) {
        childEl.setAttribute('draggable', 'true');
        childEl.addEventListener('dragstart', this.eventHandler.eventStartDrag);
      } // add selection actions


      if (uiConfig.detail.select) {
        childEl.addEventListener('click', this.eventHandler.eventClickItem);
      }
    } // add the key ids for selection


    textEl.setAttribute(uiConfig.keyId, resultDataKeyId);
    textEl.setAttribute(dataSourceKeyId, uiConfig.viewConfig.dataSourceId);
    this.view.renderDisplayForItemInNamedCollection(textEl, collectionName, item); // add icons

    if (uiConfig.detail.icons) {
      const icons = uiConfig.detail.icons(collectionName, item);
      icons.forEach(icon => {
        let iconEl = document.createElement('i');
        _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(iconEl, icon);
        iconEl.setAttribute(uiConfig.keyId, resultDataKeyId);
        iconEl.setAttribute(dataSourceKeyId, uiConfig.viewConfig.dataSourceId);
        textEl.appendChild(iconEl);
      });
    } // add modifiers for patient state


    if (uiConfig.modifiers) {
      const modifier = this.view.getModifierForItemInNamedCollection(collectionName, item);
      const secondModifier = this.view.getSecondaryModifierForItemInNamedCollection(collectionName, item);

      switch (modifier) {
        case _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.Modifier.normal:
          {
            avLogger(`view ${this.view.getName()}: normal item`);
            _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(childEl, uiConfig.modifiers.normal);

            if (uiConfig.icons && uiConfig.icons.normal) {
              let iconEl = document.createElement('i');
              _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(iconEl, uiConfig.icons.normal);
              iconEl.setAttribute(uiConfig.keyId, resultDataKeyId);
              iconEl.setAttribute(dataSourceKeyId, uiConfig.viewConfig.dataSourceId);
              textEl.appendChild(iconEl);
            }

            switch (secondModifier) {
              case _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.Modifier.warning:
                {
                  _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(childEl, uiConfig.modifiers.normal, false);
                  _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(childEl, uiConfig.modifiers.warning, true);

                  if (uiConfig.icons && uiConfig.icons.warning) {
                    let iconEl = document.createElement('i');
                    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(iconEl, uiConfig.icons.warning);
                    iconEl.setAttribute(uiConfig.keyId, resultDataKeyId);
                    iconEl.setAttribute(dataSourceKeyId, uiConfig.viewConfig.dataSourceId);
                    textEl.appendChild(iconEl);
                  }

                  break;
                }

              case _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.Modifier.active:
                {
                  if (uiConfig.icons && uiConfig.icons.active) {
                    let iconEl = document.createElement('i');
                    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(iconEl, uiConfig.icons.active);
                    iconEl.setAttribute(uiConfig.keyId, resultDataKeyId);
                    iconEl.setAttribute(dataSourceKeyId, uiConfig.viewConfig.dataSourceId);
                    textEl.appendChild(iconEl);
                  }
                }
            }

            break;
          }

        case _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.Modifier.active:
          {
            avLogger(`view ${this.view.getName()}: active item`);
            _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(childEl, uiConfig.modifiers.active);

            if (uiConfig.icons && uiConfig.icons.active) {
              let iconEl = document.createElement('i');
              _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(iconEl, uiConfig.icons.active);
              iconEl.setAttribute(uiConfig.keyId, resultDataKeyId);
              iconEl.setAttribute(dataSourceKeyId, uiConfig.viewConfig.dataSourceId);
              textEl.appendChild(iconEl);
            }

            switch (secondModifier) {
              case _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.Modifier.warning:
                {
                  _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(childEl, uiConfig.modifiers.active, false);
                  _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(childEl, uiConfig.modifiers.warning, true);

                  if (uiConfig.icons && uiConfig.icons.warning) {
                    let iconEl = document.createElement('i');
                    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(iconEl, uiConfig.icons.warning);
                    iconEl.setAttribute(uiConfig.keyId, resultDataKeyId);
                    iconEl.setAttribute(dataSourceKeyId, uiConfig.viewConfig.dataSourceId);
                    textEl.appendChild(iconEl);
                  }

                  break;
                }
            }

            break;
          }

        case _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.Modifier.inactive:
          {
            avLogger(`view ${this.view.getName()}: inactive item`);
            _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(childEl, uiConfig.modifiers.inactive);

            if (uiConfig.icons && uiConfig.icons.inactive) {
              let iconEl = document.createElement('i');
              _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(iconEl, uiConfig.icons.inactive);
              iconEl.setAttribute(uiConfig.keyId, resultDataKeyId);
              iconEl.setAttribute(dataSourceKeyId, uiConfig.viewConfig.dataSourceId);
              textEl.appendChild(iconEl);
            }

            switch (secondModifier) {
              case _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.Modifier.warning:
                {
                  if (uiConfig.icons && uiConfig.icons.warning) {
                    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(childEl, uiConfig.modifiers.inactive, false);
                    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(childEl, uiConfig.modifiers.warning, true);
                    let iconEl = document.createElement('i');
                    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(iconEl, uiConfig.icons.warning);
                    iconEl.setAttribute(uiConfig.keyId, resultDataKeyId);
                    iconEl.setAttribute(dataSourceKeyId, uiConfig.viewConfig.dataSourceId);
                    textEl.appendChild(iconEl);
                  }

                  break;
                }

              case _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.Modifier.active:
                {
                  if (uiConfig.icons && uiConfig.icons.active) {
                    let iconEl = document.createElement('i');
                    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(iconEl, uiConfig.icons.active);
                    iconEl.setAttribute(uiConfig.keyId, resultDataKeyId);
                    iconEl.setAttribute(dataSourceKeyId, uiConfig.viewConfig.dataSourceId);
                    textEl.appendChild(iconEl);
                  }

                  break;
                }
            }

            break;
          }
      }
    }

    return childEl;
  }

  setDisplayElementsForCollectionInContainer(containerEl, collectionName, newState) {
    avLogger(`view ${this.view.getName()}: creating Results`);
    avLogger(newState); // remove the previous items from list

    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].removeAllChildren(containerEl); // add the new children

    newState.map((item, index) => {
      const childEl = this.createDisplayElementForCollectionItem(collectionName, item); // add draggable actions

      avLogger(`view ${this.view.getName()}:  Adding child ${this.view.getIdForItemInNamedCollection(collectionName, item)}`);
      containerEl.appendChild(childEl);
    });
    $('[data-toggle="tooltip"]').tooltip();
  }

  onDocumentLoaded() {}

}

/***/ }),

/***/ "./src/framework/ui/view/renderer/ListViewRendererUsingContext.ts":
/*!************************************************************************!*\
  !*** ./src/framework/ui/view/renderer/ListViewRendererUsingContext.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ListViewRendererUsingContext": () => (/* binding */ ListViewRendererUsingContext)
/* harmony export */ });
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../ConfigurationTypes */ "./src/framework/ui/ConfigurationTypes.ts");
/* harmony import */ var _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../util/BrowserUtil */ "./src/framework/util/BrowserUtil.ts");
/* harmony import */ var _context_ContextualInformationHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../context/ContextualInformationHelper */ "./src/framework/ui/context/ContextualInformationHelper.ts");




const avLogger = debug__WEBPACK_IMPORTED_MODULE_0___default()('list-view-renderer-with-context');
class ListViewRendererUsingContext {
  constructor(view, eventHandler) {
    this.view = view;
    this.eventHandler = eventHandler;
  }

  createDisplayElementForCollectionItem(collectionName, item) {
    const canDeleteItem = this.view.hasPermissionToDeleteItemInNamedCollection(collectionName, item);
    const uiConfig = this.view.getCollectionUIConfig();
    avLogger(`view ${this.view.getName()}: creating List item`);
    avLogger(item);
    const resultDataKeyId = this.view.getIdForItemInNamedCollection(collectionName, item);
    let childEl = document.createElement(uiConfig.resultsElement.type);
    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(childEl, uiConfig.resultsElement.classes);
    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addAttributes(childEl, uiConfig.resultsElement.attributes); // the content may be structured

    let textEl = childEl;

    if (uiConfig.detail.containerClasses) {
      let contentEl = document.createElement('div');
      _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(contentEl, uiConfig.detail.containerClasses);
      textEl = document.createElement(uiConfig.detail.textElement.type);
      _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(textEl, uiConfig.detail.textElement.classes);
      _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addAttributes(textEl, uiConfig.detail.textElement.attributes);
      contentEl.appendChild(textEl);

      if (uiConfig.detail.background) {
        let imgEl = document.createElement(uiConfig.detail.background.type);
        _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(imgEl, uiConfig.detail.background.classes);
        imgEl.setAttribute('src', this.view.getBackgroundImageForItemInNamedCollection(collectionName, item));
        childEl.appendChild(imgEl);
      }

      let buttonsEl = document.createElement('div');
      contentEl.appendChild(buttonsEl);

      if (uiConfig.detail.badge) {
        const badgeValue = this.view.getBadgeValueForItemInNamedCollection(collectionName, item);

        if (badgeValue > 0) {
          let badgeEl = document.createElement(uiConfig.detail.badge.type);
          _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(badgeEl, uiConfig.detail.badge.classes);
          _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addAttributes(badgeEl, uiConfig.detail.badge.attributes);
          buttonsEl.appendChild(badgeEl);
          badgeEl.innerHTML = `&nbsp;&nbsp;&nbsp;${badgeValue}&nbsp;&nbsp;&nbsp;`;
        }
      }

      if (uiConfig.detail.secondBadge) {
        const badgeValue = this.view.getSecondaryBadgeValueForItemInNamedCollection(collectionName, item);

        if (badgeValue > 0) {
          let badgeEl = document.createElement(uiConfig.detail.secondBadge.type);
          _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(badgeEl, uiConfig.detail.secondBadge.classes);
          _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addAttributes(badgeEl, uiConfig.detail.secondBadge.attributes);
          buttonsEl.appendChild(badgeEl);
          badgeEl.innerHTML = `&nbsp;&nbsp;&nbsp;${badgeValue}&nbsp;&nbsp;&nbsp;`;
        }
      }

      if (uiConfig.detail.thirdBadge) {
        const badgeValue = this.view.getTertiaryBadgeValueForItemInNamedCollection(collectionName, item);

        if (badgeValue > 0) {
          let badgeEl = document.createElement(uiConfig.detail.thirdBadge.type);
          _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(badgeEl, uiConfig.detail.thirdBadge.classes);
          _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addAttributes(badgeEl, uiConfig.detail.thirdBadge.attributes);
          buttonsEl.appendChild(badgeEl);
          badgeEl.innerHTML = `&nbsp;&nbsp;&nbsp;${badgeValue}&nbsp;&nbsp;&nbsp;`;
        }
      }

      if (uiConfig.extraActions) {
        uiConfig.extraActions.forEach(extraAction => {
          const hasPermissionForAction = this.view.hasPermissionToActionItemInNamedCollection(extraAction.name, collectionName, item);

          if (hasPermissionForAction) {
            let action = document.createElement('button');
            action.setAttribute('type', 'button');
            _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(action, extraAction.button.classes);
            _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addAttributes(action, extraAction.button.attributes);

            if (extraAction.button.text) {
              action.innerHTML = extraAction.button.text;
            }

            if (extraAction.button.iconClasses) {
              let iconEl = document.createElement('i');
              _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(iconEl, extraAction.button.iconClasses);
              iconEl.setAttribute(_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.EXTRA_ACTION_ATTRIBUTE_NAME, extraAction.name);
              action.appendChild(iconEl);
            }

            action.setAttribute(_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.EXTRA_ACTION_ATTRIBUTE_NAME, extraAction.name);
            action.addEventListener('click', event => {
              event.preventDefault();
              event.stopPropagation();
              this.eventHandler.eventActionClicked(event);
            });
            buttonsEl.appendChild(action);
          }
        });
      }

      if (uiConfig.detail.delete && canDeleteItem) {
        let deleteButtonEl = document.createElement('button');
        deleteButtonEl.setAttribute('type', 'button');
        _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(deleteButtonEl, uiConfig.detail.delete.classes);
        _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addAttributes(deleteButtonEl, uiConfig.detail.delete.attributes);

        if (uiConfig.detail.delete.text) {
          deleteButtonEl.innerHTML = uiConfig.detail.delete.text;
        }

        if (uiConfig.detail.delete.iconClasses) {
          let iconEl = document.createElement('i');
          _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(iconEl, uiConfig.detail.delete.iconClasses);
          deleteButtonEl.appendChild(iconEl);
        }

        deleteButtonEl.addEventListener('click', event => {
          event.preventDefault();
          event.stopPropagation();
          this.eventHandler.eventDeleteClickItem(event);
        });
        buttonsEl.appendChild(deleteButtonEl);
      }

      childEl.appendChild(contentEl);

      if (uiConfig.detail.drag) {
        childEl.setAttribute('draggable', 'true');
        childEl.addEventListener('dragstart', this.eventHandler.eventStartDrag);
      } // add selection actions


      if (uiConfig.detail.select) {
        childEl.addEventListener('click', this.eventHandler.eventClickItem);
      }
    } // add the key ids for selection


    this.view.renderDisplayForItemInNamedCollection(textEl, collectionName, item); // add icons

    if (uiConfig.detail.icons) {
      const icons = uiConfig.detail.icons(collectionName, item);
      icons.forEach(icon => {
        let iconEl = document.createElement('i');
        _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(iconEl, icon);
        textEl.appendChild(iconEl);
      });
    } // add modifiers for patient state


    if (uiConfig.modifiers) {
      const modifier = this.view.getModifierForItemInNamedCollection(collectionName, item);
      const secondModifier = this.view.getSecondaryModifierForItemInNamedCollection(collectionName, item);

      switch (modifier) {
        case _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.Modifier.normal:
          {
            avLogger(`view ${this.view.getName()}: normal item`);
            _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(childEl, uiConfig.modifiers.normal);

            if (uiConfig.icons && uiConfig.icons.normal) {
              let iconEl = document.createElement('i');
              _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(iconEl, uiConfig.icons.normal);
              textEl.appendChild(iconEl);
            }

            switch (secondModifier) {
              case _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.Modifier.warning:
                {
                  _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(childEl, uiConfig.modifiers.normal, false);
                  _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(childEl, uiConfig.modifiers.warning, true);

                  if (uiConfig.icons && uiConfig.icons.warning) {
                    let iconEl = document.createElement('i');
                    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(iconEl, uiConfig.icons.warning);
                    textEl.appendChild(iconEl);
                  }

                  break;
                }

              case _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.Modifier.active:
                {
                  if (uiConfig.icons && uiConfig.icons.active) {
                    let iconEl = document.createElement('i');
                    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(iconEl, uiConfig.icons.active);
                    textEl.appendChild(iconEl);
                  }
                }
            }

            break;
          }

        case _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.Modifier.active:
          {
            avLogger(`view ${this.view.getName()}: active item`);
            _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(childEl, uiConfig.modifiers.active);

            if (uiConfig.icons && uiConfig.icons.active) {
              let iconEl = document.createElement('i');
              _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(iconEl, uiConfig.icons.active);
              textEl.appendChild(iconEl);
            }

            switch (secondModifier) {
              case _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.Modifier.warning:
                {
                  _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(childEl, uiConfig.modifiers.active, false);
                  _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(childEl, uiConfig.modifiers.warning, true);

                  if (uiConfig.icons && uiConfig.icons.warning) {
                    let iconEl = document.createElement('i');
                    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(iconEl, uiConfig.icons.warning);
                    textEl.appendChild(iconEl);
                  }

                  break;
                }
            }

            break;
          }

        case _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.Modifier.inactive:
          {
            avLogger(`view ${this.view.getName()}: inactive item`);
            _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(childEl, uiConfig.modifiers.inactive);

            if (uiConfig.icons && uiConfig.icons.inactive) {
              let iconEl = document.createElement('i');
              _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(iconEl, uiConfig.icons.inactive);
              textEl.appendChild(iconEl);
            }

            switch (secondModifier) {
              case _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.Modifier.warning:
                {
                  if (uiConfig.icons && uiConfig.icons.warning) {
                    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(childEl, uiConfig.modifiers.inactive, false);
                    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(childEl, uiConfig.modifiers.warning, true);
                    let iconEl = document.createElement('i');
                    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(iconEl, uiConfig.icons.warning);
                    textEl.appendChild(iconEl);
                  }

                  break;
                }

              case _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.Modifier.active:
                {
                  if (uiConfig.icons && uiConfig.icons.active) {
                    let iconEl = document.createElement('i');
                    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(iconEl, uiConfig.icons.active);
                    textEl.appendChild(iconEl);
                  }

                  break;
                }
            }

            break;
          }
      }
    }

    return childEl;
  }

  setDisplayElementsForCollectionInContainer(containerEl, collectionName, newState) {
    avLogger(`view ${this.view.getName()}: creating Results`);
    avLogger(newState); // remove the previous items from list

    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].removeAllChildren(containerEl); // add the new children

    newState.map((item, index) => {
      const childEl = this.createDisplayElementForCollectionItem(collectionName, item); // add draggable actions

      avLogger(`view ${this.view.getName()}:  Adding child ${this.view.getIdForItemInNamedCollection(collectionName, item)}`);
      containerEl.appendChild(childEl);
      _context_ContextualInformationHelper__WEBPACK_IMPORTED_MODULE_3__.ContextualInformationHelper.getInstance().addContextToElement(this.view.getName(), collectionName, item, childEl, true);
      childEl.addEventListener('contextmenu', _context_ContextualInformationHelper__WEBPACK_IMPORTED_MODULE_3__.ContextualInformationHelper.getInstance().handleContextMenu);
    });
    $('[data-toggle="tooltip"]').tooltip();
  }

  onDocumentLoaded() {}

}

/***/ }),

/***/ "./src/framework/util/BrowserUtil.ts":
/*!*******************************************!*\
  !*** ./src/framework/util/BrowserUtil.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getElementOffset": () => (/* binding */ getElementOffset),
/* harmony export */   "BrowserUtil": () => (/* binding */ BrowserUtil),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Returns an element's position relative to the whole document (page).
 *
 * If the element does not exist, returns O/O (top-left window corner).
 *
 * @example getOffset(document.getElementById('#element'));
 *
 * @param el
 * @see https://stackoverflow.com/a/28222246/2391795
 */
const getElementOffset = el => {
  var _window, _window2;

  const rect = el === null || el === void 0 ? void 0 : el.getBoundingClientRect();
  return {
    left: ((rect === null || rect === void 0 ? void 0 : rect.left) || 0) + ((_window = window) === null || _window === void 0 ? void 0 : _window.scrollX),
    top: ((rect === null || rect === void 0 ? void 0 : rect.top) || 0) + ((_window2 = window) === null || _window2 === void 0 ? void 0 : _window2.scrollY)
  };
};
class BrowserUtil {
  constructor() {}

  scrollSmoothToId(elementId) {
    const element = document.getElementById(elementId);

    if (element !== null) {
      element.scrollIntoView({
        block: 'start',
        behavior: 'smooth'
      });
    }
  }

  scrollToBottomNow(element) {
    if (element) {
      element.scrollTop = element.scrollHeight - element.clientHeight + 100;
    }
  }

  scrollToBottomSmooth(element) {
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
      element.scrollTop = element.scrollHeight - element.clientHeight + 100;
    }
  }

  scrollSmoothTo(element) {
    element.scrollIntoView({
      block: 'start',
      behavior: 'smooth'
    });
  }

  scrollTo(element) {
    element.scrollIntoView({
      block: 'start'
    });
  }

  removeAllChildren(element) {
    if (element && element.firstChild) {
      while (element.firstChild) {
        const lastChild = element.lastChild;
        if (lastChild) element.removeChild(lastChild);
      }
    }
  }

  addRemoveClasses(element, classesText = undefined, isAdding = true) {
    if (classesText) {
      const classes = classesText.split(' ');
      classes.forEach(classValue => {
        if (classValue.trim().length > 0) {
          if (isAdding) {
            element.classList.add(classValue);
          } else {
            element.classList.remove(classValue);
          }
        }
      });
    }
  }

  addAttributes(element, attributes) {
    if (attributes) {
      attributes.forEach(attribute => {
        element.setAttribute(attribute.name, attribute.value);
      });
    }
  }

  removeAttributes(element, attributes) {
    attributes.forEach(attribute => {
      element.removeAttribute(attribute);
    });
  }

  allElementsFromPoint(x, y) {
    var element,
        elements = [];
    var old_visibility = [];

    while (true) {
      element = document.elementFromPoint(x, y);

      if (!element || element === document.documentElement) {
        break;
      }

      elements.push(element); // @ts-ignore

      old_visibility.push(element.style.visibility); // @ts-ignore

      element.style.visibility = 'hidden'; // Temporarily hide the element (without changing the layout)
    }

    for (var k = 0; k < elements.length; k++) {
      // @ts-ignore
      elements[k].style.visibility = old_visibility[k];
    }

    elements.reverse();
    return elements;
  }

}
const browserUtil = new BrowserUtil();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (browserUtil);

/***/ }),

/***/ "./src/framework/util/DurationFunctions.ts":
/*!*************************************************!*\
  !*** ./src/framework/util/DurationFunctions.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addDurations": () => (/* binding */ addDurations)
/* harmony export */ });
function addDurations(duration1, duration2) {
  const durationRegexp = /^(\d+:)?[0-5]?\d:[0-5]\d$/; // check both are valid durations

  const duration1Valid = durationRegexp.test(duration1);
  const duration2Valid = durationRegexp.test(duration2);

  if (duration1Valid && duration2Valid) {
    // split them into seconds, minutes, and hours
    const duration1Components = duration1.split(':');
    const duration2Components = duration2.split(':');
    let carry = 0; // add the seconds (last elements in each)

    const duration1Seconds = parseInt(duration1Components[duration1Components.length - 1]);
    const duration2Seconds = parseInt(duration2Components[duration2Components.length - 1]);
    let sumSeconds = duration1Seconds + duration2Seconds;

    if (sumSeconds >= 60) {
      carry = 1;
      sumSeconds -= 60;
    }

    const duration1Minutes = parseInt(duration1Components[duration1Components.length - 2]);
    const duration2Minutes = parseInt(duration2Components[duration2Components.length - 2]);
    let sumMinutes = duration1Minutes + duration2Minutes + carry;

    if (sumMinutes >= 60) {
      carry = 1;
      sumMinutes -= 60;
    } // do we have hours?


    let duration1Hours = 0;

    if (duration1Components.length == 3) {
      duration1Hours = parseInt(duration1Components[0]);
    }

    let duration2Hours = 0;

    if (duration2Components.length == 3) {
      duration2Hours = parseInt(duration2Components[0]);
    }

    let sumHours = duration1Hours + duration2Hours + carry;
    return `${sumHours > 0 ? sumHours + ':' : ''}${sumMinutes < 10 ? '0' + sumMinutes : sumMinutes}:${sumSeconds < 10 ? '0' + sumSeconds : sumSeconds}`;
  } else {
    return '00:00';
  }
}

/***/ }),

/***/ "./src/framework/util/EqualityFunctions.ts":
/*!*************************************************!*\
  !*** ./src/framework/util/EqualityFunctions.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isSame": () => (/* binding */ isSame),
/* harmony export */   "isSameMongo": () => (/* binding */ isSameMongo),
/* harmony export */   "isSameUsername": () => (/* binding */ isSameUsername),
/* harmony export */   "isSameRoom": () => (/* binding */ isSameRoom)
/* harmony export */ });
function isSame(item1, item2) {
  return item1.id === item2.id;
}
function isSameMongo(item1, item2) {
  return item1._id === item2._id;
}
function isSameUsername(item1, item2) {
  return item1.username === item2.username;
}
function isSameRoom(item1, item2) {
  return item1.roomName === item2.roomName;
}

/***/ }),

/***/ "./src/framework/util/MiscFunctions.ts":
/*!*********************************************!*\
  !*** ./src/framework/util/MiscFunctions.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "truncateString": () => (/* binding */ truncateString),
/* harmony export */   "convertSingleHexToNumber": () => (/* binding */ convertSingleHexToNumber),
/* harmony export */   "convertHexToNumber": () => (/* binding */ convertHexToNumber),
/* harmony export */   "isHexValueDark": () => (/* binding */ isHexValueDark)
/* harmony export */ });
function truncateString(str, num) {
  // If the length of str is less than or equal to num
  // just return str--don't truncate it.
  if (str.length <= num) {
    return str;
  } // Return str truncated with '...' concatenated to the end of str.


  return str.slice(0, num) + '...';
}
function convertSingleHexToNumber(singleHexValue) {
  let value = parseInt(singleHexValue);

  if (isNaN(value)) {
    switch (singleHexValue) {
      case 'a':
        {
          value = 11;
          break;
        }

      case 'b':
        {
          value = 12;
          break;
        }

      case 'c':
        {
          value = 13;
          break;
        }

      case 'd':
        {
          value = 14;
          break;
        }

      case 'e':
        {
          value = 15;
          break;
        }

      case 'f':
        {
          value = 16;
          break;
        }
    }
  }

  return value;
}
function convertHexToNumber(hexValue) {
  let value = 0;
  let firstHexDigit = hexValue.substr(1, 1);
  let tensHexDigit = hexValue.substr(0, 1);
  value = 10 * convertSingleHexToNumber(tensHexDigit) + convertSingleHexToNumber(firstHexDigit);
  return value;
}
function isHexValueDark(hexValue) {
  let result = false; // we are dark if the equivalent rgb value is < 125 for each value

  hexValue = hexValue.toLowerCase();
  if (hexValue.length < 7) return false;
  let redHex = hexValue.substr(1, 2);
  let greenHex = hexValue.substr(3, 2);
  let blueHex = hexValue.substr(5, 2);
  let redValue = convertHexToNumber(redHex);
  let greenValue = convertHexToNumber(greenHex);
  let blueValue = convertHexToNumber(blueHex);

  if (redValue < 125 && greenValue < 125 && blueValue < 125) {
    result = true;
  }

  return result;
}

/***/ }),

/***/ "./node_modules/moment/locale sync recursive ^\\.\\/.*$":
/*!***************************************************!*\
  !*** ./node_modules/moment/locale/ sync ^\.\/.*$ ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./af": "./node_modules/moment/locale/af.js",
	"./af.js": "./node_modules/moment/locale/af.js",
	"./ar": "./node_modules/moment/locale/ar.js",
	"./ar-dz": "./node_modules/moment/locale/ar-dz.js",
	"./ar-dz.js": "./node_modules/moment/locale/ar-dz.js",
	"./ar-kw": "./node_modules/moment/locale/ar-kw.js",
	"./ar-kw.js": "./node_modules/moment/locale/ar-kw.js",
	"./ar-ly": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ly.js": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ma": "./node_modules/moment/locale/ar-ma.js",
	"./ar-ma.js": "./node_modules/moment/locale/ar-ma.js",
	"./ar-sa": "./node_modules/moment/locale/ar-sa.js",
	"./ar-sa.js": "./node_modules/moment/locale/ar-sa.js",
	"./ar-tn": "./node_modules/moment/locale/ar-tn.js",
	"./ar-tn.js": "./node_modules/moment/locale/ar-tn.js",
	"./ar.js": "./node_modules/moment/locale/ar.js",
	"./az": "./node_modules/moment/locale/az.js",
	"./az.js": "./node_modules/moment/locale/az.js",
	"./be": "./node_modules/moment/locale/be.js",
	"./be.js": "./node_modules/moment/locale/be.js",
	"./bg": "./node_modules/moment/locale/bg.js",
	"./bg.js": "./node_modules/moment/locale/bg.js",
	"./bm": "./node_modules/moment/locale/bm.js",
	"./bm.js": "./node_modules/moment/locale/bm.js",
	"./bn": "./node_modules/moment/locale/bn.js",
	"./bn-bd": "./node_modules/moment/locale/bn-bd.js",
	"./bn-bd.js": "./node_modules/moment/locale/bn-bd.js",
	"./bn.js": "./node_modules/moment/locale/bn.js",
	"./bo": "./node_modules/moment/locale/bo.js",
	"./bo.js": "./node_modules/moment/locale/bo.js",
	"./br": "./node_modules/moment/locale/br.js",
	"./br.js": "./node_modules/moment/locale/br.js",
	"./bs": "./node_modules/moment/locale/bs.js",
	"./bs.js": "./node_modules/moment/locale/bs.js",
	"./ca": "./node_modules/moment/locale/ca.js",
	"./ca.js": "./node_modules/moment/locale/ca.js",
	"./cs": "./node_modules/moment/locale/cs.js",
	"./cs.js": "./node_modules/moment/locale/cs.js",
	"./cv": "./node_modules/moment/locale/cv.js",
	"./cv.js": "./node_modules/moment/locale/cv.js",
	"./cy": "./node_modules/moment/locale/cy.js",
	"./cy.js": "./node_modules/moment/locale/cy.js",
	"./da": "./node_modules/moment/locale/da.js",
	"./da.js": "./node_modules/moment/locale/da.js",
	"./de": "./node_modules/moment/locale/de.js",
	"./de-at": "./node_modules/moment/locale/de-at.js",
	"./de-at.js": "./node_modules/moment/locale/de-at.js",
	"./de-ch": "./node_modules/moment/locale/de-ch.js",
	"./de-ch.js": "./node_modules/moment/locale/de-ch.js",
	"./de.js": "./node_modules/moment/locale/de.js",
	"./dv": "./node_modules/moment/locale/dv.js",
	"./dv.js": "./node_modules/moment/locale/dv.js",
	"./el": "./node_modules/moment/locale/el.js",
	"./el.js": "./node_modules/moment/locale/el.js",
	"./en-au": "./node_modules/moment/locale/en-au.js",
	"./en-au.js": "./node_modules/moment/locale/en-au.js",
	"./en-ca": "./node_modules/moment/locale/en-ca.js",
	"./en-ca.js": "./node_modules/moment/locale/en-ca.js",
	"./en-gb": "./node_modules/moment/locale/en-gb.js",
	"./en-gb.js": "./node_modules/moment/locale/en-gb.js",
	"./en-ie": "./node_modules/moment/locale/en-ie.js",
	"./en-ie.js": "./node_modules/moment/locale/en-ie.js",
	"./en-il": "./node_modules/moment/locale/en-il.js",
	"./en-il.js": "./node_modules/moment/locale/en-il.js",
	"./en-in": "./node_modules/moment/locale/en-in.js",
	"./en-in.js": "./node_modules/moment/locale/en-in.js",
	"./en-nz": "./node_modules/moment/locale/en-nz.js",
	"./en-nz.js": "./node_modules/moment/locale/en-nz.js",
	"./en-sg": "./node_modules/moment/locale/en-sg.js",
	"./en-sg.js": "./node_modules/moment/locale/en-sg.js",
	"./eo": "./node_modules/moment/locale/eo.js",
	"./eo.js": "./node_modules/moment/locale/eo.js",
	"./es": "./node_modules/moment/locale/es.js",
	"./es-do": "./node_modules/moment/locale/es-do.js",
	"./es-do.js": "./node_modules/moment/locale/es-do.js",
	"./es-mx": "./node_modules/moment/locale/es-mx.js",
	"./es-mx.js": "./node_modules/moment/locale/es-mx.js",
	"./es-us": "./node_modules/moment/locale/es-us.js",
	"./es-us.js": "./node_modules/moment/locale/es-us.js",
	"./es.js": "./node_modules/moment/locale/es.js",
	"./et": "./node_modules/moment/locale/et.js",
	"./et.js": "./node_modules/moment/locale/et.js",
	"./eu": "./node_modules/moment/locale/eu.js",
	"./eu.js": "./node_modules/moment/locale/eu.js",
	"./fa": "./node_modules/moment/locale/fa.js",
	"./fa.js": "./node_modules/moment/locale/fa.js",
	"./fi": "./node_modules/moment/locale/fi.js",
	"./fi.js": "./node_modules/moment/locale/fi.js",
	"./fil": "./node_modules/moment/locale/fil.js",
	"./fil.js": "./node_modules/moment/locale/fil.js",
	"./fo": "./node_modules/moment/locale/fo.js",
	"./fo.js": "./node_modules/moment/locale/fo.js",
	"./fr": "./node_modules/moment/locale/fr.js",
	"./fr-ca": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ca.js": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ch": "./node_modules/moment/locale/fr-ch.js",
	"./fr-ch.js": "./node_modules/moment/locale/fr-ch.js",
	"./fr.js": "./node_modules/moment/locale/fr.js",
	"./fy": "./node_modules/moment/locale/fy.js",
	"./fy.js": "./node_modules/moment/locale/fy.js",
	"./ga": "./node_modules/moment/locale/ga.js",
	"./ga.js": "./node_modules/moment/locale/ga.js",
	"./gd": "./node_modules/moment/locale/gd.js",
	"./gd.js": "./node_modules/moment/locale/gd.js",
	"./gl": "./node_modules/moment/locale/gl.js",
	"./gl.js": "./node_modules/moment/locale/gl.js",
	"./gom-deva": "./node_modules/moment/locale/gom-deva.js",
	"./gom-deva.js": "./node_modules/moment/locale/gom-deva.js",
	"./gom-latn": "./node_modules/moment/locale/gom-latn.js",
	"./gom-latn.js": "./node_modules/moment/locale/gom-latn.js",
	"./gu": "./node_modules/moment/locale/gu.js",
	"./gu.js": "./node_modules/moment/locale/gu.js",
	"./he": "./node_modules/moment/locale/he.js",
	"./he.js": "./node_modules/moment/locale/he.js",
	"./hi": "./node_modules/moment/locale/hi.js",
	"./hi.js": "./node_modules/moment/locale/hi.js",
	"./hr": "./node_modules/moment/locale/hr.js",
	"./hr.js": "./node_modules/moment/locale/hr.js",
	"./hu": "./node_modules/moment/locale/hu.js",
	"./hu.js": "./node_modules/moment/locale/hu.js",
	"./hy-am": "./node_modules/moment/locale/hy-am.js",
	"./hy-am.js": "./node_modules/moment/locale/hy-am.js",
	"./id": "./node_modules/moment/locale/id.js",
	"./id.js": "./node_modules/moment/locale/id.js",
	"./is": "./node_modules/moment/locale/is.js",
	"./is.js": "./node_modules/moment/locale/is.js",
	"./it": "./node_modules/moment/locale/it.js",
	"./it-ch": "./node_modules/moment/locale/it-ch.js",
	"./it-ch.js": "./node_modules/moment/locale/it-ch.js",
	"./it.js": "./node_modules/moment/locale/it.js",
	"./ja": "./node_modules/moment/locale/ja.js",
	"./ja.js": "./node_modules/moment/locale/ja.js",
	"./jv": "./node_modules/moment/locale/jv.js",
	"./jv.js": "./node_modules/moment/locale/jv.js",
	"./ka": "./node_modules/moment/locale/ka.js",
	"./ka.js": "./node_modules/moment/locale/ka.js",
	"./kk": "./node_modules/moment/locale/kk.js",
	"./kk.js": "./node_modules/moment/locale/kk.js",
	"./km": "./node_modules/moment/locale/km.js",
	"./km.js": "./node_modules/moment/locale/km.js",
	"./kn": "./node_modules/moment/locale/kn.js",
	"./kn.js": "./node_modules/moment/locale/kn.js",
	"./ko": "./node_modules/moment/locale/ko.js",
	"./ko.js": "./node_modules/moment/locale/ko.js",
	"./ku": "./node_modules/moment/locale/ku.js",
	"./ku.js": "./node_modules/moment/locale/ku.js",
	"./ky": "./node_modules/moment/locale/ky.js",
	"./ky.js": "./node_modules/moment/locale/ky.js",
	"./lb": "./node_modules/moment/locale/lb.js",
	"./lb.js": "./node_modules/moment/locale/lb.js",
	"./lo": "./node_modules/moment/locale/lo.js",
	"./lo.js": "./node_modules/moment/locale/lo.js",
	"./lt": "./node_modules/moment/locale/lt.js",
	"./lt.js": "./node_modules/moment/locale/lt.js",
	"./lv": "./node_modules/moment/locale/lv.js",
	"./lv.js": "./node_modules/moment/locale/lv.js",
	"./me": "./node_modules/moment/locale/me.js",
	"./me.js": "./node_modules/moment/locale/me.js",
	"./mi": "./node_modules/moment/locale/mi.js",
	"./mi.js": "./node_modules/moment/locale/mi.js",
	"./mk": "./node_modules/moment/locale/mk.js",
	"./mk.js": "./node_modules/moment/locale/mk.js",
	"./ml": "./node_modules/moment/locale/ml.js",
	"./ml.js": "./node_modules/moment/locale/ml.js",
	"./mn": "./node_modules/moment/locale/mn.js",
	"./mn.js": "./node_modules/moment/locale/mn.js",
	"./mr": "./node_modules/moment/locale/mr.js",
	"./mr.js": "./node_modules/moment/locale/mr.js",
	"./ms": "./node_modules/moment/locale/ms.js",
	"./ms-my": "./node_modules/moment/locale/ms-my.js",
	"./ms-my.js": "./node_modules/moment/locale/ms-my.js",
	"./ms.js": "./node_modules/moment/locale/ms.js",
	"./mt": "./node_modules/moment/locale/mt.js",
	"./mt.js": "./node_modules/moment/locale/mt.js",
	"./my": "./node_modules/moment/locale/my.js",
	"./my.js": "./node_modules/moment/locale/my.js",
	"./nb": "./node_modules/moment/locale/nb.js",
	"./nb.js": "./node_modules/moment/locale/nb.js",
	"./ne": "./node_modules/moment/locale/ne.js",
	"./ne.js": "./node_modules/moment/locale/ne.js",
	"./nl": "./node_modules/moment/locale/nl.js",
	"./nl-be": "./node_modules/moment/locale/nl-be.js",
	"./nl-be.js": "./node_modules/moment/locale/nl-be.js",
	"./nl.js": "./node_modules/moment/locale/nl.js",
	"./nn": "./node_modules/moment/locale/nn.js",
	"./nn.js": "./node_modules/moment/locale/nn.js",
	"./oc-lnc": "./node_modules/moment/locale/oc-lnc.js",
	"./oc-lnc.js": "./node_modules/moment/locale/oc-lnc.js",
	"./pa-in": "./node_modules/moment/locale/pa-in.js",
	"./pa-in.js": "./node_modules/moment/locale/pa-in.js",
	"./pl": "./node_modules/moment/locale/pl.js",
	"./pl.js": "./node_modules/moment/locale/pl.js",
	"./pt": "./node_modules/moment/locale/pt.js",
	"./pt-br": "./node_modules/moment/locale/pt-br.js",
	"./pt-br.js": "./node_modules/moment/locale/pt-br.js",
	"./pt.js": "./node_modules/moment/locale/pt.js",
	"./ro": "./node_modules/moment/locale/ro.js",
	"./ro.js": "./node_modules/moment/locale/ro.js",
	"./ru": "./node_modules/moment/locale/ru.js",
	"./ru.js": "./node_modules/moment/locale/ru.js",
	"./sd": "./node_modules/moment/locale/sd.js",
	"./sd.js": "./node_modules/moment/locale/sd.js",
	"./se": "./node_modules/moment/locale/se.js",
	"./se.js": "./node_modules/moment/locale/se.js",
	"./si": "./node_modules/moment/locale/si.js",
	"./si.js": "./node_modules/moment/locale/si.js",
	"./sk": "./node_modules/moment/locale/sk.js",
	"./sk.js": "./node_modules/moment/locale/sk.js",
	"./sl": "./node_modules/moment/locale/sl.js",
	"./sl.js": "./node_modules/moment/locale/sl.js",
	"./sq": "./node_modules/moment/locale/sq.js",
	"./sq.js": "./node_modules/moment/locale/sq.js",
	"./sr": "./node_modules/moment/locale/sr.js",
	"./sr-cyrl": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr.js": "./node_modules/moment/locale/sr.js",
	"./ss": "./node_modules/moment/locale/ss.js",
	"./ss.js": "./node_modules/moment/locale/ss.js",
	"./sv": "./node_modules/moment/locale/sv.js",
	"./sv.js": "./node_modules/moment/locale/sv.js",
	"./sw": "./node_modules/moment/locale/sw.js",
	"./sw.js": "./node_modules/moment/locale/sw.js",
	"./ta": "./node_modules/moment/locale/ta.js",
	"./ta.js": "./node_modules/moment/locale/ta.js",
	"./te": "./node_modules/moment/locale/te.js",
	"./te.js": "./node_modules/moment/locale/te.js",
	"./tet": "./node_modules/moment/locale/tet.js",
	"./tet.js": "./node_modules/moment/locale/tet.js",
	"./tg": "./node_modules/moment/locale/tg.js",
	"./tg.js": "./node_modules/moment/locale/tg.js",
	"./th": "./node_modules/moment/locale/th.js",
	"./th.js": "./node_modules/moment/locale/th.js",
	"./tk": "./node_modules/moment/locale/tk.js",
	"./tk.js": "./node_modules/moment/locale/tk.js",
	"./tl-ph": "./node_modules/moment/locale/tl-ph.js",
	"./tl-ph.js": "./node_modules/moment/locale/tl-ph.js",
	"./tlh": "./node_modules/moment/locale/tlh.js",
	"./tlh.js": "./node_modules/moment/locale/tlh.js",
	"./tr": "./node_modules/moment/locale/tr.js",
	"./tr.js": "./node_modules/moment/locale/tr.js",
	"./tzl": "./node_modules/moment/locale/tzl.js",
	"./tzl.js": "./node_modules/moment/locale/tzl.js",
	"./tzm": "./node_modules/moment/locale/tzm.js",
	"./tzm-latn": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm-latn.js": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm.js": "./node_modules/moment/locale/tzm.js",
	"./ug-cn": "./node_modules/moment/locale/ug-cn.js",
	"./ug-cn.js": "./node_modules/moment/locale/ug-cn.js",
	"./uk": "./node_modules/moment/locale/uk.js",
	"./uk.js": "./node_modules/moment/locale/uk.js",
	"./ur": "./node_modules/moment/locale/ur.js",
	"./ur.js": "./node_modules/moment/locale/ur.js",
	"./uz": "./node_modules/moment/locale/uz.js",
	"./uz-latn": "./node_modules/moment/locale/uz-latn.js",
	"./uz-latn.js": "./node_modules/moment/locale/uz-latn.js",
	"./uz.js": "./node_modules/moment/locale/uz.js",
	"./vi": "./node_modules/moment/locale/vi.js",
	"./vi.js": "./node_modules/moment/locale/vi.js",
	"./x-pseudo": "./node_modules/moment/locale/x-pseudo.js",
	"./x-pseudo.js": "./node_modules/moment/locale/x-pseudo.js",
	"./yo": "./node_modules/moment/locale/yo.js",
	"./yo.js": "./node_modules/moment/locale/yo.js",
	"./zh-cn": "./node_modules/moment/locale/zh-cn.js",
	"./zh-cn.js": "./node_modules/moment/locale/zh-cn.js",
	"./zh-hk": "./node_modules/moment/locale/zh-hk.js",
	"./zh-hk.js": "./node_modules/moment/locale/zh-hk.js",
	"./zh-mo": "./node_modules/moment/locale/zh-mo.js",
	"./zh-mo.js": "./node_modules/moment/locale/zh-mo.js",
	"./zh-tw": "./node_modules/moment/locale/zh-tw.js",
	"./zh-tw.js": "./node_modules/moment/locale/zh-tw.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/moment/locale sync recursive ^\\.\\/.*$";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"app": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunktemplate_feo_react_babel"] = self["webpackChunktemplate_feo_react_babel"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendor"], () => (__webpack_require__("./src/App.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=app.bundle.js.map