import bcrypt from "bcrypt";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const SignIn = async (request, response, next) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const { email, password } = request.body;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      response.status(200).json(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      response.status(401).json(errorMessage);
    });
};
