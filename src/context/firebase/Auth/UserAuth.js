import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  TwitterAuthProvider,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import { app } from "../Firebase";
const auth = getAuth(app);
const fireStore = getFirestore(app);

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
      const userRef = doc(fireStore, "users", user.uid);
      await setDoc(
        userRef,
        { atLastLogin: serverTimestamp() },
        { merge: true }
      );

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

  googleSign: async (GooglesignUpUserLocationData) => {
    try {
      const googleRes = await signInWithPopup(auth, googleProvider);
      const user = googleRes.user;

      const userRef = doc(fireStore, "users", user.uid);
      await setDoc(
        userRef,
        {
          id: user.uid,
          name: user.displayName,
          email: user.email,
          profileImgUrl: user.photoURL,
          atSignIn: serverTimestamp(),
          atLastLogin: serverTimestamp(),
          GooglesignUpUserLocationData,
        },
        { merge: true }
      );

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

  gihubSignIn: async (GIthubsignUpUserLocationData) => {
    try {
      const githubRes = await signInWithPopup(auth, githubProvider);
      const user = githubRes.user;
      const userRef = doc(fireStore, "users", user.uid);
      await setDoc(
        userRef,
        {
          id: user.uid,
          name: user.displayName,
          email: user.email,
          profileImgUrl: user.photoURL,
          atSignIn: serverTimestamp(),
          atLastLogin: serverTimestamp(),
          GIthubsignUpUserLocationData,
        },
        { merge: true }
      );

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

  XSignIn: async (XsignUpUserLocationData) => {
    try {
      const result = await signInWithPopup(auth, twitterProvider);
      const user = result.user;
      const userRef = doc(fireStore, "users", user.uid);
      await setDoc(
        userRef,
        {
          id: user.uid,
          name: user.displayName,
          email: user.email,
          profileImgUrl: user.photoURL,
          atSignIn: serverTimestamp(),
          atLastLogin: serverTimestamp(),
          XsignUpUserLocationData,
        },
        { merge: true }
      );
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

  // logout
  logOut: () => {},
};

export default userAuth;
