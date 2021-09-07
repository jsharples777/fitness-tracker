import {FieldDefinition} from "./FormUITypes";

export interface FieldListener {
    valueChanged(field:FieldDefinition, newValue:string):void;
    failedValidation(field:FieldDefinition, currentValue:string, message:string):void;
}