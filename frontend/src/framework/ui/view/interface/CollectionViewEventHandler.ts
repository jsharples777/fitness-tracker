export interface CollectionViewEventHandler {
    eventStartDrag(event: DragEvent): void;

    handleDrop(event: Event): void;

    eventClickItem(event: MouseEvent): void;

    eventDeleteClickItem(event: MouseEvent): void;

    eventActionClicked(event: MouseEvent): void;
}