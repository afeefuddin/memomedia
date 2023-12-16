import { Post } from "../Model/PostSchema"
import { Ipost } from "../Interfaces/Interface";
import { addPostToUser, getUserProfilePicfromDb } from "./userHandler";
import { Types } from "mongoose";

// Get N posts from DB for the feed
async function getPostFromDb(page:number,pageSize:number){
    try{
        let Posts = await Post.find().sort({date:-1})
            .limit(pageSize)
            .skip((page)*pageSize)
            .lean()
            .exec();
            console.log(Posts)
            const allPost = []
            for(let i=0;i<Posts.length;i++){
                let post = Posts[i];
                const pfp = await getUserProfilePicfromDb(post.userId.toString())
                const curPost = {
                    ...post,
                    profilePic : pfp.profilePic
                }
                allPost.push(curPost)
                
            }
            console.log(allPost)
            return allPost;
    }
    catch(error){
        console.log(error.message);
        return null;
    }
}

//Get the size of post in the db 
async function getSizeofPost() {
    
    try{
        const size = await Post.countDocuments();
        return size;
    }
    catch(error){
        console.log(error)
    }
}

//Get a list of post from db for profile page
async function getusersPostFromDb(postList:any){
    try{
       const Posts=  Post.find({ _id: { $in: postList } });
       return Posts
    }
    catch(error){
        console.log(error.message);
        return null;
    }
}


//create post of the user
async function addPostinDB(postBody: Ipost){
    console.log(postBody);
    try{
        const curPost = new Post({
            caption: postBody.caption,
            picture: postBody.picture,
            userId: postBody.userId,
            username : postBody.username,
            date : Date.now()
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
//add like to the post
async function addLikeInthePost(postId:string,userId:string) {
    try{
        const hasLiked = await getIfUserHasLiked(userId,postId);
        if(hasLiked){
            return removeLikeInthePost(postId,userId)
        }
    }
    catch(error){
        return false;
    }
    try{
        const post = await Post.findByIdAndUpdate(
            postId,
            {$push : {likes : userId}},
        )
            console.log(post);
    }
    catch(error){
        return false;
    }
    return true;
}
async function removeLikeInthePost(postId:string,userId:string) {
    try{
        const post = await Post.findByIdAndUpdate(
            postId,
            {$pull : {likes : userId}},
        )

    }
    catch(error){
        return false;
    }
    return true;
}
//has user liked a particular post
// we will search userId the post liked array


async function getIfUserHasLiked(userId: any, postId: any) {
    try {
    console.log(userId);
    console.log(postId);

    const post = await Post.findOne({ _id: postId, likes: { $in: [userId] } });

    if (post) {
      console.log(`User with ID ${userId} has liked this post.`);
      return true;
    } else {
      console.log(`User with ID ${userId} has not liked this post.`);
    }
      console.log('Documents matching the search:');
    } catch (error) {
      console.error('Error executing the query:' );
    }
  
    return false;
  }

export {getPostFromDb,getSizeofPost,addPostinDB,getIfUserHasLiked,addLikeInthePost,getusersPostFromDb}