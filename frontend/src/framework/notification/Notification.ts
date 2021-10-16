import {NotificationManager, NotificationType} from "./NotificationManager";

export abstract class Notification {

    protected notificationManager: NotificationManager;
    protected containerId: string;

    protected constructor(notificationManager: NotificationManager) {
        this.show = this.show.bind(this);

        this.notificationManager = notificationManager;

        // Create DOM notification structure when instantiated
        this.containerId = this.notificationManager.getContainerId();
    }

    // Make the notification visible on the screen
    public abstract show(title: string, message: string, topOffset: number, context: NotificationType, duration: number): HTMLElement;
}
