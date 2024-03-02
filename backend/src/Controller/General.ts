import { getUserDatafromDB } from "../Database/userHandler";
import { Request, Response } from "express";

async function loadDetails(req:Request,res:Response) {
    try {
        const username = req.params.username
        const data = await getUserDatafromDB(username)
        res.status(200).json({'profilePic':data.profilePic})
    } catch (error) {
        res.sendStatus(500)
    }
    
}

export {loadDetails}