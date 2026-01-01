import { GoogleGenerativeAI } from "@google/generative-ai";

const getAIClient = () => {
    // Vite uses import.meta.env for environment variables
    const apiKey = import.meta.env.VITE_API_KEY;
    if (!apiKey) {
        throw new Error("API Key not found in environment (VITE_API_KEY)");
    }
    return new GoogleGenerativeAI(apiKey);
};

export const generateStructureFromPrompt = async (prompt: string): Promise<string[]> => {
    try {
        const genAI = getAIClient();
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash", // Updated to a known stable model, or keep gemini-2.0-flash-exp if intended on latest
            generationConfig: {
                responseMimeType: "application/json"
            }
        });

        const systemInstruction = `
        You are an expert software architect. 
        Your task is to generate a file structure based on the user's request.
        Return ONLY a JSON array of file path strings. 
        Do not include comments or extra text.
        Example of expected output: ["src/index.ts", "src/components/App.tsx", "package.json"]
        `;

        const result = await model.generateContent(`${systemInstruction}\n\nUser Prompt: ${prompt}`);
        const response = await result.response;
        const text = response.text();

        if (!text) return [];

        // Parse JSON safely
        try {
            return JSON.parse(text) as string[];
        } catch (_e) {
            console.error("Failed to parse JSON from AI response:", text);
            return [];
        }

    } catch (error) {
        console.error("Gemini API Error:", error);
        throw error;
    }
};
