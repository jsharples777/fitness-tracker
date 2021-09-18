import StateChangeListener from "../../../state/StateChangeListener";
import {StateManager} from "../../../state/StateManager";
import {CollectionViewDOMConfig} from "../../ConfigurationTypes";
import {AbstractCollectionView} from "./AbstractCollectionView";
import {CollectionViewListener} from "../interface/CollectionViewListener";
import {View} from "../interface/View";
import {CollectionView} from "../interface/CollectionView";

import debug from 'debug';

const logger = debug('ab-stateful-collection-view');

export default abstract class AbstractStatefulCollectionView extends AbstractCollectionView implements StateChangeListener,CollectionViewListener {

    protected stateManager: StateManager;

    protected constructor(uiConfig: CollectionViewDOMConfig, stateManager: StateManager, stateName:string) {
        super(uiConfig,stateName);
        this.stateManager = stateManager;

        // state change listening
        this.stateChanged = this.stateChanged.bind(this);

        // setup state listener
        this.stateManager.addChangeListenerForName(this.collectionName,this);
    }

    public getItemDescription(from: string, item: any): string {
        return "";
    }

    public onDocumentLoaded() {
        super.onDocumentLoaded();
        this.addEventCollectionListener(this);
    }

    public getItemInNamedCollection(name: string, compareWith: any): any {
        return this.stateManager.findItemInState(name, compareWith, this.compareItemsForEquality);
    }

    public stateChanged(managerName: string, name: string, newValue: any): void {
        logger(`handling state ${name} changed`);
        logger(newValue);
        this.updateViewForNamedCollection(name, newValue);
    }

    stateChangedItemAdded(managerName: string, name: string, itemAdded: any): void {
        logger(`handling state ${name} new item added`);
        logger(itemAdded);
        if (this.stateManager && this.collectionName) this.updateViewForNamedCollection(name, this.stateManager.getStateByName(name));
    }

    stateChangedItemRemoved(managerName: string, name: string, itemRemoved: any): void {
        logger(`handling state ${name} new item removed`);
        logger(itemRemoved);
        if (this.stateManager && this.collectionName) this.updateViewForNamedCollection(name, this.stateManager.getStateByName(name));
    }

    stateChangedItemUpdated(managerName: string, name: string, itemUpdated: any, itemNewValue: any): void {
        logger(`handling state ${name} new item updated`);
        logger(itemNewValue);
        if (this.stateManager && this.collectionName) this.updateViewForNamedCollection(name, this.stateManager.getStateByName(name));
    }

    render():void {
        this.updateViewForNamedCollection(this.collectionName,this.stateManager.getStateByName(this.collectionName))
    }

    show():void {}
    hidden():void{}

    documentLoaded(view: View): void {}
    hideRequested(view: View): void {}
    itemDragStarted(view: View, selectedItem: any): void {}
    itemDropped(view: View, droppedItem: any): void {}
    showRequested(view: View): void {}
    itemDeselected(view: View, selectedItem: any): void {}
    itemSelected(view: View, selectedItem: any): void {}
    itemAction(view:View, actionName:string, selectedItem:any):void{}

    itemDeleted(view: View, selectedItem: any): void {
        this.stateManager.removeItemFromState(this.collectionName, selectedItem, this.compareItemsForEquality, false);
    }


    canSelectItem(view: CollectionView, selectedItem: any): boolean {
        return true;
    }

    canDeleteItem(view: View, selectedItem: any): boolean {
        return true;
    }

    getListenerName(): string {
        return this.getName();
    }



}
