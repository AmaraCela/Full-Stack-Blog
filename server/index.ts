import { Request, Response } from "express";
const express = require('express');
const app = express();

const port = 5000;

app.get('/', (req:Request,res:Response)=>{
    res.send('Hello from Express')
})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})