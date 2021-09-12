import {AbstractView} from "./AbstractView";
import {DetailView} from "../interface/DetailView";
import {ViewDOMConfig} from "../../ConfigurationTypes";
import {DetailViewRenderer} from "../interface/DetailViewRenderer";

export class DetailViewImplementation extends AbstractView implements DetailView {
    protected currentItem:any|null = null;
    protected renderer:DetailViewRenderer;

    constructor(uiConfig: ViewDOMConfig,renderer:DetailViewRenderer) {
        super(uiConfig);
        this.renderer = renderer;
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

    onDocumentLoaded() {
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

    handleActionItem(actionName: string, selectedItem: any): void {
        this.renderer.handleActionItem(actionName,selectedItem);
    }

}