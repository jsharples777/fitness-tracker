import {DetailViewRenderer} from "../interface/DetailViewRenderer";
import {DataObjectDefinition} from "../../form/DataObjectTypeDefs";
import {Form} from "../../form/Form";
import {ViewDOMConfig} from "../../ConfigurationTypes";
import { CollectionViewListener } from "../interface/CollectionViewListener";
import {BasicFormImplementation} from "../../form/BasicFormImplementation";

export class FormDetailViewRenderer implements DetailViewRenderer {
    protected objDef: DataObjectDefinition;
    protected form: Form | null = null;
    protected currentItem:any;
    protected containerId:string;

    constructor(containerId:string, objDef: DataObjectDefinition) {
        this.containerId = containerId;
        this.objDef = objDef;
        this.currentItem = {};
    }

    onDocumentLoaded(): void {
        this.form = new BasicFormImplementation(this.containerId,this.objDef);
    }

    reset(): void {
        if (this.form) this.form.reset();
    }
    initialise(): void {
        if (this.form) this.form.initialise();
    }
    displayItemReadonly(dataObject: any): void {
        if (this.form) this.form.displayOnly(dataObject);
    }
    getName(): string {
        return this.objDef.displayName;
    }
    setContainedBy(container: HTMLElement): void {
        throw new Error("Method not implemented.");
    }
    addEventListener(listener: CollectionViewListener): void {
        throw new Error("Method not implemented.");
    }

    hasChanged(): boolean {
        let result = false;
        if (this.form) result = this.form.hasChanged();
        return result;
    }
    getUIConfig(): ViewDOMConfig {
        throw new Error("Method not implemented.");
    }
    getDataSourceKeyId(): string {
        throw new Error("Method not implemented.");
    }
    public clearDisplay(): void {
        if (this.form) this.form.reset();
    }

    public clearReadOnly(): void {
        if (this.form) this.form.clearReadOnly();
    }

    public setReadOnly(): void {
        if (this.form) this.form.setReadOnly();
    }

    public createItem(): any {
        this.currentItem = {};
        if (this.form) {
            this.currentItem = this.form.startCreateNew();
        }
    }

    public displayItem(dataObj: any): void {
        this.currentItem = dataObj;

        if (this.hasPermissionToUpdateCurrentItem()) {
            if (this.form) this.form.startUpdate(dataObj);
        }
        else {
            if (this.form) this.form.displayOnly(dataObj);
        }
    }


    public hidden(): void {
        if (this.form) this.form.setIsVisible(false);
    }
    public show(): void {
        if (this.form) this.form.setIsVisible(true);
    }

    render(): void {
        this.displayItem(this.currentItem);
        this.show();
    }


    public hasPermissionToDeleteCurrentItem(): boolean {
        return true;
    }

    public hasPermissionToUpdateCurrentItem(): boolean {
        return true;
    }

    public getForm() {
        return this.form;
    }

    handleActionItem(actionName: string, selectedItem: any): void {
        throw new Error(`Handle action item not implemented for ${actionName}`);
    }



}