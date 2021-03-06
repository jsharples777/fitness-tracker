import debug from 'debug';
import {CollectionViewRenderer} from "../interface/CollectionViewRenderer";
import {CollectionViewEventHandler} from "../interface/CollectionViewEventHandler";
import {CollectionView} from "../interface/CollectionView";
import {CollectionViewDOMConfig, EXTRA_ACTION_ATTRIBUTE_NAME, Modifier} from "../../ConfigurationTypes";
import browserUtil from "../../../util/BrowserUtil";
import {ContextualInformationHelper} from "../../context/ContextualInformationHelper";

const avLogger = debug('list-view-renderer-with-context');

export class ListViewRendererUsingContext implements CollectionViewRenderer {
    protected view: CollectionView;
    protected eventHandler: CollectionViewEventHandler;

    constructor(view: CollectionView, eventHandler: CollectionViewEventHandler) {
        this.view = view;
        this.eventHandler = eventHandler;
    }

    public createDisplayElementForCollectionItem(collectionName: string, item: any): HTMLElement {
        const canDeleteItem: boolean = this.view.hasPermissionToDeleteItemInNamedCollection(collectionName, item);
        const uiConfig: CollectionViewDOMConfig = this.view.getCollectionUIConfig();

        avLogger(`view ${this.view.getName()}: creating List item`);
        avLogger(item);

        const resultDataKeyId = this.view.getIdForItemInNamedCollection(collectionName, item);

        let childEl: HTMLElement = document.createElement(uiConfig.resultsElement.type);
        browserUtil.addRemoveClasses(childEl, uiConfig.resultsElement.classes);
        browserUtil.addAttributes(childEl, uiConfig.resultsElement.attributes);
        // the content may be structured
        let textEl = childEl;
        if (uiConfig.detail.containerClasses) {
            let contentEl: HTMLElement = document.createElement('div');
            browserUtil.addRemoveClasses(contentEl, uiConfig.detail.containerClasses);


            textEl = document.createElement(uiConfig.detail.textElement.type);
            browserUtil.addRemoveClasses(textEl, uiConfig.detail.textElement.classes);
            browserUtil.addAttributes(textEl, uiConfig.detail.textElement.attributes);

            contentEl.appendChild(textEl);

            if (uiConfig.detail.background) {
                let imgEl = document.createElement(uiConfig.detail.background.type);
                browserUtil.addRemoveClasses(imgEl, uiConfig.detail.background.classes);
                imgEl.setAttribute('src', this.view.getBackgroundImageForItemInNamedCollection(collectionName, item));
                childEl.appendChild(imgEl);
            }

            let buttonsEl = document.createElement('div');
            contentEl.appendChild(buttonsEl);

            if (uiConfig.detail.badge) {
                const badgeValue = this.view.getBadgeValueForItemInNamedCollection(collectionName, item);
                if (badgeValue > 0) {
                    let badgeEl: HTMLElement = document.createElement(uiConfig.detail.badge.type);
                    browserUtil.addRemoveClasses(badgeEl, uiConfig.detail.badge.classes);
                    browserUtil.addAttributes(badgeEl, uiConfig.detail.badge.attributes);
                    buttonsEl.appendChild(badgeEl);
                    badgeEl.innerHTML = `&nbsp;&nbsp;&nbsp;${badgeValue}&nbsp;&nbsp;&nbsp;`;
                }
            }
            if (uiConfig.detail.secondBadge) {
                const badgeValue = this.view.getSecondaryBadgeValueForItemInNamedCollection(collectionName, item);
                if (badgeValue > 0) {
                    let badgeEl: HTMLElement = document.createElement(uiConfig.detail.secondBadge.type);
                    browserUtil.addRemoveClasses(badgeEl, uiConfig.detail.secondBadge.classes);
                    browserUtil.addAttributes(badgeEl, uiConfig.detail.secondBadge.attributes);
                    buttonsEl.appendChild(badgeEl);
                    badgeEl.innerHTML = `&nbsp;&nbsp;&nbsp;${badgeValue}&nbsp;&nbsp;&nbsp;`;
                }
            }
            if (uiConfig.detail.thirdBadge) {
                const badgeValue = this.view.getTertiaryBadgeValueForItemInNamedCollection(collectionName, item);
                if (badgeValue > 0) {
                    let badgeEl: HTMLElement = document.createElement(uiConfig.detail.thirdBadge.type);
                    browserUtil.addRemoveClasses(badgeEl, uiConfig.detail.thirdBadge.classes);
                    browserUtil.addAttributes(badgeEl, uiConfig.detail.thirdBadge.attributes);
                    buttonsEl.appendChild(badgeEl);
                    badgeEl.innerHTML = `&nbsp;&nbsp;&nbsp;${badgeValue}&nbsp;&nbsp;&nbsp;`;
                }
            }

            if (uiConfig.extraActions) {
                uiConfig.extraActions.forEach((extraAction) => {
                    const hasPermissionForAction = this.view.hasPermissionToActionItemInNamedCollection(extraAction.name, collectionName, item);
                    if (hasPermissionForAction) {
                        let action: HTMLElement = document.createElement('button');
                        action.setAttribute('type', 'button');
                        browserUtil.addRemoveClasses(action, extraAction.button.classes);
                        browserUtil.addAttributes(action, extraAction.button.attributes);
                        if (extraAction.button.text) {
                            action.innerHTML = extraAction.button.text;
                        }
                        if (extraAction.button.iconClasses) {
                            let iconEl = document.createElement('i');
                            browserUtil.addRemoveClasses(iconEl, extraAction.button.iconClasses);
                            iconEl.setAttribute(EXTRA_ACTION_ATTRIBUTE_NAME, extraAction.name);
                            action.appendChild(iconEl);
                        }
                        action.setAttribute(EXTRA_ACTION_ATTRIBUTE_NAME, extraAction.name);

                        action.addEventListener('click', (event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            this.eventHandler.eventActionClicked(event);
                        });
                        buttonsEl.appendChild(action);
                    }
                });

            }
            if (uiConfig.detail.delete && canDeleteItem) {
                let deleteButtonEl: HTMLElement = document.createElement('button');
                deleteButtonEl.setAttribute('type', 'button');
                browserUtil.addRemoveClasses(deleteButtonEl, uiConfig.detail.delete.classes);
                browserUtil.addAttributes(deleteButtonEl, uiConfig.detail.delete.attributes);
                if (uiConfig.detail.delete.text) {
                    deleteButtonEl.innerHTML = uiConfig.detail.delete.text;
                }
                if (uiConfig.detail.delete.iconClasses) {
                    let iconEl = document.createElement('i');
                    browserUtil.addRemoveClasses(iconEl, uiConfig.detail.delete.iconClasses);
                    deleteButtonEl.appendChild(iconEl);
                }
                deleteButtonEl.addEventListener('click', (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    this.eventHandler.eventDeleteClickItem(event);
                });
                buttonsEl.appendChild(deleteButtonEl);
            }
            childEl.appendChild(contentEl);

            if (uiConfig.detail.drag) {
                childEl.setAttribute('draggable', 'true');
                childEl.addEventListener('dragstart', this.eventHandler.eventStartDrag);
            }
            // add selection actions
            if (uiConfig.detail.select) {
                childEl.addEventListener('click', this.eventHandler.eventClickItem);

            }
        }


        // add the key ids for selection
        this.view.renderDisplayForItemInNamedCollection(textEl, collectionName, item);

        // add icons
        if (uiConfig.detail.icons) {
            const icons: string[] = uiConfig.detail.icons(collectionName, item);
            icons.forEach((icon) => {
                let iconEl = document.createElement('i');
                browserUtil.addRemoveClasses(iconEl, icon);
                textEl.appendChild(iconEl);
            });
        }

        // add modifiers for patient state
        if (uiConfig.modifiers) {
            const modifier = this.view.getModifierForItemInNamedCollection(collectionName, item);
            const secondModifier = this.view.getSecondaryModifierForItemInNamedCollection(collectionName, item);
            switch (modifier) {
                case Modifier.normal: {
                    avLogger(`view ${this.view.getName()}: normal item`);
                    browserUtil.addRemoveClasses(childEl, uiConfig.modifiers.normal);
                    if (uiConfig.icons && uiConfig.icons.normal) {
                        let iconEl = document.createElement('i');
                        browserUtil.addRemoveClasses(iconEl, uiConfig.icons.normal);
                        textEl.appendChild(iconEl);
                    }

                    switch (secondModifier) {
                        case Modifier.warning: {
                            browserUtil.addRemoveClasses(childEl, uiConfig.modifiers.normal, false);
                            browserUtil.addRemoveClasses(childEl, uiConfig.modifiers.warning, true);
                            if (uiConfig.icons && uiConfig.icons.warning) {
                                let iconEl = document.createElement('i');
                                browserUtil.addRemoveClasses(iconEl, uiConfig.icons.warning);
                                textEl.appendChild(iconEl);
                            }
                            break;
                        }
                        case Modifier.active: {
                            if (uiConfig.icons && uiConfig.icons.active) {
                                let iconEl = document.createElement('i');
                                browserUtil.addRemoveClasses(iconEl, uiConfig.icons.active);
                                textEl.appendChild(iconEl);
                            }
                        }
                    }

                    break;
                }
                case Modifier.active: {
                    avLogger(`view ${this.view.getName()}: active item`);
                    browserUtil.addRemoveClasses(childEl, uiConfig.modifiers.active);
                    if (uiConfig.icons && uiConfig.icons.active) {
                        let iconEl = document.createElement('i');
                        browserUtil.addRemoveClasses(iconEl, uiConfig.icons.active);
                        textEl.appendChild(iconEl);
                    }

                    switch (secondModifier) {
                        case Modifier.warning: {
                            browserUtil.addRemoveClasses(childEl, uiConfig.modifiers.active, false);
                            browserUtil.addRemoveClasses(childEl, uiConfig.modifiers.warning, true);
                            if (uiConfig.icons && uiConfig.icons.warning) {
                                let iconEl = document.createElement('i');
                                browserUtil.addRemoveClasses(iconEl, uiConfig.icons.warning);
                                textEl.appendChild(iconEl);
                            }
                            break;
                        }
                    }
                    break;
                }
                case Modifier.inactive: {
                    avLogger(`view ${this.view.getName()}: inactive item`);
                    browserUtil.addRemoveClasses(childEl, uiConfig.modifiers.inactive);
                    if (uiConfig.icons && uiConfig.icons.inactive) {
                        let iconEl = document.createElement('i');
                        browserUtil.addRemoveClasses(iconEl, uiConfig.icons.inactive);
                        textEl.appendChild(iconEl);
                    }

                    switch (secondModifier) {
                        case Modifier.warning: {
                            if (uiConfig.icons && uiConfig.icons.warning) {
                                browserUtil.addRemoveClasses(childEl, uiConfig.modifiers.inactive, false);
                                browserUtil.addRemoveClasses(childEl, uiConfig.modifiers.warning, true);
                                let iconEl = document.createElement('i');
                                browserUtil.addRemoveClasses(iconEl, uiConfig.icons.warning);
                                textEl.appendChild(iconEl);
                            }
                            break;
                        }
                        case Modifier.active: {
                            if (uiConfig.icons && uiConfig.icons.active) {
                                let iconEl = document.createElement('i');
                                browserUtil.addRemoveClasses(iconEl, uiConfig.icons.active);
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

    public setDisplayElementsForCollectionInContainer(containerEl: HTMLElement, collectionName: string, newState: any): void {
        avLogger(`view ${this.view.getName()}: creating Results`);
        avLogger(newState);
        // remove the previous items from list
        browserUtil.removeAllChildren(containerEl);

        // add the new children
        newState.map((item: any, index: number) => {
            const childEl = this.createDisplayElementForCollectionItem(collectionName, item);
            // add draggable actions
            avLogger(`view ${this.view.getName()}:  Adding child ${this.view.getIdForItemInNamedCollection(collectionName, item)}`);
            containerEl.appendChild(childEl);

            ContextualInformationHelper.getInstance().addContextToElement(this.view.getName(), collectionName, item, childEl, true);
            childEl.addEventListener('contextmenu', ContextualInformationHelper.getInstance().handleContextMenu);
        });
        $('[data-toggle="tooltip"]').tooltip();
    }

    onDocumentLoaded(): void {
    }

}
