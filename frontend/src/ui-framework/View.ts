import {ViewListener} from "./ViewListener";
import {Modifier, ViewDOMConfig} from "./ConfigurationTypes";

export interface View {
    getName():string;

    hidden():void;

    setContainedBy(container:HTMLElement):void;

    addEventListener(listener: ViewListener): void;

    onDocumentLoaded(): void;

    getIdForItemInNamedCollection(name: string, item: any): string;

    getDisplayValueForItemInNamedCollection(name: string, item: any): string;

    compareItemsForEquality(item1:any, item2: any): boolean;

    getModifierForItemInNamedCollection(name: string, item: any): Modifier;

    getSecondaryModifierForItemInNamedCollection(name: string, item: any): Modifier;

    getBadgeValueForItemInNamedCollection(name: string, item: any): number;

    getBackgroundImageForItemInNamedCollection(name: string, item: any): string;

    hasPermissionToDeleteItemInNamedCollection(name:string, item:any):boolean;
    hasPermissionToUpdateItemInNamedCollection(name:string, item:any):boolean;

    updateViewForNamedCollection(name: string, collection: any): void;

    hasChanged():boolean;

    getUIConfig():ViewDOMConfig;

    getDataSourceKeyId():string;

}