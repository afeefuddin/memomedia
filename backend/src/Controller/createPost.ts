import { Request, Response } from "express";
import { addPostinDB } from "../Database/PostHandler";

async function createPost(req: Request,res:Response){
    try{
        const postBody= req.body;
        const Post = await addPostinDB(postBody);
        if(Post){
            res.sendStatus(201);
        }
        else{

            res.status(500).json({error : "Error Creating the post"});
        }

    }
    catch(error){
        res.status(500).json({error : "Error Creating the post"});
    }
}
export {createPost};