import {AlertListener} from "../../alert/AlertListener";

export interface CollectionViewEventDelegate extends AlertListener {
    getDragData(event: DragEvent): any;

    eventStartDrag(event: DragEvent): void;

    eventClickItem(event: MouseEvent): void;

    eventDeleteClickItem(event: MouseEvent): void;

    eventActionClicked(event: MouseEvent): void;
}
