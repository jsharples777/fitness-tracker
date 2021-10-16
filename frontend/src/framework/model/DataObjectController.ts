import {DataObjectListener} from "./DataObjectListener";

export abstract class DataObjectController {
    protected listeners: DataObjectListener[];
    protected isCreatingNew: boolean = false;
    protected typeName: string;

    protected constructor(typeName: string) {
        this.typeName = typeName;
        this.listeners = [];
    }

    public addListener(listener: DataObjectListener) {
        this.listeners.push(listener);
    }

    public startNewObject(): boolean {
        let result = false;
        if (!this.isCreatingNew) {
            result = this._startNewObject();
            this.isCreatingNew = result;
        }
        return result;
    }

    public isCreatingNewObject(): boolean {
        return this.isCreatingNew;
    }

    protected informListenersOfCreate(dataObj: any) {
        this.isCreatingNew = false;
        this.listeners.forEach((listener) => listener.create(this, this.typeName, dataObj));
    }

    protected informListenersOfUpdate(dataObj: any) {
        this.isCreatingNew = false;
        this.listeners.forEach((listener) => listener.update(this, this.typeName, dataObj));
    }

    protected informListenersOfDelete(dataObj: any) {
        this.isCreatingNew = false;
        this.listeners.forEach((listener) => listener.delete(this, this.typeName, dataObj));
    }

    protected abstract _startNewObject(): boolean; // return false, if the creation was cancelled

}