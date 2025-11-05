import axios from "axios";
import type { MessageEntry, NewMessageEntry } from "../types";

const baseUrl = "http://localhost:3000/api/messages";

export const getAllMessages = async () => {
    const response = await axios.get<MessageEntry[]>(baseUrl);
    return response.data;
};

export const createMessage = async (object: NewMessageEntry) => {
    const response = await axios.post<MessageEntry>(baseUrl, object);
    return response.data;
};
