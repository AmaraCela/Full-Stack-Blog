import { Request, Response } from "express";
import User from "../models/User";

export async function changePassword(req: Request, res: Response) {
    const { currentUsername, currentPassword, newPassword } = req.body;
    try {
        const result = await User.getUserByUsername(currentUsername, currentPassword);
        if (typeof (result) === 'object') {
            try {
                const changed = await User.changePassword(currentUsername, newPassword);
                changed ? res.status(200).json({succesfulMesage: 'Password changed successfully.' }) : res.status(401).json({errorMessage: 'New password can not be the same as the current password.'});
            }
            catch (error) {
                console.log(error);
                res.status(500).json({message: 'There was an error changing the password.'})
            }
        }
        else {
            res.status(401).json({errorMessage: 'Password does not match current password.'});
        }

    }
    catch (error) {
        console.log(error);
        res.status(500).json({message: 'There was an error checking the password.'})
    }
}