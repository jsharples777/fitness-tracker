import {View} from "../view/interface/View";
import {BasicElement, EXTRA_ACTION_ATTRIBUTE_NAME} from "../ConfigurationTypes";
import browserUtil from "../../util/BrowserUtil";
import debug from 'debug';
import {AbstractCollectionView} from "../view/implementation/AbstractCollectionView";
import {CollectionView} from "../view/interface/CollectionView";

const logger = debug('context-helper');

export type getIdentifier = (type: string, item: any) => string;
export type getDescription = (type: string, item: any) => string;

export type actionHandler = (event: MouseEvent) => void;
export type hasActionPermission = (actionName: string, type: string, item: any) => boolean;

export type ContextTypeAction = {
    actionName: string,
    displayName: string,
    elementDefinition: BasicElement,
    iconClasses?: string,
    handler: actionHandler,
    hasPermission?: hasActionPermission
}

export type ContextDefinitionType = {
    internalType: string,
    displayName: string,
    identifier: getIdentifier,
    description: getDescription,
    actions: ContextTypeAction[]
}

export type ContextDefinition = {
    source: string,
    view?: View,
    defaultType: ContextDefinitionType,
    extraTypes?: ContextDefinitionType[]
}

export type ContextDetails = {
    source: string,
    internalType: string,
    displayName: string,
    identifier: string,
    description: string
}

export enum TogglePlacement {
    top,
    bottom,
    right,
    left
}

const defaultIdentifier = function (name: string, item: any) {
    return '';
}


export class ContextualInformationHelper {
    private static _instance: ContextualInformationHelper;

    private static SOURCE: string = 'context-source';
    private static TYPE: string = 'context-type';
    private static DISPLAYNAME: string = 'context-display-name';
    private static IDENTIFIER: string = 'context-id';
    private static DESCRIPTION: string = 'title';

    private static BOOTSTRAP_TOGGLE = 'data-toggle';
    private static BOOTSTRAP_PLACEMENT = 'data-placement'
    private static BOOTSTRAP_TOOLTIP_VALUE = 'tooltip';
    private static BOOTSTRAP_POPOVER_VALUE = 'popover';

    private static BOOTSTRAP_TOGGLE_HTML = 'data-html';
    private static BOOTSTRAP_TOGGLE_HTML_VALUE = 'true';


    private static BOOTSTRAP_PLACEMENT_TOP = 'top'
    private static BOOTSTRAP_PLACEMENT_BOTTOM = 'bottom'
    private static BOOTSTRAP_PLACEMENT_RIGHT = 'right'
    private static BOOTSTRAP_PLACEMENT_LEFT = 'left'
    private registry: ContextDefinition[] = [];
    private menuDivEl: HTMLDivElement | null = null;
    private menuContentEl: HTMLUListElement | null = null;

    private constructor() {
        this.handleContextMenu = this.handleContextMenu.bind(this);
        this.hideContextMenu = this.hideContextMenu.bind(this);
    }

    public static getInstance(): ContextualInformationHelper {
        if (!(ContextualInformationHelper._instance)) {
            ContextualInformationHelper._instance = new ContextualInformationHelper();
        }
        return ContextualInformationHelper._instance;
    }

    public onDocumentLoaded() {
        // @ts-ignore
        document.addEventListener('click', this.hideContextMenu);

        this.menuDivEl = <HTMLDivElement | null>document.getElementById('contextmenu');
        this.menuContentEl = <HTMLUListElement | null>document.getElementById('contextMenuItems');
    }

    public addContextFromView(view: View, internalType: string, displayName: string): ContextDefinition {
        let context: ContextDefinition = this.ensureInRegistry(view.getName());
        context.view = view;
        context.defaultType.internalType = internalType;
        context.defaultType.displayName = displayName;
        context.defaultType.identifier = view.getItemId;
        context.defaultType.description = view.getItemDescription;
        return context;
    }

