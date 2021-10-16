export enum DataChangeType {
    create = 'create',
    update = 'update',
    delete = 'delete'
}
export interface SocketListener {
    handleDataChangedByAnotherUser(message: any): void;

    handleMessage(message: string): void;

    getCurrentUser(): string;
}

