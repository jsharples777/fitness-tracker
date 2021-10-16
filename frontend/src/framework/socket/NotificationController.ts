import {ChatManager} from "./ChatManager";
import {ChatEventListener} from "./ChatEventListener";
import {NotificationManager, NotificationType} from "../notification/NotificationManager";
import debug from 'debug';
import {ChatLog, Invitation, InviteType, Message, Priority} from "./Types";
import {ChatUserEventListener} from "./ChatUserEventListener";

const notLogger = debug('notification-controller');

export type NotificationControllerOptions = {
    showNormalPriorityMessageNotifications:boolean,
    showHighPriorityMessageNotifications:boolean,
    showUrgentPriorityMessageNotifications:boolean,
    showInvitationDeclinedNotifications:boolean,
    showInvitedNotifications:boolean,
    showOfflineMessageNotification:boolean,
    showFavouriteUserLoggedInNotification:boolean,
    showFavouriteUserLoggedOutNotification:boolean,
    showUserJoinLeaveChatNotification:boolean
}

export class NotificationController implements ChatEventListener, ChatUserEventListener {
    private static _instance: NotificationController;
    private chatManager: ChatManager;
    private chatListeners: ChatEventListener[];
    private chatUserListeners: ChatUserEventListener[];
    private notificationOptions:NotificationControllerOptions;

    private constructor() {
        this.chatManager = ChatManager.getInstance();
        this.chatListeners = [];
        this.chatUserListeners = [];
        this.notificationOptions = {
            showNormalPriorityMessageNotifications:true,
            showHighPriorityMessageNotifications:true,
            showUrgentPriorityMessageNotifications:true,
            showInvitationDeclinedNotifications:true,
            showInvitedNotifications:true,
            showOfflineMessageNotification:true,
            showFavouriteUserLoggedInNotification:true,
            showFavouriteUserLoggedOutNotification:true,
            showUserJoinLeaveChatNotification:true
        }


        //bind the methods
        this.handleChatLogUpdated = this.handleChatLogUpdated.bind(this);
        this.handleLoggedInUsersUpdated = this.handleLoggedInUsersUpdated.bind(this);
        this.handleFavouriteUserLoggedIn = this.handleFavouriteUserLoggedIn.bind(this);
        this.handleFavouriteUserLoggedOut = this.handleFavouriteUserLoggedOut.bind(this);

        this.chatManager.addChatEventHandler(this);
        this.chatManager.addChatUserEventHandler(this);
    }

    public static getInstance(): NotificationController {
        if (!(NotificationController._instance)) {
            NotificationController._instance = new NotificationController();
        }
        return NotificationController._instance;
    }

    handleInvitationDeclined(room: string, username: string): void {
        if (!this.notificationOptions.showInvitationDeclinedNotifications) return;

        // notify the user of the new chat
        NotificationManager.getInstance().show('Room', `User ${username} has declined the invitation to join you.`, NotificationType.info, 7000);
    }


    handleNewInviteReceived(invite: Invitation): boolean {
        let result = true;

        // is this a chat room or score sheet?
        if (invite.type !== InviteType.ChatRoom) return true;

        if (!invite.requiresAcceptDecline) return result;

        if (invite.requiresAcceptDecline) {
            // notify the user of the invitation
            //result = controller.askUserAboutInvitation(invite); ///////TO FIX

        } else {
            // notify the user of the new chat
            if (this.notificationOptions.showInvitedNotifications) NotificationManager.getInstance().show('Chat Room', `User ${invite.from} has invited you.`, NotificationType.info, 7000);
        }

        return result;
    }

    public addListener(listener: ChatEventListener) {
        this.chatListeners.push(listener);
    }

    public addUserListener(listener: ChatUserEventListener) {
        this.chatUserListeners.push(listener);
    }


    public blackListUser(username: string, isBlackedListed: boolean = true) {
        if (isBlackedListed) {
            this.chatManager.addUserToBlockedList(username);
        } else {
            this.chatManager.removeUserFromBlockedList(username);
        }
    }

    public favouriteUser(username: string, isFavourited: boolean = true) {
        if (isFavourited) {
            this.chatManager.addUserToFavouriteList(username);
        } else {
            this.chatManager.removeUserFromFavouriteList(username);
        }
    }

