import {Form} from "./Form";
import {FormEvent, FormEventType, FormListener} from "./FormListener";
import {FieldListener} from "./field/FieldListener";
import {DataObjectDefinition, FieldDefinition, FieldType} from "./DataObjectTypeDefs";
import {AttributeFieldMapItem, FieldUIConfig, FormUIDefinition} from "./FormUITypeDefs";
import {Field} from "./field/Field";

import debug from 'debug';

const logger = debug('abstract-form');


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
    protected isInitialised:boolean = false;


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
    protected abstract _startUpdate():void;
    protected abstract _startCreate():void;
    protected abstract _reset():void;
    protected abstract _visible():void;
    protected abstract _hidden():void;
    protected abstract _initialise():void;


    public initialise(): void {
        if (this.isInitialised) return;
        this.isInitialised = true;
        this._initialise();
    }


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
        logger(`Finding field UI Config for field ${fieldDef.displayName}`);
        let result:FieldUIConfig|null|undefined = null;
        if (this.uiDef) {
            let index = 0;
            while (index < this.uiDef.fieldGroups.length) {
                const fieldGroup = this.uiDef.fieldGroups[index];
                result = fieldGroup.fields.find((uiConfig) => uiConfig.field.id === fieldDef.id);
                if (result) {
                    logger(`Finding field UI Config for field ${fieldDef.displayName} - Found`);
                    break;
                }
                index ++;
            }
        }
        return result;
    }


    public reset(): void {
        logger(`Resetting form`);

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
        logger(`Changing visibility to ${isVisible}`);
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
        logger(`Starting create new`);
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
        logger(`Starting modify existing on `);
        logger(objectToEdit);
        this.currentDataObj = {...objectToEdit}; // take a copy

        if (this.uiDef) {
            let eventType = FormEventType.MODIFYING;
            // inform the listeners
            let formEvent: FormEvent = {
                formId: this.uiDef.id,
                target: this,
                eventType: eventType
            }
            this._startUpdate();
            this.informFormListeners(formEvent, this.currentDataObj);
        }
    }

    protected abstract setFieldValueToDataObject(dataObj:any,field:Field,currentValue:string|null):void;

    public formChanged(event: FormEvent, formValues?: any): boolean {
        // catch form events for user leaving the form
        let shouldCancelChange = false;
        switch (event.eventType) {
            case (FormEventType.CANCELLING): {
                logger(`Form is cancelling - resetting`);

                // user cancelled the form, will become invisible
                this._reset(); // reset the form state
                break;
            }
            case (FormEventType.DELETING): {
                logger(`Form is deleting - resetting`);
                // user is deleting the object, will become invisible
                this._reset();
                break;
            }
            case (FormEventType.SAVING): {
                logger(`Form is saving, checking validation and storing values`);
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
                    logger(`Form is saving, checking validation - FAILED`);
                    shouldCancelChange = true;
                }
                else {
                    logger(`formatted data object is`);
                    logger(this.getFormattedDataObject());
                }
                break;
            }
        }
        return shouldCancelChange;
    }

    abstract getFormattedDataObject(): any;

    getId(): string {
        let result = '';
        if (this.uiDef) {
            result = this.uiDef.id;
        }
        return result;
    }

    getFieldFromDataFieldId(dataFieldId:string): Field | undefined {
        let result:Field|undefined = undefined;
        logger(`Finding field for attribute ${dataFieldId} `);

        const mapItem: AttributeFieldMapItem | undefined = this.map.find((mapItem) => mapItem.attributeId === dataFieldId);
        if (mapItem) {
            logger(`Mapped attribute ${mapItem.attributeId} to field ${mapItem.fieldId}`);
            // find the field with that id
           result = this.fields.find((field) => field.getId() === mapItem.attributeId);
        }

        return result;
    }
}