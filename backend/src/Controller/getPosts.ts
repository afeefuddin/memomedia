import { Request, Response } from "express"
import { getPostFromDb,getPostfromIdfromDB,getSizeofPost } from "../Database/PostHandler";

async function getPosts(req:Request,res:Response){
    console.log("Hello")
    try{
        const pos : number = Number(req.query.pos);
        const size: number = Number(req.query.size);
        const posts = await getPostFromDb(pos,size);
        const totalPost = await getSizeofPost();
        if(totalPost===undefined || totalPost===null){
            res.sendStatus(500);
            return;
        }

        if(posts===null){
            res.sendStatus(204);
            return;
        }
        let postLeft = totalPost-((pos+1)*size)
        res.status(200).json({posts,postLeft});
    }
    catch(error){
        res.sendStatus(500);
    }
}
async function getPostfromId(req:Request,res:Response){
    try {
        const id = req.params.postId;
        console.log(id)
        const post = await getPostfromIdfromDB(String(id))
        console.log(post)

        if(post!=null){
            res.status(200).json({post})
            return
        }
        res.status(404).json({'error' : 'Unable to find the post'})
    } catch (error) {
        res.status(500).json({'error': 'Internal Server Error'})
    }
}
export {getPosts,getPostfromId};