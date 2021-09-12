import {CollectionView} from "../interface/CollectionView";
import {AbstractView} from "./AbstractView";
import {
    DRAGGABLE_FROM,
    DRAGGABLE_KEY_ID,
    DRAGGABLE_TYPE,
    EXTRA_ACTION_ATTRIBUTE_NAME,
    KeyType,
    Modifier,
    ViewDOMConfig
} from "../../ConfigurationTypes";
import {isSame} from "../../../util/EqualityFunctions";
import debug from "debug";
import {CollectionViewRenderer} from "../interface/CollectionViewRenderer";
import {CollectionViewEventHandler} from "../interface/CollectionViewEventHandler";
import {CollectionViewListenerForwarder} from "../delegate/CollectionViewListenerForwarder";

const avLogger = debug('collection-view-ts');
const avLoggerDetails = debug('collection-view-ts-detail');


export abstract class AbstractCollectionView extends AbstractView implements CollectionView,CollectionViewEventHandler{
    protected collectionName: string;
    protected renderer:CollectionViewRenderer|null;

    protected constructor(uiConfig: ViewDOMConfig, collectionName:string) {
        super(uiConfig);
        this.collectionName = collectionName;
        this.renderer = null;
        this.eventForwarder = new CollectionViewListenerForwarder();

        // event handlers
        this.eventStartDrag = this.eventStartDrag.bind(this);
        this.eventActionClicked = this.eventActionClicked.bind(this);
        this.eventClickItem = this.eventClickItem.bind(this);
        this.eventDeleteClickItem = this.eventDeleteClickItem.bind(this);
        this.updateViewForNamedCollection = this.updateViewForNamedCollection.bind(this);

    }

    setContainedBy(container: HTMLElement): void {
        super.setContainedBy(container);
        if (this.uiConfig.detail.drop) {
            avLoggerDetails(`view ${this.getName()}: Adding dragover events to ${this.uiConfig.dataSourceId}`)
            avLoggerDetails(container);
            container.addEventListener('dragover', (event) => {
                event.preventDefault();
            });
            container.addEventListener('drop', this.handleDrop);

        }

    }



    protected getDragData(event: DragEvent): any {
        // @ts-ignore
        let itemId = event.target.getAttribute(this.uiConfig.keyId);
        // @ts-ignore
        const dataSource = event.target.getAttribute(AbstractListView.DATA_SOURCE);

        if (this.uiConfig.keyType === KeyType.number) itemId = parseInt(itemId);
        // @ts-ignore
        avLoggerDetails(`view ${this.getName()}: Item with id ${itemId} getting drag data from ${dataSource}`);

        let compareWith = {};
        // @ts-ignore
        compareWith[this.uiConfig.keyId] = itemId;

        let selectedItem = {};

        selectedItem = this.getItemInNamedCollection(this.collectionName,compareWith);

        if (selectedItem) {
            // @ts-ignore
            selectedItem[DRAGGABLE_TYPE] = this.uiConfig.detail.drag?.type;
            // @ts-ignore
            selectedItem[DRAGGABLE_FROM] = this.uiConfig.detail.drag?.from;
        }
        return selectedItem;
    }

    abstract getIdForItemInNamedCollection(name: string, item: any): string;
    abstract getItemInNamedCollection(name:string, compareWith:any):any;

    abstract getDisplayValueForItemInNamedCollection(name: string, item: any): string;

    compareItemsForEquality(item1: any, item2: any): boolean {
        return isSame(item1, item2);
    }

    getModifierForItemInNamedCollection(name: string, item: any): Modifier {
        return Modifier.normal;
    }

    getSecondaryModifierForItemInNamedCollection(name: string, item: any): Modifier {
        return Modifier.normal;
    }

    getBadgeValueForItemInNamedCollection(name: string, item: any): number {
        return 0;
    }

    getBackgroundImageForItemInNamedCollection(name: string, item: any): string {
        return '';
    }

