import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { addImageInStorage } from "./useAddImageInStorage";

export const saveUserData = async (fireStore, user, provider, location, photoURL) => {
  let uploadedUrl = null;

  if (photoURL) {
    try {
      uploadedUrl = (await addImageInStorage(photoURL)) || uploadedUrl;
    } catch (err) {
      console.error("Image upload failed:", err);
      uploadedUrl = photoURL;
      console.log(uploadedUrl);
    }
  }

  const userRef = doc(fireStore, "users", user.uid);
  await setDoc(
    userRef,
    {
      id: user.uid,
      name: user.displayName || user.email,
      email: user.email,
      profileImgUrl: uploadedUrl,
      atSignIn: serverTimestamp(),
      atLastLogin: serverTimestamp(),
      provider,
      location,
      isDisable: false,
    },
    { merge: true }
  );

  localStorage.setItem("logged", true);
};
