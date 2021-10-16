import {CollectionViewRenderer} from "../interface/CollectionViewRenderer";
import {CollectionViewDOMConfig, EXTRA_ACTION_ATTRIBUTE_NAME, Modifier} from "../../ConfigurationTypes";
import browserUtil from "../../../util/BrowserUtil";
import debug from "debug";
import {CollectionView} from "../interface/CollectionView";
import {CollectionViewEventHandler} from "../interface/CollectionViewEventHandler";
import {TableUIConfig} from "./TableUITypeDefs";
import {ContextualInformationHelper} from "../../context/ContextualInformationHelper";
import {FieldType} from "../../../model/DataObjectTypeDefs";

const logger = debug('tabular-view-renderer-with-context');

export class TabularViewRendererUsingContext implements CollectionViewRenderer {
    protected view: CollectionView;
    protected eventHandler: CollectionViewEventHandler;
    protected tableConfig: TableUIConfig;

    constructor(view: CollectionView, eventHandler: CollectionViewEventHandler, tableConfig: TableUIConfig) {
        this.view = view;
        this.eventHandler = eventHandler;
        this.tableConfig = tableConfig;
    }


    public createDisplayElementForCollectionItem(collectionName: string, item: any): HTMLElement {
        const canDeleteItem: boolean = this.view.hasPermissionToDeleteItemInNamedCollection(collectionName, item);
        const uiConfig: CollectionViewDOMConfig = this.view.getCollectionUIConfig();

        logger(`view ${this.view.getName()}: creating table row item`);
        logger(item);

        const resultDataKeyId = this.view.getIdForItemInNamedCollection(collectionName, item);

        let tableRowEl: HTMLElement = document.createElement(uiConfig.resultsElement.type);
        browserUtil.addRemoveClasses(tableRowEl, uiConfig.resultsElement.classes);
        browserUtil.addAttributes(tableRowEl, uiConfig.resultsElement.attributes);


        // we need to build the row from the displayed item values using the renderer if present
        this.tableConfig.columns.forEach((column, index) => {

            const fieldValue = column.getValue(column, item[column.field.id]);
            const fieldDataType = column.field.type;


            let tdEl = document.createElement('td');
            browserUtil.addRemoveClasses(tdEl, column.elementClasses);
            browserUtil.addAttributes(tdEl, column.elementAttributes);


            if ((index + 1) === this.tableConfig.itemDetailColumn) {
                // this column is different and can have many components
                // the content may be structured
                if (uiConfig.detail.containerClasses) {
                    let contentEl: HTMLElement = document.createElement('div');
                    browserUtil.addRemoveClasses(contentEl, uiConfig.detail.containerClasses);


                    let textEl = document.createElement(uiConfig.detail.textElement.type);
                    browserUtil.addRemoveClasses(textEl, uiConfig.detail.textElement.classes);
                    browserUtil.addAttributes(textEl, uiConfig.detail.textElement.attributes);

                    // add the key ids for selection
                    this.view.renderDisplayForItemInNamedCollection(textEl, collectionName, item);

                    contentEl.appendChild(textEl);

                    if (uiConfig.detail.background) {
                        let imgEl = document.createElement(uiConfig.detail.background.type);
                        browserUtil.addRemoveClasses(imgEl, uiConfig.detail.background.classes);
                        imgEl.setAttribute('src', this.view.getBackgroundImageForItemInNamedCollection(collectionName, item));
                        contentEl.appendChild(imgEl);
                    }


                    if (uiConfig.detail.badge) {
                        const badgeValue = this.view.getBadgeValueForItemInNamedCollection(collectionName, item);
                        if (badgeValue > 0) {
                            let badgeEl: HTMLElement = document.createElement(uiConfig.detail.badge.type);
                            browserUtil.addRemoveClasses(badgeEl, uiConfig.detail.badge.classes);
                            browserUtil.addAttributes(badgeEl, uiConfig.detail.badge.attributes);
                            contentEl.appendChild(badgeEl);
                            badgeEl.innerHTML = `&nbsp;&nbsp;&nbsp;${badgeValue}&nbsp;&nbsp;&nbsp;`;
                        }
                    }

                    // add icons
                    if (uiConfig.detail.icons) {
                        const icons: string[] = uiConfig.detail.icons(collectionName, item);
                        icons.forEach((icon) => {
                            let iconEl = document.createElement('i');
                            browserUtil.addRemoveClasses(iconEl, icon);
                            contentEl.appendChild(iconEl);
                        });
                    }


                    tdEl.appendChild(contentEl);

                }
            } else {
                switch (fieldDataType) {
                    case FieldType.colour: {
                        browserUtil.addAttributes(tdEl,[{name:"style",value:`background-color:${fieldValue}`}]);
                        tdEl.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;';
                        break;
                    }
                    case FieldType.boolean: {
                        let checkboxEl = <HTMLInputElement>document.createElement('input');
                        browserUtil.addAttributes(checkboxEl,[{name:'type',value:'checkbox'}]);
                        logger(`Field type is boolean, with value ${fieldValue}`);
                        if (fieldValue) {
                            checkboxEl.checked = true;
                        }
                        tdEl.appendChild(checkboxEl);
                        break;
                    }
                    default: {
                        tdEl.innerText = fieldValue;
                    }
                }

            }

            tableRowEl.appendChild(tdEl);
        });

        // we add an extra column for any actions or the delete function
        if (this.tableConfig.actionColumn) {
            // create the extra table column
            let tdEl = document.createElement('td');
            browserUtil.addRemoveClasses(tdEl, this.tableConfig.actionColumn.element.classes);
            browserUtil.addAttributes(tdEl, this.tableConfig.actionColumn.element.attributes);

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
                        tdEl.appendChild(action);
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
                tdEl.appendChild(deleteButtonEl);
            }

            tableRowEl.appendChild(tdEl);
        }
        if (uiConfig.detail.drag) {
            tableRowEl.setAttribute('draggable', 'true');
            tableRowEl.addEventListener('dragstart', this.eventHandler.eventStartDrag);
        }
        // add selection actions
        if (uiConfig.detail.select) {
            tableRowEl.addEventListener('click', this.eventHandler.eventClickItem);

        }

