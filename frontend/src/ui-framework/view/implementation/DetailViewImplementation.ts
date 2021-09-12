import {AbstractView} from "./AbstractView";
import {DetailView} from "../interface/DetailView";
import {CollectionViewDOMConfig} from "../../ConfigurationTypes";
import {DetailViewRenderer} from "../interface/DetailViewRenderer";
import {DetailViewListenerForwarder} from "../delegate/DetailViewListenerForwarder";
import {DetailViewListener} from "../interface/DetailViewListener";

export class DetailViewImplementation extends AbstractView implements DetailView {
    protected currentItem:any|null = null;
    protected renderer:DetailViewRenderer;

    constructor(uiConfig: CollectionViewDOMConfig, renderer:DetailViewRenderer) {
        super(uiConfig);
        this.renderer = renderer;
        const forwarder = new DetailViewListenerForwarder();
        this.eventForwarder = forwarder;
        this.renderer.setView(this);
        this.renderer.setEventForwarder(forwarder);
    }

    addEventListener(listener: DetailViewListener) {
        this.eventForwarder.addListener(listener);
    }


    public clearDisplay(): void {
        this.renderer.reset();
    }

    public clearReadOnly(): void {
        this.renderer.clearReadOnly();
    }

    public setReadOnly(): void {
        this.renderer.setReadOnly();
    }

    public isReadOnly(): boolean {
        return this.renderer.isReadOnly();
    }

    public createItem(): any {
        return this.renderer.createItem();
    }

    public displayItem(dataObj: any): void {
        this.currentItem = dataObj;

        if (this.renderer.hasPermissionToUpdateCurrentItem()) {
            this.renderer.displayItem(dataObj);
        }
        else {
            this.renderer.displayItemReadonly(dataObj);
        }
        this.show();
    }


    public hidden(): void {
        this.renderer.hidden();
    }
    public show(): void {
        this.renderer.show();
    }

    public render(): void {
        this.displayItem(this.currentItem);
    }

    public onDocumentLoaded() {
        this.renderer.onDocumentLoaded();
        this.renderer.initialise();
        super.onDocumentLoaded();
    }

    public hasPermissionToDeleteCurrentItem(): boolean {
        return this.renderer.hasPermissionToDeleteCurrentItem();
    }
    public hasPermissionToUpdateCurrentItem(): boolean {
        return this.renderer.hasPermissionToUpdateCurrentItem();
    }

    public handleActionItem(actionName: string, selectedItem: any): void {
        this.renderer.handleActionItem(actionName,selectedItem);
    }

    public isDisplayingItem(dataObj: any): boolean {
        return this.renderer.isDisplayingItem(dataObj);
    }

    public hasChanged(): boolean {
        return this.renderer.hasChanged();
    }


}