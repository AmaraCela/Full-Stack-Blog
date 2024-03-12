import { Request, Response } from "express";
import Post from "../models/Post";
export async function getPostById (req: Request, res: Response) {
    try {
        const result = await Post.getBlogById(req.query.post_id as string);
        return res.status(200).json({result});
    }
    catch (err) {
        return res.status(500).json({errorMessage: 'Could not retrieve post.'});
    }
}
