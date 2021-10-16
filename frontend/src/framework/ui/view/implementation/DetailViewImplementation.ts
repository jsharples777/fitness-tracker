import {AbstractView} from "./AbstractView";
import {DetailView} from "../interface/DetailView";
import {ViewDOMConfig} from "../../ConfigurationTypes";
import {DetailViewRenderer} from "../interface/DetailViewRenderer";
import {DetailViewListenerForwarder} from "../delegate/DetailViewListenerForwarder";
import {DetailViewListener} from "../interface/DetailViewListener";
import {DisplayOrder} from "../../form/FormUITypeDefs";

export class DetailViewImplementation extends AbstractView implements DetailView {
    protected currentItem: any | null = null;
    protected renderer: DetailViewRenderer;

    constructor(uiConfig: ViewDOMConfig, renderer: DetailViewRenderer) {
        super(uiConfig);
        this.renderer = renderer;
        const forwarder = new DetailViewListenerForwarder();
        this.eventForwarder = forwarder;
        this.renderer.setView(this);
        this.renderer.setEventForwarder(forwarder);
    }

    addEventDetailListener(listener: DetailViewListener) {
        this.eventForwarder.addListener(listener);
    }

    public getItemId(name: string, item: any) {
        return '';
    }

    public getItemDescription(name: string, item: any): string {
        return '';
    }

    public hasActionPermission(actionName: string, from: string, item: any): boolean {
        return true;
    }

    public getItem(from: string, identifier: string): any {
        return this.currentItem;
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

        if (this.renderer.hasPermissionToUpdateItem(dataObj)) {
            this.renderer.displayItem(dataObj);
        } else {
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
        super.onDocumentLoaded();
    }

    public hasPermissionToDeleteItem(item: any): boolean {
        return this.renderer.hasPermissionToDeleteItem(item);
    }

    public hasPermissionToUpdateItem(item: any): boolean {
        return this.renderer.hasPermissionToUpdateItem(item);
    }

    public handleActionItem(actionName: string, selectedItem: any): void {
        this.renderer.handleActionItem(actionName, selectedItem);
    }

    public isDisplayingItem(dataObj: any): boolean {
        return this.renderer.isDisplayingItem(dataObj);
    }

    public hasChanged(): boolean {
        return this.renderer.hasChanged();
    }

    initialise(displayOrder: DisplayOrder[], hasDeleteButton: boolean, hideModifierFields: boolean = false): void {
        this.renderer.initialise(displayOrder, hasDeleteButton, hideModifierFields)
    }
}