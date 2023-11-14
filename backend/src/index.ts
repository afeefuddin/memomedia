import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let port = 8000;

app.listen(port,()=>{
    console.log(`Started the server on port ${port}`)
})