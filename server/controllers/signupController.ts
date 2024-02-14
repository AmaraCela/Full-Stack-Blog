import DatabaseConnection from "../database/DatabaseConnection";
import { Request, Response } from "express";
export function signup(req:Request, res:Response):void
{
    const dbconnection = new DatabaseConnection();
    const connection = dbconnection.getConnection();
    const {username, email, password} = req.body;
    
    const query = `INSERT INTO users (username,email,password) VALUES(?,?,?)`;
    connection.query(query,[username,email,password], (err,result)=>{
        if(err)
        {
            console.log("There was an error signing up the user",err);
            res.status(500).json({message:"Registration unsuccessful"});
        }
        else
        {
            res.status(201).json({message:"User registered successfully"});
        }
    })
    dbconnection.closeConnection();
}