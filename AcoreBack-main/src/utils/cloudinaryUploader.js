

import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

export const uploadStream = (fileBuffer, folder = "hr_app/avatars") => {
  return new Promise((resolve, reject) => {
    try {
      if (!fileBuffer) {
        return reject(new Error("No file buffer received."));
      }

      const upload = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: "auto", 
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary Stream Error:", error);
            return reject(error);
          }
          resolve(result);
        }
      );
      streamifier.createReadStream(fileBuffer).pipe(upload);
    } catch (err) {
      console.error("Cloudinary Upload Exception:", err);
      reject(err);
    }
  });
};
