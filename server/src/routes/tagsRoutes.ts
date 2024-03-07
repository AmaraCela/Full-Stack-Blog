import express from "express";
import { getTags } from "../controllers/getTagsController";
import { authenticateToken } from "../middleware/middleware";

const router = express.Router();

router.get("/getTags", authenticateToken, getTags);

export default router;