import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  TwitterAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";

import { app } from "../Firebase";
import { addImageInStorage } from "../../../hooks/useAddImageInStorage";
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
      localStorage.setItem("logged", true);
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
  signUp: async (email, password, fullName, location) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const userRef = doc(fireStore, "users", user.uid);
      await setDoc(userRef, {
        id: user.uid,
        name: fullName,
        email: email,
        profileImgUrl: null,
        atSignIn: serverTimestamp(),
        atLastLogin: serverTimestamp(),
        Probider: "email",
        location,
      });
      return { type: "data", user };
    } catch (error) {
      return {
        type: "error",
        errorCode: error.code,
        errorMessage: error.message,
      };
    }
  },

  googleSign: async (location) => {
    try {
      const googleRes = await signInWithPopup(auth, googleProvider);
      const user = googleRes.user;

      const response = await fetch(user.photoURL);
      const blob = await response.blob();
      const file = new File([blob], "profile.jpg", { type: blob.type });
      const uploadedUrl = await addImageInStorage(file);

      const userRef = doc(fireStore, "users", user.uid);
      await setDoc(
        userRef,
        {
          id: user.uid,
          name: user.displayName,
          email: user.email,
          profileImgUrl: uploadedUrl,
          atSignIn: serverTimestamp(),
          atLastLogin: serverTimestamp(),
          Probider: "google",
          location,
        },
        { merge: true }
      );
      localStorage.setItem("logged", true);
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

  gihubSignIn: async (location) => {
    try {
      const githubRes = await signInWithPopup(auth, githubProvider);
      const user = githubRes.user;

      const response = await fetch(user.photoURL);
      const blob = await response.blob();
      const file = new File([blob], "profile.jpg", { type: blob.type });
      const uploadedUrl = await addImageInStorage(file);

      const userRef = doc(fireStore, "users", user.uid);
      await setDoc(
        userRef,
        {
          id: user.uid,
          name: user.displayName,
          email: user.email,
          profileImgUrl: uploadedUrl,
          atSignIn: serverTimestamp(),
          atLastLogin: serverTimestamp(),
          Probider: "github",
          location,
        },
        { merge: true }
      );
      localStorage.setItem("logged", true);
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

  XSignIn: async (location) => {
    try {
      const result = await signInWithPopup(auth, twitterProvider);
      const user = result.user;

      const response = await fetch(user.photoURL);
      const blob = await response.blob();
      const file = new File([blob], "profile.jpg", { type: blob.type });
      const uploadedUrl = await addImageInStorage(file);

      const userRef = doc(fireStore, "users", user.uid);
      await setDoc(
        userRef,
        {
          id: user.uid,
          name: user.displayName,
          email: user.email,
          profileImgUrl: uploadedUrl,
          atSignIn: serverTimestamp(),
          atLastLogin: serverTimestamp(),
          Probider: "x",
          location,
        },
        { merge: true }
      );
      localStorage.setItem("logged", true);
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
        console.log(user.uid);

        return { type: "data", id: user };
      } else {
        return { type: "error" };
      }
    });
  },

  // logout
  logOut: () => {},
};

export default userAuth;
