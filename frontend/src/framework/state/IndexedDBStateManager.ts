import debug from 'debug';
import {IDBPDatabase, IDBPObjectStore, IDBPTransaction, openDB} from "idb";
import {StateEventType, StateManagerType, StateValue} from "./StateManager";
import {AsynchronousStateManager} from "./AsynchronousStateManager";
import {StateChangeInformer} from "./StateChangeInformer";
import {StateChangedDelegate} from "./StateChangedDelegate";
import {StateChangeListener} from "./StateChangeListener";
import {FilterItem} from "../CommonTypes";

const logger = debug('indexeddb-ts');

export type collection = {
    name: string,
    keyField: string
};

export class IndexedDBStateManager implements AsynchronousStateManager {
    private static instance: IndexedDBStateManager;
    protected bHasCompletedRun: boolean[];
    protected delegate: StateChangeInformer;
    protected dbName: string;
    protected collections: collection[];

    public constructor() {
        this.dbName = 'default';
        this.delegate = new StateChangedDelegate('indexeddb');
        this.emitEvents();
        this.bHasCompletedRun = [];
        this.collections = [];

        this.callbackForAddItem = this.callbackForAddItem.bind(this);
        this.callbackForRemoveItem = this.callbackForRemoveItem.bind(this);
        this.callbackForUpdateItem = this.callbackForUpdateItem.bind(this);
        this.callbackForGetItems = this.callbackForGetItems.bind(this);


    }

    public static getInstance(): IndexedDBStateManager {
        if (!IndexedDBStateManager.instance) {
            IndexedDBStateManager.instance = new IndexedDBStateManager();
        }
        return IndexedDBStateManager.instance;
    }

    hasCompletedRun(stateName: string): boolean {
        let result = false;
        let foundIndex = this.collections.findIndex((collection) => collection.name === stateName);
        if (foundIndex >= 0) {
            result = this.bHasCompletedRun[foundIndex];
        }
        return result;
    }

    setCompletedRun(stateName: string): void {
        let foundIndex = this.collections.findIndex((collection) => collection.name === stateName);
        if (foundIndex >= 0) {
            this.bHasCompletedRun[foundIndex] = true;
        }
    }

    forceResetForGet(stateName: string): void {
        let foundIndex = this.collections.findIndex((collection) => collection.name === stateName);
        if (foundIndex >= 0) {
            this.bHasCompletedRun[foundIndex] = false;
        }
    }

    public async initialise(dbName: string, collections: collection[]) {
        logger(`opening database for ${dbName} with collections`);
        logger(collections);
        this.dbName = dbName;
        this.collections = collections;

        let runsComplete: boolean[] = [];
        this.collections.forEach((collection) => {
            runsComplete.push(false);
        });
        this.bHasCompletedRun = runsComplete;


        await openDB(dbName, 1, {
            upgrade(db, oldVersion, newVersion, transaction) {
                collections.forEach((collection) => {
                    logger(`creating collection for ${collection.name} with key ${collection.keyField}`)
                    db.createObjectStore(collection.name, {keyPath: collection.keyField, autoIncrement: false});
                });
            },
            blocked() {
                // …
            },
            blocking() {
                // …
            },
            terminated() {
                // …
            },
        });
    }

    public _addNewNamedStateToStorage(state: StateValue): void {
    }

    public _getState(name: string): StateValue {
        if (this.hasCompletedRun(name)) {
            logger(`Getting All ${name} - not done - previously retrieved`);
        } else {
            logger(`getting state ${name}`);
            this.getWithCollectionKey(name, this.getKeyFieldForKey(name));
        }
        let state: StateValue = {name: name, value: []};
        return state;
    }

    public _ensureStatePresent(name: string): void {
    } // should be present with initialise

    public _replaceNamedStateInStorage(state: StateValue): void {
        let fn = async () => {
            logger(`replacing item in storage ${state.name}`);
            logger(state.value);
            await this.removeAllItemsFromCollectionKey(state.name, this.getKeyFieldForKey(state.name));
            await this.saveWithCollectionKey(state.name, state.value, this.getKeyFieldForKey(state.name));
        }
        fn();
    }

