import {AttributeFieldMapItem, DATA_ID_ATTRIBUTE, DisplayOrder, FieldUIConfig, UIFieldType} from "./FormUITypeDefs";
import {AbstractForm} from "./AbstractForm";
import {DataObjectDefinition, FieldDefinition, FieldType} from "../../model/DataObjectTypeDefs";
import {Field} from "./field/Field";
import {FormElementFactory, FormFactoryResponse} from "./factory/FormElementFactory";
import debug from 'debug';
import browserUtil from "../../util/BrowserUtil";
import {TextAreaField} from "./field/TextAreaField";
import {RadioButtonGroupField} from "./field/RadioButtonGroupField";
import {SelectField} from "./field/SelectField";
import {InputField} from "./field/InputField";
import {FormConfigHelper} from "./FormConfigHelper";
import {ColourInputField} from "./field/ColourInputField";
import {FormFieldPermissionChecker} from "./FormFieldPermissionChecker";

const logger = debug('basic-form');
const dlogger = debug('basic-form-detail');

export class BasicFormImplementation extends AbstractForm {

    protected factoryElements: FormFactoryResponse | null = null;


    public constructor(containerId: string, dataObjDef: DataObjectDefinition, configHelper:FormConfigHelper, permissionChecker:FormFieldPermissionChecker, hasExternalControl:boolean = false) {
        super(containerId, dataObjDef,configHelper,permissionChecker, hasExternalControl);
    }

    getFormattedDataObject(): any {
        logger(`Getting current formatted data`);
        let formattedResult: any = {};
        this.dataObjDef.fields.forEach((fieldDef) => {
            let fieldValue = this.currentDataObj[fieldDef.id];
            formattedResult[fieldDef.id] = this.getFormattedFieldValue(fieldDef)
        });
        logger(formattedResult);
        return formattedResult;
    }

    public clearReadOnly() {
        super.clearReadOnly();
        this.enableButtons();
    }

    public setReadOnly() {
        super.setReadOnly();
        this.disableButtons();
    }

    protected _hidden(): void {
        if (this.factoryElements) this.containerEl?.removeChild(this.factoryElements.form);
    }

    protected setupFieldObject(fieldEl: HTMLElement, subElements: HTMLInputElement[] = []) {
        // get the data-id field from the field element
        const dataId: string | null = fieldEl.getAttribute(DATA_ID_ATTRIBUTE);
        const fieldId: string | null = fieldEl.getAttribute('id');
        dlogger(`Converting field input element ${fieldId} with data-id of ${dataId}`);
        if (dataId && fieldId) {
            // find the corresponding field definition
            const index = this.dataObjDef.fields.findIndex((value) => value.id === dataId);
            const fieldDef: FieldDefinition | undefined = this.dataObjDef.fields.find((value) => value.id === dataId);
            if (fieldDef) {
                dlogger(`Converting field input element ${fieldId} with data-id of ${dataId} field definition is`);
                logger(fieldDef);

                // find the corresponding ui definition
                const fieldUIConfig: FieldUIConfig | null | undefined = this.findFieldUiConfig(fieldDef);
                dlogger(`Converting field input element ${fieldId} with data-id of ${dataId} field ui config is`);
                logger(fieldUIConfig);
                if (fieldUIConfig) {
                    if (this.uiDef) {
                        let field: Field;
                        switch (fieldUIConfig.elementType) {
                            case UIFieldType.textarea: {
                                field = new TextAreaField(this, fieldUIConfig, fieldDef, <HTMLTextAreaElement>fieldEl);
                                break;
                            }
                            case UIFieldType.radioGroup: {
                                field = new RadioButtonGroupField(this, fieldUIConfig, fieldDef, fieldEl, subElements);
                                break;
                            }
                            case UIFieldType.select: {
                                field = new SelectField(this, fieldUIConfig, fieldDef, <HTMLSelectElement>fieldEl);
                                break;
                            }
                            default: {
                                if (fieldDef.type === FieldType.colour) {
                                    field = new ColourInputField(this, fieldUIConfig, fieldDef, <HTMLInputElement>fieldEl);
                                }
                                else {
                                    field = new InputField(this, fieldUIConfig, fieldDef, <HTMLInputElement>fieldEl);
                                }
                                break;
                            }
                        }
                        this.fields.push(field);
                        field.addFieldListener(this);
                        this.map.push({attributeId: dataId, fieldId: fieldId});
                    }
                }
            } else {
                dlogger(`Converting field input element ${fieldId} with data-id of ${dataId} field definition is NOT FOUND`);

            }
        }
    }

    protected clearUnsavedMessage() {
        if (this.factoryElements) this.factoryElements.unsavedMessage.innerHTML = '';
    }

    protected setUnsavedMessage() {
        if (this.factoryElements && this.uiDef && this.uiDef.unsavedChanges.innerHTML) {
            this.factoryElements.unsavedMessage.innerHTML = this.uiDef.unsavedChanges.innerHTML;
        } else if (this.factoryElements) {
            this.factoryElements.unsavedMessage.innerHTML = 'Pending changes to save';
        }
    }

