declare class MySQLDataSourceDelegate {
    constructor();
    getUsers(): Promise<unknown>;
    getMyBoardGameCollection(_: any, data: any): Promise<unknown>;
    addToMyCollection(_: any, data: any): Promise<unknown>;
    removeFromMyCollection(_: any, data: any): Promise<unknown>;
    removeScoreSheet(_: any, data: any): Promise<unknown>;
    addScoreSheetToBoardGame(_: any, data: any): Promise<unknown>;
}
export = MySQLDataSourceDelegate;
