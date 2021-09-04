import {ViewListener} from "./ViewListener";
import {Modifier} from "./ConfigurationTypes";

export interface View {
    setContainedBy(container:HTMLElement):void;

    addEventListener(listener: ViewListener): void;

    onDocumentLoaded(): void;

    getIdForStateItem(name: string, item: any): string;

    getDisplayValueForStateItem(name: string, item: any): string;

    compareStateItemsForEquality(item1:any, item2: any): boolean;

    getModifierForStateItem(name: string, item: any): Modifier;

    getSecondaryModifierForStateItem(name: string, item: any): Modifier;

    getBadgeValue(name: string, item: any): number;

    getBackgroundImage(name: string, item: any): string;

    updateView(name: string, newState: any): void;

}