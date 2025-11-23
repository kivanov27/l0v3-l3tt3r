import express from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import FriendRequestModel from '../models/friend-request';

const friendRequestRouter = express.Router();

friendRequestRouter.get('/', asyncHandler(async (_req ,res) => {
    const friendRequests = await FriendRequestModel.find({});
    res.json(friendRequests);
}));

friendRequestRouter.get('/:id', asyncHandler(async (req,res) => {
    const friendRequest = await FriendRequestModel.findOne({ id: req.params.id });
    res.json(friendRequest);
}));

friendRequestRouter.post('/', asyncHandler(async (req, res) => {
    const { fromUsername, toUsername } = req.body;
    const friendRequest = new FriendRequestModel({
        from: fromUsername,
        to: toUsername
    });
    const savedFriendRequest = await friendRequest.save();
    res.status(201).json(savedFriendRequest);
}));

friendRequestRouter.delete('/:id', asyncHandler(async (req, res) => {
    await FriendRequestModel.findByIdAndDelete(req.params.id);
    res.send(204).end();
}));

export default friendRequestRouter;
