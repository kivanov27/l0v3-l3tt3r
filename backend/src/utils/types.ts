import { Types } from "mongoose";

export interface MessageEntry {
    id?: string;
    from: string;
    to: string;
    message: string;
    date: Date;
    saved: Boolean;
    user: Types.ObjectId;
}
export type NewMessageEntry = Omit<MessageEntry, "id">;

export interface User {
    id?: string;
    username: string;
    passwordHash: string;
    messages?: Types.ObjectId[];
    iconUrl?: string;
    bgColor?: string;
    friends?: Types.ObjectId[];
    requests?: string[];
}
export interface NewUser {
    username: string;
    password: string;
    iconUrl?: string;
    bgColor?: string;
    friends?: Types.ObjectId[];
    requests?: string[];
}

export interface FriendRequest {
    id: string;
    from: string;
    to: string;
}
export type NewFriendRequest = Omit<FriendRequest, 'id'>;
