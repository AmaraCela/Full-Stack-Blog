import { Request, Response } from "express";
import dotenv from "dotenv";

const express = require('express');
const cors = require('cors');
const app = express();
const postsController = require("./controllers/getPostsController");
const signupController = require("./controllers/signupController");
const loginController = require("./controllers/loginController");
const editProfileController = require("./controllers/editProfileController");
const passwordController = require("./controllers/changePasswordController");
const profileController = require("./controllers/profileController");
const postController = require('./controllers/postController');
const deleteUserController = require('./controllers/deleteUserController');
const bodyParser = require('body-parser');

dotenv.config();
app.use(bodyParser.json());
app.use(cors());

const base_url = process.env.BASE_URL;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello from Express')
});

app.get(`${base_url}posts`, postsController.getPosts);

app.post(`${base_url}signup`, signupController.signup);

app.post(`${base_url}login`, loginController.login);

app.post(`${base_url}edit`, editProfileController.editProfile);

app.post(`${base_url}changepassword`, passwordController.changePassword);

app.get(`${base_url}profile`, profileController.profile);

app.post(`${base_url}post`, postController.postController);

app.post(`${base_url}deleteUser`,deleteUserController.deleteUser);

app.listen(process.env.DEV_PORT, () => {
    console.log(`Server is running on port ${process.env.DEV_PORT}`);
})