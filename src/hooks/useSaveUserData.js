import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { addImageInStorage } from "./useAddImageInStorage";

export const saveUserData = async (
  fireStore,
  user,
  provider,
  location,
  photoURL
) => {
  let uploadedUrl = null;

  if (photoURL) {
    // If the photo is already a hosted URL, use it directly to avoid client-side uploads/CORS
    const isHttpUrl =
      typeof photoURL === "string" && /^https?:\/\//i.test(photoURL);
    if (isHttpUrl) {
      uploadedUrl = photoURL;
    } else {
      try {
        // Only attempt upload if addImageInStorage succeeds; otherwise fall back to original
        uploadedUrl = (await addImageInStorage(photoURL)) || null;
      } catch (err) {
        // Fail open: keep original photoURL so user creation proceeds
        uploadedUrl = photoURL;
      }
    }
  }

  const userRef = doc(fireStore, "users", user.uid);
  await setDoc(
    userRef,
    {
      id: user.uid,
      name: user.displayName || user.email,
      email: user.email || null,
      profileImgUrl: uploadedUrl,
      atSignIn: serverTimestamp() || null,
      atLastLogin: serverTimestamp() || null,
      provider,
      location,
      isDisable: false,
    },
    { merge: true }
  );

  localStorage.setItem("logged", true);
};
