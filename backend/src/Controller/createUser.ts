import { Request, Response } from "express";
import { addUser } from "../Database/userHandler";
import { hashPassword } from "../Middleware/hashPassword";

async function createUser(req:Request,res:Response){
    try{
        let userData = req.body;
        userData.password = await hashPassword(userData.password);
        const newUser = await addUser(userData);
        if(newUser){
            res.sendStatus(200);
        }
        else{
            res.sendStatus(500);
        }
    }
    catch(error){
        console.log(error.message);
        res.sendStatus(500);
    }


}

export { createUser}