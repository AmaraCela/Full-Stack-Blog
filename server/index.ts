import { Request, Response } from "express";
const express = require('express');
const cors = require('cors');

const app = express();

const postsController = require("./controllers/postsController");
const signupController = require("./controllers/signupController");
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(cors());

const port = 5000;

app.get('/', (req:Request,res:Response)=>{
    res.send('Hello from Express')
})

app.get('/api/posts', postsController.getPosts);

app.post('/api/signup', signupController.signup);

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})