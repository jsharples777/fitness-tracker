import {StateEventType, StateManagerType, StateValue} from "./StateManager";
import {jsonRequest, RequestType} from "../network/Types";
import {DownloadManager} from "../network/DownloadManager";
import debug from 'debug';
import {AsynchronousStateManager} from "./AsynchronousStateManager";
import {StateChangedDelegate} from "./StateChangedDelegate";
import {StateChangeInformer} from "./StateChangeInformer";
import {StateChangeListener} from "./StateChangeListener";
import {CallbackRegistry} from "../network/CallbackRegistry";
import {FilterItem} from "../CommonTypes";


/*
*
*   WORK IN PROGRESS
*
 */


const logger = debug('state-manager-graphql');

export type QLConfig = {
    stateName: string,
    serverURL: string,
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
    isActive: boolean,
    idField?: string
}

export class GraphQLApiStateManager implements AsynchronousStateManager {
    private static _instance: GraphQLApiStateManager;

    private static FUNCTION_ID_ADD_ITEM = 'graphql.api.state.manager.add.item';
    private static FUNCTION_ID_REMOVE_ITEM = 'graphql.api.state.manager.remove.item';
    private static FUNCTION_ID_UPDATE_ITEM = 'graphql.api.state.manager.update.item';
    private static FUNCTION_ID_GET_ITEMS = 'graphql.api.state.manager.get.items';
    private static FUNCTION_ID_FIND_ITEM = 'graphql.api.state.manager.find.item';
    protected configuration: QLConfig[] = [];
    protected bHasCompletedRun: boolean[];
    protected delegate: StateChangeInformer;

    protected constructor() {
        this.delegate = new StateChangedDelegate('graphql');
        this.emitEvents();
        this.bHasCompletedRun = [];

        this.callbackForAddItem = this.callbackForAddItem.bind(this);
        this.callbackForRemoveItem = this.callbackForRemoveItem.bind(this);
        this.callbackForUpdateItem = this.callbackForUpdateItem.bind(this);
        this.callbackForGetItems = this.callbackForGetItems.bind(this);
        this.callbackForFindItem = this.callbackForFindItem.bind(this);

        CallbackRegistry.getInstance().addRegisterCallback(GraphQLApiStateManager.FUNCTION_ID_ADD_ITEM, this.callbackForAddItem);
        CallbackRegistry.getInstance().addRegisterCallback(GraphQLApiStateManager.FUNCTION_ID_REMOVE_ITEM, this.callbackForRemoveItem);
        CallbackRegistry.getInstance().addRegisterCallback(GraphQLApiStateManager.FUNCTION_ID_UPDATE_ITEM, this.callbackForUpdateItem);
        CallbackRegistry.getInstance().addRegisterCallback(GraphQLApiStateManager.FUNCTION_ID_GET_ITEMS, this.callbackForGetItems);
        CallbackRegistry.getInstance().addRegisterCallback(GraphQLApiStateManager.FUNCTION_ID_FIND_ITEM, this.callbackForFindItem);
    }

