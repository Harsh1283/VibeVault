import 'dotenv/config'
import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_SECRET
})



const uploadCloudinary=async(localpath) =>{
    try {
        if(!localpath) return null
        //upload
         const response=await cloudinary.uploader.upload(localpath,{
            resource_type:"auto"
        })
        console.log("file has been uploaded",response.url);
         await fs.promises.unlink(localpath);
        return response
        
    } catch (error) {
        console.error("❌ Cloudinary upload failed:", error);
        
         try {
        await fs.promises.unlink(localpath);
         } 
         catch (unlinkErr) {
      console.error("⚠️ Failed to delete local file:", unlinkErr);
    }
        return null
    }
}

const uploadBufferToCloudinary = (fileBuffer, folder, resourceType = 'auto') =>
  new Promise((resolve, reject) => {
    if (!fileBuffer) return reject(new Error('No file buffer provided'));

    const uploadStream = cloudinary.uploader.upload_stream(
      { folder, resource_type: resourceType },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    uploadStream.end(fileBuffer);
  });
export {
    uploadCloudinary,
    uploadBufferToCloudinary
}