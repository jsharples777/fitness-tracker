import {CollectionView} from "../interface/CollectionView";
import {AbstractView} from "./AbstractView";
import {
    CollectionViewDOMConfig,
    DRAGGABLE_FROM,
    DRAGGABLE_KEY_ID,
    DRAGGABLE_TYPE,
    EXTRA_ACTION_ATTRIBUTE_NAME,
    KeyType,
    Modifier
} from "../../ConfigurationTypes";
import {isSame} from "../../../util/EqualityFunctions";
import debug from "debug";
import {CollectionViewRenderer} from "../interface/CollectionViewRenderer";
import {CollectionViewEventHandler} from "../interface/CollectionViewEventHandler";
import {CollectionViewListenerForwarder} from "../delegate/CollectionViewListenerForwarder";
import {AlertManager} from "../../alert/AlertManager";
import {AlertEvent, AlertListener, AlertType} from "../../alert/AlertListener";
import {CollectionViewListener} from "../interface/CollectionViewListener";

const avLogger = debug('collection-view-ts');
const avLoggerDetails = debug('collection-view-ts-detail');


export abstract class AbstractCollectionView extends AbstractView implements CollectionView,CollectionViewEventHandler,AlertListener {
    protected collectionName: string;
    protected renderer: CollectionViewRenderer | null;
    protected selectedItem: any | null;
    protected collectionUIConfig: CollectionViewDOMConfig;

    protected constructor(uiConfig: CollectionViewDOMConfig, collectionName: string) {
        super(uiConfig.viewConfig);
        this.collectionUIConfig = uiConfig;
        this.collectionName = collectionName;
        this.renderer = null;
        this.selectedItem = null;
        this.eventForwarder = new CollectionViewListenerForwarder();

        // event handlers
        this.eventStartDrag = this.eventStartDrag.bind(this);
        this.eventActionClicked = this.eventActionClicked.bind(this);
        this.eventClickItem = this.eventClickItem.bind(this);
        this.eventDeleteClickItem = this.eventDeleteClickItem.bind(this);
        this.updateViewForNamedCollection = this.updateViewForNamedCollection.bind(this);

    }

    getCollectionUIConfig(): CollectionViewDOMConfig {
        return this.collectionUIConfig;
    }

    addEventCollectionListener(listener: CollectionViewListener) {
        this.eventForwarder.addListener(listener);
    }


    setContainedBy(container: HTMLElement): void {
        super.setContainedBy(container);
        if (this.uiConfig.drop) {
            avLoggerDetails(`view ${this.getName()}: Adding dragover events to ${this.uiConfig.dataSourceId}`)
            avLoggerDetails(container);
            container.addEventListener('dragover', (event) => {
                event.preventDefault();
            });
            container.addEventListener('drop', this.handleDrop);

        }

    }

    onDocumentLoaded() {
        super.onDocumentLoaded();
        if (this.renderer) this.renderer.onDocumentLoaded();
    }

    protected getDragData(event: DragEvent): any {
        // @ts-ignore
        let itemId = event.target.getAttribute(this.collectionUIConfig.keyId);
        // @ts-ignore
        const dataSource = event.target.getAttribute(AbstractView.DATA_SOURCE);

        if (this.collectionUIConfig.keyType === KeyType.number) itemId = parseInt(itemId);
        // @ts-ignore
        avLoggerDetails(`view ${this.getName()}: Item with id ${itemId} getting drag data from ${dataSource}`);

        let compareWith = {};
        // @ts-ignore
        compareWith[this.collectionUIConfig.keyId] = itemId;

        let selectedItem = {};

        selectedItem = this.getItemInNamedCollection(this.collectionName, compareWith);

        if (selectedItem) {
            // @ts-ignore
            selectedItem[DRAGGABLE_TYPE] = this.collectionUIConfig.detail.drag?.type;
            // @ts-ignore
            selectedItem[DRAGGABLE_FROM] = this.collectionUIConfig.detail.drag?.from;
        }
        return selectedItem;
    }

    renderBackgroundForItemInNamedCollection(containerEl: HTMLElement, name: string, item: any): void {}

    abstract getIdForItemInNamedCollection(name: string, item: any): string;
    abstract getItemInNamedCollection(name: string, compareWith: any): any;
    abstract renderDisplayForItemInNamedCollection(containerEl: HTMLElement, name: string, item: any): void;

    compareItemsForEquality(item1: any, item2: any): boolean {
        return isSame(item1, item2);
    }

    getModifierForItemInNamedCollection(name: string, item: any): Modifier {
        return Modifier.normal;
    }

