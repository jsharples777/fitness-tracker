import moment from "moment";
import {ScoreSheet} from "../AppTypes";
import debug from 'debug';

const templateLogger = debug('template-manager');

export class TemplateManager {
    private static _instance: TemplateManager;

    private constructor() {
    }

    public static getInstance(): TemplateManager {
        if (!(TemplateManager._instance)) {
            TemplateManager._instance = new TemplateManager();
        }
        return TemplateManager._instance;
    }

    public getScoreSheetTemplate(boardGame: any): any | null {
        if (boardGame.gameId === 270314) {
            return this.getOhanamiTemplate();
        }
        if (boardGame.gameId === 333201) {
            return this.getSkullKingTemplate();
        }
        return this.getDefaultScoreSheetTemplate(boardGame);
    }

    public getScoreSheetStartingData(boardGame: any): any[] | null {
        if (boardGame.gameId === 270314) {
            return this.getOhanamiStartingData();
        }
        if (boardGame.gameId === 333201) {
            return this.getSkullKingStartingData();
        }
        return this.getDefaultScoreSheetStartingData(boardGame);
    }

    public getSaveData(boardGame: any, scoreSheet: ScoreSheet): any {
        if (boardGame.gameId === 270314) {
            return this.getOhanamiSaveData(scoreSheet);
        }
        if (boardGame.gameId === 333201) {
            return this.getSkullKingSaveData(scoreSheet);
        }
        return this.getDefaultSaveData(scoreSheet);
    }

    public transformDataAfterUserChange(boardGame: any, scoreSheet: ScoreSheet): boolean {
        let result = false;
        if (boardGame.gameId === 270314) {
            result = true;
            this.transformOhanamiData(scoreSheet);
        }
        if (boardGame.gameId === 333201) {
            result = true;
            this.transformSkullKingData(scoreSheet);
        }
        return result; // do nothing unless for a specific game
    }

    private getOhanamiTemplate(): any {
        let template = {
            colHeaders: false,
            rowHeaders: false,
            licenseKey: 'non-commercial-and-evaluation',
            manualColumnResize: false,
            manualRowResize: false,
            selectionMode: 'single',
            cells(row: number, column: number) {
                if ((column === 0) || (column === 1) || (row === 8)) {
                    return {
                        readOnly: true,
                        className: 'bg-readonly-heading'
                    }
                }
                if (column > 1) {
                    if ((row === 1) || (row === 2) || (row === 4)) {
                        return {
                            className: 'bg-ohanami-blue',
                            forceNumeric: true,
                        }
                    }
                    if ((row === 3) || (row === 5)) {
                        return {
                            className: 'bg-ohanami-green',
                            forceNumeric: true,
                        }
                    }
                    if ((row === 6)) {
                        return {
                            className: 'bg-ohanami-grey',
                            forceNumeric: true,
                        }
                    }
                    if ((row === 7)) {
                        return {
                            className: 'bg-ohanami-pink',
                            forceNumeric: true,
                        }
                    }
                }

            }
        }
        templateLogger(template);
        return template;
    }

    private getSkullKingTemplate(): any {
        let template = {
            colHeaders: false,
            rowHeaders: false,
            licenseKey: 'non-commercial-and-evaluation',
            manualColumnResize: false,
            manualRowResize: false,
            selectionMode: 'single',
            cells(row: number, column: number) {
                if ((column === 0) || (column === 1) || (row === 21)) {
                    return {
                        readOnly: true,
                        className: 'bg-readonly-heading'
                    }
                }
                if (column % 2 === 0) {
                    if (row % 2 === 0) {
                        return {
                            className: 'bg-readonly',
                        }
                    }
                }

            }
        }
        templateLogger(template);
        return template;
    }

    private getSkullKingStartingData(): any[] {
        return [
            ['Round', '', 'P 1', '', 'P 2', '', 'P 3', '', 'P 4', ''],
            ['1', 'bid', '', '', '', '', '', '', '', ''],
            ['', 'bonus', '', '', '', '', '', '', '', ''],
            ['2', 'bid', '', '', '', '', '', '', '', ''],
            ['', 'bonus', '', '', '', '', '', '', '', ''],
            ['3', 'bid', '', '', '', '', '', '', '', ''],
            ['', 'bonus', '', '', '', '', '', '', '', ''],
            ['4', 'bid', '', '', '', '', '', '', '', ''],
            ['', 'bonus', '', '', '', '', '', '', '', ''],
            ['5', 'bid', '', '', '', '', '', '', '', ''],
            ['', 'bonus', '', '', '', '', '', '', '', ''],
            ['6', 'bid', '', '', '', '', '', '', '', ''],
            ['', 'bonus', '', '', '', '', '', '', '', ''],
            ['7', 'bid', '', '', '', '', '', '', '', ''],
            ['', 'bonus', '', '', '', '', '', '', '', ''],
            ['8', 'bid', '', '', '', '', '', '', '', ''],
            ['', 'bonus', '', '', '', '', '', '', '', ''],
            ['9', 'bid', '', '', '', '', '', '', '', ''],
            ['', 'bonus', '', '', '', '', '', '', '', ''],
            ['10', 'bid', '', '', '', '', '', '', '', ''],
            ['', 'bonus', '', '', '', '', '', '', '', ''],
            ['Total', '', '', '', '', '', '', '', '', '']
        ];
    }

