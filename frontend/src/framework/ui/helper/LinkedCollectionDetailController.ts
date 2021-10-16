import {CollectionView} from "../view/interface/CollectionView";
import {DetailView} from "../view/interface/DetailView";
import {CollectionViewListener} from "../view/interface/CollectionViewListener";
import {View} from "../view/interface/View";
import {DetailViewListener} from "../view/interface/DetailViewListener";

import debug from 'debug';
import {DataObjectController} from "../../model/DataObjectController";
import {AlertEvent, AlertListener, AlertType} from "../alert/AlertListener";
import {AlertManager} from "../alert/AlertManager";

const logger = debug('linked-controller');
const dlogger = debug('linked-controller-detail');

class ChildViewListenerDelegate implements DetailViewListener {
    protected controller: DetailViewListener;

    constructor(controller: DetailViewListener) {
        this.controller = controller;
    }

    addView(view: DetailView) {
        view.addEventListener(this);
    }

    canDeleteItem(view: View, selectedItem: any): boolean {
        return true;
    }

    documentLoaded(view: View): void {
    }

    hideRequested(view: View): void {
    }

    itemAction(view: View, actionName: string, selectedItem: any): void {
    }

    itemDeleted(view: View, selectedItem: any): void {
    }

    itemDropped(view: View, droppedItem: any): void {
    }

    showRequested(view: View): void {
    }

    cancelled(view: DetailView, dataObj: any): void {
        this.controller.cancelled(view, dataObj);
    }

    deletedItem(view: DetailView, dataObj: any): void {
        this.controller.deletedItem(view, dataObj);
    }

    saveNewItem(view: DetailView, dataObj: any): void {
        this.controller.saveNewItem(view, dataObj);
    }


    updateItem(view: DetailView, dataObj: any): void {
        this.controller.updateItem(view, dataObj);
    }
}

export class ChangeDataObjectDelegate implements AlertListener {
    protected callback: any;

    constructor(callback: any) {
        this.callback = callback;
    }

    public shouldDiscardChanges() {
        AlertManager.getInstance().startAlert(this, 'Discard Changes', 'There are unsaved changes.  Discard?', {});

    }


    completed(event: AlertEvent): void {
        if (event.outcome === AlertType.confirmed) {
            this.callback();
        }
    }

}

export class LinkedCollectionDetailController extends DataObjectController implements CollectionViewListener, DetailViewListener {
    protected parentView: CollectionView;
    protected children: DetailView[] = [];
    protected delegate: ChildViewListenerDelegate;

    constructor(typeName: string, parentView: CollectionView) {
        super(typeName);
        logger(`Starting with parent view ${parentView.getName()}`);
        this.parentView = parentView;
        this.delegate = new ChildViewListenerDelegate(this);
        this.parentView.addEventListener(this);
    }

    public addLinkedDetailView(childView: DetailView) {
        logger(`Adding child view ${childView.getName()}`);
        this.children.push(childView);
        this.delegate.addView(childView); // this delegate will only pass us the unique detail view events (save, new, etc)
    }

    public initialise(): void { // call when all views are ready
    }

    canDeleteItem(view: View, selectedItem: any): boolean {
        logger(`Handling delete item from view ${view.getName()}`);
        dlogger(selectedItem);
        return this.parentView.hasPermissionToDeleteItemInNamedCollection('', selectedItem);
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
        let canProceedWithSelection: boolean = true;
        this.children.forEach((childView) => {
            if (childView.hasChanged()) {
                dlogger(`child view ${childView.getName()} has changed - cancelling`);
                canProceedWithSelection = false;
            }
        });
        if (!canProceedWithSelection) {
            canProceedWithSelection = confirm(`${view.getName()} - unsaved changes.  Discard them?`);
        }
        return canProceedWithSelection;
    }


    cancelled(view: DetailView, dataObj: any): void {
        logger(`Handling cancelled from child view ${view.getName()}`);
        dlogger(dataObj);
        this.isCreatingNew = false;
    }

    deletedItem(view: DetailView, dataObj: any): void {
        logger(`Handling deleted from child view ${view.getName()}`);
        dlogger(dataObj);
        this.informListenersOfDelete(dataObj);
    }

    saveNewItem(view: DetailView, dataObj: any): void {
        logger(`Handling save new from child view ${view.getName()}`);
        dlogger(dataObj);
        this.informListenersOfCreate(dataObj);
    }

    updateItem(view: DetailView, dataObj: any): void {
        logger(`Handling update from child view ${view.getName()}`);
        dlogger(dataObj);
        this.informListenersOfUpdate(dataObj);
    }

    protected _startNewObject(): boolean {
        logger(`Handling start new object`);
        // assume the first detail view will create the object for us
        let canProceedWithCreateNew: boolean = true;
        this.children.forEach((childView) => {
            if (childView.hasChanged()) {
                dlogger(`child view ${childView.getName()} has changed - cancelling`);
                canProceedWithCreateNew = false;
            }
        });
        if (!canProceedWithCreateNew) {
            canProceedWithCreateNew = confirm(`There are unsaved changes.  Discard them?`);
        }

        if (this.children.length > 0) {
            logger(`Handling start new object with child view ${this.children[0].getName()}`);
            let dataObj = this.children[0].createItem();
            if (dataObj) {
                canProceedWithCreateNew = true;
                this.children[0].show();
            }
        }
        return canProceedWithCreateNew;
    }

}