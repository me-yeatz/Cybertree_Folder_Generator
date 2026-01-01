/**
 * Service to communicate with Local AI (LM Studio, Ollama, etc.)
 * Uses standard OpenAI Chat Completions API format
 */

const getConfig = () => {
    return {
        baseUrl: import.meta.env.VITE_AI_BASE_URL || "http://localhost:1234/v1",
        model: import.meta.env.VITE_AI_MODEL || "local-model", // LM Studio often ignores this or you strict set it
        apiKey: import.meta.env.VITE_AI_API_KEY || "lm-studio", // Often not needed for local
    };
};

export const generateStructureFromPrompt = async (prompt: string): Promise<string[]> => {
    const config = getConfig();

    // System instruction to guide the local model
    const systemInstruction = `
You are an expert software architect.
Your task is to generate a file structure based on the user's request.
Return ONLY a JSON array of file path strings. 
Do not include markdown formatting (like \`\`\`), comments, or extra text. 
Just the raw JSON array.
Example response: ["src/index.ts", "src/components/App.tsx", "package.json"]
`;

    try {
        const response = await fetch(`${config.baseUrl}/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${config.apiKey}`
            },
            body: JSON.stringify({
                model: config.model,
                messages: [
                    { role: "system", content: systemInstruction },
                    { role: "user", content: `Generate a file structure for: ${prompt}` }
                ],
                temperature: 0.7,
                max_tokens: 2000,
                stream: false
            })
        });

        if (!response.ok) {
            throw new Error(`AI Request Failed: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        // Extract content from OpenAI format
        let content = "";
        if (data.choices && data.choices.length > 0 && data.choices[0].message) {
            content = data.choices[0].message.content;
        } else {
            throw new Error("Invalid response format from AI provider");
        }

        // Clean up markdown code blocks if the local model is chatty
        content = content.replace(/```json/g, "").replace(/```/g, "").trim();

        // Parse JSON
        try {
            return JSON.parse(content) as string[];
        } catch (_e) {
            console.error("Failed to parse JSON from AI response:", content);
            throw new Error("AI returned invalid JSON. Try a different prompt or model.");
        }

    } catch (error) {
        console.error("AI Service Error:", error);
        throw error;
    }
};
