import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    id: { type: String, required: true },
    message: { type: String, required: true },
    from: { type: String, required: true }
});

export default mongoose.model("Message", messageSchema);
