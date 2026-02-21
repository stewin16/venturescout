# 💎 VentureScout: Cinematic VC Intelligence Layer

VentureScout is an enterprise-grade AI discovery tool designed for high-conviction venture capital investors. It transforms raw digital footprints into structured, strategic intelligence using a cinematic interface and resilient AI synthesis.

## 🚀 What VentureScout Offers

VentureScout provides a proactive "scout layer" that automates the early stages of the investment funnel:

- **Cinematic Discovery**: Navigate a pipeline of strategic entities with luxury-grade filtering, faceted search, and fluid transitions.
- **Deep-Scan Agentic Synthesis**: Extract proprietary insights (summary, sector signals, keywords) directly from live websites using **Gemini 2.5 Flash**.
- **Thematic Intelligence Stacks**: Organize high-conviction startups into vertical-specific portfolios for focused monitoring.
- **Resilient AI Pipeline**: Features a sophisticated **Mock AI Fallback** that ensures the "Deploy Intelligence" workflow remains 100% functional during live demonstrations, even in low-connectivity or restricted API environments.
- **Persistence & Portability**: Integrated `localStorage` for zero-setup state persistence and high-fidelity **CSV/JSON exports** for CRM integration.
- **Enterprise Security**: Secure server-side API architecture that isolates your `GEMINI_API_KEY`, ensuring competitive secrets never leak to the client.

---

## 🛠️ Execution Steps (Setup)

Follow these steps to deploy your own instance of VentureScout:

### 1. Prerequisites
- **Node.js**: Version 18.0.0 or higher.
- **Git**: For repository management.
- **Gemini API Key**: Obtain a free key from [Google AI Studio](https://aistudio.google.com/app/apikey).

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/stewin16/venturescout.git
cd venturescout
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory (use `.env.example` as a template):
```env
GEMINI_API_KEY=your_actual_key_here
```
> [!NOTE]
> If you do not provide a key, the app will automatically enter **Strategic Mock Mode**, providing high-fidelity intelligence for demonstration purposes.

### 4. Launch Development Node
Start the Turbo-enabled development server:
```bash
npm run dev
```
Navigate to [http://localhost:3000](http://localhost:3000) to begin scouting.

---

## ⚡ Technical Architecture

- **UI Framework**: Next.js 15 (App Router & Turbopack)
- **AI Core**: Google Gemini 1.5/2.5 Flash SDK
- **Engine**: Cheerio-powered neural context extraction
- **Motion**: Framer Motion for cinematic staggered animations
- **Styles**: Custom CSS Glassmorphism & Tailwind CSS 4

## 🛡️ Security Protocol

All AI processing is conducted within Next.js Secure API Routes (`/api/enrich`). The application strictly adheres to the **"Zero-Leak" principle**:
1. No environment variables are exposed to the client.
2. Web scraping and AI prompting occur exclusively in a server-side isolated environment.
3. Proprietary data remains within your instance's caching layer.

---
*Created for the Venture Capital Scouting Internship Assignment.*
