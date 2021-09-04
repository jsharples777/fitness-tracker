import debug from 'debug';
import {ChatEventListener} from "../../socket/ChatEventListener";
import {NotificationController} from "../../socket/NotificationController";
import {ChatManager} from "../../socket/ChatManager";
import {ChatLog, Invitation, Message} from "../../socket/Types";
import {ViewListener} from "../../ui-framework/ViewListener";
import AbstractView from "../../ui-framework/AbstractView";
import {Modifier, ViewDOMConfig} from "../../ui-framework/ConfigurationTypes";
import {View} from "../../ui-framework/View";


const csLogger = debug('chat-sidebar');
const csLoggerDetail = debug('chat-sidebar:detail');

class ChatLogsView extends AbstractView implements ChatEventListener,ViewListener {
    // @ts-ignore
    protected fastUserSearch: HTMLElement;
    protected selectedChatLog:ChatLog|null = null;

    private static chatFastSearchUserNames:string = 'chatFastSearchUserNames';

    private static DOMConfig: ViewDOMConfig = {
        resultsContainerId: 'chatLogs',
        resultsElementType: 'a',
        resultsElementAttributes: [{name: 'href', value: '#'}],
        resultsClasses: 'list-group-item my-list-item truncate-notification list-group-item-action',
        keyId: 'room',
        dataSourceId: 'chatLogs',
        modifiers: {
            normal: '',
            inactive: 'list-group-item-dark',
            active: 'list-group-item-primary',
            warning: ''
        },
        detail: {
            containerClasses: 'd-flex w-100 justify-content-between',
            textElementType: 'span',
            textElementClasses: 'mb-1',
            select: true,
            delete: {
                buttonClasses: 'btn bg-danger text-white btn-circle btn-sm',
                iconClasses: 'text-black fas fa-sign-out-alt',
            },
        },
    };

    constructor() {
        super(ChatLogsView.DOMConfig,null, null);


        // handler binding
        this.updateView = this.updateView.bind(this);
        this.handleChatLogsUpdated = this.handleChatLogsUpdated.bind(this);
        this.handleChatLogUpdated = this.handleChatLogUpdated.bind(this);
        this.handleChatStarted = this.handleChatStarted.bind(this);

        NotificationController.getInstance().addListener(this);
    }

    handleNewInviteReceived(invite: Invitation): boolean { return true; }

    handleChatLogUpdated(log: ChatLog): void {
        csLogger(`Handling chat log updates`);
        this.updateView('', {})
    }


    onDocumentLoaded() {
        super.onDocumentLoaded();
        this.addEventListener(this);

        this.updateView('', {});
    }

    getIdForStateItem(name: string, item: any) {
        return item.roomName;
    }

    getLegacyIdForStateItem(name: string, item: any) {
        return item.roomName;
    }

    getDisplayValueForStateItem(name: string, item: any) {
        return item.users.join(',');
    }

    getModifierForStateItem(name: string, item: any) {
        let result = Modifier.inactive;
        if (this.selectedChatLog) {
            if (this.selectedChatLog.roomName === item.roomName) {
                result = Modifier.active;
            }

        }
        return result;
    }

    getSecondaryModifierForStateItem(name: string, item: any) {
        return this.getModifierForStateItem(name, item);
    }


    updateView(name: string, newState: any) {
        csLoggerDetail(`Updating state with chat manager`);
        newState = ChatManager.getInstance().getChatLogs();
        csLoggerDetail(newState);
        super.updateView(name, newState);
    }

    selectChatRoom(roomName:string) {
        let room = ChatManager.getInstance().getChatLog(roomName);
        this.selectedChatLog = room;
        this.eventForwarder.itemSelected(this,this.selectedChatLog);
        this.updateView('',{});
    }


    handleChatLogsUpdated(): void {
        if (this.selectedChatLog) {
            ChatManager.getInstance().touchChatLog(this.selectedChatLog.roomName);
        }
        this.updateView('', {});
    }

    handleChatStarted(log: ChatLog): void {
        this.selectedChatLog = log;
        this.eventForwarder.itemSelected(this,this.selectedChatLog);
        this.updateView('', {});
    }

    getBadgeValue(name: string, item: any): number {
        return item.numOfNewMessages;
    }

    itemDeleteStarted(view: View, selectedItem: any): boolean {
        return true;
    }

    itemDeleted(view: View, selectedItem: any): void {
        ChatManager.getInstance().leaveChat(selectedItem.roomName);
        if (this.selectedChatLog && (this.selectedChatLog.roomName === selectedItem.roomName)) {
            this.eventForwarder.itemDeselected(this,this.selectedChatLog);
            this.selectedChatLog = null;
        }

        this.updateView('', {});
    }


    hideRequested(view: View): void {
        if (this.selectedChatLog) {
            this.eventForwarder.itemDeselected(this,this.selectedChatLog);
            this.selectedChatLog = null;
        }
    }

    documentLoaded(view: View): void {}
    itemAction(view: View, actionName: string, selectedItem: any): void {}
    itemDragStarted(view: View, selectedItem: any): void {}
    itemDropped(view: View, droppedItem: any): void {}
    itemSelected(view: View, selectedItem: any): void {}
    itemDeselected(view: View, selectedItem: any): void {}
    showRequested(view: View): void {}

    handleOfflineMessagesReceived(messages: Message[]): void {}
    handleInvitationDeclined(room: string, username: string): void {}
}

export default ChatLogsView;
