import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.static("public"));

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const history = [];

app.post("/chat", async (req, res) => {

    try {

        const userMessage = req.body.message;

        history.push({
            role: "user",
            parts: [
                {
                    text: userMessage
                }
            ]
        });

        const response = await ai.models.generateContent({

            model: "gemini-2.5-flash",

            contents: history,

            config: {
                systemInstruction: `PUT PROMPT HERE`
            }

        });

        const botReply = response.text;

        history.push({
            role: "model",
            parts: [
                {
                    text: botReply
                }
            ]
        });

        res.json({
            reply: botReply
        });

    } catch (error) {

    console.error("FULL ERROR:");
    console.error(error);

    res.status(500).json({
        reply: error.message
    });

}

});

app.listen(3000, () => {
    console.log("AI Bestie running on port 3000 💖");
});