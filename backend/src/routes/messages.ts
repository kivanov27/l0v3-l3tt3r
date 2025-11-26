import express from "express";
import jwt from "jsonwebtoken";
import messageService from "../services/messageService";
import { getTokenFrom, toNewMessage } from "../utils/utils";
import { asyncHandler } from "../utils/asyncHandler";

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    const fromUserRaw = req.query.fromUser;
    const toUserRaw = req.query.toUser;

    if (!fromUserRaw || !toUserRaw) {
        return res.status(400).json({ error: "Missing fromUserRaw or toUserRaw" });
    }
    else if (typeof fromUserRaw !== "string" || typeof toUserRaw !== "string") {
        return res.status(400).json({ error: "fromUser and toUser must be strings" });
    }
    else {
        const messages = await messageService.getMessages(fromUserRaw, toUserRaw);
        res.json(messages);
    }
}));

router.get("/:id", (req, res) => {
    const message = messageService.getMessage(req.params.id);
    if (message) {
        res.json(message);
    }
    else {
        res.status(400).end();
    }
});

router.post('/', asyncHandler(async (req, res) => {
    const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET as string);
    if (typeof decodedToken !== "object" || !("id" in decodedToken)) {
        return res.status(401).json({ error: "Invalid token." });
    }
    else {
        const body = { ...req.body, user: decodedToken.id };
        const newMessage = toNewMessage(body);
        const addedMessage = messageService.addMessage(newMessage);
        return res.json(addedMessage);
    }
}));

export default router;
