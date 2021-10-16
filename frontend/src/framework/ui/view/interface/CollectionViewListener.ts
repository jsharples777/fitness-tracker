import {ViewListener} from "./ViewListener";
import {CollectionView} from "./CollectionView";

export interface CollectionViewListener extends ViewListener {
    itemSelected(view: CollectionView, selectedItem: any): void;

    itemDeselected(view: CollectionView, selectedItem: any): void;

    itemDragStarted(view: CollectionView, selectedItem: any): void;

    canSelectItem(view: CollectionView, selectedItem: any): boolean;
}

