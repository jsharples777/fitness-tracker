import {Notification} from './Notification';
import {NotificationManager, NotificationType} from "./NotificationManager";

export class BootstrapNotification extends Notification {
    constructor(notificationManager: NotificationManager) {
        super(notificationManager);
    }

    // Make the notification visible on the screen
    public show(title: string, message: string, topOffset: number = 0, context: NotificationType, duration: number = 3000): HTMLElement {
        let containerId = this.notificationManager.getContainerId();
        // convert the context to a background colour
        let bgColorClass = '';
        switch (context) {
            case NotificationType.info: {
                bgColorClass = 'bg-info';
                break;
            }
            case NotificationType.warning: {
                bgColorClass = 'bg-warning';
                break;
            }
            case NotificationType.message: {
                bgColorClass = 'bg-primary';
                break;
            }
            case NotificationType.priority: {
                bgColorClass = 'bg-danger';
                break;
            }
            default: {
                bgColorClass = "bg-info";
            }

        }
        // Creating the notification container div
        const containerNode = document.createElement('div');
        containerNode.className = 'notification toast';
        containerNode.style.top = `${topOffset}px`;
        containerNode.setAttribute("role", "alert");
        containerNode.setAttribute("data-autohide", "false");

        // Adding the notification title node
        const titleNode = document.createElement('div');
        titleNode.className = `toast-header text-white ${bgColorClass}`;

        const titleTextNode = document.createElement('strong');
        titleTextNode.className = "mr-auto";
        titleTextNode.textContent = title;

        // Adding a little button on the notification
        const closeButtonNode = document.createElement('button');
        closeButtonNode.className = 'ml-2 mb-1 close';
        closeButtonNode.textContent = 'x';
        closeButtonNode.addEventListener('click', () => {
            this.notificationManager.remove(containerNode);
        });


        // Adding the notification message content node
        const messageNode: HTMLElement = document.createElement('div');
        messageNode.className = 'toast-body';
        messageNode.textContent = message;


        // Appending the container with all the elements newly created
        titleNode.appendChild(titleTextNode);
        titleNode.appendChild(closeButtonNode);
        containerNode.appendChild(titleNode);
        containerNode.appendChild(messageNode);
        containerNode.classList.add(`is-${context}`);

        // Inserting the notification to the page body
        const containerEl: HTMLElement | null = document.getElementById(containerId);
        if (containerEl) containerEl.appendChild(containerNode);

        // activate it
        // @ts-ignore
        $(".notification").toast('show');

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
