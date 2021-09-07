import browserUtil from "../../util/BrowserUtil";
import {DATA_ID_ATTRIBUTE, FieldUIConfig, UIFieldType} from "./FormUITypes";
import {FieldListener} from "./FieldListener";
import {FieldDefinition, FieldType, ValidationResponse} from "./DataObjectTypes";

export class FieldInputElementFactory {

    private static _instance: FieldInputElementFactory;

    public static getInstance(): FieldInputElementFactory {
        if (!(FieldInputElementFactory._instance)) {
            FieldInputElementFactory._instance = new FieldInputElementFactory();
        }
        return FieldInputElementFactory._instance;
    }

    private constructor() {}

    public createFormFieldComponentElement(containerEl:HTMLElement, fieldConfig:FieldUIConfig,listeners:FieldListener[]):HTMLInputElement { // return the input element
        let fieldElement:HTMLInputElement = document.createElement('input');
        fieldElement.setAttribute('id',`field.${fieldConfig.field.id}`);
        fieldElement.setAttribute(DATA_ID_ATTRIBUTE,fieldConfig.field.id);
        fieldElement.setAttribute('name',fieldConfig.field.id);

        switch(fieldConfig.elementType) {
            case UIFieldType.checkbox: {
                fieldElement.setAttribute('type','checkbox');
                fieldElement.setAttribute('value',fieldConfig.field.id);
                break;
            }
            case UIFieldType.email: {
                fieldElement.setAttribute('type','email');
                break;
            }
            case UIFieldType.hidden: {
                fieldElement.setAttribute('type','hidden');
                break;
            }
            case UIFieldType.number: {
                fieldElement.setAttribute('type', 'number');
                break;
            }
            case UIFieldType.password: {
                fieldElement.setAttribute('type','password');
                break;
            }
            case UIFieldType.text: {
                fieldElement.setAttribute('type','text');
                break;
            }
            case UIFieldType.textarea: { // NOT IMPLEMENTED
                // fieldElement = document.createElement('textarea');
                // fieldElement.setAttribute('id',fieldConfig.field.id);
                // fieldElement.setAttribute('name',fieldConfig.field.id);
                // fieldElement.setAttribute('rows', '5');
                // fieldElement.setAttribute('cols', '20');
                break;
            }
            case UIFieldType.select: { // NOT IMPLEMENTED
                // fieldElement = document.createElement('select');
                // fieldElement.setAttribute('id',fieldConfig.field.id);
                // fieldElement.setAttribute('name',fieldConfig.field.id);
                // fieldElement.setAttribute('size','3');
                break;
            }
        }

        if (fieldConfig.elementAttributes) browserUtil.addAttributes(fieldElement,fieldConfig.elementAttributes);
        if (fieldConfig.elementClasses) browserUtil.addRemoveClasses(fieldElement,fieldConfig.elementClasses);

        // readonly field?
        if (fieldConfig.field.displayOnly) {
            browserUtil.addAttributes(fieldElement,[{name:'disabled',value:'true'},{name:'readonly',value:'true'}])
        }

        // if the field has a validator, then we need a div for error messages
        let errorMessageDivEl:HTMLElement|null = null;

        if (fieldConfig.validator) {
            errorMessageDivEl = document.createElement('div');
            errorMessageDivEl.setAttribute('id',`field.${fieldConfig.field.id}.error`);
            errorMessageDivEl.setAttribute('style','display: none'); // default to not visible
            browserUtil.addRemoveClasses(errorMessageDivEl,fieldConfig.validator.messageDisplay.elementClasses);
            let messageEl = document.createElement(fieldConfig.validator.messageDisplay.elementType);
            if (messageEl) {
                messageEl.setAttribute('id',`field.${fieldConfig.field.id}.error.message`);
                if (fieldConfig.validator.messageDisplay.elementAttributes) browserUtil.addAttributes(messageEl,fieldConfig.validator.messageDisplay.elementAttributes);
                errorMessageDivEl.appendChild(messageEl);
            }
        }

        /*
        setup event handlers
        */
        if (fieldConfig.validator) { // is the value in the field valid
            fieldElement.addEventListener('blur',(event) => {
                event.preventDefault();
                event.stopPropagation();
                if (fieldConfig.validator) {
                    const field: FieldDefinition = fieldConfig.field;
                    let value: string = fieldElement.value;
                    // checkboxes store values differently
                    if (fieldConfig.elementType === UIFieldType.checkbox) value = ''+ fieldElement.checked;

                    const validationResp: ValidationResponse = fieldConfig.validator.validator.isValidValue(field, value);

                    const errorMessageDiv = document.getElementById(`field.${fieldConfig.field.id}.error`);
                    const errorMessageEl = document.getElementById(`field.${fieldConfig.field.id}.error.message`);

                    // clear any previous message
                    errorMessageDiv?.setAttribute('style','display:none');
                    if (errorMessageEl) errorMessageEl.innerHTML = '';

                    if (fieldConfig.validator.invalidClasses) browserUtil.addRemoveClasses(fieldElement,fieldConfig.validator.invalidClasses,false);
                    if (fieldConfig.validator.validClasses) browserUtil.addRemoveClasses(fieldElement,fieldConfig.validator.validClasses);

                    if (!validationResp.isValid) {
                        if (fieldConfig.validator.invalidClasses) browserUtil.addRemoveClasses(fieldElement,fieldConfig.validator.invalidClasses);
                        if (fieldConfig.validator.validClasses) browserUtil.addRemoveClasses(fieldElement,fieldConfig.validator.validClasses,false);

                        let message = validationResp.message;
                        if (!message) {
                            message = `${field.displayName} does not have a valid value.`;
                        }
                        // show the error message
                        errorMessageDiv?.setAttribute('style','display:block')
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
                        listeners.forEach((listener) => listener.failedValidation(field, value, message));
                    }
                }
            });
        }

        // if (fieldConfig.renderer) { // render the value when the field changes
        //     fieldElement.addEventListener('change',(event) => {
        //         event.preventDefault();
        //         event.stopPropagation();
        //         if (fieldConfig.renderer) {
        //             const field: FieldDefinition = fieldConfig.field;
        //             const value: string = fieldElement.value;
        //             const newValue: string | null = fieldConfig.renderer.renderValue(field, value);
        //             if (newValue) {
        //                 fieldElement.value = newValue;
        //                 listeners.forEach((listener) => listener.valueChanged(field, newValue));
        //             }
        //         }
        //     });
        // } // care for endless loops here, renderer needs to return null if no changes

        if (fieldConfig.editor) { // render the value when the field gains focus
            fieldElement.addEventListener('focus',(event) => {
                event.preventDefault();
                event.stopPropagation();
                if (fieldConfig.editor) {
                    const field: FieldDefinition = fieldConfig.field;
                    const value: string = fieldElement.value;
                    const newValue: string = fieldConfig.editor.editValue(field, value);
                    if (newValue) {
                        fieldElement.value = newValue;
                        listeners.forEach((listener) => listener.valueChanged(field, newValue));

                    }
                }
            });
        } // care for endless loops here, renderer needs to return null if no changes


        // ok, so is the field contained?
        if (fieldConfig.containedBy) {
            // we need to create a container for the field and option label and description text
            let containedByEl = document.createElement(fieldConfig.containedBy.elementType);
            if (containedByEl) {
                browserUtil.addRemoveClasses(containedByEl,fieldConfig.containedBy.elementClasses);
                containedByEl.setAttribute('id',`field.${fieldConfig.field.id}.container`);

                if (fieldConfig.containedBy.elementAttributes) browserUtil.addAttributes(containerEl,fieldConfig.containedBy.elementAttributes);
                // do we have a label also?
                if (fieldConfig.label) {
                    let labelEl:HTMLLabelElement = document.createElement('label');
                    labelEl.setAttribute('for',fieldConfig.field.id);
                    labelEl.innerHTML = fieldConfig.field.displayName;
                    if (fieldConfig.label.attributes) browserUtil.addAttributes(labelEl,fieldConfig.label.attributes);
                    if (fieldConfig.label.classes) browserUtil.addRemoveClasses(labelEl,fieldConfig.label.classes);
                    containedByEl.appendChild(labelEl);
                }
                if (fieldConfig.describedBy) {
                    let descEl:HTMLElement = document.createElement(fieldConfig.describedBy.elementType);
                    if (descEl) {
                        // link the field and the description
                        descEl.setAttribute('id',`field.${fieldConfig.field.id}.desc`);
                        if (fieldConfig.field.description) descEl.innerHTML = fieldConfig.field.description;
                        fieldElement.setAttribute('aria-describedby',`field.${fieldConfig.field.id}.desc`);
                        if (fieldConfig.describedBy.elementClasses) browserUtil.addRemoveClasses(descEl,fieldConfig.describedBy.elementClasses);
                        containedByEl.appendChild(fieldElement);
                        containedByEl.appendChild(descEl);
                        if (errorMessageDivEl) containedByEl.appendChild(errorMessageDivEl);
                    }
                    else { // description failure, add the field
                        containedByEl.appendChild(fieldElement);
                        if (errorMessageDivEl) containedByEl.appendChild(errorMessageDivEl);
                    }
                }
                else { // no description, add field to container
                    containedByEl.appendChild(fieldElement);
                    if (errorMessageDivEl) containedByEl.appendChild(errorMessageDivEl);
                }
                containerEl.appendChild(containedByEl);
            }
            else { // errors should keep making something!
                containerEl.appendChild(fieldElement);
                if (errorMessageDivEl) containerEl.appendChild(errorMessageDivEl);
            }
        }
        else {
            containerEl.appendChild(fieldElement);
            if (errorMessageDivEl) containerEl.appendChild(errorMessageDivEl);
        }

        return fieldElement;
    }
}