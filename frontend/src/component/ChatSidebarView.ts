import debug from 'debug';
import SidebarView from './SidebarView';
import {StateManager} from '../state/StateManager';
import {ChatEventListener} from "../socket/ChatEventListener";
import {NotificationController} from "../socket/NotificationController";
import {ChatManager} from "../socket/ChatManager";
import browserUtil from "../util/BrowserUtil";
import moment from "moment";
import {ChatLog, Invitation, Message, Priority} from "../socket/Types";
import controller from "../Controller";
import notifier from "../notification/NotificationManager";


const csLogger = debug('chat-sidebar');
const csLoggerDetail = debug('chat-sidebar:detail');

class ChatSidebarView extends SidebarView implements ChatEventListener {
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

    protected selectedChatLog: ChatLog | null = null;

    constructor(applicationView: any, htmlDocument: HTMLDocument, stateManager: StateManager) {
        super(applicationView, htmlDocument, applicationView.state.ui.chatSideBar, applicationView.state.uiPrefs.chatSideBar, stateManager);

        this.config = applicationView.state;

        // handler binding
        this.updateView = this.updateView.bind(this);
        this.eventClickItem = this.eventClickItem.bind(this);
        this.handleAddMessage = this.handleAddMessage.bind(this);
        this.handleChatLogsUpdated = this.handleChatLogsUpdated.bind(this);
        this.handleChatLogUpdated = this.handleChatLogUpdated.bind(this);
        this.handleChatStarted = this.handleChatStarted.bind(this);
        this.handleUserDrop = this.handleUserDrop.bind(this);
        this.leaveChat = this.leaveChat.bind(this);
        this.eventUserSelected = this.eventUserSelected.bind(this);
        this.eventHide = this.eventHide.bind(this);

        NotificationController.getInstance().addListener(this);
        stateManager.addChangeListenerForName(this.config.stateNames.users, this);
    }

    handleNewInviteReceived(invite: Invitation): boolean {
        throw new Error('Method not implemented.');
    }

    handleUserDrop(event: Event) {
        csLogger('drop event on current chat room');
        if (this.selectedChatLog) {
            // @ts-ignore
            const draggedObjectJSON = event.dataTransfer.getData(this.config.ui.draggable.draggableDataKeyId);
            const draggedObject = JSON.parse(draggedObjectJSON);
            csLogger(draggedObject);

            if (draggedObject[this.config.ui.draggable.draggedType] === this.config.ui.draggable.draggedTypeUser) {
                //add the user to the current chat if not already there
                ChatManager.getInstance().sendInvite(draggedObject.username, this.selectedChatLog.roomName);
                notifier.show('Chat', `Invited ${draggedObject.username} to the chat.`);
            }
        }

    }

    handleChatLogUpdated(log: ChatLog): void {
        csLogger(`Handling chat log updates`);
        this.checkCanComment();
        this.renderChatLog(log);
        this.updateView('', {})
    }

    handleAddMessage(event: Event): void {
        event.preventDefault();
        event.stopPropagation();
        csLogger(`Handling message event`);
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
        super.onDocumentLoaded();
        // @ts-ignore
        this.chatLogDiv = document.getElementById(this.uiConfig.dom.chatLogId);
        // @ts-ignore
        this.commentEl = document.getElementById(this.uiConfig.dom.commentId);
        // @ts-ignore
        this.chatForm = document.getElementById(this.uiConfig.dom.newFormId);
        // @ts-ignore
        this.sendMessageButton = document.getElementById(this.uiConfig.dom.submitCommentId);
        // @ts-ignore
        this.leaveChatButton = document.getElementById(this.uiConfig.dom.leaveChatId);
        // @ts-ignore
        this.chatRoomDiv = document.getElementById(this.uiConfig.dom.chatLogRoomId);
        // @ts-ignore
        this.fastUserSearch = document.getElementById(this.uiConfig.dom.chatFastSearchUserNames);

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
        const fastSearchEl = $(`#${this.uiConfig.dom.chatFastSearchUserNames}`);
        fastSearchEl.on('autocompleteselect', this.eventUserSelected);


        this.updateView('', {});
    }

    eventUserSelected(event: Event, ui: any) {
        event.preventDefault();
        event.stopPropagation();
        csLogger(`User ${ui.item.label} with id ${ui.item.value} selected`);
        // @ts-ignore
        event.target.innerText = '';

        // add to the chat, if one selected
        if (this.selectedChatLog) ChatManager.getInstance().sendInvite(ui.item.label, this.selectedChatLog.roomName);
        notifier.show('Chat', `Invited ${ui.item.label} to the chat.`);
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
        let result = 'inactive';
        if (this.selectedChatLog) {
            if (this.selectedChatLog.roomName === item.roomName) {
                result = 'active';
            }

        }
        return result;
    }

