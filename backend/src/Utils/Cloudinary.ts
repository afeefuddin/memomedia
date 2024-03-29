import {v2 as cloudinary} from 'cloudinary';
import { response } from 'express';
import fs from "fs"

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

async function uploadImagetoCloudinary(localFilePath: string){
    try{
        if(!localFilePath) return;
        const res = await cloudinary.uploader.upload(localFilePath);
        fs.unlinkSync(localFilePath);
        return res.url;

    }
    catch(error){
        fs.unlinkSync(localFilePath);
        return null;
    }
}

async function deleteImagefromCloudinary(publicId:string) {
    try {
        if(!publicId) return
        const res =  await cloudinary.uploader.destroy(publicId)
        return true
    } catch (error) {
        console.log("Error deleting the Image");
        return false;
    }
}

export {deleteImagefromCloudinary}
export default uploadImagetoCloudinary;