import { Request, Response } from "express";
import User from "../models/User";

export async function signup(req: Request, res: Response): Promise<void> {
    const { username, email, password } = req.body;

    try {
        const signupSuccess = await User.registerUser(username, email, password);
    
        signupSuccess ? res.status(204).json({ message: "User registered successfully" }) : res.status(400).json({ message: 'Username already exists.' });
    } catch (error) {
        res.status(500).json({ message: 'Registration unsuccessful' });
    }
}