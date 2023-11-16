import { Comment } from "Model/CommentSchema";
import { IComment } from "../Interfaces/Interface";

async function addComment(comment : IComment){
    try{
        const newComment = new Comment({
            message : comment.message,
            post : comment.post,
            user : comment.user
        })
        newComment.save();
        return true;
    }
    catch(error){
        console.log(error.message);
        return false;
    }
}
export {addComment}