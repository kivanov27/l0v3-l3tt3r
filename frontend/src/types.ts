export interface MessageEntry {
    id: string;
    from: string;
    message: string;
    date?: Date;
    saved?: boolean;
}

export type NewMessageEntry = Omit<MessageEntry, "id">;

export interface User {
    username: string;
    passwordHash: string;
    messages: (MessageEntry | string)[];
}

export interface NewUser {
    username: string;
    password: string;
}
