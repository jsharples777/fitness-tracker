import debug from 'debug';
import {StateManager} from '../../state/StateManager';
import {ChatEventListener} from "../../socket/ChatEventListener";
import {NotificationController} from "../../socket/NotificationController";
import {ChatManager} from "../../socket/ChatManager";
import browserUtil from "../../util/BrowserUtil";
import moment from "moment";
import {ChatLog, Invitation, Message, Priority} from "../../socket/Types";
import Controller from "../../Controller";
import {CollectionViewListener} from "../../ui-framework/view/interface/CollectionViewListener";
import {DRAGGABLE, STATE_NAMES, VIEW_NAME} from "../../AppTypes";
import StateChangeListener from "../../state/StateChangeListener";
import {
    DRAGGABLE_KEY_ID,
    DRAGGABLE_TYPE,
    Modifier,
    ViewDOMConfig
} from "../../ui-framework/ConfigurationTypes";
import {View} from '../../ui-framework/view/interface/View';
import NotificationManager from "../../notification/NotificationManager";
import { CollectionView } from '../../ui-framework/view/interface/CollectionView';


const csLoggerDetail = debug('chat-sidebar:detail');

class ChatLogDetailView implements View, ChatEventListener, CollectionViewListener, StateChangeListener {
    private static newFormId: string = "newMessage";
    private static commentId: string = "message";
    private static submitCommentId: string = "submitMessage";
    private static chatLogId: string = 'chatLog';
    private static chatLogRoomId: string = 'chatLogRoom';
    private static leaveChatId: string = 'leaveChat';
    private static chatFastSearchUserNames: string = 'chatFastSearchUserNames';


    // @ts-ignore
    protected chatRoomDiv: HTMLElement;
    // @ts-ignore
    protected chatLogDiv: HTMLElement;
    // @ts-ignore
    protected chatForm: HTMLElement;
    // @ts-ignore
    protected commentEl: HTMLElement;
    // @ts-ignore
    protected sendMessageButton: HTMLElement;
    // @ts-ignore
    protected leaveChatButton: HTMLElement;
    // @ts-ignore
    protected fastUserSearch: HTMLElement;

    protected stateManager: StateManager;

    protected selectedChatLog: ChatLog | null;


    constructor(stateManager: StateManager) {
        this.stateManager = stateManager;
        this.selectedChatLog = null;

        // handler binding
        this.handleAddMessage = this.handleAddMessage.bind(this);
        this.handleChatLogsUpdated = this.handleChatLogsUpdated.bind(this);
        this.handleChatLogUpdated = this.handleChatLogUpdated.bind(this);
        this.handleChatStarted = this.handleChatStarted.bind(this);
        this.handleUserDrop = this.handleUserDrop.bind(this);
        this.leaveChat = this.leaveChat.bind(this);
        this.eventUserSelected = this.eventUserSelected.bind(this);

        NotificationController.getInstance().addListener(this);
        this.stateManager.addChangeListenerForName(STATE_NAMES.users, this);
    }

    canSelectItem(view: CollectionView, selectedItem: any): boolean {
        return true;
    }

    hasPermissionToDeleteItemInNamedCollection(name: string, item: any): boolean {
        throw new Error('Method not implemented.');
    }
    hasPermissionToUpdateItemInNamedCollection(name: string, item: any): boolean {
        throw new Error('Method not implemented.');
    }
    hasChanged(): boolean {
        throw new Error('Method not implemented.');
    }

    setContainedBy(container: HTMLElement): void {}
    addEventListener(listener: CollectionViewListener): void {}

