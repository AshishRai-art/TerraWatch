module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({
      ok: false,
      error: "Method not allowed"
    });
  }

  try {
    const { query, context } = req.body || {};

    if (!query || typeof query !== "string") {
      return res.status(400).json({
        ok: false,
        error: "Missing query"
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        ok: false,
        error: "Gemini API key is not configured on the server."
      });
    }

    const prompt = `
You are the TerraWatch AI assistant.

TerraWatch is a mine-safety prototype that monitors mine conditions using
multiple sensors such as tilt, crack, settlement, moisture, vibration and
seismic information.

Important rules:
- Use the supplied TerraWatch data when answering.
- Treat APCI as a proposed research/prototype indicator, not a validated
  collapse-prediction algorithm.
- Do not claim that a mine collapse is certain or that the system guarantees
  worker safety.
- If the data is simulated, clearly say so.
- Give concise, practical explanations.
- Do not invent sensor values or events.
- Support human safety decisions; do not replace qualified mine-safety personnel.

USER QUESTION:
${query}

CURRENT TERRAWATCH DATA:
${JSON.stringify(context || {}, null, 2)}
`;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" +
        encodeURIComponent(apiKey),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API error:", data);

      return res.status(502).json({
        ok: false,
        error: "Gemini AI request failed."
      });
    }

    const answer =
      data?.candidates?.[0]?.content?.parts
        ?.map(part => part.text || "")
        .join("")
        .trim();

    if (!answer) {
      return res.status(502).json({
        ok: false,
        error: "Gemini returned an empty response."
      });
    }

    return res.status(200).json({
      ok: true,
      answer
    });

  } catch (error) {
    console.error("Server error:", error);

    return res.status(500).json({
      ok: false,
      error: "TerraWatch AI server error."
    });
  }
};