export enum Decorator {
    Incomplete,
    Complete,
    Persisted,
    PersistedLocally = 3
}

export const STATE_NAMES = {
    users: 'users',
    chatLogs: 'chatLogs',
    exerciseTypes: 'exerciseTypes',
    workouts: 'workouts',
    recentUserSearches: 'recentUserSearches'
}

export const API_Config = {
    login: '/login',
    users: '/api/users',
    exerciseTypes: '/api/exercise-types',
    workouts: '/api/workouts'
};

export const NAVIGATION = {
    showMyWorkouts: 'navigationItemMyWorkouts',
    userSearchId: 'navigationItemUserSearch',
    chatId: 'navigationItemChat',
}

export const DRAGGABLE = {
    typeUser: 'user',
    fromUserSearch: 'userSearch',
    fromFavourites: 'favourites'
}

export const VIEW_NAME = {
    blockedUsers: 'blockedUsers',
    chatLog: 'chatLog',
    chatLogs: 'chatLogs',
    favouriteUsers: 'favouriteUsers',
    exerciseTypes: 'exerciseTypes',
    userSearch: 'userSearch'
}


