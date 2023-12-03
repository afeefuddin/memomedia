import { Request, Response } from "express"
import { getPostFromDb,getSizeofPost } from "../Database/PostHandler";

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
export {getPosts};