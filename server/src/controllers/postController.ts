import { Request, Response } from "express";
import Post, { PostData } from "../models/Post";

export async function postController(req: Request, res: Response): Promise<void> {

    const { title, description, user_id, tags } = req.body;
    const files: Express.Multer.File[] = req.files as Express.Multer.File[];
    const data: PostData = { title, description, user_id, tags, files };
    const validPost = await Post.postBlog(data);
    validPost ? res.status(201).json({ message: 'Successful' }) : res.status(500).json({ message: 'There was an error posting the blog' });
    
}