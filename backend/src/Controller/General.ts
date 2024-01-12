import { getUserDatafromDB } from "../Database/userHandler";
import { Request, Response } from "express";

async function loadDetails(req:Request,res:Response) {
    try {
        const username = req.params.username
        const data = await getUserDatafromDB(username)
        console.log(data)
        res.status(200).json({'profilePic':data.profilePic})
    } catch (error) {
        res.sendStatus(500)
    }
    
}

// async function searchUser(req:Request,res:Response) {
//     try {
//         const query = req.query
//         const data = await searchFromDB(id)
//         res.status(200).json({data})
//     } catch (error) {
//         res.status(500).json({'message' : 'Erro'})
//     }
// }

export {loadDetails}