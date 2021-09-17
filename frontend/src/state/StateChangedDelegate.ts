import {StateChangeInformer} from "./StateChangeInformer";
import {stateEventType, stateListeners} from "./StateManager";
import StateChangeListener from "./StateChangeListener";
import debug from "debug";

const smLogger = debug('state-manager-delegate');

class StateChangedDelegate implements StateChangeInformer {
    protected stateChangeListeners: stateListeners[];
    protected suppressEventEmits: boolean = false;
    protected managerName: string;

    public constructor(managerName: string) {
        this.managerName = managerName;
        this.stateChangeListeners = [];
    }

    public suppressEvents() {
        this.suppressEventEmits = true;
    }

    public emitEvents() {
        this.suppressEventEmits = false;
    }

    informChangeListenersForStateWithName(name: string, stateObjValue: any, eventType: stateEventType = stateEventType.StateChanged, previousObjValue: any | null = null) {
        smLogger(`State Manager: Informing state listeners of ${name}`);
        if (this.suppressEventEmits) {
            smLogger(`State Manager: Events suppressed`);
            return;
        }
        const foundIndex = this.stateChangeListeners.findIndex(element => element.name === name);
        if (foundIndex >= 0) {
            smLogger(`State Manager: Found state listeners of ${name} with event type ${eventType}`);
            /* let each state change listener know */
            const changeListenersForName = this.stateChangeListeners[foundIndex];
            changeListenersForName.listeners.forEach((listener) =>  {
                smLogger(`State Manager: Found state listener of ${name} with name ${listener.getListenerName()} - informing`);
                try {
                    switch (eventType) {
                        case (stateEventType.StateChanged): {
                            listener.stateChanged(this.managerName, name, stateObjValue);
                            break;
                        }
                        case (stateEventType.ItemAdded): {
                            listener.stateChangedItemAdded(this.managerName, name, stateObjValue);
                            break;
                        }
                        case (stateEventType.ItemUpdated): {
                            listener.stateChangedItemUpdated(this.managerName, name, previousObjValue, stateObjValue);
                            break;
                        }
                        case (stateEventType.ItemDeleted): {
                            listener.stateChangedItemRemoved(this.managerName, name, stateObjValue);
                            break;
                        }
                    }
                }
                catch (err) {
                    console.log(err);
                }

            });
        }
    }

    /*
          Add a state listener for a given state name
          the listener should be a function with two parameters
          name - string - the name of the state variable that they want to be informed about
          stateObjValue - object - the new state value
         */
    addChangeListenerForName(name: string, listener: StateChangeListener): void {
        this.ensureListenerSetupForName(name);
        smLogger(`State Manager: Adding state listener for ${name} with name ${listener.getListenerName()}`);
        const foundIndex = this.stateChangeListeners.findIndex(element => element.name === name);
        if (foundIndex >= 0) {
            smLogger(`State Manager: Adding state listener for ${name} with name ${listener.getListenerName()} with index ${foundIndex}`);
            let changeListenersForName = this.stateChangeListeners[foundIndex];
            changeListenersForName.listeners.push(listener);
        }
    }

    private ensureListenerSetupForName(name: string) {
        const foundIndex = this.stateChangeListeners.findIndex(element => element.name === name);
        if (foundIndex < 0) {
            const listenersNameArrayPair = {
                name,
                listeners: [],
            };
            this.stateChangeListeners.push(listenersNameArrayPair);
        }
    }

}

export default StateChangedDelegate;