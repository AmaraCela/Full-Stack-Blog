import DatabaseConnection from "../database/DatabaseConnection";
import { Request,Response } from "express";

function getPosts(req:Request, res:Response):void{
    const dbconnection = new DatabaseConnection();
    const connection = dbconnection.getConnection();
    const query = `SELECT * FROM posts`;
    connection.query(query,(err,results)=>{
        if(err)
        {
            console.log("An error occurred when retrieving data");
            res.status(500).json({error:'Internal server error'});
        }
        else{
            res.json(results);
        }
    });
    dbconnection.closeConnection();
    
}

module.exports = {getPosts};