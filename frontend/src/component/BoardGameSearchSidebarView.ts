import debug from 'debug';
import SidebarView from './SidebarView';
import {StateManager} from '../state/StateManager';
import {isSameGame} from '../util/EqualityFunctions';
import browserUtil from "../util/BrowserUtil";
import downloader from "../network/DownloadManager";
import MemoryBufferStateManager from "../state/MemoryBufferStateManager";

const vLogger = debug('board-game-search-sidebar');
const vLoggerDetail = debug('board-game-search-sidebar:detail');

class BoardGameSearchSidebarView extends SidebarView {
    protected localisedSM: StateManager;
    // @ts-ignore
    private formEl: HTMLElement;
    // @ts-ignore
    private queryEl: HTMLInputElement;
    // @ts-ignore
    private buttonEl: HTMLButtonElement;

    constructor(applicationView: any, htmlDocument: HTMLDocument, stateManager: StateManager) {
        super(applicationView, htmlDocument, applicationView.state.ui.boardGameSearchSideBar, applicationView.state.uiPrefs.boardGameSearchSideBar, stateManager);

        this.config = applicationView.state;

        // handler binding
        this.updateView = this.updateView.bind(this);
        this.eventClickItem = this.eventClickItem.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSearchResultsCB = this.handleSearchResultsCB.bind(this);

        // register state change listening
        this.localisedSM = new MemoryBufferStateManager();
        this.localisedSM.addChangeListenerForName(this.config.stateNames.bggSearchResults, this);

        vLogger(this.localisedSM.getStateByName(this.config.stateNames.bggSearchResults));
    }

    public handleSearchResultsCB(data: any, status: number, associatedStateName: string): void {
        this.changeSearchButton(true);
        vLogger(`callback for bgg search ${associatedStateName} with status ${status} - `);
        if (status >= 200 && status <= 299) { // do we have any data?
            vLoggerDetail(data);
            vLoggerDetail(data.data.findBoardGames);
            this.localisedSM.setStateByName(this.config.stateNames.bggSearchResults, data.data.findBoardGames, true);
        }
    }

    onDocumentLoaded() {
        super.onDocumentLoaded();
        // get a link to the search button and search field and form
        // @ts-ignore
        this.formEl = this.document.getElementById(this.uiConfig.dom.formId);
        // @ts-ignore
        this.buttonEl = this.document.getElementById(this.uiConfig.dom.buttonId);
        // @ts-ignore
        this.queryEl = this.document.getElementById(this.uiConfig.dom.queryId);

        this.formEl.addEventListener('submit', this.handleSearch);
    }

    getIdForStateItem(name: string, item: any) {
        return item.gameId;
    }

    getLegacyIdForStateItem(name: string, item: any) {
        return item.gameId;
    }

    getDisplayValueForStateItem(name: string, item: any) {
        return `${item.name} (${item.year})     `;
    }

    getModifierForStateItem(name: string, item: any) {
        return 'normal';
    }

    getSecondaryModifierForStateItem(name: string, item: any) {
        return 'normal';
    }

    eventClickItem(event: MouseEvent) {
        event.preventDefault();
        event.stopPropagation();
        console.log(event.target);
        // @ts-ignore
        const boardGameId = event.target.getAttribute(this.uiConfig.dom.resultDataKeyId);
        // @ts-ignore
        const dataSource = event.target.getAttribute(this.uiConfig.dom.resultDataSourceId);

        // @ts-ignore
        vLoggerDetail(`Board Game ${event.target} with id ${boardGameId} clicked from ${dataSource}`);

        let boardGame = this.localisedSM.findItemInState(this.config.stateNames.bggSearchResults, {gameId: parseInt(boardGameId)}, isSameGame);
        if (boardGame) {
            this.applicationView.addBoardGameToDisplay(boardGame);
        }
        this.eventHide(null);

    }

    updateView(name: string, newState: any) {
        if (name === this.config.stateNames.bggSearchResults) {
            vLogger(`Updating for recent searches`);
            newState = this.localisedSM.getStateByName(this.config.stateNames.bggSearchResults);
            vLogger(newState);
            this.createResultsForState(name, newState);
        }
    }

    getDragData(event: DragEvent) {
        // use the actual id to pass the user to the droppable target
        // @ts-ignore
        const boardGameId = event.target.getAttribute(this.uiConfig.dom.resultDataKeyId);
        // @ts-ignore
        vLoggerDetail(`Board Game ${event.target.innerText} with id ${boardGameId} dragging`);
        let boardGame = this.localisedSM.findItemInState(this.config.stateNames.bggSearchResults, {gameId: parseInt(boardGameId)}, isSameGame);
        vLoggerDetail(boardGame);
        boardGame[this.config.ui.draggable.draggedType] = this.config.ui.draggable.draggedTypeBoardGame;
        boardGame[this.config.ui.draggable.draggedFrom] = this.config.ui.draggable.draggedFromBoardGameSearch;
        return boardGame;
    }

    protected eventDeleteClickItem(event: MouseEvent): void {
        // @ts-ignore
        const boardGameId = event.target.getAttribute(this.uiConfig.dom.resultDataKeyId);
        // @ts-ignore
        const dataSource = event.target.getAttribute(this.uiConfig.dom.resultDataSourceId)
        // @ts-ignore
        vLoggerDetail(`Board Game ${event.target} with id ${boardGameId} delete clicked from ${dataSource}`);

        let boardGame: any = this.localisedSM.findItemInState(this.config.stateNames.bggSearchResults, {id: parseInt(boardGameId)}, isSameGame);
        vLogger(boardGameId);
        if (boardGame) {
            this.localisedSM.removeItemFromState(this.config.stateNames.bggSearchResults, boardGame, isSameGame, true);
        }
    }

    protected getBadgeValue(name: string, item: any): number {
        return 0;
    }

    protected getBackgroundImage(name: string, item: any): string {
        return "";
    }

    private changeSearchButton(enable: boolean = false) {
        browserUtil.removeAllChildren(this.buttonEl);
        if (enable) {
            if (this.buttonEl) this.buttonEl.removeAttribute("disabled");
            if (this.buttonEl) this.buttonEl.innerHTML = 'Search';
        } else {
            if (this.buttonEl) this.buttonEl.setAttribute("disabled", "true");
            if (this.buttonEl) this.buttonEl.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>  Loading...';
        }
    }

    private handleSearch(event: Event) {
        vLogger(`Handling search`);
        event.preventDefault();
        event.stopPropagation();
        // do we have anything to search for?
        let queryText = this.queryEl.value.trim();
        if (queryText.length == 0) return;

        // ok, have a search term, lets start a search
        this.changeSearchButton(false);

        // get the query string from state obj
        let query = this.config.apis.bggSearchCall;


        downloader.addQLApiRequest(this.config.apis.graphQL, query, {queryString: queryText}, this.handleSearchResultsCB, this.config.stateNames.bggSearchResults);
    }


}

export default BoardGameSearchSidebarView;
