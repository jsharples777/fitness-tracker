import {CollectionView} from "../interface/CollectionView";
import {DetailView} from "../interface/DetailView";
import {CollectionViewListener} from "../interface/CollectionViewListener";
import {View} from "../interface/View";

export class LinkedCollectionDetailController implements CollectionViewListener{
    protected parentView:CollectionView;
    protected children:DetailView[] = [];

    constructor(parentView:CollectionView) {
        this.parentView = parentView;
    }

    public addLinkedDetailView(childView:DetailView) {
        this.children.push(childView);
    }

    public initialise():void { // call when all views are ready
        this.parentView.addEventListener(this);
    }

    canDeleteItem(view: View, selectedItem: any): boolean {
        return this.parentView.hasPermissionToDeleteItemInNamedCollection('',selectedItem);
    }

    documentLoaded(view: View): void {
        // let the children know
        this.children.forEach((childView) => {
           childView.onDocumentLoaded();
        });
    }

    hideRequested(view: View): void {
        // let the children know
        this.children.forEach((childView) => {
            childView.hidden();
        });
    }

    itemAction(view: View, actionName: string, selectedItem: any): void {
        this.children.forEach((childView) => {
            childView.handleActionItem(actionName, selectedItem);
        });
    }

    itemDeleted(view: View, selectedItem: any): void {
        this.children.forEach((childView) => {
            // clear the child display and set readonly
            childView.clearDisplay();
            childView.setReadOnly();
        });
    }

    itemDeselected(view: View, selectedItem: any): void {
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
    }

    showRequested(view: View): void {
        // let the children know
        this.children.forEach((childView) => {
            childView.hidden();
        });
    }


}