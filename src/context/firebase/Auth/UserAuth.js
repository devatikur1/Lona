import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { app } from "../Firebase";
const auth = getAuth(app);

const userAuth = {
  // Log in function
  logIn: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("Login Success:", user);
      return { type: "data", user };
    } catch (error) {
      console.error("Login Error:", error);
      return {
        type: "error",
        errorCode: error.code,
        errorMessage: error.message,
      };
    }
  },

  // Detect user (auth state observer)
  detectedUser: () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User logged in:", user.uid);
        return  { type: "data", user };
      } else {
        console.log("No user found");
        return ({ type: "error", message: "No user logged in" });
      }
    });
  },
};

export default userAuth;
