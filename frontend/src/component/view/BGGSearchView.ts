import debug from 'debug';
import browserUtil from "../../util/BrowserUtil";
import DownloadManager from "../../network/DownloadManager";
import MemoryBufferStateManager from "../../state/MemoryBufferStateManager";
import {KeyType, ViewDOMConfig} from "../../ui-framework/ConfigurationTypes";
import AbstractListView from "../../ui-framework/AbstractListView";
import {API_Config, DRAGGABLE, STATE_NAMES, VIEW_NAME} from "../../AppTypes";
import {ViewListener} from "../../ui-framework/ViewListener";
import {View} from "../../ui-framework/View";

const vLogger = debug('board-game-search-sidebar');
const vLoggerDetail = debug('board-game-search-sidebar:detail');

class BGGSearchView extends AbstractListView implements ViewListener{
    // @ts-ignore
    private formEl: HTMLElement;
    // @ts-ignore
    private queryEl: HTMLInputElement;
    // @ts-ignore
    private buttonEl: HTMLButtonElement;

    private static BGGSEARCH_ViewConfig:ViewDOMConfig = {
        resultsContainerId:'bggSearchResults',
        resultsElementType:'a',
        resultsElementAttributes:[{name:'href',value:'#'}],
        resultsClasses:'list-group-item my-list-item truncate-notification list-group-item-action',
        keyId:'gameId',
        keyType:KeyType.number,
        dataSourceId:VIEW_NAME.bggSearch,
        modifiers: {
            normal: 'list-group-item-primary',
            inactive: 'list-group-item-light',
            active:'list-group-item-info',
            warning:'list-group-item-danger'
        },
        detail: {
            containerClasses: 'd-flex w-100 justify-content-between',
            textElementType:'span',
            textElementClasses:'mb-1',
            select: true,
            drag: {
                type: DRAGGABLE.typeBoardGame,
                from: 'boardGameSearch'
            }
        },
    }

    static BGGSEARCH_Form:string = 'bggSearch';
    static BGGSEARCH_Query:string = 'queryText';
    static BGGSEARCH_Search:string = 'bggSearchButton';

    constructor() {
        super(BGGSearchView.BGGSEARCH_ViewConfig,new MemoryBufferStateManager(),STATE_NAMES.bggSearchResults);

        // handler binding
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSearchResultsCB = this.handleSearchResultsCB.bind(this);

    }

    public handleSearchResultsCB(data: any, status: number, associatedStateName: string): void {
        this.changeSearchButton(true);
        vLogger(`callback for bgg search ${associatedStateName} with status ${status} - `);
        if (status >= 200 && status <= 299) { // do we have any data?
            vLoggerDetail(data);
            vLoggerDetail(data.data.findBoardGames);
            if (this.stateManager && this.stateName) this.stateManager.setStateByName(this.stateName, data.data.findBoardGames, true);
        }
    }

    onDocumentLoaded() {
        // get a link to the search button and search field and form
        // @ts-ignore
        this.formEl = document.getElementById(BGGSearchView.BGGSEARCH_Form);
        // @ts-ignore
        this.buttonEl = document.getElementById(BGGSearchView.BGGSEARCH_Search);
        // @ts-ignore
        this.queryEl = document.getElementById(BGGSearchView.BGGSEARCH_Query);

        this.formEl.addEventListener('submit', this.handleSearch);

        this.addEventListener(this);

        super.onDocumentLoaded();
    }

    getIdForStateItem(name: string, item: any) {
        return item.gameId;
    }

    getDisplayValueForStateItem(name: string, item: any) {
        return `${item.name} (${item.year})     `;
    }

    compareStateItemsForEquality(item1: any, item2: any): boolean {
        let result = false;
        if (item1.gameId && item2.gameId) {
            const parsed1 = parseInt(item1.gameId);
            const parsed2 = parseInt(item2.gameId);
            if (!isNaN(parsed1) && !isNaN(parsed2)) {
                item1.gameId = parsed1;
                item2.gameId = parsed2;
                result = (item1.gameId === item2.gameId);
            }
        }
        return result;
    }


    eventClickItem(event: MouseEvent) {
        super.eventClickItem(event);
        //this.applicationView.addBoardGameToDisplay(boardGame);
        this.eventForwarder.hideRequested(this);
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
        let query = API_Config.bggSearchCall;
        DownloadManager.getInstance().addQLApiRequest(API_Config.graphQL, query, {queryString: queryText}, this.handleSearchResultsCB, STATE_NAMES.bggSearchResults);
    }

    documentLoaded(view: View): void {}
    hideRequested(view: View): void {}
    itemAction(view: View, actionName: string, selectedItem: any): void {    }
    canDeleteItem(view: View, selectedItem: any): boolean {return true;}

    itemDeleted(view: View, selectedItem: any): void {
        /* listen for our own deletes as we are expected to implement them */
        vLoggerDetail(`Handling delete of board game search result for game ${selectedItem.gameId}`);
        this.stateManager?.removeItemFromState(STATE_NAMES.bggSearchResults,selectedItem,this.compareStateItemsForEquality,true);
    }

    itemDragStarted(view: View, selectedItem: any): void {}
    itemSelected(view: View, selectedItem: any): void {}
    showRequested(view: View): void {}
    itemDropped(view: View, droppedItem: any): void {}
    itemDeselected(view: View, selectedItem: any): void {}
}

export default BGGSearchView;
