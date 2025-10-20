export interface MessageEntry {
    id: number;
    from: string;
    message: string;
}

export type NewMessageEntry = Omit<MessageEntry, "id">;
