import {Field, FieldDefinition, FieldListener, FieldUIConfig, FieldValidator, ValidationResponse} from "./FormTypes";

export abstract class AbstractInputField implements Field {
    protected listeners:FieldListener[] = [];
    protected config:FieldUIConfig|null = null;
    protected definition:FieldDefinition;
    protected element:HTMLInputElement|null = null;

    constructor(fieldDef:FieldDefinition) {
        this.definition = fieldDef;
    }

    addFieldListener(listener: FieldListener): void {
        this.listeners.push(listener);
    }

    protected abstract _initialise(config:FieldUIConfig):void; // create the field element and attach to this object

    initialise(config: FieldUIConfig): void {
        this.config = config;
        this._initialise(config);
    }

    getValue(): string|null {
        let result:string|null = null;
        if (this.element) {
            result = this.element.value;
        }
        return result;
    }

    isValid(): boolean {
        let result = true;
        if (this.config && this.element) {
            if (this.config.validator) {
                if (this.config.validator.validator) {
                    const validator:FieldValidator = this.config.validator.validator;
                    const response:ValidationResponse = validator.isValidValue(this.definition,this.element.value);
                    result = response.isValid;
                }
            }
        }
        return result;
    }

}
