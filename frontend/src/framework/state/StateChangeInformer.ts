import {StateEventType} from "./StateManager";
import {StateChangeListener} from "./StateChangeListener";

export interface StateChangeInformer {
    informChangeListenersForStateWithName(name: string, stateObjValue: any, eventType: StateEventType, previousObjValue: any | null): void;

    addChangeListenerForName(name: string, listener: StateChangeListener): void;

    suppressEvents(): void;

    emitEvents(): void;
}