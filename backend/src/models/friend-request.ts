import mongoose from "mongoose";

export interface IFriendRequest extends mongoose.Document {
    from: mongoose.Types.ObjectId;
    to: mongoose.Types.ObjectId;
}

const friendRequestSchema = new mongoose.Schema<IFriendRequest>({
    from: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true 
    },
    to: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true 
    }
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
