import {DetailViewRenderer} from "../interface/DetailViewRenderer";
import {DataObjectDefinition} from "../../../model/DataObjectTypeDefs";
import {Form} from "../../form/Form";
import {ViewDOMConfig} from "../../ConfigurationTypes";
import {BasicFormImplementation} from "../../form/BasicFormImplementation";
import {FormEvent, FormEventType, FormListener} from "../../form/FormListener";
import debug from 'debug';
import {DetailViewListenerForwarder} from "./DetailViewListenerForwarder";
import {DetailView} from "../interface/DetailView";
import {ViewListener} from "../interface/ViewListener";

const logger = debug('form-detail-view-renderer')

export class FormDetailViewRenderer implements DetailViewRenderer,FormListener {
    protected objDef: DataObjectDefinition;
    protected form: Form | null = null;
    protected currentItem: any;
    protected isNewItem:boolean;
    protected containerId: string;
    protected forwarder:DetailViewListenerForwarder|null;
    protected view:DetailView|null;

    constructor(containerId: string, objDef: DataObjectDefinition) {
        this.containerId = containerId;
        this.objDef = objDef;
        this.currentItem = {};
        this.isNewItem = false;
        this.forwarder = null;
        this.view = null;
    }

    setEventForwarder(forwarder: DetailViewListenerForwarder): void {
        this.forwarder = forwarder;
    }

    public setView(view:DetailView):void {
        this.view = view;
    }

    onDocumentLoaded(): void {
        this.form = new BasicFormImplementation(this.containerId, this.objDef);
        this.form.addFormListener(this);
        this.initialise();
    }

    reset(): void {
        if (this.form) this.form.reset();
    }

    initialise(): void {
        if (this.form) this.form.initialise();
    }

    displayItemReadonly(dataObject: any): void {
        this.isNewItem = false;
        if (this.form) this.form.displayOnly(dataObject);
    }

    getName(): string {
        return this.objDef.displayName;
    }

    setContainedBy(container: HTMLElement): void {
        throw new Error("Method not implemented.");
    }

    addEventListener(listener: ViewListener): void {
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
        this.isNewItem = false;
        if (this.form) this.form.reset();
    }

    public clearReadOnly(): void {
        if (this.form) this.form.clearReadOnly();
    }

    public setReadOnly(): void {
        if (this.form) this.form.setReadOnly();
    }

    public isReadOnly():boolean {
        let result = false;
        if (this.form) result = this.form.isReadOnly();
        return result;
    }

    public createItem(): any {
        this.currentItem = {};
        if (this.form) {
            this.isNewItem = true;
            this.currentItem = this.form.startCreateNew();
        }
    }

    public displayItem(dataObj: any): void {
        this.currentItem = dataObj;
        this.isNewItem = false;

        if (this.hasPermissionToUpdateCurrentItem()) {
            if (this.form) this.form.startUpdate(dataObj);
        } else {
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

    isDisplayingItem(dataObj: any): boolean {
        let result = false;
        if (this.currentItem) {
            if (this.form) {
                result = this.form.isDisplayingItem(dataObj);
            }
        }
        return result;
    }

    public formChanged(event: FormEvent, formValues?: any): boolean {
        // catch form events for user leaving the form
        switch (event.eventType) {
            case (FormEventType.CANCELLING): {
                logger(`Form is cancelling`);
                break;
            }
            case (FormEventType.CANCELLING_ABORTED): {
                logger(`Form is cancelling - aborted`);
                break;
            }
            case (FormEventType.CANCELLED): {
                logger(`Form is cancelled - resetting`);
                if (this.forwarder && this.view) this.forwarder.cancelled(this.view,this.currentItem);
                break;
            }
            case (FormEventType.DELETING): {
                logger(`Form is deleting`);
                break;
            }
            case (FormEventType.DELETE_ABORTED): {
                logger(`Form is deleting - aborted`);
                break;
            }
            case (FormEventType.DELETED): {
                logger(`Form is deleted - resetting`);
                if (this.forwarder && this.view) this.forwarder.deletedItem(this.view,this.currentItem);
                // user is deleting the object, will become invisible
                break;
            }
            case (FormEventType.SAVE_ABORTED): {
                logger(`Form save cancelled`);
                break;
            }
            case (FormEventType.SAVED): {
                logger(`Form is saved with data`);
                if (this.form) {
                    let formattedObj = this.form?.getFormattedDataObject();
                    if (this.isNewItem) {
                        if (this.forwarder && this.view) this.forwarder.saveNewItem(this.view,this.currentItem);
                    }
                    else {
                        if (this.forwarder && this.view) this.forwarder.updateItem(this.view,this.currentItem);
                    }
                    this.isNewItem = false;
                }

                break;
            }
            case (FormEventType.SAVING): {
                logger(`Form is saving`);
                break;
            }
        }
        return false;
    }
}