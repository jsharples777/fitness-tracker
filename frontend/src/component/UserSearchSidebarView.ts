import debug from 'debug';
import SidebarView from '../ui-framework/SidebarView';
import {StateManager} from '../state/StateManager';
import {isSame, isSameUsername} from '../util/EqualityFunctions';
import {ChatUserEventListener} from "../socket/ChatUserEventListener";
import {NotificationController} from "../socket/NotificationController";
import controller from "../Controller";
import BrowserStorageStateManager from "../state/BrowserStorageStateManager";
import {ChatManager} from "../socket/ChatManager";
import browserUtil from "../util/BrowserUtil";

const vLogger = debug('user-search-sidebar');
const vLoggerDetail = debug('user-search-sidebar:detail');

class UserSearchSidebarView extends SidebarView implements ChatUserEventListener {
    protected loggedInUsers: string[];
    protected localisedSM: StateManager;
    // @ts-ignore
    protected favUsersDiv: HTMLElement;
    // @ts-ignore
    protected favUsersDropZone: HTMLElement;
    // @ts-ignore
    protected blockedUsersDiv: HTMLElement;
    // @ts-ignore
    protected blockedUsersDropZone: HTMLElement;

    constructor(applicationView: any, htmlDocument: HTMLDocument, stateManager: StateManager) {
        super(applicationView, htmlDocument, applicationView.state.ui.userSearchSideBar, applicationView.state.uiPrefs.userSearchSideBar, stateManager);

        this.config = applicationView.state;
        this.loggedInUsers = [];

        // handler binding
        this.updateView = this.updateView.bind(this);
        this.eventClickItem = this.eventClickItem.bind(this);
        this.eventUserSelected = this.eventUserSelected.bind(this);
        this.handleLoggedInUsersUpdated = this.handleLoggedInUsersUpdated.bind(this);
        this.handleFavouriteUserLoggedIn = this.handleFavouriteUserLoggedIn.bind(this);
        this.handleFavouriteUserLoggedOut = this.handleFavouriteUserLoggedOut.bind(this);
        this.handleFavouriteUsersChanged = this.handleFavouriteUsersChanged.bind(this);
        this.handleBlockedUsersChanged = this.handleBlockedUsersChanged.bind(this);
        this.handleLoggedInUsersUpdated = this.handleLoggedInUsersUpdated.bind(this);

        this.handleFavouriteUserDrop = this.handleFavouriteUserDrop.bind(this);
        this.handleBlockedUserDrop = this.handleBlockedUserDrop.bind(this);

        // register state change listening
        stateManager.addChangeListenerForName(this.config.stateNames.users, this);
        this.localisedSM = new BrowserStorageStateManager(true);
        this.localisedSM.addChangeListenerForName(this.config.stateNames.recentUserSearches, this);
        NotificationController.getInstance().addUserListener(this);

        vLogger(this.localisedSM.getStateByName(this.config.stateNames.recentUserSearches));

    }

    handleFavouriteUserDrop(event: Event) {
        vLogger('drop event on favourites');
        // @ts-ignore
        const draggedObjectJSON = event.dataTransfer.getData(this.config.ui.draggable.draggableDataKeyId);
        const draggedObject = JSON.parse(draggedObjectJSON);
        vLogger(draggedObject);

        if (draggedObject[this.config.ui.draggable.draggedType] === this.config.ui.draggable.draggedTypeUser) {
            switch (draggedObject[this.config.ui.draggable.draggedFrom]) {
                case this.config.ui.draggable.draggedFromUserSearch: {
                    // we know we have dragged a user from the user search to our favorites and dropped it
                    // is this user already in the favourites?
                    if (ChatManager.getInstance().isUserInFavouriteList(draggedObject.username)) {
                        vLogger(`${draggedObject.username} already in favourite list, ignoring`);
                        return;
                    }
                    // ok, so we have a new user to add to the favourite list
                    // add the user to the Chat Manager and we should get an event about it
                    ChatManager.getInstance().addUserToFavouriteList(draggedObject.username);
                    break;
                }
            }
        }
    }

