import {v2 as cloudinary} from "cloudinary";
import fs from "fs"


          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePAth) => {
  try{
   if(!localFilePAth) return nulll;
   //upload the file on cloudinary
   const response = cloudinary.uploader.upload(localFilePAth, {
    resource_type: "auto"
   })
   //file has been uploaded successfully
   console.log("file is uploaded on cloudinary", response.url);
   return response;

  }catch(error){
    fs.unlinkSync(localFilePAth) //remove the locally saved tempory file as a upload operation got failed
    return null;
  }
}

export {uploadOnCloudinary}

cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
{ public_id: "olympic_flag" }, 
function(error, result) {console.log(result); });