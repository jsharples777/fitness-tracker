import {FieldGroup, FieldListener, FieldUIConfig, Form, FormListener, FormMode, FormUIDefinition} from "./FormTypes";
import browserUtil from "../../util/BrowserUtil";
import {FieldInputElementFactory} from "./FieldInputElementFactory";

export type FormFactoryResponse = {
    form: HTMLFormElement,
    fields: HTMLInputElement[],
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

    public createFormElements(form:Form, formListener:FormListener,mode:FormMode,formConfig:FormUIDefinition,listener:FieldListener,idValueToUse?:string, dataObject?:any):FormFactoryResponse {
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
                const fieldEl = FieldInputElementFactory.getInstance().createFormFieldComponentElement(containerEl,field,listener);
                formInputElements.push(fieldEl);
            });
        });

        let result:FormFactoryResponse = {
            form: formEl,
            fields: formInputElements
        }

        return result;
    }
}