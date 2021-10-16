import {SidebarViewContainer} from '../container/SidebarViewContainer';
import {SidebarLocation, SidebarPrefs} from "../ConfigurationTypes";
import {StateManager} from "../../state/StateManager";
import {ChatLogsView} from "./ChatLogsView";
import {ChatLogDetailView} from "./ChatLogDetailView";

export class ChatRoomsSidebar extends SidebarViewContainer {
    private static _instance: ChatRoomsSidebar;

    public static getInstance(stateManager: StateManager): ChatRoomsSidebar {
        if (!(ChatRoomsSidebar._instance)) {
            ChatRoomsSidebar._instance = new ChatRoomsSidebar(stateManager);
        }
        return ChatRoomsSidebar._instance;
    }

    static SidebarPrefs: SidebarPrefs = {
        id: 'chatSideBar',
        expandedSize: '35%',
        location: SidebarLocation.right
    }

    static SidebarContainers = {
        chatLogs: 'chatLogs',
        chatLog: 'chatLogRoom'
    }

    private constructor(stateManager: StateManager) {
        super(ChatRoomsSidebar.SidebarPrefs);
        const chatView = ChatLogsView.getInstance();
        this.addView(chatView, {containerId: ChatRoomsSidebar.SidebarContainers.chatLogs});

        const chatLogView = ChatLogDetailView.getInstance(stateManager);
        this.addView(chatLogView, {containerId: ChatRoomsSidebar.SidebarContainers.chatLog});
        chatView.addEventListener(chatLogView);
    }
}


