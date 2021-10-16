import debug from 'debug';
import {StateValue} from "./StateManager";
import {AsynchronousStateManager} from "./AsynchronousStateManager";
import {BrowserStorageStateManager} from "./BrowserStorageStateManager";
import {SecurityManager} from "../security/SecurityManager";
import {equalityFunction} from "../CommonTypes";
import {EqualityFnForName} from "./AbstractStateManager";

const lsLogger = debug('browser-storage-encrypted');

export class EncryptedBrowserStorageStateManager extends BrowserStorageStateManager implements AsynchronousStateManager {

    public constructor(useLocalStorage: boolean = false, defaultEq: equalityFunction, equalFns: EqualityFnForName[] | null = null) {
        super(useLocalStorage, true, defaultEq, equalFns);
        this._addNewNamedStateToStorage = this._addNewNamedStateToStorage.bind(this);
    }


    public _addNewNamedStateToStorage(state: StateValue): void {
        lsLogger(`Saving with key ${state.name}`);
        lsLogger(state);
        const stringifiedSaveData: string = SecurityManager.getInstance().encryptObject(state.value);
        lsLogger(stringifiedSaveData);
        const userStateName = SecurityManager.getInstance().getLoggedInUsername().trim() + '.' + state.name;
        this.storage.setItem(userStateName, stringifiedSaveData);
    }

    public _getState(name: string): StateValue {
        let savedResults = [];
        lsLogger(`Loading with key ${name}`);
        const userStateName = SecurityManager.getInstance().getLoggedInUsername().trim() + '.' + name;
        const savedResultsJSON = this.storage.getItem(userStateName);
        if (savedResultsJSON !== null) {
            savedResults = SecurityManager.getInstance().decryptObject(savedResultsJSON);
            lsLogger(`Loading with key ${name} decrypted to `);
            lsLogger(`Loading with key ${name} decrypted to `);
            lsLogger(savedResults);
        }
        return {name: name, value: savedResults};
    }


}
