import mongoose, { Schema, Types } from "mongoose";
import {Iuser} from '../Interfaces/Interface'

const UserSchema = new mongoose.Schema<Iuser>({
    username:{
        type: String,
        required : true,
    },
    password:{
        type: String,
        required : true,
    },
    email : {
        type : String,
        required :  true,
    },
    profilePic : {
        type : String,
        default : 'BlahBlah',
    },
    post : [{
        type : Schema.Types.ObjectId ,
        ref : 'Post',
    }],
    follower : [{
        type : Schema.Types.ObjectId,
        ref : 'User',
    }],
    following : [{
        type : Schema.Types.ObjectId,
        ref : 'User',
    }],
    accountCreated : {
        type : Number,
        default : Date.now(),
    }
})

const User = mongoose.model<Iuser>('User',UserSchema);

export {User};