import debug from 'debug';
import {AbstractStateManager, EqualityFnForName} from './AbstractStateManager';
import {StateValue} from "./StateManager";
import {equalityFunction} from "../CommonTypes";

const msManager = debug('state-manager-ms');

/** To Do - make state unchangeable outside of this class (i.e. deep copies) */
export class MemoryBufferStateManager extends AbstractStateManager {
    private static _instance: MemoryBufferStateManager;
    protected applicationState: StateValue[];

    public constructor(defaultEq: equalityFunction, equalFns: EqualityFnForName[] | null = null) {
        super('memory', defaultEq, equalFns);
        this.applicationState = [];
        this.forceSaves = true;
    }

    public _ensureStatePresent(name: string) {
        let foundIndex = this.applicationState.findIndex(element => element.name === name);
        if (foundIndex < 0) {
            let state: StateValue = {
                name: name,
                value: []
            };
            this.applicationState.push(state);
        }
    }

    public _addNewNamedStateToStorage(state: StateValue): void {
        msManager(`Adding new complete state ${name}`);
        msManager(state.value);
        this.applicationState.push(state);
    }

    public _replaceNamedStateInStorage(state: StateValue): void {
        let foundIndex: number = this.applicationState.findIndex(element => element.name === state.name);
        if (foundIndex >= 0) {
            msManager(`replacing complete state ${name}`);
            msManager(state.value);
            this.applicationState.splice(foundIndex, 1, state);
        }
    }

    public _getState(name: string): StateValue {
        // @ts-ignore
        let state: StateValue = this.applicationState.find(element => element.name === name);
        msManager(`getting complete state ${name}`);
        msManager(state.value);
        return state;
    }

    public _saveState(name: string, stateObject: any): void {
        let foundIndex: number = this.applicationState.findIndex(element => element.name === name);
        if (foundIndex >= 0) {
            let state: StateValue = this.applicationState[foundIndex];
            msManager(`SAVING complete state ${name}`);
            msManager(state.value);
            state.value = stateObject;
        }
    }

    _addItemToState(name: string, stateObj: any, isPersisted: boolean = false): void {
        if (!isPersisted) return; // dont add incomplete objects to the state
        let foundIndex: number = this.applicationState.findIndex(element => element.name === name);
        if (foundIndex >= 0) {
            let state: StateValue = this.applicationState[foundIndex];
            msManager(`adding item to state ${name}`);
            msManager(stateObj);
            state.value.push(stateObj);
        }
    }

    _removeItemFromState(name: string, stateObj: any, isPersisted: boolean): void {
        let foundIndex: number = this.applicationState.findIndex(element => element.name === name);
        if (foundIndex >= 0) {
            let state: StateValue = this.applicationState[foundIndex];
            const valueIndex = state.value.findIndex((element: any) => this.getEqualityFnForName(name)(element, stateObj));
            if (valueIndex >= 0) {
                msManager(`removing item from state ${name}`);
                msManager(stateObj);
                state.value.splice(valueIndex, 1);
            }
        }
    }

    _updateItemInState(name: string, stateObj: any, isPersisted: boolean): void {
        let foundIndex: number = this.applicationState.findIndex(element => element.name === name);
        if (foundIndex >= 0) {
            let state: StateValue = this.applicationState[foundIndex];
            const valueIndex = state.value.findIndex((element: any) => this.getEqualityFnForName(name)(element, stateObj));
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

