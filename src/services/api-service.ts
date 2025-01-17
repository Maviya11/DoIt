import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY!); // Replace with your own API key
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateTaskSuggestion = async (taskDescription: string) => {
  console.log(`Task: ${taskDescription}`);

  // Build the prompt
  const prompt = `Task: ${taskDescription}. Suggest tips, actions, weather conditions for the specified location, and the optimal time to perform this task in under 10 words.`;

  try {
    const result = await model.generateContent(prompt);

    // Assuming the API returns a response with a `text()` method
    return result.response.text();
  } catch (error) {
    console.error("Error generating task suggestion:", error);
    return "Unable to generate task suggestion at this time.";
  }
};
