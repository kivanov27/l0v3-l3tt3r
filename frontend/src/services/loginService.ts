import axios from "axios";
import type { NewUser } from "../types";

const baseUrl = 'https://l0v3-l3tt3r-backend.onrender.com/api/login';

export const login = async (credentials: NewUser) => {
    const response = await axios.post(baseUrl, credentials);
    return response.data;
};
