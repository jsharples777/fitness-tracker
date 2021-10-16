import {DataObjectDefinition} from "../../model/DataObjectTypeDefs";
import {DisplayOrder, FormUIDefinition} from "./FormUITypeDefs";

export interface FormConfigHelper {
    generateFormConfig(dataObjDef: DataObjectDefinition, displayOrders: DisplayOrder[], hasDeleteButton: boolean, hideModifierFields: boolean, asExternalControl: boolean): FormUIDefinition;
}
