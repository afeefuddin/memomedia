import { Request, Response,NextFunction, json} from "express";
import Jwt , {verify,JwtPayload} from "jsonwebtoken";

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

function isJwtPayload(obj: any): obj is JwtPayload {
    return 'sub' in obj;
  }
async function isUser(req:Request, res : Response,next : NextFunction){
    let token = req.headers.authorization?.split(' ')[1];
    if(!token){
        res.sendStatus(403)
        return;
    }
    const verifyToken = verify(token,secretKey,(err, decoded)=>{
        if (err) {
            return res.status(401).json({ error: 'Unauthorized - Invalid token' });
          }
          let decodedusername = ''
          if (!isJwtPayload(decoded)) {
             decodedusername = JSON.parse(JSON.stringify(decoded)).username;
           
          }
          else{
              decodedusername= decoded.username
          }
          if(decodedusername===req.headers?.username){
            next()
            return
          }
          res.sendStatus(404)
    })
   
}

export {authenticateUser,generateWebTokens,isUser};