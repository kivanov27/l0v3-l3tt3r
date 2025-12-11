import axios from "axios";

const baseUrl = "https://l0v3-l3tt3r-backend.onrender.com/api/friend-request";

export const getFriendRequests = async () => {
    const response = await axios.get(`${baseUrl}`);
    return response.data;
};

export const getFriendRequest = async (id: string) => {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
};

export const sendFriendRequest = async (from: string, to: string) => {
    const response = await axios.post(`${baseUrl}`, { from, to });
    return response.data;
};

export const deleteFriendRequest = async (id: string) => {
    const response = await axios.delete(`${baseUrl}/${id}`);
    return response.data;
};
