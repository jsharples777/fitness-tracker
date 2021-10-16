import {SidebarViewContainer} from '../container/SidebarViewContainer';
import {SidebarLocation, SidebarPrefs} from "../ConfigurationTypes";
import {StateManager} from "../../state/StateManager";
import {UserSearchView} from "./UserSearchView";
import {FavouriteUserView} from "./FavouriteUserView";
import {BlockedUserView} from "./BlockedUserView";
import {ChatRoomsSidebar} from "./ChatRoomsSidebar";

export class UserSearchSidebar extends SidebarViewContainer {

    private static _instance: UserSearchSidebar;

    public static getInstance(stateManager:StateManager): UserSearchSidebar {
        if (!(UserSearchSidebar._instance)) {
            UserSearchSidebar._instance = new UserSearchSidebar(stateManager);
        }
        return UserSearchSidebar._instance;
    }
    static SidebarPrefs: SidebarPrefs = {
        id: 'userSearchSideBar',
        expandedSize: '35%',
        location: SidebarLocation.left
    }

    static SidebarContainers = {
        recentSearches: 'userSearchZone',
        favourites: 'favouriteUsersDropZone',
        blocked: 'blockedUsersDropZone'
    }

    private logSB:SidebarViewContainer;

    private constructor(stateManager:StateManager) {
        super(UserSearchSidebar.SidebarPrefs);
        const recentSearches = UserSearchView.getInstance(stateManager);
        this.addView(recentSearches, {containerId: UserSearchSidebar.SidebarContainers.recentSearches});
        const favouriteUsers = FavouriteUserView.getInstance(stateManager);
        this.addView(favouriteUsers, {containerId: UserSearchSidebar.SidebarContainers.favourites});
        const blockedUsers = BlockedUserView.getInstance(stateManager);
        this.addView(blockedUsers, {containerId: UserSearchSidebar.SidebarContainers.blocked});

        this.logSB = ChatRoomsSidebar.getInstance(stateManager);
    }
}


