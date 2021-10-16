import debug from 'debug';
import {StateChangeListener} from './StateChangeListener';
import {StateEventType, StateManager, StateManagerType, StateValue} from "./StateManager";
import {StateChangeInformer} from "./StateChangeInformer";
import {StateChangedDelegate} from "./StateChangedDelegate";
import {ComparisonType, equalityFunction, FilterItem} from "../CommonTypes";

const smLogger = debug('state-manager-ts');
const smLoggerDetail = debug('state-manager-ts:detail');

export type EqualityFnForName = {
    name: string,
    equality: equalityFunction
}


export abstract class AbstractStateManager implements StateManager {

    protected forceSaves: boolean = true;
    protected managerName: string = '';
    protected delegate: StateChangeInformer;
    protected defaultEquality: equalityFunction;
    protected equalityFns: EqualityFnForName[] | null = null;

    protected constructor(managerName: string, defaultEquality: equalityFunction, fnPerState: EqualityFnForName[] | null = null) {
        this.delegate = new StateChangedDelegate(managerName);
        this.managerName = managerName;
        this.defaultEquality = defaultEquality;
        if (fnPerState) {
            this.equalityFns = fnPerState;
        }
        this.emitEvents();
        this.forceSaves = true;
    }

    receivedFilterResults(name: string, filterResults: any): void {
        this.delegate.informChangeListenersForStateWithName(name, filterResults, StateEventType.FilterResults, null);
    }

    suppressEvents(): void {
        this.delegate.suppressEvents();
    }

    emitEvents(): void {
        this.delegate.emitEvents();
    }

    public dontForceSavesOnAddRemoveUpdate() {
        this.forceSaves = false;
    }

    public forceSavesOnAddRemoveUpdate() {
        this.forceSaves = true;
    }

    informChangeListenersForStateWithName(name: string, stateObjValue: any, eventType: StateEventType = StateEventType.StateChanged, previousObjValue: any | null = null) {
        this.delegate.informChangeListenersForStateWithName(name, stateObjValue, eventType, previousObjValue);
    }

    addChangeListenerForName(name: string, listener: StateChangeListener): void {
        this.delegate.addChangeListenerForName(name, listener);
    }

    public abstract _ensureStatePresent(name: string): void;

    public abstract _addNewNamedStateToStorage(state: StateValue): void;

    public abstract _replaceNamedStateInStorage(state: StateValue): void;

    public abstract _getState(name: string): StateValue;

    public abstract _saveState(name: string, stateObj: any): void;

    public abstract _addItemToState(name: string, stateObj: any, isPersisted: boolean): void;

    public abstract _removeItemFromState(name: string, stateObj: any, isPersisted: boolean): void;

    public abstract _updateItemInState(name: string, stateObj: any, isPersisted: boolean): void;

    public _findItemInState(name: string, item: any): any {
        let result = {};
        const state = this.getStateByName(name);
        const foundIndex = state.findIndex((element: any) => this.getEqualityFnForName(name)(element, item));
        smLogger(`Finding item in state ${name} - found index ${foundIndex}`);
        smLogger(item);
        if (foundIndex >= 0) {
            result = state[foundIndex];
        }
        return result;
    }


    public _findItemsInState(name: string, filters: FilterItem[]): any[] { // default implementation assumes local values and simple comparisons
        let results: any[] = [];
        const state: StateValue = this._getState(name);
        try {
            state.value.forEach((item: any) => {
                let isMatch: boolean = false;
                filters.forEach((filter) => {
                    smLogger(`filter, finding state value for ${state.name} with filter and item`);
                    smLoggerDetail(filter);
                    smLoggerDetail(filter);
                    if (!isMatch) { // don't bother with other filters if we have already failed

                        let attributeValue = item[filter.attributeName];
                        smLoggerDetail(`filter, finding state value for ${state.name} with attribute value ${attributeValue}`);
                        if (filter.evaluator) {
                            isMatch = filter.evaluator(item, filter);
                            smLoggerDetail(`filter (evaluator), with attribute ${attributeValue}`);
                        } else {
                            switch (filter.comparison) {
                                case ComparisonType.isNull: {
                                    smLoggerDetail(`filter (is Null), with attribute ${attributeValue}`);
                                    isMatch = !(attributeValue);
                                    break;
                                }
                                case ComparisonType.isNotNull: {
                                    smLoggerDetail(`filter (is Not Null), with attribute ${attributeValue}`);
                                    if (attributeValue) {
                                        isMatch = true;
                                    }
                                    break;
                                }
                                case ComparisonType.equals: {
                                    smLoggerDetail(`filter (===), with attribute ${attributeValue} and filter value ${filter.value}`);
                                    isMatch = ((attributeValue) && (attributeValue === filter.value));
                                    break;
                                }
                                case ComparisonType.lessThan: {
                                    smLoggerDetail(`filter (<), with attribute ${attributeValue} and filter value ${filter.value}`);
                                    isMatch = ((attributeValue) && (attributeValue < filter.value));
                                    break;
                                }
                                case ComparisonType.greaterThan: {
                                    smLoggerDetail(`filter (>), with attribute ${attributeValue} and filter value ${filter.value}`);
                                    isMatch = ((attributeValue) && (attributeValue > filter.value));
                                    break;
                                }
                                case ComparisonType.lessThanEqual: {
                                    smLoggerDetail(`filter (<=), with attribute ${attributeValue} and filter value ${filter.value}`);
                                    isMatch = ((attributeValue) && (attributeValue <= filter.value));
                                    break;
                                }
                                case ComparisonType.greaterThanEqual: {
                                    smLoggerDetail(`filter (>=), with attribute ${attributeValue} and filter value ${filter.value}`);
                                    isMatch = ((attributeValue) && (attributeValue >= filter.value));
                                    break;
                                }
                            }
                        }
                    }
                });
                smLoggerDetail(`filter, finding state value for ${state.name} is match? ${isMatch}`);

                if (isMatch) results.push(item);
            });
        } catch (err) {
            smLogger(`filter, state value for ${state.name} is not any array`);
        }
        smLoggerDetail('Match results');
        smLoggerDetail(results);
        return results;
    }

