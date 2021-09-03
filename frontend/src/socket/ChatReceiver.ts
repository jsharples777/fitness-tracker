import {Invitation, JoinLeft, Message} from "./Types";


export interface ChatReceiver {
    receiveLogin(username: string): void;

    receiveLogout(username: string): void;

    receiveInvitation(invite: Invitation): void;

    receiveMessage(message: Message): void;

    receiveQueuedMessages(messages: any): void;

    receiveQueuedInvites(invites: any): void;

    receiveJoinedRoom(users: JoinLeft): void;

    receivedLeftRoom(users: JoinLeft): void;

    receiveUserList(users: string[]): void;

    receiveDecline(room: string, username: string, type: number): void
}