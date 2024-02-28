import { Request, Response } from "express";
import User from "../models/User";

export function editProfile(req: Request, res: Response) {
    const { username, email, user_id } = req.body;
    try {
        const result = User.updateUsernameAndEmail(username, email, user_id);
        typeof(result) === 'object' ? res.status(200).json({user: result}) : res.status(400).json({ message: result });
    }
    catch (error) {
        res.status(500).json({ message: "Could not update user." })
    }
}