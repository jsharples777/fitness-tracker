import {ViewListener} from "./ViewListener";
import {ViewDOMConfig} from "../../ConfigurationTypes";

export interface View {
    getName():string;

    hidden():void;
    show():void;

    setContainedBy(container:HTMLElement):void;

    addEventListener(listener: ViewListener): void;

    onDocumentLoaded(): void;

    hasChanged():boolean;

    getUIConfig():ViewDOMConfig;

    getDataSourceKeyId():string;

    render():void;

    getItemId(from:string, item:any):string;
    getItemDescription(from:string, item:any):string;

}