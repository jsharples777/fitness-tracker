import { ChatMessage, ChatRoom, InviteMessage, QueuedMessages } from "./SocketTypes";
export default class MessageQueueManager {
    private static _instance;
    static getInstance(): MessageQueueManager;
    private messageQueue;
    private constructor();
    roomHasExpired(room: ChatRoom): void;
    setUserHasLoggedInAndReturnQueuedItems(username: string): QueuedMessages | null;
    setUserHasLoggedOut(username: string): void;
    isUserLoggedIn(username: string): boolean;
    queueInviteForUser(username: string, message: InviteMessage): void;
    queueMessageForUser(username: string, message: ChatMessage): void;
    removeAllQueuedItemsForRoom(name: string): void;
    persistQueueAndRooms(rooms: ChatRoom[]): void;
    initialise(): any | null;
}
