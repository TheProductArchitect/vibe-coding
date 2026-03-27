import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Terminal, Globe, Rocket, Search, Code, CheckCircle, Copy, ChevronRight, ChevronLeft, GitBranch, Server, Zap, Layout, Play, ArrowDown, RefreshCw, MessageSquare, UserPlus, Key, Settings, Download, ExternalLink, MousePointerClick, Eye, Check, Power, BookOpen, Sparkles, Lightbulb, AlertCircle, FileText, Target, Wrench, Shield, TrendingUp, HelpCircle, Link } from 'lucide-react';
import ScrollProgressLine from './ScrollProgressLine';

type StepItemType = 'command' | 'prompt' | 'instruction' | 'suggestion';

interface StepItem {
  type: StepItemType;
  text: string;
  expectedOutput?: string;
  subtext?: string;
  why?: string;
  bestPractices?: string;
}

interface WorkflowPhase {
  title: string;
  subtitle: string;
  icon: React.ElementType;
  steps: {
    label: string;
    desc?: string;
    items: StepItem[];
  }[];
}

// Build Path definitions
type BuildPathId = 'lovable' | 'cursor' | 'antigravity';

interface BuildPath {
  id: BuildPathId;
  name: string;
  tagline: string;
  effort: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  border: string;
  description: string;
  bestFor: string;
  link: string;
}

const BUILD_PATHS: BuildPath[] = [
  {
    id: 'lovable',
    name: 'Lovable',
    tagline: 'Zero to Live in Minutes',
    effort: 'Easiest',
    icon: Sparkles,
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/30',
    description: 'Build entirely in the browser. Type what you want, watch it appear in real-time. One-click deploy. No setup, no terminal, no installs.',
    bestFor: 'MVPs, landing pages, quick prototypes, non-technical founders',
    link: 'https://lovable.dev'
  },
  {
    id: 'cursor',
    name: 'Cursor',
    tagline: 'AI-Powered IDE',
    effort: 'Moderate',
    icon: Code,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    description: 'A desktop IDE with built-in AI chat. Write prompts alongside your code with full file access, terminal, and Git integration.',
    bestFor: 'Developers who want AI assistance with local control, multi-file projects',
    link: 'https://cursor.sh'
  },
  {
    id: 'antigravity',
    name: 'AI Studio + Antigravity',
    tagline: 'Full Control Pro Workflow',
    effort: 'Advanced',
    icon: Rocket,
    color: 'text-brand-primary',
    bg: 'bg-brand-primary/10',
    border: 'border-brand-primary/30',
    description: 'Generate a baseline with Google AI Studio, then refine locally with Antigravity. Full ownership, custom CI/CD, GitHub Pages deployment.',
    bestFor: 'Production sites, learning real workflows, full ownership and customization',
    link: 'https://antigravity.google'
  }
];

// --- Workflow data per path ---

const lovablePhases: WorkflowPhase[] = [
  {
    title: "Step 1",
    subtitle: "Create Your App",
    icon: Sparkles,
    steps: [
      {
        label: "Open Lovable",
        desc: "Go to lovable.dev and sign in with your Google or GitHub account.",
        items: [
          {
            type: 'instruction',
            text: "Navigate to lovable.dev and click 'Start Building'. Sign in with Google or GitHub for free access.",
            why: "Lovable runs entirely in the browser — no downloads, no terminal, no setup. It's the fastest path from idea to working app.",
            bestPractices: "Use Google Chrome for the best experience. Ensure pop-ups are allowed for the preview window."
          }
        ]
      },
      {
        label: "Describe Your App",
        desc: "Type what you want in the prompt box. Be specific about pages, layout, and style.",
        items: [
          {
            type: 'prompt',
            text: "Build a modern portfolio website with a dark theme. It should have: a hero section with my name and tagline, an 'About Me' section, a projects grid with 3 cards, and a contact form. Use smooth animations and a professional design.",
            expectedOutput: "Lovable generates a complete, styled React app in real-time. You'll see the preview update as it builds each component.",
            why: "The more specific your first prompt, the closer the result. Lovable uses generative UI — it doesn't just write code, it renders the result live as it generates.",
            bestPractices: "Include: (1) The type of site (portfolio, landing page, dashboard), (2) Specific sections you want, (3) Style preferences (dark, minimal, colorful). Add 'responsive' for mobile support."
          }
        ]
      }
    ]
  },
  {
    title: "Step 2",
    subtitle: "Iterate & Customize",
    icon: RefreshCw,
    steps: [
      {
        label: "Refine with Follow-up Prompts",
        desc: "Ask Lovable to change anything — colors, layout, content, features.",
        items: [
          {
            type: 'suggestion',
            text: "Examples: 'Change the hero background to a gradient from dark blue to black.' or 'Add a testimonials carousel below the projects section.' or 'Make the contact form send to my email using Resend.'",
            why: "Lovable excels at iterative changes. Each prompt modifies the live preview instantly, so you can fine-tune until it's perfect.",
            bestPractices: "Make one change at a time. Check the preview after each prompt. If something breaks, use the 'Undo' button or tell Lovable: 'Revert the last change.'"
          }
        ]
      },
      {
        label: "Connect a Database (Optional)",
        desc: "Lovable integrates with Supabase for authentication, databases, and storage.",
        items: [
          {
            type: 'instruction',
            text: "Click the Supabase integration button in the Lovable sidebar to connect a backend. Ask: 'Add user authentication with Supabase — users should sign up with email and password.'",
            why: "If your app needs to store data, manage users, or handle forms beyond simple email, you'll need a backend. Supabase is free and Lovable connects to it natively.",
            bestPractices: "Start without a database. Add it only when you need data persistence (user accounts, saving form submissions, dynamic content). Most portfolio/landing page sites don't need one."
          }
        ]
      }
    ]
  },
  {
    title: "Step 3",
    subtitle: "Deploy & Share",
    icon: Globe,
    steps: [
      {
        label: "Publish with One Click",
        desc: "Lovable hosts your site automatically. Just click 'Publish'.",
        items: [
          {
            type: 'instruction',
            text: "Click the 'Share' or 'Publish' button in the top-right corner. Your site will be live at a lovable.app URL instantly.",
            expectedOutput: "You'll receive a public URL like https://your-app-name.lovable.app that anyone can visit.",
            why: "No GitHub, no Actions, no deploy pipeline needed. Lovable handles hosting, SSL, and CDN for you.",
            bestPractices: "Share the URL to test on different devices — check it on your phone, tablet, and desktop. If anything looks off on mobile, tell Lovable to fix the responsive layout."
          }
        ]
      },
      {
        label: "Connect a Custom Domain (Optional)",
        desc: "Point your own domain to your Lovable app for a professional URL.",
        items: [
          {
            type: 'instruction',
            text: "In Lovable settings, go to 'Custom Domain'. Follow the DNS instructions to point your domain (e.g., mysite.com) to Lovable's servers.",
            why: "A custom domain makes your site look professional. 'mysite.com' is more credible than 'random-name.lovable.app'.",
            bestPractices: "You can buy domains from Namecheap, Google Domains, or Cloudflare for ~$10/year. Set up DNS changes and wait 10-30 minutes for propagation."
          }
        ]
      },
      {
        label: "Export to GitHub (Optional)",
        desc: "If you want full ownership of the code, export it.",
        items: [
          {
            type: 'instruction',
            text: "Click 'Export to GitHub' in the Lovable menu. This creates a repository on your GitHub account with all the code. From here, you can switch to the Antigravity or Cursor workflow for deeper customization.",
            why: "Exporting gives you full ownership. Lovable is great for building fast, but if you want to customize beyond what the AI handles, local development gives you unlimited control.",
            bestPractices: "Only export when you've outgrown Lovable's capabilities. For most landing pages and simple apps, staying in Lovable is perfectly fine."
          }
        ]
      }
    ]
  }
];

