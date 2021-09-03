export interface UnreadMessageCountListener {
    countChanged(newCount: number): void;
}