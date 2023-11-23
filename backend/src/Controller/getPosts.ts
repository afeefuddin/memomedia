import { Request, Response } from "express"
import { getPostFromDb } from "../Database/PostHandler";

async function getPosts(req:Request,res:Response){
    console.log("Hello")
    try{
        const pos : number = Number(req.query.pos);
        const size: number = Number(req.query.size);
        const posts = await getPostFromDb(pos,size);
        if(posts===null){
            res.sendStatus(204);
            return;
        }
        res.status(200).json(posts);
    }
    catch(error){
        res.sendStatus(500);
    }
}
export {getPosts};