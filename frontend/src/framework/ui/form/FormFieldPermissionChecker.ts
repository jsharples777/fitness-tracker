import {ObjectPermissionChecker} from "../view/interface/ObjectPermissionChecker";
import {Field} from "./field/Field";

export interface FormFieldPermissionChecker extends ObjectPermissionChecker {
    hasPermissionToEditField(dataObj:any, field: Field):boolean;
}