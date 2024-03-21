import express from "express";
import { getPosts } from "../controllers/getPostsController";
import { postController } from "../controllers/postController";
import multer from "multer";
import { getPostById } from "../controllers/getPostByIdController";
import { authenticateToken } from "../middleware/authenticationMiddleware";
import { deleteBlog } from "../controllers/deleteBlogController";
import { updateBlog } from "../controllers/updateBlogController";
import { getNumberOfBlogs } from "../controllers/numberOfBlogsController";
import { searchPosts } from "../controllers/searchPosts";

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
router.post(`/post`, authenticateToken, upload.array('files', 5), postController);
router.get('/singlePost', getPostById);
router.post('/deleteBlog', authenticateToken,  deleteBlog);
router.post('/updateBlog', authenticateToken, updateBlog);
router.get('/nrPosts', getNumberOfBlogs);
router.post('/search', searchPosts);

export default router;