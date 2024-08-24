import express, { Express, Request, Response } from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './routes/routes';

dotenv.config();

const app: Express = express();
const mongoString: string | undefined = process.env.DATABASE_URL
mongoose.connect(mongoString ?? '');
const database = mongoose.connection;

database.on('error', (error: Error) => {
  console.log(error);
})
database.once('connected', () => {
  console.log('Database Connected');
})

app.use(express.json());
app.use('/api', router);

app.get("/", (req: Request, res: Response) => {
 res.status(200).json("Hello from the server!!!");
});

app.listen(4000, () => {
 console.log(`App is listening on port 4000`);
});
