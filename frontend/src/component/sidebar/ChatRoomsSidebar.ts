import SidebarViewContainer from '../../ui-framework/SidebarViewContainer';
import {SidebarLocation, SidebarPrefs} from "../../ui-framework/ConfigurationTypes";

class ChatRoomsSidebar extends SidebarViewContainer {
    static SidebarPrefs:SidebarPrefs = {
        id:'userSearchSideBar',
        expandedSize:'35%',
        location: SidebarLocation.left
    }

    static SidebarContainers = {
        chatLogs: 'chatLogs',
        chatLog: 'chatLogRoom'
    }

    constructor() {
        super(ChatRoomsSidebar.SidebarPrefs);
    }
}

export default ChatRoomsSidebar;
