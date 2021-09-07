
import browserUtil from "../../util/BrowserUtil";
import {FieldInputElementFactory} from "./FieldInputElementFactory";
import {BasicButtonElement} from "../ConfigurationTypes";
import {Form} from "./Form";
import {FieldGroup, FieldUIConfig, FormUIDefinition} from "./FormUITypes";
import {FormEvent, FormEventType, FormListener} from "./FormListener";
import {FieldListener} from "./FieldListener";

export type FormFactoryResponse = {
    form: HTMLFormElement,
    fields: HTMLInputElement[],
    deleteButton: HTMLButtonElement|null,
    cancelButton: HTMLButtonElement,
    submitButton: HTMLButtonElement,
}

export class FormElementFactory {

    private static _instance: FormElementFactory;

    public static getInstance(): FormElementFactory {
        if (!(FormElementFactory._instance)) {
            FormElementFactory._instance = new FormElementFactory();
        }
        return FormElementFactory._instance;
    }

    private constructor() {}

    private createFormButton(form:Form,formConfig:FormUIDefinition,formListeners:FormListener[],buttonDef:BasicButtonElement,eventType:FormEventType):HTMLButtonElement {
        let buttonEl:HTMLButtonElement = document.createElement('button');
        browserUtil.addRemoveClasses(buttonEl,buttonDef.buttonClasses);
        buttonEl.setAttribute('id',`${formConfig.id}.${eventType}`);
        if (buttonDef.buttonText) {
            buttonEl.innerText = buttonDef.buttonText;
        }
        if (buttonDef.iconClasses) {
            let iconEl = document.createElement('i');
            if (iconEl) {
                browserUtil.addRemoveClasses(iconEl,buttonDef.iconClasses);
                buttonEl.appendChild(iconEl);
            }
        }
        /* setup the event handler for the button */
        buttonEl.addEventListener('click',(event) => {
            event.preventDefault();
            event.stopPropagation();
            let formEvent:FormEvent = {
                target:form,
                formId:formConfig.id,
                eventType:eventType
            }
            formListeners.forEach((listener) => listener.formChanged(formEvent));
        });
        return buttonEl;
    }

    public createFormElements(form:Form, formListeners:FormListener[],formConfig:FormUIDefinition,fieldListeners:FieldListener[]):FormFactoryResponse {
        let formEl:HTMLFormElement = document.createElement('form');
        formEl.setAttribute('id',formConfig.id);
        formEl.setAttribute('name',formConfig.displayName);

        if (formConfig.classes) browserUtil.addRemoveClasses(formEl,formConfig.classes);
        // create each of the fields and collect them
        let formInputElements:HTMLInputElement[] = [];

        formConfig.fieldGroups.forEach((group:FieldGroup) => {
            // if the group has a container make that, otherwise the form is the container
            let containerEl = formEl;
            if (group.containedBy) {
                // @ts-ignore
                containerEl = document.createElement(group.containedBy.elementType);
                if (containerEl) {
                    if (group.containedBy.elementAttributes) browserUtil.addAttributes(containerEl,group.containedBy.elementAttributes);
                    if (group.containedBy.elementClasses) browserUtil.addRemoveClasses(containerEl,group.containedBy.elementClasses);
                    formEl.appendChild(containerEl);
                }
            }
            group.fields.forEach((field:FieldUIConfig) => {
                const fieldEl = FieldInputElementFactory.getInstance().createFormFieldComponentElement(containerEl,field,fieldListeners);
                formInputElements.push(fieldEl);
            });
        });

        /* setup the buttons */
        let buttonContainer:HTMLElement = formEl;

        if (formConfig.buttonsContainedBy) {
            buttonContainer = document.createElement(formConfig.buttonsContainedBy.elementType);
            if (buttonContainer) {
                if (formConfig.buttonsContainedBy.elementAttributes) browserUtil.addAttributes(buttonContainer,formConfig.buttonsContainedBy.elementAttributes);
                browserUtil.addRemoveClasses(buttonContainer,formConfig.buttonsContainedBy.elementClasses);
                formEl.appendChild(buttonContainer);
            }
            else {
                buttonContainer = formEl; // couldn't create the button container, use the form
            }
        }

        let deleteButtonEl:HTMLButtonElement|null = null;
        if (formConfig.deleteButton) {
            deleteButtonEl = this.createFormButton(form,formConfig,formListeners,formConfig.deleteButton,FormEventType.DELETING);
            buttonContainer.appendChild(deleteButtonEl);
        }

        let cancelButtonEl:HTMLButtonElement = this.createFormButton(form,formConfig,formListeners,formConfig.cancelButton,FormEventType.CANCELLING);
        buttonContainer.appendChild(cancelButtonEl);

        let submitButtonEl:HTMLButtonElement = this.createFormButton(form,formConfig,formListeners,formConfig.submitButton,FormEventType.SAVING);
        buttonContainer.appendChild(cancelButtonEl);

        let result:FormFactoryResponse = {
            form: formEl,
            fields: formInputElements,
            deleteButton:deleteButtonEl,
            cancelButton:cancelButtonEl,
            submitButton:submitButtonEl
        }

        return result;
    }
}