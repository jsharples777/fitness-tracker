import {ObjectPermissionChecker} from "./framework/ui/view/interface/ObjectPermissionChecker";


export class DefaultPermissionChecker implements ObjectPermissionChecker {
    hasPermissionToUpdateItem(item: any): boolean {
        return true;
    }

    hasPermissionToDeleteItem(item: any): boolean {
        return true;
    }
}
