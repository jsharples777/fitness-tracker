import browserUtil from "../util/BrowserUtil";
import {EXTRA_ACTION_ATTRIBUTE_NAME, Modifier, ViewDOMConfig} from "./ConfigurationTypes";
import debug from 'debug';
import {View} from "./View";

const avLogger = debug('list-view-renderer');

export class ListViewRenderer {
    public static createListItemForItem(view:View,collectionName:string, item: any): HTMLElement {
        const canDeleteItem:boolean = view.hasPermissionToDeleteItemInNamedCollection(collectionName,item);
        const uiConfig:ViewDOMConfig = view.getUIConfig();
        const dataSourceKeyId = view.getDataSourceKeyId();

        avLogger(`view ${view.getName()}: creating List item`);
        avLogger(item);

        const resultDataKeyId = view.getIdForItemInNamedCollection(collectionName, item);

        let childEl: HTMLElement = document.createElement(uiConfig.resultsElementType);
        browserUtil.addRemoveClasses(childEl, uiConfig.resultsClasses);
        browserUtil.addAttributes(childEl, uiConfig.resultsElementAttributes);
        childEl.setAttribute(uiConfig.keyId, resultDataKeyId);
        childEl.setAttribute(dataSourceKeyId,uiConfig.dataSourceId);
        // the content may be structured
        let textEl = childEl;
        if (uiConfig.detail.containerClasses) {
            let contentEl: HTMLElement = document.createElement('div');
            browserUtil.addRemoveClasses(contentEl, uiConfig.detail.containerClasses);
            contentEl.setAttribute(uiConfig.keyId, resultDataKeyId);
            contentEl.setAttribute(dataSourceKeyId,uiConfig.dataSourceId);


            textEl = document.createElement(uiConfig.detail.textElementType);
            browserUtil.addRemoveClasses(textEl,uiConfig.detail.textElementClasses);
            textEl.setAttribute(uiConfig.keyId, resultDataKeyId);
            textEl.setAttribute(dataSourceKeyId,uiConfig.dataSourceId);

            contentEl.appendChild(textEl);

            if (uiConfig.detail.background) {
                let imgEl = document.createElement(uiConfig.detail.background.elementType);
                browserUtil.addRemoveClasses(imgEl, uiConfig.detail.background.elementClasses);
                imgEl.setAttribute('src', view.getBackgroundImageForItemInNamedCollection(collectionName, item));
                childEl.appendChild(imgEl);
            }

            let buttonsEl = document.createElement('div');
            contentEl.appendChild(buttonsEl);

            if (uiConfig.detail.badge) {
                const badgeValue = view.getBadgeValueForItemInNamedCollection(collectionName, item);
                if (badgeValue > 0) {
                    let badgeEl: HTMLElement = document.createElement(uiConfig.detail.badge.elementType);
                    browserUtil.addRemoveClasses(badgeEl, uiConfig.detail.badge.elementClasses);
                    browserUtil.addAttributes(badgeEl, uiConfig.detail.badge.elementAttributes);
                    badgeEl.setAttribute(uiConfig.keyId, resultDataKeyId);
                    badgeEl.setAttribute(dataSourceKeyId,uiConfig.dataSourceId);
                    buttonsEl.appendChild(badgeEl);
                    badgeEl.innerHTML = `&nbsp;&nbsp;&nbsp;${badgeValue}&nbsp;&nbsp;&nbsp;`;
                }
            }

            if (uiConfig.extraActions) {
                uiConfig.extraActions.forEach((extraAction) => {
                    let action: HTMLElement = document.createElement('button');
                    action.setAttribute('type', 'button');
                    browserUtil.addRemoveClasses(action, extraAction.buttonClasses);
                    if (extraAction.buttonText) {
                        action.innerHTML = extraAction.buttonText;
                    }
                    if (extraAction.iconClasses) {
                        let iconEl = document.createElement('i');
                        browserUtil.addRemoveClasses(iconEl, extraAction.iconClasses);
                        iconEl.setAttribute(uiConfig.keyId, resultDataKeyId);
                        iconEl.setAttribute(dataSourceKeyId,uiConfig.dataSourceId);
                        iconEl.setAttribute(EXTRA_ACTION_ATTRIBUTE_NAME,extraAction.name);
                        action.appendChild(iconEl);
                    }
                    action.setAttribute(uiConfig.keyId, resultDataKeyId);
                    action.setAttribute(dataSourceKeyId,uiConfig.dataSourceId);
                    action.setAttribute(EXTRA_ACTION_ATTRIBUTE_NAME,extraAction.name);

                    action.addEventListener('click', (event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        view.eventActionClicked(event);
                    });
                    buttonsEl.appendChild(action);
                });
            }
            if (uiConfig.detail.delete && canDeleteItem) {
                let deleteButtonEl: HTMLElement = document.createElement('button');
                deleteButtonEl.setAttribute('type', 'button');
                browserUtil.addRemoveClasses(deleteButtonEl, uiConfig.detail.delete.buttonClasses);
                if (uiConfig.detail.delete.buttonText) {
                    deleteButtonEl.innerHTML = uiConfig.detail.delete.buttonText;
                }
                if (uiConfig.detail.delete.iconClasses) {
                    let iconEl = document.createElement('i');
                    browserUtil.addRemoveClasses(iconEl, uiConfig.detail.delete.iconClasses);
                    iconEl.setAttribute(uiConfig.keyId, resultDataKeyId);
                    iconEl.setAttribute(dataSourceKeyId,uiConfig.dataSourceId);
                    deleteButtonEl.appendChild(iconEl);
                }
                deleteButtonEl.setAttribute(uiConfig.keyId, resultDataKeyId);
                deleteButtonEl.setAttribute(dataSourceKeyId,uiConfig.dataSourceId);
                deleteButtonEl.addEventListener('click', (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    view.eventDeleteClickItem(event);
                });
                buttonsEl.appendChild(deleteButtonEl);
            }
            childEl.appendChild(contentEl);

            if (uiConfig.detail.drag) {
                childEl.setAttribute('draggable', 'true');
                childEl.addEventListener('dragstart', view.eventStartDrag);
            }
            // add selection actions
            if (uiConfig.detail.select) {
                childEl.addEventListener('click', view.eventClickItem);
            }
        }


        // add the key ids for selection
        textEl.setAttribute(uiConfig.keyId, resultDataKeyId);
        textEl.setAttribute(dataSourceKeyId,uiConfig.dataSourceId);
        const displayText = view.getDisplayValueForItemInNamedCollection(collectionName, item);
        textEl.innerHTML = displayText;
        // add modifiers for patient state
        if (uiConfig.modifiers) {
            const modifier = view.getModifierForItemInNamedCollection(collectionName, item);
            const secondModifier = view.getSecondaryModifierForItemInNamedCollection(collectionName, item);
            switch (modifier) {
                case Modifier.normal: {
                    avLogger(`view ${view.getName()}: normal item`);
                    browserUtil.addRemoveClasses(childEl, uiConfig.modifiers.normal);
                    if (uiConfig.icons && uiConfig.icons.normal) {
                        let iconEl = document.createElement('i');
                        browserUtil.addRemoveClasses(iconEl, uiConfig.icons.normal);
                        iconEl.setAttribute(uiConfig.keyId, resultDataKeyId);
                        iconEl.setAttribute(dataSourceKeyId,uiConfig.dataSourceId);
                        textEl.appendChild(iconEl);
                    }

                    switch (secondModifier) {
                        case Modifier.warning: {
                            browserUtil.addRemoveClasses(childEl, uiConfig.modifiers.normal, false);
                            browserUtil.addRemoveClasses(childEl, uiConfig.modifiers.warning, true);
                            if (uiConfig.icons && uiConfig.icons.warning) {
                                let iconEl = document.createElement('i');
                                browserUtil.addRemoveClasses(iconEl, uiConfig.icons.warning);
                                iconEl.setAttribute(uiConfig.keyId, resultDataKeyId);
                                iconEl.setAttribute(dataSourceKeyId,uiConfig.dataSourceId);
                                textEl.appendChild(iconEl);
                            }
                            break;
                        }
                        case Modifier.active: {
                            if (uiConfig.icons && uiConfig.icons.active) {
                                let iconEl = document.createElement('i');
                                browserUtil.addRemoveClasses(iconEl, uiConfig.icons.active);
                                iconEl.setAttribute(uiConfig.keyId, resultDataKeyId);
                                iconEl.setAttribute(dataSourceKeyId,uiConfig.dataSourceId);
                                textEl.appendChild(iconEl);
                            }
                        }
                    }

                    break;
                }
                case Modifier.active: {
                    avLogger(`view ${view.getName()}: active item`);
                    browserUtil.addRemoveClasses(childEl, uiConfig.modifiers.active);
                    if (uiConfig.icons && uiConfig.icons.active) {
                        let iconEl = document.createElement('i');
                        browserUtil.addRemoveClasses(iconEl, uiConfig.icons.active);
                        iconEl.setAttribute(uiConfig.keyId, resultDataKeyId);
                        iconEl.setAttribute(dataSourceKeyId,uiConfig.dataSourceId);
                        textEl.appendChild(iconEl);
                    }

                    switch (secondModifier) {
                        case Modifier.warning: {
                            browserUtil.addRemoveClasses(childEl, uiConfig.modifiers.active, false);
                            browserUtil.addRemoveClasses(childEl, uiConfig.modifiers.warning, true);
                            if (uiConfig.icons && uiConfig.icons.warning) {
                                let iconEl = document.createElement('i');
                                browserUtil.addRemoveClasses(iconEl, uiConfig.icons.warning);
                                iconEl.setAttribute(uiConfig.keyId, resultDataKeyId);
                                iconEl.setAttribute(dataSourceKeyId,uiConfig.dataSourceId);
                                textEl.appendChild(iconEl);
                            }
                            break;
                        }
                    }
                    break;
                }
                case Modifier.inactive: {
                    avLogger(`view ${view.getName()}: inactive item`);
                    browserUtil.addRemoveClasses(childEl, uiConfig.modifiers.inactive);
                    if (uiConfig.icons && uiConfig.icons.inactive) {
                        let iconEl = document.createElement('i');
                        browserUtil.addRemoveClasses(iconEl, uiConfig.icons.inactive);
                        iconEl.setAttribute(uiConfig.keyId, resultDataKeyId);
                        iconEl.setAttribute(dataSourceKeyId,uiConfig.dataSourceId);
                        textEl.appendChild(iconEl);
                    }

                    switch (secondModifier) {
                        case Modifier.warning: {
                            if (uiConfig.icons && uiConfig.icons.warning) {
                                browserUtil.addRemoveClasses(childEl, uiConfig.modifiers.inactive, false);
                                browserUtil.addRemoveClasses(childEl, uiConfig.modifiers.warning, true);
                                let iconEl = document.createElement('i');
                                browserUtil.addRemoveClasses(iconEl, uiConfig.icons.warning);
                                iconEl.setAttribute(uiConfig.keyId, resultDataKeyId);
                                iconEl.setAttribute(dataSourceKeyId,uiConfig.dataSourceId);
                                textEl.appendChild(iconEl);
                            }
                            break;
                        }
                        case Modifier.active: {
                            if (uiConfig.icons && uiConfig.icons.active) {
                                let iconEl = document.createElement('i');
                                browserUtil.addRemoveClasses(iconEl, uiConfig.icons.active);
                                iconEl.setAttribute(uiConfig.keyId, resultDataKeyId);
                                iconEl.setAttribute(dataSourceKeyId,uiConfig.dataSourceId);
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
        const viewEl = document.getElementById(uiConfig.resultsContainerId);
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