/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/App.ts":
/*!********************!*\
  !*** ./src/App.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Controller */ "./src/Controller.ts");
/* harmony import */ var _component_view_UserSearchView__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./component/view/UserSearchView */ "./src/component/view/UserSearchView.ts");
/* harmony import */ var _component_view_ChatLogsView__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./component/view/ChatLogsView */ "./src/component/view/ChatLogsView.ts");
/* harmony import */ var _AppTypes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AppTypes */ "./src/AppTypes.ts");
/* harmony import */ var _component_sidebar_UserSearchSidebar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./component/sidebar/UserSearchSidebar */ "./src/component/sidebar/UserSearchSidebar.ts");
/* harmony import */ var _component_sidebar_ChatRoomsSidebar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./component/sidebar/ChatRoomsSidebar */ "./src/component/sidebar/ChatRoomsSidebar.ts");
/* harmony import */ var _component_sidebar_ExerciseTypesSidebar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./component/sidebar/ExerciseTypesSidebar */ "./src/component/sidebar/ExerciseTypesSidebar.ts");
/* harmony import */ var _component_view_ChatLogDetailView__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./component/view/ChatLogDetailView */ "./src/component/view/ChatLogDetailView.ts");
/* harmony import */ var _component_view_FavouriteUserView__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./component/view/FavouriteUserView */ "./src/component/view/FavouriteUserView.ts");
/* harmony import */ var _component_view_BlockedUserView__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./component/view/BlockedUserView */ "./src/component/view/BlockedUserView.ts");
/* harmony import */ var _component_view_ExerciseTypesView__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./component/view/ExerciseTypesView */ "./src/component/view/ExerciseTypesView.ts");
/* harmony import */ var _ui_framework_form_validation_ValidationTypeDefs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./ui-framework/form/validation/ValidationTypeDefs */ "./src/ui-framework/form/validation/ValidationTypeDefs.ts");
/* harmony import */ var _ui_framework_form_validation_ValidationManager__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./ui-framework/form/validation/ValidationManager */ "./src/ui-framework/form/validation/ValidationManager.ts");
/* harmony import */ var _ui_framework_view_delegate_FormDetailViewRenderer__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./ui-framework/view/delegate/FormDetailViewRenderer */ "./src/ui-framework/view/delegate/FormDetailViewRenderer.ts");
/* harmony import */ var _model_ObjectDefinitionRegistry__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./model/ObjectDefinitionRegistry */ "./src/model/ObjectDefinitionRegistry.ts");
/* harmony import */ var _ui_framework_view_implementation_DetailViewImplementation__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./ui-framework/view/implementation/DetailViewImplementation */ "./src/ui-framework/view/implementation/DetailViewImplementation.ts");
/* harmony import */ var _ui_framework_view_implementation_LinkedCollectionDetailController__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./ui-framework/view/implementation/LinkedCollectionDetailController */ "./src/ui-framework/view/implementation/LinkedCollectionDetailController.ts");
//localStorage.debug = 'linked-controller api-ts exercise-types-view app controller-ts controller-ts-detail api-ts socket-ts user-search user-search-detail list-view-renderer';
localStorage.debug = 'collection-view-ts collection-view-ts-detail form-detail-view-renderer linked-controller linked-controller-detail exercise-types-view app validation-manager-rule-failure validation-manager';

(debug__WEBPACK_IMPORTED_MODULE_0___default().log) = console.info.bind(console);

















var logger = debug__WEBPACK_IMPORTED_MODULE_0___default()('app');

var Root = /*#__PURE__*/function () {
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  function Root() {
    // event handlers
    this.handleShowUserSearch = this.handleShowUserSearch.bind(this);
    this.handleShowExerciseTypes = this.handleShowExerciseTypes.bind(this);
    this.handleShowChat = this.handleShowChat.bind(this);
    _Controller__WEBPACK_IMPORTED_MODULE_1__["default"].getInstance().connectToApplication(this, window.localStorage);
  }

  var _proto = Root.prototype;

  _proto.getCurrentUser = function getCurrentUser() {
    return _Controller__WEBPACK_IMPORTED_MODULE_1__["default"].getInstance().getLoggedInUserId();
  };

  _proto.onDocumentLoad = function onDocumentLoad() {
    logger('document loaded');
    this.chatSidebar = new _component_sidebar_ChatRoomsSidebar__WEBPACK_IMPORTED_MODULE_6__["default"](); // add the views to the chat side bar

    this.chatView = new _component_view_ChatLogsView__WEBPACK_IMPORTED_MODULE_3__["default"]();
    this.chatSidebar.addView(this.chatView, {
      containerId: _component_sidebar_ChatRoomsSidebar__WEBPACK_IMPORTED_MODULE_6__["default"].SidebarContainers.chatLogs
    });
    var chatLogView = new _component_view_ChatLogDetailView__WEBPACK_IMPORTED_MODULE_8__["default"](_Controller__WEBPACK_IMPORTED_MODULE_1__["default"].getInstance().getStateManager());
    this.chatSidebar.addView(chatLogView, {
      containerId: _component_sidebar_ChatRoomsSidebar__WEBPACK_IMPORTED_MODULE_6__["default"].SidebarContainers.chatLog
    });
    this.chatView.addEventListener(chatLogView);
    this.chatSidebar.onDocumentLoaded();
    this.userSearchSidebar = new _component_sidebar_UserSearchSidebar__WEBPACK_IMPORTED_MODULE_5__["default"](); // add the subviews for the user search

    var recentSearches = new _component_view_UserSearchView__WEBPACK_IMPORTED_MODULE_2__["default"](_Controller__WEBPACK_IMPORTED_MODULE_1__["default"].getInstance().getStateManager());
    this.userSearchSidebar.addView(recentSearches, {
      containerId: _component_sidebar_UserSearchSidebar__WEBPACK_IMPORTED_MODULE_5__["default"].SidebarContainers.recentSearches
    });
    var favouriteUsers = new _component_view_FavouriteUserView__WEBPACK_IMPORTED_MODULE_9__["default"](_Controller__WEBPACK_IMPORTED_MODULE_1__["default"].getInstance().getStateManager());
    this.userSearchSidebar.addView(favouriteUsers, {
      containerId: _component_sidebar_UserSearchSidebar__WEBPACK_IMPORTED_MODULE_5__["default"].SidebarContainers.favourites
    });
    var blockedUsers = new _component_view_BlockedUserView__WEBPACK_IMPORTED_MODULE_10__["default"](_Controller__WEBPACK_IMPORTED_MODULE_1__["default"].getInstance().getStateManager());
    this.userSearchSidebar.addView(blockedUsers, {
      containerId: _component_sidebar_UserSearchSidebar__WEBPACK_IMPORTED_MODULE_5__["default"].SidebarContainers.blocked
    });
    this.userSearchSidebar.onDocumentLoaded();
    /*
      Exercise Types - sidebar, list view and linked detail view
    */

    this.exerciseTypesSidebar = new _component_sidebar_ExerciseTypesSidebar__WEBPACK_IMPORTED_MODULE_7__["default"]();
    var exerciseTypes = new _component_view_ExerciseTypesView__WEBPACK_IMPORTED_MODULE_11__.ExerciseTypesView();
    this.exerciseTypesSidebar.addView(exerciseTypes, {
      containerId: _component_sidebar_ExerciseTypesSidebar__WEBPACK_IMPORTED_MODULE_7__["default"].SidebarContainers.container
    });
    var exerciseTypeDefinition = _model_ObjectDefinitionRegistry__WEBPACK_IMPORTED_MODULE_15__.ObjectDefinitionRegistry.getInstance().findDefinition(_AppTypes__WEBPACK_IMPORTED_MODULE_4__.STATE_NAMES.exerciseTypes);

    if (exerciseTypeDefinition) {
      var exerciseTypeDetailRenderer = new _ui_framework_view_delegate_FormDetailViewRenderer__WEBPACK_IMPORTED_MODULE_14__.FormDetailViewRenderer(_AppTypes__WEBPACK_IMPORTED_MODULE_4__.VIEW_CONTAINER.exerciseTypeDetail, exerciseTypeDefinition);
      var exerciseTypeDetailView = new _ui_framework_view_implementation_DetailViewImplementation__WEBPACK_IMPORTED_MODULE_16__.DetailViewImplementation({
        resultsContainerId: _AppTypes__WEBPACK_IMPORTED_MODULE_4__.VIEW_CONTAINER.exerciseTypeDetail,
        dataSourceId: _AppTypes__WEBPACK_IMPORTED_MODULE_4__.VIEW_NAME.exerciseTypes
      }, exerciseTypeDetailRenderer);
      var viewLinker = new _ui_framework_view_implementation_LinkedCollectionDetailController__WEBPACK_IMPORTED_MODULE_17__.LinkedCollectionDetailController(_AppTypes__WEBPACK_IMPORTED_MODULE_4__.STATE_NAMES.exerciseTypes, exerciseTypes);
      viewLinker.addLinkedDetailView(exerciseTypeDetailView);
      this.exerciseTypesSidebar.onDocumentLoaded();
      var detailForm = exerciseTypeDetailRenderer.getForm();

      if (detailForm) {
        logger("Setting up validation rules for " + detailForm.getId());
        logger(detailForm);
        this.setupValidationForExerciseTypeDetailsForm(detailForm);
      }
    } // navigation item handlers


    if (document) {
      // @ts-ignore
      document.getElementById(_AppTypes__WEBPACK_IMPORTED_MODULE_4__.NAVIGATION.userSearchId).addEventListener('click', this.handleShowUserSearch); // @ts-ignore

      document.getElementById(_AppTypes__WEBPACK_IMPORTED_MODULE_4__.NAVIGATION.exerciseTypesId).addEventListener('click', this.handleShowExerciseTypes); // @ts-ignore

      this.chatNavigationItem = document.getElementById(_AppTypes__WEBPACK_IMPORTED_MODULE_4__.NAVIGATION.chatId); // @ts-ignore

      this.chatNavigationItem.addEventListener('click', this.handleShowChat); // @ts-ignore
      //document.getElementById(NAVIGATION.showMyWorkouts).addEventListener('click', this.handleShowWorkouts);
    } // a reference to the div containing ourselves
    // @ts-ignore


    this.thisEl = document.getElementById('root');
    _Controller__WEBPACK_IMPORTED_MODULE_1__["default"].getInstance().initialise();
  };

  _proto.setupValidationForExerciseTypeDetailsForm = function setupValidationForExerciseTypeDetailsForm(form) {
    var rule = {
      targetDataFieldId: 'sets',
      response: _ui_framework_form_validation_ValidationTypeDefs__WEBPACK_IMPORTED_MODULE_12__.ConditionResponse.show,
      conditions: [{
        sourceDataFieldId: 'type',
        comparison: _ui_framework_form_validation_ValidationTypeDefs__WEBPACK_IMPORTED_MODULE_12__.ComparisonType.hasValue,
        values: 'cardio'
      }]
    };
    _ui_framework_form_validation_ValidationManager__WEBPACK_IMPORTED_MODULE_13__.ValidationManager.getInstance().addRuleToForm(form, rule);
    rule = {
      targetDataFieldId: 'reps',
      response: _ui_framework_form_validation_ValidationTypeDefs__WEBPACK_IMPORTED_MODULE_12__.ConditionResponse.show,
      conditions: [{
        sourceDataFieldId: 'type',
        comparison: _ui_framework_form_validation_ValidationTypeDefs__WEBPACK_IMPORTED_MODULE_12__.ComparisonType.hasValue,
        values: 'cardio'
      }]
    };
    _ui_framework_form_validation_ValidationManager__WEBPACK_IMPORTED_MODULE_13__.ValidationManager.getInstance().addRuleToForm(form, rule);
    rule = {
      targetDataFieldId: 'weight',
      response: _ui_framework_form_validation_ValidationTypeDefs__WEBPACK_IMPORTED_MODULE_12__.ConditionResponse.show,
      conditions: [{
        sourceDataFieldId: 'type',
        comparison: _ui_framework_form_validation_ValidationTypeDefs__WEBPACK_IMPORTED_MODULE_12__.ComparisonType.hasValue,
        values: 'cardio'
      }]
    };
    _ui_framework_form_validation_ValidationManager__WEBPACK_IMPORTED_MODULE_13__.ValidationManager.getInstance().addRuleToForm(form, rule);
    rule = {
      targetDataFieldId: 'reps',
      response: _ui_framework_form_validation_ValidationTypeDefs__WEBPACK_IMPORTED_MODULE_12__.ConditionResponse.hide,
      conditions: [{
        sourceDataFieldId: 'type',
        comparison: _ui_framework_form_validation_ValidationTypeDefs__WEBPACK_IMPORTED_MODULE_12__.ComparisonType.hasValue,
        values: 'strength'
      }]
    };
    _ui_framework_form_validation_ValidationManager__WEBPACK_IMPORTED_MODULE_13__.ValidationManager.getInstance().addRuleToForm(form, rule);
    rule = {
      targetDataFieldId: 'sets',
      response: _ui_framework_form_validation_ValidationTypeDefs__WEBPACK_IMPORTED_MODULE_12__.ConditionResponse.hide,
      conditions: [{
        sourceDataFieldId: 'type',
        comparison: _ui_framework_form_validation_ValidationTypeDefs__WEBPACK_IMPORTED_MODULE_12__.ComparisonType.hasValue,
        values: 'strength'
      }]
    };
    _ui_framework_form_validation_ValidationManager__WEBPACK_IMPORTED_MODULE_13__.ValidationManager.getInstance().addRuleToForm(form, rule);
    rule = {
      targetDataFieldId: 'weight',
      response: _ui_framework_form_validation_ValidationTypeDefs__WEBPACK_IMPORTED_MODULE_12__.ConditionResponse.hide,
      conditions: [{
        sourceDataFieldId: 'type',
        comparison: _ui_framework_form_validation_ValidationTypeDefs__WEBPACK_IMPORTED_MODULE_12__.ComparisonType.hasValue,
        values: 'strength'
      }]
    };
    _ui_framework_form_validation_ValidationManager__WEBPACK_IMPORTED_MODULE_13__.ValidationManager.getInstance().addRuleToForm(form, rule);
    rule = {
      targetDataFieldId: 'distance',
      response: _ui_framework_form_validation_ValidationTypeDefs__WEBPACK_IMPORTED_MODULE_12__.ConditionResponse.show,
      conditions: [{
        sourceDataFieldId: 'type',
        comparison: _ui_framework_form_validation_ValidationTypeDefs__WEBPACK_IMPORTED_MODULE_12__.ComparisonType.hasValue,
        values: 'strength'
      }]
    };
    _ui_framework_form_validation_ValidationManager__WEBPACK_IMPORTED_MODULE_13__.ValidationManager.getInstance().addRuleToForm(form, rule);
    rule = {
      targetDataFieldId: 'distance',
      response: _ui_framework_form_validation_ValidationTypeDefs__WEBPACK_IMPORTED_MODULE_12__.ConditionResponse.hide,
      conditions: [{
        sourceDataFieldId: 'type',
        comparison: _ui_framework_form_validation_ValidationTypeDefs__WEBPACK_IMPORTED_MODULE_12__.ComparisonType.hasValue,
        values: 'cardio'
      }]
    };
    _ui_framework_form_validation_ValidationManager__WEBPACK_IMPORTED_MODULE_13__.ValidationManager.getInstance().addRuleToForm(form, rule);
  };

  _proto.hideAllSideBars = function hideAllSideBars() {
    this.chatSidebar.eventHide(null);
    this.userSearchSidebar.eventHide(null);
  };

  _proto.handleShowUserSearch = function handleShowUserSearch(event) {
    logger('Handling Show User Search');
    event.preventDefault(); //this.hideAllSideBars();
    // prevent anything from happening if we are not logged in

    if (!_Controller__WEBPACK_IMPORTED_MODULE_1__["default"].getInstance().isLoggedIn()) {
      // @ts-ignore
      window.location.href = _AppTypes__WEBPACK_IMPORTED_MODULE_4__.API_Config.login;
      return;
    }

    this.userSearchSidebar.eventShow(event);
  };

  _proto.handleShowExerciseTypes = function handleShowExerciseTypes(event) {
    logger('Handling Show Exercise Types');
    event.preventDefault(); //this.hideAllSideBars();
    // prevent anything from happening if we are not logged in

    if (!_Controller__WEBPACK_IMPORTED_MODULE_1__["default"].getInstance().isLoggedIn()) {
      // @ts-ignore
      window.location.href = _AppTypes__WEBPACK_IMPORTED_MODULE_4__.API_Config.login;
      return;
    }

    this.exerciseTypesSidebar.eventShow(event);
  };

  _proto.handleShowChat = function handleShowChat(roomName) {
    logger('Handling Show Chat'); //event.preventDefault();
    //this.hideAllSideBars();
    // prevent anything from happening if we are not logged in

    if (!_Controller__WEBPACK_IMPORTED_MODULE_1__["default"].getInstance().isLoggedIn()) {
      // @ts-ignore
      window.location.href = _AppTypes__WEBPACK_IMPORTED_MODULE_4__.API_Config.login;
      return;
    }

    this.chatSidebar.eventShow(null);

    if (roomName) {
      this.chatView.selectChatRoom(roomName);
    }
  };

  _proto.countChanged = function countChanged(newCount) {
    //
    var buffer = 'Chat <i class="fas fa-inbox"></i>';

    if (newCount > 0) {
      buffer += " <span class=\"badge badge-pill badge-primary\">&nbsp;" + newCount + "&nbsp;</span>";
    }

    if (this.chatNavigationItem) this.chatNavigationItem.innerHTML = "" + buffer;
  };

  return Root;
}();

$(function () {
  var root = new Root();
  root.onDocumentLoad();
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
/* harmony export */   "VIEW_CONTAINER": () => (/* binding */ VIEW_CONTAINER)
/* harmony export */ });
var Decorator;

(function (Decorator) {
  Decorator[Decorator["Incomplete"] = 0] = "Incomplete";
  Decorator[Decorator["Complete"] = 1] = "Complete";
  Decorator[Decorator["Persisted"] = 2] = "Persisted";
  Decorator[Decorator["PersistedLocally"] = 3] = "PersistedLocally";
})(Decorator || (Decorator = {}));

var STATE_NAMES = {
  users: 'user',
  chatLogs: 'chatLog',
  exerciseTypes: 'exerciseType',
  workouts: 'workout',
  recentUserSearches: 'recentUserSearch'
};
var API_Config = {
  login: '/login',
  users: '/api/users',
  exerciseTypes: '/api/exercise-types',
  workouts: '/api/workouts'
};
var NAVIGATION = {
  showMyWorkouts: 'navigationItemMyWorkouts',
  userSearchId: 'navigationItemUserSearch',
  exerciseTypesId: 'navigationItemExerciseTypes',
  chatId: 'navigationItemChat'
};
var DRAGGABLE = {
  typeUser: 'user',
  typeExerciseType: 'exerciseType',
  fromUserSearch: 'userSearch',
  fromFavourites: 'favourites',
  fromExerciseTypes: 'exerciseTypes'
};
var VIEW_NAME = {
  blockedUsers: 'blockedUsers',
  chatLog: 'chatLog',
  chatLogs: 'chatLogs',
  favouriteUsers: 'favouriteUsers',
  exerciseTypes: 'exerciseTypes',
  userSearch: 'userSearch'
};
var VIEW_CONTAINER = {
  exerciseTypeDetail: "exerciseTypeDetail"
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
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _state_MemoryBufferStateManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state/MemoryBufferStateManager */ "./src/state/MemoryBufferStateManager.ts");
/* harmony import */ var _socket_SocketManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./socket/SocketManager */ "./src/socket/SocketManager.ts");
/* harmony import */ var _state_AsyncStateManagerWrapper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./state/AsyncStateManagerWrapper */ "./src/state/AsyncStateManagerWrapper.ts");
/* harmony import */ var _state_AggregateStateManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./state/AggregateStateManager */ "./src/state/AggregateStateManager.ts");
/* harmony import */ var _SocketListenerDelegate__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./SocketListenerDelegate */ "./src/SocketListenerDelegate.ts");
/* harmony import */ var _socket_ChatManager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./socket/ChatManager */ "./src/socket/ChatManager.ts");
/* harmony import */ var _socket_NotificationController__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./socket/NotificationController */ "./src/socket/NotificationController.ts");
/* harmony import */ var _AppTypes__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./AppTypes */ "./src/AppTypes.ts");
/* harmony import */ var _state_RESTApiStateManager__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./state/RESTApiStateManager */ "./src/state/RESTApiStateManager.ts");
/* harmony import */ var _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./model/DataObjectTypeDefs */ "./src/model/DataObjectTypeDefs.ts");
/* harmony import */ var _model_ObjectDefinitionRegistry__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./model/ObjectDefinitionRegistry */ "./src/model/ObjectDefinitionRegistry.ts");
/* harmony import */ var _model_BasicObjectDefinitionFactory__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./model/BasicObjectDefinitionFactory */ "./src/model/BasicObjectDefinitionFactory.ts");
/* harmony import */ var _ui_framework_helper_SimpleValueDataSource__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./ui-framework/helper/SimpleValueDataSource */ "./src/ui-framework/helper/SimpleValueDataSource.ts");
/* harmony import */ var _ui_framework_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./ui-framework/ConfigurationTypes */ "./src/ui-framework/ConfigurationTypes.ts");















var cLogger = debug__WEBPACK_IMPORTED_MODULE_0___default()('controller-ts');
var cLoggerDetail = debug__WEBPACK_IMPORTED_MODULE_0___default()('controller-ts-detail');

var Controller = /*#__PURE__*/function () {
  Controller.getInstance = function getInstance() {
    if (!Controller._instance) {
      Controller._instance = new Controller();
    }

    return Controller._instance;
  };

  function Controller() {}

  var _proto = Controller.prototype;

  _proto.connectToApplication = function connectToApplication(applicationView, clientSideStorage) {
    this.applicationView = applicationView;
    this.clientSideStorage = clientSideStorage; // setup the API calls

    var restSM = _state_RESTApiStateManager__WEBPACK_IMPORTED_MODULE_9__.RESTApiStateManager.getInstance();
    restSM.initialise([{
      stateName: _AppTypes__WEBPACK_IMPORTED_MODULE_8__.STATE_NAMES.users,
      serverURL: '',
      api: _AppTypes__WEBPACK_IMPORTED_MODULE_8__.API_Config.users,
      isActive: true
    }, {
      stateName: _AppTypes__WEBPACK_IMPORTED_MODULE_8__.STATE_NAMES.exerciseTypes,
      serverURL: '',
      api: _AppTypes__WEBPACK_IMPORTED_MODULE_8__.API_Config.exerciseTypes,
      isActive: true,
      idField: '_id'
    }, {
      stateName: _AppTypes__WEBPACK_IMPORTED_MODULE_8__.STATE_NAMES.workouts,
      serverURL: '',
      api: _AppTypes__WEBPACK_IMPORTED_MODULE_8__.API_Config.workouts,
      isActive: true,
      idField: '_id'
    }]);
    var aggregateSM = _state_AggregateStateManager__WEBPACK_IMPORTED_MODULE_4__.AggregateStateManager.getInstance();
    var memorySM = _state_MemoryBufferStateManager__WEBPACK_IMPORTED_MODULE_1__["default"].getInstance();
    var asyncSM = new _state_AsyncStateManagerWrapper__WEBPACK_IMPORTED_MODULE_3__["default"](aggregateSM, restSM);
    aggregateSM.addStateManager(memorySM, [], false);
    aggregateSM.addStateManager(asyncSM, [], false);
    this.stateManager = aggregateSM; // state listener

    this.stateChanged = this.stateChanged.bind(this);
    this.stateChangedItemAdded = this.stateChangedItemAdded.bind(this);
    this.stateChangedItemRemoved = this.stateChangedItemRemoved.bind(this);
    this.stateChangedItemUpdated = this.stateChangedItemUpdated.bind(this); // call backs

    this.callbackAddToCollection = this.callbackAddToCollection.bind(this);
    this.callbackRemoveFromCollection = this.callbackRemoveFromCollection.bind(this);
    this.callbackGetCollection = this.callbackGetCollection.bind(this); //event handlers

    this.addBoardGameToCollection = this.addBoardGameToCollection.bind(this); // data objects

    this.setupDataObjectDefinitions();
    return this;
  };

  _proto.setupDataObjectDefinitions = function setupDataObjectDefinitions() {
    // create the object definitions for the exercise type and workout
    var exerciseTypeDefinition = _model_ObjectDefinitionRegistry__WEBPACK_IMPORTED_MODULE_11__.ObjectDefinitionRegistry.getInstance().addDefinition(_AppTypes__WEBPACK_IMPORTED_MODULE_8__.STATE_NAMES.exerciseTypes, 'Exercise', true, true, true, '_id');
    _model_BasicObjectDefinitionFactory__WEBPACK_IMPORTED_MODULE_12__.BasicObjectDefinitionFactory.getInstance().addStringFieldToObjDefinition(exerciseTypeDefinition, "type", "Type", _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_10__.FieldType.limitedChoice, true, "Choose cardio or strength", new _ui_framework_helper_SimpleValueDataSource__WEBPACK_IMPORTED_MODULE_13__.SimpleValueDataSource([{
      name: 'Cardio',
      value: 'cardio'
    }, {
      name: 'Strength',
      value: 'strength'
    }]));
    _model_BasicObjectDefinitionFactory__WEBPACK_IMPORTED_MODULE_12__.BasicObjectDefinitionFactory.getInstance().addStringFieldToObjDefinition(exerciseTypeDefinition, "name", "Name", _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_10__.FieldType.text, true, "Exercise name");
    _model_BasicObjectDefinitionFactory__WEBPACK_IMPORTED_MODULE_12__.BasicObjectDefinitionFactory.getInstance().addStringFieldToObjDefinition(exerciseTypeDefinition, "duration", "Duration", _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_10__.FieldType.shortTime, true, "Exercise time");
    _model_BasicObjectDefinitionFactory__WEBPACK_IMPORTED_MODULE_12__.BasicObjectDefinitionFactory.getInstance().addStringFieldToObjDefinition(exerciseTypeDefinition, "sets", "Sets", _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_10__.FieldType.integer, false, "Number of sets");
    _model_BasicObjectDefinitionFactory__WEBPACK_IMPORTED_MODULE_12__.BasicObjectDefinitionFactory.getInstance().addStringFieldToObjDefinition(exerciseTypeDefinition, "reps", "Repetitions", _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_10__.FieldType.integer, false, "Number of reps");
    _model_BasicObjectDefinitionFactory__WEBPACK_IMPORTED_MODULE_12__.BasicObjectDefinitionFactory.getInstance().addStringFieldToObjDefinition(exerciseTypeDefinition, "weight", "Weight", _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_10__.FieldType.float, false, "Weight used");
    _model_BasicObjectDefinitionFactory__WEBPACK_IMPORTED_MODULE_12__.BasicObjectDefinitionFactory.getInstance().addStringFieldToObjDefinition(exerciseTypeDefinition, "distance", "Distance", _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_10__.FieldType.float, false, "Distance travelled");
    cLogger("Exercise type data object definition");
    cLogger(exerciseTypeDefinition);
    cLoggerDetail(_model_ObjectDefinitionRegistry__WEBPACK_IMPORTED_MODULE_11__.ObjectDefinitionRegistry.getInstance().findDefinition('exerciseType'));
    var workoutDefinition = _model_ObjectDefinitionRegistry__WEBPACK_IMPORTED_MODULE_11__.ObjectDefinitionRegistry.getInstance().addDefinition('workout', 'Workout', true, true, true, '_id');
    var exercisesFieldDefinition = _model_BasicObjectDefinitionFactory__WEBPACK_IMPORTED_MODULE_12__.BasicObjectDefinitionFactory.getInstance().addStringFieldToObjDefinition(workoutDefinition, "exercises", "Exercises", _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_10__.FieldType.collection, true, "Exercises in this workout");
    exercisesFieldDefinition.idType = _ui_framework_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_14__.KeyType.collection;
    exercisesFieldDefinition.collectionOfDataObjectId = exerciseTypeDefinition.id;
    cLogger("Workout data object definition");
    cLogger(workoutDefinition);
    cLoggerDetail(_model_ObjectDefinitionRegistry__WEBPACK_IMPORTED_MODULE_11__.ObjectDefinitionRegistry.getInstance().findDefinition('workout'));
  }
  /*
      Get the base data for the application (users, entries)
  */
  ;

  _proto.initialise = function initialise() {
    cLogger('Initialising data state'); // listen for socket events

    var socketListerDelegate = new _SocketListenerDelegate__WEBPACK_IMPORTED_MODULE_5__["default"]();
    _socket_SocketManager__WEBPACK_IMPORTED_MODULE_2__["default"].getInstance().setListener(socketListerDelegate); // now that we have all the user we can setup the chat system but only if we are logged in

    cLogger("Setting up chat system for user " + this.getLoggedInUserId() + ": " + this.getLoggedInUsername());

    if (this.getLoggedInUserId().trim().length > 0) {
      // setup the chat system
      var chatManager = _socket_ChatManager__WEBPACK_IMPORTED_MODULE_6__.ChatManager.getInstance(); // this connects the manager to the socket system
      // setup the chat notification system

      _socket_NotificationController__WEBPACK_IMPORTED_MODULE_7__.NotificationController.getInstance();
      chatManager.setCurrentUser(this.getLoggedInUsername()); // let the application view know about message counts

      chatManager.setUnreadCountListener(this.applicationView);
      chatManager.login(); // load the users

      this.getStateManager().getStateByName(_AppTypes__WEBPACK_IMPORTED_MODULE_8__.STATE_NAMES.users);
      this.getStateManager().getStateByName(_AppTypes__WEBPACK_IMPORTED_MODULE_8__.STATE_NAMES.exerciseTypes);
    }
  };

  _proto.getStateManager = function getStateManager() {
    return this.stateManager;
  };

  _proto.isLoggedIn = function isLoggedIn() {
    var isLoggedIn = false;

    try {
      // @ts-ignore
      if (loggedInUser) {
        isLoggedIn = true;
      }
    } catch (error) {}

    return isLoggedIn;
  };

  _proto.getLoggedInUserId = function getLoggedInUserId() {
    var result = '';

    try {
      // @ts-ignore
      if (loggedInUser) {
        // @ts-ignore
        result = loggedInUser._id;
      }
    } catch (error) {}

    cLoggerDetail("Logged in user id is " + result);
    return result;
  };

  _proto.getLoggedInUsername = function getLoggedInUsername() {
    var result = '';

    try {
      // @ts-ignore
      if (loggedInUser) {
        // @ts-ignore
        result = loggedInUser.username;
      }
    } catch (error) {}

    cLoggerDetail("Logged in user is " + result);
    return result;
  };

  _proto.handleMessage = function handleMessage(message) {
    cLogger(message);
  };

  _proto.getCurrentUser = function getCurrentUser() {
    return this.getLoggedInUserId();
  };

  _proto.stateChangedItemAdded = function stateChangedItemAdded(managerName, name, itemAdded) {};

  _proto.stateChangedItemRemoved = function stateChangedItemRemoved(managerName, name, itemRemoved) {};

  _proto.stateChangedItemUpdated = function stateChangedItemUpdated(managerName, name, itemUpdated, itemNewValue) {};

  _proto.stateChanged = function stateChanged(managerName, name, values) {};

  _proto.callbackBoardGameDetails = function callbackBoardGameDetails(data, status, associatedStateName) {
    cLogger("callback for bgg search for single board game " + associatedStateName + " with status " + status);

    if (status >= 200 && status <= 299) {
      // do we have any data?
      cLogger(data);
    }
  };

  _proto.callbackAddToCollection = function callbackAddToCollection(data, status, associatedStateName) {
    cLogger("callback for add single board game " + associatedStateName + " to my collection with status " + status);

    if (status >= 200 && status <= 299) {
      // do we have any data?
      cLogger(data);
    }
  };

  _proto.callbackRemoveFromCollection = function callbackRemoveFromCollection(data, status, associatedStateName) {
    cLogger("callback for remove single board game " + associatedStateName + " from my collection with status " + status);

    if (status >= 200 && status <= 299) {
      // do we have any data?
      cLogger(data);
    }
  };

  _proto.callbackGetCollection = function callbackGetCollection(data, status, associatedStateName) {
    cLogger("callback for getting my collection of board games " + associatedStateName + " to my collection with status " + status);

    if (status >= 200 && status <= 299) {
      // do we have any data?
      cLogger(data);
    }
  };

  _proto.addBoardGameToCollection = function addBoardGameToCollection(event) {
    cLogger("Handling Add Board Game to collection");
  }
  /*
  *
  * Simple Application state (URL, logged in user)
  *
   */
  ;

  _proto.getServerAPIURL = function getServerAPIURL() {
    var result = ""; // @ts-ignore

    if (window.ENV && window.ENV.serverURL) {
      // @ts-ignore
      result = window.ENV.serverURL;
    }

    return result;
  };

  _proto.handleShowChat = function handleShowChat(roomName) {
    this.applicationView.handleShowChat(roomName);
  };

  return Controller;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Controller);

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
/* harmony import */ var _util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util/EqualityFunctions */ "./src/util/EqualityFunctions.ts");
/* harmony import */ var _AppTypes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./AppTypes */ "./src/AppTypes.ts");
/* harmony import */ var _notification_NotificationManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./notification/NotificationManager */ "./src/notification/NotificationManager.ts");





var slLogger = debug__WEBPACK_IMPORTED_MODULE_0___default()('socket-listener');

var SocketListenerDelegate = /*#__PURE__*/function () {
  function SocketListenerDelegate() {}

  var _proto = SocketListenerDelegate.prototype;

  _proto.handleDataChangedByAnotherUser = function handleDataChangedByAnotherUser(message) {
    slLogger("Handling data change " + message.type + " on object type " + message.stateName + " made by user " + message.user);
    var changeUser = _Controller__WEBPACK_IMPORTED_MODULE_1__["default"].getInstance().getStateManager().findItemInState(_AppTypes__WEBPACK_IMPORTED_MODULE_3__.STATE_NAMES.users, {
      id: message.user
    }, _util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_2__.isSame);
    var username = "unknown";

    if (changeUser) {
      username = changeUser.username;
    }

    slLogger("Handling data change " + message.type + " on object type " + message.stateName + " made by user " + username);
    var stateObj = message.data;
    slLogger(stateObj); // ok lets work out where this change belongs

    try {
      switch (message.type) {
        case "create":
          {
            switch (message.stateName) {
              case _AppTypes__WEBPACK_IMPORTED_MODULE_3__.STATE_NAMES.users:
                {
                  _Controller__WEBPACK_IMPORTED_MODULE_1__["default"].getInstance().getStateManager().addNewItemToState(_AppTypes__WEBPACK_IMPORTED_MODULE_3__.STATE_NAMES.users, stateObj, true);
                  _notification_NotificationManager__WEBPACK_IMPORTED_MODULE_4__["default"].getInstance().show(stateObj.username, stateObj.username + " has just registered.", 'message');
                  break;
                }
            }

            break;
          }
      }
    } catch (err) {
      slLogger(err);
    }
  };

  _proto.handleMessage = function handleMessage(message) {
    slLogger("Received message: " + message);
  };

  _proto.getCurrentUser = function getCurrentUser() {
    return _Controller__WEBPACK_IMPORTED_MODULE_1__["default"].getInstance().getLoggedInUserId();
  };

  return SocketListenerDelegate;
}();



/***/ }),

/***/ "./src/component/sidebar/ChatRoomsSidebar.ts":
/*!***************************************************!*\
  !*** ./src/component/sidebar/ChatRoomsSidebar.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ui_framework_container_SidebarViewContainer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../ui-framework/container/SidebarViewContainer */ "./src/ui-framework/container/SidebarViewContainer.ts");
/* harmony import */ var _ui_framework_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../ui-framework/ConfigurationTypes */ "./src/ui-framework/ConfigurationTypes.ts");
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}




var ChatRoomsSidebar = /*#__PURE__*/function (_SidebarViewContainer) {
  _inheritsLoose(ChatRoomsSidebar, _SidebarViewContainer);

  function ChatRoomsSidebar() {
    return _SidebarViewContainer.call(this, ChatRoomsSidebar.SidebarPrefs) || this;
  }

  return ChatRoomsSidebar;
}(_ui_framework_container_SidebarViewContainer__WEBPACK_IMPORTED_MODULE_0__["default"]);

ChatRoomsSidebar.SidebarPrefs = {
  id: 'chatSideBar',
  expandedSize: '35%',
  location: _ui_framework_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.SidebarLocation.right
};
ChatRoomsSidebar.SidebarContainers = {
  chatLogs: 'chatLogs',
  chatLog: 'chatLogRoom'
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ChatRoomsSidebar);

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
/* harmony import */ var _ui_framework_container_SidebarViewContainer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../ui-framework/container/SidebarViewContainer */ "./src/ui-framework/container/SidebarViewContainer.ts");
/* harmony import */ var _ui_framework_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../ui-framework/ConfigurationTypes */ "./src/ui-framework/ConfigurationTypes.ts");
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}




var ExerciseTypesSidebar = /*#__PURE__*/function (_SidebarViewContainer) {
  _inheritsLoose(ExerciseTypesSidebar, _SidebarViewContainer);

  function ExerciseTypesSidebar() {
    return _SidebarViewContainer.call(this, ExerciseTypesSidebar.SidebarPrefs) || this;
  }

  return ExerciseTypesSidebar;
}(_ui_framework_container_SidebarViewContainer__WEBPACK_IMPORTED_MODULE_0__["default"]);

ExerciseTypesSidebar.SidebarPrefs = {
  id: 'exerciseTypesSidebar',
  expandedSize: '50%',
  location: _ui_framework_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.SidebarLocation.left
};
ExerciseTypesSidebar.SidebarContainers = {
  container: 'exerciseTypesContainer'
};


/***/ }),

/***/ "./src/component/sidebar/UserSearchSidebar.ts":
/*!****************************************************!*\
  !*** ./src/component/sidebar/UserSearchSidebar.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ui_framework_container_SidebarViewContainer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../ui-framework/container/SidebarViewContainer */ "./src/ui-framework/container/SidebarViewContainer.ts");
/* harmony import */ var _ui_framework_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../ui-framework/ConfigurationTypes */ "./src/ui-framework/ConfigurationTypes.ts");
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}




var UserSearchSidebar = /*#__PURE__*/function (_SidebarViewContainer) {
  _inheritsLoose(UserSearchSidebar, _SidebarViewContainer);

  function UserSearchSidebar() {
    return _SidebarViewContainer.call(this, UserSearchSidebar.SidebarPrefs) || this;
  }

  return UserSearchSidebar;
}(_ui_framework_container_SidebarViewContainer__WEBPACK_IMPORTED_MODULE_0__["default"]);

UserSearchSidebar.SidebarPrefs = {
  id: 'userSearchSideBar',
  expandedSize: '35%',
  location: _ui_framework_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.SidebarLocation.left
};
UserSearchSidebar.SidebarContainers = {
  recentSearches: 'userSearchZone',
  favourites: 'favouriteUsersDropZone',
  blocked: 'blockedUsersDropZone'
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UserSearchSidebar);

/***/ }),

/***/ "./src/component/view/BlockedUserView.ts":
/*!***********************************************!*\
  !*** ./src/component/view/BlockedUserView.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _socket_NotificationController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../socket/NotificationController */ "./src/socket/NotificationController.ts");
/* harmony import */ var _socket_ChatManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../socket/ChatManager */ "./src/socket/ChatManager.ts");
/* harmony import */ var _ui_framework_view_implementation_AbstractStatefulCollectionView__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../ui-framework/view/implementation/AbstractStatefulCollectionView */ "./src/ui-framework/view/implementation/AbstractStatefulCollectionView.ts");
/* harmony import */ var _ui_framework_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../ui-framework/ConfigurationTypes */ "./src/ui-framework/ConfigurationTypes.ts");
/* harmony import */ var _AppTypes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../AppTypes */ "./src/AppTypes.ts");
/* harmony import */ var _ui_framework_view_delegate_ListViewRenderer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../ui-framework/view/delegate/ListViewRenderer */ "./src/ui-framework/view/delegate/ListViewRenderer.ts");
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}








var vLogger = debug__WEBPACK_IMPORTED_MODULE_0___default()('user-search-sidebar');

var BlockedUserView = /*#__PURE__*/function (_AbstractStatefulColl) {
  _inheritsLoose(BlockedUserView, _AbstractStatefulColl);

  function BlockedUserView(stateManager) {
    var _this;

    _this = _AbstractStatefulColl.call(this, BlockedUserView.DOMConfig, stateManager, _AppTypes__WEBPACK_IMPORTED_MODULE_5__.STATE_NAMES.users) || this; // list renderer

    _this.renderer = new _ui_framework_view_delegate_ListViewRenderer__WEBPACK_IMPORTED_MODULE_6__.ListViewRenderer(_assertThisInitialized(_this), _assertThisInitialized(_this)); // handler binding

    _this.handleLoggedInUsersUpdated = _this.handleLoggedInUsersUpdated.bind(_assertThisInitialized(_this));
    _this.handleFavouriteUserLoggedIn = _this.handleFavouriteUserLoggedIn.bind(_assertThisInitialized(_this));
    _this.handleFavouriteUserLoggedOut = _this.handleFavouriteUserLoggedOut.bind(_assertThisInitialized(_this));
    _this.handleFavouriteUsersChanged = _this.handleFavouriteUsersChanged.bind(_assertThisInitialized(_this));
    _this.handleBlockedUsersChanged = _this.handleBlockedUsersChanged.bind(_assertThisInitialized(_this));
    _this.handleLoggedInUsersUpdated = _this.handleLoggedInUsersUpdated.bind(_assertThisInitialized(_this));
    _socket_NotificationController__WEBPACK_IMPORTED_MODULE_1__.NotificationController.getInstance().addUserListener(_assertThisInitialized(_this));
    return _this;
  }

  var _proto = BlockedUserView.prototype;

  _proto.onDocumentLoaded = function onDocumentLoaded() {
    _AbstractStatefulColl.prototype.onDocumentLoaded.call(this);

    this.addEventListener(this);
  };

  _proto.canDeleteItem = function canDeleteItem(view, selectedItem) {
    return true;
  };

  _proto.documentLoaded = function documentLoaded(view) {};

  _proto.itemDeleted = function itemDeleted(view, selectedItem) {
    // @ts-ignore
    vLogger("Blocked user " + selectedItem.username + " with id " + selectedItem.id + " deleted - removing");
    _socket_ChatManager__WEBPACK_IMPORTED_MODULE_2__.ChatManager.getInstance().removeUserFromBlockedList(selectedItem.username);
  };

  _proto.itemSelected = function itemSelected(view, selectedItem) {
    throw new Error('Method not implemented.');
  };

  _proto.itemDragStarted = function itemDragStarted(view, selectedItem) {
    throw new Error('Method not implemented.');
  };

  _proto.itemAction = function itemAction(view, actionName, selectedItem) {
    throw new Error('Method not implemented.');
  };

  _proto.hideRequested = function hideRequested(view) {
    throw new Error('Method not implemented.');
  };

  _proto.showRequested = function showRequested(view) {
    throw new Error('Method not implemented.');
  };

  _proto.handleLoggedInUsersUpdated = function handleLoggedInUsersUpdated(usernames) {};

  _proto.handleFavouriteUserLoggedIn = function handleFavouriteUserLoggedIn(username) {};

  _proto.handleFavouriteUserLoggedOut = function handleFavouriteUserLoggedOut(username) {};

  _proto.handleFavouriteUsersChanged = function handleFavouriteUsersChanged(usernames) {};

  _proto.handleBlockedUsersChanged = function handleBlockedUsersChanged(usernames) {
    vLogger("Handle Blocked Users changed to " + usernames);
    this.updateViewForNamedCollection('', {});
  };

  _proto.getDisplayValueForItemInNamedCollection = function getDisplayValueForItemInNamedCollection(name, item) {
    return item.username;
  };

  _proto.getSecondaryModifierForItemInNamedCollection = function getSecondaryModifierForItemInNamedCollection(name, item) {
    return _ui_framework_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_4__.Modifier.warning;
  };

  _proto.getIdForItemInNamedCollection = function getIdForItemInNamedCollection(name, item) {
    return item._id;
  };

  _proto.updateViewForNamedCollection = function updateViewForNamedCollection(name, newState) {
    var _this$stateManager; // find the blocked users in the user list


    var blockedUsers = [];
    var users = (_this$stateManager = this.stateManager) == null ? void 0 : _this$stateManager.getStateByName(_AppTypes__WEBPACK_IMPORTED_MODULE_5__.STATE_NAMES.users);

    if (users) {
      users.forEach(function (user) {
        if (_socket_ChatManager__WEBPACK_IMPORTED_MODULE_2__.ChatManager.getInstance().isUserInBlockedList(user.username)) {
          blockedUsers.push(user);
        }
      });
    }

    _AbstractStatefulColl.prototype.updateViewForNamedCollection.call(this, name, blockedUsers);
  };

  _proto.itemDropped = function itemDropped(view, droppedItem) {
    if (_socket_ChatManager__WEBPACK_IMPORTED_MODULE_2__.ChatManager.getInstance().isUserInBlockedList(droppedItem.username)) {
      vLogger(droppedItem.username + " already in blocked list, ignoring");
      return;
    } // add the user to the Chat Manager and we should get an event about it


    _socket_ChatManager__WEBPACK_IMPORTED_MODULE_2__.ChatManager.getInstance().addUserToBlockedList(droppedItem.username);
  };

  _proto.itemDeselected = function itemDeselected(view, selectedItem) {};

  _proto.canSelectItem = function canSelectItem(view, selectedItem) {
    return false;
  };

  return BlockedUserView;
}(_ui_framework_view_implementation_AbstractStatefulCollectionView__WEBPACK_IMPORTED_MODULE_3__["default"]);

BlockedUserView.DOMConfig = {
  viewConfig: {
    resultsContainerId: 'blockedUsers',
    dataSourceId: _AppTypes__WEBPACK_IMPORTED_MODULE_5__.VIEW_NAME.blockedUsers,
    drop: {
      acceptFrom: [_AppTypes__WEBPACK_IMPORTED_MODULE_5__.DRAGGABLE.fromUserSearch, _AppTypes__WEBPACK_IMPORTED_MODULE_5__.DRAGGABLE.fromFavourites],
      acceptTypes: [_AppTypes__WEBPACK_IMPORTED_MODULE_5__.DRAGGABLE.typeUser]
    }
  },
  resultsElementType: 'a',
  resultsElementAttributes: [{
    name: 'href',
    value: '#'
  }],
  resultsClasses: 'list-group-item my-list-item truncate-notification list-group-item-action',
  keyId: '_id',
  keyType: _ui_framework_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_4__.KeyType.string,
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
    textElementType: 'span',
    textElementClasses: 'mb-1',
    select: true,
    quickDelete: true,
    delete: {
      buttonClasses: 'btn bg-danger text-white btn-circle btn-sm',
      iconClasses: 'fas fa-trash-alt'
    }
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BlockedUserView);

/***/ }),

/***/ "./src/component/view/ChatLogDetailView.ts":
/*!*************************************************!*\
  !*** ./src/component/view/ChatLogDetailView.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _socket_NotificationController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../socket/NotificationController */ "./src/socket/NotificationController.ts");
/* harmony import */ var _socket_ChatManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../socket/ChatManager */ "./src/socket/ChatManager.ts");
/* harmony import */ var _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../util/BrowserUtil */ "./src/util/BrowserUtil.ts");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _socket_Types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../socket/Types */ "./src/socket/Types.ts");
/* harmony import */ var _Controller__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../Controller */ "./src/Controller.ts");
/* harmony import */ var _AppTypes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../AppTypes */ "./src/AppTypes.ts");
/* harmony import */ var _ui_framework_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../ui-framework/ConfigurationTypes */ "./src/ui-framework/ConfigurationTypes.ts");
/* harmony import */ var _notification_NotificationManager__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../notification/NotificationManager */ "./src/notification/NotificationManager.ts");










var csLoggerDetail = debug__WEBPACK_IMPORTED_MODULE_0___default()('chat-sidebar:detail');

var ChatLogDetailView = /*#__PURE__*/function () {
  function ChatLogDetailView(stateManager) {
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
    this.stateManager.addChangeListenerForName(_AppTypes__WEBPACK_IMPORTED_MODULE_7__.STATE_NAMES.users, this);
  }

  var _proto = ChatLogDetailView.prototype;

  _proto.canSelectItem = function canSelectItem(view, selectedItem) {
    return true;
  };

  _proto.hasPermissionToDeleteItemInNamedCollection = function hasPermissionToDeleteItemInNamedCollection(name, item) {
    throw new Error('Method not implemented.');
  };

  _proto.hasPermissionToUpdateItemInNamedCollection = function hasPermissionToUpdateItemInNamedCollection(name, item) {
    throw new Error('Method not implemented.');
  };

  _proto.hasChanged = function hasChanged() {
    throw new Error('Method not implemented.');
  };

  _proto.setContainedBy = function setContainedBy(container) {};

  _proto.addEventListener = function addEventListener(listener) {};

  _proto.getIdForItemInNamedCollection = function getIdForItemInNamedCollection(name, item) {
    throw new Error('Method not implemented.');
  };

  _proto.getDisplayValueForItemInNamedCollection = function getDisplayValueForItemInNamedCollection(name, item) {
    throw new Error('Method not implemented.');
  };

  _proto.compareItemsForEquality = function compareItemsForEquality(item1, item2) {
    throw new Error('Method not implemented.');
  };

  _proto.getModifierForItemInNamedCollection = function getModifierForItemInNamedCollection(name, item) {
    throw new Error('Method not implemented.');
  };

  _proto.getSecondaryModifierForItemInNamedCollection = function getSecondaryModifierForItemInNamedCollection(name, item) {
    throw new Error('Method not implemented.');
  };

  _proto.getBadgeValueForItemInNamedCollection = function getBadgeValueForItemInNamedCollection(name, item) {
    throw new Error('Method not implemented.');
  };

  _proto.getBackgroundImageForItemInNamedCollection = function getBackgroundImageForItemInNamedCollection(name, item) {
    throw new Error('Method not implemented.');
  };

  _proto.updateViewForNamedCollection = function updateViewForNamedCollection(name, newState) {
    throw new Error('Method not implemented.');
  };

  _proto.itemDeselected = function itemDeselected(view, selectedItem) {
    csLoggerDetail("Chat Log with id " + selectedItem.roomName + " deselected");

    if (this.selectedChatLog && selectedItem.roomName === this.selectedChatLog.roomName) {
      this.selectedChatLog = null;
      this.checkCanComment();
      this.clearChatLog();
    }
  };

  _proto.itemSelected = function itemSelected(view, selectedItem) {
    this.selectedChatLog = selectedItem;

    if (this.selectedChatLog) {
      csLoggerDetail("Chat Log with id " + selectedItem.roomName + " selected");
      this.checkCanComment();
      this.renderChatLog(this.selectedChatLog);
    }
  };

  _proto.canDeleteItem = function canDeleteItem(view, selectedItem) {
    return true;
  };

  _proto.itemDeleted = function itemDeleted(view, selectedItem) {
    csLoggerDetail("Chat Log with " + selectedItem.roomName + " deleting");

    if (this.selectedChatLog && this.selectedChatLog.roomName === selectedItem.roomName) {
      this.checkCanComment();
      this.renderChatLog(this.selectedChatLog);
    }
  };

  _proto.hideRequested = function hideRequested(view) {
    this.selectedChatLog = null;
    this.checkCanComment();
    this.clearChatLog();
  };

  _proto.handleUserDrop = function handleUserDrop(event) {
    csLoggerDetail('drop event on current chat room');

    if (this.selectedChatLog) {
      // @ts-ignore
      var draggedObjectJSON = event.dataTransfer.getData(_ui_framework_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_8__.DRAGGABLE_KEY_ID);
      var draggedObject = JSON.parse(draggedObjectJSON);
      csLoggerDetail(draggedObject);

      if (draggedObject[_ui_framework_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_8__.DRAGGABLE_TYPE] === _AppTypes__WEBPACK_IMPORTED_MODULE_7__.DRAGGABLE.typeUser) {
        //add the user to the current chat if not already there
        _socket_ChatManager__WEBPACK_IMPORTED_MODULE_2__.ChatManager.getInstance().sendInvite(draggedObject.username, this.selectedChatLog.roomName);
        _notification_NotificationManager__WEBPACK_IMPORTED_MODULE_9__["default"].getInstance().show('Chat', "Invited " + draggedObject.username + " to the chat.");
      }
    }
  };

  _proto.handleChatLogUpdated = function handleChatLogUpdated(log) {
    csLoggerDetail("Handling chat log updates");
    this.checkCanComment();
    this.renderChatLog(log);
  };

  _proto.handleAddMessage = function handleAddMessage(event) {
    event.preventDefault();
    event.stopPropagation();
    csLoggerDetail("Handling message event");

    if (this.selectedChatLog) {
      // @ts-ignore
      if (this.commentEl && this.commentEl.value.trim().length === 0) return; // @ts-ignore

      var messageContent = this.commentEl.value.trim(); // @ts-ignore

      this.commentEl.value = '';
      var sentMessage = _socket_ChatManager__WEBPACK_IMPORTED_MODULE_2__.ChatManager.getInstance().sendMessage(this.selectedChatLog.roomName, messageContent, _socket_Types__WEBPACK_IMPORTED_MODULE_5__.Priority.Normal, {});

      if (sentMessage) {
        // add the message to our display
        var messageEl = this.addChatMessage(sentMessage); // scroll to bottom

        _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_3__["default"].scrollSmoothTo(messageEl);
      }
    }
  };

  _proto.onDocumentLoaded = function onDocumentLoaded() {
    var _this = this; // @ts-ignore


    this.chatLogDiv = document.getElementById(ChatLogDetailView.chatLogId); // @ts-ignore

    this.commentEl = document.getElementById(ChatLogDetailView.commentId); // @ts-ignore

    this.chatForm = document.getElementById(ChatLogDetailView.newFormId); // @ts-ignore

    this.sendMessageButton = document.getElementById(ChatLogDetailView.submitCommentId); // @ts-ignore

    this.leaveChatButton = document.getElementById(ChatLogDetailView.leaveChatId); // @ts-ignore

    this.chatRoomDiv = document.getElementById(ChatLogDetailView.chatLogRoomId); // @ts-ignore

    this.fastUserSearch = document.getElementById(ChatLogDetailView.chatFastSearchUserNames);
    this.chatRoomDiv.addEventListener('dragover', function (event) {
      csLoggerDetail('Dragged over');
      if (_this.selectedChatLog) event.preventDefault();
    });
    this.chatRoomDiv.addEventListener('drop', this.handleUserDrop);
    this.chatForm.addEventListener('submit', this.handleAddMessage);
    this.leaveChatButton.addEventListener('click', this.leaveChat);
    this.checkCanComment(); // fast user search
    // @ts-ignore

    var fastSearchEl = $("#" + ChatLogDetailView.chatFastSearchUserNames); // @ts-ignore

    fastSearchEl.on('autocompleteselect', this.eventUserSelected);
  };

  _proto.eventUserSelected = function eventUserSelected(event, ui) {
    event.preventDefault();
    event.stopPropagation();
    csLoggerDetail("User " + ui.item.label + " with id " + ui.item.value + " selected"); // @ts-ignore

    event.target.innerText = ''; // add to the chat, if one selected

    if (this.selectedChatLog) _socket_ChatManager__WEBPACK_IMPORTED_MODULE_2__.ChatManager.getInstance().sendInvite(ui.item.label, this.selectedChatLog.roomName);
    _notification_NotificationManager__WEBPACK_IMPORTED_MODULE_9__["default"].getInstance().show('Chat', "Invited " + ui.item.label + " to the chat.");
  };

  _proto.addChatMessage = function addChatMessage(message) {
    var chatMessageEl = document.createElement('div');
    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_3__["default"].addRemoveClasses(chatMessageEl, "message"); // are we dealing with an "join"/"exit" message?

    if (message.from.trim().length === 0) {
      var messageSenderEl = document.createElement('div');
      _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_3__["default"].addRemoveClasses(messageSenderEl, 'message-sender');
      messageSenderEl.innerText = message.message;
      chatMessageEl.appendChild(messageSenderEl);
    } else {
      if (message.from === _socket_ChatManager__WEBPACK_IMPORTED_MODULE_2__.ChatManager.getInstance().getCurrentUser()) {
        _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_3__["default"].addRemoveClasses(chatMessageEl, "my-message");
      } else {
        var _messageSenderEl = document.createElement('div');

        _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_3__["default"].addRemoveClasses(_messageSenderEl, 'message-sender');
        _messageSenderEl.innerText = message.from + '   ' + moment__WEBPACK_IMPORTED_MODULE_4___default()(message.created, 'YYYYMMDDHHmmss').format('DD/MM/YYYY ');
        chatMessageEl.appendChild(_messageSenderEl);
      }

      var contentEl = document.createElement('div');

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
  };

  _proto.reRenderChatMessages = function reRenderChatMessages(chatLog) {
    var _this2 = this;

    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_3__["default"].removeAllChildren(this.chatLogDiv);
    var messageEl = null;
    chatLog.messages.forEach(function (message) {
      messageEl = _this2.addChatMessage(message);
    }); // scroll to the last message (if any)

    if (messageEl) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_3__["default"].scrollTo(messageEl);
  };

  _proto.renderChatLog = function renderChatLog(chatLog) {
    csLoggerDetail("Chat Log " + chatLog.roomName + " rendering");

    if (this.selectedChatLog) {
      if (this.selectedChatLog.roomName === chatLog.roomName) {
        this.selectedChatLog = chatLog;
        _socket_ChatManager__WEBPACK_IMPORTED_MODULE_2__.ChatManager.getInstance().touchChatLog(chatLog.roomName); // render the chat conversation

        this.reRenderChatMessages(chatLog);
      }
    }
  };

  _proto.handleChatLogsUpdated = function handleChatLogsUpdated() {
    if (this.selectedChatLog) {
      _socket_ChatManager__WEBPACK_IMPORTED_MODULE_2__.ChatManager.getInstance().touchChatLog(this.selectedChatLog.roomName); // render the chat conversation

      this.reRenderChatMessages(this.selectedChatLog);
    }

    this.checkCanComment();
  };

  _proto.handleChatStarted = function handleChatStarted(log) {
    this.selectedChatLog = log;
    this.renderChatLog(log);
  };

  _proto.leaveChat = function leaveChat(event) {
    event.preventDefault();
    event.stopPropagation();

    if (this.selectedChatLog) {
      _socket_ChatManager__WEBPACK_IMPORTED_MODULE_2__.ChatManager.getInstance().leaveChat(this.selectedChatLog.roomName);
      this.selectedChatLog = null;
      this.clearChatLog();
      this.checkCanComment();
    }
  };

  _proto.checkCanComment = function checkCanComment() {
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
  };

  _proto.clearChatLog = function clearChatLog() {
    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_3__["default"].removeAllChildren(this.chatLogDiv);
  };

  _proto.stateChanged = function stateChanged(managerName, name, newValue) {
    if (name === _AppTypes__WEBPACK_IMPORTED_MODULE_7__.STATE_NAMES.users) {
      // @ts-ignore
      var fastSearchEl = $("#" + ChatLogDetailView.ssFastSearchUserNames); // what is my username?

      var myUsername = _Controller__WEBPACK_IMPORTED_MODULE_6__["default"].getInstance().getLoggedInUsername(); // for each name, construct the patient details to display and the id referenced

      var fastSearchValues = [];
      newValue.forEach(function (item) {
        var searchValue = {
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
  };

  _proto.stateChangedItemAdded = function stateChangedItemAdded(managerName, name, itemAdded) {
    this.stateChanged(managerName, name, this.stateManager.getStateByName(name));
  };

  _proto.stateChangedItemRemoved = function stateChangedItemRemoved(managerName, name, itemRemoved) {};

  _proto.stateChangedItemUpdated = function stateChangedItemUpdated(managerName, name, itemUpdated, itemNewValue) {};

  _proto.handleOfflineMessagesReceived = function handleOfflineMessagesReceived(messages) {};

  _proto.handleInvitationDeclined = function handleInvitationDeclined(room, username) {};

  _proto.handleNewInviteReceived = function handleNewInviteReceived(invite) {
    return true;
  };

  _proto.itemDragStarted = function itemDragStarted(view, selectedItem) {};

  _proto.itemAction = function itemAction(view, actionName, selectedItem) {};

  _proto.documentLoaded = function documentLoaded(view) {};

  _proto.showRequested = function showRequested(view) {};

  _proto.itemDropped = function itemDropped(view, droppedItem) {};

  _proto.getName = function getName() {
    return _AppTypes__WEBPACK_IMPORTED_MODULE_7__.VIEW_NAME.chatLog;
  };

  _proto.hidden = function hidden() {
    this.hideRequested(this);
  };

  _proto.getDataSourceKeyId = function getDataSourceKeyId() {
    return "";
  };

  _proto.getUIConfig = function getUIConfig() {
    // @ts-ignore
    return undefined;
  };

  _proto.render = function render() {};

  _proto.show = function show() {};

  return ChatLogDetailView;
}();

ChatLogDetailView.newFormId = "newMessage";
ChatLogDetailView.commentId = "message";
ChatLogDetailView.submitCommentId = "submitMessage";
ChatLogDetailView.chatLogId = 'chatLog';
ChatLogDetailView.chatLogRoomId = 'chatLogRoom';
ChatLogDetailView.leaveChatId = 'leaveChat';
ChatLogDetailView.chatFastSearchUserNames = 'chatFastSearchUserNames';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ChatLogDetailView);

/***/ }),

/***/ "./src/component/view/ChatLogsView.ts":
/*!********************************************!*\
  !*** ./src/component/view/ChatLogsView.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _socket_NotificationController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../socket/NotificationController */ "./src/socket/NotificationController.ts");
/* harmony import */ var _socket_ChatManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../socket/ChatManager */ "./src/socket/ChatManager.ts");
/* harmony import */ var _ui_framework_view_implementation_AbstractStatefulCollectionView__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../ui-framework/view/implementation/AbstractStatefulCollectionView */ "./src/ui-framework/view/implementation/AbstractStatefulCollectionView.ts");
/* harmony import */ var _ui_framework_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../ui-framework/ConfigurationTypes */ "./src/ui-framework/ConfigurationTypes.ts");
/* harmony import */ var _state_MemoryBufferStateManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../state/MemoryBufferStateManager */ "./src/state/MemoryBufferStateManager.ts");
/* harmony import */ var _AppTypes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../AppTypes */ "./src/AppTypes.ts");
/* harmony import */ var _util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../util/EqualityFunctions */ "./src/util/EqualityFunctions.ts");
/* harmony import */ var _ui_framework_view_delegate_ListViewRenderer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../ui-framework/view/delegate/ListViewRenderer */ "./src/ui-framework/view/delegate/ListViewRenderer.ts");
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}










var csLogger = debug__WEBPACK_IMPORTED_MODULE_0___default()('chat-sidebar');

var ChatLogsView = /*#__PURE__*/function (_AbstractStatefulColl) {
  _inheritsLoose(ChatLogsView, _AbstractStatefulColl);

  function ChatLogsView() {
    var _this;

    _this = _AbstractStatefulColl.call(this, ChatLogsView.DOMConfig, new _state_MemoryBufferStateManager__WEBPACK_IMPORTED_MODULE_5__["default"](), _AppTypes__WEBPACK_IMPORTED_MODULE_6__.STATE_NAMES.chatLogs) || this;
    _this.selectedChatLog = null;
    _this.renderer = new _ui_framework_view_delegate_ListViewRenderer__WEBPACK_IMPORTED_MODULE_8__.ListViewRenderer(_assertThisInitialized(_this), _assertThisInitialized(_this)); // handler binding

    _this.handleChatLogsUpdated = _this.handleChatLogsUpdated.bind(_assertThisInitialized(_this));
    _this.handleChatLogUpdated = _this.handleChatLogUpdated.bind(_assertThisInitialized(_this));
    _this.handleChatStarted = _this.handleChatStarted.bind(_assertThisInitialized(_this));
    _socket_NotificationController__WEBPACK_IMPORTED_MODULE_1__.NotificationController.getInstance().addListener(_assertThisInitialized(_this));
    return _this;
  }

  var _proto = ChatLogsView.prototype;

  _proto.compareItemsForEquality = function compareItemsForEquality(item1, item2) {
    return (0,_util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_7__.isSameRoom)(item1, item2);
  };

  _proto.updateStateManager = function updateStateManager() {
    csLogger("Updating state with chat manager");
    var newState = _socket_ChatManager__WEBPACK_IMPORTED_MODULE_2__.ChatManager.getInstance().getChatLogs();
    csLogger(newState);
    this.stateManager.setStateByName(_AppTypes__WEBPACK_IMPORTED_MODULE_6__.STATE_NAMES.chatLogs, newState, true);
  };

  _proto.handleNewInviteReceived = function handleNewInviteReceived(invite) {
    return true;
  };

  _proto.handleChatLogUpdated = function handleChatLogUpdated(log) {
    csLogger("Handling chat log updates");
    this.updateStateManager();
  };

  _proto.onDocumentLoaded = function onDocumentLoaded() {
    _AbstractStatefulColl.prototype.onDocumentLoaded.call(this);

    this.addEventCollectionListener(this);
    this.updateStateManager();
  };

  _proto.getIdForItemInNamedCollection = function getIdForItemInNamedCollection(name, item) {
    return item.roomName;
  };

  _proto.getDisplayValueForItemInNamedCollection = function getDisplayValueForItemInNamedCollection(name, item) {
    return item.users.join(',');
  };

  _proto.getModifierForItemInNamedCollection = function getModifierForItemInNamedCollection(name, item) {
    var result = _ui_framework_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_4__.Modifier.inactive;

    if (this.selectedChatLog) {
      if (this.selectedChatLog.roomName === item.roomName) {
        result = _ui_framework_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_4__.Modifier.active;
      }
    }

    return result;
  };

  _proto.getSecondaryModifierForItemInNamedCollection = function getSecondaryModifierForItemInNamedCollection(name, item) {
    return this.getModifierForItemInNamedCollection(name, item);
  };

  _proto.selectChatRoom = function selectChatRoom(roomName) {
    var room = _socket_ChatManager__WEBPACK_IMPORTED_MODULE_2__.ChatManager.getInstance().getChatLog(roomName);
    this.selectedChatLog = room;
    this.eventForwarder.itemSelected(this, this.selectedChatLog);
    this.updateStateManager();
  };

  _proto.handleChatLogsUpdated = function handleChatLogsUpdated() {
    if (this.selectedChatLog) {
      _socket_ChatManager__WEBPACK_IMPORTED_MODULE_2__.ChatManager.getInstance().touchChatLog(this.selectedChatLog.roomName);
    }

    this.updateStateManager();
  };

  _proto.handleChatStarted = function handleChatStarted(log) {
    this.selectedChatLog = log;
    this.eventForwarder.itemSelected(this, this.selectedChatLog);
    this.updateStateManager();
  };

  _proto.getBadgeValueForItemInNamedCollection = function getBadgeValueForItemInNamedCollection(name, item) {
    return item.numOfNewMessages;
  };

  _proto.canDeleteItem = function canDeleteItem(view, selectedItem) {
    return true;
  };

  _proto.itemDeleted = function itemDeleted(view, selectedItem) {
    csLogger("Deleting chat " + selectedItem.roomName);
    _socket_ChatManager__WEBPACK_IMPORTED_MODULE_2__.ChatManager.getInstance().leaveChat(selectedItem.roomName);

    if (this.selectedChatLog && this.selectedChatLog.roomName === selectedItem.roomName) {
      this.eventForwarder.itemDeselected(this, this.selectedChatLog);
      this.selectedChatLog = null;
    }

    this.updateStateManager();
  };

  _proto.hideRequested = function hideRequested(view) {
    if (this.selectedChatLog) {
      this.eventForwarder.itemDeselected(this, this.selectedChatLog);
      this.selectedChatLog = null;
    }
  };

  _proto.hidden = function hidden() {
    this.hideRequested(this);
  };

  _proto.documentLoaded = function documentLoaded(view) {};

  _proto.itemAction = function itemAction(view, actionName, selectedItem) {};

  _proto.itemDragStarted = function itemDragStarted(view, selectedItem) {};

  _proto.itemDropped = function itemDropped(view, droppedItem) {};

  _proto.itemSelected = function itemSelected(view, selectedItem) {
    this.selectedChatLog = selectedItem;
    this.updateStateManager();
  };

  _proto.itemDeselected = function itemDeselected(view, selectedItem) {
    this.selectedChatLog = null;
    this.updateStateManager();
  };

  _proto.showRequested = function showRequested(view) {};

  _proto.handleOfflineMessagesReceived = function handleOfflineMessagesReceived(messages) {};

  _proto.handleInvitationDeclined = function handleInvitationDeclined(room, username) {};

  _proto.canSelectItem = function canSelectItem(view, selectedItem) {
    return true;
  };

  return ChatLogsView;
}(_ui_framework_view_implementation_AbstractStatefulCollectionView__WEBPACK_IMPORTED_MODULE_3__["default"]);

ChatLogsView.DOMConfig = {
  viewConfig: {
    resultsContainerId: 'chatLogs',
    dataSourceId: _AppTypes__WEBPACK_IMPORTED_MODULE_6__.VIEW_NAME.chatLogs
  },
  resultsElementType: 'a',
  resultsElementAttributes: [{
    name: 'href',
    value: '#'
  }],
  resultsClasses: 'list-group-item my-list-item truncate-notification list-group-item-action',
  keyId: 'roomName',
  keyType: _ui_framework_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_4__.KeyType.string,
  modifiers: {
    normal: '',
    inactive: 'list-group-item-dark',
    active: 'list-group-item-primary',
    warning: ''
  },
  detail: {
    containerClasses: 'd-flex w-100 justify-content-between',
    textElementType: 'span',
    textElementClasses: 'mb-1',
    select: true,
    delete: {
      buttonClasses: 'btn bg-danger text-white btn-circle btn-sm',
      iconClasses: 'text-black fas fa-sign-out-alt'
    },
    badge: {
      elementType: 'span',
      elementClasses: 'badge badge-pill badge-primary mr-1'
    }
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ChatLogsView);

/***/ }),

/***/ "./src/component/view/ExerciseTypesView.ts":
/*!*************************************************!*\
  !*** ./src/component/view/ExerciseTypesView.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ExerciseTypesView": () => (/* binding */ ExerciseTypesView)
/* harmony export */ });
/* harmony import */ var _ui_framework_view_implementation_AbstractStatefulCollectionView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../ui-framework/view/implementation/AbstractStatefulCollectionView */ "./src/ui-framework/view/implementation/AbstractStatefulCollectionView.ts");
/* harmony import */ var _ui_framework_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../ui-framework/ConfigurationTypes */ "./src/ui-framework/ConfigurationTypes.ts");
/* harmony import */ var _AppTypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../AppTypes */ "./src/AppTypes.ts");
/* harmony import */ var _ui_framework_view_delegate_ListViewRenderer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../ui-framework/view/delegate/ListViewRenderer */ "./src/ui-framework/view/delegate/ListViewRenderer.ts");
/* harmony import */ var _Controller__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Controller */ "./src/Controller.ts");
/* harmony import */ var _util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../util/EqualityFunctions */ "./src/util/EqualityFunctions.ts");
/* harmony import */ var _model_BasicObjectDefinitionFactory__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../model/BasicObjectDefinitionFactory */ "./src/model/BasicObjectDefinitionFactory.ts");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_7__);
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}









var logger = debug__WEBPACK_IMPORTED_MODULE_7___default()('exercise-types-view');
var ExerciseTypesView = /*#__PURE__*/function (_AbstractStatefulColl) {
  _inheritsLoose(ExerciseTypesView, _AbstractStatefulColl);

  function ExerciseTypesView() {
    var _this;

    _this = _AbstractStatefulColl.call(this, ExerciseTypesView.DOMConfig, _Controller__WEBPACK_IMPORTED_MODULE_4__["default"].getInstance().getStateManager(), _AppTypes__WEBPACK_IMPORTED_MODULE_2__.STATE_NAMES.exerciseTypes) || this;
    _this.renderer = new _ui_framework_view_delegate_ListViewRenderer__WEBPACK_IMPORTED_MODULE_3__.ListViewRenderer(_assertThisInitialized(_this), _assertThisInitialized(_this));
    return _this;
  }

  var _proto = ExerciseTypesView.prototype;

  _proto.canDeleteItem = function canDeleteItem(view, selectedItem) {
    logger("Can Delete " + selectedItem);
    logger(selectedItem[_model_BasicObjectDefinitionFactory__WEBPACK_IMPORTED_MODULE_6__.FIELD_CreatedBy]);

    if (selectedItem[_model_BasicObjectDefinitionFactory__WEBPACK_IMPORTED_MODULE_6__.FIELD_CreatedBy]) {
      if (selectedItem[_model_BasicObjectDefinitionFactory__WEBPACK_IMPORTED_MODULE_6__.FIELD_CreatedBy] === _Controller__WEBPACK_IMPORTED_MODULE_4__["default"].getInstance().getLoggedInUsername()) {
        return true;
      }
    }

    return false;
  };

  _proto.compareItemsForEquality = function compareItemsForEquality(item1, item2) {
    return (0,_util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_5__.isSameMongo)(item1, item2);
  };

  _proto.getIdForItemInNamedCollection = function getIdForItemInNamedCollection(name, item) {
    return item._id;
  };

  _proto.getDisplayValueForItemInNamedCollection = function getDisplayValueForItemInNamedCollection(name, item) {
    return item.name;
  };

  _proto.hasPermissionToDeleteItemInNamedCollection = function hasPermissionToDeleteItemInNamedCollection(name, item) {
    logger("Has delete permission " + item);
    logger(item[_model_BasicObjectDefinitionFactory__WEBPACK_IMPORTED_MODULE_6__.FIELD_CreatedBy]);

    if (item[_model_BasicObjectDefinitionFactory__WEBPACK_IMPORTED_MODULE_6__.FIELD_CreatedBy]) {
      if (item[_model_BasicObjectDefinitionFactory__WEBPACK_IMPORTED_MODULE_6__.FIELD_CreatedBy] === _Controller__WEBPACK_IMPORTED_MODULE_4__["default"].getInstance().getLoggedInUsername()) {
        return true;
      }
    }

    return false;
  };

  return ExerciseTypesView;
}(_ui_framework_view_implementation_AbstractStatefulCollectionView__WEBPACK_IMPORTED_MODULE_0__["default"]);
ExerciseTypesView.DOMConfig = {
  viewConfig: {
    resultsContainerId: 'exerciseTypes',
    dataSourceId: _AppTypes__WEBPACK_IMPORTED_MODULE_2__.VIEW_NAME.exerciseTypes
  },
  resultsElementType: 'a',
  resultsElementAttributes: [{
    name: 'href',
    value: '#'
  }],
  resultsClasses: 'list-group-item my-list-item truncate-notification list-group-item-action',
  keyId: '_id',
  keyType: _ui_framework_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.KeyType.string,
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
    textElementType: 'span',
    textElementClasses: 'mb-1',
    select: true,
    icons: function icons(name, item) {
      if (item.type) {
        if (item.type === 'cardio') {
          return ['fas fa-running'];
        } else {
          return ['fas fa-dumbbell'];
        }
      }

      return [];
    },
    delete: {
      buttonClasses: 'btn bg-danger text-white btn-circle btn-sm',
      iconClasses: 'text-black fas fa-sign-out-alt'
    },
    drag: {
      type: _AppTypes__WEBPACK_IMPORTED_MODULE_2__.DRAGGABLE.typeExerciseType,
      from: _AppTypes__WEBPACK_IMPORTED_MODULE_2__.DRAGGABLE.fromExerciseTypes
    }
  }
};

/***/ }),

/***/ "./src/component/view/FavouriteUserView.ts":
/*!*************************************************!*\
  !*** ./src/component/view/FavouriteUserView.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _socket_NotificationController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../socket/NotificationController */ "./src/socket/NotificationController.ts");
/* harmony import */ var _Controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Controller */ "./src/Controller.ts");
/* harmony import */ var _socket_ChatManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../socket/ChatManager */ "./src/socket/ChatManager.ts");
/* harmony import */ var _ui_framework_view_implementation_AbstractStatefulCollectionView__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../ui-framework/view/implementation/AbstractStatefulCollectionView */ "./src/ui-framework/view/implementation/AbstractStatefulCollectionView.ts");
/* harmony import */ var _ui_framework_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../ui-framework/ConfigurationTypes */ "./src/ui-framework/ConfigurationTypes.ts");
/* harmony import */ var _AppTypes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../AppTypes */ "./src/AppTypes.ts");
/* harmony import */ var _ui_framework_view_delegate_ListViewRenderer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../ui-framework/view/delegate/ListViewRenderer */ "./src/ui-framework/view/delegate/ListViewRenderer.ts");
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}









var vLogger = debug__WEBPACK_IMPORTED_MODULE_0___default()('user-search-sidebar');
var vLoggerDetail = debug__WEBPACK_IMPORTED_MODULE_0___default()('user-search-sidebar:detail');

var FavouriteUserView = /*#__PURE__*/function (_AbstractStatefulColl) {
  _inheritsLoose(FavouriteUserView, _AbstractStatefulColl);

  function FavouriteUserView(stateManager) {
    var _this;

    _this = _AbstractStatefulColl.call(this, FavouriteUserView.DOMConfig, stateManager, _AppTypes__WEBPACK_IMPORTED_MODULE_6__.STATE_NAMES.users) || this;
    _this.renderer = new _ui_framework_view_delegate_ListViewRenderer__WEBPACK_IMPORTED_MODULE_7__.ListViewRenderer(_assertThisInitialized(_this), _assertThisInitialized(_this)); // handler binding

    _this.handleLoggedInUsersUpdated = _this.handleLoggedInUsersUpdated.bind(_assertThisInitialized(_this));
    _this.handleFavouriteUserLoggedIn = _this.handleFavouriteUserLoggedIn.bind(_assertThisInitialized(_this));
    _this.handleFavouriteUserLoggedOut = _this.handleFavouriteUserLoggedOut.bind(_assertThisInitialized(_this));
    _this.handleFavouriteUsersChanged = _this.handleFavouriteUsersChanged.bind(_assertThisInitialized(_this));
    _this.handleBlockedUsersChanged = _this.handleBlockedUsersChanged.bind(_assertThisInitialized(_this));
    _this.handleLoggedInUsersUpdated = _this.handleLoggedInUsersUpdated.bind(_assertThisInitialized(_this));
    _socket_NotificationController__WEBPACK_IMPORTED_MODULE_1__.NotificationController.getInstance().addUserListener(_assertThisInitialized(_this));
    return _this;
  }

  var _proto = FavouriteUserView.prototype;

  _proto.onDocumentLoaded = function onDocumentLoaded() {
    _AbstractStatefulColl.prototype.onDocumentLoaded.call(this);

    this.addEventCollectionListener(this);
  };

  _proto.handleLoggedInUsersUpdated = function handleLoggedInUsersUpdated(usernames) {
    vLogger("Received new list of users who are logged in ");
    this.updateViewForNamedCollection('', {});
  };

  _proto.handleFavouriteUserLoggedIn = function handleFavouriteUserLoggedIn(username) {
    vLogger("Handle Favourite User " + username + " logged in");
    this.updateViewForNamedCollection('', {});
  };

  _proto.handleFavouriteUserLoggedOut = function handleFavouriteUserLoggedOut(username) {
    vLogger("Handle Favourite User " + username + " logged in");
    this.updateViewForNamedCollection('', {});
  };

  _proto.handleFavouriteUsersChanged = function handleFavouriteUsersChanged(usernames) {
    vLogger("Handle Favourite Users changed to " + usernames);
    this.updateViewForNamedCollection('', {});
  };

  _proto.getIdForItemInNamedCollection = function getIdForItemInNamedCollection(name, item) {
    return item._id;
  };

  _proto.getDisplayValueForItemInNamedCollection = function getDisplayValueForItemInNamedCollection(name, item) {
    return item.username;
  };

  _proto.getModifierForItemInNamedCollection = function getModifierForItemInNamedCollection(name, item) {
    var result = _ui_framework_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_5__.Modifier.normal; // if the user is currently logged out make the item inactive

    if (!_socket_ChatManager__WEBPACK_IMPORTED_MODULE_3__.ChatManager.getInstance().isUserLoggedIn(item.username)) {
      result = _ui_framework_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_5__.Modifier.inactive;
    }

    return result;
  };

  _proto.getSecondaryModifierForItemInNamedCollection = function getSecondaryModifierForItemInNamedCollection(name, item) {
    var result = _ui_framework_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_5__.Modifier.normal;
    vLoggerDetail("Checking for item secondary modifiers " + item.username); // if the user is in the black list then show warning and a favourite user is highlighted

    if (_socket_NotificationController__WEBPACK_IMPORTED_MODULE_1__.NotificationController.getInstance().isFavouriteUser(item.username)) {
      vLoggerDetail("is favourite");
      result = _ui_framework_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_5__.Modifier.active;
    }

    if (_socket_NotificationController__WEBPACK_IMPORTED_MODULE_1__.NotificationController.getInstance().isBlockedUser(item.username)) {
      vLoggerDetail("is blocked");
      result = _ui_framework_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_5__.Modifier.warning;
    }

    return result;
  };

  _proto.updateViewForNamedCollection = function updateViewForNamedCollection(name, newState) {
    var _this$stateManager; // find the blocked users in the user list


    var favUsers = [];
    var users = (_this$stateManager = this.stateManager) == null ? void 0 : _this$stateManager.getStateByName(_AppTypes__WEBPACK_IMPORTED_MODULE_6__.STATE_NAMES.users);

    if (users) {
      users.forEach(function (user) {
        if (_socket_ChatManager__WEBPACK_IMPORTED_MODULE_3__.ChatManager.getInstance().isUserInFavouriteList(user.username)) {
          favUsers.push(user);
        }
      });
    }

    _AbstractStatefulColl.prototype.updateViewForNamedCollection.call(this, name, favUsers);
  };

  _proto.documentLoaded = function documentLoaded(view) {};

  _proto.handleBlockedUsersChanged = function handleBlockedUsersChanged(usernames) {
    this.updateViewForNamedCollection('', {});
  };

  _proto.hideRequested = function hideRequested(view) {};

  _proto.itemAction = function itemAction(view, actionName, selectedItem) {
    // @ts-ignore
    if (actionName === this.uiConfig.extraActions[0].name) {
      if (_socket_ChatManager__WEBPACK_IMPORTED_MODULE_3__.ChatManager.getInstance().isUserInBlockedList(selectedItem.username)) {
        vLogger(selectedItem.username + " already in fav list, ignoring");
        return;
      }

      _socket_ChatManager__WEBPACK_IMPORTED_MODULE_3__.ChatManager.getInstance().addUserToBlockedList(selectedItem.username);
    }
  };

  _proto.canDeleteItem = function canDeleteItem(view, selectedItem) {
    return true;
  };

  _proto.itemDeleted = function itemDeleted(view, selectedItem) {
    vLogger("Favourite user " + selectedItem.username + " with id " + selectedItem.id + " deleted - removing");
    _socket_ChatManager__WEBPACK_IMPORTED_MODULE_3__.ChatManager.getInstance().removeUserFromFavouriteList(selectedItem.username);
  };

  _proto.itemDragStarted = function itemDragStarted(view, selectedItem) {};

  _proto.itemDeselected = function itemDeselected(view, selectedItem) {};

  _proto.itemDropped = function itemDropped(view, droppedItem) {
    vLogger("Handling item dropped " + droppedItem.username);

    if (_socket_ChatManager__WEBPACK_IMPORTED_MODULE_3__.ChatManager.getInstance().isUserInFavouriteList(droppedItem.username)) {
      vLogger(droppedItem.username + " already in fav list, ignoring");
      return;
    } // add the user to the Chat Manager and we should get an event about it


    _socket_ChatManager__WEBPACK_IMPORTED_MODULE_3__.ChatManager.getInstance().addUserToFavouriteList(droppedItem.username);
  };

  _proto.itemSelected = function itemSelected(view, selectedItem) {
    var roomName = _socket_NotificationController__WEBPACK_IMPORTED_MODULE_1__.NotificationController.getInstance().startChatWithUser(selectedItem.username);
    _Controller__WEBPACK_IMPORTED_MODULE_2__["default"].getInstance().handleShowChat(roomName);
  };

  _proto.showRequested = function showRequested(view) {};

  _proto.canSelectItem = function canSelectItem(view, selectedItem) {
    return true;
  };

  return FavouriteUserView;
}(_ui_framework_view_implementation_AbstractStatefulCollectionView__WEBPACK_IMPORTED_MODULE_4__["default"]);

FavouriteUserView.DOMConfig = {
  viewConfig: {
    resultsContainerId: 'favouriteUsers',
    drop: {
      acceptFrom: [_AppTypes__WEBPACK_IMPORTED_MODULE_6__.DRAGGABLE.fromUserSearch],
      acceptTypes: [_AppTypes__WEBPACK_IMPORTED_MODULE_6__.DRAGGABLE.typeUser]
    },
    dataSourceId: _AppTypes__WEBPACK_IMPORTED_MODULE_6__.VIEW_NAME.favouriteUsers
  },
  resultsElementType: 'a',
  resultsElementAttributes: [{
    name: 'href',
    value: '#'
  }],
  resultsClasses: 'list-group-item my-list-item truncate-notification list-group-item-action',
  keyId: '_id',
  keyType: _ui_framework_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_5__.KeyType.string,
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
    textElementType: 'span',
    textElementClasses: 'mb-1',
    select: true,
    quickDelete: true,
    delete: {
      buttonClasses: 'btn bg-danger text-white btn-circle btn-sm',
      iconClasses: 'fas fa-trash-alt'
    },
    drag: {
      type: _AppTypes__WEBPACK_IMPORTED_MODULE_6__.DRAGGABLE.typeUser,
      from: _AppTypes__WEBPACK_IMPORTED_MODULE_6__.DRAGGABLE.fromFavourites
    }
  },
  extraActions: [{
    name: 'block',
    buttonClasses: 'btn bg-warning text-white btn-circle btn-sm mr-1',
    iconClasses: 'fas fa-user-slash'
  }]
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FavouriteUserView);

/***/ }),

/***/ "./src/component/view/UserSearchView.ts":
/*!**********************************************!*\
  !*** ./src/component/view/UserSearchView.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util/EqualityFunctions */ "./src/util/EqualityFunctions.ts");
/* harmony import */ var _socket_NotificationController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../socket/NotificationController */ "./src/socket/NotificationController.ts");
/* harmony import */ var _Controller__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Controller */ "./src/Controller.ts");
/* harmony import */ var _state_BrowserStorageStateManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../state/BrowserStorageStateManager */ "./src/state/BrowserStorageStateManager.ts");
/* harmony import */ var _socket_ChatManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../socket/ChatManager */ "./src/socket/ChatManager.ts");
/* harmony import */ var _ui_framework_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../ui-framework/ConfigurationTypes */ "./src/ui-framework/ConfigurationTypes.ts");
/* harmony import */ var _AppTypes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../AppTypes */ "./src/AppTypes.ts");
/* harmony import */ var _ui_framework_view_implementation_AbstractStatefulCollectionView__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../ui-framework/view/implementation/AbstractStatefulCollectionView */ "./src/ui-framework/view/implementation/AbstractStatefulCollectionView.ts");
/* harmony import */ var _ui_framework_view_delegate_ListViewRenderer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../ui-framework/view/delegate/ListViewRenderer */ "./src/ui-framework/view/delegate/ListViewRenderer.ts");
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}











var vLogger = debug__WEBPACK_IMPORTED_MODULE_0___default()('user-search');
var vLoggerDetail = debug__WEBPACK_IMPORTED_MODULE_0___default()('user-search-detail');

var UserSearchView = /*#__PURE__*/function (_AbstractStatefulColl) {
  _inheritsLoose(UserSearchView, _AbstractStatefulColl);

  function UserSearchView(stateManager) {
    var _this;

    _this = _AbstractStatefulColl.call(this, UserSearchView.DOMConfig, stateManager, _AppTypes__WEBPACK_IMPORTED_MODULE_7__.STATE_NAMES.users) || this;
    _this.loggedInUsers = [];
    _this.renderer = new _ui_framework_view_delegate_ListViewRenderer__WEBPACK_IMPORTED_MODULE_9__.ListViewRenderer(_assertThisInitialized(_this), _assertThisInitialized(_this)); // handler binding

    _this.updateViewForNamedCollection = _this.updateViewForNamedCollection.bind(_assertThisInitialized(_this));
    _this.eventUserSelected = _this.eventUserSelected.bind(_assertThisInitialized(_this));
    _this.handleLoggedInUsersUpdated = _this.handleLoggedInUsersUpdated.bind(_assertThisInitialized(_this));
    _this.handleFavouriteUserLoggedIn = _this.handleFavouriteUserLoggedIn.bind(_assertThisInitialized(_this));
    _this.handleFavouriteUserLoggedOut = _this.handleFavouriteUserLoggedOut.bind(_assertThisInitialized(_this));
    _this.handleFavouriteUsersChanged = _this.handleFavouriteUsersChanged.bind(_assertThisInitialized(_this));
    _this.handleBlockedUsersChanged = _this.handleBlockedUsersChanged.bind(_assertThisInitialized(_this));
    _this.handleLoggedInUsersUpdated = _this.handleLoggedInUsersUpdated.bind(_assertThisInitialized(_this));
    _this.itemDeleted = _this.itemDeleted.bind(_assertThisInitialized(_this)); // register state change listening

    _this.localisedSM = new _state_BrowserStorageStateManager__WEBPACK_IMPORTED_MODULE_4__["default"](true);

    _this.localisedSM.addChangeListenerForName(_AppTypes__WEBPACK_IMPORTED_MODULE_7__.STATE_NAMES.recentUserSearches, _assertThisInitialized(_this));

    _socket_NotificationController__WEBPACK_IMPORTED_MODULE_2__.NotificationController.getInstance().addUserListener(_assertThisInitialized(_this));
    vLogger(_this.localisedSM.getStateByName(_AppTypes__WEBPACK_IMPORTED_MODULE_7__.STATE_NAMES.recentUserSearches));
    return _this;
  }

  var _proto = UserSearchView.prototype;

  _proto.handleLoggedInUsersUpdated = function handleLoggedInUsersUpdated(usernames) {
    vLogger("Received new list of users who are logged in ");
    vLogger(usernames);
    this.loggedInUsers = usernames;
    this.updateViewForNamedCollection(_AppTypes__WEBPACK_IMPORTED_MODULE_7__.STATE_NAMES.recentUserSearches, {});
  };

  _proto.handleFavouriteUserLoggedIn = function handleFavouriteUserLoggedIn(username) {
    vLogger("Handle Favourite User " + username + " logged in");
    this.updateViewForNamedCollection(_AppTypes__WEBPACK_IMPORTED_MODULE_7__.STATE_NAMES.recentUserSearches, {});
  };

  _proto.handleFavouriteUserLoggedOut = function handleFavouriteUserLoggedOut(username) {
    vLogger("Handle Favourite User " + username + " logged in");
    this.updateViewForNamedCollection(_AppTypes__WEBPACK_IMPORTED_MODULE_7__.STATE_NAMES.recentUserSearches, {});
  };

  _proto.handleFavouriteUsersChanged = function handleFavouriteUsersChanged(usernames) {
    vLogger("Handle Favourite Users changed to " + usernames);
    this.updateViewForNamedCollection(_AppTypes__WEBPACK_IMPORTED_MODULE_7__.STATE_NAMES.recentUserSearches, {});
  };

  _proto.handleBlockedUsersChanged = function handleBlockedUsersChanged(usernames) {
    vLogger("Handle Blocked Users changed to " + usernames);
    this.updateViewForNamedCollection(_AppTypes__WEBPACK_IMPORTED_MODULE_7__.STATE_NAMES.recentUserSearches, {});
  };

  _proto.onDocumentLoaded = function onDocumentLoaded() {
    _AbstractStatefulColl.prototype.onDocumentLoaded.call(this); // @ts-ignore


    var fastSearchEl = $("#" + UserSearchView.fastSearchInputId); // @ts-ignore

    fastSearchEl.on('autocompleteselect', this.eventUserSelected);
  };

  _proto.getIdForItemInNamedCollection = function getIdForItemInNamedCollection(name, item) {
    return item._id;
  };

  _proto.getDisplayValueForItemInNamedCollection = function getDisplayValueForItemInNamedCollection(name, item) {
    return item.username;
  };

  _proto.getModifierForItemInNamedCollection = function getModifierForItemInNamedCollection(name, item) {
    var result = _ui_framework_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_6__.Modifier.normal;
    vLoggerDetail("Checking for item modifiers");
    vLoggerDetail(item); // if the user is currently logged out make the item inactive

    if (!_socket_ChatManager__WEBPACK_IMPORTED_MODULE_5__.ChatManager.getInstance().isUserLoggedIn(item.username)) {
      result = _ui_framework_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_6__.Modifier.inactive;
    }

    return result;
  };

  _proto.getSecondaryModifierForItemInNamedCollection = function getSecondaryModifierForItemInNamedCollection(name, item) {
    var result = _ui_framework_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_6__.Modifier.normal;
    vLoggerDetail("Checking for item secondary modifiers " + item.username); // if the user is in the black list then show warning and a favourite user is highlighted

    if (_socket_NotificationController__WEBPACK_IMPORTED_MODULE_2__.NotificationController.getInstance().isFavouriteUser(item.username)) {
      vLoggerDetail("is favourite");
      result = _ui_framework_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_6__.Modifier.active;
    }

    if (_socket_NotificationController__WEBPACK_IMPORTED_MODULE_2__.NotificationController.getInstance().isBlockedUser(item.username)) {
      vLoggerDetail("is blocked");
      result = _ui_framework_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_6__.Modifier.warning;
    }

    return result;
  };

  _proto.eventUserSelected = function eventUserSelected(event, ui) {
    event.preventDefault();
    event.stopPropagation();
    vLogger("User " + ui.item.label + " with id " + ui.item.value + " selected"); // @ts-ignore

    event.target.innerText = ''; // add the selected user to the recent user searches

    if (this.localisedSM.isItemInState(_AppTypes__WEBPACK_IMPORTED_MODULE_7__.STATE_NAMES.recentUserSearches, {
      _id: ui.item.value
    }, _util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_1__.isSameMongo)) return;
    var recentUserSearches = this.localisedSM.getStateByName(_AppTypes__WEBPACK_IMPORTED_MODULE_7__.STATE_NAMES.recentUserSearches);
    vLogger("saved searches too long? " + _AppTypes__WEBPACK_IMPORTED_MODULE_7__.STATE_NAMES.recentUserSearches);

    if (recentUserSearches.length >= UserSearchView.dataLimit) {
      vLogger('saved searches too long - removing first'); // remove the first item from recent searches

      var item = recentUserSearches.shift();
      this.localisedSM.removeItemFromState(_AppTypes__WEBPACK_IMPORTED_MODULE_7__.STATE_NAMES.recentUserSearches, item, _util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_1__.isSameMongo, true);
    } // save the searches


    this.localisedSM.addNewItemToState(_AppTypes__WEBPACK_IMPORTED_MODULE_7__.STATE_NAMES.recentUserSearches, {
      _id: ui.item.value,
      username: ui.item.label
    }, true);
  };

  _proto.updateViewForNamedCollection = function updateViewForNamedCollection(name, newState) {
    if (name === _AppTypes__WEBPACK_IMPORTED_MODULE_7__.STATE_NAMES.recentUserSearches) {
      vLogger("Updating for recent searches");
      newState = this.localisedSM.getStateByName(_AppTypes__WEBPACK_IMPORTED_MODULE_7__.STATE_NAMES.recentUserSearches);
      vLogger(newState);

      _AbstractStatefulColl.prototype.updateViewForNamedCollection.call(this, name, newState);
    }

    if (name === _AppTypes__WEBPACK_IMPORTED_MODULE_7__.STATE_NAMES.users) {
      // load the search names into the search field
      // what is my username?
      var myUsername = _Controller__WEBPACK_IMPORTED_MODULE_3__["default"].getInstance().getLoggedInUsername(); // @ts-ignore

      var fastSearchEl = $("#" + UserSearchView.fastSearchInputId); // for each name, construct the patient details to display and the id referenced

      var fastSearchValues = [];
      newState.forEach(function (item) {
        var searchValue = {
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
  };

  _proto.itemAction = function itemAction(view, actionName, selectedItem) {
    // @ts-ignore
    if (actionName === this.uiConfig.extraActions[0].name) {
      if (_socket_ChatManager__WEBPACK_IMPORTED_MODULE_5__.ChatManager.getInstance().isUserInFavouriteList(selectedItem.username)) {
        vLogger(selectedItem.username + " already in fav list, ignoring");
        return;
      }

      _socket_ChatManager__WEBPACK_IMPORTED_MODULE_5__.ChatManager.getInstance().addUserToFavouriteList(selectedItem.username);
    } // @ts-ignore


    if (actionName === this.uiConfig.extraActions[1].name) {
      if (_socket_ChatManager__WEBPACK_IMPORTED_MODULE_5__.ChatManager.getInstance().isUserInBlockedList(selectedItem.username)) {
        vLogger(selectedItem.username + " already in blocked list, ignoring");
        return;
      }

      _socket_ChatManager__WEBPACK_IMPORTED_MODULE_5__.ChatManager.getInstance().addUserToBlockedList(selectedItem.username);
    }
  };

  _proto.compareItemsForEquality = function compareItemsForEquality(item1, item2) {
    return (0,_util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_1__.isSame)(item1, item2);
  };

  _proto.itemDeleted = function itemDeleted(view, selectedItem) {
    vLoggerDetail(selectedItem);
    vLogger("Recent search user " + selectedItem.username + " with id " + selectedItem.id + " deleted - removing");
    this.localisedSM.removeItemFromState(_AppTypes__WEBPACK_IMPORTED_MODULE_7__.STATE_NAMES.recentUserSearches, selectedItem, this.compareItemsForEquality, true);
  };

  _proto.itemSelected = function itemSelected(view, selectedItem) {
    var roomName = _socket_NotificationController__WEBPACK_IMPORTED_MODULE_2__.NotificationController.getInstance().startChatWithUser(selectedItem.username);
    _Controller__WEBPACK_IMPORTED_MODULE_3__["default"].getInstance().handleShowChat(roomName);
  };

  return UserSearchView;
}(_ui_framework_view_implementation_AbstractStatefulCollectionView__WEBPACK_IMPORTED_MODULE_8__["default"]);

UserSearchView.fastSearchInputId = 'fastSearchUserNames';
UserSearchView.dataLimit = 10;
UserSearchView.DOMConfig = {
  viewConfig: {
    resultsContainerId: 'recentUserSearches',
    dataSourceId: _AppTypes__WEBPACK_IMPORTED_MODULE_7__.VIEW_NAME.userSearch
  },
  resultsElementType: 'a',
  resultsElementAttributes: [{
    name: 'href',
    value: '#'
  }],
  resultsClasses: 'list-group-item my-list-item truncate-notification list-group-item-action',
  keyId: '_id',
  keyType: _ui_framework_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_6__.KeyType.number,
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
    textElementType: 'span',
    textElementClasses: 'mb-1',
    select: true,
    quickDelete: true,
    delete: {
      buttonClasses: 'btn bg-danger text-white btn-circle btn-sm',
      iconClasses: 'fas fa-trash-alt'
    },
    drag: {
      type: _AppTypes__WEBPACK_IMPORTED_MODULE_7__.DRAGGABLE.typeUser,
      from: _AppTypes__WEBPACK_IMPORTED_MODULE_7__.DRAGGABLE.fromUserSearch
    }
  },
  extraActions: [{
    name: 'favourite',
    buttonClasses: 'btn bg-info text-white btn-circle btn-sm mr-1',
    iconClasses: 'fas fa-user-plus'
  }, {
    name: 'block',
    buttonClasses: 'btn bg-warning text-white btn-circle btn-sm mr-1',
    iconClasses: 'fas fa-user-slash'
  }]
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UserSearchView);

/***/ }),

/***/ "./src/model/BasicObjectDefinitionFactory.ts":
/*!***************************************************!*\
  !*** ./src/model/BasicObjectDefinitionFactory.ts ***!
  \***************************************************/
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
/* harmony import */ var _ui_framework_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ui-framework/ConfigurationTypes */ "./src/ui-framework/ConfigurationTypes.ts");
/* harmony import */ var _ui_framework_helper_BasicFieldOperations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ui-framework/helper/BasicFieldOperations */ "./src/ui-framework/helper/BasicFieldOperations.ts");
/* harmony import */ var _DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DataObjectTypeDefs */ "./src/model/DataObjectTypeDefs.ts");



var FIELD_ID = 'id';
var FIELD_CreatedBy = 'createdBy';
var FIELD_ModifiedBy = 'modifiedBy';
var FIELD_CreatedOn = 'createdOn';
var FIELD_ModifiedOn = 'modifiedOn';
var FIELD_CreatedBy_Desc = 'Created By';
var FIELD_ModifiedBy_Desc = 'Last Modified By';
var FIELD_CreatedOn_Desc = 'Created On';
var FIELD_ModifiedOn_Desc = 'Last Modified On';
var BasicObjectDefinitionFactory = /*#__PURE__*/function () {
  BasicObjectDefinitionFactory.getInstance = function getInstance() {
    if (!BasicObjectDefinitionFactory._instance) {
      BasicObjectDefinitionFactory._instance = new BasicObjectDefinitionFactory();
    }

    return BasicObjectDefinitionFactory._instance;
  };

  function BasicObjectDefinitionFactory() {}

  var _proto = BasicObjectDefinitionFactory.prototype;

  _proto.createBasicObjectDefinition = function createBasicObjectDefinition(id, displayName, hasDataId, dataIdIsUUID, createModifierFields, idFieldName) {
    if (createModifierFields === void 0) {
      createModifierFields = true;
    }

    if (idFieldName === void 0) {
      idFieldName = FIELD_ID;
    }

    var objDef = {
      id: id,
      displayName: displayName,
      fields: []
    };
    var ops = new _ui_framework_helper_BasicFieldOperations__WEBPACK_IMPORTED_MODULE_1__.BasicFieldOperations(); // do we need an id field?

    if (hasDataId) {
      var fieldType = _DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.id;

      if (dataIdIsUUID) {
        fieldType = _DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.uuid;
      }

      var fieldDef = {
        id: idFieldName,
        isKey: true,
        idType: _ui_framework_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_0__.KeyType.number,
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
  };

  _proto.addCreatedDateToArray = function addCreatedDateToArray(fields) {
    var fieldDef = this.addStringFieldToArray(fields, FIELD_CreatedOn, FIELD_CreatedOn_Desc, _DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.datetime, true, FIELD_CreatedOn_Desc); // add generator

    fieldDef.generator = {
      generator: new _ui_framework_helper_BasicFieldOperations__WEBPACK_IMPORTED_MODULE_1__.BasicFieldOperations(),
      onCreation: true,
      onModify: false
    };
    fieldDef.displayOnly = true;
  };

  _proto.addModifiedDateToArray = function addModifiedDateToArray(fields) {
    var fieldDef = this.addStringFieldToArray(fields, FIELD_ModifiedOn, FIELD_ModifiedOn_Desc, _DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.datetime, true, FIELD_ModifiedOn_Desc); // add generator

    fieldDef.generator = {
      generator: new _ui_framework_helper_BasicFieldOperations__WEBPACK_IMPORTED_MODULE_1__.BasicFieldOperations(),
      onCreation: true,
      onModify: true
    };
    fieldDef.displayOnly = true;
  };

  _proto.addCreatedByToArray = function addCreatedByToArray(fields) {
    var fieldDef = this.addNumericFieldToArray(fields, FIELD_CreatedBy, FIELD_CreatedBy_Desc, _DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.userId, true, FIELD_CreatedBy_Desc); // add generator

    fieldDef.generator = {
      generator: new _ui_framework_helper_BasicFieldOperations__WEBPACK_IMPORTED_MODULE_1__.BasicFieldOperations(),
      onCreation: true,
      onModify: false
    };
    fieldDef.displayOnly = true;
  };

  _proto.addModifiedByToArray = function addModifiedByToArray(fields) {
    var fieldDef = this.addStringFieldToArray(fields, FIELD_ModifiedBy, FIELD_ModifiedBy_Desc, _DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.userId, true, FIELD_ModifiedBy_Desc); // add generator

    fieldDef.generator = {
      generator: new _ui_framework_helper_BasicFieldOperations__WEBPACK_IMPORTED_MODULE_1__.BasicFieldOperations(),
      onCreation: true,
      onModify: true
    };
    fieldDef.displayOnly = true;
  };

  _proto.addFieldToArray = function addFieldToArray(fields, keyType, id, displayName, type, isMandatory, description, datasource) {
    if (isMandatory === void 0) {
      isMandatory = false;
    }

    if (description === void 0) {
      description = null;
    }

    if (datasource === void 0) {
      datasource = null;
    }

    var fieldDef = {
      id: id,
      isKey: false,
      idType: keyType,
      type: type,
      displayName: displayName,
      mandatory: isMandatory,
      displayOnly: false
    };
    if (description) fieldDef.description = description;
    if (datasource) fieldDef.dataSource = datasource;
    fields.push(fieldDef);
    return fieldDef;
  };

  _proto.addStringFieldToArray = function addStringFieldToArray(fields, id, displayName, type, isMandatory, description, datasource) {
    if (isMandatory === void 0) {
      isMandatory = false;
    }

    if (description === void 0) {
      description = null;
    }

    if (datasource === void 0) {
      datasource = null;
    }

    return this.addFieldToArray(fields, _ui_framework_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_0__.KeyType.string, id, displayName, type, isMandatory, description, datasource);
  };

  _proto.addNumericFieldToArray = function addNumericFieldToArray(fields, id, displayName, type, isMandatory, description, datasource) {
    if (isMandatory === void 0) {
      isMandatory = false;
    }

    if (description === void 0) {
      description = null;
    }

    if (datasource === void 0) {
      datasource = null;
    }

    return this.addFieldToArray(fields, _ui_framework_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_0__.KeyType.string, id, displayName, type, isMandatory, description, datasource);
  };

  _proto.addStringFieldToObjDefinition = function addStringFieldToObjDefinition(objDef, id, displayName, type, isMandatory, description, datasource) {
    if (isMandatory === void 0) {
      isMandatory = false;
    }

    if (description === void 0) {
      description = null;
    }

    if (datasource === void 0) {
      datasource = null;
    }

    return this.addStringFieldToArray(objDef.fields, id, displayName, type, isMandatory, description, datasource);
  };

  _proto.addNumericFieldToObjDefinition = function addNumericFieldToObjDefinition(objDef, id, displayName, type, isMandatory, description, datasource) {
    if (isMandatory === void 0) {
      isMandatory = false;
    }

    if (description === void 0) {
      description = null;
    }

    if (datasource === void 0) {
      datasource = null;
    }

    return this.addNumericFieldToArray(objDef.fields, id, displayName, type, isMandatory, description, datasource);
  };

  return BasicObjectDefinitionFactory;
}();

/***/ }),

/***/ "./src/model/DataObjectController.ts":
/*!*******************************************!*\
  !*** ./src/model/DataObjectController.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DataObjectController": () => (/* binding */ DataObjectController)
/* harmony export */ });
var DataObjectController = /*#__PURE__*/function () {
  function DataObjectController(typeName) {
    this.isCreatingNew = false;
    this.typeName = typeName;
    this.listeners = [];
  }

  var _proto = DataObjectController.prototype;

  _proto.addListener = function addListener(listener) {
    this.listeners.push(listener);
  };

  _proto.informListenersOfCreate = function informListenersOfCreate(dataObj) {
    var _this = this;

    this.isCreatingNew = false;
    this.listeners.forEach(function (listener) {
      return listener.create(_this, _this.typeName, dataObj);
    });
  };

  _proto.informListenersOfUpdate = function informListenersOfUpdate(dataObj) {
    var _this2 = this;

    this.isCreatingNew = false;
    this.listeners.forEach(function (listener) {
      return listener.update(_this2, _this2.typeName, dataObj);
    });
  };

  _proto.informListenersOfDelete = function informListenersOfDelete(dataObj) {
    var _this3 = this;

    this.isCreatingNew = false;
    this.listeners.forEach(function (listener) {
      return listener.delete(_this3, _this3.typeName, dataObj);
    });
  };

  _proto.startNewObject = function startNewObject() {
    var result = false;

    if (!this.isCreatingNew) {
      result = this._startNewObject();
      this.isCreatingNew = result;
    }

    return result;
  }; // return false, if the creation was cancelled


  _proto.isCreatingNewObject = function isCreatingNewObject() {
    return this.isCreatingNew;
  };

  return DataObjectController;
}();

/***/ }),

/***/ "./src/model/DataObjectTypeDefs.ts":
/*!*****************************************!*\
  !*** ./src/model/DataObjectTypeDefs.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FieldType": () => (/* binding */ FieldType)
/* harmony export */ });
var FieldType;

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
})(FieldType || (FieldType = {}));

/***/ }),

/***/ "./src/model/ObjectDefinitionRegistry.ts":
/*!***********************************************!*\
  !*** ./src/model/ObjectDefinitionRegistry.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ObjectDefinitionRegistry": () => (/* binding */ ObjectDefinitionRegistry)
/* harmony export */ });
/* harmony import */ var _BasicObjectDefinitionFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BasicObjectDefinitionFactory */ "./src/model/BasicObjectDefinitionFactory.ts");

var ObjectDefinitionRegistry = /*#__PURE__*/function () {
  ObjectDefinitionRegistry.getInstance = function getInstance() {
    if (!ObjectDefinitionRegistry._instance) {
      ObjectDefinitionRegistry._instance = new ObjectDefinitionRegistry();
    }

    return ObjectDefinitionRegistry._instance;
  };

  function ObjectDefinitionRegistry() {
    this.definitions = [];
  }

  var _proto = ObjectDefinitionRegistry.prototype;

  _proto.findDefinition = function findDefinition(id) {
    var result = null;
    var index = this.definitions.findIndex(function (definition) {
      return definition.id === id;
    });

    if (index >= 0) {
      result = this.definitions[index];
    }

    return result;
  };

  _proto.addDefinition = function addDefinition(id, displayName, hasDataId, dataIdIsUUID, createModifierFields, idFieldName) {
    if (createModifierFields === void 0) {
      createModifierFields = true;
    }

    if (idFieldName === void 0) {
      idFieldName = _BasicObjectDefinitionFactory__WEBPACK_IMPORTED_MODULE_0__.FIELD_ID;
    }

    var result = this.findDefinition(id);

    if (result) {
      return result;
    } else {
      var definition = _BasicObjectDefinitionFactory__WEBPACK_IMPORTED_MODULE_0__.BasicObjectDefinitionFactory.getInstance().createBasicObjectDefinition(id, displayName, hasDataId, dataIdIsUUID, createModifierFields, idFieldName);
      this.definitions.push(definition);
      return definition;
    }
  };

  return ObjectDefinitionRegistry;
}();

/***/ }),

/***/ "./src/network/ApiUtil.ts":
/*!********************************!*\
  !*** ./src/network/ApiUtil.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}


var apiLogger = debug__WEBPACK_IMPORTED_MODULE_0___default()('api-ts');

var ApiUtil = /*#__PURE__*/function () {
  function ApiUtil() {}

  var _proto = ApiUtil.prototype;

  _proto.postFetchJSON = /*#__PURE__*/function () {
    var _postFetchJSON = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url, query) {
      var postParameters, response;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              postParameters = {
                method: "POST",
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  query: query
                })
              };
              _context.next = 3;
              return fetch(url, postParameters);

            case 3:
              response = _context.sent;
              return _context.abrupt("return", response.json());

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function postFetchJSON(_x, _x2) {
      return _postFetchJSON.apply(this, arguments);
    }

    return postFetchJSON;
  }()
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
  ;

  _proto.apiFetchJSONWithPost = function apiFetchJSONWithPost(request) {
    apiLogger("Executing fetch with URL " + request.originalRequest.url + " with body " + request.originalRequest.params);

    try {
      JSON.stringify(request.originalRequest.params);
    } catch (error) {
      apiLogger('Unable to convert parameters to JSON');
      apiLogger(request.originalRequest.params, 100);
      request.callback(null, 404, request.queueType, request.requestId);
    }

    var postParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(_extends({}, request.originalRequest.params))
    };
    this.fetchJSON(request.originalRequest.url, postParameters, request.callback, request.queueType, request.requestId);
  };

  _proto.apiFetchJSONWithGet = function apiFetchJSONWithGet(request) {
    apiLogger("Executing GET fetch with URL " + request.originalRequest.url + " with id " + request.originalRequest.params.id);
    var getParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    if (request.originalRequest.params.id) request.originalRequest.url += "/" + request.originalRequest.params.id;
    this.fetchJSON(request.originalRequest.url, getParameters, request.callback, request.queueType, request.requestId);
  };

  _proto.apiFetchJSONWithDelete = function apiFetchJSONWithDelete(request) {
    apiLogger("Executing DELETE fetch with URL " + request.originalRequest.url + " with id " + request.originalRequest.params.id);
    var delParameters = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    if (request.originalRequest.params.id) request.originalRequest.url += "/" + request.originalRequest.params.id;
    this.fetchJSON(request.originalRequest.url, delParameters, request.callback, request.queueType, request.requestId);
  };

  _proto.apiFetchJSONWithPut = function apiFetchJSONWithPut(request) {
    apiLogger("Executing PUT fetch with URL " + request.originalRequest.url + " with id " + request.originalRequest.params.id);
    var putParameters = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(_extends({}, request.originalRequest.params))
    };
    if (request.originalRequest.params.id) request.originalRequest.url += "/" + request.originalRequest.params.id;
    this.fetchJSON(request.originalRequest.url, putParameters, request.callback, request.queueType, request.requestId);
  };

  _proto.fetchJSON = function fetchJSON(url, parameters, callback, queueType, requestId) {
    fetch(url, parameters).then(function (response) {
      apiLogger("Response code was " + response.status);

      if (response.status >= 200 && response.status <= 299) {
        return response.json();
      }

      if (response.status === 400) {
        apiLogger(response.json());
      }
    }).then(function (data) {
      apiLogger(data);
      callback(data, 200, queueType, requestId);
    }).catch(function (error) {
      apiLogger(error);
      callback(null, 500, queueType, requestId);
    });
  };

  return ApiUtil;
}();

var apiUtil = new ApiUtil();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (apiUtil);

/***/ }),

/***/ "./src/network/DownloadManager.ts":
/*!****************************************!*\
  !*** ./src/network/DownloadManager.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ApiUtil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ApiUtil */ "./src/network/ApiUtil.ts");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");
/* harmony import */ var _Types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Types */ "./src/network/Types.ts");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_2__);
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}





var dlLogger = debug__WEBPACK_IMPORTED_MODULE_2___default()('api-ts');

var DownloadManager = /*#__PURE__*/function () {
  DownloadManager.getInstance = function getInstance() {
    if (!DownloadManager._instance) {
      DownloadManager._instance = new DownloadManager();
    }

    return DownloadManager._instance;
  };

  function DownloadManager() {
    this.backgroundQueue = [];
    this.priorityQueue = [];
    this.inProgress = [];
    this.backgroundChangeListener = null;
    this.priorityChangeListener = null;
    this.callbackForQueueRequest = this.callbackForQueueRequest.bind(this);
  }

  var _proto = DownloadManager.prototype;

  _proto.setBackgroundChangeListener = function setBackgroundChangeListener(uiChangeListener) {
    this.backgroundChangeListener = uiChangeListener;
  };

  _proto.setPriorityChangeListener = function setPriorityChangeListener(uiChangeListener) {
    this.priorityChangeListener = uiChangeListener;
  };

  _proto.getPriorityQueueCount = function getPriorityQueueCount() {
    return this.priorityQueue.length;
  };

  _proto.getBackgroundQueueCount = function getBackgroundQueueCount() {
    return this.backgroundQueue.length;
  };

  _proto.addQLApiRequest = function addQLApiRequest(url, query, variables, callback, state, isPriority) {
    if (isPriority === void 0) {
      isPriority = false;
    }

    var request = {
      url: url,
      type: _Types__WEBPACK_IMPORTED_MODULE_1__.RequestType.POST,
      params: {
        query: query,
        variables: variables
      },
      callback: callback,
      associatedStateName: state
    };
    this.addApiRequest(request, isPriority);
  };

  _proto.addQLMutationRequest = function addQLMutationRequest(url, mutation, variables, callback, state, isPriority) {
    if (isPriority === void 0) {
      isPriority = false;
    }

    var request = {
      url: url,
      type: _Types__WEBPACK_IMPORTED_MODULE_1__.RequestType.POST,
      params: {
        mutation: mutation,
        variables: variables
      },
      callback: callback,
      associatedStateName: state
    };
    this.addApiRequest(request, isPriority);
  };

  _proto.addApiRequest = function addApiRequest(jsonRequest, isPriority) {
    if (isPriority === void 0) {
      isPriority = false;
    } // add a new requestId to the request for future tracking


    var requestId = (0,uuid__WEBPACK_IMPORTED_MODULE_3__["default"])();
    dlLogger("Download Manger: Adding Queue Request " + requestId);
    dlLogger(jsonRequest, 200);

    if (isPriority) {
      var _managerRequest = {
        originalRequest: jsonRequest,
        requestId: requestId,
        queueType: _Types__WEBPACK_IMPORTED_MODULE_1__.queueType.PRIORITY,
        callback: this.callbackForQueueRequest
      };
      this.priorityQueue.push(_managerRequest);
      if (this.priorityChangeListener) this.priorityChangeListener.handleEventAddToQueue();
    } else {
      var _managerRequest2 = {
        originalRequest: jsonRequest,
        requestId: requestId,
        queueType: _Types__WEBPACK_IMPORTED_MODULE_1__.queueType.BACKGROUND,
        callback: this.callbackForQueueRequest
      };
      this.backgroundQueue.push(_managerRequest2);
      if (this.backgroundChangeListener) this.backgroundChangeListener.handleEventAddToQueue();
    }

    this.processQueues();
  };

  _proto.processPriorityQueue = /*#__PURE__*/function () {
    var _processPriorityQueue = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var queueItem;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              queueItem = this.priorityQueue.shift();
              if (queueItem !== undefined) this.inProgress.push(queueItem);
              if (queueItem !== undefined) this.initiateFetchForQueueItem(queueItem);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function processPriorityQueue() {
      return _processPriorityQueue.apply(this, arguments);
    }

    return processPriorityQueue;
  }();

  _proto.processBackgroundQueue = /*#__PURE__*/function () {
    var _processBackgroundQueue = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var queueItem;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              queueItem = this.backgroundQueue.shift();
              if (queueItem !== undefined) this.inProgress.push(queueItem);
              if (queueItem !== undefined) this.initiateFetchForQueueItem(queueItem);

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function processBackgroundQueue() {
      return _processBackgroundQueue.apply(this, arguments);
    }

    return processBackgroundQueue;
  }();

  _proto.processQueues = /*#__PURE__*/function () {
    var _processQueues = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var totalQueuedItems;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              totalQueuedItems = this.priorityQueue.length + this.backgroundQueue.length;

            case 1:
              if (!(totalQueuedItems > 0)) {
                _context3.next = 14;
                break;
              }

              dlLogger("Download Manager: processing queue, items remaining " + totalQueuedItems); // priority queue takes priority

              if (!(this.priorityQueue.length > 0)) {
                _context3.next = 8;
                break;
              }

              _context3.next = 6;
              return this.processPriorityQueue();

            case 6:
              _context3.next = 11;
              break;

            case 8:
              if (!(this.backgroundQueue.length > 0)) {
                _context3.next = 11;
                break;
              }

              _context3.next = 11;
              return this.processBackgroundQueue();

            case 11:
              totalQueuedItems = this.priorityQueue.length + this.backgroundQueue.length;
              _context3.next = 1;
              break;

            case 14:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function processQueues() {
      return _processQueues.apply(this, arguments);
    }

    return processQueues;
  }();

  _proto.callbackForQueueRequest = function callbackForQueueRequest(jsonData, httpStatus, queueId, requestId) {
    // let the listeners know about the completion
    if (queueId === _Types__WEBPACK_IMPORTED_MODULE_1__.queueType.PRIORITY) {
      // priority
      if (this.priorityChangeListener) this.priorityChangeListener.handleEventRemoveFromQueue();
    } else if (this.backgroundChangeListener) this.backgroundChangeListener.handleEventRemoveFromQueue();

    dlLogger("Download Manager: received callback for queue " + queueId + " request " + requestId + " with status " + httpStatus); // find the item in the in progress

    var foundIndex = this.inProgress.findIndex(function (element) {
      return element.requestId === requestId;
    });

    if (foundIndex >= 0) {
      // remove from in progress
      var queueItem = this.inProgress[foundIndex];
      this.inProgress.splice(foundIndex, 1);
      dlLogger(queueItem);
      dlLogger("Download Manager: finished for queue item " + queueItem.requestId); // let the callback function know

      queueItem.originalRequest.callback(jsonData, httpStatus, queueItem.originalRequest.associatedStateName);
    }
  };

  _proto.initiateFetchForQueueItem = function initiateFetchForQueueItem(item) {
    dlLogger("Download Manager: initiating fetch for queue item " + item.requestId);
    dlLogger(item);

    if (item.originalRequest.url !== null && item.originalRequest.params != null && item.originalRequest.callback != null) {
      switch (item.originalRequest.type) {
        case _Types__WEBPACK_IMPORTED_MODULE_1__.RequestType.POST:
          {
            _ApiUtil__WEBPACK_IMPORTED_MODULE_0__["default"].apiFetchJSONWithPost(item);
            break;
          }

        case _Types__WEBPACK_IMPORTED_MODULE_1__.RequestType.GET:
          {
            _ApiUtil__WEBPACK_IMPORTED_MODULE_0__["default"].apiFetchJSONWithGet(item);
            break;
          }

        case _Types__WEBPACK_IMPORTED_MODULE_1__.RequestType.DELETE:
          {
            _ApiUtil__WEBPACK_IMPORTED_MODULE_0__["default"].apiFetchJSONWithDelete(item);
            break;
          }

        case _Types__WEBPACK_IMPORTED_MODULE_1__.RequestType.PUT:
          {
            _ApiUtil__WEBPACK_IMPORTED_MODULE_0__["default"].apiFetchJSONWithPut(item);
            break;
          }
      }
    }
  };

  return DownloadManager;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DownloadManager);

/***/ }),

/***/ "./src/network/Types.ts":
/*!******************************!*\
  !*** ./src/network/Types.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RequestType": () => (/* binding */ RequestType),
/* harmony export */   "queueType": () => (/* binding */ queueType)
/* harmony export */ });
var RequestType;

(function (RequestType) {
  RequestType[RequestType["POST"] = 0] = "POST";
  RequestType[RequestType["GET"] = 1] = "GET";
  RequestType[RequestType["PUT"] = 2] = "PUT";
  RequestType[RequestType["DELETE"] = 3] = "DELETE";
})(RequestType || (RequestType = {}));

var queueType;

(function (queueType) {
  queueType[queueType["PRIORITY"] = 0] = "PRIORITY";
  queueType[queueType["BACKGROUND"] = 1] = "BACKGROUND";
})(queueType || (queueType = {}));

/***/ }),

/***/ "./src/notification/BootstrapNotification.ts":
/*!***************************************************!*\
  !*** ./src/notification/BootstrapNotification.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BootstrapNotification)
/* harmony export */ });
/* harmony import */ var _Notification__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Notification */ "./src/notification/Notification.ts");
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}



var BootstrapNotification = /*#__PURE__*/function (_Notification) {
  _inheritsLoose(BootstrapNotification, _Notification);

  function BootstrapNotification(notificationManager) {
    return _Notification.call(this, notificationManager) || this;
  } // Make the notification visible on the screen


  var _proto = BootstrapNotification.prototype;

  _proto.show = function show(title, message, topOffset, context, duration) {
    var _this = this;

    if (topOffset === void 0) {
      topOffset = 0;
    }

    if (context === void 0) {
      context = 'info';
    }

    if (duration === void 0) {
      duration = 3000;
    }

    var containerId = this.notificationManager.getContainerId(); // convert the context to a background colour

    var bgColorClass = '';

    switch (context) {
      case 'info':
        {
          bgColorClass = 'bg-info';
          break;
        }

      case 'warning':
        {
          bgColorClass = 'bg-warning';
          break;
        }

      case 'message':
        {
          bgColorClass = 'bg-primary';
          break;
        }

      case 'priority':
        {
          bgColorClass = 'bg-danger';
          break;
        }

      default:
        {
          bgColorClass = "bg-info";
        }
    } // Creating the notification container div


    var containerNode = document.createElement('div');
    containerNode.className = 'notification toast';
    containerNode.style.top = topOffset + "px";
    containerNode.setAttribute("role", "alert");
    containerNode.setAttribute("data-autohide", "false"); // Adding the notification title node

    var titleNode = document.createElement('div');
    titleNode.className = "toast-header text-white " + bgColorClass;
    var titleTextNode = document.createElement('strong');
    titleTextNode.className = "mr-auto";
    titleTextNode.textContent = title; // Adding a little button on the notification

    var closeButtonNode = document.createElement('button');
    closeButtonNode.className = 'ml-2 mb-1 close';
    closeButtonNode.textContent = 'x';
    closeButtonNode.addEventListener('click', function () {
      _this.notificationManager.remove(containerNode);
    }); // Adding the notification message content node

    var messageNode = document.createElement('div');
    messageNode.className = 'toast-body';
    messageNode.textContent = message; // Appending the container with all the elements newly created

    titleNode.appendChild(titleTextNode);
    titleNode.appendChild(closeButtonNode);
    containerNode.appendChild(titleNode);
    containerNode.appendChild(messageNode);
    containerNode.classList.add("is-" + context); // Inserting the notification to the page body

    var containerEl = document.getElementById(containerId);
    if (containerEl) containerEl.appendChild(containerNode); // activate it
    // @ts-ignore

    $(".notification").toast('show'); // Default duration delay

    if (duration <= 0) {
      duration = 2000;
    }

    setTimeout(function () {
      _this.notificationManager.remove(containerNode);
    }, duration);
    return containerNode;
  };

  return BootstrapNotification;
}(_Notification__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/notification/Notification.ts":
/*!******************************************!*\
  !*** ./src/notification/Notification.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Notification)
/* harmony export */ });
var Notification = function Notification(notificationManager) {
  this.show = this.show.bind(this);
  this.notificationManager = notificationManager; // Create DOM notification structure when instantiated

  this.containerId = this.notificationManager.getContainerId();
} // Make the notification visible on the screen
;



/***/ }),

/***/ "./src/notification/NotificationFactory.ts":
/*!*************************************************!*\
  !*** ./src/notification/NotificationFactory.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BootstrapNotification__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BootstrapNotification */ "./src/notification/BootstrapNotification.ts");


var NotificationFactory = /*#__PURE__*/function () {
  function NotificationFactory() {}

  var _proto = NotificationFactory.prototype;

  _proto.createNotification = function createNotification(manager) {
    return new _BootstrapNotification__WEBPACK_IMPORTED_MODULE_0__["default"](manager);
  };

  return NotificationFactory;
}();

var notificationFactory = new NotificationFactory();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (notificationFactory);

/***/ }),

/***/ "./src/notification/NotificationManager.ts":
/*!*************************************************!*\
  !*** ./src/notification/NotificationManager.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NotificationManager": () => (/* binding */ NotificationManager),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _NotificationFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NotificationFactory */ "./src/notification/NotificationFactory.ts");

var NotificationManager = /*#__PURE__*/function () {
  NotificationManager.getInstance = function getInstance() {
    if (!NotificationManager._instance) {
      NotificationManager._instance = new NotificationManager();
    }

    return NotificationManager._instance;
  };

  function NotificationManager() {
    this.notifications = [];
    this.currentCount = 0;
    this.offsetPerNotification = 120;
    this.containerId = 'notifications';
    this.show = this.show.bind(this);
  }

  var _proto = NotificationManager.prototype;

  _proto.getContainerId = function getContainerId() {
    return this.containerId;
  };

  _proto.show = function show(title, message, context, duration) {
    if (context === void 0) {
      context = 'info';
    }

    if (duration === void 0) {
      duration = 5000;
    }

    var notification = _NotificationFactory__WEBPACK_IMPORTED_MODULE_0__["default"].createNotification(this);
    var notificationNode = notification.show(title, message, this.currentCount * this.offsetPerNotification, context, duration);
    this.currentCount++;
    this.notifications.push(notificationNode);
  };

  _proto.remove = function remove(notificationNode) {
    var _this = this;

    var foundIndex = this.notifications.findIndex(function (element) {
      return element === notificationNode;
    });

    if (foundIndex >= 0) {
      this.notifications.splice(foundIndex, 1); // re-arrange the remaining notifications

      this.notifications.map(function (notificationNode, index) {
        // @ts-ignore
        notificationNode.style.top = _this.offsetPerNotification * index + "px";
      });
    }

    var parentEl = notificationNode.parentElement;
    if (parentEl !== null) parentEl.removeChild(notificationNode);
    this.currentCount--;
    if (this.currentCount < 0) this.currentCount = 0;
  };

  return NotificationManager;
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NotificationManager);

/***/ }),

/***/ "./src/socket/ChatManager.ts":
/*!***********************************!*\
  !*** ./src/socket/ChatManager.ts ***!
  \***********************************/
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
/* harmony import */ var _SocketManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SocketManager */ "./src/socket/SocketManager.ts");
/* harmony import */ var _Types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Types */ "./src/socket/Types.ts");
/* harmony import */ var _state_BrowserStorageStateManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../state/BrowserStorageStateManager */ "./src/state/BrowserStorageStateManager.ts");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");






var UserStatus;

(function (UserStatus) {
  UserStatus[UserStatus["LoggedOut"] = 0] = "LoggedOut";
  UserStatus[UserStatus["LoggedIn"] = 1] = "LoggedIn";
})(UserStatus || (UserStatus = {}));

var cmLogger = debug__WEBPACK_IMPORTED_MODULE_0___default()('chat-manager');
var ChatManager = /*#__PURE__*/function () {
  function ChatManager() {
    this.blockedList = [];
    this.favouriteList = [];
    this.loggedInUsers = [];
    this.currentUsername = '';
    this.unreadListener = null;
    cmLogger('Setting up chat logs, blocked list, and favourites');
    this.chatLogs = [];
    this.chatListeners = [];
    this.chatUserListeners = [];
    this.localStorage = new _state_BrowserStorageStateManager__WEBPACK_IMPORTED_MODULE_4__["default"](true); // connect to the socket manager

    _SocketManager__WEBPACK_IMPORTED_MODULE_2__["default"].getInstance().addChatReceiver(this); // bind the receiver methods

    this.receiveLogin = this.receiveLogin.bind(this);
    this.receiveLogout = this.receiveLogout.bind(this);
    this.receiveInvitation = this.receiveInvitation.bind(this);
    this.receiveMessage = this.receiveMessage.bind(this);
    this.receiveQueuedMessages = this.receiveQueuedMessages.bind(this);
    this.receiveQueuedInvites = this.receiveQueuedInvites.bind(this);
    this.receiveJoinedRoom = this.receiveJoinedRoom.bind(this);
    this.receivedLeftRoom = this.receivedLeftRoom.bind(this);
  }

  ChatManager.getInstance = function getInstance() {
    if (!ChatManager._instance) {
      ChatManager._instance = new ChatManager();
    }

    return ChatManager._instance;
  };

  var _proto = ChatManager.prototype;

  _proto.addChatEventHandler = function addChatEventHandler(receiver) {
    this.chatListeners.push(receiver);
  };

  _proto.addChatUserEventHandler = function addChatUserEventHandler(receiver) {
    this.chatUserListeners.push(receiver);
  };

  _proto.isUserLoggedIn = function isUserLoggedIn(username) {
    return this.loggedInUsers.findIndex(function (name) {
      return name === username;
    }) >= 0;
  };

  _proto.receiveUserList = function receiveUserList(users) {
    this.loggedInUsers = users;
    this.chatUserListeners.forEach(function (listener) {
      return listener.handleLoggedInUsersUpdated(users);
    });
  };

  _proto.addUserToBlockedList = function addUserToBlockedList(username) {
    var _this = this;

    var index = this.blockedList.findIndex(function (blocked) {
      return blocked === username;
    });

    if (index < 0) {
      this.blockedList.push(username);
      this.saveBlockedList();
      this.chatUserListeners.forEach(function (listener) {
        return listener.handleBlockedUsersChanged(_this.favouriteList);
      });
    }
  };

  _proto.removeUserFromBlockedList = function removeUserFromBlockedList(username) {
    var _this2 = this;

    var index = this.blockedList.findIndex(function (blocked) {
      return blocked === username;
    });

    if (index >= 0) {
      this.blockedList.splice(index, 1);
      this.saveBlockedList();
      this.chatUserListeners.forEach(function (listener) {
        return listener.handleBlockedUsersChanged(_this2.favouriteList);
      });
    }
  };

  _proto.isUserInBlockedList = function isUserInBlockedList(username) {
    return this.blockedList.findIndex(function (blocked) {
      return blocked === username;
    }) >= 0;
  };

  _proto.addUserToFavouriteList = function addUserToFavouriteList(username) {
    var _this3 = this;

    var index = this.favouriteList.findIndex(function (favourite) {
      return favourite === username;
    });

    if (index < 0) {
      this.favouriteList.push(username);
      this.saveFavouriteList();
      this.chatUserListeners.forEach(function (listener) {
        return listener.handleFavouriteUsersChanged(_this3.favouriteList);
      });
    }
  };

  _proto.removeUserFromFavouriteList = function removeUserFromFavouriteList(username) {
    var _this4 = this;

    var index = this.favouriteList.findIndex(function (blocked) {
      return blocked === username;
    });

    if (index >= 0) {
      this.favouriteList.splice(index, 1);
      this.saveFavouriteList();
      this.chatUserListeners.forEach(function (listener) {
        return listener.handleFavouriteUsersChanged(_this4.favouriteList);
      });
    }
  };

  _proto.isUserInFavouriteList = function isUserInFavouriteList(username) {
    return this.favouriteList.findIndex(function (user) {
      return user === username;
    }) >= 0;
  };

  _proto.getFavouriteUserList = function getFavouriteUserList() {
    return [].concat(this.favouriteList);
  };

  _proto.getBlockedUserList = function getBlockedUserList() {
    return [].concat(this.blockedList);
  };

  _proto.setCurrentUser = function setCurrentUser(username) {
    cmLogger("Setting current user " + username);
    this.currentUsername = username; // load previous logs

    var savedLogs = this.localStorage.getStateByName(ChatManager.chatLogKey + this.currentUsername);
    cmLogger(savedLogs);

    if (savedLogs) {
      this.chatLogs = savedLogs;
    } // load previous blocked list


    var blockedList = this.localStorage.getStateByName(ChatManager.blockedListKey + this.currentUsername);
    cmLogger(blockedList);

    if (blockedList) {
      this.blockedList = blockedList;
    } // load previous favourite list


    var favouriteList = this.localStorage.getStateByName(ChatManager.favouriteListKey + this.currentUsername);
    cmLogger(favouriteList);

    if (favouriteList) {
      this.favouriteList = favouriteList;
    }

    this.chatListeners.forEach(function (listener) {
      return listener.handleChatLogsUpdated();
    });
  };

  _proto.getCurrentUser = function getCurrentUser() {
    return this.currentUsername;
  };

  _proto.receiveJoinedRoom = function receiveJoinedRoom(users) {
    // we get this for all changes to a room, if the username is us can safely ignore
    //if (users.username === this.currentUsername) return;
    if (users.type !== _Types__WEBPACK_IMPORTED_MODULE_3__.InviteType.ChatRoom) return;
    var log = this.ensureChatLogExists(users.room);
    cmLogger("User list for room " + users.room + " - " + users.userList.join(','));
    log.users = users.userList; // add a "message" for joined user

    var created = parseInt(moment__WEBPACK_IMPORTED_MODULE_1___default()().format('YYYYMMDDHHmmss'));
    var joinDateTime = moment__WEBPACK_IMPORTED_MODULE_1___default()().format('DD/MM/YYYY HH:mm');
    var message = {
      from: '',
      created: created,
      room: users.room,
      priority: 0,
      type: _Types__WEBPACK_IMPORTED_MODULE_3__.InviteType.ChatRoom,
      message: users.username + " joined the chat on " + joinDateTime
    };
    log.messages.push(message);
    this.saveLogs();
    this.chatListeners.forEach(function (listener) {
      return listener.handleChatLogUpdated(log, false);
    });
  };

  _proto.receivedLeftRoom = function receivedLeftRoom(users) {
    // we get this for all changes to a room, if the username is us can safely ignore
    if (users.type !== _Types__WEBPACK_IMPORTED_MODULE_3__.InviteType.ChatRoom) return;
    if (users.username === this.currentUsername) return;
    var log = this.ensureChatLogExists(users.room);
    cmLogger("User list for room " + users.room + " - " + users.userList.join(','));
    log.users = users.userList; // add a "message" for leaving user

    var created = parseInt(moment__WEBPACK_IMPORTED_MODULE_1___default()().format('YYYYMMDDHHmmss'));
    var joinDateTime = moment__WEBPACK_IMPORTED_MODULE_1___default()().format('DD/MM/YYYY HH:mm');
    var message = {
      from: '',
      created: created,
      room: users.room,
      priority: 0,
      type: _Types__WEBPACK_IMPORTED_MODULE_3__.InviteType.ChatRoom,
      message: users.username + " left the chat on " + joinDateTime
    };
    log.messages.push(message);
    this.saveLogs();
    this.chatListeners.forEach(function (listener) {
      return listener.handleChatLogUpdated(log, false);
    });
  };

  _proto.receiveInvitation = function receiveInvitation(invite) {
    if (invite.type !== _Types__WEBPACK_IMPORTED_MODULE_3__.InviteType.ChatRoom) return; //  unless we are receiving an invite from someone in our blocked list, we automatically accept this invite

    if (!this.isUserInBlockedList(invite.from)) {
      cmLogger("Invited to chat " + invite.room);
      var didChatAlreadyExist = this.doesChatRoomExist(invite.room);
      cmLogger(invite);
      cmLogger("Letting the listeners know, if they are all happy to accept then we will join the room");
      var happyToProceed = true;

      if (!didChatAlreadyExist) {
        this.chatListeners.forEach(function (listener) {
          if (!listener.handleNewInviteReceived(invite)) {
            happyToProceed = false;
          }
        });
      }

      if (happyToProceed) {
        var chatLog = this.ensureChatLogExists(invite.room); // keep a record of the type of invite

        chatLog.type = invite.type; // add the users in the invitation user list for the room, if not already added

        if (invite.userList) {
          invite.userList.forEach(function (username) {
            if (chatLog.users.findIndex(function (user) {
              return user === username;
            }) < 0) chatLog.users.push(invite.from);
          });
        }

        if (chatLog.users.findIndex(function (user) {
          return user === invite.from;
        }) < 0) chatLog.users.push(invite.from);
        this.saveLogs();
        cmLogger("Joining chat " + invite.room);
        _SocketManager__WEBPACK_IMPORTED_MODULE_2__["default"].getInstance().joinChat(this.getCurrentUser(), invite.room, _Types__WEBPACK_IMPORTED_MODULE_3__.InviteType.ChatRoom);
        this.chatListeners.forEach(function (listener) {
          return listener.handleChatLogUpdated(chatLog, false);
        });
      }
    } else {
      cmLogger("User " + invite.from + " blocked");
    }
  };

  _proto.receiveLogin = function receiveLogin(username) {
    var _this5 = this;

    cmLogger("Handle login received for " + username); // keep track of the logged in users

    var index = this.loggedInUsers.findIndex(function (user) {
      return user === username;
    });
    if (index < 0) this.loggedInUsers.push(username);
    cmLogger(this.loggedInUsers);
    this.chatUserListeners.forEach(function (listener) {
      return listener.handleLoggedInUsersUpdated(_this5.loggedInUsers);
    }); // if the user in in favourites and not in blocked list passing this on to the listener

    if (!this.isUserInBlockedList(username) && this.isUserInFavouriteList(username)) {
      cmLogger("User " + username + " logging in");
      this.chatUserListeners.forEach(function (listener) {
        return listener.handleFavouriteUserLoggedIn(username);
      });
    }
  };

  _proto.receiveLogout = function receiveLogout(username) {
    var _this6 = this;

    var index = this.loggedInUsers.findIndex(function (user) {
      return user === username;
    });
    if (index >= 0) this.loggedInUsers.splice(index, 1);
    this.chatUserListeners.forEach(function (listener) {
      return listener.handleLoggedInUsersUpdated(_this6.loggedInUsers);
    }); // if the user in in favourites and not in blocked list passing this on to the listener

    if (!this.isUserInBlockedList(username) && this.isUserInFavouriteList(username)) {
      cmLogger("User " + username + " logging out");
      this.chatUserListeners.forEach(function (listener) {
        return listener.handleFavouriteUserLoggedOut(username);
      });
    }
  };

  _proto.receiveDecline = function receiveDecline(room, username, type) {
    if (type !== _Types__WEBPACK_IMPORTED_MODULE_3__.InviteType.ChatRoom) return; // we get this for all changes to a room, if the username is us can safely ignore

    if (username === this.currentUsername) return;

    if (!this.isUserInBlockedList(username)) {
      cmLogger("User " + username + " declined invitation to room");
      this.chatListeners.forEach(function (listener) {
        return listener.handleInvitationDeclined(room, username);
      });
    }
  };

  _proto.setUnreadCountListener = function setUnreadCountListener(listener) {
    this.unreadListener = listener;
  };

  _proto.touchChatLog = function touchChatLog(room) {
    var chatLog = this.ensureChatLogExists(room);
    chatLog.numOfNewMessages = 0;
    chatLog.lastViewed = parseInt(moment__WEBPACK_IMPORTED_MODULE_1___default()().format('YYYYMMDDHHmmss'));
    this.emitUnreadMessageCountChanged();
    this.saveLogs();
  };

  _proto.getChatLog = function getChatLog(room) {
    var log = null;
    var index = this.chatLogs.findIndex(function (log) {
      return log.roomName === room;
    });
    if (index >= 0) log = this.chatLogs[index];
    return log;
  };

  _proto.receiveMessage = function receiveMessage(message, wasOffline) {
    if (wasOffline === void 0) {
      wasOffline = false;
    }

    if (message.type !== _Types__WEBPACK_IMPORTED_MODULE_3__.InviteType.ChatRoom) return; // ignore messages that aren't for chat rooms
    // double check the message is not from us somehow

    if (message.from === this.getCurrentUser()) return; // don't receive messages from the blocked users

    if (!this.isUserInBlockedList(message.from)) {
      // ok, so we need to add the message to the chat log, increase the new message count, save the logs and pass it on
      var chatLog = this.ensureChatLogExists(message.room);
      this.addSenderToRoomIfNotAlreadyPresent(chatLog, message.from);
      this.addMessageToChatLog(chatLog, message);
      cmLogger("Message received");
      cmLogger(message);
      this.chatListeners.forEach(function (listener) {
        return listener.handleChatLogUpdated(chatLog, wasOffline);
      });
    } else {
      cmLogger("Message received from user " + message.from + " - is in blocked list, not passed on.");
    }
  };

  _proto.receiveQueuedInvites = function receiveQueuedInvites(invites) {
    var _this7 = this; // just loop through and process each invite


    invites.forEach(function (invite) {
      _this7.receiveInvitation(invite);
    });
  };

  _proto.receiveQueuedMessages = function receiveQueuedMessages(messages) {
    var _this8 = this; // just loop through a process each message


    messages.forEach(function (message) {
      _this8.receiveMessage(message, true);
    });
    this.chatListeners.forEach(function (listener) {
      return listener.handleOfflineMessagesReceived(messages);
    });
  };

  _proto.joinChat = function joinChat(room) {
    if (this.getCurrentUser().trim().length === 0) return; // we are not logged in

    this.ensureChatLogExists(room);
    _SocketManager__WEBPACK_IMPORTED_MODULE_2__["default"].getInstance().joinChat(this.getCurrentUser(), room, _Types__WEBPACK_IMPORTED_MODULE_3__.InviteType.ChatRoom);
  };

  _proto.leaveChat = function leaveChat(room) {
    if (this.getCurrentUser().trim().length === 0) return; // we are not logged in

    this.removeChatLog(room);
    _SocketManager__WEBPACK_IMPORTED_MODULE_2__["default"].getInstance().leaveChat(this.getCurrentUser(), room, _Types__WEBPACK_IMPORTED_MODULE_3__.InviteType.ChatRoom);
    this.emitUnreadMessageCountChanged();
  };

  _proto.login = function login() {
    var _this9 = this;

    if (this.getCurrentUser().trim().length === 0) return; // we are not logged in

    _SocketManager__WEBPACK_IMPORTED_MODULE_2__["default"].getInstance().login(this.getCurrentUser()); // get the current user list

    _SocketManager__WEBPACK_IMPORTED_MODULE_2__["default"].getInstance().getUserList(); // connect to the chat rooms already in logs

    this.chatLogs.forEach(function (log) {
      if (log.type === _Types__WEBPACK_IMPORTED_MODULE_3__.InviteType.ChatRoom) {
        _SocketManager__WEBPACK_IMPORTED_MODULE_2__["default"].getInstance().joinChat(_this9.currentUsername, log.roomName, _Types__WEBPACK_IMPORTED_MODULE_3__.InviteType.ChatRoom);
      }
    });
  };

  _proto.logout = function logout() {
    if (this.getCurrentUser().trim().length === 0) return; // we are not logged in

    _SocketManager__WEBPACK_IMPORTED_MODULE_2__["default"].getInstance().logout(this.getCurrentUser());
  };

  _proto.declineInvite = function declineInvite(room) {
    if (this.getCurrentUser().trim().length === 0) return; // we are not logged in

    _SocketManager__WEBPACK_IMPORTED_MODULE_2__["default"].getInstance().sendDeclineInvite(room, this.getCurrentUser(), _Types__WEBPACK_IMPORTED_MODULE_3__.InviteType.ChatRoom);
  };

  _proto.sendInvite = function sendInvite(to, room, type, requiresAcceptDecline, subject) {
    if (type === void 0) {
      type = _Types__WEBPACK_IMPORTED_MODULE_3__.InviteType.ChatRoom;
    }

    if (requiresAcceptDecline === void 0) {
      requiresAcceptDecline = false;
    }

    if (subject === void 0) {
      subject = '';
    }

    if (this.getCurrentUser().trim().length === 0) return; // we are not logged in
    // can't accidentally send an invite to blacklisted

    if (this.isUserInBlockedList(to)) return; // only send an invite if the user isn't already in the room

    var log = this.ensureChatLogExists(room);

    if (log.users.findIndex(function (user) {
      return user === to;
    }) < 0) {
      _SocketManager__WEBPACK_IMPORTED_MODULE_2__["default"].getInstance().sendInvite(this.getCurrentUser(), to, room, type, requiresAcceptDecline, subject);
    }
  };

  _proto.sendMessage = function sendMessage(room, content, priority, attachment) {
    if (priority === void 0) {
      priority = _Types__WEBPACK_IMPORTED_MODULE_3__.Priority.Normal;
    }

    if (this.getCurrentUser().trim().length === 0) return null; // we are not logged in

    var log = this.ensureChatLogExists(room); // send the message

    var created = parseInt(moment__WEBPACK_IMPORTED_MODULE_1___default()().format('YYYYMMDDHHmmss'));
    _SocketManager__WEBPACK_IMPORTED_MODULE_2__["default"].getInstance().sendMessage(this.getCurrentUser(), room, content, created, _Types__WEBPACK_IMPORTED_MODULE_3__.InviteType.ChatRoom, _Types__WEBPACK_IMPORTED_MODULE_3__.Priority.Normal, {}); // add the message to the chat log

    if (!attachment) attachment = {};
    var sent = {
      from: this.getCurrentUser(),
      room: room,
      message: content,
      created: created,
      priority: priority,
      type: _Types__WEBPACK_IMPORTED_MODULE_3__.InviteType.ChatRoom,
      attachment: attachment
    };
    this.addMessageToChatLog(log, sent);
    return sent;
  };

  _proto.getChatLogs = function getChatLogs() {
    return [].concat(this.chatLogs);
  };

  _proto.startChatWithUser = function startChatWithUser(username) {
    var roomName = null;

    if (username) {
      cmLogger("Starting chat with " + username); // first thing, do we have a chat log with this user (and just this user) already?

      var chatLog = this.ensureChatLogExistsWithUser(username);
      this.chatListeners.forEach(function (listener) {
        return listener.handleChatLogUpdated(chatLog, false);
      }); // invite the other user

      _SocketManager__WEBPACK_IMPORTED_MODULE_2__["default"].getInstance().sendInvite(this.getCurrentUser(), username, chatLog.roomName, _Types__WEBPACK_IMPORTED_MODULE_3__.InviteType.ChatRoom, false, ''); // ok, lets connect to the server

      _SocketManager__WEBPACK_IMPORTED_MODULE_2__["default"].getInstance().joinChat(this.getCurrentUser(), chatLog.roomName, _Types__WEBPACK_IMPORTED_MODULE_3__.InviteType.ChatRoom);
      roomName = chatLog.roomName;
    }

    return roomName;
  };

  _proto.saveLogs = function saveLogs() {
    this.localStorage.setStateByName(ChatManager.chatLogKey + this.currentUsername, this.chatLogs, false);
  };

  _proto.saveBlockedList = function saveBlockedList() {
    this.localStorage.setStateByName(ChatManager.blockedListKey + this.currentUsername, this.blockedList, false);
  };

  _proto.saveFavouriteList = function saveFavouriteList() {
    this.localStorage.setStateByName(ChatManager.favouriteListKey + this.currentUsername, this.favouriteList, false);
  };

  _proto.ensureChatLogExists = function ensureChatLogExists(room) {
    var log;
    var index = this.chatLogs.findIndex(function (log) {
      return log.roomName === room;
    });

    if (index < 0) {
      log = {
        roomName: room,
        users: [this.getCurrentUser()],
        messages: [],
        lastViewed: parseInt(moment__WEBPACK_IMPORTED_MODULE_1___default()().format('YYYYMMDDHHmmss')),
        numOfNewMessages: 0,
        type: _Types__WEBPACK_IMPORTED_MODULE_3__.InviteType.ChatRoom
      };
      this.chatLogs.push(log);
      this.saveLogs();
    } else {
      log = this.chatLogs[index];
    }

    return log;
  };

  _proto.ensureChatLogExistsWithUser = function ensureChatLogExistsWithUser(username) {
    var foundLog = null;
    var index = 0;

    while (index < this.chatLogs.length) {
      var log = this.chatLogs[index];

      if (log.users.length === 2) {
        // is the username in the two of this room?
        if (log.users.findIndex(function (value) {
          return value === username;
        }) >= 0) {
          foundLog = log;
          index = this.chatLogs.length;
        }
      }

      index++;
    }

    if (!foundLog) {
      foundLog = {
        roomName: (0,uuid__WEBPACK_IMPORTED_MODULE_5__["default"])(),
        users: [this.getCurrentUser(), username],
        messages: [],
        lastViewed: parseInt(moment__WEBPACK_IMPORTED_MODULE_1___default()().format('YYYYMMDDHHmmss')),
        numOfNewMessages: 0,
        type: _Types__WEBPACK_IMPORTED_MODULE_3__.InviteType.ChatRoom
      };
      this.chatLogs.push(foundLog);
      this.saveLogs();
    }

    return foundLog;
  };

  _proto.doesChatRoomExist = function doesChatRoomExist(room) {
    var index = this.chatLogs.findIndex(function (log) {
      return log.roomName === room;
    });
    return index >= 0;
  };

  _proto.emitUnreadMessageCountChanged = function emitUnreadMessageCountChanged() {
    var _this$unreadListener;

    var unreadCount = 0;
    this.chatLogs.forEach(function (log) {
      unreadCount += log.numOfNewMessages;
    });
    (_this$unreadListener = this.unreadListener) == null ? void 0 : _this$unreadListener.countChanged(unreadCount);
  };

  _proto.addMessageToChatLog = function addMessageToChatLog(log, message) {
    log.numOfNewMessages++;
    log.messages.push(message);
    this.emitUnreadMessageCountChanged();

    if (message.from === this.getCurrentUser()) {
      this.touchChatLog(log.roomName); // this will also save the logs
    } else {
      this.saveLogs();
    }
  };

  _proto.addSenderToRoomIfNotAlreadyPresent = function addSenderToRoomIfNotAlreadyPresent(chatLog, sender) {
    var index = chatLog.users.findIndex(function (user) {
      return user === sender;
    });

    if (index < 0) {
      chatLog.users.push(sender);
    }
  };

  _proto.removeChatLog = function removeChatLog(room) {
    var index = this.chatLogs.findIndex(function (log) {
      return log.roomName === room;
    });

    if (index >= 0) {
      cmLogger("Removing Chat log for room " + room);
      var result = this.chatLogs.splice(index, 1);
      cmLogger(result.length);
      this.saveLogs();
    }
  };

  return ChatManager;
}();
ChatManager.chatLogKey = 'im-board-chat-logs';
ChatManager.blockedListKey = 'im-board-blocked-list';
ChatManager.favouriteListKey = 'im-board-favourite-list';

/***/ }),

/***/ "./src/socket/NotificationController.ts":
/*!**********************************************!*\
  !*** ./src/socket/NotificationController.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NotificationController": () => (/* binding */ NotificationController)
/* harmony export */ });
/* harmony import */ var _ChatManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ChatManager */ "./src/socket/ChatManager.ts");
/* harmony import */ var _notification_NotificationManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../notification/NotificationManager */ "./src/notification/NotificationManager.ts");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Types */ "./src/socket/Types.ts");




var notLogger = debug__WEBPACK_IMPORTED_MODULE_2___default()('notification-controller');
var NotificationController = /*#__PURE__*/function () {
  function NotificationController() {
    this.doNotDisturb = false;
    this.chatManager = _ChatManager__WEBPACK_IMPORTED_MODULE_0__.ChatManager.getInstance();
    this.doNotDisturb = false;
    this.chatListeners = [];
    this.chatUserListeners = []; //bind the methods

    this.handleChatLogUpdated = this.handleChatLogUpdated.bind(this);
    this.handleLoggedInUsersUpdated = this.handleLoggedInUsersUpdated.bind(this);
    this.handleFavouriteUserLoggedIn = this.handleFavouriteUserLoggedIn.bind(this);
    this.handleFavouriteUserLoggedOut = this.handleFavouriteUserLoggedOut.bind(this);
    this.chatManager.addChatEventHandler(this);
    this.chatManager.addChatUserEventHandler(this);
  }

  NotificationController.getInstance = function getInstance() {
    if (!NotificationController._instance) {
      NotificationController._instance = new NotificationController();
    }

    return NotificationController._instance;
  };

  var _proto = NotificationController.prototype;

  _proto.handleInvitationDeclined = function handleInvitationDeclined(room, username) {
    if (this.doNotDisturb) return; // notify the user of the new chat

    _notification_NotificationManager__WEBPACK_IMPORTED_MODULE_1__["default"].getInstance().show('Room', "User " + username + " has declined the invitation to join you.", 'info', 7000);
  };

  _proto.handleNewInviteReceived = function handleNewInviteReceived(invite) {
    var result = true; // is this a chat room or score sheet?

    if (invite.type === _Types__WEBPACK_IMPORTED_MODULE_3__.InviteType.ScoreSheet) return true;
    if (this.doNotDisturb && !invite.requiresAcceptDecline) return result;

    if (invite.requiresAcceptDecline) {// notify the user of the invitation
      //result = controller.askUserAboutInvitation(invite); ///////TO FIX
    } else {
      // notify the user of the new chat
      _notification_NotificationManager__WEBPACK_IMPORTED_MODULE_1__["default"].getInstance().show('Chat Room', "User " + invite.from + " has invited you.", 'info', 7000);
    }

    return result;
  };

  _proto.addListener = function addListener(listener) {
    this.chatListeners.push(listener);
  };

  _proto.addUserListener = function addUserListener(listener) {
    this.chatUserListeners.push(listener);
  };

  _proto.setDoNotDisturb = function setDoNotDisturb(dontDisturbMe) {
    if (dontDisturbMe === void 0) {
      dontDisturbMe = true;
    }

    this.doNotDisturb = dontDisturbMe;
  };

  _proto.blackListUser = function blackListUser(username, isBlackedListed) {
    if (isBlackedListed === void 0) {
      isBlackedListed = true;
    }

    if (isBlackedListed) {
      this.chatManager.addUserToBlockedList(username);
    } else {
      this.chatManager.removeUserFromBlockedList(username);
    }
  };

  _proto.favouriteUser = function favouriteUser(username, isFavourited) {
    if (isFavourited === void 0) {
      isFavourited = true;
    }

    if (isFavourited) {
      this.chatManager.addUserToFavouriteList(username);
    } else {
      this.chatManager.removeUserFromFavouriteList(username);
    }
  };

  _proto.isFavouriteUser = function isFavouriteUser(username) {
    return this.chatManager.isUserInFavouriteList(username);
  };

  _proto.isBlockedUser = function isBlockedUser(username) {
    return this.chatManager.isUserInBlockedList(username);
  };

  _proto.handleChatLogsUpdated = function handleChatLogsUpdated() {
    this.chatListeners.forEach(function (listener) {
      return listener.handleChatLogsUpdated();
    });
  };

  _proto.handleChatLogUpdated = function handleChatLogUpdated(log, wasOffline) {
    if (wasOffline === void 0) {
      wasOffline = false;
    }

    notLogger("Handle chat log updated");
    notLogger(log); // pass on the changes

    this.chatListeners.forEach(function (listener) {
      return listener.handleChatLogUpdated(log, wasOffline);
    }); // provide visual notifications if do not disturb is not on

    if (this.doNotDisturb) return;

    if (!wasOffline) {
      // get the last message added, it won't be from ourselves (the chat manager takes care of that)
      if (log.messages.length > 0) {
        var displayMessage = log.messages[log.messages.length - 1];
        _notification_NotificationManager__WEBPACK_IMPORTED_MODULE_1__["default"].getInstance().show(displayMessage.from, displayMessage.message, 'message', 3000);
      }
    }
  };

  _proto.handleLoggedInUsersUpdated = function handleLoggedInUsersUpdated(usernames) {
    notLogger("Handle logged in users updated");
    notLogger(usernames); // allow the view to change the user statuses

    this.chatUserListeners.forEach(function (listener) {
      return listener.handleLoggedInUsersUpdated(usernames);
    });
  };

  _proto.handleFavouriteUserLoggedIn = function handleFavouriteUserLoggedIn(username) {
    notLogger("Handle favourite user " + username + " logged in"); // allow the view to change the user statuses

    this.chatUserListeners.forEach(function (listener) {
      return listener.handleFavouriteUserLoggedIn(username);
    }); // provide visual notifications if do not disturb is not on

    if (this.doNotDisturb) return;
    _notification_NotificationManager__WEBPACK_IMPORTED_MODULE_1__["default"].getInstance().show(username, "User " + username + " has logged in.", 'warning', 5000);
  };

  _proto.handleFavouriteUserLoggedOut = function handleFavouriteUserLoggedOut(username) {
    notLogger("Handle favourite user " + username + " logged out"); // allow the view to change the user statuses

    this.chatUserListeners.forEach(function (listener) {
      return listener.handleFavouriteUserLoggedOut(username);
    }); // provide visual notifications if do not disturb is not on

    if (this.doNotDisturb) return;
    _notification_NotificationManager__WEBPACK_IMPORTED_MODULE_1__["default"].getInstance().show(username, "User " + username + " has logged out.", 'priority', 4000);
  };

  _proto.handleBlockedUsersChanged = function handleBlockedUsersChanged(usernames) {
    notLogger("Handle blocked users changed to " + usernames);
    this.chatUserListeners.forEach(function (listener) {
      return listener.handleBlockedUsersChanged(usernames);
    });
  };

  _proto.handleFavouriteUsersChanged = function handleFavouriteUsersChanged(usernames) {
    notLogger("Handle favourite users changed to " + usernames);
    this.chatUserListeners.forEach(function (listener) {
      return listener.handleFavouriteUsersChanged(usernames);
    });
  };

  _proto.startChatWithUser = function startChatWithUser(username) {
    return _ChatManager__WEBPACK_IMPORTED_MODULE_0__.ChatManager.getInstance().startChatWithUser(username);
  };

  _proto.handleChatStarted = function handleChatStarted(log) {
    this.chatListeners.forEach(function (listener) {
      return listener.handleChatStarted(log);
    });
  };

  _proto.handleOfflineMessagesReceived = function handleOfflineMessagesReceived(messages) {
    // provide visual notifications if do not disturb is not on
    if (this.doNotDisturb) return;
    if (messages.length === 0) return;
    _notification_NotificationManager__WEBPACK_IMPORTED_MODULE_1__["default"].getInstance().show("Offline messages received", "You have received " + messages.length + " messages since you last logged out.");
  };

  return NotificationController;
}();

/***/ }),

/***/ "./src/socket/SocketManager.ts":
/*!*************************************!*\
  !*** ./src/socket/SocketManager.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Types */ "./src/socket/Types.ts");


var sDebug = debug__WEBPACK_IMPORTED_MODULE_0___default()('socket-ts');

var SocketManager = /*#__PURE__*/function () {
  SocketManager.getInstance = function getInstance() {
    if (!SocketManager._instance) {
      SocketManager._instance = new SocketManager();
    }

    return SocketManager._instance;
  };

  function SocketManager() {
    this.chatReceivers = [];
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

  var _proto = SocketManager.prototype;

  _proto.addChatReceiver = function addChatReceiver(receiver) {
    this.chatReceivers.push(receiver);
  };

  _proto.setListener = function setListener(listener) {
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
  };

  _proto.login = function login(username) {
    this.socket.emit('login', {
      username: username
    });
  };

  _proto.logout = function logout(username) {
    this.socket.emit('logout', {
      username: username
    });
  };

  _proto.joinChat = function joinChat(username, room, type) {
    this.socket.emit('joinroom', {
      username: username,
      room: room,
      type: type
    });
  };

  _proto.leaveChat = function leaveChat(username, room, type) {
    this.socket.emit('exitroom', {
      username: username,
      room: room,
      type: type
    });
  };

  _proto.sendInvite = function sendInvite(from, to, room, type, requiresAcceptDecline, subject, attachment) {
    if (type === void 0) {
      type = _Types__WEBPACK_IMPORTED_MODULE_1__.InviteType.ChatRoom;
    }

    if (requiresAcceptDecline === void 0) {
      requiresAcceptDecline = false;
    }

    if (subject === void 0) {
      subject = '';
    }

    if (attachment === void 0) {
      attachment = {};
    }

    var inviteObj = {
      from: from,
      to: to,
      room: room,
      type: type,
      requiresAcceptDecline: requiresAcceptDecline,
      subject: subject,
      attachment: attachment
    };
    sDebug("Sending invite");
    sDebug(inviteObj);
    this.socket.emit('invite', inviteObj);
  };

  _proto.sendMessage = function sendMessage(from, room, message, created, type, priority, attachment) {
    if (priority === void 0) {
      priority = _Types__WEBPACK_IMPORTED_MODULE_1__.Priority.Normal;
    }

    if (attachment === void 0) {
      attachment = {};
    }

    var messageObj = {
      from: from,
      room: room,
      message: message,
      created: created,
      priority: priority,
      type: type,
      attachment: attachment
    };
    this.socket.emit('chat', messageObj);
  };

  _proto.getUserList = function getUserList() {
    this.socket.emit('userlist');
  };

  _proto.sendDeclineInvite = function sendDeclineInvite(room, from, type) {
    this.socket.emit('declineinvite', {
      room: room,
      from: from,
      type: type
    });
  };

  _proto.callbackForMessage = function callbackForMessage(content) {
    sDebug("Received message : " + content);

    try {
      sDebug(content); // should be a server side ChatMessage {room, message,user}

      var dataObj = JSON.parse(content);
      this.chatReceivers.forEach(function (receiver) {
        return receiver.receiveMessage(dataObj);
      });
    } catch (err) {
      sDebug(err);
      sDebug('Not JSON data');
    }
  };

  _proto.callbackForLogin = function callbackForLogin(message) {
    sDebug("Received login : " + message);
    this.chatReceivers.forEach(function (receiver) {
      return receiver.receiveLogin(message);
    });
  };

  _proto.callbackForUserList = function callbackForUserList(message) {
    sDebug("Received user list : " + message);
    this.chatReceivers.forEach(function (receiver) {
      return receiver.receiveUserList(message);
    });
  };

  _proto.callbackForLogout = function callbackForLogout(message) {
    sDebug("Received logout : " + message);
    this.chatReceivers.forEach(function (receiver) {
      return receiver.receiveLogout(message);
    });
  };

  _proto.callbackForJoinRoom = function callbackForJoinRoom(data) {
    sDebug("Received joined room : " + data);

    try {
      var dataObj = JSON.parse(data);
      sDebug(dataObj);
      this.chatReceivers.forEach(function (receiver) {
        return receiver.receiveJoinedRoom(dataObj);
      });
    } catch (err) {
      sDebug('Not JSON data');
    }
  };

  _proto.callbackForExitRoom = function callbackForExitRoom(data) {
    sDebug("Received left room : " + data);

    try {
      var dataObj = JSON.parse(data);
      sDebug(dataObj);
      this.chatReceivers.forEach(function (receiver) {
        return receiver.receivedLeftRoom(dataObj);
      });
    } catch (err) {
      sDebug('Not JSON data');
    }
  };

  _proto.callbackForInvite = function callbackForInvite(data) {
    sDebug("Received invite : " + data);

    try {
      var dataObj = JSON.parse(data);
      sDebug(dataObj);
      this.chatReceivers.forEach(function (receiver) {
        return receiver.receiveInvitation(dataObj);
      });
    } catch (err) {
      sDebug('Not JSON data');
    }
  };

  _proto.callbackForDeclineInvite = function callbackForDeclineInvite(data) {
    sDebug("Received declined invite : " + data);

    try {
      var dataObj = JSON.parse(data);
      sDebug(dataObj);
      this.chatReceivers.forEach(function (receiver) {
        return receiver.receiveDecline(dataObj.room, dataObj.username, dataObj.type);
      });
    } catch (err) {
      sDebug(err);
      sDebug('Not JSON data');
    }
  };

  _proto.callbackForChat = function callbackForChat(content) {
    sDebug("Received chat : " + content);

    try {
      // should be a server side ChatMessage {room, message,user}
      var dataObj = JSON.parse(content);
      sDebug(dataObj);
      this.chatReceivers.forEach(function (receiver) {
        return receiver.receiveMessage(dataObj);
      });
    } catch (err) {
      sDebug('Not JSON data');
    }
  };

  _proto.callbackForQueue = function callbackForQueue(data) {
    sDebug("Received queued items : " + data);

    try {
      var dataObj = JSON.parse(data);
      sDebug(dataObj); // this object should contain two arrays of invites and messages

      if (dataObj.invites && dataObj.invites.length > 0) {
        this.chatReceivers.forEach(function (receiver) {
          return receiver.receiveQueuedInvites(dataObj.invites);
        });
      }

      if (dataObj.messages && dataObj.messages.length > 0) {
        this.chatReceivers.forEach(function (receiver) {
          return receiver.receiveQueuedMessages(dataObj.messages);
        });
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
  ;

  _proto.callbackForData = function callbackForData(message) {
    sDebug("Received data");

    try {
      var dataObj = JSON.parse(message);
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
  };

  return SocketManager;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SocketManager);

/***/ }),

/***/ "./src/socket/Types.ts":
/*!*****************************!*\
  !*** ./src/socket/Types.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Priority": () => (/* binding */ Priority),
/* harmony export */   "InviteType": () => (/* binding */ InviteType)
/* harmony export */ });
var Priority;

(function (Priority) {
  Priority[Priority["Normal"] = 0] = "Normal";
  Priority[Priority["High"] = 1] = "High";
  Priority[Priority["Urgent"] = 2] = "Urgent";
})(Priority || (Priority = {}));

var InviteType;

(function (InviteType) {
  InviteType[InviteType["ChatRoom"] = 0] = "ChatRoom";
  InviteType[InviteType["ScoreSheet"] = 1] = "ScoreSheet";
})(InviteType || (InviteType = {}));

/***/ }),

/***/ "./src/state/AbstractStateManager.ts":
/*!*******************************************!*\
  !*** ./src/state/AbstractStateManager.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbstractStateManager": () => (/* binding */ AbstractStateManager)
/* harmony export */ });
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _StateManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./StateManager */ "./src/state/StateManager.ts");
/* harmony import */ var _StateChangedDelegate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./StateChangedDelegate */ "./src/state/StateChangedDelegate.ts");



var smLogger = debug__WEBPACK_IMPORTED_MODULE_0___default()('state-manager-ts');
var AbstractStateManager = /*#__PURE__*/function () {
  function AbstractStateManager(managerName) {
    this.forceSaves = true;
    this.managerName = '';
    this.delegate = new _StateChangedDelegate__WEBPACK_IMPORTED_MODULE_2__["default"](managerName);
    this.managerName = managerName;
    this.emitEvents();
    this.forceSaves = true;
  }

  var _proto = AbstractStateManager.prototype;

  _proto.suppressEvents = function suppressEvents() {
    this.delegate.suppressEvents();
  };

  _proto.emitEvents = function emitEvents() {
    this.delegate.emitEvents();
  };

  _proto.dontForceSavesOnAddRemoveUpdate = function dontForceSavesOnAddRemoveUpdate() {
    this.forceSaves = false;
  };

  _proto.forceSavesOnAddRemoveUpdate = function forceSavesOnAddRemoveUpdate() {
    this.forceSaves = true;
  };

  _proto.informChangeListenersForStateWithName = function informChangeListenersForStateWithName(name, stateObjValue, eventType, previousObjValue) {
    if (eventType === void 0) {
      eventType = _StateManager__WEBPACK_IMPORTED_MODULE_1__.stateEventType.StateChanged;
    }

    if (previousObjValue === void 0) {
      previousObjValue = null;
    }

    this.delegate.informChangeListenersForStateWithName(name, stateObjValue, eventType, previousObjValue);
  };

  _proto.addChangeListenerForName = function addChangeListenerForName(name, listener) {
    this.delegate.addChangeListenerForName(name, listener);
  };

  _proto.addStateByName = function addStateByName(name, stateObjForName) {
    this._ensureStatePresent(name);
    /* create a new state attribute for the application state */


    var state = {
      name: name,
      value: stateObjForName
    };
    /* get the current state value and replace it */

    this._replaceNamedStateInStorage(state);

    this.informChangeListenersForStateWithName(name, stateObjForName, _StateManager__WEBPACK_IMPORTED_MODULE_1__.stateEventType.StateChanged);
    return stateObjForName;
  };

  _proto.getStateByName = function getStateByName(name) {
    this._ensureStatePresent(name);

    smLogger("State Manager: Getting state for " + name);
    var stateValueObj = {}; // get the current state

    var state = this._getState(name);

    stateValueObj = state.value;
    smLogger("State Manager: Found previous state for " + name);
    smLogger(stateValueObj);
    return stateValueObj;
  };

  _proto.setStateByName = function setStateByName(name, stateObjectForName, informListeners) {
    if (informListeners === void 0) {
      informListeners = true;
    }

    this._ensureStatePresent(name);

    smLogger("State Manager: Setting state for " + name);
    smLogger(stateObjectForName); // set the current state

    var state = this._getState(name);

    state.value = stateObjectForName;
    if (this.forceSaves) this._saveState(name, stateObjectForName);
    if (informListeners) this.informChangeListenersForStateWithName(name, stateObjectForName);
    return stateObjectForName;
  };

  _proto.addNewItemToState = function addNewItemToState(name, item, isPersisted) {
    if (isPersisted === void 0) {
      isPersisted = false;
    } // assumes state is an array


    this._ensureStatePresent(name);

    smLogger("State Manager: Adding item to state " + name); // const state = this.getStateByName(name);
    // state.push(item);
    // smLogger(state);

    this._addItemToState(name, item, isPersisted);

    this.informChangeListenersForStateWithName(name, item, _StateManager__WEBPACK_IMPORTED_MODULE_1__.stateEventType.ItemAdded);
  };

  _proto.findItemInState = function findItemInState(name, item, testForEqualityFunction) {
    // assumes state is an array
    this._ensureStatePresent(name);

    var result = {};
    var state = this.getStateByName(name);
    var foundIndex = state.findIndex(function (element) {
      return testForEqualityFunction(element, item);
    });
    smLogger("Finding item in state " + name + " - found index " + foundIndex);
    smLogger(item);

    if (foundIndex >= 0) {
      result = state[foundIndex];
    }

    return result;
  };

  _proto.isItemInState = function isItemInState(name, item, testForEqualityFunction) {
    // assumes state is an array
    this._ensureStatePresent(name);

    var result = false;
    var state = this.getStateByName(name);
    var foundIndex = state.findIndex(function (element) {
      return testForEqualityFunction(element, item);
    });

    if (foundIndex >= 0) {
      result = true;
    }

    return result;
  };

  _proto.removeItemFromState = function removeItemFromState(name, item, testForEqualityFunction, isPersisted) {
    this._ensureStatePresent(name);

    var result = true;
    var oldItem = this.findItemInState(name, item, testForEqualityFunction); // remove the item from the state

    smLogger("State Manager: Found item - removing, is persisted " + isPersisted);

    this._removeItemFromState(name, item, testForEqualityFunction, isPersisted); //this.setStateByName(name, state, false);


    this.informChangeListenersForStateWithName(name, oldItem, _StateManager__WEBPACK_IMPORTED_MODULE_1__.stateEventType.ItemDeleted);
    return result;
  };

  _proto.updateItemInState = function updateItemInState(name, item, testForEqualityFunction, isPersisted) {
    this._ensureStatePresent(name);

    var result = true;
    var oldItem = this.findItemInState(name, item, testForEqualityFunction);
    smLogger('State Manager: Found item - replacing ');

    this._updateItemInState(name, item, testForEqualityFunction, isPersisted); //this.setStateByName(name, this.getStateByName(name), false);


    this.informChangeListenersForStateWithName(name, item, _StateManager__WEBPACK_IMPORTED_MODULE_1__.stateEventType.ItemUpdated, oldItem);
    return result;
  };

  return AbstractStateManager;
}();

/***/ }),

/***/ "./src/state/AggregateStateManager.ts":
/*!********************************************!*\
  !*** ./src/state/AggregateStateManager.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AggregateStateManager": () => (/* binding */ AggregateStateManager)
/* harmony export */ });
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AbstractStateManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AbstractStateManager */ "./src/state/AbstractStateManager.ts");
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}



var aggLogger = debug__WEBPACK_IMPORTED_MODULE_0___default()('state-manager-aggregate');
var AggregateStateManager = /*#__PURE__*/function (_AbstractStateManager) {
  _inheritsLoose(AggregateStateManager, _AbstractStateManager);

  function AggregateStateManager() {
    var _this;

    _this = _AbstractStateManager.call(this, 'aggregate') || this;
    _this.stateManagers = [];

    _this.emitEvents();

    return _this;
  }

  AggregateStateManager.getInstance = function getInstance() {
    if (!AggregateStateManager._instance) {
      AggregateStateManager._instance = new AggregateStateManager();
    }

    return AggregateStateManager._instance;
  };

  var _proto = AggregateStateManager.prototype;

  _proto.addStateManager = function addStateManager(stateManager, filters, emitEvents) {
    if (filters === void 0) {
      filters = [];
    }

    var mWF = {
      manager: stateManager,
      filters: filters
    };
    this.stateManagers.push(mWF);
    if (!emitEvents) stateManager.suppressEvents();
    aggLogger('adding state manager with/without filters');
  };

  _proto._addNewNamedStateToStorage = function _addNewNamedStateToStorage(state) {
    var _this2 = this;

    this.stateManagers.forEach(function (managerWithFilters) {
      if (!_this2.stateNameInFilters(state.name, managerWithFilters.filters)) {
        managerWithFilters.manager._addNewNamedStateToStorage(state);
      }
    });
  };

  _proto._getState = function _getState(name) {
    var _this3 = this;

    var state = {
      name: name,
      value: []
    };
    this.stateManagers.forEach(function (sm) {
      if (!_this3.stateNameInFilters(state.name, sm.filters)) {
        aggLogger("get state from state manager for state " + name);
        aggLogger(sm.manager);

        sm.manager._getState(name);
      }
    }); // assuming the state manager is holding all the values

    if (this.stateManagers.length > 0) {
      state = this.stateManagers[0].manager._getState(name);
    }

    return state;
  };

  _proto._ensureStatePresent = function _ensureStatePresent(name) {
    var _this4 = this;

    this.stateManagers.forEach(function (managerWithFilters) {
      if (!_this4.stateNameInFilters(name, managerWithFilters.filters)) {
        managerWithFilters.manager._ensureStatePresent(name);
      }
    });
  };

  _proto._replaceNamedStateInStorage = function _replaceNamedStateInStorage(state) {
    var _this5 = this;

    this.stateManagers.forEach(function (managerWithFilters) {
      if (!_this5.stateNameInFilters(state.name, managerWithFilters.filters)) {
        managerWithFilters.manager._replaceNamedStateInStorage(state);
      }
    });
  };

  _proto._saveState = function _saveState(name, stateObj) {
    var _this6 = this;

    this.stateManagers.forEach(function (managerWithFilters) {
      if (!_this6.stateNameInFilters(name, managerWithFilters.filters)) {
        aggLogger("saving state in state manager for state " + name);
        aggLogger(managerWithFilters.manager);
        aggLogger(stateObj);

        managerWithFilters.manager._saveState(name, stateObj);
      }
    });
  };

  _proto._addItemToState = function _addItemToState(name, stateObj, isPersisted) {
    var _this7 = this;

    if (isPersisted === void 0) {
      isPersisted = false;
    }

    this.stateManagers.forEach(function (managerWithFilters) {
      if (!_this7.stateNameInFilters(name, managerWithFilters.filters)) {
        aggLogger("adding item to state in  state manager for state " + name + ", is persisted = " + isPersisted);
        aggLogger(managerWithFilters.manager);
        aggLogger(stateObj);

        managerWithFilters.manager._addItemToState(name, stateObj, isPersisted);
      }
    });
  };

  _proto._removeItemFromState = function _removeItemFromState(name, stateObj, testForEqualityFunction, isPersisted) {
    var _this8 = this;

    this.stateManagers.forEach(function (managerWithFilters) {
      if (!_this8.stateNameInFilters(name, managerWithFilters.filters)) {
        aggLogger("removing item from state in state manager for state " + name + ", is persisted = " + isPersisted);
        aggLogger(managerWithFilters.manager);
        aggLogger(stateObj);

        managerWithFilters.manager._removeItemFromState(name, stateObj, testForEqualityFunction, isPersisted);
      }
    });
  };

  _proto._updateItemInState = function _updateItemInState(name, stateObj, testForEqualityFunction, isPersisted) {
    var _this9 = this;

    this.stateManagers.forEach(function (managerWithFilters) {
      if (!_this9.stateNameInFilters(name, managerWithFilters.filters)) {
        aggLogger("updating item in state in  state manager for state " + name);
        aggLogger(managerWithFilters.manager);
        aggLogger(stateObj);

        managerWithFilters.manager._updateItemInState(name, stateObj, testForEqualityFunction, isPersisted);
      }
    });
  };

  _proto.stateNameInFilters = function stateNameInFilters(name, filters) {
    var foundIndex = filters.findIndex(function (filter) {
      return filter === name;
    });
    return foundIndex >= 0;
  };

  return AggregateStateManager;
}(_AbstractStateManager__WEBPACK_IMPORTED_MODULE_1__.AbstractStateManager);

/***/ }),

/***/ "./src/state/AsyncStateManagerWrapper.ts":
/*!***********************************************!*\
  !*** ./src/state/AsyncStateManagerWrapper.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AsyncStateManagerWrapper)
/* harmony export */ });
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AbstractStateManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AbstractStateManager */ "./src/state/AbstractStateManager.ts");
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}



var asyncLogger = debug__WEBPACK_IMPORTED_MODULE_0___default()('state-manager-async');

var AsyncStateManagerWrapper = /*#__PURE__*/function (_AbstractStateManager) {
  _inheritsLoose(AsyncStateManagerWrapper, _AbstractStateManager);

  function AsyncStateManagerWrapper(topLevelSM, wrappedSM) {
    var _this;

    _this = _AbstractStateManager.call(this, 'async') || this;
    _this.topLevelSM = topLevelSM;
    _this.wrappedSM = wrappedSM;
    _this.forceSaves = false;

    _this.wrappedSM.emitEvents();

    var stateNamesToMonitor = _this.wrappedSM.getConfiguredStateNames();

    _this.stateChanged = _this.stateChanged.bind(_assertThisInitialized(_this));
    _this.stateChangedItemAdded = _this.stateChangedItemAdded.bind(_assertThisInitialized(_this));
    _this.stateChangedItemRemoved = _this.stateChangedItemRemoved.bind(_assertThisInitialized(_this));
    _this.stateChangedItemUpdated = _this.stateChangedItemUpdated.bind(_assertThisInitialized(_this));
    stateNamesToMonitor.forEach(function (stateName) {
      _this.wrappedSM.addChangeListenerForName(stateName, _assertThisInitialized(_this));
    });
    return _this;
  }

  var _proto = AsyncStateManagerWrapper.prototype;

  _proto._addItemToState = function _addItemToState(name, stateObj, isPersisted) {
    if (isPersisted === void 0) {
      isPersisted = false;
    }

    asyncLogger("adding item to state " + name + " - is persisted " + isPersisted);
    this.wrappedSM.addNewItemToState(name, stateObj, isPersisted);
  };

  _proto._getState = function _getState(name) {
    // assume wrapped SM is asynchronous
    // make the call to get state but supply the caller with an empty state for now
    asyncLogger("getting state " + name);
    this.wrappedSM.getStateByName(name);
    return {
      name: name,
      value: []
    };
  };

  _proto._removeItemFromState = function _removeItemFromState(name, stateObj, testForEqualityFunction, isPersisted) {
    asyncLogger("removing item from state " + name + " is persisted " + isPersisted);
    this.wrappedSM.removeItemFromState(name, stateObj, testForEqualityFunction, isPersisted);
  };

  _proto._updateItemInState = function _updateItemInState(name, stateObj, testForEqualityFunction, isPersisted) {
    asyncLogger("updating item in state " + name);
    this.wrappedSM.updateItemInState(name, stateObj, testForEqualityFunction, isPersisted);
  };

  _proto._ensureStatePresent = function _ensureStatePresent(name) {} // assume already present
  ;

  _proto._addNewNamedStateToStorage = function _addNewNamedStateToStorage(state) {} // assume already present
  ;

  _proto._replaceNamedStateInStorage = function _replaceNamedStateInStorage(state) {} // not implemented, not replacing state wholesale
  ;

  _proto._saveState = function _saveState(name, stateObj) {} // not implemented, not replacing state wholesale
  ;

  _proto.stateChangedItemRemoved = function stateChangedItemRemoved(managerName, name, itemRemoved) {} // not implemented, assumes called to wrapped SM worked
  ;

  _proto.stateChangedItemUpdated = function stateChangedItemUpdated(managerName, name, itemUpdated, itemNewValue) {} // not implemented, assumes called to wrapped SM worked
  ;

  _proto.stateChanged = function stateChanged(managerName, name, newValue) {
    // received new state from the wrapped SM
    // pass the received state to the top level SM
    asyncLogger("Wrapped SM has supplied new state " + name + " passing to top level SM");
    asyncLogger(newValue);
    this.topLevelSM.setStateByName(name, newValue);
  };

  _proto.stateChangedItemAdded = function stateChangedItemAdded(managerName, name, itemAdded) {
    asyncLogger("Wrapped SM has supplied new completed item for state " + name + " passing to top level SM");
    this.topLevelSM.addNewItemToState(name, itemAdded, true);
  };

  return AsyncStateManagerWrapper;
}(_AbstractStateManager__WEBPACK_IMPORTED_MODULE_1__.AbstractStateManager);



/***/ }),

/***/ "./src/state/BrowserStorageStateManager.ts":
/*!*************************************************!*\
  !*** ./src/state/BrowserStorageStateManager.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BrowserStorageStateManager)
/* harmony export */ });
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AbstractStateManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AbstractStateManager */ "./src/state/AbstractStateManager.ts");
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}



var lsLogger = debug__WEBPACK_IMPORTED_MODULE_0___default()('local-storage');

var BrowserStorageStateManager = /*#__PURE__*/function (_AbstractStateManager) {
  _inheritsLoose(BrowserStorageStateManager, _AbstractStateManager); // @ts-ignore


  function BrowserStorageStateManager(useLocalStorage) {
    var _this;

    if (useLocalStorage === void 0) {
      useLocalStorage = false;
    }

    _this = _AbstractStateManager.call(this, 'browser') || this;
    _this.configuration = [];
    _this.storage = window.sessionStorage;
    if (useLocalStorage) _this.storage = window.localStorage;
    _this.forceSaves = true;
    return _this;
  }

  BrowserStorageStateManager.getInstance = function getInstance(useLocalStorage) {
    if (useLocalStorage === void 0) {
      useLocalStorage = false;
    }

    if (!BrowserStorageStateManager._instance) {
      BrowserStorageStateManager._instance = new BrowserStorageStateManager(useLocalStorage);
    }

    return BrowserStorageStateManager._instance;
  };

  var _proto = BrowserStorageStateManager.prototype;

  _proto._ensureStatePresent = function _ensureStatePresent(name) {
    if (this.storage.getItem(name) === null) {
      this._addNewNamedStateToStorage({
        name: name,
        value: []
      });
    }
  };

  _proto._addNewNamedStateToStorage = function _addNewNamedStateToStorage(state) {
    lsLogger("Local Storage: Saving with key " + state.name);
    lsLogger(state);
    var stringifiedSaveData = JSON.stringify(state.value);
    lsLogger(stringifiedSaveData);
    this.storage.setItem(state.name, stringifiedSaveData);
  };

  _proto._replaceNamedStateInStorage = function _replaceNamedStateInStorage(state) {
    this._addNewNamedStateToStorage(state);
  };

  _proto._getState = function _getState(name) {
    var savedResults = [];
    lsLogger("Local Storage: Loading with key " + name);
    var savedResultsJSON = this.storage.getItem(name);
    lsLogger(savedResultsJSON);

    if (savedResultsJSON !== null) {
      savedResults = JSON.parse(savedResultsJSON);
    }

    return {
      name: name,
      value: savedResults
    };
  };

  _proto._saveState = function _saveState(name, newValue) {
    this._addNewNamedStateToStorage({
      name: name,
      value: newValue
    });
  };

  _proto._addItemToState = function _addItemToState(name, stateObj, isPersisted) {
    if (isPersisted === void 0) {
      isPersisted = false;
    }

    if (!isPersisted) return;

    var state = this._getState(name);

    lsLogger("adding item to state " + name);
    lsLogger(stateObj);
    state.value.push(stateObj);

    this._replaceNamedStateInStorage(state);
  };

  _proto._removeItemFromState = function _removeItemFromState(name, stateObj, testForEqualityFunction, isPersisted) {
    var state = this._getState(name);

    var valueIndex = state.value.findIndex(function (element) {
      return testForEqualityFunction(element, stateObj);
    });

    if (valueIndex >= 0) {
      lsLogger("removing item from state " + name);
      lsLogger(stateObj);
      state.value.splice(valueIndex, 1);
    }

    this._replaceNamedStateInStorage(state);
  };

  _proto._updateItemInState = function _updateItemInState(name, stateObj, testForEqualityFunction, isPersisted) {
    var state = this._getState(name);

    var valueIndex = state.value.findIndex(function (element) {
      return testForEqualityFunction(element, stateObj);
    });

    if (valueIndex >= 0) {
      state.value.splice(valueIndex, 1, stateObj);
      lsLogger("updating item in state " + name);
      lsLogger(stateObj);
    }

    this._replaceNamedStateInStorage(state);
  };

  _proto.forceResetForGet = function forceResetForGet(stateName) {};

  _proto.getConfiguredStateNames = function getConfiguredStateNames() {
    return this.configuration;
  };

  _proto.hasCompletedRun = function hasCompletedRun(stateName) {
    return false;
  };

  _proto.initialise = function initialise(config) {
    this.configuration = config;
  };

  return BrowserStorageStateManager;
}(_AbstractStateManager__WEBPACK_IMPORTED_MODULE_1__.AbstractStateManager);



/***/ }),

/***/ "./src/state/MemoryBufferStateManager.ts":
/*!***********************************************!*\
  !*** ./src/state/MemoryBufferStateManager.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AbstractStateManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AbstractStateManager */ "./src/state/AbstractStateManager.ts");
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}



var msManager = debug__WEBPACK_IMPORTED_MODULE_0___default()('state-manager-ms');
/** To Do - make state unchangeable outside of this class (i.e. deep copies) */

var MemoryBufferStateManager = /*#__PURE__*/function (_AbstractStateManager) {
  _inheritsLoose(MemoryBufferStateManager, _AbstractStateManager);

  function MemoryBufferStateManager() {
    var _this;

    _this = _AbstractStateManager.call(this, 'memory') || this;
    _this.applicationState = [];
    _this.forceSaves = true;
    return _this;
  }

  MemoryBufferStateManager.getInstance = function getInstance() {
    if (!MemoryBufferStateManager._instance) {
      MemoryBufferStateManager._instance = new MemoryBufferStateManager();
    }

    return MemoryBufferStateManager._instance;
  };

  var _proto = MemoryBufferStateManager.prototype;

  _proto._ensureStatePresent = function _ensureStatePresent(name) {
    var foundIndex = this.applicationState.findIndex(function (element) {
      return element.name === name;
    });

    if (foundIndex < 0) {
      var state = {
        name: name,
        value: []
      };
      this.applicationState.push(state);
    }
  };

  _proto._addNewNamedStateToStorage = function _addNewNamedStateToStorage(state) {
    msManager("Adding new complete state " + name);
    msManager(state.value);
    this.applicationState.push(state);
  };

  _proto._replaceNamedStateInStorage = function _replaceNamedStateInStorage(state) {
    var foundIndex = this.applicationState.findIndex(function (element) {
      return element.name === state.name;
    });

    if (foundIndex >= 0) {
      msManager("replacing complete state " + name);
      msManager(state.value);
      this.applicationState.splice(foundIndex, 1, state);
    }
  };

  _proto._getState = function _getState(name) {
    // @ts-ignore
    var state = this.applicationState.find(function (element) {
      return element.name === name;
    });
    msManager("getting complete state " + name);
    msManager(state.value);
    return state;
  };

  _proto._saveState = function _saveState(name, stateObject) {
    var foundIndex = this.applicationState.findIndex(function (element) {
      return element.name === name;
    });

    if (foundIndex >= 0) {
      var state = this.applicationState[foundIndex];
      msManager("SAVING complete state " + name);
      msManager(state.value);
      state.value = stateObject;
    }
  };

  _proto._addItemToState = function _addItemToState(name, stateObj, isPersisted) {
    if (isPersisted === void 0) {
      isPersisted = false;
    }

    if (!isPersisted) return; // dont add incomplete objects to the state

    var foundIndex = this.applicationState.findIndex(function (element) {
      return element.name === name;
    });

    if (foundIndex >= 0) {
      var state = this.applicationState[foundIndex];
      msManager("adding item to state " + name);
      msManager(stateObj);
      state.value.push(stateObj);
    }
  };

  _proto._removeItemFromState = function _removeItemFromState(name, stateObj, testForEqualityFunction, isPersisted) {
    var foundIndex = this.applicationState.findIndex(function (element) {
      return element.name === name;
    });

    if (foundIndex >= 0) {
      var state = this.applicationState[foundIndex];
      var valueIndex = state.value.findIndex(function (element) {
        return testForEqualityFunction(element, stateObj);
      });

      if (valueIndex >= 0) {
        msManager("removing item from state " + name);
        msManager(stateObj);
        state.value.splice(valueIndex, 1);
      }
    }
  };

  _proto._updateItemInState = function _updateItemInState(name, stateObj, testForEqualityFunction, isPersisted) {
    var foundIndex = this.applicationState.findIndex(function (element) {
      return element.name === name;
    });

    if (foundIndex >= 0) {
      var state = this.applicationState[foundIndex];
      var valueIndex = state.value.findIndex(function (element) {
        return testForEqualityFunction(element, stateObj);
      });

      if (valueIndex >= 0) {
        state.value.splice(valueIndex, 1, stateObj);
        msManager("updating item in state " + name);
        msManager(stateObj);
      }
    } else {
      this._addItemToState(name, stateObj, true);
    }
  };

  return MemoryBufferStateManager;
}(_AbstractStateManager__WEBPACK_IMPORTED_MODULE_1__.AbstractStateManager);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MemoryBufferStateManager);

/***/ }),

/***/ "./src/state/RESTApiStateManager.ts":
/*!******************************************!*\
  !*** ./src/state/RESTApiStateManager.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RESTApiStateManager": () => (/* binding */ RESTApiStateManager)
/* harmony export */ });
/* harmony import */ var _StateManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StateManager */ "./src/state/StateManager.ts");
/* harmony import */ var _network_Types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../network/Types */ "./src/network/Types.ts");
/* harmony import */ var _network_DownloadManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../network/DownloadManager */ "./src/network/DownloadManager.ts");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _StateChangedDelegate__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./StateChangedDelegate */ "./src/state/StateChangedDelegate.ts");





var apiSMLogger = debug__WEBPACK_IMPORTED_MODULE_3___default()('state-manager-api');
var RESTApiStateManager = /*#__PURE__*/function () {
  function RESTApiStateManager() {
    this.configuration = [];
    this.delegate = new _StateChangedDelegate__WEBPACK_IMPORTED_MODULE_4__["default"]('restapi');
    this.emitEvents();
    this.bHasCompletedRun = [];
    this.callbackForAddItem = this.callbackForAddItem.bind(this);
    this.callbackForRemoveItem = this.callbackForRemoveItem.bind(this);
    this.callbackForUpdateItem = this.callbackForUpdateItem.bind(this);
    this.callbackForGetItems = this.callbackForGetItems.bind(this);
  }

  RESTApiStateManager.getInstance = function getInstance() {
    if (!RESTApiStateManager._instance) {
      RESTApiStateManager._instance = new RESTApiStateManager();
    }

    return RESTApiStateManager._instance;
  };

  var _proto = RESTApiStateManager.prototype;

  _proto.getConfiguredStateNames = function getConfiguredStateNames() {
    var results = [];
    this.configuration.forEach(function (config) {
      results.push(config.stateName);
    });
    return results;
  };

  _proto.hasCompletedRun = function hasCompletedRun(stateName) {
    var result = false;
    var foundIndex = this.configuration.findIndex(function (config) {
      return config.stateName === stateName;
    });

    if (foundIndex >= 0) {
      result = this.bHasCompletedRun[foundIndex];
    }

    return result;
  };

  _proto.setCompletedRun = function setCompletedRun(stateName) {
    var foundIndex = this.configuration.findIndex(function (config) {
      return config.stateName === stateName;
    });

    if (foundIndex >= 0) {
      this.bHasCompletedRun[foundIndex] = true;
    }
  };

  _proto.forceResetForGet = function forceResetForGet(stateName) {
    var foundIndex = this.configuration.findIndex(function (config) {
      return config.stateName === stateName;
    });

    if (foundIndex >= 0) {
      this.bHasCompletedRun[foundIndex] = false;
    }
  };

  _proto.initialise = function initialise(config) {
    this.configuration = config;
    var runsComplete = [];
    this.configuration.forEach(function (configItem) {
      runsComplete.push(false);
    });
    this.bHasCompletedRun = runsComplete;
  };

  _proto._addNewNamedStateToStorage = function _addNewNamedStateToStorage(state) {
    /* assume model on the other end exists */
  };

  _proto._getState = function _getState(name) {
    apiSMLogger("Getting All " + name);

    if (this.hasCompletedRun(name)) {
      apiSMLogger("Getting All " + name + " - not done - previously retrieved");
    } else {
      var config = this.getConfigurationForStateName(name);

      if (config.isActive) {
        var jsonRequest = {
          url: config.serverURL + config.api,
          type: _network_Types__WEBPACK_IMPORTED_MODULE_1__.RequestType.GET,
          params: {},
          callback: this.callbackForGetItems,
          associatedStateName: name
        };
        _network_DownloadManager__WEBPACK_IMPORTED_MODULE_2__["default"].getInstance().addApiRequest(jsonRequest, true);
      } else {
        apiSMLogger("No configuration for state " + name);
      }
    }

    var state = {
      name: name,
      value: []
    };
    return state;
  };

  _proto._ensureStatePresent = function _ensureStatePresent(name) {
    /* assume state exists */
  };

  _proto._replaceNamedStateInStorage = function _replaceNamedStateInStorage(state) {
    /* not going to replace all state */
  };

  _proto._saveState = function _saveState(name, stateObj) {
    /* not going to replace all state */
  };

  _proto._addItemToState = function _addItemToState(name, stateObj, isPersisted) {
    if (isPersisted === void 0) {
      isPersisted = false;
    }

    if (isPersisted) return; // dont add complete objects to the state - they are already processed

    apiSMLogger("Adding item to " + name);
    apiSMLogger(stateObj);
    var config = this.getConfigurationForStateName(name);

    if (config.isActive) {
      var jsonRequest = {
        url: config.serverURL + config.api,
        type: _network_Types__WEBPACK_IMPORTED_MODULE_1__.RequestType.POST,
        params: stateObj,
        callback: this.callbackForAddItem,
        associatedStateName: name
      };
      _network_DownloadManager__WEBPACK_IMPORTED_MODULE_2__["default"].getInstance().addApiRequest(jsonRequest, true);
    } else {
      apiSMLogger("No configuration for state " + name);
    }
  };

  _proto._removeItemFromState = function _removeItemFromState(name, stateObj, testForEqualityFunction, isPersisted) {
    if (isPersisted) return; // dont remove complete objects to the state - they are already processed

    apiSMLogger("Removing item from " + name);
    apiSMLogger(stateObj);
    var config = this.getConfigurationForStateName(name);
    var identifier = stateObj.id;

    if (config.idField) {
      identifier = stateObj[config.idField];
    }

    if (config.isActive) {
      var jsonRequest = {
        url: config.serverURL + config.api,
        type: _network_Types__WEBPACK_IMPORTED_MODULE_1__.RequestType.DELETE,
        params: {
          id: identifier
        },
        callback: this.callbackForRemoveItem,
        associatedStateName: name
      };
      _network_DownloadManager__WEBPACK_IMPORTED_MODULE_2__["default"].getInstance().addApiRequest(jsonRequest, true);
    } else {
      apiSMLogger("No configuration for state " + name);
    }
  };

  _proto._updateItemInState = function _updateItemInState(name, stateObj, testForEqualityFunction, isPersisted) {
    if (isPersisted) return; // dont update complete objects to the state - they are already processed

    apiSMLogger("Updating item in " + name);
    apiSMLogger(stateObj);
    var config = this.getConfigurationForStateName(name);

    if (config.isActive) {
      var jsonRequest = {
        url: config.serverURL + config.api,
        type: _network_Types__WEBPACK_IMPORTED_MODULE_1__.RequestType.PUT,
        params: stateObj,
        callback: this.callbackForUpdateItem,
        associatedStateName: name
      };
      _network_DownloadManager__WEBPACK_IMPORTED_MODULE_2__["default"].getInstance().addApiRequest(jsonRequest, true);
    } else {
      apiSMLogger("No configuration for state " + name);
    }
  };

  _proto.addChangeListenerForName = function addChangeListenerForName(name, listener) {
    this.delegate.addChangeListenerForName(name, listener);
  };

  _proto.addNewItemToState = function addNewItemToState(name, item, isPersisted) {
    this._addItemToState(name, item, isPersisted);
  };

  _proto.emitEvents = function emitEvents() {
    this.delegate.emitEvents();
  };

  _proto.findItemInState = function findItemInState(name, item, testForEqualityFunction) {
    throw Error("not implemented");
  };

  _proto.getStateByName = function getStateByName(name) {
    this._getState(name);
  };

  _proto.informChangeListenersForStateWithName = function informChangeListenersForStateWithName(name, stateObjValue, eventType, previousObjValue) {
    this.delegate.informChangeListenersForStateWithName(name, stateObjValue, eventType, previousObjValue);
  };

  _proto.isItemInState = function isItemInState(name, item, testForEqualityFunction) {
    return true;
  };

  _proto.removeItemFromState = function removeItemFromState(name, item, testForEqualityFunction, isPersisted) {
    apiSMLogger("Removing item from state " + name + " is persisted " + isPersisted);
    apiSMLogger(item);

    this._removeItemFromState(name, item, testForEqualityFunction, isPersisted);

    return true;
  };

  _proto.setStateByName = function setStateByName(name, stateObjectForName, informListeners) {};

  _proto.suppressEvents = function suppressEvents() {
    this.delegate.suppressEvents();
  };

  _proto.updateItemInState = function updateItemInState(name, item, testForEqualityFunction, isPersisted) {
    this._updateItemInState(name, item, testForEqualityFunction, isPersisted);

    return true;
  };

  _proto.getConfigurationForStateName = function getConfigurationForStateName(name) {
    var config = {
      stateName: name,
      serverURL: '',
      api: '',
      isActive: false
    };
    var foundIndex = this.configuration.findIndex(function (config) {
      return config.stateName === name;
    });

    if (foundIndex >= 0) {
      config = this.configuration[foundIndex];
    }

    return config;
  };

  _proto.callbackForRemoveItem = function callbackForRemoveItem(data, status, associatedStateName) {
    apiSMLogger("callback for remove item for state " + associatedStateName + " with status " + status + " - not forwarded");

    if (status >= 200 && status <= 299) {
      // do we have any data?
      apiSMLogger(data);
    }
  };

  _proto.callbackForUpdateItem = function callbackForUpdateItem(data, status, associatedStateName) {
    apiSMLogger("callback for update item for state " + associatedStateName + " with status " + status + " - not forwarded");

    if (status >= 200 && status <= 299) {
      // do we have any data?
      apiSMLogger(data);
    }
  };

  _proto.callbackForGetItems = function callbackForGetItems(data, status, associatedStateName) {
    apiSMLogger("callback for get items for state " + associatedStateName + " with status " + status + " - FORWARDING");

    if (status >= 200 && status <= 299) {
      // do we have any data?
      apiSMLogger(data);
      this.setCompletedRun(associatedStateName);
      this.delegate.informChangeListenersForStateWithName(associatedStateName, data, _StateManager__WEBPACK_IMPORTED_MODULE_0__.stateEventType.StateChanged, null);
    }
  };

  _proto.callbackForAddItem = function callbackForAddItem(data, status, associatedStateName) {
    apiSMLogger("callback for add item for state " + associatedStateName + " with status " + status + " - FORWARDING");

    if (status >= 200 && status <= 299) {
      // do we have any data?
      apiSMLogger(data);
      this.delegate.informChangeListenersForStateWithName(associatedStateName, data, _StateManager__WEBPACK_IMPORTED_MODULE_0__.stateEventType.ItemAdded, null);
    }
  };

  return RESTApiStateManager;
}();

/***/ }),

/***/ "./src/state/StateChangedDelegate.ts":
/*!*******************************************!*\
  !*** ./src/state/StateChangedDelegate.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _StateManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StateManager */ "./src/state/StateManager.ts");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_1__);


var smLogger = debug__WEBPACK_IMPORTED_MODULE_1___default()('state-manager-delegate');

var StateChangedDelegate = /*#__PURE__*/function () {
  function StateChangedDelegate(managerName) {
    this.suppressEventEmits = false;
    this.managerName = managerName;
    this.stateChangeListeners = [];
  }

  var _proto = StateChangedDelegate.prototype;

  _proto.suppressEvents = function suppressEvents() {
    this.suppressEventEmits = true;
  };

  _proto.emitEvents = function emitEvents() {
    this.suppressEventEmits = false;
  };

  _proto.informChangeListenersForStateWithName = function informChangeListenersForStateWithName(name, stateObjValue, eventType, previousObjValue) {
    if (eventType === void 0) {
      eventType = _StateManager__WEBPACK_IMPORTED_MODULE_0__.stateEventType.StateChanged;
    }

    if (previousObjValue === void 0) {
      previousObjValue = null;
    }

    smLogger("State Manager: Informing state listeners of " + name);

    if (this.suppressEventEmits) {
      smLogger("State Manager: Events suppressed");
      return;
    }

    var foundIndex = this.stateChangeListeners.findIndex(function (element) {
      return element.name === name;
    });

    if (foundIndex >= 0) {
      smLogger("State Manager: Found state listeners of " + name + " with event type " + eventType);
      /* let each state change listener know */

      var changeListenersForName = this.stateChangeListeners[foundIndex];

      for (var index = 0; index < changeListenersForName.listeners.length; index++) {
        smLogger("State Manager: Found state listener of " + name + " - informing");
        var listener = changeListenersForName.listeners[index];

        switch (eventType) {
          case _StateManager__WEBPACK_IMPORTED_MODULE_0__.stateEventType.StateChanged:
            {
              listener.stateChanged(this.managerName, name, stateObjValue);
              break;
            }

          case _StateManager__WEBPACK_IMPORTED_MODULE_0__.stateEventType.ItemAdded:
            {
              listener.stateChangedItemAdded(this.managerName, name, stateObjValue);
              break;
            }

          case _StateManager__WEBPACK_IMPORTED_MODULE_0__.stateEventType.ItemUpdated:
            {
              listener.stateChangedItemUpdated(this.managerName, name, previousObjValue, stateObjValue);
              break;
            }

          case _StateManager__WEBPACK_IMPORTED_MODULE_0__.stateEventType.ItemDeleted:
            {
              listener.stateChangedItemRemoved(this.managerName, name, stateObjValue);
              break;
            }
        }
      }
    }
  }
  /*
        Add a state listener for a given state name
        the listener should be a function with two parameters
        name - string - the name of the state variable that they want to be informed about
        stateObjValue - object - the new state value
       */
  ;

  _proto.addChangeListenerForName = function addChangeListenerForName(name, listener) {
    this.ensureListenerSetupForName(name);
    smLogger("State Manager: Adding state listener for " + name);
    var foundIndex = this.stateChangeListeners.findIndex(function (element) {
      return element.name === name;
    });

    if (foundIndex >= 0) {
      var changeListenersForName = this.stateChangeListeners[foundIndex];
      changeListenersForName.listeners.push(listener);
    }
  };

  _proto.ensureListenerSetupForName = function ensureListenerSetupForName(name) {
    var foundIndex = this.stateChangeListeners.findIndex(function (element) {
      return element.name === name;
    });

    if (foundIndex < 0) {
      var listenersNameArrayPair = {
        name: name,
        listeners: []
      };
      this.stateChangeListeners.push(listenersNameArrayPair);
    }
  };

  return StateChangedDelegate;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (StateChangedDelegate);

/***/ }),

/***/ "./src/state/StateManager.ts":
/*!***********************************!*\
  !*** ./src/state/StateManager.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "stateEventType": () => (/* binding */ stateEventType)
/* harmony export */ });
var stateEventType;

(function (stateEventType) {
  stateEventType[stateEventType["ItemAdded"] = 0] = "ItemAdded";
  stateEventType[stateEventType["ItemUpdated"] = 1] = "ItemUpdated";
  stateEventType[stateEventType["ItemDeleted"] = 2] = "ItemDeleted";
  stateEventType[stateEventType["StateChanged"] = 3] = "StateChanged";
})(stateEventType || (stateEventType = {}));

/***/ }),

/***/ "./src/ui-framework/ConfigurationTypes.ts":
/*!************************************************!*\
  !*** ./src/ui-framework/ConfigurationTypes.ts ***!
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
/* harmony export */   "SidebarLocation": () => (/* binding */ SidebarLocation)
/* harmony export */ });
var DRAGGABLE_KEY_ID = 'text/plain';
var DRAGGABLE_TYPE = 'draggedType';
var DRAGGABLE_FROM = 'draggedFrom';
var EXTRA_ACTION_ATTRIBUTE_NAME = 'view-extra-action';
var Modifier;

(function (Modifier) {
  Modifier[Modifier["normal"] = 0] = "normal";
  Modifier[Modifier["active"] = 1] = "active";
  Modifier[Modifier["inactive"] = 2] = "inactive";
  Modifier[Modifier["warning"] = 3] = "warning";
})(Modifier || (Modifier = {}));

var KeyType;

(function (KeyType) {
  KeyType[KeyType["number"] = 0] = "number";
  KeyType[KeyType["string"] = 1] = "string";
  KeyType[KeyType["boolean"] = 2] = "boolean";
  KeyType[KeyType["collection"] = 3] = "collection";
})(KeyType || (KeyType = {}));

var SidebarLocation;

(function (SidebarLocation) {
  SidebarLocation[SidebarLocation["top"] = 0] = "top";
  SidebarLocation[SidebarLocation["right"] = 1] = "right";
  SidebarLocation[SidebarLocation["left"] = 2] = "left";
  SidebarLocation[SidebarLocation["bottom"] = 3] = "bottom";
})(SidebarLocation || (SidebarLocation = {}));

/***/ }),

/***/ "./src/ui-framework/alert/AlertListener.ts":
/*!*************************************************!*\
  !*** ./src/ui-framework/alert/AlertListener.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AlertType": () => (/* binding */ AlertType)
/* harmony export */ });
var AlertType;

(function (AlertType) {
  AlertType[AlertType["cancelled"] = 0] = "cancelled";
  AlertType[AlertType["confirmed"] = 1] = "confirmed";
})(AlertType || (AlertType = {}));

/***/ }),

/***/ "./src/ui-framework/alert/AlertManager.ts":
/*!************************************************!*\
  !*** ./src/ui-framework/alert/AlertManager.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AlertManager": () => (/* binding */ AlertManager)
/* harmony export */ });
/* harmony import */ var _AlertListener__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AlertListener */ "./src/ui-framework/alert/AlertListener.ts");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_1__);


var ALERT_MODAL_ID = 'alert';
var ALERT_TITLE = 'alert-title';
var ALERT_CONTENT = 'alert-content';
var ALERT_CANCEL = 'alert-cancel';
var ALERT_CONFRIM = 'alert-confirm';
var ALERT_hideClass = "d-none";
var ALERT_showClass = "d-block";
var logger = debug__WEBPACK_IMPORTED_MODULE_1___default()('alert');
var AlertManager = /*#__PURE__*/function () {
  AlertManager.getInstance = function getInstance() {
    if (!AlertManager._instance) {
      AlertManager._instance = new AlertManager();
    }

    return AlertManager._instance;
  };

  function AlertManager() {
    this.alertDiv = document.getElementById(ALERT_MODAL_ID);
    this.alertTitle = document.getElementById(ALERT_TITLE);
    this.alertContent = document.getElementById(ALERT_CONTENT);
    this.cancelButton = document.getElementById(ALERT_CANCEL);
    this.confirmButton = document.getElementById(ALERT_CONFRIM);
  }

  var _proto = AlertManager.prototype;

  _proto.startAlert = function startAlert(listener, title, content, context) {
    var _this = this;

    this.alertTitle.innerHTML = title;
    this.alertContent.innerHTML = content; // @ts-ignore

    this.alertDiv.classList.remove(ALERT_hideClass); // @ts-ignore

    this.alertDiv.classList.add(ALERT_showClass);

    var confirmHandler = function confirmHandler(event) {
      logger("Handling confirm event from alert");
      listener.completed({
        outcome: _AlertListener__WEBPACK_IMPORTED_MODULE_0__.AlertType.confirmed,
        context: context
      }); // @ts-ignore

      _this.alertDiv.classList.add(ALERT_hideClass); // @ts-ignore


      _this.alertDiv.classList.remove(ALERT_showClass); // @ts-ignore


      event.target.removeEventListener('click', confirmHandler);
    };

    var cancelHandler = function cancelHandler(event) {
      logger("Handling cancel event from alert");
      listener.completed({
        outcome: _AlertListener__WEBPACK_IMPORTED_MODULE_0__.AlertType.cancelled,
        context: context
      }); // @ts-ignore

      _this.alertDiv.classList.add(ALERT_hideClass); // @ts-ignore


      _this.alertDiv.classList.remove(ALERT_showClass); // @ts-ignore


      event.target.removeEventListener('click', cancelHandler);
    };

    this.confirmButton.addEventListener('click', confirmHandler);
    this.cancelButton.addEventListener('click', cancelHandler);
  };

  return AlertManager;
}();

/***/ }),

/***/ "./src/ui-framework/container/SidebarViewContainer.ts":
/*!************************************************************!*\
  !*** ./src/ui-framework/container/SidebarViewContainer.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ConfigurationTypes */ "./src/ui-framework/ConfigurationTypes.ts");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_1__);


var sbvcLogger = debug__WEBPACK_IMPORTED_MODULE_1___default()('sidebar-container');

var SidebarViewContainer = /*#__PURE__*/function () {
  function SidebarViewContainer(prefs) {
    this.prefs = prefs;
    this.views = []; // event handlers

    this.eventHide = this.eventHide.bind(this);
    this.eventShow = this.eventShow.bind(this);
  }

  var _proto = SidebarViewContainer.prototype;

  _proto.addView = function addView(view, config) {
    sbvcLogger("Adding view to container, with containing div of " + config.containerId);
    var viewContainer = document.getElementById(config.containerId);

    if (viewContainer) {
      sbvcLogger("Adding view to container, with containing div of " + config.containerId + " - FOUND");
      view.setContainedBy(viewContainer);
    }

    this.views.push(view);
    view.addEventListener(this);
  };

  _proto.onDocumentLoaded = function onDocumentLoaded() {
    // this should be called once at startup
    // hide the side bar panel
    this.eventHide(null); // add the event listener for the close button

    var sidePanelEl = document.getElementById(this.prefs.id);
    if (sidePanelEl === null) return;
    var closeButtonEl = sidePanelEl.querySelector('.close');

    if (closeButtonEl) {
      closeButtonEl.addEventListener('click', this.eventHide);
    }

    this.views.forEach(function (view) {
      view.onDocumentLoaded();
    });
  };

  _proto.eventHide = function eventHide(event) {
    if (event) event.preventDefault();
    this.showHide('0%');
    this.views.forEach(function (view) {
      view.hidden();
    });
  };

  _proto.eventShow = function eventShow(event) {
    //414,768,1024
    var size = this.prefs.expandedSize;

    if (window.innerWidth < 769) {
      size = '50%';
    }

    if (window.innerWidth < 415) {
      size = '100%';
    }

    this.showHide(size);
  };

  _proto.showHide = function showHide(newStyleValue) {
    var sidePanelEl = document.getElementById(this.prefs.id);
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
  };

  _proto.documentLoaded = function documentLoaded(view) {};

  _proto.itemAction = function itemAction(view, actionName, selectedItem) {};

  _proto.canDeleteItem = function canDeleteItem(view, selectedItem) {
    return true;
  };

  _proto.itemDeleted = function itemDeleted(view, selectedItem) {};

  _proto.itemDragStarted = function itemDragStarted(view, selectedItem) {};

  _proto.itemSelected = function itemSelected(view, selectedItem) {};

  _proto.itemDeselected = function itemDeselected(view, selectedItem) {};

  _proto.itemDropped = function itemDropped(view, droppedItem) {}
  /*
    Contained views can request show and hide of the sidebar container
   */
  ;

  _proto.showRequested = function showRequested(view) {
    this.eventShow(null);
  };

  _proto.hideRequested = function hideRequested(view) {
    this.eventHide(null);
  };

  _proto.canSelectItem = function canSelectItem(view, selectedItem) {
    return true;
  };

  return SidebarViewContainer;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SidebarViewContainer);

/***/ }),

/***/ "./src/ui-framework/form/AbstractForm.ts":
/*!***********************************************!*\
  !*** ./src/ui-framework/form/AbstractForm.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbstractForm": () => (/* binding */ AbstractForm)
/* harmony export */ });
/* harmony import */ var _FormListener__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FormListener */ "./src/ui-framework/form/FormListener.ts");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _validation_ValidationManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./validation/ValidationManager */ "./src/ui-framework/form/validation/ValidationManager.ts");
/* harmony import */ var _alert_AlertListener__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../alert/AlertListener */ "./src/ui-framework/alert/AlertListener.ts");
/* harmony import */ var _alert_AlertManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../alert/AlertManager */ "./src/ui-framework/alert/AlertManager.ts");
/* harmony import */ var _validation_ValidationTypeDefs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./validation/ValidationTypeDefs */ "./src/ui-framework/form/validation/ValidationTypeDefs.ts");
function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}







var logger = debug__WEBPACK_IMPORTED_MODULE_1___default()('abstract-form');
var dlogger = debug__WEBPACK_IMPORTED_MODULE_1___default()('abstract-form-detail');
var AbstractForm = /*#__PURE__*/function () {
  function AbstractForm(containerId, dataObjDef) {
    this.formListeners = [];
    this.fieldListeners = [];
    this.uiDef = null;
    this.isVisible = false;
    this.fields = [];
    this.isInitialised = false;
    this.hasChangedBoolean = false;
    this.isDisplayOnly = false;
    this.containerEl = document.getElementById(containerId);
    if (!this.containerEl) throw new Error("container " + containerId + " for form " + dataObjDef.id + " does not exist");
    this.map = [];
    this.dataObjDef = dataObjDef;
    this.currentDataObj = {}; // sub-classes need to create the form and it's fields
    // listen to ourselves

    this.addFormListener(this);
  }

  var _proto = AbstractForm.prototype;

  _proto.hasChanged = function hasChanged() {
    return this.hasChangedBoolean;
  };

  _proto.getName = function getName() {
    return this.dataObjDef.displayName;
  };

  _proto.valueChanged = function valueChanged(formId, field, newValue) {
    this.hasChangedBoolean = true;
    logger("Form has changed");
  };

  _proto.failedValidation = function failedValidation(formId, field, currentValue, message) {
    this.hasChangedBoolean = true;
    logger("Form has changed");
  }
  /* methods to be implemented in the subclass */
  ;

  _proto.initialise = function initialise() {
    if (this.isInitialised) return;
    this.isInitialised = true;

    this._initialise();
  };

  _proto.addFieldListener = function addFieldListener(listener) {
    this.fieldListeners.push(listener);
  };

  _proto.addFormListener = function addFormListener(listener) {
    this.formListeners.push(listener);
  };

  _proto.informFormListeners = function informFormListeners(formEvent, dataObj) {
    this.formListeners.forEach(function (listener) {
      return listener.formChanged(formEvent, dataObj);
    });
  };

  _proto.findFieldUiConfig = function findFieldUiConfig(fieldDef) {
    dlogger("Finding field UI Config for field " + fieldDef.displayName);
    var result = null;

    if (this.uiDef) {
      var index = 0;

      while (index < this.uiDef.fieldGroups.length) {
        var fieldGroup = this.uiDef.fieldGroups[index];
        result = fieldGroup.fields.find(function (uiConfig) {
          return uiConfig.field.id === fieldDef.id;
        });

        if (result) {
          dlogger("Finding field UI Config for field " + fieldDef.displayName + " - Found");
          break;
        }

        index++;
      }
    }

    return result;
  };

  _proto.reset = function reset() {
    logger("Resetting form");
    this.isDisplayOnly = false;
    this.hasChangedBoolean = false; // inform the listeners

    if (this.uiDef) {
      var formEvent = {
        formId: this.uiDef.id,
        target: this,
        eventType: _FormListener__WEBPACK_IMPORTED_MODULE_0__.FormEventType.RESETTING
      };
      this.informFormListeners(formEvent, this.currentDataObj);
    }

    this.currentDataObj = {};

    this._reset(); // reset all the fields


    this.fields.forEach(function (field) {
      field.reset();
    });
    this.hasChangedBoolean = false;
  };

  _proto.setIsVisible = function setIsVisible(isVisible) {
    logger("Changing visibility to " + isVisible);
    this.isVisible = isVisible;

    if (this.uiDef) {
      var eventType = _FormListener__WEBPACK_IMPORTED_MODULE_0__.FormEventType.HIDDEN;

      if (this.isVisible) {
        this._visible();

        eventType = _FormListener__WEBPACK_IMPORTED_MODULE_0__.FormEventType.SHOWN;
      } else {
        this._hidden();
      } // inform the listeners


      var formEvent = {
        formId: this.uiDef.id,
        target: this,
        eventType: eventType
      };
      this.informFormListeners(formEvent, this.currentDataObj);
    }

    if (isVisible && !this.isDisplayOnly) this.checkFormValidationOnDisplay();
  };

  _proto.checkFormValidationOnDisplay = function checkFormValidationOnDisplay() {
    var _this = this;

    logger("Checking display validation");
    this.fields.forEach(function (field) {
      var currentValue = field.getValue();

      if (!field.isValid()) {
        logger("Field " + field.getId() + " is invalid");
        field.setInvalid(field.getName() + " has an invalid format or is required.");
      } else {
        // does the field fulfil any rules from the Validation manager
        // @ts-ignore
        var response = _validation_ValidationManager__WEBPACK_IMPORTED_MODULE_2__.ValidationManager.getInstance().applyRulesToTargetField(_this.uiDef.id, field.getFieldDefinition(), null);

        if (response.ruleFailed) {
          // @ts-ignore
          field.setInvalid(response.message);
          logger("Field " + field.getId() + " is invalid from validation manager with message " + response.message);
        }
      }
    });
  };

  _proto.startCreateNew = function startCreateNew() {
    logger("Starting create new");
    this.currentDataObj = {};
    this.isDisplayOnly = false;
    this.hasChangedBoolean = false;

    if (this.uiDef) {
      var eventType = _FormListener__WEBPACK_IMPORTED_MODULE_0__.FormEventType.CREATING; // inform the listeners

      var formEvent = {
        formId: this.uiDef.id,
        target: this,
        eventType: eventType
      };

      this._startCreate();

      this.informFormListeners(formEvent, this.currentDataObj);
    }

    this.clearReadOnly();
    return this.currentDataObj;
  };

  _proto.startUpdate = function startUpdate(objectToEdit) {
    logger("Starting modify existing on ");
    this.isDisplayOnly = false;
    this.hasChangedBoolean = false;
    logger(objectToEdit);
    this.currentDataObj = _extends({}, objectToEdit); // take a copy

    if (this.uiDef) {
      var eventType = _FormListener__WEBPACK_IMPORTED_MODULE_0__.FormEventType.MODIFYING; // inform the listeners

      var formEvent = {
        formId: this.uiDef.id,
        target: this,
        eventType: eventType
      };

      this._startUpdate();

      this.informFormListeners(formEvent, this.currentDataObj);
    }

    this.clearReadOnly();
  };

  _proto.displayOnly = function displayOnly(objectToView) {
    logger("Starting display only ");
    logger(objectToView);
    this.isDisplayOnly = true;
    this.hasChangedBoolean = false;
    this.currentDataObj = _extends({}, objectToView); // take a copy

    if (this.uiDef) {
      this._displayOnly();
    }

    this.setReadOnly();
  };

  _proto.formChanged = function formChanged(event, formValues) {
    var _this2 = this; // catch form events for user leaving the form


    var shouldCancelChange = false;

    switch (event.eventType) {
      case _FormListener__WEBPACK_IMPORTED_MODULE_0__.FormEventType.CANCELLING:
        {
          logger("Form is cancelling");

          if (this.hasChangedBoolean && !this.isDisplayOnly) {
            if (this.uiDef) {
              _alert_AlertManager__WEBPACK_IMPORTED_MODULE_4__.AlertManager.getInstance().startAlert(this, this.uiDef.displayName, "Lose any unsaved changes?", _FormListener__WEBPACK_IMPORTED_MODULE_0__.FormEventType.CANCELLING);
            }
          } else {
            if (this.uiDef) {
              var formEvent = {
                formId: this.uiDef.id,
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
          logger("Form is cancelling - aborted");
          break;
        }

      case _FormListener__WEBPACK_IMPORTED_MODULE_0__.FormEventType.CANCELLED:
        {
          logger("Form is cancelled - resetting"); // user cancelled the form, will become invisible

          this.reset(); // reset the form state

          break;
        }

      case _FormListener__WEBPACK_IMPORTED_MODULE_0__.FormEventType.DELETING:
        {
          logger("Form is deleting");

          if (this.uiDef) {
            _alert_AlertManager__WEBPACK_IMPORTED_MODULE_4__.AlertManager.getInstance().startAlert(this, this.uiDef.displayName, "Are you sure you want to delete this information?", _FormListener__WEBPACK_IMPORTED_MODULE_0__.FormEventType.DELETING);
          }

          break;
        }

      case _FormListener__WEBPACK_IMPORTED_MODULE_0__.FormEventType.DELETE_ABORTED:
        {
          logger("Form is deleting - aborted");
          break;
        }

      case _FormListener__WEBPACK_IMPORTED_MODULE_0__.FormEventType.DELETED:
        {
          logger("Form is deleted - resetting"); // user is deleting the object, will become invisible

          this.reset();
          break;
        }

      case _FormListener__WEBPACK_IMPORTED_MODULE_0__.FormEventType.SAVE_ABORTED:
        {
          logger("Form save cancelled");
          break;
        }

      case _FormListener__WEBPACK_IMPORTED_MODULE_0__.FormEventType.SAVED:
        {
          logger("Form is saved with data");
          logger(formValues);
          this.isDisplayOnly = false;
          this.hasChangedBoolean = false;
          break;
        }

      case _FormListener__WEBPACK_IMPORTED_MODULE_0__.FormEventType.SAVING:
        {
          logger("Form is saving, checking validation and storing values");

          if (this.uiDef) {
            var allFieldsValid = true; // user attempting to save the form, lets check the field validation

            this.fields.forEach(function (field) {
              var currentValue = field.getValue();

              if (!field.isValid()) {
                logger("Field " + field.getId() + " is invalid");
                field.setInvalid(field.getName() + " has an invalid format or is required.");
                allFieldsValid = false;
              } else {
                // does the field fulfil any rules from the Validation manager
                // @ts-ignore
                var response = _validation_ValidationManager__WEBPACK_IMPORTED_MODULE_2__.ValidationManager.getInstance().applyRulesToTargetField(_this2.uiDef.id, field.getFieldDefinition(), _validation_ValidationTypeDefs__WEBPACK_IMPORTED_MODULE_5__.ConditionResponse.invalid);

                if (response.ruleFailed) {
                  // @ts-ignore
                  field.setInvalid(response.message);
                  logger("Field " + field.getId() + " is invalid from validation manager with message " + response.message);
                  allFieldsValid = false;
                } else {
                  _this2.setFieldValueToDataObject(_this2.currentDataObj, field, currentValue);
                }
              }
            }); // is every field valid?

            if (!allFieldsValid) {
              logger("Form is saving, checking validation - FAILED");
              var _formEvent = {
                formId: this.uiDef.id,
                target: this,
                eventType: _FormListener__WEBPACK_IMPORTED_MODULE_0__.FormEventType.SAVE_ABORTED
              };
              this.informFormListeners(_formEvent, this.currentDataObj);
              shouldCancelChange = true;
            } else {
              logger("formatted data object is");
              var formattedDataObject = this.getFormattedDataObject();
              var _formEvent2 = {
                formId: this.uiDef.id,
                target: this,
                eventType: _FormListener__WEBPACK_IMPORTED_MODULE_0__.FormEventType.SAVED
              };
              this.informFormListeners(_formEvent2, formattedDataObject);
            }

            break;
          }
        }
    }

    return shouldCancelChange;
  };

  _proto.getId = function getId() {
    var result = '';

    if (this.uiDef) {
      result = this.uiDef.id;
    }

    return result;
  };

  _proto.getFieldFromDataFieldId = function getFieldFromDataFieldId(dataFieldId) {
    var result = undefined;
    dlogger("Finding field for attribute " + dataFieldId + " ");
    var mapItem = this.map.find(function (mapItem) {
      return mapItem.attributeId === dataFieldId;
    });

    if (mapItem) {
      dlogger("Mapped attribute " + mapItem.attributeId + " to field " + mapItem.fieldId); // find the field with that id

      result = this.fields.find(function (field) {
        return field.getId() === mapItem.attributeId;
      });
    }

    return result;
  };

  _proto.completed = function completed(event) {
    logger("Handling alert completed");
    logger(event);

    if (event.context && this.uiDef) {
      switch (event.context) {
        case _FormListener__WEBPACK_IMPORTED_MODULE_0__.FormEventType.CANCELLING:
          {
            if (event.outcome === _alert_AlertListener__WEBPACK_IMPORTED_MODULE_3__.AlertType.confirmed) {
              var formEvent = {
                formId: this.uiDef.id,
                target: this,
                eventType: _FormListener__WEBPACK_IMPORTED_MODULE_0__.FormEventType.CANCELLED
              };
              this.informFormListeners(formEvent, this.currentDataObj);
            } else {
              var _formEvent3 = {
                formId: this.uiDef.id,
                target: this,
                eventType: _FormListener__WEBPACK_IMPORTED_MODULE_0__.FormEventType.CANCELLING_ABORTED
              };
              this.informFormListeners(_formEvent3, this.currentDataObj);
            }

            break;
          }

        case _FormListener__WEBPACK_IMPORTED_MODULE_0__.FormEventType.DELETING:
          {
            if (event.outcome === _alert_AlertListener__WEBPACK_IMPORTED_MODULE_3__.AlertType.confirmed) {
              var _formEvent4 = {
                formId: this.uiDef.id,
                target: this,
                eventType: _FormListener__WEBPACK_IMPORTED_MODULE_0__.FormEventType.DELETED
              };
              this.informFormListeners(_formEvent4, this.currentDataObj);
            } else {
              var _formEvent5 = {
                formId: this.uiDef.id,
                target: this,
                eventType: _FormListener__WEBPACK_IMPORTED_MODULE_0__.FormEventType.DELETE_ABORTED
              };
              this.informFormListeners(_formEvent5, this.currentDataObj);
            }

            break;
          }
      }
    }
  };

  _proto.clearReadOnly = function clearReadOnly() {
    this.fields.forEach(function (field) {
      field.clearReadOnly();
    });
  };

  _proto.setReadOnly = function setReadOnly() {
    this.fields.forEach(function (field) {
      field.setReadOnly();
    });
  };

  _proto.isDisplayingItem = function isDisplayingItem(dataObj) {
    if (this.currentDataObj) {
      return this._isSameObjectAsDisplayed(dataObj);
    }

    return false;
  };

  _proto.isReadOnly = function isReadOnly() {
    return this.isDisplayOnly;
  };

  return AbstractForm;
}();

/***/ }),

/***/ "./src/ui-framework/form/BasicFormImplementation.ts":
/*!**********************************************************!*\
  !*** ./src/ui-framework/form/BasicFormImplementation.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BasicFormImplementation": () => (/* binding */ BasicFormImplementation)
/* harmony export */ });
/* harmony import */ var _FormUITypeDefs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FormUITypeDefs */ "./src/ui-framework/form/FormUITypeDefs.ts");
/* harmony import */ var _AbstractForm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AbstractForm */ "./src/ui-framework/form/AbstractForm.ts");
/* harmony import */ var _helper_BootstrapFormConfigHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helper/BootstrapFormConfigHelper */ "./src/ui-framework/helper/BootstrapFormConfigHelper.ts");
/* harmony import */ var _factory_FormElementFactory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./factory/FormElementFactory */ "./src/ui-framework/form/factory/FormElementFactory.ts");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../util/BrowserUtil */ "./src/util/BrowserUtil.ts");
/* harmony import */ var _field_TextAreaField__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./field/TextAreaField */ "./src/ui-framework/form/field/TextAreaField.ts");
/* harmony import */ var _field_RadioButtonGroupField__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./field/RadioButtonGroupField */ "./src/ui-framework/form/field/RadioButtonGroupField.ts");
/* harmony import */ var _field_SelectField__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./field/SelectField */ "./src/ui-framework/form/field/SelectField.ts");
/* harmony import */ var _field_InputField__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./field/InputField */ "./src/ui-framework/form/field/InputField.ts");
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}











var logger = debug__WEBPACK_IMPORTED_MODULE_4___default()('basic-form');
var dlogger = debug__WEBPACK_IMPORTED_MODULE_4___default()('basic-form-detail');
var BasicFormImplementation = /*#__PURE__*/function (_AbstractForm) {
  _inheritsLoose(BasicFormImplementation, _AbstractForm);

  function BasicFormImplementation(containerId, dataObjDef) {
    var _this;

    _this = _AbstractForm.call(this, containerId, dataObjDef) || this;
    _this.factoryElements = null;
    return _this;
  }

  var _proto = BasicFormImplementation.prototype;

  _proto._hidden = function _hidden() {
    var _this$containerEl;

    if (this.factoryElements) (_this$containerEl = this.containerEl) == null ? void 0 : _this$containerEl.removeChild(this.factoryElements.form);
  };

  _proto.setupFieldObject = function setupFieldObject(fieldEl, subElements) {
    if (subElements === void 0) {
      subElements = [];
    } // get the data-id field from the field element


    var dataId = fieldEl.getAttribute(_FormUITypeDefs__WEBPACK_IMPORTED_MODULE_0__.DATA_ID_ATTRIBUTE);
    var fieldId = fieldEl.getAttribute('id');
    dlogger("Converting field input element " + fieldId + " with data-id of " + dataId);

    if (dataId && fieldId) {
      // find the corresponding field definition
      var index = this.dataObjDef.fields.findIndex(function (value) {
        return value.id === dataId;
      });
      var fieldDef = this.dataObjDef.fields.find(function (value) {
        return value.id === dataId;
      });

      if (fieldDef) {
        dlogger("Converting field input element " + fieldId + " with data-id of " + dataId + " field definition is");
        logger(fieldDef); // find the corresponding ui definition

        var fieldUIConfig = this.findFieldUiConfig(fieldDef);
        dlogger("Converting field input element " + fieldId + " with data-id of " + dataId + " field ui config is");
        logger(fieldUIConfig);

        if (fieldUIConfig) {
          if (this.uiDef) {
            var field;

            switch (fieldUIConfig.elementType) {
              case _FormUITypeDefs__WEBPACK_IMPORTED_MODULE_0__.UIFieldType.textarea:
                {
                  field = new _field_TextAreaField__WEBPACK_IMPORTED_MODULE_6__.TextAreaField(this.uiDef.id, fieldUIConfig, fieldDef, fieldEl);
                  break;
                }

              case _FormUITypeDefs__WEBPACK_IMPORTED_MODULE_0__.UIFieldType.radioGroup:
                {
                  field = new _field_RadioButtonGroupField__WEBPACK_IMPORTED_MODULE_7__.RadioButtonGroupField(this.uiDef.id, fieldUIConfig, fieldDef, fieldEl, subElements);
                  break;
                }

              case _FormUITypeDefs__WEBPACK_IMPORTED_MODULE_0__.UIFieldType.select:
                {
                  field = new _field_SelectField__WEBPACK_IMPORTED_MODULE_8__.SelectField(this.uiDef.id, fieldUIConfig, fieldDef, fieldEl);
                  break;
                }

              default:
                {
                  field = new _field_InputField__WEBPACK_IMPORTED_MODULE_9__.InputField(this.uiDef.id, fieldUIConfig, fieldDef, fieldEl);
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
        dlogger("Converting field input element " + fieldId + " with data-id of " + dataId + " field definition is NOT FOUND");
      }
    }
  };

  _proto._initialise = function _initialise() {
    var _this2 = this;

    logger("Initialising"); // ok, so given a Data Object definition we are going to create the form ui config

    this.uiDef = _helper_BootstrapFormConfigHelper__WEBPACK_IMPORTED_MODULE_2__.BootstrapFormConfigHelper.getInstance().generateFormConfig(this.dataObjDef);
    logger(this.uiDef); // now we need to create all the form elements from the ui definition

    this.factoryElements = _factory_FormElementFactory__WEBPACK_IMPORTED_MODULE_3__.FormElementFactory.getInstance().createFormElements(this, this.formListeners, this.uiDef, this.fieldListeners);
    logger(this.factoryElements); // create field elements for each field element, and the basic map

    logger("Converting field input elements to Field objects");
    this.factoryElements.fields.forEach(function (fieldEl) {
      _this2.setupFieldObject(fieldEl);
    });
    logger("Converting field text area elements to Field objects");
    this.factoryElements.textFields.forEach(function (fieldEl) {
      _this2.setupFieldObject(fieldEl);
    });
    logger("Converting field select elements to Field objects");
    this.factoryElements.selectFields.forEach(function (fieldEl) {
      _this2.setupFieldObject(fieldEl);
    });
    logger("Converting field rbg elements to Field objects");
    this.factoryElements.radioButtonGroups.forEach(function (rbg) {
      _this2.setupFieldObject(rbg.container, rbg.radioButtons);
    });
    logger("field/data map is ");
    logger(this.map);
    logger('fields are');
    logger(this.fields);
  };

  _proto._reset = function _reset() {};

  _proto.validateField = function validateField(fieldDef) {
    var field = this.getFieldFromDataFieldId(fieldDef.id);
    if (field) field.validate();
  };

  _proto.renderField = function renderField(fieldDef, currentValue) {
    var result = currentValue;
    var field = this.getFieldFromDataFieldId(fieldDef.id);

    if (field) {
      result = field.render(result);
    }

    return result;
  };

  _proto._startCreate = function _startCreate() {
    var _this3 = this; // we have a new object, there might be some values to generate


    this.dataObjDef.fields.forEach(function (fieldDef) {
      if (fieldDef.generator && fieldDef.generator.onCreation) {
        var _fieldValue = fieldDef.generator.generator.generate(fieldDef, true);

        dlogger("Setting default values for " + fieldDef.displayName + " to " + _fieldValue);
        _this3.currentDataObj[fieldDef.id] = _fieldValue;
      }

      var fieldValue = _this3.currentDataObj[fieldDef.id];

      if (fieldValue) {
        fieldValue = _this3.renderField(fieldDef, fieldValue);

        _this3.setFieldValueFromDataObject(fieldDef, fieldValue);
      } // run the validation to let the user know what is required


      _this3.validateField(fieldDef);
    }); // delete button can go

    if (this.factoryElements) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_5__["default"].addAttributes(this.factoryElements.deleteButton, [{
      name: 'style',
      value: 'display:none'
    }]);
  };

  _proto._startUpdate = function _startUpdate() {
    var _this4 = this; // we have an existing object, there might be some values to generate


    logger(this.currentDataObj);
    this.dataObjDef.fields.forEach(function (fieldDef) {
      if (fieldDef.generator && fieldDef.generator.onModify) {
        var _fieldValue2 = fieldDef.generator.generator.generate(fieldDef, false);

        dlogger("Setting default modified values for " + fieldDef.displayName + " to " + _fieldValue2);
        _this4.currentDataObj[fieldDef.id] = _fieldValue2;
      }

      var fieldValue = _this4.currentDataObj[fieldDef.id];
      if (fieldValue) fieldValue = _this4.renderField(fieldDef, fieldValue);

      _this4.setFieldValueFromDataObject(fieldDef, fieldValue);

      _this4.validateField(fieldDef);
    }); // delete button make visible again

    if (this.factoryElements) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_5__["default"].removeAttributes(this.factoryElements.deleteButton, ['style']);
  };

  _proto._displayOnly = function _displayOnly() {
    var _this5 = this; // we have an existing object, there might be some values to generate


    logger(this.currentDataObj);
    this.dataObjDef.fields.forEach(function (fieldDef) {
      var fieldValue = _this5.currentDataObj[fieldDef.id];
      if (fieldValue) fieldValue = _this5.renderField(fieldDef, fieldValue);

      _this5.setFieldValueFromDataObject(fieldDef, fieldValue);
    }); // delete button can go

    if (this.factoryElements) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_5__["default"].addAttributes(this.factoryElements.deleteButton, [{
      name: 'style',
      value: 'display:none'
    }]);
  };

  _proto._visible = function _visible() {
    var _this$containerEl2;

    if (this.factoryElements) (_this$containerEl2 = this.containerEl) == null ? void 0 : _this$containerEl2.appendChild(this.factoryElements.form);
  };

  _proto.setFieldValueToDataObject = function setFieldValueToDataObject(dataObj, field, currentValue) {
    // find the attribute id from the map
    var mapItem = this.map.find(function (mapItem) {
      return mapItem.attributeId === field.getId();
    });

    if (mapItem) {
      dlogger("Mapped field " + mapItem.fieldId + " to attribute " + mapItem.attributeId + " with value " + currentValue);
      this.currentDataObj[mapItem.attributeId] = currentValue;
    } else {
      logger("Mapped field " + field.getId() + " to attribute NOT FOUND");
    }
  };

  _proto.setFieldValueFromDataObject = function setFieldValueFromDataObject(fieldDef, currentValue) {
    var field = this.getFieldFromDataFieldId(fieldDef.id); // find the field id from the map

    if (field) {
      if (currentValue) {
        field.setValue(currentValue);
      } else {
        field.clearValue();
      }
    }
  };

  _proto.getFormattedFieldValue = function getFormattedFieldValue(fieldDef) {
    var result = null;
    var mapItem = this.map.find(function (mapItem) {
      return mapItem.attributeId === fieldDef.id;
    });

    if (mapItem) {
      dlogger("Mapped attribute " + mapItem.attributeId + " to field " + mapItem.fieldId + " with for getting formatted value"); // find the field with that id

      var field = this.fields.find(function (field) {
        return field.getId() === mapItem.attributeId;
      });

      if (field) {
        result = field.getFormattedValue();
      }
    }

    return result;
  };

  _proto.getFormattedDataObject = function getFormattedDataObject() {
    var _this6 = this;

    logger("Getting current formatted data");
    var formattedResult = {};
    this.dataObjDef.fields.forEach(function (fieldDef) {
      var fieldValue = _this6.currentDataObj[fieldDef.id];
      formattedResult[fieldDef.id] = _this6.getFormattedFieldValue(fieldDef);
    });
    logger(formattedResult);
    return formattedResult;
  };

  _proto._isSameObjectAsDisplayed = function _isSameObjectAsDisplayed(dataObj) {
    var _this7 = this; // we can only be sure for objects with keys


    var isSameObject = false;
    dlogger("is same object as current");
    dlogger(dataObj);
    dlogger(this.currentDataObj);
    this.dataObjDef.fields.every(function (field) {
      if (field.isKey) {
        var _this7$getFieldFromDa;

        var currentObjId = (_this7$getFieldFromDa = _this7.getFieldFromDataFieldId(field.id)) == null ? void 0 : _this7$getFieldFromDa.getValue();
        var suppliedObjId = dataObj[field.id];
        dlogger("is same object id " + suppliedObjId + " as current " + currentObjId);

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
  };

  return BasicFormImplementation;
}(_AbstractForm__WEBPACK_IMPORTED_MODULE_1__.AbstractForm);

/***/ }),

/***/ "./src/ui-framework/form/FormListener.ts":
/*!***********************************************!*\
  !*** ./src/ui-framework/form/FormListener.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FormEventType": () => (/* binding */ FormEventType)
/* harmony export */ });
var FormEventType;

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

/***/ "./src/ui-framework/form/FormUITypeDefs.ts":
/*!*************************************************!*\
  !*** ./src/ui-framework/form/FormUITypeDefs.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UIFieldType": () => (/* binding */ UIFieldType),
/* harmony export */   "FormMode": () => (/* binding */ FormMode),
/* harmony export */   "DATA_ID_ATTRIBUTE": () => (/* binding */ DATA_ID_ATTRIBUTE)
/* harmony export */ });
var UIFieldType;

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
})(UIFieldType || (UIFieldType = {}));

var FormMode;

(function (FormMode) {
  FormMode[FormMode["unset"] = -1] = "unset";
  FormMode[FormMode["create"] = 0] = "create";
  FormMode[FormMode["update"] = 1] = "update";
})(FormMode || (FormMode = {}));

var DATA_ID_ATTRIBUTE = 'data-id';

/***/ }),

/***/ "./src/ui-framework/form/event-handlers/EditingEventListener.ts":
/*!**********************************************************************!*\
  !*** ./src/ui-framework/form/event-handlers/EditingEventListener.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EditingEventListener": () => (/* binding */ EditingEventListener)
/* harmony export */ });
var EditingEventListener = /*#__PURE__*/function () {
  function EditingEventListener(formId, fieldConfig, listeners) {
    this.formId = formId;
    this.fieldConfig = fieldConfig;
    this.listeners = listeners;
    this.handleEvent = this.handleEvent.bind(this);
  }

  var _proto = EditingEventListener.prototype;

  _proto.handleEvent = function handleEvent(event) {
    var _this = this;

    event.preventDefault();
    event.stopPropagation(); // @ts-ignore

    var fieldElement = event.target;

    if (this.fieldConfig.editor) {
      var field = this.fieldConfig.field;
      var value = fieldElement.value;
      var newValue = this.fieldConfig.editor.editValue(field, value);

      if (newValue) {
        fieldElement.value = newValue;
        this.listeners.forEach(function (listener) {
          return listener.valueChanged(_this.formId, field, newValue);
        });
      }
    }
  };

  return EditingEventListener;
}();

/***/ }),

/***/ "./src/ui-framework/form/event-handlers/RenderingEventListener.ts":
/*!************************************************************************!*\
  !*** ./src/ui-framework/form/event-handlers/RenderingEventListener.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RenderingEventListener": () => (/* binding */ RenderingEventListener)
/* harmony export */ });
var RenderingEventListener = /*#__PURE__*/function () {
  function RenderingEventListener(formId, fieldConfig, listeners, subElements) {
    if (subElements === void 0) {
      subElements = null;
    }

    this.formId = formId;
    this.fieldConfig = fieldConfig;
    this.listeners = listeners;
    this.subElements = subElements;
    this.handleEvent = this.handleEvent.bind(this);
  }

  var _proto = RenderingEventListener.prototype;

  _proto.processRendering = function processRendering(fieldElement) {
    var newValue = '';

    if (this.fieldConfig.renderer) {
      var field = this.fieldConfig.field;
      var value = fieldElement.value;
      if (this.subElements) this.fieldConfig.renderer.setSubElements(this.subElements);
      newValue = this.fieldConfig.renderer.renderValue(field, value);

      if (newValue) {
        fieldElement.value = newValue; // @ts-ignore

        this.listeners.forEach(function (listener) {
          return listener.valueChanged(field, newValue);
        });
      }
    }

    if (newValue) {
      return newValue;
    } else {
      return '';
    }
  };

  _proto.handleEvent = function handleEvent(event) {
    event.preventDefault();
    event.stopPropagation(); // @ts-ignore

    var fieldElement = event.target;
    this.processRendering(fieldElement);
  };

  return RenderingEventListener;
}();

/***/ }),

/***/ "./src/ui-framework/form/event-handlers/ValidationEventHandler.ts":
/*!************************************************************************!*\
  !*** ./src/ui-framework/form/event-handlers/ValidationEventHandler.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidationEventHandler": () => (/* binding */ ValidationEventHandler)
/* harmony export */ });
/* harmony import */ var _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../model/DataObjectTypeDefs */ "./src/model/DataObjectTypeDefs.ts");
/* harmony import */ var _FormUITypeDefs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../FormUITypeDefs */ "./src/ui-framework/form/FormUITypeDefs.ts");
/* harmony import */ var _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../util/BrowserUtil */ "./src/util/BrowserUtil.ts");



var ValidationEventHandler = /*#__PURE__*/function () {
  function ValidationEventHandler(formId, fieldConfig, listeners, subElements) {
    if (subElements === void 0) {
      subElements = null;
    }

    this.formId = formId;
    this.fieldConfig = fieldConfig;
    this.listeners = listeners;
    this.subElements = subElements;
    this.handleEvent = this.handleEvent.bind(this);
  }

  var _proto = ValidationEventHandler.prototype;

  _proto.setValidationStatusAndMessage = function setValidationStatusAndMessage(fieldElement, isValid, value, message, resetOnFailure) {
    var _this = this;

    if (message === void 0) {
      message = undefined;
    }

    if (resetOnFailure === void 0) {
      resetOnFailure = false;
    }

    if (this.fieldConfig.validator && fieldElement) {
      var field = this.fieldConfig.field;
      var validationElementTarget = fieldElement; // we are providing user feedback on the field element, unless...

      if (this.subElements) {
        // sub elements change the validation target
        this.fieldConfig.validator.validator.setSubElements(this.subElements);

        if (this.fieldConfig.subElement) {
          // should be targetting the parentelement
          var parentEl = fieldElement.parentElement;

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

      var errorMessageDiv = document.getElementById(this.formId + ".field." + this.fieldConfig.field.id + ".error");
      var errorMessageEl = document.getElementById(this.formId + ".field." + this.fieldConfig.field.id + ".error.message"); // clear any previous message

      errorMessageDiv == null ? void 0 : errorMessageDiv.setAttribute('style', 'display:none');
      if (errorMessageEl) errorMessageEl.innerHTML = '';
      if (this.fieldConfig.validator.invalidClasses) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(validationElementTarget, this.fieldConfig.validator.invalidClasses, false);
      if (this.fieldConfig.validator.validClasses) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(validationElementTarget, this.fieldConfig.validator.validClasses);

      if (!isValid) {
        if (this.fieldConfig.validator.invalidClasses) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(validationElementTarget, this.fieldConfig.validator.invalidClasses);
        if (this.fieldConfig.validator.validClasses) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(validationElementTarget, this.fieldConfig.validator.validClasses, false);

        if (!message) {
          message = field.displayName + " does not have a valid value.";
        } // show the error message


        errorMessageDiv == null ? void 0 : errorMessageDiv.setAttribute('style', 'display:block');
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


        this.listeners.forEach(function (listener) {
          return listener.failedValidation(_this.formId, field, value, message);
        });
      }
    }
  };

  _proto.processValidation = function processValidation(fieldElement) {
    if (this.fieldConfig.validator && fieldElement) {
      var field = this.fieldConfig.field; // @ts-ignore

      var value = fieldElement.value; // checkboxes store values differently

      if (this.fieldConfig.elementType === _FormUITypeDefs__WEBPACK_IMPORTED_MODULE_1__.UIFieldType.checkbox) {
        // @ts-ignore
        value = '' + fieldElement.checked;
      }

      if (this.subElements) {
        value = '';
        this.subElements.forEach(function (subElement) {
          if (subElement.checked) {
            value = subElement.value;
          }
        });
      }

      var validationResp = this.fieldConfig.validator.validator.isValidValue(field, value);
      this.setValidationStatusAndMessage(fieldElement, validationResp.isValid, value, validationResp.message, validationResp.resetOnFailure);
    }
  };

  _proto.handleEvent = function handleEvent(event) {
    event.preventDefault();
    event.stopPropagation(); // @ts-ignore

    var fieldElement = event.target;
    this.processValidation(fieldElement);
  };

  return ValidationEventHandler;
}();

/***/ }),

/***/ "./src/ui-framework/form/factory/FieldInputElementFactory.ts":
/*!*******************************************************************!*\
  !*** ./src/ui-framework/form/factory/FieldInputElementFactory.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FieldInputElementFactory": () => (/* binding */ FieldInputElementFactory)
/* harmony export */ });
/* harmony import */ var _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../util/BrowserUtil */ "./src/util/BrowserUtil.ts");
/* harmony import */ var _FormUITypeDefs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../FormUITypeDefs */ "./src/ui-framework/form/FormUITypeDefs.ts");
/* harmony import */ var _event_handlers_ValidationEventHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../event-handlers/ValidationEventHandler */ "./src/ui-framework/form/event-handlers/ValidationEventHandler.ts");
/* harmony import */ var _event_handlers_EditingEventListener__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../event-handlers/EditingEventListener */ "./src/ui-framework/form/event-handlers/EditingEventListener.ts");
/* harmony import */ var _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../model/DataObjectTypeDefs */ "./src/model/DataObjectTypeDefs.ts");






var DefaultFieldOptionsListener = /*#__PURE__*/function () {
  function DefaultFieldOptionsListener(formId, parentElement, fieldUIConfig) {
    this.formId = formId;
    this.parentElement = parentElement;
    this.fieldUIConfig = fieldUIConfig;
  }

  var _proto = DefaultFieldOptionsListener.prototype;

  _proto.optionsChanged = function optionsChanged(newOptions) {
    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].removeAllChildren(this.parentElement);
    var subEls = FieldInputElementFactory.createSubElements(this.formId, this.parentElement, this.fieldUIConfig, newOptions);
  };

  return DefaultFieldOptionsListener;
}();

var FieldInputElementFactory = /*#__PURE__*/function () {
  FieldInputElementFactory.getInstance = function getInstance() {
    if (!FieldInputElementFactory._instance) {
      FieldInputElementFactory._instance = new FieldInputElementFactory();
    }

    return FieldInputElementFactory._instance;
  };

  function FieldInputElementFactory() {}

  FieldInputElementFactory.initialiseFieldElementAndEventHandlers = function initialiseFieldElementAndEventHandlers(fieldElement, formId, fieldConfig, listeners, subElements) {
    if (subElements === void 0) {
      subElements = null;
    }

    fieldElement.setAttribute('id', formId + ".field." + fieldConfig.field.id);
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


    if (fieldConfig.validator) {
      // is the value in the field valid
      var eventHandler = new _event_handlers_ValidationEventHandler__WEBPACK_IMPORTED_MODULE_2__.ValidationEventHandler(formId, fieldConfig, listeners, subElements);

      if (subElements) {
        // event for the subelements
        subElements.forEach(function (subElement) {
          subElement.addEventListener('blur', eventHandler);
        });
      } else {
        fieldElement.addEventListener('blur', eventHandler);
      }
    }

    if (fieldConfig.editor) {
      // render the value when the field gains focus
      fieldElement.addEventListener('focus', new _event_handlers_EditingEventListener__WEBPACK_IMPORTED_MODULE_3__.EditingEventListener(formId, fieldConfig, listeners));
    } // care for endless loops here, renderer needs to return null if no changes
    // date picker for date fields


    if (fieldConfig.field.type === _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_4__.FieldType.date) {
      $(fieldElement).datepicker();
      $(fieldElement).datepicker("option", "dateFormat", 'dd/mm/yy');
    }
  };

  FieldInputElementFactory.createFieldComponentsAndContainer = function createFieldComponentsAndContainer(fieldElement, formId, containerEl, fieldConfig, listeners) {
    // if the field has a validator, then we need a div for error messages
    var errorMessageDivEl = null;

    if (fieldConfig.validator) {
      errorMessageDivEl = document.createElement('div');
      errorMessageDivEl.setAttribute('id', formId + ".field." + fieldConfig.field.id + ".error");
      errorMessageDivEl.setAttribute('style', 'display: none'); // default to not visible

      _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(errorMessageDivEl, fieldConfig.validator.messageDisplay.elementClasses);
      var messageEl = document.createElement(fieldConfig.validator.messageDisplay.elementType);

      if (messageEl) {
        messageEl.setAttribute('id', formId + ".field." + fieldConfig.field.id + ".error.message");
        if (fieldConfig.validator.messageDisplay.elementAttributes) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addAttributes(messageEl, fieldConfig.validator.messageDisplay.elementAttributes);
        errorMessageDivEl.appendChild(messageEl);
      }
    } // ok, so is the field contained?


    if (fieldConfig.containedBy) {
      // we need to create a container for the field and option label and description text
      var containedByEl = document.createElement(fieldConfig.containedBy.elementType);

      if (containedByEl) {
        _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(containedByEl, fieldConfig.containedBy.elementClasses);
        containedByEl.setAttribute('id', formId + ".field." + fieldConfig.field.id + ".container");
        if (fieldConfig.containedBy.elementAttributes) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addAttributes(containerEl, fieldConfig.containedBy.elementAttributes); // do we have a label also?

        if (fieldConfig.label) {
          var labelEl = document.createElement('label');
          labelEl.setAttribute('for', formId + ".field." + fieldConfig.field.id);
          labelEl.innerHTML = fieldConfig.field.displayName;
          if (fieldConfig.label.attributes) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addAttributes(labelEl, fieldConfig.label.attributes);
          if (fieldConfig.label.classes) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(labelEl, fieldConfig.label.classes);
          containedByEl.appendChild(labelEl);
        }

        if (fieldConfig.describedBy) {
          var descEl = document.createElement(fieldConfig.describedBy.elementType);

          if (descEl) {
            // link the field and the description
            descEl.setAttribute('id', formId + ".field." + fieldConfig.field.id + ".desc");
            if (fieldConfig.field.description) descEl.innerHTML = fieldConfig.field.description;
            fieldElement.setAttribute('aria-describedby', formId + ".field." + fieldConfig.field.id + ".desc");
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
  };

  var _proto2 = FieldInputElementFactory.prototype;

  _proto2.createInputFormFieldComponentElement = function createInputFormFieldComponentElement(formId, containerEl, fieldConfig, listeners) {
    // return the input element
    var fieldElement = document.createElement('input');

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
  };

  _proto2.createTAFormFieldComponentElement = function createTAFormFieldComponentElement(formId, containerEl, fieldConfig, listeners) {
    // return the input element
    var fieldElement = document.createElement('textarea');

    if (fieldConfig.textarea) {
      fieldElement.setAttribute('rows', "" + fieldConfig.textarea.rows);
      fieldElement.setAttribute('cols', "" + fieldConfig.textarea.cols);
    }

    FieldInputElementFactory.initialiseFieldElementAndEventHandlers(fieldElement, formId, fieldConfig, listeners);
    FieldInputElementFactory.createFieldComponentsAndContainer(fieldElement, formId, containerEl, fieldConfig, listeners);
    return fieldElement;
  };

  FieldInputElementFactory.createSubElements = function createSubElements(formId, parentEl, fieldConfig, valueOptions) {
    var results = [];
    valueOptions.forEach(function (valueOption, index) {
      if (fieldConfig.subElement) {
        var containerEl = parentEl; // is there a container?

        if (fieldConfig.subElement.container) {
          containerEl = document.createElement(fieldConfig.subElement.container.elementType);
          _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(containerEl, fieldConfig.subElement.container.elementClasses);
          if (fieldConfig.subElement.container.elementAttributes) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addAttributes(containerEl, fieldConfig.subElement.container.elementAttributes);
          parentEl.appendChild(containerEl);
        }

        var valueEl = document.createElement(fieldConfig.subElement.element.elementType);
        valueEl.setAttribute('value', valueOption.value);
        valueEl.setAttribute('id', formId + ".field." + fieldConfig.field.id + "." + index);
        valueEl.setAttribute('name', formId + ".field." + fieldConfig.field.id);
        _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(valueEl, fieldConfig.subElement.element.elementClasses);
        if (fieldConfig.subElement.element.elementAttributes) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addAttributes(valueEl, fieldConfig.subElement.element.elementAttributes);
        containerEl.appendChild(valueEl);

        if (fieldConfig.subElement.label) {
          var labelEl = document.createElement('label');
          if (fieldConfig.subElement.label.classes) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(labelEl, fieldConfig.subElement.label.classes);
          if (fieldConfig.subElement.label.attributes) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addAttributes(labelEl, fieldConfig.subElement.label.attributes);
          labelEl.innerHTML = valueOption.name;
          containerEl.appendChild(labelEl);
        } else {
          valueEl.innerHTML = valueOption.name;
        }

        results.push(valueEl);
      }
    });
    return results;
  };

  _proto2.createSelectFormFieldComponentElement = function createSelectFormFieldComponentElement(formId, containerEl, fieldConfig, listeners) {
    // return the input element
    var fieldElement = document.createElement('select'); // create the options from the data source

    if (fieldConfig.datasource) {
      FieldInputElementFactory.createSubElements(formId, fieldElement, fieldConfig, fieldConfig.datasource.getOptions()); // listen for data source changes

      fieldConfig.datasource.addListener(new DefaultFieldOptionsListener(formId, fieldElement, fieldConfig));
    }

    FieldInputElementFactory.initialiseFieldElementAndEventHandlers(fieldElement, formId, fieldConfig, listeners);
    FieldInputElementFactory.createFieldComponentsAndContainer(fieldElement, formId, containerEl, fieldConfig, listeners);
    return fieldElement;
  };

  _proto2.createRadioGroupFormFieldComponentElement = function createRadioGroupFormFieldComponentElement(formId, containerEl, fieldConfig, listeners) {
    // create a div for each option in the source
    // create the div for the radio group
    var radioGroupElement = document.createElement('div');
    if (fieldConfig.elementAttributes) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addAttributes(radioGroupElement, fieldConfig.elementAttributes);
    if (fieldConfig.elementClasses) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(radioGroupElement, fieldConfig.elementClasses);
    var subElements = []; // create the options from the data source

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
  };

  return FieldInputElementFactory;
}();

/***/ }),

/***/ "./src/ui-framework/form/factory/FormElementFactory.ts":
/*!*************************************************************!*\
  !*** ./src/ui-framework/form/factory/FormElementFactory.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FormElementFactory": () => (/* binding */ FormElementFactory)
/* harmony export */ });
/* harmony import */ var _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../util/BrowserUtil */ "./src/util/BrowserUtil.ts");
/* harmony import */ var _FieldInputElementFactory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FieldInputElementFactory */ "./src/ui-framework/form/factory/FieldInputElementFactory.ts");
/* harmony import */ var _FormUITypeDefs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../FormUITypeDefs */ "./src/ui-framework/form/FormUITypeDefs.ts");
/* harmony import */ var _FormListener__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../FormListener */ "./src/ui-framework/form/FormListener.ts");




var FormElementFactory = /*#__PURE__*/function () {
  FormElementFactory.getInstance = function getInstance() {
    if (!FormElementFactory._instance) {
      FormElementFactory._instance = new FormElementFactory();
    }

    return FormElementFactory._instance;
  };

  function FormElementFactory() {}

  var _proto = FormElementFactory.prototype;

  _proto.createFormButton = function createFormButton(form, formConfig, formListeners, buttonDef, eventType) {
    var buttonEl = document.createElement('button');
    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(buttonEl, buttonDef.buttonClasses);
    buttonEl.setAttribute('id', formConfig.id + "." + eventType);

    if (buttonDef.buttonText) {
      buttonEl.innerText = buttonDef.buttonText;
    }

    if (buttonDef.iconClasses) {
      var iconEl = document.createElement('i');

      if (iconEl) {
        _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(iconEl, buttonDef.iconClasses);
        buttonEl.appendChild(iconEl);
      }
    }
    /* setup the event handler for the button */


    buttonEl.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();
      var formEvent = {
        target: form,
        formId: formConfig.id,
        eventType: eventType
      };
      formListeners.forEach(function (listener) {
        return listener.formChanged(formEvent);
      });
    });
    return buttonEl;
  };

  _proto.createFormElements = function createFormElements(form, formListeners, formConfig, fieldListeners) {
    var formEl = document.createElement('form');
    formEl.setAttribute('id', formConfig.id);
    formEl.setAttribute('name', formConfig.displayName);
    if (formConfig.classes) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(formEl, formConfig.classes); // create each of the fields and collect them

    var formInputElements = [];
    var formTAElements = [];
    var formRBGElements = [];
    var formSelectElements = [];
    formConfig.fieldGroups.forEach(function (group) {
      // if the group has a container make that, otherwise the form is the container
      var containerEl = formEl;

      if (group.containedBy) {
        // @ts-ignore
        containerEl = document.createElement(group.containedBy.elementType);

        if (containerEl) {
          if (group.containedBy.elementAttributes) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addAttributes(containerEl, group.containedBy.elementAttributes);
          if (group.containedBy.elementClasses) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(containerEl, group.containedBy.elementClasses);
          formEl.appendChild(containerEl);
        }
      }

      group.fields.forEach(function (field) {
        switch (field.elementType) {
          case _FormUITypeDefs__WEBPACK_IMPORTED_MODULE_2__.UIFieldType.textarea:
            {
              var fieldEl = _FieldInputElementFactory__WEBPACK_IMPORTED_MODULE_1__.FieldInputElementFactory.getInstance().createTAFormFieldComponentElement(formConfig.id, containerEl, field, fieldListeners);
              formTAElements.push(fieldEl);
              break;
            }

          case _FormUITypeDefs__WEBPACK_IMPORTED_MODULE_2__.UIFieldType.select:
            {
              var _fieldEl = _FieldInputElementFactory__WEBPACK_IMPORTED_MODULE_1__.FieldInputElementFactory.getInstance().createSelectFormFieldComponentElement(formConfig.id, containerEl, field, fieldListeners);

              formSelectElements.push(_fieldEl);
              break;
            }

          case _FormUITypeDefs__WEBPACK_IMPORTED_MODULE_2__.UIFieldType.radioGroup:
            {
              var _fieldEl2 = _FieldInputElementFactory__WEBPACK_IMPORTED_MODULE_1__.FieldInputElementFactory.getInstance().createRadioGroupFormFieldComponentElement(formConfig.id, containerEl, field, fieldListeners);

              formRBGElements.push(_fieldEl2);
              break;
            }

          default:
            {
              var _fieldEl3 = _FieldInputElementFactory__WEBPACK_IMPORTED_MODULE_1__.FieldInputElementFactory.getInstance().createInputFormFieldComponentElement(formConfig.id, containerEl, field, fieldListeners);

              formInputElements.push(_fieldEl3);
            }
        }
      });
    });
    /* setup the buttons */

    var buttonContainer = formEl;

    if (formConfig.buttonsContainedBy) {
      buttonContainer = document.createElement(formConfig.buttonsContainedBy.elementType);

      if (buttonContainer) {
        if (formConfig.buttonsContainedBy.elementAttributes) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addAttributes(buttonContainer, formConfig.buttonsContainedBy.elementAttributes);
        _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(buttonContainer, formConfig.buttonsContainedBy.elementClasses);
        formEl.appendChild(buttonContainer);
      } else {
        buttonContainer = formEl; // couldn't create the button container, use the form
      }
    }

    var deleteButtonEl = this.createFormButton(form, formConfig, formListeners, formConfig.deleteButton, _FormListener__WEBPACK_IMPORTED_MODULE_3__.FormEventType.DELETING);
    buttonContainer.appendChild(deleteButtonEl);
    var cancelButtonEl = this.createFormButton(form, formConfig, formListeners, formConfig.cancelButton, _FormListener__WEBPACK_IMPORTED_MODULE_3__.FormEventType.CANCELLING);
    buttonContainer.appendChild(cancelButtonEl);
    var submitButtonEl = this.createFormButton(form, formConfig, formListeners, formConfig.submitButton, _FormListener__WEBPACK_IMPORTED_MODULE_3__.FormEventType.SAVING);
    buttonContainer.appendChild(submitButtonEl);
    var result = {
      form: formEl,
      fields: formInputElements,
      selectFields: formSelectElements,
      radioButtonGroups: formRBGElements,
      textFields: formTAElements,
      deleteButton: deleteButtonEl,
      cancelButton: cancelButtonEl,
      submitButton: submitButtonEl
    };
    return result;
  };

  return FormElementFactory;
}();

/***/ }),

/***/ "./src/ui-framework/form/field/AbstractField.ts":
/*!******************************************************!*\
  !*** ./src/ui-framework/form/field/AbstractField.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbstractField": () => (/* binding */ AbstractField)
/* harmony export */ });
/* harmony import */ var _FormUITypeDefs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../FormUITypeDefs */ "./src/ui-framework/form/FormUITypeDefs.ts");
/* harmony import */ var _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../model/DataObjectTypeDefs */ "./src/model/DataObjectTypeDefs.ts");
/* harmony import */ var _event_handlers_ValidationEventHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../event-handlers/ValidationEventHandler */ "./src/ui-framework/form/event-handlers/ValidationEventHandler.ts");
/* harmony import */ var _event_handlers_RenderingEventListener__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../event-handlers/RenderingEventListener */ "./src/ui-framework/form/event-handlers/RenderingEventListener.ts");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_4__);





var logger = debug__WEBPACK_IMPORTED_MODULE_4___default()('abstract-field');
var AbstractField = /*#__PURE__*/function () {
  function AbstractField(formId, config, fieldDef, element, subElements) {
    var _this = this;

    if (subElements === void 0) {
      subElements = null;
    }

    this.config = null;
    this.subElements = [];
    this.listeners = [];
    this.hidden = false;
    this.formId = formId;
    this.config = config;
    this.definition = fieldDef;
    this.element = element;
    if (subElements) this.subElements = subElements;
    this.validationHandler = new _event_handlers_ValidationEventHandler__WEBPACK_IMPORTED_MODULE_2__.ValidationEventHandler(formId, config, [this], subElements);
    this.renderingHandler = new _event_handlers_RenderingEventListener__WEBPACK_IMPORTED_MODULE_3__.RenderingEventListener(formId, config, [this], subElements); // listen for our own change events

    this.handleChangeEvent = this.handleChangeEvent.bind(this);

    if (this.subElements) {
      this.subElements.forEach(function (subElement) {
        subElement.addEventListener('change', _this.handleChangeEvent);
      });
    } else {
      this.element.addEventListener('change', this.handleChangeEvent);
    }
  }

  var _proto = AbstractField.prototype;

  _proto.isHidden = function isHidden() {
    return this.hidden;
  };

  _proto.handleChangeEvent = function handleChangeEvent(event) {
    var _this2 = this;

    logger("Handling change event");

    if (this.config) {
      var value = this.getValue();
      logger("Handling change event - informing listeners");
      this.listeners.forEach(function (listener) {
        return listener.valueChanged(_this2.formId, _this2.definition, value);
      });
    }
  };

  _proto.addFieldListener = function addFieldListener(listener) {
    logger(this.getName() + " - adding listener " + listener.getName()); // don't duplicate listeners

    var index = this.listeners.findIndex(function (listenerInList) {
      return listenerInList.getName() === listener.getName();
    });

    if (index < 0) {
      this.listeners.push(listener);
    } else {
      logger(this.getName() + " - duplicate listener " + listener.getName() + " ignored");
    }
  };

  _proto.getFieldDefinition = function getFieldDefinition() {
    return this.definition;
  };

  _proto.setInvalid = function setInvalid(message) {
    var _this3 = this;

    this.validationHandler.setValidationStatusAndMessage(this.element, false, '', message, false); // @ts-ignore

    this.listeners.forEach(function (listener) {
      return listener.failedValidation(_this3.formId, _this3.definition, _this3.getValue(), message);
    });
  };

  _proto.initialise = function initialise() {};

  _proto.getValue = function getValue() {
    var _this4 = this;

    var result = null;

    if (this.config && this.element) {
      switch (this.config.elementType) {
        case _FormUITypeDefs__WEBPACK_IMPORTED_MODULE_0__.UIFieldType.radioGroup:
          {
            logger(this.definition.id + " - getting value - rbg");

            if (this.subElements) {
              this.subElements.forEach(function (subElement) {
                if (subElement.checked) {
                  logger(_this4.definition.id + " - getting value - rbg - checked " + subElement.value);
                  result = subElement.value;
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

    logger(this.definition.id + " - getting value - " + result);
    return result;
  };

  _proto.getFormattedValue = function getFormattedValue() {
    var result = null;

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
  };

  _proto.isValid = function isValid() {
    var result = true;

    if (this.config && this.element) {
      if (this.config.validator) {
        if (this.config.validator.validator) {
          var validator = this.config.validator.validator;
          var response = validator.isValidValue(this.definition, this.getValue());
          result = response.isValid;
        }
      }
    }

    return result;
  };

  _proto.getId = function getId() {
    return this.definition.id;
  };

  _proto.setValue = function setValue(newValue) {
    newValue = '' + newValue;

    if (this.element && this.config) {
      // @ts-ignore
      switch (this.config.elementType) {
        case _FormUITypeDefs__WEBPACK_IMPORTED_MODULE_0__.UIFieldType.radioGroup:
          {
            if (this.subElements) {
              this.subElements.forEach(function (subElement) {
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
            console.log(this.definition.id + " - setting value - " + newValue);
            var selectEl = this.element;
            var selectedIndex = -1;

            for (var index = 0; index < selectEl.options.length; index++) {
              // @ts-ignore
              var option = selectEl.options.item(index);
              console.log(this.definition.id + " - option value - " + option.value);

              if (option.value === newValue) {
                console.log(this.definition.id + " - option value - " + option.value + " - SELECTED");
                option.selected = true;
                selectedIndex = index;
              }
            }

            console.log(this.definition.id + " - selected index " + selectedIndex);
            selectEl.selectedIndex = selectedIndex;
            break;
          }

        default:
          {
            logger(this.definition.id + " - setting value - " + newValue); // @ts-ignore

            this.element.value = newValue;
            break;
          }
      }
    }
  };

  _proto.reset = function reset() {
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
            if (this.subElements) {
              this.subElements.forEach(function (subElement) {
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
  };

  _proto.clearValue = function clearValue() {
    this.reset();
  };

  _proto.validate = function validate() {
    if (this.element) {
      this.validationHandler.processValidation(this.element);
    }
  };

  _proto.render = function render(currentValue) {
    var _this$config;

    var result = currentValue;

    if ((_this$config = this.config) != null && _this$config.renderer) {
      var value = this.config.renderer.renderValue(this.definition, currentValue);
      if (value) result = value;
    }

    return result;
  };

  _proto.failedValidation = function failedValidation(formId, field, currentValue, message) {};

  _proto.valueChanged = function valueChanged(formId, field, newValue) {};

  _proto.getName = function getName() {
    return this.definition.displayName;
  };

  _proto.hide = function hide() {
    /*
      if we have an enclosing container (per the config) then we can hide
      otherwise we become readonly and disabled
     */
    if (this.config) {
      if (this.config.containedBy) {
        var parentEl = this.element.parentElement;

        if (parentEl) {
          parentEl.setAttribute('style', 'display:none');
        }
      } else {
        this.setReadOnly();
      }
    }

    this.hidden = true;
  };

  _proto.setValid = function setValid() {
    this.validationHandler.setValidationStatusAndMessage(this.element, true, '');
  };

  _proto.show = function show() {
    /*
      if we have an enclosing container (per the config) then we can hide
      otherwise we become readonly and disabled
     */
    if (this.config) {
      if (this.config.containedBy) {
        var parentEl = this.element.parentElement;

        if (parentEl) {
          parentEl.removeAttribute('style');
        }
      } else {
        this.clearReadOnly();
      }
    }

    this.hidden = true;
  };

  _proto.clearReadOnly = function clearReadOnly() {
    if (this.definition.displayOnly) return;
    this.element.removeAttribute('readonly');
    this.element.removeAttribute('disabled'); // do the same for subelements

    if (this.subElements) {
      this.subElements.forEach(function (subElement) {
        subElement.removeAttribute('readonly');
        subElement.removeAttribute('disabled');
      });
    }
  };

  _proto.setReadOnly = function setReadOnly() {
    this.element.setAttribute('readonly', 'true');
    this.element.setAttribute('disabled', 'true'); // do the same for subelements

    if (this.subElements) {
      this.subElements.forEach(function (subElement) {
        subElement.setAttribute('readonly', 'true');
        subElement.setAttribute('disabled', 'true');
      });
    }
  };

  return AbstractField;
}();

/***/ }),

/***/ "./src/ui-framework/form/field/InputField.ts":
/*!***************************************************!*\
  !*** ./src/ui-framework/form/field/InputField.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InputField": () => (/* binding */ InputField)
/* harmony export */ });
/* harmony import */ var _AbstractField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractField */ "./src/ui-framework/form/field/AbstractField.ts");
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}


var InputField = /*#__PURE__*/function (_AbstractField) {
  _inheritsLoose(InputField, _AbstractField);

  function InputField(formId, config, fieldDef, element) {
    return _AbstractField.call(this, formId, config, fieldDef, element) || this;
  }

  return InputField;
}(_AbstractField__WEBPACK_IMPORTED_MODULE_0__.AbstractField);

/***/ }),

/***/ "./src/ui-framework/form/field/RadioButtonGroupField.ts":
/*!**************************************************************!*\
  !*** ./src/ui-framework/form/field/RadioButtonGroupField.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RadioButtonGroupField": () => (/* binding */ RadioButtonGroupField)
/* harmony export */ });
/* harmony import */ var _AbstractField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractField */ "./src/ui-framework/form/field/AbstractField.ts");
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}


var RadioButtonGroupField = /*#__PURE__*/function (_AbstractField) {
  _inheritsLoose(RadioButtonGroupField, _AbstractField);

  function RadioButtonGroupField(formId, config, fieldDef, element, subElements) {
    return _AbstractField.call(this, formId, config, fieldDef, element, subElements) || this;
  }

  return RadioButtonGroupField;
}(_AbstractField__WEBPACK_IMPORTED_MODULE_0__.AbstractField);

/***/ }),

/***/ "./src/ui-framework/form/field/SelectField.ts":
/*!****************************************************!*\
  !*** ./src/ui-framework/form/field/SelectField.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SelectField": () => (/* binding */ SelectField)
/* harmony export */ });
/* harmony import */ var _AbstractField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractField */ "./src/ui-framework/form/field/AbstractField.ts");
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}


var SelectField = /*#__PURE__*/function (_AbstractField) {
  _inheritsLoose(SelectField, _AbstractField);

  function SelectField(formId, config, fieldDef, element) {
    return _AbstractField.call(this, formId, config, fieldDef, element) || this;
  }

  return SelectField;
}(_AbstractField__WEBPACK_IMPORTED_MODULE_0__.AbstractField);

/***/ }),

/***/ "./src/ui-framework/form/field/TextAreaField.ts":
/*!******************************************************!*\
  !*** ./src/ui-framework/form/field/TextAreaField.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TextAreaField": () => (/* binding */ TextAreaField)
/* harmony export */ });
/* harmony import */ var _AbstractField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractField */ "./src/ui-framework/form/field/AbstractField.ts");
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}


var TextAreaField = /*#__PURE__*/function (_AbstractField) {
  _inheritsLoose(TextAreaField, _AbstractField);

  function TextAreaField(formId, config, fieldDef, element) {
    return _AbstractField.call(this, formId, config, fieldDef, element) || this;
  }

  return TextAreaField;
}(_AbstractField__WEBPACK_IMPORTED_MODULE_0__.AbstractField);

/***/ }),

/***/ "./src/ui-framework/form/validation/ValidationManager.ts":
/*!***************************************************************!*\
  !*** ./src/ui-framework/form/validation/ValidationManager.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidationManager": () => (/* binding */ ValidationManager)
/* harmony export */ });
/* harmony import */ var _ValidationTypeDefs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ValidationTypeDefs */ "./src/ui-framework/form/validation/ValidationTypeDefs.ts");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../model/DataObjectTypeDefs */ "./src/model/DataObjectTypeDefs.ts");



var logger = debug__WEBPACK_IMPORTED_MODULE_1___default()('validation-manager');
var flogger = debug__WEBPACK_IMPORTED_MODULE_1___default()('validation-manager-rule-failure');
var ValidationManager = /*#__PURE__*/function () {
  ValidationManager.getInstance = function getInstance() {
    if (!ValidationManager._instance) {
      ValidationManager._instance = new ValidationManager();
    }

    return ValidationManager._instance;
  };

  function ValidationManager() {
    this.formRules = [];
  }

  var _proto = ValidationManager.prototype;

  _proto.getName = function getName() {
    return "Validation Manager";
  };

  _proto.addRuleToForm = function addRuleToForm(form, rule) {
    var _this = this; // returns whether the rule was added


    logger("Adding rule on form " + form.getId() + " for target field " + rule.targetDataFieldId);
    /*
     validate the rule
     1. does the rule have a comparison field or static for each condition?
     2. do the fields exist?
     3. are the comparisons valid types to compare?
    */

    var targetField = form.getFieldFromDataFieldId(rule.targetDataFieldId);

    if (!targetField) {
      flogger("Rule not added for form " + form.getId() + " for target field " + rule.targetDataFieldId + " - NOT FOUND in form");
      return false;
    }

    var convertedRule = {
      targetField: targetField,
      response: rule.response,
      fieldConditions: [],
      valueConditions: []
    };
    rule.conditions.forEach(function (condition) {
      // do we have one of values or source field?
      if (!condition.values && !condition.sourceDataFieldId) {
        flogger("Rule not added for form " + form.getId() + " for target field " + rule.targetDataFieldId + " - a condition is missing both values and source field");
        return false;
      } // is this a target field value comparison?


      if (condition.values && condition.sourceDataFieldId) {
        logger("Rule adding for form " + form.getId() + " for target field " + rule.targetDataFieldId + " - source field " + condition.sourceDataFieldId + " with values " + condition.values);
        var sourceField = form.getFieldFromDataFieldId(condition.sourceDataFieldId);

        if (!sourceField) {
          flogger("Rule not added for form " + form.getId() + " for target field " + rule.targetDataFieldId + " - source field " + condition.sourceDataFieldId + " NOT FOUND");
          return false;
        }

        convertedRule.fieldConditions.push({
          sourceField: sourceField,
          comparison: condition.comparison,
          values: condition.values
        });
        sourceField.addFieldListener(_this);
      } else if (condition.values) {
        // is this a value comparison?
        logger("Rule adding for form " + form.getId() + " for target field " + rule.targetDataFieldId + " - values " + condition.values); // add a new value rule to the internal structure

        convertedRule.valueConditions.push({
          values: condition.values,
          comparison: condition.comparison
        }); // @ts-ignore

        targetField.addFieldListener(_this);
      } else if (condition.sourceDataFieldId) {
        // is this a field vs field comparison
        logger("Rule adding for form " + form.getId() + " for target field " + rule.targetDataFieldId + " - source field " + condition.sourceDataFieldId);

        var _sourceField = form.getFieldFromDataFieldId(condition.sourceDataFieldId);

        if (!_sourceField) {
          flogger("Rule not added for form " + form.getId() + " for target field " + rule.targetDataFieldId + " - source field " + condition.sourceDataFieldId + " NOT FOUND");
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


        var sourceType = _sourceField.getFieldDefinition().type; // @ts-ignore


        var targetType = targetField.getFieldDefinition().type;

        switch (targetType) {
          case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.date:
          case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.datetime:
            {
              if (sourceType !== _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.datetime && sourceType !== _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.date) {
                flogger("Rule not added for form " + form.getId() + " for target field " + rule.targetDataFieldId + " - target is date(time), source is NOT");
                return false;
              }

              break;
            }

          case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.time:
          case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.shortTime:
            {
              if (sourceType !== _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.time && sourceType !== _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.shortTime) {
                flogger("Rule not added for form " + form.getId() + " for target field " + rule.targetDataFieldId + " - target is time, source is NOT");
                return false;
              }

              break;
            }

          case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.boolean:
            {
              if (sourceType !== _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.boolean) {
                flogger("Rule not added for form " + form.getId() + " for target field " + rule.targetDataFieldId + " - target is boolean, source is NOT");
                return false;
              }

              break;
            }

          case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.integer:
          case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.float:
            {
              if (sourceType !== _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.integer && sourceType !== _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.float) {
                flogger("Rule not added for form " + form.getId() + " for target field " + rule.targetDataFieldId + " - target is number, source is NOT");
                return false;
              }

              break;
            }
        }

        convertedRule.fieldConditions.push({
          sourceField: _sourceField,
          comparison: condition.comparison
        });

        _sourceField.addFieldListener(_this);
      }
    });
    logger("Converted rule to ");
    logger(convertedRule);
    var index = this.formRules.findIndex(function (formRule) {
      return formRule.form.getId() === form.getId();
    });
    var formRuleSet; // store the rules for later execution

    if (index < 0) {
      formRuleSet = {
        form: form,
        rules: [convertedRule]
      };
      this.formRules.push(formRuleSet);
    } else {
      formRuleSet = this.formRules[index];
      formRuleSet.rules.push(convertedRule);
    }

    logger("Current set of rules for form " + form.getId());
    logger(formRuleSet);
    return true;
  };

  _proto.areTwoFieldsEqual = function areTwoFieldsEqual(targetField, sourceField) {
    if (targetField.getValue() !== sourceField.getValue()) {
      return {
        ruleFailed: true,
        message: targetField.getName() + " must be equal to " + sourceField.getName()
      };
    }

    return {
      ruleFailed: false
    };
  };

  _proto.compareTwoValuesWithTypes = function compareTwoValuesWithTypes(targetType, targetValue, sourceType, sourceValue, comparison) {
    if (!targetValue || !sourceValue) return false; // no null comparisons

    switch (targetType) {
      case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.date:
        {
          targetValue += ' 00:00:00';

          if (sourceType === _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.date) {
            sourceValue += ' 00:00:00';
          }

          break;
        }

      case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.datetime:
        {
          if (sourceType === _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.date) {
            sourceValue += ' 00:00:00';
          }

          break;
        }

      case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.time:
        {
          if (sourceType === _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.shortTime) {
            sourceValue += ':00';
          }

          break;
        }

      case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.shortTime:
        {
          targetValue += ':00';

          if (sourceType === _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.shortTime) {
            sourceValue += ':00';
          }

          break;
        }
    }

    logger("Comparing " + targetValue + " of type " + targetType + " against " + sourceValue + " of type " + sourceType);

    switch (comparison) {
      case _ValidationTypeDefs__WEBPACK_IMPORTED_MODULE_0__.ComparisonType.lessThan:
        {
          return targetValue < sourceValue;
        }

      case _ValidationTypeDefs__WEBPACK_IMPORTED_MODULE_0__.ComparisonType.lessThanEqual:
        {
          return targetValue <= sourceValue;
        }

      case _ValidationTypeDefs__WEBPACK_IMPORTED_MODULE_0__.ComparisonType.greaterThanEqual:
        {
          return targetValue >= sourceValue;
        }

      case _ValidationTypeDefs__WEBPACK_IMPORTED_MODULE_0__.ComparisonType.greaterThan:
        {
          return targetValue > sourceValue;
        }

      case _ValidationTypeDefs__WEBPACK_IMPORTED_MODULE_0__.ComparisonType.equals:
        {
          return targetValue === sourceValue;
        }
    }

    return false;
  };

  _proto.isTargetLessThanSource = function isTargetLessThanSource(targetField, sourceField) {
    var sourceType = sourceField.getFieldDefinition().type;
    var targetType = targetField.getFieldDefinition().type;
    var sourceValue = sourceField.getValue();
    var targetValue = targetField.getValue();

    if (!this.compareTwoValuesWithTypes(targetType, targetValue, sourceType, sourceValue, _ValidationTypeDefs__WEBPACK_IMPORTED_MODULE_0__.ComparisonType.lessThan)) {
      return {
        ruleFailed: true,
        message: targetField.getName() + " must be less than " + sourceField.getName()
      };
    }

    return {
      ruleFailed: false
    };
  };

  _proto.isTargetLessThanEqualSource = function isTargetLessThanEqualSource(targetField, sourceField) {
    var check = this.areTwoFieldsEqual(targetField, sourceField);

    if (check.ruleFailed) {
      check = this.isTargetLessThanSource(targetField, sourceField);

      if (check.ruleFailed) {
        return {
          ruleFailed: true,
          message: targetField.getName() + " must be less than or equal to " + sourceField.getName()
        };
      }
    }

    return {
      ruleFailed: false
    };
  };

  _proto.isTargetGreaterThan = function isTargetGreaterThan(targetField, sourceField) {
    var sourceType = sourceField.getFieldDefinition().type;
    var targetType = targetField.getFieldDefinition().type;
    var sourceValue = sourceField.getValue();
    var targetValue = targetField.getValue();

    if (!this.compareTwoValuesWithTypes(targetType, targetValue, sourceType, sourceValue, _ValidationTypeDefs__WEBPACK_IMPORTED_MODULE_0__.ComparisonType.greaterThan)) {
      return {
        ruleFailed: true,
        message: targetField.getName() + " must be greater than " + sourceField.getName()
      };
    }

    return {
      ruleFailed: false
    };
  };

  _proto.isSourceNull = function isSourceNull(sourceField) {
    var targetValue = sourceField.getValue(); // @ts-ignore

    if (targetValue && targetValue.trim().length > 0) {
      return {
        ruleFailed: true,
        message: sourceField.getName() + " must be empty"
      };
    }

    return {
      ruleFailed: false
    };
  };

  _proto.isSourceNotNull = function isSourceNotNull(sourceField) {
    var targetValue = sourceField.getValue(); // @ts-ignore

    if (!targetValue || targetValue.trim().length > 0) {
      return {
        ruleFailed: true,
        message: sourceField.getName() + " must not be empty"
      };
    }

    return {
      ruleFailed: false
    };
  };

  _proto.doesFieldHaveValue = function doesFieldHaveValue(field, values) {
    var targetValue = field.getValue();
    logger("does field " + field.getId() + " have value from " + values + " - current value is " + field.getValue());

    if (targetValue) {
      // split the values by commas
      var splits = values.split(',');
      var foundInValue = false;
      splits.forEach(function (split) {
        if (targetValue === split) {
          logger("does field " + field.getId() + " have value from " + values + " - current value is " + field.getValue() + " - found in value(s)");
          foundInValue = true;
        }
      });

      if (foundInValue) {
        return {
          ruleFailed: false
        };
      }
    }

    return {
      ruleFailed: true,
      message: field.getName() + " must be have a value in " + values
    };
  };

  _proto.doesTargetFieldHaveValue = function doesTargetFieldHaveValue(field, values) {
    return this.doesFieldHaveValue(field, values);
  };

  _proto.doesSourceFieldHaveValue = function doesSourceFieldHaveValue(field, values) {
    return this.doesFieldHaveValue(field, values);
  };

  _proto.isTargetGreaterThanEqualSource = function isTargetGreaterThanEqualSource(targetField, sourceField) {
    var check = this.areTwoFieldsEqual(targetField, sourceField);

    if (check.ruleFailed) {
      check = this.isTargetGreaterThan(targetField, sourceField);

      if (check.ruleFailed) {
        return {
          ruleFailed: true,
          message: targetField.getName() + " must be greater than or equal to " + sourceField.getName()
        };
      }
    }

    return {
      ruleFailed: false
    };
  };

  _proto.compareFields = function compareFields(targetField, sourceField, comparison, value) {
    switch (comparison) {
      case _ValidationTypeDefs__WEBPACK_IMPORTED_MODULE_0__.ComparisonType.equals:
        {
          return this.areTwoFieldsEqual(targetField, sourceField);
          break;
        }

      case _ValidationTypeDefs__WEBPACK_IMPORTED_MODULE_0__.ComparisonType.lessThan:
        {
          return this.isTargetLessThanSource(targetField, sourceField);
          break;
        }

      case _ValidationTypeDefs__WEBPACK_IMPORTED_MODULE_0__.ComparisonType.lessThanEqual:
        {
          return this.isTargetLessThanEqualSource(targetField, sourceField);
          break;
        }

      case _ValidationTypeDefs__WEBPACK_IMPORTED_MODULE_0__.ComparisonType.greaterThan:
        {
          return this.isTargetGreaterThan(targetField, sourceField);
          break;
        }

      case _ValidationTypeDefs__WEBPACK_IMPORTED_MODULE_0__.ComparisonType.greaterThanEqual:
        {
          return this.isTargetGreaterThanEqualSource(targetField, sourceField);
          break;
        }

      case _ValidationTypeDefs__WEBPACK_IMPORTED_MODULE_0__.ComparisonType.isNull:
        {
          return this.isSourceNull(sourceField);
          break;
        }

      case _ValidationTypeDefs__WEBPACK_IMPORTED_MODULE_0__.ComparisonType.isNotNull:
        {
          return this.isSourceNotNull(sourceField);
          break;
        }

      case _ValidationTypeDefs__WEBPACK_IMPORTED_MODULE_0__.ComparisonType.hasValue:
        {
          return this.doesSourceFieldHaveValue(sourceField, value);
          break;
        }
    }
  };

  _proto.executeRule = function executeRule(rule) {
    var _this2 = this;

    var response = {
      field: rule.targetField,
      ruleFailed: false,
      response: rule.response
    }; // run each field comparison

    logger("Executing rule for target " + rule.targetField.getId());
    logger(rule);
    rule.fieldConditions.every(function (condition) {
      logger('field condition rule');
      logger(condition);
      var values = condition.values ? condition.values : '';

      var ruleCheck = _this2.compareFields(rule.targetField, condition.sourceField, condition.comparison, values);

      if (ruleCheck.ruleFailed) {
        flogger('field condition rule FAILED');
        response.ruleFailed = true;
        response.message = ruleCheck.message;
        return false;
      }

      logger('field condition rule PASSED');
      return true;
    }); // run each value comparison if we haven't already failed

    if (!response.ruleFailed) {
      rule.valueConditions.forEach(function (condition) {
        logger('value condition rule');
        logger(condition);

        var ruleCheck = _this2.compareFields(rule.targetField, rule.targetField, _ValidationTypeDefs__WEBPACK_IMPORTED_MODULE_0__.ComparisonType.hasValue, condition.values);

        if (ruleCheck.ruleFailed) {
          flogger('value condition rule FAILED');
          response.ruleFailed = true;
          response.message = ruleCheck.message;
          return false;
        }

        logger('value condition rule PASSED');
        return true;
      });
    }

    return response;
  };

  _proto.getRulesForFieldChange = function getRulesForFieldChange(formId, dataFieldId, includeSourceFields) {
    var rules = []; // lets go through the rules for the form

    logger("Finding rules for form " + formId + " and data field " + dataFieldId);
    var index = this.formRules.findIndex(function (formRule) {
      return formRule.form.getId() === formId;
    });

    if (index >= 0) {
      var ruleSet = this.formRules[index]; // the dataFieldId could be the target or one of the sources

      ruleSet.rules.forEach(function (rule) {
        if (rule.targetField.getId() === dataFieldId) {
          logger("Found rule where data field " + dataFieldId + " is target");

          if (rule.targetField.isValid()) {
            rules.push(rule);
          } else {
            flogger("Found rule where data field " + dataFieldId + " is target but value is not currently valid");
          }
        } else {
          if (includeSourceFields) {
            rule.fieldConditions.every(function (value) {
              if (value.sourceField.getId() === dataFieldId) {
                logger("Found rule where data field " + dataFieldId + " is source");

                if (value.sourceField.isValid()) {
                  rules.push(rule);
                } else {
                  flogger("Found rule where data field " + dataFieldId + " is source but value is not currently valid");
                }

                return false;
              }

              return true;
            });
          }
        }
      });
    }

    return rules;
  };

  _proto.failedValidation = function failedValidation(formId, field, currentValue, message) {} // ignored, we might be causing
  ;

  _proto.applyRulesToTargetField = function applyRulesToTargetField(formId, field, onlyRulesOfType) {
    var _this3 = this;

    logger("Checking invalidation only rules for form " + formId + ", data field " + field.id); // which rules apply?

    var rules = this.getRulesForFieldChange(formId, field.id, false);
    var result = {
      ruleFailed: false
    };
    rules.every(function (rule) {
      // we only want rules that make a field invalid
      if (onlyRulesOfType && rule.response === onlyRulesOfType || !onlyRulesOfType) {
        var response = _this3.executeRule(rule);

        if (response.ruleFailed) {
          flogger("Rule failed with message " + response.message);
          result.ruleFailed = true;
          result.message = response.message;
          return false;
        }
      }

      return true;
    });
    return result;
  };

  _proto.valueChanged = function valueChanged(formId, field, newValue) {
    var _this4 = this;

    logger("Handling field change - form " + formId + ", data field " + field.id + ", value " + newValue); // a field we are listening to has changed
    // which rules apply?

    var rules = this.getRulesForFieldChange(formId, field.id, true); // execute each rule and collect the responses

    var failedResponses = [];
    rules.forEach(function (rule) {
      var response = _this4.executeRule(rule);

      if (response.ruleFailed) {
        failedResponses.push(response);
      }
    });
    logger("Have " + failedResponses.length + " failed rules - applying each"); // for each failed response let the target field know based on the response type

    failedResponses.forEach(function (response) {
      switch (response.response) {
        case _ValidationTypeDefs__WEBPACK_IMPORTED_MODULE_0__.ConditionResponse.hide:
          {
            logger("Apply hide " + response.field.getId());
            response.field.hide();
            break;
          }

        case _ValidationTypeDefs__WEBPACK_IMPORTED_MODULE_0__.ConditionResponse.show:
          {
            logger("Apply show " + response.field.getId());
            response.field.show();
            break;
          }

        case _ValidationTypeDefs__WEBPACK_IMPORTED_MODULE_0__.ConditionResponse.invalid:
          {
            logger("Apply invalid " + response.field.getId());
            if (response.message) response.field.setInvalid(response.message);
            break;
          }

        case _ValidationTypeDefs__WEBPACK_IMPORTED_MODULE_0__.ConditionResponse.valid:
          {
            logger("Apply valid " + response.field.getId());
            response.field.setValid();
            break;
          }
      }
    });
  };

  return ValidationManager;
}();

/***/ }),

/***/ "./src/ui-framework/form/validation/ValidationTypeDefs.ts":
/*!****************************************************************!*\
  !*** ./src/ui-framework/form/validation/ValidationTypeDefs.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ComparisonType": () => (/* binding */ ComparisonType),
/* harmony export */   "ConditionResponse": () => (/* binding */ ConditionResponse)
/* harmony export */ });
var ComparisonType;

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

;
var ConditionResponse;

(function (ConditionResponse) {
  ConditionResponse[ConditionResponse["show"] = 0] = "show";
  ConditionResponse[ConditionResponse["hide"] = 1] = "hide";
  ConditionResponse[ConditionResponse["invalid"] = 2] = "invalid";
  ConditionResponse[ConditionResponse["valid"] = 3] = "valid";
})(ConditionResponse || (ConditionResponse = {}));

/***/ }),

/***/ "./src/ui-framework/helper/BasicFieldOperations.ts":
/*!*********************************************************!*\
  !*** ./src/ui-framework/helper/BasicFieldOperations.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BasicFieldOperations": () => (/* binding */ BasicFieldOperations)
/* harmony export */ });
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");
/* harmony import */ var _Controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Controller */ "./src/Controller.ts");
/* harmony import */ var _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../model/DataObjectTypeDefs */ "./src/model/DataObjectTypeDefs.ts");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../ConfigurationTypes */ "./src/ui-framework/ConfigurationTypes.ts");






var flogger = debug__WEBPACK_IMPORTED_MODULE_3___default()('basic-field-operations-formatter');
var vlogger = debug__WEBPACK_IMPORTED_MODULE_3___default()('basic-field-operations-validator');
var glogger = debug__WEBPACK_IMPORTED_MODULE_3___default()('basic-field-operations-generator');
var rlogger = debug__WEBPACK_IMPORTED_MODULE_3___default()('basic-field-operations-renderer');
var BasicFieldOperations = /*#__PURE__*/function () {
  function BasicFieldOperations() {
    this.previousFieldValues = [];
  }

  var _proto = BasicFieldOperations.prototype;

  _proto.setSubElements = function setSubElements(elements) {} // called when saving, change to final values
  ;

  _proto.formatValue = function formatValue(field, currentValue) {
    flogger("Handling format value for field " + field.displayName + " with value " + currentValue);
    var result = currentValue;

    switch (field.type) {
      // only need to change dates
      case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.date:
        {
          //convert to underlying number format
          result = moment__WEBPACK_IMPORTED_MODULE_0___default()(currentValue, 'DD/MM/YYYY').format('YYYYMMDD');
          break;
        }

      case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.datetime:
        {
          //convert to underlying number format
          result = moment__WEBPACK_IMPORTED_MODULE_0___default()(currentValue, 'DD/MM/YYYY HH:mm:ss').format('YYYYMMDDHHmmss');
          break;
        }

      case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.boolean:
        {
          result = currentValue.toLowerCase() === 'true';
          break;
        }

      case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.id:
        {
          if (field.idType === _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_4__.KeyType.number) {
            result = parseInt(currentValue);
          }

          break;
        }

      case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.float:
        {
          var parsed = parseFloat(currentValue);

          if (!isNaN(parsed)) {
            result = parsed;
          }

          break;
        }

      case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.integer:
        {
          var _parsed = parseFloat(currentValue);

          if (!isNaN(_parsed)) {
            result = _parsed;
          }

          break;
        }
    }

    flogger("Handling format value for field " + field.displayName + " with value " + currentValue + " - result is " + result);
    return result;
  };

  _proto.isValidValue = function isValidValue(field, currentValue) {
    vlogger("Handling is valid value for field " + field.displayName + " with value " + currentValue);
    var response = {
      isValid: true,
      resetOnFailure: false
    }; // basics first, is the field mandatory?

    if (field.mandatory) {
      // do we have any content?
      if (!currentValue || currentValue.trim().length === 0) {
        response.isValid = false;
        response.message = field.displayName + " is required. Please enter a valid value.";
        vlogger("Handling is valid value for field " + field.displayName + " with value " + currentValue + " - is valid is " + response.isValid + " with message " + response.message);
        return response;
      } // boolean is a special case, and must be true


      if (field.type === _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.boolean) {
        if (currentValue.trim().toLowerCase() !== 'true') {
          response.isValid = false;
          response.message = field.displayName + " is required and must be selected.";
          vlogger("Handling is valid value for field " + field.displayName + " with value " + currentValue + " - is valid is " + response.isValid + " with message " + response.message);
          return response;
        }
      }
    } // ok, so we have some content, we need to check if the value is a valid format with regular expressions


    if (currentValue) {
      switch (field.type) {
        case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.datetime:
          {
            response.isValid = BasicFieldOperations.dateTimeRegex.test(currentValue);

            if (!response.isValid) {
              response.message = field.displayName + " must be DD/MM/YYYY hh:mm";
            }

            break;
          }

        case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.date:
          {
            response.isValid = BasicFieldOperations.dateRegex.test(currentValue);

            if (!response.isValid) {
              response.message = field.displayName + " must be DD/MM/YYYY";
            }

            break;
          }

        case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.float:
          {
            response.isValid = BasicFieldOperations.floatRegexp.test(currentValue);

            if (!response.isValid) {
              response.message = field.displayName + " must be 00.00";
            }

            break;
          }

        case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.id:
          {
            response.isValid = BasicFieldOperations.integerRegex.test(currentValue);

            if (!response.isValid) {
              response.message = field.displayName + " must be an integer";
            }

            break;
          }

        case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.email:
          {
            response.isValid = BasicFieldOperations.emailRegex.test(currentValue);

            if (!response.isValid) {
              response.message = field.displayName + " must be an email address";
            }

            break;
          }

        case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.integer:
          {
            response.isValid = BasicFieldOperations.integerRegex.test(currentValue);

            if (!response.isValid) {
              response.message = field.displayName + " must be an integer";
            }

            break;
          }

        case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.text:
          {
            break;
          }

        case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.password:
          {
            response.isValid = BasicFieldOperations.basicPasswordRegex.test(currentValue);

            if (!response.isValid) {
              response.message = field.displayName + " must be 8 to 15 letters and digits only";
            }

            break;
          }

        case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.time:
          {
            response.isValid = BasicFieldOperations.timeRegex.test(currentValue);

            if (!response.isValid) {
              response.message = field.displayName + " must be 24 hour time format HH:MM:SS";
            }

            break;
          }

        case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.shortTime:
          {
            response.isValid = BasicFieldOperations.shortTimeRegex.test(currentValue);

            if (!response.isValid) {
              response.message = field.displayName + " must be 24 hour time format HH:MM";
            }

            break;
          }

        case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.boolean:
          {
            response.isValid = BasicFieldOperations.booleanRegexp.test(currentValue);

            if (!response.isValid) {
              response.message = field.displayName + " must be true or false";
            }

            break;
          }
      }
    }

    vlogger("Handling is valid value for field " + field.displayName + " with value " + currentValue + " - is valid is " + response.isValid + " with message " + response.message);
    return response;
  };

  _proto.setPreviousValue = function setPreviousValue(field, newValue) {
    rlogger("Storing previous value for field " + field.displayName + " with  new value " + newValue);
    var fieldValue;
    var index = this.previousFieldValues.findIndex(function (fieldValue) {
      return fieldValue.id === field.id;
    });

    if (index >= 0) {
      //we have a previous value
      fieldValue = this.previousFieldValues[index];
      rlogger("Storing previous value for field " + field.displayName + " with new value " + newValue + " - old value was " + fieldValue);
      fieldValue.value = newValue;
    } else {
      // create a new record of the value
      fieldValue = {
        id: field.id,
        value: newValue
      };
      rlogger("Storing previous value for field " + field.displayName + " with new value " + newValue + " - NO previous");
      this.previousFieldValues.push(fieldValue);
    }
  };

  _proto.renderValue = function renderValue(field, currentValue) {
    rlogger("Rendering value for field " + field.displayName + " with new value " + currentValue); // ensure we don't end up in an endless loop
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
      var newValue = currentValue;

      switch (field.type) {
        case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.date:
          {
            newValue = moment__WEBPACK_IMPORTED_MODULE_0___default()(currentValue, 'YYYYMMDD').format('DD/MM/YYYY');
            break;
          }

        case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.datetime:
          {
            newValue = moment__WEBPACK_IMPORTED_MODULE_0___default()(currentValue, 'YYYYMMDDHHmmss').format('DD/MM/YYYY HH:mm:ss');
            break;
          }
      } // store the previous value


      this.setPreviousValue(field, newValue);
      rlogger("Rendering value for field " + field.displayName + " with new value " + currentValue + " - rendered to " + newValue);
      return newValue;
    } else {
      // empty value, no rendering required
      rlogger("Rendering value for field " + field.displayName + " with new value is empty - no rendering required");
      return null;
    }
  };

  _proto.generateValue = function generateValue(field) {
    var result = '';

    switch (field.type) {
      case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.datetime:
        {
          result = moment__WEBPACK_IMPORTED_MODULE_0___default()().format('YYYYMMDDHHmmss');
          break;
        }

      case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.date:
        {
          result = moment__WEBPACK_IMPORTED_MODULE_0___default()().format('YYYYMMDD');
          break;
        }

      case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.float:
        {
          result = '0.0';
          break;
        }

      case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.id:
        {
          result = '-1';
          break;
        }

      case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.email:
        {
          result = 'me@me.com';
          break;
        }

      case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.integer:
        {
          result = '0';
          break;
        }

      case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.text:
        {
          result = '';
          break;
        }

      case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.password:
        {
          result = '';
          break;
        }

      case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.time:
        {
          result = '00:00:00';
          break;
        }

      case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.shortTime:
        {
          result = '00:00';
          break;
        }

      case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.boolean:
        {
          result = 'false';
          break;
        }

      case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.uuid:
        {
          result = (0,uuid__WEBPACK_IMPORTED_MODULE_5__["default"])();
          break;
        }

      case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.userId:
        {
          result = "" + _Controller__WEBPACK_IMPORTED_MODULE_1__["default"].getInstance().getLoggedInUsername();
          break;
        }
    }

    return result;
  };

  _proto.generate = function generate(field, isCreate) {
    var result = ''; // are we generating the field?

    if (field.generator) {
      // are we only generating on create
      if (field.generator.onCreation && isCreate) {
        result = this.generateValue(field);
        glogger("Generating value for field " + field.displayName + " with on creation " + result);
      } // or if we are modifying and should also be modifying the value


      if (field.generator.onModify && !isCreate) {
        result = this.generateValue(field);
        glogger("Generating value for field " + field.displayName + " with on modify " + result);
      }
    }

    return result;
  };

  return BasicFieldOperations;
}();
BasicFieldOperations.dateRegex = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
BasicFieldOperations.emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/;
BasicFieldOperations.shortTimeRegex = /^([01]\d|2[0-3]):?([0-5]\d)$/;
BasicFieldOperations.timeRegex = /^([01]\d|2[0-3]):?([0-5]\d):?([0-5]\d)$/;
BasicFieldOperations.dateTimeRegex = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}\s([01]\d|2[0-3]):?([0-5]\d):?([0-5]\d)$/;
BasicFieldOperations.basicPasswordRegex = /^[a-zA-Z0-9]{8,15}$/;
BasicFieldOperations.integerRegex = /^[+-]?\d+$/;
BasicFieldOperations.floatRegexp = /^[+-]?\d+(\.\d+)?$/;
BasicFieldOperations.booleanRegexp = /^true|false$/;

/***/ }),

/***/ "./src/ui-framework/helper/BootstrapFormConfigHelper.ts":
/*!**************************************************************!*\
  !*** ./src/ui-framework/helper/BootstrapFormConfigHelper.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BootstrapFormConfigHelper": () => (/* binding */ BootstrapFormConfigHelper)
/* harmony export */ });
/* harmony import */ var _BasicFieldOperations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BasicFieldOperations */ "./src/ui-framework/helper/BasicFieldOperations.ts");
/* harmony import */ var _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../model/DataObjectTypeDefs */ "./src/model/DataObjectTypeDefs.ts");
/* harmony import */ var _form_FormUITypeDefs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../form/FormUITypeDefs */ "./src/ui-framework/form/FormUITypeDefs.ts");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _RBGFieldOperations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./RBGFieldOperations */ "./src/ui-framework/helper/RBGFieldOperations.ts");
/* harmony import */ var _model_BasicObjectDefinitionFactory__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../model/BasicObjectDefinitionFactory */ "./src/model/BasicObjectDefinitionFactory.ts");






var logger = debug__WEBPACK_IMPORTED_MODULE_3___default()('bootstrap-form-config-helper');
var BootstrapFormConfigHelper = /*#__PURE__*/function () {
  BootstrapFormConfigHelper.getInstance = function getInstance() {
    if (!BootstrapFormConfigHelper._instance) {
      BootstrapFormConfigHelper._instance = new BootstrapFormConfigHelper();
    }

    return BootstrapFormConfigHelper._instance;
  };

  function BootstrapFormConfigHelper() {}

  var _proto = BootstrapFormConfigHelper.prototype;

  _proto.generateFormConfig = function generateFormConfig(dataObjDef, hideModifierFields) {
    if (hideModifierFields === void 0) {
      hideModifierFields = false;
    }

    var fieldOperations = new _BasicFieldOperations__WEBPACK_IMPORTED_MODULE_0__.BasicFieldOperations();
    var rbgFieldOperation = new _RBGFieldOperations__WEBPACK_IMPORTED_MODULE_4__.RBGFieldOperations(); // create the Field UI config for each field

    var fieldUIConfigs = [];
    dataObjDef.fields.forEach(function (fieldDef) {
      var fieldType = _form_FormUITypeDefs__WEBPACK_IMPORTED_MODULE_2__.UIFieldType.text;

      switch (fieldDef.type) {
        case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.time:
        case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.text:
        case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.date:
        case _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.shortTime:
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
      } // construct the field ui config


      var fieldUIConfig = {
        field: fieldDef,
        elementType: fieldType,
        elementClasses: 'form-control col-sm-9',
        renderer: fieldOperations,
        formatter: fieldOperations
      };

      if (fieldDef.type !== _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.id && fieldDef.type !== _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.uuid) {
        // no labels, descriptions, container for id,uuid
        fieldUIConfig.containedBy = {
          elementType: 'div',
          elementClasses: 'form-group row'
        };
        fieldUIConfig.label = {
          label: fieldDef.displayName,
          classes: 'col-sm-3 col-form-label'
        };

        if (fieldDef.description) {
          // descriptions if the field has one
          fieldUIConfig.describedBy = {
            message: fieldDef.description,
            elementType: 'small',
            elementClasses: 'text-muted col-sm-9 offset-sm-3 mt-1'
          };
        }

        if (!fieldDef.displayOnly) {
          // no validator for readonly items
          fieldUIConfig.validator = {
            validator: fieldOperations,
            messageDisplay: {
              elementType: 'div',
              elementClasses: 'invalid-feedback col-sm-9 offset-sm-3'
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
            elementType: 'option',
            elementClasses: ''
          }
        };
        fieldUIConfig.datasource = fieldDef.dataSource;
      } // radio button group


      if (fieldDef.type === _model_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.limitedChoice) {
        fieldUIConfig.subElement = {
          element: {
            elementType: 'input',
            elementClasses: 'form-check-input',
            elementAttributes: [{
              name: 'type',
              value: 'radio'
            }]
          },
          container: {
            elementType: 'div',
            elementClasses: 'form-check form-check-inline'
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

      fieldUIConfigs.push(fieldUIConfig);
    }); // create a form with a single group and button container with Bootstrap styles

    var fieldGroup = {
      containedBy: {
        elementType: 'div',
        elementClasses: 'col-sm-12'
      },
      fields: fieldUIConfigs
    };
    var formConfig = {
      id: dataObjDef.id,
      displayName: dataObjDef.displayName,
      fieldGroups: [fieldGroup],
      buttonsContainedBy: {
        elementType: 'div',
        elementClasses: 'd-flex w-100 justify-space-between'
      },
      deleteButton: {
        buttonText: 'Delete  ',
        buttonClasses: 'btn-warning rounded p-1 mr-2 mt-2 w-100',
        iconClasses: 'fas fa-trash-alt'
      },
      cancelButton: {
        buttonText: 'Cancel  ',
        buttonClasses: 'btn-info rounded p-1 mr-2 mt-2 w-100',
        iconClasses: 'fas fa-ban'
      },
      submitButton: {
        buttonText: 'Save  ',
        buttonClasses: 'btn-primary rounded p-1 mt-2 w-100',
        iconClasses: 'fas fa-save'
      }
    };
    logger(formConfig);
    return formConfig;
  };

  return BootstrapFormConfigHelper;
}();

/***/ }),

/***/ "./src/ui-framework/helper/RBGFieldOperations.ts":
/*!*******************************************************!*\
  !*** ./src/ui-framework/helper/RBGFieldOperations.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RBGFieldOperations": () => (/* binding */ RBGFieldOperations)
/* harmony export */ });
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ConfigurationTypes */ "./src/ui-framework/ConfigurationTypes.ts");


var flogger = debug__WEBPACK_IMPORTED_MODULE_0___default()('basic-field-operations-formatter');
var vlogger = debug__WEBPACK_IMPORTED_MODULE_0___default()('basic-field-operations-validator');
var glogger = debug__WEBPACK_IMPORTED_MODULE_0___default()('basic-field-operations-generator');
var rlogger = debug__WEBPACK_IMPORTED_MODULE_0___default()('basic-field-operations-renderer');
var RBGFieldOperations = /*#__PURE__*/function () {
  function RBGFieldOperations() {
    this.radioButtons = [];
  } // called when saving, change to final values


  var _proto = RBGFieldOperations.prototype;

  _proto.formatValue = function formatValue(field, currentValue) {
    flogger("Handling format value for RBG " + field.displayName + " with value " + currentValue);
    var result = currentValue; // find the current selected radio button

    this.radioButtons.forEach(function (radioButton) {
      if (radioButton.checked) {
        result = radioButton.value;

        if (field.idType === _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.KeyType.number) {
          result = parseInt(result);
        }
      }
    });
    flogger("Handling format value for field " + field.displayName + " with value " + currentValue + " - result is " + result);
    return result;
  };

  _proto.isValidValue = function isValidValue(field, currentValue) {
    vlogger("Handling is valid value for field " + field.displayName + " with value " + currentValue);
    var response = {
      isValid: false,
      resetOnFailure: false
    }; // basics first, is the field mandatory?

    if (field.mandatory) {
      this.radioButtons.forEach(function (radioButton) {
        if (radioButton.checked) {
          response.isValid = true;
        }
      });

      if (!response.isValid) {
        response.message = field.displayName + " is required. Please select one of the values.";
        vlogger("Handling is valid value for field " + field.displayName + " with value " + currentValue + " - is valid is " + response.isValid + " with message " + response.message);
        return response;
      }
    } else {
      response.isValid = true;
    } // ok, so we have some content, we need to check if the value is a valid format with regular expressions


    vlogger("Handling is valid value for field " + field.displayName + " with value " + currentValue + " - is valid is " + response.isValid + " with message " + response.message);
    return response;
  };

  _proto.renderValue = function renderValue(field, currentValue) {
    rlogger("Rendering value for field " + field.displayName + " with new value " + currentValue);
    this.radioButtons.forEach(function (radioButton) {
      if (radioButton.value === currentValue) radioButton.checked = true;
    });
    return null;
  };

  _proto.generate = function generate(field, isCreate) {
    return '';
  };

  _proto.setSubElements = function setSubElements(elements) {
    this.radioButtons = elements;
  };

  return RBGFieldOperations;
}();

/***/ }),

/***/ "./src/ui-framework/helper/SimpleValueDataSource.ts":
/*!**********************************************************!*\
  !*** ./src/ui-framework/helper/SimpleValueDataSource.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SimpleValueDataSource": () => (/* binding */ SimpleValueDataSource)
/* harmony export */ });
var SimpleValueDataSource = /*#__PURE__*/function () {
  // static value list
  function SimpleValueDataSource(options) {
    this.options = options;
    this.listeners = [];
  }

  var _proto = SimpleValueDataSource.prototype;

  _proto.addValueOption = function addValueOption(name, value) {
    var _this = this;

    this.options.push({
      name: name,
      value: value
    });
    this.listeners.forEach(function (listener) {
      return listener.optionsChanged(_this.options);
    });
  };

  _proto.addListener = function addListener(listener) {
    this.listeners.push(listener);
  };

  _proto.getOptions = function getOptions() {
    return this.options;
  };

  return SimpleValueDataSource;
}();

/***/ }),

/***/ "./src/ui-framework/view/delegate/CollectionViewListenerForwarder.ts":
/*!***************************************************************************!*\
  !*** ./src/ui-framework/view/delegate/CollectionViewListenerForwarder.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CollectionViewListenerForwarder": () => (/* binding */ CollectionViewListenerForwarder)
/* harmony export */ });
/* harmony import */ var _ViewListenerForwarder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ViewListenerForwarder */ "./src/ui-framework/view/delegate/ViewListenerForwarder.ts");
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}


var CollectionViewListenerForwarder = /*#__PURE__*/function (_ViewListenerForwarde) {
  _inheritsLoose(CollectionViewListenerForwarder, _ViewListenerForwarde);

  function CollectionViewListenerForwarder() {
    var _this;

    _this = _ViewListenerForwarde.call(this) || this;
    _this.collectionViewListeners = [];
    return _this;
  }

  var _proto = CollectionViewListenerForwarder.prototype;

  _proto.addListener = function addListener(listener) {
    _ViewListenerForwarde.prototype.addListener.call(this, listener);

    this.collectionViewListeners.push(listener);
  };

  _proto.itemDragStarted = function itemDragStarted(view, selectedItem) {
    if (!this.suppressEventEmits) {
      this.collectionViewListeners.forEach(function (listener) {
        return listener.itemDragStarted(view, selectedItem);
      });
    }
  };

  _proto.itemSelected = function itemSelected(view, selectedItem) {
    if (!this.suppressEventEmits) {
      this.collectionViewListeners.forEach(function (listener) {
        return listener.itemSelected(view, selectedItem);
      });
    }
  };

  _proto.itemDeselected = function itemDeselected(view, deselectedItem) {
    if (!this.suppressEventEmits) {
      this.collectionViewListeners.forEach(function (listener) {
        return listener.itemDeselected(view, deselectedItem);
      });
    }
  };

  _proto.canSelectItem = function canSelectItem(view, selectedItem) {
    var result = true; // return false if cancelling delete

    if (!this.suppressEventEmits) {
      this.collectionViewListeners.forEach(function (listener) {
        console.log(listener);

        if (!listener.canSelectItem(view, selectedItem)) {
          result = false;
        }
      });
    }

    return result;
  };

  return CollectionViewListenerForwarder;
}(_ViewListenerForwarder__WEBPACK_IMPORTED_MODULE_0__.ViewListenerForwarder);

/***/ }),

/***/ "./src/ui-framework/view/delegate/DetailViewListenerForwarder.ts":
/*!***********************************************************************!*\
  !*** ./src/ui-framework/view/delegate/DetailViewListenerForwarder.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DetailViewListenerForwarder": () => (/* binding */ DetailViewListenerForwarder)
/* harmony export */ });
/* harmony import */ var _ViewListenerForwarder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ViewListenerForwarder */ "./src/ui-framework/view/delegate/ViewListenerForwarder.ts");
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}


var DetailViewListenerForwarder = /*#__PURE__*/function (_ViewListenerForwarde) {
  _inheritsLoose(DetailViewListenerForwarder, _ViewListenerForwarde);

  function DetailViewListenerForwarder() {
    var _this;

    _this = _ViewListenerForwarde.call(this) || this;
    _this.detailViewListeners = [];
    return _this;
  }

  var _proto = DetailViewListenerForwarder.prototype;

  _proto.addListener = function addListener(listener) {
    _ViewListenerForwarde.prototype.addListener.call(this, listener);

    this.detailViewListeners.push(listener);
  };

  _proto.saveNewItem = function saveNewItem(view, dataObj) {
    if (!this.suppressEventEmits) {
      this.detailViewListeners.forEach(function (listener) {
        return listener.saveNewItem(view, dataObj);
      });
    }
  };

  _proto.updateItem = function updateItem(view, dataObj) {
    if (!this.suppressEventEmits) {
      this.detailViewListeners.forEach(function (listener) {
        return listener.updateItem(view, dataObj);
      });
    }
  };

  _proto.deletedItem = function deletedItem(view, dataObj) {
    if (!this.suppressEventEmits) {
      this.detailViewListeners.forEach(function (listener) {
        return listener.deletedItem(view, dataObj);
      });
    }
  };

  _proto.cancelled = function cancelled(view, dataObj) {
    if (!this.suppressEventEmits) {
      this.detailViewListeners.forEach(function (listener) {
        return listener.cancelled(view, dataObj);
      });
    }
  };

  return DetailViewListenerForwarder;
}(_ViewListenerForwarder__WEBPACK_IMPORTED_MODULE_0__.ViewListenerForwarder);

/***/ }),

/***/ "./src/ui-framework/view/delegate/FormDetailViewRenderer.ts":
/*!******************************************************************!*\
  !*** ./src/ui-framework/view/delegate/FormDetailViewRenderer.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FormDetailViewRenderer": () => (/* binding */ FormDetailViewRenderer)
/* harmony export */ });
/* harmony import */ var _form_BasicFormImplementation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../form/BasicFormImplementation */ "./src/ui-framework/form/BasicFormImplementation.ts");
/* harmony import */ var _form_FormListener__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../form/FormListener */ "./src/ui-framework/form/FormListener.ts");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_2__);



var logger = debug__WEBPACK_IMPORTED_MODULE_2___default()('form-detail-view-renderer');
var FormDetailViewRenderer = /*#__PURE__*/function () {
  function FormDetailViewRenderer(containerId, objDef) {
    this.form = null;
    this.containerId = containerId;
    this.objDef = objDef;
    this.currentItem = {};
    this.isNewItem = false;
    this.forwarder = null;
    this.view = null;
  }

  var _proto = FormDetailViewRenderer.prototype;

  _proto.setEventForwarder = function setEventForwarder(forwarder) {
    this.forwarder = forwarder;
  };

  _proto.setView = function setView(view) {
    this.view = view;
  };

  _proto.onDocumentLoaded = function onDocumentLoaded() {
    this.form = new _form_BasicFormImplementation__WEBPACK_IMPORTED_MODULE_0__.BasicFormImplementation(this.containerId, this.objDef);
    this.form.addFormListener(this);
    this.initialise();
  };

  _proto.reset = function reset() {
    if (this.form) this.form.reset();
  };

  _proto.initialise = function initialise() {
    if (this.form) this.form.initialise();
  };

  _proto.displayItemReadonly = function displayItemReadonly(dataObject) {
    this.isNewItem = false;
    if (this.form) this.form.displayOnly(dataObject);
  };

  _proto.getName = function getName() {
    return this.objDef.displayName;
  };

  _proto.setContainedBy = function setContainedBy(container) {
    throw new Error("Method not implemented.");
  };

  _proto.addEventListener = function addEventListener(listener) {
    throw new Error("Method not implemented.");
  };

  _proto.hasChanged = function hasChanged() {
    var result = false;
    if (this.form) result = this.form.hasChanged();
    return result;
  };

  _proto.getUIConfig = function getUIConfig() {
    throw new Error("Method not implemented.");
  };

  _proto.getDataSourceKeyId = function getDataSourceKeyId() {
    throw new Error("Method not implemented.");
  };

  _proto.clearDisplay = function clearDisplay() {
    this.isNewItem = false;
    if (this.form) this.form.reset();
  };

  _proto.clearReadOnly = function clearReadOnly() {
    if (this.form) this.form.clearReadOnly();
  };

  _proto.setReadOnly = function setReadOnly() {
    if (this.form) this.form.setReadOnly();
  };

  _proto.isReadOnly = function isReadOnly() {
    var result = false;
    if (this.form) result = this.form.isReadOnly();
    return result;
  };

  _proto.createItem = function createItem() {
    this.currentItem = {};

    if (this.form) {
      this.isNewItem = true;
      this.currentItem = this.form.startCreateNew();
    }
  };

  _proto.displayItem = function displayItem(dataObj) {
    this.currentItem = dataObj;
    this.isNewItem = false;

    if (this.hasPermissionToUpdateCurrentItem()) {
      if (this.form) this.form.startUpdate(dataObj);
    } else {
      if (this.form) this.form.displayOnly(dataObj);
    }
  };

  _proto.hidden = function hidden() {
    if (this.form) this.form.setIsVisible(false);
  };

  _proto.show = function show() {
    if (this.form) this.form.setIsVisible(true);
  };

  _proto.render = function render() {
    this.displayItem(this.currentItem);
    this.show();
  };

  _proto.hasPermissionToDeleteCurrentItem = function hasPermissionToDeleteCurrentItem() {
    return true;
  };

  _proto.hasPermissionToUpdateCurrentItem = function hasPermissionToUpdateCurrentItem() {
    return true;
  };

  _proto.getForm = function getForm() {
    return this.form;
  };

  _proto.handleActionItem = function handleActionItem(actionName, selectedItem) {
    throw new Error("Handle action item not implemented for " + actionName);
  };

  _proto.isDisplayingItem = function isDisplayingItem(dataObj) {
    var result = false;

    if (this.currentItem) {
      if (this.form) {
        result = this.form.isDisplayingItem(dataObj);
      }
    }

    return result;
  };

  _proto.formChanged = function formChanged(event, formValues) {
    // catch form events for user leaving the form
    switch (event.eventType) {
      case _form_FormListener__WEBPACK_IMPORTED_MODULE_1__.FormEventType.CANCELLING:
        {
          logger("Form is cancelling");
          break;
        }

      case _form_FormListener__WEBPACK_IMPORTED_MODULE_1__.FormEventType.CANCELLING_ABORTED:
        {
          logger("Form is cancelling - aborted");
          break;
        }

      case _form_FormListener__WEBPACK_IMPORTED_MODULE_1__.FormEventType.CANCELLED:
        {
          logger("Form is cancelled - resetting");
          if (this.forwarder && this.view) this.forwarder.cancelled(this.view, this.currentItem);
          break;
        }

      case _form_FormListener__WEBPACK_IMPORTED_MODULE_1__.FormEventType.DELETING:
        {
          logger("Form is deleting");
          break;
        }

      case _form_FormListener__WEBPACK_IMPORTED_MODULE_1__.FormEventType.DELETE_ABORTED:
        {
          logger("Form is deleting - aborted");
          break;
        }

      case _form_FormListener__WEBPACK_IMPORTED_MODULE_1__.FormEventType.DELETED:
        {
          logger("Form is deleted - resetting");
          if (this.forwarder && this.view) this.forwarder.deletedItem(this.view, this.currentItem); // user is deleting the object, will become invisible

          break;
        }

      case _form_FormListener__WEBPACK_IMPORTED_MODULE_1__.FormEventType.SAVE_ABORTED:
        {
          logger("Form save cancelled");
          break;
        }

      case _form_FormListener__WEBPACK_IMPORTED_MODULE_1__.FormEventType.SAVED:
        {
          logger("Form is saved with data");

          if (this.form) {
            var _this$form;

            var formattedObj = (_this$form = this.form) == null ? void 0 : _this$form.getFormattedDataObject();

            if (this.isNewItem) {
              if (this.forwarder && this.view) this.forwarder.saveNewItem(this.view, this.currentItem);
            } else {
              if (this.forwarder && this.view) this.forwarder.updateItem(this.view, this.currentItem);
            }

            this.isNewItem = false;
          }

          break;
        }

      case _form_FormListener__WEBPACK_IMPORTED_MODULE_1__.FormEventType.SAVING:
        {
          logger("Form is saving");
          break;
        }
    }

    return false;
  };

  return FormDetailViewRenderer;
}();

/***/ }),

/***/ "./src/ui-framework/view/delegate/ListViewRenderer.ts":
/*!************************************************************!*\
  !*** ./src/ui-framework/view/delegate/ListViewRenderer.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ListViewRenderer": () => (/* binding */ ListViewRenderer)
/* harmony export */ });
/* harmony import */ var _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../util/BrowserUtil */ "./src/util/BrowserUtil.ts");
/* harmony import */ var _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../ConfigurationTypes */ "./src/ui-framework/ConfigurationTypes.ts");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_2__);



var avLogger = debug__WEBPACK_IMPORTED_MODULE_2___default()('list-view-renderer');
var ListViewRenderer = /*#__PURE__*/function () {
  function ListViewRenderer(view, eventHandler) {
    this.view = view;
    this.eventHandler = eventHandler;
  }

  var _proto = ListViewRenderer.prototype;

  _proto.createDisplayElementForCollectionItem = function createDisplayElementForCollectionItem(collectionName, item) {
    var _this = this;

    var canDeleteItem = this.view.hasPermissionToDeleteItemInNamedCollection(collectionName, item);
    var uiConfig = this.view.getCollectionUIConfig();
    var dataSourceKeyId = this.view.getDataSourceKeyId();
    avLogger("view " + this.view.getName() + ": creating List item");
    avLogger(item);
    var resultDataKeyId = this.view.getIdForItemInNamedCollection(collectionName, item);
    var childEl = document.createElement(uiConfig.resultsElementType);
    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(childEl, uiConfig.resultsClasses);
    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addAttributes(childEl, uiConfig.resultsElementAttributes);
    childEl.setAttribute(uiConfig.keyId, resultDataKeyId);
    childEl.setAttribute(dataSourceKeyId, uiConfig.viewConfig.dataSourceId); // the content may be structured

    var textEl = childEl;

    if (uiConfig.detail.containerClasses) {
      var contentEl = document.createElement('div');
      _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(contentEl, uiConfig.detail.containerClasses);
      contentEl.setAttribute(uiConfig.keyId, resultDataKeyId);
      contentEl.setAttribute(dataSourceKeyId, uiConfig.viewConfig.dataSourceId);
      textEl = document.createElement(uiConfig.detail.textElementType);
      _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(textEl, uiConfig.detail.textElementClasses);
      textEl.setAttribute(uiConfig.keyId, resultDataKeyId);
      textEl.setAttribute(dataSourceKeyId, uiConfig.viewConfig.dataSourceId);
      contentEl.appendChild(textEl);

      if (uiConfig.detail.background) {
        var imgEl = document.createElement(uiConfig.detail.background.elementType);
        _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(imgEl, uiConfig.detail.background.elementClasses);
        imgEl.setAttribute('src', this.view.getBackgroundImageForItemInNamedCollection(collectionName, item));
        childEl.appendChild(imgEl);
      }

      var buttonsEl = document.createElement('div');
      contentEl.appendChild(buttonsEl);

      if (uiConfig.detail.badge) {
        var badgeValue = this.view.getBadgeValueForItemInNamedCollection(collectionName, item);

        if (badgeValue > 0) {
          var badgeEl = document.createElement(uiConfig.detail.badge.elementType);
          _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(badgeEl, uiConfig.detail.badge.elementClasses);
          _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addAttributes(badgeEl, uiConfig.detail.badge.elementAttributes);
          badgeEl.setAttribute(uiConfig.keyId, resultDataKeyId);
          badgeEl.setAttribute(dataSourceKeyId, uiConfig.viewConfig.dataSourceId);
          buttonsEl.appendChild(badgeEl);
          badgeEl.innerHTML = "&nbsp;&nbsp;&nbsp;" + badgeValue + "&nbsp;&nbsp;&nbsp;";
        }
      }

      if (uiConfig.extraActions) {
        uiConfig.extraActions.forEach(function (extraAction) {
          var action = document.createElement('button');
          action.setAttribute('type', 'button');
          _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(action, extraAction.buttonClasses);

          if (extraAction.buttonText) {
            action.innerHTML = extraAction.buttonText;
          }

          if (extraAction.iconClasses) {
            var iconEl = document.createElement('i');
            _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(iconEl, extraAction.iconClasses);
            iconEl.setAttribute(uiConfig.keyId, resultDataKeyId);
            iconEl.setAttribute(dataSourceKeyId, uiConfig.viewConfig.dataSourceId);
            iconEl.setAttribute(_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.EXTRA_ACTION_ATTRIBUTE_NAME, extraAction.name);
            action.appendChild(iconEl);
          }

          action.setAttribute(uiConfig.keyId, resultDataKeyId);
          action.setAttribute(dataSourceKeyId, uiConfig.viewConfig.dataSourceId);
          action.setAttribute(_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.EXTRA_ACTION_ATTRIBUTE_NAME, extraAction.name);
          action.addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();

            _this.eventHandler.eventActionClicked(event);
          });
          buttonsEl.appendChild(action);
        });
      }

      if (uiConfig.detail.delete && canDeleteItem) {
        var deleteButtonEl = document.createElement('button');
        deleteButtonEl.setAttribute('type', 'button');
        _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(deleteButtonEl, uiConfig.detail.delete.buttonClasses);

        if (uiConfig.detail.delete.buttonText) {
          deleteButtonEl.innerHTML = uiConfig.detail.delete.buttonText;
        }

        if (uiConfig.detail.delete.iconClasses) {
          var iconEl = document.createElement('i');
          _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(iconEl, uiConfig.detail.delete.iconClasses);
          iconEl.setAttribute(uiConfig.keyId, resultDataKeyId);
          iconEl.setAttribute(dataSourceKeyId, uiConfig.viewConfig.dataSourceId);
          deleteButtonEl.appendChild(iconEl);
        }

        deleteButtonEl.setAttribute(uiConfig.keyId, resultDataKeyId);
        deleteButtonEl.setAttribute(dataSourceKeyId, uiConfig.viewConfig.dataSourceId);
        deleteButtonEl.addEventListener('click', function (event) {
          event.preventDefault();
          event.stopPropagation();

          _this.eventHandler.eventDeleteClickItem(event);
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
    var displayText = this.view.getDisplayValueForItemInNamedCollection(collectionName, item);
    textEl.innerHTML = displayText; // add icons

    if (uiConfig.detail.icons) {
      var icons = uiConfig.detail.icons(collectionName, item);
      icons.forEach(function (icon) {
        var iconEl = document.createElement('i');
        _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(iconEl, icon);
        iconEl.setAttribute(uiConfig.keyId, resultDataKeyId);
        iconEl.setAttribute(dataSourceKeyId, uiConfig.viewConfig.dataSourceId);
        textEl.appendChild(iconEl);
      });
    } // add modifiers for patient state


    if (uiConfig.modifiers) {
      var modifier = this.view.getModifierForItemInNamedCollection(collectionName, item);
      var secondModifier = this.view.getSecondaryModifierForItemInNamedCollection(collectionName, item);

      switch (modifier) {
        case _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.Modifier.normal:
          {
            avLogger("view " + this.view.getName() + ": normal item");
            _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(childEl, uiConfig.modifiers.normal);

            if (uiConfig.icons && uiConfig.icons.normal) {
              var _iconEl = document.createElement('i');

              _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(_iconEl, uiConfig.icons.normal);

              _iconEl.setAttribute(uiConfig.keyId, resultDataKeyId);

              _iconEl.setAttribute(dataSourceKeyId, uiConfig.viewConfig.dataSourceId);

              textEl.appendChild(_iconEl);
            }

            switch (secondModifier) {
              case _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.Modifier.warning:
                {
                  _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(childEl, uiConfig.modifiers.normal, false);
                  _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(childEl, uiConfig.modifiers.warning, true);

                  if (uiConfig.icons && uiConfig.icons.warning) {
                    var _iconEl2 = document.createElement('i');

                    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(_iconEl2, uiConfig.icons.warning);

                    _iconEl2.setAttribute(uiConfig.keyId, resultDataKeyId);

                    _iconEl2.setAttribute(dataSourceKeyId, uiConfig.viewConfig.dataSourceId);

                    textEl.appendChild(_iconEl2);
                  }

                  break;
                }

              case _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.Modifier.active:
                {
                  if (uiConfig.icons && uiConfig.icons.active) {
                    var _iconEl3 = document.createElement('i');

                    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(_iconEl3, uiConfig.icons.active);

                    _iconEl3.setAttribute(uiConfig.keyId, resultDataKeyId);

                    _iconEl3.setAttribute(dataSourceKeyId, uiConfig.viewConfig.dataSourceId);

                    textEl.appendChild(_iconEl3);
                  }
                }
            }

            break;
          }

        case _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.Modifier.active:
          {
            avLogger("view " + this.view.getName() + ": active item");
            _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(childEl, uiConfig.modifiers.active);

            if (uiConfig.icons && uiConfig.icons.active) {
              var _iconEl4 = document.createElement('i');

              _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(_iconEl4, uiConfig.icons.active);

              _iconEl4.setAttribute(uiConfig.keyId, resultDataKeyId);

              _iconEl4.setAttribute(dataSourceKeyId, uiConfig.viewConfig.dataSourceId);

              textEl.appendChild(_iconEl4);
            }

            switch (secondModifier) {
              case _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.Modifier.warning:
                {
                  _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(childEl, uiConfig.modifiers.active, false);
                  _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(childEl, uiConfig.modifiers.warning, true);

                  if (uiConfig.icons && uiConfig.icons.warning) {
                    var _iconEl5 = document.createElement('i');

                    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(_iconEl5, uiConfig.icons.warning);

                    _iconEl5.setAttribute(uiConfig.keyId, resultDataKeyId);

                    _iconEl5.setAttribute(dataSourceKeyId, uiConfig.viewConfig.dataSourceId);

                    textEl.appendChild(_iconEl5);
                  }

                  break;
                }
            }

            break;
          }

        case _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.Modifier.inactive:
          {
            avLogger("view " + this.view.getName() + ": inactive item");
            _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(childEl, uiConfig.modifiers.inactive);

            if (uiConfig.icons && uiConfig.icons.inactive) {
              var _iconEl6 = document.createElement('i');

              _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(_iconEl6, uiConfig.icons.inactive);

              _iconEl6.setAttribute(uiConfig.keyId, resultDataKeyId);

              _iconEl6.setAttribute(dataSourceKeyId, uiConfig.viewConfig.dataSourceId);

              textEl.appendChild(_iconEl6);
            }

            switch (secondModifier) {
              case _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.Modifier.warning:
                {
                  if (uiConfig.icons && uiConfig.icons.warning) {
                    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(childEl, uiConfig.modifiers.inactive, false);
                    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(childEl, uiConfig.modifiers.warning, true);

                    var _iconEl7 = document.createElement('i');

                    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(_iconEl7, uiConfig.icons.warning);

                    _iconEl7.setAttribute(uiConfig.keyId, resultDataKeyId);

                    _iconEl7.setAttribute(dataSourceKeyId, uiConfig.viewConfig.dataSourceId);

                    textEl.appendChild(_iconEl7);
                  }

                  break;
                }

              case _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.Modifier.active:
                {
                  if (uiConfig.icons && uiConfig.icons.active) {
                    var _iconEl8 = document.createElement('i');

                    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].addRemoveClasses(_iconEl8, uiConfig.icons.active);

                    _iconEl8.setAttribute(uiConfig.keyId, resultDataKeyId);

                    _iconEl8.setAttribute(dataSourceKeyId, uiConfig.viewConfig.dataSourceId);

                    textEl.appendChild(_iconEl8);
                  }

                  break;
                }
            }

            break;
          }
      }
    }

    return childEl;
  };

  _proto.setDisplayElementsForCollectionInContainer = function setDisplayElementsForCollectionInContainer(containerEl, collectionName, newState) {
    var _this2 = this;

    avLogger("view " + this.view.getName() + ": creating Results");
    avLogger(newState); // remove the previous items from list

    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__["default"].removeAllChildren(containerEl); // add the new children

    newState.map(function (item, index) {
      var childEl = _this2.createDisplayElementForCollectionItem(collectionName, item); // add draggable actions


      avLogger("view " + _this2.view.getName() + ":  Adding child " + _this2.view.getIdForItemInNamedCollection(collectionName, item));
      containerEl.appendChild(childEl);
    });
  };

  return ListViewRenderer;
}();

/***/ }),

/***/ "./src/ui-framework/view/delegate/ViewListenerForwarder.ts":
/*!*****************************************************************!*\
  !*** ./src/ui-framework/view/delegate/ViewListenerForwarder.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ViewListenerForwarder": () => (/* binding */ ViewListenerForwarder)
/* harmony export */ });
var ViewListenerForwarder = /*#__PURE__*/function () {
  function ViewListenerForwarder() {
    this.suppressEventEmits = false;
    this.viewListeners = [];
  }

  var _proto = ViewListenerForwarder.prototype;

  _proto.addListener = function addListener(listener) {
    this.viewListeners.push(listener);
  };

  _proto.suppressEvents = function suppressEvents() {
    this.suppressEventEmits = true;
  };

  _proto.emitEvents = function emitEvents() {
    this.suppressEventEmits = false;
  };

  _proto.itemDeleted = function itemDeleted(view, selectedItem) {
    if (!this.suppressEventEmits) {
      this.viewListeners.forEach(function (listener) {
        return listener.itemDeleted(view, selectedItem);
      });
    }
  };

  _proto.documentLoaded = function documentLoaded(view) {
    if (!this.suppressEventEmits) {
      this.viewListeners.forEach(function (listener) {
        return listener.documentLoaded(view);
      });
    }
  };

  _proto.itemAction = function itemAction(view, actionName, selectedItem) {
    if (!this.suppressEventEmits) {
      this.viewListeners.forEach(function (listener) {
        return listener.itemAction(view, actionName, selectedItem);
      });
    }
  };

  _proto.canDeleteItem = function canDeleteItem(view, selectedItem) {
    var result = true; // return false if cancelling delete

    if (!this.suppressEventEmits) {
      this.viewListeners.forEach(function (listener) {
        if (!listener.canDeleteItem(view, selectedItem)) {
          result = false;
        }
      });
    }

    return result;
  };

  _proto.hideRequested = function hideRequested(view) {
    if (!this.suppressEventEmits) {
      this.viewListeners.forEach(function (listener) {
        return listener.hideRequested(view);
      });
    }
  };

  _proto.showRequested = function showRequested(view) {
    if (!this.suppressEventEmits) {
      this.viewListeners.forEach(function (listener) {
        return listener.showRequested(view);
      });
    }
  };

  _proto.itemDropped = function itemDropped(view, droppedItem) {
    if (!this.suppressEventEmits) {
      this.viewListeners.forEach(function (listener) {
        return listener.itemDropped(view, droppedItem);
      });
    }
  };

  return ViewListenerForwarder;
}();

/***/ }),

/***/ "./src/ui-framework/view/implementation/AbstractCollectionView.ts":
/*!************************************************************************!*\
  !*** ./src/ui-framework/view/implementation/AbstractCollectionView.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbstractCollectionView": () => (/* binding */ AbstractCollectionView)
/* harmony export */ });
/* harmony import */ var _AbstractView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractView */ "./src/ui-framework/view/implementation/AbstractView.ts");
/* harmony import */ var _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../ConfigurationTypes */ "./src/ui-framework/ConfigurationTypes.ts");
/* harmony import */ var _util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../util/EqualityFunctions */ "./src/util/EqualityFunctions.ts");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _delegate_CollectionViewListenerForwarder__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../delegate/CollectionViewListenerForwarder */ "./src/ui-framework/view/delegate/CollectionViewListenerForwarder.ts");
/* harmony import */ var _alert_AlertManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../alert/AlertManager */ "./src/ui-framework/alert/AlertManager.ts");
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}







var avLogger = debug__WEBPACK_IMPORTED_MODULE_3___default()('collection-view-ts');
var avLoggerDetails = debug__WEBPACK_IMPORTED_MODULE_3___default()('collection-view-ts-detail');
var AbstractCollectionView = /*#__PURE__*/function (_AbstractView) {
  _inheritsLoose(AbstractCollectionView, _AbstractView);

  function AbstractCollectionView(uiConfig, collectionName) {
    var _this;

    _this = _AbstractView.call(this, uiConfig.viewConfig) || this;
    _this.collectionUIConfig = uiConfig;
    _this.collectionName = collectionName;
    _this.renderer = null;
    _this.selectedItem = null;
    _this.eventForwarder = new _delegate_CollectionViewListenerForwarder__WEBPACK_IMPORTED_MODULE_4__.CollectionViewListenerForwarder(); // event handlers

    _this.eventStartDrag = _this.eventStartDrag.bind(_assertThisInitialized(_this));
    _this.eventActionClicked = _this.eventActionClicked.bind(_assertThisInitialized(_this));
    _this.eventClickItem = _this.eventClickItem.bind(_assertThisInitialized(_this));
    _this.eventDeleteClickItem = _this.eventDeleteClickItem.bind(_assertThisInitialized(_this));
    _this.updateViewForNamedCollection = _this.updateViewForNamedCollection.bind(_assertThisInitialized(_this));
    return _this;
  }

  var _proto = AbstractCollectionView.prototype;

  _proto.getCollectionUIConfig = function getCollectionUIConfig() {
    return this.collectionUIConfig;
  };

  _proto.addEventCollectionListener = function addEventCollectionListener(listener) {
    this.eventForwarder.addListener(listener);
  };

  _proto.setContainedBy = function setContainedBy(container) {
    _AbstractView.prototype.setContainedBy.call(this, container);

    if (this.uiConfig.drop) {
      avLoggerDetails("view " + this.getName() + ": Adding dragover events to " + this.uiConfig.dataSourceId);
      avLoggerDetails(container);
      container.addEventListener('dragover', function (event) {
        event.preventDefault();
      });
      container.addEventListener('drop', this.handleDrop);
    }
  };

  _proto.getDragData = function getDragData(event) {
    // @ts-ignore
    var itemId = event.target.getAttribute(this.collectionUIConfig.keyId); // @ts-ignore

    var dataSource = event.target.getAttribute(_AbstractView__WEBPACK_IMPORTED_MODULE_0__.AbstractView.DATA_SOURCE);
    if (this.collectionUIConfig.keyType === _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.KeyType.number) itemId = parseInt(itemId); // @ts-ignore

    avLoggerDetails("view " + this.getName() + ": Item with id " + itemId + " getting drag data from " + dataSource);
    var compareWith = {}; // @ts-ignore

    compareWith[this.collectionUIConfig.keyId] = itemId;
    var selectedItem = {};
    selectedItem = this.getItemInNamedCollection(this.collectionName, compareWith);

    if (selectedItem) {
      var _this$collectionUICon, _this$collectionUICon2; // @ts-ignore


      selectedItem[_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.DRAGGABLE_TYPE] = (_this$collectionUICon = this.collectionUIConfig.detail.drag) == null ? void 0 : _this$collectionUICon.type; // @ts-ignore

      selectedItem[_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.DRAGGABLE_FROM] = (_this$collectionUICon2 = this.collectionUIConfig.detail.drag) == null ? void 0 : _this$collectionUICon2.from;
    }

    return selectedItem;
  };

  _proto.compareItemsForEquality = function compareItemsForEquality(item1, item2) {
    return (0,_util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_2__.isSame)(item1, item2);
  };

  _proto.getModifierForItemInNamedCollection = function getModifierForItemInNamedCollection(name, item) {
    if (this.selectedItem) {
      if (this.compareItemsForEquality(item, this.selectedItem)) {
        return _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.Modifier.active;
      }
    }

    return _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.Modifier.inactive;
  };

  _proto.getSecondaryModifierForItemInNamedCollection = function getSecondaryModifierForItemInNamedCollection(name, item) {
    return _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.Modifier.normal;
  };

  _proto.getBadgeValueForItemInNamedCollection = function getBadgeValueForItemInNamedCollection(name, item) {
    return 0;
  };

  _proto.getBackgroundImageForItemInNamedCollection = function getBackgroundImageForItemInNamedCollection(name, item) {
    return '';
  };

  _proto.updateViewForNamedCollection = function updateViewForNamedCollection(name, newState) {
    if (this.viewEl && this.renderer) {
      this.renderer.setDisplayElementsForCollectionInContainer(this.viewEl, name, newState);
    }
  };

  _proto.eventStartDrag = function eventStartDrag(event) {
    avLogger("view " + this.getName() + ": drag start");
    avLoggerDetails(event.target);
    var data = JSON.stringify(this.getDragData(event));
    avLoggerDetails(data); // @ts-ignore

    event.dataTransfer.setData(_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.DRAGGABLE_KEY_ID, data);
    this.eventForwarder.itemDragStarted(this, data);
  };

  _proto.eventClickItem = function eventClickItem(event) {
    event.preventDefault();
    event.stopPropagation(); // @ts-ignore

    var itemId = event.target.getAttribute(this.collectionUIConfig.keyId); // @ts-ignore

    var dataSource = event.target.getAttribute(_AbstractView__WEBPACK_IMPORTED_MODULE_0__.AbstractView.DATA_SOURCE);
    if (this.collectionUIConfig.keyType === _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.KeyType.number) itemId = parseInt(itemId); // @ts-ignore

    avLoggerDetails("view " + this.getName() + ": Item with id " + itemId + " clicked from " + dataSource);
    var compareWith = {}; // @ts-ignore

    compareWith[this.collectionUIConfig.keyId] = itemId;
    avLoggerDetails(compareWith);
    var selectedItem = this.getItemInNamedCollection(this.collectionName, compareWith);
    console.log(selectedItem);

    if (selectedItem) {
      var shouldSelect = this.eventForwarder.canSelectItem(this, selectedItem);
      avLoggerDetails("view " + this.getName() + ": Item with id " + itemId + " attempting selected from " + dataSource + " - " + shouldSelect);

      if (shouldSelect) {
        this.selectedItem = selectedItem;
        avLoggerDetails(selectedItem);
        this.eventForwarder.itemSelected(this, selectedItem);
      }
    }
  };

  _proto.eventDeleteClickItem = function eventDeleteClickItem(event) {
    event.preventDefault();
    event.stopPropagation(); // @ts-ignore

    var itemId = event.target.getAttribute(this.collectionUIConfig.keyId); // @ts-ignore

    var dataSource = event.target.getAttribute(_AbstractView__WEBPACK_IMPORTED_MODULE_0__.AbstractView.DATA_SOURCE);
    if (this.collectionUIConfig.keyType === _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.KeyType.number) itemId = parseInt(itemId); // @ts-ignore

    avLoggerDetails("view " + this.getName() + ": Item with id " + itemId + " attempting delete from " + dataSource);
    var compareWith = {}; // @ts-ignore

    compareWith[this.collectionUIConfig.keyId] = itemId;
    avLoggerDetails(compareWith);
    var selectedItem = this.getItemInNamedCollection(this.collectionName, compareWith);

    if (selectedItem) {
      var shouldDelete = this.eventForwarder.canDeleteItem(this, selectedItem);
      avLoggerDetails("view " + this.getName() + ": Item with id " + itemId + " attempting delete from " + dataSource + " - " + shouldDelete);

      if (shouldDelete) {
        // do we need to confirm?
        if (this.collectionUIConfig.detail.quickDelete) {
          this.selectedItem = null;
          this.eventForwarder.itemDeleted(this, selectedItem);
        } else {
          _alert_AlertManager__WEBPACK_IMPORTED_MODULE_5__.AlertManager.getInstance().startAlert(this, this.getName(), "Are you sure you want to delete this information?", selectedItem);
        }
      }
    }
  };

  _proto.eventActionClicked = function eventActionClicked(event) {
    event.preventDefault();
    event.stopPropagation(); // @ts-ignore

    var itemId = event.target.getAttribute(this.collectionUIConfig.keyId); // @ts-ignore

    var dataSource = event.target.getAttribute(_AbstractView__WEBPACK_IMPORTED_MODULE_0__.AbstractView.DATA_SOURCE); // @ts-ignore

    var actionName = event.target.getAttribute(_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.EXTRA_ACTION_ATTRIBUTE_NAME);
    if (this.collectionUIConfig.keyType === _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.KeyType.number) itemId = parseInt(itemId); // @ts-ignore

    avLoggerDetails("view " + this.getName() + ": Item with id " + itemId + " attempting delete from " + dataSource);
    var compareWith = {}; // @ts-ignore

    compareWith[this.collectionUIConfig.keyId] = itemId;
    avLoggerDetails(compareWith);
    var selectedItem = this.getItemInNamedCollection(this.collectionName, compareWith);

    if (selectedItem) {
      var shouldSelect = this.eventForwarder.canSelectItem(this, selectedItem);
      avLoggerDetails("view " + this.getName() + ": Item with id " + itemId + " attempting action " + actionName + " from " + dataSource + " - " + shouldSelect);

      if (shouldSelect) {
        this.selectedItem = selectedItem;
        avLoggerDetails(selectedItem);
        this.eventForwarder.itemAction(this, actionName, selectedItem);
      }
    }
  };

  _proto.hasPermissionToDeleteItemInNamedCollection = function hasPermissionToDeleteItemInNamedCollection(name, item) {
    return true;
  };

  _proto.hasPermissionToUpdateItemInNamedCollection = function hasPermissionToUpdateItemInNamedCollection(name, item) {
    return true;
  };

  _proto.setRenderer = function setRenderer(renderer) {
    this.renderer = renderer;
  };

  _proto.completed = function completed(event) {
    avLoggerDetails(event.context);
    this.selectedItem = null;
    this.eventForwarder.itemDeleted(this, event.context);
  };

  return AbstractCollectionView;
}(_AbstractView__WEBPACK_IMPORTED_MODULE_0__.AbstractView);

/***/ }),

/***/ "./src/ui-framework/view/implementation/AbstractStatefulCollectionView.ts":
/*!********************************************************************************!*\
  !*** ./src/ui-framework/view/implementation/AbstractStatefulCollectionView.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AbstractStatefulCollectionView)
/* harmony export */ });
/* harmony import */ var _AbstractCollectionView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractCollectionView */ "./src/ui-framework/view/implementation/AbstractCollectionView.ts");
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}



var AbstractStatefulCollectionView = /*#__PURE__*/function (_AbstractCollectionVi) {
  _inheritsLoose(AbstractStatefulCollectionView, _AbstractCollectionVi);

  function AbstractStatefulCollectionView(uiConfig, stateManager, stateName) {
    var _this;

    _this = _AbstractCollectionVi.call(this, uiConfig, stateName) || this;
    _this.stateManager = stateManager; // state change listening

    _this.stateChanged = _this.stateChanged.bind(_assertThisInitialized(_this)); // setup state listener

    _this.stateManager.addChangeListenerForName(_this.collectionName, _assertThisInitialized(_this));

    return _this;
  }

  var _proto = AbstractStatefulCollectionView.prototype;

  _proto.onDocumentLoaded = function onDocumentLoaded() {
    _AbstractCollectionVi.prototype.onDocumentLoaded.call(this);

    this.addEventCollectionListener(this);
  };

  _proto.getItemInNamedCollection = function getItemInNamedCollection(name, compareWith) {
    return this.stateManager.findItemInState(name, compareWith, this.compareItemsForEquality);
  };

  _proto.stateChanged = function stateChanged(managerName, name, newValue) {
    this.updateViewForNamedCollection(name, newValue);
  };

  _proto.stateChangedItemAdded = function stateChangedItemAdded(managerName, name, itemAdded) {
    if (this.stateManager && this.collectionName) this.updateViewForNamedCollection(name, this.stateManager.getStateByName(name));
  };

  _proto.stateChangedItemRemoved = function stateChangedItemRemoved(managerName, name, itemRemoved) {
    if (this.stateManager && this.collectionName) this.updateViewForNamedCollection(name, this.stateManager.getStateByName(name));
  };

  _proto.stateChangedItemUpdated = function stateChangedItemUpdated(managerName, name, itemUpdated, itemNewValue) {
    if (this.stateManager && this.collectionName) this.updateViewForNamedCollection(name, this.stateManager.getStateByName(name));
  };

  _proto.render = function render() {
    this.updateViewForNamedCollection(this.collectionName, this.stateManager.getStateByName(this.collectionName));
  };

  _proto.show = function show() {};

  _proto.hidden = function hidden() {};

  _proto.documentLoaded = function documentLoaded(view) {};

  _proto.hideRequested = function hideRequested(view) {};

  _proto.itemDragStarted = function itemDragStarted(view, selectedItem) {};

  _proto.itemDropped = function itemDropped(view, droppedItem) {};

  _proto.showRequested = function showRequested(view) {};

  _proto.itemDeselected = function itemDeselected(view, selectedItem) {};

  _proto.itemSelected = function itemSelected(view, selectedItem) {};

  _proto.itemAction = function itemAction(view, actionName, selectedItem) {};

  _proto.itemDeleted = function itemDeleted(view, selectedItem) {
    this.stateManager.removeItemFromState(this.collectionName, selectedItem, this.compareItemsForEquality, false);
  };

  _proto.canSelectItem = function canSelectItem(view, selectedItem) {
    return true;
  };

  _proto.canDeleteItem = function canDeleteItem(view, selectedItem) {
    return true;
  };

  return AbstractStatefulCollectionView;
}(_AbstractCollectionView__WEBPACK_IMPORTED_MODULE_0__.AbstractCollectionView);



/***/ }),

/***/ "./src/ui-framework/view/implementation/AbstractView.ts":
/*!**************************************************************!*\
  !*** ./src/ui-framework/view/implementation/AbstractView.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbstractView": () => (/* binding */ AbstractView)
/* harmony export */ });
/* harmony import */ var _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../ConfigurationTypes */ "./src/ui-framework/ConfigurationTypes.ts");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _delegate_ViewListenerForwarder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../delegate/ViewListenerForwarder */ "./src/ui-framework/view/delegate/ViewListenerForwarder.ts");



var avLogger = debug__WEBPACK_IMPORTED_MODULE_1___default()('abstract-view-ts');
var avLoggerDetails = debug__WEBPACK_IMPORTED_MODULE_1___default()('abstract-view-ts-detail');
var AbstractView = /*#__PURE__*/function () {
  function AbstractView(uiConfig) {
    this.containerEl = null;
    this.uiConfig = uiConfig;
    this.viewEl = null;
    this.eventForwarder = new _delegate_ViewListenerForwarder__WEBPACK_IMPORTED_MODULE_2__.ViewListenerForwarder();
    this.handleDrop = this.handleDrop.bind(this);
  }

  var _proto = AbstractView.prototype;

  _proto.getUIConfig = function getUIConfig() {
    return this.uiConfig;
  };

  _proto.addEventListener = function addEventListener(listener) {
    this.eventForwarder.addListener(listener);
  };

  _proto.onDocumentLoaded = function onDocumentLoaded() {
    this.viewEl = document.getElementById(this.uiConfig.resultsContainerId);
    this.eventForwarder.documentLoaded(this);
  };

  _proto.setContainedBy = function setContainedBy(container) {
    this.containerEl = container;
  };

  _proto.getName = function getName() {
    return this.uiConfig.dataSourceId;
  };

  _proto.hasChanged = function hasChanged() {
    return false;
  };

  _proto.getDataSourceKeyId = function getDataSourceKeyId() {
    return AbstractView.DATA_SOURCE;
  };

  _proto.handleDrop = function handleDrop(event) {
    avLogger("view " + this.getName() + ": drop event");
    avLoggerDetails(event.target); // @ts-ignore

    var draggedObjectJSON = event.dataTransfer.getData(_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_0__.DRAGGABLE_KEY_ID);
    var draggedObject = JSON.parse(draggedObjectJSON);
    avLoggerDetails(draggedObject); // check to see if we accept the dropped type and source

    var droppedObjectType = draggedObject[_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_0__.DRAGGABLE_TYPE];
    var droppedObjectFrom = draggedObject[_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_0__.DRAGGABLE_FROM];
    avLogger("view " + this.getName() + ": drop event from " + droppedObjectFrom + " with type " + droppedObjectType);

    if (this.uiConfig.drop) {
      var acceptType = this.uiConfig.drop.acceptTypes.findIndex(function (objectType) {
        return objectType === droppedObjectType;
      }) >= 0;
      var acceptFrom = true;

      if (acceptType) {
        if (this.uiConfig.drop.acceptFrom) {
          acceptFrom = this.uiConfig.drop.acceptFrom.findIndex(function (from) {
            return from === droppedObjectFrom;
          }) >= 0;
        }

        avLoggerDetails("view " + this.getName() + ": accepted type? " + acceptType + " and from? " + acceptFrom);

        if (acceptType && acceptFrom) {
          this.eventForwarder.itemDropped(this, draggedObject);
        }
      }
    }
  };

  return AbstractView;
}();
AbstractView.DATA_SOURCE = 'data-source';

/***/ }),

/***/ "./src/ui-framework/view/implementation/DetailViewImplementation.ts":
/*!**************************************************************************!*\
  !*** ./src/ui-framework/view/implementation/DetailViewImplementation.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DetailViewImplementation": () => (/* binding */ DetailViewImplementation)
/* harmony export */ });
/* harmony import */ var _AbstractView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractView */ "./src/ui-framework/view/implementation/AbstractView.ts");
/* harmony import */ var _delegate_DetailViewListenerForwarder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../delegate/DetailViewListenerForwarder */ "./src/ui-framework/view/delegate/DetailViewListenerForwarder.ts");
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}



var DetailViewImplementation = /*#__PURE__*/function (_AbstractView) {
  _inheritsLoose(DetailViewImplementation, _AbstractView);

  function DetailViewImplementation(uiConfig, renderer) {
    var _this;

    _this = _AbstractView.call(this, uiConfig) || this;
    _this.currentItem = null;
    _this.renderer = renderer;
    var forwarder = new _delegate_DetailViewListenerForwarder__WEBPACK_IMPORTED_MODULE_1__.DetailViewListenerForwarder();
    _this.eventForwarder = forwarder;

    _this.renderer.setView(_assertThisInitialized(_this));

    _this.renderer.setEventForwarder(forwarder);

    return _this;
  }

  var _proto = DetailViewImplementation.prototype;

  _proto.addEventDetailListener = function addEventDetailListener(listener) {
    this.eventForwarder.addListener(listener);
  };

  _proto.clearDisplay = function clearDisplay() {
    this.renderer.reset();
  };

  _proto.clearReadOnly = function clearReadOnly() {
    this.renderer.clearReadOnly();
  };

  _proto.setReadOnly = function setReadOnly() {
    this.renderer.setReadOnly();
  };

  _proto.isReadOnly = function isReadOnly() {
    return this.renderer.isReadOnly();
  };

  _proto.createItem = function createItem() {
    return this.renderer.createItem();
  };

  _proto.displayItem = function displayItem(dataObj) {
    this.currentItem = dataObj;

    if (this.renderer.hasPermissionToUpdateCurrentItem()) {
      this.renderer.displayItem(dataObj);
    } else {
      this.renderer.displayItemReadonly(dataObj);
    }

    this.show();
  };

  _proto.hidden = function hidden() {
    this.renderer.hidden();
  };

  _proto.show = function show() {
    this.renderer.show();
  };

  _proto.render = function render() {
    this.displayItem(this.currentItem);
  };

  _proto.onDocumentLoaded = function onDocumentLoaded() {
    this.renderer.onDocumentLoaded();
    this.renderer.initialise();

    _AbstractView.prototype.onDocumentLoaded.call(this);
  };

  _proto.hasPermissionToDeleteCurrentItem = function hasPermissionToDeleteCurrentItem() {
    return this.renderer.hasPermissionToDeleteCurrentItem();
  };

  _proto.hasPermissionToUpdateCurrentItem = function hasPermissionToUpdateCurrentItem() {
    return this.renderer.hasPermissionToUpdateCurrentItem();
  };

  _proto.handleActionItem = function handleActionItem(actionName, selectedItem) {
    this.renderer.handleActionItem(actionName, selectedItem);
  };

  _proto.isDisplayingItem = function isDisplayingItem(dataObj) {
    return this.renderer.isDisplayingItem(dataObj);
  };

  _proto.hasChanged = function hasChanged() {
    return this.renderer.hasChanged();
  };

  return DetailViewImplementation;
}(_AbstractView__WEBPACK_IMPORTED_MODULE_0__.AbstractView);

/***/ }),

/***/ "./src/ui-framework/view/implementation/LinkedCollectionDetailController.ts":
/*!**********************************************************************************!*\
  !*** ./src/ui-framework/view/implementation/LinkedCollectionDetailController.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LinkedCollectionDetailController": () => (/* binding */ LinkedCollectionDetailController)
/* harmony export */ });
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _model_DataObjectController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../model/DataObjectController */ "./src/model/DataObjectController.ts");
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}



var logger = debug__WEBPACK_IMPORTED_MODULE_0___default()('linked-controller');
var dlogger = debug__WEBPACK_IMPORTED_MODULE_0___default()('linked-controller-detail');

var ChildViewListenerDelegate = /*#__PURE__*/function () {
  function ChildViewListenerDelegate(controller) {
    this.controller = controller;
  }

  var _proto = ChildViewListenerDelegate.prototype;

  _proto.addView = function addView(view) {
    view.addEventListener(this);
  };

  _proto.canDeleteItem = function canDeleteItem(view, selectedItem) {
    return true;
  };

  _proto.documentLoaded = function documentLoaded(view) {};

  _proto.hideRequested = function hideRequested(view) {};

  _proto.itemAction = function itemAction(view, actionName, selectedItem) {};

  _proto.itemDeleted = function itemDeleted(view, selectedItem) {};

  _proto.itemDropped = function itemDropped(view, droppedItem) {};

  _proto.showRequested = function showRequested(view) {};

  _proto.cancelled = function cancelled(view, dataObj) {
    this.controller.cancelled(view, dataObj);
  };

  _proto.deletedItem = function deletedItem(view, dataObj) {
    this.controller.deletedItem(view, dataObj);
  };

  _proto.saveNewItem = function saveNewItem(view, dataObj) {
    this.controller.saveNewItem(view, dataObj);
  };

  _proto.updateItem = function updateItem(view, dataObj) {
    this.controller.updateItem(view, dataObj);
  };

  return ChildViewListenerDelegate;
}();

var LinkedCollectionDetailController = /*#__PURE__*/function (_DataObjectController) {
  _inheritsLoose(LinkedCollectionDetailController, _DataObjectController);

  function LinkedCollectionDetailController(typeName, parentView) {
    var _this;

    _this = _DataObjectController.call(this, typeName) || this;
    _this.children = [];
    logger("Starting with parent view " + parentView.getName());
    _this.parentView = parentView;
    _this.delegate = new ChildViewListenerDelegate(_assertThisInitialized(_this));

    _this.parentView.addEventListener(_assertThisInitialized(_this));

    return _this;
  }

  var _proto2 = LinkedCollectionDetailController.prototype;

  _proto2.addLinkedDetailView = function addLinkedDetailView(childView) {
    logger("Adding child view " + childView.getName());
    this.children.push(childView);
    this.delegate.addView(childView); // this delegate will only pass us the unique detail view events (save, new, etc)
  };

  _proto2.initialise = function initialise() {// call when all views are ready
  };

  _proto2.canDeleteItem = function canDeleteItem(view, selectedItem) {
    logger("Handling delete item from view " + view.getName());
    dlogger(selectedItem);
    return this.parentView.hasPermissionToDeleteItemInNamedCollection('', selectedItem);
  };

  _proto2.documentLoaded = function documentLoaded(view) {
    logger("Handling document loaded view " + view.getName()); // let the children know

    this.children.forEach(function (childView) {
      childView.onDocumentLoaded();
    });
  };

  _proto2.hideRequested = function hideRequested(view) {
    // let the children know
    logger("Handling hide  from view " + view.getName());
    this.children.forEach(function (childView) {
      childView.hidden();
    });
  };

  _proto2.itemAction = function itemAction(view, actionName, selectedItem) {
    logger("Handling item action " + actionName + " from view " + view.getName());
    dlogger(selectedItem);
    this.children.forEach(function (childView) {
      childView.handleActionItem(actionName, selectedItem);
    });
  };

  _proto2.itemDeleted = function itemDeleted(view, selectedItem) {
    logger("Handling item deleted from view " + view.getName());
    dlogger(selectedItem);
    this.children.forEach(function (childView) {
      // clear the child display and set readonly
      childView.clearDisplay();
      childView.setReadOnly();
    });
  };

  _proto2.itemDeselected = function itemDeselected(view, selectedItem) {
    logger("Handling item deselected from view " + view.getName());
    dlogger(selectedItem);
    this.children.forEach(function (childView) {
      // clear the child display and set readonly
      childView.clearDisplay();
      childView.setReadOnly();
    });
  };

  _proto2.itemDragStarted = function itemDragStarted(view, selectedItem) {// nothing to do here
  };

  _proto2.itemDropped = function itemDropped(view, droppedItem) {// nothing to do here
  };

  _proto2.itemSelected = function itemSelected(view, selectedItem) {
    logger("Handling item selected from view " + view.getName());
    dlogger(selectedItem);
    this.children.forEach(function (childView) {
      childView.displayItem(selectedItem);
    });
  };

  _proto2.showRequested = function showRequested(view) {
    logger("Handling show from view " + view.getName()); // let the children know

    this.children.forEach(function (childView) {
      childView.show();
    });
  };

  _proto2.canSelectItem = function canSelectItem(view, selectedItem) {
    logger("Handling can select item from view " + view.getName());
    dlogger(selectedItem); // are we currently in the middle of creating a new object?

    if (this.isCreatingNew) return false; // prevent selection if the children views have modified this item

    var canProceedWithSelection = true;
    this.children.forEach(function (childView) {
      if (childView.isDisplayingItem(selectedItem)) {
        if (childView.hasChanged()) {
          dlogger("child view " + childView.getName() + " has changed - cancelling");
          canProceedWithSelection = false;
        }
      }
    });
    return canProceedWithSelection;
  };

  _proto2.cancelled = function cancelled(view, dataObj) {
    logger("Handling cancelled from child view " + view.getName());
    dlogger(dataObj);
    this.isCreatingNew = false;
  };

  _proto2.deletedItem = function deletedItem(view, dataObj) {
    logger("Handling deleted from child view " + view.getName());
    dlogger(dataObj);
    this.informListenersOfDelete(dataObj);
  };

  _proto2.saveNewItem = function saveNewItem(view, dataObj) {
    logger("Handling save new from child view " + view.getName());
    dlogger(dataObj);
    this.informListenersOfCreate(dataObj);
  };

  _proto2.updateItem = function updateItem(view, dataObj) {
    logger("Handling update from child view " + view.getName());
    dlogger(dataObj);
    this.informListenersOfUpdate(dataObj);
  };

  _proto2._startNewObject = function _startNewObject() {
    // assume the first detail view will create the object for us
    var result = false;

    if (this.children.length > 0) {
      var dataObj = this.children[0].createItem();
      if (dataObj) result = true;
    }

    return result;
  };

  return LinkedCollectionDetailController;
}(_model_DataObjectController__WEBPACK_IMPORTED_MODULE_1__.DataObjectController);

/***/ }),

/***/ "./src/util/BrowserUtil.ts":
/*!*********************************!*\
  !*** ./src/util/BrowserUtil.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var BrowserUtil = /*#__PURE__*/function () {
  function BrowserUtil() {}

  var _proto = BrowserUtil.prototype;

  _proto.scrollSmoothToId = function scrollSmoothToId(elementId) {
    var element = document.getElementById(elementId);

    if (element !== null) {
      element.scrollIntoView({
        block: 'start',
        behavior: 'smooth'
      });
    }
  };

  _proto.scrollToBottomNow = function scrollToBottomNow(element) {
    if (element) {
      element.scrollTop = element.scrollHeight - element.clientHeight + 100;
    }
  };

  _proto.scrollToBottomSmooth = function scrollToBottomSmooth(element) {
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
      element.scrollTop = element.scrollHeight - element.clientHeight + 100;
    }
  };

  _proto.scrollSmoothTo = function scrollSmoothTo(element) {
    element.scrollIntoView({
      block: 'start',
      behavior: 'smooth'
    });
  };

  _proto.scrollTo = function scrollTo(element) {
    element.scrollIntoView({
      block: 'start'
    });
  };

  _proto.removeAllChildren = function removeAllChildren(element) {
    if (element && element.firstChild) {
      while (element.firstChild) {
        var lastChild = element.lastChild;
        if (lastChild) element.removeChild(lastChild);
      }
    }
  };

  _proto.addRemoveClasses = function addRemoveClasses(element, classesText, isAdding) {
    if (isAdding === void 0) {
      isAdding = true;
    }

    var classes = classesText.split(' ');
    classes.forEach(function (classValue) {
      if (classValue.trim().length > 0) {
        if (isAdding) {
          element.classList.add(classValue);
        } else {
          element.classList.remove(classValue);
        }
      }
    });
  };

  _proto.addAttributes = function addAttributes(element, attributes) {
    if (attributes) {
      attributes.forEach(function (attribute) {
        element.setAttribute(attribute.name, attribute.value);
      });
    }
  };

  _proto.removeAttributes = function removeAttributes(element, attributes) {
    attributes.forEach(function (attribute) {
      element.removeAttribute(attribute);
    });
  };

  return BrowserUtil;
}();

var browserUtil = new BrowserUtil();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (browserUtil);

/***/ }),

/***/ "./src/util/EqualityFunctions.ts":
/*!***************************************!*\
  !*** ./src/util/EqualityFunctions.ts ***!
  \***************************************/
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