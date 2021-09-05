import {FieldDefinition, FieldGroup, FieldUIConfig, FormUIDefinition} from "../form/FormTypes";

export class BootstrapFormConfigHelper {

    private static _instance: BootstrapFormConfigHelper;

    public static getInstance(): BootstrapFormConfigHelper {
        if (!(BootstrapFormConfigHelper._instance)) {
            BootstrapFormConfigHelper._instance = new BootstrapFormConfigHelper();
        }
        return BootstrapFormConfigHelper._instance;
    }

    private constructor() {}

    public generateFormConfig(formId:string, displayName:string, fieldDefs:FieldDefinition[]) {
        // create the Field UI config for each field
        let fieldUIConfigs:FieldUIConfig[] = [];
        fieldDefs.forEach((fieldDef) => {
            // construct the field ui config


        });
        // create a form with a single group and button container with Bootstrap styles
        const fieldGroup:FieldGroup = {
            containedBy: {
                elementType:'div',
                elementClasses: 'col-sm-12',
            },
            fields:fieldUIConfigs
        }

        const formConfig:FormUIDefinition = {
            id: formId,
            displayName: displayName,
            fieldGroups: [fieldGroup],
            buttonsContainedBy: {
                elementType:'div',
                elementClasses: 'd-flex w-100 justify-space-between',
            },
            deleteButton: {
                buttonText: 'Delete  ',
                buttonClasses: 'btn-warning rounded p-1 mr-2 mt-2 w-100',
                iconClasses: 'fas fa-trash-alt'
            },
            cancelButton: {
                buttonText: 'Cancel  ',
                buttonClasses: 'btn-info rounded p-1 mr-2 mt-2 w-100',
                iconClasses: 'fas fa-ban'
            },
            submitButton: {
                buttonText: 'Save  ',
                buttonClasses: 'btn-warning rounded p-1 mt-2 w-100',
                iconClasses: 'fas fa-save'
            }
        }
        return formConfig;
    }
}