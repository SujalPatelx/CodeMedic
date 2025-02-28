import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

const TOGETHER_AI_API_KEY = process.env.TOGETHER_AI_API_KEY;

app.post("/debug", async (req, res) => {
    const { code } = req.body;
    if (!code) return res.status(400).json({ error: "No code provided" });

    try {
        const response = await axios.post(
            "https://api.together.xyz/v1/completions",
            {
                model: "meta-llama/Llama-2-13b-chat-hf", // Change model if needed
                prompt: `Fix errors and improve this code:\n${code}`,
                max_tokens: 300,
                temperature: 0.2,
            },
            {
                headers: { Authorization: `Bearer ${TOGETHER_AI_API_KEY}` },
            }
        );

        res.json({ correctedCode: response.data.choices[0].text });
    } catch (error) {
        res.status(500).json({ error: "LLaMA debugging failed" });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));
