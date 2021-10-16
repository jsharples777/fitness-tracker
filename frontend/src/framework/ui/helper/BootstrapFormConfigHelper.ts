import {BasicFieldOperations} from "../../model/BasicFieldOperations";
import {DataObjectDefinition, FieldType} from "../../model/DataObjectTypeDefs";
import {
    defaultGetValue,
    DisplayOrder,
    FieldGroup,
    FieldUIConfig,
    FormUIDefinition,
    UIFieldType
} from "../form/FormUITypeDefs";

import debug from 'debug';
import {RBGFieldOperations} from "./RBGFieldOperations";
import {FIELD_CreatedOn, FIELD_ModifiedOn} from "../../model/BasicObjectDefinitionFactory";
import {FormConfigHelper} from "../form/FormConfigHelper";
import {ColourEditor} from "./ColourEditor";

const logger = debug('bootstrap-form-config-helper');


export class BootstrapFormConfigHelper implements FormConfigHelper {

    public static COLOUR_PICKER_CONTAINER:string = 'framework-colour-picker-container';

    private static _instance: BootstrapFormConfigHelper;

    private constructor() {
    }

    public static getInstance(): BootstrapFormConfigHelper {
        if (!(BootstrapFormConfigHelper._instance)) {
            BootstrapFormConfigHelper._instance = new BootstrapFormConfigHelper();
        }
        return BootstrapFormConfigHelper._instance;
    }

