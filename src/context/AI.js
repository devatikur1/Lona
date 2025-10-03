import { GoogleGenAI } from "@google/genai";

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
};

export default AI;
