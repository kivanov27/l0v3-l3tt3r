import axios from "axios";
import type { User, NewUser } from "../types";

const baseUrl = "http://localhost:3000/api/users";

export const getUser = async (id: string) => {
    const response = await axios.get<User>(`${baseUrl}/${id}`);
    return response.data;
}

export const createUser = async (object: NewUser) => {
    const response = await axios.post<User>(baseUrl, object);
    return response.data;
};

export const updateUser = async (user: User) => {
    const response = await axios.put<User>(`${baseUrl}/${user.id}`, user);
    return response.data;
};
