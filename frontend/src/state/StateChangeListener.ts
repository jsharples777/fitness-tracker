export default interface StateChangeListener {
    stateChanged(managerName: string, name: string, newValue: any): void;

    stateChangedItemAdded(managerName: string, name: string, itemAdded: any): void;

    stateChangedItemRemoved(managerName: string, name: string, itemRemoved: any): void;

    stateChangedItemUpdated(managerName: string, name: string, itemUpdated: any, itemNewValue: any): void;

    getListenerName():string;
}