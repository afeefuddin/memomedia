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
})

const Comment = mongoose.model<IComment>('Comment', CommentSchema);

export { Comment };