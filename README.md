<div align="center">

# ⚡ Vibe Coding

### Build Real Web Apps with AI — Zero Coding Required

[![Deploy to GitHub Pages](https://github.com/TheProductArchitect/vibe-coding/actions/workflows/deploy.yml/badge.svg)](https://github.com/TheProductArchitect/vibe-coding/actions/workflows/deploy.yml)
[![License](https://img.shields.io/badge/license-All%20Rights%20Reserved-red.svg)](#license)

**[🌐 Visit the Live Site →](https://vibe-coding.venugopinath.me/)**

</div>

---

## About

**Vibe Coding** is a free, open-access educational platform that teaches anyone how to build, deploy, and ship real web applications using AI — with absolutely no programming experience required.

The term "vibe coding" describes a new paradigm of software development where you describe what you want in plain English, and AI tools write the code for you. This site is the definitive guide for mastering that workflow.

## What You'll Learn

- **🧠 Vibe Coding Fundamentals** — Understand what vibe coding is, the AI-powered tools behind it, and why it's changing how software gets built.
- **🌐 How the Web Works** — Learn how websites, servers, APIs, domain names, DNS, and hosting fit together — explained simply, no jargon.
- **🛠️ Build & Deploy a Full Web App** — Follow a step-by-step workflow to go from idea → prompt → working app → deployed live on the internet.
- **💡 Prompt Engineering** — Master the art of writing effective prompts that produce production-quality code from AI tools like Gemini, Claude, and Cursor.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | React 19 + TypeScript |
| **Styling** | Tailwind CSS v4 |
| **Build Tool** | Vite 6 |
| **Animations** | Motion (Framer Motion) |
| **Icons** | Lucide React |
| **Hosting** | GitHub Pages |
| **CI/CD** | GitHub Actions |

## Getting Started

**Prerequisites:** [Node.js](https://nodejs.org/) (v20+)

```bash
# Clone the repo
git clone https://github.com/TheProductArchitect/vibe-coding.git
cd vibe-coding

# Install dependencies
npm install

# (Optional) Set your Gemini API key for AI features
# Create a .env.local file and add: GEMINI_API_KEY=your_key_here

# Start the dev server
npm run dev
```

The site will be running at **http://localhost:3000**.

## Project Structure

```
├── index.html          # Entry HTML with SEO meta tags & structured data
├── App.tsx             # Main app with routing and layout
├── components/
│   ├── Curriculum.tsx          # "I'm New to Vibe Coding" learning path
│   ├── ToolsSection.tsx        # "How Software Works" explainer
│   ├── WebsiteBuilderGuide.tsx # Step-by-step build & deploy workflow
│   └── ...
├── public/
│   ├── CNAME           # Custom domain for GitHub Pages
│   ├── sitemap.xml     # XML sitemap for search engines
│   ├── robots.txt      # Crawler directives
│   └── favicon.svg     # Site icon
└── .github/workflows/
    └── deploy.yml      # CI/CD pipeline → GitHub Pages
```

## License

© 2026 Venu Gopinath. All rights reserved.

This project and its contents — including all code, text, design, and educational materials — are the intellectual property of Venu Gopinath. Unauthorized reproduction, distribution, or commercial use of any part of this project is strictly prohibited without prior written permission.
