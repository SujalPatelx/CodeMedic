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
    const { code, inputError } = req.body;
    if (!code) return res.status(400).json({ error: "No code provided" });
    console.log(inputError);
    try
    {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: "You are a highly skilled code debugging assistant. Your task is to analyze the given code, identify any errors, and provide a corrected version. Return only the fixed code with little informative comments explaining the changes where necessary. Ensure that the logic and structure of the original code are preserved. Do not include any explanations, markdown syntax, or extra formatting—just the corrected code with brief inline comments where needed."
                },
                {
                    role: "user",
                    content: `The following code has encountered an error: ${inputError}. Your task is to analyze the provided error details, identify the necessary corrections, and fix the code while preserving its original logic. Return only the corrected code with minor, informative comments explaining the changes. Do not include any explanations or formatting—just the corrected code.\n\nCode:\n\n${code}`
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
                    content:`fix ${code}`
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
                    content: "You are a code commenting assistant. Your task is to analyze the given code and insert meaningful comments before key logic sections, functions, and important steps. Ensure that the comments explain the purpose of each section, making the code easier to understand. Use clear and concise language for the comments. Maintain the original structure of the code while adding explanations. Do not alter the logic of the code. Return the commented code as output"
                },
                {
                    role: "user",
                    content: `this code:\n\n${code}`
                }
            ],
        });

        let commented = completion.choices[0].message.content;
        commented = commented.replace(/^```[\w]*\n?/, '');
        commented = commented.replace(/```$/, '');
        commented = commented.trim();
        console.log(commented);
        res.status(200).json({ commented });
    } catch (error)
    {
        console.error('Error:', error);
        res.status(500).json({ error: "OpenAI debugging failed: " + error.message });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));
