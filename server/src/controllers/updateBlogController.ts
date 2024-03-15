import { Request, Response } from "express";
import Post from "../models/Post";

export async function updateBlog (req: Request, res: Response) {
    const { post_id, title, description, tags } = req.body;

    try {
        const result = await Post.updateBlog(post_id, title, description, tags);
        result && res.status(200).json({successfulMessage: 'Post was updated'});
    }
    catch (error) {
        console.log(error);
        res.status(500).json({errorMessage: 'There was an error updating the post'});
    }
}