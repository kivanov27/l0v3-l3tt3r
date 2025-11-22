import express from 'express';
import userService from '../services/userService';
import { toNewUser } from '../utils/utils';
import { asyncHandler } from '../utils/asyncHandler';

const router = express.Router();

router.get('/', asyncHandler(async (_req, res) => {
    const users = await userService.getUsers();
    res.json(users);
}));

router.get('/:id', asyncHandler(async (req, res) => {
    const user = await userService.getUser(req.params.id as string);
    if (!user) res.status(404).json({ error: "User not found" });
    res.json(user);
}));

router.post('/', asyncHandler(async (req, res) => {
    const newUser = toNewUser(req.body);
    const addedUser = await userService.createUser(newUser);
    res.status(201).json(addedUser);
}));

router.put('/:id', asyncHandler(async (req, res) => {
    const updated = await userService.updateUser(req.params.id as string, req.body);
    res.json(updated);
}));

router.delete('/:id', asyncHandler(async (req, res) => {
    await userService.deleteUser(req.params.id as string);
    res.status(204).end();
}));

export default router;
