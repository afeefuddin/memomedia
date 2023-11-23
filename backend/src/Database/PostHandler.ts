import { Post } from "../Model/PostSchema"
import { Ipost } from "../Interfaces/Interface";
import { addPostToUser } from "./userHandler";

// Get N posts from DB for the feed
async function getPostFromDb(page:number,pageSize:number){
    try{
        const Posts = await Post.find().sort({date:1})
            .limit(pageSize)
            .skip((page)*pageSize)
            .exec();
            return Posts;
    }
    catch(error){
        console.log(error.message);
        return null;
    }
}

//create post of the user
async function addPostinDB(postBody: Ipost){
    console.log("reacherd");
    try{
        const curPost = new Post({
            caption: postBody.caption,
            pitcure: postBody.pitcure,
            userId: postBody.userId,
          });
          try{
              const PostInUser = await addPostToUser(curPost._id,postBody.userId);  
              if(!PostInUser){
                return false;
              } 
            }
            catch(error){
                return false;
            }
            curPost.save();
          return true;
    }
    catch(error){
        return false;
    }

}

export {getPostFromDb,addPostinDB}