    getSecondaryModifierForStateItem(name: string, item: any) {
        return this.getModifierForStateItem(name, item);
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
        this.updateView('', {});
    }

    eventClickItem(event: MouseEvent) {
        event.preventDefault();
        event.stopPropagation();
        console.log(event.target);
        // @ts-ignore
        const room = event.target.getAttribute(this.uiConfig.dom.resultDataKeyId);
        // @ts-ignore
        const dataSource = event.target.getAttribute(this.uiConfig.dom.resultDataSourceId);

        // @ts-ignore
        csLoggerDetail(`Chat Log ${event.target} with id ${room} clicked from ${dataSource}`);
        this.selectedChatLog = ChatManager.getInstance().getChatLog(room);
        if (this.selectedChatLog) {
            this.checkCanComment();
            this.renderChatLog(this.selectedChatLog);
        }
    }

    public selectChatRoom(room: string) {
        csLoggerDetail(`Chat Log with id ${room} selected`);
        this.selectedChatLog = ChatManager.getInstance().getChatLog(room);
        if (this.selectedChatLog) {
            this.checkCanComment();
            this.renderChatLog(this.selectedChatLog);
        }

    }

    updateView(name: string, newState: any) {
        if (name === this.config.stateNames.users) {
            // load the search names into the search field
            // except for the users already in the chat
            csLoggerDetail(`Updating the fast user search`)
            csLoggerDetail(newState);
            // what is my username?
            let myUsername = controller.getLoggedInUsername();
            // @ts-ignore
            const fastSearchEl = $(`#${this.uiConfig.dom.chatFastSearchUserNames}`);
            // for each name, construct the patient details to display and the id referenced
            const fastSearchValues: any = [];
            if (newState) {
                newState.forEach((item: any) => {
                    const searchValue = {
                        label: item.username,
                        value: item.id,
                    };
                    // @ts-ignore
                    if (myUsername !== item.username) fastSearchValues.push(searchValue); // don't search for ourselves
                });
                fastSearchEl.autocomplete({source: fastSearchValues});
                fastSearchEl.autocomplete('option', {disabled: false, minLength: 1});
            }

        } else {
            csLoggerDetail(`Updating state with chat manager`);
            newState = ChatManager.getInstance().getChatLogs();
            csLoggerDetail(newState);
            this.createResultsForState(name, newState);
            this.checkCanComment();

        }
    }

    getDragData(event: DragEvent) {

    }

    handleChatLogsUpdated(): void {
        if (this.selectedChatLog) {
            ChatManager.getInstance().touchChatLog(this.selectedChatLog.roomName);
            // render the chat conversation
            this.reRenderChatMessages(this.selectedChatLog);
        }
        this.updateView('', {});
        this.checkCanComment();
    }

    handleChatStarted(log: ChatLog): void {
        this.selectedChatLog = log;
        this.renderChatLog(log);
        this.updateView('', {});
    }

    eventHide(event: Event | null) {
        super.eventHide(event);
        // deselect the selected chat
        if (this.selectedChatLog) {
            this.selectedChatLog = null;
            this.checkCanComment();
            this.clearChatLog();
        }

    }

    handleOfflineMessagesReceived(messages: Message[]): void {
    }

    handleInvitationDeclined(room: string, username: string): void {
    }

    protected getBadgeValue(name: string, item: any): number {
        return item.numOfNewMessages;
    }

    protected eventDeleteClickItem(event: MouseEvent): void {
        event.preventDefault();
        event.stopPropagation();
        console.log(event.target);
        // @ts-ignore
        const room = event.target.getAttribute(this.uiConfig.dom.resultDataKeyId);
        // @ts-ignore
        const dataSource = event.target.getAttribute(this.uiConfig.dom.resultDataSourceId);

        // @ts-ignore
        csLoggerDetail(`Chat Log ${event.target} with id ${room} deleted from ${dataSource}`);

        if (room) {
            let log: ChatLog | null = ChatManager.getInstance().getChatLog(room);
            if (log) {
                ChatManager.getInstance().leaveChat(room);
                if (this.selectedChatLog && (this.selectedChatLog.roomName === room)) {
                    this.selectedChatLog = null;
                    this.clearChatLog();
                    this.checkCanComment();
                }
                this.updateView('', {});
            }
        }


    }

    protected getBackgroundImage(name: string, item: any): string {
        return "";
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
        this.updateView('', {});
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


}

export default ChatSidebarView;