    handleBlockedUserDrop(event: Event) {
        vLogger('drop event on blocked users');
        // @ts-ignore
        const draggedObjectJSON = event.dataTransfer.getData(this.config.ui.draggable.draggableDataKeyId);
        const draggedObject = JSON.parse(draggedObjectJSON);
        vLogger(draggedObject);

        if (draggedObject[this.config.ui.draggable.draggedType] === this.config.ui.draggable.draggedTypeUser) {
            switch (draggedObject[this.config.ui.draggable.draggedFrom]) {
                case this.config.ui.draggable.draggedFromUserSearch: {
                    // we know we have dragged a user from the user search to our blocked users and dropped it
                    // is this user already in the favourites?
                    if (ChatManager.getInstance().isUserInBlockedList(draggedObject.username)) {
                        vLogger(`${draggedObject.username} already in blocked list, ignoring`);
                        return;
                    }
                    // ok, so we have a new user to add to the favourite list
                    // add the user to the Chat Manager and we should get an event about it
                    ChatManager.getInstance().addUserToBlockedList(draggedObject.username);
                    break;
                }
            }
        }
    }


    handleLoggedInUsersUpdated(usernames: string[]): void {
        vLogger(`Received new list of users who are logged in `);
        vLogger(usernames);
        this.loggedInUsers = usernames;
        this.reRenderView();
    }

    handleFavouriteUserLoggedIn(username: string): void {
        vLogger(`Handle Favourite User ${username} logged in`);
        this.reRenderView();
    }

    handleFavouriteUserLoggedOut(username: string): void {
        vLogger(`Handle Favourite User ${username} logged in`);
        this.reRenderView();
    }

    handleFavouriteUsersChanged(usernames: string[]): void {
        vLogger(`Handle Favourite Users changed to ${usernames}`);
        this.reRenderView();
    }

    handleBlockedUsersChanged(usernames: string[]): void {
        vLogger(`Handle Blocked Users changed to ${usernames}`);
        this.reRenderView();
    }

    onDocumentLoaded() {
        super.onDocumentLoaded();
        // @ts-ignore
        const fastSearchEl = $(`#${this.uiConfig.dom.extra.fastSearchInputId}`);
        fastSearchEl.on('autocompleteselect', this.eventUserSelected);

        // ok lets add the favourite users area and event handling for that now
        // @ts-ignore
        this.favUsersDropZone = document.getElementById(this.uiConfig.dom.favouriteUsersDropZone);
        this.favUsersDropZone.addEventListener('dragover', (event) => {
            vLogger('Dragged over');
            event.preventDefault();
        });
        this.favUsersDropZone.addEventListener('drop', this.handleFavouriteUserDrop);

        // @ts-ignore
        this.favUsersDiv = document.getElementById(this.uiConfig.dom.favouriteUsersId);

        // ok lets add the favourite users area and event handling for that now
        // @ts-ignore
        this.blockedUsersDropZone = document.getElementById(this.uiConfig.dom.blockedUsersDropZone);
        this.blockedUsersDropZone.addEventListener('dragover', (event) => {
            vLogger('Dragged over');
            event.preventDefault();
        });
        this.blockedUsersDropZone.addEventListener('drop', this.handleBlockedUserDrop);

        // @ts-ignore
        this.blockedUsersDiv = document.getElementById(this.uiConfig.dom.blockedUsersId);

        this.renderFavouriteUsers();
        this.renderBlockedUsers();


    }

    getIdForStateItem(name: string, item: any) {
        return item.id;
    }

    getLegacyIdForStateItem(name: string, item: any) {
        return item.id;
    }

    getDisplayValueForStateItem(name: string, item: any) {
        return item.username;
    }

    getModifierForStateItem(name: string, item: any) {
        let result = 'normal';
        vLoggerDetail(`Checking for item modifiers`);
        vLoggerDetail(item);
        // if the user is currently logged out make the item inactive
        if (!ChatManager.getInstance().isUserLoggedIn(item.username)) {
            result = 'inactive';
        }
        return result;
    }

    getSecondaryModifierForStateItem(name: string, item: any) {
        let result = 'normal';
        vLoggerDetail(`Checking for item secondary modifiers ${item.username}`);
        // if the user is in the black list then show warning and a favourite user is highlighted
        if (NotificationController.getInstance().isFavouriteUser(item.username)) {
            vLoggerDetail(`is favourite`);
            result = 'active';
        }
        if (NotificationController.getInstance().isBlockedUser(item.username)) {
            vLoggerDetail(`is blocked`);
            result = 'warning';
        }
        return result;
    }

