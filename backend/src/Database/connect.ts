import mongoose from 'mongoose'

const MONGO_URL =  process.env.MONGODB_URL;
const dbName = process.env.DB_NAME;

const connectDB= async() : Promise<void> =>{
    try{
        await mongoose.connect(MONGO_URL, {
            dbName : dbName,
        });
        console.log("Database Connected")
    }
    catch(error){
        console.log(error.message);
    }
}

module.exports = {connectDB};