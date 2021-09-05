export type Attribute = {
    name:string,
    value:string
}

export type ModifierClasses = {
    normal:string,
    inactive:string,
    active:string,
    warning:string
}

export type IconClasses = {
    normal:string,
    inactive?:string,
    active?:string,
    warning?:string,
}

export type BasicButtonElement = {
    buttonClasses:string,
    buttonText?:string,
    iconClasses?:string
}

export type BasicElement = {
    elementType:string,
    elementAttributes?:Attribute[],
    elementClasses:string
}

export const DRAGGABLE_KEY_ID:string = 'text/plain';
export const DRAGGABLE_TYPE:string = 'draggedType';
export const DRAGGABLE_FROM:string = 'draggedFrom';

export type Draggable = {
    type:string,
    from:string
}

export type Droppable = {
    acceptTypes:string[];
    acceptFrom?:string[];
}

export type ContentDetail = {
    containerClasses:string,
    textElementType:string,
    textElementClasses:string,
    select:boolean,
    badge?:BasicElement,
    delete?:BasicButtonElement,
    drag?:Draggable,
    background?:BasicElement,
    drop?:Droppable
}

export const EXTRA_ACTION_ATTRIBUTE_NAME:string = 'view-extra-action';

export type ExtraAction = {
    name:string,
    buttonClasses:string,
    buttonText?:string,
    iconClasses:string
}

export enum Modifier {
    normal,
    active,
    inactive,
    warning
}

export enum KeyType {
    number,
    string,
    boolean
}

export type ViewDOMConfig = {
    resultsContainerId:string,
    resultsElementType:string,
    resultsElementAttributes?:[Attribute],
    resultsClasses:string,
    keyId:string,
    keyType: KeyType,
    dataSourceId:string,
    modifiers?:ModifierClasses,
    icons?:IconClasses,
    detail:ContentDetail,
    extraActions?:ExtraAction[],
}

export enum SidebarLocation {
    top,
    right,
    left,
    bottom
}
export type SidebarPrefs = {
    id:string,
    location: SidebarLocation,
    expandedSize: string
}

export type SidebarViewConfig = {
    containerId:string
}

export type ViewPrefs = {
    sidebar?:SidebarPrefs
}


