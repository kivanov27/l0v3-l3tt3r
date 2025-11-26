import MessageModel from "../models/message";
import { MessageEntry, NewMessageEntry } from "../utils/types";

const getMessages = async (fromUser: string, toUser: string) => {
    return await MessageModel.find({
        $or: [
            { from: fromUser, to: toUser },
            { from: toUser, to: fromUser }
        ]
    }).populate('user');
};

const addMessage = async (entry: NewMessageEntry): Promise<MessageEntry> => {
    const newMessage = new MessageModel({
        from: entry.from,
        to: entry.to,
        message: entry.message,
        date: entry.date,
        saved: entry.saved,
        user: entry.user
    });
    const savedMessage = await newMessage.save();
    return savedMessage;
};

const getMessage = async (id: string): Promise<MessageEntry | null> => {
    const message = await MessageModel.findById(id);
    return message;
};

export default {
    getMessages,
    addMessage,
    getMessage
};
