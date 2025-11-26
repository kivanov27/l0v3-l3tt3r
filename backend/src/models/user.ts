import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
    username: string;
    passwordHash: string;
    iconUrl?: string;
    bgColor?: string;
    friends?: mongoose.Types.ObjectId[];
    requests?: mongoose.Types.ObjectId[];
}

const userSchema = new mongoose.Schema<IUser>({
    username: { type: String, required: true },
    passwordHash: { type: String, required: true },
    iconUrl: { type: String, required: false },
    bgColor: { type: String, required: false },
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: false
        }
    ],
    requests: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: false
        }
    ]
});

userSchema.set("toJSON", {
    transform: (_document, returnedObject: any) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject.__v;
        delete returnedObject._id;
    }
});

const UserModel: mongoose.Model<IUser> = mongoose.model<IUser>("User", userSchema);
export default UserModel;
