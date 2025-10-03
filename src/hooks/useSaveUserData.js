import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { addImageInStorage } from "./useAddImageInStorage";

export const saveUserData = async (fireStore, user, provider, location, photoURL) => {
  let uploadedUrl = null;

  if (photoURL) {
    try {
      const response = await fetch(photoURL);
      const blob = await response.blob();
      const file = new File([blob], "profile.jpg", { type: blob.type });
      uploadedUrl = (await addImageInStorage(file)) || photoURL; // fallback
    } catch (err) {
      console.error("Image upload failed:", err);
      uploadedUrl = photoURL;
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

  localStorage.setItem("logged", "true");
};
