import { Request, Response } from "express";
import Post from "../models/Post";

export interface UserProfile {
    user_id: number;
    username: string;
    email: string;
    posts: Array<{
        post_id: number;
        title: string;
        description: string;
        date_posted: Date;
        tags: Array<{ tag_id: number; tag_name: string }>;
        images: Array<string>;
    }>;
}

export async function profile(req: Request, res: Response): Promise<void> {

    const user_id = req.query.user_id;

    if (!user_id) {
        res.status(400).json({ message: 'User ID is required in the query parameters.' });
        return;
    }

    try {
        const result = await Post.getPostsOfUser(user_id as string);
        !result ? res.status(401).json({ message: 'User not found.' }) : res.status(200).json({ user: result })
    }
    catch (error) {
        res.status(500).json({ message: 'There was an error retrieving the profile.' });
    }
}