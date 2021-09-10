/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

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
/* harmony export */   "ALERT": () => (/* binding */ ALERT),
/* harmony export */   "DRAGGABLE": () => (/* binding */ DRAGGABLE),
/* harmony export */   "VIEW_NAME": () => (/* binding */ VIEW_NAME)
/* harmony export */ });
var Decorator;

(function (Decorator) {
  Decorator[Decorator["Incomplete"] = 0] = "Incomplete";
  Decorator[Decorator["Complete"] = 1] = "Complete";
  Decorator[Decorator["Persisted"] = 2] = "Persisted";
  Decorator[Decorator["PersistedLocally"] = 3] = "PersistedLocally";
})(Decorator || (Decorator = {}));

var STATE_NAMES = {
  users: 'users',
  boardGames: 'boardGames',
  scores: 'scores',
  selectedEntry: 'selectedEntry',
  recentUserSearches: 'recentUserSearches',
  bggSearchResults: 'bggSearchResults',
  scoreSheet: 'scoreSheet',
  chatLogs: 'chatLogs'
};
var API_Config = {
  login: '/login',
  graphQL: '/graphql',
  bggSearchCall: 'query search($queryString: String!) {findBoardGames(query: $queryString) {gameId, name, year}}',
  bggSearchCallById: {
    queryString: 'query getDetails($gameId:Int!) {getBoardGameDetails(gameId:$gameId) {gameId,thumb,image,name,description,year, minPlayers, maxPlayers, minPlayTime, maxPlayTime, minAge, designers, artists, publisher, numOfRaters, averageScore, rank, categories}}',
    resultName: 'getBoardGameDetails'
  },
  findUsers: {
    queryString: 'query {findUsers {id, username}}',
    resultName: 'findUsers'
  },
  addToMyCollection: {
    queryString: 'mutation addBoardGame($userId: Int!, $boardGame: BoardGameDetailInput!){addToMyCollection(userId: $userId, boardGame: $boardGame) {id,gameId}}',
    resultName: 'addToMyCollection'
  },
  removeFromMyCollection: {
    queryString: 'mutation removeBoardGame($userId: Int!, $boardGameId: Int!) {removeFromMyCollection(userId: $userId, boardGameId: $boardGameId) {result}}',
    resultName: 'removeFromMyCollection'
  },
  getMyBoardGameCollection: {
    queryString: 'query myCollection($userId: Int!) {getMyBoardGameCollection(userId: $userId) {id,gameId,thumb,image,name,description,year, minPlayers, maxPlayers, minPlayTime, maxPlayTime, minAge, designers, artists, publisher, numOfRaters, averageScore, rank, categories,scoresheets {id, player1, score1, player2, score2, player3, score3, player4, score4, player5, score5, player6, score6, player7, score7, createdOn}}}',
    resultName: 'getMyBoardGameCollection'
  },
  addScoreSheetToBoardGame: {
    queryString: 'mutation addScore($userId: Int!, $boardGameId: Int!, $sheet: ScoreSheetInput) {addScoreSheetToBoardGame(userId: $userId, boardGameId: $boardGameId, sheet: $sheet){id}}',
    resultName: 'addScoreSheetToBoardGame'
  },
  removeScoreSheet: {
    queryString: 'mutation removeSheet($sheetId: String!) {removeScoreSheet(sheetId: $sheetId) {result}}',
    resultName: 'removeFromMyCollection'
  }
};
var NAVIGATION = {
  showMyCollection: 'navigationItemMyCollection',
  boardGameSearchId: 'navigationItemBoardGameSearch',
  userSearchId: 'navigationItemUserSearch',
  chatId: 'navigationItemChat',
  showScoreSheet: 'navigationItemScoreSheet'
};
var ALERT = {
  modalId: "alert",
  titleId: "alert-title",
  contentId: "alert-content",
  cancelButtonId: "alert-cancel",
  confirmButtonId: "alert-confirm",
  closeButtonId: "alert-close",
  hideClass: "d-none",
  showClass: "d-block"
};
var DRAGGABLE = {
  typeBoardGame: 'boardGame',
  typeUser: 'user',
  fromUserSearch: 'userSearch',
  fromFavourites: 'favourites'
};
var VIEW_NAME = {
  bggSearch: 'bggSearch',
  blockedUsers: 'blockedUsers',
  chatLog: 'chatLog',
  chatLogs: 'chatLogs',
  favouriteUsers: 'favouriteUsers',
  scoreSheets: 'scoreSheets',
  userSearch: 'userSearch'
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
/* harmony import */ var _state_GraphQLApiStateManager__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./state/GraphQLApiStateManager */ "./src/state/GraphQLApiStateManager.ts");
/* harmony import */ var _AppTypes__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./AppTypes */ "./src/AppTypes.ts");
/* harmony import */ var _network_DownloadManager__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./network/DownloadManager */ "./src/network/DownloadManager.ts");
/* harmony import */ var _state_BrowserStorageStateManager__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./state/BrowserStorageStateManager */ "./src/state/BrowserStorageStateManager.ts");
/* harmony import */ var _component_controller_ScoreSheetController__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./component/controller/ScoreSheetController */ "./src/component/controller/ScoreSheetController.ts");
/* harmony import */ var _util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./util/EqualityFunctions */ "./src/util/EqualityFunctions.ts");














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

    var graphSM = new _state_GraphQLApiStateManager__WEBPACK_IMPORTED_MODULE_8__.GraphQLApiStateManager();
    graphSM.initialise([{
      stateName: _AppTypes__WEBPACK_IMPORTED_MODULE_9__.STATE_NAMES.users,
      apiURL: this.getServerAPIURL() + _AppTypes__WEBPACK_IMPORTED_MODULE_9__.API_Config.graphQL,
      apis: {
        find: '',
        create: '',
        destroy: '',
        update: '',
        findAll: _AppTypes__WEBPACK_IMPORTED_MODULE_9__.API_Config.findUsers.queryString
      },
      data: {
        find: '',
        create: '',
        destroy: '',
        update: '',
        findAll: _AppTypes__WEBPACK_IMPORTED_MODULE_9__.API_Config.findUsers.resultName
      },
      isActive: true
    }]);
    var aggregateSM = _state_AggregateStateManager__WEBPACK_IMPORTED_MODULE_4__.AggregateStateManager.getInstance();
    var memorySM = _state_MemoryBufferStateManager__WEBPACK_IMPORTED_MODULE_1__["default"].getInstance();
    var asyncSM = new _state_AsyncStateManagerWrapper__WEBPACK_IMPORTED_MODULE_3__["default"](aggregateSM, graphSM);
    aggregateSM.addStateManager(memorySM, [], false);
    aggregateSM.addStateManager(asyncSM, [_AppTypes__WEBPACK_IMPORTED_MODULE_9__.STATE_NAMES.recentUserSearches, _AppTypes__WEBPACK_IMPORTED_MODULE_9__.STATE_NAMES.boardGames, _AppTypes__WEBPACK_IMPORTED_MODULE_9__.STATE_NAMES.scores], false);
    this.stateManager = aggregateSM; // state listener

    this.stateChanged = this.stateChanged.bind(this);
    this.stateChangedItemAdded = this.stateChangedItemAdded.bind(this);
    this.stateChangedItemRemoved = this.stateChangedItemRemoved.bind(this);
    this.stateChangedItemUpdated = this.stateChangedItemUpdated.bind(this); // call backs

    this.callbackBoardGameDetails = this.callbackBoardGameDetails.bind(this);
    this.callbackAddToCollection = this.callbackAddToCollection.bind(this);
    this.callbackRemoveFromCollection = this.callbackRemoveFromCollection.bind(this);
    this.callbackGetCollection = this.callbackGetCollection.bind(this); //event handlers

    this.addBoardGameToCollection = this.addBoardGameToCollection.bind(this);
    this.removeBoardGameFromCollection = this.removeBoardGameFromCollection.bind(this);
    this.removeBoardGameFromDisplay = this.removeBoardGameFromDisplay.bind(this); // further state management

    this.displayedBoardGamesStateManager = new _state_BrowserStorageStateManager__WEBPACK_IMPORTED_MODULE_11__["default"](true);
    return this;
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

    if (this.getLoggedInUserId() > 0) {
      // setup the chat system
      var chatManager = _socket_ChatManager__WEBPACK_IMPORTED_MODULE_6__.ChatManager.getInstance(); // this connects the manager to the socket system
      // setup the chat notification system

      _socket_NotificationController__WEBPACK_IMPORTED_MODULE_7__.NotificationController.getInstance();
      chatManager.setCurrentUser(this.getLoggedInUsername());
      _component_controller_ScoreSheetController__WEBPACK_IMPORTED_MODULE_12__.ScoreSheetController.getInstance().setCurrentUser(this.getLoggedInUsername()); // let the application view know about message counts

      chatManager.setUnreadCountListener(this.applicationView);
      chatManager.login(); // load the users

      this.getStateManager().getStateByName(_AppTypes__WEBPACK_IMPORTED_MODULE_9__.STATE_NAMES.users);
    }

    var currentGameList = this.displayedBoardGamesStateManager.getStateByName(_AppTypes__WEBPACK_IMPORTED_MODULE_9__.STATE_NAMES.boardGames);
    currentGameList = this.cleanupBoardGameState(currentGameList); // load board games from local storage if any

    this.applicationView.setState({
      boardGames: currentGameList
    }); // download the current board game collection

    this.downloadAndSyncSavedBoardGameCollection();
  };

  _proto.getStateManager = function getStateManager() {
    return this.stateManager;
  };

  _proto.isLoggedIn = function isLoggedIn() {
    var isLoggedIn = false;

    try {
      // @ts-ignore
      if (loggedInUserId) {
        isLoggedIn = true;
      }
    } catch (error) {}

    return isLoggedIn;
  };

  _proto.getLoggedInUserId = function getLoggedInUserId() {
    var result = -1;

    try {
      // @ts-ignore
      if (loggedInUserId) {
        // @ts-ignore
        result = loggedInUserId;
      }
    } catch (error) {}

    cLoggerDetail("Logged in user id is " + result);
    return result;
  };

  _proto.getLoggedInUsername = function getLoggedInUsername() {
    var result = '';

    try {
      // @ts-ignore
      if (loggedInUsername) {
        // @ts-ignore
        result = loggedInUsername;
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

  _proto.stateChanged = function stateChanged(managerName, name, values) {} // Data logic
  ;

  _proto.addBoardGameToDisplay = function addBoardGameToDisplay(boardGame) {
    // this will just the basics of a board game from the search then click/dragged over
    cLogger("Handling addition of board game");
    cLogger(boardGame); // don't add if already in the users display

    var currentListOfGames = this.applicationView.state.boardGames;
    var index = currentListOfGames.findIndex(function (value) {
      return value.gameId === boardGame.gameId;
    });

    if (index >= 0) {
      cLogger("Board game in display already");
      return;
    } // start with what we have and let the main view know, but mark it incomplete for partial rendering with user information


    boardGame.decorator = _AppTypes__WEBPACK_IMPORTED_MODULE_9__.Decorator.Incomplete;
    currentListOfGames.push(boardGame);
    cLogger("Adding received board game to application");
    cLogger(boardGame);
    this.displayedBoardGamesStateManager.setStateByName(_AppTypes__WEBPACK_IMPORTED_MODULE_9__.STATE_NAMES.boardGames, currentListOfGames, false);
    this.applicationView.setState({
      boardGames: currentListOfGames
    }); // now we need an API call to fill in the details

    _network_DownloadManager__WEBPACK_IMPORTED_MODULE_10__["default"].getInstance().addQLApiRequest(_AppTypes__WEBPACK_IMPORTED_MODULE_9__.API_Config.graphQL, _AppTypes__WEBPACK_IMPORTED_MODULE_9__.API_Config.bggSearchCallById.queryString, {
      gameId: boardGame.gameId
    }, this.callbackBoardGameDetails, _AppTypes__WEBPACK_IMPORTED_MODULE_9__.STATE_NAMES.boardGames, false);
  };

  _proto.callbackBoardGameDetails = function callbackBoardGameDetails(data, status, associatedStateName) {
    cLogger("callback for bgg search for single board game " + associatedStateName + " with status " + status);

    if (status >= 200 && status <= 299) {
      // do we have any data?
      cLogger(data);
      var boardGameDetails = data.data[_AppTypes__WEBPACK_IMPORTED_MODULE_9__.API_Config.bggSearchCallById.resultName];
      cLogger(boardGameDetails);
      var regex = /&#10;/g;
      boardGameDetails.description = boardGameDetails.description.replace(regex, '\r\n');
      regex = /&ldquo;/g;
      boardGameDetails.description = boardGameDetails.description.replace(regex, '"');
      regex = /&rdquo;/g;
      boardGameDetails.description = boardGameDetails.description.replace(regex, '"');
      regex = /&quot;/g;
      boardGameDetails.description = boardGameDetails.description.replace(regex, '"');
      regex = /&mdash;/g;
      boardGameDetails.description = boardGameDetails.description.replace(regex, '"');
      var currentListOfGames = this.applicationView.state.boardGames;
      var index = currentListOfGames.findIndex(function (value) {
        return value.gameId === boardGameDetails.gameId;
      });

      if (index >= 0) {
        cLogger("Updating application state");
        currentListOfGames.splice(index, 1, boardGameDetails);
        cLogger(currentListOfGames);
        boardGameDetails.decorator = _AppTypes__WEBPACK_IMPORTED_MODULE_9__.Decorator.PersistedLocally;
        this.displayedBoardGamesStateManager.setStateByName(_AppTypes__WEBPACK_IMPORTED_MODULE_9__.STATE_NAMES.boardGames, currentListOfGames, false);
        this.applicationView.setState({
          boardGames: currentListOfGames
        });
      } else {
        cLogger("Board game " + boardGameDetails.id + " not found in current state");
      }
    }
  };

  _proto.callbackAddToCollection = function callbackAddToCollection(data, status, associatedStateName) {
    var _this = this;

    cLogger("callback for add single board game " + associatedStateName + " to my collection with status " + status);

    if (status >= 200 && status <= 299) {
      // do we have any data?
      cLogger(data);
      var id = data.data[_AppTypes__WEBPACK_IMPORTED_MODULE_9__.API_Config.addToMyCollection.resultName];
      cLogger(id); // Find and update the board game in the state

      var currentGameList = this.applicationView.state.boardGames;
      var index = currentGameList.findIndex(function (game) {
        return game.gameId === id.gameId;
      });

      if (index >= 0) {
        var updatingBoardGame = currentGameList[index];
        cLogger("Updating board game " + updatingBoardGame.gameId + " with database id " + id.id + " and new Persisted state");
        updatingBoardGame.decorator = _AppTypes__WEBPACK_IMPORTED_MODULE_9__.Decorator.Persisted;
        updatingBoardGame.id = id.id;

        if (updatingBoardGame.scoresheets) {
          var cb = function cb(data, status, associatedStateName) {}; // add the scoresheets to database


          updatingBoardGame.scoresheets.forEach(function (scoreSheet) {
            _this.convertScoreSheetToApiCallFormat(scoreSheet);

            _network_DownloadManager__WEBPACK_IMPORTED_MODULE_10__["default"].getInstance().addQLApiRequest(_AppTypes__WEBPACK_IMPORTED_MODULE_9__.API_Config.graphQL, _AppTypes__WEBPACK_IMPORTED_MODULE_9__.API_Config.addScoreSheetToBoardGame.queryString, {
              userId: _this.getCurrentUser(),
              boardGameId: updatingBoardGame.id,
              sheet: scoreSheet
            }, cb, _AppTypes__WEBPACK_IMPORTED_MODULE_9__.STATE_NAMES.scoreSheet, false);

            _this.convertScoreSheetToDatabaseFormat(scoreSheet);

            scoreSheet.decorator = _AppTypes__WEBPACK_IMPORTED_MODULE_9__.Decorator.Persisted;
          });
        }

        this.applicationView.setState({
          boardGames: currentGameList
        });
        this.displayedBoardGamesStateManager.updateItemInState(_AppTypes__WEBPACK_IMPORTED_MODULE_9__.STATE_NAMES.boardGames, updatingBoardGame, _util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_13__.isSameGame, false);
      }
    }
  };

  _proto.callbackRemoveFromCollection = function callbackRemoveFromCollection(data, status, associatedStateName) {
    cLogger("callback for remove single board game " + associatedStateName + " from my collection with status " + status);

    if (status >= 200 && status <= 299) {
      // do we have any data?
      cLogger(data);
      var id = data.data[_AppTypes__WEBPACK_IMPORTED_MODULE_9__.API_Config.removeFromMyCollection.resultName];
      cLogger(id);
    }
  };

  _proto.callbackGetCollection = function callbackGetCollection(data, status, associatedStateName) {
    var _this2 = this;

    cLogger("callback for getting my collection of board games " + associatedStateName + " to my collection with status " + status);

    if (status >= 200 && status <= 299) {
      // do we have any data?
      cLogger(data);
      var collectionData = data.data[_AppTypes__WEBPACK_IMPORTED_MODULE_9__.API_Config.getMyBoardGameCollection.resultName]; // loop through the collection data and see if it already exists in the state

      var currentGameList = this.applicationView.state.boardGames;
      cLoggerDetail("Starting with local state of " + currentGameList.length);
      collectionData.forEach(function (boardGame) {
        boardGame.decorator = _AppTypes__WEBPACK_IMPORTED_MODULE_9__.Decorator.Persisted;
        cLoggerDetail("Loading board game from collection ");
        cLoggerDetail(boardGame);

        _this2.decorateScoreSheets(boardGame);

        var index = currentGameList.findIndex(function (game) {
          return game.gameId === boardGame.gameId;
        });
        cLoggerDetail("have found the board game locally? " + (index >= 0));

        if (index >= 0) {
          var locallySaveBoardGame = currentGameList[index];
          cLoggerDetail("in current state, replacing"); // copy any locally saved score sheets to the database object

          _this2.copyLocallySavedScoreSheetsToBoardGame(boardGame, locallySaveBoardGame); // replace the current entry


          currentGameList.splice(index, 1, boardGame);
        } else {
          cLoggerDetail("not in current state, adding");
          currentGameList.push(boardGame);
        }
      });
      currentGameList = this.cleanupBoardGameState(currentGameList);
      cLoggerDetail("Ending with local state of " + currentGameList.length);
      this.applicationView.setState({
        boardGames: currentGameList
      });
      this.displayedBoardGamesStateManager.setStateByName(_AppTypes__WEBPACK_IMPORTED_MODULE_9__.STATE_NAMES.boardGames, currentGameList, false);
    }
  };

  _proto.scoreSheetAddedToBoardGame = function scoreSheetAddedToBoardGame(boardGame, scoreSheet) {
    var cb = function cb(data, status, associatedStateName) {};

    if (this.isLoggedIn() && boardGame.decorator && boardGame.decorator === _AppTypes__WEBPACK_IMPORTED_MODULE_9__.Decorator.Persisted) {
      //mutation addScore($userId: Int!, $boardGameId: Int!, $sheet: ScoreSheetInput) {addScoreSheetToBoardGame(userId: $userId, boardGameId: $boardGameId, sheet: $sheet){id}
      _network_DownloadManager__WEBPACK_IMPORTED_MODULE_10__["default"].getInstance().addQLApiRequest(_AppTypes__WEBPACK_IMPORTED_MODULE_9__.API_Config.graphQL, _AppTypes__WEBPACK_IMPORTED_MODULE_9__.API_Config.addScoreSheetToBoardGame.queryString, {
        userId: this.getCurrentUser(),
        boardGameId: boardGame.id,
        sheet: scoreSheet
      }, cb, _AppTypes__WEBPACK_IMPORTED_MODULE_9__.STATE_NAMES.scoreSheet, false);
      scoreSheet.decorator = _AppTypes__WEBPACK_IMPORTED_MODULE_9__.Decorator.Persisted;
    } else {
      scoreSheet.decorator = _AppTypes__WEBPACK_IMPORTED_MODULE_9__.Decorator.PersistedLocally;
    } // convert the scoresheet into the usual received format from the database


    this.convertScoreSheetToDatabaseFormat(scoreSheet);
    var currentListOfGames = this.applicationView.state.boardGames;
    var index = currentListOfGames.findIndex(function (value) {
      return value.gameId === boardGame.gameId;
    });

    if (index >= 0) {
      var oldBoardGame = currentListOfGames[index];
      boardGame.decorator = oldBoardGame.decorator;
      cLogger("Updating application state");
      currentListOfGames.splice(index, 1, boardGame);
      cLogger(currentListOfGames);
      this.displayedBoardGamesStateManager.setStateByName(_AppTypes__WEBPACK_IMPORTED_MODULE_9__.STATE_NAMES.boardGames, currentListOfGames, false);
      this.applicationView.setState({
        boardGames: currentListOfGames
      });
    } else {
      cLogger("Board game " + boardGame.id + " not found in current state");
    }
  };

  _proto.scoreSheetRemovedFromBoardGame = function scoreSheetRemovedFromBoardGame(boardGame, scoreSheetId) {
    var cb = function cb(data, status, associatedStateName) {};

    if (this.isLoggedIn() && boardGame.decorator && boardGame.decorator === _AppTypes__WEBPACK_IMPORTED_MODULE_9__.Decorator.Persisted) {
      //mutation addScore($userId: Int!, $boardGameId: Int!, $sheet: ScoreSheetInput) {addScoreSheetToBoardGame(userId: $userId, boardGameId: $boardGameId, sheet: $sheet){id}
      _network_DownloadManager__WEBPACK_IMPORTED_MODULE_10__["default"].getInstance().addQLApiRequest(_AppTypes__WEBPACK_IMPORTED_MODULE_9__.API_Config.graphQL, _AppTypes__WEBPACK_IMPORTED_MODULE_9__.API_Config.removeScoreSheet.queryString, {
        sheetId: scoreSheetId
      }, cb, _AppTypes__WEBPACK_IMPORTED_MODULE_9__.STATE_NAMES.scoreSheet, false);
    }

    var currentListOfGames = this.applicationView.state.boardGames;
    var index = currentListOfGames.findIndex(function (value) {
      return value.gameId === boardGame.gameId;
    });

    if (index >= 0) {
      var oldBoardGame = currentListOfGames[index];
      boardGame.decorator = oldBoardGame.decorator;
      cLogger("Updating application state");
      currentListOfGames.splice(index, 1, boardGame);
      cLogger(currentListOfGames);
      this.displayedBoardGamesStateManager.setStateByName(_AppTypes__WEBPACK_IMPORTED_MODULE_9__.STATE_NAMES.boardGames, currentListOfGames, false);
      this.applicationView.setState({
        boardGames: currentListOfGames
      });
    } else {
      cLogger("Board game " + boardGame.id + " not found in current state");
    }
  };

  _proto.addBoardGameToCollection = function addBoardGameToCollection(event) {
    cLogger("Handling Add Board Game to collection");
    var boardGame = this.findBoardGameInStateFromEvent(event);

    if (boardGame) {
      if (boardGame.decorator) {
        switch (boardGame.decorator) {
          case _AppTypes__WEBPACK_IMPORTED_MODULE_9__.Decorator.Persisted:
            {
              // already in collection, nothing to do
              break;
            }

          case _AppTypes__WEBPACK_IMPORTED_MODULE_9__.Decorator.Incomplete:
            {
              // not ready to add to collection yet, do nothing
              break;
            }

          case _AppTypes__WEBPACK_IMPORTED_MODULE_9__.Decorator.PersistedLocally:
          case _AppTypes__WEBPACK_IMPORTED_MODULE_9__.Decorator.Complete:
            {
              // loaded and ready to save
              this.displayedBoardGamesStateManager.addNewItemToState(_AppTypes__WEBPACK_IMPORTED_MODULE_9__.STATE_NAMES.boardGames, boardGame, true); // add the board game to my collection
              // now we need an API call to fill in the details

              delete boardGame.decorator;
              delete boardGame.id;

              if (this.isLoggedIn()) {
                var scoreSheets = boardGame.scoresheets;
                delete boardGame.scoresheets;
                _network_DownloadManager__WEBPACK_IMPORTED_MODULE_10__["default"].getInstance().addQLApiRequest(_AppTypes__WEBPACK_IMPORTED_MODULE_9__.API_Config.graphQL, _AppTypes__WEBPACK_IMPORTED_MODULE_9__.API_Config.addToMyCollection.queryString, {
                  userId: this.getCurrentUser(),
                  boardGame: boardGame
                }, this.callbackAddToCollection, _AppTypes__WEBPACK_IMPORTED_MODULE_9__.STATE_NAMES.boardGames, true);
                boardGame.decorator = _AppTypes__WEBPACK_IMPORTED_MODULE_9__.Decorator.Complete;
                boardGame.scoresheets = scoreSheets;
              } else {
                boardGame.decorator = _AppTypes__WEBPACK_IMPORTED_MODULE_9__.Decorator.PersistedLocally;
              }

              break;
            }
        }
      }
    }
  };

  _proto.removeBoardGameFromCollection = function removeBoardGameFromCollection(boardGame) {
    // should be persisted
    cLogger("Handling Remove Board Game from collection with id " + boardGame.gameId);

    if (boardGame) {
      if (boardGame.decorator) {
        switch (boardGame.decorator) {
          case _AppTypes__WEBPACK_IMPORTED_MODULE_9__.Decorator.PersistedLocally:
          case _AppTypes__WEBPACK_IMPORTED_MODULE_9__.Decorator.Persisted:
            {
              // already in collection,
              this.removeBoardGameFromState(boardGame);

              if (this.isLoggedIn()) {
                _network_DownloadManager__WEBPACK_IMPORTED_MODULE_10__["default"].getInstance().addQLApiRequest(_AppTypes__WEBPACK_IMPORTED_MODULE_9__.API_Config.graphQL, _AppTypes__WEBPACK_IMPORTED_MODULE_9__.API_Config.removeFromMyCollection.queryString, {
                  userId: this.getCurrentUser(),
                  boardGameId: boardGame.gameId
                }, this.callbackRemoveFromCollection, _AppTypes__WEBPACK_IMPORTED_MODULE_9__.STATE_NAMES.boardGames, false);
              }

              break;
            }

          case _AppTypes__WEBPACK_IMPORTED_MODULE_9__.Decorator.Incomplete:
            {
              // not ready to add to collection yet, do nothing
              break;
            }

          case _AppTypes__WEBPACK_IMPORTED_MODULE_9__.Decorator.Complete:
            {
              // loaded and ready to save, but not yet saved, nothing to delete
              break;
            }
        }
      }
    }
  };

  _proto.removeBoardGameFromDisplay = function removeBoardGameFromDisplay(boardGame) {
    // shouldn't be persisted yet
    cLogger("Handling Remove Board Game from display " + boardGame.gameId);

    if (boardGame) {
      if (boardGame.decorator) {
        switch (boardGame.decorator) {
          case _AppTypes__WEBPACK_IMPORTED_MODULE_9__.Decorator.Incomplete:
            {
              // not ready to add to collection yet, do nothing
              break;
            }

          case _AppTypes__WEBPACK_IMPORTED_MODULE_9__.Decorator.Persisted:
          case _AppTypes__WEBPACK_IMPORTED_MODULE_9__.Decorator.PersistedLocally:
          case _AppTypes__WEBPACK_IMPORTED_MODULE_9__.Decorator.Complete:
            {
              // loaded and ready to save
              this.removeBoardGameFromState(boardGame);
              break;
            }
        }
      }
    }
  };

  _proto.cleanupBoardGameState = function cleanupBoardGameState(boardGames) {
    // lets tidy up any duplicates, keeping Persisted ones by preference
    var cleanedUpList = [];
    boardGames.forEach(function (boardGame) {
      // is already in the list?
      var index = cleanedUpList.findIndex(function (game) {
        return game.gameId === boardGame.gameId;
      });

      if (index >= 0) {
        // found in the list
        // is this a persisted board game?
        var existingListGame = cleanedUpList[index];

        if (existingListGame.decorator && existingListGame.decorator === _AppTypes__WEBPACK_IMPORTED_MODULE_9__.Decorator.Persisted) {// leave the persisted version in the cleaned up list
        } else {
          // do we have persisted game to replace the one in the list
          if (boardGame.decorator && boardGame.decorator === _AppTypes__WEBPACK_IMPORTED_MODULE_9__.Decorator.Persisted) {
            // replace the existing one with this one
            cleanedUpList.splice(index, 1, boardGame);
          } else {// just leave the one there, neither are persisted to a database
          }
        }
      } else {
        // not found yet, add to list
        cleanedUpList.push(boardGame);
      }
    });
    return cleanedUpList;
  };

  _proto.downloadAndSyncSavedBoardGameCollection = function downloadAndSyncSavedBoardGameCollection() {
    if (this.isLoggedIn()) {
      // start the call to retrieve the saved collection of board games
      _network_DownloadManager__WEBPACK_IMPORTED_MODULE_10__["default"].getInstance().addQLApiRequest(_AppTypes__WEBPACK_IMPORTED_MODULE_9__.API_Config.graphQL, _AppTypes__WEBPACK_IMPORTED_MODULE_9__.API_Config.getMyBoardGameCollection.queryString, {
        userId: this.getLoggedInUserId()
      }, this.callbackGetCollection, _AppTypes__WEBPACK_IMPORTED_MODULE_9__.STATE_NAMES.boardGames, false);
    }
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

  _proto.removeBoardGameFromState = function removeBoardGameFromState(boardGame) {
    var currentBoardGamesOnDisplay = this.applicationView.state.boardGames;
    var index = currentBoardGamesOnDisplay.findIndex(function (game) {
      return game.gameId === boardGame.gameId;
    });

    if (index >= 0) {
      currentBoardGamesOnDisplay.splice(index, 1);
      this.applicationView.setState({
        boardGames: currentBoardGamesOnDisplay
      });
    } // save locally


    this.displayedBoardGamesStateManager.setStateByName(_AppTypes__WEBPACK_IMPORTED_MODULE_9__.STATE_NAMES.boardGames, currentBoardGamesOnDisplay, false);
  };

  _proto.findBoardGameInStateFromEvent = function findBoardGameInStateFromEvent(event) {
    var boardGame = null;
    cLoggerDetail("Finding board game id in event"); // @ts-ignore

    var id = event.target.getAttribute(Controller.eventDataKeyId);
    cLoggerDetail(id);

    if (id) {
      // find the entry from the state manager
      id = parseInt(id); // @ts-ignore

      var currentBoardGamesOnDisplay = this.applicationView.state.boardGames;
      var index = currentBoardGamesOnDisplay.findIndex(function (game) {
        return game.gameId === id;
      });
      cLoggerDetail(index);

      if (index >= 0) {
        boardGame = currentBoardGamesOnDisplay[index];
      }
    }

    cLoggerDetail(boardGame);
    return boardGame;
  };

  _proto.decorateScoreSheets = function decorateScoreSheets(boardGame) {
    if (boardGame) {
      if (boardGame.scoresheets) {
        boardGame.scoresheets.forEach(function (sheet) {
          sheet.decorator = _AppTypes__WEBPACK_IMPORTED_MODULE_9__.Decorator.Persisted;
        });
      } else {
        boardGame.scoresheets = [];
      }
    }
  };

  _proto.copyLocallySavedScoreSheetsToBoardGame = function copyLocallySavedScoreSheetsToBoardGame(target, source) {
    var _this3 = this;

    if (source.scoresheets) {
      var toSave = [];
      source.scoresheets.forEach(function (sheet) {
        // is the scoresheet already in the target?
        var index = target.scoresheets.findIndex(function (item) {
          return item.id === sheet.id;
        });

        if (index < 0) {
          sheet.decorator = _AppTypes__WEBPACK_IMPORTED_MODULE_9__.Decorator.PersistedLocally;
          target.scoresheets.push(sheet);
          toSave.push(sheet);
        }
      }); // do we have any sheets to save?

      if (toSave.length > 0) {
        var cb = function cb(data, status, associatedStateName) {};

        toSave.forEach(function (sheetToSave) {
          _this3.convertScoreSheetToApiCallFormat(sheetToSave);

          _network_DownloadManager__WEBPACK_IMPORTED_MODULE_10__["default"].getInstance().addQLApiRequest(_AppTypes__WEBPACK_IMPORTED_MODULE_9__.API_Config.graphQL, _AppTypes__WEBPACK_IMPORTED_MODULE_9__.API_Config.addScoreSheetToBoardGame.queryString, {
            userId: _this3.getCurrentUser(),
            boardGameId: target.id,
            sheet: sheetToSave
          }, cb, _this3.config.stateNames.scoreSheet, false);

          _this3.convertScoreSheetToDatabaseFormat(sheetToSave);

          sheetToSave.decorator = _AppTypes__WEBPACK_IMPORTED_MODULE_9__.Decorator.Persisted;
        });
      }
    }
  };

  _proto.convertScoreSheetToDatabaseFormat = function convertScoreSheetToDatabaseFormat(scoreSheet) {
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
  };

  _proto.convertScoreSheetToApiCallFormat = function convertScoreSheetToApiCallFormat(scoreSheet) {
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
  };

  _proto.handleShowChat = function handleShowChat(roomName) {
    this.applicationView.handleShowChat(roomName);
  };

  return Controller;
}();

Controller.eventDataKeyId = 'board-game-id';
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

/***/ "./src/component/controller/CallManager.ts":
/*!*************************************************!*\
  !*** ./src/component/controller/CallManager.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CallManager": () => (/* binding */ CallManager)
/* harmony export */ });
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util/BrowserUtil */ "./src/util/BrowserUtil.ts");
/* harmony import */ var _Controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Controller */ "./src/Controller.ts");
/* harmony import */ var _view_ScoreSheetDetailView__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../view/ScoreSheetDetailView */ "./src/component/view/ScoreSheetDetailView.ts");




