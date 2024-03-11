import express, { Request, Response } from "express";
import cors from 'cors';
import bodyParser from "body-parser";
import userRouter from "./routes/userRoutes";
import postRouter from "./routes/postsRoutes";
import tagRouter from "./routes/tagsRoutes";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const uploadPath = path.join(__dirname, '../uploads');
app.use('/uploads', express.static(uploadPath));

app.get('/', (req: Request, res: Response) => {
    res.send('Hello from Express')
});

app.use('/api', userRouter);
app.use('/api', postRouter);
app.use('/api', tagRouter);

app.listen(process.env.DEV_PORT, () => {
    console.log(`Server is running on port ${process.env.DEV_PORT}`);
});