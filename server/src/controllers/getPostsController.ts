import { Request, Response } from "express";
import Post from "../models/Post";

export async function getPosts(req: Request, res: Response): Promise<void> {
    const offset = parseInt(req.query.offset as string);
    try {
        const posts = await Post.getPosts(offset);
        res.status(200).json(posts);
    } 
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }

}

module.exports = { getPosts };