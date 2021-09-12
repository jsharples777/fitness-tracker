import {CollectionViewListener} from "./CollectionViewListener";
import {ViewDOMConfig} from "../../ConfigurationTypes";

export interface View {
    getName():string;

    hidden():void;
    show():void;

    setContainedBy(container:HTMLElement):void;

    addEventListener(listener: CollectionViewListener): void;

    onDocumentLoaded(): void;

    hasChanged():boolean;

    getUIConfig():ViewDOMConfig;

    getDataSourceKeyId():string;

    render():void;

}