import { Request, Response } from "express";
import { addLikeInthePost } from "../Database/PostHandler";

async function likePost(req:Request,res:Response) {
    const user = req.body;
    const postId = user.postId;
    const userId = user.userId;
    console.log(user);
    if(!userId || !postId){
        res.sendStatus(404);
        return;
    }
    try{
        const resp = await addLikeInthePost(postId,userId);
        if(resp){
            res.sendStatus(200);
        }
        else{
            res.sendStatus(500);
        }
    }
    catch{
        res.sendStatus(500);
    }
}
export {likePost}