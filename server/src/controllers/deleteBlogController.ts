import { Request, Response } from "express";
import Post from "../models/Post";
export async function deleteBlog(req: Request, res: Response) {
    const { blog_id } = req.body;
    try {
        Post.deleteBlog(blog_id);
        res.status(200).json({successfulMessage: 'Blog deleted successfully'});
    }
    catch (err) {
        res.status(500).json({errorMessage: 'There was an error deleting the blog'});
    }
}