    getIdForItemInNamedCollection(name: string, item: any): string {
        throw new Error('Method not implemented.');
    }
    getDisplayValueForItemInNamedCollection(name: string, item: any): string {
        throw new Error('Method not implemented.');
    }
    compareItemsForEquality(item1: any, item2: any): boolean {
        throw new Error('Method not implemented.');
    }
    getModifierForItemInNamedCollection(name: string, item: any): Modifier {
        throw new Error('Method not implemented.');
    }
    getSecondaryModifierForItemInNamedCollection(name: string, item: any): Modifier {
        throw new Error('Method not implemented.');
    }
    getBadgeValueForItemInNamedCollection(name: string, item: any): number {
        throw new Error('Method not implemented.');
    }
    getBackgroundImageForItemInNamedCollection(name: string, item: any): string {
        throw new Error('Method not implemented.');
    }
    updateViewForNamedCollection(name: string, newState: any): void {
        throw new Error('Method not implemented.');
    }

    itemDeselected(view: View, selectedItem: any): void {
        csLoggerDetail(`Chat Log with id ${selectedItem.roomName} deselected`);
        if (this.selectedChatLog && (selectedItem.roomName === this.selectedChatLog.roomName)) {
            this.selectedChatLog = null;
            this.checkCanComment();
            this.clearChatLog();
        }
    }


    itemSelected(view: View, selectedItem: ChatLog): void {
        this.selectedChatLog = selectedItem;
        if (this.selectedChatLog) {
            csLoggerDetail(`Chat Log with id ${selectedItem.roomName} selected`);
            this.checkCanComment();
            this.renderChatLog(this.selectedChatLog);
        }
    }

    canDeleteItem(view: View, selectedItem: any): boolean {
        return true;
    }

    itemDeleted(view: View, selectedItem: any): void {
        csLoggerDetail(`Chat Log with ${selectedItem.roomName} deleting`);
        if (this.selectedChatLog && (this.selectedChatLog.roomName === selectedItem.roomName)) {
            this.checkCanComment();
            this.renderChatLog(this.selectedChatLog);
        }
    }

    hideRequested(view: View): void {
        this.selectedChatLog = null;
        this.checkCanComment();
        this.clearChatLog();
    }

    handleUserDrop(event: Event) {
        csLoggerDetail('drop event on current chat room');
        if (this.selectedChatLog) {
            // @ts-ignore
            const draggedObjectJSON = event.dataTransfer.getData(DRAGGABLE_KEY_ID);
            const draggedObject = JSON.parse(draggedObjectJSON);
            csLoggerDetail(draggedObject);

            if (draggedObject[DRAGGABLE_TYPE] === DRAGGABLE.typeUser) {
                //add the user to the current chat if not already there
                ChatManager.getInstance().sendInvite(draggedObject.username, this.selectedChatLog.roomName);
                NotificationManager.getInstance().show('Chat', `Invited ${draggedObject.username} to the chat.`);
            }
        }

    }

    handleChatLogUpdated(log: ChatLog): void {
        csLoggerDetail(`Handling chat log updates`);
        this.checkCanComment();
        this.renderChatLog(log);
    }

    handleAddMessage(event: Event): void {
        event.preventDefault();
        event.stopPropagation();
        csLoggerDetail(`Handling message event`);
        if (this.selectedChatLog) {
            // @ts-ignore
            if (this.commentEl && this.commentEl.value.trim().length === 0) return;
            // @ts-ignore
            const messageContent = this.commentEl.value.trim();
            // @ts-ignore
            this.commentEl.value = '';

            let sentMessage: Message | null = ChatManager.getInstance().sendMessage(this.selectedChatLog.roomName, messageContent, Priority.Normal, {});
            if (sentMessage) {
                // add the message to our display
                let messageEl = this.addChatMessage(sentMessage);
                // scroll to bottom
                browserUtil.scrollSmoothTo(messageEl);
            }
        }
    }

