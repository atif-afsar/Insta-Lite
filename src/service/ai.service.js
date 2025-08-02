const { GoogleGenAI } = require("@google/genai");

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

async function generateCaption(base64ImageFile) {
  const contents = [
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: base64ImageFile,
      },
    },
    { text: "Caption this image." },
  ];

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents,
    config: {
      systemInstruction:`
        You are a professional image captioning model.
        You will generate a single caption for the image provided.
        The caption should be short and concise.
        You use hash tags and emojis to identify the image category.
      `
    }
  });
  return response.text;
}

module.exports = { generateCaption };
