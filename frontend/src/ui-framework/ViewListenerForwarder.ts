import debug from "debug";
import {ViewListener} from "./ViewListener";
import AbstractView from "./AbstractView";

const smLogger = debug('state-manager-delegate');

class ViewListenerForwarder implements ViewListener {
    protected viewListeners: ViewListener[];
    protected suppressEventEmits: boolean = false;


    public constructor() {
        this.viewListeners = [];
    }

    public addListener(listener:ViewListener) {
        this.viewListeners.push(listener);
    }

    public suppressEvents() {
        this.suppressEventEmits = true;
    }

    public emitEvents() {
        this.suppressEventEmits = false;
    }

    itemDeleted(view:AbstractView,selectedItem: any): void {
        if (!this.suppressEventEmits) {
            this.viewListeners.forEach((listener) => listener.itemDeleted(view,selectedItem));
        }
    }

    itemDragStarted(view:AbstractView,selectedItem: any): void {
        if (!this.suppressEventEmits) {
            this.viewListeners.forEach((listener) => listener.itemDragStarted(view,selectedItem));
        }
    }

    itemSelected(view:AbstractView,selectedItem: any): void {
        if (!this.suppressEventEmits) {
            this.viewListeners.forEach((listener) => listener.itemSelected(view,selectedItem));
        }
    }

    documentLoaded(view: AbstractView): void {
        if (!this.suppressEventEmits) {
            this.viewListeners.forEach((listener) => listener.documentLoaded(view));
        }
    }

    itemAction(view:AbstractView,actionName:string, selectedItem: any): void {
        if (!this.suppressEventEmits) {
            this.viewListeners.forEach((listener) => listener.itemAction(view,actionName,selectedItem));
        }
    }

    itemDeleteStarted(view: AbstractView, selectedItem: any): boolean {
        let result = true; // return false if cancelling delete
        if (!this.suppressEventEmits) {
            this.viewListeners.forEach((listener) => {
                if (!(listener.itemDeleteStarted(view,selectedItem))) {
                    result = false;
                }
            });
        }
        return result;
    }

}

export default ViewListenerForwarder;