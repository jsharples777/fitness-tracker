import {stateEventType, stateValue} from "./StateManager";
import {equalityFunction} from "../util/EqualityFunctions";
import {jsonRequest, RequestType} from "../network/Types";
import DownloadManager from "../network/DownloadManager";
import debug from 'debug';
import AsynchronousStateManager from "./AsynchronousStateManager";
import StateChangedDelegate from "./StateChangedDelegate";
import {StateChangeInformer} from "./StateChangeInformer";
import StateChangeListener from "./StateChangeListener";


/*
*
*   WORK IN PROGRESS
*
 */


const graphSMLogger = debug('state-manager-graphql');

export type QLConfig = {
    stateName: string,
    apiURL: string,
    apis: {
        findAll: string,
        create: string,
        destroy: string,
        update: string,
        find: string
    }
    data: {
        findAll: string,
        create: string,
        destroy: string,
        update: string,
        find: string
    }
    isActive: boolean
}

export class GraphQLApiStateManager implements AsynchronousStateManager {
    protected configuration: QLConfig[] = [];
    protected bHasCompletedRun: boolean[];
    protected delegate: StateChangeInformer;

    public constructor() {
        this.delegate = new StateChangedDelegate('graphql');
        this.emitEvents();
        this.bHasCompletedRun = [];


        this.callbackForAddItem = this.callbackForAddItem.bind(this);
        this.callbackForRemoveItem = this.callbackForRemoveItem.bind(this);
        this.callbackForUpdateItem = this.callbackForUpdateItem.bind(this);
        this.callbackForGetItems = this.callbackForGetItems.bind(this);
    }

    getConfiguredStateNames(): string[] {
        let results: string[] = [];
        this.configuration.forEach((config) => {
            results.push(config.stateName);
        });
        return results;
    }

    hasCompletedRun(stateName: string): boolean {
        let result = false;
        let foundIndex = this.configuration.findIndex((config) => config.stateName === stateName);
        if (foundIndex >= 0) {
            result = this.bHasCompletedRun[foundIndex];
        }
        return result;
    }

    setCompletedRun(stateName: string): void {
        let foundIndex = this.configuration.findIndex((config) => config.stateName === stateName);
        if (foundIndex >= 0) {
            this.bHasCompletedRun[foundIndex] = true;
        }
    }

    forceResetForGet(stateName: string): void {
        let foundIndex = this.configuration.findIndex((config) => config.stateName === stateName);
        if (foundIndex >= 0) {
            this.bHasCompletedRun[foundIndex] = false;
        }
    }

    public initialise(config: QLConfig[]) {
        this.configuration = config;
        let runsComplete: boolean[] = [];
        this.configuration.forEach((configItem) => {
            runsComplete.push(false);
        });
        this.bHasCompletedRun = runsComplete;
    }

    _addNewNamedStateToStorage(state: stateValue): void { /* assume model on the other end exists */
    }

    _getState(name: string): stateValue {
        graphSMLogger(`Getting All ${name}`);
        if (this.hasCompletedRun(name)) {
            graphSMLogger(`Getting All ${name} - not done - previously retrieved`);
        } else {
            let config: QLConfig = this.getConfigurationForStateName(name);
            if (config.isActive) {
                let query = config.apis.findAll;
                const jsonRequest: jsonRequest = {
                    url: config.apiURL,
                    type: RequestType.POST,
                    params: {query},
                    callback: this.callbackForGetItems,
                    associatedStateName: name
                };
                graphSMLogger(`Getting All ${name} with query "${query}"`);
                DownloadManager.getInstance().addApiRequest(jsonRequest, true);

            } else {
                graphSMLogger(`No configuration for state ${name}`);
            }
        }
        let state: stateValue = {name: name, value: []};
        return state;
    }

    _ensureStatePresent(name: string): void { /* assume state exists */
    }

    _replaceNamedStateInStorage(state: stateValue): void { /* not going to replace all state */
    }

    _saveState(name: string, stateObj: any): void { /* not going to replace all state */
    }

    _addItemToState(name: string, stateObj: any, isPersisted: boolean = false): void {
        if (isPersisted) return; // dont add complete objects to the state - they are already processed
        graphSMLogger(`Adding item to ${name}`);
        graphSMLogger(stateObj);
        let config: QLConfig = this.getConfigurationForStateName(name);
        if (config.isActive) {
            let mutation: any = {};
            mutation[config.apis.create] = {}

            const jsonRequest: jsonRequest = {
                url: config.apiURL,
                type: RequestType.POST,
                params: {mutation},
                callback: this.callbackForAddItem,
                associatedStateName: name
            };
            DownloadManager.getInstance().addApiRequest(jsonRequest, true);

        } else {
            graphSMLogger(`No configuration for state ${name}`);
        }
    }

