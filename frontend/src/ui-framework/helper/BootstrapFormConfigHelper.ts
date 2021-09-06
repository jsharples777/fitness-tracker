import {FieldDefinition, FieldGroup, FieldType, FieldUIConfig, FormUIDefinition, UIFieldType} from "../form/FormTypes";
import {BasicFieldOperations} from "./BasicFieldOperations";

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
        let fieldOperations:BasicFieldOperations = new BasicFieldOperations();

        // create the Field UI config for each field
        let fieldUIConfigs:FieldUIConfig[] = [];
        fieldDefs.forEach((fieldDef) => {
            let fieldType:UIFieldType = UIFieldType.text;
            switch (fieldDef.type) {
                case (FieldType.time):
                case (FieldType.text):
                case (FieldType.datetime):
                case (FieldType.date): {
                    break;
                }
                case (FieldType.uuid):
                case (FieldType.id): {
                    fieldType = UIFieldType.hidden;
                    break;
                }
                case (FieldType.integer):
                case (FieldType.float): {
                    fieldType = UIFieldType.number;
                    break;
                }
                case (FieldType.email): {
                    fieldType = UIFieldType.email;
                    break;
                }
                case (FieldType.password): {
                    fieldType = UIFieldType.password;
                    break;
                }
                case (FieldType.boolean): {
                    fieldType = UIFieldType.checkbox;
                    break;
                }
            }

            // construct the field ui config
            let fieldUIConfig:FieldUIConfig = {
                field:fieldDef,
                elementType:fieldType,
                elementClasses:'form-control',
                label: {
                    label: fieldDef.displayName,
                },
                containedBy: {
                    elementType: 'div',
                    elementClasses: 'form-group'
                },
                validator: {
                    validator: fieldOperations,
                    messageDisplay: {
                        elementType: 'div',
                        elementClasses: 'invalid-feedback'
                    },
                    validClasses:'is-valid',
                    invalidClasses:'is-invalid',
                },
                renderer: fieldOperations,
                formatter: fieldOperations,
            }

            if (fieldDef.description) {
                fieldUIConfig.describedBy = {
                    message: fieldDef.description,
                    elementType:'small',
                    elementClasses: 'text-muted'
                }
            }

            fieldUIConfigs.push(fieldUIConfig);
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