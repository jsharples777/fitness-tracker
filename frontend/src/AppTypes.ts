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

export const STATE_NAME_User:string = 'users';
export const STATE_NAME_BoardGames:string = 'boardGames';
export const STATE_NAME_Scores:string = 'scores';
export const STATE_NAME_RecentUserSearches:string = 'recentUserSearches';
export const STATE_NAME_BGSearchResults:string = 'bggSearchResults';
export const STATE_NAME_ScoreSheet:string = 'scoreSheet';

