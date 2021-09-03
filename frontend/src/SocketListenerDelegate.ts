import SocketListener from "./socket/SocketListener";
import debug from 'debug';

import notifier from "./notification/NotificationManager";
import controller from "./Controller";
import {isSame} from "./util/EqualityFunctions";

const slLogger = debug('socket-listener');

export default class SocketListenerDelegate implements SocketListener {
    private config: any;

    public constructor(config: any) {
        this.config = config;
    }

    public handleDataChangedByAnotherUser(message: any) {
        slLogger(`Handling data change ${message.type} on object type ${message.stateName} made by user ${message.user}`);
        const changeUser = controller.getStateManager().findItemInState(this.config.stateNames.users, {id: message.user}, isSame);
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
                        case this.config.stateNames.comments: {
                            controller.getStateManager().addNewItemToState(this.config.stateNames.comments, stateObj, true);
                            // find the entry in question
                            const changedEntry = controller.getStateManager().findItemInState(this.config.stateNames.entries, {id: stateObj.commentOn}, isSame);
                            if (changedEntry) {
                                notifier.show(changedEntry.title, `${username} added comment ${stateObj.content}`);
                            }
                            break;
                        }
                        case this.config.stateNames.entries: {
                            controller.getStateManager().addNewItemToState(this.config.stateNames.entries, stateObj, true);
                            notifier.show(stateObj.title, `${username} added new entry`);
                            break;
                        }
                        case this.config.stateNames.users: {
                            controller.getStateManager().addNewItemToState(this.config.stateNames.users, stateObj, true);
                            notifier.show(stateObj.username, `${stateObj.username} has just registered.`, 'message');
                            break;
                        }
                    }
                    break;
                }
                case "update": {
                    switch (message.stateName) {
                        case this.config.stateNames.entries: {
                            controller.getStateManager().updateItemInState(this.config.stateNames.entries, stateObj, isSame, true);
                            // the entry could be selected by this (different user) but that would only be for comments, which is not what changed, so we are done
                            break;
                        }
                    }
                    break;
                }
                case "delete": {
                    switch (message.stateName) {
                        case this.config.stateNames.comments: {
                            controller.getStateManager().removeItemFromState(this.config.stateNames.comments, stateObj, isSame, true);
                            break;
                        }
                        case this.config.stateNames.entries: {
                            let deletedEntry = controller.getStateManager().findItemInState(this.config.stateNames.entries, stateObj, isSame);
                            controller.getStateManager().removeItemFromState(this.config.stateNames.entries, stateObj, isSame, true);
                            notifier.show(deletedEntry.title, `${username} has deleted this entry.`, 'priority');
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

    getCurrentUser(): number {
        return controller.getLoggedInUserId();
    }

}