    public getSecondaryModifierForItemInNamedCollection(name: string, item: any): Modifier {
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
            this.renderer.setDisplayElementsForCollectionInContainer(this.viewEl, name, newState);
        }
    }

    public eventStartDrag(event: DragEvent): void {
        avLogger(`view ${this.getName()}: drag start`);
        avLoggerDetails(event.target);
        const data = JSON.stringify(this.getDragData(event));
        avLoggerDetails(data);
        // @ts-ignore
        event.dataTransfer.setData(DRAGGABLE_KEY_ID, data);
        (<CollectionViewListenerForwarder>(this.eventForwarder)).itemDragStarted(this, data);
    }

    public eventClickItem(event: MouseEvent): void {
        event.preventDefault();
        event.stopPropagation();
        // @ts-ignore
        let itemId = event.target.getAttribute(this.collectionUIConfig.keyId);
        // @ts-ignore
        const dataSource = event.target.getAttribute(AbstractView.DATA_SOURCE);

        if (this.collectionUIConfig.keyType === KeyType.number) itemId = parseInt(itemId);
        // @ts-ignore
        avLoggerDetails(`view ${this.getName()}: Item with id ${itemId} clicked from ${dataSource}`);
        let compareWith = {};
        // @ts-ignore
        compareWith[this.collectionUIConfig.keyId] = itemId;
        avLoggerDetails(compareWith);

        let selectedItem = this.getItemInNamedCollection(this.collectionName, compareWith);
        avLogger(selectedItem);
        if (selectedItem) {
            const shouldSelect = (<CollectionViewListenerForwarder>(this.eventForwarder)).canSelectItem(this, selectedItem);
            avLoggerDetails(`view ${this.getName()}: Item with id ${itemId} attempting selected from ${dataSource} - ${shouldSelect}`);
            if (shouldSelect) {
                this.selectedItem = selectedItem;
                avLoggerDetails(selectedItem);
                (<CollectionViewListenerForwarder>(this.eventForwarder)).itemSelected(this, selectedItem);
            }
        }
    }

    public eventDeleteClickItem(event: MouseEvent): void {
        event.preventDefault();
        event.stopPropagation();
        // @ts-ignore
        let itemId = event.target.getAttribute(this.collectionUIConfig.keyId);
        // @ts-ignore
        const dataSource = event.target.getAttribute(AbstractView.DATA_SOURCE);

        if (this.collectionUIConfig.keyType === KeyType.number) itemId = parseInt(itemId);
        // @ts-ignore
        avLoggerDetails(`view ${this.getName()}: Item with id ${itemId} attempting delete from ${dataSource}`);
        let compareWith = {};
        // @ts-ignore
        compareWith[this.collectionUIConfig.keyId] = itemId;
        avLoggerDetails(compareWith);

        let selectedItem = this.getItemInNamedCollection(this.collectionName, compareWith);
        if (selectedItem) {
            const shouldDelete = this.eventForwarder.canDeleteItem(this, selectedItem);
            avLoggerDetails(`view ${this.getName()}: Item with id ${itemId} attempting delete from ${dataSource} - ${shouldDelete}`);
            if (shouldDelete) {
                // do we need to confirm?
                if (this.collectionUIConfig.detail.quickDelete) {
                    this.selectedItem = null;
                    this.eventForwarder.itemDeleted(this, selectedItem);
                } else {
                    AlertManager.getInstance().startAlert(this, this.getName(), `Are you sure you want to delete this information?`, selectedItem);
                }

            }
        }
    }


    public eventActionClicked(event: MouseEvent): void {
        event.preventDefault();
        event.stopPropagation();
        // @ts-ignore
        let itemId = event.target.getAttribute(this.collectionUIConfig.keyId);
        // @ts-ignore
        const dataSource = event.target.getAttribute(AbstractView.DATA_SOURCE);
        // @ts-ignore
        const actionName = event.target.getAttribute(EXTRA_ACTION_ATTRIBUTE_NAME);

        if (this.collectionUIConfig.keyType === KeyType.number) itemId = parseInt(itemId);
        // @ts-ignore
        avLoggerDetails(`view ${this.getName()}: Item with id ${itemId} attempting delete from ${dataSource}`);
        let compareWith = {};
        // @ts-ignore
        compareWith[this.collectionUIConfig.keyId] = itemId;
        avLoggerDetails(compareWith);

        let selectedItem = this.getItemInNamedCollection(this.collectionName, compareWith);
        if (selectedItem) {
            const shouldSelect = (<CollectionViewListenerForwarder>(this.eventForwarder)).canSelectItem(this, selectedItem);
            avLoggerDetails(`view ${this.getName()}: Item with id ${itemId} attempting action ${actionName} from ${dataSource} - ${shouldSelect}`);
            if (shouldSelect) {
                this.selectedItem = selectedItem;
                avLoggerDetails(selectedItem);
                this.eventForwarder.itemAction(this, actionName, selectedItem);
            }
        }
    }

    hasPermissionToDeleteItemInNamedCollection(name: string, item: any): boolean {
        return true;
    }

    hasPermissionToUpdateItemInNamedCollection(name: string, item: any): boolean {
        return true;
    }

    hasPermissionToActionItemInNamedCollection(actionName: string, name: string, item: any): boolean {
        return true;
    }

    setRenderer(renderer: CollectionViewRenderer): void {
        this.renderer = renderer;
    }

    completed(event: AlertEvent): void {
        avLoggerDetails(event.context);
        if (event.outcome === AlertType.confirmed) {
            this.selectedItem = null;
            this.eventForwarder.itemDeleted(this, event.context);
        }
    }

}
