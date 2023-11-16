import { Request, Response } from "express";
import { addUser, isUserPresent } from "../Database/userHandler";
import { hashPassword } from "../Middleware/hashPassword";

async function createUser(req:Request,res:Response){
    try{
        let userData = req.body;
        if(!userData.email || !userData.username || !userData.password ){
            res.status(422).json({error: "Please Fill the details Correctly"});
            return;
        }
        //Checking if user already Exists
        const checkIfUserExist = await isUserPresent(userData)
        if(checkIfUserExist){
            res.status(422).json({error : "User Already Exists"});
            return;
            
        }
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