    updateViewForNamedCollection(name: string, newState: any): void {
        if (this.viewEl && this.renderer) {
            this.renderer.setDisplayElementsForCollectionInContainer(this.viewEl,name,newState);
        }
    }

    public eventStartDrag(event: DragEvent):void {
        avLogger(`view ${this.getName()}: drag start`);
        avLoggerDetails(event.target);
        const data = JSON.stringify(this.getDragData(event));
        avLoggerDetails(data);
        // @ts-ignore
        event.dataTransfer.setData(DRAGGABLE_KEY_ID, data);
        this.eventForwarder.itemDragStarted(this, data);
    }

    public eventClickItem(event: MouseEvent): void {
        event.preventDefault();
        event.stopPropagation();
        // @ts-ignore
        let itemId = event.target.getAttribute(this.uiConfig.keyId);
        // @ts-ignore
        const dataSource = event.target.getAttribute(AbstractListView.DATA_SOURCE);

        if (this.uiConfig.keyType === KeyType.number) itemId = parseInt(itemId);
        // @ts-ignore
        avLoggerDetails(`view ${this.getName()}: Item with id ${itemId} clicked from ${dataSource}`);
        let compareWith = {};
        // @ts-ignore
        compareWith[this.uiConfig.keyId] = itemId;
        avLoggerDetails(compareWith);

        let selectedItem = this.getItemInNamedCollection(this.collectionName, compareWith);
        console.log(selectedItem);
        if (selectedItem) this.eventForwarder.itemSelected(this, selectedItem);
    }

    public eventDeleteClickItem(event: MouseEvent): void {
        event.preventDefault();
        event.stopPropagation();
        // @ts-ignore
        let itemId = event.target.getAttribute(this.uiConfig.keyId);
        // @ts-ignore
        const dataSource = event.target.getAttribute(AbstractListView.DATA_SOURCE);

        if (this.uiConfig.keyType === KeyType.number) itemId = parseInt(itemId);
        // @ts-ignore
        avLoggerDetails(`view ${this.getName()}: Item with id ${itemId} attempting delete from ${dataSource}`);
        let compareWith = {};
        // @ts-ignore
        compareWith[this.uiConfig.keyId] = itemId;
        avLoggerDetails(compareWith);

        let selectedItem = this.getItemInNamedCollection(this.collectionName, compareWith);
        if (selectedItem) {
            const shouldDelete = this.eventForwarder.canDeleteItem(this, selectedItem);
            avLoggerDetails(`view ${this.getName()}: Item with id ${itemId} attempting delete from ${dataSource} - ${shouldDelete}`);
            if (shouldDelete) {
                avLoggerDetails(selectedItem);
                this.eventForwarder.itemDeleted(this, selectedItem);
            }
        }
    }

    public eventActionClicked(event: MouseEvent): void {
        event.preventDefault();
        event.stopPropagation();
        // @ts-ignore
        let itemId = event.target.getAttribute(this.uiConfig.keyId);
        // @ts-ignore
        const dataSource = event.target.getAttribute(AbstractListView.DATA_SOURCE);
        // @ts-ignore
        const actionName = event.target.getAttribute(EXTRA_ACTION_ATTRIBUTE_NAME);

        if (this.uiConfig.keyType === KeyType.number) itemId = parseInt(itemId);
        // @ts-ignore
        avLoggerDetails(`view ${this.getName()}: Item with id ${itemId} attempting delete from ${dataSource}`);
        let compareWith = {};
        // @ts-ignore
        compareWith[this.uiConfig.keyId] = itemId;
        avLoggerDetails(compareWith);

        let selectedItem = this.getItemInNamedCollection(this.collectionName, compareWith);
        if (selectedItem) {
            this.eventForwarder.itemAction(this, actionName, selectedItem);
        }
    }

    hasPermissionToDeleteItemInNamedCollection(name: string, item: any): boolean {
        return true;
    }

    hasPermissionToUpdateItemInNamedCollection(name: string, item: any): boolean {
        return true;
    }

    setRenderer(renderer:CollectionViewRenderer):void {
        this.renderer = renderer;
    }

}