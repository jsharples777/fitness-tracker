import {Form} from "./Form";
import {FormEvent, FormEventType, FormListener} from "./FormListener";
import {FieldListener} from "./field/FieldListener";
import {DataObjectDefinition, FieldDefinition} from "../../model/DataObjectTypeDefs";
import {AttributeFieldMapItem, DisplayOrder, FieldUIConfig, FormUIDefinition} from "./FormUITypeDefs";
import {Field} from "./field/Field";

import debug from 'debug';
import {RuleCheck, ValidationManager} from "./validation/ValidationManager";
import {AlertEvent, AlertListener, AlertType} from "../alert/AlertListener";
import {AlertManager} from "../alert/AlertManager";
import {ConditionResponse} from "./validation/ValidationTypeDefs";
import {v4} from "uuid";

const logger = debug('abstract-form');
const dlogger = debug('abstract-form-detail');
const vlogger = debug('abstract-form-detail-validation');


export abstract class AbstractForm implements Form,FormListener,AlertListener,FieldListener{
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
    protected hasChangedBoolean:boolean = false;
    protected isDisplayOnly:boolean = false;
    protected id:string;


    protected constructor(containerId: string, dataObjDef: DataObjectDefinition) {
        this.containerEl = document.getElementById(containerId);
        if (!(this.containerEl)) throw new Error (`container ${containerId} for form ${dataObjDef.id} does not exist`);

        this.map = [];
        this.dataObjDef = dataObjDef;
        this.currentDataObj = {};
        this.id = v4();
        // sub-classes need to create the form and it's fields

        // listen to ourselves
        this.addFormListener(this);
    }

    public hasChanged():boolean {
        return this.hasChangedBoolean;
    }

    getName(): string {
        return  this.dataObjDef.displayName;
    }

    valueChanged(formId: String, field: FieldDefinition, newValue: string | null): void {
        this.hasChangedBoolean = true;
        this.setUnsavedMessage();
        logger(`Form has changed`);
    }

    failedValidation(formId: String, field: FieldDefinition, currentValue: string, message: string): void {
        this.hasChangedBoolean = true;
        logger(`Form has changed`);
    }

    /* methods to be implemented in the subclass */
    protected abstract _startUpdate():void;
    protected abstract _startCreate():void;
    protected abstract _reset():void;
    protected abstract _visible():void;
    protected abstract _hidden():void;
    protected abstract _initialise(displayOrder:DisplayOrder[],hasDeleteButton:boolean,hideModifierFields:boolean):void;
    protected abstract _displayOnly():void;
    protected abstract _isSameObjectAsDisplayed(dataObj:any):boolean;

    protected abstract setFieldValueToDataObject(dataObj:any,field:Field,currentValue:string|null):void;
    public abstract getFormattedDataObject(): any;
    protected abstract _saveFinishedOrAborted():void;
    protected abstract _saveIsActive():void;


    public initialise(displayOrder:DisplayOrder[],hasDeleteButton:boolean,hideModifierFields:boolean = false): void {
        if (this.isInitialised) return;
        this.isInitialised = true;
        this._initialise(displayOrder,hasDeleteButton,hideModifierFields);
    }


    public addFieldListener(listener: FieldListener): void {
        this.fieldListeners.push(listener);
    }

    public addFormListener(listener: FormListener): void {
        this.formListeners.push(listener);
    }

    protected abstract clearUnsavedMessage():void;

    protected abstract setUnsavedMessage():void;



    protected informFormListeners(formEvent: FormEvent, dataObj?: any) {
        this.formListeners.forEach((listener) => listener.formChanged(formEvent, dataObj));
    }

    protected findFieldUiConfig(fieldDef:FieldDefinition):FieldUIConfig|null|undefined {
        dlogger(`Finding field UI Config for field ${fieldDef.displayName}`);
        let result:FieldUIConfig|null|undefined = null;
        if (this.uiDef) {
            let index = 0;
            while (index < this.uiDef.fieldGroups.length) {
                const fieldGroup = this.uiDef.fieldGroups[index];
                result = fieldGroup.fields.find((uiConfig) => uiConfig.field.id === fieldDef.id);
                if (result) {
                    dlogger(`Finding field UI Config for field ${fieldDef.displayName} - Found`);
                    break;
                }
                index ++;
            }
        }
        return result;
    }


