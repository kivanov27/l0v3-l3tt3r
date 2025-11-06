import { NewMessageEntry } from "./types";

const toNewMessage = (object: unknown): NewMessageEntry => {
    if (!object || typeof object !== "object") {
        throw new Error("Incorrect or missing data");
    }

    if ("from" in object && "message" in object) {
        const newMessage: NewMessageEntry = {
            from: parseFrom(object.from),
            message: parseMessage(object.message),
            date: new Date()
        };
        return newMessage;
    }
    else {
        throw new Error("Incorrect data, some fields are missing");
    }
};

const isString = (text: unknown): text is string => {
    return typeof text === "string" || text instanceof String;
};

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

export default toNewMessage;
