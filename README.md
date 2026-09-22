# Multimodal AI Vision Platform

A full-stack AI-powered image analysis platform built with **FastAPI** (backend) and plain **HTML/CSS/JS** (frontend).

## Features

| Module | Endpoint | Description |
|---|---|---|
| 🔮 Master AI | `POST /analyze/` | Auto-classifies image and routes to best specialist |
| 👁 Vision Q&A | `POST /vision/analyze` | Ask any question about an image |
| 📝 OCR | `POST /ocr/extract` | Extract text from images using EasyOCR |
| 🏷 Classification | `POST /classification/analyze` | Classify image content type |
| 🛒 Product ID | `POST /product/identify` | Identify commercial products |
| 🌿 Plant ID | `POST /plant/identify` | Identify plants, flowers, trees |
| 🐾 Animal ID | `POST /animal/identify` | Identify animals and breeds |
| 🏛 Landmark ID | `POST /landmark/identify` | Identify famous places and monuments |
| 📄 Document | `POST /document/summarize` | Summarize documents and forms |
| 🔍 Web Search | `GET /search/web?q=` | Tavily-powered web search |
| 🛍 Product Search | `POST /product/search` | Agentic product image → buy links |

## Tech Stack

- **Backend**: FastAPI, Python, Google Gemini AI, EasyOCR, Tavily Search
- **Frontend**: Single-file HTML + CSS + JavaScript (no build tools)
- **AI Provider**: Google Gemini (with HuggingFace fallback)

## Getting Started

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
pip install -r requirements.txt
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`.
Interactive docs: `http://localhost:8000/docs`

### Frontend

Simply open `frontend/index.html` in your browser — no build step needed.

Make sure the backend is running on `http://localhost:8000` before using the frontend.

## Environment Variables

Create a `.env` file inside the `backend/` directory:

```
GEMINI_API_KEY=your_gemini_api_key
TAVILY_API_KEY=your_tavily_api_key
HF_API_KEY=your_huggingface_api_key   # optional fallback
```

## Project Structure

```
Multimodel_Ai/
├── backend/
│   ├── app/
│   │   ├── api/          # Route handlers (11 endpoints)
│   │   ├── services/     # Business logic & AI integrations
│   │   └── main.py       # FastAPI app entry point
│   ├── .env              # API keys (not committed)
│   └── requirements.txt
└── frontend/
    └── index.html        # Single-file frontend
```

## API Documentation

Once the backend is running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`
