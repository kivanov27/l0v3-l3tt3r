import express from "express";
import messageService from "../services/messageService";

const router = express.Router();

router.get('/', (_req, res) => {
    res.send("Fetching all messages");
});

router.get("/:id", (req, res) => {
    const message = messageService.getMessage(Number(req.params.id));
    if (message) {
        res.json(message);
    }
    else {
        res.status(400).end();
    }
})

router.post('/', (req, res) => {
    const { from, message } = req.body;
    const newMessage = messageService.addMessage({ from, message });
    res.json(newMessage);
});

export default router;
