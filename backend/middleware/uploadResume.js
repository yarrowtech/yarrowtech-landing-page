import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "resumes",
      resource_type: "raw",
      public_id: `${Date.now()}-${file.originalname}`,
      format: file.originalname.split(".").pop(),
    };
  },
});

const uploadResume = multer({ storage });

export default uploadResume;