var callLogger = debug__WEBPACK_IMPORTED_MODULE_0___default()('call-manager');
var CallManager = /*#__PURE__*/function () {
  CallManager.getInstance = function getInstance() {
    if (!CallManager._instance) {
      CallManager._instance = new CallManager();
    }

    return CallManager._instance;
  };

  function CallManager() {
    this.peer = null;
    this.webrtcDiv = null;
    this.myVideoStream = null;
    this.myVideo = null;
    this.callUser = this.callUser.bind(this);
    this.currentUserList = [];
  }

  var _proto = CallManager.prototype;

  _proto.startPeerConnection = function startPeerConnection() {
    if (_Controller__WEBPACK_IMPORTED_MODULE_2__["default"].getInstance().isLoggedIn()) {
      // @ts-ignore  - is for the WebRTC peer via Nodejs
      this.peer = new Peer(_Controller__WEBPACK_IMPORTED_MODULE_2__["default"].getInstance().getLoggedInUsername(), {
        path: '/peerjs',
        host: '/',
        debug: 2,
        secure: true
      }); //this.peer = new Peer(Controller.getInstance().getLoggedInUsername(), {path: '/peerjs', host: '/', port: '3000', debug:1, secure:false});

      this.peer.on('open', function (id) {
        callLogger('My peer ID is: ' + id);
      });
    }
  };

  _proto.initialise = function initialise() {
    this.startPeerConnection(); // @ts-ignore

    this.webrtcDiv = document.getElementById(_view_ScoreSheetDetailView__WEBPACK_IMPORTED_MODULE_3__.ScoreSheetDetailView.ScoreSheetDom.webrtc); //this.reset();
  };

  _proto.startScoreSheet = function startScoreSheet() {
    var _this = this;

    try {
      if (_Controller__WEBPACK_IMPORTED_MODULE_2__["default"].getInstance().isLoggedIn()) {
        if (navigator.mediaDevices.getUserMedia) {
          callLogger('Starting scoresheet stream');
          navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
          }).then(function (stream) {
            callLogger('Scoresheet stream started - adding video element');
            _this.myVideoStream = stream;

            _this.addVideoStream(_Controller__WEBPACK_IMPORTED_MODULE_2__["default"].getInstance().getLoggedInUsername(), _this.myVideoStream, true);
          });
        }
      }
    } catch (err) {
      callLogger(err);
      callLogger("Non-secure context or no camera capability");
    }
  };

  _proto.reset = function reset() {
    var _this2 = this;

    callLogger('Reset');

    if (this.currentUserList && this.currentUserList.length > 0) {
      callLogger('Removing previous users');
      this.currentUserList.forEach(function (user) {
        callLogger('Removing previous user ${user}');

        _this2.removeUser(user);
      });
    }

    if (this.webrtcDiv) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].removeAllChildren(this.webrtcDiv);
    this.currentUserList = [];

    if (this.peer) {
      callLogger('Stopping video stream'); //this.peer.disconnect();

      if (this.myVideoStream) {
        this.myVideoStream.getTracks().forEach(function (track) {
          return track.stop();
        });
      }

      if (this.myVideo) this.myVideo.srcObject = null;
      this.myVideoStream = null;
    }
  };

  _proto.addVideoStream = function addVideoStream(username, stream, isCurrentUser) {
    var _this3 = this;

    if (isCurrentUser === void 0) {
      isCurrentUser = false;
    } // check to see if they are already there


    var index = this.currentUserList.findIndex(function (user) {
      return user === username;
    });
    if (index >= 0) return;
    this.currentUserList.push(username);
    var videoCardHolder = document.createElement('div');
    videoCardHolder.setAttribute("id", username);
    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addRemoveClasses(videoCardHolder, 'col-sm-12 col-md-4 col-lg-3');
    var videoCard = document.createElement('div');
    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addRemoveClasses(videoCard, 'card');
    var videoCardTitle = document.createElement('div');
    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addRemoveClasses(videoCardTitle, 'card-header');
    videoCardTitle.innerHTML = "<h5 class=\"card-title\">" + username + "</h5>";
    var videoCardBody = document.createElement('div');
    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addRemoveClasses(videoCardBody, 'card-body p-0 text-center');
    var video = document.createElement('video');
    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addRemoveClasses(video, 'video ');
    videoCard.appendChild(videoCardTitle);
    videoCard.appendChild(videoCardBody);
    videoCardBody.appendChild(video);

    if (isCurrentUser) {
      var videoCardFooter = document.createElement('div');
      _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addRemoveClasses(videoCardFooter, 'card-footer');
      var footerContent = document.createElement('div');
      _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addRemoveClasses(footerContent, 'd-flex w-100 justify-content-between mt-2');
      var stopVideoButton = document.createElement('button');
      stopVideoButton.setAttribute('type', 'button');
      _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addRemoveClasses(stopVideoButton, 'btn btn-circle btn-warning');
      stopVideoButton.innerHTML = '<i class="fas fa-video-slash"></i>';
      var muteMicButton = document.createElement('button');
      muteMicButton.setAttribute('type', 'button');
      _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addRemoveClasses(muteMicButton, 'btn btn-circle btn-warning');
      muteMicButton.innerHTML = '<i class="fa fa-microphone"></i>';
      footerContent.appendChild(stopVideoButton);
      footerContent.appendChild(muteMicButton);
      videoCardFooter.appendChild(footerContent);
      videoCard.appendChild(videoCardFooter);
      stopVideoButton.addEventListener('click', function () {
        var isPaused = video.paused;

        if (isPaused) {
          try {
            video.play();
          } catch (error) {} // account for user with no video


          _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addRemoveClasses(stopVideoButton, 'btn-success', false);
          _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addRemoveClasses(stopVideoButton, 'btn-warning', true);
        } else {
          try {
            video.pause();
          } catch (error) {} // account for user with no video


          _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addRemoveClasses(stopVideoButton, 'btn-success', true);
          _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addRemoveClasses(stopVideoButton, 'btn-warning', false);
        }
      });
      muteMicButton.addEventListener('click', function () {
        var isMuted = video.muted;

        if (isMuted) {
          video.muted = false;
          _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addRemoveClasses(muteMicButton, 'btn-success', false);
          _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addRemoveClasses(muteMicButton, 'btn-warning', true);
        } else {
          video.muted = true;
          _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addRemoveClasses(muteMicButton, 'btn-success', true);
          _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addRemoveClasses(muteMicButton, 'btn-warning', false);
        }
      });
      this.myVideo = video;
    }

    videoCardHolder.appendChild(videoCard);
    video.srcObject = stream;
    video.addEventListener("loadedmetadata", function () {
      try {
        video.play();
      } catch (error) {} // account for user with no video


      if (_this3.webrtcDiv) _this3.webrtcDiv.append(videoCardHolder);
    });
  };

  _proto.callUser = function callUser(userId) {
    var _this4 = this;

    callLogger("Asked to call user " + userId);
    if (userId === _Controller__WEBPACK_IMPORTED_MODULE_2__["default"].getInstance().getLoggedInUsername()) return; // don't call ourself

    var numberOfAttempts = 0;
    var index = this.currentUserList.findIndex(function (user) {
      return user === userId;
    }); // don't call the same users

    if (index >= 0) return; // wait a small time for the sockets and peer to sync

    var interval = setInterval(function () {
      callLogger("Calling user " + userId);

      if (_this4.myVideoStream) {
        var call = _this4.peer.call(userId, _this4.myVideoStream);

        if (call) {
          call.on('stream', function (userVideoStream) {
            callLogger("User " + userId + " answered, showing stream");

            _this4.addVideoStream(userId, userVideoStream, false);
          });
          clearInterval(interval);
        } else {
          // try again shortly
          numberOfAttempts++;
          if (numberOfAttempts > 3) clearInterval(interval);
        }
      }
    }, 5000);
  };

  _proto.removeUser = function removeUser(userId) {
    callLogger("Asked to remove user " + userId);
    var index = this.currentUserList.findIndex(function (user) {
      return user === userId;
    });

    if (index >= 0) {
      this.currentUserList.splice(index, 1);
    }

    var userVideoCard = document.getElementById(userId);

    if (userVideoCard) {
      callLogger("Asked to remove user " + userId + " - removing video element");
      var videoEl = userVideoCard.querySelector(".video");

      if (videoEl) {
        videoEl.srcObject = null;
      }

      _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].removeAllChildren(userVideoCard);
      var parentNode = userVideoCard.parentNode;
      if (parentNode) parentNode.removeChild(userVideoCard);
    }
  };

  _proto.prepareToAnswerCallFrom = function prepareToAnswerCallFrom(userId) {
    var _this5 = this;

    try {
      if (_Controller__WEBPACK_IMPORTED_MODULE_2__["default"].getInstance().isLoggedIn()) {
        callLogger("Preparing to answer call from " + userId);

        if (navigator.mediaDevices.getUserMedia) {
          navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
          }).then(function (stream) {
            _this5.myVideoStream = stream;

            _this5.addVideoStream(_Controller__WEBPACK_IMPORTED_MODULE_2__["default"].getInstance().getLoggedInUsername(), _this5.myVideoStream, true);

            callLogger("Awaiting call from " + userId);

            _this5.peer.on('call', function (call) {
              callLogger("Answering call from " + userId);
              call.answer(_this5.myVideoStream);
              call.on('stream', function (userVideoStream) {
                alert("Answered");
                callLogger("Have answered, showing stream");

                _this5.addVideoStream(userId, userVideoStream, false);
              });
            });
          });
        }
      }
    } catch (err) {
      callLogger(err);
      callLogger("Insecure context or no video capability");
    }
  };

  return CallManager;
}();

/***/ }),

/***/ "./src/component/controller/ScoreSheetController.ts":
/*!**********************************************************!*\
  !*** ./src/component/controller/ScoreSheetController.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ScoreSheetController": () => (/* binding */ ScoreSheetController)
/* harmony export */ });
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _socket_Types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../socket/Types */ "./src/socket/Types.ts");
/* harmony import */ var _notification_NotificationManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../notification/NotificationManager */ "./src/notification/NotificationManager.ts");
/* harmony import */ var _view_ScoreSheetDetailView__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../view/ScoreSheetDetailView */ "./src/component/view/ScoreSheetDetailView.ts");
/* harmony import */ var _AppTypes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../AppTypes */ "./src/AppTypes.ts");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");
/* harmony import */ var _socket_ChatManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../socket/ChatManager */ "./src/socket/ChatManager.ts");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _Controller__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../Controller */ "./src/Controller.ts");
/* harmony import */ var _template_TemplateManager__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../template/TemplateManager */ "./src/template/TemplateManager.ts");
/* harmony import */ var _CallManager__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./CallManager */ "./src/component/controller/CallManager.ts");
/* harmony import */ var _state_MemoryBufferStateManager__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../state/MemoryBufferStateManager */ "./src/state/MemoryBufferStateManager.ts");
/* harmony import */ var _socket_SocketManager__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../socket/SocketManager */ "./src/socket/SocketManager.ts");













var sscLogger = debug__WEBPACK_IMPORTED_MODULE_0___default()('score-sheet-controller');
var ScoreSheetController = /*#__PURE__*/function () {
  ScoreSheetController.getInstance = function getInstance() {
    if (!ScoreSheetController._instance) {
      ScoreSheetController._instance = new ScoreSheetController();
    }

    return ScoreSheetController._instance;
  };

  function ScoreSheetController() {
    this.applicationView = null;
    this.currentScoreRoom = null;
    this.currentlySelectedBoardGame = null;
    this.currentScoreSheet = null;
    this.currentUsername = '';
    this.isRoomCreator = false;
    this.currentUsersInScoreSheet = [];
    this.intervalTimer = -1;
    this.stateManager = new _state_MemoryBufferStateManager__WEBPACK_IMPORTED_MODULE_10__["default"]();
    _socket_SocketManager__WEBPACK_IMPORTED_MODULE_11__["default"].getInstance().addChatReceiver(this); // bind events

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
    this.reset = this.reset.bind(this); // reset state

    this.reset();
  }

  var _proto = ScoreSheetController.prototype;

  _proto.isTimerGoing = function isTimerGoing() {
    var result = false;

    if (this.currentScoreSheet) {
      result = this.currentScoreSheet.timerGoing;
    }

    return result;
  };

  _proto.getStateManager = function getStateManager() {
    return this.stateManager;
  };

  _proto.getCurrentRoom = function getCurrentRoom() {
    return this.currentScoreRoom;
  };

  _proto.receiveLogin = function receiveLogin(username) {};

  _proto.receiveLogout = function receiveLogout(username) {};

  _proto.setCurrentUser = function setCurrentUser(username) {
    sscLogger("Setting current user " + username);
    this.currentUsername = username;
  };

  _proto.getCurrentUser = function getCurrentUser() {
    return this.currentUsername;
  };

  _proto.initialise = function initialise(applicationView) {
    this.applicationView = applicationView;
    _CallManager__WEBPACK_IMPORTED_MODULE_9__.CallManager.getInstance().initialise();
  };

  _proto.receiveInvitation = function receiveInvitation(invite) {
    if (!this.isLoggedIn()) return; // we are not logged in

    if (invite.type !== _socket_Types__WEBPACK_IMPORTED_MODULE_1__.InviteType.ScoreSheet) return; //ignore non-score sheets

    if (_socket_ChatManager__WEBPACK_IMPORTED_MODULE_5__.ChatManager.getInstance().isUserInBlockedList(invite.from)) {
      sscLogger("Received invite from blocked user - ignoring");
      return;
    } // are we already in a scoresheet?


    if (this.currentScoreSheet) {
      sscLogger("Received invite - already in score sheet - declining"); // are we already in this score sheet?

      if (this.currentScoreSheet.room !== invite.room) {
        // decline the invite, only one score sheet at a time
        sscLogger("Received invite - already in score sheet - declining");
        _socket_SocketManager__WEBPACK_IMPORTED_MODULE_11__["default"].getInstance().sendDeclineInvite(invite.room, this.getCurrentUser(), _socket_Types__WEBPACK_IMPORTED_MODULE_1__.InviteType.ScoreSheet); // user declines to join the scoresheet

        return;
      }
    }

    if (invite.requiresAcceptDecline) {
      // notify the user of the invitation
      if (!confirm("You have been invited by user " + invite.from + " to joint a chat room for the board game " + invite.subject + " score sheet")) {
        _socket_SocketManager__WEBPACK_IMPORTED_MODULE_11__["default"].getInstance().sendDeclineInvite(invite.room, this.getCurrentUser(), _socket_Types__WEBPACK_IMPORTED_MODULE_1__.InviteType.ScoreSheet); // user declines to join the scoresheet

        return;
      }
    } // prepare to receive a call


    _CallManager__WEBPACK_IMPORTED_MODULE_9__.CallManager.getInstance().prepareToAnswerCallFrom(invite.from); // notify the user of the new chat

    _notification_NotificationManager__WEBPACK_IMPORTED_MODULE_2__["default"].getInstance().show('Score Sheet', "Joining score sheet", 'info', 7000);
    _socket_SocketManager__WEBPACK_IMPORTED_MODULE_11__["default"].getInstance().joinChat(this.getCurrentUser(), invite.room, _socket_Types__WEBPACK_IMPORTED_MODULE_1__.InviteType.ScoreSheet);
    this.currentScoreRoom = invite.room;
    this.currentlySelectedBoardGame = invite.attachment.boardGame;
    this.currentScoreSheet = invite.attachment.scoreSheet;
    _Controller__WEBPACK_IMPORTED_MODULE_7__["default"].getInstance().addBoardGameToDisplay(invite.attachment.boardGame); // check to see if the timer should be going

    if (this.isTimerGoing()) {
      this.stopTimerStoppedByAnotherUser();
      this.startTimer();
    } // ask the view to initialise with these values


    _view_ScoreSheetDetailView__WEBPACK_IMPORTED_MODULE_3__.ScoreSheetDetailView.getInstance().stateChanged("", "", this.currentScoreSheet); // change to the score sheet

    this.applicationView.handleShowScoreSheet(null);
  };

  _proto.getSelectedBoardGame = function getSelectedBoardGame() {
    return this.currentlySelectedBoardGame;
  };

  _proto.receiveQueuedMessages = function receiveQueuedMessages(messages) {
    var _this = this;

    if (!this.isLoggedIn()) return; // we are not logged in

    if (!this.currentScoreRoom) return; // we are not in a room

    messages.forEach(function (message) {
      if (message.type === _socket_Types__WEBPACK_IMPORTED_MODULE_1__.InviteType.ScoreSheet) {
        // only process offline messages for scoresheet and our current room
        if (_this.currentScoreRoom === message.room) {
          _this.receiveMessage(message);
        }
      }
    });
  };

  _proto.receiveQueuedInvites = function receiveQueuedInvites(invites) {
    var _this2 = this;

    if (!this.isLoggedIn()) return; // we are not logged in

    invites.forEach(function (invite) {
      if (invite.type === _socket_Types__WEBPACK_IMPORTED_MODULE_1__.InviteType.ScoreSheet) {
        // only process offline invites to scoresheet
        _this2.receiveInvitation(invite);
      }
    });
  };

  _proto.receiveDecline = function receiveDecline(room, username, type) {
    if (type !== _socket_Types__WEBPACK_IMPORTED_MODULE_1__.InviteType.ScoreSheet) return; //ignore non-score sheets

    sscLogger("Receive decline for room " + room + " from " + username);

    if (this.currentScoreRoom) {
      if (this.currentScoreRoom === room) {
        _notification_NotificationManager__WEBPACK_IMPORTED_MODULE_2__["default"].getInstance().show('Score Sheet', "User " + username + " declined the invitation.", 'warning');
      }
    }
  };

  _proto.receiveJoinedRoom = function receiveJoinedRoom(users) {
    if (users.type !== _socket_Types__WEBPACK_IMPORTED_MODULE_1__.InviteType.ScoreSheet) return; //ignore non-score sheets

    if (!this.isLoggedIn()) return; // we are not logged in

    if (users.username === this.getCurrentUser()) return;
    if (this.currentScoreRoom !== users.room) return;
    sscLogger("Handling user joined " + users.username); // update the sheet to include the user

    var index = this.currentUsersInScoreSheet.findIndex(function (username) {
      return username === users.username;
    });

    if (index < 0) {
      this.currentUsersInScoreSheet.push(users.username); // update the sheet data
      // the owner of the sheet should send a sync message of the data

      if (this.currentScoreSheet) this.saveCurrentScoreSheet(this.currentScoreSheet);
    }

    if (this.isRoomCreator && this.currentScoreSheet) {
      sscLogger("Handling user joined " + users.username + " - sending");
      this.addUserToScoreSheet(users.username);
      this.sendScoreSheetState(this.currentScoreSheet, false);
    }

    _notification_NotificationManager__WEBPACK_IMPORTED_MODULE_2__["default"].getInstance().show(this.currentlySelectedBoardGame.name, "User " + users.username + " joined the scoresheet.", 'message', 120000);
  };

  _proto.receivedLeftRoom = function receivedLeftRoom(users) {
    if (users.type !== _socket_Types__WEBPACK_IMPORTED_MODULE_1__.InviteType.ScoreSheet) return; //ignore non-score sheets

    if (!this.isLoggedIn()) return; // we are not logged in

    if (users.username === this.getCurrentUser()) return;
    if (this.currentScoreRoom !== users.room) return; // update the sheet to remove the user

    sscLogger("Handling user left " + users.username);
    var index = this.currentUsersInScoreSheet.findIndex(function (username) {
      return username === users.username;
    });

    if (index >= 0) {
      this.currentUsersInScoreSheet.splice(index, 1); // update the sheet data

      this.removeUserFromScoreSheet(users.username); // the owner of the sheet should send a sync message of the data

      if (this.currentScoreSheet) this.saveCurrentScoreSheet(this.currentScoreSheet);
    }

    if (this.isRoomCreator && this.currentScoreSheet) {
      sscLogger("Handling user left " + users.username + " - sending");
      this.sendScoreSheetState(this.currentScoreSheet, false);
    }

    _notification_NotificationManager__WEBPACK_IMPORTED_MODULE_2__["default"].getInstance().show(this.currentlySelectedBoardGame.name, "User " + users.username + " left the scoresheet.", 'warning', 100000);
  };

  _proto.receiveUserList = function receiveUserList(users) {} // will be managed in the transfer of sheet data
  ;

  _proto.endScoreSheet = function endScoreSheet() {
    // this can only be done by the room creator
    // send the final score to everyone
    sscLogger("Handling end of score sheet");
    if (this.isRoomCreator && this.currentScoreSheet) this.saveScoreSheetToBoardGame(this.currentScoreSheet);

    if (this.isLoggedIn()) {
      if (this.currentScoreRoom && this.currentScoreSheet) {
        sscLogger("Handling end of score sheet - sending");
        this.sendScoreSheetState(this.currentScoreSheet, true); // if we are logged in and the scoresheet creator then we need to save the score sheet to the selected board game
      } // close the room


      this.leave();
    } // reset the controller


    this.reset();
    this.applicationView.switchBetweenCollectionAndScoreSheet(true);
  };

  _proto.startScoreSheet = function startScoreSheet(boardGame) {
    if (boardGame) {
      sscLogger("Starting score sheet for " + boardGame.name);
      this.currentlySelectedBoardGame = boardGame;
      if (this.isLoggedIn()) this.currentUsersInScoreSheet = [this.getCurrentUser()];
      this.isRoomCreator = true;
      this.currentScoreRoom = (0,uuid__WEBPACK_IMPORTED_MODULE_12__["default"])();
      this.currentScoreSheet = {
        room: this.currentScoreRoom,
        boardGameName: boardGame.name,
        sheetLayoutOptions: _template_TemplateManager__WEBPACK_IMPORTED_MODULE_8__.TemplateManager.getInstance().getScoreSheetTemplate(boardGame),
        timer: 0,
        timerGoing: false,
        data: _template_TemplateManager__WEBPACK_IMPORTED_MODULE_8__.TemplateManager.getInstance().getScoreSheetStartingData(boardGame),
        isFinished: false
      };
      sscLogger(this.currentScoreSheet);
      _CallManager__WEBPACK_IMPORTED_MODULE_9__.CallManager.getInstance().startScoreSheet(); // store the score sheet locally

      this.stateManager.setStateByName(_AppTypes__WEBPACK_IMPORTED_MODULE_4__.STATE_NAMES.scoreSheet, this.currentScoreSheet, true); // start a new chat room, will automatically manage if logged in or not

      if (this.isLoggedIn()) _socket_SocketManager__WEBPACK_IMPORTED_MODULE_11__["default"].getInstance().joinChat(this.getCurrentUser(), this.currentScoreRoom, _socket_Types__WEBPACK_IMPORTED_MODULE_1__.InviteType.ScoreSheet);
    }
  };

  _proto.hasActiveScoreSheet = function hasActiveScoreSheet() {
    var result = false;

    if (this.currentScoreRoom && this.currentScoreRoom !== null) {
      sscLogger(this.currentScoreRoom);
      result = true;
    }

    return result;
  };

  _proto.inviteUser = function inviteUser(username) {
    if (!this.isLoggedIn()) return; // we are not logged in
    // only the user who created the score sheet can do this as they are the only ones with a selected board game

    if (this.currentScoreRoom && this.currentlySelectedBoardGame) {
      sscLogger("Inviting user " + username + " to score sheet");

      if (this.isRoomCreator) {
        _notification_NotificationManager__WEBPACK_IMPORTED_MODULE_2__["default"].getInstance().show(this.currentlySelectedBoardGame.name, "You have invited user " + username + " to the scoresheet", 'message');
        _socket_SocketManager__WEBPACK_IMPORTED_MODULE_11__["default"].getInstance().sendInvite(this.getCurrentUser(), username, this.currentScoreRoom, _socket_Types__WEBPACK_IMPORTED_MODULE_1__.InviteType.ScoreSheet, true, this.currentlySelectedBoardGame.name, {
          scoreSheet: this.currentScoreSheet,
          boardGame: this.currentlySelectedBoardGame
        });
      } else {
        alert("Only the score sheet creator can invite other users.");
      }
    }
  };

  _proto.receiveMessage = function receiveMessage(message) {
    sscLogger("'Handling receive message");
    sscLogger(message);
    if (!this.isLoggedIn()) return; // we are not logged in

    if (message.type !== _socket_Types__WEBPACK_IMPORTED_MODULE_1__.InviteType.ScoreSheet) return; //ignore non-score sheets

    if (message.from === this.getCurrentUser()) return; // my own messages can be ignored

    if (this.currentScoreRoom) {
      // are we in a room?
      if (this.currentScoreRoom === message.room) {
        // are we listening to this score sheet room?
        if (_socket_ChatManager__WEBPACK_IMPORTED_MODULE_5__.ChatManager.getInstance().isUserInBlockedList(message.from)) {
          sscLogger("Received message from blocked user - ignoring");
          return;
        } // are we scoring the right sheet?


        sscLogger("Received message for score sheet " + message.room);
        sscLogger(message);

        if (message.attachment) {
          // the attachment should be a ScoreSheet object
          var scoreSheet = message.attachment;
          sscLogger(scoreSheet); // @ts-ignore

          if (this.currentScoreSheet) {
            var timerWasGoing = this.currentScoreSheet.timerGoing;
            this.currentScoreSheet.room = message.room;
            this.currentScoreSheet.boardGameName = scoreSheet.boardGameName;
            this.currentScoreSheet.data = scoreSheet.data;
            this.currentScoreSheet.timer = scoreSheet.timer > this.currentScoreSheet.timer ? scoreSheet.timer : this.currentScoreSheet.timer;
            this.currentScoreSheet.timerGoing = scoreSheet.timerGoing;
            this.currentScoreSheet.sheetLayoutOptions = scoreSheet.sheetLayoutOptions;
            this.currentScoreSheet.isFinished = scoreSheet.isFinished; // has the timer changed?

            if (scoreSheet.timerGoing) {
              if (timerWasGoing) {// both timers going, no need to do anything
              } else {
                // timer is going with another user, but we aren't going - start timer
                this.stopTimerStoppedByAnotherUser();
                this.startTimer();
              }
            } else {
              // timer not going at the other users end
              if (timerWasGoing) {
                // our timer is active - pause it
                this.stopTimerStoppedByAnotherUser();
              } else {// neither timer going
              }
            }
          }

          sscLogger('Updated score sheet');
          sscLogger(this.currentScoreSheet); // save the new state

          if (this.currentScoreSheet) this.saveCurrentScoreSheet(this.currentScoreSheet, true);

          if (scoreSheet.isFinished) {
            alert('Score sheet has been finished - closing'); // reset the controller

            this.reset(); // close the room

            this.leave(); // reset the view

            _view_ScoreSheetDetailView__WEBPACK_IMPORTED_MODULE_3__.ScoreSheetDetailView.getInstance().resetDisplay();
            this.applicationView.switchBetweenCollectionAndScoreSheet(true);
          }
        }
      }
    }
  };

  _proto.isSheetOwner = function isSheetOwner() {
    return this.isRoomCreator;
  };

  _proto.createScoreSheetFromTable = function createScoreSheetFromTable() {
    var scoreSheet = null;
    var tableData = _view_ScoreSheetDetailView__WEBPACK_IMPORTED_MODULE_3__.ScoreSheetDetailView.getInstance().getTableData();

    if (this.currentScoreSheet && this.currentScoreRoom) {
      scoreSheet = {
        room: this.currentScoreRoom,
        data: tableData,
        boardGameName: this.currentlySelectedBoardGame.name,
        timer: this.currentScoreSheet.timer,
        sheetLayoutOptions: this.currentlySelectedBoardGame ? _template_TemplateManager__WEBPACK_IMPORTED_MODULE_8__.TemplateManager.getInstance().getScoreSheetTemplate(this.currentlySelectedBoardGame) : null,
        timerGoing: this.currentScoreSheet.timerGoing,
        isFinished: false
      };
    }

    return scoreSheet;
  };

  _proto.sendScoreSheetState = function sendScoreSheetState(scoreSheet, isFinished) {
    if (isFinished === void 0) {
      isFinished = false;
    }

    if (this.currentScoreRoom && this.isLoggedIn()) {
      var created = parseInt(moment__WEBPACK_IMPORTED_MODULE_6___default()().format('YYYYMMDDHHmmss')); // @ts-ignore

      _socket_SocketManager__WEBPACK_IMPORTED_MODULE_11__["default"].getInstance().sendMessage(this.getCurrentUser(), this.currentScoreRoom, 'data', created, _socket_Types__WEBPACK_IMPORTED_MODULE_1__.InviteType.ScoreSheet, _socket_Types__WEBPACK_IMPORTED_MODULE_1__.Priority.Normal, scoreSheet);
    }
  };

  _proto.startTimer = function startTimer() {
    var _this3 = this;

    sscLogger("Handling pause timer");
    if (!this.currentScoreSheet) return;
    this.currentScoreSheet.timerGoing = true; // @ts-ignore

    this.intervalTimer = setInterval(function () {
      if (_this3.currentScoreSheet && _this3.currentScoreSheet.timerGoing) {
        _this3.currentScoreSheet.timer++;
        _view_ScoreSheetDetailView__WEBPACK_IMPORTED_MODULE_3__.ScoreSheetDetailView.getInstance().updateTimer(_this3.currentScoreSheet.timer, !_this3.currentScoreSheet.timerGoing);
      } else {
        if (_this3.currentScoreSheet) {
          _this3.currentScoreSheet.timerGoing = false;
          _view_ScoreSheetDetailView__WEBPACK_IMPORTED_MODULE_3__.ScoreSheetDetailView.getInstance().updateTimer(_this3.currentScoreSheet.timer, !_this3.currentScoreSheet.timerGoing);
        }
      }
    }, 1000);

    if (this.currentScoreSheet) {
      this.saveCurrentScoreSheet(this.currentScoreSheet);
    }

    if (this.isLoggedIn() && this.currentScoreSheet) {
      // start the timer for everyone
      sscLogger("Handling pause timer - sending score sheet");
      this.sendScoreSheetState(this.currentScoreSheet, false);
    }
  };

  _proto.pauseTimer = function pauseTimer() {
    sscLogger("Handling pause timer");

    if (this.intervalTimer > 0) {
      clearInterval(this.intervalTimer);
      this.intervalTimer = -1;

      if (this.currentScoreSheet) {
        this.currentScoreSheet.timerGoing = false;
        this.saveCurrentScoreSheet(this.currentScoreSheet);
        _view_ScoreSheetDetailView__WEBPACK_IMPORTED_MODULE_3__.ScoreSheetDetailView.getInstance().updateTimer(this.currentScoreSheet.timer, !this.currentScoreSheet.timerGoing);
      } // ask everyone to pause their timers


      if (this.isLoggedIn() && this.currentScoreSheet) {
        sscLogger("Handling pause timer - updating all users");
        this.sendScoreSheetState(this.currentScoreSheet, false);
      }
    }
  };

  _proto.userChangedValue = function userChangedValue(value, source) {
    sscLogger("Handling user changed value " + source);
    if (source === ScoreSheetController.SOURCE_View) return; // is the source an edit?

    if (source !== 'edit') return;
    var scoreSheet = this.createScoreSheetFromTable();
    sscLogger("Handling user changed Value");
    sscLogger(value);
    sscLogger(scoreSheet);

    if (scoreSheet) {
      sscLogger("Letting the template manager change any values");
      var changedByTM = _template_TemplateManager__WEBPACK_IMPORTED_MODULE_8__.TemplateManager.getInstance().transformDataAfterUserChange(this.currentlySelectedBoardGame, scoreSheet);

      if (changedByTM) {
        sscLogger(scoreSheet);
      }

      this.saveCurrentScoreSheet(scoreSheet, changedByTM);

      if (this.isLoggedIn()) {
        sscLogger("Handling user change - updating all users");
        this.sendScoreSheetState(scoreSheet, false);
      }
    }
  };

  _proto.leave = function leave() {
    sscLogger("Handling user leaving");

    if (this.currentScoreSheet && this.currentScoreRoom) {
      if (this.isLoggedIn()) {
        _socket_SocketManager__WEBPACK_IMPORTED_MODULE_11__["default"].getInstance().leaveChat(this.getCurrentUser(), this.currentScoreRoom, _socket_Types__WEBPACK_IMPORTED_MODULE_1__.InviteType.ScoreSheet);
      }

      this.reset();
      this.applicationView.switchBetweenCollectionAndScoreSheet(true);
    }
  };

  _proto.addUserToScoreSheet = function addUserToScoreSheet(username) {
    if (_Controller__WEBPACK_IMPORTED_MODULE_7__["default"].getInstance().isLoggedIn()) {
      sscLogger("Calling user " + username);
      _CallManager__WEBPACK_IMPORTED_MODULE_9__.CallManager.getInstance().callUser(username);
    }
  };

  _proto.removeUserFromScoreSheet = function removeUserFromScoreSheet(username) {
    sscLogger("Removing user " + username);
    _CallManager__WEBPACK_IMPORTED_MODULE_9__.CallManager.getInstance().removeUser(username);
  };

  _proto.reset = function reset() {
    this.currentScoreRoom = null;
    this.currentScoreSheet = null;
    this.currentlySelectedBoardGame = null;
    this.isRoomCreator = false;
    this.currentUsersInScoreSheet = [];
    this.stopTimerStoppedByAnotherUser();
    _CallManager__WEBPACK_IMPORTED_MODULE_9__.CallManager.getInstance().reset();
  };

  _proto.isLoggedIn = function isLoggedIn() {
    return this.getCurrentUser().trim().length > 0;
  };

  _proto.saveScoreSheetToBoardGame = function saveScoreSheetToBoardGame(scoreSheet) {
    sscLogger('Handling save'); // add the data to the selected board game

    if (this.currentlySelectedBoardGame) {
      var saveData = _template_TemplateManager__WEBPACK_IMPORTED_MODULE_8__.TemplateManager.getInstance().getSaveData(this.currentlySelectedBoardGame, scoreSheet);
      sscLogger(saveData);

      if (!this.currentlySelectedBoardGame.scoresheets) {
        this.currentlySelectedBoardGame.scoresheets = [];
      }

      this.currentlySelectedBoardGame.scoresheets.push(saveData);
      _Controller__WEBPACK_IMPORTED_MODULE_7__["default"].getInstance().scoreSheetAddedToBoardGame(this.currentlySelectedBoardGame, saveData);
    }
  };

  _proto.saveCurrentScoreSheet = function saveCurrentScoreSheet(scoreSheet, informListeners) {
    if (informListeners === void 0) {
      informListeners = true;
    }

    this.currentScoreSheet = scoreSheet;
    this.stateManager.setStateByName(_AppTypes__WEBPACK_IMPORTED_MODULE_4__.STATE_NAMES.scoreSheet, this.currentScoreSheet, informListeners);
  };

  _proto.stopTimerStoppedByAnotherUser = function stopTimerStoppedByAnotherUser() {
    sscLogger("Handling timer stopped by another user");

    if (this.intervalTimer > 0) {
      clearInterval(this.intervalTimer);
      if (this.currentScoreSheet) _view_ScoreSheetDetailView__WEBPACK_IMPORTED_MODULE_3__.ScoreSheetDetailView.getInstance().updateTimer(this.currentScoreSheet.timer, true);
    }

    this.intervalTimer = -1;
  };

  return ScoreSheetController;
}();
ScoreSheetController.SOURCE_View = 'ssv';