    public reset(): void {
        logger(`Resetting form`);
        this.clearUnsavedMessage();
        this.isDisplayOnly = false;
        this.hasChangedBoolean = false;

        // inform the listeners
        if (this.uiDef) {
            let formEvent: FormEvent = {
                formId: this.id,
                target: this,
                eventType: FormEventType.RESETTING
            }
            this.informFormListeners(formEvent, this.currentDataObj);
        }
        this.currentDataObj = {};
        this._reset();
        // reset all the fields
        this.fields.forEach((field) => {
            field.reset();
        });
        this.hasChangedBoolean = false;
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
                formId: this.id,
                target: this,
                eventType: eventType
            }
            this.informFormListeners(formEvent, this.currentDataObj);
        }
        if (isVisible && !this.isDisplayOnly) this.checkFormValidationOnDisplay();
        if (isVisible && this.isDisplayOnly) this.checkForVisualValidationForDisplayOnly();
    }

    protected checkForVisualValidationForDisplayOnly() {
        logger(`Checking display validation for display only`);
        this.fields.forEach((field) => {
            field.show();
            // @ts-ignore
            let response = ValidationManager.getInstance().applyRulesToTargetField(this.id, field.getFieldDefinition(),ConditionResponse.hide);
            if (response.ruleFailed) {
                // @ts-ignore
                field.hide();
                vlogger(`Field ${field.getId()} is hidden from validation manager with message ${response.message}`);
            }

        });
    }

    protected checkFormValidationOnDisplay() {
        logger(`Checking display validation`);

        this.fields.forEach((field) => {
            field.show();
            const currentValue = field.getValue();
            if (!field.isValid()) {
                logger(`Field ${field.getId()} is invalid`);
                field.setInvalid(`${field.getName()} has an invalid format or is required.`);
            } else {
                // does the field fulfil any rules from the Validation manager
                // @ts-ignore
                let response: RuleCheck = ValidationManager.getInstance().applyRulesToTargetField(this.id, field.getFieldDefinition(),ConditionResponse.invalid);
                if (response.ruleFailed) {
                    // @ts-ignore
                    field.setInvalid(response.message);
                    vlogger(`Field ${field.getId()} is invalid from validation manager with message ${response.message}`);
                }
                // @ts-ignore
                response = ValidationManager.getInstance().applyRulesToTargetField(this.id, field.getFieldDefinition(),ConditionResponse.hide);
                if (response.ruleFailed) {
                    // @ts-ignore
                    field.hide();
                    vlogger(`Field ${field.getId()} is hidden from validation manager with message ${response.message}`);
                }
            }
        });

    }

    public startCreateNew(): any {
        this.clearUnsavedMessage();
        logger(`Starting create new`);
        this.reset();
        this.currentDataObj = {};
        this.isDisplayOnly = false;
        this.hasChangedBoolean = false;
        if (this.uiDef) {
            let eventType = FormEventType.CREATING;
            // inform the listeners
            let formEvent: FormEvent = {
                formId: this.id,
                target: this,
                eventType: eventType
            }
            this._startCreate();
            this.informFormListeners(formEvent, this.currentDataObj);
        }
        this.clearReadOnly();
        return this.currentDataObj;
    }


    public startUpdate(objectToEdit: any): void {
        this.clearUnsavedMessage();
        logger(`Starting modify existing on `);
        this.isDisplayOnly = false;
        this.hasChangedBoolean = false;
        logger(objectToEdit);
        this.currentDataObj = {...objectToEdit}; // take a copy

        if (this.uiDef) {
            let eventType = FormEventType.MODIFYING;
            // inform the listeners
            let formEvent: FormEvent = {
                formId: this.id,
                target: this,
                eventType: eventType
            }
            this._startUpdate();
            this.informFormListeners(formEvent, this.currentDataObj);
        }
        this.clearReadOnly();
    }

    displayOnly(objectToView: any): void {
        this.clearUnsavedMessage();
        logger(`Starting display only `);
        logger(objectToView);
        this.isDisplayOnly = true;
        this.hasChangedBoolean = false;
        this.currentDataObj = {...objectToView}; // take a copy

        if (this.uiDef) {
            this._displayOnly();
        }
        this.setReadOnly();
    }



    public formChanged(event: FormEvent, formValues?: any): boolean {
        // catch form events for user leaving the form
        let shouldCancelChange = false;
        switch (event.eventType) {
            case (FormEventType.CANCELLING): {
                logger(`Form is cancelling`);
                if (this.hasChangedBoolean && !this.isDisplayOnly) {
                    if (this.uiDef) {
                        AlertManager.getInstance().startAlert(this, this.uiDef.displayName, `Lose any unsaved changes?`, FormEventType.CANCELLING);
                    }
                }
                else {
                    if (this.uiDef) {
                        let formEvent: FormEvent = {
                            formId: this.id,
                            target: this,
                            eventType: FormEventType.CANCELLED
                        }
                        this.informFormListeners(formEvent, this.currentDataObj);
                    }
                }
                break;
            }
            case (FormEventType.CANCELLING_ABORTED): {
                logger(`Form is cancelling - aborted`);
                break;
            }
            case (FormEventType.CANCELLED): {
                logger(`Form is cancelled - resetting`);
                // user cancelled the form, will become invisible
                this.isDisplayOnly = true;
                this.reset(); // reset the form state
                this.setReadOnly();
                break;
            }
            case (FormEventType.DELETING): {
                logger(`Form is deleting`);
                if (this.uiDef) {
                    AlertManager.getInstance().startAlert(this, this.uiDef.displayName,`Are you sure you want to delete this information?`,FormEventType.DELETING);
                }
                break;
            }
            case (FormEventType.DELETE_ABORTED): {
                logger(`Form is deleting - aborted`);
                break;
            }
            case (FormEventType.DELETED): {
                logger(`Form is deleted - resetting`);
                // user is deleting the object, will become invisible
                this.reset();
                break;
            }
            case (FormEventType.SAVE_ABORTED): {
                this._saveFinishedOrAborted();
                logger(`Form save cancelled`);
                break;
            }
            case (FormEventType.SAVED): {
                this._saveFinishedOrAborted();
                logger(`Form is saved with data`);
                logger(formValues);
                this.isDisplayOnly = false;
                this.hasChangedBoolean = false;
                break;
            }
            case (FormEventType.SAVING): {
                logger(`Form is saving, checking validation and storing values`);
                this._saveIsActive();
                if (this.uiDef) {
                    let allFieldsValid: boolean = true;

                    // user attempting to save the form, lets check the field validation
                    this.fields.forEach((field) => {
                        const currentValue = field.getValue();
                        if (!field.isValid()) {
                            vlogger(`Field ${field.getId()} is invalid`);
                            field.setInvalid(`${field.getName()} has an invalid format or is required.`);
                            allFieldsValid = false;
                        } else {
                            // does the field fulfil any rules from the Validation manager
                            // @ts-ignore
                            const response: RuleCheck = ValidationManager.getInstance().applyRulesToTargetField(this.id, field.getFieldDefinition(),ConditionResponse.invalid);
                            if (response.ruleFailed) {
                                // @ts-ignore
                                field.setInvalid(response.message);
                                vlogger(`Field ${field.getId()} is invalid from validation manager with message ${response.message}`);
                                allFieldsValid = false;
                            } else {
                                this.setFieldValueToDataObject(this.currentDataObj, field, currentValue);
                            }
                        }
                    });

                    // is every field valid?
                    if (!allFieldsValid) {
                        logger(`Form is saving, checking validation - FAILED`);
                        let formEvent: FormEvent = {
                            formId: this.id,
                            target: this,
                            eventType: FormEventType.SAVE_ABORTED
                        }
                        this.informFormListeners(formEvent,this.currentDataObj);
                        shouldCancelChange = true;
                    } else {
                        logger(`formatted data object is`);
                        const formattedDataObject = this.getFormattedDataObject();
                        let formEvent: FormEvent = {
                            formId: this.id,
                            target: this,
                            eventType: FormEventType.SAVED
                        }
                        this.informFormListeners(formEvent, formattedDataObject);
                    }
                    break;
                }
            }
        }
        return shouldCancelChange;
    }


    getId(): string {
        return this.id;
    }

    getFieldFromDataFieldId(dataFieldId:string): Field | undefined {
        let result:Field|undefined = undefined;
        dlogger(`Finding field for attribute ${dataFieldId} `);

        const mapItem: AttributeFieldMapItem | undefined = this.map.find((mapItem) => mapItem.attributeId === dataFieldId);
        if (mapItem) {
            dlogger(`Mapped attribute ${mapItem.attributeId} to field ${mapItem.fieldId}`);
            // find the field with that id
           result = this.fields.find((field) => field.getId() === mapItem.attributeId);
        }

        return result;
    }

    completed(event:AlertEvent): void {
        logger(`Handling alert completed`);
        logger(event);
        if (event.context && this.uiDef) {
            switch(event.context) {
                case (FormEventType.CANCELLING): {
                    if (event.outcome === AlertType.confirmed) {
                        let formEvent: FormEvent = {
                            formId: this.id,
                            target: this,
                            eventType: FormEventType.CANCELLED
                        }
                        this.informFormListeners(formEvent,this.currentDataObj);
                    }
                    else {
                        let formEvent: FormEvent = {
                            formId: this.id,
                            target: this,
                            eventType: FormEventType.CANCELLING_ABORTED
                        }
                        this.informFormListeners(formEvent,this.currentDataObj);
                    }
                    break;
                }
                case (FormEventType.DELETING): {
                    if (event.outcome === AlertType.confirmed) {
                        let formEvent: FormEvent = {
                            formId: this.id,
                            target: this,
                            eventType: FormEventType.DELETED
                        }
                        this.informFormListeners(formEvent,this.currentDataObj);
                    }
                    else {
                        let formEvent: FormEvent = {
                            formId: this.id,
                            target: this,
                            eventType: FormEventType.DELETE_ABORTED
                        }
                        this.informFormListeners(formEvent,this.currentDataObj);
                    }
                    break;
                }
            }

        }
    }

    clearReadOnly(): void {
        this.fields.forEach((field) => {
           field.clearReadOnly();
        });
    }


    setReadOnly(): void {
        this.fields.forEach((field) => {
            field.setReadOnly();
        });
    }


    isDisplayingItem(dataObj: any): boolean {
        if (this.currentDataObj) {
            return this._isSameObjectAsDisplayed(dataObj);
        }
        return false;
    }

    isReadOnly(): boolean {
        return this.isDisplayOnly;
    }





}