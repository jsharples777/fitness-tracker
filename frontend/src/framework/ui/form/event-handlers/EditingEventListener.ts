import {FieldDefinition} from "../../../model/DataObjectTypeDefs";
import {FieldUIConfig} from "../FormUITypeDefs";
import {FieldListener} from "../field/FieldListener";
import {Field} from "../field/Field";
import {Form} from "../Form";

export class EditingEventListener {
    private form:Form;
    private formId: string;
    private fieldConfig: FieldUIConfig;
    private listeners: FieldListener[];
    private field:Field;

    constructor(form: Form, field:Field, fieldConfig: FieldUIConfig, listeners: FieldListener[]) {
        this.form = form;
        this.formId = form.getId();
        this.field = field;
        this.fieldConfig = fieldConfig;
        this.listeners = listeners;
        this.handleEditEvent = this.handleEditEvent.bind(this);
        this.handleEditCompletedEvent = this.handleEditCompletedEvent.bind(this);
    }

    handleEditEvent(event: Event) {
        event.preventDefault();
        event.stopPropagation();
        // @ts-ignore
        const fieldElement: HTMLInputElement = event.target;

        if (this.fieldConfig.editor) {
            const fieldDef: FieldDefinition = this.fieldConfig.field;
            const value: string = fieldElement.value;
            const newValue: string = this.fieldConfig.editor.editValue(this.field, fieldDef, value);
            if (newValue && (newValue !== value)) {
                fieldElement.value = newValue;
                this.listeners.forEach((listener) => listener.valueChanged(this.form, this.field, fieldDef, newValue));

            }
        }
    }

    handleEditCompletedEvent(event:Event) {
        event.preventDefault();
        event.stopPropagation();

        if (this.fieldConfig.editor) {
            const fieldDef: FieldDefinition = this.fieldConfig.field;
            this.fieldConfig.editor.editCompleted(this.field, fieldDef);
        }

    }
}