/***/ }),

/***/ "./src/component/sidebar/BoardGameSearchSidebar.ts":
/*!*********************************************************!*\
  !*** ./src/component/sidebar/BoardGameSearchSidebar.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ui_framework_SidebarViewContainer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../ui-framework/SidebarViewContainer */ "./src/ui-framework/SidebarViewContainer.ts");
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




var BoardGameSearchSidebar = /*#__PURE__*/function (_SidebarViewContainer) {
  _inheritsLoose(BoardGameSearchSidebar, _SidebarViewContainer);

  function BoardGameSearchSidebar() {
    return _SidebarViewContainer.call(this, BoardGameSearchSidebar.BGGSEARCH_SidebarPrefs) || this;
  }

  return BoardGameSearchSidebar;
}(_ui_framework_SidebarViewContainer__WEBPACK_IMPORTED_MODULE_0__["default"]);

BoardGameSearchSidebar.BGGSEARCH_SidebarPrefs = {
  id: 'boardGameSearchSidebar',
  expandedSize: '35%',
  location: _ui_framework_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.SidebarLocation.left
};
BoardGameSearchSidebar.bggSearchResults = 'bggSearchResults';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BoardGameSearchSidebar);

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
/* harmony import */ var _ui_framework_SidebarViewContainer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../ui-framework/SidebarViewContainer */ "./src/ui-framework/SidebarViewContainer.ts");
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
}(_ui_framework_SidebarViewContainer__WEBPACK_IMPORTED_MODULE_0__["default"]);

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

/***/ "./src/component/sidebar/ScoreSheetsSidebar.ts":
/*!*****************************************************!*\
  !*** ./src/component/sidebar/ScoreSheetsSidebar.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ui_framework_SidebarViewContainer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../ui-framework/SidebarViewContainer */ "./src/ui-framework/SidebarViewContainer.ts");
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




var ScoreSheetsSidebar = /*#__PURE__*/function (_SidebarViewContainer) {
  _inheritsLoose(ScoreSheetsSidebar, _SidebarViewContainer);

  function ScoreSheetsSidebar() {
    return _SidebarViewContainer.call(this, ScoreSheetsSidebar.SidebarPrefs) || this;
  }

  return ScoreSheetsSidebar;
}(_ui_framework_SidebarViewContainer__WEBPACK_IMPORTED_MODULE_0__["default"]);

ScoreSheetsSidebar.SidebarPrefs = {
  id: 'scoreSheetSidebar',
  expandedSize: '40%',
  location: _ui_framework_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.SidebarLocation.bottom
};
ScoreSheetsSidebar.scoreSheets = 'scoreSheets';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ScoreSheetsSidebar);

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
/* harmony import */ var _ui_framework_SidebarViewContainer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../ui-framework/SidebarViewContainer */ "./src/ui-framework/SidebarViewContainer.ts");
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
}(_ui_framework_SidebarViewContainer__WEBPACK_IMPORTED_MODULE_0__["default"]);

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

/***/ "./src/component/view/BGGSearchView.ts":
/*!*********************************************!*\
  !*** ./src/component/view/BGGSearchView.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util/BrowserUtil */ "./src/util/BrowserUtil.ts");
/* harmony import */ var _network_DownloadManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../network/DownloadManager */ "./src/network/DownloadManager.ts");
/* harmony import */ var _state_MemoryBufferStateManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../state/MemoryBufferStateManager */ "./src/state/MemoryBufferStateManager.ts");
/* harmony import */ var _ui_framework_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../ui-framework/ConfigurationTypes */ "./src/ui-framework/ConfigurationTypes.ts");
/* harmony import */ var _ui_framework_AbstractListView__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../ui-framework/AbstractListView */ "./src/ui-framework/AbstractListView.ts");
/* harmony import */ var _AppTypes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../AppTypes */ "./src/AppTypes.ts");
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








var vLogger = debug__WEBPACK_IMPORTED_MODULE_0___default()('board-game-search-sidebar');
var vLoggerDetail = debug__WEBPACK_IMPORTED_MODULE_0___default()('board-game-search-sidebar:detail');

var BGGSearchView = /*#__PURE__*/function (_AbstractListView) {
  _inheritsLoose(BGGSearchView, _AbstractListView); // @ts-ignore
  // @ts-ignore
  // @ts-ignore


  function BGGSearchView() {
    var _this;

    _this = _AbstractListView.call(this, BGGSearchView.BGGSEARCH_ViewConfig, new _state_MemoryBufferStateManager__WEBPACK_IMPORTED_MODULE_3__["default"](), _AppTypes__WEBPACK_IMPORTED_MODULE_6__.STATE_NAMES.bggSearchResults) || this; // handler binding

    _this.handleSearch = _this.handleSearch.bind(_assertThisInitialized(_this));
    _this.handleSearchResultsCB = _this.handleSearchResultsCB.bind(_assertThisInitialized(_this));
    return _this;
  }

  var _proto = BGGSearchView.prototype;

  _proto.handleSearchResultsCB = function handleSearchResultsCB(data, status, associatedStateName) {
    this.changeSearchButton(true);
    vLogger("callback for bgg search " + associatedStateName + " with status " + status + " - ");

    if (status >= 200 && status <= 299) {
      // do we have any data?
      vLoggerDetail(data);
      vLoggerDetail(data.data.findBoardGames);
      if (this.stateManager && this.stateName) this.stateManager.setStateByName(this.stateName, data.data.findBoardGames, true);
    }
  };

  _proto.onDocumentLoaded = function onDocumentLoaded() {
    // get a link to the search button and search field and form
    // @ts-ignore
    this.formEl = document.getElementById(BGGSearchView.BGGSEARCH_Form); // @ts-ignore

    this.buttonEl = document.getElementById(BGGSearchView.BGGSEARCH_Search); // @ts-ignore

    this.queryEl = document.getElementById(BGGSearchView.BGGSEARCH_Query);
    this.formEl.addEventListener('submit', this.handleSearch);
    this.addEventListener(this);

    _AbstractListView.prototype.onDocumentLoaded.call(this);
  };

  _proto.getIdForStateItem = function getIdForStateItem(name, item) {
    return item.gameId;
  };

  _proto.getDisplayValueForStateItem = function getDisplayValueForStateItem(name, item) {
    return item.name + " (" + item.year + ")     ";
  };

  _proto.compareStateItemsForEquality = function compareStateItemsForEquality(item1, item2) {
    var result = false;

    if (item1.gameId && item2.gameId) {
      var parsed1 = parseInt(item1.gameId);
      var parsed2 = parseInt(item2.gameId);

      if (!isNaN(parsed1) && !isNaN(parsed2)) {
        item1.gameId = parsed1;
        item2.gameId = parsed2;
        result = item1.gameId === item2.gameId;
      }
    }

    return result;
  };

  _proto.eventClickItem = function eventClickItem(event) {
    _AbstractListView.prototype.eventClickItem.call(this, event); //this.applicationView.addBoardGameToDisplay(boardGame);


    this.eventForwarder.hideRequested(this);
  };

  _proto.changeSearchButton = function changeSearchButton(enable) {
    if (enable === void 0) {
      enable = false;
    }

    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].removeAllChildren(this.buttonEl);

    if (enable) {
      if (this.buttonEl) this.buttonEl.removeAttribute("disabled");
      if (this.buttonEl) this.buttonEl.innerHTML = 'Search';
    } else {
      if (this.buttonEl) this.buttonEl.setAttribute("disabled", "true");
      if (this.buttonEl) this.buttonEl.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>  Loading...';
    }
  };

  _proto.handleSearch = function handleSearch(event) {
    vLogger("Handling search");
    event.preventDefault();
    event.stopPropagation(); // do we have anything to search for?

    var queryText = this.queryEl.value.trim();
    if (queryText.length == 0) return; // ok, have a search term, lets start a search

    this.changeSearchButton(false); // get the query string from state obj

    var query = _AppTypes__WEBPACK_IMPORTED_MODULE_6__.API_Config.bggSearchCall;
    _network_DownloadManager__WEBPACK_IMPORTED_MODULE_2__["default"].getInstance().addQLApiRequest(_AppTypes__WEBPACK_IMPORTED_MODULE_6__.API_Config.graphQL, query, {
      queryString: queryText
    }, this.handleSearchResultsCB, _AppTypes__WEBPACK_IMPORTED_MODULE_6__.STATE_NAMES.bggSearchResults);
  };

  _proto.documentLoaded = function documentLoaded(view) {};

  _proto.hideRequested = function hideRequested(view) {};

  _proto.itemAction = function itemAction(view, actionName, selectedItem) {};

  _proto.canDeleteItem = function canDeleteItem(view, selectedItem) {
    return true;
  };

  _proto.itemDeleted = function itemDeleted(view, selectedItem) {
    var _this$stateManager;
    /* listen for our own deletes as we are expected to implement them */


    vLoggerDetail("Handling delete of board game search result for game " + selectedItem.gameId);
    (_this$stateManager = this.stateManager) == null ? void 0 : _this$stateManager.removeItemFromState(_AppTypes__WEBPACK_IMPORTED_MODULE_6__.STATE_NAMES.bggSearchResults, selectedItem, this.compareStateItemsForEquality, true);
  };

  _proto.itemDragStarted = function itemDragStarted(view, selectedItem) {};

  _proto.itemSelected = function itemSelected(view, selectedItem) {};

  _proto.showRequested = function showRequested(view) {};

  _proto.itemDropped = function itemDropped(view, droppedItem) {};

  _proto.itemDeselected = function itemDeselected(view, selectedItem) {};

  return BGGSearchView;
}(_ui_framework_AbstractListView__WEBPACK_IMPORTED_MODULE_5__["default"]);

BGGSearchView.BGGSEARCH_ViewConfig = {
  resultsContainerId: 'bggSearchResults',
  resultsElementType: 'a',
  resultsElementAttributes: [{
    name: 'href',
    value: '#'
  }],
  resultsClasses: 'list-group-item my-list-item truncate-notification list-group-item-action',
  keyId: 'gameId',
  keyType: _ui_framework_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_4__.KeyType.number,
  dataSourceId: _AppTypes__WEBPACK_IMPORTED_MODULE_6__.VIEW_NAME.bggSearch,
  modifiers: {
    normal: 'list-group-item-primary',
    inactive: 'list-group-item-light',
    active: 'list-group-item-info',
    warning: 'list-group-item-danger'
  },
  detail: {
    containerClasses: 'd-flex w-100 justify-content-between',
    textElementType: 'span',
    textElementClasses: 'mb-1',
    select: true,
    drag: {
      type: _AppTypes__WEBPACK_IMPORTED_MODULE_6__.DRAGGABLE.typeBoardGame,
      from: 'boardGameSearch'
    }
  }
};
BGGSearchView.BGGSEARCH_Form = 'bggSearch';
BGGSearchView.BGGSEARCH_Query = 'queryText';
BGGSearchView.BGGSEARCH_Search = 'bggSearchButton';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BGGSearchView);

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
/* harmony import */ var _ui_framework_AbstractListView__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../ui-framework/AbstractListView */ "./src/ui-framework/AbstractListView.ts");
/* harmony import */ var _ui_framework_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../ui-framework/ConfigurationTypes */ "./src/ui-framework/ConfigurationTypes.ts");
/* harmony import */ var _AppTypes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../AppTypes */ "./src/AppTypes.ts");
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

var BlockedUserView = /*#__PURE__*/function (_AbstractListView) {
  _inheritsLoose(BlockedUserView, _AbstractListView);

  function BlockedUserView(stateManager) {
    var _this;

    _this = _AbstractListView.call(this, BlockedUserView.DOMConfig, stateManager, _AppTypes__WEBPACK_IMPORTED_MODULE_5__.STATE_NAMES.users) || this; // handler binding

    _this.updateView = _this.updateView.bind(_assertThisInitialized(_this));
    _this.eventClickItem = _this.eventClickItem.bind(_assertThisInitialized(_this));
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
    _AbstractListView.prototype.onDocumentLoaded.call(this);

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
    this.updateView('', {});
  };

  _proto.getDisplayValueForStateItem = function getDisplayValueForStateItem(name, item) {
    return item.username;
  };

  _proto.getSecondaryModifierForStateItem = function getSecondaryModifierForStateItem(name, item) {
    return _ui_framework_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_4__.Modifier.warning;
  };

  _proto.getIdForStateItem = function getIdForStateItem(name, item) {
    return item.id;
  };

  _proto.updateView = function updateView(name, newState) {
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

    _AbstractListView.prototype.updateView.call(this, name, blockedUsers);
  };

  _proto.itemDropped = function itemDropped(view, droppedItem) {
    if (_socket_ChatManager__WEBPACK_IMPORTED_MODULE_2__.ChatManager.getInstance().isUserInBlockedList(droppedItem.username)) {
      vLogger(droppedItem.username + " already in blocked list, ignoring");
      return;
    } // add the user to the Chat Manager and we should get an event about it


    _socket_ChatManager__WEBPACK_IMPORTED_MODULE_2__.ChatManager.getInstance().addUserToBlockedList(droppedItem.username);
  };

  _proto.itemDeselected = function itemDeselected(view, selectedItem) {};

  return BlockedUserView;
}(_ui_framework_AbstractListView__WEBPACK_IMPORTED_MODULE_3__["default"]);

BlockedUserView.DOMConfig = {
  resultsContainerId: 'blockedUsers',
  resultsElementType: 'a',
  resultsElementAttributes: [{
    name: 'href',
    value: '#'
  }],
  resultsClasses: 'list-group-item my-list-item truncate-notification list-group-item-action',
  keyId: 'id',
  keyType: _ui_framework_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_4__.KeyType.number,
  dataSourceId: _AppTypes__WEBPACK_IMPORTED_MODULE_5__.VIEW_NAME.blockedUsers,
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
    delete: {
      buttonClasses: 'btn bg-danger text-white btn-circle btn-sm',
      iconClasses: 'fas fa-trash-alt'
    },
    drop: {
      acceptFrom: [_AppTypes__WEBPACK_IMPORTED_MODULE_5__.DRAGGABLE.fromUserSearch, _AppTypes__WEBPACK_IMPORTED_MODULE_5__.DRAGGABLE.fromFavourites],
      acceptTypes: [_AppTypes__WEBPACK_IMPORTED_MODULE_5__.DRAGGABLE.typeUser]
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
    stateManager.addChangeListenerForName(_AppTypes__WEBPACK_IMPORTED_MODULE_7__.STATE_NAMES.users, this);
  }

  var _proto = ChatLogDetailView.prototype;

  _proto.setContainedBy = function setContainedBy(container) {};

  _proto.addEventListener = function addEventListener(listener) {};

  _proto.getIdForStateItem = function getIdForStateItem(name, item) {
    throw new Error('Method not implemented.');
  };

  _proto.getDisplayValueForStateItem = function getDisplayValueForStateItem(name, item) {
    throw new Error('Method not implemented.');
  };

  _proto.compareStateItemsForEquality = function compareStateItemsForEquality(item1, item2) {
    throw new Error('Method not implemented.');
  };

  _proto.getModifierForStateItem = function getModifierForStateItem(name, item) {
    throw new Error('Method not implemented.');
  };

  _proto.getSecondaryModifierForStateItem = function getSecondaryModifierForStateItem(name, item) {
    throw new Error('Method not implemented.');
  };

  _proto.getBadgeValue = function getBadgeValue(name, item) {
    throw new Error('Method not implemented.');
  };

  _proto.getBackgroundImage = function getBackgroundImage(name, item) {
    throw new Error('Method not implemented.');
  };

  _proto.updateView = function updateView(name, newState) {
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

    var fastSearchEl = $("#" + ChatLogDetailView.chatFastSearchUserNames);
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
          value: item.id
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
/* harmony import */ var _ui_framework_AbstractListView__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../ui-framework/AbstractListView */ "./src/ui-framework/AbstractListView.ts");
/* harmony import */ var _ui_framework_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../ui-framework/ConfigurationTypes */ "./src/ui-framework/ConfigurationTypes.ts");
/* harmony import */ var _state_MemoryBufferStateManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../state/MemoryBufferStateManager */ "./src/state/MemoryBufferStateManager.ts");
/* harmony import */ var _AppTypes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../AppTypes */ "./src/AppTypes.ts");
/* harmony import */ var _util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../util/EqualityFunctions */ "./src/util/EqualityFunctions.ts");
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

var ChatLogsView = /*#__PURE__*/function (_AbstractListView) {
  _inheritsLoose(ChatLogsView, _AbstractListView);

  function ChatLogsView() {
    var _this;

    _this = _AbstractListView.call(this, ChatLogsView.DOMConfig, new _state_MemoryBufferStateManager__WEBPACK_IMPORTED_MODULE_5__["default"](), _AppTypes__WEBPACK_IMPORTED_MODULE_6__.STATE_NAMES.chatLogs) || this; // handler binding

    _this.selectedChatLog = null;
    _this.handleChatLogsUpdated = _this.handleChatLogsUpdated.bind(_assertThisInitialized(_this));
    _this.handleChatLogUpdated = _this.handleChatLogUpdated.bind(_assertThisInitialized(_this));
    _this.handleChatStarted = _this.handleChatStarted.bind(_assertThisInitialized(_this));
    _socket_NotificationController__WEBPACK_IMPORTED_MODULE_1__.NotificationController.getInstance().addListener(_assertThisInitialized(_this));
    return _this;
  }

  var _proto = ChatLogsView.prototype;

  _proto.compareStateItemsForEquality = function compareStateItemsForEquality(item1, item2) {
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
    _AbstractListView.prototype.onDocumentLoaded.call(this);

    this.addEventListener(this);
    this.updateStateManager();
  };

  _proto.getIdForStateItem = function getIdForStateItem(name, item) {
    return item.roomName;
  };

  _proto.getDisplayValueForStateItem = function getDisplayValueForStateItem(name, item) {
    return item.users.join(',');
  };

  _proto.getModifierForStateItem = function getModifierForStateItem(name, item) {
    var result = _ui_framework_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_4__.Modifier.inactive;

    if (this.selectedChatLog) {
      if (this.selectedChatLog.roomName === item.roomName) {
        result = _ui_framework_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_4__.Modifier.active;
      }
    }

    return result;
  };

  _proto.getSecondaryModifierForStateItem = function getSecondaryModifierForStateItem(name, item) {
    return this.getModifierForStateItem(name, item);
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

  _proto.getBadgeValue = function getBadgeValue(name, item) {
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

  return ChatLogsView;
}(_ui_framework_AbstractListView__WEBPACK_IMPORTED_MODULE_3__["default"]);

ChatLogsView.DOMConfig = {
  resultsContainerId: 'chatLogs',
  resultsElementType: 'a',
  resultsElementAttributes: [{
    name: 'href',
    value: '#'
  }],
  resultsClasses: 'list-group-item my-list-item truncate-notification list-group-item-action',
  keyId: 'roomName',
  keyType: _ui_framework_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_4__.KeyType.string,
  dataSourceId: _AppTypes__WEBPACK_IMPORTED_MODULE_6__.VIEW_NAME.chatLogs,
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
/* harmony import */ var _ui_framework_AbstractListView__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../ui-framework/AbstractListView */ "./src/ui-framework/AbstractListView.ts");
/* harmony import */ var _ui_framework_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../ui-framework/ConfigurationTypes */ "./src/ui-framework/ConfigurationTypes.ts");
/* harmony import */ var _AppTypes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../AppTypes */ "./src/AppTypes.ts");
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

var FavouriteUserView = /*#__PURE__*/function (_AbstractListView) {
  _inheritsLoose(FavouriteUserView, _AbstractListView);

  function FavouriteUserView(stateManager) {
    var _this;

    _this = _AbstractListView.call(this, FavouriteUserView.DOMConfig, stateManager, _AppTypes__WEBPACK_IMPORTED_MODULE_6__.STATE_NAMES.users) || this; // handler binding

    _this.updateView = _this.updateView.bind(_assertThisInitialized(_this));
    _this.eventClickItem = _this.eventClickItem.bind(_assertThisInitialized(_this));
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
    _AbstractListView.prototype.onDocumentLoaded.call(this);

    this.addEventListener(this);
  };

  _proto.handleLoggedInUsersUpdated = function handleLoggedInUsersUpdated(usernames) {
    vLogger("Received new list of users who are logged in ");
    this.updateView('', {});
  };

  _proto.handleFavouriteUserLoggedIn = function handleFavouriteUserLoggedIn(username) {
    vLogger("Handle Favourite User " + username + " logged in");
    this.updateView('', {});
  };

  _proto.handleFavouriteUserLoggedOut = function handleFavouriteUserLoggedOut(username) {
    vLogger("Handle Favourite User " + username + " logged in");
    this.updateView('', {});
  };

  _proto.handleFavouriteUsersChanged = function handleFavouriteUsersChanged(usernames) {
    vLogger("Handle Favourite Users changed to " + usernames);
    this.updateView('', {});
  };

  _proto.getIdForStateItem = function getIdForStateItem(name, item) {
    return item.id;
  };

  _proto.getDisplayValueForStateItem = function getDisplayValueForStateItem(name, item) {
    return item.username;
  };

  _proto.getModifierForStateItem = function getModifierForStateItem(name, item) {
    var result = _ui_framework_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_5__.Modifier.normal; // if the user is currently logged out make the item inactive

    if (!_socket_ChatManager__WEBPACK_IMPORTED_MODULE_3__.ChatManager.getInstance().isUserLoggedIn(item.username)) {
      result = _ui_framework_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_5__.Modifier.inactive;
    }

    return result;
  };

  _proto.getSecondaryModifierForStateItem = function getSecondaryModifierForStateItem(name, item) {
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

  _proto.updateView = function updateView(name, newState) {
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

    _AbstractListView.prototype.updateView.call(this, name, favUsers);
  };

  _proto.documentLoaded = function documentLoaded(view) {};

  _proto.handleBlockedUsersChanged = function handleBlockedUsersChanged(usernames) {
    this.updateView('', {});
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

  return FavouriteUserView;
}(_ui_framework_AbstractListView__WEBPACK_IMPORTED_MODULE_4__["default"]);

FavouriteUserView.DOMConfig = {
  resultsContainerId: 'favouriteUsers',
  resultsElementType: 'a',
  resultsElementAttributes: [{
    name: 'href',
    value: '#'
  }],
  resultsClasses: 'list-group-item my-list-item truncate-notification list-group-item-action',
  keyId: 'id',
  keyType: _ui_framework_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_5__.KeyType.number,
  dataSourceId: _AppTypes__WEBPACK_IMPORTED_MODULE_6__.VIEW_NAME.favouriteUsers,
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
    delete: {
      buttonClasses: 'btn bg-danger text-white btn-circle btn-sm',
      iconClasses: 'fas fa-trash-alt'
    },
    drop: {
      acceptFrom: [_AppTypes__WEBPACK_IMPORTED_MODULE_6__.DRAGGABLE.fromUserSearch],
      acceptTypes: [_AppTypes__WEBPACK_IMPORTED_MODULE_6__.DRAGGABLE.typeUser]
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

/***/ "./src/component/view/ScoreSheetDetailView.ts":
/*!****************************************************!*\
  !*** ./src/component/view/ScoreSheetDetailView.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ScoreSheetDetailView": () => (/* binding */ ScoreSheetDetailView)
/* harmony export */ });
/* harmony import */ var _controller_ScoreSheetController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../controller/ScoreSheetController */ "./src/component/controller/ScoreSheetController.ts");
/* harmony import */ var handsontable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! handsontable */ "./node_modules/handsontable/index.mjs");
/* harmony import */ var _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util/BrowserUtil */ "./src/util/BrowserUtil.ts");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _AppTypes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../AppTypes */ "./src/AppTypes.ts");
/* harmony import */ var _template_TemplateManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../template/TemplateManager */ "./src/template/TemplateManager.ts");
/* harmony import */ var _Controller__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../Controller */ "./src/Controller.ts");
/* harmony import */ var _ui_framework_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../ui-framework/ConfigurationTypes */ "./src/ui-framework/ConfigurationTypes.ts");








