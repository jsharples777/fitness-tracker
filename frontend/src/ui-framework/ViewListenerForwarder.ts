import {ViewListener} from "./ViewListener";
import {View} from "./View";

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

    itemDeleted(view:View,selectedItem: any): void {
        if (!this.suppressEventEmits) {
            this.viewListeners.forEach((listener) => listener.itemDeleted(view,selectedItem));
        }
    }

    itemDragStarted(view:View,selectedItem: any): void {
        if (!this.suppressEventEmits) {
            this.viewListeners.forEach((listener) => listener.itemDragStarted(view,selectedItem));
        }
    }

    itemSelected(view:View,selectedItem: any): void {
        if (!this.suppressEventEmits) {
            this.viewListeners.forEach((listener) => listener.itemSelected(view,selectedItem));
        }
    }

    documentLoaded(view: View): void {
        if (!this.suppressEventEmits) {
            this.viewListeners.forEach((listener) => listener.documentLoaded(view));
        }
    }

    itemAction(view:View,actionName:string, selectedItem: any): void {
        if (!this.suppressEventEmits) {
            this.viewListeners.forEach((listener) => listener.itemAction(view,actionName,selectedItem));
        }
    }

    canDeleteItem(view: View, selectedItem: any): boolean {
        let result = true; // return false if cancelling delete
        if (!this.suppressEventEmits) {
            this.viewListeners.forEach((listener) => {
                if (!(listener.canDeleteItem(view,selectedItem))) {
                    result = false;
                }
            });
        }
        return result;
    }

    hideRequested(view: View): void {
        if (!this.suppressEventEmits) {
            this.viewListeners.forEach((listener) => listener.hideRequested(view));
        }
    }

    showRequested(view: View): void {
        if (!this.suppressEventEmits) {
            this.viewListeners.forEach((listener) => listener.showRequested(view));
        }
    }

    itemDropped(view: View, droppedItem: any): void {
        if (!this.suppressEventEmits) {
            this.viewListeners.forEach((listener) => listener.itemDropped(view,droppedItem));
        }
    }

    itemDeselected(view: View, deselectedItem: any): void {
        if (!this.suppressEventEmits) {
            this.viewListeners.forEach((listener) => listener.itemDeselected(view,deselectedItem));
        }
    }

}

export default ViewListenerForwarder;