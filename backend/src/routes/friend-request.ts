import express from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import UserModel from '../models/user';

const friendRequestRouter = express.Router();

friendRequestRouter.post('/', asyncHandler(async (req, res) => {
    const { from, to } = req.body;
    const fromUser = await UserModel.findOne({ username: from });
    const toUser = await UserModel.findOne({ username: to });
    if (!fromUser || !toUser) {
        return res.status(404).json({ error: 'One or both users not found' });
    }

    await UserModel.findByIdAndUpdate(toUser.id, { $addToSet: { requests: fromUser.id } });

    res.status(204);
}));

export default friendRequestRouter;
