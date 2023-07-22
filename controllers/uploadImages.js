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
import { uploadService } from "../service/uploadImageService.js";

// Create a multer instance with appropriate configuration
import { upload } from "../middleware/uploads.js";

// Call the upload function to get the multer instance
const multerUpload = upload();

export const postCarousel = async (request, response, next) => {
  multerUpload.array("imageUploads")(request, response, async (error) => {
    if (error) {
      return response.status(HttpErrorCode.BadRequest).json(error);
    }

    try {
      const uploadedImages = await uploadService(
        "carousel",
        request.files,
        request,
        response
      );

      // Respond with an array of the uploaded image URLs
      response.status(HttpSuccessCode.OK).json({ imageUrls: uploadedImages });
    } catch (err) {
      // If there is an error during the `uploadService`, handle it here
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
