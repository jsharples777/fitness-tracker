export interface QueueListener {
    handleEventAddToQueue(): void;

    handleEventRemoveFromQueue(): void;
}