import { Request, Response } from "express";
import { addComment, getCommentFromDB, getListofCommentsFromDb } from "../Database/commentsHandler";
import { insertCommentToThePost } from "../Database/PostHandler";

async function createComment(req: Request,res:Response){
    try{

        const newComment = req.body;
        const comment = await addComment(newComment);

        if(comment){
            const response = await insertCommentToThePost(String(comment._id),newComment.post)
            if(response){

                res.sendStatus(200);
            }
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

async function getComment(req:Request,res:Response) {
    try {
        const {commentId} = req.body
        const Comment = await getCommentFromDB(commentId)
        if(Comment){
            res.status(200).json(Comment)
        }
        else{
            res.status(404).json({'Error':'Invalid Comment ID'})
        }
    } catch (error) {
        res.status(404).json({'Error':'Invalid Comment ID'})
    }
}
async function getAllComment(req:Request,res:Response) {
    try {
        const commentIds = req.body.comments
        const Comment = await getListofCommentsFromDb(commentIds)
        res.status(200).json(Comment)
    } catch (error) {
        res.status(404).json({"Error":"Unable to find Comments"})

    }
}

export {createComment,getComment,getAllComment}