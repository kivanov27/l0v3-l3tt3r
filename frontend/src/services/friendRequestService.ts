import axios from "axios";

const baseUrl = "https://l0v3-l3tt3r-backend.onrender.com/api/friend-request";

export const sendFriendRequest = async (from: string, to: string) => {
    const response = await axios.post(`${baseUrl}`, { from, to });
    return response.data;
};
