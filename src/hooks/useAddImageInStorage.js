export const addImageInStorage = async (link) => {
  if (!link) return null;

  const key = process.env.REACT_APP_IMAGE_API_KEY;

  if (!key) {
    console.error("❌ Missing imgbb API key");
    return null;
  }

  try {
    const formData = new FormData();
    formData.append("image", link);

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    return data?.data?.url || null;
  } catch (err) {
    console.error("❌ Image upload failed:", err);
    return null;
  }
};
