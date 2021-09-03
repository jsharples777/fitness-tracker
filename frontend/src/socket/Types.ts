export type Invitation = {
    from: string,
    room: string,
    message: string,
    created: number,
    userList: string[],
    type: InviteType,
    requiresAcceptDecline: boolean,
    subject: string,
    attachment: any
}

export type Message = {
    from: string,
    room: string,
    message: string,
    created: number,
    priority: number,
    type: InviteType,
    attachment?: any
}

export type JoinLeft = {
    username: string,
    room: string,
    userList: string[],
    type: InviteType
}

export enum Priority {
    Normal,
    High,
    Urgent
}

export enum InviteType {
    ChatRoom,
    ScoreSheet
}

export type ChatLog = {
    roomName: string,
    type: InviteType,
    users: string[],
    messages: Message[],
    lastViewed: number,
    numOfNewMessages: number
}
