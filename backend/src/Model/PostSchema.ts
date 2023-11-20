import mongoose, { Schema, Types } from "mongoose";
import { Ipost } from "../Interfaces/Interface";


const PostSchema = new mongoose.Schema<Ipost>({
    caption : {
        type: String,
        required : false,
        default: ""
    },
    pitcure : {
        type: String,
        required : true,
    },
    date :{
        type : Number,
        default : Date.now()
    },
    userId : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required: true,
    },
    likes : [{
        type : Schema.Types.ObjectId,
        ref : 'User',
        required: true
    }],
    comments : [{type : Schema.Types.ObjectId, ref : 'Comment'}],
})

const Post = mongoose.model<Ipost>('Post',PostSchema);

export {Post};