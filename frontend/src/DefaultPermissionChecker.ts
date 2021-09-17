import {ObjectPermissionChecker} from "./ui-framework/view/interface/ObjectPermissionChecker";
import Controller from "./Controller";

export class DefaultPermissionChecker implements ObjectPermissionChecker {
    hasPermissionToUpdateItem(item: any): boolean {
        return true;
    }

    hasPermissionToDeleteItem(item: any): boolean {
        return true;
    }
}