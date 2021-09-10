import {FieldDefinition, FieldType} from "../DataObjectTypeDefs";
import {FieldUIConfig, UIFieldType, ValidationResponse} from "../FormUITypeDefs";
import browserUtil from "../../../util/BrowserUtil";
import {FieldListener} from "../FieldListener";

export class ValidationEventHandler {
    private formId:string;
    private fieldConfig:FieldUIConfig;
    private listeners:FieldListener[];
    private subElements:HTMLInputElement[]|null;

    constructor(formId:string,fieldConfig:FieldUIConfig,listeners:FieldListener[],subElements:HTMLInputElement[]|null = null) {
        this.formId = formId;
        this.fieldConfig = fieldConfig;
        this.listeners = listeners;
        this.subElements = subElements;
        this.handleEvent = this.handleEvent.bind(this);
    }

    processValidation(fieldElement:HTMLElement) {
        if (this.fieldConfig.validator && fieldElement) {
            let validationElementTarget = fieldElement; // we are providing user feedback on the field element, unless...
            if (this.subElements) { // sub elements change the validation target
                this.fieldConfig.validator.validator.setSubElements(this.subElements);
                if (this.fieldConfig.subElement) { // should be targetting the parentelement
                    let parentEl = fieldElement.parentElement;
                    if (parentEl) {
                        validationElementTarget = parentEl;
                        if (this.fieldConfig.subElement.container) { // another layer up required
                            parentEl = parentEl.parentElement;
                            if (parentEl) {
                                validationElementTarget = parentEl;
                            }
                        }
                    }
                }
            }
            const field: FieldDefinition = this.fieldConfig.field;
            // @ts-ignore
            let value: string = fieldElement.value;
            // checkboxes store values differently
            if (this.fieldConfig.elementType === UIFieldType.checkbox) { // @ts-ignore
                value = '' + fieldElement.checked;
            }

            const validationResp: ValidationResponse = this.fieldConfig.validator.validator.isValidValue(field, value);

            const errorMessageDiv = document.getElementById(`${this.formId}.field.${this.fieldConfig.field.id}.error`);
            const errorMessageEl = document.getElementById(`${this.formId}.field.${this.fieldConfig.field.id}.error.message`);

            // clear any previous message
            errorMessageDiv?.setAttribute('style', 'display:none');
            if (errorMessageEl) errorMessageEl.innerHTML = '';

            if (this.fieldConfig.validator.invalidClasses) browserUtil.addRemoveClasses(validationElementTarget, this.fieldConfig.validator.invalidClasses, false);
            if (this.fieldConfig.validator.validClasses) browserUtil.addRemoveClasses(validationElementTarget, this.fieldConfig.validator.validClasses);

            if (!validationResp.isValid) {
                if (this.fieldConfig.validator.invalidClasses) browserUtil.addRemoveClasses(validationElementTarget, this.fieldConfig.validator.invalidClasses);
                if (this.fieldConfig.validator.validClasses) browserUtil.addRemoveClasses(validationElementTarget, this.fieldConfig.validator.validClasses, false);

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
                            // @ts-ignore
                            fieldElement.checked = false;
                            break;
                        }
                        case (FieldType.integer): {
                            // @ts-ignore
                            fieldElement.value = '0';
                            break;
                        }
                        case (FieldType.float): {
                            // @ts-ignore
                            fieldElement.value = '0.0';
                            break;
                        }
                        default: {
                            // @ts-ignore
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