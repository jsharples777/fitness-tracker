import {stateEventType} from "./StateManager";
import StateChangeListener from "./StateChangeListener";

export interface StateChangeInformer {
    informChangeListenersForStateWithName(name: string, stateObjValue: any, eventType: stateEventType, previousObjValue: any | null): void;

    addChangeListenerForName(name: string, listener: StateChangeListener): void;

    suppressEvents(): void;

    emitEvents(): void;
}