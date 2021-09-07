import {Form} from "./Form";
import {FormEvent, FormEventType, FormListener} from "./FormListener";
import {FieldListener} from "./FieldListener";
import {DataObjectDefinition, FieldDefinition, FieldType} from "./DataObjectTypes";
import {AttributeFieldMapItem, FieldUIConfig, FormUIDefinition} from "./FormUITypes";
import {Field} from "./Field";
import {KeyType} from "../ConfigurationTypes";


export abstract class AbstractForm implements Form,FormListener{
    protected formListeners: FormListener[] = [];
    protected fieldListeners: FieldListener[] = [];
    protected currentDataObj: any;
    protected dataObjDef: DataObjectDefinition;
    protected containerEl: HTMLElement|null;
    protected uiDef: FormUIDefinition | null = null;
    protected isVisible: boolean = false;
    protected fields:Field[] = [];
    protected map:AttributeFieldMapItem[];


    protected constructor(containerId: string, dataObjDef: DataObjectDefinition) {
        this.containerEl = document.getElementById(containerId);
        if (!(this.containerEl)) throw new Error (`container ${containerId} for form ${dataObjDef.id} does not exist`);

        this.map = [];
        this.dataObjDef = dataObjDef;
        this.currentDataObj = {};
        // sub-classes need to create the form and it's fields

        // listen to ourselves
        this.addFormListener(this);
    }

    /* methods to be implemented in the subclass */
    protected abstract _startUpdate(objectToEdit:any):void;
    protected abstract _startCreate():void;
    protected abstract _reset():void;
    protected abstract _visible():void;
    protected abstract _hidden():void;
    public abstract initialise(): void;


    public addFieldListener(listener: FieldListener): void {
        this.fieldListeners.push(listener);
    }

    public addFormListener(listener: FormListener): void {
        this.formListeners.push(listener);
    }



    protected informFormListeners(formEvent: FormEvent, dataObj?: any) {
        this.formListeners.forEach((listener) => listener.formChanged(formEvent, dataObj));
    }

    protected findFieldUiConfig(fieldDef:FieldDefinition):FieldUIConfig|null|undefined {
        let result:FieldUIConfig|null|undefined = null;
        if (this.uiDef) {
            let index = 0;
            while (index < this.uiDef.fieldGroups.length) {
                const fieldGroup = this.uiDef.fieldGroups[index];
                result = fieldGroup.fields.find((uiConfig) => uiConfig.field.id === fieldDef.id);
                if (result) break;
                index ++;
            }
        }
        return result;
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
            this.informFormListeners(formEvent, this.currentDataObj);
        }
        this.currentDataObj = {};
        this._reset();
        // reset all the fields
        this.fields.forEach((field) => {
            field.reset();
        });
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
        this.currentDataObj = {};
        if (this.uiDef) {
            let eventType = FormEventType.CREATING;
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
        this.currentDataObj = {...objectToEdit}; // take a copy

        if (this.uiDef) {
            let eventType = FormEventType.MODIFYING;
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

    protected abstract setFieldValueToDataObject(dataObj:any,field:Field,currentValue:string|null):void;

    public formChanged(event: FormEvent, formValues?: any): boolean {
        // catch form events for user leaving the form
        let shouldCancelChange = false;
        switch (event.eventType) {
            case (FormEventType.CANCELLING): {
                // user cancelled the form, will become invisible
                this._reset(); // reset the form state
                break;
            }
            case (FormEventType.DELETING): {
                // user is deleting the object, will become invisible
                this._reset();
                break;
            }
            case (FormEventType.SAVING): {
                let allFieldsValid:boolean = true;

                // user attempting to save the form, lets check the field validation
                this.fields.forEach((field) => {
                    const currentValue = field.getValue();
                    if (!field.isValid()) {
                        allFieldsValid = false;
                    }
                    else {
                        this.setFieldValueToDataObject(this.currentDataObj,field,currentValue);
                    }
                });

                // is every field valid?
                if (!allFieldsValid) {
                    shouldCancelChange = true;
                }
                break;
            }
        }
        return shouldCancelChange;
    }

    getFormattedDataObject(): any {
        let formattedResult:any = {};
        this.dataObjDef.fields.forEach((field) => {
            let fieldValue = this.currentDataObj[field.id];
            if (fieldValue) {
                switch (field.idType) {
                    case (KeyType.number): {
                        let parsed;
                        if (field.type === FieldType.float) {
                            parsed = parseFloat(fieldValue);
                            if (!isNaN(parsed)) {
                                formattedResult[field.id] = parsed;
                            }
                        }
                        if (field.type === FieldType.integer) {
                            parsed = parseInt(fieldValue);
                            if (!isNaN(parsed)) {
                                formattedResult[field.id] = parsed;
                            }
                        }
                        break;
                    }
                    case (KeyType.boolean): {
                        formattedResult[field.id] = (fieldValue.toLowerCase() === 'true')
                        break;
                    }
                    default: {
                        formattedResult[field.id] = fieldValue;
                    }
                }
            }
        });
        return formattedResult;
    }


}