import {ChatMessage, ChatRoom, InviteMessage, QueuedMessages} from "./SocketTypes";
import debug from 'debug';
import fs from "fs";

const mqLogger = debug('message-queue');


enum Status {
    LoggedOut,
    LoggedIn
}

type UserQueue = {
    username: string,
    status: Status,
    invites: InviteMessage[],
    messages: ChatMessage[]
}


export default class MessageQueueManager {
    private static _instance: MessageQueueManager;

    public static getInstance(): MessageQueueManager {
        if (!MessageQueueManager._instance) {
            MessageQueueManager._instance = new MessageQueueManager();
        }
        return MessageQueueManager._instance;
    }

    private messageQueue: UserQueue[] = [];

    private constructor() {
    }

    public roomHasExpired(room:ChatRoom) {
        // remove all expired invites and messages
        mqLogger(`Removing expired room - ${room.name}`);
        this.messageQueue.forEach((userQueue) => {
            let index = userQueue.invites.length - 1;
            while (index >= 0) {
                let invite = userQueue.invites[index];
                if (invite.room === room.name) {
                    mqLogger(`Removing expired room invite for user ${userQueue.username}`);
                    userQueue.invites.splice(index,1);
                }
                index--;
            }
            index = userQueue.messages.length - 1;
            while (index >= 0) {
                let message = userQueue.messages[index];
                if (message.room === room.name) {
                    mqLogger(`Removing expired room message for user ${userQueue.username}`);
                    userQueue.messages.splice(index,1);
                }
                index--;
            }

        });


    }

    public setUserHasLoggedInAndReturnQueuedItems(username: string): QueuedMessages | null {
        // find the user queue if any
        let queueItems: QueuedMessages | null = null;
        let index = this.messageQueue.findIndex((queue) => queue.username === username);
        if (index >= 0) {
            mqLogger(`User ${username} has logged back in, messages in queue`);
            let queue: UserQueue = this.messageQueue[index];
            queue.status = Status.LoggedIn;
            mqLogger(queue);
            queueItems = {
                invites: [...queue.invites],
                messages: [...queue.messages]
            }
            mqLogger(queueItems);
            // remove the queued items from memory
            queue.invites = [];
            queue.messages = [];
        }
        else {
            let queue:UserQueue = {
                username: username,
                status: Status.LoggedIn,
                invites: [],
                messages: []
            }
            this.messageQueue.push(queue);
        }
        return queueItems;
    }

    public setUserHasLoggedOut(username: string) {
        // create a new queue for the user
        let queue: UserQueue;
        let index = this.messageQueue.findIndex((queue) => queue.username === username);
        mqLogger(`User ${username} has logged out, emptying queues, and setting status to logged out`);
        if (index >= 0) {
            queue = this.messageQueue[index];
            queue.status = Status.LoggedOut;
            queue.invites = [];
            queue.messages = [];
        }
        else {
            queue = {
                username: username,
                status: Status.LoggedOut,
                invites: [],
                messages: []
            }
            this.messageQueue.push(queue);
        }
    }

    public isUserLoggedIn(username:string):boolean {
        let queue: UserQueue;
        let result = false;
        let index = this.messageQueue.findIndex((queue) => queue.username === username);
        if (index >= 0) {
            queue = this.messageQueue[index];
            mqLogger(`User ${username} is logged in ${queue.status}`);
            result = (queue.status === Status.LoggedIn);
        }
        else {
            mqLogger(`User ${username} is NOT logged in`);
            queue = {
                username: username,
                status: Status.LoggedOut,
                invites: [],
                messages: []
            }
            this.messageQueue.push(queue);
        }
        return result;
    }

    public queueInviteForUser(username:string,message:InviteMessage) {
        let index = this.messageQueue.findIndex((queue) => queue.username === username);
        let queue: UserQueue;
        if (index >= 0) {
            queue = this.messageQueue[index];
            if (queue.status === Status.LoggedIn) return;
            queue.invites.push(message);
        }
        else {
            queue = {
                username: username,
                status: Status.LoggedOut,
                invites: [message],
                messages: []
            }
            this.messageQueue.push(queue);
        }
        mqLogger(`Queuing invite from ${message.from} to room ${message.room} to user ${username}`);
        queue.invites.push(message);

    }

    public queueMessageForUser(username:string,message:ChatMessage) {
        let index = this.messageQueue.findIndex((queue) => queue.username === username);
        let queue: UserQueue;
        if (index >= 0) {
            queue = this.messageQueue[index];
            if (queue.status === Status.LoggedIn) return;
            queue.messages.push(message);
        }
        else {
            queue = {
                username: username,
                status: Status.LoggedOut,
                invites: [],
                messages: [message]
            }
            this.messageQueue.push(queue);
        }
        mqLogger(`Queuing message from ${message.from} to room ${message.room} to user ${username}`);
    }

    public removeAllQueuedItemsForRoom(name:string):void {
        mqLogger(`Removing queued items for room ${name}`);
        this.messageQueue.forEach((queue) => {
            let index = queue.invites.length;
            while (index > 0) {
                if (queue.invites[index - 1].room === name) {
                    mqLogger(`Removing invite to user ${queue.username}`);
                    queue.invites.splice(index - 1, 1);
                }
                index--;
            }
            index = queue.messages.length;
            while (index > 0) {
                if (queue.messages[index - 1].room === name) {
                    mqLogger(`Removing message to user ${queue.username}`);
                    queue.messages.splice(index - 1, 1);
                }
                index--;
            }
        });
    }

    public persistQueueAndRooms(rooms:ChatRoom[]) {
        let data = {
            rooms: rooms,
            queues: this.messageQueue
        }
        let json = JSON.stringify(data);
        const fileName = process.env.MQ_FILE || './config/queue.json';
        fs.writeFile(fileName, json,{},(result) => {
           if (result) {
               mqLogger(result);
           }
        });
    }

    public initialise():any|null{
        mqLogger(`Attempting to load stored queue and rooms`);
        const fileName = process.env.MQ_FILE || './db/queue.json';
        let dataObj:any|null = null;
        try {
            let buffer:Buffer = fs.readFileSync(fileName);
            dataObj = JSON.parse(buffer.toString());
            mqLogger(dataObj);
            this.messageQueue = dataObj.queues;

            // set all queued users to offline
            mqLogger(`All users are off-line, by definition.`);
            this.messageQueue.forEach((queue) => {
                queue.status = Status.LoggedOut;
            })

            // go through the rooms and remove empty ones
            if (dataObj.rooms) {
                let counter = dataObj.rooms.length;
                while (counter > 0) {
                    const usersOfRoom = dataObj.rooms[counter-1];
                    if ((usersOfRoom) || (usersOfRoom.length === 0)) {
                        mqLogger(`Removing room ${dataObj.rooms[counter-1]} and is empty of users`);
                        dataObj.rooms.splice(counter-1,1);
                    }
                    counter--;
                }
            }



        }
        catch (error) {
            mqLogger(error);
            mqLogger(`Invalid format - no queue or rooms restored`);
        }
        return dataObj;
    }
}