    public addStateByName(name: string, stateObjForName: any): any {
        this._ensureStatePresent(name);
        /* create a new state attribute for the application state */
        const state: StateValue = {
            name,
            value: stateObjForName,
        };
        /* get the current state value and replace it */
        this._replaceNamedStateInStorage(state);
        this.informChangeListenersForStateWithName(name, stateObjForName, StateEventType.StateChanged);
        return stateObjForName;
    }

    getStateByName(name: string): any {
        this._ensureStatePresent(name);
        smLogger(`State Manager: Getting state for ${name}`);
        let stateValueObj = {};
        // get the current state
        const state: StateValue = this._getState(name);
        stateValueObj = state.value;
        smLogger(`State Manager: Found previous state for ${name}`);
        smLogger(stateValueObj);
        return stateValueObj;
    }

    setStateByName(name: string, stateObjectForName: any, informListeners: boolean = true): void {
        this._ensureStatePresent(name);
        smLogger(`State Manager: Setting state for ${name}`);
        smLogger(stateObjectForName);
        // set the current state
        const state: StateValue = this._getState(name);
        state.value = stateObjectForName;
        if (this.forceSaves) this._saveState(name, stateObjectForName);
        if (informListeners) this.informChangeListenersForStateWithName(name, stateObjectForName);
        return stateObjectForName;
    }

    addNewItemToState(name: string, item: any, isPersisted: boolean = false): void { // assumes state is an array
        this._ensureStatePresent(name);
        smLogger(`State Manager: Adding item to state ${name}`);
        // const state = this.getStateByName(name);
        // state.push(item);
        // smLogger(state);
        this._addItemToState(name, item, isPersisted);
        this.informChangeListenersForStateWithName(name, item, StateEventType.ItemAdded);
    }

    findItemInState(name: string, item: any): any { // assumes state is an array
        this._ensureStatePresent(name);
        return this._findItemInState(name,item);
    }

    isItemInState(name: string, item: any): boolean { // assumes state is an array
        this._ensureStatePresent(name);
        let result = false;
        const state = this.getStateByName(name);
        const foundIndex = state.findIndex((element: any) => this.getEqualityFnForName(name)(element, item));
        if (foundIndex >= 0) {
            result = true;
        }
        return result;
    }

    removeItemFromState(name: string, item: any, isPersisted: boolean): boolean {
        this._ensureStatePresent(name);
        let result = true;
        let oldItem = this.findItemInState(name, item);
        // remove the item from the state
        smLogger(`State Manager: Found item - removing, is persisted ${isPersisted}`);
        this._removeItemFromState(name, item, isPersisted);
        this.informChangeListenersForStateWithName(name, oldItem, StateEventType.ItemDeleted);
        return result;
    }

    updateItemInState(name: string, item: any, isPersisted: boolean): boolean {
        this._ensureStatePresent(name);
        let result = true;
        let oldItem: any = this.findItemInState(name, item);
        smLogger('State Manager: Found item - replacing ');
        this._updateItemInState(name, item, isPersisted);
        this.informChangeListenersForStateWithName(name, item, StateEventType.ItemUpdated, oldItem);
        return result;
    }

    findItemsInState(name: string, filters: FilterItem[]): any[] {
        this._ensureStatePresent(name);
        return this._findItemsInState(name, filters);
    }

    getType(): StateManagerType {
        return StateManagerType.Local;
    }

    protected getEqualityFnForName(name: string): equalityFunction {
        let result = this.defaultEquality;
        if (this.equalityFns) {
            const foundIndex = this.equalityFns.findIndex((fn) => fn.name === name);
            if (foundIndex >= 0) result = this.equalityFns[foundIndex].equality;
        }
        return result;
    }




}
