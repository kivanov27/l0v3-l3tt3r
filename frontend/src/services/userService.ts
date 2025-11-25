import axios from "axios";
import type { User, NewUser, UpdateUser } from "../types";

const baseUrl = "http://localhost:3000/api/users";

export const getUser = async (id: string) => {
    const response = await axios.get<User>(`${baseUrl}/${id}`);
    return response.data;
}

export const createUser = async (object: NewUser) => {
    const response = await axios.post<User>(baseUrl, object);
    return response.data;
};

export const updateUser = async (id: string, user: UpdateUser) => {
    const response = await axios.put<User>(`${baseUrl}/${id}`, user);
    return response.data;
};
