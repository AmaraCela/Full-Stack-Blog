import DatabaseConnection from "../database/DatabaseConnection";
import { Request, Response } from "express";

export function profile(req: Request, res: Response): void {
    const dbconnection = new DatabaseConnection();
    const connection = dbconnection.getConnection();

    const  user_id  = req.query.user_id;
    console.log(user_id);

    if (!user_id) {
        res.status(400).json({ message: 'User ID is required in the query parameters.' });
        return;
    }

    const query = `
    SELECT
      u.user_id,
      u.username,
      u.email,
      p.post_id,
      p.title,
      p.description,
      p.date_posted,
      t.tag_id,
      t.tag_name
    FROM
      users u
      LEFT JOIN posts p ON u.user_id = p.user_id
      LEFT JOIN post_tags pt ON p.post_id = pt.post_id
      LEFT JOIN tags t ON pt.tag_id = t.tag_id
    WHERE
      u.user_id = ?;
  `;
    
    connection.query(query, [user_id], (err, result) => {
        if(err) {
            console.log('There was an error retrieving the user profile.', err);
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