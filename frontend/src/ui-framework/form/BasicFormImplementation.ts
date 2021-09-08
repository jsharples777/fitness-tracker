import {AttributeFieldMapItem, DATA_ID_ATTRIBUTE, FieldUIConfig} from "./FormUITypes";
import {AbstractForm} from "./AbstractForm";
import {BootstrapFormConfigHelper} from "../helper/BootstrapFormConfigHelper";
import {DataObjectDefinition, FieldDefinition} from "./DataObjectTypes";
import {Field} from "./Field";
import {FormElementFactory, FormFactoryResponse} from "./FormElementFactory";
import {InputField} from "./InputField";
import debug from 'debug';

const logger = debug('basic-form');
const dlogger = debug('basic-form-detail');

export class BasicFormImplementation extends AbstractForm {

    protected factoryElements:FormFactoryResponse|null = null;


    public constructor(containerId: string, dataObjDef: DataObjectDefinition) {
        super(containerId,dataObjDef);
    }

    protected _hidden(): void {
        if (this.factoryElements) this.containerEl?.removeChild(this.factoryElements.form);
    }

    public initialise(): void {
        logger(`Initialising`);

        // ok, so given a Data Object definition we are going to create the form ui config
        this.uiDef = BootstrapFormConfigHelper.getInstance().generateFormConfig(this.dataObjDef);
        logger(this.uiDef);
        // now we need to create all the form elements from the ui definition
        this.factoryElements = FormElementFactory.getInstance().createFormElements(this,this.formListeners,this.uiDef,this.fieldListeners);
        logger(this.factoryElements);
        // create field elements for each field element, and the basic map
        logger(`Converting field input elements to Field objects`);
        this.factoryElements.fields.forEach((fieldEl) => {
            // get the data-id field from the field element
            const dataId:string|null = fieldEl.getAttribute(DATA_ID_ATTRIBUTE);
            const fieldId:string|null = fieldEl.getAttribute('id');
            dlogger(`Converting field input element ${fieldId} with data-id of ${dataId}`);
            if (dataId && fieldId) {
                // find the corresponding field definition
                const index = this.dataObjDef.fields.findIndex((value) => value.id === dataId);
                const fieldDef:FieldDefinition|undefined = this.dataObjDef.fields.find((value) => value.id === dataId);
                if (fieldDef) {
                    dlogger(`Converting field input element ${fieldId} with data-id of ${dataId} field definition is`);
                    logger(fieldDef);

                    // find the corresponding ui definition
                    const fieldUIConfig:FieldUIConfig|null|undefined = this.findFieldUiConfig(fieldDef);
                    dlogger(`Converting field input element ${fieldId} with data-id of ${dataId} field ui config is`);
                    logger(fieldUIConfig);
                    if (fieldUIConfig) {
                        let field:Field = new InputField(fieldUIConfig, fieldDef, fieldEl);
                        this.fields.push(field);
                        this.map.push({attributeId: dataId, fieldId: fieldId});
                    }
                }
                else {
                    dlogger(`Converting field input element ${fieldId} with data-id of ${dataId} field definition is NOT FOUND`);

                }
            }
        });
        logger(`field/data map is `);
        logger(this.map);
        logger('fields are');
        logger(this.fields);
    }

    protected _reset(): void {}

    protected validateField(fieldDef:FieldDefinition) {
        const mapItem: AttributeFieldMapItem | undefined = this.map.find((mapItem) => mapItem.attributeId === fieldDef.id);
        if (mapItem) {
            dlogger(`Mapped attribute ${mapItem.attributeId} to field ${mapItem.fieldId} with for validation`);
            // find the field with that id
            const field: Field | undefined = this.fields.find((field) => field.getId() === mapItem.attributeId);
            if (field) field.validate();
        }
    }


    protected _startCreate(): void {
        // we have a new object, there might be some values to generate
        this.dataObjDef.fields.forEach((fieldDef) => {
            if (fieldDef.generator && fieldDef.generator.onCreation) {
                let fieldValue = fieldDef.generator.generator.generate(fieldDef,true);
                dlogger(`Setting default values for ${fieldDef.displayName} to ${fieldValue}`);
                this.currentDataObj[fieldDef.id] = fieldValue;
            }
            this.setFieldValueFromDataObject(fieldDef,this.currentDataObj[fieldDef.id]);
            // run the validation to let the user know what is required
            this.validateField(fieldDef);
        });


    }

    protected _startUpdate(): void {
        // we have an existing object, there might be some values to generate
        logger(this.currentDataObj);
        this.dataObjDef.fields.forEach((fieldDef) => {
            if (fieldDef.generator && fieldDef.generator.onModify) {
                let fieldValue = fieldDef.generator.generator.generate(fieldDef,false);
                dlogger(`Setting default modified values for ${fieldDef.displayName} to ${fieldValue}`);
                this.currentDataObj[fieldDef.id] = fieldValue;
            }
            logger(this.currentDataObj);
            this.setFieldValueFromDataObject(fieldDef,this.currentDataObj[fieldDef.id]);
            this.validateField(fieldDef);
        });
    }

    protected _visible(): void {
        if (this.factoryElements) this.containerEl?.appendChild(this.factoryElements.form);
    }

    protected setFieldValueToDataObject(dataObj: any, field: Field, currentValue:string|null): void {
        // find the attribute id from the map
        const mapItem:AttributeFieldMapItem|undefined = this.map.find((mapItem) => mapItem.attributeId === field.getId());
        if (mapItem) {
            dlogger(`Mapped field ${mapItem.fieldId} to attribute ${mapItem.attributeId} with value ${currentValue}`);
            this.currentDataObj[mapItem.attributeId] = currentValue;
        }
        else {
            logger(`Mapped field ${field.getId()} to attribute NOT FOUND`);

        }
    }

    protected setFieldValueFromDataObject(fieldDef:FieldDefinition, currentValue:string|null): void {
        // find the field id from the map
        const mapItem:AttributeFieldMapItem|undefined = this.map.find((mapItem) => mapItem.attributeId === fieldDef.id);
        if (mapItem) {
            dlogger(`Mapped attribute ${mapItem.attributeId} to field ${mapItem.fieldId} with value ${currentValue}`);
            // find the field with that id
            const field:Field|undefined = this.fields.find((field) => field.getId() === mapItem.attributeId);
            if (field) {
                if (currentValue) {
                    field.setValue(currentValue);
                }
                else {
                    field.clearValue();
                }
            }
            else {
                logger(`Mapped attribute ${mapItem.attributeId} to field ${mapItem.fieldId} with value ${currentValue} - MISSING field object`);
            }
        }
        else {
            logger(`Mapped attribute ${fieldDef.displayName} to field NOT FOUND`);
        }

    }
}