    _addItemToState(name: string, stateObj: any, isPersisted: boolean = false): void {
        if (isPersisted) return;
        this.addNewItemToCollection(name, stateObj, this.getKeyFieldForKey(name));
    }

    _removeItemFromState(name: string, stateObj: any, isPersisted: boolean): void {
        if (isPersisted) return;
        this.removeItemFromCollection(name, stateObj, this.getKeyFieldForKey(name));
    }

    _updateItemInState(name: string, stateObj: any, isPersisted: boolean): void {
        if (isPersisted) return;
        this.updateItemInCollection(name, stateObj, this.getKeyFieldForKey(name));
    }

    public _saveState(name: string, stateObj: any): void {
        let fn = async () => {
            logger(`saving state ${name}`);
            await this.removeAllItemsFromCollectionKey(name, this.getKeyFieldForKey(name));
            await this.saveWithCollectionKey(name, stateObj, this.getKeyFieldForKey(name));
        }
        fn();
    }

    public async saveWithCollectionKey(key: string, saveData: any[], keyField: string = 'id') {
        logger(`Saving array with key ${key}`);
        logger(saveData);
        let db: IDBPDatabase = await openDB(this.dbName, 1,);
        // @ts-ignore
        let transaction: IDBPTransaction = db.transaction([key], "readwrite");
        transaction.oncomplete = function (ev) {
            logger('Success');
            logger(ev);
        };
        transaction.onerror = function (ev) {
            logger('Error');
            logger(ev);
        };
        // @ts-ignore
        let objectStore: IDBPObjectStore = transaction.store;
        // @ts-ignore
        await this.saveItemsToCollection(objectStore, saveData, keyField);
    }

    /* add a new item to the local storage if not already there */
    public async addNewItemToCollection(key: string, item: any, keyField: string = 'id') {
        if (item !== null) {
            logger(`Adding with key ${key}`);
            logger(item);
            let db: IDBPDatabase = await openDB(this.dbName, 1);

            // @ts-ignore
            let transaction: IDBPTransaction = db.transaction([key], "readwrite").objectStore(key).add(item);
            transaction.oncomplete = function (ev) {
                logger('Success');
                logger(ev);
            };
            transaction.onerror = function (ev) {
                logger('Error');
                logger(ev);
            };
            this.callbackForAddItem(item, key);
        }
    }

    public async removeItemFromCollection(key: string, item: any, keyField: string = 'id') {
        if (item !== null) {
            logger(`Removing with key ${key} item ${item[keyField]}`);
            logger(item);
            let db: IDBPDatabase = await openDB(this.dbName, 1);

            // @ts-ignore
            let transaction: IDBPTransaction = db.transaction([key], "readwrite").objectStore(key).delete(item[keyField]);
            transaction.oncomplete = function (ev) {
                logger('Success');
                logger(ev);
            };
            transaction.onerror = function (ev) {
                logger('Error');
                logger(ev);
            };
            await transaction.done;
            this.callbackForRemoveItem(item, key);

        }
    }

