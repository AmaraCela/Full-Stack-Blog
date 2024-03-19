import { Request, Response } from "express";
import User from "../models/User";

export async function changeProfilePicture(req: Request, res: Response) {
    const { user_id } = req.body;
    const file: Express.Multer.File = req.file as Express.Multer.File;
    try {
        const result = await User.changeProfilePicture(user_id, file);
        return result ? res.status(200).json({ path: result }) : res.status(500).json({ errorMessage: 'There was an error adding the image.' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ errorMessage: 'There was an error adding the image.' });
    }
}