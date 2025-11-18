import { IUser } from "../models/user";
import { NewMessageEntry, NewUser } from "./types";
import { Request } from "express";
import bcrypt from 'bcrypt';
import mongoose from "mongoose";

export const toNewMessage = (object: unknown): NewMessageEntry => {
    if (!object || typeof object !== "object") {
        throw new Error("Incorrect or missing data");
    }

    if ("from" in object && "message" in object && "user" in object) {
        if ("saved" in object) {
            const newMessage: NewMessageEntry = {
                from: parseFrom(object.from),
                message: parseMessage(object.message),
                date: new Date(),
                user: object.user as mongoose.Types.ObjectId | IUser,
                saved: parseSaved(object.saved),
            };
            return newMessage;
        }
        else {
            const newMessage: NewMessageEntry = {
                from: parseFrom(object.from),
                message: parseMessage(object.message),
                date: new Date(),
                user: object.user as mongoose.Types.ObjectId | IUser,
                saved: false
            };
            return newMessage;
        }
    }
    else {
        throw new Error("Incorrect data, some fields are missing");
    }
};

export const toNewUser = (object: unknown): NewUser => {
    if (!object || typeof(object) !== "object") {
        throw new Error("Incorrect or missing data");
    }

    if ("username" in object && "password" in object) {
        const newUser: NewUser = {
            username: parseUsername(object.username),
            password: parsePassword(object.password),
        }
        return newUser;
    }
    else {
        throw new Error("Incorrect data, some fields are missing");
    }
};

const isString = (text: unknown): text is string => {
    return typeof text === "string" || text instanceof String;
};

const isBoolean = (variable: unknown): variable is boolean => {
    return typeof variable === "boolean" || variable instanceof Boolean;
}

const parseFrom = (from: unknown): string => {
    if (!isString(from)) {
        throw new Error("Incorrect or missing 'from' field");
    }
    return from;
};

const parseMessage = (message: unknown): string => {
    if (!isString(message)) {
        throw new Error("Incorrect or missing 'message' field");
    }
    return message;
};

const parseSaved = (saved: unknown): boolean => {
    if (!isBoolean(saved)) {
        throw new Error("Incorrect or missing 'saved' field");
    }
    return saved;
}

const parseUsername = (username: unknown): string => {
    if (!isString(username)) {
        throw new Error("Incorrect or missing 'username' field");
    }
    return username;
}

const parsePassword = (password: unknown): string => {
    if (!isString(password)) {
        throw new Error("Incorrect or missing 'password' field");
    }
    return password;
}

export const encryptPassword = async (password: string) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

export const getTokenFrom = (req: Request): string => {
    const authorization = req.get('authorization');
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '');
    }
    return '';
};