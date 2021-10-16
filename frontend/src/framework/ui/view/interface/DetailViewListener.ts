import {ViewListener} from "./ViewListener";
import {DetailView} from "./DetailView";

export interface DetailViewListener extends ViewListener {
    saveNewItem(view: DetailView, dataObj: any): void;

    updateItem(view: DetailView, dataObj: any): void;

    deletedItem(view: DetailView, dataObj: any): void;

    cancelled(view: DetailView, dataObj: any): void;
}