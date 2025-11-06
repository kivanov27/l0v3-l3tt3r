export interface MessageEntry {
    id?: string;
    from: string;
    message: string;
    date: Date;
    saved: Boolean;
}

export type NewMessageEntry = Omit<MessageEntry, "id">;
