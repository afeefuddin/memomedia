import { Request, Response } from "express";
import { addComment } from "../Database/commentsHandler";

async function createComment(req: Request,res:Response){
    try{
        const newComment = req.body;
        const comment = await addComment(newComment);
        if(comment){
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

export {createComment}