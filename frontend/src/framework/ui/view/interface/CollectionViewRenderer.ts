export interface CollectionViewRenderer {
    createDisplayElementForCollectionItem(collectionName: string, item: any): HTMLElement;

    setDisplayElementsForCollectionInContainer(containerEl: HTMLElement, collectionName: string, newState: any): void;

    onDocumentLoaded(): void;
}