    eventClickItem(event: MouseEvent) {
        event.preventDefault();
        event.stopPropagation();
        console.log(event.target);
        // @ts-ignore
        const userId = event.target.getAttribute(this.uiConfig.dom.resultDataKeyId);
        // @ts-ignore
        const dataSource = event.target.getAttribute(this.uiConfig.dom.resultDataSourceId);

        if (dataSource === this.uiConfig.dom.resultDataSourceBlockedUsers) {
            vLoggerDetail(`Blocked user clicked - not activating`);
            return;
        }
        // @ts-ignore
        vLoggerDetail(`User ${event.target} with id ${userId} clicked from ${dataSource}`);

        let user: any = this.stateManager.findItemInState(this.config.stateNames.users, {id: parseInt(userId)}, isSame);
        vLogger(user);
        const roomName = NotificationController.getInstance().startChatWithUser(user.username);
        this.applicationView.handleShowChat(event, roomName);
    }

    eventUserSelected(event: Event, ui: any) {
        event.preventDefault();
        event.stopPropagation();
        vLogger(`User ${ui.item.label} with id ${ui.item.value} selected`);
        // @ts-ignore
        event.target.innerText = '';

        // add the selected user to the recent user searches
        if (this.localisedSM.isItemInState(this.config.stateNames.recentUserSearches, {id: ui.item.value}, isSame)) return;

        const recentUserSearches = this.localisedSM.getStateByName(this.config.stateNames.recentUserSearches);
        vLogger(`saved searches too long? ${this.config.controller.dataLimit.recentUserSearches}`);
        if (recentUserSearches.length >= this.config.controller.dataLimit.recentUserSearches) {
            vLogger('saved searches too long - removing first');
            // remove the first item from recent searches
            const item = recentUserSearches.shift();
            this.localisedSM.removeItemFromState(this.config.stateNames.recentUserSearches, item, isSame, true);
        }
        // save the searches
        this.localisedSM.addNewItemToState(this.config.stateNames.recentUserSearches, {
            id: ui.item.value,
            username: ui.item.label
        }, true);
    }

    reRenderView() {
        this.updateView(this.config.stateNames.recentUserSearches, this.localisedSM.getStateByName(this.config.stateNames.recentUserSearches));
        this.renderFavouriteUsers();
        this.renderBlockedUsers();
    }

    updateView(name: string, newState: any) {
        if (name === this.config.stateNames.recentUserSearches) {
            vLogger(`Updating for recent searches`);
            newState = this.localisedSM.getStateByName(this.config.stateNames.recentUserSearches);
            vLogger(newState);
            this.createResultsForState(name, newState);
        }
        if (name === this.config.stateNames.users) {
            // load the search names into the search field
            // what is my username?
            let myUsername = controller.getLoggedInUsername();
            // @ts-ignore
            const fastSearchEl = $(`#${this.uiConfig.dom.extra.fastSearchInputId}`);
            // for each name, construct the patient details to display and the id referenced
            const fastSearchValues: any = [];
            newState.forEach((item: any) => {
                const searchValue = {
                    label: item.username,
                    value: item.id,
                };
                if (myUsername !== item.username) fastSearchValues.push(searchValue); // don't search for ourselves
            });
            fastSearchEl.autocomplete({source: fastSearchValues});
            fastSearchEl.autocomplete('option', {disabled: false, minLength: 1});
        }
    }

    getDragData(event: DragEvent) {
        // use the actual id to pass the user to the droppable target
        // @ts-ignore
        const userId = event.target.getAttribute(this.uiConfig.dom.resultDataKeyId);
        // @ts-ignore
        vLoggerDetail(`User ${event.target.innerText} with id ${userId} dragging`);
        let user = this.stateManager.findItemInState(this.config.stateNames.users, {id: parseInt(userId)}, isSame);
        vLoggerDetail(user);
        user[this.config.ui.draggable.draggedType] = this.config.ui.draggable.draggedTypeUser;
        user[this.config.ui.draggable.draggedFrom] = this.config.ui.draggable.draggedFromUserSearch;
        return user;
    }

    deleteFavouriteUser(user: any) {
        // @ts-ignore
        vLogger(`Favourite user ${user.username} with id ${user.id} deleted - removing`);
        ChatManager.getInstance().removeUserFromFavouriteList(user.username);
    }

    deleteBlockedUser(user: any) {
        // @ts-ignore
        vLogger(`Blocked user ${user.username} with id ${user.id} deleted - removing`);
        ChatManager.getInstance().removeUserFromBlockedList(user.username);
    }

    deleteRecentSearchUser(user: any) {
        // @ts-ignore
        vLogger(`Recent search user ${user.username} with id ${user.id} deleted - removing`);
        this.localisedSM.removeItemFromState(this.config.stateNames.recentUserSearches, user, isSame, true);
    }

