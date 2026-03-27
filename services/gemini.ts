import { GoogleGenAI, Type, Schema } from "@google/genai";
import { VibeResponse } from "../types";

// The API key is injected by Vite's define plugin during build/dev
const apiKey = process.env.API_KEY || '';

let _ai: GoogleGenAI | null = null;

/**
 * Initializes and returns the GoogleGenAI instance.
 * Implements a singleton pattern to avoid recreating the instance on every call.
 * 
 * @returns GoogleGenAI instance or null if the API key is missing.
 */
const getAI = () => {
  if (!_ai) {
    if (!apiKey) {
      console.warn('Gemini API key not configured. AI features will use fallback responses.');
      return null;
    }
    _ai = new GoogleGenAI({ apiKey });
  }
  return _ai;
};

/**
 * Schema definition to enforce structured JSON output from Gemini.
 * This ensures the generation strictly matches our VibeResponse interface.
 */
const vibeSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    colorPalette: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "An array of 3-5 hex color codes that match the user's requested vibe.",
    },
    fontPairing: {
      type: Type.STRING,
      description: "A description of a font pairing (e.g., 'Playfair Display for headers, Lato for body') that matches the vibe.",
    },
    layoutStyle: {
      type: Type.STRING,
      description: "A short description of the layout style (e.g., 'Minimalist single column', 'Bento box grid').",
    },
    reasoning: {
      type: Type.STRING,
      description: "A brief explanation (max 2 sentences) of why these choices match the requested vibe.",
    },
    uiElementName: {
      type: Type.STRING,
      description: "A creative name for a UI component that would fit this vibe (e.g., 'Zen Mode Dashboard', 'High-Frequency Trading Blotter')."
    }
  },
  required: ["colorPalette", "fontPairing", "layoutStyle", "reasoning", "uiElementName"],
};

/**
 * Generates a full design system configuration (colors, fonts, etc.) based on a user's textual 'vibe' description.
 * Utilizes Gemini 2.5 Flash for rapid structured JSON generation.
 * 
 * @param userVibe - The user's input string describing their desired style.
 * @returns A promise that resolves to a VibeResponse object.
 */
export const generateVibeConfig = async (userVibe: string): Promise<VibeResponse> => {
  try {
    const ai = getAI();
    if (!ai) throw new Error('API key not configured');
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview", // Staying with Flash for fast JSON generation
      contents: `You are an expert UI/UX designer and 'Vibe Coder'.
      Analyze the following 'vibe' description provided by a user and generate a design system specification.
      
      User Vibe: "${userVibe}"
      
      Return a JSON object describing the visual identity.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: vibeSchema,
        systemInstruction: "You are a creative technical partner for business leaders learning to code with AI. Be inspiring yet precise.",
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as VibeResponse;
    }
    throw new Error("No response text generated");
  } catch (error) {
    console.error("Gemini Vibe Check Failed:", error);
    return {
      colorPalette: ["#FFC20E", "#000000", "#FFFFFF", "#333333"],
      fontPairing: "Inter & Merriweather (Fallback)",
      layoutStyle: "Standard Grid",
      reasoning: "We couldn't connect to the AI brain right now, so here is the default Visionary Code palette.",
      uiElementName: "Emergency Fallback Component"
    };
  }
};

export const enhanceUserPrompt = async (idea: string, tool: string): Promise<string> => {
  try {
    const ai = getAI();
    if (!ai) throw new Error('API key not configured');
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview", // Using Gemini 3 for superior reasoning
      contents: `You are an expert Product Manager and AI Prompt Engineer. 
      The user has an app idea: "${idea}".
      They want to build it using this tool: "${tool}".
      
      Write a highly optimized, professional "God Prompt" that the user can paste into ${tool} to get the best possible result.
      
      If the tool is Lovable: Focus on UI details, features, and visual style.
      If the tool is Google AI Studio (Gemini 3 Pro): Focus on system architecture, data structures, and logic.
      If the tool is Antigravity: Focus on full-stack SaaS architecture and Python/backend logic.
      
      Output ONLY the prompt text, no intro/outro.`,
    });
    return response.text || "Could not generate prompt.";
  } catch (error) {
    console.error("Prompt Enhancement Failed", error);
    return "Error connecting to Gemini 3 Pro. Please try again.";
  }
};