    protected _initialise(displayOrder: DisplayOrder[], hasDeleteButton: boolean, hideModifierFields: boolean = false): void {
        logger(`Initialising`);

        // ok, so given a Data Object definition we are going to create the form ui config
        this.uiDef = this.configHelper.generateFormConfig(this.dataObjDef, displayOrder, hasDeleteButton, hideModifierFields,this.hasExternalControl);
        logger(this.uiDef);
        // now we need to create all the form elements from the ui definition
        this.factoryElements = FormElementFactory.getInstance().createFormElements(this, this.formListeners, this.uiDef, this.fieldListeners);
        logger(this.factoryElements);
        // create field elements for each field element, and the basic map
        logger(`Converting field input elements to Field objects`);
        this.factoryElements.fields.forEach((fieldEl) => {
            fieldEl.addEventListener('keyup', (event) => {
                dlogger(`key up in form ${this.getName()}`);
                this.hasChangedBoolean = true;
                this.setUnsavedMessage();
            });
            this.setupFieldObject(fieldEl);
        });

        logger(`Converting field text area elements to Field objects`);
        this.factoryElements.textFields.forEach((fieldEl) => {
            fieldEl.addEventListener('keyup', (event) => {
                dlogger(`key up in form ${this.getName()}`);
                this.hasChangedBoolean = true;
                this.setUnsavedMessage();
            });
            this.setupFieldObject(fieldEl);
        });

        logger(`Converting field select elements to Field objects`);
        this.factoryElements.selectFields.forEach((fieldEl) => {
            fieldEl.addEventListener('change', (event) => {
                dlogger(`change in form ${this.getName()}`);
                this.hasChangedBoolean = true;
                this.setUnsavedMessage();
            });
            this.setupFieldObject(fieldEl);
        });

        logger(`Converting field rbg elements to Field objects`);
        this.factoryElements.radioButtonGroups.forEach((rbg) => {
            this.setupFieldObject(rbg.container, rbg.radioButtons);
            rbg.radioButtons.forEach((radioButton) => {
                radioButton.addEventListener('change', (event) => {
                    dlogger(`radio button change in form ${this.getName()}`);
                    this.hasChangedBoolean = true;
                    this.setUnsavedMessage();
                });
            });
        });


        logger(`field/data map is `);
        logger(this.map);
        logger('fields are');
        logger(this.fields);
    }

    protected _reset(): void {
        this.clearUnsavedMessage();
    }

    protected validateField(fieldDef: FieldDefinition) {
        const field: Field | undefined = this.getFieldFromDataFieldId(fieldDef.id);
        if (field) {
            field.validate();
            if (this.currentDataObj) {
                if (!this.permissionChecker.hasPermissionToEditField(this.currentDataObj,field)) {
                    field.setReadOnly();
                }
                else {
                    field.clearReadOnly();
                }
            }
        }
    }

    protected renderField(fieldDef: FieldDefinition, currentValue: string): string {
        let result: string = currentValue;
        const field: Field | undefined = this.getFieldFromDataFieldId(fieldDef.id);

        if (field) {
            result = field.render(result);
        }
        return result;
    }

    protected _startCreate(): void {
        this.clearUnsavedMessage();

        // we have a new object, there might be some values to generate
        this.dataObjDef.fields.forEach((fieldDef) => {
            if (fieldDef.generator && fieldDef.generator.onCreation) {
                let fieldValue = fieldDef.generator.generator.generate(fieldDef, true);
                dlogger(`Setting default values for ${fieldDef.displayName} to ${fieldValue}`);
                this.currentDataObj[fieldDef.id] = fieldValue;
            }
            let fieldValue = this.currentDataObj[fieldDef.id];
            if (fieldValue) {
                fieldValue = this.renderField(fieldDef, fieldValue);
                this.setFieldValueFromDataObject(fieldDef, fieldValue);
            }

            // run the validation to let the user know what is required
            this.validateField(fieldDef);
        });

        // delete button can go
        if (this.factoryElements && this.factoryElements.deleteButton) browserUtil.addAttributes(this.factoryElements.deleteButton, [{
            name: 'style',
            value: 'display:none'
        }]);

    }

    protected _startUpdate(): void {
        this.clearUnsavedMessage();

        // we have an existing object, there might be some values to generate
        logger(this.currentDataObj);
        this.dataObjDef.fields.forEach((fieldDef) => {
            if (fieldDef.generator && fieldDef.generator.onModify) {
                let fieldValue = fieldDef.generator.generator.generate(fieldDef, false);
                dlogger(`Setting default modified values for ${fieldDef.displayName} to ${fieldValue}`);
                this.currentDataObj[fieldDef.id] = fieldValue;
            }
            let fieldValue = this.currentDataObj[fieldDef.id];
            if (fieldValue) fieldValue = this.renderField(fieldDef, fieldValue);
            this.setFieldValueFromDataObject(fieldDef, fieldValue);
            this.validateField(fieldDef);
        });
        // delete button make visible again
        if (this.factoryElements && this.factoryElements.deleteButton) browserUtil.removeAttributes(this.factoryElements.deleteButton, ['style']);
    }

