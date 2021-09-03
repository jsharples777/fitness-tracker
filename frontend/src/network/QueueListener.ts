export default interface QueueListener {
    handleEventAddToQueue(): void;

    handleEventRemoveFromQueue(): void;
}