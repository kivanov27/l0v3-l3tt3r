import express from "express";
import { PORT, DB_URL } from "./utils/config";
import messageRouter from "./routes/messages";
import mongoose from "mongoose";
import cors from "cors";
import logger from "./utils/logger";

const app = express();

mongoose.set("strictQuery", false);
mongoose.connect(DB_URL as string)
    .then(() => {
         logger.info("Connected to MongoDB");
    })
    .catch((error) => {
        logger.error("Couldn't connect to MongoDB: ", error.message);
    });

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use("/api/messages", messageRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;