    public addContextToElement(source: string, type: string, item: any, element: HTMLElement, addTooltip: boolean = false, placement: TogglePlacement = TogglePlacement.bottom): void {
        const context: ContextDefinition = this.ensureInRegistry(source);
        element.setAttribute(ContextualInformationHelper.SOURCE, context.source);
        element.setAttribute(ContextualInformationHelper.TYPE, context.defaultType.internalType);
        element.setAttribute(ContextualInformationHelper.DISPLAYNAME, context.defaultType.displayName);
        element.setAttribute(ContextualInformationHelper.IDENTIFIER, context.defaultType.identifier(type, item));
        element.setAttribute(ContextualInformationHelper.DESCRIPTION, context.defaultType.description(type, item));
        if (addTooltip) {
            element.setAttribute(ContextualInformationHelper.BOOTSTRAP_TOGGLE, ContextualInformationHelper.BOOTSTRAP_TOOLTIP_VALUE);
            element.setAttribute(ContextualInformationHelper.BOOTSTRAP_TOGGLE_HTML, ContextualInformationHelper.BOOTSTRAP_TOGGLE_HTML_VALUE);
            switch (placement) {
                case TogglePlacement.bottom: {
                    element.setAttribute(ContextualInformationHelper.BOOTSTRAP_PLACEMENT, ContextualInformationHelper.BOOTSTRAP_PLACEMENT_BOTTOM);
                    break;
                }
                case TogglePlacement.top: {
                    element.setAttribute(ContextualInformationHelper.BOOTSTRAP_PLACEMENT, ContextualInformationHelper.BOOTSTRAP_PLACEMENT_TOP);
                    break;
                }
                case TogglePlacement.left: {
                    element.setAttribute(ContextualInformationHelper.BOOTSTRAP_PLACEMENT, ContextualInformationHelper.BOOTSTRAP_PLACEMENT_LEFT);
                    break;
                }
                case TogglePlacement.right: {
                    element.setAttribute(ContextualInformationHelper.BOOTSTRAP_PLACEMENT, ContextualInformationHelper.BOOTSTRAP_PLACEMENT_RIGHT);
                    break;
                }
            }
            // @ts-ignore
            $('[data-toggle="tooltip"]').tooltip({html: true});
        }
    }

    public findContextFromEvent(event: Event): ContextDetails | null {
        let result: ContextDetails | null = null;

        if (event.target) {
            let target = event.target;
            // @ts-ignore
            result = this.findContextFromElement(event.target);
        }
        return result;
    }

    public addActionToContext(context: ContextDefinition, actionName: string, displayName: string, handler: actionHandler, icon?: string, permissionCheck?: hasActionPermission) {
        let action: ContextTypeAction = {
            actionName: actionName,
            displayName: displayName,
            handler: handler,
            hasPermission: permissionCheck,
            elementDefinition: {
                type: 'a',
                attributes: [{name: 'href', value: '#'}],
                classes: 'list-group-item list-group-item-action bg-dark text-white',
            },
            iconClasses: icon
        };
        this.addContextActionToContext(context, action);
    }

    public handleContextMenu(event: MouseEvent): any {
        logger('Right click')
        logger(event.target);
        // are we over a context sensitive item?
        // find a context if possible
        // @ts-ignore
        const context: ContextDetails | null = this.findContextFromElement(event.target);
        logger(context);
        if (context && this.buildContextMenu(context)) {
            event.preventDefault();
            event.stopPropagation();
            this.showContextMenu(event);
            return false;
        }

        // otherwise let the default behaviour happen
        return true;
    }

    private ensureInRegistry(source: string): ContextDefinition {
        let result: ContextDefinition;
        let foundIndex = this.registry.findIndex((context) => context.source === source);
        if (foundIndex < 0) {
            result = {
                source: source,
                defaultType: {
                    internalType: '',
                    displayName: '',
                    identifier: defaultIdentifier,
                    description: defaultIdentifier,
                    actions: []
                }
            }
            this.registry.push(result);
        } else {
            result = this.registry[foundIndex];
        }
        return result;
    }

    private findContextFromElement(element: HTMLElement): ContextDetails | null {
        // do we have context information in this element?
        let result: ContextDetails | null = null;

        const source = element.getAttribute(ContextualInformationHelper.SOURCE);
        if (source) {
            const type = element.getAttribute(ContextualInformationHelper.TYPE);
            const name = element.getAttribute(ContextualInformationHelper.DISPLAYNAME);
            const id = element.getAttribute(ContextualInformationHelper.IDENTIFIER);
            const desc = element.getAttribute(ContextualInformationHelper.DESCRIPTION);

            // @ts-ignore
            result = {source: source, internalType: type, displayName: name, identifier: id, description: desc};
        } else {
            const parent = element.parentElement;
            if (parent) {
                result = this.findContextFromElement(parent);
            }
        }
        return result;
    }

