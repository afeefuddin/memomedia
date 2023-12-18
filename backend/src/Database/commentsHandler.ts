import { Comment } from "../Model/CommentSchema";
import { IComment } from "../Interfaces/Interface";
import { getUserProfilePicfromDb } from "./userHandler";

async function addComment(comment : IComment){
    let pfp: string;
    try {
         const response =  await getUserProfilePicfromDb(String(comment.user)) 
         pfp = response.profilePic
    } catch (error) {
        
    }
    try{
        
        const newComment = new Comment({
            message : comment.message,
            post : comment.post,
            user : comment.user,
            username : comment.username,
            profilePic : pfp || 'https://res.cloudinary.com/dezzqucfl/image/upload/v1702646889/1000_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta_htpstb.jpg'
        })
        newComment.save();
        return newComment;
    }
    catch(error){
        console.log(error.message);
        return null;
    }
}
async function getCommentFromDB(commentId:string) {
    try {
        const comment = await Comment.findById(commentId).lean()
        if(comment)
            return comment
        else
            return null
    } catch (error) {
        return null
    }
}
async function getListofCommentsFromDb(commentIds:string[]) {
    try {
        const comments = await Comment.find({_id :{$in : commentIds}}).lean()
        return comments
    } catch (error) {
        return null
    }
}
export {addComment,getCommentFromDB,getListofCommentsFromDb}