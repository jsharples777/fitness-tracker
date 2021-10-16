import {ObjectPermissionChecker} from "ui-framework-jps";


export class DefaultPermissionChecker implements ObjectPermissionChecker {
    hasPermissionToUpdateItem(item: any): boolean {
        return true;
    }

    hasPermissionToDeleteItem(item: any): boolean {
        return true;
    }
}
