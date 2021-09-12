import {DetailView} from "./DetailView";
import {DetailViewListenerForwarder} from "../delegate/DetailViewListenerForwarder";

export interface DetailViewRenderer extends DetailView{
    reset():void;
    initialise():void;
    displayItemReadonly(dataObject:any):void;
    setEventForwarder(forwarder:DetailViewListenerForwarder):void;
    setView(view:DetailView):void;
}