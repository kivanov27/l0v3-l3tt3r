export interface MessageEntry {
    id: string;
    from: string;
    message: string;
    date?: Date;
}

export type NewMessageEntry = Omit<MessageEntry, "id">;
