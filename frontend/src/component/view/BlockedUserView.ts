import debug from 'debug';
import {StateManager} from '../../state/StateManager';
import {ChatUserEventListener} from "../../socket/ChatUserEventListener";
import {NotificationController} from "../../socket/NotificationController";
import {ChatManager} from "../../socket/ChatManager";
import AbstractStatefulCollectionView from "../../ui-framework/view/implementation/AbstractStatefulCollectionView";
import {KeyType, Modifier, CollectionViewDOMConfig} from "../../ui-framework/ConfigurationTypes";
import {DRAGGABLE, STATE_NAMES, VIEW_NAME} from "../../AppTypes";
import {CollectionViewListener} from "../../ui-framework/view/interface/CollectionViewListener";
import {View} from '../../ui-framework/view/interface/View';
import {ListViewRenderer} from "../../ui-framework/view/renderer/ListViewRenderer";
import {CollectionView} from "../../ui-framework/view/interface/CollectionView";

const vLogger = debug('user-search-sidebar');

class BlockedUserView extends AbstractStatefulCollectionView implements ChatUserEventListener, CollectionViewListener {
    private static DOMConfig: CollectionViewDOMConfig = {
        viewConfig: {
            resultsContainerId: 'blockedUsers',
            dataSourceId: VIEW_NAME.blockedUsers,
            drop: {
                acceptFrom:[DRAGGABLE.fromUserSearch, DRAGGABLE.fromFavourites],
                acceptTypes:[DRAGGABLE.typeUser],
            }
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
        },
    };


    constructor(stateManager: StateManager) {
        super(BlockedUserView.DOMConfig, stateManager, STATE_NAMES.users);

        // list renderer
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
        this.addEventListener(this);
    }

    canDeleteItem(view: View, selectedItem: any): boolean {return true; }
    documentLoaded(view: View): void {}

    itemDeleted(view: View, selectedItem: any): void {
        // @ts-ignore
        vLogger(`Blocked user ${selectedItem.username} with id ${selectedItem.id} deleted - removing`);
        ChatManager.getInstance().removeUserFromBlockedList(selectedItem.username);
    }

    itemSelected(view: View, selectedItem: any): void {
        throw new Error('Method not implemented.');
    }

    itemDragStarted(view: View, selectedItem: any): void {
        throw new Error('Method not implemented.');
    }

    itemAction(view: View, actionName: string, selectedItem: any): void {
        throw new Error('Method not implemented.');
    }

    hideRequested(view: View): void {
        throw new Error('Method not implemented.');
    }

    showRequested(view: View): void {
        throw new Error('Method not implemented.');
    }


    handleLoggedInUsersUpdated(usernames: string[]): void {}
    handleFavouriteUserLoggedIn(username: string): void {}
    handleFavouriteUserLoggedOut(username: string): void {}
    handleFavouriteUsersChanged(usernames: string[]): void {}

    handleBlockedUsersChanged(usernames: string[]): void {
        vLogger(`Handle Blocked Users changed to ${usernames}`);
        this.updateViewForNamedCollection('',{});
    }

    renderDisplayForItemInNamedCollection(containerEl: HTMLElement, name: string, item: any): void {
        containerEl.innerHTML =  item.username;
    }

    getSecondaryModifierForItemInNamedCollection(name: string, item: any):Modifier{
        return Modifier.warning;
    }


    getIdForItemInNamedCollection(name: string, item: any): string {
        return item._id;
    }

    updateViewForNamedCollection(name: string, newState: any) {
        // find the blocked users in the user list
        let blockedUsers:any[] = [];
        const users:any[] = this.stateManager?.getStateByName(STATE_NAMES.users);
        if (users) {
            users.forEach((user:any) => {
                if (ChatManager.getInstance().isUserInBlockedList(user.username)) {
                    blockedUsers.push(user);
                }
            })
        }

        super.updateViewForNamedCollection(name, blockedUsers);
    }

    itemDropped(view: View, droppedItem: any): void {
        if (ChatManager.getInstance().isUserInBlockedList(droppedItem.username)) {
            vLogger(`${droppedItem.username} already in blocked list, ignoring`);
            return;
        }
        // add the user to the Chat Manager and we should get an event about it
        ChatManager.getInstance().addUserToBlockedList(droppedItem.username);
    }

    itemDeselected(view: View, selectedItem: any): void {}

    canSelectItem(view: CollectionView, selectedItem: any): boolean {
        return false;
    }


}

export default BlockedUserView;
