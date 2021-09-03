import {equalityFunction} from "../util/EqualityFunctions";
import {StateChangeInformer} from "./StateChangeInformer";
import StateChangeListener from "./StateChangeListener";

export type stateValue = { name: string, value: any };
export type stateListeners = { name: string, listeners: StateChangeListener[] };

export enum stateEventType {
    ItemAdded,
    ItemUpdated,
    ItemDeleted,
    StateChanged
}

export interface StateManager extends StateChangeInformer {

    getStateByName(name: string): any;

    setStateByName(name: string, stateObjectForName: any, informListeners: boolean): void;

    addNewItemToState(name: string, item: any, isPersisted: boolean): void;

    findItemInState(name: string, item: any, testForEqualityFunction: equalityFunction): any;

    isItemInState(name: string, item: any, testForEqualityFunction: equalityFunction): boolean;

    removeItemFromState(name: string, item: any, testForEqualityFunction: equalityFunction, isPersisted: boolean): boolean;

    updateItemInState(name: string, item: any, testForEqualityFunction: equalityFunction, isPersisted: boolean): boolean;

    // internal methods for optimization and aggregate SM (only use if writing a new state manager)
    _addNewNamedStateToStorage(state: stateValue): void;

    _getState(name: string): stateValue;

    _ensureStatePresent(name: string): void;

    _replaceNamedStateInStorage(state: stateValue): void;

    _saveState(name: string, stateObj: any): void;

    _addItemToState(name: string, stateObj: any, isPersisted: boolean): void;

    _removeItemFromState(name: string, stateObj: any, testForEqualityFunction: equalityFunction, isPersisted: boolean): void;

    _updateItemInState(name: string, stateObj: any, testForEqualityFunction: equalityFunction, isPersisted: boolean): void;

}