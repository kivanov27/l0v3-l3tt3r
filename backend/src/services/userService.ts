import UserModel from "../models/user";
import { encryptPassword } from "../utils/utils";

const getUsers = async () => {
    return await UserModel.find({});
};

const getUser = async (username: string) => {
    return await UserModel.find({
        where: {
            username: username
        }
    });
};

const createUser = async (entry: any) => {
    const newUser = new UserModel({
        username: entry.username,
        passwordHash: await encryptPassword(entry.password),
    }); 
    if ('iconUrl' in entry) newUser.iconUrl = entry.iconUrl;
    if ('bgColor' in entry) newUser.bgColor = entry.bgColor;
    const savedUser = await newUser.save();
    return savedUser;
};

export default {
    getUsers,
    getUser,
    createUser
};
