export interface MessageEntry {
    id: string;
    from: string;
    message: string;
    date?: Date;
    saved?: boolean;
}

export type NewMessageEntry = Omit<MessageEntry, "id">;
