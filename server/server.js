import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { OpenAI } from "openai";

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.post("/debug", async (req, res) =>
{
    const { code } = req.body;
    if (!code) return res.status(400).json({ error: "No code provided" });

    try
    {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: "You are a code debugging assistant. If the inputted code contains errors, respond ONLY with the corrected code and include comments explaining the changes made. If the code is correct, provide an explanation of how it works. Do not include markdown code block syntax or any other formatting."
                },
                {
                    role: "user",
                    content: `Fix this code:\n\n${code}`
                }
            ],
        });

        let correctedCode = completion.choices[0].message.content;
        correctedCode = correctedCode.replace(/^```[\w]*\n?/, '');
        correctedCode = correctedCode.replace(/```$/, '');
        correctedCode = correctedCode.trim();

        res.json({ correctedCode });
    } catch (error)
    {
        console.error('Error:', error);
        res.status(500).json({ error: "OpenAI debugging failed: " + error.message });
    }
});


app.post("/explain", async (req, res) =>
{
    const { code } = req.body;
    console.log(code);
    if (!code) return res.status(400).json({ error: "No code provided" });

    try
    {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: "You are a code debugging and explainer assistant. If the inputted code contains errors, respond  the corrected code and include comments explaining the changes made. If the code is correct, provide an explanation of how it works. Do not include markdown code block syntax or any other formatting."
                },
                {
                    role: "user",
                    content: `this code:\n\n${code}`
                }
            ],
        });

        let explanation = completion.choices[0].message.content;
        explanation = explanation.replace(/^```[\w]*\n?/, '');
        explanation = explanation.replace(/```$/, '');
        explanation = explanation.trim();
        console.log(explanation);
        res.status(200).json({ explanation });
    } catch (error)
    {
        console.error('Error:', error);
        res.status(500).json({ error: "OpenAI debugging failed: " + error.message });
    }
});
app.post("/comment", async (req, res) =>
{
    const { code } = req.body;
    console.log(code);
    if (!code) return res.status(400).json({ error: "No code provided" });

    try
    {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: "You are a code debugging and explainer assistant. If the inputted code contains errors, respond  the corrected code and include comments explaining the changes made. If the code is correct, provide an explanation of how it works. Do not include markdown code block syntax or any other formatting."
                },
                {
                    role: "user",
                    content: `this code:\n\n${code}`
                }
            ],
        });

        let explanation = completion.choices[0].message.content;
        explanation = explanation.replace(/^```[\w]*\n?/, '');
        explanation = explanation.replace(/```$/, '');
        explanation = explanation.trim();
        console.log(explanation);
        res.status(200).json({ explanation });
    } catch (error)
    {
        console.error('Error:', error);
        res.status(500).json({ error: "OpenAI debugging failed: " + error.message });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));
