import {FormFieldPermissionChecker} from "./FormFieldPermissionChecker";
import {Field} from "./field/Field";

export class DefaultFormFieldPermissionChecker implements FormFieldPermissionChecker {
    hasPermissionToDeleteItem(item: any): boolean {
        return true;
    }

    hasPermissionToEditField(dataObj: any, field: Field): boolean {
        return true;
    }

    hasPermissionToUpdateItem(item: any): boolean {
        return true;
    }

}