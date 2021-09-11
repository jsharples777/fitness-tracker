export default interface SocketListener {
    handleDataChangedByAnotherUser(message: any): void;

    handleMessage(message: string): void;

    getCurrentUser(): string;
}