    private getOhanamiStartingData(): any[] {
        return [
            ['Round', 'Mult.', 'P 1', 'P 2', 'P 3', 'P 4'],
            ['1', 'x3', '0', '0', '0', '0'],
            ['2', 'x3', '0', '0', '0', '0'],
            ['', 'x4', '0', '0', '0', '0'],
            ['3', 'x3', '0', '0', '0', '0'],
            ['', 'x4', '0', '0', '0', '0'],
            ['', 'x7', '0', '0', '0', '0'],
            ['', 'var', '0', '0', '0', '0'],
            ['Total', '', '0', '0', '0', '0']
        ];
    }

    private getDefaultScoreSheetTemplate(boardGame: any): any {
        return {
            //width:'90%',
            //height:'90%',
            colHeaders: false,
            rowHeaders: false,
            licenseKey: 'non-commercial-and-evaluation',
            manualColumnResize: false,
            manualRowResize: false,
            selectionMode: 'single',
            columnSummary: [
                {
                    destinationRow: 0,
                    destinationColumn: 0,
                    reversedRowCoords: true,
                    type: 'sum',
                    forceNumeric: true
                },
                {
                    destinationRow: 0,
                    destinationColumn: 1,
                    reversedRowCoords: true,
                    type: 'sum',
                    forceNumeric: true
                },
                {
                    destinationRow: 0,
                    destinationColumn: 2,
                    reversedRowCoords: true,
                    type: 'sum',
                    forceNumeric: true
                },
                {
                    destinationRow: 0,
                    destinationColumn: 3,
                    reversedRowCoords: true,
                    type: 'sum',
                    forceNumeric: true
                },
                {
                    destinationRow: 0,
                    destinationColumn: 4,
                    reversedRowCoords: true,
                    type: 'sum',
                    forceNumeric: true
                },
                {
                    destinationRow: 0,
                    destinationColumn: 5,
                    reversedRowCoords: true,
                    type: 'sum',
                    forceNumeric: true
                },
                {
                    destinationRow: 0,
                    destinationColumn: 6,
                    reversedRowCoords: true,
                    type: 'sum',
                    forceNumeric: true
                },
            ]

        }
    }

    private getDefaultScoreSheetStartingData(boardGame: any): any[] {
        return [
            ['P 1', 'P 2', 'P 3', 'P 4', 'P 5', 'P 6', 'P 7'],
            ['0', '0', '0', '0', '0', '0', '0'],
            ['0', '0', '0', '0', '0', '0', '0'],
            ['0', '0', '0', '0', '0', '0', '0'],
            ['0', '0', '0', '0', '0', '0', '0'],
            ['0', '0', '0', '0', '0', '0', '0'],
            ['0', '0', '0', '0', '0', '0', '0'],
            ['0', '0', '0', '0', '0', '0', '0'],
            ['0', '0', '0', '0', '0', '0', '0'],
            ['0', '0', '0', '0', '0', '0', '0'],
            ['0', '0', '0', '0', '0', '0', '0'],
            ['0', '0', '0', '0', '0', '0', '0'],
        ];
    }

    private getDefaultSaveData(scoreSheet: ScoreSheet): any {
        let saveData = {
            id: scoreSheet.room,
            jsonData: JSON.stringify(scoreSheet),
            createdOn: moment().format('YYYYMMDDHHmmss'),
            players: [],
            scores: []
        }
        // process the table data for names and scores
        // the first row is the player names
        // @ts-ignore
        const playerNames: string[] = scoreSheet.data[0];
        // @ts-ignore
        const scores: any[] = scoreSheet.data[scoreSheet.data.length - 1]

        // ensure the scores are numbers
        scores.forEach((score,index) => {
            const parsed = parseInt(score);
            if (isNaN(parsed)) {
                scores[index] = 0;
            }
            else {
                scores[index] = parsed;
            }
        })

        // @ts-ignore
        saveData.players = playerNames;
        // @ts-ignore
        saveData.scores = scores;
        return saveData;
    }

    private getOhanamiSaveData(scoreSheet: ScoreSheet): any {
        let saveData = {
            id: scoreSheet.room,
            jsonData: JSON.stringify(scoreSheet),
            createdOn: moment().format('YYYYMMDDHHmmss'),
            players: [],
            scores: []
        }
        // process the table data for names and scores
        // the first row is the player names, after the first two columns
        // @ts-ignore
        const playerNames: string[] = scoreSheet.data[0];
        // @ts-ignore
        const scores: any[] = scoreSheet.data[scoreSheet.data.length - 1]

        for (let index = 2; index < playerNames.length; index++) {
            // @ts-ignore
            saveData.players.push(playerNames[index]);
            let parsed = parseInt(scores[index]);
            if (isNaN(parsed)) {
                parsed = 0;
            }
            // @ts-ignore
            saveData.scores.push(parsed);

        }
        templateLogger(`Save data for ohanami is`);
        templateLogger(saveData);
        return saveData;
    }

