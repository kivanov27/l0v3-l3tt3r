import express from 'express';
import userService from '../services/userService';
import { toNewUser } from '../utils/utils';

const router = express.Router();

router.get('/', async (_req, res) => {
    const users = await userService.getUsers();
    res.json(users);
});

router.get('/:id', async (req, res) => {
    const user = await userService.getUser(req.params.id);
    if (user) {
        res.json(user);
    }
    else {
        res.status(400).end();
    }
});

router.post('/', async (req, res) => {
    try {
        const newUser = toNewUser(req.body);
        const addedUser = userService.createUser(newUser);
        res.json(addedUser);
    }
    catch (error: unknown) {
        let errorMsg = "Something went wrong.";
        if (error instanceof Error) {
            errorMsg += "Error: " + error.message;
        }
        res.status(400).send(errorMsg);
    }
});

export default router;
