import { Types } from "mongoose";

interface IComment {
    message : string;
    post : Types.ObjectId;
    user : Types.ObjectId;
}
interface Ipost {
    caption : string;
    pitcure : string;
    userId : Types.ObjectId;
    date? : number;
    likes? : number;
    comments? : Types.ObjectId[];

}
interface Iuser {
    username : string;
    password : string;
    email : string;
    post : Types.ObjectId[];
    follower : Types.ObjectId[];
    following : Types.ObjectId[];
    accountCreated : number;
    profilePic? : string;

}
interface Inewuser {
    username : string;
    password : string;
    email : string;
    profilePic? : string;
    accountCreated? : number;
}

export {IComment,Ipost,Iuser,Inewuser};