import {DataObjectController} from "./DataObjectController";

export interface DataObjectListener {
    create(controller: DataObjectController, typeName: string, dataObj: any): void;

    update(controller: DataObjectController, typeName: string, dataObj: any): void;

    delete(controller: DataObjectController, typeName: string, dataObj: any): void;
}