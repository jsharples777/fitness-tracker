import {stateEventType, stateValue} from "./StateManager";
import {equalityFunction} from "../util/EqualityFunctions";
import {jsonRequest, RequestType} from "../network/Types";
import downloader from "../network/DownloadManager";
import debug from 'debug';
import AsynchronousStateManager from "./AsynchronousStateManager";
import StateChangedDelegate from "./StateChangedDelegate";
import {StateChangeInformer} from "./StateChangeInformer";
import StateChangeListener from "./StateChangeListener";


const apiSMLogger = debug('state-manager-api');

type ApiConfig = {
    stateName: string,
    serverURL: string,
    api: string
    isActive: boolean
}

export class RESTApiStateManager implements AsynchronousStateManager {
    private static _instance: RESTApiStateManager;
    protected configuration: ApiConfig[] = [];
    protected bHasCompletedRun: boolean[];
    protected delegate: StateChangeInformer;

    protected constructor() {
        this.delegate = new StateChangedDelegate('restapi');
        this.emitEvents();
        this.bHasCompletedRun = [];


        this.callbackForAddItem = this.callbackForAddItem.bind(this);
        this.callbackForRemoveItem = this.callbackForRemoveItem.bind(this);
        this.callbackForUpdateItem = this.callbackForUpdateItem.bind(this);
        this.callbackForGetItems = this.callbackForGetItems.bind(this);
    }

    public static getInstance() {
        if (!(RESTApiStateManager._instance)) {
            RESTApiStateManager._instance = new RESTApiStateManager();
        }
        return RESTApiStateManager._instance;
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

    public initialise(config: ApiConfig[]) {
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
        apiSMLogger(`Getting All ${name}`);
        if (this.hasCompletedRun(name)) {
            apiSMLogger(`Getting All ${name} - not done - previously retrieved`);
        } else {
            let config: ApiConfig = this.getConfigurationForStateName(name);
            if (config.isActive) {
                const jsonRequest: jsonRequest = {
                    url: config.serverURL + config.api,
                    type: RequestType.GET,
                    params: {},
                    callback: this.callbackForGetItems,
                    associatedStateName: name
                };
                downloader.addApiRequest(jsonRequest, true);

            } else {
                apiSMLogger(`No configuration for state ${name}`);
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
        apiSMLogger(`Adding item to ${name}`);
        apiSMLogger(stateObj);
        let config: ApiConfig = this.getConfigurationForStateName(name);
        if (config.isActive) {
            const jsonRequest: jsonRequest = {
                url: config.serverURL + config.api,
                type: RequestType.POST,
                params: stateObj,
                callback: this.callbackForAddItem,
                associatedStateName: name
            };
            downloader.addApiRequest(jsonRequest, true);

        } else {
            apiSMLogger(`No configuration for state ${name}`);
        }
    }

    _removeItemFromState(name: string, stateObj: any, testForEqualityFunction: equalityFunction, isPersisted: boolean): void {
        if (isPersisted) return; // dont remove complete objects to the state - they are already processed
        apiSMLogger(`Removing item to ${name}`);
        apiSMLogger(stateObj);
        let config: ApiConfig = this.getConfigurationForStateName(name);
        if (config.isActive) {
            const jsonRequest: jsonRequest = {
                url: config.serverURL + config.api,
                type: RequestType.DELETE,
                params: {
                    id: stateObj.id
                },
                callback: this.callbackForRemoveItem,
                associatedStateName: name
            };
            downloader.addApiRequest(jsonRequest, true);

        } else {
            apiSMLogger(`No configuration for state ${name}`);
        }
    }

    _updateItemInState(name: string, stateObj: any, testForEqualityFunction: equalityFunction, isPersisted: boolean): void {
        if (isPersisted) return; // dont update complete objects to the state - they are already processed
        apiSMLogger(`Updating item in ${name}`);
        apiSMLogger(stateObj);
        let config: ApiConfig = this.getConfigurationForStateName(name);
        if (config.isActive) {
            const jsonRequest: jsonRequest = {
                url: config.serverURL + config.api,
                type: RequestType.PUT,
                params: stateObj,
                callback: this.callbackForUpdateItem,
                associatedStateName: name
            };
            downloader.addApiRequest(jsonRequest, true);

        } else {
            apiSMLogger(`No configuration for state ${name}`);
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
        let config: ApiConfig = {
            stateName: name,
            serverURL: '',
            api: '',
            isActive: false
        }
        let foundIndex = this.configuration.findIndex((config) => config.stateName === name);
        if (foundIndex >= 0) {
            config = this.configuration[foundIndex];
        }
        return config;
    }

    private callbackForRemoveItem(data: any, status: number, associatedStateName: string) {
        apiSMLogger(`callback for remove item for state ${associatedStateName} with status ${status} - not forwarded`);
        if (status >= 200 && status <= 299) { // do we have any data?
            apiSMLogger(data);
        }
    }

    private callbackForUpdateItem(data: any, status: number, associatedStateName: string) {
        apiSMLogger(`callback for update item for state ${associatedStateName} with status ${status} - not forwarded`);
        if (status >= 200 && status <= 299) { // do we have any data?
            apiSMLogger(data);
        }
    }

    private callbackForGetItems(data: any, status: number, associatedStateName: string) {
        apiSMLogger(`callback for get items for state ${associatedStateName} with status ${status} - FORWARDING`);
        if (status >= 200 && status <= 299) { // do we have any data?
            apiSMLogger(data);
            this.setCompletedRun(associatedStateName);
            this.delegate.informChangeListenersForStateWithName(associatedStateName, data, stateEventType.StateChanged, null);
        }
    }

    private callbackForAddItem(data: any, status: number, associatedStateName: string) {
        apiSMLogger(`callback for add item for state ${associatedStateName} with status ${status} - FORWARDING`);
        if (status >= 200 && status <= 299) { // do we have any data?
            apiSMLogger(data);
            this.delegate.informChangeListenersForStateWithName(associatedStateName, data, stateEventType.ItemAdded, null);
        }
    }
}