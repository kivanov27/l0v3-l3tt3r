import express from "express";
import mongoose from "mongoose";
import { DB_URL } from "./utils/config";
import cors from "cors";
import logger from "./utils/logger";
import messageRouter from "./routes/messages";
import userRouter from "./routes/users";
import loginRouter from "./routes/login";
import friendRequestRouter from "./routes/friend-request";
import { errorHandler } from "./utils/middleware";

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
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
app.use("/api/friend-request", friendRequestRouter);

app.use(errorHandler);

export default app;
