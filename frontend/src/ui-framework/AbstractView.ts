import debug from 'debug';
import browserUtil from '../util/BrowserUtil';
import StateChangeListener from "../state/StateChangeListener";
import {StateManager} from "../state/StateManager";
import ViewListenerForwarder from "./ViewListenerForwarder";
import {
    DRAGGABLE_FROM,
    DRAGGABLE_KEY_ID,
    DRAGGABLE_TYPE,
    EXTRA_ACTION_ATTRIBUTE_NAME,
    Modifier,
    ViewDOMConfig,
    ViewPrefs
} from "./ConfigurationTypes";
import {isSame} from "../util/EqualityFunctions";

const avLogger = debug('view-ts');
const avLoggerDetails = debug('view-ts-detail');

export default abstract class AbstractView implements StateChangeListener {
    protected uiConfig: ViewDOMConfig;
    protected uiPrefs: ViewPrefs;

    protected stateManager: StateManager;
    protected stateName: string;

    protected eventForwarder: ViewListenerForwarder;

    protected constructor(uiConfig: ViewDOMConfig, uiPrefs: ViewPrefs, stateManager: StateManager, stateName:string) {
        this.uiConfig = uiConfig;
        this.uiPrefs = uiPrefs;
        this.stateManager = stateManager;
        this.stateName = stateName;
        this.eventForwarder = new ViewListenerForwarder();

        // state change listening
        this.stateChanged = this.stateChanged.bind(this);

        // event handlers
        this.eventStartDrag = this.eventStartDrag.bind(this);
        this.eventClickItem = this.eventClickItem.bind(this);
        this.eventDeleteClickItem = this.eventDeleteClickItem.bind(this);
        this.eventActionClicked = this.eventActionClicked.bind(this);

        // setup state listener
        this.stateManager.addChangeListenerForName(stateName,this);

    }

    public onDocumentLoaded(): void {
        this.eventForwarder.documentLoaded(this);
    }

    public stateChanged(managerName: string, name: string, newValue: any): void {
        this.updateView(name, newValue);
    }

    stateChangedItemAdded(managerName: string, name: string, itemAdded: any): void {
        this.updateView(name, this.stateManager.getStateByName(name));
    }

    stateChangedItemRemoved(managerName: string, name: string, itemRemoved: any): void {
        this.updateView(name, this.stateManager.getStateByName(name));
    }

    stateChangedItemUpdated(managerName: string, name: string, itemUpdated: any, itemNewValue: any): void {
        this.updateView(name, this.stateManager.getStateByName(name));
    }

    protected eventClickItem(event: MouseEvent): void {
        event.preventDefault();
        event.stopPropagation();
        // @ts-ignore
        const itemId = event.target.getAttribute(this.uiConfig.keyId);
        // @ts-ignore
        const dataSource = event.target.getAttribute(this.uiConfig.dataSourceId);

        // @ts-ignore
        avLoggerDetails(`Item with id ${itemId} clicked from ${dataSource}`);

        let selectedItem = this.stateManager.findItemInState(this.stateName,{id: parseInt(itemId)}, isSame);
        if (selectedItem) this.eventForwarder.itemSelected(this,selectedItem);
    }

    protected eventDeleteClickItem(event: MouseEvent): void {
        event.preventDefault();
        event.stopPropagation();
        // @ts-ignore
        const itemId = event.target.getAttribute(this.uiConfig.keyId);
        // @ts-ignore
        const dataSource = event.target.getAttribute(this.uiConfig.dataSourceId);

        // @ts-ignore
        avLoggerDetails(`Item with id ${itemId} attempting delete from ${dataSource}`);

        let selectedItem = this.stateManager.findItemInState(this.stateName,{id: parseInt(itemId)}, isSame);
        if (selectedItem) {
            const shouldDelete = this.eventForwarder.itemDeleteStarted(this,selectedItem);
            if (shouldDelete) {
                this.stateManager.removeItemFromState(this.stateName,selectedItem,isSame,false);
                this.eventForwarder.itemDeleted(this,selectedItem);
            }
        }
    }

