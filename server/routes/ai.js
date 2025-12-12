import express from "express";
import { groq } from "../utils/groqClient.js";

const router = express.Router();

router.post("/generate", async (req, res) => {
  try {
    const { prompt, section, extra } = req.body;

    if (!prompt) {
      return res.status(400).json({ success: false, message: "Prompt missing" });
    }

    // Groq API call
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            "You are a professional resume writer. Improve content clearly, concisely, and professionally. Do NOT add emojis or fluff.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.2,
    });

    const suggestion =
      completion.choices?.[0]?.message?.content?.trim() || "";

    return res.json({
      success: true,
      suggestion,
    });
  } catch (err) {
    console.error("GROQ ERROR →", err);
    return res.status(500).json({
      success: false,
      message: "Groq AI failed",
      error: err?.message,
    });
  }
});

export default router;
