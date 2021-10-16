import debug from 'debug';
import {IDBPDatabase, IDBPObjectStore, IDBPTransaction, openDB} from "idb";
import {IndexedDBStateManager} from "./IndexedDBStateManager";
import {SecurityManager} from "../security/SecurityManager";
import {StateEventType} from "./StateManager";

const logger = debug('indexeddb-ts-encrypted');

export type collection = {
    name: string,
    keyField: string
};

export class EncryptedIndexedDBStateManager extends IndexedDBStateManager {
    public constructor() {
        super();
        this.initialise = this.initialise.bind(this);
    }


    public async initialise(dbName: string, collections: collection[]) {
        logger(`opening encrypted database for ${dbName} with collections`);
        const username = SecurityManager.getInstance().getLoggedInUsername();
        this.dbName = `${username}.${dbName}`;
        super.initialise(this.dbName, collections);
    }


    /* add a new item to the local storage if not already there */
    public async addNewItemToCollection(key: string, item: any, keyField: string = 'id') {
        if (item !== null) {
            let encrypted = {}
            // @ts-ignore
            encrypted[keyField] = item[keyField];
            // @ts-ignore
            encrypted.data = SecurityManager.getInstance().encryptObject(item);
            logger(encrypted);

            super.addNewItemToCollection(key, encrypted, keyField);
        }
    }


    public async updateItemInCollection(key: string, item: any, keyField: string = 'id') {
        if (item) {
            let encrypted = {}
            // @ts-ignore
            encrypted[keyField] = item[keyField];
            // @ts-ignore
            encrypted.data = SecurityManager.getInstance().encryptObject(item);
            logger(encrypted);

            super.updateItemInCollection(key, encrypted, keyField);
        }
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
            let item = SecurityManager.getInstance().decryptObject(cursor.value.data);
            logger(item);
            // @ts-ignore
            savedResults.push(item);
            // @ts-ignore
            cursor = await cursor.continue();
        }

        logger(savedResults);
        this.callbackForGetItems(savedResults, key);
    }

    protected async callbackForAddItem(data: any, associatedStateName: string) {
        logger(`callback for add encrypted item for state ${associatedStateName}  - FORWARDING`);
        let decryptedItem = SecurityManager.getInstance().decryptObject(data.data);
        logger(decryptedItem);
        this.delegate.informChangeListenersForStateWithName(associatedStateName, decryptedItem, StateEventType.ItemAdded, null);
    }

}

