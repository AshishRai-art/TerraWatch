export async function askAssistant({ bridge, question, context, maxLength = 1200 }) {
  const cleanQuestion = typeof question === "string" ? question.trim() : "";
  if (!cleanQuestion) return { ok: false, error: "Enter a question for the assistant." };
  if (cleanQuestion.length > maxLength) return { ok: false, error: `Keep questions under ${maxLength} characters.` };
  if (!bridge || typeof bridge.ask !== "function") return { ok: false, error: "The secure AI bridge is unavailable. Restart TerraWatch and try again." };

  try {
    const result = await bridge.ask(cleanQuestion, context);
    return result && typeof result === "object" ? result : { ok: false, error: "The AI service returned an invalid response." };
  } catch {
    return { ok: false, error: "Secure AI service is currently unavailable." };
  }
}