    protected _displayOnly(): void {
        this.clearUnsavedMessage();

        // we have an existing object, there might be some values to generate
        logger(this.currentDataObj);
        this.dataObjDef.fields.forEach((fieldDef) => {
            let fieldValue = this.currentDataObj[fieldDef.id];
            if (fieldValue) fieldValue = this.renderField(fieldDef, fieldValue);
            this.setFieldValueFromDataObject(fieldDef, fieldValue);
        });
        // delete button can go
        if (this.factoryElements && this.factoryElements.deleteButton) if (this.factoryElements) browserUtil.addAttributes(this.factoryElements.deleteButton, [{
            name: 'style',
            value: 'display:none'
        }]);
    }

    protected _visible(): void {
        if (this.factoryElements) this.containerEl?.appendChild(this.factoryElements.form);
    }

    protected setFieldValueToDataObject(dataObj: any, field: Field, currentValue: string | null): void {
        // find the attribute id from the map
        const mapItem: AttributeFieldMapItem | undefined = this.map.find((mapItem) => mapItem.attributeId === field.getId());
        if (mapItem) {
            dlogger(`Mapped field ${mapItem.fieldId} to attribute ${mapItem.attributeId} with value ${currentValue}`);
            this.currentDataObj[mapItem.attributeId] = currentValue;
        } else {
            logger(`Mapped field ${field.getId()} to attribute NOT FOUND`);

        }
    }

    protected setFieldValueFromDataObject(fieldDef: FieldDefinition, currentValue: string | null): void {
        const field: Field | undefined = this.getFieldFromDataFieldId(fieldDef.id);
        // find the field id from the map
        if (field) {
            if (currentValue) {
                field.setValue(currentValue);
            } else {
                field.clearValue();
            }
        }
    }

    protected getFormattedFieldValue(fieldDef: FieldDefinition): any | null {
        let result: any | null = null;

        const mapItem: AttributeFieldMapItem | undefined = this.map.find((mapItem) => mapItem.attributeId === fieldDef.id);
        if (mapItem) {
            dlogger(`Mapped attribute ${mapItem.attributeId} to field ${mapItem.fieldId} with for getting formatted value`);
            // find the field with that id
            const field: Field | undefined = this.fields.find((field) => field.getId() === mapItem.attributeId);
            if (field) {
                result = field.getFormattedValue();
            }
        }
        return result;
    }

    protected _isSameObjectAsDisplayed(dataObj: any): boolean {
        // we can only be sure for objects with keys
        let isSameObject = false;
        dlogger(`is same object as current`);
        dlogger(dataObj);
        dlogger(this.currentDataObj);

        this.dataObjDef.fields.every((field) => {
            if (field.isKey) {
                const currentObjId = this.getFieldFromDataFieldId(field.id)?.getValue();
                const suppliedObjId = dataObj[field.id];
                dlogger(`is same object id ${suppliedObjId} as current ${currentObjId}`);
                if ((currentObjId && !suppliedObjId) || (currentObjId && !suppliedObjId)) {
                    isSameObject = false;
                }
                if ((currentObjId && suppliedObjId) && (currentObjId == suppliedObjId)) {
                    isSameObject = true;
                }
                return false;
            }
            return true;
        });
        return isSameObject;
    }

    protected enableButtons() {
        if (this.factoryElements && this.uiDef) {
            if (this.factoryElements.deleteButton) {
                this.factoryElements.deleteButton.removeAttribute('disabled');
            }
            if (this.factoryElements.cancelButton) this.factoryElements.cancelButton.removeAttribute('disabled');
            if (this.factoryElements.submitButton) {
                this.factoryElements.submitButton.removeAttribute('disabled');

                // if (this.uiDef.submitButton) { // @ts-ignore
                //     this.factoryElements.submitButton.innerText = this.uiDef.submitButton.text;
                // }
            }

        }
    }

    protected disableButtons() {
        if (this.factoryElements) {
            if (this.factoryElements.deleteButton) {
                this.factoryElements.deleteButton.setAttribute('disabled', 'true');
            }
            if (this.factoryElements.cancelButton) this.factoryElements.cancelButton.setAttribute('disabled', 'true');
            if (this.factoryElements.submitButton) this.factoryElements.submitButton.setAttribute('disabled', 'true');
        }
    }

    protected _saveFinishedOrAborted(): void {
        dlogger(`save is finished or aborted`);
        this.enableButtons();
        this.clearUnsavedMessage();
    }

    protected _saveIsActive(): void {
        dlogger(`save is active`);
        this.disableButtons();
        if (this.factoryElements && this.uiDef) {
            if (this.uiDef.activeSave && this.uiDef.submitButton && this.factoryElements.submitButton) {
                dlogger(`save is active ${this.uiDef.activeSave}`);
                // this.factoryElements.submitButton.innerHTML = this.uiDef.activeSave + this.uiDef.submitButton.text;
            }
        }
    }


}