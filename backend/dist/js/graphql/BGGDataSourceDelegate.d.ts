declare class BGGDataSourceDelegate {
    private static convertToBoardGame;
    private static convertToDetails;
    findBoardGames(_: any, { query }: {
        query: any;
    }): Promise<any[]>;
    getBoardGameDetails(_: any, data: any): Promise<unknown>;
}
export = BGGDataSourceDelegate;
