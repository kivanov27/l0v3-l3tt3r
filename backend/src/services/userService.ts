import UserModel from "../models/user";
import { encryptPassword } from "../utils/utils";

const getUsers = async () => {
    return await UserModel.find({});
};

const getUser = async (id: string) => {
    return await UserModel.findById(id).populate('friends').populate('requests');
};

const getUserSavedMessages = async (id: string) => {
    return await UserModel.findById(id).populate('saved');
};

const createUser = async (entry: any) => {
    const newUser = new UserModel({
        username: entry.username,
        passwordHash: await encryptPassword(entry.password),
    }); 
    if ('iconUrl' in entry) {
        newUser.iconUrl = entry.iconUrl;
    }
    if ('bgColor' in entry) {
        entry.bgColor === '' ? newUser.bgColor = '#ad8109' : newUser.bgColor = entry.bgColor;
    }
    const savedUser = await newUser.save();
    return savedUser;
};

const updateUser = async (id: string, entry: any) => {
    const updatedUser = await UserModel
        .findByIdAndUpdate(id, entry, { new: true })
        .populate('friends')
        .populate('requests');
    return updatedUser;
};

const deleteUser = async (id: string) => {
    return await UserModel.findByIdAndDelete(id);
}

export default {
    getUsers,
    getUser,
    getUserSavedMessages,
    createUser,
    updateUser,
    deleteUser
};
