/// <reference types="node" />
import { Server } from 'socket.io';
import { Server as httpServer } from 'http';
import { ChatMessage, ChatRoom, ChatUser, DataMessage, InviteMessage, QueuedMessages } from "./SocketTypes";
declare class SocketManager {
    protected io: Server | null;
    protected rooms: ChatRoom[];
    protected users: ChatUser[];
    constructor();
    private getUserList;
    connectToServer(httpServer: httpServer): void;
    private checkForExpiredRooms;
    protected findUser(username: string): ChatUser | undefined;
    protected findUserBySocket(socketId: any): ChatUser | undefined;
    protected removeUserBySocket(socketId: any): void;
    protected removeUser(username: any): void;
    protected login(socketId: any, username: string): ChatUser;
    protected findOrCreateRoom(roomName: string, type: number): ChatRoom;
    private touchRoom;
    protected getUserListForRoom(roomName: string, type: number): string[];
    protected inviteUserToRoom(inviteFrom: string, inviteTo: string, roomName: string, type: number, requiresAcceptDecline?: boolean, subject?: string, attachment?: any): void;
    protected sendInviteMessageToUser(receiver: ChatUser, message: InviteMessage): void;
    protected sendQueuedItemsToUser(user: ChatUser, queuedItems: QueuedMessages): void;
    protected createMessageForRoom(author: string, roomName: string, message: string, created: number, type: number, priority?: number, attachment?: any): ChatMessage | null;
    protected addUserToRoom(socketId: string, username: string, roomName: string, type: number): void;
    protected removeUserFromRoom(username: string, roomName: string, type: number): void;
    protected removeRoom(room: ChatRoom): void;
    protected logout(socketId: any): ChatUser | undefined;
    listen(): void;
    protected queueMessagesForOfflineRoomUsers(message: ChatMessage): void;
    sendDataMessage(message: DataMessage): void;
}
declare let socketManager: SocketManager;
export = socketManager;
