import {AttributeFieldMapItem, DATA_ID_ATTRIBUTE, FieldUIConfig, UIFieldType} from "./FormUITypeDefs";
import {AbstractForm} from "./AbstractForm";
import {BootstrapFormConfigHelper} from "../helper/BootstrapFormConfigHelper";
import {DataObjectDefinition, FieldDefinition} from "./DataObjectTypeDefs";
import {Field} from "./field/Field";
import {FormElementFactory, FormFactoryResponse} from "./factory/FormElementFactory";
import {AbstractField} from "./field/AbstractField";
import debug from 'debug';
import browserUtil from "../../util/BrowserUtil";
import {TextAreaField} from "./field/TextAreaField";
import {RadioButtonGroupField} from "./field/RadioButtonGroupField";
import {SelectField} from "./field/SelectField";
import {InputField} from "./field/InputField";

const logger = debug('basic-form');
const dlogger = debug('basic-form-detail');

export class BasicFormImplementation extends AbstractForm {

    protected factoryElements: FormFactoryResponse | null = null;


    public constructor(containerId: string, dataObjDef: DataObjectDefinition) {
        super(containerId, dataObjDef);
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
                                field = new TextAreaField(this.uiDef.id, fieldUIConfig, fieldDef, <HTMLTextAreaElement>fieldEl);
                                break;
                            }
                            case UIFieldType.radioGroup: {
                                field = new RadioButtonGroupField(this.uiDef.id, fieldUIConfig, fieldDef, fieldEl, subElements);
                                break;
                            }
                            case UIFieldType.select: {
                                field = new SelectField(this.uiDef.id, fieldUIConfig, fieldDef, <HTMLSelectElement>fieldEl);
                                break;
                            }
                            default: {
                                field = new InputField(this.uiDef.id, fieldUIConfig, fieldDef, <HTMLInputElement>fieldEl);
                                break;
                            }
                        }
                        this.fields.push(field);
                        this.map.push({attributeId: dataId, fieldId: fieldId});
                    }
                }
            } else {
                dlogger(`Converting field input element ${fieldId} with data-id of ${dataId} field definition is NOT FOUND`);

            }
        }

    }

    protected _initialise(): void {
        logger(`Initialising`);

        // ok, so given a Data Object definition we are going to create the form ui config
        this.uiDef = BootstrapFormConfigHelper.getInstance().generateFormConfig(this.dataObjDef);
        logger(this.uiDef);
        // now we need to create all the form elements from the ui definition
        this.factoryElements = FormElementFactory.getInstance().createFormElements(this, this.formListeners, this.uiDef, this.fieldListeners);
        logger(this.factoryElements);
        // create field elements for each field element, and the basic map
        logger(`Converting field input elements to Field objects`);
        this.factoryElements.fields.forEach((fieldEl) => {
            this.setupFieldObject(fieldEl);
        });

        logger(`Converting field text area elements to Field objects`);
        this.factoryElements.textFields.forEach((fieldEl) => {
            this.setupFieldObject(fieldEl);
        });

        logger(`Converting field select elements to Field objects`);
        this.factoryElements.selectFields.forEach((fieldEl) => {
            this.setupFieldObject(fieldEl);
        });

        logger(`Converting field rbg elements to Field objects`);
        this.factoryElements.radioButtonGroups.forEach((rbg) => {
            this.setupFieldObject(rbg.container, rbg.radioButtons);
        });


        logger(`field/data map is `);
        logger(this.map);
        logger('fields are');
        logger(this.fields);
    }

    protected _reset(): void {
    }

    protected validateField(fieldDef: FieldDefinition) {
        const field: Field | undefined = this.getFieldFromDataFieldId(fieldDef.id);
        if (field) field.validate();
    }

    protected renderField(fieldDef: FieldDefinition, currentValue: string): string {
        let result = currentValue;
        const field: Field | undefined = this.getFieldFromDataFieldId(fieldDef.id);

        if (field) {
            result = field.render(currentValue);
        }
        return result;
    }


    protected _startCreate(): void {
        // we have a new object, there might be some values to generate
        this.dataObjDef.fields.forEach((fieldDef) => {
            if (fieldDef.generator && fieldDef.generator.onCreation) {
                let fieldValue = fieldDef.generator.generator.generate(fieldDef, true);
                dlogger(`Setting default values for ${fieldDef.displayName} to ${fieldValue}`);
                this.currentDataObj[fieldDef.id] = fieldValue;
            }
            let fieldValue = this.currentDataObj[fieldDef.id];
            if (fieldValue) fieldValue = this.renderField(fieldDef, fieldValue);
            this.setFieldValueFromDataObject(fieldDef, fieldValue);
            // run the validation to let the user know what is required
            this.validateField(fieldDef);
        });

        // delete button can go
        if (this.factoryElements) browserUtil.addAttributes(this.factoryElements.deleteButton, [{
            name: 'style',
            value: 'display:none'
        }]);

    }

    protected _startUpdate(): void {
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
            this.setFieldValueFromDataObject(fieldDef, this.currentDataObj[fieldDef.id]);
            this.validateField(fieldDef);
        });
        // delete button make visible again
        if (this.factoryElements) browserUtil.removeAttributes(this.factoryElements.deleteButton, ['style']);
        if (this.factoryElements) browserUtil.addAttributes(this.factoryElements.deleteButton, [{
            name: 'style',
            value: 'display:block'
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

}