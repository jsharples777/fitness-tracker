import browserUtil from "../../../util/BrowserUtil";
import {FieldInputElementFactory} from "./FieldInputElementFactory";
import {BasicButtonElement} from "../../ConfigurationTypes";
import {Form} from "../Form";
import {FieldGroup, FieldUIConfig, FormUIDefinition, UIFieldType} from "../FormUITypeDefs";
import {FormEvent, FormEventType, FormListener} from "../FormListener";
import {FieldListener} from "../field/FieldListener";

export type FormFactoryResponse = {
    form: HTMLFormElement,
    unsavedMessage: HTMLElement,
    fields: HTMLInputElement[],
    textFields: HTMLTextAreaElement[],
    selectFields: HTMLSelectElement[],
    radioButtonGroups: {
        container: HTMLElement,
        radioButtons: HTMLInputElement[]
    }[],
    deleteButton?: HTMLButtonElement,
    cancelButton?: HTMLButtonElement,
    submitButton?: HTMLButtonElement,
}

export class FormElementFactory {

    private static _instance: FormElementFactory;

    private constructor() {
    }

    public static getInstance(): FormElementFactory {
        if (!(FormElementFactory._instance)) {
            FormElementFactory._instance = new FormElementFactory();
        }
        return FormElementFactory._instance;
    }

    public createFormElements(form: Form, formListeners: FormListener[], formConfig: FormUIDefinition, fieldListeners: FieldListener[]): FormFactoryResponse {
        let formEl: HTMLFormElement = document.createElement('form');
        formEl.setAttribute('id', formConfig.id);
        formEl.setAttribute('name', formConfig.displayName);

        if (formConfig.classes) browserUtil.addRemoveClasses(formEl, formConfig.classes);
        // create each of the fields and collect them
        let formInputElements: HTMLInputElement[] = [];
        let formTAElements: HTMLTextAreaElement[] = [];
        let formRBGElements: {
            container: HTMLElement,
            radioButtons: HTMLInputElement[]
        }[] = [];
        let formSelectElements: HTMLSelectElement[] = [];

        let unsavedMessage: HTMLElement = document.createElement(formConfig.unsavedChanges.type);
        browserUtil.addRemoveClasses(unsavedMessage, formConfig.unsavedChanges.classes);
        if (formConfig.unsavedChanges.attributes) browserUtil.addAttributes(unsavedMessage, formConfig.unsavedChanges.attributes);

        formEl.appendChild(unsavedMessage);

        formConfig.fieldGroups.forEach((group: FieldGroup) => {
            // if the group has a container make that, otherwise the form is the container
            let containerEl = formEl;
            if (group.containedBy) {
                // @ts-ignore
                containerEl = document.createElement(group.containedBy.type);
                if (containerEl) {
                    if (group.containedBy.attributes) browserUtil.addAttributes(containerEl, group.containedBy.attributes);
                    if (group.containedBy.classes) browserUtil.addRemoveClasses(containerEl, group.containedBy.classes);
                    formEl.appendChild(containerEl);
                }
            }
            group.fields.forEach((field: FieldUIConfig) => {
                switch (field.elementType) {
                    case (UIFieldType.textarea): {
                        const fieldEl = FieldInputElementFactory.getInstance().createTAFormFieldComponentElement(formConfig.id, containerEl, field, fieldListeners);
                        formTAElements.push(fieldEl);
                        break;
                    }
                    case (UIFieldType.select): {
                        const fieldEl = FieldInputElementFactory.getInstance().createSelectFormFieldComponentElement(formConfig.id, containerEl, field, fieldListeners);
                        formSelectElements.push(fieldEl);
                        break;
                    }
                    case (UIFieldType.radioGroup): {
                        const fieldEl = FieldInputElementFactory.getInstance().createRadioGroupFormFieldComponentElement(formConfig.id, containerEl, field, fieldListeners);
                        formRBGElements.push(fieldEl);
                        break;
                    }
                    default: {
                        const fieldEl = FieldInputElementFactory.getInstance().createInputFormFieldComponentElement(formConfig.id, containerEl, field, fieldListeners);
                        formInputElements.push(fieldEl);
                    }
                }
            });
        });

        /* setup the buttons */
        let buttonContainer: HTMLElement = formEl;

        if (formConfig.buttonsContainedBy) {
            buttonContainer = document.createElement(formConfig.buttonsContainedBy.type);
            if (buttonContainer) {
                if (formConfig.buttonsContainedBy.attributes) browserUtil.addAttributes(buttonContainer, formConfig.buttonsContainedBy.attributes);
                browserUtil.addRemoveClasses(buttonContainer, formConfig.buttonsContainedBy.classes);
                formEl.appendChild(buttonContainer);
            } else {
                buttonContainer = formEl; // couldn't create the button container, use the form
            }
        }

        let deleteButtonEl: HTMLButtonElement | undefined = undefined;
        if (formConfig.deleteButton) {
            deleteButtonEl = this.createFormButton(form, formConfig, formListeners, formConfig.deleteButton, FormEventType.DELETING);
            buttonContainer.appendChild(deleteButtonEl);
        }

        let cancelButtonEl: HTMLButtonElement | undefined = undefined;
        if (formConfig.cancelButton) {
            cancelButtonEl = this.createFormButton(form, formConfig, formListeners, formConfig.cancelButton, FormEventType.CANCELLING);
            buttonContainer.appendChild(cancelButtonEl);
        }

        let submitButtonEl: HTMLButtonElement | undefined = undefined;
        if (formConfig.submitButton) {
            submitButtonEl = this.createFormButton(form, formConfig, formListeners, formConfig.submitButton, FormEventType.SAVING);
            buttonContainer.appendChild(submitButtonEl);
        }

        let result: FormFactoryResponse = {
            form: formEl,
            unsavedMessage: unsavedMessage,
            fields: formInputElements,
            selectFields: formSelectElements,
            radioButtonGroups: formRBGElements,
            textFields: formTAElements,
            deleteButton: deleteButtonEl,
            cancelButton: cancelButtonEl,
            submitButton: submitButtonEl
        }

        return result;
    }

    private createFormButton(form: Form, formConfig: FormUIDefinition, formListeners: FormListener[], buttonDef: BasicButtonElement, eventType: FormEventType): HTMLButtonElement {
        let buttonEl: HTMLButtonElement = document.createElement('button');
        browserUtil.addRemoveClasses(buttonEl, buttonDef.classes);
        buttonEl.setAttribute('id', `${formConfig.id}.${eventType}`);
        if (buttonDef.text) {
            buttonEl.innerText = buttonDef.text;
        }
        if (buttonDef.iconClasses) {
            let iconEl = document.createElement('i');
            if (iconEl) {
                browserUtil.addRemoveClasses(iconEl, buttonDef.iconClasses);
                buttonEl.appendChild(iconEl);
            }
        }
        /* setup the event handler for the button */
        buttonEl.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            let formEvent: FormEvent = {
                target: form,
                formId: formConfig.id,
                eventType: eventType
            }
            formListeners.forEach((listener) => listener.formChanged(formEvent));
        });
        return buttonEl;
    }
}