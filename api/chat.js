export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Use POST" });
  }

  const { prompt } = req.body || {};
  if (!prompt) {
    return res.status(400).json({ error: "Prompt ausente" });
  }

  try {
    const response = await fetch("https://api-inference.huggingface.co/models/google/gemma-2b-it", {
      method: "POST",
      headers: {
        "Authorization": "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",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: prompt })
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
