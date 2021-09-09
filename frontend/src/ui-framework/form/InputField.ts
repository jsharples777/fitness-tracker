import {Field} from "./Field";
import {FieldUIConfig, FieldValidator, UIFieldType, ValidationResponse} from "./FormUITypeDefs";
import {FieldDefinition, FieldType} from "./DataObjectTypeDefs";
import {ValidationEventHandler} from "./event-handlers/ValidationEventHandler";
import {FieldListener} from "./FieldListener";
import {RenderingEventListener} from "./event-handlers/RenderingEventListener";


class AbstractField implements Field, FieldListener {
    protected formId: string;
    protected config: FieldUIConfig | null = null;
    protected definition: FieldDefinition;
    protected element: HTMLElement;
    protected validationHandler: ValidationEventHandler;
    protected renderingHandler: RenderingEventListener;

    constructor(formId:string, config:FieldUIConfig,fieldDef:FieldDefinition,element:HTMLElement,subElements:HTMLInputElement[]|null = null) {
        this.formId = formId;
        this.config = config;
        this.definition = fieldDef;
        this.element = element;
        this.validationHandler = new ValidationEventHandler(formId,config,[this],subElements);
        this.renderingHandler = new RenderingEventListener(formId,config, [this],subElements);
    }

    public initialise(): void {
    }

    getValue(): string | null {
        let result: string | null = null;
        if (this.config && this.element) {
            // @ts-ignore
            result = this.element.value;
            if (this.config.elementType === UIFieldType.checkbox) { // @ts-ignore
                result = '' + this.element.checked;
            }
        }
        return result;
    }

    getFormattedValue(): any | null {
        let result: any | null = null;
        if (this.config && this.element) {
            // @ts-ignore
            result = this.element.value;
            if (this.config.elementType === UIFieldType.checkbox) { // @ts-ignore
                result = '' + this.element.checked;
            }
            if (this.config.formatter) {
                result = this.config.formatter.formatValue(this.definition, result);
            }
        }
        return result;
    }

    isValid(): boolean {
        let result = true;
        if (this.config && this.element) {
            if (this.config.validator) {
                if (this.config.validator.validator) {
                    const validator: FieldValidator = this.config.validator.validator;
                    const response: ValidationResponse = validator.isValidValue(this.definition, this.getValue());
                    result = response.isValid;
                }
            }
        }
        return result;
    }

    getId(): string {
        return this.definition.id;
    }

    setValue(newValue: string): void {
        if (this.element) {
            // @ts-ignore
            this.element.value = newValue;
            if (this.definition.type === FieldType.boolean) { // @ts-ignore
                this.element.checked = (newValue.toLowerCase() === 'true');
            }
        }
    }

    reset(): void {
        if (this.element) {
            switch (this.definition.type) {
                case (FieldType.boolean): {
                    // @ts-ignore
                    this.element.checked = false;
                    break;
                }
                case (FieldType.integer): {
                    // @ts-ignore
                    this.element.value = '0';
                    break;
                }
                case (FieldType.float): {
                    // @ts-ignore
                    this.element.value = '0.0';
                    break;
                }
                default: {
                    // @ts-ignore
                    this.element.value = '';
                    break;
                }
            }
        }
    }

    clearValue(): void {
        this.reset();
    }

    validate(): void {
        if (this.element) {
            this.validationHandler.processValidation(this.element);
        }
    }

    render(currentValue: string): string {
        let result = currentValue;
        if (this.config?.renderer) {
            let value = this.config.renderer.renderValue(this.definition, currentValue);
            if (value) result = value;
        }
        return result;
    }

    failedValidation(field: FieldDefinition, currentValue: string, message: string): void {
    }

    valueChanged(field: FieldDefinition, newValue: string): void {
    }
}

export class InputField extends AbstractField {

    constructor(formId:string, config:FieldUIConfig,fieldDef:FieldDefinition,element:HTMLInputElement) {
        super(formId,config, fieldDef,element);
    }
}

export class SelectField extends AbstractField {

    constructor(formId:string, config:FieldUIConfig,fieldDef:FieldDefinition,element:HTMLSelectElement) {
        super(formId,config, fieldDef,element);
    }
}

export class TextAreaField extends AbstractField {

    constructor(formId:string, config:FieldUIConfig,fieldDef:FieldDefinition,element:HTMLTextAreaElement) {
        super(formId,config, fieldDef,element);
    }
}

export class RadioButtonGroupField extends AbstractField {
    constructor(formId:string, config:FieldUIConfig,fieldDef:FieldDefinition,element:HTMLElement,subElements:HTMLInputElement[]) {
        super(formId,config, fieldDef,element,subElements);
    }

}