var ssvLogger = debug__WEBPACK_IMPORTED_MODULE_2___default()('score-sheet-view');
var ScoreSheetDetailView = /*#__PURE__*/function () {
  function ScoreSheetDetailView() {
    this.thisEl = null;
    this.boardGameTitleEl = null;
    this.startStopTimer = null;
    this.timerEl = null;
    this.endOrLeaveEl = null;
    this.scoreSheetEl = null;
    this.table = null;
    this.controller = _controller_ScoreSheetController__WEBPACK_IMPORTED_MODULE_0__.ScoreSheetController.getInstance();
    this.stateManager = _Controller__WEBPACK_IMPORTED_MODULE_5__["default"].getInstance().getStateManager();
    this.eventUserSelected = this.eventUserSelected.bind(this);
    this.stateManager.addChangeListenerForName(_AppTypes__WEBPACK_IMPORTED_MODULE_3__.STATE_NAMES.users, this);
  }

  ScoreSheetDetailView.getInstance = function getInstance() {
    if (!ScoreSheetDetailView._instance) {
      ScoreSheetDetailView._instance = new ScoreSheetDetailView();
    }

    return ScoreSheetDetailView._instance;
  };

  var _proto = ScoreSheetDetailView.prototype;

  _proto.onDocumentLoaded = function onDocumentLoaded() {
    this.resetDisplay(); // @ts-ignore

    this.ssFastSearchUserNames = document.getElementById(ScoreSheetDetailView.ScoreSheetDom.ssFastSearchUserNames); // fast user search
    // @ts-ignore

    var fastSearchEl = $("#" + ScoreSheetDetailView.ScoreSheetDom.ssFastSearchUserNames);
    fastSearchEl.on('autocompleteselect', this.eventUserSelected);
    _controller_ScoreSheetController__WEBPACK_IMPORTED_MODULE_0__.ScoreSheetController.getInstance().getStateManager().addChangeListenerForName(_AppTypes__WEBPACK_IMPORTED_MODULE_3__.STATE_NAMES.scoreSheet, this); // load references to the key elements on the page
    // @ts-ignore

    this.thisEl = document.getElementById(ScoreSheetDetailView.ScoreSheetDom.dropZone); // @ts-ignore

    this.boardGameTitleEl = document.getElementById(ScoreSheetDetailView.ScoreSheetDom.boardGame); // @ts-ignore

    this.startStopTimer = document.getElementById(ScoreSheetDetailView.ScoreSheetDom.startStopTimer); // @ts-ignore

    this.timerEl = document.getElementById(ScoreSheetDetailView.ScoreSheetDom.timer); // @ts-ignore

    this.endOrLeaveEl = document.getElementById(ScoreSheetDetailView.ScoreSheetDom.end); // @ts-ignore

    this.scoreSheetEl = document.getElementById(ScoreSheetDetailView.ScoreSheetDom.scoreSheet); // bind event handlers

    this.handleStartStopTimer = this.handleStartStopTimer.bind(this);
    this.handleEndOrLeave = this.handleEndOrLeave.bind(this);
    this.handleUserDrop = this.handleUserDrop.bind(this); // setup event handlers

    if (this.startStopTimer) this.startStopTimer.addEventListener('click', this.handleStartStopTimer);
    if (this.endOrLeaveEl) this.endOrLeaveEl.addEventListener('click', this.handleEndOrLeave);

    if (this.thisEl) {
      this.thisEl.addEventListener('dragover', function (event) {
        event.preventDefault();
      });
      this.thisEl.addEventListener('drop', this.handleUserDrop);
    }
  };

  _proto.eventUserSelected = function eventUserSelected(event, ui) {
    event.preventDefault();
    event.stopPropagation();
    ssvLogger("User " + ui.item.label + " with id " + ui.item.value + " selected"); // @ts-ignore

    event.target.innerText = ''; // add to the chat, if one selected, and is scoresheet owner

    if (_controller_ScoreSheetController__WEBPACK_IMPORTED_MODULE_0__.ScoreSheetController.getInstance().isSheetOwner()) {
      _controller_ScoreSheetController__WEBPACK_IMPORTED_MODULE_0__.ScoreSheetController.getInstance().inviteUser(ui.item.label);
    } else {
      alert("Only the score sheet creator can invite users.");
    }
  };

  _proto.handleEndOrLeave = function handleEndOrLeave(event) {
    ssvLogger('leave or end'); // are we leaving or ending?

    if (this.controller.hasActiveScoreSheet() && this.controller.isSheetOwner()) {
      // finishing the score sheet
      // double check this is want we want
      if (!confirm("Are you sure you want to close the score sheet")) return; // user wants to finish

      this.controller.endScoreSheet(); // reset the display

      this.resetDisplay();
    } else {
      // leaving the score sheet
      // double check this is want we want
      if (!confirm("Are you sure you want to leave the score sheet")) return; // user wants to finish

      this.controller.leave(); // reset the display

      this.resetDisplay();
    }
  };

  _proto.handleStartStopTimer = function handleStartStopTimer(event) {
    ssvLogger('start/pause timer');

    if (this.controller.isTimerGoing()) {
      this.controller.pauseTimer();
    } else {
      this.controller.startTimer();
    }
  };

  _proto.handleUserDrop = function handleUserDrop(event) {
    ssvLogger('drop event on current score sheet');

    if (this.controller.hasActiveScoreSheet() && this.controller.isSheetOwner()) {
      // @ts-ignore
      var draggedObjectJSON = event.dataTransfer.getData(_ui_framework_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_6__.DRAGGABLE_KEY_ID);
      var draggedObject = JSON.parse(draggedObjectJSON);
      ssvLogger(draggedObject);

      if (draggedObject[_ui_framework_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_6__.DRAGGABLE_TYPE] === _AppTypes__WEBPACK_IMPORTED_MODULE_3__.DRAGGABLE.typeUser) {
        //add the user to the current chat if not already there
        this.controller.inviteUser(draggedObject.username);
      }
    }
  };

  _proto.resetDisplay = function resetDisplay() {
    this.table = null; // reset the display

    if (this.boardGameTitleEl) this.boardGameTitleEl.innerText = '';

    if (this.startStopTimer) {
      this.startStopTimer.innerHTML = 'Start ' + ScoreSheetDetailView.ScoreSheetDom.iconStart;
      this.startStopTimer.setAttribute("disabled", "true");
      _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addRemoveClasses(this.startStopTimer, 'btn-warning', false);
      _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addRemoveClasses(this.startStopTimer, 'btn-success', true);
    }

    if (this.timerEl) this.timerEl.innerText = this.createTimerDisplay(0);
    if (this.endOrLeaveEl) this.endOrLeaveEl.innerHTML = ScoreSheetDetailView.ScoreSheetDom.iconLeave;
    if (this.scoreSheetEl) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].removeAllChildren(this.scoreSheetEl);
  };

  _proto.updateTimer = function updateTimer(time, isPaused) {
    if (isPaused === void 0) {
      isPaused = false;
    } // update the view


    ssvLogger("Updating timer " + time + " " + isPaused);

    if (this.startStopTimer) {
      if (isPaused) {
        this.startStopTimer.innerHTML = 'Start   ' + ScoreSheetDetailView.ScoreSheetDom.iconStart;
        _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addRemoveClasses(this.startStopTimer, 'btn-warning', false);
        _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addRemoveClasses(this.startStopTimer, 'btn-success', true);
      } else {
        this.startStopTimer.innerHTML = 'Pause   ' + ScoreSheetDetailView.ScoreSheetDom.iconInProgress;
        _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addRemoveClasses(this.startStopTimer, 'btn-warning', true);
        _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addRemoveClasses(this.startStopTimer, 'btn-success', false);
      }

      this.startStopTimer.removeAttribute("disabled");
    }

    if (this.timerEl) this.timerEl.innerText = this.createTimerDisplay(time);
  };

  _proto.stateChanged = function stateChanged(managerName, name, newValue) {
    if (name === _AppTypes__WEBPACK_IMPORTED_MODULE_3__.STATE_NAMES.users) {
      // @ts-ignore
      var fastSearchEl = $("#" + ScoreSheetDetailView.ScoreSheetDom.ssFastSearchUserNames); // what is my username?

      var myUsername = _Controller__WEBPACK_IMPORTED_MODULE_5__["default"].getInstance().getLoggedInUsername(); // for each name, construct the patient details to display and the id referenced

      var fastSearchValues = [];
      newValue.forEach(function (item) {
        var searchValue = {
          label: item.username,
          value: item.id
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
    } else {
      var scoreSheet = newValue;
      ssvLogger("Processing new state");
      ssvLogger(scoreSheet);
      if (this.startStopTimer) this.startStopTimer.removeAttribute("disabled"); // update the board game name

      if (this.boardGameTitleEl) this.boardGameTitleEl.innerText = "" + scoreSheet.boardGameName; // update the table

      if (this.table) {
        // process the data in the state change, will be array of array (rows) into what the table wants
        var tableData = []; // @ts-ignore

        scoreSheet.data.forEach(function (row, rowIndex) {
          row.forEach(function (column, columnIndex) {
            tableData.push([rowIndex, columnIndex, column]);
          });
        });
        ssvLogger("Table data is ");
        ssvLogger(tableData); // @ts-ignore

        this.table.setDataAtCell(tableData, _controller_ScoreSheetController__WEBPACK_IMPORTED_MODULE_0__.ScoreSheetController.SOURCE_View);
      } else {
        // create a new table
        if (this.scoreSheetEl) {
          var boardGame = this.controller.getSelectedBoardGame();

          if (boardGame) {
            scoreSheet.sheetLayoutOptions = _template_TemplateManager__WEBPACK_IMPORTED_MODULE_4__.TemplateManager.getInstance().getScoreSheetTemplate(boardGame);
          }

          scoreSheet.sheetLayoutOptions.data = scoreSheet.data;
          this.table = new handsontable__WEBPACK_IMPORTED_MODULE_7__["default"](this.scoreSheetEl, scoreSheet.sheetLayoutOptions); // @ts-ignore

          this.table.addHook('afterChange', this.controller.userChangedValue);
        }
      } // update the timer


      if (this.timerEl) this.timerEl.innerText = this.createTimerDisplay(scoreSheet.timer);
    }
  };

  _proto.getTableData = function getTableData() {
    if (this.table) {
      return this.table.getData();
    } else {
      return [];
    }
  };

  _proto.stateChangedItemAdded = function stateChangedItemAdded(managerName, name, itemAdded) {
    this.stateChanged(managerName, name, this.stateManager.getStateByName(name));
  };

  _proto.createTimerDisplay = function createTimerDisplay(timer) {
    var result = '';

    if (timer === 0) {
      result = '00:00';
    } else {
      if (timer >= 60) {
        var hours = Math.floor(timer / 3600);
        var minutes = Math.floor(timer / 60);
        var seconds = timer - hours * 3600 - minutes * 60;

        if (hours > 0) {
          result += hours + ":";
        }

        if (minutes > 0) {
          if (minutes < 10) {
            result += "0" + minutes + ":";
          } else {
            result += minutes + ":";
          }
        } else {
          result += '00:';
        }

        if (seconds > 0) {
          if (seconds < 10) {
            result += "0" + seconds;
          } else {
            result += "" + seconds;
          }
        } else {
          result += '00';
        }
      } else {
        result = "00:";

        if (timer > 0) {
          if (timer < 10) {
            result += "0" + timer;
          } else {
            result += "" + timer;
          }
        } else {
          result += '00';
        }
      }
    }

    return result;
  };

  _proto.stateChangedItemRemoved = function stateChangedItemRemoved(managerName, name, itemRemoved) {};

  _proto.stateChangedItemUpdated = function stateChangedItemUpdated(managerName, name, itemUpdated, itemNewValue) {};

  return ScoreSheetDetailView;
}();
ScoreSheetDetailView.ScoreSheetDom = {
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
};

/***/ }),

/***/ "./src/component/view/ScoreSheetsView.ts":
/*!***********************************************!*\
  !*** ./src/component/view/ScoreSheetsView.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Controller */ "./src/Controller.ts");
/* harmony import */ var _ui_framework_AbstractListView__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../ui-framework/AbstractListView */ "./src/ui-framework/AbstractListView.ts");
/* harmony import */ var _ui_framework_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../ui-framework/ConfigurationTypes */ "./src/ui-framework/ConfigurationTypes.ts");
/* harmony import */ var _state_MemoryBufferStateManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../state/MemoryBufferStateManager */ "./src/state/MemoryBufferStateManager.ts");
/* harmony import */ var _AppTypes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../AppTypes */ "./src/AppTypes.ts");
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








var csLogger = debug__WEBPACK_IMPORTED_MODULE_0___default()('score-sheet-sidebar');
var csLoggerDetail = debug__WEBPACK_IMPORTED_MODULE_0___default()('score-sheet-sidebar:detail');

var ScoreSheetsView = /*#__PURE__*/function (_AbstractListView) {
  _inheritsLoose(ScoreSheetsView, _AbstractListView);

  function ScoreSheetsView() {
    var _this;

    _this = _AbstractListView.call(this, ScoreSheetsView.SCORESHEETS_ViewConfig, new _state_MemoryBufferStateManager__WEBPACK_IMPORTED_MODULE_5__["default"](), _AppTypes__WEBPACK_IMPORTED_MODULE_6__.STATE_NAMES.scores) || this;
    _this.selectedBoardGame = null;
    return _this;
  }

  var _proto = ScoreSheetsView.prototype;

  _proto.onDocumentLoaded = function onDocumentLoaded() {
    _AbstractListView.prototype.onDocumentLoaded.call(this);

    this.addEventListener(this);
    this.stateManager.setStateByName(_AppTypes__WEBPACK_IMPORTED_MODULE_6__.STATE_NAMES.scores, [], true);
  };

  _proto.setSelectedBoardGame = function setSelectedBoardGame(boardGame) {
    csLogger("setting selected board game to");
    csLoggerDetail(boardGame);

    if (boardGame) {
      this.selectedBoardGame = boardGame;
      this.stateManager.setStateByName(_AppTypes__WEBPACK_IMPORTED_MODULE_6__.STATE_NAMES.scores, this.selectedBoardGame.scoresheets, true);
    }
  };

  _proto.getDisplayValueForStateItem = function getDisplayValueForStateItem(name, item) {
    var buffer = '';
    buffer += "<h5 class=\"card-title\">" + this.selectedBoardGame.name + " (" + this.selectedBoardGame.year + ")</h5>";
    buffer += "<p class=\"card-text\">Played On: " + moment__WEBPACK_IMPORTED_MODULE_1___default()(item.createdOn, 'YYYYMMDDHHmmss').format('ddd, DD/MM/YYYY HH:mm') + "</p>";
    buffer += "<p class=\"card-text\">Scores: ";

    if (item.player1) {
      if (item.score1 > 0) {
        buffer += item.player1 + ":" + item.score1 + " ";
      }
    }

    if (item.player2) {
      if (item.score2 > 0) {
        buffer += item.player2 + ":" + item.score2 + " ";
      }
    }

    if (item.player3) {
      if (item.score3 > 0) {
        buffer += item.player3 + ":" + item.score3 + " ";
      }
    }

    if (item.player4) {
      if (item.score4 > 0) {
        buffer += item.player4 + ":" + item.score4 + " ";
      }
    }

    if (item.player5) {
      if (item.score5 > 0) {
        buffer += item.player5 + ":" + item.score5 + " ";
      }
    }

    if (item.player6) {
      if (item.score6 > 0) {
        buffer += item.player6 + ":" + item.score6 + " ";
      }
    }

    if (item.player7) {
      if (item.score7 > 0) {
        buffer += item.player7 + ":" + item.score7 + " ";
      }
    }

    buffer += "</p>";
    return buffer;
  };

  _proto.getBackgroundImage = function getBackgroundImage(name, item) {
    return './img/scorecard-vertical.jpg';
  };

  _proto.getIdForStateItem = function getIdForStateItem(name, item) {
    return item.id;
  };

  _proto.documentLoaded = function documentLoaded(view) {};

  _proto.hideRequested = function hideRequested(view) {};

  _proto.itemAction = function itemAction(view, actionName, selectedItem) {};

  _proto.canDeleteItem = function canDeleteItem(view, selectedItem) {
    var result = true;

    if (this.selectedBoardGame) {
      if (!confirm("Are you sure you want to delete this Score Sheet?")) {
        result = false;
      }
    }

    return result;
  };

  _proto.itemDeleted = function itemDeleted(view, selectedItem) {
    csLogger("Handling delete " + selectedItem); // remove the sheet from the selected board game

    if (this.selectedBoardGame.scoresheets) {
      var index = this.selectedBoardGame.scoresheets.findIndex(function (sheet) {
        return sheet.id === selectedItem.id;
      });

      if (index >= 0) {
        this.selectedBoardGame.scoresheets.splice(index, 1); // let the controller know to remove from the database if the user is logged in

        this.stateManager.setStateByName(_AppTypes__WEBPACK_IMPORTED_MODULE_6__.STATE_NAMES.scores, this.selectedBoardGame.scoresheets, true);
        _Controller__WEBPACK_IMPORTED_MODULE_2__["default"].getInstance().scoreSheetRemovedFromBoardGame(this.selectedBoardGame, selectedItem.id);
      }
    }
  };

  _proto.itemDragStarted = function itemDragStarted(view, selectedItem) {};

  _proto.itemDropped = function itemDropped(view, droppedItem) {};

  _proto.itemSelected = function itemSelected(view, selectedItem) {};

  _proto.itemDeselected = function itemDeselected(view, selectedItem) {};

  _proto.showRequested = function showRequested(view) {};

  return ScoreSheetsView;
}(_ui_framework_AbstractListView__WEBPACK_IMPORTED_MODULE_3__["default"]);

ScoreSheetsView.SCORESHEETS_ViewConfig = {
  resultsContainerId: 'scoreSheets',
  resultsElementType: 'div',
  resultsClasses: 'text-white bg-info col-sm-6 col-md-3 col-lg-2 score-card',
  keyId: 'id',
  keyType: _ui_framework_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_4__.KeyType.string,
  dataSourceId: _AppTypes__WEBPACK_IMPORTED_MODULE_6__.VIEW_NAME.scoreSheets,
  detail: {
    containerClasses: 'card-img-overlay',
    textElementType: 'div',
    textElementClasses: 'ml-2',
    select: true,
    delete: {
      buttonClasses: 'btn btn-rounded btn-warning ml-6 mt-4',
      buttonText: 'Delete&nbsp;',
      iconClasses: 'fas fa-trash-alt'
    },
    background: {
      elementType: 'img',
      elementClasses: 'score-card-img'
    }
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ScoreSheetsView);

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
/* harmony import */ var _ui_framework_AbstractListView__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../ui-framework/AbstractListView */ "./src/ui-framework/AbstractListView.ts");
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

var UserSearchView = /*#__PURE__*/function (_AbstractListView) {
  _inheritsLoose(UserSearchView, _AbstractListView);

  function UserSearchView(stateManager) {
    var _this;

    _this = _AbstractListView.call(this, UserSearchView.DOMConfig, stateManager, _AppTypes__WEBPACK_IMPORTED_MODULE_7__.STATE_NAMES.users) || this;
    _this.loggedInUsers = []; // handler binding

    _this.updateView = _this.updateView.bind(_assertThisInitialized(_this));
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
    this.updateView(_AppTypes__WEBPACK_IMPORTED_MODULE_7__.STATE_NAMES.recentUserSearches, {});
  };

  _proto.handleFavouriteUserLoggedIn = function handleFavouriteUserLoggedIn(username) {
    vLogger("Handle Favourite User " + username + " logged in");
    this.updateView(_AppTypes__WEBPACK_IMPORTED_MODULE_7__.STATE_NAMES.recentUserSearches, {});
  };

  _proto.handleFavouriteUserLoggedOut = function handleFavouriteUserLoggedOut(username) {
    vLogger("Handle Favourite User " + username + " logged in");
    this.updateView(_AppTypes__WEBPACK_IMPORTED_MODULE_7__.STATE_NAMES.recentUserSearches, {});
  };

  _proto.handleFavouriteUsersChanged = function handleFavouriteUsersChanged(usernames) {
    vLogger("Handle Favourite Users changed to " + usernames);
    this.updateView(_AppTypes__WEBPACK_IMPORTED_MODULE_7__.STATE_NAMES.recentUserSearches, {});
  };

  _proto.handleBlockedUsersChanged = function handleBlockedUsersChanged(usernames) {
    vLogger("Handle Blocked Users changed to " + usernames);
    this.updateView(_AppTypes__WEBPACK_IMPORTED_MODULE_7__.STATE_NAMES.recentUserSearches, {});
  };

  _proto.onDocumentLoaded = function onDocumentLoaded() {
    _AbstractListView.prototype.onDocumentLoaded.call(this); // @ts-ignore


    var fastSearchEl = $("#" + UserSearchView.fastSearchInputId);
    fastSearchEl.on('autocompleteselect', this.eventUserSelected);
    this.addEventListener(this);
  };

  _proto.getIdForStateItem = function getIdForStateItem(name, item) {
    return item.id;
  };

  _proto.getDisplayValueForStateItem = function getDisplayValueForStateItem(name, item) {
    return item.username;
  };

  _proto.getModifierForStateItem = function getModifierForStateItem(name, item) {
    var result = _ui_framework_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_6__.Modifier.normal;
    vLoggerDetail("Checking for item modifiers");
    vLoggerDetail(item); // if the user is currently logged out make the item inactive

    if (!_socket_ChatManager__WEBPACK_IMPORTED_MODULE_5__.ChatManager.getInstance().isUserLoggedIn(item.username)) {
      result = _ui_framework_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_6__.Modifier.inactive;
    }

    return result;
  };

  _proto.getSecondaryModifierForStateItem = function getSecondaryModifierForStateItem(name, item) {
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
      id: ui.item.value
    }, _util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_1__.isSame)) return;
    var recentUserSearches = this.localisedSM.getStateByName(_AppTypes__WEBPACK_IMPORTED_MODULE_7__.STATE_NAMES.recentUserSearches);
    vLogger("saved searches too long? " + _AppTypes__WEBPACK_IMPORTED_MODULE_7__.STATE_NAMES.recentUserSearches);

    if (recentUserSearches.length >= UserSearchView.dataLimit) {
      vLogger('saved searches too long - removing first'); // remove the first item from recent searches

      var item = recentUserSearches.shift();
      this.localisedSM.removeItemFromState(_AppTypes__WEBPACK_IMPORTED_MODULE_7__.STATE_NAMES.recentUserSearches, item, _util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_1__.isSame, true);
    } // save the searches


    this.localisedSM.addNewItemToState(_AppTypes__WEBPACK_IMPORTED_MODULE_7__.STATE_NAMES.recentUserSearches, {
      id: ui.item.value,
      username: ui.item.label
    }, true);
  };

  _proto.updateView = function updateView(name, newState) {
    if (name === _AppTypes__WEBPACK_IMPORTED_MODULE_7__.STATE_NAMES.recentUserSearches) {
      vLogger("Updating for recent searches");
      newState = this.localisedSM.getStateByName(_AppTypes__WEBPACK_IMPORTED_MODULE_7__.STATE_NAMES.recentUserSearches);
      vLogger(newState);
      this.createResultsForState(name, newState);
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
          value: item.id
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

  _proto.canDeleteItem = function canDeleteItem(view, selectedItem) {
    return true;
  };

  _proto.itemDeleted = function itemDeleted(view, selectedItem) {
    vLoggerDetail(selectedItem);
    vLogger("Recent search user " + selectedItem.username + " with id " + selectedItem.id + " deleted - removing");
    this.localisedSM.removeItemFromState(_AppTypes__WEBPACK_IMPORTED_MODULE_7__.STATE_NAMES.recentUserSearches, selectedItem, _util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_1__.isSame, true);
  };

  _proto.itemSelected = function itemSelected(view, selectedItem) {
    var roomName = _socket_NotificationController__WEBPACK_IMPORTED_MODULE_2__.NotificationController.getInstance().startChatWithUser(selectedItem.username);
    _Controller__WEBPACK_IMPORTED_MODULE_3__["default"].getInstance().handleShowChat(roomName);
  };

  _proto.documentLoaded = function documentLoaded(view) {};

  _proto.hideRequested = function hideRequested(view) {};

  _proto.itemDragStarted = function itemDragStarted(view, selectedItem) {};

  _proto.itemDropped = function itemDropped(view, droppedItem) {};

  _proto.showRequested = function showRequested(view) {};

  _proto.itemDeselected = function itemDeselected(view, selectedItem) {};

  return UserSearchView;
}(_ui_framework_AbstractListView__WEBPACK_IMPORTED_MODULE_8__["default"]);

UserSearchView.fastSearchInputId = 'fastSearchUserNames';
UserSearchView.dataLimit = 10;
UserSearchView.DOMConfig = {
  resultsContainerId: 'recentUserSearches',
  resultsElementType: 'a',
  resultsElementAttributes: [{
    name: 'href',
    value: '#'
  }],
  resultsClasses: 'list-group-item my-list-item truncate-notification list-group-item-action',
  keyId: 'id',
  keyType: _ui_framework_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_6__.KeyType.number,
  dataSourceId: _AppTypes__WEBPACK_IMPORTED_MODULE_7__.VIEW_NAME.userSearch,
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
/* harmony import */ var _ui_framework_form_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ui-framework/form/DataObjectTypeDefs */ "./src/ui-framework/form/DataObjectTypeDefs.ts");



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

  _proto.createBasicObject = function createBasicObject(id, displayName, hasDataId, dataIdIsUUID) {
    var objDef = {
      id: id,
      displayName: displayName,
      fields: []
    };
    var ops = new _ui_framework_helper_BasicFieldOperations__WEBPACK_IMPORTED_MODULE_1__.BasicFieldOperations(); // do we need an id field?

    if (hasDataId) {
      var fieldType = _ui_framework_form_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.id;

      if (dataIdIsUUID) {
        fieldType = _ui_framework_form_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.uuid;
      }

      var fieldDef = {
        id: 'id',
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


    this.addCreatedDateToArray(objDef.fields);
    this.addCreatedByToArray(objDef.fields);
    this.addModifiedByToArray(objDef.fields);
    this.addModifiedDateToArray(objDef.fields);
    return objDef;
  };

  _proto.addCreatedDateToArray = function addCreatedDateToArray(fields) {
    var fieldDef = this.addStringFieldToArray(fields, FIELD_CreatedOn, FIELD_CreatedOn_Desc, _ui_framework_form_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.datetime, true, FIELD_CreatedOn_Desc); // add generator

    fieldDef.generator = {
      generator: new _ui_framework_helper_BasicFieldOperations__WEBPACK_IMPORTED_MODULE_1__.BasicFieldOperations(),
      onCreation: true,
      onModify: false
    };
    fieldDef.displayOnly = true;
  };

  _proto.addModifiedDateToArray = function addModifiedDateToArray(fields) {
    var fieldDef = this.addStringFieldToArray(fields, FIELD_ModifiedOn, FIELD_ModifiedOn_Desc, _ui_framework_form_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.datetime, true, FIELD_ModifiedOn_Desc); // add generator

    fieldDef.generator = {
      generator: new _ui_framework_helper_BasicFieldOperations__WEBPACK_IMPORTED_MODULE_1__.BasicFieldOperations(),
      onCreation: true,
      onModify: true
    };
    fieldDef.displayOnly = true;
  };

  _proto.addCreatedByToArray = function addCreatedByToArray(fields) {
    var fieldDef = this.addNumericFieldToArray(fields, FIELD_CreatedBy, FIELD_CreatedBy_Desc, _ui_framework_form_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.userId, true, FIELD_CreatedBy_Desc); // add generator

    fieldDef.generator = {
      generator: new _ui_framework_helper_BasicFieldOperations__WEBPACK_IMPORTED_MODULE_1__.BasicFieldOperations(),
      onCreation: true,
      onModify: false
    };
    fieldDef.displayOnly = true;
  };

  _proto.addModifiedByToArray = function addModifiedByToArray(fields) {
    var fieldDef = this.addStringFieldToArray(fields, FIELD_ModifiedBy, FIELD_ModifiedBy_Desc, _ui_framework_form_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.userId, true, FIELD_ModifiedBy_Desc); // add generator

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

    this.addStringFieldToArray(objDef.fields, id, displayName, type, isMandatory, description, datasource);
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

    this.addNumericFieldToArray(objDef.fields, id, displayName, type, isMandatory, description, datasource);
  };

  return BasicObjectDefinitionFactory;
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

    smLogger('State Manager: Found item - removing ');

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
        aggLogger("removing item from state in state manager for state " + name);
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
    asyncLogger("removing item from state " + name);
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

/***/ "./src/state/GraphQLApiStateManager.ts":
/*!*********************************************!*\
  !*** ./src/state/GraphQLApiStateManager.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GraphQLApiStateManager": () => (/* binding */ GraphQLApiStateManager)
/* harmony export */ });
/* harmony import */ var _StateManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StateManager */ "./src/state/StateManager.ts");
/* harmony import */ var _network_Types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../network/Types */ "./src/network/Types.ts");
/* harmony import */ var _network_DownloadManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../network/DownloadManager */ "./src/network/DownloadManager.ts");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _StateChangedDelegate__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./StateChangedDelegate */ "./src/state/StateChangedDelegate.ts");





/*
*
*   WORK IN PROGRESS
*
 */

