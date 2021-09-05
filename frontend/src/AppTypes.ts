export enum Decorator {
    Incomplete,
    Complete,
    Persisted,
    PersistedLocally = 3
}

export type ScoreSheet = {
    room: string,
    boardGameName: string,
    sheetLayoutOptions: any | null;
    timer: number,
    data: any[] | null,
    isFinished: boolean,
    timerGoing: boolean
}

export const STATE_NAMES = {
    users: 'users',
    boardGames: 'boardGames',
    scores: 'scores',
    selectedEntry: 'selectedEntry',
    recentUserSearches: 'recentUserSearches',
    bggSearchResults: 'bggSearchResults',
    scoreSheet: 'scoreSheet',
    chatLogs: 'chatLogs'
}

export const API_Config = {
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
};

export const NAVIGATION = {
    showMyCollection: 'navigationItemMyCollection',
    boardGameSearchId: 'navigationItemBoardGameSearch',
    userSearchId: 'navigationItemUserSearch',
    chatId: 'navigationItemChat',
    showScoreSheet: 'navigationItemScoreSheet',

}

export const ALERT = {
    modalId: "alert",
    titleId: "alert-title",
    contentId: "alert-content",
    cancelButtonId: "alert-cancel",
    confirmButtonId: "alert-confirm",
    closeButtonId: "alert-close",
    hideClass: "d-none",
    showClass: "d-block",
}

export const DRAGGABLE = {
    typeBoardGame: 'boardGame',
    typeUser: 'user',
    fromUserSearch: 'userSearch',
    fromFavourites: 'favourites'
}

export const VIEW_NAME = {
    bggSearch: 'bggSearch',
    blockedUsers: 'blockedUsers',
    chatLog: 'chatLog',
    chatLogs: 'chatLogs',
    favouriteUsers: 'favouriteUsers',
    scoreSheets: 'scoreSheets',
    userSearch: 'userSearch'
}


