import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  TwitterAuthProvider,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { app } from "../Firebase";
import { saveUserData } from "../../../hooks/useSaveUserData";

const auth = getAuth(app);
const fireStore = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const twitterProvider = new TwitterAuthProvider();

const userAuth = {
  // 🔹 Email Login
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

  // 🔹 Email Sign Up
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
        email,
        profileImgUrl: null,
        atSignIn: serverTimestamp(),
        atLastLogin: serverTimestamp(),
        provider: "email",
        location,
      });
      localStorage.setItem("logged", false);
      return { type: "data", user };
    } catch (error) {
      console.error("SignUp Error:", error);
      return {
        type: "error",
        errorCode: error.code,
        errorMessage: error.message,
      };
    }
  },

  // 🔹 Google Login
  googleSign: async (location) => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      await saveUserData(
        fireStore,
        res.user,
        "google",
        location,
        res.user.photoURL
      );
      return { type: "data", user: res.user };
    } catch (error) {
      console.error("Google Login Error:", error);
      return {
        type: "error",
        errorCode: error.code,
        errorMessage: error.message,
      };
    }
  },

  // 🔹 GitHub Login
  githubSign: async (location) => {
    try {
      const res = await signInWithPopup(auth, githubProvider);
      await saveUserData(
        fireStore,
        res.user,
        "google",
        location,
        res.user.photoURL
      );
      return { type: "data", user: res.user };
    } catch (error) {
      console.error("GitHub Login Error:", error);
      return {
        type: "error",
        errorCode: error.code,
        errorMessage: error.message,
      };
    }
  },

  // 🔹 Twitter / X Login
  twitterSign: async (location) => {
    try {
      const res = await signInWithPopup(auth, twitterProvider);
      await saveUserData(
        fireStore,
        res.user,
        "google",
        location,
        res.user.photoURL
      );
      return { type: "data", user: res.user };
    } catch (error) {
      console.error("Twitter Login Error:", error);
      return {
        type: "error",
        errorCode: error.code,
        errorMessage: error.message,
      };
    }
  },

  // 🔹 Detect user
  detectedUser: (callback) => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        callback({ type: "data", user });
      } else {
        callback({ type: "error" });
      }
    });
  },

  // 🔹 Logout
  logOut: async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("logged");
      return { type: "data" };
    } catch (error) {
      console.error("Logout Error:", error);
      return {
        type: "error",
        errorCode: error.code,
        errorMessage: error.message,
      };
    }
  },
};

export default userAuth;
