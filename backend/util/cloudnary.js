import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDNARY_API_KEY, 
  api_secret: process.env.CLOUDNARY_API_SECRET
});

export const uploadToCloudinary = (fileBuffer, folderName, mimetype) => {
  return new Promise((resolve, reject) => {
    const isPdf = mimetype === 'application/pdf';

    const stream = cloudinary.uploader.upload_stream(
      {
        folder: folderName,
        resource_type: isPdf ? 'raw' : 'image',  
        use_filename: true,
        unique_filename: false,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    stream.end(fileBuffer);
  });
};
