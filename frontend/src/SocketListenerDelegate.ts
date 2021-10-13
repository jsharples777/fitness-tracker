import debug from 'debug';


import Controller from "./Controller";

import {STATE_NAMES} from "./AppTypes";
import {isSameMongo, NotificationManager, NotificationType, SocketListener} from "ui-framework-jps";


const slLogger = debug('socket-listener');

export default class SocketListenerDelegate implements SocketListener {

    public constructor() {}

    public handleDataChangedByAnotherUser(message: any) {
        slLogger(`Handling data change ${message.type} on object type ${message.stateName} made by user ${message.user}`);
        const changeUser = Controller.getInstance().getStateManager().findItemInState(STATE_NAMES.users, {_id: message.user});
        let username = "unknown";
        if (changeUser) {
            username = changeUser.username;
        }
        slLogger(`Handling data change ${message.type} on object type ${message.stateName} made by user ${username}`);

        let stateObj = message.data;
        slLogger(stateObj);
        // ok lets work out where this change belongs
        try {
            switch (message.type) {
                case "create": {
                    switch (message.stateName) {
                        case STATE_NAMES.users: {
                            Controller.getInstance().getStateManager().addNewItemToState(STATE_NAMES.users, stateObj, true);
                            NotificationManager.getInstance().show(stateObj.username, `${stateObj.username} has just registered.`, NotificationType.message);
                            break;
                        }
                        case STATE_NAMES.exerciseTypes: {
                            Controller.getInstance().getStateManager().addNewItemToState(STATE_NAMES.exerciseTypes, stateObj, true);
                            break;
                        }
                    }
                    break;
                }
                case "update": {
                    switch (message.stateName) {
                        case STATE_NAMES.exerciseTypes: {
                            Controller.getInstance().getStateManager().updateItemInState(STATE_NAMES.exerciseTypes, stateObj,true);
                            break;
                        }
                    }
                    break;
                }
                case "delete": {
                    switch (message.stateName) {
                        case STATE_NAMES.exerciseTypes: {
                            Controller.getInstance().getStateManager().removeItemFromState(STATE_NAMES.exerciseTypes, stateObj, true);
                            break;
                        }
                    }
                    break;
                }
            }
        } catch (err) {
            slLogger(err);
        }

    }

    handleMessage(message: string): void {
        slLogger(`Received message: ${message}`);
    }

    getCurrentUser(): string {
        return Controller.getInstance().getLoggedInUserId();
    }

}
