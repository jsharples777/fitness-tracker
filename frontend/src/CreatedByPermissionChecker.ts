import Controller from "./Controller";
import {Field} from "./framework/ui/form/field/Field";
import {FormFieldPermissionChecker} from "./framework/ui/form/FormFieldPermissionChecker";


export class CreatedByPermissionChecker implements FormFieldPermissionChecker {
    hasPermissionToUpdateItem(item: any): boolean {
        let result = false;
        if (item.createdBy) {
            result = (item.createdBy === Controller.getInstance().getLoggedInUsername());
        }
        return result;
    }

    hasPermissionToDeleteItem(item: any): boolean {
        let result = false;
        if (item.createdBy) {
            result = (item.createdBy === Controller.getInstance().getLoggedInUsername());
        }
        return result;
    }

    hasPermissionToEditField(dataObj: any, field: Field): boolean {
        return true;
    }
}