const cursorPhases: WorkflowPhase[] = [
  {
    title: "Step 1",
    subtitle: "Set Up Cursor",
    icon: Download,
    steps: [
      {
        label: "Download & Install Cursor",
        desc: "Get the AI-powered IDE from cursor.sh.",
        items: [
          {
            type: 'instruction',
            text: "Go to cursor.sh and download the app for your OS. Install and open it. Sign in with your Google or GitHub account for free AI access.",
            why: "Cursor is VS Code with built-in AI. It understands your entire codebase and can edit multiple files at once from a single prompt.",
            bestPractices: "If you're already a VS Code user, Cursor will feel instantly familiar — it's a fork of VS Code with all the same extensions and shortcuts."
          }
        ]
      },
      {
        label: "Create a New Project",
        desc: "Let Cursor generate your starting codebase from a description.",
        items: [
          {
            type: 'prompt',
            text: "Create a new React + Vite + TypeScript project for a [your topic] website. Set up the folder structure with /components, include a package.json with all dependencies, and create a hero section, about section, and contact form. Use a modern dark theme with clean typography.",
            expectedOutput: "Cursor creates the files directly in your project folder. You'll see them appear in the sidebar — package.json, vite.config.ts, src/App.tsx, components/, etc.",
            why: "Cursor's Composer mode can generate entire project scaffolds from a single prompt. Unlike AI Studio, the files are created directly on your machine — no download step needed.",
            bestPractices: "Open a fresh empty folder first (File > Open Folder > create/select an empty folder). This ensures Cursor generates files in the right place. Use Ctrl/Cmd+I to open the AI chat panel."
          }
        ]
      }
    ]
  },
  {
    title: "Step 2",
    subtitle: "Build & Iterate",
    icon: Code,
    steps: [
      {
        label: "Install & Run Locally",
        desc: "Use the integrated terminal to start your development server.",
        items: [
          {
            type: 'prompt',
            text: "Open the terminal and run npm install, then npm run dev to start the local development server.",
            expectedOutput: "Terminal shows the dev server URL (e.g., http://localhost:5173). Open it in your browser to preview.",
            why: "Cursor has a built-in terminal, so you never need to leave the editor. Running locally lets you see changes in real-time.",
            bestPractices: "Use Ctrl/Cmd+` to toggle the terminal. If you see errors, select the error text, press Ctrl/Cmd+I, and ask: 'Fix this error'."
          }
        ]
      },
      {
        label: "Iterate with AI Chat",
        desc: "Use Cursor's inline AI to edit, add features, and fix issues.",
        items: [
          {
            type: 'suggestion',
            text: "Select code and press Ctrl/Cmd+K for inline edits, or use Ctrl/Cmd+I for the full Composer. Examples: 'Add a responsive navbar with a hamburger menu on mobile' or 'Make this component animate in when it scrolls into view using Framer Motion'.",
            why: "Cursor's unique advantage is that the AI can see your entire project — all files, all imports, all dependencies. This means it writes code that actually fits your existing structure.",
            bestPractices: "For small edits: select the code + Ctrl/Cmd+K. For new features spanning multiple files: use Composer (Ctrl/Cmd+I). Always review the diff before accepting changes."
          }
        ]
      },
      {
        label: "Debug with AI",
        desc: "When errors appear, let Cursor's AI diagnose and fix them.",
        items: [
          {
            type: 'suggestion',
            text: "If you see a red underline or terminal error: click on it, press Ctrl/Cmd+I, and say 'Fix this error'. Cursor will read the error, find the source, and propose a fix across all affected files.",
            why: "Debugging is where Cursor shines over browser-based tools. It can trace errors across your entire codebase and fix multiple files in one go.",
            bestPractices: "Always let the AI explain what went wrong before accepting the fix. This builds your understanding of common patterns and prevents the same issue from recurring."
          }
        ]
      }
    ]
  },
  {
    title: "Step 3",
    subtitle: "Deploy to Production",
    icon: Globe,
    steps: [
      {
        label: "Initialize Git & Push",
        desc: "Version your code and push it to GitHub.",
        items: [
          {
            type: 'prompt',
            text: "Initialize a Git repository, create a .gitignore for Node projects, and push this code to a new public GitHub repository called 'my-site'.",
            expectedOutput: "Cursor runs git init, creates the repo via GitHub CLI or API, and pushes. You'll see the repo on your GitHub profile.",
            why: "Git saves your progress. GitHub stores it in the cloud. Together they ensure you never lose work and can collaborate with others.",
            bestPractices: "Cursor has built-in Git integration in the sidebar. You can also stage, commit, and push from the Source Control panel (Ctrl/Cmd+Shift+G)."
          }
        ]
      },
      {
        label: "Deploy with Vercel or GitHub Pages",
        desc: "Choose the fastest path to get your site live.",
        items: [
          {
            type: 'instruction',
            text: "Option A (Easiest): Go to vercel.com, sign in with GitHub, click 'Import Project', select your repo. It auto-detects Vite and deploys in ~60 seconds. Option B (Free): Ask Cursor to create a GitHub Actions workflow for GitHub Pages deployment.",
            expectedOutput: "Your site is live at a public URL (either yourname.vercel.app or username.github.io/repo-name).",
            why: "Vercel is the fastest deploy experience — zero config for Vite/React apps. GitHub Pages is 100% free but requires a workflow file.",
            bestPractices: "Use Vercel for speed, GitHub Pages for cost ($0). Both auto-deploy when you push to main. For custom domains, both platforms support them for free."
          }
        ]
      }
    ]
  }
];

