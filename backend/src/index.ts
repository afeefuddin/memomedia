import express, {Application, NextFunction} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import {connectDB} from './Database/connect';
import { router } from './Routes/routes';
import { authenticateUser } from './Middleware/auth';
import { authRouter } from './Routes/authRouter';
import { errorHandler } from './Middleware/error';


const app : Application = express();

app.use(cors({
  origin:'*'
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let port = 8000;
connectDB();

app.get('/cron',(req,res)=>{
  res.status(200).json({'message':'Hello cron'})
})

app.use('/api',router);

app.use(authenticateUser);

app.use('/api',authRouter);

app.use(errorHandler);

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
  });
app.listen(port,()=>{
    console.log(`Started the server on port ${port}`)
})