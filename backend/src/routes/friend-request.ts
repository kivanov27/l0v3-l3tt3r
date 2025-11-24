import express from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import FriendRequestModel from '../models/friend-request';
import UserModel from '../models/user';

const friendRequestRouter = express.Router();

friendRequestRouter.get('/', asyncHandler(async (_req ,res) => {
    const friendRequests = await FriendRequestModel.find({});
    res.json(friendRequests);
}));

friendRequestRouter.get('/:id', asyncHandler(async (req,res) => {
    const friendRequest = await FriendRequestModel.findById(req.params.id);
    res.json(friendRequest);
}));

friendRequestRouter.post('/', asyncHandler(async (req, res) => {
    const { from, to } = req.body;
    const fromUser = await UserModel.findById(from);
    const toUser = await UserModel.findById(to);
    if (!fromUser || !toUser) {
        return res.status(404).json({ error: 'One or both users not found' });
    }
    const friendRequest = new FriendRequestModel({ from, to });
    const savedFriendRequest = await friendRequest.save();

    // add request for user
    await UserModel.findByIdAndUpdate(to, { $addToSet: { requests: from } });

    res.status(201).json(savedFriendRequest);
}));

friendRequestRouter.delete('/:id', asyncHandler(async (req, res) => {
    await FriendRequestModel.findByIdAndDelete(req.params.id);
    res.send(204).end();
}));

export default friendRequestRouter;