    public async updateItemInCollection(key: string, item: any, keyField: string = 'id') {
        if (item) {
            logger(`Updating item in storage ${key}`);
            logger(item);
            let db: IDBPDatabase = await openDB(this.dbName, 1);

            // @ts-ignore
            let transaction: IDBPTransaction = db.transaction([key], "readwrite").objectStore(key).put(item);
            transaction.oncomplete = function (ev) {
                logger('Success');
                logger(ev);
            };
            transaction.onerror = function (ev) {
                logger('Error');
                logger(ev);
            };
            // @ts-ignore
            await transaction.done;
            this.callbackForUpdateItem(item, key);
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
        throw Error("not implemented");
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
        logger(`Removing item from state ${name} is persisted ${isPersisted}`);
        logger(item);
        this._removeItemFromState(name, item, isPersisted);
        return true;
    }

    setStateByName(name: string, stateObjectForName: any, informListeners: boolean): void {
        this._replaceNamedStateInStorage({name: name, value: stateObjectForName});
        if (informListeners) this.delegate.informChangeListenersForStateWithName(name, stateObjectForName, StateEventType.StateChanged, null);
    }

    suppressEvents(): void {
        this.delegate.suppressEvents();
    }

    updateItemInState(name: string, item: any, isPersisted: boolean): boolean {
        this._updateItemInState(name, item, isPersisted);
        return true;
    }

    public async getWithCollectionKey(key: string, keyField: string = 'id') {
        let savedResults: any[] = [];
        logger(`Loading with key ${key}`);
        let db: IDBPDatabase = await openDB(this.dbName, 1);
        await this.checkForObjectStore(db, key, keyField);

        // @ts-ignore
        let transaction: IDBPTransaction = db.transaction([key]);
        // @ts-ignore
        let objectStore: IDBPObjectStore = transaction.store;
        // @ts-ignore
        let cursor: IDBPCursor = await objectStore.openCursor();

        while (cursor) {
            // @ts-ignore
            savedResults.push(cursor.value);
            // @ts-ignore
            cursor = await cursor.continue();
        }

        logger(savedResults);
        this.callbackForGetItems(savedResults, key);

    }

    getConfiguredStateNames(): string[] {
        let result: string[] = [];
        this.collections.forEach((collection) => {
            result.push(collection.name);
        })
        return result;
    }

    _findItemsInState(name: string, filters: FilterItem[]): any[] {
        return [];
    }

    findItemsInState(name: string, filters: FilterItem[]): any[] {
        return [];
    }

    getType(): StateManagerType {
        return StateManagerType.AsyncLocal;
    }

    protected getKeyFieldForKey(key: string): string {
        let result = '_id';
        const foundIndex = this.collections.findIndex((collection) => collection.name === key);
        if (foundIndex >= 0) {
            result = this.collections[foundIndex].keyField;
        }
        return result;
    }

    protected async checkForObjectStore(db: IDBPDatabase, key: string, keyField: string) {
        logger(`Checking for collection ${key}`);
        if (!db.objectStoreNames.contains(key)) {
            // @ts-ignore
            logger(`Checking for collection ${key} - NOT found, creating`);
            await db.createObjectStore(key, {keyPath: keyField, autoIncrement: false});
        }
    }

    protected async saveItemsToCollection(objectStore: IDBPObjectStore, saveData: any[], keyField: string = 'id') {
        logger(`Saving items to collection`);
        saveData.forEach((data) => {
            // @ts-ignore
            objectStore.add(data);
        });
    }

    protected async removeAllItemsFromCollectionKey(key: string, keyField: string = 'id') {
        logger(`Clearing collection ${key}`);
        let db: IDBPDatabase = await openDB(this.dbName, 1,);
        await this.checkForObjectStore(db, key, keyField);
        // @ts-ignore
        let transaction: IDBPTransaction = db.transaction([key], "readwrite");
        // @ts-ignore
        let objectStore: IDBPObjectStore = transaction.store;
        // @ts-ignore
        await objectStore.clear();
    }

    protected async callbackForRemoveItem(data: any, associatedStateName: string) {
        logger(`callback for remove item for state ${associatedStateName}  - not forwarded`);
        logger(data);
    }

    protected async callbackForUpdateItem(data: any, associatedStateName: string) {
        logger(`callback for update item for state ${associatedStateName}  - not forwarded`);
        logger(data);
    }

    protected callbackForGetItems(data: any, associatedStateName: string) {
        logger(`callback for get items for state ${associatedStateName} - FORWARDING`);
        logger(data);
        this.setCompletedRun(associatedStateName);
        this.delegate.informChangeListenersForStateWithName(associatedStateName, data, StateEventType.StateChanged, null);
    }

    protected async callbackForAddItem(data: any, associatedStateName: string) {
        logger(`callback for add item for state ${associatedStateName}  - FORWARDING`);
        logger(data);
        this.delegate.informChangeListenersForStateWithName(associatedStateName, data, StateEventType.ItemAdded, null);
    }

    _findItemInState(name: string, item: any): any {
    }


}