const antigravityPhases: WorkflowPhase[] = [
  {
    title: "Phase 1",
    subtitle: "Generate with AI Studio",
    icon: Sparkles,
    steps: [
      {
        label: "Open Google AI Studio",
        desc: "Navigate to the Build interface.",
        items: [
          {
            type: 'instruction',
            text: "Go to aistudio.google.com and log in with your Google account. Select 'Build with Gemini' or start a new chat.",
            why: "AI Studio is the native interface for Gemini models, offering the fastest and most direct access to the latest capabilities without third-party overhead. It's free and doesn't require API keys for basic usage.",
            bestPractices: "Ensure you are logged in with the Google account you intend to use for development. Use the latest available model (Gemini 2.0 Flash or newer) for the best speed/quality ratio."
          }
        ]
      },
      {
        label: "Write Your First Prompt",
        desc: "The quality of your prompt determines the quality of your app. Be specific about what you want.",
        items: [
          {
            type: 'prompt',
            text: "Generate a complete, responsive website for [Insert Topic] using React with Vite and TypeScript. Include a package.json with all dependencies, a vite.config.ts configured for static export, and organize components in a /components folder. Use a modern dark theme. The site should have: a hero section, an about section, and a contact section with a form.",
            expectedOutput: "A complete file structure including package.json, vite.config.ts, index.html, and src/ folder with React components. You should see code blocks for each file.",
            why: "A detailed first prompt saves hours of iteration later. The more specific you are about structure (React + Vite), styling (dark theme), and features (hero, about, contact), the closer the output will be to what you want.",
            bestPractices: "Always specify: (1) The framework (React, Vue, vanilla HTML), (2) The build tool (Vite), (3) The visual style (dark, minimal, colorful), (4) The specific sections/pages you want. Include 'responsive' to ensure it works on mobile."
          }
        ]
      },
      {
        label: "Review & Download",
        desc: "Verify completeness, then export to your local machine.",
        items: [
          {
            type: 'instruction',
            text: "Before downloading: verify the package.json has 'dev' and 'build' scripts, check that all imports match the file structure, and ask the AI if anything is missing. Then click 'Export' or manually copy files into a folder named 'my-first-app'.",
            why: "Catching issues before download is much faster than debugging locally. A missing dependency or broken import path will cause errors that confuse beginners.",
            bestPractices: "Ask: 'Is this project structure complete? Will it build without errors?' before downloading. Create a dedicated 'Projects' folder to keep things organized."
          }
        ]
      }
    ]
  },
  {
    title: "Phase 2",
    subtitle: "Build & Refine with Antigravity",
    icon: Rocket,
    steps: [
      {
        label: "Open the Project",
        desc: "Launch Google Antigravity, select File > Open Folder, and choose the downloaded project folder.",
        items: [
          {
            type: 'instruction',
            text: "Open Antigravity (or VS Code), select 'File > Open Folder', and choose the folder you just extracted.",
            why: "The editor needs to know which folder contains your project to index files, understand the structure, and run commands correctly. Opening the wrong folder is the #1 cause of 'it doesn't work' for beginners.",
            bestPractices: "Always open the *root* folder (the one containing package.json). You should see package.json in the file explorer sidebar — if you don't, you've opened the wrong folder."
          }
        ]
      },
      {
        label: "Understand the Structure",
        desc: "Before installing anything, ask the AI to explain what you're working with.",
        items: [
          {
            type: 'prompt',
            text: "Explain the project structure. What framework does this use? What are the key files and folders? List the dependencies in package.json and briefly explain what each one does.",
            expectedOutput: "The AI will break down the folder structure and explain each dependency — like 'react' for UI, 'vite' for bundling, etc.",
            why: "Understanding what you're working with prevents confusion later. If a dependency is missing or wrong, you'll catch it now instead of debugging cryptic errors.",
            bestPractices: "Pay special attention to the 'scripts' section in package.json — that tells you what commands are available (dev, build, preview)."
          }
        ]
      },
      {
        label: "Install & Run Locally",
        desc: "Install dependencies and start the local development server.",
        items: [
          {
            type: 'prompt',
            text: "Install the Node dependencies from the package.json and start the local development server so I can preview the website right now.",
            expectedOutput: "Terminal shows 'Ready in x ms' and provides a localhost URL (e.g., http://localhost:5173).",
            why: "Running locally lets you see changes instantly. This is the core loop: change code → see result → iterate.",
            bestPractices: "If you see errors, don't panic. Copy the ENTIRE error message and paste it to the AI: 'I got this error when running npm install. Fix it.'"
          }
        ]
      },
      {
        label: "Iterate & Build Features",
        desc: "Fix issues, then add features one at a time.",
        items: [
          {
            type: 'suggestion',
            text: "First fix anything broken: 'The hero text is invisible — change background to dark navy blue.' Then add features: 'Add a testimonials section with 3 cards.' Be specific about location AND desired result.",
            why: "AI coding is iterative. Small, specific requests work better than massive overhauls. Think of it like directing a film — one scene at a time.",
            bestPractices: "After each change, check the browser preview. Fix issues before moving to the next feature. Don't stack 5 changes and debug them all at once."
          }
        ]
      },
      {
        label: "Push to GitHub & Deploy",
        desc: "Save your work and set up automatic deployment.",
        items: [
          {
            type: 'prompt',
            text: "Initialize a Git repo, push to a new public GitHub repository called 'my-first-site', then create a GitHub Actions workflow to automatically deploy to GitHub Pages on every push to main.",
            expectedOutput: "Code is pushed to GitHub. The Actions tab shows a running workflow. Once green, your site is live at https://[username].github.io/[repo-name].",
            why: "Git is your 'save game' system. GitHub Actions automates deployment — every push to main automatically rebuilds and publishes your site.",
            bestPractices: "After deploying, go to GitHub → Settings → Pages to find your live URL. Never share your GitHub token publicly."
          }
        ]
      },
      {
        label: "Quality Checks (Optional)",
        desc: "Automated Lighthouse testing on every push.",
        items: [
          {
            type: 'prompt',
            text: "Create a GitHub Actions workflow for Lighthouse CI. Build the app on every push and run Lighthouse against the output. Warn (don't fail) if any score drops below 90.",
            expectedOutput: "A lighthouse.yml workflow file is created. Future pushes generate performance reports in GitHub Actions logs.",
            why: "Lighthouse tests performance, accessibility, and SEO automatically. It's like a free code review on every push.",
            bestPractices: "Aim for 90+ on Performance and Accessibility. If scores drop, ask the AI: 'My Lighthouse score is 72. What are the top 3 fixes?'"
          }
        ]
      }
    ]
  },
  {
    title: "Phase 3",
    subtitle: "Returning Workflow (Updating & Growing)",
    icon: RefreshCw,
    steps: [
      {
        label: "Reopen & Sync",
        desc: "Pull latest changes and start the dev server.",
        items: [
          {
            type: 'prompt',
            text: "Pull the latest changes from GitHub, install any new dependencies, and start the local development server.",
            expectedOutput: "Terminal confirms 'Already up to date', runs npm install, and starts the dev server.",
            why: "Always pull before editing to avoid merge conflicts.",
            bestPractices: "If working from a different computer, clone the repo first: 'Clone my repository [URL] and set it up locally'."
          }
        ]
      },
      {
        label: "Add Features & Deploy",
        desc: "Build incrementally, then push to auto-deploy.",
        items: [
          {
            type: 'suggestion',
            text: "Add features one at a time: 'Add a blog section', 'Add dark/light mode toggle', 'Integrate Google Analytics'. Test each locally, then commit with a descriptive message and push to main.",
            why: "Each session adds a layer of sophistication. By your 5th session, you'll have a professional-grade site.",
            bestPractices: "Fix bugs first, then add ONE feature, test it, commit. Write meaningful commit messages like 'Added pricing table with 3 tiers'."
          }
        ]
      },
      {
        label: "Monitor & Maintain",
        desc: "Keep your live site healthy with monthly check-ins.",
        items: [
          {
            type: 'suggestion',
            text: "Monthly: (1) Check GitHub Actions for failed deploys. (2) Run Lighthouse on your live URL. (3) Ask the AI: 'Check for outdated npm packages and update them safely.' (4) Review GitHub security alerts.",
            why: "15 minutes of maintenance per month prevents major issues. Dependencies get security patches, browsers update, and user expectations evolve.",
            bestPractices: "If an update breaks something: 'The last commit broke the site. Revert to the previous working version.'"
          }
        ]
      }
    ]
  }
];

