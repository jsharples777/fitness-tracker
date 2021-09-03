import debug from 'debug';
import browserUtil from '../util/BrowserUtil';
import StateChangeListener from "../state/StateChangeListener";
import {StateManager} from "../state/StateManager";

const avLogger = debug('view-ts')

export default abstract class AbstractView implements StateChangeListener {
    protected applicationView: any;
    protected document: HTMLDocument;
    protected uiConfig: any;
    protected uiPrefs: any;

    protected config: any;

    protected stateManager: StateManager;

    protected constructor(applicationView: any, htmlDocument: HTMLDocument, uiConfig: any, uiPrefs: any, stateManager: StateManager) {
        this.applicationView = applicationView;
        this.document = document;
        this.uiConfig = uiConfig;
        this.uiPrefs = uiPrefs;
        this.config = applicationView.state;
        this.stateManager = stateManager;

        // state change listening
        this.stateChanged = this.stateChanged.bind(this);

        // event handlers
        this.eventStartDrag = this.eventStartDrag.bind(this);
        this.eventClickItem = this.eventClickItem.bind(this);
        this.eventDeleteClickItem = this.eventDeleteClickItem.bind(this);
        this.eventAction2Clicked = this.eventAction2Clicked.bind(this);
        this.eventAction1Clicked = this.eventAction1Clicked.bind(this);
    }

    public abstract onDocumentLoaded(): void;

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

    /* abstract */
    protected abstract eventClickItem(event: MouseEvent): void;

    protected abstract eventDeleteClickItem(event: MouseEvent): void;

    protected eventAction1Clicked(event: MouseEvent): void {
        event.preventDefault();
        event.stopPropagation();
    }

    protected eventAction2Clicked(event: MouseEvent): void {
        event.preventDefault();
        event.stopPropagation();
    }

    protected abstract getDragData(event: DragEvent): any;

    protected abstract getIdForStateItem(name: string, item: any): string;

    protected abstract getLegacyIdForStateItem(name: string, item: any): string;

    protected abstract getDisplayValueForStateItem(name: string, item: any): string;

    protected abstract getModifierForStateItem(name: string, item: any): string;

    protected abstract getSecondaryModifierForStateItem(name: string, item: any): string;

    protected abstract getBadgeValue(name: string, item: any): number;

    protected abstract getBackgroundImage(name: string, item: any): string;

    protected abstract updateView(name: string, newState: any): void;

    protected eventStartDrag(event: DragEvent) {
        avLogger('Abstract View : drag start', 10);
        const data = JSON.stringify(this.getDragData(event));
        avLogger(data, 10);
        // @ts-ignore
        event.dataTransfer.setData(this.applicationView.state.ui.draggable.draggableDataKeyId, data);
    }

