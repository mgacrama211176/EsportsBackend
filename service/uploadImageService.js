import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../connectFirebase.js";
import HttpSuccessCode from "../utils/HttpSuccssCodes.js";
import HttpErrorCode from "../utils/HttpErrorCodes.js";
import { v4 } from "uuid";

export const uploadService = async (
  storageLocation,
  files,
  request,
  response
) => {
  if (!files || files.length === 0) {
    throw new Error("No images found");
  }

  try {
    const downloadURLs = [];

    for (const file of files) {
      const imageRef = ref(
        storage,
        `${storageLocation}/${file.originalname}_${v4()}`
      );
      await uploadBytes(imageRef, file.buffer);
      const downloadURL = await getDownloadURL(imageRef);
      downloadURLs.push(downloadURL);
    }

    return downloadURLs;
  } catch (err) {
    return response.status(HttpErrorCode.BadRequest).json(err);
  }
};
