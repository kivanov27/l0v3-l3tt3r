import axios from "axios";
import type { NewUser } from "../types";

const baseUrl = 'http://localhost:3000/api/login';

export const login = async (credentials: NewUser) => {
    const response = await axios.post(baseUrl, credentials);
    return response.data;
};