const LearningSection: React.FC = () => {
  const [expandedTip, setExpandedTip] = useState<number | null>(null);

  const tips = [
    {
      title: "Be Specific in Prompts",
      short: "Say exactly what, where, and how you want it.",
      detail: "'Add a dark navbar with white text and a gold logo' beats 'fix the header'. Include colors, positions, and behavior.",
      icon: Target
    },
    {
      title: "Test Locally First",
      short: "Preview in the browser before deploying.",
      detail: "Run your dev server, check every page, click every link. Catching bugs locally is 10x faster than debugging live.",
      icon: Play
    },
    {
      title: "Save After Every Win",
      short: "Commit your code whenever something works.",
      detail: "Small Git commits are save points. Break something? Revert to the last working version instantly.",
      icon: GitBranch
    },
    {
      title: "Paste Errors to AI",
      short: "Don't decode errors — let AI fix them.",
      detail: "Copy the FULL error message and paste to AI. It resolves 95% of issues instantly.",
      icon: AlertCircle
    },
    {
      title: "One Change at a Time",
      short: "Make one edit, test it, then move on.",
      detail: "Don't ask for 5 features in one prompt. Smaller changes = easier debugging.",
      icon: Wrench
    },
    {
      title: "Keep Secrets Safe",
      short: "Never put API keys in your code.",
      detail: "Use .env files locally, environment variables in production. Add .env to .gitignore.",
      icon: Shield
    }
  ];

  const tools = [
    { name: "Google AI Studio", url: "https://aistudio.google.com", desc: "Generate code with Gemini AI" },
    { name: "Lovable", url: "https://lovable.dev", desc: "Build apps in browser" },
    { name: "Cursor", url: "https://cursor.sh", desc: "AI-powered code editor" },
    { name: "Antigravity", url: "https://antigravity.google", desc: "Google's AI editor" },
    { name: "GitHub", url: "https://github.com", desc: "Host & version code" },
    { name: "GitHub Pages", url: "https://pages.github.com", desc: "Free website hosting" },
    { name: "Vercel", url: "https://vercel.com", desc: "One-click deploys" },
    { name: "Supabase", url: "https://supabase.com", desc: "Backend & database" },
  ];

  const learningResources = [
    { name: "Prompt Engineering Guide", url: "https://www.promptingguide.ai", desc: "Master AI prompting techniques" },
    { name: "Andrej Karpathy on Vibe Coding", url: "https://x.com/karpathy/status/1886192184808149383", desc: "The tweet that coined 'vibe coding'" },
    { name: "Lovable Docs", url: "https://docs.lovable.dev", desc: "Learn Lovable's AI builder" },
    { name: "Cursor Docs", url: "https://docs.cursor.com", desc: "Cursor IDE tips & workflows" },
    { name: "Google AI Studio Guide", url: "https://ai.google.dev/gemini-api/docs/ai-studio-quickstart", desc: "Get started with Gemini" },
    { name: "Build with AI (Google)", url: "https://buildwith.google/ai", desc: "Google's AI building resources" },
    { name: "Replit Agent Docs", url: "https://docs.replit.com/replitai/agent", desc: "AI-powered app builder" },
    { name: "V0 by Vercel", url: "https://v0.dev", desc: "AI UI generation from prompts" },
    { name: "Bolt.new", url: "https://bolt.new", desc: "AI-powered full-stack builder" },
  ];

  return (
    <div id="resources-and-tools" className="mt-24 space-y-8">
      {/* Golden Rules */}
      <div className="bg-[#111] border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

        <div className="animate-float-gentle text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase mb-4 border border-white/10">
            <BookOpen className="w-3 h-3" /> Quick Tips
          </div>
          <h3 className="text-2xl md:text-3xl font-bold font-serif text-white mb-2">Golden Rules</h3>
          <p className="text-gray-300 text-sm">Tap any rule to learn more.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          {tips.map((tip, i) => (
            <button
              key={i}
              onClick={() => setExpandedTip(expandedTip === i ? null : i)}
              className="text-left bg-[#0a0a0a] border border-white/5 rounded-xl p-4 hover:border-white/20 transition-all group"
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-brand-primary/10 transition-colors">
                  <tip.icon className="w-4 h-4 text-brand-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-bold text-white">{tip.title}</h4>
                    <ChevronRight className={`w-3 h-3 text-gray-400 shrink-0 transition-transform ${expandedTip === i ? 'rotate-90' : ''}`} />
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{tip.short}</p>
                </div>
              </div>

              <AnimatePresence>
                {expandedTip === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="text-xs text-gray-400 leading-relaxed mt-3 pt-3 border-t border-white/5 pl-12">
                      {tip.detail}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          ))}
        </div>
      </div>

      {/* Tools */}
      <div className="bg-[#111] border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-primary via-yellow-500 to-orange-500"></div>

        <div className="animate-float-gentle-delayed text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-brand-primary/10 text-brand-primary px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase mb-4 border border-brand-primary/20">
            <Wrench className="w-3 h-3" /> Tools
          </div>
          <h3 className="text-2xl md:text-3xl font-bold font-serif text-white mb-2">Essential Tools</h3>
          <p className="text-gray-400 text-sm">Bookmark these — you'll use them in every project.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
          {tools.map((res, i) => (
            <a
              key={i}
              href={res.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0a0a0a] border border-white/5 rounded-xl p-3 md:p-4 hover:border-brand-primary/30 hover:bg-[#111] transition-all group flex flex-col gap-1"
            >
              <div className="flex items-center justify-between gap-1">
                <span className="text-xs md:text-sm font-bold text-white group-hover:text-brand-primary transition-colors truncate">{res.name}</span>
                <ExternalLink className="w-3 h-3 text-gray-500 group-hover:text-brand-primary shrink-0 transition-colors" />
              </div>
              <span className="text-[10px] md:text-xs text-gray-400">{res.desc}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Learning Resources */}
      <div className="bg-[#111] border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500"></div>

        <div className="animate-float-gentle-delayed text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase mb-4 border border-blue-500/20">
            <BookOpen className="w-3 h-3" /> Resources
          </div>
          <h3 className="text-2xl md:text-3xl font-bold font-serif text-white mb-2">Learn & Grow</h3>
          <p className="text-gray-400 text-sm">Explore vibe coding resources, tools, and the people shaping this movement.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
          {learningResources.map((res, i) => (
            <a
              key={i}
              href={res.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0a0a0a] border border-white/5 rounded-xl p-3 md:p-4 hover:border-blue-500/30 hover:bg-[#111] transition-all group flex flex-col gap-1"
            >
              <div className="flex items-center justify-between gap-1">
                <span className="text-xs md:text-sm font-bold text-white group-hover:text-blue-400 transition-colors truncate">{res.name}</span>
                <ExternalLink className="w-3 h-3 text-gray-500 group-hover:text-blue-400 shrink-0 transition-colors" />
              </div>
              <span className="text-[10px] md:text-xs text-gray-400">{res.desc}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

const SetupVisualizer: React.FC = () => {
  const [step, setStep] = useState(0);

  const nextStep = () => setStep((prev) => (prev + 1) % 4);
  const prevStep = () => setStep((prev) => (prev - 1 + 4) % 4);

  // SETUP STEPS (Top Carousel) - Environment Setup
  const setupComponents = [
    {
      label: "1. Google Account",
      sub: "Access Key",
      desc: "Required to access Google AI Studio and the Antigravity IDE.",
      cta: "Sign in to Google",
      link: "https://accounts.google.com",
      icon: UserPlus,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500"
    },
    {
      label: "2. Google Antigravity",
      sub: "The IDE",
      desc: "Install the AI-first editor from antigravity.google to start building.",
      cta: "Download Antigravity",
      link: "https://antigravity.google",
      icon: Download,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      border: "border-purple-500"
    },
    {
      label: "3. GitHub Account",
      sub: "Code Hosting",
      desc: "Create an account at github.com to host your repositories.",
      cta: "Join GitHub",
      link: "https://github.com/signup",
      icon: GitBranch,
      color: "text-white",
      bg: "bg-white/10",
      border: "border-white"
    },
    {
      label: "4. Access Token (Classic)",
      sub: "Crucial Permission",
      desc: "Generate a Classic Token with 'repo' and 'workflow' scopes so Antigravity can push code.",
      cta: "Generate Token",
      link: "https://github.com/settings/tokens",
      icon: Key,
      color: "text-green-400",
      bg: "bg-green-500/10",
      border: "border-green-500"
    }
  ];

  const currentComponent = setupComponents[step];

  return (
    <div className="w-full bg-[#050505] border border-white/10 rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-2xl mb-16">
      {/* Visualizer Area */}
      <div
        className="flex-1 relative p-8 md:p-12 min-h-[400px] flex items-center justify-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent select-none"
      >
        {/* Helper Text */}
        <div className="absolute top-4 right-4 text-xs font-mono text-gray-400 opacity-70 flex items-center gap-1 border border-white/20 px-2 py-1 rounded bg-black/60">
          Click icons to navigate
        </div>

        {/* Nodes Container */}
        <div className="relative z-10 w-full max-w-4xl flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0">

          {setupComponents.map((s, i) => (
            <div
              key={i}
              onClick={() => setStep(i)}
              className={`relative flex flex-col items-center transition-all duration-300 cursor-pointer ${step === i ? 'scale-110 opacity-100 z-20' : 'opacity-70 scale-95 hover:opacity-100 hover:scale-100'}`}
            >
              <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl border-2 flex items-center justify-center mb-4 transition-colors bg-black ${step === i ? `${s.border} shadow-[0_0_20px_rgba(255,255,255,0.2)]` : 'border-white/20 hover:border-white/40'}`}>
                <s.icon className={`w-8 h-8 ${step === i ? s.color : 'text-gray-300'}`} />
              </div>
              {step === i && (
                <div className={`absolute -bottom-10 text-center animate-fade-in w-32`}>
                  <div className={`text-[10px] font-bold uppercase tracking-widest ${s.color} mb-1`}>Current Step</div>
                </div>
              )}
            </div>
          ))}

        </div>
      </div>

      {/* Description Panel */}
      <div className="w-full md:w-80 border-t md:border-t-0 md:border-l border-white/10 bg-[#0a0a0a] p-8 flex flex-col justify-between relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-primary via-purple-500 to-pink-500">
          <div
            className="h-full bg-white blur-[2px] transition-all duration-500 ease-out"
            style={{ width: `${((step + 1) / 4) * 100}%` }}
          ></div>
        </div>

        <div>
          <span className={`text-xs font-bold uppercase tracking-widest px-2 py-1 rounded mb-4 inline-block ${currentComponent.bg} ${currentComponent.color}`}>
            Environment Setup {step + 1}
          </span>
          <h3 className="text-2xl font-serif text-white mb-1 min-h-[2rem] transition-all duration-300">
            {currentComponent.label}
          </h3>
          <div className="text-sm font-mono text-gray-400 mb-4">{currentComponent.sub}</div>
          <p className="text-gray-300 leading-relaxed min-h-[4rem] transition-all duration-300 mb-6">
            {currentComponent.desc}
          </p>

          {/* Setup CTA */}
          {currentComponent.link ? (
            <a
              href={currentComponent.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 border border-white/10 rounded-lg p-3 block hover:bg-white/10 transition-colors group/cta"
            >
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 flex items-center justify-between">
                Action Required <ExternalLink className="w-3 h-3 opacity-50 group-hover/cta:opacity-100" />
              </div>
              <div className="text-sm font-bold text-white flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-brand-primary mt-0.5 shrink-0" />
                {currentComponent.cta}
              </div>
            </a>
          ) : (
            <div className="bg-white/5 border border-white/10 rounded-lg p-3">
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Action Required</div>
              <div className="text-sm font-bold text-white flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-brand-primary mt-0.5 shrink-0" />
                {currentComponent.cta}
              </div>
            </div>
          )}
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center gap-2 mt-6">
          <button
            onClick={(e) => { e.stopPropagation(); prevStep(); }}
            className="p-3 rounded-xl hover:bg-white/10 text-white transition-colors border border-white/10 hover:border-white/30"
            aria-label="Previous Step"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); nextStep(); }}
            className="flex-1 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-all border border-white/10 hover:border-white/30 flex items-center justify-center gap-2 shadow-lg"
          >
            {step === 3 ? 'Restart' : 'Next'} <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const StepItemDisplay: React.FC<{ item: StepItem, id: string }> = ({ item, id }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getIcon = () => {
    switch (item.type) {
      case 'command': return <Terminal className="w-3 h-3 text-purple-400" />;
      case 'prompt': return <MessageSquare className="w-3 h-3 text-brand-primary" />;
      case 'instruction': return <MousePointerClick className="w-3 h-3 text-blue-400" />;
      case 'suggestion': return <Lightbulb className="w-3 h-3 text-yellow-400" />;
    }
  };

  const hasDetails = item.expectedOutput || item.why || item.bestPractices;

  return (
    <div className="group/item relative mb-3 last:mb-0">
      <div
        className={`bg-[#111] border border-white/10 rounded-lg p-3 transition-all cursor-pointer relative overflow-hidden group/card hover:border-brand-primary/50 hover:shadow-[0_0_15px_rgba(255,194,14,0.1)] hover:-translate-y-0.5`}
        onClick={() => hasDetails && setShowDetails(!showDetails)}
      >
        {/* Hover Light Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/5 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="flex items-start justify-between gap-3 relative z-10">
          <div className="flex items-start gap-3 overflow-hidden">
            <div className="mt-0.5 shrink-0 opacity-70">{getIcon()}</div>
            <div className="min-w-0">
              <div className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${item.type === 'prompt' ? 'text-brand-primary' :
                item.type === 'instruction' ? 'text-blue-400' :
                  item.type === 'suggestion' ? 'text-yellow-400' : 'text-purple-400'
                }`}>
                {item.type === 'prompt' ? 'Ask AI:' :
                  item.type === 'instruction' ? 'Do This:' :
                    item.type === 'suggestion' ? 'Suggestion:' : 'Run Command:'}
              </div>
              <div className="text-xs font-mono text-gray-200 break-words leading-relaxed">
                {item.text}
              </div>
              {item.subtext && (
                <div className="text-[10px] text-gray-400 mt-1">{item.subtext}</div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {hasDetails && (
              <button
                aria-label={showDetails ? "Hide Details" : "View Details"}
                className={`p-1.5 rounded hover:bg-white/10 transition-colors ${showDetails ? 'text-brand-primary' : 'text-gray-400'}`}
                title="View Details"
              >
                <Eye className="w-3 h-3" />
              </button>
            )}
            <button
              aria-label="Copy to Clipboard"
              onClick={(e) => { e.stopPropagation(); copyToClipboard(item.text); }}
              className="p-1.5 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              title="Copy"
            >
              {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
            </button>
          </div>
        </div>

        {/* Details Panel */}
        <AnimatePresence>
          {showDetails && hasDetails && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-3 pt-3 border-t border-white/10 space-y-3">

                {/* Expected Output */}
                {item.expectedOutput && (
                  <div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Expected Output</div>
                    <div className="bg-black/50 rounded p-2 text-[10px] font-mono text-green-400 whitespace-pre-wrap">
                      {item.expectedOutput}
                    </div>
                  </div>
                )}

                {/* Why This Matters */}
                {item.why && (
                  <div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Why This Matters</div>
                    <p className="text-[11px] text-gray-300 leading-relaxed">
                      {item.why}
                    </p>
                  </div>
                )}

                {/* Best Practices */}
                {item.bestPractices && (
                  <div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Best Practices</div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 text-brand-primary mt-0.5 shrink-0" />
                      <p className="text-[11px] text-gray-300 leading-relaxed">
                        {item.bestPractices}
                      </p>
                    </div>
                  </div>
                )}

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const WebsiteBuilderGuide: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedPath, setSelectedPath] = useState<BuildPathId | null>(null);
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const getPhases = (): WorkflowPhase[] => {
    switch (selectedPath) {
      case 'lovable': return lovablePhases;
      case 'cursor': return cursorPhases;
      case 'antigravity': return antigravityPhases;
      default: return [];
    }
  };

  const currentPath = BUILD_PATHS.find(p => p.id === selectedPath);
  const phases = getPhases();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 relative">
      {/* Galaxy Starfield */}
      {/* Page Intro */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="animate-float-gentle text-center mb-16"
      >
        <div className="inline-block bg-brand-primary/10 text-brand-primary px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase mb-6 border border-brand-primary/20">
          Build My First App
        </div>
        <h2 className="text-4xl md:text-6xl font-bold font-serif text-white mb-6">
          Build & <span className="text-brand-primary">Ship</span>
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light mb-4">
          Go from idea to live website. Pick a path that matches your comfort level — all roads lead to a real, deployed product.
        </p>
        <p className="text-sm text-gray-300 max-w-lg mx-auto">
          Each path includes step-by-step instructions with copy-paste prompts, expected outputs, and best practices.
        </p>
      </motion.div>

      {/* Path Selector */}
      <div className="mb-16 max-w-5xl mx-auto relative">
        <h3 className="text-xl font-serif text-white mb-2 text-center">Choose Your Path</h3>
        <div className="flex flex-col items-center justify-center mb-8">
          <p className="text-sm text-gray-300 mb-3 text-center">From zero-effort to fully customizable. Pick what feels right.</p>
        </div>

        {/* Floating Cloud Popup */}
        <AnimatePresence>
          {showPopup && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: 20 }}
              className="absolute -right-64 -top-2 z-20 hidden xl:flex"
            >
              <div className="relative bg-brand-primary text-black font-bold text-sm px-4 py-3 rounded-2xl shadow-[0_0_30px_rgba(255,194,14,0.3)] animate-float flex items-center gap-2 max-w-[220px]">
                {/* Cloud Tail */}
                <div className="absolute top-1/2 -left-3 -translate-y-1/2 w-4 h-4 bg-brand-primary rotate-45 rounded-sm"></div>
                <MousePointerClick className="w-5 h-5 shrink-0 animate-bounce-gentle" />
                <span>Click a path to expand it!</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid md:grid-cols-3 gap-4">
          {BUILD_PATHS.map((path) => {
            const isSelected = selectedPath === path.id;
            const PathIcon = path.icon;
            return (
              <button
                key={path.id}
                onClick={() => setSelectedPath(selectedPath === path.id ? null : path.id)}
                className={`text-left bg-brand-gray border rounded-2xl p-6 transition-all group relative overflow-hidden ${isSelected
                  ? `${path.border} shadow-lg`
                  : 'border-white/10 hover:border-white/20'
                  }`}
              >
                {/* Selected indicator */}
                {isSelected && (
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${path.id === 'lovable' ? 'from-pink-500 to-rose-500' :
                    path.id === 'cursor' ? 'from-blue-500 to-cyan-500' :
                      'from-brand-primary to-orange-500'
                    }`} />
                )}

                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl ${path.bg} flex items-center justify-center`}>
                    <PathIcon className={`w-5 h-5 ${path.color}`} />
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${path.bg} ${path.color}`}>
                    {path.effort}
                  </span>
                </div>

                <h4 className="text-lg font-bold text-white mb-1">{path.name}</h4>
                <p className={`text-xs font-bold mb-3 ${path.color}`}>{path.tagline}</p>
                <p className="text-sm text-gray-400 leading-relaxed mb-3">{path.description}</p>
                <p className="text-xs text-gray-400"><span className="text-gray-400 font-medium">Best for:</span> {path.bestFor}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Path Workflow */}
      {selectedPath && currentPath && (
        <motion.div
          key={selectedPath}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >

          {/* Setup Visualizer only for Antigravity path (needs GitHub token etc.) */}
          {selectedPath === 'antigravity' && (
            <>
              <div className="text-center mb-8">
                <div className="inline-block bg-white/10 text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase mb-4 border border-white/10">
                  Prerequisites
                </div>
                <h3 className="text-2xl font-serif text-white mb-2">Environment Setup</h3>
                <p className="text-sm text-gray-400 max-w-lg mx-auto">
                  Get your accounts, keys, and workspace ready before starting.
                </p>
              </div>
              <SetupVisualizer />
            </>
          )}

          {/* Workflow Header */}
          <div className="mt-16 mb-12 text-center">
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase mb-6 border ${currentPath.bg} ${currentPath.color} ${currentPath.border}`}>
              <currentPath.icon className="w-3 h-3" />
              {currentPath.name} Workflow
            </div>
            <h3 className="text-3xl md:text-4xl font-bold font-serif text-white mb-3">
              Step-by-Step Guide
            </h3>
            <p className="text-gray-300 max-w-xl mx-auto">
              Follow this workflow from start to finish. Click any step to see details, expected outputs, and best practices.
            </p>
            {currentPath.link && (
              <a
                href={currentPath.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 mt-4 text-sm font-bold ${currentPath.color} hover:underline`}
              >
                Open {currentPath.name} <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

          {/* Timeline */}
          <div ref={containerRef} className="relative pb-24 max-w-3xl mx-auto">
            <ScrollProgressLine containerRef={containerRef} className="left-1/2 -translate-x-1/2" />

            {phases.map((phase, index) => (
              <div key={index} className="mb-24 relative">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center text-center gap-4 mb-16 relative z-10"
                >
                  <div className="w-16 h-16 rounded-full bg-black border border-white/20 flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)] z-10">
                    <phase.icon className="w-8 h-8 text-brand-primary" />
                  </div>
                  <div className="bg-black/60 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10">
                    <div className="text-xs font-bold text-brand-primary uppercase tracking-widest mb-1">{phase.title}</div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white font-serif">{phase.subtitle}</h3>
                  </div>
                </motion.div>

                <div className="space-y-8 relative z-10">
                  {phase.steps.map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-brand-gray border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all group relative overflow-hidden max-w-2xl mx-auto"
                    >
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold text-gray-400 border border-white/10 shrink-0">
                          {i + 1}
                        </div>
                        <h4 className="text-xl font-bold text-white relative z-10">{step.label}</h4>
                      </div>

                      {step.desc && <p className="text-gray-400 mb-6 relative z-10 pl-12">{step.desc}</p>}

                      {step.items.length > 0 && (
                        <div className="space-y-3 relative z-10 pl-12">
                          {step.items.map((item, j) => (
                            <StepItemDisplay key={j} item={item} id={`${selectedPath}-phase-${index}-step-${i}-item-${j}`} />
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Learning Section — always visible */}
      <LearningSection />
    </div>
  );
};

export default WebsiteBuilderGuide;

