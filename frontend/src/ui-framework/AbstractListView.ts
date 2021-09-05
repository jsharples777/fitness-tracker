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
    KeyType,
    Modifier,
    ViewDOMConfig,
} from "./ConfigurationTypes";
import {ViewListener} from "./ViewListener";
import {View} from "./View";
import {isSame} from "../util/EqualityFunctions";

const avLogger = debug('view-ts');
const avLoggerDetails = debug('view-ts-detail');

export default abstract class AbstractListView implements StateChangeListener, View {

    public static DATA_SOURCE = 'data-source';

    protected uiConfig: ViewDOMConfig;

    protected stateManager: StateManager;
    protected stateName: string;

    protected eventForwarder: ViewListenerForwarder;
    protected containerEl: HTMLElement|null = null;

    protected constructor(uiConfig: ViewDOMConfig, stateManager: StateManager, stateName:string) {
        this.uiConfig = uiConfig;
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
        this.handleDrop = this.handleDrop.bind(this);

        // setup state listener
        this.stateManager.addChangeListenerForName(this.stateName,this);

    }

    addEventListener(listener: ViewListener) {
        this.eventForwarder.addListener(listener);
    }

    onDocumentLoaded(): void {
        this.eventForwarder.documentLoaded(this);
    }

    public stateChanged(managerName: string, name: string, newValue: any): void {
        this.updateView(name, newValue);
    }

    stateChangedItemAdded(managerName: string, name: string, itemAdded: any): void {
        if (this.stateManager && this.stateName) this.updateView(name, this.stateManager.getStateByName(name));
    }

    stateChangedItemRemoved(managerName: string, name: string, itemRemoved: any): void {
        if (this.stateManager && this.stateName) this.updateView(name, this.stateManager.getStateByName(name));
    }

    stateChangedItemUpdated(managerName: string, name: string, itemUpdated: any, itemNewValue: any): void {
        if (this.stateManager && this.stateName) this.updateView(name, this.stateManager.getStateByName(name));
    }

    protected eventClickItem(event: MouseEvent): void {
        event.preventDefault();
        event.stopPropagation();
        // @ts-ignore
        let itemId = event.target.getAttribute(this.uiConfig.keyId);
        // @ts-ignore
        const dataSource = event.target.getAttribute(AbstractListView.DATA_SOURCE);

        if (this.uiConfig.keyType === KeyType.number) itemId = parseInt(itemId);
        // @ts-ignore
        avLoggerDetails(`view ${this.getName()}: Item with id ${itemId} clicked from ${dataSource}`);
        let compareWith = {};
        // @ts-ignore
        compareWith[this.uiConfig.keyId] = itemId;
        avLoggerDetails(compareWith);

        let selectedItem = this.stateManager.findItemInState(this.stateName, compareWith, this.compareStateItemsForEquality);
        console.log(selectedItem);
        if (selectedItem) this.eventForwarder.itemSelected(this, selectedItem);
    }

    protected eventDeleteClickItem(event: MouseEvent): void {
        event.preventDefault();
        event.stopPropagation();
        // @ts-ignore
        let itemId = event.target.getAttribute(this.uiConfig.keyId);
        // @ts-ignore
        const dataSource = event.target.getAttribute(AbstractListView.DATA_SOURCE);

        if (this.uiConfig.keyType === KeyType.number) itemId = parseInt(itemId);
        // @ts-ignore
        avLoggerDetails(`view ${this.getName()}: Item with id ${itemId} attempting delete from ${dataSource}`);
        let compareWith = {};
        // @ts-ignore
        compareWith[this.uiConfig.keyId] = itemId;
        avLoggerDetails(compareWith);

        let selectedItem = this.stateManager.findItemInState(this.stateName, compareWith, this.compareStateItemsForEquality);
        if (selectedItem) {
            const shouldDelete = this.eventForwarder.canDeleteItem(this, selectedItem);
            avLoggerDetails(`view ${this.getName()}: Item with id ${itemId} attempting delete from ${dataSource} - ${shouldDelete}`);
            if (shouldDelete) {
                avLoggerDetails(selectedItem);
                this.eventForwarder.itemDeleted(this, selectedItem);
            }
        }
    }