    protected eventActionClicked(event: MouseEvent): void {
        event.preventDefault();
        event.stopPropagation();
        // @ts-ignore
        const itemId = event.target.getAttribute(this.uiConfig.keyId);
        // @ts-ignore
        const dataSource = event.target.getAttribute(this.uiConfig.dataSourceId);
        // @ts-ignore
        const actionName = event.target.getAttribute(EXTRA_ACTION_ATTRIBUTE_NAME);

        // @ts-ignore
        avLoggerDetails(`Item with id ${itemId} attempting delete from ${dataSource}`);

        let selectedItem = this.stateManager.findItemInState(this.stateName,{id: parseInt(itemId)}, isSame);
        if (selectedItem) {
            this.eventForwarder.itemAction(this,actionName,selectedItem);
        }
    }


    protected getDragData(event: DragEvent): any {
        // @ts-ignore
        const itemId = event.target.getAttribute(this.uiConfig.keyId);
        // @ts-ignore
        const dataSource = event.target.getAttribute(this.uiConfig.dataSourceId);

        // @ts-ignore
        avLoggerDetails(`Item with id ${itemId} getting drag data from ${dataSource}`);

        let selectedItem = this.stateManager.findItemInState(this.stateName,{id: parseInt(itemId)}, isSame);
        if (selectedItem) {
            selectedItem[DRAGGABLE_TYPE] = this.uiConfig.detail.drag?.type;
            selectedItem[DRAGGABLE_FROM] = this.uiConfig.detail.drag?.from;
        }
        return selectedItem;
    }

    protected abstract getIdForStateItem(name: string, item: any): string;

    protected abstract getDisplayValueForStateItem(name: string, item: any): string;

    protected getModifierForStateItem(name: string, item: any): Modifier {
        return Modifier.normal;
    }

    protected getSecondaryModifierForStateItem(name: string, item: any): Modifier {
        return Modifier.normal;
    }

    protected getBadgeValue(name: string, item: any): number {
        return 0;
    }

    protected getBackgroundImage(name: string, item: any): string {
        return '';
    }

    protected updateView(name: string, newState: any): void {
        this.createResultsForState(name,newState);
    }

    protected eventStartDrag(event: DragEvent) {
        avLogger('drag start');
        const data = JSON.stringify(this.getDragData(event));
        avLoggerDetails(data);
        // @ts-ignore
        event.dataTransfer.setData(DRAGGABLE_KEY_ID, data);
    }

