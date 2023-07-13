import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
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

export const getAllCarousel = async (request, response, next) => {
  //   response.status(HttpSuccessCode.OK).json({ message: `GG` });
  try {
    const carouselRef = ref(storage, "carousel");
    const carouselFiles = await listAll(carouselRef);
    const imageUrls = [];
    for (const item of carouselFiles.items) {
      const downloadURL = await getDownloadURL(item);
      imageUrls.push(downloadURL);
    }
    return response.status(HttpSuccessCode.OK).json({ imageUrls });
  } catch (err) {
    return response.status(HttpErrorCode.BadRequest).json(err);
  }
};
