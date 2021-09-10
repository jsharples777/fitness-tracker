import {FieldDefinition} from "../DataObjectTypeDefs";

export interface FieldListener {
    getName():string;
    valueChanged(formId:String, field:FieldDefinition, newValue:string|null):void;
    failedValidation(formId:String, field:FieldDefinition, currentValue:string, message:string):void;
}