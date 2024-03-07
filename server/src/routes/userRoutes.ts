import express from "express";
import { signup } from "../controllers/signupController";
import { login } from "../controllers/loginController";
import { editProfile } from "../controllers/editProfileController";
import { changePassword } from "../controllers/changePasswordController";
import { profile } from "../controllers/profileController";
import { deleteUser } from "../controllers/deleteUserController";
import { authenticateToken } from "../middleware/middleware";

const router = express.Router();


router.post(`/signup`, signup);
router.post(`/login`, login);
router.post(`/edit`, authenticateToken, editProfile);
router.post(`/changepassword`, changePassword);
router.get(`/profile`, profile);
router.post(`/deleteUser`,deleteUser);

export default router;