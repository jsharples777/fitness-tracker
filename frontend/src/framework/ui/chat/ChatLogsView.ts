import debug from 'debug';
import {ChatEventListener} from "../../socket/ChatEventListener";
import {NotificationController} from "../../socket/NotificationController";
import {ChatManager} from "../../socket/ChatManager";
import {ChatLog, Invitation, Message} from "../../socket/Types";
import {CollectionViewListener} from "../view/interface/CollectionViewListener";
import {AbstractStatefulCollectionView} from "../view/implementation/AbstractStatefulCollectionView";
import {CollectionViewDOMConfig, KeyType, Modifier} from "../ConfigurationTypes";
import {View} from "../view/interface/View";
import {MemoryBufferStateManager} from "../../state/MemoryBufferStateManager";
import {isSameRoom} from "../../util/EqualityFunctions";
import {ListViewRenderer} from "../view/renderer/ListViewRenderer";
import {CollectionView} from "../view/interface/CollectionView";
import {CollectionViewListenerForwarder} from "../view/delegate/CollectionViewListenerForwarder";
import {STATE_NAMES, VIEW_NAME} from "./ChatTypes";


const csLogger = debug('chat-sidebar');

export class ChatLogsView extends AbstractStatefulCollectionView implements ChatEventListener, CollectionViewListener {
    private static _instance: ChatLogsView;

    public static getInstance(): ChatLogsView {
        if (!(ChatLogsView._instance)) {
            ChatLogsView._instance = new ChatLogsView();
        }
        return ChatLogsView._instance;
    }


    private static DOMConfig: CollectionViewDOMConfig = {
        viewConfig: {
            resultsContainerId: 'chatLogs',
            dataSourceId: VIEW_NAME.chatLogs,
        },
        resultsElement:{
            type:'a',
            attributes:[{name: 'href', value: '#'}],
            classes:'list-group-item my-list-item truncate-notification list-group-item-action'
        } ,
        keyId: 'roomName',
        keyType: KeyType.string,
        modifiers: {
            normal: '',
            inactive: 'list-group-item-dark',
            active: 'list-group-item-primary',
            warning: ''
        },
        detail: {
            containerClasses: 'd-flex w-100 justify-content-between',
            textElement: {
                type: 'span',
                classes: 'mb-1'
            },
            select: true,
            delete: {
                classes: 'btn bg-danger text-white btn-circle btn-sm',
                iconClasses: 'text-black fas fa-sign-out-alt',
            },
            badge: {
                type: 'span',
                classes: 'badge badge-pill badge-primary mr-1',
            }
        },
    };
    protected selectedChatLog: ChatLog | null = null;

   private constructor() {
        super(ChatLogsView.DOMConfig, new MemoryBufferStateManager(isSameRoom), STATE_NAMES.chatLogs);

        this.renderer = new ListViewRenderer(this, this);


        // handler binding
        this.handleChatLogsUpdated = this.handleChatLogsUpdated.bind(this);
        this.handleChatLogUpdated = this.handleChatLogUpdated.bind(this);
        this.handleChatStarted = this.handleChatStarted.bind(this);

        NotificationController.getInstance().addListener(this);
    }

    compareItemsForEquality(item1: any, item2: any): boolean {
        return isSameRoom(item1, item2);
    }

    handleNewInviteReceived(invite: Invitation): boolean {
        return true;
    }

    handleChatLogUpdated(log: ChatLog): void {
        csLogger(`Handling chat log updates`);
        this.updateStateManager();
    }

    onDocumentLoaded() {
        super.onDocumentLoaded();
        this.addEventCollectionListener(this);
        this.updateStateManager();
    }

    getIdForItemInNamedCollection(name: string, item: any) {
        return item.roomName;
    }

    renderDisplayForItemInNamedCollection(containerEl: HTMLElement, name: string, item: any): void {
        containerEl.innerHTML = item.users.join(',');
    }

    getModifierForItemInNamedCollection(name: string, item: any) {
        let result = Modifier.inactive;
        if (this.selectedChatLog) {
            if (this.selectedChatLog.roomName === item.roomName) {
                result = Modifier.active;
            }

        }
        return result;
    }

    getSecondaryModifierForItemInNamedCollection(name: string, item: any) {
        return this.getModifierForItemInNamedCollection(name, item);
    }

    selectChatRoom(roomName: string) {
        let room = ChatManager.getInstance().getChatLog(roomName);
        this.selectedChatLog = room;
        (<CollectionViewListenerForwarder>this.eventForwarder).itemSelected(this, this.selectedChatLog);
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
        (<CollectionViewListenerForwarder>this.eventForwarder).itemSelected(this, this.selectedChatLog);
        this.updateStateManager();
    }

    getBadgeValueForItemInNamedCollection(name: string, item: any): number {
        return item.unreadMessages + item.unreadHighMessages + item.unreadUrgentMessages;
    }

    canDeleteItem(view: View, selectedItem: any): boolean {
        return true;
    }

    itemDeleted(view: View, selectedItem: any): void {
        csLogger(`Deleting chat ${selectedItem.roomName}`);
        ChatManager.getInstance().leaveChat(selectedItem.roomName);
        if (this.selectedChatLog && (this.selectedChatLog.roomName === selectedItem.roomName)) {
            (<CollectionViewListenerForwarder>this.eventForwarder).itemDeselected(this, this.selectedChatLog);
            this.selectedChatLog = null;
        }
        this.updateStateManager();
    }

    hideRequested(view: View): void {
        if (this.selectedChatLog) {
            (<CollectionViewListenerForwarder>this.eventForwarder).itemDeselected(this, this.selectedChatLog);
            this.selectedChatLog = null;
        }
    }

    hidden() {
        this.hideRequested(this);
    }

    documentLoaded(view: View): void {
    }

    itemAction(view: View, actionName: string, selectedItem: any): void {
    }

    itemDragStarted(view: View, selectedItem: any): void {
    }

    itemDropped(view: View, droppedItem: any): void {
    }

    itemSelected(view: View, selectedItem: any): void {
        this.selectedChatLog = selectedItem;
        this.updateStateManager();
    }

    itemDeselected(view: View, selectedItem: any): void {
        this.selectedChatLog = null;
        this.updateStateManager();
    }

    showRequested(view: View): void {
    }

    handleOfflineMessagesReceived(messages: Message[]): void {
    }

    handleInvitationDeclined(room: string, username: string): void {
    }

    canSelectItem(view: CollectionView, selectedItem: any): boolean {
        return true;
    }

    private updateStateManager() {
        csLogger(`Updating state with chat manager`);
        let newState = ChatManager.getInstance().getChatLogs();
        csLogger(newState);
        this.stateManager.setStateByName(STATE_NAMES.chatLogs, newState, true);
    }
}

