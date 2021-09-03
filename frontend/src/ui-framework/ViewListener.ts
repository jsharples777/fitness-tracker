import AbstractView from "./AbstractView";

export interface ViewListener {
    itemSelected(view:AbstractView,selectedItem:any):void;
    itemDeleteStarted(view:AbstractView,selectedItem:any):boolean; // listener should return false to cancel delete
    itemDeleted(view:AbstractView,selectedItem:any):void;
    itemDragStarted(view:AbstractView,selectedItem:any):void;
    itemAction(view:AbstractView,actionName:string, selectedItem:any):void;
    documentLoaded(view:AbstractView):void;
}