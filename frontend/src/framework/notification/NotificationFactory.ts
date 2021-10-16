import {BootstrapNotification} from "./BootstrapNotification";
import {NotificationManager} from "./NotificationManager";

export class NotificationFactory {
    private static _instance: NotificationFactory;


    public static getInstance(): NotificationFactory {
        if (!(NotificationFactory._instance)) {
            NotificationFactory._instance = new NotificationFactory();
        }
        return NotificationFactory._instance;
    }

    private constructor() {
    }

    createNotification(manager: NotificationManager) {
        return new BootstrapNotification(manager);
    }
}

