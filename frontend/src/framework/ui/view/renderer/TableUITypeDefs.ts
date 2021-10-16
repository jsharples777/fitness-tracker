import {BasicElement} from "../../ConfigurationTypes";
import {FieldUIConfig} from "../../form/FormUITypeDefs";
import {FieldDefinition} from "../../../model/DataObjectTypeDefs";

export type TableHeaderConfig = {
    field?: FieldDefinition,
    element: BasicElement
}

export type TableUIConfig = {
    id: string,
    displayName: string,
    container?: BasicElement,
    table: BasicElement,
    header: BasicElement,
    body: BasicElement,
    headerColumns: TableHeaderConfig[],
    columns: FieldUIConfig[],
    itemDetailColumn: number,
    actionColumn?: TableHeaderConfig
}