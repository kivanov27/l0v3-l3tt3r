import MessageModel from "../models/message";
import { MessageEntry, NewMessageEntry } from "../utils/types";

const getMessages = async () => {
    return await MessageModel.find({});
};

const addMessage = async (entry: NewMessageEntry): Promise<MessageEntry> => {
    const newMessage = new MessageModel({
        from: entry.from,
        message: entry.message,
        date: entry.date,
        saved: entry.saved
    });
    const savedMessage = await newMessage.save();
    return savedMessage;
};

// const getMessage = (id: number): MessageEntry | undefined => {
//     const message = messages.find(msg => msg.id === id);
//     return message;
// };

export default {
    getMessages,
    addMessage
    // getMessage,
};
