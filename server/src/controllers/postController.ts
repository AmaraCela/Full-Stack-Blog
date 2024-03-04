import { Request, Response } from "express";
import Post from "../models/Post";

export async function postController(req: Request, res: Response): Promise<void> {

    const { title, description, user_id } = req.body;
    
    const validPost = await Post.postBlog(title, description, user_id);
    validPost ? res.status(204).json({ message: 'Successful' }) : res.status(500).json({ message: 'There was an error posting the blog' })
    
}