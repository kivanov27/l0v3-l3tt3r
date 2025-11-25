export interface MessageEntry {
    id: string;
    from: string;
    to: string;
    message: string;
    date?: Date;
    saved?: boolean;
}

export type NewMessageEntry = Omit<MessageEntry, "id">;

export interface User {
    id: string;
    username: string;
    passwordHash: string;
    messages?: (MessageEntry | string)[];
    iconUrl?: string;
    bgColor?: string;
    friends?: User[];
    requests?: User[];
}

export interface NewUser {
    username: string;
    password: string;
    messages?: (MessageEntry | string)[];
    iconUrl?: string;
    bgColor?: string;
    friends?: string[];
    requests?: string[];
}

export interface UpdateUser {
    id: string;
    username: string;
    passwordHash: string;
    messages?: (MessageEntry | string)[];
    iconUrl?: string;
    bgColor?: string;
    friends?: string[];
    requests?: string[];
}
