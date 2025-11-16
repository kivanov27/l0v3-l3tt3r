import axios from "axios";
import type { User, NewUser } from "../types";

const baseUrl = "http://localhost:3000/api/users";

export const getUser = async (username: string) => {
    const response = await axios.get<User>(`${baseUrl}/${username}`);
    return response.data;
}

export const createUser = async (object: NewUser) => {
    const response = await axios.post<User>(`${baseUrl}`, object);
    return response.data;
};
