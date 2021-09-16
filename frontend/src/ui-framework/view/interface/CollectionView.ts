import {CollectionViewDOMConfig, Modifier} from "../../ConfigurationTypes";
import {View} from "./View";

export interface CollectionView extends View {
    getIdForItemInNamedCollection(name: string, item: any): string;

    renderDisplayForItemInNamedCollection(containerEl: HTMLElement, name: string, item: any): void;

    compareItemsForEquality(item1:any, item2: any): boolean;

    getModifierForItemInNamedCollection(name: string, item: any): Modifier;

    getSecondaryModifierForItemInNamedCollection(name: string, item: any): Modifier;

    getBadgeValueForItemInNamedCollection(name: string, item: any): number;

    getBackgroundImageForItemInNamedCollection(name: string, item: any): string;

    renderBackgroundForItemInNamedCollection(containerEl:HTMLElement,name:string, item:any):void;

    hasPermissionToDeleteItemInNamedCollection(name:string, item:any):boolean;
    hasPermissionToUpdateItemInNamedCollection(name:string, item:any):boolean;
    hasPermissionToActionItemInNamedCollection(actionName:string, name:string, item:any):boolean;

    updateViewForNamedCollection(name: string, collection: any): void;

    getCollectionUIConfig():CollectionViewDOMConfig;

}