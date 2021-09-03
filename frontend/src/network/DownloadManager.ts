import apiUtil from './ApiUtil';
import uuid from '../util/UUID';
import QueueListener from "./QueueListener";
import {jsonRequest, managerRequest, queueType, RequestCallBackFunction, RequestType} from "./Types";

import debug from 'debug';

const dlLogger = debug('api-ts');

class DownloadManager {
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

    public addQLApiRequest(url: string, query: string, variables: any, callback: RequestCallBackFunction, state: string, isPriority = false) {
        let request: jsonRequest = {
            url: url,
            type: RequestType.POST,
            params: {query: query, variables: variables},
            callback: callback,
            associatedStateName: state
        }

        downloader.addApiRequest(request, isPriority);
    }

    public addQLMutationRequest(url: string, mutation: string, variables: any, callback: RequestCallBackFunction, state: string, isPriority = false) {
        let request: jsonRequest = {
            url: url,
            type: RequestType.POST,
            params: {mutation: mutation, variables: variables},
            callback: callback,
            associatedStateName: state
        }

        downloader.addApiRequest(request, isPriority);
    }

    public addApiRequest(jsonRequest: jsonRequest, isPriority = false) {
        // add a new requestId to the request for future tracking
        const requestId = uuid.getUniqueId();
        dlLogger(`Download Manger: Adding Queue Request ${requestId}`);
        dlLogger(jsonRequest, 200);

        if (isPriority) {
            let managerRequest: managerRequest = {
                originalRequest: jsonRequest,
                requestId: requestId,
                queueType: queueType.PRIORITY,
                callback: this.callbackForQueueRequest,
            }
            this.priorityQueue.push(managerRequest);
            if (this.priorityChangeListener) this.priorityChangeListener.handleEventAddToQueue();
        } else {
            let managerRequest: managerRequest = {
                originalRequest: jsonRequest,
                requestId: requestId,
                queueType: queueType.BACKGROUND,
                callback: this.callbackForQueueRequest,
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
            dlLogger(`Download Manager: processing queue, items remaining ${totalQueuedItems}`);
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

        dlLogger(`Download Manager: received callback for queue ${queueId} request ${requestId} with status ${httpStatus}`);
        // find the item in the in progress
        const foundIndex = this.inProgress.findIndex(element => element.requestId === requestId);
        if (foundIndex >= 0) {
            // remove from in progress
            const queueItem = this.inProgress[foundIndex];
            this.inProgress.splice(foundIndex, 1);
            dlLogger(queueItem);
            dlLogger(`Download Manager: finished for queue item ${queueItem.requestId}`);
            // let the callback function know
            queueItem.originalRequest.callback(jsonData, httpStatus, queueItem.originalRequest.associatedStateName);
        }
    }

    private initiateFetchForQueueItem(item: managerRequest) {
        dlLogger(`Download Manager: initiating fetch for queue item ${item.requestId}`);
        dlLogger(item);
        if ((item.originalRequest.url !== null) && (item.originalRequest.params != null) && (item.originalRequest.callback != null)) {
            switch (item.originalRequest.type) {
                case RequestType.POST: {
                    apiUtil.apiFetchJSONWithPost(item);
                    break;
                }
                case RequestType.GET: {
                    apiUtil.apiFetchJSONWithGet(item);
                    break;
                }
                case RequestType.DELETE: {
                    apiUtil.apiFetchJSONWithDelete(item);
                    break;
                }
                case RequestType.PUT: {
                    apiUtil.apiFetchJSONWithPut(item);
                    break;
                }
            }
        }
    }
}

const downloader = new DownloadManager();

export default downloader;
