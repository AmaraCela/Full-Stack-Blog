import DatabaseConnection from "../database/DatabaseConnection";
import { Request, Response } from "express";

export function postController(req: Request, res: Response): void {
    const dbconnection = new DatabaseConnection();
    const connection = dbconnection.getConnection();

    const { title, description, user_id } = req.body;
    const date = new Date();

    const query = 'INSERT INTO posts (title, description, date_posted, user_id) VALUES(?, ?, ?, ?)';

    connection.query(query, [title, description, date, user_id], (err, result) => {
        if (err) {
            console.log('There was an error posting the blog');
            res.status(500).json({ message: 'There was an error posting the blog' });
        }
        else {
            res.status(201).json({ message: 'Successful' });
        }

    });

    dbconnection.closeConnection();
}