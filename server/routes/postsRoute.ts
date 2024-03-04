const express = require('express');
import { getPosts } from "../controllers/getPostsController";

const router = express.Router()

router.get('/posts', getPosts);

module.exports = router;