import {jsonRequest} from "./Types";
import {Poller} from "./Poller";
import {IndexedDBStateManager} from "../state/IndexedDBStateManager";
import {v4} from "uuid";
import {DownloadManager} from "./DownloadManager";
import {NotificationManager, NotificationType} from "../notification/NotificationManager";
import {StateChangeListener} from "../state/StateChangeListener";
import {AsynchronousStateManager} from "../state/AsynchronousStateManager";
import debug from "debug";

const logger = debug('offline-manager');

export class OfflineManager implements StateChangeListener {
    private static _instance: OfflineManager;
    private static DB_NAME = 'offline.manager.db';
    private static OBJECT_STORE = 'offline.manager.db.requests';
    private persistence: AsynchronousStateManager;

    constructor() {
        this.serverBackOnline = this.serverBackOnline.bind(this);
        const indexedDB = new IndexedDBStateManager();
        indexedDB.initialise(OfflineManager.DB_NAME, [{name: OfflineManager.OBJECT_STORE, keyField: '_id'}]);
        this.persistence = indexedDB;
        this.persistence.addChangeListenerForName(OfflineManager.OBJECT_STORE, this);
    }

    public static getInstance(): OfflineManager {
        if (!(OfflineManager._instance)) {
            OfflineManager._instance = new OfflineManager();
        }
        return OfflineManager._instance;
    }

    public processQueuedResults() {
        // find any requests in the persistence
        this.persistence.getStateByName(OfflineManager.OBJECT_STORE);
    }

    public serverBackOnline() {
        NotificationManager.getInstance().show('Server', 'Server is back online.');
        this.processQueuedResults();
    }

    public areWeOffline(): boolean {
        return Poller.getInstance().isPolling();
    }

    public addOfflineRequest(jsonRequest: jsonRequest) {
        if (!Poller.getInstance().isPolling()) {
            Poller.getInstance().startPolling(this.serverBackOnline);
            NotificationManager.getInstance().show('Server', 'Server is offline, queueing local changes for when server is available', NotificationType.warning);
        }
        // save the request with an id
        jsonRequest._id = v4();
        logger('Adding offline request');
        logger(jsonRequest);

        this.persistence.addNewItemToState(OfflineManager.OBJECT_STORE, jsonRequest, false);
    }

    getListenerName(): string {
        return "Offline manager";
    }

    stateChanged(managerName: string, name: string, offlineResults: any): void {
        if (offlineResults && offlineResults.length > 0) {
            NotificationManager.getInstance().show('Queued Changes', `There are ${offlineResults.length} queued changes, sending to server.`, NotificationType.warning);
            offlineResults.forEach((request: jsonRequest) => {
                this.persistence.removeItemFromState(OfflineManager.OBJECT_STORE, request, false);
                logger(`Processing offline request with priority and from offline`);
                logger(request);
                DownloadManager.getInstance().addApiRequest(request, true, true);
            });
        }
        this.persistence.forceResetForGet(OfflineManager.OBJECT_STORE);
    }

    stateChangedItemAdded(managerName: string, name: string, itemAdded: any): void {
    }

    stateChangedItemRemoved(managerName: string, name: string, itemRemoved: any): void {
    }

    stateChangedItemUpdated(managerName: string, name: string, itemUpdated: any, itemNewValue: any): void {
    }

    filterResults(managerName: string, name: string, filterResults: any): void {
    }


}