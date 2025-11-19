import axios from "axios";
import type { MessageEntry, NewMessageEntry } from "../types";

const baseUrl = "http://localhost:3000/api/messages";
let token: string = '';

export const setToken = (newToken: string) => {
    token = `Bearer ${newToken}`;
};

export const getAllMessages = async () => {
    const response = await axios.get<MessageEntry[]>(baseUrl);
    return response.data;
};

export const createMessage = async (object: NewMessageEntry) => {
    const config = {
        headers: { Authorization: token },
    };
    const response = await axios.post<MessageEntry>(baseUrl, object, config);
    return response.data;
};
