import { Request, Response } from "express";
import { isValidDetails,getUserDatafromDB, getUserProfilePicfromDb, updateProfilePicInDB } from "../Database/userHandler";
import { generateWebTokens } from "../Middleware/auth";
import { getIfUserHasLiked, getusersPostFromDb } from "../Database/PostHandler";
import uploadImagetoCloudinary from "../Utils/Cloudinary";

async function loginUser(req:Request,res:Response) {
  try{
    const loginData = req.body;
    console.log(loginData.password)
    console.log('here')
    let isCorrect: any = await isValidDetails(loginData);
    if(!isCorrect){
        res.sendStatus(401);
        return;
    }

    const {
        _id,
        username,
        email,
        profilePic,
        post,
        follower,
        following,
        accountCreated,
      } = isCorrect;
    
      const dataToSend = {
        _id,
        username,
        email,
        profilePic,
        post,
        follower,
        following,
        accountCreated,
      };
    

    const token = generateWebTokens(loginData.username);
    res.status(200).json({auth : token, userData : dataToSend });
    }
    catch(error){
      console.log(error.message)
      res.status(500).json({error})
    }
}

async function userHasLiked(req:Request, res:Response){
  const userId = req.headers.userid;
  const postId = req.headers.postid;
  console.log(userId + "yes")
  if(!userId || !postId){
    res.sendStatus(401);
        return;
  }
  const hasLiked = await getIfUserHasLiked(userId,postId);
  if(hasLiked){
    res.status(200).json({isLiked : true});
  }
  else{
    res.status(200).json({isLiked : false});
  }
}

async function getUserDetails(req:Request,res:Response) {
    const username = req.params.username;
    console.log(username)
    try{
      const response =  await getUserDatafromDB(username);
      if(response){

        const {
          _id,
          username,
          email,
          profilePic,
          post,
          follower,
          following,
          accountCreated,
        } = response;
      
        
        try{
          const PostsData = await getusersPostFromDb(post);
          if(PostsData){
            const dataToSend = {
              _id,
              username,
              email,
              profilePic,
              PostsData,
              follower,
              following,
              accountCreated,
            };

            res.status(200).json({dataToSend});
          }
          else{
            res.sendStatus(404);
          }
        }
        catch(error){
          res.status(404).json({"Error":"Fetching the posts"});
          return
        }


      }
      else{
        res.status(404).json({'error' : 'user not found' });
        
      }
    }
    catch{
      res.sendStatus(404);
    }
}
async function getUserProfilePic(req:Request,res:Response){
  try {
    const {userId} = req.body
    const data = await getUserProfilePicfromDb(userId);
    res.status(200).json(data)
  } catch (error) {
    res.status(404).json({error})
  }
}

async function updateProfile(req:Request,res:Response){
  try {
    console.log('here')
    const profileBody = req.body;
  
    const username:  string = req.headers.username as string
    //Add picture to cloudinary
    const file = req.file.path
    const img_url = await uploadImagetoCloudinary(file)
    // const img_url = "Hello"
    const pfp = await updateProfilePicInDB(img_url,username)
    if(pfp){
      res.status(200).json({"message":"Successfully Updated"})
    }
    else{
      res.sendStatus(500)
    }
    
  } catch (error) {
    res.sendStatus(500)
  }
}

export {loginUser,userHasLiked,getUserDetails,updateProfile};