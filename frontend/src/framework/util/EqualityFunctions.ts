export function isSame(item1: any, item2: any): boolean {
    return (item1.id === item2.id);
}

export function isSameMongo(item1: any, item2: any): boolean {
    return (item1._id === item2._id);
}


export function isSameUsername(item1: any, item2: any): boolean {
    return (item1.username === item2.username);
}

export function isSameRoom(item1: any, item2: any): boolean {
    return (item1.roomName === item2.roomName);
}
