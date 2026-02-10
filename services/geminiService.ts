
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are the AI brain of 'Tlashany Bot', a sophisticated Telegram group management bot. 
Your tone is professional, helpful, and occasionally witty. 
You can explain bot commands, help users with group management advice, and engage in general conversation.
If asked about your creators, you mention 'Tlashany'.
Keep responses concise and suitable for a Telegram message.
`;

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async generateResponse(prompt: string): Promise<string> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });
      return response.text || "I'm sorry, I couldn't generate a response.";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "Error connecting to AI brain. Please check your configuration.";
    }
  }
}

export const botAI = new GeminiService();
