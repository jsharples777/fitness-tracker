import debug from 'debug';
import {StateManager} from '../../state/StateManager';
import {ChatUserEventListener} from "../../socket/ChatUserEventListener";
import {NotificationController} from "../../socket/NotificationController";
import Controller from "../../Controller";
import {ChatManager} from "../../socket/ChatManager";
import AbstractView from "../../ui-framework/AbstractView";
import {ViewListener} from "../../ui-framework/ViewListener";
import {Modifier, ViewDOMConfig} from "../../ui-framework/ConfigurationTypes";
import {DRAGGABLE, STATE_NAMES} from "../../AppTypes";
import {View} from "../../ui-framework/View";

const vLogger = debug('user-search-sidebar');
const vLoggerDetail = debug('user-search-sidebar:detail');

class FavouriteUserView extends AbstractView implements ChatUserEventListener,ViewListener {
    static DOMConfig: ViewDOMConfig = {
        resultsContainerId: 'favouriteUsers',
        resultsElementType: 'a',
        resultsElementAttributes: [{name: 'href', value: '#'}],
        resultsClasses: 'list-group-item my-list-item truncate-notification list-group-item-action',
        keyId: 'user-id',
        dataSourceId: 'blockedUsers',
        modifiers: {
            normal: 'list-group-item-primary',
            inactive: 'list-group-item-light',
            active: 'list-group-item-info',
            warning: 'list-group-item-danger'
        },
        icons: {
            normal: 'fas fa-comment',
            inactive: 'fas fa-comment',
            active: 'fas fa-heart',
            warning: 'fas fa-exclamation-circle'
        },
        detail: {
            containerClasses: 'd-flex w-100 justify-content-between',
            textElementType: 'span',
            textElementClasses: 'mb-1',
            select: true,
            delete: {
                buttonClasses: 'btn bg-danger text-white btn-circle btn-sm',
                iconClasses: 'fas fa-trash-alt',
            },
            drop: {
                acceptFrom:[DRAGGABLE.fromUserSearch],
                acceptTypes:[DRAGGABLE.typeUser],
            },
            drag: {
                type: DRAGGABLE.typeUser,
                from: DRAGGABLE.fromFavourites
            },
        },
        extraActions: [
            {
                name: 'block',
                buttonClasses: 'btn bg-warning text-white btn-circle btn-sm mr-1',
                iconClasses: 'fas fa-user-slash'
            }
        ]
    };

    constructor(stateManager: StateManager) {
        super(FavouriteUserView.DOMConfig, stateManager, STATE_NAMES.users);

        // handler binding
        this.updateView = this.updateView.bind(this);
        this.eventClickItem = this.eventClickItem.bind(this);
        this.handleLoggedInUsersUpdated = this.handleLoggedInUsersUpdated.bind(this);
        this.handleFavouriteUserLoggedIn = this.handleFavouriteUserLoggedIn.bind(this);
        this.handleFavouriteUserLoggedOut = this.handleFavouriteUserLoggedOut.bind(this);
        this.handleFavouriteUsersChanged = this.handleFavouriteUsersChanged.bind(this);
        this.handleBlockedUsersChanged = this.handleBlockedUsersChanged.bind(this);
        this.handleLoggedInUsersUpdated = this.handleLoggedInUsersUpdated.bind(this);

        NotificationController.getInstance().addUserListener(this);
    }

    onDocumentLoaded() {
        super.onDocumentLoaded();
        this.addEventListener(this);
    }



    handleLoggedInUsersUpdated(usernames: string[]): void {
        vLogger(`Received new list of users who are logged in `);
        this.updateView('',{});
    }

    handleFavouriteUserLoggedIn(username: string): void {
        vLogger(`Handle Favourite User ${username} logged in`);
        this.updateView('',{});
    }

    handleFavouriteUserLoggedOut(username: string): void {
        vLogger(`Handle Favourite User ${username} logged in`);
        this.updateView('',{});
    }

    handleFavouriteUsersChanged(usernames: string[]): void {
        vLogger(`Handle Favourite Users changed to ${usernames}`);
        this.updateView('',{});
    }


    getIdForStateItem(name: string, item: any) {
        return item.id;
    }


    getDisplayValueForStateItem(name: string, item: any) {
        return item.username;
    }

    getModifierForStateItem(name: string, item: any) {
        let result = Modifier.normal;
        // if the user is currently logged out make the item inactive
        if (!ChatManager.getInstance().isUserLoggedIn(item.username)) {
            result = Modifier.inactive;
        }
        return result;
    }

    getSecondaryModifierForStateItem(name: string, item: any) {
        let result = Modifier.normal;
        vLoggerDetail(`Checking for item secondary modifiers ${item.username}`);
        // if the user is in the black list then show warning and a favourite user is highlighted
        if (NotificationController.getInstance().isFavouriteUser(item.username)) {
            vLoggerDetail(`is favourite`);
            result = Modifier.active;
        }
        if (NotificationController.getInstance().isBlockedUser(item.username)) {
            vLoggerDetail(`is blocked`);
            result = Modifier.warning;
        }
        return result;
    }




    updateView(name: string, newState: any) {
        // find the blocked users in the user list
        let favUsers:any[] = [];
        const users:any[] = this.stateManager?.getStateByName(STATE_NAMES.users);
        if (users) {
            users.forEach((user:any) => {
                if (ChatManager.getInstance().isUserInFavouriteList(user.username)) {
                    favUsers.push(user);
                }
            })
        }

        super.updateView(name, favUsers);

    }


    documentLoaded(view: View): void {}

    handleBlockedUsersChanged(usernames: string[]): void {
        this.updateView('',{})
    }

    hideRequested(view: View): void {}
    itemAction(view: View, actionName: string, selectedItem: any): void {
        // @ts-ignore
        if (actionName === this.uiConfig.extraActions[0].name) {
            if (ChatManager.getInstance().isUserInBlockedList(selectedItem.username)) {
                vLogger(`${selectedItem.username} already in fav list, ignoring`);
                return;
            }
            ChatManager.getInstance().addUserToBlockedList(selectedItem.username);
        }
    }

    itemDeleteStarted(view: View, selectedItem: any): boolean {
        return true;
    }

    itemDeleted(view: View, selectedItem: any): void {
        vLogger(`Favourite user ${selectedItem.username} with id ${selectedItem.id} deleted - removing`);
        ChatManager.getInstance().removeUserFromFavouriteList(selectedItem.username);
    }

    itemDragStarted(view: View, selectedItem: any): void {}
    itemDeselected(view: View, selectedItem: any): void {}


    itemDropped(view: View, droppedItem: any): void {
        if (ChatManager.getInstance().isUserInFavouriteList(droppedItem.username)) {
            vLogger(`${droppedItem.username} already in fav list, ignoring`);
            return;
        }
        // add the user to the Chat Manager and we should get an event about it
        ChatManager.getInstance().addUserToFavouriteList(droppedItem.username);
    }

    itemSelected(view: View, selectedItem: any): void {
        const roomName = NotificationController.getInstance().startChatWithUser(selectedItem.username);
        Controller.getInstance().handleShowChat(roomName);
    }

    showRequested(view: View): void {}

}

export default FavouriteUserView;
