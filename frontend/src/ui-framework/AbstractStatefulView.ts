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
import {AbstractView} from "./AbstractView";

const avLogger = debug('view-ts');
const avLoggerDetails = debug('view-ts-detail');


export default abstract class AbstractStatefulView extends AbstractView implements StateChangeListener {

    protected stateManager: StateManager;

    protected constructor(uiConfig: ViewDOMConfig, stateManager: StateManager, collectionName:string) {
        super(uiConfig,collectionName);
        this.stateManager = stateManager;


        // state change listening
        this.stateChanged = this.stateChanged.bind(this);

        // event handlers
        this.eventClickItem = this.eventClickItem.bind(this);
        this.eventDeleteClickItem = this.eventDeleteClickItem.bind(this);
        this.eventActionClicked = this.eventActionClicked.bind(this);

        // setup state listener
        this.stateManager.addChangeListenerForName(this.collectionName,this);

    }

    public getItemInNamedCollection(name: string, compareWith: any): any {
        return this.stateManager.findItemInState(name, compareWith, this.compareItemsForEquality);
    }

    public stateChanged(managerName: string, name: string, newValue: any): void {
        this.updateViewForNamedCollection(name, newValue);
    }

    stateChangedItemAdded(managerName: string, name: string, itemAdded: any): void {
        if (this.stateManager && this.collectionName) this.updateViewForNamedCollection(name, this.stateManager.getStateByName(name));
    }

    stateChangedItemRemoved(managerName: string, name: string, itemRemoved: any): void {
        if (this.stateManager && this.collectionName) this.updateViewForNamedCollection(name, this.stateManager.getStateByName(name));
    }

    stateChangedItemUpdated(managerName: string, name: string, itemUpdated: any, itemNewValue: any): void {
        if (this.stateManager && this.collectionName) this.updateViewForNamedCollection(name, this.stateManager.getStateByName(name));
    }

    updateViewForNamedCollection(name: string, newState: any): void {
        this.createResultsForState(name, newState);
    }



