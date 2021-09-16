import {View} from "./view/interface/View";

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
    iconClasses?:string,
    attributes?:Attribute[]

}

export type BasicElement = {
    elementType:string,
    elementAttributes?:Attribute[],
    elementClasses:string,
    innerHTML?:string
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

export type getIcons = (name:string,item:any) => string[];

export type ContentDetail = {
    containerClasses:string,
    textElementType:string,
    textElementClasses:string,
    select:boolean,
    quickDelete?:boolean,
    icons?:getIcons,
    badge?:BasicElement,
    delete?:BasicButtonElement,
    drag?:Draggable,
    background?:BasicElement,
}

export const EXTRA_ACTION_ATTRIBUTE_NAME:string = 'view-extra-action';

export type ExtraAction = {
    name:string,
    buttonClasses:string,
    buttonText?:string,
    iconClasses:string,
    attributes?:Attribute[]
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
    boolean,
    collection
}

export type ViewDOMConfig = {
    resultsContainerId:string,
    dataSourceId:string,
    drop?:Droppable
}

export type CollectionViewDOMConfig = {
    viewConfig:ViewDOMConfig,
    resultsElementType:string,
    resultsElementAttributes?:[Attribute],
    resultsClasses:string,
    keyId:string,
    keyType: KeyType,
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

export enum RowPosition {
    first,
    last
}

export type CarouselDOMConfig = {
    itemsPerRow: {
        small: number,
        medium: number,
        large: number
    },
    rowContainer: BasicElement,
    activeRow: BasicElement,
    activeRowPosition:RowPosition,
    row: BasicElement,
    multipleItemsPerRowContainer?:BasicElement,
    actionContainer:BasicElement,
    collectionConfig: CollectionViewDOMConfig
}


