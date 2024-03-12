import express from "express";
import { getPosts } from "../controllers/getPostsController";
import { postController } from "../controllers/postController";
import multer from "multer";
import { getPostById } from "../controllers/getPostByIdController";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({storage:storage})

const router = express.Router();


router.get(`/posts`, getPosts);
router.post(`/post`, upload.array('files', 5), postController);
router.get('/singlePost', getPostById);

export default router;