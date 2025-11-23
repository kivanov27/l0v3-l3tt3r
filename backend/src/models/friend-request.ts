import mongoose from "mongoose";

export interface IFriendRequest extends mongoose.Document {
    from: string;
    to: string;
}

const friendRequestSchema = new mongoose.Schema<IFriendRequest>({
    from: { type: String, required: true },
    to: { type: String, required: true }
});

friendRequestSchema.set("toJSON", {
    transform: (_document, returnedObject: any) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject.__v;
        delete returnedObject._id;
    }
});

const FriendRequestModel: mongoose.Model<IFriendRequest> = mongoose.model<IFriendRequest>("FriendRequest", friendRequestSchema);
export default FriendRequestModel;
