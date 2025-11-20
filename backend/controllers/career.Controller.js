// import Career from "../models/Career.js";

// export const submitCareer = async (req, res) => {
//   try {
//     const data = await Career.create({
//       ...req.body,
//       userId: req.user.userId,
//       resumeUrl: req.file?.path || null,
//       resumeName: req.file?.originalname || null,
//     });

//     res.json({ message: "Career application submitted", data });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
















import cloudinary from "../utils/cloudinary.js";
import Career from "../models/Career.js";

export const submitCareer = async (req, res) => {
  try {
    let resumeUrl = null;
    let resumeName = null;

    // Upload file to cloudinary
    if (req.file) {
      const uploaded = await cloudinary.uploader.upload_stream(
        {
          folder: "resumes",
          resource_type: "raw"
        },
        async (error, result) => {
          if (error) {
            return res.status(500).json({ message: "Upload failed", error });
          }

          resumeUrl = result.secure_url;
          resumeName = req.file.originalname;

          const data = await Career.create({
            ...req.body,
            userId: req.user.userId,
            resumeUrl,
            resumeName
          });

          return res.json({ message: "Career application submitted", data });
        }
      );

      // pipe buffer
      uploaded.end(req.file.buffer);
    } else {
      return res.status(400).json({ message: "Resume is required" });
    }

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
