export type equalityFunction = (item1: any, item2: any) => boolean;

export function isSame(item1: any, item2: any): boolean {
    return (item1.id === item2.id);
}

export function isSameUsername(item1: any, item2: any): boolean {
    return (item1.username === item2.username);
}

export function isSameGame(item1: any, item2: any): boolean {
    return (item1.gameId === item2.gameId);
}

export function isSameRoom(item1:any, item2: any): boolean {
    return (item1.roomName === item2.roomName);
}
