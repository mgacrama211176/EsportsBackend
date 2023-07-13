import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  deleteObject,
} from "firebase/storage";
import { storage } from "../connectFirebase.js";
import HttpSuccessCode from "../utils/HttpSuccssCodes.js";
import HttpErrorCode from "../utils/HttpErrorCodes.js";
import { v4 } from "uuid";
import multer from "multer";
import { uploadService } from "../service/uploadImageService.js";

// Create a multer instance with appropriate configuration
const upload = multer();

export const postCarousel = async (request, response, next) => {
  upload.single("imageUpload")(request, response, async (error) => {
    await uploadService("carousel", request.file, request, response);
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

export const deleteImageFromCarousel = async (request, response, next) => {
  const { imageUrl } = request.body;

  try {
    // Get the reference to the image in Firebase Storage
    const imageRef = ref(storage, imageUrl);

    // Delete the image
    await deleteObject(imageRef);

    return response
      .status(HttpSuccessCode.OK)
      .json({ message: "Image deleted successfully" });
  } catch (err) {
    return response.status(HttpErrorCode.BadRequest).json(err);
  }
};
