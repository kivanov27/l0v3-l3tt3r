import express from "express";
import messageService from "../services/messageService";
// import toNewMessage from "../utils/utils";

const router = express.Router();

router.get('/', async (_req, res) => {
    const messages = await messageService.getMessages();
    res.json(messages);
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

// router.post('/', (req, res) => {
//     try {
//         const newMessage = toNewMessage(req.body);
//         const addedMessage = messageService.addMessage(newMessage);
//         res.json(addedMessage);
//     }
//     catch (error: unknown) {
//         let errorMsg = "Something went wrong.";
//         if (error instanceof Error) {
//             errorMsg += " Error: " + error.message;
//         }
//         res.status(400).send(errorMsg);
//     }
// });

export default router;
