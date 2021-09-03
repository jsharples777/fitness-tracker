import Notification from "./Notification";
import {NotificationManager} from "./NotificationManager";


export default class BulmaNotification extends Notification {
    constructor(notificationManager: NotificationManager) {
        super(notificationManager);
    }

    // Make the notification visible on the screen
    show(title: string, message: string, topOffset: number = 0, context: string = 'info', duration: number = 3000): HTMLElement {
        // Creating the notification container div
        const containerNode = document.createElement('div');
        containerNode.className = 'notification note note-visible';
        containerNode.style.top = `${topOffset}px`;


        // Adding the notification title node
        const titleNode = document.createElement('p');
        titleNode.className = 'note-title';
        titleNode.textContent = title;


        // Adding the notification message content node
        const messageNode = document.createElement('p');
        messageNode.className = 'note-content';
        messageNode.textContent = message;

        // Adding a little button on the notification
        const closeButtonNode = document.createElement('button');
        closeButtonNode.className = 'delete';
        closeButtonNode.addEventListener('click', () => {
            this.notificationManager.remove(containerNode);
        });

        // Appending the container with all the elements newly created
        containerNode.appendChild(closeButtonNode);
        containerNode.appendChild(titleNode);
        containerNode.appendChild(messageNode);
        containerNode.classList.add(`is-${context}`);

        // Inserting the notification to the page body
        const containerEl: HTMLElement | null = document.getElementById(this.containerId);
        if (containerEl) containerEl.appendChild(containerNode);

        // Default duration delay
        if (duration <= 0) {
            duration = 2000;
        }
        setTimeout(() => {
            this.notificationManager.remove(containerNode);
        }, duration);
        return containerNode;
    }
}
