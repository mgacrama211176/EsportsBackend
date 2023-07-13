import { ref, getDownloadURL, deleteObject } from "firebase/storage";
import { storage, db } from "../connectFirebase.js";
import HttpSuccessCode from "../utils/HttpSuccssCodes.js";
import HttpErrorCode from "../utils/HttpErrorCodes.js";

export const addTeams = async (request, response, next) => {
  const { teamBanner, teamLogo, teamName } = request.body;

  //   try {
  // Your code for uploading image to Firebase Storage

  // Get the download URL of the uploaded image
  // const downloadURL = "your-download-url";

  // Add data to Firestore
  //     const docRef = await db.collection("carousel").add({
  //       imageUrl: downloadURL,
  //       title: title,
  //       description: description,
  //     });

  //     return response.status(HttpSuccessCode.OK).json({
  //       message: "Image added successfully",
  //       docId: docRef.id,
  //     });
  //   } catch (err) {
  //     return response.status(HttpErrorCode.BadRequest).json(err);
  //   }
};
