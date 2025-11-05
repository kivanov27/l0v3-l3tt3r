export interface MessageEntry {
    id: string;
    from: string;
    message: string;
}

export type NewMessageEntry = Omit<MessageEntry, "id">;
