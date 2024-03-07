"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
import express from 'express';
const app = express();
const postsController = require("./controllers/postsController");
const signupController = require("./controllers/signupController");
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const port = 5000;
app.get('/', (req, res) => {
    res.send('Hello from Express');
});
app.get('/api/posts', postsController.getPosts);
app.post('/api/signup', signupController.signup);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
