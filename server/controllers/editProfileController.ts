import DatabaseConnection from "../database/DatabaseConnection";
import { Request, Response } from "express";

export function editProfile(req:Request, res:Response)
{
    const dbconnection = new DatabaseConnection();
    const connection = dbconnection.getConnection();

    const {username,email,password,user_id} = req.body;

    const query = 'UPDATE users SET username = ?, email = ?, password = ? WHERE user_id = ?';
    connection.query(query, [username,email,password,user_id], (error,result)=>{
        if(error)
        {
            console.log("Could not edit the users information");
            res.status(500).json({message:"Could not update user"})
        }
        else
        {
            if(result.changedRows===1)
            {
                res.status(201).json({user:{
                    user_id:user_id,
                    username:username,
                    email:email
                }});
            }
            else
            {
                res.status(500).json({message:"Could not update user"})
            }
            
        }

    });
    dbconnection.closeConnection();
}
