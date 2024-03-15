import { Request, Response } from "express";
import Post from "../models/Post";

export async function getNumberOfBlogs (req: Request, res: Response) {
    try {
        const result = await Post.getNumberOfBlogs();
        res.status(200).json({number: result});
    }
    catch (err) {
        res.status(500).json({errorMessage: err});
    }
}