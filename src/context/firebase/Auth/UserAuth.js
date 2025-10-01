import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  TwitterAuthProvider,
} from "firebase/auth";
import { app } from "../Firebase";
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const twitterProvider = new TwitterAuthProvider();

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

  googleSign: async () => {
    try {
      const googleRes = await signInWithPopup(auth, googleProvider);
      const user = googleRes.user;

      return { type: "data", user };
    } catch (error) {
      console.error(error);
      return {
        type: "error",
        errorCode: error.code,
        errorMessage: error.message,
      };
    }
  },

  gihubSignIn: async () => {
    try {
      const githubRes = await signInWithPopup(auth, githubProvider);
      const user = githubRes.user;

      return { type: "data", user };
    } catch (error) {
      console.error("GitHub Login Error:", error);
      return {
        type: "error",
        errorCode: error.code,
        errorMessage: error.message,
      };
    }
  },

  XSignIn: async () => {
    try {
      const result = await signInWithPopup(auth, twitterProvider);
      const user = result.user;
      console.log("Twitter User:", user);
      return { type: "data", user };
    } catch (error) {
      console.error("Twitter Login Error:", error);
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
        return { type: "data", user };
      } else {
        console.log("No user found");
        return { type: "error", message: "No user logged in" };
      }
    });
  },
};

export default userAuth;