    private getSkullKingSaveData(scoreSheet: ScoreSheet): any {
        let saveData = {
            id: scoreSheet.room,
            jsonData: JSON.stringify(scoreSheet),
            createdOn: moment().format('YYYYMMDDHHmmss'),
            players: [],
            scores: []
        }
        // process the table data for names and scores
        // the first row is the player names, after the first three columns, every second column
        // @ts-ignore
        const playerNames: string[] = scoreSheet.data[0];
        // last row is the scores, following the same pattern as the playr names
        // @ts-ignore
        const scores: any[] = scoreSheet.data[scoreSheet.data.length - 1]

        for (let index = 3; index < playerNames.length; index += 2) {
            // @ts-ignore
            saveData.players.push(playerNames[index]);
            let parsed = parseInt(scores[index]);
            if (isNaN(parsed)) {
                parsed = 0;
            }
            // @ts-ignore
            saveData.scores.push(parsed);

        }
        templateLogger(`Save data for skull king is`);
        templateLogger(saveData);
        return saveData;
    }

    private calculateOhanamiPinkScore(numOfCards: number): number {
        let score = 0;
        if (numOfCards > 0) {
            if (numOfCards > 15) numOfCards = 15;
            while (numOfCards > 0) {
                score += numOfCards;
                numOfCards--;
            }
        }
        return score;
    }

    private transformOhanamiData(scoreSheet: ScoreSheet) {
        // need to calculate the player scores
        for (let index = 0; index < 4; index++) {
            /*
             *  for each player the score is the sum of
             *  3 x row 1, 2, and 4
             *  4 x row 3 and 5
             *  7 x row 6
             *  row 7 is complicated
             */
            let score: number = 0;
            // @ts-ignore
            let parsed = parseInt(scoreSheet.data[1][index + 2]);
            if (!isNaN(parsed)) score += (3 * parsed);
            // @ts-ignore
            parsed = parseInt(scoreSheet.data[2][index + 2]);
            if (!isNaN(parsed)) score += (3 * parsed);
            // @ts-ignore
            parsed = parseInt(scoreSheet.data[4][index + 2]);
            if (!isNaN(parsed)) score += (3 * parsed);

            // @ts-ignore
            parsed = parseInt(scoreSheet.data[3][index + 2]);
            if (!isNaN(parsed)) score += (4 * parsed);
            // @ts-ignore
            parsed = parseInt(scoreSheet.data[5][index + 2]);
            if (!isNaN(parsed)) score += (4 * parsed);

            // @ts-ignore
            parsed = parseInt(scoreSheet.data[6][index + 2]);
            if (!isNaN(parsed)) score += (7 * parsed);

            // @ts-ignore
            parsed = parseInt(scoreSheet.data[7][index + 2]);
            if (!isNaN(parsed)) score += this.calculateOhanamiPinkScore(parsed);

            // @ts-ignore
            scoreSheet.data[8][index + 2] = score;
        }
    }

    private transformSkullKingData(scoreSheet: ScoreSheet) {
        // need to calculate the player scores
        for (let index = 2; index < 10; index += 2) {
            /*
             *  for each player the score is the sum of
             *  each bid score plus a bonus
             *  if bid is 0, and actual is 0, score is 10 x round
             *  if bid is x, and actual is x, score is 20 x bid
             *  if bid ix x, and actual is y (x != y), score is 10 x abs(x-y)
             */
            let score: number = 0;


            for (let round = 1; round <= 10; round++) {
                let row = 2 * round - 1;
                // @ts-ignore
                let parsedBid = parseInt(scoreSheet.data[row][index]);
                // @ts-ignore
                let parsedActual = parseInt(scoreSheet.data[row][index + 1])
                // @ts-ignore
                let parsedBonus = parseInt(scoreSheet.data[row + 1][index + 1]);
                // @ts-ignore
                if (!isNaN(parsedBid) && !isNaN(parsedActual)) {
                    if ((parsedBid === 0) && (parsedActual === 0)) {
                        score += round * 10;
                    }
                    if (parsedBid === parsedActual) {
                        score += 20 * parsedBid;
                    }
                    if ((parsedBid > 0) && (parsedBid !== parsedActual)) {
                        score -= 10 * Math.abs(parsedBid - parsedActual);
                    }
                    if (!isNaN(parsedBonus)) score += parsedBonus;
                }
            }

            // @ts-ignore
            scoreSheet.data[21][index + 1] = score;
        }

    }
}