    protected createResultForItem(name: string, item: any, dataSource: any = null): HTMLElement {
        avLogger('Abstract View : creating Result');
        avLogger(item);
        const domConfig = this.uiConfig.dom;

        const resultDataKeyId = this.getIdForStateItem(name, item);
        const legacyDataKeyId = this.getLegacyIdForStateItem(name, item);
        if (!dataSource) {
            dataSource = domConfig.resultDataSourceValue;
        }


        let childEl: HTMLElement = this.document.createElement(domConfig.resultsElementType);
        browserUtil.addRemoveClasses(childEl, domConfig.resultsClasses);
        browserUtil.addAttributes(childEl, domConfig.resultsElementAttributes);
        // the content may be structured
        let textEl = childEl;
        if (domConfig.resultContentDivClasses) {
            let contentEl: HTMLElement = this.document.createElement('div');
            browserUtil.addRemoveClasses(contentEl, domConfig.resultContentDivClasses);
            contentEl.setAttribute(domConfig.resultDataKeyId, resultDataKeyId);
            contentEl.setAttribute(domConfig.resultLegacyDataKeyId, legacyDataKeyId);
            contentEl.setAttribute(domConfig.resultDataSourceId, dataSource);


            textEl = this.document.createElement(domConfig.resultContentTextElementType);
            browserUtil.addRemoveClasses(textEl, domConfig.resultContentTextClasses);
            textEl.setAttribute(domConfig.resultDataKeyId, resultDataKeyId);
            textEl.setAttribute(domConfig.resultLegacyDataKeyId, legacyDataKeyId);
            textEl.setAttribute(domConfig.resultDataSourceId, dataSource);

            contentEl.appendChild(textEl);

            if (domConfig.hasBackgroundImage) {
                let imgEl = this.document.createElement(domConfig.imgElementType);
                browserUtil.addRemoveClasses(imgEl, domConfig.imgClasses);
                imgEl.setAttribute('src', this.getBackgroundImage(name, item));
                childEl.appendChild(imgEl);
            }

            let buttonBadgeEl = this.document.createElement('div');
            contentEl.appendChild(buttonBadgeEl);

            if (domConfig.hasBadge) {
                const badgeValue = this.getBadgeValue(name, item);
                if (badgeValue > 0) {
                    let badgeEl: HTMLElement = this.document.createElement(domConfig.badgeElementType);
                    browserUtil.addRemoveClasses(badgeEl, domConfig.badgeClasses);
                    badgeEl.setAttribute(domConfig.resultDataKeyId, resultDataKeyId);
                    badgeEl.setAttribute(domConfig.resultLegacyDataKeyId, legacyDataKeyId);
                    badgeEl.setAttribute(domConfig.resultDataSourceId, dataSource);
                    buttonBadgeEl.appendChild(badgeEl);
                    badgeEl.innerHTML = `&nbsp;&nbsp;&nbsp;${badgeValue}&nbsp;&nbsp;&nbsp;`;
                    browserUtil.addAttributes(badgeEl, domConfig.badgeElementAttributes);
                }
            }

            if (domConfig.extraAction1Classes) {
                let action: HTMLElement = this.document.createElement('button');
                action.setAttribute('type', 'button');
                browserUtil.addRemoveClasses(action, domConfig.extraAction1Classes);
                if (domConfig.extraAction1Text) {
                    if (domConfig.extraAction1Text.trim().length > 0) {
                        action.innerHTML = domConfig.extraAction1Text;
                    }
                }
                if (domConfig.extraAction1IconClasses) {
                    let iconEl = document.createElement('i');
                    browserUtil.addRemoveClasses(iconEl, domConfig.extraAction1IconClasses);
                    iconEl.setAttribute(domConfig.resultDataKeyId, resultDataKeyId);
                    iconEl.setAttribute(domConfig.resultLegacyDataKeyId, legacyDataKeyId);
                    iconEl.setAttribute(domConfig.resultDataSourceId, dataSource);
                    action.appendChild(iconEl);
                }
                action.setAttribute(domConfig.resultDataKeyId, resultDataKeyId);
                action.setAttribute(domConfig.resultLegacyDataKeyId, legacyDataKeyId);
                action.setAttribute(domConfig.resultDataSourceId, dataSource);
                action.addEventListener('click', (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    this.eventAction1Clicked(event);
                });
                buttonBadgeEl.appendChild(action);
            }
            if (domConfig.extraAction2Classes) {
                let action: HTMLElement = this.document.createElement('button');
                action.setAttribute('type', 'button');
                browserUtil.addRemoveClasses(action, domConfig.extraAction2Classes);
                if (domConfig.extraAction2Text) {
                    if (domConfig.extraAction2Text.trim().length > 0) {
                        action.innerHTML = domConfig.extraAction1Text;
                    }
                }
                if (domConfig.extraAction2IconClasses) {
                    let iconEl = document.createElement('i');
                    browserUtil.addRemoveClasses(iconEl, domConfig.extraAction2IconClasses);
                    iconEl.setAttribute(domConfig.resultDataKeyId, resultDataKeyId);
                    iconEl.setAttribute(domConfig.resultLegacyDataKeyId, legacyDataKeyId);
                    iconEl.setAttribute(domConfig.resultDataSourceId, dataSource);
                    action.appendChild(iconEl);
                }
                action.setAttribute(domConfig.resultDataKeyId, resultDataKeyId);
                action.setAttribute(domConfig.resultLegacyDataKeyId, legacyDataKeyId);
                action.setAttribute(domConfig.resultDataSourceId, dataSource);
                action.addEventListener('click', (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    this.eventAction2Clicked(event);
                });
                buttonBadgeEl.appendChild(action);
            }
            if (domConfig.isDeleteable) {
                let deleteButtonEl: HTMLElement = this.document.createElement('button');
                deleteButtonEl.setAttribute('type', 'button');
                browserUtil.addRemoveClasses(deleteButtonEl, domConfig.deleteButtonClasses);
                if (domConfig.deleteButtonText) {
                    if (domConfig.deleteButtonText.trim().length > 0) {
                        deleteButtonEl.innerHTML = domConfig.deleteButtonText;
                    }
                }
                if (domConfig.deleteButtonIconClasses) {
                    let iconEl = document.createElement('i');
                    browserUtil.addRemoveClasses(iconEl, domConfig.deleteButtonIconClasses);
                    iconEl.setAttribute(domConfig.resultDataKeyId, resultDataKeyId);
                    iconEl.setAttribute(domConfig.resultLegacyDataKeyId, legacyDataKeyId);
                    iconEl.setAttribute(domConfig.resultDataSourceId, dataSource);
                    deleteButtonEl.appendChild(iconEl);
                }
                deleteButtonEl.setAttribute(domConfig.resultDataKeyId, resultDataKeyId);
                deleteButtonEl.setAttribute(domConfig.resultLegacyDataKeyId, legacyDataKeyId);
                deleteButtonEl.setAttribute(domConfig.resultDataSourceId, dataSource);
                deleteButtonEl.addEventListener('click', (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    this.eventDeleteClickItem(event);
                });
                buttonBadgeEl.appendChild(deleteButtonEl);
            }
            childEl.appendChild(contentEl);
        }


        // add the key ids for selection
        childEl.setAttribute(domConfig.resultDataKeyId, resultDataKeyId);
        childEl.setAttribute(domConfig.resultLegacyDataKeyId, legacyDataKeyId);
        childEl.setAttribute(domConfig.resultDataSourceId, dataSource);
        const displayText = this.getDisplayValueForStateItem(name, item);
        // add modifiers for patient state
        const modifier = this.getModifierForStateItem(name, item);
        const secondModifier = this.getSecondaryModifierForStateItem(name, item);
        switch (modifier) {
            case 'normal': {
                avLogger('Abstract View: normal item');
                browserUtil.addRemoveClasses(childEl, domConfig.modifierClassNormal);
                if (domConfig.iconNormal !== '') {
                    textEl.innerHTML = displayText + '  ' + domConfig.iconNormal;
                } else {
                    textEl.innerText = displayText;
                }

                switch (secondModifier) {
                    case 'warning': {
                        browserUtil.addRemoveClasses(childEl, domConfig.modifierClassNormal, false);
                        browserUtil.addRemoveClasses(childEl, domConfig.modifierClassWarning, true);
                        if (domConfig.iconWarning !== '') {
                            textEl.innerHTML += '  ' + domConfig.iconWarning;
                        }
                        break;
                    }
                    case 'normal': {
                        break;
                    }
                    case 'active': {
                        if (domConfig.iconActive !== '') {
                            textEl.innerHTML += '  ' + domConfig.iconActive;
                        }

                    }
                }

                break;
            }
            case 'active': {
                avLogger('Abstract View: active item', 10);
                browserUtil.addRemoveClasses(childEl, domConfig.modifierClassActive);
                if (domConfig.iconActive !== '') {
                    textEl.innerHTML = displayText + '  ' + domConfig.iconActive;
                } else {
                    textEl.innerText = displayText;
                }
                switch (secondModifier) {
                    case 'warning': {
                        browserUtil.addRemoveClasses(childEl, domConfig.modifierClassActive, false);
                        browserUtil.addRemoveClasses(childEl, domConfig.modifierClassWarning, true);
                        if (domConfig.iconWarning !== '') {
                            textEl.innerHTML += '  ' + domConfig.iconWarning;
                        }
                        break;
                    }
                    case 'normal': {
                        break;
                    }
                }
                break;
            }
            case 'inactive': {
                avLogger('Abstract View: inactive item', 10);
                browserUtil.addRemoveClasses(childEl, domConfig.modifierClassInactive);
                if (domConfig.iconInactive !== '') {
                    textEl.innerHTML = displayText + '  ' + domConfig.iconInactive;
                } else {
                    textEl.innerText = displayText;
                }
                switch (secondModifier) {
                    case 'warning': {
                        if (domConfig.iconWarning !== '') {
                            browserUtil.addRemoveClasses(childEl, domConfig.modifierClassInactive, false);
                            browserUtil.addRemoveClasses(childEl, domConfig.modifierClassWarning, true);
                            textEl.innerHTML += '  ' + domConfig.iconWarning;
                        }
                        break;
                    }
                    case 'normal': {
                        break;
                    }
                    case 'active': {
                        if (domConfig.iconActive !== '') {
                            textEl.innerHTML += '  ' + domConfig.iconActive;
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
        const domConfig = this.uiConfig.dom;
        // remove the previous items from list
        const viewEl = document.getElementById(domConfig.resultsId);
        if (viewEl) browserUtil.removeAllChildren(viewEl);

        // add the new children
        newState.map((item: any, index: number) => {
            const childEl = this.createResultForItem(name, item);
            // add draggable actions
            if (domConfig.isDraggable) {
                childEl.setAttribute('draggable', 'true');
                childEl.addEventListener('dragstart', this.eventStartDrag);
            }
            // add selection actions
            if (domConfig.isClickable) {
                childEl.addEventListener('click', this.eventClickItem);
            }
            avLogger(`Abstract View: Adding child ${item.id}`);
            if (viewEl) viewEl.appendChild(childEl);
        });
    }

}
