import { Request, Response } from "express";
import { addPostinDB } from "../Database/PostHandler";

async function createPost(req: Request,res:Response){
    try{
        const postBody= req.body;
        //Added the post
        const Post = await addPostinDB(postBody);
        //Adding the Id of the post in the user profile
       
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