export enum RequestType {
    POST,
    GET,
    PUT,
    DELETE
}

export enum queueType {
    PRIORITY,
    BACKGROUND
}


export type jsonRequest = {
    url: string,
    type: RequestType,
    params: any,
    callbackId: string,
    associatedStateName: string,
    _id?: string
};

export type managerRequest = {
    originalRequest: jsonRequest,
    callback: ManagerCallbackFunction,
    requestId: string,
    queueType: queueType,
    wasOffline: boolean
}


export type ManagerCallbackFunction = (data: any, status: number, queueId: number, requestId: string) => void;
export type RequestCallBackFunction = (data: any, status: number, associatedStateName: string, wasOffline?: boolean) => void;