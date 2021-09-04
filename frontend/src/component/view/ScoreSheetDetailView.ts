import StateChangeListener from "../../state/StateChangeListener";
import {ScoreSheetController} from "../controller/ScoreSheetController";
import Handsontable from "handsontable";
import browserUtil from "../../util/BrowserUtil";
import debug from 'debug';
import {DRAGGABLE, ScoreSheet, STATE_NAMES} from "../../AppTypes";
import {TemplateManager} from "../../template/TemplateManager";
import {StateManager} from "../../state/StateManager";
import Controller from "../../Controller";
import {DRAGGABLE_KEY_ID, DRAGGABLE_TYPE} from "../../ui-framework/ConfigurationTypes";

const ssvLogger = debug('score-sheet-view');

export class ScoreSheetDetailView implements StateChangeListener {
    private static _instance: ScoreSheetDetailView;

    public static ScoreSheetDom = {
            dropZone: "scoreSheetZone",
            boardGame: "selectedBoardGame",
            startStopTimer: "startStopTimer",
            timer: "timerDisplay",
            end: "leaveScoreSheet",
            scoreSheet: "scoreSheet",
            iconStart: "<i class='fas fa-hourglass-start'></i>",
            iconInProgress: "<i class='fas fa-hourglass-half'></i>",
            iconEnd: "<i class='fas fa-hourglass-end'></i>",
            iconLeave: "<i class='fas fa-sign-out-alt'></i>",
            ssFastSearchUserNames: 'ssFastSearchUserNames',
            webrtc: 'webrtc'
        }




    // @ts-ignore
    protected ssFastSearchUserNames: HTMLElement;
    private stateManager: StateManager;

    private thisEl: HTMLDivElement | null = null;
    private boardGameTitleEl: HTMLHeadingElement | null = null;
    private startStopTimer: HTMLButtonElement | null = null;
    private timerEl: HTMLDivElement | null = null;
    private endOrLeaveEl: HTMLButtonElement | null = null;
    private scoreSheetEl: HTMLDivElement | null = null;



    private table: Handsontable | null = null;
    private controller: ScoreSheetController;
    private config: any;


    private constructor() {
        this.controller = ScoreSheetController.getInstance();
        this.stateManager = Controller.getInstance().getStateManager();
        this.eventUserSelected = this.eventUserSelected.bind(this);

        this.stateManager.addChangeListenerForName(STATE_NAMES.users, this);
    }

    public static getInstance(): ScoreSheetDetailView {
        if (!(ScoreSheetDetailView._instance)) {
            ScoreSheetDetailView._instance = new ScoreSheetDetailView();
        }
        return ScoreSheetDetailView._instance;
    }

    public onDocumentLoaded() {
        this.resetDisplay();

        // @ts-ignore
        this.ssFastSearchUserNames = document.getElementById(ScoreSheetDetailView.ssFastSearchUserNames);
        // fast user search
        // @ts-ignore
        const fastSearchEl = $(`#${ScoreSheetDetailView.ssFastSearchUserNames}`);
        fastSearchEl.on('autocompleteselect', this.eventUserSelected);

        ScoreSheetController.getInstance().getStateManager().addChangeListenerForName(STATE_NAMES.scoreSheet, this);

        // load references to the key elements on the page
        // @ts-ignore
        this.thisEl = document.getElementById(ScoreSheetDetailView.ScoreSheetDom.dropZone);
        // @ts-ignore
        this.boardGameTitleEl = document.getElementById(ScoreSheetDetailView.ScoreSheetDom.boardGame);
        // @ts-ignore
        this.startStopTimer = document.getElementById(ScoreSheetDetailView.ScoreSheetDom.startStopTimer);
        // @ts-ignore
        this.timerEl = document.getElementById(ScoreSheetDetailView.ScoreSheetDom.timer);
        // @ts-ignore
        this.endOrLeaveEl = document.getElementById(ScoreSheetDetailView.ScoreSheetDom.end);
        // @ts-ignore
        this.scoreSheetEl = document.getElementById(ScoreSheetDetailView.ScoreSheetDom.scoreSheet);

        // bind event handlers
        this.handleStartStopTimer = this.handleStartStopTimer.bind(this);
        this.handleEndOrLeave = this.handleEndOrLeave.bind(this);
        this.handleUserDrop = this.handleUserDrop.bind(this);

        // setup event handlers
        if (this.startStopTimer) this.startStopTimer.addEventListener('click', this.handleStartStopTimer);
        if (this.endOrLeaveEl) this.endOrLeaveEl.addEventListener('click', this.handleEndOrLeave);
        if (this.thisEl) {
            this.thisEl.addEventListener('dragover', (event) => {
                event.preventDefault()
            });
            this.thisEl.addEventListener('drop', this.handleUserDrop);
        }
    }

