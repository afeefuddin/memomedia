import express, {Application} from 'express';
// import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import {connectDB} from './Database/connect';
import { router } from './Routes/routes';


const app : Application = express();

// app.use(cors);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let port = 8000;
connectDB();

app.use('/api',router);

app.listen(port,()=>{
    console.log(`Started the server on port ${port}`)
})