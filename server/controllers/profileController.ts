import DatabaseConnection from "../database/DatabaseConnection";
import { Request, Response } from "express";

export function profile(req: Request, res: Response): void {
    const dbconnection = new DatabaseConnection();
    const connection = dbconnection.getConnection();

    const  user_id  = req.query.user_id;

    if (!user_id) {
        res.status(400).json({ message: 'User ID is required in the query parameters.' });
        return;
    }

    const query = 'SELECT user_id, username, email FROM users WHERE user_id = ?';

    connection.query(query, [user_id], (err, result) => {
        if(err) {
            console.log('There was an error retrieving the user profile.');
            res.status(500).json({ message: 'There was an error retrieving the user profile.'})
        } 
        else if(result.length === 0) {
            res.status(401).json({ message: 'User not found.' });
        }
        else{
            res.status(200).json({ user: result });
        }
    });
    dbconnection.closeConnection();
}