    eventUserSelected(event: Event, ui: any) {
        event.preventDefault();
        event.stopPropagation();
        ssvLogger(`User ${ui.item.label} with id ${ui.item.value} selected`);
        // @ts-ignore
        event.target.innerText = '';

        // add to the chat, if one selected, and is scoresheet owner
        if (ScoreSheetController.getInstance().isSheetOwner()) {
            ScoreSheetController.getInstance().inviteUser(ui.item.label);
        }
        else {
            alert ("Only the score sheet creator can invite users.");
        }
    }


    handleEndOrLeave(event: MouseEvent) {
        ssvLogger('leave or end');
        // are we leaving or ending?
        if (this.controller.hasActiveScoreSheet() && this.controller.isSheetOwner()) {
            // finishing the score sheet
            // double check this is want we want
            if (!confirm("Are you sure you want to close the score sheet")) return;

            // user wants to finish
            this.controller.endScoreSheet();

            // reset the display
            this.resetDisplay();
        } else {
            // leaving the score sheet
            // double check this is want we want
            if (!confirm("Are you sure you want to leave the score sheet")) return;

            // user wants to finish
            this.controller.leave();


            // reset the display
            this.resetDisplay();
        }
    }

    handleStartStopTimer(event: MouseEvent) {
        ssvLogger('start/pause timer');
        if (this.controller.isTimerGoing()) {
            this.controller.pauseTimer();
        } else {
            this.controller.startTimer();
        }
    }

    handleUserDrop(event: Event) {
        ssvLogger('drop event on current score sheet');
        if (this.controller.hasActiveScoreSheet() && this.controller.isSheetOwner()) {
            // @ts-ignore
            const draggedObjectJSON = event.dataTransfer.getData(DRAGGABLE_KEY_ID);
            const draggedObject = JSON.parse(draggedObjectJSON);
            ssvLogger(draggedObject);

            if (draggedObject[DRAGGABLE_TYPE] === DRAGGABLE.typeUser) {
                //add the user to the current chat if not already there
                this.controller.inviteUser(draggedObject.username);
            }
        }
    }


    public resetDisplay() {
        this.table = null;

        // reset the display
        if (this.boardGameTitleEl) this.boardGameTitleEl.innerText = '';
        if (this.startStopTimer) {
            this.startStopTimer.innerHTML = 'Start ' + ScoreSheetDetailView.ScoreSheetDom.iconStart;
            this.startStopTimer.setAttribute("disabled", "true");
            browserUtil.addRemoveClasses(this.startStopTimer, 'btn-warning', false);
            browserUtil.addRemoveClasses(this.startStopTimer, 'btn-success', true);
        }
        if (this.timerEl) this.timerEl.innerText = this.createTimerDisplay(0);
        if (this.endOrLeaveEl) this.endOrLeaveEl.innerHTML = ScoreSheetDetailView.ScoreSheetDom.iconLeave;
        if (this.scoreSheetEl) browserUtil.removeAllChildren(this.scoreSheetEl);


    }

    public updateTimer(time: number, isPaused: boolean = false) {
        // update the view
        ssvLogger(`Updating timer ${time} ${isPaused}`);
        if (this.startStopTimer) {
            if (isPaused) {
                this.startStopTimer.innerHTML = 'Start   ' + ScoreSheetDetailView.ScoreSheetDom.iconStart;
                browserUtil.addRemoveClasses(this.startStopTimer, 'btn-warning', false);
                browserUtil.addRemoveClasses(this.startStopTimer, 'btn-success', true);
            } else {
                this.startStopTimer.innerHTML = 'Pause   ' + ScoreSheetDetailView.ScoreSheetDom.iconInProgress;
                browserUtil.addRemoveClasses(this.startStopTimer, 'btn-warning', true);
                browserUtil.addRemoveClasses(this.startStopTimer, 'btn-success', false);
            }
            this.startStopTimer.removeAttribute("disabled");
        }
        if (this.timerEl) this.timerEl.innerText = this.createTimerDisplay(time);
    }

