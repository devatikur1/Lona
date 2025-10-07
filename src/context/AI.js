import { createPartFromUri, GoogleGenAI } from "@google/genai";

const API_KEY = process.env.REACT_APP_GEMINI_API;

const ai = new GoogleGenAI({ apiKey: API_KEY });

const AI = {
  geminiText: async (prompt, msgs = []) => {
    try {
      const chat = ai.chats.create({
        name: "Lonas",
        model: "gemini-2.5-flash",
        history: [...msgs],
      });

      const response = await chat.sendMessage({ message: prompt });
      return { type: "data", role: "model", content: response.text };
    } catch (error) {
      console.error("Gemini Error:", error);
      return {
        type: "data",
        role: "model",
        content: "⚠️ Something went wrong.",
      };
    }
  },

  geminiTextAndImage: async (prompt, file, msgs = []) => {
    try {
      let imageUri = null;

      // যদি file থাকে, তাহলে Base64 URI তে convert করো
      if (file && file instanceof File) {
        imageUri = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(file); // <-- converts File → Base64 URI
        });
      }

      const chat = ai.chats.create({
        name: "Lonas",
        model: "gemini-2.5-flash",
        history: [...msgs],
      });

      // text + image একসাথে পাঠাও
      const response = await chat.sendMessage({
        message: [
          prompt,
          ...(imageUri
            ? [createPartFromUri(imageUri, file.type || "image/png")]
            : []),
        ],
      });

      return { type: "data", role: "model", content: response.text };
    } catch (error) {
      console.error("Gemini Image Error:", error);
      return {
        type: "data",
        role: "model",
        content: "⚠️ Something went wrong with image processing.",
      };
    }
  },
};

export default AI;
