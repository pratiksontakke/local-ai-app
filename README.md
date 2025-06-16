# Local AI Writer App

A web application that generates creative content (blog intros, tweets, stories) using local LLM inference.

## Features

- 📝 Generate blog intros, tweets, and short stories
- 🎯 Topic-based content generation
- 🎚️ Adjustable temperature for creativity control
- 💻 100% local inference - no cloud APIs needed
- ⚡ Real-time generation with loading states
- 📊 Output logging to track generations

## Tech Stack

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- Ollama for local LLM inference
- Mistral 7B as the base model

## Prerequisites

1. Node.js 18+ installed
2. [Ollama](https://ollama.ai/) installed
3. Mistral 7B model pulled via Ollama

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd local-ai-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Pull the Mistral model (if not already done):
   ```bash
   ollama pull mistral
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/                  # Next.js app directory
│   ├── api/             # API routes
│   ├── components/      # React components
│   ├── hooks/           # Custom React hooks
│   └── page.tsx         # Main page
├── public/              # Static assets
├── styles/             # Global styles
└── types/              # TypeScript type definitions
```

## License

MIT