    stateChanged(managerName: string, name: string, newValue: any): void {
        if (name === this.config.stateNames.users) {
            // @ts-ignore
            const fastSearchEl = $(`#${ScoreSheetDetailView.ScoreSheetDom.ssFastSearchUserNames}`);
            // what is my username?
            let myUsername = Controller.getInstance().getLoggedInUsername();
            // for each name, construct the patient details to display and the id referenced
            const fastSearchValues: any = [];
            newValue.forEach((item: any) => {
                const searchValue = {
                    label: item.username,
                    value: item.id,
                };
                // @ts-ignore
                if (myUsername !== item.username) fastSearchValues.push(searchValue); // don't search for ourselves
            });
            fastSearchEl.autocomplete({source: fastSearchValues});
            fastSearchEl.autocomplete('option', {disabled: false, minLength: 1});

        } else {
            let scoreSheet: ScoreSheet = newValue;
            ssvLogger(`Processing new state`);
            ssvLogger(scoreSheet);
            if (this.startStopTimer) this.startStopTimer.removeAttribute("disabled");

            // update the board game name
            if (this.boardGameTitleEl) this.boardGameTitleEl.innerText = `${scoreSheet.boardGameName}`;

            // update the table
            if (this.table) {
                // process the data in the state change, will be array of array (rows) into what the table wants
                let tableData: any = [];
                // @ts-ignore
                scoreSheet.data.forEach((row: any[], rowIndex: number) => {
                    row.forEach((column: any, columnIndex: number) => {
                        tableData.push([rowIndex, columnIndex, column]);
                    });
                });
                ssvLogger(`Table data is `);
                ssvLogger(tableData);
                // @ts-ignore
                this.table.setDataAtCell(tableData, ScoreSheetController.SOURCE_View);

            } else {
                // create a new table

                if (this.scoreSheetEl) {
                    const boardGame = this.controller.getSelectedBoardGame();
                    if (boardGame) {
                        scoreSheet.sheetLayoutOptions = TemplateManager.getInstance().getScoreSheetTemplate(boardGame);
                    }
                    scoreSheet.sheetLayoutOptions.data = scoreSheet.data;
                    this.table = new Handsontable(
                        this.scoreSheetEl,
                        scoreSheet.sheetLayoutOptions);
                    // @ts-ignore
                    this.table.addHook('afterChange', this.controller.userChangedValue);
                }
            }


            // update the timer
            if (this.timerEl) this.timerEl.innerText = this.createTimerDisplay(scoreSheet.timer);
        }

    }

    public getTableData(): any[] {
        if (this.table) {
            return this.table.getData();
        } else {
            return [];
        }
    }

    stateChangedItemAdded(managerName: string, name: string, itemAdded: any): void {
        this.stateChanged(managerName, name, this.stateManager.getStateByName(name));
    }


    private createTimerDisplay(timer: number): string {
        let result = '';
        if (timer === 0) {
            result = '00:00';
        } else {
            if (timer >= 60) {
                let hours = Math.floor(timer / 3600);
                let minutes = Math.floor(timer / 60);
                let seconds = timer - (hours * 3600) - (minutes * 60);
                if (hours > 0) {
                    result += `${hours}:`;
                }
                if (minutes > 0) {
                    if (minutes < 10) {
                        result += `0${minutes}:`
                    } else {
                        result += `${minutes}:`
                    }
                } else {
                    result += '00:';
                }
                if (seconds > 0) {
                    if (seconds < 10) {
                        result += `0${seconds}`;
                    } else {
                        result += `${seconds}`;
                    }
                } else {
                    result += '00';
                }
            } else {
                result = `00:`;
                if (timer > 0) {
                    if (timer < 10) {
                        result += `0${timer}`;
                    } else {
                        result += `${timer}`;
                    }
                } else {
                    result += '00';
                }
            }
        }
        return result;
    }

    stateChangedItemRemoved(managerName: string, name: string, itemRemoved: any): void {}
    stateChangedItemUpdated(managerName: string, name: string, itemUpdated: any, itemNewValue: any): void {}

}