import {FieldDefinition, FieldType, ValidationResponse} from "../DataObjectTypes";
import {FieldUIConfig, UIFieldType} from "../FormUITypes";
import browserUtil from "../../../util/BrowserUtil";
import {FieldListener} from "../FieldListener";

export class RenderingEventListener {
    private formId:string;
    private fieldConfig:FieldUIConfig;
    private listeners:FieldListener[];

    constructor(formId:string, fieldConfig:FieldUIConfig,listeners:FieldListener[]) {
        this.formId = formId;
        this.fieldConfig = fieldConfig;
        this.listeners = listeners;
        this.handleEvent = this.handleEvent.bind(this);
    }

    processRendering(fieldElement:HTMLInputElement):string{
        let newValue:string|null = '';
        if (this.fieldConfig.renderer) {
            const field: FieldDefinition = this.fieldConfig.field;
            const value: string = fieldElement.value;
            newValue = this.fieldConfig.renderer.renderValue(field, value);
            if (newValue) {
                fieldElement.value = newValue;
                // @ts-ignore
                this.listeners.forEach((listener) => listener.valueChanged(field, newValue));
            }
        }
        if (newValue) {
            return newValue;
        }
        else {
            return '';
        }
    }

    handleEvent(event:Event) {
        event.preventDefault();
        event.stopPropagation();
        // @ts-ignore
        const fieldElement: HTMLInputElement = event.target;

        this.processRendering(fieldElement);

    }
}