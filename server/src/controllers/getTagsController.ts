import Tag from "../models/Tags";
import { Request, Response } from "express";

export async function getTags(req: Request, res: Response) {
    try {
        const result = await Tag.getTags();
        res.status(200).json({tags: result});
    }
    catch (error) {
        res.status(500).json({message: 'There was an error retrieving the tags'});
    }
}