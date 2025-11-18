import express from "express";
import jwt from "jsonwebtoken";
import messageService from "../services/messageService";
import { getTokenFrom, toNewMessage } from "../utils/utils";
import UserModel from "../models/user";

const router = express.Router();

router.get('/', async (_req, res) => {
    const messages = await messageService.getMessages();
    res.json(messages);
});

router.post('/', async (req, res) => {
    try {
        const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET as string);
        if (typeof decodedToken !== "object" || !("id" in decodedToken)) {
            return res.status(401).json({ error: "Invalid token." });
        }
        const user = await UserModel.findById(decodedToken.id);
        if (user) {
            const body = { ...req.body, user: user.id };
            const newMessage = toNewMessage(body);
            const addedMessage = messageService.addMessage(newMessage);
            return res.json(addedMessage);
        }
        else {
            return res.status(404).json({ error: "User not found." });
        }
    }
    catch (error: unknown) {
        let errorMsg = "Something went wrong.";
        if (error instanceof Error) {
            errorMsg += " Error: " + error.message;
        }
        res.status(400).send(errorMsg);
    }
});

// router.get("/:id", (req, res) => {
//     const message = messageService.getMessage(Number(req.params.id));
//     if (message) {
//         res.json(message);
//     }
//     else {
//         res.status(400).end();
//     }
// });

export default router;