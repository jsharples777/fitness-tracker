import {StateManagerType, StateValue} from "./StateManager";
import {StateChangeListener} from "./StateChangeListener";

import debug from 'debug';
import {AsynchronousStateManager} from "./AsynchronousStateManager";
import {AbstractStateManager} from "./AbstractStateManager";
import {equalityFunction, FilterItem} from "../CommonTypes";


const asyncLogger = debug('state-manager-async');

export class AsyncStateManagerWrapper extends AbstractStateManager implements StateChangeListener {

    protected wrappedSM: AsynchronousStateManager;
    protected topLevelSM: AbstractStateManager;

    public constructor(topLevelSM: AbstractStateManager, wrappedSM: AsynchronousStateManager, defaultEq: equalityFunction) {
        super('async', defaultEq);
        this.topLevelSM = topLevelSM;
        this.wrappedSM = wrappedSM;
        this.forceSaves = false;

        this.wrappedSM.emitEvents();
        let stateNamesToMonitor = this.wrappedSM.getConfiguredStateNames();

        this.stateChanged = this.stateChanged.bind(this);
        this.stateChangedItemAdded = this.stateChangedItemAdded.bind(this);
        this.stateChangedItemRemoved = this.stateChangedItemRemoved.bind(this);
        this.stateChangedItemUpdated = this.stateChangedItemUpdated.bind(this);


        stateNamesToMonitor.forEach((stateName) => {
            this.wrappedSM.addChangeListenerForName(stateName, this);
        });
    }

    public getType(): StateManagerType {
        return this.wrappedSM.getType();
    }

    public _findItemsInState(name: string, filters: FilterItem[]): any[] {
        asyncLogger(`finding items with filters`);
        return this.wrappedSM.findItemsInState(name, filters);
    }

    public _findItemInState(name: string, stateObj:any): any {
        asyncLogger(`finding item `);
        return this.wrappedSM.findItemInState(name, stateObj);
    }

    _addItemToState(name: string, stateObj: any, isPersisted: boolean = false): void {
        asyncLogger(`adding item to state ${name} - is persisted ${isPersisted}`);
        this.wrappedSM.addNewItemToState(name, stateObj, isPersisted);
    }


    _getState(name: string): StateValue {
        // assume wrapped SM is asynchronous
        // make the call to get state but supply the caller with an empty state for now
        asyncLogger(`getting state ${name}`);
        this.wrappedSM.getStateByName(name);
        return {name: name, value: []};
    }


    _removeItemFromState(name: string, stateObj: any, isPersisted: boolean): void {
        asyncLogger(`removing item from state ${name} is persisted ${isPersisted}`);
        this.wrappedSM.removeItemFromState(name, stateObj, isPersisted);
    }

    _updateItemInState(name: string, stateObj: any, isPersisted: boolean): void {
        asyncLogger(`updating item in state ${name}`);
        this.wrappedSM.updateItemInState(name, stateObj, isPersisted);
    }

    _ensureStatePresent(name: string): void {
    }// assume already present
    _addNewNamedStateToStorage(state: StateValue): void {
    } // assume already present
    _replaceNamedStateInStorage(state: StateValue): void {
    } // not implemented, not replacing state wholesale
    _saveState(name: string, stateObj: any): void {
    } // not implemented, not replacing state wholesale
    stateChangedItemRemoved(managerName: string, name: string, itemRemoved: any): void {
    } // not implemented, assumes called to wrapped SM worked
    stateChangedItemUpdated(managerName: string, name: string, itemUpdated: any, itemNewValue: any): void {
    } // not implemented, assumes called to wrapped SM worked


    stateChanged(managerName: string, name: string, newValue: any): void {
        // received new state from the wrapped SM
        // pass the received state to the top level SM
        asyncLogger(`Wrapped SM has supplied new state ${name} passing to top level SM`);
        asyncLogger(newValue);
        this.topLevelSM.setStateByName(name, newValue);
    }

    stateChangedItemAdded(managerName: string, name: string, itemAdded: any): void {
        asyncLogger(`Wrapped SM has supplied new completed item for state ${name} passing to top level SM`);
        this.topLevelSM.addNewItemToState(name, itemAdded, true);
    }

    getListenerName(): string {
        return "Async Manager";
    }

    filterResults(managerName: string, name: string, filterResults: any): void {
        asyncLogger(`Wrapped SM has supplied filter results ${name} passing to top level SM`);
        this.topLevelSM.receivedFilterResults(name, filterResults);
    }

}