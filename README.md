![alt text](<Screenshot 2026-04-03 at 10.20.18 PM.png>)
# PaperBrief

AI-powered research paper summarizer. Paste text or upload a PDF and get a structured summary in seconds — powered by Google Gemini 1.5 Flash.

## Features

- **Three summary modes:** Brief, Detailed, and ELI5 (plain-English)
- **PDF upload** (up to 10 MB) or paste text directly
- **Structured output:** title, summary, key findings, methodology, field, and complexity level
- **Summary history** stored locally (last 20 summaries)
- **Freemium model:** 3 summaries/day free, unlimited on Pro

## Tech Stack

| Layer    | Tech                                      |
|----------|-------------------------------------------|
| Frontend | React 18, Vite, Tailwind CSS              |
| Backend  | Node.js, Express                          |
| AI       | Google Gemini 1.5 Flash (`@google/generative-ai`) |
| PDF      | pdf-parse, Multer                         |

## Project Structure

```
paperbrief/
├── frontend/        # React SPA (Vite, Tailwind)
│   └── src/
│       ├── pages/   # Landing, AppPage, Pricing
│       └── components/
└── backend/         # Express API
    └── server.js    # Main server with /api/summarize
```

## Getting Started

### Prerequisites

- Node.js v16+
- [Google Gemini API key](https://aistudio.google.com/app/apikey)

### Backend

```bash
cd backend
npm install
cp .env.example .env   # then fill in your GEMINI_API_KEY
npm run dev
# Runs on http://localhost:3001
```

### Frontend

```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

The frontend proxies `/api` requests to `localhost:3001` automatically.

## Environment Variables

Create `backend/.env`:

```env
GEMINI_API_KEY=your_google_gemini_api_key
PORT=3001
```

## API

### `POST /api/summarize`

Summarize a research paper.

**Rate limit:** 3 requests/day per IP (free tier). Send `x-premium-user: true` header to bypass.

**Request (JSON):**
```json
{
  "text": "paper content here...",
  "summaryType": "brief" | "detailed" | "eli5"
}
```

**Request (multipart/form-data):** Upload a PDF file via the `pdf` field.

**Response:**
```json
{
  "success": true,
  "summaryType": "brief",
  "data": {
    "title": "string",
    "summary": "string",
    "key_findings": ["string"],
    "methodology": "string",
    "field": "string",
    "complexity": "Beginner | Intermediate | Advanced"
  }
}
```

### `GET /api/health`

Returns `{ "status": "ok", "service": "PaperBrief API" }`.

## Scripts

| Directory  | Command           | Description                    |
|------------|-------------------|--------------------------------|
| `backend`  | `npm start`       | Start production server        |
| `backend`  | `npm run dev`     | Start with auto-reload         |
| `frontend` | `npm run dev`     | Start Vite dev server          |
| `frontend` | `npm run build`   | Build for production           |
| `frontend` | `npm run preview` | Preview production build       |
