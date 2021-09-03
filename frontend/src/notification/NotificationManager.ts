import notificationFactory from "./NotificationFactory";

export class NotificationManager {
    protected notifications: Node[];
    protected currentCount: number;
    protected offsetPerNotification: number;
    protected containerId: string;

    constructor() {
        this.notifications = [];
        this.currentCount = 0;
        this.offsetPerNotification = 120;
        this.containerId = 'notifications';

        this.show = this.show.bind(this);
    }

    public getContainerId(): string {
        return this.containerId;
    }

    public show(title: string, message: string, context: string = 'info', duration: number = 5000) {
        const notification = notificationFactory.createNotification(this);
        const notificationNode = notification.show(title, message, this.currentCount * this.offsetPerNotification, context, duration);
        this.currentCount++;
        this.notifications.push(notificationNode);
    }

    public remove(notificationNode: HTMLElement) {
        const foundIndex = this.notifications.findIndex(element => element === notificationNode);
        if (foundIndex >= 0) {
            this.notifications.splice(foundIndex, 1);
            // re-arrange the remaining notifications
            this.notifications.map((notificationNode, index) => {
                // @ts-ignore
                notificationNode.style.top = `${this.offsetPerNotification * index}px`;
            });
        }
        const parentEl = notificationNode.parentElement;
        if (parentEl !== null) parentEl.removeChild(notificationNode);
        this.currentCount--;
        if (this.currentCount < 0) this.currentCount = 0;
    }
}

const notifier = new NotificationManager();

export default notifier;
