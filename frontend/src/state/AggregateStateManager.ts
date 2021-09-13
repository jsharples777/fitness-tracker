import debug from 'debug';

import {StateManager, stateValue} from "./StateManager";
import {equalityFunction} from "../util/EqualityFunctions";
import {AbstractStateManager} from "./AbstractStateManager";


const aggLogger = debug('state-manager-aggregate');

type managerWithFilters = {
    manager: StateManager,
    filters: string[]
}

export class AggregateStateManager extends AbstractStateManager {
    private static _instance: AggregateStateManager;
    private stateManagers: managerWithFilters[];

    private constructor() {
        super('aggregate');
        this.stateManagers = [];
        this.emitEvents();

    }

    public static getInstance() {
        if (!(AggregateStateManager._instance)) {
            AggregateStateManager._instance = new AggregateStateManager();
        }
        return AggregateStateManager._instance;
    }

    public addStateManager(stateManager: AbstractStateManager, filters: string[] = [], emitEvents: boolean) {
        let mWF: managerWithFilters = {
            manager: stateManager,
            filters: filters
        };
        this.stateManagers.push(mWF);
        if (!emitEvents) stateManager.suppressEvents();
        aggLogger('adding state manager with/without filters');
    }

    public _addNewNamedStateToStorage(state: stateValue): void {
        this.stateManagers.forEach((managerWithFilters) => {
            if (!this.stateNameInFilters(state.name, managerWithFilters.filters)) {
                managerWithFilters.manager._addNewNamedStateToStorage(state);
            }
        });
    }

    public _getState(name: string): stateValue {
        let state: stateValue = {
            name: name,
            value: []
        }
        this.stateManagers.forEach((sm) => {
            if (!this.stateNameInFilters(state.name, sm.filters)) {
                aggLogger(`get state from state manager for state ${name}`);
                aggLogger(sm.manager);
                sm.manager._getState(name);
            }

        });
        // assuming the state manager is holding all the values
        if (this.stateManagers.length > 0) {
            state = this.stateManagers[0].manager._getState(name);
        }
        return state;
    }

    public _ensureStatePresent(name: string): void {
        this.stateManagers.forEach((managerWithFilters) => {
            if (!this.stateNameInFilters(name, managerWithFilters.filters)) {
                managerWithFilters.manager._ensureStatePresent(name);
            }
        });
    }

    public _replaceNamedStateInStorage(state: stateValue): void {
        this.stateManagers.forEach((managerWithFilters) => {
            if (!this.stateNameInFilters(state.name, managerWithFilters.filters)) {
                managerWithFilters.manager._replaceNamedStateInStorage(state);
            }
        });
    }

    public _saveState(name: string, stateObj: any): void {
        this.stateManagers.forEach((managerWithFilters) => {
            if (!this.stateNameInFilters(name, managerWithFilters.filters)) {
                aggLogger(`saving state in state manager for state ${name}`);
                aggLogger(managerWithFilters.manager);
                aggLogger(stateObj);
                managerWithFilters.manager._saveState(name, stateObj);
            }
        });
    }

    _addItemToState(name: string, stateObj: any, isPersisted: boolean = false): void {
        this.stateManagers.forEach((managerWithFilters) => {
            if (!this.stateNameInFilters(name, managerWithFilters.filters)) {
                aggLogger(`adding item to state in  state manager for state ${name}, is persisted = ${isPersisted}`);
                aggLogger(managerWithFilters.manager);
                aggLogger(stateObj);
                managerWithFilters.manager._addItemToState(name, stateObj, isPersisted);
            }
        });
    }

    _removeItemFromState(name: string, stateObj: any, testForEqualityFunction: equalityFunction, isPersisted: boolean): void {
        this.stateManagers.forEach((managerWithFilters) => {
            if (!this.stateNameInFilters(name, managerWithFilters.filters)) {
                aggLogger(`removing item from state in state manager for state ${name}, is persisted = ${isPersisted}`);
                aggLogger(managerWithFilters.manager);
                aggLogger(stateObj);
                managerWithFilters.manager._removeItemFromState(name, stateObj, testForEqualityFunction, isPersisted);
            }
        });
    }

    _updateItemInState(name: string, stateObj: any, testForEqualityFunction: equalityFunction, isPersisted: boolean): void {
        this.stateManagers.forEach((managerWithFilters) => {
            if (!this.stateNameInFilters(name, managerWithFilters.filters)) {
                aggLogger(`updating item in state in  state manager for state ${name}`);
                aggLogger(managerWithFilters.manager);
                aggLogger(stateObj);
                managerWithFilters.manager._updateItemInState(name, stateObj, testForEqualityFunction, isPersisted);
            }
        });
    }

    private stateNameInFilters(name: string, filters: string[]): boolean {
        let foundIndex = filters.findIndex((filter) => filter === name);
        return (foundIndex >= 0);
    }
}