    generateFormConfig(dataObjDef: DataObjectDefinition, displayOrders: DisplayOrder[], hasDeleteButton: boolean, hideModifierFields: boolean = false, hasExternalControl: boolean = false): FormUIDefinition {
        let fieldOperations: BasicFieldOperations = new BasicFieldOperations();
        let rbgFieldOperation: RBGFieldOperations = new RBGFieldOperations();

        // create the Field UI config for each field
        let fieldUIConfigs: FieldUIConfig[] = [];
        dataObjDef.fields.forEach((fieldDef, index) => {

            let fieldType: UIFieldType = UIFieldType.text;
            switch (fieldDef.type) {
                case (FieldType.time):
                case (FieldType.text):
                case (FieldType.date):
                case (FieldType.shortTime):
                case (FieldType.colour):
                case (FieldType.duration): {
                    break;
                }
                case (FieldType.datetime): {
                    // is this the created or modified date
                    if (hideModifierFields) {
                        if (fieldDef.id === FIELD_CreatedOn) {
                            fieldType = UIFieldType.hidden;
                        }
                        if (fieldDef.id === FIELD_ModifiedOn) {
                            fieldType = UIFieldType.hidden;
                        }
                    }
                    break;
                }
                case (FieldType.userId): {
                    if (hideModifierFields) {
                        fieldType = UIFieldType.hidden;
                    } else {
                        fieldType = UIFieldType.text;
                    }
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
                case (FieldType.largeText): {
                    fieldType = UIFieldType.textarea;
                    break;
                }
                case (FieldType.choice): {
                    fieldType = UIFieldType.select;
                    break;
                }
                case (FieldType.limitedChoice): {
                    fieldType = UIFieldType.radioGroup;
                    break;
                }
            }

            // see if the field was supplied with a display order
            const displayOrder: DisplayOrder | undefined = displayOrders.find((value) => value.fieldId === fieldDef.id);
            let displayOrderValue: number = index;
            if (displayOrder) {
                displayOrderValue = displayOrder.displayOrder;
            }

            // construct the field ui config
            let fieldUIConfig: FieldUIConfig = {
                field: fieldDef,
                displayOrder: displayOrderValue,
                elementType: fieldType,
                elementClasses: 'form-control col-sm-9',
                renderer: fieldOperations,
                formatter: fieldOperations,
                getValue: defaultGetValue
            }

            if ((fieldDef.type !== FieldType.id) && (fieldDef.type !== FieldType.uuid) && (fieldType !== UIFieldType.hidden)) { // no labels, descriptions, container for id,uuid
                fieldUIConfig.containedBy = {
                    type: 'div',
                    classes: 'form-group row'
                };

                fieldUIConfig.label = {
                    label: fieldDef.displayName,
                    classes: 'col-md-12 col-lg-3 col-form-label'
                };
                if (fieldDef.description) { // descriptions if the field has one
                    fieldUIConfig.describedBy = {
                        message: fieldDef.description,
                        elementType: 'small',
                        elementClasses: 'text-muted col-md-12 col-lg-9 offset-lg-3 mt-1'
                    }
                }
                if (!fieldDef.displayOnly) { // no validator for readonly items
                    fieldUIConfig.validator = {
                        validator: fieldOperations,
                        messageDisplay: {
                            type: 'div',
                            classes: 'invalid-feedback col-md-12 col-lg-9 offset-lg-3'
                        },
                        validClasses: 'is-valid',
                        invalidClasses: 'is-invalid',
                    };
                }
            }

            // text areas
            if (fieldDef.type === FieldType.largeText) {
                fieldUIConfig.textarea = {
                    rows: 5,
                    cols: 20
                }
            }
            // select
            if (fieldDef.type === FieldType.choice) { // subelements are options, with no classes, no labels, and no other container
                fieldUIConfig.subElement = {
                    element: {type: 'option', classes: ''},
                };
                fieldUIConfig.datasource = fieldDef.dataSource;
            }
            // radio button group
            if (fieldDef.type === FieldType.limitedChoice) {
                fieldUIConfig.subElement = {
                    element: {
                        type: 'input',
                        classes: 'form-check-input',
                        attributes: [{name: 'type', value: 'radio'}]
                    },
                    container: {
                        type: 'div',
                        classes: 'form-check form-check-inline'
                    },
                    label: {
                        label: 'label',
                        classes: 'form-check-label',
                    },
                }
                fieldUIConfig.renderer = rbgFieldOperation;
                if (fieldUIConfig.validator) fieldUIConfig.validator.validator = rbgFieldOperation;
                fieldUIConfig.formatter = rbgFieldOperation;

                fieldUIConfig.datasource = fieldDef.dataSource;
            }

            if (fieldDef.type === FieldType.colour) {
                fieldUIConfig.editor = new ColourEditor(BootstrapFormConfigHelper.COLOUR_PICKER_CONTAINER);
            }


            fieldUIConfigs.push(fieldUIConfig);
        });
        // create a form with a single group and button container with Bootstrap styles
        const fieldGroup: FieldGroup = {
            containedBy: {
                type: 'div',
                classes: 'col-sm-12',
            },
            fields: fieldUIConfigs
        }

        const formConfig: FormUIDefinition = {
            id: dataObjDef.id,
            displayName: dataObjDef.displayName,
            fieldGroups: [fieldGroup],
            unsavedChanges: {
                type: 'div',
                classes: 'invalid-feedback text-right col-md-12 col-lg-9 offset-lg-3',
                attributes: [{name: 'style', value: 'display:block'}],
                innerHTML: `Pending changes to ${dataObjDef.displayName}`,
            }
        }
        if (!hasExternalControl) {
            formConfig.buttonsContainedBy = {
                type: 'div',
                classes: 'd-flex w-100 justify-space-between',
            };
            formConfig.cancelButton = {
                text: 'Cancel  ',
                classes: 'btn-info rounded p-1 mr-2 mt-2 w-100',
                iconClasses: 'fas fa-ban'
            };
            formConfig.submitButton = {
                text: 'Save  ',
                classes: 'btn-primary rounded p-1 mt-2 w-100',
                iconClasses: 'fas fa-save'
            }
            formConfig.activeSave = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>&nbsp;';
        }
        // sort the fields into display order

        formConfig.fieldGroups.forEach((group) => {
            group.fields.sort((a, b) => {
                return (a.displayOrder - b.displayOrder);
            })

        });

        if (hasDeleteButton && !hasExternalControl) {
            formConfig.deleteButton = {
                text: 'Delete  ',
                classes: 'btn-warning rounded p-1 mr-2 mt-2 w-100',
                iconClasses: 'fas fa-trash-alt'
            };

        }


        logger(formConfig);
        return formConfig;
    }

    getElementIdForDataFieldId(fieldId: string): string | undefined {
        return undefined;
    }
}