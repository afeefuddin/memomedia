import mongoose, { Schema, Types } from "mongoose";
import { IComment } from "../Interfaces/Interface";

const CommentSchema = new mongoose.Schema<IComment>({
    message : {
        type: String,
        required : true,
    },
    post : {
        type : Schema.Types.ObjectId,
        ref : 'Post'
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    date : {
        type : Number,
        default : Date.now()
    },
    likes : {
        type : [{type : Schema.Types.ObjectId, ref : 'User'}],
    },
    username : {
        type : String,
        required : true,

    },
    profilePic : {
        type : "String",
        default : 'https://res.cloudinary.com/dezzqucfl/image/upload/v1702646889/1000_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta_htpstb.jpg'
    }
})

const Comment = mongoose.model<IComment>('Comment', CommentSchema);

export { Comment };