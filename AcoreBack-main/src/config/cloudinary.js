
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config(); 


console.log("--- CLOUDINARY DEBUG ---");
console.log("API Key (from process.env):", process.env.CLOUDINARY_API_KEY); 
console.log("Cloud Name (from process.env):", process.env.CLOUDINARY_CLOUD_NAME);
console.log("--- END DEBUG ---");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});


// console.log("tets",cloud_name);

export default cloudinary;