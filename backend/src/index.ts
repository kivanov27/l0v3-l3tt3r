import express from "express";
import { PORT } from "./config/utils";
import messageRouter from "./routes/messages";

const app = express();
app.use(express.json());

app.use("/api/messages", messageRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
