import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../connectFirebase.js";
import HttpSuccessCode from "../utils/HttpSuccssCodes.js";
import HttpErrorCode from "../utils/HttpErrorCodes.js";
import { v4 } from "uuid";
import multer from "multer";

// Create a multer instance with appropriate configuration
const upload = multer();

export const carousel = async (request, response, next) => {
  upload.single("imageUpload")(request, response, async (error) => {
    if (error) {
      return response.status(HttpErrorCode.BadRequest).json(error);
    }

    const { file } = request;
    console.log(file); // Check if the file is properly received

    if (!file) {
      return response
        .status(HttpSuccessCode.OK)
        .json({ message: "No Image Added!" });
    }

    try {
      const imageRef = ref(storage, `carousel/${file.originalname}_${v4()}`);
      const info = await uploadBytes(imageRef, file.buffer);

      // Get the download URL of the uploaded file
      const downloadURL = await getDownloadURL(imageRef);

      return response
        .status(HttpSuccessCode.Accepted)
        .json({ imageUrl: downloadURL, info });
    } catch (err) {
      return response.status(HttpErrorCode.BadRequest).json(err);
    }
  });
};
