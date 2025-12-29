import { GoogleGenAI, Type } from "@google/genai";
import { BaZiState, AIAnalysisResult, FiveElement } from "../types";
import { STEMS, BRANCHES } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getBaZiDescription = (bazi: BaZiState): string => {
  return `
    Year: ${STEMS[bazi.year.stem].char}${BRANCHES[bazi.year.branch].char}
    Month: ${STEMS[bazi.month.stem].char}${BRANCHES[bazi.month.branch].char}
    Day: ${STEMS[bazi.day.stem].char}${BRANCHES[bazi.day.branch].char} (Day Master: ${STEMS[bazi.day.stem].char} ${STEMS[bazi.day.stem].element})
    Hour: ${STEMS[bazi.hour.stem].char}${BRANCHES[bazi.hour.branch].char}
  `;
}

export const analyzeBaZi = async (userInput: string): Promise<AIAnalysisResult> => {
  const prompt = `
    Analyze the following BaZi (Eight Characters) chart strictly based on the provided description.
    
    User Description/Chart:
    ${userInput}

    Provide a professional analysis in JSON format focusing on:
    1. Day Master Strength (Weak, Strong, etc.).
    2. The Pattern (GeJu).
    3. Favorable Elements (Joy/Use Gods) and Unfavorable Elements (Taboo).
    4. A concise explanation of the energy flow.
    5. A concise overall analysis.
    
    IMPORTANT: Provide all textual content in Traditional Chinese (繁體中文).
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            dayMasterStrength: { type: Type.STRING },
            pattern: { type: Type.STRING },
            favorableElements: {
              type: Type.ARRAY,
              items: { type: Type.STRING, enum: ["Wood", "Fire", "Earth", "Metal", "Water"] }
            },
            unfavorableElements: {
              type: Type.ARRAY,
              items: { type: Type.STRING, enum: ["Wood", "Fire", "Earth", "Metal", "Water"] }
            },
            flowDescription: { type: Type.STRING },
            analysisText: { type: Type.STRING },
          },
          required: ["dayMasterStrength", "pattern", "favorableElements", "unfavorableElements", "flowDescription", "analysisText"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    return JSON.parse(text) as AIAnalysisResult;

  } catch (error) {
    console.error("Gemini Analysis Failed", error);
    // Fallback if AI fails
    return {
      dayMasterStrength: "未知 (AI Error)",
      pattern: "未知",
      favorableElements: [],
      unfavorableElements: [],
      flowDescription: "无法连接 AI 服务。",
      analysisText: "请检查 API Key 或网络连接。"
    };
  }
};


