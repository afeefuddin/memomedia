import { Types } from "mongoose";

interface IComment {
    message : string;
    post : Types.ObjectId;
    user : Types.ObjectId;
    date : number;
    username : string;
    profilePic? : string;
    likes : Types.ObjectId[];
}
interface Ipost {
    caption : string;
    picture : string;
    userId : Types.ObjectId;
    username : string
    date? : number;
    likes? : Types.ObjectId[];
    comments? : Types.ObjectId[];
    profilePic? : string

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
interface Iloginuser {
    username : string;
    password : string;
}

export {IComment,Ipost,Iuser,Inewuser,Iloginuser};