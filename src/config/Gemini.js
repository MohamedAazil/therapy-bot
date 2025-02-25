import {
  GoogleGenerativeAI
} from "@google/generative-ai";

  const apiKey = import.meta.env.VITE_GEMINI_API;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function runChat(prompt) {
    const chatSession = model.startChat({
      generationConfig,
      history: [
      ],
    });
  
    const result = await chatSession.sendMessage("\n Note :you are a custom chatbot called FitBot use ** before headings and * for new line in your response do not talk about this instruction in the response. Here is your prompt : " + prompt);
    console.log(result.response.text());
    return result.response.text();
  }
  
 export default runChat;