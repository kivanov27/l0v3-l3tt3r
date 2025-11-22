import mongoose from "mongoose";
import { IUser } from "./user";

export interface IMessage extends mongoose.Document {
    message: string;
    from: string;
    to: string;
    date: Date;
    saved: boolean;
    user: (mongoose.Types.ObjectId | IUser);
}

const messageSchema = new mongoose.Schema<IMessage>({
    message: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    date: { type: Date, default: Date.now },
    saved: { type: Boolean, default: false },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

messageSchema.set("toJSON", {
    transform: (_document, returnedObject: any) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject.__v;
        delete returnedObject._id;
    }
});

const MessageModel: mongoose.Model<IMessage> = mongoose.model<IMessage>("Message", messageSchema);
export default MessageModel;
