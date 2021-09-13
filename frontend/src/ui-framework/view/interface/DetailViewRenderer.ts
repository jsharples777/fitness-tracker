import {DetailView} from "./DetailView";
import {DetailViewListenerForwarder} from "../delegate/DetailViewListenerForwarder";
import {DisplayOrder} from "../../form/FormUITypeDefs";

export interface DetailViewRenderer extends DetailView{
    reset():void;
    initialise(displayOrder:DisplayOrder[],hideModifierFields:boolean):void;
    displayItemReadonly(dataObject:any):void;
    setEventForwarder(forwarder:DetailViewListenerForwarder):void;
    setView(view:DetailView):void;
}