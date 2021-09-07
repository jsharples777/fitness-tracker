import {
    DataObjectDefinition,
    Field,
    FieldListener,
    Form,
    FormEvent,
    FormEventType,
    FormListener,
    FormUIDefinition
} from "./FormTypes";

export abstract class AbstractForm implements Form,FormListener{
    protected formListeners: FormListener[] = [];
    protected fieldListeners: FieldListener[] = [];
    protected currentDataObj: any | null = null;
    protected dataObjDef: DataObjectDefinition;
    protected containerEl: HTMLElement|null;
    protected uiDef: FormUIDefinition | null = null;
    protected isVisible: boolean = false;
    protected fields:Field[] = [];


    protected constructor(containerId: string, dataObjDef: DataObjectDefinition) {
        this.containerEl = document.getElementById(containerId);
        if (!(this.containerEl)) throw new Error (`container ${containerId} for form ${dataObjDef.id} does not exist`);

        this.dataObjDef = dataObjDef;
        // sub-classes need to create the form and it's fields

        // listen to ourselves
        this.addFormListener(this);
    }

    /* methods to be implemented in the subclass */
    protected abstract _initialise(config: FormUIDefinition): void;
    protected abstract _startUpdate(objectToEdit:any):void;
    protected abstract _startCreate():void;
    protected abstract _reset():void;
    protected abstract _visible():void;
    protected abstract _hidden():void;


    public addFieldListener(listener: FieldListener): void {
        this.fieldListeners.push(listener);
        this.fields.forEach((field) => field.addFieldListener(listener));
    }

    public addFormListener(listener: FormListener): void {
        this.formListeners.push(listener);
    }


    public initialise(config: FormUIDefinition): void {
        this.uiDef = config;
        this._initialise(config);
    }

    protected informFormListeners(formEvent: FormEvent, dataObj?: any) {
        this.formListeners.forEach((listener) => listener.formChanged(formEvent, dataObj));
    }


    public reset(): void {
        // inform the listeners
        if (this.uiDef) {
            let formEvent: FormEvent = {
                formId: this.uiDef.id,
                target: this,
                eventType: FormEventType.RESETTING
            }
            // remove the form from it's parent node
            this.containerEl?.parentNode?.removeChild(this.containerEl);
            this._reset();
            this.informFormListeners(formEvent, this.currentDataObj);
        }
    }

    public setIsVisible(isVisible: boolean): void {
        this.isVisible = isVisible;
        if (this.uiDef) {
            let eventType = FormEventType.HIDDEN;
            if (this.isVisible) {
                this._visible();
                eventType = FormEventType.SHOWN;
            }
            else {
                this._hidden();
            }
            // inform the listeners
            let formEvent: FormEvent = {
                formId: this.uiDef.id,
                target: this,
                eventType: eventType
            }
            this.informFormListeners(formEvent, this.currentDataObj);
        }
    }

    public startCreateNew(): void {
        if (this.uiDef) {
            let eventType = FormEventType.MODECHANGED_CREATE;
            // inform the listeners
            let formEvent: FormEvent = {
                formId: this.uiDef.id,
                target: this,
                eventType: eventType
            }
            this._startCreate();
            this.informFormListeners(formEvent, this.currentDataObj);
        }
    }


    public startUpdate(objectToEdit: any): void {
        this.currentDataObj = objectToEdit;

        if (this.uiDef) {
            let eventType = FormEventType.MODECHANGED_MODIFY;
            // inform the listeners
            let formEvent: FormEvent = {
                formId: this.uiDef.id,
                target: this,
                eventType: eventType
            }
            this._startUpdate(objectToEdit);
            this.informFormListeners(formEvent, this.currentDataObj);
        }
    }

    public formChanged(event: FormEvent, formValues?: any): void {
        // catch form events for user leaving the form
        switch (event.eventType) {
            case (FormEventType.CANCELLED): {
                // user cancelled the form, will become invisible
                this._reset(); // reset the form state
                break;
            }
            case (FormEventType.DELETED): {
                // user is deleting the object, will beceome invisible
                this._reset();
                break;
            }
            case (FormEventType.SAVED): {
                // user attempting to save the form, lets check the field validation
192346591345613t98gfrhakjdfsbgaekrgpvqe 4t'asfla';dfgbndc897245689
                break;
            }
        }
    }


}