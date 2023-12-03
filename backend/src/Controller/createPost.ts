import { Request, Response } from "express";
import { addPostinDB } from "../Database/PostHandler";
import uploadImagetoCloudinary from "../Utils/Cloudinary";

async function createPost(req: Request,res:Response){
    try{
        const postBody= req.body;
        // Add Post to cloudinary
        const file = req.file.path;
        const img_url = await uploadImagetoCloudinary(file);
        console.log(postBody)
        console.log(img_url);
        // Added the post
        const postBodyModified = {
            caption : postBody.caption,
            picture : img_url,
            userId : postBody.userId,
        }
        console.log(postBodyModified);
        const Post = await addPostinDB(postBodyModified);
        // Adding the Id of the post in the user profile
       
        if(Post){
            res.sendStatus(201);
        }
        else{

            res.status(500).json({error : "Error Creating the post"});
        }
        res.sendStatus(200)

    }
    catch(error){
        res.status(500).json({error : "Error Creating the post"});
    }
}
export {createPost};