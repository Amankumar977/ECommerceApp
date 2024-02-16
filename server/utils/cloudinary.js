import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function uploadOnCloudinary(filePath) {
  try {
    if (!filePath) {
      return null;
    }
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });
    return result.secure_url;
  } catch (error) {
    fs.unlinkSync(filePath);
    return null;
  }
}

export async function deleteImagefromCloudinary(imageUrl) {
  try {
    if (!imageUrl) {
      return;
    }
    const publicId = imageUrl.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.log("Error", error.message);
  }
}
