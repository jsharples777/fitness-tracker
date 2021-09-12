import {CollectionView} from "../interface/CollectionView";
import {DetailView} from "../interface/DetailView";
import {CollectionViewListener} from "../interface/CollectionViewListener";
import {View} from "../interface/View";
import {DetailViewListener} from "../interface/DetailViewListener";

import debug from 'debug';

const logger = debug('linked-controller');
const dlogger = debug('linked-controller-detail')

export class LinkedCollectionDetailController implements CollectionViewListener,DetailViewListener{
    protected parentView:CollectionView;
    protected children:DetailView[] = [];
    protected isCreatingNew:boolean = false;
    protected listeners:DetailViewListener[];

    constructor(parentView:CollectionView) {
        this.listeners = [];
        logger(`Starting with parent view ${parentView.getName()}`);
        this.parentView = parentView;
        this.parentView.addEventListener(this);
    }

    public addListener(listener:DetailViewListener) {
        this.listeners.push(listener);
    }

    public addLinkedDetailView(childView:DetailView) {
        logger(`Adding child view ${childView.getName()}`);
        this.children.push(childView);
        childView.addEventListener(this);
    }

    public initialise():void { // call when all views are ready
    }

    canDeleteItem(view: View, selectedItem: any): boolean {
        logger(`Handling delete item from view ${view.getName()}`);
        dlogger(selectedItem);
        return this.parentView.hasPermissionToDeleteItemInNamedCollection('',selectedItem);
    }

    documentLoaded(view: View): void {
        logger(`Handling document loaded view ${view.getName()}`);
        // let the children know
        this.children.forEach((childView) => {
           childView.onDocumentLoaded();
        });
    }

    hideRequested(view: View): void {
        // let the children know
        logger(`Handling hide  from view ${view.getName()}`);
        this.children.forEach((childView) => {
            childView.hidden();
        });
    }

    itemAction(view: View, actionName: string, selectedItem: any): void {
        logger(`Handling item action ${actionName} from view ${view.getName()}`);
        dlogger(selectedItem);
        this.children.forEach((childView) => {
            childView.handleActionItem(actionName, selectedItem);
        });
    }

    itemDeleted(view: View, selectedItem: any): void {
        logger(`Handling item deleted from view ${view.getName()}`);
        dlogger(selectedItem);
        this.children.forEach((childView) => {
            // clear the child display and set readonly
            childView.clearDisplay();
            childView.setReadOnly();
        });
    }

    itemDeselected(view: View, selectedItem: any): void {
        logger(`Handling item deselected from view ${view.getName()}`);
        dlogger(selectedItem);
        this.children.forEach((childView) => {
            // clear the child display and set readonly
            childView.clearDisplay();
            childView.setReadOnly();
        });
    }

    itemDragStarted(view: View, selectedItem: any): void { // nothing to do here
    }

    itemDropped(view: View, droppedItem: any): void { // nothing to do here
    }

    itemSelected(view: View, selectedItem: any): void {
        logger(`Handling item selected from view ${view.getName()}`);
        dlogger(selectedItem);
        this.children.forEach((childView) => {
            childView.displayItem(selectedItem);
        });
    }

    showRequested(view: View): void {
        logger(`Handling show from view ${view.getName()}`);
        // let the children know
        this.children.forEach((childView) => {
            childView.show();
        });
    }

    canSelectItem(view: CollectionView, selectedItem: any): boolean {
        logger(`Handling can select item from view ${view.getName()}`);
        dlogger(selectedItem);
        // are we currently in the middle of creating a new object?
        if (this.isCreatingNew) return false;

        // prevent selection if the children views have modified this item
        let canProceedWithSelection:boolean = true;
        this.children.forEach((childView) => {
            if (childView.isDisplayingItem(selectedItem)) {
                if (childView.hasChanged()) {
                    dlogger(`child view ${childView.getName()} has changed - cancelling`);
                    canProceedWithSelection = false;
                }
            }
        });
        return canProceedWithSelection;
    }

    cancelled(view: DetailView, dataObj: any): void {
        logger(`Handling cancelled from child view ${view.getName()}`);
        dlogger(dataObj);
        this.isCreatingNew = false;
        this.listeners.forEach((listener) => listener.cancelled(view,dataObj));
    }

    deletedItem(view: DetailView, dataObj: any): void {
        logger(`Handling deleted from child view ${view.getName()}`);
        dlogger(dataObj);
        this.isCreatingNew = false;
        this.listeners.forEach((listener) => listener.cancelled(view,dataObj));
    }

    saveNewItem(view: DetailView, dataObj: any): void {
        logger(`Handling save new from child view ${view.getName()}`);
        dlogger(dataObj);
        this.isCreatingNew = false;
        this.listeners.forEach((listener) => listener.cancelled(view,dataObj));
    }

    updateItem(view: DetailView, dataObj: any): void {
        logger(`Handling update from child view ${view.getName()}`);
        dlogger(dataObj);
        this.isCreatingNew = false;
        this.listeners.forEach((listener) => listener.cancelled(view,dataObj));
    }


}