var graphSMLogger = debug__WEBPACK_IMPORTED_MODULE_3___default()('state-manager-graphql');
var GraphQLApiStateManager = /*#__PURE__*/function () {
  function GraphQLApiStateManager() {
    this.configuration = [];
    this.delegate = new _StateChangedDelegate__WEBPACK_IMPORTED_MODULE_4__["default"]('graphql');
    this.emitEvents();
    this.bHasCompletedRun = [];
    this.callbackForAddItem = this.callbackForAddItem.bind(this);
    this.callbackForRemoveItem = this.callbackForRemoveItem.bind(this);
    this.callbackForUpdateItem = this.callbackForUpdateItem.bind(this);
    this.callbackForGetItems = this.callbackForGetItems.bind(this);
  }

  var _proto = GraphQLApiStateManager.prototype;

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
    graphSMLogger("Getting All " + name);

    if (this.hasCompletedRun(name)) {
      graphSMLogger("Getting All " + name + " - not done - previously retrieved");
    } else {
      var config = this.getConfigurationForStateName(name);

      if (config.isActive) {
        var query = config.apis.findAll;
        var jsonRequest = {
          url: config.apiURL,
          type: _network_Types__WEBPACK_IMPORTED_MODULE_1__.RequestType.POST,
          params: {
            query: query
          },
          callback: this.callbackForGetItems,
          associatedStateName: name
        };
        graphSMLogger("Getting All " + name + " with query \"" + query + "\"");
        _network_DownloadManager__WEBPACK_IMPORTED_MODULE_2__["default"].getInstance().addApiRequest(jsonRequest, true);
      } else {
        graphSMLogger("No configuration for state " + name);
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

    graphSMLogger("Adding item to " + name);
    graphSMLogger(stateObj);
    var config = this.getConfigurationForStateName(name);

    if (config.isActive) {
      var mutation = {};
      mutation[config.apis.create] = {};
      var jsonRequest = {
        url: config.apiURL,
        type: _network_Types__WEBPACK_IMPORTED_MODULE_1__.RequestType.POST,
        params: {
          mutation: mutation
        },
        callback: this.callbackForAddItem,
        associatedStateName: name
      };
      _network_DownloadManager__WEBPACK_IMPORTED_MODULE_2__["default"].getInstance().addApiRequest(jsonRequest, true);
    } else {
      graphSMLogger("No configuration for state " + name);
    }
  };

  _proto._removeItemFromState = function _removeItemFromState(name, stateObj, testForEqualityFunction, isPersisted) {
    if (isPersisted) return; // dont remove complete objects to the state - they are already processed

    graphSMLogger("Removing item to " + name);
    graphSMLogger(stateObj);
    var config = this.getConfigurationForStateName(name);

    if (config.isActive) {
      var mutation = {};
      mutation[config.apis.destroy] = {};
      var jsonRequest = {
        url: config.apiURL,
        type: _network_Types__WEBPACK_IMPORTED_MODULE_1__.RequestType.POST,
        params: {
          mutation: mutation
        },
        callback: this.callbackForRemoveItem,
        associatedStateName: name
      };
      _network_DownloadManager__WEBPACK_IMPORTED_MODULE_2__["default"].getInstance().addApiRequest(jsonRequest, true);
    } else {
      graphSMLogger("No configuration for state " + name);
    }
  };

  _proto._updateItemInState = function _updateItemInState(name, stateObj, testForEqualityFunction, isPersisted) {
    if (isPersisted) return; // dont update complete objects to the state - they are already processed

    graphSMLogger("Updating item in " + name);
    graphSMLogger(stateObj);
    var config = this.getConfigurationForStateName(name);

    if (config.isActive) {
      var mutation = {};
      mutation[config.apis.destroy] = {};
      var jsonRequest = {
        url: config.apiURL,
        type: _network_Types__WEBPACK_IMPORTED_MODULE_1__.RequestType.POST,
        params: {
          mutation: mutation
        },
        callback: this.callbackForUpdateItem,
        associatedStateName: name
      };
      _network_DownloadManager__WEBPACK_IMPORTED_MODULE_2__["default"].getInstance().addApiRequest(jsonRequest, true);
    } else {
      graphSMLogger("No configuration for state " + name);
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
      apiURL: '/graphql',
      apis: {
        findAll: '',
        create: '',
        destroy: '',
        update: '',
        find: ''
      },
      data: {
        findAll: '',
        create: '',
        destroy: '',
        update: '',
        find: ''
      },
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
    graphSMLogger("callback for remove item for state " + associatedStateName + " with status " + status + " - not forwarded");

    if (status >= 200 && status <= 299) {
      // do we have any data?
      graphSMLogger(data);
    }
  };

  _proto.callbackForUpdateItem = function callbackForUpdateItem(data, status, associatedStateName) {
    graphSMLogger("callback for update item for state " + associatedStateName + " with status " + status + " - not forwarded");

    if (status >= 200 && status <= 299) {
      // do we have any data?
      graphSMLogger(data);
    }
  };

  _proto.callbackForGetItems = function callbackForGetItems(data, status, associatedStateName) {
    graphSMLogger("callback for get items for state " + associatedStateName + " with status " + status + " - FORWARDING");

    if (status >= 200 && status <= 299) {
      // do we have any data?
      graphSMLogger(data);
      var config = this.getConfigurationForStateName(associatedStateName);
      var dataAttribute = config.data.findAll;
      this.setCompletedRun(associatedStateName);
      this.delegate.informChangeListenersForStateWithName(associatedStateName, data.data[dataAttribute], _StateManager__WEBPACK_IMPORTED_MODULE_0__.stateEventType.StateChanged, null);
    }
  };

  _proto.callbackForAddItem = function callbackForAddItem(data, status, associatedStateName) {
    graphSMLogger("callback for add item for state " + associatedStateName + " with status " + status + " - FORWARDING");

    if (status >= 200 && status <= 299) {
      // do we have any data?
      graphSMLogger(data);
      this.delegate.informChangeListenersForStateWithName(associatedStateName, data, _StateManager__WEBPACK_IMPORTED_MODULE_0__.stateEventType.ItemAdded, null);
    }
  };

  return GraphQLApiStateManager;
}();

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

/***/ "./src/template/TemplateManager.ts":
/*!*****************************************!*\
  !*** ./src/template/TemplateManager.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TemplateManager": () => (/* binding */ TemplateManager)
/* harmony export */ });
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_1__);


var templateLogger = debug__WEBPACK_IMPORTED_MODULE_1___default()('template-manager');
var TemplateManager = /*#__PURE__*/function () {
  function TemplateManager() {}

  TemplateManager.getInstance = function getInstance() {
    if (!TemplateManager._instance) {
      TemplateManager._instance = new TemplateManager();
    }

    return TemplateManager._instance;
  };

  var _proto = TemplateManager.prototype;

  _proto.getScoreSheetTemplate = function getScoreSheetTemplate(boardGame) {
    if (boardGame.gameId === 270314) {
      return this.getOhanamiTemplate();
    }

    if (boardGame.gameId === 333201) {
      return this.getSkullKingTemplate();
    }

    return this.getDefaultScoreSheetTemplate(boardGame);
  };

  _proto.getScoreSheetStartingData = function getScoreSheetStartingData(boardGame) {
    if (boardGame.gameId === 270314) {
      return this.getOhanamiStartingData();
    }

    if (boardGame.gameId === 333201) {
      return this.getSkullKingStartingData();
    }

    return this.getDefaultScoreSheetStartingData(boardGame);
  };

  _proto.getSaveData = function getSaveData(boardGame, scoreSheet) {
    if (boardGame.gameId === 270314) {
      return this.getOhanamiSaveData(scoreSheet);
    }

    if (boardGame.gameId === 333201) {
      return this.getSkullKingSaveData(scoreSheet);
    }

    return this.getDefaultSaveData(scoreSheet);
  };

  _proto.transformDataAfterUserChange = function transformDataAfterUserChange(boardGame, scoreSheet) {
    var result = false;

    if (boardGame.gameId === 270314) {
      result = true;
      this.transformOhanamiData(scoreSheet);
    }

    if (boardGame.gameId === 333201) {
      result = true;
      this.transformSkullKingData(scoreSheet);
    }

    return result; // do nothing unless for a specific game
  };

  _proto.getOhanamiTemplate = function getOhanamiTemplate() {
    var template = {
      colHeaders: false,
      rowHeaders: false,
      licenseKey: 'non-commercial-and-evaluation',
      manualColumnResize: false,
      manualRowResize: false,
      selectionMode: 'single',
      cells: function cells(row, column) {
        if (column === 0 || column === 1 || row === 8) {
          return {
            readOnly: true,
            className: 'bg-readonly-heading'
          };
        }

        if (column > 1) {
          if (row === 1 || row === 2 || row === 4) {
            return {
              className: 'bg-ohanami-blue',
              forceNumeric: true
            };
          }

          if (row === 3 || row === 5) {
            return {
              className: 'bg-ohanami-green',
              forceNumeric: true
            };
          }

          if (row === 6) {
            return {
              className: 'bg-ohanami-grey',
              forceNumeric: true
            };
          }

          if (row === 7) {
            return {
              className: 'bg-ohanami-pink',
              forceNumeric: true
            };
          }
        }
      }
    };
    templateLogger(template);
    return template;
  };

  _proto.getSkullKingTemplate = function getSkullKingTemplate() {
    var template = {
      colHeaders: false,
      rowHeaders: false,
      licenseKey: 'non-commercial-and-evaluation',
      manualColumnResize: false,
      manualRowResize: false,
      selectionMode: 'single',
      cells: function cells(row, column) {
        if (column === 0 || column === 1 || row === 21) {
          return {
            readOnly: true,
            className: 'bg-readonly-heading'
          };
        }

        if (column % 2 === 0) {
          if (row % 2 === 0) {
            return {
              className: 'bg-readonly'
            };
          }
        }
      }
    };
    templateLogger(template);
    return template;
  };

  _proto.getSkullKingStartingData = function getSkullKingStartingData() {
    return [['Round', '', 'P 1', '', 'P 2', '', 'P 3', '', 'P 4', ''], ['1', 'bid', '', '', '', '', '', '', '', ''], ['', 'bonus', '', '', '', '', '', '', '', ''], ['2', 'bid', '', '', '', '', '', '', '', ''], ['', 'bonus', '', '', '', '', '', '', '', ''], ['3', 'bid', '', '', '', '', '', '', '', ''], ['', 'bonus', '', '', '', '', '', '', '', ''], ['4', 'bid', '', '', '', '', '', '', '', ''], ['', 'bonus', '', '', '', '', '', '', '', ''], ['5', 'bid', '', '', '', '', '', '', '', ''], ['', 'bonus', '', '', '', '', '', '', '', ''], ['6', 'bid', '', '', '', '', '', '', '', ''], ['', 'bonus', '', '', '', '', '', '', '', ''], ['7', 'bid', '', '', '', '', '', '', '', ''], ['', 'bonus', '', '', '', '', '', '', '', ''], ['8', 'bid', '', '', '', '', '', '', '', ''], ['', 'bonus', '', '', '', '', '', '', '', ''], ['9', 'bid', '', '', '', '', '', '', '', ''], ['', 'bonus', '', '', '', '', '', '', '', ''], ['10', 'bid', '', '', '', '', '', '', '', ''], ['', 'bonus', '', '', '', '', '', '', '', ''], ['Total', '', '', '', '', '', '', '', '', '']];
  };

  _proto.getOhanamiStartingData = function getOhanamiStartingData() {
    return [['Round', 'Mult.', 'P 1', 'P 2', 'P 3', 'P 4'], ['1', 'x3', '0', '0', '0', '0'], ['2', 'x3', '0', '0', '0', '0'], ['', 'x4', '0', '0', '0', '0'], ['3', 'x3', '0', '0', '0', '0'], ['', 'x4', '0', '0', '0', '0'], ['', 'x7', '0', '0', '0', '0'], ['', 'var', '0', '0', '0', '0'], ['Total', '', '0', '0', '0', '0']];
  };

  _proto.getDefaultScoreSheetTemplate = function getDefaultScoreSheetTemplate(boardGame) {
    return {
      //width:'90%',
      //height:'90%',
      colHeaders: false,
      rowHeaders: false,
      licenseKey: 'non-commercial-and-evaluation',
      manualColumnResize: false,
      manualRowResize: false,
      selectionMode: 'single',
      columnSummary: [{
        destinationRow: 0,
        destinationColumn: 0,
        reversedRowCoords: true,
        type: 'sum',
        forceNumeric: true
      }, {
        destinationRow: 0,
        destinationColumn: 1,
        reversedRowCoords: true,
        type: 'sum',
        forceNumeric: true
      }, {
        destinationRow: 0,
        destinationColumn: 2,
        reversedRowCoords: true,
        type: 'sum',
        forceNumeric: true
      }, {
        destinationRow: 0,
        destinationColumn: 3,
        reversedRowCoords: true,
        type: 'sum',
        forceNumeric: true
      }, {
        destinationRow: 0,
        destinationColumn: 4,
        reversedRowCoords: true,
        type: 'sum',
        forceNumeric: true
      }, {
        destinationRow: 0,
        destinationColumn: 5,
        reversedRowCoords: true,
        type: 'sum',
        forceNumeric: true
      }, {
        destinationRow: 0,
        destinationColumn: 6,
        reversedRowCoords: true,
        type: 'sum',
        forceNumeric: true
      }]
    };
  };

  _proto.getDefaultScoreSheetStartingData = function getDefaultScoreSheetStartingData(boardGame) {
    return [['P 1', 'P 2', 'P 3', 'P 4', 'P 5', 'P 6', 'P 7'], ['0', '0', '0', '0', '0', '0', '0'], ['0', '0', '0', '0', '0', '0', '0'], ['0', '0', '0', '0', '0', '0', '0'], ['0', '0', '0', '0', '0', '0', '0'], ['0', '0', '0', '0', '0', '0', '0'], ['0', '0', '0', '0', '0', '0', '0'], ['0', '0', '0', '0', '0', '0', '0'], ['0', '0', '0', '0', '0', '0', '0'], ['0', '0', '0', '0', '0', '0', '0'], ['0', '0', '0', '0', '0', '0', '0'], ['0', '0', '0', '0', '0', '0', '0']];
  };

  _proto.getDefaultSaveData = function getDefaultSaveData(scoreSheet) {
    var saveData = {
      id: scoreSheet.room,
      jsonData: JSON.stringify(scoreSheet),
      createdOn: moment__WEBPACK_IMPORTED_MODULE_0___default()().format('YYYYMMDDHHmmss'),
      players: [],
      scores: []
    }; // process the table data for names and scores
    // the first row is the player names
    // @ts-ignore

    var playerNames = scoreSheet.data[0]; // @ts-ignore

    var scores = scoreSheet.data[scoreSheet.data.length - 1]; // ensure the scores are numbers

    scores.forEach(function (score, index) {
      var parsed = parseInt(score);

      if (isNaN(parsed)) {
        scores[index] = 0;
      } else {
        scores[index] = parsed;
      }
    }); // @ts-ignore

    saveData.players = playerNames; // @ts-ignore

    saveData.scores = scores;
    return saveData;
  };

  _proto.getOhanamiSaveData = function getOhanamiSaveData(scoreSheet) {
    var saveData = {
      id: scoreSheet.room,
      jsonData: JSON.stringify(scoreSheet),
      createdOn: moment__WEBPACK_IMPORTED_MODULE_0___default()().format('YYYYMMDDHHmmss'),
      players: [],
      scores: []
    }; // process the table data for names and scores
    // the first row is the player names, after the first two columns
    // @ts-ignore

    var playerNames = scoreSheet.data[0]; // @ts-ignore

    var scores = scoreSheet.data[scoreSheet.data.length - 1];

    for (var index = 2; index < playerNames.length; index++) {
      // @ts-ignore
      saveData.players.push(playerNames[index]);
      var parsed = parseInt(scores[index]);

      if (isNaN(parsed)) {
        parsed = 0;
      } // @ts-ignore


      saveData.scores.push(parsed);
    }

    templateLogger("Save data for ohanami is");
    templateLogger(saveData);
    return saveData;
  };

  _proto.getSkullKingSaveData = function getSkullKingSaveData(scoreSheet) {
    var saveData = {
      id: scoreSheet.room,
      jsonData: JSON.stringify(scoreSheet),
      createdOn: moment__WEBPACK_IMPORTED_MODULE_0___default()().format('YYYYMMDDHHmmss'),
      players: [],
      scores: []
    }; // process the table data for names and scores
    // the first row is the player names, after the first three columns, every second column
    // @ts-ignore

    var playerNames = scoreSheet.data[0]; // last row is the scores, following the same pattern as the playr names
    // @ts-ignore

    var scores = scoreSheet.data[scoreSheet.data.length - 1];

    for (var index = 3; index < playerNames.length; index += 2) {
      // @ts-ignore
      saveData.players.push(playerNames[index]);
      var parsed = parseInt(scores[index]);

      if (isNaN(parsed)) {
        parsed = 0;
      } // @ts-ignore


      saveData.scores.push(parsed);
    }

    templateLogger("Save data for skull king is");
    templateLogger(saveData);
    return saveData;
  };

  _proto.calculateOhanamiPinkScore = function calculateOhanamiPinkScore(numOfCards) {
    var score = 0;

    if (numOfCards > 0) {
      if (numOfCards > 15) numOfCards = 15;

      while (numOfCards > 0) {
        score += numOfCards;
        numOfCards--;
      }
    }

    return score;
  };

  _proto.transformOhanamiData = function transformOhanamiData(scoreSheet) {
    // need to calculate the player scores
    for (var index = 0; index < 4; index++) {
      /*
       *  for each player the score is the sum of
       *  3 x row 1, 2, and 4
       *  4 x row 3 and 5
       *  7 x row 6
       *  row 7 is complicated
       */
      var score = 0; // @ts-ignore

      var parsed = parseInt(scoreSheet.data[1][index + 2]);
      if (!isNaN(parsed)) score += 3 * parsed; // @ts-ignore

      parsed = parseInt(scoreSheet.data[2][index + 2]);
      if (!isNaN(parsed)) score += 3 * parsed; // @ts-ignore

      parsed = parseInt(scoreSheet.data[4][index + 2]);
      if (!isNaN(parsed)) score += 3 * parsed; // @ts-ignore

      parsed = parseInt(scoreSheet.data[3][index + 2]);
      if (!isNaN(parsed)) score += 4 * parsed; // @ts-ignore

      parsed = parseInt(scoreSheet.data[5][index + 2]);
      if (!isNaN(parsed)) score += 4 * parsed; // @ts-ignore

      parsed = parseInt(scoreSheet.data[6][index + 2]);
      if (!isNaN(parsed)) score += 7 * parsed; // @ts-ignore

      parsed = parseInt(scoreSheet.data[7][index + 2]);
      if (!isNaN(parsed)) score += this.calculateOhanamiPinkScore(parsed); // @ts-ignore

      scoreSheet.data[8][index + 2] = score;
    }
  };

  _proto.transformSkullKingData = function transformSkullKingData(scoreSheet) {
    // need to calculate the player scores
    for (var index = 2; index < 10; index += 2) {
      /*
       *  for each player the score is the sum of
       *  each bid score plus a bonus
       *  if bid is 0, and actual is 0, score is 10 x round
       *  if bid is x, and actual is x, score is 20 x bid
       *  if bid ix x, and actual is y (x != y), score is 10 x abs(x-y)
       */
      var score = 0;

      for (var round = 1; round <= 10; round++) {
        var row = 2 * round - 1; // @ts-ignore

        var parsedBid = parseInt(scoreSheet.data[row][index]); // @ts-ignore

        var parsedActual = parseInt(scoreSheet.data[row][index + 1]); // @ts-ignore

        var parsedBonus = parseInt(scoreSheet.data[row + 1][index + 1]); // @ts-ignore

        if (!isNaN(parsedBid) && !isNaN(parsedActual)) {
          if (parsedBid === 0 && parsedActual === 0) {
            score += round * 10;
          }

          if (parsedBid === parsedActual) {
            score += 20 * parsedBid;
          }

          if (parsedBid > 0 && parsedBid !== parsedActual) {
            score -= 10 * Math.abs(parsedBid - parsedActual);
          }

          if (!isNaN(parsedBonus)) score += parsedBonus;
        }
      } // @ts-ignore


      scoreSheet.data[21][index + 1] = score;
    }
  };

  return TemplateManager;
}();

/***/ }),

/***/ "./src/ui-framework/AbstractListView.ts":
/*!**********************************************!*\
  !*** ./src/ui-framework/AbstractListView.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AbstractListView)
/* harmony export */ });
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/BrowserUtil */ "./src/util/BrowserUtil.ts");
/* harmony import */ var _ViewListenerForwarder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ViewListenerForwarder */ "./src/ui-framework/ViewListenerForwarder.ts");
/* harmony import */ var _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ConfigurationTypes */ "./src/ui-framework/ConfigurationTypes.ts");
/* harmony import */ var _util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util/EqualityFunctions */ "./src/util/EqualityFunctions.ts");





var avLogger = debug__WEBPACK_IMPORTED_MODULE_0___default()('view-ts');
var avLoggerDetails = debug__WEBPACK_IMPORTED_MODULE_0___default()('view-ts-detail');