    protected eventActionClicked(event: MouseEvent): void {
        event.preventDefault();
        event.stopPropagation();
        // @ts-ignore
        let itemId = event.target.getAttribute(this.uiConfig.keyId);
        // @ts-ignore
        const dataSource = event.target.getAttribute(AbstractListView.DATA_SOURCE);
        // @ts-ignore
        const actionName = event.target.getAttribute(EXTRA_ACTION_ATTRIBUTE_NAME);

        if (this.uiConfig.keyType === KeyType.number) itemId = parseInt(itemId);
        // @ts-ignore
        avLoggerDetails(`view ${this.getName()}: Item with id ${itemId} attempting delete from ${dataSource}`);
        let compareWith = {};
        // @ts-ignore
        compareWith[this.uiConfig.keyId] = itemId;
        avLoggerDetails(compareWith);

        let selectedItem = this.stateManager.findItemInState(this.stateName, compareWith, this.compareStateItemsForEquality);
        if (selectedItem) {
            this.eventForwarder.itemAction(this, actionName, selectedItem);
        }
    }


    protected getDragData(event: DragEvent): any {
        // @ts-ignore
        let itemId = event.target.getAttribute(this.uiConfig.keyId);
        // @ts-ignore
        const dataSource = event.target.getAttribute(AbstractListView.DATA_SOURCE);

        if (this.uiConfig.keyType === KeyType.number) itemId = parseInt(itemId);
        // @ts-ignore
        avLoggerDetails(`view ${this.getName()}: Item with id ${itemId} getting drag data from ${dataSource}`);

        let compareWith = {};
        // @ts-ignore
        compareWith[this.uiConfig.keyId] = itemId;

        let selectedItem = {};

        selectedItem = this.stateManager.findItemInState(this.stateName, compareWith, this.compareStateItemsForEquality);
        if (selectedItem) {
            // @ts-ignore
            selectedItem[DRAGGABLE_TYPE] = this.uiConfig.detail.drag?.type;
            // @ts-ignore
            selectedItem[DRAGGABLE_FROM] = this.uiConfig.detail.drag?.from;
        }
        return selectedItem;
    }

    abstract getIdForStateItem(name: string, item: any): string;
    abstract getDisplayValueForStateItem(name: string, item: any): string;

    compareStateItemsForEquality(item1:any, item2:any) :boolean {
        return isSame(item1,item2);
    }

    getModifierForStateItem(name: string, item: any): Modifier {
        return Modifier.normal;
    }

    getSecondaryModifierForStateItem(name: string, item: any): Modifier {
        return Modifier.normal;
    }

    getBadgeValue(name: string, item: any): number {
        return 0;
    }

    getBackgroundImage(name: string, item: any): string {
        return '';
    }

    updateView(name: string, newState: any): void {
        this.createResultsForState(name, newState);
    }

    protected eventStartDrag(event: DragEvent) {
        avLogger(`view ${this.getName()}: drag start`);
        avLoggerDetails(event.target);
        const data = JSON.stringify(this.getDragData(event));
        avLoggerDetails(data);
        // @ts-ignore
        event.dataTransfer.setData(DRAGGABLE_KEY_ID, data);
    }

