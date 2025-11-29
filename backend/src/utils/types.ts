import { Types } from 'mongoose';

export interface MessageEntry {
    id?: string;
    from: string;
    to: string;
    message: string;
    date: Date;
    user: Types.ObjectId;
}
export type NewMessageEntry = Omit<MessageEntry, 'id'>;

export interface User {
    id: string;
    username: string;
    passwordHash: string;
    iconUrl?: string;
    bgColor?: string;
    friends?: Types.ObjectId[];
    requests?: Types.ObjectId[];
    lastSentAt?: Date;
    saved?: Types.ObjectId[];
}
export interface NewUser {
    username: string;
    password: string;
    iconUrl?: string;
    bgColor?: string;
}
