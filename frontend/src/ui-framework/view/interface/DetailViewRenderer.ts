import {DetailView} from "./DetailView";

export interface DetailViewRenderer extends DetailView{
    reset():void;
    initialise():void;
    displayItemReadonly(dataObject:any):void;
}