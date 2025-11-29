export interface MessageEntry {
    id: string;
    from: string;
    to: string;
    message: string;
    date?: Date;
}

export type NewMessageEntry = Omit<MessageEntry, "id">;

export interface User {
    id: string;
    username: string;
    passwordHash: string;
    iconUrl?: string;
    bgColor?: string;
    friends?: User[];
    requests?: User[];
    lastSentAt?: string | Date;
    saved?: (MessageEntry | string)[];
}

export interface NewUser {
    username: string;
    password: string;
    iconUrl?: string;
    bgColor?: string;
}

export interface UpdateUser {
    id: string;
    username: string;
    passwordHash: string;
    iconUrl?: string;
    bgColor?: string;
    friends?: string[];
    requests?: string[];
    lastSentAt?: string | Date;
    saved?: (MessageEntry | string)[];
}
