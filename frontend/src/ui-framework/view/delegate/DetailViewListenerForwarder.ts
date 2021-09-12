import {ViewListenerForwarder} from "./ViewListenerForwarder";
import {DetailViewListener} from "../interface/DetailViewListener";
import {DetailView} from "../interface/DetailView";

export class DetailViewListenerForwarder extends ViewListenerForwarder implements DetailViewListener {
    protected detailViewListeners: DetailViewListener[];


    public constructor() {
        super();
        this.detailViewListeners = [];
    }

    public addListener(listener: DetailViewListener) {
        super.addListener(listener);
        this.detailViewListeners.push(listener);
    }

    saveNewItem(view: DetailView, dataObj: any): void {
        if (!this.suppressEventEmits) {
            this.detailViewListeners.forEach((listener) => listener.saveNewItem(view, dataObj));
        }
    }

    updateItem(view: DetailView, dataObj: any): void {
        if (!this.suppressEventEmits) {
            this.detailViewListeners.forEach((listener) => listener.updateItem(view, dataObj));
        }
    }

    deletedItem(view: DetailView, dataObj: any): void {
        if (!this.suppressEventEmits) {
            this.detailViewListeners.forEach((listener) => listener.deletedItem(view, dataObj));
        }
    }

    cancelled(view: DetailView, dataObj: any): void {
        if (!this.suppressEventEmits) {
            this.detailViewListeners.forEach((listener) => listener.cancelled(view, dataObj));
        }
    }
}