    onDocumentLoaded() {
        // @ts-ignore
        this.chatLogDiv = document.getElementById(ChatLogDetailView.chatLogId);
        // @ts-ignore
        this.commentEl = document.getElementById(ChatLogDetailView.commentId);
        // @ts-ignore
        this.chatForm = document.getElementById(ChatLogDetailView.newFormId);
        // @ts-ignore
        this.sendMessageButton = document.getElementById(ChatLogDetailView.submitCommentId);
        // @ts-ignore
        this.leaveChatButton = document.getElementById(ChatLogDetailView.leaveChatId);
        // @ts-ignore
        this.chatRoomDiv = document.getElementById(ChatLogDetailView.chatLogRoomId);
        // @ts-ignore
        this.fastUserSearch = document.getElementById(ChatLogDetailView.chatFastSearchUserNames);

        this.chatRoomDiv.addEventListener('dragover', (event) => {
            csLoggerDetail('Dragged over');
            if (this.selectedChatLog) event.preventDefault();
        });
        this.chatRoomDiv.addEventListener('drop', this.handleUserDrop);


        this.chatForm.addEventListener('submit', this.handleAddMessage);
        this.leaveChatButton.addEventListener('click', this.leaveChat);

        this.checkCanComment();

        // fast user search
        // @ts-ignore
        const fastSearchEl = $(`#${ChatLogDetailView.chatFastSearchUserNames}`);
        // @ts-ignore
        fastSearchEl.on('autocompleteselect', this.eventUserSelected);
    }

    eventUserSelected(event: Event, ui: any) {
        event.preventDefault();
        event.stopPropagation();
        csLoggerDetail(`User ${ui.item.label} with id ${ui.item.value} selected`);
        // @ts-ignore
        event.target.innerText = '';

        // add to the chat, if one selected
        if (this.selectedChatLog) ChatManager.getInstance().sendInvite(ui.item.label, this.selectedChatLog.roomName);
        NotificationManager.getInstance().show('Chat', `Invited ${ui.item.label} to the chat.`);
    }

    addChatMessage(message: Message): HTMLElement {
        let chatMessageEl = document.createElement('div');
        browserUtil.addRemoveClasses(chatMessageEl, "message");
        // are we dealing with an "join"/"exit" message?
        if (message.from.trim().length === 0) {
            let messageSenderEl = document.createElement('div');
            browserUtil.addRemoveClasses(messageSenderEl, 'message-sender');
            messageSenderEl.innerText = message.message;
            chatMessageEl.appendChild(messageSenderEl);
        } else {

            if (message.from === ChatManager.getInstance().getCurrentUser()) {
                browserUtil.addRemoveClasses(chatMessageEl, "my-message");
            } else {
                let messageSenderEl = document.createElement('div');
                browserUtil.addRemoveClasses(messageSenderEl, 'message-sender');
                messageSenderEl.innerText = message.from + '   ' + moment(message.created, 'YYYYMMDDHHmmss').format('DD/MM/YYYY ');
                chatMessageEl.appendChild(messageSenderEl);
            }

            let contentEl = document.createElement('div');
            if (message.from === ChatManager.getInstance().getCurrentUser()) {
                browserUtil.addRemoveClasses(contentEl, "my-message-content");
            } else {
                browserUtil.addRemoveClasses(contentEl, 'message-content');
            }
            contentEl.innerText = message.message;
            chatMessageEl.appendChild(contentEl);
        }

        this.chatLogDiv.appendChild(chatMessageEl);
        return chatMessageEl;
    }

    reRenderChatMessages(chatLog: ChatLog) {
        browserUtil.removeAllChildren(this.chatLogDiv);
        let messageEl: HTMLElement | null = null;
        chatLog.messages.forEach((message: Message) => {
            messageEl = this.addChatMessage(message);
        });
        // scroll to the last message (if any)
        if (messageEl) browserUtil.scrollTo(messageEl);
    }

    renderChatLog(chatLog: ChatLog) {
        csLoggerDetail(`Chat Log ${chatLog.roomName} rendering`);
        if (this.selectedChatLog) {
            if (this.selectedChatLog.roomName === chatLog.roomName) {
                this.selectedChatLog = chatLog;
                ChatManager.getInstance().touchChatLog(chatLog.roomName);
                // render the chat conversation
                this.reRenderChatMessages(chatLog);
            }
        }
    }


