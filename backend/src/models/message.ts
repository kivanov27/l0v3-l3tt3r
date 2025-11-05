import mongoose from "mongoose";

export interface IMessage extends mongoose.Document {
    message: string;
    from: string;
}

const messageSchema = new mongoose.Schema<IMessage>({
    message: { type: String, required: true },
    from: { type: String, required: true }
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
