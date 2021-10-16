import {FieldDefinition} from "../../../model/DataObjectTypeDefs";
import {FieldUIConfig} from "../FormUITypeDefs";
import {FieldListener} from "../field/FieldListener";
import {Field} from "../field/Field";
import {Form} from "../Form";

export class RenderingEventListener {
    private form:Form;
    private formId: string;
    private fieldConfig: FieldUIConfig;
    private listeners: FieldListener[];
    private subElements: HTMLInputElement[] | null;
    private field: Field;

    constructor(form: Form, field: Field, fieldConfig: FieldUIConfig, listeners: FieldListener[], subElements: HTMLInputElement[] | null = null) {
        this.form = form;
        this.formId = form.getId();
        this.field = field;
        this.fieldConfig = fieldConfig;
        this.listeners = listeners;
        this.subElements = subElements;
        this.handleEvent = this.handleEvent.bind(this);
    }

    processRendering(fieldElement: HTMLInputElement): string {
        let newValue: string | null = '';
        if (this.fieldConfig.renderer) {
            const fieldDef: FieldDefinition = this.fieldConfig.field;
            const value: string = fieldElement.value;
            if (this.subElements) this.fieldConfig.renderer.setSubElements(this.subElements);
            newValue = this.fieldConfig.renderer.renderValue(this.field,fieldDef, value);
            if (newValue) {
                fieldElement.value = newValue;
                this.listeners.forEach((listener) => listener.valueChanged(this.form, this.field, fieldDef, newValue));
            }
        }
        if (newValue) {
            return newValue;
        } else {
            return '';
        }
    }

    handleEvent(event: Event) {
        event.preventDefault();
        event.stopPropagation();
        // @ts-ignore
        const fieldElement: HTMLInputElement = event.target;

        this.processRendering(fieldElement);
    }
}