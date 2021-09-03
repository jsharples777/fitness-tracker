import debug from 'debug';
import {AbstractStateManager} from './AbstractStateManager';
import {equalityFunction} from "../util/EqualityFunctions";
import {stateValue} from "./StateManager";

const msManager = debug('state-manager-ms');

/** To Do - make state unchangeable outside of this class (i.e. deep copies) */
class MemoryBufferStateManager extends AbstractStateManager {
    private static _instance: MemoryBufferStateManager;
    protected applicationState: stateValue[];

    public constructor() {
        super('memory');
        this.applicationState = [];
        this.forceSaves = true;
    }

    public static getInstance() {
        if (!(MemoryBufferStateManager._instance)) {
            MemoryBufferStateManager._instance = new MemoryBufferStateManager();
        }
        return MemoryBufferStateManager._instance;
    }

    public _ensureStatePresent(name: string) {
        let foundIndex = this.applicationState.findIndex(element => element.name === name);
        if (foundIndex < 0) {
            let state: stateValue = {
                name: name,
                value: []
            };
            this.applicationState.push(state);
        }
    }

    public _addNewNamedStateToStorage(state: stateValue): void {
        msManager(`Adding new complete state ${name}`);
        msManager(state.value);
        this.applicationState.push(state);
    }

    public _replaceNamedStateInStorage(state: stateValue): void {
        let foundIndex: number = this.applicationState.findIndex(element => element.name === state.name);
        if (foundIndex >= 0) {
            msManager(`replacing complete state ${name}`);
            msManager(state.value);
            this.applicationState.splice(foundIndex, 1, state);
        }
    }

    public _getState(name: string): stateValue {
        // @ts-ignore
        let state: stateValue = this.applicationState.find(element => element.name === name);
        msManager(`getting complete state ${name}`);
        msManager(state.value);
        return state;
    }

    public _saveState(name: string, stateObject: any): void {
        let foundIndex: number = this.applicationState.findIndex(element => element.name === name);
        if (foundIndex >= 0) {
            let state: stateValue = this.applicationState[foundIndex];
            msManager(`SAVING complete state ${name}`);
            msManager(state.value);
            state.value = stateObject;
        }
    }

    _addItemToState(name: string, stateObj: any, isPersisted: boolean = false): void {
        if (!isPersisted) return; // dont add incomplete objects to the state
        let foundIndex: number = this.applicationState.findIndex(element => element.name === name);
        if (foundIndex >= 0) {
            let state: stateValue = this.applicationState[foundIndex];
            msManager(`adding item to state ${name}`);
            msManager(stateObj);
            state.value.push(stateObj);
        }
    }

    _removeItemFromState(name: string, stateObj: any, testForEqualityFunction: equalityFunction, isPersisted: boolean): void {
        let foundIndex: number = this.applicationState.findIndex(element => element.name === name);
        if (foundIndex >= 0) {
            let state: stateValue = this.applicationState[foundIndex];
            const valueIndex = state.value.findIndex((element: any) => testForEqualityFunction(element, stateObj));
            if (valueIndex >= 0) {
                msManager(`removing item from state ${name}`);
                msManager(stateObj);
                state.value.splice(valueIndex, 1);
            }
        }
    }

    _updateItemInState(name: string, stateObj: any, testForEqualityFunction: equalityFunction, isPersisted: boolean): void {
        let foundIndex: number = this.applicationState.findIndex(element => element.name === name);
        if (foundIndex >= 0) {
            let state: stateValue = this.applicationState[foundIndex];
            const valueIndex = state.value.findIndex((element: any) => testForEqualityFunction(element, stateObj));
            if (valueIndex >= 0) {
                state.value.splice(valueIndex, 1, stateObj);
                msManager(`updating item in state ${name}`);
                msManager(stateObj);
            }
        } else {
            this._addItemToState(name, stateObj, true);
        }
    }

}

export default MemoryBufferStateManager;
