import { Request, Response } from "express";
import { addUser, isUserPresent } from "../Database/userHandler";
import { hashPassword } from "../Middleware/hashPassword";
import axios from "axios";

async function sendOTP(req:Request,res : Response) {
    try {
        let userData =req.body;
        if(!userData.email || !userData.username ){
            res.status(422).json({error: "Please Fill the details Correctly"});
            return;
        }
        const checkIfUserExist = await isUserPresent(userData)
        if(checkIfUserExist){
            res.status(422).json({error : "Username or Email Already In Use!"});
            return;
            
        }
        //send the otp
        const otp_Service = process.env.OTP_SERVICE_URL
        const apiKey = process.env.OTP_SERVICE_API_KEY
        const password = process.env.OTP_SERVICE_APP_PASSWORD

        const sendOTP = await axios.post(otp_Service + 'sendOTP',{
            email : userData.email,
            password : password
        },
        {
            params : {
                apiKey : apiKey
            }
        })
        if(sendOTP.status!==200){
            res.status(500).json({error : 'Internal Server Error!'})
            return;
        }
        //
        res.status(200).json({'status':'OTP Sent to the Email'})
    } catch (error) {
        res.status(500).json({error : 'Internal Server Error!'})
    }
}

async function createUser(req:Request,res:Response){
    try{
        let userData = req.body;
        console.log(userData)
        console.log(userData)
        if(!userData.email || !userData.username || !userData.password  ){
            res.status(422).json({error: "Please Fill the details Correctly"});
            return;
        }
        //verify the otp
        // const otp_Service = process.env.OTP_SERVICE_URL
        // const apiKey = process.env.OTP_SERVICE_API_KEY
        // const sendOTP = await axios.post(otp_Service + 'verifyOTP',{
        //     email : userData.email,
        //     otp : userData.Otp
        // },
        // {
        //     params : {
        //         apiKey : apiKey
        //     }
        // })
        // if(sendOTP.status===401){
        //     res.status(401).json({error : 'Incorrect OTP'})
        //     return;
        // }   
        // if(sendOTP.status!==200){
        //     res.status(403).json({error : 'Incorrect OTP or OTP Expired'})
        //     return;
        // }

        //if verified
        userData.password = await hashPassword(userData.password);

        const newUser = await addUser(userData);
        if(newUser){
            res.sendStatus(200);
        }
        else{
            res.sendStatus(500);
        }
    }
    catch(error){
        console.log(error.message);
        if(error.response.status===401)
        res.status(401).json({error : "Incorrect OTP"});
        else{
            res.status(403).json({error : "Incorrect OTP or OTP expired"});
        }
    }


}

export { createUser,sendOTP}