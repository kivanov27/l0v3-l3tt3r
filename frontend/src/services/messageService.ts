import axios from "axios";
import type { MessageEntry, NewMessageEntry } from "../types";

const baseUrl = "http://localhost:3000/api/messages";

export const getAllMessages = () => {
    return axios.get<MessageEntry[]>(baseUrl).then(response => response.data);
};

export const createMessage = (object: NewMessageEntry) => {
    return axios.post<MessageEntry>(baseUrl, object).then(response => response.data);
};
