import { doc, getDoc, getFirestore } from "firebase/firestore";
import { app } from "../context/firebase/Firebase";

const fireStore = getFirestore(app);

const geApiKey = async () => {
  const docRef = doc(fireStore, "api", "imgBB");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data().key;
  } else {
    return null;
  }
};

export const addImageInStorage = async (file) => {
  if (!file) return null;

  const key = await geApiKey();

  if (!key) {
    console.error("❌ Missing imgbb API key");
    return null;
  }

  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // শুধু raw base64 string
        const base64String = reader.result.split(",")[1];
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
    });
  }

  try {
    const base64Image = await fileToBase64(file);

    const formData = new FormData();
    formData.append("image", base64Image);

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log(data);

    return data?.data?.url || null;
  } catch (err) {
    console.error("❌ Image upload failed:", err);
    return null;
  }
};

