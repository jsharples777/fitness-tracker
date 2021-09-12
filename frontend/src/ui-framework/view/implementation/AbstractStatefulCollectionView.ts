import StateChangeListener from "../../../state/StateChangeListener";
import {StateManager} from "../../../state/StateManager";
import {CollectionViewDOMConfig} from "../../ConfigurationTypes";
import {AbstractCollectionView} from "./AbstractCollectionView";

export default abstract class AbstractStatefulCollectionView extends AbstractCollectionView implements StateChangeListener {

    protected stateManager: StateManager;

    protected constructor(uiConfig: CollectionViewDOMConfig, stateManager: StateManager, stateName:string) {
        super(uiConfig,stateName);
        this.stateManager = stateManager;

        // state change listening
        this.stateChanged = this.stateChanged.bind(this);

        // setup state listener
        this.stateManager.addChangeListenerForName(this.collectionName,this);
    }

    public getItemInNamedCollection(name: string, compareWith: any): any {
        return this.stateManager.findItemInState(name, compareWith, this.compareItemsForEquality);
    }

    public stateChanged(managerName: string, name: string, newValue: any): void {
        this.updateViewForNamedCollection(name, newValue);
    }

    stateChangedItemAdded(managerName: string, name: string, itemAdded: any): void {
        if (this.stateManager && this.collectionName) this.updateViewForNamedCollection(name, this.stateManager.getStateByName(name));
    }

    stateChangedItemRemoved(managerName: string, name: string, itemRemoved: any): void {
        if (this.stateManager && this.collectionName) this.updateViewForNamedCollection(name, this.stateManager.getStateByName(name));
    }

    stateChangedItemUpdated(managerName: string, name: string, itemUpdated: any, itemNewValue: any): void {
        if (this.stateManager && this.collectionName) this.updateViewForNamedCollection(name, this.stateManager.getStateByName(name));
    }

    render():void {
        this.updateViewForNamedCollection(this.collectionName,this.stateManager.getStateByName(this.collectionName))
    }

    show():void {}
    hidden():void{}


}
