import {View} from "./View";

export interface DetailView extends View {
    clearDisplay():void;
    createItem():any;
    displayItem(dataObj:any):void;

    hasPermissionToDeleteCurrentItem():boolean;
    hasPermissionToUpdateCurrentItem():boolean;

    setReadOnly():void;
    clearReadOnly():void;
    isReadOnly():boolean;

    handleActionItem(actionName: string, selectedItem: any):void;
    isDisplayingItem(dataObj:any):boolean;
}