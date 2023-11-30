import { Request, Response } from "express";
import { isValidDetails,getUserDatafromDB } from "../Database/userHandler";
import { generateWebTokens } from "../Middleware/auth";
import { getIfUserHasLiked, getusersPostFromDb } from "../Database/PostHandler";

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

export {loginUser,userHasLiked,getUserDetails};