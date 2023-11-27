import { Request, Response } from "express";
import { isValidDetails } from "../Database/userHandler";
import { generateWebTokens } from "../Middleware/auth";
import { getIfUserHasLiked } from "../Database/PostHandler";

async function loginUser(req:Request,res:Response) {
    const loginData = req.body;
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

async function userHasLiked(req:Request, res:Response){
  const userId = req.headers.userid;
  const postId = req.headers.postid;
  console.log(userId)
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
export {loginUser,userHasLiked};