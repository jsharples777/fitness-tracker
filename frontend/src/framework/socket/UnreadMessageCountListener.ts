export interface UnreadMessageCountListener {
    countChanged(unreadNormalMessages: number, unreadHighMessages: number, unreadUrgentMessages: number): void;
}