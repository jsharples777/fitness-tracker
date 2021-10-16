import {AlertListener, AlertType} from "./AlertListener";
import debug from 'debug';

const ALERT_MODAL_ID = 'alert';
const ALERT_TITLE = 'alert-title';
const ALERT_CONTENT = 'alert-content';
const ALERT_CANCEL = 'alert-cancel';
const ALERT_CONFRIM = 'alert-confirm';

const ALERT_hideClass = "d-none";
const ALERT_showClass = "d-block";

const logger = debug('alert');

export class AlertManager {
    private static _instance: AlertManager;
    private alertDiv: HTMLDivElement;
    private alertTitle: HTMLHeadingElement;
    private alertContent: HTMLParagraphElement;
    private cancelButton: HTMLButtonElement;
    private confirmButton: HTMLButtonElement;

    private constructor() {
        this.alertDiv = <HTMLDivElement>document.getElementById(ALERT_MODAL_ID);
        this.alertTitle = <HTMLHeadingElement>document.getElementById(ALERT_TITLE);
        this.alertContent = <HTMLParagraphElement>document.getElementById(ALERT_CONTENT);
        this.cancelButton = <HTMLButtonElement>document.getElementById(ALERT_CANCEL);
        this.confirmButton = <HTMLButtonElement>document.getElementById(ALERT_CONFRIM);
    }

    public static getInstance(): AlertManager {
        if (!(AlertManager._instance)) {
            AlertManager._instance = new AlertManager();
        }
        return AlertManager._instance;
    }

    public startAlert(listener: AlertListener, title: string, content: string, context?: any) {
        this.alertTitle.innerHTML = title;
        this.alertContent.innerHTML = content;
        // @ts-ignore
        this.alertDiv.classList.remove(ALERT_hideClass);
        // @ts-ignore
        this.alertDiv.classList.add(ALERT_showClass);

        const confirmHandler = (event: MouseEvent) => {
            logger(`Handling confirm event from alert`);
            listener.completed({outcome: AlertType.confirmed, context: context});
            // @ts-ignore
            this.alertDiv.classList.add(ALERT_hideClass);
            // @ts-ignore
            this.alertDiv.classList.remove(ALERT_showClass);
            // @ts-ignore
            event.target.removeEventListener('click', confirmHandler);
        }

        const cancelHandler = (event: MouseEvent) => {
            logger(`Handling cancel event from alert`);
            listener.completed({outcome: AlertType.cancelled, context: context});
            // @ts-ignore
            this.alertDiv.classList.add(ALERT_hideClass);
            // @ts-ignore
            this.alertDiv.classList.remove(ALERT_showClass);
            // @ts-ignore
            event.target.removeEventListener('click', cancelHandler);
        }

        this.confirmButton.addEventListener('click', confirmHandler);
        this.cancelButton.addEventListener('click', cancelHandler);
    }

}