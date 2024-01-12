import { User } from "../Model/UserSchema";
import { Iloginuser, Inewuser, Iuser } from "../Interfaces/Interface";
import { comparePassword } from "../Middleware/hashPassword";
import mongoose, { Document, Types } from "mongoose";
import { deleteImagefromCloudinary } from "../Utils/Cloudinary";


async function addUser(userData :Inewuser){
    try{
        let pfpUrl = ''
        if(userData.profilePic){
            pfpUrl = 'https://res.cloudinary.com/dezzqucfl/image/upload/v1702646889/1000_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta_htpstb.jpg'
        }
        else{
            pfpUrl = 'https://res.cloudinary.com/dezzqucfl/image/upload/v1702646889/1000_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta_htpstb.jpg' 
        }
        const newUser = new User({
            username : userData.username,
            password : userData.password,
            email : userData.email,
            profilePic : pfpUrl,
        })
        newUser.save();
        return true;
    }
    catch(error){
        console.log(error.message);
        return false;
    }
}
async function isUserPresent(userData:Inewuser){
    if(!userData.email || !userData.username){
        return true;
    }
    const email = userData.email;
    const username = userData.username;
    const isPresent  = await User.findOne({$or : [{email:email},{username:username}]})
    if(isPresent){
        return true;
    }
    return false;
}

async function isValidDetails(userData: Iloginuser)  {
    const username = userData.username;
    const password = userData.password;
    const res = await User.findOne({username:username});
    const hashedValue = res.password;
    const isCorrect = await comparePassword(password,hashedValue)
    if(isCorrect){
        return res;
    }
    return null;

}

async function  addPostToUser(postID:Types.ObjectId,userId:Types.ObjectId) {
    try{

        const insert = await User.updateOne(
            {_id:userId},
            {$push:{post:postID}}
        )
        return true
    }
    catch(error){
        return false
    }
}
async function getUserDatafromDB(username:string) {
    try{
        console.log(username)
        const res =  await User.findOne({username : username});
        return res;
    }
    catch(error){
        return null;
    }
}
async function getUserProfilePicfromDb(userId : string) {
    try {
        console.log(userId+"here")
        const res = await User.findById(userId).select('profilePic')
        return res
    } catch (error) {
        return null
    }
}

async function updateProfilePicInDB(img_url:string,username:string) {
    try {
        const user = await User.findOne({username : username})
        const old_url=user.profilePic
        
        let publicIdSplit = old_url?.split('/')
        let publicId = publicIdSplit[publicIdSplit.length-1]
        publicId = publicId?.split('.')[0]
        user.profilePic = img_url 
        await user.save()
        console.log(publicId);
        //delete the old url from public id here
        const deleted = await deleteImagefromCloudinary(publicId)
        return true
        
    } catch (error) {
        console.log(error)
    }
    return false
}

async function searchUsersFromDB(value:String) {
    try {
        const query = {username : {$regex : value}}
        const data = await User.find(query,{password:0});
        if(data){
            return data;
        }
        return null;
    } catch (error) {
        return null;
    }
}

export {addUser, isUserPresent,isValidDetails,addPostToUser,getUserDatafromDB,getUserProfilePicfromDb,updateProfilePicInDB,searchUsersFromDB}