    protected eventDeleteClickItem(event: MouseEvent): void {
        event.preventDefault();
        event.stopPropagation();
        // @ts-ignore
        const userId = event.target.getAttribute(this.uiConfig.dom.resultDataKeyId);
        // @ts-ignore
        const dataSource = event.target.getAttribute(this.uiConfig.dom.resultDataSourceId)
        // @ts-ignore
        vLoggerDetail(`User ${event.target} with id ${userId} delete clicked from ${dataSource}`);

        let user: any = this.stateManager.findItemInState(this.config.stateNames.users, {id: parseInt(userId)}, isSame);
        vLogger(user);
        if (user) {


            switch (dataSource) {
                case (this.uiConfig.dom.resultDataSourceFavUsers) : {
                    this.deleteFavouriteUser(user);
                    break;
                }
                case (this.uiConfig.dom.resultDataSourceBlockedUsers) : {
                    this.deleteBlockedUser(user);
                    break;
                }
                case (this.uiConfig.dom.resultDataSourceValue) : {
                    this.deleteRecentSearchUser(user);
                    break;
                }
            }
        }
    }

    protected getBadgeValue(name: string, item: any): number {
        return 0;
    }

    protected getBackgroundImage(name: string, item: any): string {
        return "";
    }

    protected eventAction1Clicked(event: MouseEvent) {
        super.eventAction1Clicked(event);
        // add this user to the favourites
        // @ts-ignore
        const userId = event.target.getAttribute(this.uiConfig.dom.resultDataKeyId);
        let user: any = this.stateManager.findItemInState(this.config.stateNames.users, {id: parseInt(userId)}, isSame);
        if (user) {
            if (ChatManager.getInstance().isUserInFavouriteList(user.username)) {
                vLogger(`${user.username} already in favourite list, ignoring`);
                return;
            }
            // ok, so we have a new user to add to the favourite list
            // add the user to the Chat Manager and we should get an event about it
            ChatManager.getInstance().addUserToFavouriteList(user.username);
        }
    }

    protected eventAction2Clicked(event: MouseEvent) {
        super.eventAction2Clicked(event);
        // add this user to the blocked list
        // @ts-ignore
        const userId = event.target.getAttribute(this.uiConfig.dom.resultDataKeyId);
        let user: any = this.stateManager.findItemInState(this.config.stateNames.users, {id: parseInt(userId)}, isSame);
        if (user) {
            if (ChatManager.getInstance().isUserInBlockedList(user.username)) {
                vLogger(`${user.username} already in blocked list, ignoring`);
                return;
            }
            // ok, so we have a new user to add to the blocked list
            // add the user to the Chat Manager and we should get an event about it
            ChatManager.getInstance().addUserToBlockedList(user.username);
        }
    }

    private renderFavouriteUsers() {
        const usernames: string[] = ChatManager.getInstance().getFavouriteUserList();
        if (this.favUsersDiv) browserUtil.removeAllChildren(this.favUsersDiv);

        usernames.forEach((username) => {
            // find the user in the state manager
            let user: any = this.stateManager.findItemInState(this.config.stateNames.users, {username}, isSameUsername);
            if (user) {
                let childElement = this.createResultForItem(this.config.stateNames.users, user, this.uiConfig.dom.resultDataSourceFavUsers);
                childElement.addEventListener('click', this.eventClickItem);
                childElement.setAttribute('draggable', 'true');
                childElement.addEventListener('dragstart', this.eventStartDrag);


                this.favUsersDiv.appendChild(childElement);
            }
        });
    }

    private renderBlockedUsers() {
        const usernames: string[] = ChatManager.getInstance().getBlockedUserList();
        if (this.blockedUsersDiv) browserUtil.removeAllChildren(this.blockedUsersDiv);

        usernames.forEach((username) => {
            // find the user in the state manager
            let user: any = this.stateManager.findItemInState(this.config.stateNames.users, {username}, isSameUsername);
            if (user) {
                let childElement = this.createResultForItem(this.config.stateNames.users, user, this.uiConfig.dom.resultDataSourceBlockedUsers);
                childElement.setAttribute('draggable', 'false');
                childElement.addEventListener('dragstart', (event) => {
                    event.preventDefault();
                });
                this.blockedUsersDiv.appendChild(childElement);
            }
        });
    }


}

export default UserSearchSidebarView;