    private findAllContextsFromElement(element: HTMLElement, contexts: ContextDetails[]): void {
        // do we have context information in this element?

        const source = element.getAttribute(ContextualInformationHelper.SOURCE);
        if (source) {
            const type = element.getAttribute(ContextualInformationHelper.TYPE);
            const name = element.getAttribute(ContextualInformationHelper.DISPLAYNAME);
            const id = element.getAttribute(ContextualInformationHelper.IDENTIFIER);
            const desc = element.getAttribute(ContextualInformationHelper.DESCRIPTION);
            // @ts-ignore
            if (type && name && id && desc) {
                let result: ContextDetails = {
                    source: source,
                    internalType: type,
                    displayName: name,
                    identifier: id,
                    description: desc
                };
                contexts.push(result);
            }
        }
        const parent = element.parentElement;
        if (parent) {
            this.findAllContextsFromElement(parent, contexts);
        }
    }

    private addContextActionToContext(context: ContextDefinition, action: ContextTypeAction) {
        logger(`Adding action to context ${context.source}`);
        logger(action);
        context.defaultType.actions.push(action);
    }

    private buildContextMenu(context: ContextDetails): boolean {
        logger(`building context menu`);
        let result = false;

        // find the context for these details
        const contextDef: ContextDefinition | null = this.ensureInRegistry(context.source);

        let selectedItem: any | null = null;

        if (contextDef && contextDef.view && (contextDef.view instanceof AbstractCollectionView)) {
            logger(`collection view context - finding item with identifier ${context.identifier}`);
            let collectionView = <CollectionView>(contextDef.view);
            let compareWith = {};
            // @ts-ignore
            compareWith[collectionView.getCollectionUIConfig().keyId] = context.identifier;

            selectedItem = collectionView.getItemInNamedCollection(context.internalType, compareWith);
        }

        logger(`found item for context menu`);
        logger(selectedItem);

        if (contextDef.defaultType.actions.length > 0) {
            if (this.menuContentEl && this.menuContentEl) {
                browserUtil.removeAllChildren(this.menuContentEl);

                contextDef.defaultType.actions.forEach((action) => {
                    logger('Adding action');
                    logger(action);

                    if ((selectedItem && action.hasPermission && action.hasPermission(action.actionName, contextDef.defaultType.internalType, selectedItem)) ||
                        !(action.hasPermission)) {
                        let itemEl = document.createElement(action.elementDefinition.type);
                        if (itemEl && this.menuContentEl) {
                            browserUtil.addAttributes(itemEl, action.elementDefinition.attributes);
                            browserUtil.addRemoveClasses(itemEl, action.elementDefinition.classes);

                            itemEl.setAttribute(ContextualInformationHelper.SOURCE, context.source);
                            itemEl.setAttribute(ContextualInformationHelper.TYPE, context.internalType);
                            itemEl.setAttribute(ContextualInformationHelper.DISPLAYNAME, context.displayName);
                            itemEl.setAttribute(ContextualInformationHelper.IDENTIFIER, context.identifier);
                            itemEl.setAttribute(ContextualInformationHelper.DESCRIPTION, context.description);
                            itemEl.setAttribute(EXTRA_ACTION_ATTRIBUTE_NAME, action.actionName);

                            itemEl.addEventListener('click', (event: MouseEvent) => {
                                this.hideContextMenu(event);
                                action.handler(event);
                            });
                            itemEl.innerHTML = `${action.displayName}`;
                            if (action.iconClasses) {
                                itemEl.innerHTML += `&nbsp;&nbsp;<i class="${action.iconClasses}"></i>`;
                            }
                            this.menuContentEl.appendChild(itemEl);
                            logger('new menu element is ');
                            logger(this.menuContentEl);
                            result = true;
                        }
                    }


                });
            }
        } else {
            logger(`building context menu - no actions for ${context.source}`);
        }
        return result;
    }

    private hideContextMenu(event: MouseEvent): any {
        if (this.menuDivEl) {
            browserUtil.addRemoveClasses(this.menuDivEl, 'd-none');
        }
    }

    private showContextMenu(event: MouseEvent) {
        if (this.menuDivEl) {
            logger(`Showing context menu at ${event.pageX},${event.pageY}`);
            browserUtil.addRemoveClasses(this.menuDivEl, 'd-none', false);
            this.menuDivEl.style.left = event.pageX + 'px';
            this.menuDivEl.style.top = event.pageY + 'px';
        }
    }


}