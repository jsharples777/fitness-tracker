import debug from 'debug';
import {IDBPDatabase, IDBPObjectStore, IDBPTransaction, openDB} from "idb";
import {AbstractStateManager} from "./AbstractStateManager";
import {equalityFunction} from "../util/EqualityFunctions";
import {stateValue} from "./StateManager";

const idLogger = debug('indexeddb-ts');

export type collection = {
    name: string,
    keyField: string
};

class IndexedDBStateManager extends AbstractStateManager {
    private static instance: IndexedDBStateManager;

    protected constructor() {
        super('indexeddb');
        idLogger(`Constructor`);
        this.forceSaves = false;
    }

    public static getInstance(): IndexedDBStateManager {
        if (!IndexedDBStateManager.instance) {
            IndexedDBStateManager.instance = new IndexedDBStateManager();
        }
        return IndexedDBStateManager.instance;
    }

    public async initialise(collections: collection[]) {
        await openDB('imboard-db', 1, {
            upgrade(db, oldVersion, newVersion, transaction) {
                collections.forEach((collection) => {
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

    public _ensureStatePresent(name: string): void {
    } // should be present with initialise

    public _addNewNamedStateToStorage(state: stateValue): void {
        let fn = async () => {
            await this.saveWithCollectionKey(state.name, state.value);
        };
        fn();
    }

    public _replaceNamedStateInStorage(state: stateValue): void {
        let fn = async () => {
            await this.removeAllItemsFromCollectionKey(state.name);
            await this.saveWithCollectionKey(state.name, state.value);
        }
        fn();
    }

    _addItemToState(name: string, stateObj: any, isPersisted: boolean = false): void {
        if (!isPersisted) return; // dont add incomplete objects to the state
        this.addNewItemToCollection(name, stateObj);
    }

    _removeItemFromState(name: string, stateObj: any, testForEqualityFunction: equalityFunction, isPersisted: boolean): void {
        this.removeItemFromCollection(name, stateObj);
    }

    _updateItemInState(name: string, stateObj: any, testForEqualityFunction: equalityFunction, isPersisted: boolean): void {
        this.updateItemInCollection(name, stateObj);
    }

    public _getState(name: string): stateValue {
        let state: stateValue = {
            name: name,
            value: []
        }
        let fn = async () => {
            state.value = await this.getWithCollectionKey(state.name);
        }
        return state;
    }

    public _saveState(name: string, stateObj: any): void {
        let fn = async () => {
            await this.removeAllItemsFromCollectionKey(name);
            await this.saveWithCollectionKey(name, stateObj);
        }
        fn();
    }

    public async saveWithCollectionKey(key: string, saveData: any[], keyField: string = 'id') {
        idLogger(`Saving with key ${key}`);
        idLogger(saveData);
        let db: IDBPDatabase = await openDB('imboard-db', 1,);
        await this.checkForObjectStore(db, key, keyField);
        // @ts-ignore
        let transaction: IDBPTransaction = db.transaction(key, "readwrite");
        // @ts-ignore
        let objectStore: IDBPObjectStore = transaction.store;
        // @ts-ignore
        await this.saveItemsToCollection(objectStore, saveData, keyField);
    }

    public async getWithCollectionKey(key: string, keyField: string = 'id'): Promise<any[]> {
        let savedResults: any[] = [];
        idLogger(`Loading with key ${key}`);
        let db: IDBPDatabase = await openDB('imboard-db', 1);
        await this.checkForObjectStore(db, key, keyField);

        // @ts-ignore
        let transaction: IDBPTransaction = db.transaction(key);
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


        return savedResults;
    }

    /* add a new item to the local storage if not already there */
    public async addNewItemToCollection(key: string, item: any, keyField: string = 'id') {
        if (item !== null) {
            idLogger(`Adding with key ${key}`);
            idLogger(item);
        }
        let db: IDBPDatabase = await openDB('imboard-db', 1);
        await this.checkForObjectStore(db, key, keyField);

        // @ts-ignore
        let transaction: IDBPTransaction = db.transaction(key, "readwrite");
        // @ts-ignore
        let objectStore: IDBPObjectStore = transaction.store;
        this.saveItemsToCollection(objectStore, [item], keyField);
    }

    public async removeItemFromCollection(key: string, item: any, keyField: string = 'id') {
        if (item !== null) {
            idLogger(`Removing with key ${key}`);
            idLogger(item);
            let db: IDBPDatabase = await openDB('imboard-db', 1);
            await this.checkForObjectStore(db, key, keyField);

            // @ts-ignore
            let transaction: IDBPTransaction = db.transaction(key, "readwrite");
            // @ts-ignore
            let objectStore: IDBPObjectStore = transaction.store;
            // @ts-ignore
            await objectStore.delete(item[keyField]);
            await transaction.done;

        }
    }

    public async updateItemInCollection(key: string, item: any, keyField: string = 'id') {
        if (item) {
            idLogger(`Updating item in storage ${key}`);
            idLogger(item);
            let db: IDBPDatabase = await openDB('imboard-db', 1);
            await this.checkForObjectStore(db, key, keyField);

            // @ts-ignore
            let transaction: IDBPTransaction = db.transaction(key, "readwrite");
            // @ts-ignore
            let objectStore: IDBPObjectStore = transaction.store;
            let previousItem: any = await objectStore.get(item[keyField]);
            if (previousItem) {
                // @ts-ignore
                await objectStore.put(item);
            } else {
                // @ts-ignore
                await objectStore.add(item);
            }
            await transaction.done;
        }
    }

    private async checkForObjectStore(db: IDBPDatabase, key: string, keyField: string) {
        if (!db.objectStoreNames.contains(key)) {
            // @ts-ignore
            await db.createObjectStore(key, {keyPath: keyField, autoIncrement: false});
        }
    }

    private async saveItemsToCollection(objectStore: IDBPObjectStore, saveData: any[], keyField: string = 'id') {
        saveData.forEach((data) => {
            // @ts-ignore
            objectStore.add(data);
        });
    }

    private async removeAllItemsFromCollectionKey(key: string, keyField: string = 'id') {
        idLogger(`Clearing collection ${key}`);
        let db: IDBPDatabase = await openDB('imboard-db', 1,);
        await this.checkForObjectStore(db, key, keyField);
        // @ts-ignore
        let transaction: IDBPTransaction = db.transaction(key, "readwrite");
        // @ts-ignore
        let objectStore: IDBPObjectStore = transaction.store;
        // @ts-ignore
        await objectStore.clear();
    }


}

export default IndexedDBStateManager;