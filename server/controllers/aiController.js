// server/controllers/aiController.js
import { Request, Response } from "express";

/**
 * POST /api/ai/generate
 * body: { prompt: string, max_tokens?: number, temperature?: number }
 *
 * Uses Google Generative Language REST: POST
 * https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generate?key=API_KEY
 *
 * This function is defensive — tries multiple response shapes.
 */

export const generateText = async (req, res) => {
  try {
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) return res.status(500).json({ message: "Server missing GOOGLE_API_KEY" });

    const { prompt, max_tokens = 512, temperature = 0.2 } = req.body;
    if (!prompt || typeof prompt !== "string") return res.status(400).json({ message: "prompt (string) is required in body" });

    // Build the request body according to common generative language schema
    const body = {
      // model also sometimes required in body; endpoint also contains model name
      prompt: {
        messages: [
          {
            role: "user",
            content: [{ type: "text", text: prompt }]
          }
        ]
      },
      // guardrail tokens / options
      maxOutputTokens: max_tokens,
      temperature: temperature
    };

    // Use the generativelanguage REST endpoint for Gemini
    const model = process.env.GEMINI_MODEL || "gemini-2.0-flash"; // allow override
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generate?key=${encodeURIComponent(apiKey)}`;

    // Node v18+ has global fetch; otherwise install node-fetch
    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!r.ok) {
      const text = await r.text();
      console.error("Gemini API error:", r.status, text);
      return res.status(502).json({ message: "Upstream model error", status: r.status, body: text });
    }

    const result = await r.json();

    // Defensive extraction of generated text — the shape can vary
    let outputText = "";

    // 1) new-style : result.output[0].content -> array of {type: 'text', text: '...'}
    if (result.output && Array.isArray(result.output)) {
      for (const out of result.output) {
        if (out.content && Array.isArray(out.content)) {
          for (const c of out.content) {
            if (c.type === "text" && c.text) outputText += c.text;
            else if (typeof c === "string") outputText += c;
          }
        } else if (typeof out === "string") outputText += out;
      }
    }

    // 2) fallback: result.candidates (older naming)
    if (!outputText && result.candidates && Array.isArray(result.candidates)) {
      outputText = result.candidates.map((c) => (c.output ? c.output : c.text ? c.text : "")).join("\n");
    }

    // 3) fallback: some responses include content[0].text
    if (!outputText && result?.output?.[0]?.content?.[0]?.text) {
      outputText = result.output[0].content[0].text;
    }

    // 4) last resort: JSON stringify the whole response
    if (!outputText) outputText = JSON.stringify(result);

    return res.json({ ok: true, model: model, output: outputText, raw: result });
  } catch (err) {
    console.error("generateText error:", err);
    return res.status(500).json({ message: "Internal server error", error: String(err) });
  }
};
