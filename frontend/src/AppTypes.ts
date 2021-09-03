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

