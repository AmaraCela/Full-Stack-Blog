import { Request, Response } from "express";
import User from "../models/User";

export async function deleteUser(req: Request, res: Response) {
    const { username, currentPassword } = req.body;

    try {
        const result = await User.deleteUser(username, currentPassword);
        result ? res.status(200).json({successfulMessage: "Deleted successfully"}) : res.status(401).json({errorMessage: 'Password does not match current password.'});
    }
    catch (error) {
        res.status(500).json({message: "There was an error deleting the user"});
    }
}