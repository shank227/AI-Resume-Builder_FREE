// client/src/utils/ai.js
export const generateWithGemini = async ({ prompt, max_tokens = 512, temperature = 0.2 }) => {
  try {
    const res = await fetch("/api/ai/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, max_tokens, temperature }),
    });

    const j = await res.json();
    if (!res.ok) throw new Error(j?.message || "AI request failed");
    return j;
  } catch (err) {
    console.error("AI client error:", err);
    return { ok: false, message: err.message };
  }
};
