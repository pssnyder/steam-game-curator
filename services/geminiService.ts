import { GoogleGenAI, Type } from "@google/genai";
import { Game, Recommendation } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const recommendationSchema = {
  type: Type.OBJECT,
  properties: {
    gameName: {
      type: Type.STRING,
      description: "The name of the single game being recommended. This must be a game from the user's library.",
    },
    reason: {
      type: Type.STRING,
      description: "A one or two-sentence explanation for why this specific game was chosen based on the user's prompt, game library, and general preferences.",
    },
  },
  required: ["gameName", "reason"],
};

export const getGameRecommendation = async (
  games: Game[],
  activePreferences: string[],
  prompt: string
): Promise<Recommendation> => {
  const model = "gemini-2.5-flash";

  const gameListString = games.map(g => g.name).join('\n');
  
  const preferencesString = activePreferences.length > 0
    ? `**User's General Preferences (Important rules to follow):**\n${activePreferences.map(p => `- ${p}`).join('\n')}`
    : "**User's General Preferences:**\nNone provided.";

  const systemInstruction = `You are an expert game recommender AI. Your task is to analyze a user's game library, their list of general gaming preferences, and their current mood or request. Based on all this information, you must recommend exactly ONE game from their library that is the best fit. You must only choose from the provided game list. Your response must be in JSON format, adhering to the provided schema.`;

  const fullPrompt = `Here is all the information you need to make a recommendation:

  **User's Game Library:**
  ${gameListString}

  ${preferencesString}

  **User's Current Mood/Request:**
  "${prompt}"

  Considering the user's library, their general preferences, and their current mood, select the single best game from the library that fits the request and provide a brief reason for your choice.`;
  
  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: fullPrompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: recommendationSchema,
        temperature: 0.8,
        topP: 0.9,
      },
    });

    const jsonText = response.text.trim();
    if (!jsonText) {
      throw new Error("Received an empty response from the AI.");
    }

    const parsedResponse: Recommendation = JSON.parse(jsonText);
    
    if (!games.some(game => game.name.toLowerCase() === parsedResponse.gameName.toLowerCase())) {
        console.warn("AI recommended a game not in the user's list. Picking a fallback.");
        const fallbackGame = games[Math.floor(Math.random() * games.length)];
        return {
            gameName: fallbackGame.name,
            reason: `The AI's suggestion, "${parsedResponse.gameName}", was not in your library. As a fallback, I'm suggesting "${fallbackGame.name}" which might be an interesting choice to explore.`
        }
    }

    return parsedResponse;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to communicate with the AI model. Please check the console for more details.");
  }
};