var AbstractListView = /*#__PURE__*/function () {
  function AbstractListView(uiConfig, stateManager, stateName) {
    this.containerEl = null;
    this.uiConfig = uiConfig;
    this.stateManager = stateManager;
    this.stateName = stateName;
    this.eventForwarder = new _ViewListenerForwarder__WEBPACK_IMPORTED_MODULE_2__["default"](); // state change listening

    this.stateChanged = this.stateChanged.bind(this); // event handlers

    this.eventStartDrag = this.eventStartDrag.bind(this);
    this.eventClickItem = this.eventClickItem.bind(this);
    this.eventDeleteClickItem = this.eventDeleteClickItem.bind(this);
    this.eventActionClicked = this.eventActionClicked.bind(this);
    this.handleDrop = this.handleDrop.bind(this); // setup state listener

    this.stateManager.addChangeListenerForName(this.stateName, this);
  }

  var _proto = AbstractListView.prototype;

  _proto.addEventListener = function addEventListener(listener) {
    this.eventForwarder.addListener(listener);
  };

  _proto.onDocumentLoaded = function onDocumentLoaded() {
    this.eventForwarder.documentLoaded(this);
  };

  _proto.stateChanged = function stateChanged(managerName, name, newValue) {
    this.updateView(name, newValue);
  };

  _proto.stateChangedItemAdded = function stateChangedItemAdded(managerName, name, itemAdded) {
    if (this.stateManager && this.stateName) this.updateView(name, this.stateManager.getStateByName(name));
  };

  _proto.stateChangedItemRemoved = function stateChangedItemRemoved(managerName, name, itemRemoved) {
    if (this.stateManager && this.stateName) this.updateView(name, this.stateManager.getStateByName(name));
  };

  _proto.stateChangedItemUpdated = function stateChangedItemUpdated(managerName, name, itemUpdated, itemNewValue) {
    if (this.stateManager && this.stateName) this.updateView(name, this.stateManager.getStateByName(name));
  };

  _proto.eventClickItem = function eventClickItem(event) {
    event.preventDefault();
    event.stopPropagation(); // @ts-ignore

    var itemId = event.target.getAttribute(this.uiConfig.keyId); // @ts-ignore

    var dataSource = event.target.getAttribute(AbstractListView.DATA_SOURCE);
    if (this.uiConfig.keyType === _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_3__.KeyType.number) itemId = parseInt(itemId); // @ts-ignore

    avLoggerDetails("view " + this.getName() + ": Item with id " + itemId + " clicked from " + dataSource);
    var compareWith = {}; // @ts-ignore

    compareWith[this.uiConfig.keyId] = itemId;
    avLoggerDetails(compareWith);
    var selectedItem = this.stateManager.findItemInState(this.stateName, compareWith, this.compareStateItemsForEquality);
    console.log(selectedItem);
    if (selectedItem) this.eventForwarder.itemSelected(this, selectedItem);
  };

  _proto.eventDeleteClickItem = function eventDeleteClickItem(event) {
    event.preventDefault();
    event.stopPropagation(); // @ts-ignore

    var itemId = event.target.getAttribute(this.uiConfig.keyId); // @ts-ignore

    var dataSource = event.target.getAttribute(AbstractListView.DATA_SOURCE);
    if (this.uiConfig.keyType === _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_3__.KeyType.number) itemId = parseInt(itemId); // @ts-ignore

    avLoggerDetails("view " + this.getName() + ": Item with id " + itemId + " attempting delete from " + dataSource);
    var compareWith = {}; // @ts-ignore

    compareWith[this.uiConfig.keyId] = itemId;
    avLoggerDetails(compareWith);
    var selectedItem = this.stateManager.findItemInState(this.stateName, compareWith, this.compareStateItemsForEquality);

    if (selectedItem) {
      var shouldDelete = this.eventForwarder.canDeleteItem(this, selectedItem);
      avLoggerDetails("view " + this.getName() + ": Item with id " + itemId + " attempting delete from " + dataSource + " - " + shouldDelete);

      if (shouldDelete) {
        avLoggerDetails(selectedItem);
        this.eventForwarder.itemDeleted(this, selectedItem);
      }
    }
  };

  _proto.eventActionClicked = function eventActionClicked(event) {
    event.preventDefault();
    event.stopPropagation(); // @ts-ignore

    var itemId = event.target.getAttribute(this.uiConfig.keyId); // @ts-ignore

    var dataSource = event.target.getAttribute(AbstractListView.DATA_SOURCE); // @ts-ignore

    var actionName = event.target.getAttribute(_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_3__.EXTRA_ACTION_ATTRIBUTE_NAME);
    if (this.uiConfig.keyType === _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_3__.KeyType.number) itemId = parseInt(itemId); // @ts-ignore

    avLoggerDetails("view " + this.getName() + ": Item with id " + itemId + " attempting delete from " + dataSource);
    var compareWith = {}; // @ts-ignore

    compareWith[this.uiConfig.keyId] = itemId;
    avLoggerDetails(compareWith);
    var selectedItem = this.stateManager.findItemInState(this.stateName, compareWith, this.compareStateItemsForEquality);

    if (selectedItem) {
      this.eventForwarder.itemAction(this, actionName, selectedItem);
    }
  };

  _proto.getDragData = function getDragData(event) {
    // @ts-ignore
    var itemId = event.target.getAttribute(this.uiConfig.keyId); // @ts-ignore

    var dataSource = event.target.getAttribute(AbstractListView.DATA_SOURCE);
    if (this.uiConfig.keyType === _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_3__.KeyType.number) itemId = parseInt(itemId); // @ts-ignore

    avLoggerDetails("view " + this.getName() + ": Item with id " + itemId + " getting drag data from " + dataSource);
    var compareWith = {}; // @ts-ignore

    compareWith[this.uiConfig.keyId] = itemId;
    var selectedItem = {};
    selectedItem = this.stateManager.findItemInState(this.stateName, compareWith, this.compareStateItemsForEquality);

    if (selectedItem) {
      var _this$uiConfig$detail, _this$uiConfig$detail2; // @ts-ignore


      selectedItem[_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_3__.DRAGGABLE_TYPE] = (_this$uiConfig$detail = this.uiConfig.detail.drag) == null ? void 0 : _this$uiConfig$detail.type; // @ts-ignore

      selectedItem[_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_3__.DRAGGABLE_FROM] = (_this$uiConfig$detail2 = this.uiConfig.detail.drag) == null ? void 0 : _this$uiConfig$detail2.from;
    }

    return selectedItem;
  };

  _proto.compareStateItemsForEquality = function compareStateItemsForEquality(item1, item2) {
    return (0,_util_EqualityFunctions__WEBPACK_IMPORTED_MODULE_4__.isSame)(item1, item2);
  };

  _proto.getModifierForStateItem = function getModifierForStateItem(name, item) {
    return _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_3__.Modifier.normal;
  };

  _proto.getSecondaryModifierForStateItem = function getSecondaryModifierForStateItem(name, item) {
    return _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_3__.Modifier.normal;
  };

  _proto.getBadgeValue = function getBadgeValue(name, item) {
    return 0;
  };

  _proto.getBackgroundImage = function getBackgroundImage(name, item) {
    return '';
  };

  _proto.updateView = function updateView(name, newState) {
    this.createResultsForState(name, newState);
  };

  _proto.eventStartDrag = function eventStartDrag(event) {
    avLogger("view " + this.getName() + ": drag start");
    avLoggerDetails(event.target);
    var data = JSON.stringify(this.getDragData(event));
    avLoggerDetails(data); // @ts-ignore

    event.dataTransfer.setData(_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_3__.DRAGGABLE_KEY_ID, data);
  };

  _proto.createResultForItem = function createResultForItem(name, item) {
    var _this = this;

    avLogger("view " + this.getName() + ": creating Result");
    avLogger(item);
    var resultDataKeyId = this.getIdForStateItem(name, item);
    var childEl = document.createElement(this.uiConfig.resultsElementType);
    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addRemoveClasses(childEl, this.uiConfig.resultsClasses);
    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addAttributes(childEl, this.uiConfig.resultsElementAttributes);
    childEl.setAttribute(this.uiConfig.keyId, resultDataKeyId);
    childEl.setAttribute(AbstractListView.DATA_SOURCE, this.uiConfig.dataSourceId); // the content may be structured

    var textEl = childEl;

    if (this.uiConfig.detail.containerClasses) {
      var contentEl = document.createElement('div');
      _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addRemoveClasses(contentEl, this.uiConfig.detail.containerClasses);
      contentEl.setAttribute(this.uiConfig.keyId, resultDataKeyId);
      contentEl.setAttribute(AbstractListView.DATA_SOURCE, this.uiConfig.dataSourceId);
      textEl = document.createElement(this.uiConfig.detail.textElementType);
      _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addRemoveClasses(textEl, this.uiConfig.detail.textElementClasses);
      textEl.setAttribute(this.uiConfig.keyId, resultDataKeyId);
      textEl.setAttribute(AbstractListView.DATA_SOURCE, this.uiConfig.dataSourceId);
      contentEl.appendChild(textEl);

      if (this.uiConfig.detail.background) {
        var imgEl = document.createElement(this.uiConfig.detail.background.elementType);
        _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addRemoveClasses(imgEl, this.uiConfig.detail.background.elementClasses);
        imgEl.setAttribute('src', this.getBackgroundImage(name, item));
        childEl.appendChild(imgEl);
      }

      var buttonsEl = document.createElement('div');
      contentEl.appendChild(buttonsEl);

      if (this.uiConfig.detail.badge) {
        var badgeValue = this.getBadgeValue(name, item);

        if (badgeValue > 0) {
          var badgeEl = document.createElement(this.uiConfig.detail.badge.elementType);
          _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addRemoveClasses(badgeEl, this.uiConfig.detail.badge.elementClasses);
          _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addAttributes(badgeEl, this.uiConfig.detail.badge.elementAttributes);
          badgeEl.setAttribute(this.uiConfig.keyId, resultDataKeyId);
          badgeEl.setAttribute(AbstractListView.DATA_SOURCE, this.uiConfig.dataSourceId);
          buttonsEl.appendChild(badgeEl);
          badgeEl.innerHTML = "&nbsp;&nbsp;&nbsp;" + badgeValue + "&nbsp;&nbsp;&nbsp;";
        }
      }

      if (this.uiConfig.extraActions) {
        this.uiConfig.extraActions.forEach(function (extraAction) {
          var action = document.createElement('button');
          action.setAttribute('type', 'button');
          _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addRemoveClasses(action, extraAction.buttonClasses);

          if (extraAction.buttonText) {
            action.innerHTML = extraAction.buttonText;
          }

          if (extraAction.iconClasses) {
            var iconEl = document.createElement('i');
            _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addRemoveClasses(iconEl, extraAction.iconClasses);
            iconEl.setAttribute(_this.uiConfig.keyId, resultDataKeyId);
            iconEl.setAttribute(AbstractListView.DATA_SOURCE, _this.uiConfig.dataSourceId);
            iconEl.setAttribute(_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_3__.EXTRA_ACTION_ATTRIBUTE_NAME, extraAction.name);
            action.appendChild(iconEl);
          }

          action.setAttribute(_this.uiConfig.keyId, resultDataKeyId);
          action.setAttribute(AbstractListView.DATA_SOURCE, _this.uiConfig.dataSourceId);
          action.setAttribute(_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_3__.EXTRA_ACTION_ATTRIBUTE_NAME, extraAction.name);
          action.addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();

            _this.eventActionClicked(event);
          });
          buttonsEl.appendChild(action);
        });
      }

      if (this.uiConfig.detail.delete) {
        var deleteButtonEl = document.createElement('button');
        deleteButtonEl.setAttribute('type', 'button');
        _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addRemoveClasses(deleteButtonEl, this.uiConfig.detail.delete.buttonClasses);

        if (this.uiConfig.detail.delete.buttonText) {
          deleteButtonEl.innerHTML = this.uiConfig.detail.delete.buttonText;
        }

        if (this.uiConfig.detail.delete.iconClasses) {
          var iconEl = document.createElement('i');
          _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addRemoveClasses(iconEl, this.uiConfig.detail.delete.iconClasses);
          iconEl.setAttribute(this.uiConfig.keyId, resultDataKeyId);
          iconEl.setAttribute(AbstractListView.DATA_SOURCE, this.uiConfig.dataSourceId);
          deleteButtonEl.appendChild(iconEl);
        }

        deleteButtonEl.setAttribute(this.uiConfig.keyId, resultDataKeyId);
        deleteButtonEl.setAttribute(AbstractListView.DATA_SOURCE, this.uiConfig.dataSourceId);
        deleteButtonEl.addEventListener('click', function (event) {
          event.preventDefault();
          event.stopPropagation();

          _this.eventDeleteClickItem(event);
        });
        buttonsEl.appendChild(deleteButtonEl);
      }

      childEl.appendChild(contentEl);

      if (this.uiConfig.detail.drag) {
        childEl.setAttribute('draggable', 'true');
        childEl.addEventListener('dragstart', this.eventStartDrag);
      } // add selection actions


      if (this.uiConfig.detail.select) {
        childEl.addEventListener('click', this.eventClickItem);
      }
    } // add the key ids for selection


    textEl.setAttribute(this.uiConfig.keyId, resultDataKeyId);
    textEl.setAttribute(AbstractListView.DATA_SOURCE, this.uiConfig.dataSourceId);
    var displayText = this.getDisplayValueForStateItem(name, item);
    textEl.innerHTML = displayText; // add modifiers for patient state

    if (this.uiConfig.modifiers) {
      var modifier = this.getModifierForStateItem(name, item);
      var secondModifier = this.getSecondaryModifierForStateItem(name, item);

      switch (modifier) {
        case _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_3__.Modifier.normal:
          {
            avLogger("view " + this.getName() + ": normal item");
            _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addRemoveClasses(childEl, this.uiConfig.modifiers.normal);

            if (this.uiConfig.icons && this.uiConfig.icons.normal) {
              var _iconEl = document.createElement('i');

              _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addRemoveClasses(_iconEl, this.uiConfig.icons.normal);

              _iconEl.setAttribute(this.uiConfig.keyId, resultDataKeyId);

              _iconEl.setAttribute(AbstractListView.DATA_SOURCE, this.uiConfig.dataSourceId);

              textEl.appendChild(_iconEl);
            }

            switch (secondModifier) {
              case _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_3__.Modifier.warning:
                {
                  _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addRemoveClasses(childEl, this.uiConfig.modifiers.normal, false);
                  _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addRemoveClasses(childEl, this.uiConfig.modifiers.warning, true);

                  if (this.uiConfig.icons && this.uiConfig.icons.warning) {
                    var _iconEl2 = document.createElement('i');

                    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addRemoveClasses(_iconEl2, this.uiConfig.icons.warning);

                    _iconEl2.setAttribute(this.uiConfig.keyId, resultDataKeyId);

                    _iconEl2.setAttribute(AbstractListView.DATA_SOURCE, this.uiConfig.dataSourceId);

                    textEl.appendChild(_iconEl2);
                  }

                  break;
                }

              case _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_3__.Modifier.active:
                {
                  if (this.uiConfig.icons && this.uiConfig.icons.active) {
                    var _iconEl3 = document.createElement('i');

                    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addRemoveClasses(_iconEl3, this.uiConfig.icons.active);

                    _iconEl3.setAttribute(this.uiConfig.keyId, resultDataKeyId);

                    _iconEl3.setAttribute(AbstractListView.DATA_SOURCE, this.uiConfig.dataSourceId);

                    textEl.appendChild(_iconEl3);
                  }
                }
            }

            break;
          }

        case _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_3__.Modifier.active:
          {
            avLogger("view " + this.getName() + ": active item");
            _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addRemoveClasses(childEl, this.uiConfig.modifiers.active);

            if (this.uiConfig.icons && this.uiConfig.icons.active) {
              var _iconEl4 = document.createElement('i');

              _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addRemoveClasses(_iconEl4, this.uiConfig.icons.active);

              _iconEl4.setAttribute(this.uiConfig.keyId, resultDataKeyId);

              _iconEl4.setAttribute(AbstractListView.DATA_SOURCE, this.uiConfig.dataSourceId);

              textEl.appendChild(_iconEl4);
            }

            switch (secondModifier) {
              case _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_3__.Modifier.warning:
                {
                  _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addRemoveClasses(childEl, this.uiConfig.modifiers.active, false);
                  _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addRemoveClasses(childEl, this.uiConfig.modifiers.warning, true);

                  if (this.uiConfig.icons && this.uiConfig.icons.warning) {
                    var _iconEl5 = document.createElement('i');

                    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addRemoveClasses(_iconEl5, this.uiConfig.icons.warning);

                    _iconEl5.setAttribute(this.uiConfig.keyId, resultDataKeyId);

                    _iconEl5.setAttribute(AbstractListView.DATA_SOURCE, this.uiConfig.dataSourceId);

                    textEl.appendChild(_iconEl5);
                  }

                  break;
                }
            }

            break;
          }

        case _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_3__.Modifier.inactive:
          {
            avLogger("view " + this.getName() + ": inactive item");
            _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addRemoveClasses(childEl, this.uiConfig.modifiers.inactive);

            if (this.uiConfig.icons && this.uiConfig.icons.inactive) {
              var _iconEl6 = document.createElement('i');

              _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addRemoveClasses(_iconEl6, this.uiConfig.icons.inactive);

              _iconEl6.setAttribute(this.uiConfig.keyId, resultDataKeyId);

              _iconEl6.setAttribute(AbstractListView.DATA_SOURCE, this.uiConfig.dataSourceId);

              textEl.appendChild(_iconEl6);
            }

            switch (secondModifier) {
              case _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_3__.Modifier.warning:
                {
                  if (this.uiConfig.icons && this.uiConfig.icons.warning) {
                    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addRemoveClasses(childEl, this.uiConfig.modifiers.inactive, false);
                    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addRemoveClasses(childEl, this.uiConfig.modifiers.warning, true);

                    var _iconEl7 = document.createElement('i');

                    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addRemoveClasses(_iconEl7, this.uiConfig.icons.warning);

                    _iconEl7.setAttribute(this.uiConfig.keyId, resultDataKeyId);

                    _iconEl7.setAttribute(AbstractListView.DATA_SOURCE, this.uiConfig.dataSourceId);

                    textEl.appendChild(_iconEl7);
                  }

                  break;
                }

              case _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_3__.Modifier.active:
                {
                  if (this.uiConfig.icons && this.uiConfig.icons.active) {
                    var _iconEl8 = document.createElement('i');

                    _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].addRemoveClasses(_iconEl8, this.uiConfig.icons.active);

                    _iconEl8.setAttribute(this.uiConfig.keyId, resultDataKeyId);

                    _iconEl8.setAttribute(AbstractListView.DATA_SOURCE, this.uiConfig.dataSourceId);

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

  _proto.createResultsForState = function createResultsForState(name, newState) {
    var _this2 = this;

    avLogger("view " + this.getName() + ": creating Results", 10);
    avLogger(newState); // remove the previous items from list

    var viewEl = document.getElementById(this.uiConfig.resultsContainerId);
    if (viewEl) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_1__["default"].removeAllChildren(viewEl); // add the new children

    newState.map(function (item, index) {
      var childEl = _this2.createResultForItem(name, item); // add draggable actions


      avLogger("view " + _this2.getName() + ":  Adding child " + _this2.getIdForStateItem(name, item));
      if (viewEl) viewEl.appendChild(childEl);
    });
  };

  _proto.setContainedBy = function setContainedBy(container) {
    this.containerEl = container;

    if (this.uiConfig.detail.drop) {
      avLoggerDetails("view " + this.getName() + ": Adding dragover events to " + this.uiConfig.dataSourceId);
      avLoggerDetails(container);
      container.addEventListener('dragover', function (event) {
        event.preventDefault();
      });
      container.addEventListener('drop', this.handleDrop);
    }
  };

  _proto.handleDrop = function handleDrop(event) {
    avLogger("view " + this.getName() + ": drop event");
    avLoggerDetails(event.target); // @ts-ignore

    var draggedObjectJSON = event.dataTransfer.getData(_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_3__.DRAGGABLE_KEY_ID);
    var draggedObject = JSON.parse(draggedObjectJSON);
    avLoggerDetails(draggedObject); // check to see if we accept the dropped type and source

    var droppedObjectType = draggedObject[_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_3__.DRAGGABLE_TYPE];
    var droppedObjectFrom = draggedObject[_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_3__.DRAGGABLE_FROM];
    avLogger("view " + this.getName() + ": drop event from " + droppedObjectFrom + " with type " + droppedObjectType);

    if (this.uiConfig.detail.drop) {
      var acceptType = this.uiConfig.detail.drop.acceptTypes.findIndex(function (objectType) {
        return objectType === droppedObjectType;
      }) >= 0;
      var acceptFrom = true;

      if (acceptType) {
        if (this.uiConfig.detail.drop.acceptFrom) {
          acceptFrom = this.uiConfig.detail.drop.acceptFrom.findIndex(function (from) {
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

  _proto.getName = function getName() {
    return this.uiConfig.dataSourceId;
  };

  _proto.hidden = function hidden() {};

  return AbstractListView;
}();

AbstractListView.DATA_SOURCE = 'data-source';


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
})(KeyType || (KeyType = {}));

var SidebarLocation;

(function (SidebarLocation) {
  SidebarLocation[SidebarLocation["top"] = 0] = "top";
  SidebarLocation[SidebarLocation["right"] = 1] = "right";
  SidebarLocation[SidebarLocation["left"] = 2] = "left";
  SidebarLocation[SidebarLocation["bottom"] = 3] = "bottom";
})(SidebarLocation || (SidebarLocation = {}));

/***/ }),

/***/ "./src/ui-framework/SidebarViewContainer.ts":
/*!**************************************************!*\
  !*** ./src/ui-framework/SidebarViewContainer.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ConfigurationTypes */ "./src/ui-framework/ConfigurationTypes.ts");
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

  return SidebarViewContainer;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SidebarViewContainer);

/***/ }),

/***/ "./src/ui-framework/ViewListenerForwarder.ts":
/*!***************************************************!*\
  !*** ./src/ui-framework/ViewListenerForwarder.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
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

  _proto.itemDragStarted = function itemDragStarted(view, selectedItem) {
    if (!this.suppressEventEmits) {
      this.viewListeners.forEach(function (listener) {
        return listener.itemDragStarted(view, selectedItem);
      });
    }
  };

  _proto.itemSelected = function itemSelected(view, selectedItem) {
    if (!this.suppressEventEmits) {
      this.viewListeners.forEach(function (listener) {
        return listener.itemSelected(view, selectedItem);
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

  _proto.itemDeselected = function itemDeselected(view, deselectedItem) {
    if (!this.suppressEventEmits) {
      this.viewListeners.forEach(function (listener) {
        return listener.itemDeselected(view, deselectedItem);
      });
    }
  };

  return ViewListenerForwarder;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ViewListenerForwarder);

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
var AbstractForm = /*#__PURE__*/function () {
  function AbstractForm(containerId, dataObjDef) {
    this.formListeners = [];
    this.fieldListeners = [];
    this.uiDef = null;
    this.isVisible = false;
    this.fields = [];
    this.containerEl = document.getElementById(containerId);
    if (!this.containerEl) throw new Error("container " + containerId + " for form " + dataObjDef.id + " does not exist");
    this.map = [];
    this.dataObjDef = dataObjDef;
    this.currentDataObj = {}; // sub-classes need to create the form and it's fields
    // listen to ourselves

    this.addFormListener(this);
  }
  /* methods to be implemented in the subclass */


  var _proto = AbstractForm.prototype;

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
    logger("Finding field UI Config for field " + fieldDef.displayName);
    var result = null;

    if (this.uiDef) {
      var index = 0;

      while (index < this.uiDef.fieldGroups.length) {
        var fieldGroup = this.uiDef.fieldGroups[index];
        result = fieldGroup.fields.find(function (uiConfig) {
          return uiConfig.field.id === fieldDef.id;
        });

        if (result) {
          logger("Finding field UI Config for field " + fieldDef.displayName + " - Found");
          break;
        }

        index++;
      }
    }

    return result;
  };

  _proto.reset = function reset() {
    logger("Resetting form"); // inform the listeners

    if (this.uiDef) {
      var _this$containerEl, _this$containerEl$par;

      var formEvent = {
        formId: this.uiDef.id,
        target: this,
        eventType: _FormListener__WEBPACK_IMPORTED_MODULE_0__.FormEventType.RESETTING
      }; // remove the form from it's parent node

      (_this$containerEl = this.containerEl) == null ? void 0 : (_this$containerEl$par = _this$containerEl.parentNode) == null ? void 0 : _this$containerEl$par.removeChild(this.containerEl);
      this.informFormListeners(formEvent, this.currentDataObj);
    }

    this.currentDataObj = {};

    this._reset(); // reset all the fields


    this.fields.forEach(function (field) {
      field.reset();
    });
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
  };

  _proto.startCreateNew = function startCreateNew() {
    logger("Starting create new");
    this.currentDataObj = {};

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
  };

  _proto.startUpdate = function startUpdate(objectToEdit) {
    logger("Starting modify existing on ");
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
  };

  _proto.formChanged = function formChanged(event, formValues) {
    var _this = this; // catch form events for user leaving the form


    var shouldCancelChange = false;

    switch (event.eventType) {
      case _FormListener__WEBPACK_IMPORTED_MODULE_0__.FormEventType.CANCELLING:
        {
          logger("Form is cancelling - resetting"); // user cancelled the form, will become invisible

          this._reset(); // reset the form state


          break;
        }

      case _FormListener__WEBPACK_IMPORTED_MODULE_0__.FormEventType.DELETING:
        {
          logger("Form is deleting - resetting"); // user is deleting the object, will become invisible

          this._reset();

          break;
        }

      case _FormListener__WEBPACK_IMPORTED_MODULE_0__.FormEventType.SAVING:
        {
          logger("Form is saving, checking validation and storing values");
          var allFieldsValid = true; // user attempting to save the form, lets check the field validation

          this.fields.forEach(function (field) {
            var currentValue = field.getValue();

            if (!field.isValid()) {
              allFieldsValid = false;
            } else {
              _this.setFieldValueToDataObject(_this.currentDataObj, field, currentValue);
            }
          }); // is every field valid?

          if (!allFieldsValid) {
            logger("Form is saving, checking validation - FAILED");
            shouldCancelChange = true;
          } else {
            logger("formatted data object is");
            logger(this.getFormattedDataObject());
          }

          break;
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
    logger("Finding field for attribute " + dataFieldId + " ");
    var mapItem = this.map.find(function (mapItem) {
      return mapItem.attributeId === dataFieldId;
    });

    if (mapItem) {
      logger("Mapped attribute " + mapItem.attributeId + " to field " + mapItem.fieldId); // find the field with that id

      result = this.fields.find(function (field) {
        return field.getId() === mapItem.attributeId;
      });
    }

    return result;
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
/* harmony import */ var _FormElementFactory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./FormElementFactory */ "./src/ui-framework/form/FormElementFactory.ts");
/* harmony import */ var _InputField__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./InputField */ "./src/ui-framework/form/InputField.ts");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../util/BrowserUtil */ "./src/util/BrowserUtil.ts");
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








var logger = debug__WEBPACK_IMPORTED_MODULE_5___default()('basic-form');
var dlogger = debug__WEBPACK_IMPORTED_MODULE_5___default()('basic-form-detail');
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
                  field = new _InputField__WEBPACK_IMPORTED_MODULE_4__.TextAreaField(this.uiDef.id, fieldUIConfig, fieldDef, fieldEl);
                  break;
                }

              case _FormUITypeDefs__WEBPACK_IMPORTED_MODULE_0__.UIFieldType.radioGroup:
                {
                  field = new _InputField__WEBPACK_IMPORTED_MODULE_4__.RadioButtonGroupField(this.uiDef.id, fieldUIConfig, fieldDef, fieldEl, subElements);
                  break;
                }

              case _FormUITypeDefs__WEBPACK_IMPORTED_MODULE_0__.UIFieldType.select:
                {
                  field = new _InputField__WEBPACK_IMPORTED_MODULE_4__.SelectField(this.uiDef.id, fieldUIConfig, fieldDef, fieldEl);
                  break;
                }

              default:
                {
                  field = new _InputField__WEBPACK_IMPORTED_MODULE_4__.InputField(this.uiDef.id, fieldUIConfig, fieldDef, fieldEl);
                  break;
                }
            }

            this.fields.push(field);
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

  _proto.initialise = function initialise() {
    var _this2 = this;

    logger("Initialising"); // ok, so given a Data Object definition we are going to create the form ui config

    this.uiDef = _helper_BootstrapFormConfigHelper__WEBPACK_IMPORTED_MODULE_2__.BootstrapFormConfigHelper.getInstance().generateFormConfig(this.dataObjDef);
    logger(this.uiDef); // now we need to create all the form elements from the ui definition

    this.factoryElements = _FormElementFactory__WEBPACK_IMPORTED_MODULE_3__.FormElementFactory.getInstance().createFormElements(this, this.formListeners, this.uiDef, this.fieldListeners);
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
      result = field.render(currentValue);
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
      if (fieldValue) fieldValue = _this3.renderField(fieldDef, fieldValue);

      _this3.setFieldValueFromDataObject(fieldDef, fieldValue); // run the validation to let the user know what is required


      _this3.validateField(fieldDef);
    }); // delete button can go

    if (this.factoryElements) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_6__["default"].addAttributes(this.factoryElements.deleteButton, [{
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

      _this4.setFieldValueFromDataObject(fieldDef, _this4.currentDataObj[fieldDef.id]);

      _this4.validateField(fieldDef);
    }); // delete button make visible again

    if (this.factoryElements) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_6__["default"].removeAttributes(this.factoryElements.deleteButton, ['style']);
    if (this.factoryElements) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_6__["default"].addAttributes(this.factoryElements.deleteButton, [{
      name: 'style',
      value: 'display:block'
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
    var _this5 = this;

    logger("Getting current formatted data");
    var formattedResult = {};
    this.dataObjDef.fields.forEach(function (fieldDef) {
      var fieldValue = _this5.currentDataObj[fieldDef.id];
      formattedResult[fieldDef.id] = _this5.getFormattedFieldValue(fieldDef);
    });
    logger(formattedResult);
    return formattedResult;
  };

  return BasicFormImplementation;
}(_AbstractForm__WEBPACK_IMPORTED_MODULE_1__.AbstractForm);

/***/ }),

/***/ "./src/ui-framework/form/DataObjectTypeDefs.ts":
/*!*****************************************************!*\
  !*** ./src/ui-framework/form/DataObjectTypeDefs.ts ***!
  \*****************************************************/
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
})(FieldType || (FieldType = {}));

/***/ }),

/***/ "./src/ui-framework/form/FieldInputElementFactory.ts":
/*!***********************************************************!*\
  !*** ./src/ui-framework/form/FieldInputElementFactory.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FieldInputElementFactory": () => (/* binding */ FieldInputElementFactory)
/* harmony export */ });
/* harmony import */ var _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util/BrowserUtil */ "./src/util/BrowserUtil.ts");
/* harmony import */ var _FormUITypeDefs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FormUITypeDefs */ "./src/ui-framework/form/FormUITypeDefs.ts");
/* harmony import */ var _event_handlers_ValidationEventHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./event-handlers/ValidationEventHandler */ "./src/ui-framework/form/event-handlers/ValidationEventHandler.ts");
/* harmony import */ var _event_handlers_EditingEventListener__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./event-handlers/EditingEventListener */ "./src/ui-framework/form/event-handlers/EditingEventListener.ts");
/* harmony import */ var _DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DataObjectTypeDefs */ "./src/ui-framework/form/DataObjectTypeDefs.ts");






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


    if (fieldConfig.field.type === _DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_4__.FieldType.date) {
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

/***/ "./src/ui-framework/form/FormElementFactory.ts":
/*!*****************************************************!*\
  !*** ./src/ui-framework/form/FormElementFactory.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FormElementFactory": () => (/* binding */ FormElementFactory)
/* harmony export */ });
/* harmony import */ var _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util/BrowserUtil */ "./src/util/BrowserUtil.ts");
/* harmony import */ var _FieldInputElementFactory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FieldInputElementFactory */ "./src/ui-framework/form/FieldInputElementFactory.ts");
/* harmony import */ var _FormUITypeDefs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FormUITypeDefs */ "./src/ui-framework/form/FormUITypeDefs.ts");
/* harmony import */ var _FormListener__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./FormListener */ "./src/ui-framework/form/FormListener.ts");




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
  FormEventType["SAVING"] = "saving";
  FormEventType["SAVE_CANCELLED"] = "save-cancelled";
  FormEventType["DELETING"] = "deleting";
  FormEventType["DELETE_CANCELLED"] = "delete-cancelled";
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

/***/ "./src/ui-framework/form/InputField.ts":
/*!*********************************************!*\
  !*** ./src/ui-framework/form/InputField.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InputField": () => (/* binding */ InputField),
/* harmony export */   "SelectField": () => (/* binding */ SelectField),
/* harmony export */   "TextAreaField": () => (/* binding */ TextAreaField),
/* harmony export */   "RadioButtonGroupField": () => (/* binding */ RadioButtonGroupField)
/* harmony export */ });
/* harmony import */ var _FormUITypeDefs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FormUITypeDefs */ "./src/ui-framework/form/FormUITypeDefs.ts");
/* harmony import */ var _DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DataObjectTypeDefs */ "./src/ui-framework/form/DataObjectTypeDefs.ts");
/* harmony import */ var _event_handlers_ValidationEventHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./event-handlers/ValidationEventHandler */ "./src/ui-framework/form/event-handlers/ValidationEventHandler.ts");
/* harmony import */ var _event_handlers_RenderingEventListener__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./event-handlers/RenderingEventListener */ "./src/ui-framework/form/event-handlers/RenderingEventListener.ts");
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






var AbstractField = /*#__PURE__*/function () {
  function AbstractField(formId, config, fieldDef, element, subElements) {
    if (subElements === void 0) {
      subElements = null;
    }

    this.config = null;
    this.formId = formId;
    this.config = config;
    this.definition = fieldDef;
    this.element = element;
    this.validationHandler = new _event_handlers_ValidationEventHandler__WEBPACK_IMPORTED_MODULE_2__.ValidationEventHandler(formId, config, [this], subElements);
    this.renderingHandler = new _event_handlers_RenderingEventListener__WEBPACK_IMPORTED_MODULE_3__.RenderingEventListener(formId, config, [this], subElements);
  }

  var _proto = AbstractField.prototype;

  _proto.initialise = function initialise() {};

  _proto.getValue = function getValue() {
    var result = null;

    if (this.config && this.element) {
      // @ts-ignore
      result = this.element.value;

      if (this.config.elementType === _FormUITypeDefs__WEBPACK_IMPORTED_MODULE_0__.UIFieldType.checkbox) {
        // @ts-ignore
        result = '' + this.element.checked;
      }
    }

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
    if (this.element) {
      // @ts-ignore
      this.element.value = newValue;

      if (this.definition.type === _DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.boolean) {
        // @ts-ignore
        this.element.checked = newValue.toLowerCase() === 'true';
      }
    }
  };

  _proto.reset = function reset() {
    if (this.element) {
      switch (this.definition.type) {
        case _DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.boolean:
          {
            // @ts-ignore
            this.element.checked = false;
            break;
          }

        case _DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.integer:
          {
            // @ts-ignore
            this.element.value = '0';
            break;
          }

        case _DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.float:
          {
            // @ts-ignore
            this.element.value = '0.0';
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

  _proto.failedValidation = function failedValidation(field, currentValue, message) {};

  _proto.valueChanged = function valueChanged(field, newValue) {};

  return AbstractField;
}();

var InputField = /*#__PURE__*/function (_AbstractField) {
  _inheritsLoose(InputField, _AbstractField);

  function InputField(formId, config, fieldDef, element) {
    return _AbstractField.call(this, formId, config, fieldDef, element) || this;
  }

  return InputField;
}(AbstractField);
var SelectField = /*#__PURE__*/function (_AbstractField2) {
  _inheritsLoose(SelectField, _AbstractField2);

  function SelectField(formId, config, fieldDef, element) {
    return _AbstractField2.call(this, formId, config, fieldDef, element) || this;
  }

  return SelectField;
}(AbstractField);
var TextAreaField = /*#__PURE__*/function (_AbstractField3) {
  _inheritsLoose(TextAreaField, _AbstractField3);

  function TextAreaField(formId, config, fieldDef, element) {
    return _AbstractField3.call(this, formId, config, fieldDef, element) || this;
  }

  return TextAreaField;
}(AbstractField);
var RadioButtonGroupField = /*#__PURE__*/function (_AbstractField4) {
  _inheritsLoose(RadioButtonGroupField, _AbstractField4);

  function RadioButtonGroupField(formId, config, fieldDef, element, subElements) {
    return _AbstractField4.call(this, formId, config, fieldDef, element, subElements) || this;
  }

  return RadioButtonGroupField;
}(AbstractField);

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
          return listener.valueChanged(field, newValue);
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
/* harmony import */ var _DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../DataObjectTypeDefs */ "./src/ui-framework/form/DataObjectTypeDefs.ts");
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

  _proto.processValidation = function processValidation(fieldElement) {
    if (this.fieldConfig.validator && fieldElement) {
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

      var field = this.fieldConfig.field; // @ts-ignore

      var value = fieldElement.value; // checkboxes store values differently

      if (this.fieldConfig.elementType === _FormUITypeDefs__WEBPACK_IMPORTED_MODULE_1__.UIFieldType.checkbox) {
        // @ts-ignore
        value = '' + fieldElement.checked;
      }

      var validationResp = this.fieldConfig.validator.validator.isValidValue(field, value);
      var errorMessageDiv = document.getElementById(this.formId + ".field." + this.fieldConfig.field.id + ".error");
      var errorMessageEl = document.getElementById(this.formId + ".field." + this.fieldConfig.field.id + ".error.message"); // clear any previous message

      errorMessageDiv == null ? void 0 : errorMessageDiv.setAttribute('style', 'display:none');
      if (errorMessageEl) errorMessageEl.innerHTML = '';
      if (this.fieldConfig.validator.invalidClasses) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(validationElementTarget, this.fieldConfig.validator.invalidClasses, false);
      if (this.fieldConfig.validator.validClasses) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(validationElementTarget, this.fieldConfig.validator.validClasses);

      if (!validationResp.isValid) {
        if (this.fieldConfig.validator.invalidClasses) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(validationElementTarget, this.fieldConfig.validator.invalidClasses);
        if (this.fieldConfig.validator.validClasses) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_2__["default"].addRemoveClasses(validationElementTarget, this.fieldConfig.validator.validClasses, false);
        var message = validationResp.message;

        if (!message) {
          message = field.displayName + " does not have a valid value.";
        } // show the error message


        errorMessageDiv == null ? void 0 : errorMessageDiv.setAttribute('style', 'display:block');
        if (errorMessageEl) errorMessageEl.innerHTML = message;

        if (validationResp.resetOnFailure) {
          switch (field.type) {
            case _DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_0__.FieldType.boolean:
              {
                // @ts-ignore
                fieldElement.checked = false;
                break;
              }

            case _DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_0__.FieldType.integer:
              {
                // @ts-ignore
                fieldElement.value = '0';
                break;
              }

            case _DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_0__.FieldType.float:
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
          return listener.failedValidation(field, value, message);
        });
      }
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
/* harmony import */ var _form_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../form/DataObjectTypeDefs */ "./src/ui-framework/form/DataObjectTypeDefs.ts");
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
      case _form_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.date:
        {
          //convert to underlying number format
          result = moment__WEBPACK_IMPORTED_MODULE_0___default()(currentValue, 'DD/MM/YYYY').format('YYYYMMDD');
          break;
        }

      case _form_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.datetime:
        {
          //convert to underlying number format
          result = moment__WEBPACK_IMPORTED_MODULE_0___default()(currentValue, 'DD/MM/YYYY HH:mm:ss').format('YYYYMMDDHHmmss');
          break;
        }

      case _form_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.boolean:
        {
          result = currentValue.toLowerCase() === 'true';
          break;
        }

      case _form_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.id:
        {
          if (field.idType === _ConfigurationTypes__WEBPACK_IMPORTED_MODULE_4__.KeyType.number) {
            result = parseInt(currentValue);
          }

          break;
        }

      case _form_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.float:
        {
          var parsed = parseFloat(currentValue);

          if (!isNaN(parsed)) {
            result = parsed;
          }

          break;
        }

      case _form_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.integer:
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
      }
    } // ok, so we have some content, we need to check if the value is a valid format with regular expressions


    if (currentValue) {
      switch (field.type) {
        case _form_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.datetime:
          {
            response.isValid = BasicFieldOperations.dateTimeRegex.test(currentValue);

            if (!response.isValid) {
              response.message = field.displayName + " must be DD/MM/YYYY hh:mm";
            }

            break;
          }

        case _form_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.date:
          {
            response.isValid = BasicFieldOperations.dateRegex.test(currentValue);

            if (!response.isValid) {
              response.message = field.displayName + " must be DD/MM/YYYY";
            }

            break;
          }

        case _form_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.float:
          {
            response.isValid = BasicFieldOperations.floatRegexp.test(currentValue);

            if (!response.isValid) {
              response.message = field.displayName + " must be 00.00";
            }

            break;
          }

        case _form_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.id:
          {
            response.isValid = BasicFieldOperations.integerRegex.test(currentValue);

            if (!response.isValid) {
              response.message = field.displayName + " must be an integer";
            }

            break;
          }

        case _form_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.email:
          {
            response.isValid = BasicFieldOperations.emailRegex.test(currentValue);

            if (!response.isValid) {
              response.message = field.displayName + " must be an email address";
            }

            break;
          }

        case _form_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.integer:
          {
            response.isValid = BasicFieldOperations.integerRegex.test(currentValue);

            if (!response.isValid) {
              response.message = field.displayName + " must be an integer";
            }

            break;
          }

        case _form_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.text:
          {
            break;
          }

        case _form_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.password:
          {
            response.isValid = BasicFieldOperations.basicPasswordRegex.test(currentValue);

            if (!response.isValid) {
              response.message = field.displayName + " must be 8 to 15 letters and digits only";
            }

            break;
          }

        case _form_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.time:
          {
            response.isValid = BasicFieldOperations.timeRegex.test(currentValue);

            if (!response.isValid) {
              response.message = field.displayName + " must be 24 hour time format HH:MM:SS";
            }

            break;
          }

        case _form_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.shortTime:
          {
            response.isValid = BasicFieldOperations.shortTimeRegex.test(currentValue);

            if (!response.isValid) {
              response.message = field.displayName + " must be 24 hour time format HH:MM";
            }

            break;
          }

        case _form_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.boolean:
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

    var index = this.previousFieldValues.findIndex(function (fieldValue) {
      return fieldValue.id === field.id;
    });

    if (index >= 0) {
      //we have a previous value
      var fieldValue = this.previousFieldValues[index];
      rlogger("Rendering value for field " + field.displayName + " with new value " + currentValue + " - previous value " + fieldValue.value);
      if (fieldValue.value === currentValue) return null;
    } // either not yet seen or value has changed from previous


    if (currentValue.trim().length > 0) {
      // only attempt to render non-empty dates
      var newValue = currentValue;

      switch (field.type) {
        case _form_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.date:
          {
            newValue = moment__WEBPACK_IMPORTED_MODULE_0___default()(currentValue, 'YYYYMMDD').format('DD/MM/YYYY');
            break;
          }

        case _form_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.datetime:
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
      case _form_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.datetime:
        {
          result = moment__WEBPACK_IMPORTED_MODULE_0___default()().format('YYYYMMDDHHmmss');
          break;
        }

      case _form_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.date:
        {
          result = moment__WEBPACK_IMPORTED_MODULE_0___default()().format('YYYYMMDD');
          break;
        }

      case _form_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.float:
        {
          result = '0.0';
          break;
        }

      case _form_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.id:
        {
          result = '-1';
          break;
        }

      case _form_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.email:
        {
          result = 'me@me.com';
          break;
        }

      case _form_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.integer:
        {
          result = '0';
          break;
        }

      case _form_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.text:
        {
          result = '';
          break;
        }

      case _form_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.password:
        {
          result = '';
          break;
        }

      case _form_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.time:
        {
          result = '00:00:00';
          break;
        }

      case _form_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.shortTime:
        {
          result = '00:00';
          break;
        }

      case _form_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.boolean:
        {
          result = 'false';
          break;
        }

      case _form_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.uuid:
        {
          result = (0,uuid__WEBPACK_IMPORTED_MODULE_5__["default"])();
          break;
        }

      case _form_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_2__.FieldType.userId:
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
/* harmony import */ var _form_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../form/DataObjectTypeDefs */ "./src/ui-framework/form/DataObjectTypeDefs.ts");
/* harmony import */ var _form_FormUITypeDefs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../form/FormUITypeDefs */ "./src/ui-framework/form/FormUITypeDefs.ts");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _RBGFieldOperations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./RBGFieldOperations */ "./src/ui-framework/helper/RBGFieldOperations.ts");





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

  _proto.generateFormConfig = function generateFormConfig(dataObjDef) {
    var fieldOperations = new _BasicFieldOperations__WEBPACK_IMPORTED_MODULE_0__.BasicFieldOperations();
    var rbgFieldOperation = new _RBGFieldOperations__WEBPACK_IMPORTED_MODULE_4__.RBGFieldOperations(); // create the Field UI config for each field

    var fieldUIConfigs = [];
    dataObjDef.fields.forEach(function (fieldDef) {
      var fieldType = _form_FormUITypeDefs__WEBPACK_IMPORTED_MODULE_2__.UIFieldType.text;

      switch (fieldDef.type) {
        case _form_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.time:
        case _form_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.text:
        case _form_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.datetime:
        case _form_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.date:
        case _form_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.shortTime:
          {
            break;
          }

        case _form_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.uuid:
        case _form_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.id:
          {
            fieldType = _form_FormUITypeDefs__WEBPACK_IMPORTED_MODULE_2__.UIFieldType.hidden;
            break;
          }

        case _form_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.integer:
        case _form_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.float:
          {
            fieldType = _form_FormUITypeDefs__WEBPACK_IMPORTED_MODULE_2__.UIFieldType.number;
            break;
          }

        case _form_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.email:
          {
            fieldType = _form_FormUITypeDefs__WEBPACK_IMPORTED_MODULE_2__.UIFieldType.email;
            break;
          }

        case _form_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.password:
          {
            fieldType = _form_FormUITypeDefs__WEBPACK_IMPORTED_MODULE_2__.UIFieldType.password;
            break;
          }

        case _form_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.boolean:
          {
            fieldType = _form_FormUITypeDefs__WEBPACK_IMPORTED_MODULE_2__.UIFieldType.checkbox;
            break;
          }

        case _form_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.largeText:
          {
            fieldType = _form_FormUITypeDefs__WEBPACK_IMPORTED_MODULE_2__.UIFieldType.textarea;
            break;
          }

        case _form_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.choice:
          {
            fieldType = _form_FormUITypeDefs__WEBPACK_IMPORTED_MODULE_2__.UIFieldType.select;
            break;
          }

        case _form_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.limitedChoice:
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

      if (fieldDef.type !== _form_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.id && fieldDef.type !== _form_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.uuid) {
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


      if (fieldDef.type === _form_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.largeText) {
        fieldUIConfig.textarea = {
          rows: 5,
          cols: 20
        };
      } // select


      if (fieldDef.type === _form_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.choice) {
        // subelements are options, with no classes, no labels, and no other container
        fieldUIConfig.subElement = {
          element: {
            elementType: 'option',
            elementClasses: ''
          }
        };
        fieldUIConfig.datasource = fieldDef.dataSource;
      } // radio button group


      if (fieldDef.type === _form_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_1__.FieldType.limitedChoice) {
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
/* harmony export */   "isSameUsername": () => (/* binding */ isSameUsername),
/* harmony export */   "isSameGame": () => (/* binding */ isSameGame),
/* harmony export */   "isSameRoom": () => (/* binding */ isSameRoom)
/* harmony export */ });
function isSame(item1, item2) {
  return item1.id === item2.id;
}
function isSameUsername(item1, item2) {
  return item1.username === item2.username;
}
function isSameGame(item1, item2) {
  return item1.gameId === item2.gameId;
}
function isSameRoom(item1, item2) {
  return item1.roomName === item2.roomName;
}

/***/ }),

/***/ "./src/App.tsx":
/*!*********************!*\
  !*** ./src/App.tsx ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Controller__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Controller */ "./src/Controller.ts");
/* harmony import */ var _component_view_UserSearchView__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./component/view/UserSearchView */ "./src/component/view/UserSearchView.ts");
/* harmony import */ var _component_view_ChatLogsView__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./component/view/ChatLogsView */ "./src/component/view/ChatLogsView.ts");
/* harmony import */ var _component_view_BoardGameView__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./component/view/BoardGameView */ "./src/component/view/BoardGameView.tsx");
/* harmony import */ var _AppTypes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./AppTypes */ "./src/AppTypes.ts");
/* harmony import */ var _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./util/BrowserUtil */ "./src/util/BrowserUtil.ts");
/* harmony import */ var _component_controller_ScoreSheetController__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./component/controller/ScoreSheetController */ "./src/component/controller/ScoreSheetController.ts");
/* harmony import */ var _component_view_ScoreSheetDetailView__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./component/view/ScoreSheetDetailView */ "./src/component/view/ScoreSheetDetailView.ts");
/* harmony import */ var _component_view_ScoreSheetsView__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./component/view/ScoreSheetsView */ "./src/component/view/ScoreSheetsView.ts");
/* harmony import */ var _component_sidebar_UserSearchSidebar__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./component/sidebar/UserSearchSidebar */ "./src/component/sidebar/UserSearchSidebar.ts");
/* harmony import */ var _component_sidebar_ChatRoomsSidebar__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./component/sidebar/ChatRoomsSidebar */ "./src/component/sidebar/ChatRoomsSidebar.ts");
/* harmony import */ var _component_sidebar_ScoreSheetsSidebar__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./component/sidebar/ScoreSheetsSidebar */ "./src/component/sidebar/ScoreSheetsSidebar.ts");
/* harmony import */ var _component_view_ChatLogDetailView__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./component/view/ChatLogDetailView */ "./src/component/view/ChatLogDetailView.ts");
/* harmony import */ var _component_view_FavouriteUserView__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./component/view/FavouriteUserView */ "./src/component/view/FavouriteUserView.ts");
/* harmony import */ var _component_view_BlockedUserView__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./component/view/BlockedUserView */ "./src/component/view/BlockedUserView.ts");
/* harmony import */ var _component_sidebar_BoardGameSearchSidebar__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./component/sidebar/BoardGameSearchSidebar */ "./src/component/sidebar/BoardGameSearchSidebar.ts");
/* harmony import */ var _component_view_BGGSearchView__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./component/view/BGGSearchView */ "./src/component/view/BGGSearchView.ts");
/* harmony import */ var _ui_framework_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./ui-framework/ConfigurationTypes */ "./src/ui-framework/ConfigurationTypes.ts");
/* harmony import */ var _ui_framework_form_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./ui-framework/form/DataObjectTypeDefs */ "./src/ui-framework/form/DataObjectTypeDefs.ts");
/* harmony import */ var _model_BasicObjectDefinitionFactory__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./model/BasicObjectDefinitionFactory */ "./src/model/BasicObjectDefinitionFactory.ts");
/* harmony import */ var _ui_framework_form_BasicFormImplementation__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./ui-framework/form/BasicFormImplementation */ "./src/ui-framework/form/BasicFormImplementation.ts");
/* harmony import */ var _ui_framework_helper_SimpleValueDataSource__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./ui-framework/helper/SimpleValueDataSource */ "./src/ui-framework/helper/SimpleValueDataSource.ts");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/* eslint "react/react-in-jsx-scope":"off" */

