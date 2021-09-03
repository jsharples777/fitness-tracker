export type DataMessage = {
    type:string,
    stateName: string,
    data:any,
    user:string,
};

export type ChatMessage = {
    room: string,
    message: string,
    from: string,
    created: number,
    priority: number,
    type: number,
    attachment: any
}


export type InviteMessage = {
    from: string,
    message: string,
    room:string,
    created: number,
    requiresAcceptDecline: boolean,
    userList: string[],
    type: InviteType,
    subject:string,
    attachment:any
}

export enum InviteType {
    ChatRoom,
    ScoreSheet
}


export type ChatUser = {
    socketId: any,
    username: string,
}

export type ChatRoom = {
    name: string
    type: number
    users: ChatUser[]
    expiry: number
}

export type QueuedMessages = {
    invites:InviteMessage[],
    messages:ChatMessage[]
}

