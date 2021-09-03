import BootstrapNotification from "./BootstrapNotification";
import {NotificationManager} from "./NotificationManager";

class NotificationFactory {
    constructor() {
    }

    createNotification(manager: NotificationManager) {
        return new BootstrapNotification(manager);
    }
}

const notificationFactory = new NotificationFactory();

export default notificationFactory;