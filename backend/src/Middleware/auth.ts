import { Request, Response,NextFunction} from "express";
import Jwt , {verify} from "jsonwebtoken";

const secretKey = process.env.SECRET_AUTH_KEY;

 function generateWebTokens(username:string) {
    const token = Jwt.sign({username},secretKey);
    return token;
}

async function authenticateToken(token:string) {
    try{
        
        const verifyToken =  verify(token,secretKey);
        if(verifyToken){
            return true;
        }
        
    }
    catch(error){
        console.log(error.message);
        return false;
    }

}
async function authenticateUser(req:Request, res : Response,next : NextFunction) {
    let token = req.headers.authorization?.split(' ')[1];
    if(!token){
        res.sendStatus(403)
        return;
    }
    const isLoggedIn = await authenticateToken(token);
    if(!isLoggedIn){
        res.sendStatus(403);
        return;
    }
    else{
        console.log('Here');
        next();
        
    }
}
export {authenticateUser,generateWebTokens};