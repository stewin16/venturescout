# VentureScout: VC Startup Discovery Tool

An AI-powered intelligence layer for venture capital investors to discover, evaluate, and track potential investments.

## Features

- **Strategic Discovery**: Navigate high-growth startups with cinematic filtering and real-time search.
- **Deep-Scan Intelligence**: Extract proprietary insights directly from raw digital footprints using Gemini 2.5 Flash.
- **Thematic Pulse**: Organize entities into high-conviction thematic lists with automated signal detection.
- **Conviction Logic**: AI-generated thesis match scoring with qualitative rationale explanations.
- **Enterprise-Grade Security**: Server-side API isolation ensuring zero leakage of proprietary keys.

## Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (Turbopack Enabled)
- **AI Core**: [Google Gemini 2.5 Flash](https://aistudio.google.com/) (Next-Gen Intelligence)
- **Engine**: [Cheerio](https://cheerio.js.org/) for neural-context extraction.
- **Styling**: Cinematic VC Aesthetic (Custom CSS Glassmorphism).
- **Architecture**: Secure API Perimeter with In-Memory Caching.

## Key Features

- **Live AI Enrichment**: Scrapes real-time website content and extracts structured metadata using Gemini 1.5 Flash.
- **Explained Match Scoring**: AI generates a score (0-100) and a qualitative explanation based on your specific investment thesis.
- **Investment Lists**: Organize and manage thematic groups of startups with batch export.
- **Advanced Discovery**: Faceted filters and multi-column sorting for pipeline navigation.
- **Secure Architecture**: All AI processing is performed server-side via Next.js API routes, keeping your `GEMINI_API_KEY` safe and private.

## Setup Instructions

### 1. Prerequisites
- Node.js 18+
- Google AI Studio API Key ([Get one here](https://aistudio.google.com/app/apikey))

### 2. Environment Variables
Create a `.env.local` file in the root directory:

```env
GEMINI_API_KEY=your_api_key_here
```

### 3. Installation
```bash
npm install
```

### 4. Running Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to see the result.

## How Server-Side Enrichment Works

1. **Request**: The frontend initiates a deep-scan via the `/api/enrich` secure node.
2. **Context Capture**: The engine captures the raw digital footprint of the entity.
3. **Neural Cleanup**: `Cheerio` isolates high-signal text, stripping noise and metadata.
4. **Agentic Synthesis**: Cleaned context is fed to **Gemini 2.5 Flash** for multi-dimensional analysis.
5. **Structured Output**: Intelligence is parsed into a strict proprietary JSON schema.
6. **Persistence**: Results are cached server-side to ensure zero-latency retrieval for repeated views.
7. **Intelligence Rendering**: Insights are visualized in a high-fidelity cinematic dashboard.

## Security Explanation

**RESTRICTED API ACCESS**: The `GEMINI_API_KEY` is strictly a server-side environment variable. The frontend never sees this key, and all AI processing happens within Next.js API Routes. This prevents malicious usage or key leakage.

## Deployment for Vercel

This project is ready for Vercel out of the box.

1. Push code to GitHub.
2. Link the repository in the Vercel Dashboard.
3. Add `GEMINI_API_KEY` to the Environment Variables section in Project Settings.
4. Deploy!
