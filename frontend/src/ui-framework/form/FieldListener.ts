import {FieldDefinition} from "./DataObjectTypeDefs";

export interface FieldListener {
    valueChanged(field:FieldDefinition, newValue:string):void;
    failedValidation(field:FieldDefinition, currentValue:string, message:string):void;
}