    public static getInstance() {
        if (!(GraphQLApiStateManager._instance)) {
            GraphQLApiStateManager._instance = new GraphQLApiStateManager();
        }
        return GraphQLApiStateManager._instance;
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

    _addNewNamedStateToStorage(state: StateValue): void { /* assume model on the other end exists */
    }

    _getState(name: string): StateValue {
        logger(`Getting All ${name}`);
        if (this.hasCompletedRun(name)) {
            logger(`Getting All ${name} - not done - previously retrieved`);
        } else {
            let config: QLConfig = this.getConfigurationForStateName(name);
            if (config.isActive && (config.apis.findAll.trim().length > 0)) {
                let query = config.apis.findAll;
                const jsonRequest: jsonRequest = {
                    url: config.serverURL + config.apiURL,
                    type: RequestType.POST,
                    params: {query},
                    callbackId: GraphQLApiStateManager.FUNCTION_ID_GET_ITEMS,
                    associatedStateName: name
                };
                logger(`Getting All ${name} with query "${query}"`);
                DownloadManager.getInstance().addApiRequest(jsonRequest, true);

            } else {
                logger(`No configuration for state ${name}`);
            }
        }
        let state: StateValue = {name: name, value: []};
        return state;
    }

    _ensureStatePresent(name: string): void { /* assume state exists */
    }

    _replaceNamedStateInStorage(state: StateValue): void { /* not going to replace all state */
    }

    _saveState(name: string, stateObj: any): void { /* not going to replace all state */
    }

    _addItemToState(name: string, stateObj: any, isPersisted: boolean = false): void {
        if (isPersisted) return; // dont add complete objects to the state - they are already processed
        logger(`Adding item to ${name}`);
        logger(stateObj);
        let config: QLConfig = this.getConfigurationForStateName(name);
        if (config.isActive && (config.apis.create.trim().length > 0)) {
            DownloadManager.getInstance().addQLApiRequest(config.serverURL + config.apiURL, config.apis.create,
                {data: stateObj}, GraphQLApiStateManager.FUNCTION_ID_ADD_ITEM, name, false);

        } else {
            logger(`No configuration for state ${name}`);
        }
    }
    _findItemInState(name: string, stateObj: any): void {
        logger(`Finding item in ${name}`);
        logger(stateObj);
        let config: QLConfig = this.getConfigurationForStateName(name);
        if (config.isActive && (config.apis.find.trim().length > 0)) {
            let identifier = stateObj.id;
            if (config.idField) {
                identifier = stateObj[config.idField];
            }

            DownloadManager.getInstance().addQLApiRequest(config.serverURL + config.apiURL, config.apis.find,
                {identifier: identifier}, GraphQLApiStateManager.FUNCTION_ID_FIND_ITEM, name, true);

        } else {
            logger(`No configuration for state ${name}`);
        }
    }

    _removeItemFromState(name: string, stateObj: any, isPersisted: boolean): void {
        if (isPersisted) return; // dont remove complete objects to the state - they are already processed
        logger(`Removing item to ${name}`);
        logger(stateObj);
        let config: QLConfig = this.getConfigurationForStateName(name);
        if (config.isActive && (config.apis.destroy.trim().length > 0)) {
            let identifier = stateObj.id;
            if (config.idField) {
                identifier = stateObj[config.idField];
            }

            DownloadManager.getInstance().addQLApiRequest(config.serverURL + config.apiURL, config.apis.destroy,
                {identifier: identifier}, GraphQLApiStateManager.FUNCTION_ID_REMOVE_ITEM, name, false);

        } else {
            logger(`No configuration for state ${name}`);
        }
    }

    _updateItemInState(name: string, stateObj: any, isPersisted: boolean): void {
        if (isPersisted) return; // dont update complete objects to the state - they are already processed
        logger(`Updating item in ${name}`);
        logger(stateObj);
        let config: QLConfig = this.getConfigurationForStateName(name);
        if (config.isActive && (config.apis.update.trim().length > 0)) {
            DownloadManager.getInstance().addQLApiRequest(config.serverURL + config.apiURL, config.apis.update,
                {data: stateObj}, GraphQLApiStateManager.FUNCTION_ID_UPDATE_ITEM, name, false);

        } else {
            logger(`No configuration for state ${name}`);
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

    findItemInState(name: string, item: any): any {
        return this._findItemInState(name,item);
    }


    getStateByName(name: string): any {
        this._getState(name);
    }

    informChangeListenersForStateWithName(name: string, stateObjValue: any, eventType: StateEventType, previousObjValue: any): void {
        this.delegate.informChangeListenersForStateWithName(name, stateObjValue, eventType, previousObjValue);
    }

    isItemInState(name: string, item: any): boolean {
        return true;
    }

    removeItemFromState(name: string, item: any, isPersisted: boolean): boolean {
        this._removeItemFromState(name, item, isPersisted);
        return true;
    }

    setStateByName(name: string, stateObjectForName: any, informListeners: boolean): void {
    }

    suppressEvents(): void {
        this.delegate.suppressEvents();
    }

    updateItemInState(name: string, item: any, isPersisted: boolean): boolean {
        this._updateItemInState(name, item, isPersisted);
        return true;
    }

    _findItemsInState(name: string, filters: FilterItem[]): any[] {
        return [];
    }

    findItemsInState(name: string, filters: FilterItem[]): any[] {
        return [];
    }

    getType(): StateManagerType {
        return StateManagerType.AsyncRemote;
    }

    protected getConfigurationForStateName(name: string) {
        let config: QLConfig = {
            stateName: name,
            serverURL: '',
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
        logger(`callback for remove item for state ${associatedStateName} with status ${status} - not forwarded`);
        if (status >= 200 && status <= 299) { // do we have any data?

        }
        logger(data);
    }

    private callbackForUpdateItem(data: any, status: number, associatedStateName: string) {
        logger(`callback for update item for state ${associatedStateName} with status ${status} - not forwarded`);
        if (status >= 200 && status <= 299) { // do we have any data?

        }
        logger(data);
    }

    private callbackForGetItems(data: any, status: number, associatedStateName: string) {
        logger(`callback for get items for state ${associatedStateName} with status ${status} - FORWARDING`);
        if (status >= 200 && status <= 299) { // do we have any data?
            logger(data);
            let config: QLConfig = this.getConfigurationForStateName(associatedStateName);
            let dataAttribute = config.data.findAll;
            this.setCompletedRun(associatedStateName);
            this.delegate.informChangeListenersForStateWithName(associatedStateName, data.data[dataAttribute], StateEventType.StateChanged, null);
        }
    }

    private callbackForAddItem(data: any, status: number, associatedStateName: string, wasOffline?: boolean) {
        logger(`callback for add item for state ${associatedStateName} with status ${status} - FORWARDING`);
        let config: QLConfig = this.getConfigurationForStateName(associatedStateName);
        let dataAttribute = config.data.create;

        if (status >= 200 && status <= 299) { // do we have any data?
            logger(data);
            if (!wasOffline) {
                this.delegate.informChangeListenersForStateWithName(associatedStateName, data.data[dataAttribute], StateEventType.ItemAdded, null);
            } else {
                logger('Item was added offline, update the current data');
                this.delegate.informChangeListenersForStateWithName(associatedStateName, data.data[dataAttribute], StateEventType.ItemUpdated, null);
            }

        }
        // did the call fail? (server loss)
        if (status === 500) {
            logger(`Item adding - offline, but will be queued later`);
            this.delegate.informChangeListenersForStateWithName(associatedStateName, data.data[dataAttribute], StateEventType.ItemAdded, null);
        }
    }

    private callbackForFindItem(data: any, status: number, associatedStateName: string) {
        logger(`callback for find item for state ${associatedStateName} with status ${status} - FORWARDING`);
        if (status >= 200 && status <= 299) { // do we have any data?
            logger(data);
            this.delegate.informChangeListenersForStateWithName(associatedStateName, data, StateEventType.ItemAdded, null);
        }
    }
}
