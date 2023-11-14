import mongoose, { Schema } from "mongoose";

const PostSchema = new mongoose.Schema({
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
        type : String,
        default : new Date()
    },
    userId : {
        type : Schema.Types.ObjectId,
        ref : 'User',
    },
    likes : {
        type : Number,
        default: 0,
        required : false,
    },
    comments : [{type : Schema.Types.ObjectId, ref : 'Comment'}],
})

const Post = mongoose.model('Post',PostSchema);

module.exports = {Post};