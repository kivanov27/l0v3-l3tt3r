import messages from "../../data/messages";
import { MessageEntry, NewMessageEntry } from "../types";

const getMessages = (): MessageEntry[] => {
    return messages;
};

const getMessage = (id: number): MessageEntry | undefined => {
    const message = messages.find(msg => msg.id === id);
    return message;
};

const addMessage = (entry: NewMessageEntry): MessageEntry => {
    const newMessage = {
        id: Math.max(...messages.map(m => m.id)) + 1,
        ...entry
    };
    messages.push(newMessage);
    return newMessage;
};

export default {
    getMessages,
    getMessage,
    addMessage
};