    public isFavouriteUser(username: string): boolean {
        return this.chatManager.isUserInFavouriteList(username);
    }

    public isBlockedUser(username: string): boolean {
        return this.chatManager.isUserInBlockedList(username);
    }

    handleChatLogsUpdated() {
        this.chatListeners.forEach((listener) => listener.handleChatLogsUpdated());
    }

    handleChatLogUpdated(log: ChatLog, wasOffline = false): void {
        notLogger(`Handle chat log updated`);
        notLogger(log);
        // pass on the changes
        this.chatListeners.forEach((listener) => listener.handleChatLogUpdated(log, wasOffline));


        if (!wasOffline) {
            // get the last message added, it won't be from ourselves (the chat manager takes care of that)
            if (log.messages.length > 0) {
                const displayMessage = log.messages[log.messages.length - 1];

                // is this a user join/leave?
                if ((displayMessage.from.trim().length === 0) && (!this.notificationOptions.showUserJoinLeaveChatNotification)) return;

                // provide visual notifications if do not disturb is not on, unless the message is marked priority
                let notificationType = NotificationType.message;
                let showNotification = this.notificationOptions.showNormalPriorityMessageNotifications;
                switch (displayMessage.priority) {
                    case Priority.High: {
                        notificationType = NotificationType.warning;
                        showNotification = this.notificationOptions.showHighPriorityMessageNotifications;
                        break;
                    }
                    case Priority.Urgent: {
                        notificationType = NotificationType.priority;
                        showNotification = this.notificationOptions.showUrgentPriorityMessageNotifications;
                        break;
                    }
                }

                if (showNotification) NotificationManager.getInstance().show(displayMessage.from, displayMessage.message, notificationType, 3000);
            }
        }
    }

    handleLoggedInUsersUpdated(usernames: string[]): void {
        notLogger(`Handle logged in users updated`);
        notLogger(usernames);

        // allow the view to change the user statuses
        this.chatUserListeners.forEach((listener) => listener.handleLoggedInUsersUpdated(usernames));
    }

    handleFavouriteUserLoggedIn(username: string): void {
        notLogger(`Handle favourite user ${username} logged in`);
        // allow the view to change the user statuses
        this.chatUserListeners.forEach((listener) => listener.handleFavouriteUserLoggedIn(username));

        // provide visual notifications if do not disturb is not on

        if (this.notificationOptions.showFavouriteUserLoggedInNotification) NotificationManager.getInstance().show(username, `User ${username} has logged in.`, NotificationType.warning, 5000);
    }

    handleFavouriteUserLoggedOut(username: string): void {
        notLogger(`Handle favourite user ${username} logged out`);
        // allow the view to change the user statuses
        this.chatUserListeners.forEach((listener) => listener.handleFavouriteUserLoggedOut(username));


        if (this.notificationOptions.showFavouriteUserLoggedOutNotification) NotificationManager.getInstance().show(username, `User ${username} has logged out.`, NotificationType.priority, 4000);

    }

    handleBlockedUsersChanged(usernames: string[]): void {
        notLogger(`Handle blocked users changed to ${usernames}`);
        this.chatUserListeners.forEach((listener) => listener.handleBlockedUsersChanged(usernames));
    }

    handleFavouriteUsersChanged(usernames: string[]): void {
        notLogger(`Handle favourite users changed to ${usernames}`);
        this.chatUserListeners.forEach((listener) => listener.handleFavouriteUsersChanged(usernames));
    }

    public startChatWithUser(username: string): string | null {
        return ChatManager.getInstance().startChatWithUser(username);

    }

    handleChatStarted(log: ChatLog): void {
        this.chatListeners.forEach((listener) => listener.handleChatStarted(log));
    }

    handleOfflineMessagesReceived(messages: Message[]): void {
        // provide visual notifications if do not disturb is not on
        if (messages.length === 0) return;

        if (this.notificationOptions.showOfflineMessageNotification) NotificationManager.getInstance().show("Offline messages received", `You have received ${messages.length} messages since you last logged out.`);
    }

    setOptions(options:NotificationControllerOptions):void {
        this.notificationOptions = options;
    }


}
