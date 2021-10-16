import {StateManager} from "./StateManager";

export interface AsynchronousStateManager extends StateManager {
    getConfiguredStateNames(): string[];

    hasCompletedRun(stateName: string): boolean;

    forceResetForGet(stateName: string): void;
}

