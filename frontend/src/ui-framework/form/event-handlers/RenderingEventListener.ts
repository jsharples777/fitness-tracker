import {FieldDefinition} from "../DataObjectTypeDefs";
import {FieldUIConfig} from "../FormUITypeDefs";
import {FieldListener} from "../field/FieldListener";

export class RenderingEventListener {
    private formId:string;
    private fieldConfig:FieldUIConfig;
    private listeners:FieldListener[];
    private subElements:HTMLInputElement[]|null;

    constructor(formId:string, fieldConfig:FieldUIConfig,listeners:FieldListener[],subElements:HTMLInputElement[]|null = null) {
        this.formId = formId;
        this.fieldConfig = fieldConfig;
        this.listeners = listeners;
        this.subElements = subElements;
        this.handleEvent = this.handleEvent.bind(this);
    }

    processRendering(fieldElement:HTMLInputElement):string{
        let newValue:string|null = '';
        if (this.fieldConfig.renderer) {
            const field: FieldDefinition = this.fieldConfig.field;
            const value: string = fieldElement.value;
            if (this.subElements) this.fieldConfig.renderer.setSubElements(this.subElements);
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