import {FieldDefinition, FieldType, ValidationResponse} from "../DataObjectTypes";
import {FieldUIConfig, UIFieldType} from "../FormUITypes";
import browserUtil from "../../../util/BrowserUtil";
import {FieldListener} from "../FieldListener";

export class RenderingEventListener {
    private fieldConfig:FieldUIConfig;
    private listeners:FieldListener[];

    constructor(fieldConfig:FieldUIConfig,listeners:FieldListener[]) {
        this.fieldConfig = fieldConfig;
        this.listeners = listeners;
        this.handleEvent = this.handleEvent.bind(this);
    }

    processRendering(fieldElement:HTMLInputElement) {
        if (this.fieldConfig.renderer) {
            const field: FieldDefinition = this.fieldConfig.field;
            const value: string = fieldElement.value;
            const newValue: string | null = this.fieldConfig.renderer.renderValue(field, value);
            if (newValue) {
                fieldElement.value = newValue;
                this.listeners.forEach((listener) => listener.valueChanged(field, newValue));
            }
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