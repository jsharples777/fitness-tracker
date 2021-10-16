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

export type SimpleAttachment = {
    identifier:string,
    type:string,
    displayText:string,
    iconClasses?:string
}

export type Message = {
    from: string,
    room: string,
    message: string,
    created: number,
    priority: number,
    type: InviteType,
    simpleAttachment?:SimpleAttachment,
    attachment?: any,
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
    CustomType1,
    CustomType2,
    CustomType3,
    CustomType4,
    CustomType5,
    CustomType6,
    CustomType7,
    CustomType8,
    CustomType9,
}

export type ChatLog = {
    roomName: string,
    type: InviteType,
    users: string[],
    messages: Message[],
    lastViewed: number,
    unreadMessages: number,
    unreadHighMessages:number,
    unreadUrgentMessages: number
}
