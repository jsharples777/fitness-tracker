import debug from 'debug';
import ViewListenerForwarder from "./ViewListenerForwarder";
import {
    DRAGGABLE_FROM,
    DRAGGABLE_KEY_ID,
    DRAGGABLE_TYPE,
    EXTRA_ACTION_ATTRIBUTE_NAME,
    KeyType,
    Modifier,
    ViewDOMConfig,
} from "./ConfigurationTypes";
import {ViewListener} from "./ViewListener";
import {View} from "./View";
import {isSame} from "../util/EqualityFunctions";
import {StateManager} from "../state/StateManager";

const avLogger = debug('view-ts');
const avLoggerDetails = debug('view-ts-detail');

export abstract class AbstractView implements View {

    public static DATA_SOURCE = 'data-source';
    protected collectionName: string;


    protected uiConfig: ViewDOMConfig;

    protected eventForwarder: ViewListenerForwarder;
    protected containerEl: HTMLElement | null = null;

    protected constructor(uiConfig: ViewDOMConfig, collectionName:string) {
        this.uiConfig = uiConfig;
        this.collectionName = collectionName;
        this.eventForwarder = new ViewListenerForwarder();

        // event handlers
        this.eventStartDrag = this.eventStartDrag.bind(this);
        this.handleDrop = this.handleDrop.bind(this);

    }

    getUIConfig(): ViewDOMConfig {
        return this.uiConfig;
    }


    addEventListener(listener: ViewListener) {
        this.eventForwarder.addListener(listener);
    }

    onDocumentLoaded(): void {
        this.eventForwarder.documentLoaded(this);
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

    abstract updateViewForNamedCollection(name: string, newState: any): void;

    protected eventStartDrag(event: DragEvent) {
        avLogger(`view ${this.getName()}: drag start`);
        avLoggerDetails(event.target);
        const data = JSON.stringify(this.getDragData(event));
        avLoggerDetails(data);
        // @ts-ignore
        event.dataTransfer.setData(DRAGGABLE_KEY_ID, data);
    }

    setContainedBy(container: HTMLElement): void {
        this.containerEl = container;
        if (this.uiConfig.detail.drop) {
            avLoggerDetails(`view ${this.getName()}: Adding dragover events to ${this.uiConfig.dataSourceId}`)
            avLoggerDetails(container);
            container.addEventListener('dragover', (event) => {
                event.preventDefault();
            });
            container.addEventListener('drop', this.handleDrop);

        }

    }

    handleDrop(event: Event) {
        avLogger(`view ${this.getName()}: drop event`);
        avLoggerDetails(event.target);
        // @ts-ignore
        const draggedObjectJSON = event.dataTransfer.getData(DRAGGABLE_KEY_ID);
        const draggedObject = JSON.parse(draggedObjectJSON);
        avLoggerDetails(draggedObject);

        // check to see if we accept the dropped type and source
        const droppedObjectType = draggedObject[DRAGGABLE_TYPE];
        const droppedObjectFrom = draggedObject[DRAGGABLE_FROM];
        avLogger(`view ${this.getName()}: drop event from ${droppedObjectFrom} with type ${droppedObjectType}`);
        if (this.uiConfig.detail.drop) {
            const acceptType = (this.uiConfig.detail.drop.acceptTypes.findIndex((objectType) => objectType === droppedObjectType) >= 0);
            let acceptFrom = true;
            if (acceptType) {
                if (this.uiConfig.detail.drop.acceptFrom) {
                    acceptFrom = (this.uiConfig.detail.drop.acceptFrom.findIndex((from) => from === droppedObjectFrom) >= 0);
                }
                avLoggerDetails(`view ${this.getName()}: accepted type? ${acceptType} and from? ${acceptFrom}`);
                if (acceptType && acceptFrom) {
                    this.eventForwarder.itemDropped(this, draggedObject);
                }
            }
        }
    }

    getName(): string {
        return this.uiConfig.dataSourceId;
    }

    hidden(): void {
    }

    hasChanged(): boolean {
        return false;
    }

    hasPermissionToDeleteItemInNamedCollection(name: string, item: any): boolean {
        return true;
    }

    hasPermissionToUpdateItemInNamedCollection(name: string, item: any): boolean {
        return true;
    }

    protected eventClickItem(event: MouseEvent): void {
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

    protected eventDeleteClickItem(event: MouseEvent): void {
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

    protected eventActionClicked(event: MouseEvent): void {
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

    getDataSourceKeyId(): string {
        return AbstractView.DATA_SOURCE;
    }

}
