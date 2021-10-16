import {BasicFieldOperations} from "../../model/BasicFieldOperations";
import {DataObjectDefinition, FieldType} from "../../model/DataObjectTypeDefs";
import {defaultGetValue, DisplayOrder, FieldUIConfig, UIFieldType} from "../form/FormUITypeDefs";

import debug from 'debug';
import {FIELD_CreatedOn, FIELD_ModifiedOn} from "../../model/BasicObjectDefinitionFactory";
import {TableHeaderConfig, TableUIConfig} from "../view/renderer/TableUITypeDefs";
import {LimitedChoiceTextRenderer} from "./LimitedChoiceTextRenderer";


const logger = debug('bootstrap-tabular-config-helper');

export class BootstrapTableConfigHelper {

    private static _instance: BootstrapTableConfigHelper;

    private constructor() {
    }

    public static getInstance(): BootstrapTableConfigHelper {
        if (!(BootstrapTableConfigHelper._instance)) {
            BootstrapTableConfigHelper._instance = new BootstrapTableConfigHelper();
        }
        return BootstrapTableConfigHelper._instance;
    }

    public generateTableRowConfig(dataObjDef: DataObjectDefinition, displayOrders: DisplayOrder[], itemDetailColumn: number, hasActions: boolean, hideModifierFields: boolean = false): TableUIConfig {
        let fieldOperations: BasicFieldOperations = new BasicFieldOperations();
        let choiceRenderer: LimitedChoiceTextRenderer = new LimitedChoiceTextRenderer();

        // create the Field UI config for each field
        let fieldUIConfigs: FieldUIConfig[] = [];
        let columnHeaderConfigs: TableHeaderConfig[] = [];

        dataObjDef.fields.forEach((fieldDef, index) => {

            let fieldType: UIFieldType = UIFieldType.text;
            switch (fieldDef.type) {
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
            }

            // see if the field was supplied with a display order, no order, no display for a table
            const displayOrder: DisplayOrder | undefined = displayOrders.find((value) => value.fieldId === fieldDef.id);
            let displayOrderValue: number = index;
            if (displayOrder) {
                displayOrderValue = displayOrder.displayOrder;

                if ((fieldDef.type !== FieldType.id) && (fieldDef.type !== FieldType.uuid) && (fieldType !== UIFieldType.hidden)) { // no labels, descriptions, container for id,uuid
                    let headerConfig: TableHeaderConfig = {
                        field: fieldDef,
                        element: {
                            type: 'th',
                            attributes: [{name: 'scope', value: 'col'}],
                            classes: '',
                            innerHTML: fieldDef.displayName
                        }
                    }


                    // construct the field ui config
                    let fieldUIConfig: FieldUIConfig = {
                        field: fieldDef,
                        displayOrder: displayOrderValue,
                        elementType: UIFieldType.tableData,
                        elementClasses: 'text-center',
                        renderer: fieldOperations,
                        getValue: defaultGetValue
                    }

                    if (fieldDef.type === FieldType.limitedChoice) {
                        fieldUIConfig.renderer = choiceRenderer;
                    }

                    columnHeaderConfigs.push(headerConfig);
                    fieldUIConfigs.push(fieldUIConfig);

                }
            }
        });

        let actionColumn: TableHeaderConfig | null = null;
        if (hasActions) {
            actionColumn = {
                element: {
                    type: 'th',
                    attributes: [{name: 'scope', value: 'col'}],
                    classes: 'text-right',
                    innerHTML: 'Actions'
                }
            }

        }

        const tableConfig: TableUIConfig = {
            id: dataObjDef.id,
            displayName: dataObjDef.displayName,
            container: {
                type: 'div',
                classes: 'table-responsive'
            },
            table: {
                type: 'table',
                classes: 'table table-hover table-sm'
            },
            header: {
                type: 'thead',
                classes: ''
            },
            headerColumns: columnHeaderConfigs,
            body: {
                type: 'tbody',
                classes: ''
            },
            columns: fieldUIConfigs,
            itemDetailColumn: itemDetailColumn

        }
        // sort the fields into display order
        tableConfig.columns.sort((a, b) => {
            return (a.displayOrder - b.displayOrder);
        });

        if (actionColumn) {
            tableConfig.actionColumn = actionColumn;
        }

        logger(tableConfig);
        return tableConfig;
    }
}