import { Request, Response } from "express";
import { isValidDetails } from "../Database/userHandler";
import { generateWebTokens } from "../Middleware/auth";

async function loginUser(req:Request,res:Response) {
    const loginData = req.body;
    const isCorrect = await isValidDetails(loginData);
    if(!isCorrect){
        res.sendStatus(401);
        return;
    }
    const token = generateWebTokens(loginData.username);
    res.status(200).json({auth : token, userData : isCorrect });

}

export {loginUser};