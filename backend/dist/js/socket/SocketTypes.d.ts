export declare type DataMessage = {
    type: string;
    stateName: string;
    data: any;
    user: string;
};
export declare type ChatMessage = {
    room: string;
    message: string;
    from: string;
    created: number;
    priority: number;
    type: number;
    attachment: any;
};
export declare type InviteMessage = {
    from: string;
    message: string;
    room: string;
    created: number;
    requiresAcceptDecline: boolean;
    userList: string[];
    type: InviteType;
    subject: string;
    attachment: any;
};
export declare enum InviteType {
    ChatRoom = 0,
    ScoreSheet = 1
}
export declare type ChatUser = {
    socketId: any;
    username: string;
};
export declare type ChatRoom = {
    name: string;
    type: number;
    users: ChatUser[];
    expiry: number;
};
export declare type QueuedMessages = {
    invites: InviteMessage[];
    messages: ChatMessage[];
};
