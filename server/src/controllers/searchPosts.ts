import { Request, Response } from "express";
import Post from "../models/Post";

export async function searchPosts(req: Request, res: Response) {
    const { keyword } = req.body;
    try {
        const result = await Post.filterBlogs(keyword);
        res.status(200).json(result);

    }
    catch (error) {
        res.status(500).json({ message: 'There was an error' });
    }
}