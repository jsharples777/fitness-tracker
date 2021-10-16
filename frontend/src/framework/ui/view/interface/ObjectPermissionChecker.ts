export interface ObjectPermissionChecker {
    hasPermissionToUpdateItem(item: any): boolean;

    hasPermissionToDeleteItem(item: any): boolean;
}
