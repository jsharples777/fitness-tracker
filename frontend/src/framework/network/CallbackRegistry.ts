import {RequestCallBackFunction} from "./Types";
import debug from "debug";

const logger = debug('callback-registry');

type CallBack = {
    id: string,
    fn: RequestCallBackFunction
}

export class CallbackRegistry {
    private static _instance: CallbackRegistry;
    private callbacks: CallBack[] = [];

    private constructor() {
    }

    public static getInstance(): CallbackRegistry {
        if (!(CallbackRegistry._instance)) {
            CallbackRegistry._instance = new CallbackRegistry();
        }
        return CallbackRegistry._instance;
    }

    public addRegisterCallback(id: string, fn: RequestCallBackFunction): void {
        logger(`Adding callback function with id ${id}`);
        this.callbacks.push({id: id, fn: fn});
    }

    public getCallbackById(id: string): RequestCallBackFunction {
        const defaultFn = function (data: any, status: number, associatedStateName: string): void {
            console.error(`Callback received with status ${status}, state name ${associatedStateName} where the callback was never registered`);
        }

        const foundIndex = this.callbacks.findIndex((callback) => callback.id === id);
        if (foundIndex >= 0) {
            return this.callbacks[foundIndex].fn;
        }
        return defaultFn;
    }
}