import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../connectFirebase.js";
import HttpSuccessCode from "../utils/HttpSuccssCodes.js";
import HttpErrorCode from "../utils/HttpErrorCodes.js";
import { v4 } from "uuid";

export const uploadService = async (
  storageLocation,
  file,
  request,
  response
) => {
  if (!file) {
    throw new Error("No image found");
  }

  try {
    const imageRef = ref(
      storage,
      `${storageLocation}/${file.originalname}_${v4()}`
    );
    const info = await uploadBytes(imageRef, file.buffer);
    const downloadURL = await getDownloadURL(imageRef);
    return response
      .status(HttpSuccessCode.Accepted)
      .json({ imageUrl: downloadURL, info });
  } catch (err) {
    return response.status(HttpErrorCode.BadRequest).json(err);
  }
};
