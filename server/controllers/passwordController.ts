
import DatabaseConnection from "../database/DatabaseConnection";
import { Request, Response } from "express";

export function validateOldPassword(req:Request, res: Response){
    const dbconnection = new DatabaseConnection();
    const connection = dbconnection.getConnection();

    const {user_id, password} = req.body;

    const query = 'SELECT username FROM users WHERE user_id = ? AND password = ?';

    connection.query(query, [user_id, password], (error, result)=>
    {
        if(error)
        {
            res.status(501).json({message:"Could not find the user"});
        }
        else
        {
            if(result.length === 0)
            {
                res.status(501).json({message:"Could not find the user"})
            }
            else
            {
                res.status(201).json({message:"Password matches"});
            }
            
        }

    })  
    dbconnection.closeConnection();
}
