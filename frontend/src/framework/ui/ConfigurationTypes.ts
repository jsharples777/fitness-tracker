import {FieldUIConfig} from "./form/FormUITypeDefs";

export type Attribute = {
    name: string,
    value: string
}

export type ModifierClasses = {
    normal: string,
    inactive: string,
    active: string,
    warning: string
}

export type IconClasses = {
    normal: string,
    inactive?: string,
    active?: string,
    warning?: string,
}

export type BasicButtonElement = {
    classes: string,
    text?: string,
    iconClasses?: string,
    attributes?: Attribute[]

}

export type BasicElement = {
    type: string,
    attributes?: Attribute[],
    classes: string,
    innerHTML?: string
}

export const DRAGGABLE_KEY_ID: string = 'text/plain';
export const DRAGGABLE_TYPE: string = 'draggedType';
export const DRAGGABLE_FROM: string = 'draggedFrom';

export type Draggable = {
    type: string,
    from: string
}

export type Droppable = {
    acceptTypes: string[];
    acceptFrom?: string[];
}

export type getIcons = (name: string, item: any) => string[];

export type ContentDetail = {
    containerClasses: string,
    textElement: BasicElement,
    select: boolean,
    quickDelete?: boolean,
    icons?: getIcons,
    badge?: BasicElement,
    secondBadge?:BasicElement,
    thirdBadge?:BasicElement,
    delete?: BasicButtonElement,
    drag?: Draggable,
    background?: BasicElement,
}

export const EXTRA_ACTION_ATTRIBUTE_NAME: string = 'view-extra-action';

export type ExtraAction = {
    name: string,
    button: BasicButtonElement
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
    resultsContainerId: string,
    dataSourceId: string,
    drop?: Droppable
}

export type collectionSorter = (item1:any, item2:any) => number; // return < 0 if item1 should be before item2

export type CollectionViewDOMConfig = {
    viewConfig: ViewDOMConfig,
    resultsElement:BasicElement,
    keyId: string,
    keyType: KeyType,
    modifiers?: ModifierClasses,
    icons?: IconClasses,
    detail: ContentDetail,
    extraActions?: ExtraAction[],
    sorter?:collectionSorter
}


export enum SidebarLocation {
    top,
    right,
    left,
    bottom
}

export type SidebarPrefs = {
    id: string,
    location: SidebarLocation,
    expandedSize: string
}

export type SidebarViewConfig = {
    containerId: string
}

export type ViewPrefs = {
    sidebar?: SidebarPrefs
}

export enum RowPosition {
    first,
    last
}

export type CarouselDOMConfig = {
    itemsPerRow: {
        small: number,
        medium: number,
        large: number,
        xlarge: number,
    },
    rowContainer: BasicElement,
    activeRow: BasicElement,
    activeRowPosition: RowPosition,
    row: BasicElement,
    multipleItemsPerRowContainer?: BasicElement,
    actionContainer: BasicElement,
    collectionConfig: CollectionViewDOMConfig
}

export const SCREEN_WIDTH_LARGE = 992;
export const SCREEN_WIDTH_MEDIUM = 769;
export const SCREEN_WIDTH_SMALL = 415;


