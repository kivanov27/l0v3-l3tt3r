import { MessageEntry, NewMessageEntry } from "./types";

// const toNewMessage = (object: unknown): NewMessageEntry => {
//     const newMessage: NewMessageEntry = {
//     };
//
//     return newMessage;
// };

const isString = (text: unknown): text is string => {
    return typeof text === "string" || text instanceof String;
};

const parseFrom = (from: unknown): string => {
    if (!from || !isString(from)) {
        throw new Error("Incorrect or missing 'from' field");
    }
    return from;
};

const parseMessage = (message: unknown): string => {
    if (!message || !isString(message)) {
        throw new Error("Incorrect or missing 'message' field");
    }
    return message;
}

// export default toNewMessage;
