import {FieldDefinition} from "../DataObjectTypeDefs";
import {FieldUIConfig} from "../FormUITypeDefs";
import {FieldListener} from "../FieldListener";

export class EditingEventListener {
    private formId:string;
    private fieldConfig:FieldUIConfig;
    private listeners:FieldListener[];

    constructor(formId:string,fieldConfig:FieldUIConfig,listeners:FieldListener[]) {
        this.formId = formId;
        this.fieldConfig = fieldConfig;
        this.listeners = listeners;
        this.handleEvent = this.handleEvent.bind(this);
    }

    handleEvent(event:Event) {
        event.preventDefault();
        event.stopPropagation();
        // @ts-ignore
        const fieldElement: HTMLInputElement = event.target;

        if (this.fieldConfig.editor) {
            const field: FieldDefinition = this.fieldConfig.field;
            const value: string = fieldElement.value;
            const newValue: string = this.fieldConfig.editor.editValue(field, value);
            if (newValue) {
                fieldElement.value = newValue;
                this.listeners.forEach((listener) => listener.valueChanged(field, newValue));

            }
        }
    }
}