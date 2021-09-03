import {StateManager} from "./StateManager";

interface AsynchronousStateManager extends StateManager {
    getConfiguredStateNames(): string[];

    hasCompletedRun(stateName: string): boolean;

    forceResetForGet(stateName: string): void;
}

export default AsynchronousStateManager;