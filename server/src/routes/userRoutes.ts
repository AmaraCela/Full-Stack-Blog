import express from "express";
import { signup } from "../controllers/signupController";
import { login } from "../controllers/loginController";
import { editProfile } from "../controllers/editProfileController";
import { changePassword } from "../controllers/changePasswordController";
import { profile } from "../controllers/profileController";
import { deleteUser } from "../controllers/deleteUserController";

const router = express.Router();
const base_url = process.env.BASE_URL;

router.post(`${base_url}signup`, signup);
router.post(`${base_url}login`, login);
router.post(`${base_url}edit`, editProfile);
router.post(`${base_url}changepassword`, changePassword);
router.get(`${base_url}profile`, profile);
router.post(`${base_url}deleteUser`,deleteUser);

export default router;