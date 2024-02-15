import DatabaseConnection from "../database/DatabaseConnection";
import { Request, Response } from "express";

export function login(req:Request, res:Response):void
{
    const dbconnection = new DatabaseConnection();
    const connection = dbconnection.getConnection();

    const {username, password} = req.body;

    const query = 'SELECT user_id, username, email FROM users WHERE username= ? AND password= ?'

    connection.query(query,[username,password],(err,result)=>{
        if(err)
        {
            console.log("There was an error retireving the user: ",err);
            res.status(500).json({message:"Could not retrieve user"});
        }
        else
        {
            console.log(result);
            res.status(201).json({user:result});
        }
    })
    dbconnection.closeConnection();
}
