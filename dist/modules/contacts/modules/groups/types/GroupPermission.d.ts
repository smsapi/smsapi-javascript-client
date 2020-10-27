export interface GroupPermission {
    groupId: string;
    username: string;
    write: boolean;
    read: boolean;
    send: boolean;
}