    protected createResultForItem(name: string, item: any): HTMLElement {
        avLogger(`view ${this.getName()}: creating Result`);
        avLogger(item);

        const resultDataKeyId = this.getIdForStateItem(name, item);

        let childEl: HTMLElement = document.createElement(this.uiConfig.resultsElementType);
        browserUtil.addRemoveClasses(childEl, this.uiConfig.resultsClasses);
        browserUtil.addAttributes(childEl, this.uiConfig.resultsElementAttributes);
        childEl.setAttribute(this.uiConfig.keyId, resultDataKeyId);
        childEl.setAttribute(AbstractListView.DATA_SOURCE,this.uiConfig.dataSourceId);
        // the content may be structured
        let textEl = childEl;
        if (this.uiConfig.detail.containerClasses) {
            let contentEl: HTMLElement = document.createElement('div');
            browserUtil.addRemoveClasses(contentEl, this.uiConfig.detail.containerClasses);
            contentEl.setAttribute(this.uiConfig.keyId, resultDataKeyId);
            contentEl.setAttribute(AbstractListView.DATA_SOURCE,this.uiConfig.dataSourceId);


            textEl = document.createElement(this.uiConfig.detail.textElementType);
            browserUtil.addRemoveClasses(textEl,this.uiConfig.detail.textElementClasses);
            textEl.setAttribute(this.uiConfig.keyId, resultDataKeyId);
            textEl.setAttribute(AbstractListView.DATA_SOURCE,this.uiConfig.dataSourceId);

            contentEl.appendChild(textEl);

            if (this.uiConfig.detail.background) {
                let imgEl = document.createElement(this.uiConfig.detail.background.elementType);
                browserUtil.addRemoveClasses(imgEl, this.uiConfig.detail.background.elementClasses);
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
                    badgeEl.setAttribute(AbstractListView.DATA_SOURCE,this.uiConfig.dataSourceId);
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
                        iconEl.setAttribute(AbstractListView.DATA_SOURCE,this.uiConfig.dataSourceId);
                        iconEl.setAttribute(EXTRA_ACTION_ATTRIBUTE_NAME,extraAction.name);
                        action.appendChild(iconEl);
                    }
                    action.setAttribute(this.uiConfig.keyId, resultDataKeyId);
                    action.setAttribute(AbstractListView.DATA_SOURCE,this.uiConfig.dataSourceId);
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
                    iconEl.setAttribute(AbstractListView.DATA_SOURCE,this.uiConfig.dataSourceId);
                    deleteButtonEl.appendChild(iconEl);
                }
                deleteButtonEl.setAttribute(this.uiConfig.keyId, resultDataKeyId);
                deleteButtonEl.setAttribute(AbstractListView.DATA_SOURCE,this.uiConfig.dataSourceId);
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
        textEl.setAttribute(AbstractListView.DATA_SOURCE,this.uiConfig.dataSourceId);
        const displayText = this.getDisplayValueForStateItem(name, item);
        textEl.innerHTML = displayText;
        // add modifiers for patient state
        if (this.uiConfig.modifiers) {
            const modifier = this.getModifierForStateItem(name, item);
            const secondModifier = this.getSecondaryModifierForStateItem(name, item);
            switch (modifier) {
                case Modifier.normal: {
                    avLogger(`view ${this.getName()}: normal item`);
                    browserUtil.addRemoveClasses(childEl, this.uiConfig.modifiers.normal);
                    if (this.uiConfig.icons && this.uiConfig.icons.normal) {
                        let iconEl = document.createElement('i');
                        browserUtil.addRemoveClasses(iconEl, this.uiConfig.icons.normal);
                        iconEl.setAttribute(this.uiConfig.keyId, resultDataKeyId);
                        iconEl.setAttribute(AbstractListView.DATA_SOURCE,this.uiConfig.dataSourceId);
                        textEl.appendChild(iconEl);
                    }

                    switch (secondModifier) {
                        case Modifier.warning: {
                            browserUtil.addRemoveClasses(childEl, this.uiConfig.modifiers.normal, false);
                            browserUtil.addRemoveClasses(childEl, this.uiConfig.modifiers.warning, true);
                            if (this.uiConfig.icons && this.uiConfig.icons.warning) {
                                let iconEl = document.createElement('i');
                                browserUtil.addRemoveClasses(iconEl, this.uiConfig.icons.warning);
                                iconEl.setAttribute(this.uiConfig.keyId, resultDataKeyId);
                                iconEl.setAttribute(AbstractListView.DATA_SOURCE,this.uiConfig.dataSourceId);
                                textEl.appendChild(iconEl);
                            }
                            break;
                        }
                        case Modifier.active: {
                            if (this.uiConfig.icons && this.uiConfig.icons.active) {
                                let iconEl = document.createElement('i');
                                browserUtil.addRemoveClasses(iconEl, this.uiConfig.icons.active);
                                iconEl.setAttribute(this.uiConfig.keyId, resultDataKeyId);
                                iconEl.setAttribute(AbstractListView.DATA_SOURCE,this.uiConfig.dataSourceId);
                                textEl.appendChild(iconEl);
                            }
                        }
                    }

                    break;
                }
                case Modifier.active: {
                    avLogger(`view ${this.getName()}: active item`);
                    browserUtil.addRemoveClasses(childEl, this.uiConfig.modifiers.active);
                    if (this.uiConfig.icons && this.uiConfig.icons.active) {
                        let iconEl = document.createElement('i');
                        browserUtil.addRemoveClasses(iconEl, this.uiConfig.icons.active);
                        iconEl.setAttribute(this.uiConfig.keyId, resultDataKeyId);
                        iconEl.setAttribute(AbstractListView.DATA_SOURCE,this.uiConfig.dataSourceId);
                        textEl.appendChild(iconEl);
                    }

                    switch (secondModifier) {
                        case Modifier.warning: {
                            browserUtil.addRemoveClasses(childEl, this.uiConfig.modifiers.active, false);
                            browserUtil.addRemoveClasses(childEl, this.uiConfig.modifiers.warning, true);
                            if (this.uiConfig.icons && this.uiConfig.icons.warning) {
                                let iconEl = document.createElement('i');
                                browserUtil.addRemoveClasses(iconEl, this.uiConfig.icons.warning);
                                iconEl.setAttribute(this.uiConfig.keyId, resultDataKeyId);
                                iconEl.setAttribute(AbstractListView.DATA_SOURCE,this.uiConfig.dataSourceId);
                                textEl.appendChild(iconEl);
                            }
                            break;
                        }
                    }
                    break;
                }
                case Modifier.inactive: {
                    avLogger(`view ${this.getName()}: inactive item`);
                    browserUtil.addRemoveClasses(childEl, this.uiConfig.modifiers.inactive);
                    if (this.uiConfig.icons && this.uiConfig.icons.inactive) {
                        let iconEl = document.createElement('i');
                        browserUtil.addRemoveClasses(iconEl, this.uiConfig.icons.inactive);
                        iconEl.setAttribute(this.uiConfig.keyId, resultDataKeyId);
                        iconEl.setAttribute(AbstractListView.DATA_SOURCE,this.uiConfig.dataSourceId);
                        textEl.appendChild(iconEl);
                    }

                    switch (secondModifier) {
                        case Modifier.warning: {
                            if (this.uiConfig.icons && this.uiConfig.icons.warning) {
                                browserUtil.addRemoveClasses(childEl, this.uiConfig.modifiers.inactive, false);
                                browserUtil.addRemoveClasses(childEl, this.uiConfig.modifiers.warning, true);
                                let iconEl = document.createElement('i');
                                browserUtil.addRemoveClasses(iconEl, this.uiConfig.icons.warning);
                                iconEl.setAttribute(this.uiConfig.keyId, resultDataKeyId);
                                iconEl.setAttribute(AbstractListView.DATA_SOURCE,this.uiConfig.dataSourceId);
                                textEl.appendChild(iconEl);
                            }
                            break;
                        }
                        case Modifier.active: {
                            if (this.uiConfig.icons && this.uiConfig.icons.active) {
                                let iconEl = document.createElement('i');
                                browserUtil.addRemoveClasses(iconEl, this.uiConfig.icons.active);
                                iconEl.setAttribute(this.uiConfig.keyId, resultDataKeyId);
                                iconEl.setAttribute(AbstractListView.DATA_SOURCE,this.uiConfig.dataSourceId);
                                textEl.appendChild(iconEl);
                            }
                            break;
                        }
                    }
                    break;
                }
            }
        }
        return childEl;
    }

