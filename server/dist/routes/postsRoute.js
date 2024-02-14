"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const postsController_1 = require("../controllers/postsController");
const router = express.Router();
router.get('/posts', postsController_1.getPosts);
module.exports = router;
