import { Request, Response } from "express";
import User from "../models/User";

export async function login(req: Request, res: Response) {

    const { username, password } = req.body;

    try {

        const result = await User.getUserByUsername(username, password);
        typeof (result) === 'object' ? res.status(200).json({ user: result }) : res.status(401).json({ message: result })

    }
    catch (error) {
        res.status(500).json({ message: "There was an error retrieving the user." });
    }
}