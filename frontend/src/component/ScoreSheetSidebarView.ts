import debug from 'debug';
import SidebarView from '../ui-framework/SidebarView';
import {StateManager} from '../state/StateManager';
import moment from "moment";
import controller from "../Controller";


const csLogger = debug('score-sheet-sidebar');
const csLoggerDetail = debug('score-sheet-sidebar:detail');

class ScoreSheetSidebarView extends SidebarView {
    protected selectedBoardGame: any | null = null;

    constructor(applicationView: any, htmlDocument: HTMLDocument, stateManager: StateManager) {
        super(applicationView, htmlDocument, applicationView.state.ui.scoreSheetSideBar, applicationView.state.uiPrefs.scoreSheetSideBar, stateManager);

        this.config = applicationView.state;

        // handler binding
        this.updateView = this.updateView.bind(this);
        this.eventClickItem = this.eventClickItem.bind(this);
    }

    onDocumentLoaded() {
        super.onDocumentLoaded();

        this.updateView('', {});
    }


    public setSelectedBoardGame(boardGame: any) {
        csLogger(`setting selected board game to`);
        csLoggerDetail(boardGame);
        if (boardGame) {
            this.selectedBoardGame = boardGame;
            this.updateView('', boardGame);
        }
    }

    getIdForStateItem(name: string, item: any) {
        return item.id;
    }

    getLegacyIdForStateItem(name: string, item: any) {
        return item.id;
    }

    /*
        <h5 class="card-title">Card title</h5>
    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
    <p class="card-text">Last updated 3 mins ago</p>
     */
    getDisplayValueForStateItem(name: string, item: any) {
        let buffer = '';
        /*
        type ScoreSheet {
            id:Int!
            players: [String],
            scores: [Int],
            jsonData: String,
            createdOn: Int
        }
        */
        buffer += `<h5 class="card-title">${this.selectedBoardGame.name} (${this.selectedBoardGame.year})</h5>`;
        buffer += `<p class="card-text">Played On: ${moment(item.createdOn, 'YYYYMMDDHHmmss').format('ddd, DD/MM/YYYY HH:mm')}</p>`;
        buffer += `<p class="card-text">Scores: `;
        if (item.player1) {
            if (item.score1 > 0) {
                buffer += `${item.player1}:${item.score1} `;
            }
        }
        if (item.player2) {
            if (item.score2 > 0) {
                buffer += `${item.player2}:${item.score2} `;
            }
        }
        if (item.player3) {
            if (item.score3 > 0) {
                buffer += `${item.player3}:${item.score3} `;
            }
        }
        if (item.player4) {
            if (item.score4 > 0) {
                buffer += `${item.player4}:${item.score4} `;
            }
        }
        if (item.player5) {
            if (item.score5 > 0) {
                buffer += `${item.player5}:${item.score5} `;
            }
        }
        if (item.player6) {
            if (item.score6 > 0) {
                buffer += `${item.player6}:${item.score6} `;
            }
        }
        if (item.player7) {
            if (item.score7 > 0) {
                buffer += `${item.player7}:${item.score7} `;
            }
        }
        if (item.players) {
            for (let index = 0; index < item.players.length; index++) {

            }

        }
        buffer += `</p>`;
        return buffer;
    }

    getModifierForStateItem(name: string, item: any) {
        return 'normal';
    }

    getSecondaryModifierForStateItem(name: string, item: any) {
        return this.getModifierForStateItem(name, item);
    }

    eventClickItem(event: MouseEvent) {
    }

    updateView(name: string, newState: any) {
        csLoggerDetail(`Updating state with selected board game`);
        if (newState) {
            if (newState.scoresheets) {
                this.createResultsForState(name, newState.scoresheets);
            }
        }

    }

    getDragData(event: DragEvent) {
    }

    protected getBadgeValue(name: string, item: any): number {
        return 0;
    }

    protected getBackgroundImage(name: string, item: any): string {
        return './img/scorecard-vertical.jpg';
    }

    protected eventDeleteClickItem(event: MouseEvent): void {
        // @ts-ignore
        const sheetId = event.target.getAttribute(this.uiConfig.dom.resultDataKeyId);
        // @ts-ignore
        const dataSource = event.target.getAttribute(this.uiConfig.dom.resultDataSourceId)
        // @ts-ignore
        csLogger(`Score Sheet ${event.target} with id ${sheetId} delete clicked from ${dataSource}`);


        if (this.selectedBoardGame && confirm("Are you sure you want to delete this Score Sheet?")) {
            // remove the sheet from the selected board game
            if (this.selectedBoardGame.scoresheets) {
                let index = this.selectedBoardGame.scoresheets.findIndex((sheet: any) => sheet.id === sheetId);
                if (index >= 0) {
                    this.selectedBoardGame.scoresheets.splice(index, 1);
                    // let the controller know to remove from the database if the user is logged in
                    controller.scoreSheetRemovedFromBoardGame(this.selectedBoardGame, sheetId);
                }
            }
            this.updateView('', this.selectedBoardGame);
        }

    }


}

export default ScoreSheetSidebarView;