    handleChatLogsUpdated(): void {
        if (this.selectedChatLog) {
            ChatManager.getInstance().touchChatLog(this.selectedChatLog.roomName);
            // render the chat conversation
            this.reRenderChatMessages(this.selectedChatLog);
        }
        this.checkCanComment();
    }

    handleChatStarted(log: ChatLog): void {
        this.selectedChatLog = log;
        this.renderChatLog(log);
    }

    private leaveChat(event: Event) {
        event.preventDefault();
        event.stopPropagation();
        if (this.selectedChatLog) {
            ChatManager.getInstance().leaveChat(this.selectedChatLog.roomName);
            this.selectedChatLog = null;
            this.clearChatLog();
            this.checkCanComment();
        }
    }

    private checkCanComment() {
        if (this.selectedChatLog) {
            if (this.commentEl) this.commentEl.removeAttribute("readonly");
            if (this.commentEl) this.commentEl.removeAttribute("disabled");
            if (this.sendMessageButton) this.sendMessageButton.removeAttribute("disabled");
            if (this.leaveChatButton) this.leaveChatButton.removeAttribute("disabled");
            if (this.fastUserSearch) this.fastUserSearch.removeAttribute("disabled");
        } else {
            if (this.commentEl) this.commentEl.setAttribute("readonly", "true");
            if (this.commentEl) this.commentEl.setAttribute("disabled", "true");
            if (this.sendMessageButton) this.sendMessageButton.setAttribute("disabled", "true");
            if (this.leaveChatButton) this.leaveChatButton.setAttribute("disabled", "true");
            if (this.fastUserSearch) this.fastUserSearch.setAttribute("disabled", "true");
        }

    }

    private clearChatLog() {
        browserUtil.removeAllChildren(this.chatLogDiv);
    }

    stateChanged(managerName: string, name: string, newValue: any): void {
        if (name === STATE_NAMES.users) {
            // @ts-ignore
            const fastSearchEl = $(`#${ChatLogDetailView.ssFastSearchUserNames}`);
            // what is my username?
            let myUsername = Controller.getInstance().getLoggedInUsername();
            // for each name, construct the patient details to display and the id referenced
            const fastSearchValues: any = [];
            newValue.forEach((item: any) => {
                const searchValue = {
                    label: item.username,
                    value: item._id,
                };
                // @ts-ignore
                if (myUsername !== item.username) fastSearchValues.push(searchValue); // don't search for ourselves
            });
            fastSearchEl.autocomplete({source: fastSearchValues});
            fastSearchEl.autocomplete('option', {disabled: false, minLength: 1});
        }
    }




    stateChangedItemAdded(managerName: string, name: string, itemAdded: any): void {
        this.stateChanged(managerName, name, this.stateManager.getStateByName(name));
    }

    stateChangedItemRemoved(managerName: string, name: string, itemRemoved: any): void {}
    stateChangedItemUpdated(managerName: string, name: string, itemUpdated: any, itemNewValue: any): void {}

    handleOfflineMessagesReceived(messages: Message[]): void {}
    handleInvitationDeclined(room: string, username: string): void {}
    handleNewInviteReceived(invite: Invitation): boolean {return true;}

    itemDragStarted(view: View, selectedItem: any): void {}
    itemAction(view: View, actionName: string, selectedItem: any): void {}
    documentLoaded(view: View): void {}
    showRequested(view: View): void {}
    itemDropped(view: View, droppedItem: any): void {}

    getName(): string {
        return VIEW_NAME.chatLog;
    }

    hidden(): void {
        this.hideRequested(this);
    }

    getDataSourceKeyId(): string {
        return "";
    }

    getUIConfig(): ViewDOMConfig {
        // @ts-ignore
        return undefined;
    }

    render(): void {}

    show(): void {
    }

}

export default ChatLogDetailView;