    _removeItemFromState(name: string, stateObj: any, testForEqualityFunction: equalityFunction, isPersisted: boolean): void {
        if (isPersisted) return; // dont remove complete objects to the state - they are already processed
        graphSMLogger(`Removing item to ${name}`);
        graphSMLogger(stateObj);
        let config: QLConfig = this.getConfigurationForStateName(name);
        if (config.isActive) {
            let mutation: any = {};
            mutation[config.apis.destroy] = {}

            const jsonRequest: jsonRequest = {
                url: config.apiURL,
                type: RequestType.POST,
                params: {mutation},
                callback: this.callbackForRemoveItem,
                associatedStateName: name
            };
            DownloadManager.getInstance().addApiRequest(jsonRequest, true);

        } else {
            graphSMLogger(`No configuration for state ${name}`);
        }
    }

    _updateItemInState(name: string, stateObj: any, testForEqualityFunction: equalityFunction, isPersisted: boolean): void {
        if (isPersisted) return; // dont update complete objects to the state - they are already processed
        graphSMLogger(`Updating item in ${name}`);
        graphSMLogger(stateObj);
        let config: QLConfig = this.getConfigurationForStateName(name);
        if (config.isActive) {
            let mutation: any = {};
            mutation[config.apis.destroy] = {}

            const jsonRequest: jsonRequest = {
                url: config.apiURL,
                type: RequestType.POST,
                params: {mutation},
                callback: this.callbackForUpdateItem,
                associatedStateName: name
            };
            DownloadManager.getInstance().addApiRequest(jsonRequest, true);

        } else {
            graphSMLogger(`No configuration for state ${name}`);
        }
    }

    addChangeListenerForName(name: string, listener: StateChangeListener): void {
        this.delegate.addChangeListenerForName(name, listener);
    }

    addNewItemToState(name: string, item: any, isPersisted: boolean): void {
        this._addItemToState(name, item, isPersisted);
    }

    emitEvents(): void {
        this.delegate.emitEvents();
    }

    findItemInState(name: string, item: any, testForEqualityFunction: equalityFunction): any {
        throw Error("not implemented");
    }

    getStateByName(name: string): any {
        this._getState(name);
    }

    informChangeListenersForStateWithName(name: string, stateObjValue: any, eventType: stateEventType, previousObjValue: any): void {
        this.delegate.informChangeListenersForStateWithName(name, stateObjValue, eventType, previousObjValue);
    }

    isItemInState(name: string, item: any, testForEqualityFunction: equalityFunction): boolean {
        return true;
    }

    removeItemFromState(name: string, item: any, testForEqualityFunction: equalityFunction, isPersisted: boolean): boolean {
        this._removeItemFromState(name, item, testForEqualityFunction, isPersisted);
        return true;
    }

    setStateByName(name: string, stateObjectForName: any, informListeners: boolean): void {
    }

    suppressEvents(): void {
        this.delegate.suppressEvents();
    }

    updateItemInState(name: string, item: any, testForEqualityFunction: equalityFunction, isPersisted: boolean): boolean {
        this._updateItemInState(name, item, testForEqualityFunction, isPersisted);
        return true;
    }

    protected getConfigurationForStateName(name: string) {
        let config: QLConfig = {
            stateName: name,
            apiURL: '/graphql',
            apis: {
                findAll: '',
                create: '',
                destroy: '',
                update: '',
                find: ''
            },
            data: {
                findAll: '',
                create: '',
                destroy: '',
                update: '',
                find: ''
            },
            isActive: false
        }
        let foundIndex = this.configuration.findIndex((config) => config.stateName === name);
        if (foundIndex >= 0) {
            config = this.configuration[foundIndex];
        }
        return config;
    }

    private callbackForRemoveItem(data: any, status: number, associatedStateName: string) {
        graphSMLogger(`callback for remove item for state ${associatedStateName} with status ${status} - not forwarded`);
        if (status >= 200 && status <= 299) { // do we have any data?
            graphSMLogger(data);
        }
    }

    private callbackForUpdateItem(data: any, status: number, associatedStateName: string) {
        graphSMLogger(`callback for update item for state ${associatedStateName} with status ${status} - not forwarded`);
        if (status >= 200 && status <= 299) { // do we have any data?
            graphSMLogger(data);
        }
    }

    private callbackForGetItems(data: any, status: number, associatedStateName: string) {
        graphSMLogger(`callback for get items for state ${associatedStateName} with status ${status} - FORWARDING`);
        if (status >= 200 && status <= 299) { // do we have any data?
            graphSMLogger(data);
            let config: QLConfig = this.getConfigurationForStateName(associatedStateName);
            let dataAttribute = config.data.findAll;
            this.setCompletedRun(associatedStateName);
            this.delegate.informChangeListenersForStateWithName(associatedStateName, data.data[dataAttribute], stateEventType.StateChanged, null);
        }
    }

    private callbackForAddItem(data: any, status: number, associatedStateName: string) {
        graphSMLogger(`callback for add item for state ${associatedStateName} with status ${status} - FORWARDING`);
        if (status >= 200 && status <= 299) { // do we have any data?
            graphSMLogger(data);
            this.delegate.informChangeListenersForStateWithName(associatedStateName, data, stateEventType.ItemAdded, null);
        }
    }
}