/* eslint "react/jsx-no-undef":"off" */

























var logger = debug__WEBPACK_IMPORTED_MODULE_2___default()('app');

var Root = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(Root, _React$Component);

  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  function Root() {
    var _this;

    // @ts-ignore
    _this = _React$Component.call(this) || this;
    _this.state = {
      boardGames: []
    }; // event handlers

    _this.cancelDelete = _this.cancelDelete.bind(_assertThisInitialized(_this));
    _this.confirmDelete = _this.confirmDelete.bind(_assertThisInitialized(_this));
    _this.handleDeleteBoardGame = _this.handleDeleteBoardGame.bind(_assertThisInitialized(_this));
    _this.handleShowUserSearch = _this.handleShowUserSearch.bind(_assertThisInitialized(_this));
    _this.handleShowChat = _this.handleShowChat.bind(_assertThisInitialized(_this));
    _this.handleShowBGGSearch = _this.handleShowBGGSearch.bind(_assertThisInitialized(_this));
    _this.handleDrop = _this.handleDrop.bind(_assertThisInitialized(_this));
    _this.handleShowCollection = _this.handleShowCollection.bind(_assertThisInitialized(_this));
    _this.handleShowScoreSheet = _this.handleShowScoreSheet.bind(_assertThisInitialized(_this));
    _this.handleStartScoreSheet = _this.handleStartScoreSheet.bind(_assertThisInitialized(_this));
    _this.handleShowScores = _this.handleShowScores.bind(_assertThisInitialized(_this));
    _Controller__WEBPACK_IMPORTED_MODULE_3__["default"].getInstance().connectToApplication(_assertThisInitialized(_this), window.localStorage);
    return _this;
  }

  var _proto = Root.prototype;

  _proto.addBoardGameToDisplay = function addBoardGameToDisplay(draggedObject) {
    // ok, we are just the dumb view, pass this onto the controller to work out the logic for us
    _Controller__WEBPACK_IMPORTED_MODULE_3__["default"].getInstance().addBoardGameToDisplay(draggedObject);
  };

  _proto.getCurrentUser = function getCurrentUser() {
    return _Controller__WEBPACK_IMPORTED_MODULE_3__["default"].getInstance().getLoggedInUserId();
  };

  _proto.alert = function alert(title, content) {
    this.titleEl.textContent = title;
    this.contentEl.textContent = content; // @ts-ignore

    this.modalEl.classList.remove(_AppTypes__WEBPACK_IMPORTED_MODULE_7__.ALERT.hideClass); // @ts-ignore

    this.modalEl.classList.add(_AppTypes__WEBPACK_IMPORTED_MODULE_7__.ALERT.showClass);
  };

  _proto.render = function render() {
    var _this2 = this;

    logger("Rendering App"); // @ts-ignore

    var boardGames = this.state.boardGames;
    logger(boardGames);
    var games = boardGames.map(function (entry, index) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_component_view_BoardGameView__WEBPACK_IMPORTED_MODULE_6__["default"], {
        key: index,
        boardGame: entry,
        showScoresHandler: _this2.handleShowScores,
        addToCollectionHandler: _Controller__WEBPACK_IMPORTED_MODULE_3__["default"].getInstance().addBoardGameToCollection,
        removeFromCollectionHandler: _this2.handleDeleteBoardGame,
        startScoreSheetHandler: _this2.handleStartScoreSheet
      });
    });
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "root container-fluid"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "card-group"
    }));
  };

  _proto.cancelDelete = function cancelDelete(event) {
    // @ts-ignore
    this.modalEl.classList.remove(_AppTypes__WEBPACK_IMPORTED_MODULE_7__.ALERT.showClass); // @ts-ignore

    this.modalEl.classList.add(_AppTypes__WEBPACK_IMPORTED_MODULE_7__.ALERT.hideClass);
    event.preventDefault();
  };

  _proto.confirmDelete = function confirmDelete(event) {
    // @ts-ignore
    this.modalEl.classList.remove(_AppTypes__WEBPACK_IMPORTED_MODULE_7__.ALERT.showClass); // @ts-ignore

    this.modalEl.classList.add(_AppTypes__WEBPACK_IMPORTED_MODULE_7__.ALERT.hideClass);
    event.preventDefault();
    var id = this.modalEl.getAttribute(_Controller__WEBPACK_IMPORTED_MODULE_3__["default"].eventDataKeyId);
    id = parseInt(id);
    logger("Handling Delete with id " + id); // @ts-ignore

    var currentBoardGamesOnDisplay = this.state.boardGames;
    var index = currentBoardGamesOnDisplay.findIndex(function (game) {
      return game.gameId === id;
    });

    if (index >= 0) {
      var boardGame = currentBoardGamesOnDisplay[index];
      _Controller__WEBPACK_IMPORTED_MODULE_3__["default"].getInstance().removeBoardGameFromCollection(boardGame);
    }
  };

  _proto.handleStartScoreSheet = function handleStartScoreSheet(event) {
    event.preventDefault(); // do we already have an active score sheet?

    if (_component_controller_ScoreSheetController__WEBPACK_IMPORTED_MODULE_9__.ScoreSheetController.getInstance().hasActiveScoreSheet()) {
      if (confirm("You already have an active score sheet, do you want to finish that one and start a new one?")) {
        _component_controller_ScoreSheetController__WEBPACK_IMPORTED_MODULE_9__.ScoreSheetController.getInstance().endScoreSheet();
      } else {
        // user cancelled, finish
        return;
      }
    }

    this.hideAllSideBars(); // @ts-ignore

    var id = event.target.getAttribute(_Controller__WEBPACK_IMPORTED_MODULE_3__["default"].eventDataKeyId);
    logger("Handling starting score sheet for " + id);

    if (id) {
      // find the entry from the state manager
      id = parseInt(id); // @ts-ignore

      var currentBoardGamesOnDisplay = this.state.boardGames;
      var index = currentBoardGamesOnDisplay.findIndex(function (game) {
        return game.gameId === id;
      });

      if (index >= 0) {
        var boardGame = currentBoardGamesOnDisplay[index];
        logger(boardGame);
        _component_controller_ScoreSheetController__WEBPACK_IMPORTED_MODULE_9__.ScoreSheetController.getInstance().startScoreSheet(boardGame);
        this.switchBetweenCollectionAndScoreSheet(false);
      }
    }
  };

  _proto.handleDeleteBoardGame = function handleDeleteBoardGame(event) {
    event.preventDefault(); //this.hideAllSideBars();
    // @ts-ignore

    var id = event.target.getAttribute(_Controller__WEBPACK_IMPORTED_MODULE_3__["default"].eventDataKeyId);
    logger("Handling Delete Board Game " + id);

    if (id) {
      // find the entry from the state manager
      id = parseInt(id); // @ts-ignore

      var currentBoardGamesOnDisplay = this.state.boardGames;
      var index = currentBoardGamesOnDisplay.findIndex(function (game) {
        return game.gameId === id;
      });

      if (index >= 0) {
        var boardGame = currentBoardGamesOnDisplay[index];

        if (boardGame.decorator && boardGame.decorator === _AppTypes__WEBPACK_IMPORTED_MODULE_7__.Decorator.Persisted) {
          logger("Handling Delete Board Game " + id + " - persisted, confirming with user, but only if logged in");

          if (_Controller__WEBPACK_IMPORTED_MODULE_3__["default"].getInstance().isLoggedIn()) {
            // @ts-ignore
            this.modalEl.setAttribute(_Controller__WEBPACK_IMPORTED_MODULE_3__["default"].eventDataKeyId, id);
            this.alert(boardGame.name + " (" + boardGame.year + ")", "Are you sure you want to delete this board game from your collection?");
          } else {
            logger("Handling Delete Board Game " + id + " - IS persisted but not logged in, just deleting from local storage  asking controller to remove"); // not persisted yet, let the controller manage this one

            _Controller__WEBPACK_IMPORTED_MODULE_3__["default"].getInstance().removeBoardGameFromDisplay(boardGame);
          }
        } else {
          logger("Handling Delete Board Game " + id + " - NOT persisted, asking controller to remove"); // not persisted yet, let the controller manage this one

          _Controller__WEBPACK_IMPORTED_MODULE_3__["default"].getInstance().removeBoardGameFromDisplay(boardGame);
        }
      }
    }
  };

  _proto.componentDidMount = /*#__PURE__*/function () {
    var _componentDidMount = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var chatLogView, recentSearches, favouriteUsers, blockedUsers, bggSearch, dataObjDef, dataSource, form;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              logger('component Did Mount');
              this.chatSidebar = new _component_sidebar_ChatRoomsSidebar__WEBPACK_IMPORTED_MODULE_13__["default"](); // add the views to the chat side bar

              this.chatView = new _component_view_ChatLogsView__WEBPACK_IMPORTED_MODULE_5__["default"]();
              this.chatSidebar.addView(this.chatView, {
                containerId: _component_sidebar_ChatRoomsSidebar__WEBPACK_IMPORTED_MODULE_13__["default"].SidebarContainers.chatLogs
              });
              chatLogView = new _component_view_ChatLogDetailView__WEBPACK_IMPORTED_MODULE_15__["default"](_Controller__WEBPACK_IMPORTED_MODULE_3__["default"].getInstance().getStateManager());
              this.chatSidebar.addView(chatLogView, {
                containerId: _component_sidebar_ChatRoomsSidebar__WEBPACK_IMPORTED_MODULE_13__["default"].SidebarContainers.chatLog
              });
              this.chatView.addEventListener(chatLogView);
              this.chatSidebar.onDocumentLoaded();
              this.userSearchSidebar = new _component_sidebar_UserSearchSidebar__WEBPACK_IMPORTED_MODULE_12__["default"](); // add the subviews for the user search

              recentSearches = new _component_view_UserSearchView__WEBPACK_IMPORTED_MODULE_4__["default"](_Controller__WEBPACK_IMPORTED_MODULE_3__["default"].getInstance().getStateManager());
              this.userSearchSidebar.addView(recentSearches, {
                containerId: _component_sidebar_UserSearchSidebar__WEBPACK_IMPORTED_MODULE_12__["default"].SidebarContainers.recentSearches
              });
              favouriteUsers = new _component_view_FavouriteUserView__WEBPACK_IMPORTED_MODULE_16__["default"](_Controller__WEBPACK_IMPORTED_MODULE_3__["default"].getInstance().getStateManager());
              this.userSearchSidebar.addView(favouriteUsers, {
                containerId: _component_sidebar_UserSearchSidebar__WEBPACK_IMPORTED_MODULE_12__["default"].SidebarContainers.favourites
              });
              blockedUsers = new _component_view_BlockedUserView__WEBPACK_IMPORTED_MODULE_17__["default"](_Controller__WEBPACK_IMPORTED_MODULE_3__["default"].getInstance().getStateManager());
              this.userSearchSidebar.addView(blockedUsers, {
                containerId: _component_sidebar_UserSearchSidebar__WEBPACK_IMPORTED_MODULE_12__["default"].SidebarContainers.blocked
              });
              this.userSearchSidebar.onDocumentLoaded();
              this.bggSearchSidebar = new _component_sidebar_BoardGameSearchSidebar__WEBPACK_IMPORTED_MODULE_18__["default"]();
              bggSearch = new _component_view_BGGSearchView__WEBPACK_IMPORTED_MODULE_19__["default"]();
              this.bggSearchSidebar.addView(bggSearch, {
                containerId: _component_sidebar_BoardGameSearchSidebar__WEBPACK_IMPORTED_MODULE_18__["default"].bggSearchResults
              });
              this.bggSearchSidebar.onDocumentLoaded();
              bggSearch.addEventListener(this);
              this.scoreSheetSidebar = new _component_sidebar_ScoreSheetsSidebar__WEBPACK_IMPORTED_MODULE_14__["default"]();
              this.scoresView = new _component_view_ScoreSheetsView__WEBPACK_IMPORTED_MODULE_11__["default"]();
              this.scoreSheetSidebar.addView(this.scoresView, {
                containerId: _component_sidebar_ScoreSheetsSidebar__WEBPACK_IMPORTED_MODULE_14__["default"].scoreSheets
              });
              this.scoreSheetSidebar.onDocumentLoaded();
              _component_view_ScoreSheetDetailView__WEBPACK_IMPORTED_MODULE_10__.ScoreSheetDetailView.getInstance().onDocumentLoaded(); // navigation item handlers

              if (document) {
                // @ts-ignore
                document.getElementById(_AppTypes__WEBPACK_IMPORTED_MODULE_7__.NAVIGATION.boardGameSearchId).addEventListener('click', this.handleShowBGGSearch); // @ts-ignore

                document.getElementById(_AppTypes__WEBPACK_IMPORTED_MODULE_7__.NAVIGATION.userSearchId).addEventListener('click', this.handleShowUserSearch); // @ts-ignore

                this.chatNavigationItem = document.getElementById(_AppTypes__WEBPACK_IMPORTED_MODULE_7__.NAVIGATION.chatId); // @ts-ignore

                this.chatNavigationItem.addEventListener('click', this.handleShowChat); // @ts-ignore

                document.getElementById(_AppTypes__WEBPACK_IMPORTED_MODULE_7__.NAVIGATION.showMyCollection).addEventListener('click', this.handleShowCollection); // @ts-ignore

                document.getElementById(_AppTypes__WEBPACK_IMPORTED_MODULE_7__.NAVIGATION.showScoreSheet).addEventListener('click', this.handleShowScoreSheet);
              } // alert modal dialog setup
              // @ts-ignore


              this.modalEl = document.getElementById(_AppTypes__WEBPACK_IMPORTED_MODULE_7__.ALERT.modalId); // @ts-ignore

              this.titleEl = document.getElementById(_AppTypes__WEBPACK_IMPORTED_MODULE_7__.ALERT.titleId); // @ts-ignore

              this.contentEl = document.getElementById(_AppTypes__WEBPACK_IMPORTED_MODULE_7__.ALERT.contentId); // @ts-ignore

              this.cancelBtnEl = document.getElementById(_AppTypes__WEBPACK_IMPORTED_MODULE_7__.ALERT.cancelButtonId); // @ts-ignore

              this.confirmBtnEl = document.getElementById(_AppTypes__WEBPACK_IMPORTED_MODULE_7__.ALERT.confirmButtonId); // @ts-ignore

              this.closeBtnEl = document.getElementById(_AppTypes__WEBPACK_IMPORTED_MODULE_7__.ALERT.closeButtonId); // event listeners for the confirm delete of entry

              if (this.cancelBtnEl) this.cancelBtnEl.addEventListener('click', this.cancelDelete);
              if (this.confirmBtnEl) this.confirmBtnEl.addEventListener('click', this.confirmDelete);
              if (this.closeBtnEl) this.closeBtnEl.addEventListener('click', this.cancelDelete); // a reference to the div containing ourselves
              // @ts-ignore

              this.thisEl = document.getElementById('root'); // @ts-ignore

              this.scoreSheetEl = document.getElementById('scoreSheetZone');

              if (this.thisEl) {
                this.thisEl.addEventListener('dragover', function (event) {
                  event.preventDefault();
                });
                this.thisEl.addEventListener('drop', this.handleDrop);
              } // ok lets try get things done


              _component_controller_ScoreSheetController__WEBPACK_IMPORTED_MODULE_9__.ScoreSheetController.getInstance().initialise(this);
              _Controller__WEBPACK_IMPORTED_MODULE_3__["default"].getInstance().initialise(); // now lets break things with a new form

              dataObjDef = _model_BasicObjectDefinitionFactory__WEBPACK_IMPORTED_MODULE_22__.BasicObjectDefinitionFactory.getInstance().createBasicObject("test", "Test", true, true);
              _model_BasicObjectDefinitionFactory__WEBPACK_IMPORTED_MODULE_22__.BasicObjectDefinitionFactory.getInstance().addStringFieldToObjDefinition(dataObjDef, "email", "Email", _ui_framework_form_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_21__.FieldType.email, true, "We totally won't message with this...");
              _model_BasicObjectDefinitionFactory__WEBPACK_IMPORTED_MODULE_22__.BasicObjectDefinitionFactory.getInstance().addStringFieldToObjDefinition(dataObjDef, "float", "Float", _ui_framework_form_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_21__.FieldType.float, true, "A number yo....");
              _model_BasicObjectDefinitionFactory__WEBPACK_IMPORTED_MODULE_22__.BasicObjectDefinitionFactory.getInstance().addStringFieldToObjDefinition(dataObjDef, "checkbox", "Checkbox?", _ui_framework_form_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_21__.FieldType.boolean, true, "Yes or No?");
              _model_BasicObjectDefinitionFactory__WEBPACK_IMPORTED_MODULE_22__.BasicObjectDefinitionFactory.getInstance().addStringFieldToObjDefinition(dataObjDef, "date", "Date", _ui_framework_form_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_21__.FieldType.date, true, "Date yep");
              _model_BasicObjectDefinitionFactory__WEBPACK_IMPORTED_MODULE_22__.BasicObjectDefinitionFactory.getInstance().addStringFieldToObjDefinition(dataObjDef, "time", "Time", _ui_framework_form_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_21__.FieldType.shortTime, true, "How long till we get there?");
              _model_BasicObjectDefinitionFactory__WEBPACK_IMPORTED_MODULE_22__.BasicObjectDefinitionFactory.getInstance().addStringFieldToObjDefinition(dataObjDef, "textarea", "TextArea", _ui_framework_form_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_21__.FieldType.largeText, true, "An essay");
              dataSource = new _ui_framework_helper_SimpleValueDataSource__WEBPACK_IMPORTED_MODULE_24__.SimpleValueDataSource([{
                name: ' ',
                value: ' '
              }, {
                name: 'Justice League',
                value: 'jl'
              }, {
                name: 'Marvel',
                value: 'marvel'
              }, {
                name: 'Other',
                value: 'other'
              }]);
              _model_BasicObjectDefinitionFactory__WEBPACK_IMPORTED_MODULE_22__.BasicObjectDefinitionFactory.getInstance().addStringFieldToObjDefinition(dataObjDef, "select", "Select", _ui_framework_form_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_21__.FieldType.choice, true, "Some choices", dataSource);
              _model_BasicObjectDefinitionFactory__WEBPACK_IMPORTED_MODULE_22__.BasicObjectDefinitionFactory.getInstance().addStringFieldToObjDefinition(dataObjDef, "rbg", "RBG", _ui_framework_form_DataObjectTypeDefs__WEBPACK_IMPORTED_MODULE_21__.FieldType.limitedChoice, true, "Some similar choices", new _ui_framework_helper_SimpleValueDataSource__WEBPACK_IMPORTED_MODULE_24__.SimpleValueDataSource([{
                name: 'Justice League',
                value: 'jl'
              }, {
                name: 'Marvel',
                value: 'marvel'
              }, {
                name: 'Other',
                value: 'other'
              }])); // okay lets make a form

              form = new _ui_framework_form_BasicFormImplementation__WEBPACK_IMPORTED_MODULE_23__.BasicFormImplementation("testForm", dataObjDef);
              form.initialise();
              form.startCreateNew();
              form.setIsVisible(true); // change the select options

              dataSource.addValueOption('X-Men', 'xmen');

            case 56:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function componentDidMount() {
      return _componentDidMount.apply(this, arguments);
    }

    return componentDidMount;
  }();

  _proto.hideAllSideBars = function hideAllSideBars() {
    this.chatSidebar.eventHide(null);
    this.userSearchSidebar.eventHide(null);
    this.bggSearchSidebar.eventHide(null);
  };

  _proto.handleShowCollection = function handleShowCollection(event) {
    this.switchBetweenCollectionAndScoreSheet(true);
  };

  _proto.handleShowScoreSheet = function handleShowScoreSheet(event) {
    this.switchBetweenCollectionAndScoreSheet(false);
  };

  _proto.handleShowUserSearch = function handleShowUserSearch(event) {
    logger('Handling Show User Search');
    event.preventDefault(); //this.hideAllSideBars();
    // prevent anything from happening if we are not logged in

    if (!_Controller__WEBPACK_IMPORTED_MODULE_3__["default"].getInstance().isLoggedIn()) {
      // @ts-ignore
      window.location.href = _AppTypes__WEBPACK_IMPORTED_MODULE_7__.API_Config.login;
      return;
    }

    this.userSearchSidebar.eventShow(event);
  };

  _proto.handleShowScores = function handleShowScores(event) {
    logger("Handling show board game scores");
    event.preventDefault(); // @ts-ignore

    var id = event.target.getAttribute(_Controller__WEBPACK_IMPORTED_MODULE_3__["default"].eventDataKeyId);
    logger("Handling Show board game scores " + id);

    if (id) {
      // find the entry from the state manager
      id = parseInt(id); // @ts-ignore

      var currentBoardGamesOnDisplay = this.state.boardGames;
      var index = currentBoardGamesOnDisplay.findIndex(function (game) {
        return game.gameId === id;
      });

      if (index >= 0) {
        var boardGame = currentBoardGamesOnDisplay[index];
        this.scoresView.setSelectedBoardGame(boardGame);
        this.scoreSheetSidebar.eventShow(null);
      }
    }
  };

  _proto.handleShowChat = function handleShowChat(roomName) {
    logger('Handling Show Chat'); //event.preventDefault();
    //this.hideAllSideBars();
    // prevent anything from happening if we are not logged in

    if (!_Controller__WEBPACK_IMPORTED_MODULE_3__["default"].getInstance().isLoggedIn()) {
      // @ts-ignore
      window.location.href = _AppTypes__WEBPACK_IMPORTED_MODULE_7__.API_Config.login;
      return;
    }

    this.chatSidebar.eventShow(null);

    if (roomName) {
      this.chatView.selectChatRoom(roomName);
    }
  };

  _proto.handleShowBGGSearch = function handleShowBGGSearch(event) {
    logger('Handling Show BGG Search View');
    event.preventDefault(); // prevent anything from happening if we are not logged in

    if (!_Controller__WEBPACK_IMPORTED_MODULE_3__["default"].getInstance().isLoggedIn()) {
      this.hideAllSideBars(); // @ts-ignore
    }

    this.bggSearchSidebar.eventShow(event);
  };

  _proto.countChanged = function countChanged(newCount) {
    //
    var buffer = 'Chat <i class="fas fa-inbox"></i>';

    if (newCount > 0) {
      buffer += " <span class=\"badge badge-pill badge-primary\">&nbsp;" + newCount + "&nbsp;</span>";
    }

    if (this.chatNavigationItem) this.chatNavigationItem.innerHTML = "" + buffer;
  };

  _proto.handleDrop = function handleDrop(event) {
    // @ts-ignore
    var draggedObjectJSON = event.dataTransfer.getData(_ui_framework_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_20__.DRAGGABLE_KEY_ID);
    logger(draggedObjectJSON);
    var draggedObject = JSON.parse(draggedObjectJSON);
    logger(draggedObject); // @ts-ignore

    if (draggedObject[_ui_framework_ConfigurationTypes__WEBPACK_IMPORTED_MODULE_20__.DRAGGABLE_TYPE] === _AppTypes__WEBPACK_IMPORTED_MODULE_7__.DRAGGABLE.typeBoardGame) {
      draggedObject.gameId = parseInt(draggedObject.gameId);
      this.addBoardGameToDisplay(draggedObject);
    }
  };

  _proto.switchBetweenCollectionAndScoreSheet = function switchBetweenCollectionAndScoreSheet(showCollection) {
    if (showCollection) {
      if (this.thisEl) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_8__["default"].addRemoveClasses(this.thisEl, 'd-none', false);
      if (this.thisEl) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_8__["default"].addRemoveClasses(this.thisEl, 'd-block', true);
      if (this.scoreSheetEl) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_8__["default"].addRemoveClasses(this.scoreSheetEl, 'd-none', true);
      if (this.scoreSheetEl) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_8__["default"].addRemoveClasses(this.scoreSheetEl, 'd-block', false);
    } else {
      if (_component_controller_ScoreSheetController__WEBPACK_IMPORTED_MODULE_9__.ScoreSheetController.getInstance().hasActiveScoreSheet()) {
        if (this.thisEl) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_8__["default"].addRemoveClasses(this.thisEl, 'd-none', true);
        if (this.thisEl) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_8__["default"].addRemoveClasses(this.thisEl, 'd-block', false);
        if (this.scoreSheetEl) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_8__["default"].addRemoveClasses(this.scoreSheetEl, 'd-none', false);
        if (this.scoreSheetEl) _util_BrowserUtil__WEBPACK_IMPORTED_MODULE_8__["default"].addRemoveClasses(this.scoreSheetEl, 'd-block', true);
      }
    }
  };

  _proto.documentLoaded = function documentLoaded(view) {};

  _proto.hideRequested = function hideRequested(view) {};

  _proto.showRequested = function showRequested(view) {};

  _proto.itemAction = function itemAction(view, actionName, selectedItem) {};

  _proto.canDeleteItem = function canDeleteItem(view, selectedItem) {
    return true;
  };

  _proto.itemDeleted = function itemDeleted(view, selectedItem) {};

  _proto.itemDeselected = function itemDeselected(view, selectedItem) {};

  _proto.itemDragStarted = function itemDragStarted(view, selectedItem) {};

  _proto.itemDropped = function itemDropped(view, droppedItem) {};

  _proto.itemSelected = function itemSelected(view, selectedItem) {
    // add a new board game to the display
    selectedItem.gameId = parseInt(selectedItem.gameId);
    this.addBoardGameToDisplay(selectedItem);
  };

  return Root;
}(react__WEBPACK_IMPORTED_MODULE_0__.Component); //localStorage.debug = 'app controller-ts controller-ts-detail api-ts socket-ts abstract-form bootstrap-form-config-helper basic-form basic-form-detail chat-sidebar chat-sidebar:detail socket-listener notification-controller chat-manager board-game-search-sidebar board-game-search-sidebar:detail score-sheet-controller score-sheet-view score-sheet-sidebar score-sheet-sidebar:detail view-ts view-ts-detail user-search user-search-detail template-manager sidebar-container' ;