    protected createResultForItem(name: string, item: any, dataSource: any = null): HTMLElement {
        avLogger('Abstract View : creating Result');
        avLogger(item);

        const resultDataKeyId = this.getIdForStateItem(name, item);

        let childEl: HTMLElement = document.createElement(this.uiConfig.resultsElementType);
        browserUtil.addRemoveClasses(childEl, this.uiConfig.resultsClasses);
        browserUtil.addAttributes(childEl, this.uiConfig.resultsElementAttributes);
        // the content may be structured
        let textEl = childEl;
        if (this.uiConfig.detail.containerClasses) {
            let contentEl: HTMLElement = document.createElement('div');
            browserUtil.addRemoveClasses(contentEl, this.uiConfig.detail.containerClasses);
            contentEl.setAttribute(this.uiConfig.keyId, resultDataKeyId);
            contentEl.setAttribute(this.uiConfig.dataSourceId, dataSource);


            textEl = document.createElement(this.uiConfig.detail.textElementType);
            browserUtil.addRemoveClasses(textEl,this.uiConfig.detail.textElementClasses);
            textEl.setAttribute(this.uiConfig.keyId, resultDataKeyId);
            textEl.setAttribute(this.uiConfig.dataSourceId, dataSource);

            contentEl.appendChild(textEl);

            if (this.uiConfig.detail.background) {
                let imgEl = document.createElement(this.uiConfig.detail.background.elementType);
                browserUtil.addRemoveClasses(imgEl, this.uiConfig.detail.background.elementType);
                imgEl.setAttribute('src', this.getBackgroundImage(name, item));
                childEl.appendChild(imgEl);
            }

            let buttonsEl = document.createElement('div');
            contentEl.appendChild(buttonsEl);

            if (this.uiConfig.detail.badge) {
                const badgeValue = this.getBadgeValue(name, item);
                if (badgeValue > 0) {
                    let badgeEl: HTMLElement = document.createElement(this.uiConfig.detail.badge.elementType);
                    browserUtil.addRemoveClasses(badgeEl, this.uiConfig.detail.badge.elementClasses);
                    browserUtil.addAttributes(badgeEl, this.uiConfig.detail.badge.elementAttributes);
                    badgeEl.setAttribute(this.uiConfig.keyId, resultDataKeyId);
                    badgeEl.setAttribute(this.uiConfig.dataSourceId, dataSource);
                    buttonsEl.appendChild(badgeEl);
                    badgeEl.innerHTML = `&nbsp;&nbsp;&nbsp;${badgeValue}&nbsp;&nbsp;&nbsp;`;
                }
            }

            if (this.uiConfig.extraActions) {
                this.uiConfig.extraActions.forEach((extraAction) => {
                    let action: HTMLElement = document.createElement('button');
                    action.setAttribute('type', 'button');
                    browserUtil.addRemoveClasses(action, extraAction.buttonClasses);
                    if (extraAction.buttonText) {
                       action.innerHTML = extraAction.buttonText;
                    }
                    if (extraAction.iconClasses) {
                        let iconEl = document.createElement('i');
                        browserUtil.addRemoveClasses(iconEl, extraAction.iconClasses);
                        iconEl.setAttribute(this.uiConfig.keyId, resultDataKeyId);
                        iconEl.setAttribute(this.uiConfig.dataSourceId, dataSource);
                        iconEl.setAttribute(EXTRA_ACTION_ATTRIBUTE_NAME,extraAction.name);
                        action.appendChild(iconEl);
                    }
                    action.setAttribute(this.uiConfig.keyId, resultDataKeyId);
                    action.setAttribute(this.uiConfig.dataSourceId, dataSource);
                    action.setAttribute(EXTRA_ACTION_ATTRIBUTE_NAME,extraAction.name);

                    action.addEventListener('click', (event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        this.eventActionClicked(event);
                    });
                    buttonsEl.appendChild(action);
                });
            }
            if (this.uiConfig.detail.delete) {
                let deleteButtonEl: HTMLElement = document.createElement('button');
                deleteButtonEl.setAttribute('type', 'button');
                browserUtil.addRemoveClasses(deleteButtonEl, this.uiConfig.detail.delete.buttonClasses);
                if (this.uiConfig.detail.delete.buttonText) {
                   deleteButtonEl.innerHTML = this.uiConfig.detail.delete.buttonText;
                }
                if (this.uiConfig.detail.delete.iconClasses) {
                    let iconEl = document.createElement('i');
                    browserUtil.addRemoveClasses(iconEl, this.uiConfig.detail.delete.iconClasses);
                    iconEl.setAttribute(this.uiConfig.keyId, resultDataKeyId);
                    iconEl.setAttribute(this.uiConfig.dataSourceId, dataSource);
                    deleteButtonEl.appendChild(iconEl);
                }
                deleteButtonEl.setAttribute(this.uiConfig.keyId, resultDataKeyId);
                deleteButtonEl.setAttribute(this.uiConfig.dataSourceId, dataSource);
                deleteButtonEl.addEventListener('click', (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    this.eventDeleteClickItem(event);
                });
                buttonsEl.appendChild(deleteButtonEl);
            }
            childEl.appendChild(contentEl);

            if (this.uiConfig.detail.drag) {
                childEl.setAttribute('draggable', 'true');
                childEl.addEventListener('dragstart', this.eventStartDrag);
            }
            // add selection actions
            if (this.uiConfig.detail.select) {
                childEl.addEventListener('click', this.eventClickItem);
            }
        }


        // add the key ids for selection
        textEl.setAttribute(this.uiConfig.keyId, resultDataKeyId);
        textEl.setAttribute(this.uiConfig.dataSourceId, dataSource);
        const displayText = this.getDisplayValueForStateItem(name, item);
        // add modifiers for patient state
        const modifier = this.getModifierForStateItem(name, item);
        const secondModifier = this.getSecondaryModifierForStateItem(name, item);
        switch (modifier) {
            case Modifier.normal: {
                avLogger('Abstract View: normal item');
                browserUtil.addRemoveClasses(childEl, this.uiConfig.modifiers.normal);
                if (this.uiConfig.icons.normal) {
                    textEl.innerHTML = displayText + '  ' + this.uiConfig.icons.normal;
                } else {
                    textEl.innerText = displayText;
                }

                switch (secondModifier) {
                    case Modifier.warning: {
                        browserUtil.addRemoveClasses(childEl, this.uiConfig.modifiers.normal, false);
                        browserUtil.addRemoveClasses(childEl, this.uiConfig.modifiers.warning, true);
                        if (this.uiConfig.icons.warning) {
                            textEl.innerHTML += '  ' + this.uiConfig.icons.warning;
                        }
                        break;
                    }
                    case Modifier.active: {
                        if (this.uiConfig.icons.active) {
                            textEl.innerHTML += '  ' + this.uiConfig.icons.active;
                        }

                    }
                }

                break;
            }
            case Modifier.active: {
                avLogger('Abstract View: active item', 10);
                browserUtil.addRemoveClasses(childEl, this.uiConfig.modifiers.active);
                if (this.uiConfig.icons.active) {
                    textEl.innerHTML = displayText + '  ' + this.uiConfig.icons.active;
                } else {
                    textEl.innerText = displayText;
                }
                switch (secondModifier) {
                    case Modifier.warning: {
                        browserUtil.addRemoveClasses(childEl,this.uiConfig.modifiers.active, false);
                        browserUtil.addRemoveClasses(childEl, this.uiConfig.modifiers.warning, true);
                        if (this.uiConfig.icons.warning) {
                            textEl.innerHTML += '  ' + this.uiConfig.icons.warning;
                        }
                        break;
                    }
                }
                break;
            }
            case Modifier.inactive: {
                avLogger('Abstract View: inactive item', 10);
                browserUtil.addRemoveClasses(childEl, this.uiConfig.modifiers.inactive);
                if (this.uiConfig.icons.inactive) {
                    textEl.innerHTML = displayText + '  ' + this.uiConfig.icons.inactive;
                } else {
                    textEl.innerText = displayText;
                }
                switch (secondModifier) {
                    case Modifier.warning: {
                        if (this.uiConfig.icons.warning) {
                            browserUtil.addRemoveClasses(childEl, this.uiConfig.modifiers.inactive, false);
                            browserUtil.addRemoveClasses(childEl, this.uiConfig.modifiers.warning, true);
                            textEl.innerHTML += '  ' + this.uiConfig.icons.warning;
                        }
                        break;
                    }
                    case Modifier.active: {
                        if (this.uiConfig.icons.active) {
                            textEl.innerHTML += '  ' + this.uiConfig.icons.active;
                        }
                        break;
                    }
                }
                break;
            }
        }
        return childEl;
    }

    protected createResultsForState(name: string, newState: any): void {
        avLogger('Abstract View : creating Results', 10);
        avLogger(newState);
        // remove the previous items from list
        const viewEl = document.getElementById(this.uiConfig.resultsContainerId);
        if (viewEl) browserUtil.removeAllChildren(viewEl);

        // add the new children
        newState.map((item: any, index: number) => {
            const childEl = this.createResultForItem(name, item);
            // add draggable actions
            avLogger(`Abstract View: Adding child ${item.id}`);
            if (viewEl) viewEl.appendChild(childEl);
        });
    }

}
