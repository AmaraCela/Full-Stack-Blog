import express from "express";
import { getPosts } from "../controllers/getPostsController";
import { postController } from "../controllers/postController";

const router = express.Router()
const base_url = process.env.BASE_URL;

router.get(`${base_url}posts`, getPosts);
router.post(`${base_url}post`, postController);

export default router;