import {v4} from 'uuid';
import {QueueListener} from "./QueueListener";
import {jsonRequest, managerRequest, queueType, RequestType} from "./Types";

import debug from 'debug';
import {CallbackRegistry} from "./CallbackRegistry";
import {OfflineManager} from "./OfflineManager";
import {ApiUtil} from "./ApiUtil";

const logger = debug('api-ts');

export class DownloadManager {
    private static _instance: DownloadManager;
    protected backgroundQueue: managerRequest[];
    protected priorityQueue: managerRequest[];
    protected inProgress: managerRequest[];
    protected backgroundChangeListener: QueueListener | null;
    protected priorityChangeListener: QueueListener | null;

    constructor() {
        this.backgroundQueue = [];
        this.priorityQueue = [];
        this.inProgress = [];
        this.backgroundChangeListener = null;
        this.priorityChangeListener = null;

        this.callbackForQueueRequest = this.callbackForQueueRequest.bind(this);
    }

    public static getInstance(): DownloadManager {
        if (!(DownloadManager._instance)) {
            DownloadManager._instance = new DownloadManager();
        }
        return DownloadManager._instance;
    }

    public processOfflineItems() {
        logger(`Checking for offline items`);
        OfflineManager.getInstance().processQueuedResults();
    }

    public setBackgroundChangeListener(uiChangeListener: QueueListener) {
        this.backgroundChangeListener = uiChangeListener;
    }

    public setPriorityChangeListener(uiChangeListener: QueueListener) {
        this.priorityChangeListener = uiChangeListener;
    }

    public getPriorityQueueCount() {
        return this.priorityQueue.length;
    }

    public getBackgroundQueueCount() {
        return this.backgroundQueue.length;
    }

    public addQLApiRequest(url: string, query: string, variables: any, callbackId: string, state: string, isPriority = false) {
        let request: jsonRequest = {
            url: url,
            type: RequestType.POST,
            params: {query: query, variables: variables},
            callbackId: callbackId,
            associatedStateName: state
        }

        this.addApiRequest(request, isPriority);
    }

    public addQLMutationRequest(url: string, mutation: string, variables: any, callbackId: string, state: string, isPriority = false) {
        let request: jsonRequest = {
            url: url,
            type: RequestType.POST,
            params: {mutation: mutation, variables: variables},
            callbackId: callbackId,
            associatedStateName: state
        }

        this.addApiRequest(request, isPriority);
    }

    public async addApiRequest(jsonRequest: jsonRequest, isPriority = false, wasOffline: boolean = false) {
        // add a new requestId to the request for future tracking
        const requestId = v4();
        logger(`Adding Queue Request ${requestId}`);
        logger(jsonRequest);

        // are we currently offline?
        if (OfflineManager.getInstance().areWeOffline()) {
            logger(`We are offline, queueing request for when server back online.`);
            OfflineManager.getInstance().addOfflineRequest(jsonRequest);
            // let the callback function know, with a custom code to let the receiver know there was a problem
            CallbackRegistry.getInstance().getCallbackById(jsonRequest.callbackId)(jsonRequest.params, 500, jsonRequest.associatedStateName, false);
            return;
        }

        // we are online (hopefully), continue for now, we will catch offline errors later
        if (isPriority) {
            let managerRequest: managerRequest = {
                originalRequest: jsonRequest,
                requestId: requestId,
                queueType: queueType.PRIORITY,
                callback: this.callbackForQueueRequest,
                wasOffline: wasOffline
            }
            this.priorityQueue.push(managerRequest);
            if (this.priorityChangeListener) this.priorityChangeListener.handleEventAddToQueue();
        } else {
            let managerRequest: managerRequest = {
                originalRequest: jsonRequest,
                requestId: requestId,
                queueType: queueType.BACKGROUND,
                callback: this.callbackForQueueRequest,
                wasOffline: wasOffline
            }
            this.backgroundQueue.push(managerRequest);
            if (this.backgroundChangeListener) this.backgroundChangeListener.handleEventAddToQueue();
        }
        this.processQueues();
    }

    private async processPriorityQueue() {
        const queueItem: managerRequest | undefined = this.priorityQueue.shift();
        if (queueItem !== undefined) this.inProgress.push(queueItem);
        if (queueItem !== undefined) this.initiateFetchForQueueItem(queueItem);
    }

    private async processBackgroundQueue() {
        const queueItem: managerRequest | undefined = this.backgroundQueue.shift();
        if (queueItem !== undefined) this.inProgress.push(queueItem);
        if (queueItem !== undefined) this.initiateFetchForQueueItem(queueItem);
    }

    private async processQueues() {
        let totalQueuedItems = this.priorityQueue.length + this.backgroundQueue.length;
        while (totalQueuedItems > 0) {
            logger(`processing queue, items remaining ${totalQueuedItems}`);
            // priority queue takes priority
            if (this.priorityQueue.length > 0) {
                await this.processPriorityQueue();
            } else if (this.backgroundQueue.length > 0) {
                await this.processBackgroundQueue();
            }
            totalQueuedItems = this.priorityQueue.length + this.backgroundQueue.length;
        }
    }

    private callbackForQueueRequest(jsonData: any, httpStatus: number, queueId: number, requestId: string) {
        // let the listeners know about the completion
        if (queueId === queueType.PRIORITY) { // priority
            if (this.priorityChangeListener) this.priorityChangeListener.handleEventRemoveFromQueue();
        } else if (this.backgroundChangeListener) this.backgroundChangeListener.handleEventRemoveFromQueue();

        logger(`received callback for queue ${queueId} request ${requestId} with status ${httpStatus}`);
        // find the item in the in progress
        const foundIndex = this.inProgress.findIndex(element => element.requestId === requestId);
        if (foundIndex >= 0) {
            // remove from in progress
            const queueItem = this.inProgress[foundIndex];
            this.inProgress.splice(foundIndex, 1);
            logger(queueItem);

            // are we offline http status of 500
            if (httpStatus === 500) {
                logger(`queue item ${queueItem.requestId} - server offline, queueing for later`);
                OfflineManager.getInstance().addOfflineRequest(queueItem.originalRequest);
                // let the callback function know, with a custom code to let the receiver know there was a problem
                CallbackRegistry.getInstance().getCallbackById(queueItem.originalRequest.callbackId)(queueItem.originalRequest.params, httpStatus, queueItem.originalRequest.associatedStateName, queueItem.wasOffline);
            } else {
                logger(`finished for queue item ${queueItem.requestId} with possible offline id of ${queueItem.originalRequest._id}`);
                // let the callback function know
                CallbackRegistry.getInstance().getCallbackById(queueItem.originalRequest.callbackId)(jsonData, httpStatus, queueItem.originalRequest.associatedStateName, queueItem.wasOffline);
            }
        }
    }

    private initiateFetchForQueueItem(item: managerRequest) {
        logger(`Download Manager: initiating fetch for queue item ${item.requestId}`);
        logger(item);
        switch (item.originalRequest.type) {
            case RequestType.POST: {
                ApiUtil.getInstance().apiFetchJSONWithPost(item);
                break;
            }
            case RequestType.GET: {
                ApiUtil.getInstance().apiFetchJSONWithGet(item);
                break;
            }
            case RequestType.DELETE: {
                ApiUtil.getInstance().apiFetchJSONWithDelete(item);
                break;
            }
            case RequestType.PUT: {
                ApiUtil.getInstance().apiFetchJSONWithPut(item);
                break;
            }
        }
    }
}

