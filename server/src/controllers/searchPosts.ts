import { Request, Response } from "express";
import Post from "../models/Post";

export async function searchPosts(req: Request, res: Response) {
    try {
        const result = await Post.filterBlogs('a');
        res.status(200).json(result);
        
    }
    catch(error) {
        res.status(500).json({message: 'There was an error'});
    }
}