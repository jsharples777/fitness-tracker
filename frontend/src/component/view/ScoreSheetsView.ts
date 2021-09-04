import debug from 'debug';
import moment from "moment";
import Controller from "../../Controller";
import AbstractView from "../../ui-framework/AbstractView";
import {ViewDOMConfig} from "../../ui-framework/ConfigurationTypes";
import {ViewListener} from "../../ui-framework/ViewListener";
import {View} from "../../ui-framework/View";


const csLogger = debug('score-sheet-sidebar');
const csLoggerDetail = debug('score-sheet-sidebar:detail');

class ScoreSheetsView extends AbstractView implements ViewListener{
    protected selectedBoardGame: any | null = null;
    static SCORESHEETS_ViewConfig:ViewDOMConfig = {
        resultsContainerId:'scoreSheets',
        resultsElementType:'div',
        resultsClasses:'text-white bg-info col-sm-6 col-md-3 col-lg-2 score-card',
        keyId:'id',
        dataSourceId:'scoreSheet',
        detail: {
            containerClasses: 'card-img-overlay',
            textElementType:'div',
            textElementClasses:'ml-2',
            select: true,
            delete: {
                buttonClasses: 'btn btn-rounded btn-warning ml-6 mt-4',
                buttonText:'Delete&nbsp;',
                iconClasses: 'fas fa-trash-alt',
            },
            background: {
                elementType: 'img',
                elementClasses: 'score-card-img'
            }
        },
    }


    constructor() {
        super(ScoreSheetsView.SCORESHEETS_ViewConfig,null,null);
        // handler binding
        this.updateView = this.updateView.bind(this);
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

    getDisplayValueForStateItem(name: string, item: any) {
        let buffer = '';
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
        buffer += `</p>`;
        return buffer;
    }

    updateView(name: string, newState: any) {
        csLoggerDetail(`Updating state with selected board game`);
        if (newState) {
            if (newState.scoresheets) {
                this.createResultsForState(name, newState.scoresheets);
            }
        }

    }

    getBackgroundImage(name: string, item: any): string {
        return './img/scorecard-vertical.jpg';
    }

    getIdForStateItem(name: string, item: any): string {
        return item.id;
    }

    documentLoaded(view: View): void {}
    hideRequested(view: View): void {}
    itemAction(view: View, actionName: string, selectedItem: any): void {}

    itemDeleteStarted(view: View, selectedItem: any): boolean {
        return (this.selectedBoardGame && confirm("Are you sure you want to delete this Score Sheet?"));
    }

    itemDeleted(view: View, selectedItem: any): void {
        // remove the sheet from the selected board game
        if (this.selectedBoardGame.scoresheets) {
            let index = this.selectedBoardGame.scoresheets.findIndex((sheet: any) => sheet.id === selectedItem.id);
            if (index >= 0) {
                this.selectedBoardGame.scoresheets.splice(index, 1);
                // let the controller know to remove from the database if the user is logged in
                Controller.getInstance().scoreSheetRemovedFromBoardGame(this.selectedBoardGame, selectedItem.id);
            }
        }
        this.updateView('', this.selectedBoardGame);
    }

    itemDragStarted(view: View, selectedItem: any): void {}
    itemDropped(view: View, droppedItem: any): void {}
    itemSelected(view: View, selectedItem: any): void {}
    itemDeselected(view: View, selectedItem: any): void {}
    showRequested(view: View): void {}


}

export default ScoreSheetsView;