    protected createResultsForState(name: string, newState: any): void {
        avLogger(`view ${this.getName()}: creating Results`, 10);
        avLogger(newState);
        // remove the previous items from list
        const viewEl = document.getElementById(this.uiConfig.resultsContainerId);
        if (viewEl) browserUtil.removeAllChildren(viewEl);

        // add the new children
        newState.map((item: any, index: number) => {
            const childEl = this.createResultForItem(name, item);
            // add draggable actions
            avLogger(`view ${this.getName()}:  Adding child ${this.getIdForStateItem(name,item)}`);
            if (viewEl) viewEl.appendChild(childEl);
        });
    }

    setContainedBy(container: HTMLElement): void {
        this.containerEl = container;
        if (this.uiConfig.detail.drop) {
            avLoggerDetails(`view ${this.getName()}: Adding dragover events to ${this.uiConfig.dataSourceId}`)
            avLoggerDetails(container);
            container.addEventListener('dragover', (event) => {
                event.preventDefault();
            });
            container.addEventListener('drop', this.handleDrop);

        }

    }

    handleDrop(event: Event) {
        avLogger(`view ${this.getName()}: drop event`);
        avLoggerDetails(event.target);
        // @ts-ignore
        const draggedObjectJSON = event.dataTransfer.getData(DRAGGABLE_KEY_ID);
        const draggedObject = JSON.parse(draggedObjectJSON);
        avLoggerDetails(draggedObject);

        // check to see if we accept the dropped type and source
        const droppedObjectType = draggedObject[DRAGGABLE_TYPE];
        const droppedObjectFrom = draggedObject[DRAGGABLE_FROM];
        avLogger(`view ${this.getName()}: drop event from ${droppedObjectFrom} with type ${droppedObjectType}`);
        if (this.uiConfig.detail.drop) {
            const acceptType = (this.uiConfig.detail.drop.acceptTypes.findIndex((objectType) => objectType === droppedObjectType) >= 0);
            let acceptFrom = true;
            if (acceptType) {
                if (this.uiConfig.detail.drop.acceptFrom) {
                    acceptFrom = (this.uiConfig.detail.drop.acceptFrom.findIndex((from) => from === droppedObjectFrom) >= 0);
                }
                avLoggerDetails(`view ${this.getName()}: accepted type? ${acceptType} and from? ${acceptFrom}`);
                if (acceptType && acceptFrom) {
                    this.eventForwarder.itemDropped(this,draggedObject);
                }
            }
        }
    }

    getName(): string {
        return this.uiConfig.dataSourceId;
    }

    hidden(): void {}

}
