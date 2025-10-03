const key = process.env.REACT_APP_IMGBB_API;

export const addImageInStorage = async (file) => {
  if (!file) return;

  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  console.log(data);

  return data?.data?.url;
};
