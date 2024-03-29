export enum Decorator {
    Incomplete,
    Complete,
    Persisted,
    PersistedLocally = 3
}

export const STATE_NAMES = {
    users: 'user',
    chatLogs: 'chatLog',
    exerciseTypes: 'exerciseType',
    workouts: 'workout',
    exercises: 'exercises',
    recentUserSearches: 'recentUserSearch'
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
    exerciseTypesId: 'navigationItemExerciseTypes',
    chatId: 'navigationItemChat',
    workoutSummary: 'navigationItemWorkoutSummary',
    currentWorkout: 'navigationItemCurrentWorkout',
}

export const DRAGGABLE = {
    typeUser: 'user',
    typeExerciseType: 'exerciseType',
    fromUserSearch: 'userSearch',
    fromFavourites: 'favourites',
    fromExerciseTypes: 'exerciseTypes',
}

export const VIEW_NAME = {
    blockedUsers: 'blockedUsers',
    chatLog: 'chatLog',
    chatLogs: 'chatLogs',
    favouriteUsers: 'favouriteUsers',
    exerciseTypes: 'exerciseTypes',
    userSearch: 'userSearch',
    workouts: 'workouts',
    workoutSummary: 'workoutSummary',
    exercises: 'exercises'
}

export const VIEW_CONTAINER = {
    exerciseTypeDetail: "exerciseTypeDetail",
    currentWorkoutDetail: 'workoutDetail',
    exerciseDropZone: 'exerciseDropZone'
}

export const BUTTON = {
    createNewExerciseType: 'addNewExerciseType',
    completeWorkout: 'completeWorkout'
}

export const INPUT = {
    workoutName: 'workoutName'
}


