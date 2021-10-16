import {Priority, SimpleAttachment} from "./Types";


export interface ChatEmitter {
    login(): void;

    logout(): void;

    joinChat(room: string): void;

    leaveChat(room: string): void;

    sendMessage(room: string, message: string, priority?: Priority, simpleAttachment?:SimpleAttachment, attachment?: any): void;

    sendInvite(to: string, room: string): void;
}