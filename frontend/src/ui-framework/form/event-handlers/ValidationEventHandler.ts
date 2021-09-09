import {FieldDefinition, FieldType, ValidationResponse} from "../DataObjectTypes";
import {FieldUIConfig, UIFieldType} from "../FormUITypes";
import browserUtil from "../../../util/BrowserUtil";
import {FieldListener} from "../FieldListener";

export class ValidationEventHandler {
    private formId:string;
    private fieldConfig:FieldUIConfig;
    private listeners:FieldListener[];

    constructor(formId:string,fieldConfig:FieldUIConfig,listeners:FieldListener[]) {
        this.formId = formId;
        this.fieldConfig = fieldConfig;
        this.listeners = listeners;
        this.handleEvent = this.handleEvent.bind(this);
    }

    processValidation(fieldElement:HTMLInputElement) {
        if (this.fieldConfig.validator && fieldElement) {
            const field: FieldDefinition = this.fieldConfig.field;
            let value: string = fieldElement.value;
            // checkboxes store values differently
            if (this.fieldConfig.elementType === UIFieldType.checkbox) value = '' + fieldElement.checked;

            const validationResp: ValidationResponse = this.fieldConfig.validator.validator.isValidValue(field, value);

            const errorMessageDiv = document.getElementById(`field.${this.fieldConfig.field.id}.error`);
            const errorMessageEl = document.getElementById(`field.${this.fieldConfig.field.id}.error.message`);

            // clear any previous message
            errorMessageDiv?.setAttribute('style', 'display:none');
            if (errorMessageEl) errorMessageEl.innerHTML = '';

            if (this.fieldConfig.validator.invalidClasses) browserUtil.addRemoveClasses(fieldElement, this.fieldConfig.validator.invalidClasses, false);
            if (this.fieldConfig.validator.validClasses) browserUtil.addRemoveClasses(fieldElement, this.fieldConfig.validator.validClasses);

            if (!validationResp.isValid) {
                if (this.fieldConfig.validator.invalidClasses) browserUtil.addRemoveClasses(fieldElement, this.fieldConfig.validator.invalidClasses);
                if (this.fieldConfig.validator.validClasses) browserUtil.addRemoveClasses(fieldElement, this.fieldConfig.validator.validClasses, false);

                let message = validationResp.message;
                if (!message) {
                    message = `${field.displayName} does not have a valid value.`;
                }
                // show the error message
                errorMessageDiv?.setAttribute('style', 'display:block')
                if (errorMessageEl) errorMessageEl.innerHTML = message;

                if (validationResp.resetOnFailure) {
                    switch (field.type) {
                        case (FieldType.boolean): {
                            fieldElement.checked = false;
                            break;
                        }
                        case (FieldType.integer): {
                            fieldElement.value = '0';
                            break;
                        }
                        case (FieldType.float): {
                            fieldElement.value = '0.0';
                            break;
                        }
                        default: {
                            fieldElement.value = '';
                            break;
                        }
                    }
                }
                // @ts-ignore
                this.listeners.forEach((listener) => listener.failedValidation(field, value, message));
            }
        }

    }

    handleEvent(event:Event) {
        event.preventDefault();
        event.stopPropagation();
        // @ts-ignore
        const fieldElement: HTMLInputElement = event.target;

        this.processValidation(fieldElement);

    }
}