localStorage.debug = 'basic-field-operations-generator basic-field-operations-renderer basic-field-operations-validator basic-field-operations-formatter';
(debug__WEBPACK_IMPORTED_MODULE_2___default().log) = console.info.bind(console); // @ts-ignore

var element = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Root, {
  className: "container-fluid justify-content-around"
});
react_dom__WEBPACK_IMPORTED_MODULE_1__.render(element, document.getElementById('root'));

/***/ }),

/***/ "./src/component/view/BoardGameView.tsx":
/*!**********************************************!*\
  !*** ./src/component/view/BoardGameView.tsx ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BoardGameView)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Controller */ "./src/Controller.ts");
/* harmony import */ var _AppTypes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../AppTypes */ "./src/AppTypes.ts");




var beLogger = debug__WEBPACK_IMPORTED_MODULE_1___default()('view-ts:boardgameview'); // @ts-ignore

function BoardGameView(_ref) {
  var boardGame = _ref.boardGame,
      showScoresHandler = _ref.showScoresHandler,
      addToCollectionHandler = _ref.addToCollectionHandler,
      removeFromCollectionHandler = _ref.removeFromCollectionHandler,
      startScoreSheetHandler = _ref.startScoreSheetHandler;

  if (boardGame) {
    beLogger("Board Game " + boardGame.gameId);
    var addButton = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
      type: "button",
      className: "btn-primary btn-sm rounded p-1 mt-1 w-100",
      "board-game-id": boardGame.gameId,
      onClick: addToCollectionHandler
    }, "\xA0\xA0Add to ", !_Controller__WEBPACK_IMPORTED_MODULE_2__["default"].getInstance().isLoggedIn() ? 'Browser' : '', " Collection \xA0", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("i", {
      className: "fas fa-star"
    }), "\xA0\xA0"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
      type: "button",
      className: "btn-primary btn-sm rounded p-1 mt-1 w-100",
      "board-game-id": boardGame.gameId,
      onClick: removeFromCollectionHandler
    }, "\xA0\xA0Remove from Display\xA0", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("i", {
      className: "fas fa-trash-alt"
    })));
    var deleteButton = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
      type: "button",
      className: "btn-warning btn-sm rounded p-1 mt-1 w-100",
      "board-game-id": boardGame.gameId,
      onClick: removeFromCollectionHandler
    }, "\xA0\xA0Remove from ", !_Controller__WEBPACK_IMPORTED_MODULE_2__["default"].getInstance().isLoggedIn() ? 'Browser' : '', " Collection \xA0", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("i", {
      className: "far fa-star"
    }), "\xA0\xA0");
    var startScoreSheetButton = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
      type: "button",
      className: "btn-secondary btn-sm rounded p-1 mr-2 mt-2 w-100",
      "board-game-id": boardGame.gameId,
      onClick: startScoreSheetHandler
    }, "\xA0\xA0Start Score Sheet \xA0", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("i", {
      className: "fas fa-list-alt"
    }), "\xA0\xA0"); // do we have any scores?

    var scoreCount = 0;

    if (boardGame.scoresheets) {
      scoreCount = boardGame.scoresheets.length;
    } //        let overlay = <div className="card-img-overlay">


    var favouriteIcon = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("i", {
      className: "fas fa-star text-black"
    });
    var scoreBadge = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
      "board-game-id": boardGame.gameId,
      className: "badge badge-pill badge-info ml-1",
      onClick: showScoresHandler
    }, "Scores: ", scoreCount);

    if (boardGame.decorator && boardGame.decorator !== _AppTypes__WEBPACK_IMPORTED_MODULE_3__.Decorator.Incomplete) {
      var bggURL = "https://boardgamegeek.com/boardgame/" + boardGame.gameId;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "col-sm-12 col-md-6 col-lg-4 col-xl-3 p-2"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "card"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", {
        href: bggURL,
        target: "_blank"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("img", {
        className: "card-img-top",
        src: boardGame.image,
        alt: "Card image cap"
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "card-body scroll"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h5", {
        className: "card-title"
      }, boardGame.name, " (", boardGame.year, ") ", boardGame.decorator === _AppTypes__WEBPACK_IMPORTED_MODULE_3__.Decorator.Persisted || boardGame.decorator === _AppTypes__WEBPACK_IMPORTED_MODULE_3__.Decorator.PersistedLocally ? favouriteIcon : '', " ", boardGame.decorator === _AppTypes__WEBPACK_IMPORTED_MODULE_3__.Decorator.Persisted || boardGame.decorator === _AppTypes__WEBPACK_IMPORTED_MODULE_3__.Decorator.PersistedLocally ? scoreBadge : '', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("br", null), " ", _Controller__WEBPACK_IMPORTED_MODULE_2__["default"].getInstance().isLoggedIn() ? boardGame.decorator === _AppTypes__WEBPACK_IMPORTED_MODULE_3__.Decorator.Persisted ? deleteButton : addButton : deleteButton), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
        className: "card-text"
      }, boardGame.description), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
        className: "card-text"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("small", {
        className: "text-muted"
      }, "Play Time: ", boardGame.minPlayTime, " - ", boardGame.maxPlayTime, " min", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("br", null), "Players: ", boardGame.minPlayers, " - ", boardGame.maxPlayers, " Min Age:", boardGame.minAge, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("br", null), "Categories: ", boardGame.categories))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "card-footer text-right text-muted"
      }, "Rank: ", boardGame.rank, " Score: ", boardGame.averageScore, " from ", boardGame.numOfRaters, " raters", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("br", null), startScoreSheetButton)));
    } else {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "col-sm-12 col-md-6 col-lg-4 col-xl-3 p-2"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "card"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("img", {
        className: "card-img-top",
        src: "/img/spinner.gif",
        alt: "Card image cap"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "card-body"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h5", {
        className: "card-title"
      }, boardGame.name, " (", boardGame.year, ") "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
        className: "card-text"
      }, "Loading..."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
        className: "card-text"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("small", {
        className: "text-muted"
      }, "Loading..."))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "card-footer text-right text-muted"
      }, "Loading...")));
    }
  } else {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "col-sm-12 col-md-6 col-lg-4 col-xl-3 p-2"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "card"
    }));
  }
}

/***/ }),

/***/ "./node_modules/handsontable/node_modules/moment/locale sync recursive ^\\.\\/.*$":
/*!*****************************************************************************!*\
  !*** ./node_modules/handsontable/node_modules/moment/locale/ sync ^\.\/.*$ ***!
  \*****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./af": "./node_modules/handsontable/node_modules/moment/locale/af.js",
	"./af.js": "./node_modules/handsontable/node_modules/moment/locale/af.js",
	"./ar": "./node_modules/handsontable/node_modules/moment/locale/ar.js",
	"./ar-dz": "./node_modules/handsontable/node_modules/moment/locale/ar-dz.js",
	"./ar-dz.js": "./node_modules/handsontable/node_modules/moment/locale/ar-dz.js",
	"./ar-kw": "./node_modules/handsontable/node_modules/moment/locale/ar-kw.js",
	"./ar-kw.js": "./node_modules/handsontable/node_modules/moment/locale/ar-kw.js",
	"./ar-ly": "./node_modules/handsontable/node_modules/moment/locale/ar-ly.js",
	"./ar-ly.js": "./node_modules/handsontable/node_modules/moment/locale/ar-ly.js",
	"./ar-ma": "./node_modules/handsontable/node_modules/moment/locale/ar-ma.js",
	"./ar-ma.js": "./node_modules/handsontable/node_modules/moment/locale/ar-ma.js",
	"./ar-sa": "./node_modules/handsontable/node_modules/moment/locale/ar-sa.js",
	"./ar-sa.js": "./node_modules/handsontable/node_modules/moment/locale/ar-sa.js",
	"./ar-tn": "./node_modules/handsontable/node_modules/moment/locale/ar-tn.js",
	"./ar-tn.js": "./node_modules/handsontable/node_modules/moment/locale/ar-tn.js",
	"./ar.js": "./node_modules/handsontable/node_modules/moment/locale/ar.js",
	"./az": "./node_modules/handsontable/node_modules/moment/locale/az.js",
	"./az.js": "./node_modules/handsontable/node_modules/moment/locale/az.js",
	"./be": "./node_modules/handsontable/node_modules/moment/locale/be.js",
	"./be.js": "./node_modules/handsontable/node_modules/moment/locale/be.js",
	"./bg": "./node_modules/handsontable/node_modules/moment/locale/bg.js",
	"./bg.js": "./node_modules/handsontable/node_modules/moment/locale/bg.js",
	"./bm": "./node_modules/handsontable/node_modules/moment/locale/bm.js",
	"./bm.js": "./node_modules/handsontable/node_modules/moment/locale/bm.js",
	"./bn": "./node_modules/handsontable/node_modules/moment/locale/bn.js",
	"./bn.js": "./node_modules/handsontable/node_modules/moment/locale/bn.js",
	"./bo": "./node_modules/handsontable/node_modules/moment/locale/bo.js",
	"./bo.js": "./node_modules/handsontable/node_modules/moment/locale/bo.js",
	"./br": "./node_modules/handsontable/node_modules/moment/locale/br.js",
	"./br.js": "./node_modules/handsontable/node_modules/moment/locale/br.js",
	"./bs": "./node_modules/handsontable/node_modules/moment/locale/bs.js",
	"./bs.js": "./node_modules/handsontable/node_modules/moment/locale/bs.js",
	"./ca": "./node_modules/handsontable/node_modules/moment/locale/ca.js",
	"./ca.js": "./node_modules/handsontable/node_modules/moment/locale/ca.js",
	"./cs": "./node_modules/handsontable/node_modules/moment/locale/cs.js",
	"./cs.js": "./node_modules/handsontable/node_modules/moment/locale/cs.js",
	"./cv": "./node_modules/handsontable/node_modules/moment/locale/cv.js",
	"./cv.js": "./node_modules/handsontable/node_modules/moment/locale/cv.js",
	"./cy": "./node_modules/handsontable/node_modules/moment/locale/cy.js",
	"./cy.js": "./node_modules/handsontable/node_modules/moment/locale/cy.js",
	"./da": "./node_modules/handsontable/node_modules/moment/locale/da.js",
	"./da.js": "./node_modules/handsontable/node_modules/moment/locale/da.js",
	"./de": "./node_modules/handsontable/node_modules/moment/locale/de.js",
	"./de-at": "./node_modules/handsontable/node_modules/moment/locale/de-at.js",
	"./de-at.js": "./node_modules/handsontable/node_modules/moment/locale/de-at.js",
	"./de-ch": "./node_modules/handsontable/node_modules/moment/locale/de-ch.js",
	"./de-ch.js": "./node_modules/handsontable/node_modules/moment/locale/de-ch.js",
	"./de.js": "./node_modules/handsontable/node_modules/moment/locale/de.js",
	"./dv": "./node_modules/handsontable/node_modules/moment/locale/dv.js",
	"./dv.js": "./node_modules/handsontable/node_modules/moment/locale/dv.js",
	"./el": "./node_modules/handsontable/node_modules/moment/locale/el.js",
	"./el.js": "./node_modules/handsontable/node_modules/moment/locale/el.js",
	"./en-SG": "./node_modules/handsontable/node_modules/moment/locale/en-SG.js",
	"./en-SG.js": "./node_modules/handsontable/node_modules/moment/locale/en-SG.js",
	"./en-au": "./node_modules/handsontable/node_modules/moment/locale/en-au.js",
	"./en-au.js": "./node_modules/handsontable/node_modules/moment/locale/en-au.js",
	"./en-ca": "./node_modules/handsontable/node_modules/moment/locale/en-ca.js",
	"./en-ca.js": "./node_modules/handsontable/node_modules/moment/locale/en-ca.js",
	"./en-gb": "./node_modules/handsontable/node_modules/moment/locale/en-gb.js",
	"./en-gb.js": "./node_modules/handsontable/node_modules/moment/locale/en-gb.js",
	"./en-ie": "./node_modules/handsontable/node_modules/moment/locale/en-ie.js",
	"./en-ie.js": "./node_modules/handsontable/node_modules/moment/locale/en-ie.js",
	"./en-il": "./node_modules/handsontable/node_modules/moment/locale/en-il.js",
	"./en-il.js": "./node_modules/handsontable/node_modules/moment/locale/en-il.js",
	"./en-nz": "./node_modules/handsontable/node_modules/moment/locale/en-nz.js",
	"./en-nz.js": "./node_modules/handsontable/node_modules/moment/locale/en-nz.js",
	"./eo": "./node_modules/handsontable/node_modules/moment/locale/eo.js",
	"./eo.js": "./node_modules/handsontable/node_modules/moment/locale/eo.js",
	"./es": "./node_modules/handsontable/node_modules/moment/locale/es.js",
	"./es-do": "./node_modules/handsontable/node_modules/moment/locale/es-do.js",
	"./es-do.js": "./node_modules/handsontable/node_modules/moment/locale/es-do.js",
	"./es-us": "./node_modules/handsontable/node_modules/moment/locale/es-us.js",
	"./es-us.js": "./node_modules/handsontable/node_modules/moment/locale/es-us.js",
	"./es.js": "./node_modules/handsontable/node_modules/moment/locale/es.js",
	"./et": "./node_modules/handsontable/node_modules/moment/locale/et.js",
	"./et.js": "./node_modules/handsontable/node_modules/moment/locale/et.js",
	"./eu": "./node_modules/handsontable/node_modules/moment/locale/eu.js",
	"./eu.js": "./node_modules/handsontable/node_modules/moment/locale/eu.js",
	"./fa": "./node_modules/handsontable/node_modules/moment/locale/fa.js",
	"./fa.js": "./node_modules/handsontable/node_modules/moment/locale/fa.js",
	"./fi": "./node_modules/handsontable/node_modules/moment/locale/fi.js",
	"./fi.js": "./node_modules/handsontable/node_modules/moment/locale/fi.js",
	"./fo": "./node_modules/handsontable/node_modules/moment/locale/fo.js",
	"./fo.js": "./node_modules/handsontable/node_modules/moment/locale/fo.js",
	"./fr": "./node_modules/handsontable/node_modules/moment/locale/fr.js",
	"./fr-ca": "./node_modules/handsontable/node_modules/moment/locale/fr-ca.js",
	"./fr-ca.js": "./node_modules/handsontable/node_modules/moment/locale/fr-ca.js",
	"./fr-ch": "./node_modules/handsontable/node_modules/moment/locale/fr-ch.js",
	"./fr-ch.js": "./node_modules/handsontable/node_modules/moment/locale/fr-ch.js",
	"./fr.js": "./node_modules/handsontable/node_modules/moment/locale/fr.js",
	"./fy": "./node_modules/handsontable/node_modules/moment/locale/fy.js",
	"./fy.js": "./node_modules/handsontable/node_modules/moment/locale/fy.js",
	"./ga": "./node_modules/handsontable/node_modules/moment/locale/ga.js",
	"./ga.js": "./node_modules/handsontable/node_modules/moment/locale/ga.js",
	"./gd": "./node_modules/handsontable/node_modules/moment/locale/gd.js",
	"./gd.js": "./node_modules/handsontable/node_modules/moment/locale/gd.js",
	"./gl": "./node_modules/handsontable/node_modules/moment/locale/gl.js",
	"./gl.js": "./node_modules/handsontable/node_modules/moment/locale/gl.js",
	"./gom-latn": "./node_modules/handsontable/node_modules/moment/locale/gom-latn.js",
	"./gom-latn.js": "./node_modules/handsontable/node_modules/moment/locale/gom-latn.js",
	"./gu": "./node_modules/handsontable/node_modules/moment/locale/gu.js",
	"./gu.js": "./node_modules/handsontable/node_modules/moment/locale/gu.js",
	"./he": "./node_modules/handsontable/node_modules/moment/locale/he.js",
	"./he.js": "./node_modules/handsontable/node_modules/moment/locale/he.js",
	"./hi": "./node_modules/handsontable/node_modules/moment/locale/hi.js",
	"./hi.js": "./node_modules/handsontable/node_modules/moment/locale/hi.js",
	"./hr": "./node_modules/handsontable/node_modules/moment/locale/hr.js",
	"./hr.js": "./node_modules/handsontable/node_modules/moment/locale/hr.js",
	"./hu": "./node_modules/handsontable/node_modules/moment/locale/hu.js",
	"./hu.js": "./node_modules/handsontable/node_modules/moment/locale/hu.js",
	"./hy-am": "./node_modules/handsontable/node_modules/moment/locale/hy-am.js",
	"./hy-am.js": "./node_modules/handsontable/node_modules/moment/locale/hy-am.js",
	"./id": "./node_modules/handsontable/node_modules/moment/locale/id.js",
	"./id.js": "./node_modules/handsontable/node_modules/moment/locale/id.js",
	"./is": "./node_modules/handsontable/node_modules/moment/locale/is.js",
	"./is.js": "./node_modules/handsontable/node_modules/moment/locale/is.js",
	"./it": "./node_modules/handsontable/node_modules/moment/locale/it.js",
	"./it-ch": "./node_modules/handsontable/node_modules/moment/locale/it-ch.js",
	"./it-ch.js": "./node_modules/handsontable/node_modules/moment/locale/it-ch.js",
	"./it.js": "./node_modules/handsontable/node_modules/moment/locale/it.js",
	"./ja": "./node_modules/handsontable/node_modules/moment/locale/ja.js",
	"./ja.js": "./node_modules/handsontable/node_modules/moment/locale/ja.js",
	"./jv": "./node_modules/handsontable/node_modules/moment/locale/jv.js",
	"./jv.js": "./node_modules/handsontable/node_modules/moment/locale/jv.js",
	"./ka": "./node_modules/handsontable/node_modules/moment/locale/ka.js",
	"./ka.js": "./node_modules/handsontable/node_modules/moment/locale/ka.js",
	"./kk": "./node_modules/handsontable/node_modules/moment/locale/kk.js",
	"./kk.js": "./node_modules/handsontable/node_modules/moment/locale/kk.js",
	"./km": "./node_modules/handsontable/node_modules/moment/locale/km.js",
	"./km.js": "./node_modules/handsontable/node_modules/moment/locale/km.js",
	"./kn": "./node_modules/handsontable/node_modules/moment/locale/kn.js",
	"./kn.js": "./node_modules/handsontable/node_modules/moment/locale/kn.js",
	"./ko": "./node_modules/handsontable/node_modules/moment/locale/ko.js",
	"./ko.js": "./node_modules/handsontable/node_modules/moment/locale/ko.js",
	"./ku": "./node_modules/handsontable/node_modules/moment/locale/ku.js",
	"./ku.js": "./node_modules/handsontable/node_modules/moment/locale/ku.js",
	"./ky": "./node_modules/handsontable/node_modules/moment/locale/ky.js",
	"./ky.js": "./node_modules/handsontable/node_modules/moment/locale/ky.js",
	"./lb": "./node_modules/handsontable/node_modules/moment/locale/lb.js",
	"./lb.js": "./node_modules/handsontable/node_modules/moment/locale/lb.js",
	"./lo": "./node_modules/handsontable/node_modules/moment/locale/lo.js",
	"./lo.js": "./node_modules/handsontable/node_modules/moment/locale/lo.js",
	"./lt": "./node_modules/handsontable/node_modules/moment/locale/lt.js",
	"./lt.js": "./node_modules/handsontable/node_modules/moment/locale/lt.js",
	"./lv": "./node_modules/handsontable/node_modules/moment/locale/lv.js",
	"./lv.js": "./node_modules/handsontable/node_modules/moment/locale/lv.js",
	"./me": "./node_modules/handsontable/node_modules/moment/locale/me.js",
	"./me.js": "./node_modules/handsontable/node_modules/moment/locale/me.js",
	"./mi": "./node_modules/handsontable/node_modules/moment/locale/mi.js",
	"./mi.js": "./node_modules/handsontable/node_modules/moment/locale/mi.js",
	"./mk": "./node_modules/handsontable/node_modules/moment/locale/mk.js",
	"./mk.js": "./node_modules/handsontable/node_modules/moment/locale/mk.js",
	"./ml": "./node_modules/handsontable/node_modules/moment/locale/ml.js",
	"./ml.js": "./node_modules/handsontable/node_modules/moment/locale/ml.js",
	"./mn": "./node_modules/handsontable/node_modules/moment/locale/mn.js",
	"./mn.js": "./node_modules/handsontable/node_modules/moment/locale/mn.js",
	"./mr": "./node_modules/handsontable/node_modules/moment/locale/mr.js",
	"./mr.js": "./node_modules/handsontable/node_modules/moment/locale/mr.js",
	"./ms": "./node_modules/handsontable/node_modules/moment/locale/ms.js",
	"./ms-my": "./node_modules/handsontable/node_modules/moment/locale/ms-my.js",
	"./ms-my.js": "./node_modules/handsontable/node_modules/moment/locale/ms-my.js",
	"./ms.js": "./node_modules/handsontable/node_modules/moment/locale/ms.js",
	"./mt": "./node_modules/handsontable/node_modules/moment/locale/mt.js",
	"./mt.js": "./node_modules/handsontable/node_modules/moment/locale/mt.js",
	"./my": "./node_modules/handsontable/node_modules/moment/locale/my.js",
	"./my.js": "./node_modules/handsontable/node_modules/moment/locale/my.js",
	"./nb": "./node_modules/handsontable/node_modules/moment/locale/nb.js",
	"./nb.js": "./node_modules/handsontable/node_modules/moment/locale/nb.js",
	"./ne": "./node_modules/handsontable/node_modules/moment/locale/ne.js",
	"./ne.js": "./node_modules/handsontable/node_modules/moment/locale/ne.js",
	"./nl": "./node_modules/handsontable/node_modules/moment/locale/nl.js",
	"./nl-be": "./node_modules/handsontable/node_modules/moment/locale/nl-be.js",
	"./nl-be.js": "./node_modules/handsontable/node_modules/moment/locale/nl-be.js",
	"./nl.js": "./node_modules/handsontable/node_modules/moment/locale/nl.js",
	"./nn": "./node_modules/handsontable/node_modules/moment/locale/nn.js",
	"./nn.js": "./node_modules/handsontable/node_modules/moment/locale/nn.js",
	"./pa-in": "./node_modules/handsontable/node_modules/moment/locale/pa-in.js",
	"./pa-in.js": "./node_modules/handsontable/node_modules/moment/locale/pa-in.js",
	"./pl": "./node_modules/handsontable/node_modules/moment/locale/pl.js",
	"./pl.js": "./node_modules/handsontable/node_modules/moment/locale/pl.js",
	"./pt": "./node_modules/handsontable/node_modules/moment/locale/pt.js",
	"./pt-br": "./node_modules/handsontable/node_modules/moment/locale/pt-br.js",
	"./pt-br.js": "./node_modules/handsontable/node_modules/moment/locale/pt-br.js",
	"./pt.js": "./node_modules/handsontable/node_modules/moment/locale/pt.js",
	"./ro": "./node_modules/handsontable/node_modules/moment/locale/ro.js",
	"./ro.js": "./node_modules/handsontable/node_modules/moment/locale/ro.js",
	"./ru": "./node_modules/handsontable/node_modules/moment/locale/ru.js",
	"./ru.js": "./node_modules/handsontable/node_modules/moment/locale/ru.js",
	"./sd": "./node_modules/handsontable/node_modules/moment/locale/sd.js",
	"./sd.js": "./node_modules/handsontable/node_modules/moment/locale/sd.js",
	"./se": "./node_modules/handsontable/node_modules/moment/locale/se.js",
	"./se.js": "./node_modules/handsontable/node_modules/moment/locale/se.js",
	"./si": "./node_modules/handsontable/node_modules/moment/locale/si.js",
	"./si.js": "./node_modules/handsontable/node_modules/moment/locale/si.js",
	"./sk": "./node_modules/handsontable/node_modules/moment/locale/sk.js",
	"./sk.js": "./node_modules/handsontable/node_modules/moment/locale/sk.js",
	"./sl": "./node_modules/handsontable/node_modules/moment/locale/sl.js",
	"./sl.js": "./node_modules/handsontable/node_modules/moment/locale/sl.js",
	"./sq": "./node_modules/handsontable/node_modules/moment/locale/sq.js",
	"./sq.js": "./node_modules/handsontable/node_modules/moment/locale/sq.js",
	"./sr": "./node_modules/handsontable/node_modules/moment/locale/sr.js",
	"./sr-cyrl": "./node_modules/handsontable/node_modules/moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "./node_modules/handsontable/node_modules/moment/locale/sr-cyrl.js",
	"./sr.js": "./node_modules/handsontable/node_modules/moment/locale/sr.js",
	"./ss": "./node_modules/handsontable/node_modules/moment/locale/ss.js",
	"./ss.js": "./node_modules/handsontable/node_modules/moment/locale/ss.js",
	"./sv": "./node_modules/handsontable/node_modules/moment/locale/sv.js",
	"./sv.js": "./node_modules/handsontable/node_modules/moment/locale/sv.js",
	"./sw": "./node_modules/handsontable/node_modules/moment/locale/sw.js",
	"./sw.js": "./node_modules/handsontable/node_modules/moment/locale/sw.js",
	"./ta": "./node_modules/handsontable/node_modules/moment/locale/ta.js",
	"./ta.js": "./node_modules/handsontable/node_modules/moment/locale/ta.js",
	"./te": "./node_modules/handsontable/node_modules/moment/locale/te.js",
	"./te.js": "./node_modules/handsontable/node_modules/moment/locale/te.js",
	"./tet": "./node_modules/handsontable/node_modules/moment/locale/tet.js",
	"./tet.js": "./node_modules/handsontable/node_modules/moment/locale/tet.js",
	"./tg": "./node_modules/handsontable/node_modules/moment/locale/tg.js",
	"./tg.js": "./node_modules/handsontable/node_modules/moment/locale/tg.js",
	"./th": "./node_modules/handsontable/node_modules/moment/locale/th.js",
	"./th.js": "./node_modules/handsontable/node_modules/moment/locale/th.js",
	"./tl-ph": "./node_modules/handsontable/node_modules/moment/locale/tl-ph.js",
	"./tl-ph.js": "./node_modules/handsontable/node_modules/moment/locale/tl-ph.js",
	"./tlh": "./node_modules/handsontable/node_modules/moment/locale/tlh.js",
	"./tlh.js": "./node_modules/handsontable/node_modules/moment/locale/tlh.js",
	"./tr": "./node_modules/handsontable/node_modules/moment/locale/tr.js",
	"./tr.js": "./node_modules/handsontable/node_modules/moment/locale/tr.js",
	"./tzl": "./node_modules/handsontable/node_modules/moment/locale/tzl.js",
	"./tzl.js": "./node_modules/handsontable/node_modules/moment/locale/tzl.js",
	"./tzm": "./node_modules/handsontable/node_modules/moment/locale/tzm.js",
	"./tzm-latn": "./node_modules/handsontable/node_modules/moment/locale/tzm-latn.js",
	"./tzm-latn.js": "./node_modules/handsontable/node_modules/moment/locale/tzm-latn.js",
	"./tzm.js": "./node_modules/handsontable/node_modules/moment/locale/tzm.js",
	"./ug-cn": "./node_modules/handsontable/node_modules/moment/locale/ug-cn.js",
	"./ug-cn.js": "./node_modules/handsontable/node_modules/moment/locale/ug-cn.js",
	"./uk": "./node_modules/handsontable/node_modules/moment/locale/uk.js",
	"./uk.js": "./node_modules/handsontable/node_modules/moment/locale/uk.js",
	"./ur": "./node_modules/handsontable/node_modules/moment/locale/ur.js",
	"./ur.js": "./node_modules/handsontable/node_modules/moment/locale/ur.js",
	"./uz": "./node_modules/handsontable/node_modules/moment/locale/uz.js",
	"./uz-latn": "./node_modules/handsontable/node_modules/moment/locale/uz-latn.js",
	"./uz-latn.js": "./node_modules/handsontable/node_modules/moment/locale/uz-latn.js",
	"./uz.js": "./node_modules/handsontable/node_modules/moment/locale/uz.js",
	"./vi": "./node_modules/handsontable/node_modules/moment/locale/vi.js",
	"./vi.js": "./node_modules/handsontable/node_modules/moment/locale/vi.js",
	"./x-pseudo": "./node_modules/handsontable/node_modules/moment/locale/x-pseudo.js",
	"./x-pseudo.js": "./node_modules/handsontable/node_modules/moment/locale/x-pseudo.js",
	"./yo": "./node_modules/handsontable/node_modules/moment/locale/yo.js",
	"./yo.js": "./node_modules/handsontable/node_modules/moment/locale/yo.js",
	"./zh-cn": "./node_modules/handsontable/node_modules/moment/locale/zh-cn.js",
	"./zh-cn.js": "./node_modules/handsontable/node_modules/moment/locale/zh-cn.js",
	"./zh-hk": "./node_modules/handsontable/node_modules/moment/locale/zh-hk.js",
	"./zh-hk.js": "./node_modules/handsontable/node_modules/moment/locale/zh-hk.js",
	"./zh-tw": "./node_modules/handsontable/node_modules/moment/locale/zh-tw.js",
	"./zh-tw.js": "./node_modules/handsontable/node_modules/moment/locale/zh-tw.js"
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
webpackContext.id = "./node_modules/handsontable/node_modules/moment/locale sync recursive ^\\.\\/.*$";

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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendor"], () => (__webpack_require__("./src/App.tsx")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=app.bundle.js.map