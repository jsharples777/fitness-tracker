import {AttributeFieldMapItem, DATA_ID_ATTRIBUTE, FieldUIConfig} from "./FormUITypes";
import {AbstractForm} from "./AbstractForm";
import {BootstrapFormConfigHelper} from "../helper/BootstrapFormConfigHelper";
import {DataObjectDefinition, FieldDefinition} from "./DataObjectTypes";
import {Field} from "./Field";
import {FormElementFactory, FormFactoryResponse} from "./FormElementFactory";
import {InputField} from "./InputField";

export class BasicFormImplementation extends AbstractForm {

    protected factoryElements:FormFactoryResponse|null = null;


    public constructor(containerId: string, dataObjDef: DataObjectDefinition) {
        super(containerId,dataObjDef);
    }

    protected _hidden(): void {
        if (this.factoryElements) this.containerEl?.removeChild(this.factoryElements.form);
    }

    public initialise(): void {
        // ok, so given a Data Object definition we are going to create the form ui config
        this.uiDef = BootstrapFormConfigHelper.getInstance().generateFormConfig(this.dataObjDef);
        // now we need to create all the form elements from the ui definition
        this.factoryElements = FormElementFactory.getInstance().createFormElements(this,this.formListeners,this.uiDef,this.fieldListeners);
        // create field elements for each field element, and the basic map
        this.factoryElements.fields.forEach((fieldEl) => {
            // get the data-id field from the field element
            const dataId:string|null = fieldEl.getAttribute(DATA_ID_ATTRIBUTE);
            const fieldId:string|null = fieldEl.getAttribute('id');
            if (dataId && fieldId) {
                // find the corresponding field definition
                const fieldDef:FieldDefinition|undefined = this.dataObjDef.fields.find((value) => value.id === dataId);
                if (fieldDef) {
                    // find the corresponding ui definition
                    const fieldUIConfig:FieldUIConfig|null|undefined = this.findFieldUiConfig(fieldDef);
                    if (fieldUIConfig) {
                        let field:Field = new InputField(fieldUIConfig, fieldDef, fieldEl);
                        this.fields.push(field);
                        this.map.push({attributeId: dataId, fieldId: fieldId});
                    }
                }
            }
        });
    }

    protected _reset(): void {}

    protected _startCreate(): void {
        // we have a new object, there might be some values to generate
        this.dataObjDef.fields.forEach((fieldDef) => {
            if (fieldDef.generator && fieldDef.generator.onCreation) {
                let fieldValue = fieldDef.generator.generator.generate(fieldDef,true);
                this.currentDataObj[fieldDef.id] = fieldValue;
            }
            this.setFieldValueFromDataObject(fieldDef,this.currentDataObj[fieldDef.id]);
        });
    }

    protected _startUpdate(objectToEdit: any): void {
        // we have an existing object, there might be some values to generate
        this.dataObjDef.fields.forEach((fieldDef) => {
            if (fieldDef.generator && fieldDef.generator.onModify) {
                let fieldValue = fieldDef.generator.generator.generate(fieldDef,false);
                this.currentDataObj[fieldDef.id] = fieldValue;
            }
            this.setFieldValueFromDataObject(fieldDef,this.currentDataObj[fieldDef.id]);
        });
    }

    protected _visible(): void {
        if (this.factoryElements) this.containerEl?.appendChild(this.factoryElements.form);
    }

    protected setFieldValueToDataObject(dataObj: any, field: Field, currentValue:string|null): void {
        // find the attribute id from the map
        const mapItem:AttributeFieldMapItem|undefined = this.map.find((mapItem) => mapItem.fieldId === field.getId());
        if (mapItem) {
            this.currentDataObj[mapItem.attributeId] = currentValue;
        }
    }

    protected setFieldValueFromDataObject(fieldDef:FieldDefinition, currentValue:string|null): void {
        // find the field id from the map
        const mapItem:AttributeFieldMapItem|undefined = this.map.find((mapItem) => mapItem.attributeId === fieldDef.id);
        if (mapItem) {
            // find the field with that id
            const field:Field|undefined = this.fields.find((field) => field.getId() === mapItem.fieldId);
            if (field) {
                if (currentValue) {
                    field.setValue(currentValue);
                }
                else {
                    field.clearValue();
                }
            }
        }
    }
}