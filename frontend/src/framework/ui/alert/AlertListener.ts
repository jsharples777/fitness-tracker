export enum AlertType {
    cancelled,
    confirmed
}

export type AlertEvent = {
    outcome: AlertType,
    context?: any
}

export interface AlertListener {
    completed(event: AlertEvent): void;
}