    protected createResultForItem(name: string, item: any): HTMLElement {
        const canDeleteItem:boolean = this.hasPermissionToDeleteItemInNamedCollection(name,item);

        avLogger(`view ${this.getName()}: creating Result`);
        avLogger(item);

        const resultDataKeyId = this.getIdForItemInNamedCollection(name, item);

        let childEl: HTMLElement = document.createElement(this.uiConfig.resultsElementType);
        browserUtil.addRemoveClasses(childEl, this.uiConfig.resultsClasses);
        browserUtil.addAttributes(childEl, this.uiConfig.resultsElementAttributes);
        childEl.setAttribute(this.uiConfig.keyId, resultDataKeyId);
        childEl.setAttribute(AbstractStatefulView.DATA_SOURCE,this.uiConfig.dataSourceId);
        // the content may be structured
        let textEl = childEl;
        if (this.uiConfig.detail.containerClasses) {
            let contentEl: HTMLElement = document.createElement('div');
            browserUtil.addRemoveClasses(contentEl, this.uiConfig.detail.containerClasses);
            contentEl.setAttribute(this.uiConfig.keyId, resultDataKeyId);
            contentEl.setAttribute(AbstractStatefulView.DATA_SOURCE,this.uiConfig.dataSourceId);


            textEl = document.createElement(this.uiConfig.detail.textElementType);
            browserUtil.addRemoveClasses(textEl,this.uiConfig.detail.textElementClasses);
            textEl.setAttribute(this.uiConfig.keyId, resultDataKeyId);
            textEl.setAttribute(AbstractStatefulView.DATA_SOURCE,this.uiConfig.dataSourceId);

            contentEl.appendChild(textEl);

            if (this.uiConfig.detail.background) {
                let imgEl = document.createElement(this.uiConfig.detail.background.elementType);
                browserUtil.addRemoveClasses(imgEl, this.uiConfig.detail.background.elementClasses);
                imgEl.setAttribute('src', this.getBackgroundImageForItemInNamedCollection(name, item));
                childEl.appendChild(imgEl);
            }

            let buttonsEl = document.createElement('div');
            contentEl.appendChild(buttonsEl);

            if (this.uiConfig.detail.badge) {
                const badgeValue = this.getBadgeValueForItemInNamedCollection(name, item);
                if (badgeValue > 0) {
                    let badgeEl: HTMLElement = document.createElement(this.uiConfig.detail.badge.elementType);
                    browserUtil.addRemoveClasses(badgeEl, this.uiConfig.detail.badge.elementClasses);
                    browserUtil.addAttributes(badgeEl, this.uiConfig.detail.badge.elementAttributes);
                    badgeEl.setAttribute(this.uiConfig.keyId, resultDataKeyId);
                    badgeEl.setAttribute(AbstractStatefulView.DATA_SOURCE,this.uiConfig.dataSourceId);
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
                        iconEl.setAttribute(AbstractStatefulView.DATA_SOURCE,this.uiConfig.dataSourceId);
                        iconEl.setAttribute(EXTRA_ACTION_ATTRIBUTE_NAME,extraAction.name);
                        action.appendChild(iconEl);
                    }
                    action.setAttribute(this.uiConfig.keyId, resultDataKeyId);
                    action.setAttribute(AbstractStatefulView.DATA_SOURCE,this.uiConfig.dataSourceId);
                    action.setAttribute(EXTRA_ACTION_ATTRIBUTE_NAME,extraAction.name);

                    action.addEventListener('click', (event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        this.eventActionClicked(event);
                    });
                    buttonsEl.appendChild(action);
                });
            }
            if (this.uiConfig.detail.delete && canDeleteItem) {
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
                    iconEl.setAttribute(AbstractStatefulView.DATA_SOURCE,this.uiConfig.dataSourceId);
                    deleteButtonEl.appendChild(iconEl);
                }
                deleteButtonEl.setAttribute(this.uiConfig.keyId, resultDataKeyId);
                deleteButtonEl.setAttribute(AbstractStatefulView.DATA_SOURCE,this.uiConfig.dataSourceId);
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
        textEl.setAttribute(AbstractStatefulView.DATA_SOURCE,this.uiConfig.dataSourceId);
        const displayText = this.getDisplayValueForItemInNamedCollection(name, item);
        textEl.innerHTML = displayText;
        // add modifiers for patient state
        if (this.uiConfig.modifiers) {
            const modifier = this.getModifierForItemInNamedCollection(name, item);
            const secondModifier = this.getSecondaryModifierForItemInNamedCollection(name, item);
            switch (modifier) {
                case Modifier.normal: {
                    avLogger(`view ${this.getName()}: normal item`);
                    browserUtil.addRemoveClasses(childEl, this.uiConfig.modifiers.normal);
                    if (this.uiConfig.icons && this.uiConfig.icons.normal) {
                        let iconEl = document.createElement('i');
                        browserUtil.addRemoveClasses(iconEl, this.uiConfig.icons.normal);
                        iconEl.setAttribute(this.uiConfig.keyId, resultDataKeyId);
                        iconEl.setAttribute(AbstractStatefulView.DATA_SOURCE,this.uiConfig.dataSourceId);
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
                                iconEl.setAttribute(AbstractStatefulView.DATA_SOURCE,this.uiConfig.dataSourceId);
                                textEl.appendChild(iconEl);
                            }
                            break;
                        }
                        case Modifier.active: {
                            if (this.uiConfig.icons && this.uiConfig.icons.active) {
                                let iconEl = document.createElement('i');
                                browserUtil.addRemoveClasses(iconEl, this.uiConfig.icons.active);
                                iconEl.setAttribute(this.uiConfig.keyId, resultDataKeyId);
                                iconEl.setAttribute(AbstractStatefulView.DATA_SOURCE,this.uiConfig.dataSourceId);
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
                        iconEl.setAttribute(AbstractStatefulView.DATA_SOURCE,this.uiConfig.dataSourceId);
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
                                iconEl.setAttribute(AbstractStatefulView.DATA_SOURCE,this.uiConfig.dataSourceId);
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
                        iconEl.setAttribute(AbstractStatefulView.DATA_SOURCE,this.uiConfig.dataSourceId);
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
                                iconEl.setAttribute(AbstractStatefulView.DATA_SOURCE,this.uiConfig.dataSourceId);
                                textEl.appendChild(iconEl);
                            }
                            break;
                        }
                        case Modifier.active: {
                            if (this.uiConfig.icons && this.uiConfig.icons.active) {
                                let iconEl = document.createElement('i');
                                browserUtil.addRemoveClasses(iconEl, this.uiConfig.icons.active);
                                iconEl.setAttribute(this.uiConfig.keyId, resultDataKeyId);
                                iconEl.setAttribute(AbstractStatefulView.DATA_SOURCE,this.uiConfig.dataSourceId);
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
            avLogger(`view ${this.getName()}:  Adding child ${this.getIdForItemInNamedCollection(name,item)}`);
            if (viewEl) viewEl.appendChild(childEl);
        });
    }

}
