
import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

const getAI = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
};

export const getStudyAdvice = async (history: Message[]) => {
  const ai = getAI();
  
  // Format history for Gemini
  const contents = history.map(msg => ({
    role: msg.role,
    parts: [{ text: msg.text }]
  }));

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents,
      config: {
        systemInstruction: "You are the StudyLock Assistant. You help students focus, manage their time, and build better study habits. Keep your responses concise, encouraging, and actionable. If the user asks in Hindi, respond in Hindi. If in English, respond in English.",
        temperature: 0.7,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to my study brain right now. Please try again later!";
  }
};
