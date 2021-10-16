import {View} from "./View";
import {DisplayOrder} from "../../form/FormUITypeDefs";

export interface DetailView extends View {
    clearDisplay(): void;

    createItem(): any;

    displayItem(dataObj: any): void;

    hasPermissionToDeleteItem(dataObj: any): boolean;

    hasPermissionToUpdateItem(dataObj: any): boolean;

    setReadOnly(): void;

    clearReadOnly(): void;

    isReadOnly(): boolean;

    handleActionItem(actionName: string, selectedItem: any): void;

    isDisplayingItem(dataObj: any): boolean;

    initialise(displayOrder: DisplayOrder[], hasDeleteButton: boolean, hideModifierFields: boolean): void;


}