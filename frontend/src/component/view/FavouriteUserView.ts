import debug from 'debug';
import {StateManager} from '../../state/StateManager';
import {ChatUserEventListener} from "../../socket/ChatUserEventListener";
import {NotificationController} from "../../socket/NotificationController";
import Controller from "../../Controller";
import {ChatManager} from "../../socket/ChatManager";
import AbstractStatefulCollectionView from "../../ui-framework/view/implementation/AbstractStatefulCollectionView";
import {CollectionViewListener} from "../../ui-framework/view/interface/CollectionViewListener";
import {KeyType, Modifier, CollectionViewDOMConfig} from "../../ui-framework/ConfigurationTypes";
import {DRAGGABLE, STATE_NAMES, VIEW_NAME} from "../../AppTypes";
import {View} from "../../ui-framework/view/interface/View";
import {ListViewRenderer} from "../../ui-framework/view/delegate/ListViewRenderer";
import {CollectionView} from "../../ui-framework/view/interface/CollectionView";

const vLogger = debug('user-search-sidebar');
const vLoggerDetail = debug('user-search-sidebar:detail');

class FavouriteUserView extends AbstractStatefulCollectionView implements ChatUserEventListener,CollectionViewListener {
    static DOMConfig: CollectionViewDOMConfig = {
        viewConfig: {
            resultsContainerId: 'favouriteUsers',
            drop: {
                acceptFrom:[DRAGGABLE.fromUserSearch],
                acceptTypes:[DRAGGABLE.typeUser],
            },
            dataSourceId: VIEW_NAME.favouriteUsers,
        },
        resultsElementType: 'a',
        resultsElementAttributes: [{name: 'href', value: '#'}],
        resultsClasses: 'list-group-item my-list-item truncate-notification list-group-item-action',
        keyId: '_id',
        keyType: KeyType.string,
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
            quickDelete:true,
            delete: {
                buttonClasses: 'btn bg-danger text-white btn-circle btn-sm',
                iconClasses: 'fas fa-trash-alt',
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

        this.renderer = new ListViewRenderer(this,this);

        // handler binding
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
        this.addEventCollectionListener(this);
    }



    handleLoggedInUsersUpdated(usernames: string[]): void {
        vLogger(`Received new list of users who are logged in `);
        this.updateViewForNamedCollection('',{});
    }

    handleFavouriteUserLoggedIn(username: string): void {
        vLogger(`Handle Favourite User ${username} logged in`);
        this.updateViewForNamedCollection('',{});
    }

    handleFavouriteUserLoggedOut(username: string): void {
        vLogger(`Handle Favourite User ${username} logged in`);
        this.updateViewForNamedCollection('',{});
    }

    handleFavouriteUsersChanged(usernames: string[]): void {
        vLogger(`Handle Favourite Users changed to ${usernames}`);
        this.updateViewForNamedCollection('',{});
    }


    getIdForItemInNamedCollection(name: string, item: any) {
        return item._id;
    }


    getDisplayValueForItemInNamedCollection(name: string, item: any) {
        return item.username;
    }

    getModifierForItemInNamedCollection(name: string, item: any) {
        let result = Modifier.normal;
        // if the user is currently logged out make the item inactive
        if (!ChatManager.getInstance().isUserLoggedIn(item.username)) {
            result = Modifier.inactive;
        }
        return result;
    }

    getSecondaryModifierForItemInNamedCollection(name: string, item: any) {
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




    updateViewForNamedCollection(name: string, newState: any) {
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

        super.updateViewForNamedCollection(name, favUsers);

    }


    documentLoaded(view: View): void {}

    handleBlockedUsersChanged(usernames: string[]): void {
        this.updateViewForNamedCollection('',{})
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

    canDeleteItem(view: View, selectedItem: any): boolean {
        return true;
    }

    itemDeleted(view: View, selectedItem: any): void {
        vLogger(`Favourite user ${selectedItem.username} with id ${selectedItem.id} deleted - removing`);
        ChatManager.getInstance().removeUserFromFavouriteList(selectedItem.username);
    }

    itemDragStarted(view: View, selectedItem: any): void {}
    itemDeselected(view: View, selectedItem: any): void {}


    itemDropped(view: View, droppedItem: any): void {
        vLogger(`Handling item dropped ${droppedItem.username}`);
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

    canSelectItem(view: CollectionView, selectedItem: any): boolean {
        return true;
    }

}

export default FavouriteUserView;