        // add modifiers for patient state
        if (uiConfig.modifiers) {
            const modifier = this.view.getModifierForItemInNamedCollection(collectionName, item);
            const secondModifier = this.view.getSecondaryModifierForItemInNamedCollection(collectionName, item);
            switch (modifier) {
                case Modifier.normal: {
                    logger(`view ${this.view.getName()}: normal item`);
                    browserUtil.addRemoveClasses(tableRowEl, uiConfig.modifiers.normal);
                    if (uiConfig.icons && uiConfig.icons.normal) {
                        let iconEl = document.createElement('i');
                        browserUtil.addRemoveClasses(iconEl, uiConfig.icons.normal);
                        //textEl.appendChild(iconEl);
                    }

                    switch (secondModifier) {
                        case Modifier.warning: {
                            browserUtil.addRemoveClasses(tableRowEl, uiConfig.modifiers.normal, false);
                            browserUtil.addRemoveClasses(tableRowEl, uiConfig.modifiers.warning, true);
                            if (uiConfig.icons && uiConfig.icons.warning) {
                                let iconEl = document.createElement('i');
                                browserUtil.addRemoveClasses(iconEl, uiConfig.icons.warning);
                                //textEl.appendChild(iconEl);
                            }
                            break;
                        }
                        case Modifier.active: {
                            if (uiConfig.icons && uiConfig.icons.active) {
                                let iconEl = document.createElement('i');
                                browserUtil.addRemoveClasses(iconEl, uiConfig.icons.active);
                                //textEl.appendChild(iconEl);
                            }
                        }
                    }

                    break;
                }
                case Modifier.active: {
                    logger(`view ${this.view.getName()}: active item`);
                    browserUtil.addRemoveClasses(tableRowEl, uiConfig.modifiers.active);
                    if (uiConfig.icons && uiConfig.icons.active) {
                        let iconEl = document.createElement('i');
                        browserUtil.addRemoveClasses(iconEl, uiConfig.icons.active);
                        //textEl.appendChild(iconEl);
                    }

                    switch (secondModifier) {
                        case Modifier.warning: {
                            browserUtil.addRemoveClasses(tableRowEl, uiConfig.modifiers.active, false);
                            browserUtil.addRemoveClasses(tableRowEl, uiConfig.modifiers.warning, true);
                            if (uiConfig.icons && uiConfig.icons.warning) {
                                let iconEl = document.createElement('i');
                                browserUtil.addRemoveClasses(iconEl, uiConfig.icons.warning);
                                //textEl.appendChild(iconEl);
                            }
                            break;
                        }
                    }
                    break;
                }
                case Modifier.inactive: {
                    logger(`view ${this.view.getName()}: inactive item`);
                    browserUtil.addRemoveClasses(tableRowEl, uiConfig.modifiers.inactive);
                    if (uiConfig.icons && uiConfig.icons.inactive) {
                        let iconEl = document.createElement('i');
                        browserUtil.addRemoveClasses(iconEl, uiConfig.icons.inactive);
                        //textEl.appendChild(iconEl);
                    }

                    switch (secondModifier) {
                        case Modifier.warning: {
                            if (uiConfig.icons && uiConfig.icons.warning) {
                                browserUtil.addRemoveClasses(tableRowEl, uiConfig.modifiers.inactive, false);
                                browserUtil.addRemoveClasses(tableRowEl, uiConfig.modifiers.warning, true);
                                let iconEl = document.createElement('i');
                                browserUtil.addRemoveClasses(iconEl, uiConfig.icons.warning);
                                //textEl.appendChild(iconEl);
                            }
                            break;
                        }
                        case Modifier.active: {
                            if (uiConfig.icons && uiConfig.icons.active) {
                                let iconEl = document.createElement('i');
                                browserUtil.addRemoveClasses(iconEl, uiConfig.icons.active);
                                //textEl.appendChild(iconEl);
                            }
                            break;
                        }
                    }
                    break;
                }
            }
        }
        return tableRowEl;
    }

    onDocumentLoaded(): void {
    }

    public setDisplayElementsForCollectionInContainer(containerEl: HTMLElement, collectionName: string, newState: any): void {
        logger(`view ${this.view.getName()}: creating Results`);
        logger(newState);
        // remove the previous items from list
        browserUtil.removeAllChildren(containerEl);

        // create the table
        let tableEl = document.createElement(this.tableConfig.table.type);
        browserUtil.addRemoveClasses(tableEl, this.tableConfig.table.classes);
        browserUtil.addAttributes(tableEl, this.tableConfig.table.attributes);

        // create the headers
        let tableHeaderEl = document.createElement(this.tableConfig.header.type);
        browserUtil.addRemoveClasses(tableHeaderEl, this.tableConfig.header.classes);
        browserUtil.addAttributes(tableHeaderEl, this.tableConfig.header.attributes);


        // create the column headers
        this.tableConfig.headerColumns.forEach((header) => {
            let thEl = document.createElement(header.element.type);
            browserUtil.addRemoveClasses(thEl, header.element.classes);
            browserUtil.addAttributes(thEl, header.element.attributes);
            if (header.element.innerHTML) thEl.innerHTML = header.element.innerHTML;
            tableHeaderEl.appendChild(thEl);
        });

        // create the action column header (if one)
        if (this.tableConfig.actionColumn) {
            let thEl = document.createElement(this.tableConfig.actionColumn.element.type);
            browserUtil.addRemoveClasses(thEl, this.tableConfig.actionColumn.element.classes);
            browserUtil.addAttributes(thEl, this.tableConfig.actionColumn.element.attributes);
            if (this.tableConfig.actionColumn.element.innerHTML) thEl.innerHTML = this.tableConfig.actionColumn.element.innerHTML;
            tableHeaderEl.appendChild(thEl);
        }
        tableEl.appendChild(tableHeaderEl);


        // create the table body
        let tableBodyEl = document.createElement(this.tableConfig.body.type);
        browserUtil.addRemoveClasses(tableBodyEl, this.tableConfig.body.classes);
        browserUtil.addAttributes(tableBodyEl, this.tableConfig.body.attributes);

        // add the new children
        newState.map((item: any, index: number) => {
            const childEl = this.createDisplayElementForCollectionItem(collectionName, item);
            // add draggable actions
            logger(`view ${this.view.getName()}:  Adding child ${this.view.getIdForItemInNamedCollection(collectionName, item)}`);
            tableBodyEl.appendChild(childEl);

            ContextualInformationHelper.getInstance().addContextToElement(this.view.getName(), collectionName, item, childEl, true);
            childEl.addEventListener('contextmenu', ContextualInformationHelper.getInstance().handleContextMenu);
        });
        $('[data-toggle="tooltip"]').tooltip();

        tableEl.appendChild(tableBodyEl);
        containerEl.appendChild(tableEl);
    }
}