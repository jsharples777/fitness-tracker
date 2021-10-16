import {CollectionView} from "../interface/CollectionView";
import {AbstractView} from "./AbstractView";
import {CollectionViewDOMConfig, Modifier} from "../../ConfigurationTypes";
import {isSame} from "../../../util/EqualityFunctions";
import debug from "debug";
import {CollectionViewRenderer} from "../interface/CollectionViewRenderer";
import {CollectionViewEventHandler} from "../interface/CollectionViewEventHandler";
import {CollectionViewListenerForwarder} from "../delegate/CollectionViewListenerForwarder";
import {CollectionViewListener} from "../interface/CollectionViewListener";
import {CollectionViewEventHandlerDelegate} from "../delegate/CollectionViewEventHandlerDelegate";
import {CollectionViewEventDelegate} from "../interface/CollectionViewEventDelegate";

const avLogger = debug('collection-view-ts');
const avLoggerDetails = debug('collection-view-ts-detail');


export abstract class AbstractCollectionView extends AbstractView implements CollectionView, CollectionViewEventHandler {
    protected collectionName: string;
    protected renderer: CollectionViewRenderer | null;
    protected selectedItem: any | null;
    protected collectionUIConfig: CollectionViewDOMConfig;
    protected eventHandlerDelegate: CollectionViewEventDelegate

    protected constructor(uiConfig: CollectionViewDOMConfig, collectionName: string) {
        super(uiConfig.viewConfig);
        this.collectionUIConfig = uiConfig;
        this.collectionName = collectionName;
        this.renderer = null;
        let forwarder = new CollectionViewListenerForwarder();
        this.eventForwarder = forwarder;
        this.eventHandlerDelegate = new CollectionViewEventHandlerDelegate(this, forwarder);

        this.updateViewForNamedCollection = this.updateViewForNamedCollection.bind(this);

        // event handlers
        this.eventStartDrag = this.eventStartDrag.bind(this);
        this.eventActionClicked = this.eventActionClicked.bind(this);
        this.eventClickItem = this.eventClickItem.bind(this);
        this.eventDeleteClickItem = this.eventDeleteClickItem.bind(this);


    }

    eventStartDrag(event: DragEvent): void {
        this.eventHandlerDelegate.eventStartDrag(event);
    }

    eventClickItem(event: MouseEvent): void {
        this.eventHandlerDelegate.eventClickItem(event);
    }

    eventDeleteClickItem(event: MouseEvent): void {
        this.eventHandlerDelegate.eventDeleteClickItem(event);
    }

    eventActionClicked(event: MouseEvent): void {
        this.eventHandlerDelegate.eventActionClicked(event);
    }

    public getCollectionName(): string {
        return this.collectionName;
    }

    getItemId(from: string, item: any): string {
        return this.getIdForItemInNamedCollection(from, item);
    }

    abstract getItemDescription(from: string, item: any): string;

    abstract hasActionPermission(actionName: string, from: string, item: any): boolean;

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


    renderBackgroundForItemInNamedCollection(containerEl: HTMLElement, name: string, item: any): void {
    }

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
            if (this.collectionUIConfig.sorter) {
                // pre sort the collection for display
                newState = newState.sort(this.collectionUIConfig.sorter);
            }
            this.renderer.setDisplayElementsForCollectionInContainer(this.viewEl, name, newState);
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

    getSecondaryBadgeValueForItemInNamedCollection(name: string, item: any): number {
        return 0;
    }

    getTertiaryBadgeValueForItemInNamedCollection(name: string, item: any): number {
        return 0;
    }


}
