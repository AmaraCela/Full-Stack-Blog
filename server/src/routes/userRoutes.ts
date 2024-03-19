import express from "express";
import { signup } from "../controllers/signupController";
import { login } from "../controllers/loginController";
import { editProfile } from "../controllers/editProfileController";
import { changePassword } from "../controllers/changePasswordController";
import { profile } from "../controllers/profileController";
import { deleteUser } from "../controllers/deleteUserController";
import { authenticateToken } from "../middleware/authenticationMiddleware";
import { changeProfilePicture } from "../controllers/changeProfilePictureController";
import multer from "multer";

const router = express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage })

router.post(`/signup`, signup);
router.post(`/login`, login);
router.post(`/edit`, authenticateToken, editProfile);
router.post(`/changepassword`, authenticateToken, changePassword);
router.get(`/profile`, profile);
router.post(`/deleteUser`, authenticateToken, deleteUser);
router.post('/profileImg', authenticateToken, upload.single('files'), changeProfilePicture);

export default router;