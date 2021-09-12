import {CollectionViewDOMConfig} from "../../ConfigurationTypes";
import {ViewListener} from "./ViewListener";

export interface View {
    getName():string;

    hidden():void;
    show():void;

    setContainedBy(container:HTMLElement):void;

    addEventListener(listener: ViewListener): void;

    onDocumentLoaded(): void;

    hasChanged():boolean;

    getUIConfig():CollectionViewDOMConfig;

    getDataSourceKeyId():string;

    render():void;

}