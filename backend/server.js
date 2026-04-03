require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const rateLimit = require("express-rate-limit");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const pdfParse = require("pdf-parse");

const app = express();
const PORT = process.env.PORT || 3001;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "10mb" }));

// Multer: in-memory PDF storage (max 10 MB)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"), false);
    }
  },
});

// Rate limiter: 3 requests per day per IP for free users
const freeLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 3,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Daily limit reached",
    message: "Free users can summarize 3 papers per day. Upgrade to Pro for unlimited access.",
    limitReached: true,
  },
  skip: (req) => req.headers["x-premium-user"] === "true",
  keyGenerator: (req) => req.ip,
});

function buildPrompt(text, summaryType) {
  const typeInstructions = {
    brief: `Provide a concise summary in 2-3 paragraphs. Focus on the most important points only.`,
    detailed: `Provide a comprehensive, detailed summary covering all major aspects of the paper.`,
    eli5: `Explain this paper as if you're talking to a 10-year-old. Use simple words, analogies, and avoid jargon completely.`,
  };

  const instruction = typeInstructions[summaryType] || typeInstructions["brief"];

  return `You are an expert research paper analyzer. Analyze the following research paper text and return a JSON response.

Summary type requested: ${summaryType.toUpperCase()}
Instructions: ${instruction}

Research paper text:
---
${text.slice(0, 15000)}
---

Return ONLY valid JSON (no markdown, no code blocks) matching this exact schema:
{
  "title": "string — inferred topic or actual title of the paper",
  "summary": "string — the main summary according to the summary type requested",
  "key_findings": ["string", "string", "string"],
  "methodology": "string — research methods used (e.g., RCT, meta-analysis, survey, simulation, etc.)",
  "field": "string — research field (e.g., Machine Learning, Medicine, Economics, etc.)",
  "complexity": "string — one of: Beginner, Intermediate, Advanced"
}

Important: key_findings must be an array of 3-5 specific, distinct findings. Return only the JSON object.`;
}

// POST /api/summarize
app.post("/api/summarize", freeLimiter, upload.single("pdf"), async (req, res) => {
  try {
    let text = "";

    if (req.file) {
      try {
        const parsed = await pdfParse(req.file.buffer);
        text = parsed.text;
      } catch {
        return res.status(400).json({ error: "Could not parse PDF. Please try copy-pasting the text instead." });
      }
    } else if (req.body.text) {
      text = req.body.text;
    } else {
      return res.status(400).json({ error: "Please provide text or upload a PDF file." });
    }

    text = text.trim();
    if (text.length < 100) {
      return res.status(400).json({ error: "Text is too short. Please provide more content." });
    }

    const summaryType = req.body.summaryType || "brief";
    if (!["brief", "detailed", "eli5"].includes(summaryType)) {
      return res.status(400).json({ error: "Invalid summary type." });
    }

    const prompt = buildPrompt(text, summaryType);

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Parse JSON — strip any accidental markdown fences
    let summaryData;
    try {
      const cleaned = responseText.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim();
      summaryData = JSON.parse(cleaned);
    } catch {
      return res.status(500).json({ error: "Failed to parse AI response. Please try again." });
    }

    // Validate required fields
    const required = ["title", "summary", "key_findings", "methodology", "field", "complexity"];
    for (const field of required) {
      if (!summaryData[field]) {
        return res.status(500).json({ error: "Incomplete AI response. Please try again." });
      }
    }

    return res.json({
      success: true,
      summaryType,
      data: summaryData,
    });
  } catch (err) {
    console.error("Summarize error:", err);
    const msg = err.message || "";
    if (msg.includes("API_KEY_INVALID") || msg.includes("API key")) {
      return res.status(500).json({ error: "Invalid Gemini API key. Check your GEMINI_API_KEY in .env." });
    }
    if (msg.includes("RESOURCE_EXHAUSTED") || err.status === 429) {
      return res.status(429).json({ error: "Gemini rate limit reached. Please try again shortly." });
    }
    return res.status(500).json({ error: "An unexpected error occurred. Please try again." });
  }
});

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "PaperBrief API" });
});

app.listen(PORT, () => {
  console.log(`PaperBrief API running on http://localhost:${PORT}`);
});
