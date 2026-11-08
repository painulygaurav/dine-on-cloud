import cloudinary from "../config/cloudinary.config.js";

const uploadImage = (fileBuffer, folder = "profilepics") => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: folder }, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      })
      .end(fileBuffer);
  });
};

export default uploadImage;
