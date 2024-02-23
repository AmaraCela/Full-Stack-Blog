import { Request, Response } from "express";
const express = require('express');
const cors = require('cors');

const app = express();

const postsController = require("./controllers/postsController");
const signupController = require("./controllers/signupController");
const loginController = require("./controllers/loginController");
const editProfileController = require("./controllers/editProfileController");
const passwordController = require("./controllers/passwordController");
const profileController = require("./controllers/profileController");
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(cors());

const port = 5000;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello from Express')
})

app.get('/api/posts', postsController.getPosts);

app.post('/api/signup', signupController.signup);

app.post('/api/login', loginController.login);

app.post('/api/edit', editProfileController.editProfile);

app.post('/api/password', passwordController.validateOldPassword);

app.get('/api/profile/', profileController.profile);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})