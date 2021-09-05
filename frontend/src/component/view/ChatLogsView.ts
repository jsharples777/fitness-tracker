import debug from 'debug';
import {ChatEventListener} from "../../socket/ChatEventListener";
import {NotificationController} from "../../socket/NotificationController";
import {ChatManager} from "../../socket/ChatManager";
import {ChatLog, Invitation, Message} from "../../socket/Types";
import {ViewListener} from "../../ui-framework/ViewListener";
import AbstractListView from "../../ui-framework/AbstractListView";
import {KeyType, Modifier, ViewDOMConfig} from "../../ui-framework/ConfigurationTypes";
import {View} from "../../ui-framework/View";
import MemoryBufferStateManager from "../../state/MemoryBufferStateManager";
import {STATE_NAMES, VIEW_NAME} from "../../AppTypes";
import {isSame, isSameRoom} from "../../util/EqualityFunctions";


const csLogger = debug('chat-sidebar');

class ChatLogsView extends AbstractListView implements ChatEventListener,ViewListener {
    protected selectedChatLog:ChatLog|null = null;

    private static DOMConfig: ViewDOMConfig = {
        resultsContainerId: 'chatLogs',
        resultsElementType: 'a',
        resultsElementAttributes: [{name: 'href', value: '#'}],
        resultsClasses: 'list-group-item my-list-item truncate-notification list-group-item-action',
        keyId: 'roomName',
        keyType: KeyType.string,
        dataSourceId: VIEW_NAME.chatLogs,
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
            badge: {
                elementType: 'span',
                elementClasses: 'badge badge-pill badge-primary mr-1',
            }
        },
    };

    constructor() {
        super(ChatLogsView.DOMConfig,new MemoryBufferStateManager(), STATE_NAMES.chatLogs);


        // handler binding
        this.handleChatLogsUpdated = this.handleChatLogsUpdated.bind(this);
        this.handleChatLogUpdated = this.handleChatLogUpdated.bind(this);
        this.handleChatStarted = this.handleChatStarted.bind(this);

        NotificationController.getInstance().addListener(this);
    }

    compareStateItemsForEquality(item1:any, item2:any) :boolean {
        return isSameRoom(item1,item2);
    }

    private updateStateManager() {
        csLogger(`Updating state with chat manager`);
        let newState = ChatManager.getInstance().getChatLogs();
        csLogger(newState);
        this.stateManager.setStateByName(STATE_NAMES.chatLogs,newState,true);
    }

    handleNewInviteReceived(invite: Invitation): boolean { return true; }

    handleChatLogUpdated(log: ChatLog): void {
        csLogger(`Handling chat log updates`);
        this.updateStateManager();
    }


    onDocumentLoaded() {
        super.onDocumentLoaded();
        this.addEventListener(this);
        this.updateStateManager();
    }

    getIdForStateItem(name: string, item: any) {
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


    selectChatRoom(roomName:string) {
        let room = ChatManager.getInstance().getChatLog(roomName);
        this.selectedChatLog = room;
        this.eventForwarder.itemSelected(this,this.selectedChatLog);
        this.updateStateManager();
    }


    handleChatLogsUpdated(): void {
        if (this.selectedChatLog) {
            ChatManager.getInstance().touchChatLog(this.selectedChatLog.roomName);
        }
        this.updateStateManager();
    }

    handleChatStarted(log: ChatLog): void {
        this.selectedChatLog = log;
        this.eventForwarder.itemSelected(this,this.selectedChatLog);
        this.updateStateManager();
    }

    getBadgeValue(name: string, item: any): number {
        return item.numOfNewMessages;
    }

    canDeleteItem(view: View, selectedItem: any): boolean {
        return true;
    }

    itemDeleted(view: View, selectedItem: any): void {
        csLogger(`Deleting chat ${selectedItem.roomName}`);
        ChatManager.getInstance().leaveChat(selectedItem.roomName);
        if (this.selectedChatLog && (this.selectedChatLog.roomName === selectedItem.roomName)) {
            this.eventForwarder.itemDeselected(this,this.selectedChatLog);
            this.selectedChatLog = null;
        }
        this.updateStateManager();
    }


    hideRequested(view: View): void {
        if (this.selectedChatLog) {
            this.eventForwarder.itemDeselected(this,this.selectedChatLog);
            this.selectedChatLog = null;
        }
    }

    hidden() {
        this.hideRequested(this);
    }

    documentLoaded(view: View): void {}
    itemAction(view: View, actionName: string, selectedItem: any): void {}
    itemDragStarted(view: View, selectedItem: any): void {}
    itemDropped(view: View, droppedItem: any): void {}
    itemSelected(view: View, selectedItem: any): void {
        this.selectedChatLog = selectedItem;
        this.updateStateManager();
    }

    itemDeselected(view: View, selectedItem: any): void {
        this.selectedChatLog = null;
        this.updateStateManager();
    }
    showRequested(view: View): void {}

    handleOfflineMessagesReceived(messages: Message[]): void {}
    handleInvitationDeclined(room: string, username: string): void {}
}

export default ChatLogsView;
