import {View} from "../ui-framework/view/interface/View";
import {BasicElement} from "../ui-framework/ConfigurationTypes";

export type getIdentifier = (type:string,item:any) => string;
export type getDescription = (type:string, item:any) => string;

export type actionHandler = (actionName:string, type:string, item:any) => void;

export type ContextTypeAction = {
    actionName: string,
    elementDefinition: BasicElement,
    handler: actionHandler
}

export type ContextDefinitionType = {
    internalType:string,
    displayName:string,
    identifier:getIdentifier,
    description:getDescription,
    actions?:ContextTypeAction[]
}

export type ContextDefinition = {
    source:string,
    defaultType: ContextDefinitionType,
    extraTypes?: ContextDefinitionType[]
}

export type ContextDetails = {
    source:string,
    internalType:string,
    displayName:string,
    identifier:string,
    description:string
}

export enum TogglePlacement {
    top,
    bottom,
    right,
    left
}

const defaultIdentifier = function(name:string,item:any) { return ''; }


export class ContextualInformationHelper {
    private static _instance: ContextualInformationHelper;

    private static SOURCE:string = 'context-source';
    private static TYPE:string = 'context-type';
    private static DISPLAYNAME:string = 'context-display-name';
    private static IDENTIFIER:string = 'context-id';
    private static DESCRIPTION:string = 'title';

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

    public static getInstance(): ContextualInformationHelper {
        if (!(ContextualInformationHelper._instance)) {
            ContextualInformationHelper._instance = new ContextualInformationHelper();
        }
        return ContextualInformationHelper._instance;
    }

    private registry:ContextDefinition[] = [];

    private constructor() {}

    private ensureInRegistry(source:string) :ContextDefinition{
        let result:ContextDefinition;
        let foundIndex = this.registry.findIndex((context) => context.source === source);
        if (foundIndex < 0) {
            result = {
                source:source,
                defaultType: {
                    internalType: '',
                    displayName: '',
                    identifier: defaultIdentifier,
                    description: defaultIdentifier
                }
            }
            this.registry.push(result);
        }
        else {
            result = this.registry[foundIndex];
        }
        return result;
    }

    public addContextFromView(view:View,internalType:string,displayName:string) {
        let context: ContextDefinition = this.ensureInRegistry(view.getName());
        context.defaultType.internalType = internalType;
        context.defaultType.displayName = displayName;
        context.defaultType.identifier = view.getItemId;
        context.defaultType.description = view.getItemDescription;
        console.log("registering");
        console.log(context);
    }

    public addContextToElement(source:string, type:string, item:any, element:HTMLElement, addTooltip:boolean = false,placement:TogglePlacement = TogglePlacement.bottom):void {
        console.log("adding");
        const context:ContextDefinition = this.ensureInRegistry(source);
        element.setAttribute(ContextualInformationHelper.SOURCE,context.source);
        element.setAttribute(ContextualInformationHelper.TYPE,context.defaultType.internalType);
        element.setAttribute(ContextualInformationHelper.DISPLAYNAME,context.defaultType.displayName);
        element.setAttribute(ContextualInformationHelper.IDENTIFIER,context.defaultType.identifier(type,item));
        element.setAttribute(ContextualInformationHelper.DESCRIPTION,context.defaultType.description(type,item));
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
            $('[data-toggle="tooltip"]').tooltip({html:true});
        }
    }

    private findContextFromElement(element:HTMLElement):ContextDetails|null {
        // do we have context information in this element?
        let result:ContextDetails|null = null;

        const source = element.getAttribute(ContextualInformationHelper.SOURCE);
        if (source) {
            const type = element.getAttribute(ContextualInformationHelper.TYPE);
            const name = element.getAttribute(ContextualInformationHelper.DISPLAYNAME);
            const id = element.getAttribute(ContextualInformationHelper.IDENTIFIER);
            const desc = element.getAttribute(ContextualInformationHelper.DESCRIPTION);

            // @ts-ignore
            result = {source: source,internalType: type,displayName: name,identifier: id,description: desc};
        }
        else {
            const parent = element.parentElement;
            if (parent) {
                result = this.findContextFromElement(parent);
            }
        }
        return result;
    }

    private findAllContextsFromElement(element:HTMLElement,contexts:ContextDetails[]):void {
        // do we have context information in this element?

        const source = element.getAttribute(ContextualInformationHelper.SOURCE);
        if (source) {
            const type = element.getAttribute(ContextualInformationHelper.TYPE);
            const name = element.getAttribute(ContextualInformationHelper.DISPLAYNAME);
            const id = element.getAttribute(ContextualInformationHelper.IDENTIFIER);
            const desc = element.getAttribute(ContextualInformationHelper.DESCRIPTION);
            // @ts-ignore
            let result:ContextDetails = {source: source,internalType: type,displayName: name,identifier: id,description: desc};
            contexts.push(result);
        }
        const parent = element.parentElement;
        if (parent) {
            this.findAllContextsFromElement(parent,contexts);
        }
    }


    public findContextFromEvent(event:Event): ContextDetails|null {
        let result:ContextDetails|null = null;

        if (event.target) {
            let target = event.target;
            // @ts-ignore
            result = this.findContextFromElement(event.target);
        }
        return result;
    }





}