import { Types } from "mongoose";
import { IUser } from "../models/user";
import { IMessage } from "../models/message";

export interface MessageEntry {
    id?: string;
    from: string;
    message: string;
    date: Date;
    saved: Boolean;
    user: (Types.ObjectId | IUser);
}

export type NewMessageEntry = Omit<MessageEntry, "id">;

export interface User {
    username: string;
    passwordHash: string;
    messages: (Types.ObjectId | IMessage)[];
    iconUrl?: string;
    bgColor?: string;
}

export interface NewUser {
    username: string;
    password: string;
    iconUrl?: string;
    bgColor?: string;
}
