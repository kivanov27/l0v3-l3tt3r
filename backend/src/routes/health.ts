import express from "express";
import { asyncHandler } from "../utils/asyncHandler";

const router = express.Router();

router.get('/', asyncHandler(async (_req, res) => {
    res.json("OK");
}));

export default router;
