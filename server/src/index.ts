import express, { Request, Response } from "express";
import cors from 'cors';
import bodyParser from "body-parser";
import userRouter from "./routes/userRoutes";
import postRouter from "./routes/postsRoutes";
import tagRouter from "./routes/tagsRoutes";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello from Express')
});

app.use('/api', userRouter);
app.use('/api', postRouter);
app.use('/api', tagRouter);

app.listen(process.env.DEV_PORT, () => {
    console.log(`Server is running on port ${process.env.DEV_PORT}`);
});