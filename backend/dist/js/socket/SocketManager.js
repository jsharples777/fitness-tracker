"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const debug = require("debug");
const socket_io_1 = require("socket.io");
const SocketTypes_1 = require("./SocketTypes");
const MessageQueueManager_1 = __importDefault(require("./MessageQueueManager"));
const moment_1 = __importDefault(require("moment"));
const socketDebug = debug('socket');
class SocketManager {
    constructor() {
        this.rooms = [];
        this.users = [];
        this.io = null;
        this.removeUserFromRoom = this.removeUserFromRoom.bind(this);
        this.getUserListForRoom = this.getUserListForRoom.bind(this);
        this.findOrCreateRoom = this.findOrCreateRoom.bind(this);
        this.removeUserBySocket = this.removeUserBySocket.bind(this);
        this.removeUser = this.removeUser.bind(this);
        //this.removeUserFromAllRooms = this.removeUserFromAllRooms.bind(this);
        this.getUserList = this.getUserList.bind(this);
        this.findUser = this.findUser.bind(this);
        this.sendInviteMessageToUser = this.sendInviteMessageToUser.bind(this);
        this.inviteUserToRoom = this.inviteUserToRoom.bind(this);
        this.addUserToRoom = this.addUserToRoom.bind(this);
        this.logout = this.logout.bind(this);
        this.login = this.login.bind(this);
        this.findUserBySocket = this.findUserBySocket.bind(this);
        this.sendDataMessage = this.sendDataMessage.bind(this);
        this.sendQueuedItemsToUser = this.sendQueuedItemsToUser.bind(this);
    }
    getUserList() {
        let results = [];
        this.users.forEach((user) => {
            results.push(user.username);
        });
        return results;
    }
    connectToServer(httpServer) {
        socketDebug('Connecting up to the HTTP server');
        this.io = new socket_io_1.Server(httpServer);
        let resultObj = MessageQueueManager_1.default.getInstance().initialise();
        if (resultObj) {
            this.rooms = resultObj.rooms;
        }
        // setup a timer for periodically saving to file
        socketDebug(`Setting up queue persistence`);
        let interval = 60000;
        if (process.env.MQ_INTERVAL) {
            interval = parseInt(process.env.MQ_INTERVAL);
        }
        setInterval(() => {
            //socketDebug(`Checking for expired rooms and persisting state`);
            this.checkForExpiredRooms();
            MessageQueueManager_1.default.getInstance().persistQueueAndRooms(this.rooms);
        }, interval);
    }
    checkForExpiredRooms() {
        const checkTime = parseInt(moment_1.default().format('YYYYMMDDHHmmss'));
        let index = this.rooms.length - 1;
        while (index >= 0) {
            let room = this.rooms[index];
            //socketDebug(`Room ${room.name} expires on ${room.expiry}`)
            if (room.expiry <= checkTime) {
                socketDebug(`Room ${room.name} has expired - removing`);
                this.rooms.splice(index, 1);
                MessageQueueManager_1.default.getInstance().roomHasExpired(room);
            }
            index--;
        }
    }
    findUser(username) {
        return this.users.find(value => value.username === username);
    }
    findUserBySocket(socketId) {
        return this.users.find(value => value.socketId === socketId);
    }
    removeUserBySocket(socketId) {
        let index = this.users.findIndex((value) => value.socketId === socketId);
        if (index >= 0) {
            this.users.splice(index, 1);
        }
    }
    removeUser(username) {
        let index = this.users.findIndex((value) => value.username === username);
        if (index >= 0) {
            this.users.splice(index, 1);
        }
    }
    login(socketId, username) {
        // remove all instances of the user from the memory
        let chatUser = { socketId, username };
        //this.removeUserFromAllRooms(chatUser);
        this.removeUser(username);
        this.users.push(chatUser);
        // let any other user know
        if (this.io)
            this.io.emit('login', username);
        return chatUser;
    }
    findOrCreateRoom(roomName, type) {
        let index = this.rooms.findIndex((value) => value.name === roomName);
        let room;
        if (index >= 0) {
            room = this.rooms[index];
        }
        else {
            let m = moment_1.default(); // now
            if (type === SocketTypes_1.InviteType.ChatRoom) {
                m.add((process.env.SM_EXPIRY_CHAT || 43200), 'minutes'); // 30 days by default
            }
            else {
                m.add((process.env.SM_EXPIRY_SCORESHEET || 60), 'minutes'); // 1 hour by default
            }
            room = { name: roomName, users: [], type, expiry: parseInt(m.format('YYYYYMMDDHHmmss')) };
            this.rooms.push(room);
            socketDebug(`Created room ${roomName} with type ${type} expires on ${parseInt(m.format('YYYYYMMDDHHmmss'))}`);
        }
        return room;
    }
    touchRoom(room) {
        let m = moment_1.default(); // now
        if (room.type === SocketTypes_1.InviteType.ChatRoom) {
            m.add((process.env.SM_EXPIRY_CHAT || 720), 'hours');
        }
        else {
            m.add((process.env.SM_EXPIRY_SCORESHEET || 1), 'hours');
        }
        room.expiry = parseInt(m.format('YYYYYMMDDHHmmss'));
        //socketDebug(`Room ${room.name} expiry updated to ${room.expiry}`);
    }
    getUserListForRoom(roomName, type) {
        let results = [];
        let room = this.findOrCreateRoom(roomName, type);
        room.users.forEach((user) => {
            results.push(user.username);
        });
        return results;
    }
    inviteUserToRoom(inviteFrom, inviteTo, roomName, type, requiresAcceptDecline = false, subject = '', attachment = {}) {
        let receivingUser = this.findUser(inviteTo);
        const userList = this.getUserListForRoom(roomName, type);
        let inviteMessage = {
            from: inviteFrom,
            message: `You have been invited to the chat room ${roomName} by ${inviteFrom}`,
            room: roomName,
            created: parseInt(moment_1.default().format('YYYMMDDHHmmss')),
            requiresAcceptDecline: requiresAcceptDecline,
            userList: userList,
            type: type,
            subject: subject,
            attachment: attachment
        };
        if (receivingUser) {
            this.sendInviteMessageToUser(receivingUser, inviteMessage);
        }
        else {
            MessageQueueManager_1.default.getInstance().queueInviteForUser(inviteTo, inviteMessage);
        }
    }
    sendInviteMessageToUser(receiver, message) {
        // is the user offline?
        if (MessageQueueManager_1.default.getInstance().isUserLoggedIn(receiver.username)) {
            if (this.io)
                this.io.to(receiver.socketId).emit('invite', JSON.stringify(message));
        }
        else {
            MessageQueueManager_1.default.getInstance().queueInviteForUser(receiver.username, message);
        }
    }
    sendQueuedItemsToUser(user, queuedItems) {
        if (this.io)
            this.io.to(user.socketId).emit('queue', JSON.stringify(queuedItems));
    }
    createMessageForRoom(author, roomName, message, created, type, priority = 0, attachment = {}) {
        let sender = this.findUser(author);
        let chatMessage = null;
        if (sender) {
            chatMessage = {
                from: author,
                room: roomName,
                message: message,
                created: created,
                priority: priority,
                type: type,
                attachment: attachment
            };
        }
        return chatMessage;
    }
    addUserToRoom(socketId, username, roomName, type) {
        let user = this.findUser(username);
        if (user) {
            // find the room, create if not already existing
            let room = this.findOrCreateRoom(roomName, type);
            // the user may be in the room with an old id
            let index = room.users.findIndex((value) => value.username === username);
            if (index >= 0) {
                // update the socket id
                room.users[index].socketId = socketId;
            }
            else {
                room.users.push(user);
            }
        }
    }
    removeUserFromRoom(username, roomName, type) {
        socketDebug(`Removing user ${username} from room ${roomName}`);
        const room = this.findOrCreateRoom(roomName, type);
        if (room.users) {
            let index = room.users.findIndex((value) => value.username === username);
            socketDebug(`Removing user ${username} from room ${room.name} with index ${index}`);
            if (index >= 0) {
                socketDebug(`Removed user ${username} from room ${room.name}`);
                room.users.splice(index, 1);
            }
        }
    }
    removeRoom(room) {
        let index = this.rooms.findIndex((value) => value.name === room.name);
        if (index >= 0) {
            this.rooms.splice(index, 1);
            MessageQueueManager_1.default.getInstance().removeAllQueuedItemsForRoom(room.name);
        }
    }
    // protected removeUserFromAllRooms(user:ChatUser):void {
    //     this.rooms.forEach((room) => {
    //         this.removeUserFromRoom(user, room);
    //     });
    // }
    logout(socketId) {
        // remove the user, but first exit them from rooms they are currently in
        let user = this.findUserBySocket(socketId);
        if (user) {
            socketDebug(`logging out user ${user.username} - tidying up users and rooms`);
            // remove the user but leave their rooms
            this.removeUserBySocket(socketId);
            if (this.io)
                this.io.emit('logout', user.username);
        }
        return user;
    }
    listen() {
        socketDebug('starting to listen for connections');
        if (this.io)
            this.io.on('connection', (socket) => {
                socketDebug('a user connected');
                socket.on('disconnect', () => {
                    // remove the user from being logged in and any rooms they are in
                    let user = this.logout(socket.id);
                    if (user) {
                        MessageQueueManager_1.default.getInstance().setUserHasLoggedOut(user.username);
                    }
                    socketDebug('user disconnected');
                });
                socket.on('login', ({ username }) => {
                    socketDebug(`Received login for ${username}`);
                    // store the connected user
                    let user = this.login(socket.id, username);
                    let queuedItems = MessageQueueManager_1.default.getInstance().setUserHasLoggedInAndReturnQueuedItems(user.username);
                    // send queued items, if we have any
                    if (queuedItems && ((queuedItems.invites.length > 0) || (queuedItems.messages.length > 0))) {
                        this.sendQueuedItemsToUser(user, queuedItems);
                    }
                });
                socket.on('logout', ({ username }) => {
                    socketDebug(`Received logout for ${username}`);
                    // store the connected user
                    let user = this.logout(socket.id);
                    if (user) {
                        MessageQueueManager_1.default.getInstance().setUserHasLoggedOut(user.username);
                    }
                });
                socket.on('joinroom', ({ username, room, type }) => {
                    socketDebug(`${username} joining room ${room} `);
                    this.addUserToRoom(socket.id, username, room, type);
                    socket.join(room);
                    let userList = this.getUserListForRoom(room, type);
                    socket.to(room).emit('joinroom', JSON.stringify({ username: username, room: room, userList: userList, type: type }));
                });
                socket.on('exitroom', ({ username, room, type }) => {
                    socketDebug(`${username} exiting room ${room} `);
                    this.removeUserFromRoom(username, room, type);
                    socket.leave(room);
                    let userList = this.getUserListForRoom(room, type);
                    socketDebug(userList);
                    if (userList.length == 0) {
                        socketDebug(`No users left in room ${room} removing from server cache`);
                        this.removeRoom(room);
                    }
                    socket.to(room).emit('exitroom', JSON.stringify({ username: username, room: room, userList: userList, type: type }));
                });
                socket.on('invite', ({ from, to, room, type, requiresAcceptDecline, subject, attachment }) => {
                    socketDebug(`${from} has sent an invitation to join room ${room} to ${to} with type ${type}`);
                    this.inviteUserToRoom(from, to, room, type, requiresAcceptDecline, subject, attachment);
                });
                socket.on('declineinvite', ({ from, room, type }) => {
                    socketDebug(`${from} has declined an invitation to join room ${room}`);
                    socket.to(room).emit('declineinvite', JSON.stringify({ username: from, room: room, type: type }));
                });
                socket.on('chat', ({ from, room, message, created, priority, attachment, type }) => {
                    socketDebug(`${from} has sent a message to room ${room}: ${message}`);
                    // send the message to the rest of the room
                    let cMessage = this.createMessageForRoom(from, room, message, created, type, priority, attachment);
                    if (cMessage) {
                        socketDebug(`Sending message ${cMessage.message} to room ${cMessage.room}`);
                        socket.to(room).emit('chat', JSON.stringify(cMessage));
                        let chatRoom = this.findOrCreateRoom(room, type);
                        this.touchRoom(chatRoom);
                        socketDebug(`Updating room expiry to ${chatRoom.expiry}`);
                        // check for offline users and queue their messages
                        this.queueMessagesForOfflineRoomUsers(cMessage);
                    }
                });
                socket.on('userlist', () => {
                    // return the list of who is logged in
                    socketDebug(`requesting current user list`);
                    let userList = this.getUserList();
                    if (this.io)
                        this.io.to(socket.id).emit('userlist', userList);
                });
            });
    }
    queueMessagesForOfflineRoomUsers(message) {
        let room = this.findOrCreateRoom(message.room, message.type);
        room.users.forEach((user) => {
            if (!MessageQueueManager_1.default.getInstance().isUserLoggedIn(user.username)) {
                MessageQueueManager_1.default.getInstance().queueMessageForUser(user.username, message);
            }
        });
    }
    sendDataMessage(message) {
        socketDebug("Sending data " + message);
        if (this.io)
            this.io.emit('data', JSON.stringify(message));
    }
}
let socketManager = new SocketManager();
module.exports = socketManager;
//# sourceMappingURL=SocketManager.js.map