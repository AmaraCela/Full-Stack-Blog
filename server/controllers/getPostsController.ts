import { Request, Response } from "express";
import Post from "../models/Post";

export function getPosts(req: Request, res: Response): void {
    
    try {
        const posts = Post.getPosts();
        res.status(200).json(posts);
    } 
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }

}

module.exports = { getPosts };