import {Field} from "./Field";
import {FieldUIConfig, FieldValidator, UIFieldType} from "./FormUITypes";
import {FieldDefinition, FieldType, ValidationResponse} from "./DataObjectTypes";
import {ValidationEventHandler} from "./event-handlers/ValidationEventHandler";
import {FieldListener} from "./FieldListener";
import {RenderingEventListener} from "./event-handlers/RenderingEventListener";


export class InputField implements Field,FieldListener {
    protected formId:string;
    protected config:FieldUIConfig|null = null;
    protected definition:FieldDefinition;
    protected element:HTMLInputElement;
    protected validationHandler:ValidationEventHandler;
    protected renderingHandler:RenderingEventListener;

    constructor(formId:string, config:FieldUIConfig,fieldDef:FieldDefinition,element:HTMLInputElement) {
        this.formId = formId;
        this.config = config;
        this.definition = fieldDef;
        this.element = element;
        this.validationHandler = new ValidationEventHandler(formId,config,[this]);
        this.renderingHandler = new RenderingEventListener(formId,config, [this]);
    }

    public initialise(): void {}

    getValue(): string|null {
        let result:string|null = null;
        if (this.config && this.element) {
            result = this.element.value;
            if (this.config.elementType === UIFieldType.checkbox) result = ''+ this.element.checked;
        }
        return result;
    }

    getFormattedValue(): any|null {
        let result:any|null = null;
        if (this.config && this.element) {
            result = this.element.value;
            if (this.config.elementType === UIFieldType.checkbox) result = ''+ this.element.checked;
            if (this.config.formatter) {
                result = this.config.formatter.formatValue(this.definition,result);
            }
        }
        return result;
    }

    isValid(): boolean {
        let result = true;
        if (this.config && this.element) {
            if (this.config.validator) {
                if (this.config.validator.validator) {
                    const validator:FieldValidator = this.config.validator.validator;
                    const response:ValidationResponse = validator.isValidValue(this.definition,this.getValue());
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
            this.element.value = newValue;
            if (this.definition.type === FieldType.boolean) this.element.checked = (newValue.toLowerCase() === 'true');
        }
    }

    reset():void {
        if (this.element) {
            switch (this.definition.type) {
                case (FieldType.boolean): {
                    this.element.checked = false;
                    break;
                }
                case (FieldType.integer): {
                    this.element.value = '0';
                    break;
                }
                case (FieldType.float): {
                    this.element.value = '0.0';
                    break;
                }
                default: {
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

    render(currentValue:string): string {
        let result = currentValue;
        if (this.config?.renderer) {
            let value = this.config.renderer.renderValue(this.definition,currentValue);
            if (value) result = value;
        }
        return result;
    }

    failedValidation(field: FieldDefinition, currentValue: string, message: string): void {}
    valueChanged(field: FieldDefinition, newValue: string): void {}


}
