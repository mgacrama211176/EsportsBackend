import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { db, storage } from "../connectFirebase.js";
import { ref, deleteObject } from "firebase/storage";
import HttpSuccessCode from "../utils/HttpSuccssCodes.js";
import HttpErrorCode from "../utils/HttpErrorCodes.js";
import { uploadService } from "../service/uploadImageService.js";
import multer from "multer";

const upload = multer();

export const addTeams = async (request, response, next) => {
  try {
    upload.fields([
      { name: "teamBanner", maxCount: 1 },
      { name: "teamLogo", maxCount: 1 },
    ])(request, response, async (error) => {
      const teamBannerImage = await uploadService(
        "teamBanner",
        request.files["teamBanner"][0],
        request,
        response
      );
      // const teamLogoImage = await uploadService(
      //   "teamLogo",
      //   request.files["teamLogo"][0],
      //   request,
      //   response
      // );
      const res = await addDoc(collection(db, "TEAMS"), {
        teamBanner: teamBannerImage,
        teamLogo: "teamLogoImage",
        teamName: request.body.teamName,
      });
      response.status(HttpSuccessCode.Created).json(res);
    });
  } catch (err) {
    response.status(HttpErrorCode.BadRequest).json(err);
  }
};

export const getAllTeams = async (request, response, next) => {
  try {
    const teamsSnapshot = await getDocs(collection(db, "TEAMS"));
    const teams = [];

    teamsSnapshot.forEach((doc) => {
      const team = doc.data();
      teams.push(team);
    });

    response.status(HttpSuccessCode.OK).json(teams);
  } catch (err) {
    response.status(HttpErrorCode.BadRequest).json(err);
  }
};

export const deleteTeam = async (request, response, next) => {
  const { teamName } = request.params;

  try {
    // Create a query to find the team with the specified teamName
    const q = query(collection(db, "TEAMS"), where("teamName", "==", teamName));

    // Execute the query and get the matching documents
    const querySnapshot = await getDocs(q);

    // Iterate over the documents and delete each one
    querySnapshot.forEach(async (doc) => {
      const teamRef = doc.ref;
      const teamData = doc.data();

      // Delete the team logo
      if (teamData.teamLogo) {
        const teamLogoRef = ref(storage, teamData.teamLogo);
        await deleteObject(teamLogoRef);
      }

      // Delete the team banner
      if (teamData.teamBanner) {
        const teamBannerRef = ref(storage, teamData.teamBanner);
        await deleteObject(teamBannerRef);
      }

      // Delete the team document
      await deleteDoc(teamRef);
    });

    response
      .status(HttpSuccessCode.OK)
      .json({ message: "Team(s) and associated files deleted successfully" });
  } catch (err) {
    response.status(HttpErrorCode.BadRequest).json(err);
  }
};
