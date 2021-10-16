import {CollectionViewListener} from "../interface/CollectionViewListener";
import {CollectionView} from "../interface/CollectionView";
import {ViewListenerForwarder} from "./ViewListenerForwarder";

export class CollectionViewListenerForwarder extends ViewListenerForwarder implements CollectionViewListener {
    protected collectionViewListeners: CollectionViewListener[];


    public constructor() {
        super();
        this.collectionViewListeners = [];
    }

    public addListener(listener: CollectionViewListener) {
        super.addListener(listener);
        this.collectionViewListeners.push(listener);
    }


    itemDragStarted(view: CollectionView, selectedItem: any): void {
        if (!this.suppressEventEmits) {
            this.collectionViewListeners.forEach((listener) => listener.itemDragStarted(view, selectedItem));
        }
    }

    itemSelected(view: CollectionView, selectedItem: any): void {
        if (!this.suppressEventEmits) {
            this.collectionViewListeners.forEach((listener) => listener.itemSelected(view, selectedItem));
        }
    }

    itemDeselected(view: CollectionView, deselectedItem: any): void {
        if (!this.suppressEventEmits) {
            this.collectionViewListeners.forEach((listener) => listener.itemDeselected(view, deselectedItem));
        }
    }

    canSelectItem(view: CollectionView, selectedItem: any): boolean {
        let result = true; // return false if cancelling delete
        if (!this.suppressEventEmits) {
            this.collectionViewListeners.forEach((listener) => {
                if (!(listener.canSelectItem(view, selectedItem))) {
                    result = false;
                }
            });
        }
        return result;
    }
}