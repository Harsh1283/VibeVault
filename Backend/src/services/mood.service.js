import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import config from "../config/config.js";

dotenv.config();

const { gemini_apiKey } = config;
const genAI = new GoogleGenerativeAI(gemini_apiKey);

export async function getMood(songText) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    const prompt = `
      Analyze the mood of this song and return only ONE WORD 
      (happy, sad, energetic, calm, romantic, nostalgic, melancholic, upbeat, peaceful, intense).
      Song: "${songText}"
    `;
    
    const result = await model.generateContent(prompt);
    
    // ✅ Correct extraction
    const mood = result.response.text();
    console.log("Detected mood:", mood);

    return mood.trim().toLowerCase();
  } catch (error) {
    console.error("Error getting mood:", error);
    throw new Error("Failed to analyze mood");
  }
}
