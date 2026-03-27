import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Play, ArrowUpRight, Cloud, Box,
  Layout, Database, Lock, CreditCard, Globe, Cpu, Network,
  ArrowRightLeft, Activity, Smartphone, Store, Settings,
  Server, Wifi, CheckCircle2, FileCode, Zap,
  ChevronRight, ChevronLeft, Laptop, Users, Upload,
  Terminal, GitBranch, Sparkles, MessageSquare, RefreshCw, Rocket, Lightbulb
} from 'lucide-react';

type ToolType = 'Lovable' | 'Antigravity' | 'Cursor';

interface LearningItem {
  title: string;
  icon: React.ElementType;
  shortDesc: string;
  details: {
    howItWorks: string;
    analogy: string;
    vibeTip: string;
  };
  color: 'pink' | 'blue' | 'green' | 'purple' | 'white';
}

const LearningCard: React.FC<{ item: LearningItem }> = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const colors = {
    pink: { text: 'text-pink-500', bg: 'bg-pink-500/10', border: 'hover:border-pink-500/50', shadow: 'hover:shadow-[0_0_30px_rgba(236,72,153,0.2)]', glow: 'from-pink-500/10' },
    blue: { text: 'text-blue-500', bg: 'bg-blue-500/10', border: 'hover:border-blue-500/50', shadow: 'hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]', glow: 'from-blue-500/10' },
    green: { text: 'text-green-500', bg: 'bg-green-500/10', border: 'hover:border-green-500/50', shadow: 'hover:shadow-[0_0_30px_rgba(34,197,94,0.2)]', glow: 'from-green-500/10' },
    purple: { text: 'text-purple-400', bg: 'bg-purple-500/10', border: 'hover:border-purple-500/50', shadow: 'hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]', glow: 'from-purple-500/10' },
    white: { text: 'text-white', bg: 'bg-white/10', border: 'hover:border-white/50', shadow: 'hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]', glow: 'from-white/10' },
  }[item.color];

  const Icon = item.icon;

  return (
    <div
      className={`bg-brand-gray border border-white/10 rounded-2xl p-6 md:p-8 relative overflow-hidden group transition-all duration-500 hover:-translate-y-1 cursor-pointer ${colors.border} ${colors.shadow}`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Hover Light Effect */}
      <div className={`absolute inset-0 bg-gradient-to-tr ${colors.glow} via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

      <div className="flex items-start justify-between gap-4 relative z-10">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center ${colors.bg} ${colors.text} group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="w-6 h-6 md:w-7 md:h-7" />
          </div>
          <div>
            <h4 className="text-xl md:text-2xl font-bold text-white">{item.title}</h4>
            {!isExpanded && (
              <div className="text-xs text-brand-primary mt-1 flex items-center gap-1 animate-fade-in">
                Click to learn more <ChevronRight className="w-3 h-3" />
              </div>
            )}
          </div>
        </div>
      </div>

      <p className={`text-gray-400 mt-4 leading-relaxed relative z-10 transition-all duration-300 ${isExpanded ? 'text-sm' : 'text-base'}`}>
        {item.shortDesc}
      </p>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden relative z-10"
          >
            <div className="mt-4 pt-4 border-t border-white/10 space-y-4">

              {/* How it works */}
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1 flex items-center gap-2">
                  <Settings className="w-3 h-3" /> How it works
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {item.details.howItWorks}
                </p>
              </div>

              {/* Analogy */}
              <div className="bg-[#111] rounded-lg p-3 border-l-2 border-brand-primary">
                <div className="text-xs font-bold uppercase tracking-widest text-brand-primary mb-1 flex items-center gap-2">
                  <Sparkles className="w-3 h-3" /> The Analogy
                </div>
                <p className="text-sm text-gray-300 italic">
                  "{item.details.analogy}"
                </p>
              </div>

              {/* Vibe Tip */}
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1 flex items-center gap-2">
                  <Zap className="w-3 h-3" /> Vibe Coder Tip
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {item.details.vibeTip}
                </p>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface Scenario {
  title: string;
  icon: React.ElementType;
  desc: string;
  toolContexts: Record<ToolType, string>;
  details: Record<ToolType, {
    realWorldAnalogy: string;
    vibeImpact: string;
    hostingFlag?: string;
  }>;
}

const ScenarioCard: React.FC<{ scenario: Scenario, selectedTool: ToolType }> = ({ scenario, selectedTool }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = scenario.icon;
  const currentDetails = scenario.details[selectedTool];

  return (
    <div
      className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6 hover:border-brand-primary/30 transition-colors flex flex-col cursor-pointer group"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <Icon className="w-5 h-5 text-brand-primary" />
          <h5 className="font-bold text-white">{scenario.title}</h5>
        </div>
        <div className="text-xs text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity bg-brand-primary/10 px-2 py-1 rounded">
          {isExpanded ? 'Less' : 'More'}
        </div>
      </div>
      <p className="text-gray-400 text-sm mb-6 min-h-[3rem]">{scenario.desc}</p>

      <div className="mt-auto bg-[#111] rounded p-4 border-l-2 border-brand-primary animate-fade-in mb-1">
        <div className="text-[10px] uppercase tracking-wider font-bold text-brand-primary mb-1 flex items-center gap-2">
          <Terminal className="w-3 h-3" /> Execution in {selectedTool}
        </div>
        <p className="text-xs font-mono text-gray-300 leading-relaxed">
          {scenario.toolContexts[selectedTool]}
        </p>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-4 mt-4 border-t border-white/10 space-y-4">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1 flex items-center gap-2">
                  <Sparkles className="w-3 h-3" /> The Analogy ({selectedTool})
                </div>
                <p className="text-xs text-gray-300 italic">"{currentDetails.realWorldAnalogy}"</p>
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-brand-primary mb-1 flex items-center gap-2">
                  <Lightbulb className="w-3 h-3" /> Vibe Impact
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">{currentDetails.vibeImpact}</p>
              </div>
              {currentDetails.hostingFlag && (
                <div className="bg-blue-500/10 p-3 rounded border border-blue-500/20">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-blue-400 mb-1 flex items-center gap-2">
                    <Cloud className="w-3 h-3" /> Hosting Note
                  </div>
                  <p className="text-xs text-blue-300 leading-relaxed">{currentDetails.hostingFlag}</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const WhyItMatters: React.FC<{
  title: string;
  intro: string;
  scenarios: Scenario[];
}> = ({ title, intro, scenarios }) => {
  const [selectedTool, setSelectedTool] = useState<ToolType>('Lovable');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-12">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-[#111] border border-white/10 p-5 flex items-center justify-between gap-4 hover:border-brand-primary/30 hover:bg-[#151515] transition-all group ${isOpen ? 'rounded-t-2xl border-b-0' : 'rounded-2xl'}`}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-brand-primary/20 rounded-lg text-brand-primary group-hover:scale-110 transition-transform">
            <Sparkles className="w-4 h-4" />
          </div>
          <h4 className="text-lg font-serif text-white">{title}</h4>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 hidden md:inline">{isOpen ? 'Click to collapse' : 'Click to learn more'}</span>
          <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="bg-[#111] border border-white/10 border-t-0 rounded-b-2xl px-8 pb-8 pt-4">
              {/* Tool Selector */}
              <div className="flex justify-end mb-6">
                <div className="flex bg-black/40 p-1 rounded-lg border border-white/10">
                  {(['Lovable', 'Antigravity', 'Cursor'] as ToolType[]).map((tool) => (
                    <button
                      key={tool}
                      onClick={() => setSelectedTool(tool)}
                      className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${selectedTool === tool
                        ? 'bg-brand-primary text-black shadow-lg'
                        : 'text-gray-400 hover:text-white'
                        }`}
                    >
                      {tool}
                    </button>
                  ))}
                </div>
              </div>

              <p className="text-gray-400 mb-6 text-sm leading-relaxed">{intro}</p>

              <div className="grid md:grid-cols-2 gap-6">
                {scenarios.map((s, i) => (
                  <ScenarioCard key={i} scenario={s} selectedTool={selectedTool} />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ArchitectureDemo: React.FC = () => {
  const [step, setStep] = useState(0);

  // Manual Control Functions
  const nextStep = () => setStep((prev) => (prev + 1) % 5);
  const prevStep = () => setStep((prev) => (prev - 1 + 5) % 5);

  // Step Descriptions
  const steps = [
    {
      label: "1. The Trigger (User Action)",
      desc: "The user clicks 'Log In'. The browser (Frontend) catches this 'event', packages the input data (like email/password) into a JSON parcel, and prepares to send it.",
      highlight: "client"
    },
    {
      label: "2. The Journey (API Request)",
      desc: "The browser sends the parcel across the internet via HTTPS. This is an API Call—like mailing a letter to a specific address (Endpoint) on the server.",
      highlight: "path-cb"
    },
    {
      label: "3. The Brain (Business Logic)",
      desc: "The Backend Server receives the request. It validates the security token, checks business rules (e.g., 'Is this account active?'), and decides it needs data.",
      highlight: "backend"
    },
    {
      label: "4. The Vault (Database Query)",
      desc: "The Backend asks the Database (Memory) for the specific user profile. The Database hunts through millions of records efficiently to find the exact match.",
      highlight: "database"
    },
    {
      label: "5. The Response (UI Update)",
      desc: "The Database returns the data. The Backend packages it and sends it back to the browser. The Frontend 're-renders' to show the Dashboard instantly.",
      highlight: "client-update"
    }
  ];

  const currentPhase = steps[step];

  return (
    <div className="w-full bg-[#050505] border border-white/10 rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-2xl">
      {/* Visualizer Area */}
      <div
        onClick={nextStep}
        className="flex-1 relative p-8 md:p-12 min-h-[400px] flex items-center justify-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 to-transparent cursor-pointer group select-none"
      >

        {/* Helper Text */}
        <div className="absolute top-4 right-4 text-xs font-mono text-gray-400 opacity-50 group-hover:opacity-100 transition-opacity flex items-center gap-1 border border-white/10 px-2 py-1 rounded bg-black/40">
          Click to advance <ChevronRight className="w-3 h-3" />
        </div>

        {/* Background Grid */}
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

        {/* Nodes Container */}
        <div className="relative z-10 w-full max-w-3xl flex flex-col md:flex-row items-center justify-between gap-12 md:gap-0 pointer-events-none">

          {/* --- HOSTING NODE (Static/Top) --- */}
          <div className="absolute -top-24 md:-top-32 left-8 md:left-12 flex flex-col items-center opacity-60">
            <div className="bg-brand-gray border border-purple-500/50 p-3 rounded-xl mb-2">
              <Cloud className="w-6 h-6 text-purple-400" />
            </div>
            <div className="h-16 w-[2px] border-l-2 border-dashed border-purple-500/30"></div>
            <span className="text-[10px] uppercase tracking-widest text-purple-400 font-bold mt-2">Hosting (Assets)</span>
          </div>

          {/* --- 1. CLIENT NODE --- */}
          <div className={`relative w-32 h-48 bg-black border-2 rounded-2xl flex flex-col items-center transition-all duration-500 ${step === 0 || step === 4 ? 'border-pink-500 shadow-[0_0_30px_rgba(236,72,153,0.3)] scale-105' : 'border-gray-800 opacity-80'}`}>
            <div className="w-full h-4 border-b border-gray-800 flex justify-center items-center gap-1">
              <div className="w-1 h-1 rounded-full bg-gray-600"></div>
            </div>
            <div className="flex-1 w-full p-3 flex flex-col gap-2">
              {/* UI Mockup */}
              <div className="w-full h-16 bg-gray-900 rounded flex items-center justify-center mb-2">
                <div className="w-8 h-8 rounded-full bg-gray-800"></div>
              </div>
              <div className={`w-full h-8 rounded flex items-center justify-center text-[10px] font-bold transition-colors duration-300 ${step === 0 ? 'bg-pink-500 text-black animate-pulse' : 'bg-pink-500/20 text-pink-500'}`}>
                {step === 0 ? "Click!" : "Log In"}
              </div>
              {step === 4 && (
                <div className="absolute inset-0 bg-black/90 flex items-center justify-center rounded-xl animate-fade-in">
                  <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
              )}
            </div>
            <div className="absolute -bottom-10 text-xs font-bold text-pink-500 uppercase tracking-widest">Storefront</div>
          </div>

          {/* CONNECTION 1: Client -> Backend */}
          <div className="flex-1 h-[2px] bg-gray-800 relative mx-4 hidden md:block">
            <div className={`absolute top-1/2 left-0 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_white] transition-all duration-[1500ms] ease-in-out
                ${step === 1 ? 'left-full opacity-100' :
                step === 4 ? 'left-0 opacity-100 bg-green-400' : 'opacity-0'}
             `}></div>
          </div>

          {/* --- 2. BACKEND NODE --- */}
          <div className={`relative w-32 h-32 bg-black border-2 rounded-xl flex items-center justify-center transition-all duration-500 ${step === 2 || step === 3 ? 'border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.3)] scale-105' : 'border-gray-800 opacity-80'}`}>
            <Server className={`w-12 h-12 transition-colors ${step === 2 ? 'text-blue-500 animate-pulse' : 'text-gray-700'}`} />
            {step === 2 && (
              <div className="absolute top-2 right-2 w-3 h-3 bg-blue-500 rounded-full animate-ping"></div>
            )}
            <div className="absolute -bottom-10 text-xs font-bold text-blue-500 uppercase tracking-widest">Operations</div>
          </div>

          {/* CONNECTION 2: Backend -> DB */}
          <div className="flex-1 h-[2px] bg-gray-800 relative mx-4 hidden md:block">
            <div className={`absolute top-1/2 left-0 -translate-y-1/2 w-3 h-3 bg-blue-400 rounded-full shadow-[0_0_10px_rgba(59,130,246,1)] transition-all duration-1000 ease-in-out
                ${step === 3 ? 'left-0 opacity-100' :
                step === 2 ? 'left-full opacity-100' : 'opacity-0'}
             `}></div>
          </div>

          {/* --- 3. DATABASE NODE --- */}
          <div className={`relative w-24 h-32 bg-black border-2 rounded-2xl flex items-center justify-center transition-all duration-500 ${step === 3 ? 'border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.3)] scale-105' : 'border-gray-800 opacity-80'}`}>
            {/* DB Cylinders */}
            <div className="flex flex-col gap-1">
              <div className={`w-12 h-4 rounded-full border border-current ${step === 3 ? 'text-green-500 bg-green-500/20' : 'text-gray-700'}`}></div>
              <div className={`w-12 h-4 rounded-full border border-current ${step === 3 ? 'text-green-500 bg-green-500/20 delay-75' : 'text-gray-700'}`}></div>
              <div className={`w-12 h-4 rounded-full border border-current ${step === 3 ? 'text-green-500 bg-green-500/20 delay-150' : 'text-gray-700'}`}></div>
            </div>
            <div className="absolute -bottom-10 text-xs font-bold text-green-500 uppercase tracking-widest">Memory</div>
          </div>

        </div>

        {/* Mobile Vertical Connectors (Hidden on Desktop) */}
        <div className="md:hidden absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <div className="h-12 w-[2px] bg-gray-800 relative top-[-60px]"></div>
          <div className="h-12 w-[2px] bg-gray-800 relative top-[60px]"></div>
        </div>

      </div>

      {/* Description Panel */}
      <div className="w-full md:w-80 border-t md:border-t-0 md:border-l border-white/10 bg-[#0a0a0a] p-8 flex flex-col justify-between relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-blue-500 to-green-500">
          <div
            className="h-full bg-white blur-[2px] transition-all duration-500 ease-out"
            style={{ width: `${((step + 1) / 5) * 100}%` }}
          ></div>
        </div>

        <div>
          <span className={`text-xs font-bold uppercase tracking-widest px-2 py-1 rounded mb-4 inline-block
               ${step === 0 || step === 4 ? 'bg-pink-500/20 text-pink-400' :
              step === 1 || step === 2 ? 'bg-blue-500/20 text-blue-400' :
                'bg-green-500/20 text-green-400'}
            `}>
            Step {step + 1} of 5
          </span>
          <h3 className="text-2xl font-serif text-white mb-3 min-h-[3rem] transition-all duration-300">
            {currentPhase.label}
          </h3>
          <p className="text-gray-400 leading-relaxed min-h-[4rem] transition-all duration-300">
            {currentPhase.desc}
          </p>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center gap-2 mt-6 mb-6">
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
            {step === 4 ? 'Replay' : 'Next Step'} <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Legend */}
        <div className="mt-auto space-y-3 pt-6 border-t border-white/5">
          <div className={`flex items-center gap-3 text-xs transition-opacity duration-300 ${step === 0 || step === 4 ? 'opacity-100 text-white' : 'opacity-40 text-gray-400'}`}>
            <div className="w-2 h-2 rounded-full bg-pink-500"></div> Front End (Client)
          </div>
          <div className={`flex items-center gap-3 text-xs transition-opacity duration-300 ${step === 1 || step === 2 ? 'opacity-100 text-white' : 'opacity-40 text-gray-400'}`}>
            <div className="w-2 h-2 rounded-full bg-blue-500"></div> Back End (API)
          </div>
          <div className={`flex items-center gap-3 text-xs transition-opacity duration-300 ${step === 3 ? 'opacity-100 text-white' : 'opacity-40 text-gray-400'}`}>
            <div className="w-2 h-2 rounded-full bg-green-500"></div> Database (DB)
          </div>
        </div>
      </div>
    </div>
  );
};

const DeploymentDemo: React.FC = () => {
  const [step, setStep] = useState(0);

  const nextStep = () => setStep((prev) => (prev + 1) % 3);
  const prevStep = () => setStep((prev) => (prev - 1 + 3) % 3);

  const steps = [
    {
      label: "1. Local Development (Laptop)",
      desc: "You write code on your machine. You see it at 'localhost:3000'. It works perfectly, but no one else in the world can see it. It is trapped on your hard drive.",
      highlight: "local"
    },
    {
      label: "2. Deployment (The Upload)",
      desc: "You push your code to a Hosting Provider (like Lovable Cloud or Vercel). They take your raw text files and 'build' them into a functioning app on their servers.",
      highlight: "deploy"
    },
    {
      label: "3. Hosting (Live on Internet)",
      desc: "The provider gives you a public URL (e.g., your-app.com). Their servers stay awake 24/7 to serve your app to anyone in the world, even while you sleep.",
      highlight: "hosting"
    }
  ];

  const currentPhase = steps[step];

  const renderTools = () => {
    if (step === 0) {
      return (
        <div className="animate-fade-in mt-12">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-purple-500/30"></div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-purple-400">Independent Tools — use any combination</span>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-purple-500/30"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <LearningCard
              item={{
                title: "Cursor / VS Code",
                icon: FileCode,
                shortDesc: "The workbench. This is where you actually type the code. Cursor uses AI to help you write faster.",
                color: 'purple',
                details: {
                  howItWorks: "An Integrated Development Environment (IDE) that understands your code structure. It provides syntax highlighting, error checking, and AI assistance.",
                  analogy: "The Architect's Drafting Table. All your tools are within reach.",
                  vibeTip: "Use the 'Composer' (Cmd+I) to write code across multiple files at once. It's like having a junior dev."
                }
              }}
            />
            <LearningCard
              item={{
                title: "Terminal",
                icon: Terminal,
                shortDesc: "The engine room. You run commands here to start your local server.",
                color: 'purple',
                details: {
                  howItWorks: "A direct line to your computer's operating system. You execute text-based commands to install packages, run servers, and manage files.",
                  analogy: "The Cockpit Controls. It looks complex, but it gives you full control over the machine.",
                  vibeTip: "Don't fear the red text. Copy errors directly into the AI chat—it usually knows exactly how to fix them."
                }
              }}
            />
            <LearningCard
              item={{
                title: "Localhost",
                icon: Laptop,
                shortDesc: "Your private preview. Usually at http://localhost:3000. Only you can see this.",
                color: 'purple',
                details: {
                  howItWorks: "Your computer creates a temporary web server that runs only on your machine. It mimics a real server so you can test safely.",
                  analogy: "The Mirror. You check your outfit here before you leave the house.",
                  vibeTip: "If it works on localhost, it's ready to ship. Always verify your changes here first."
                }
              }}
            />
          </div>
        </div>
      );
    }

    if (step === 1) {
      return (
        <div className="animate-fade-in mt-12">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-blue-500/30"></div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">Linear Flow: Code → Cloud → Live</span>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-blue-500/30"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 md:gap-2 items-start">
            <LearningCard
              item={{
                title: "Git",
                icon: GitBranch,
                shortDesc: "The save button. Git tracks every change you make so you never lose work.",
                color: 'blue',
                details: {
                  howItWorks: "A distributed version control system. It records 'commits' (snapshots) of your files, allowing you to branch out or revert changes anytime.",
                  analogy: "A Time Machine. You can go back to any point in your project's history.",
                  vibeTip: "Commit often. Before asking the AI for a big change, save your state so you can undo if it hallucinates."
                }
              }}
            />
            <div className="hidden md:flex items-center justify-center h-full">
              <ArrowRightLeft className="w-5 h-5 text-blue-400 animate-pulse" />
            </div>
            <div className="flex items-center justify-center md:hidden">
              <ChevronRight className="w-5 h-5 text-blue-400 rotate-90" />
            </div>
            <LearningCard
              item={{
                title: "GitHub",
                icon: Cloud,
                shortDesc: "The cloud vault. It stores your code safely online and lets teams collaborate.",
                color: 'blue',
                details: {
                  howItWorks: "A hosting platform for Git repositories. It acts as the central source of truth for your code and integrates with deployment tools.",
                  analogy: "The Bank Vault. Your code is safe here, even if your laptop explodes.",
                  vibeTip: "Connect GitHub to Vercel. It makes deployment automatic—push code, and your site updates."
                }
              }}
            />
            <div className="hidden md:flex items-center justify-center h-full">
              <ArrowRightLeft className="w-5 h-5 text-blue-400 animate-pulse" />
            </div>
            <div className="flex items-center justify-center md:hidden">
              <ChevronRight className="w-5 h-5 text-blue-400 rotate-90" />
            </div>
            <LearningCard
              item={{
                title: "CI/CD Pipeline",
                icon: Upload,
                shortDesc: "The automation. It automatically takes code from GitHub and puts it on the server.",
                color: 'blue',
                details: {
                  howItWorks: "Continuous Integration/Deployment. Scripts that run automatically when you push code. They build, test, and deploy your app without human intervention.",
                  analogy: "The Assembly Line. Robots package and ship the product while you sleep.",
                  vibeTip: "Trust the pipeline. Once set up, you never need to manually upload files again."
                }
              }}
            />
          </div>
        </div>
      );
    }

    // Step 2: Hosting (Production)
    return (
      <div className="animate-fade-in mt-12">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-green-500/30"></div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-green-400">Independent Components — no strict order</span>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-green-500/30"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* DNS / Domain */}
          <LearningCard
            item={{
              title: "The Address (DNS)",
              icon: Globe,
              shortDesc: "Your messy IP address is masked by a clean domain name. This is the only door the world sees.",
              color: 'green',
              details: {
                howItWorks: "Domain Name System maps human-readable names (like google.com) to machine IP addresses. It directs traffic to your server.",
                analogy: "The Phonebook. It connects a name to a number.",
                vibeTip: "Buying a domain is the moment your project feels real. Connect it early to build motivation."
              }
            }}
          />

          {/* The Server */}
          <LearningCard
            item={{
              title: "The Always-On PC",
              icon: Server,
              shortDesc: "Unlike your laptop which sleeps, this 'Cloud' computer runs 24/7 in a data center.",
              color: 'blue',
              details: {
                howItWorks: "A high-performance computer optimized for handling web requests. It runs your backend code and serves your frontend assets.",
                analogy: "The Storefront. It needs to be open 24/7 for customers.",
                vibeTip: "Use 'Serverless' where possible. It scales automatically so you don't pay for empty tables."
              }
            }}
          />

          {/* The Update Cycle */}
          <LearningCard
            item={{
              title: "Vibe-to-Live",
              icon: Zap,
              shortDesc: "When you ask the AI to 'make the logo bigger', the hosting provider automatically rebuilds the site.",
              color: 'pink',
              details: {
                howItWorks: "The modern deployment workflow: AI writes code -> You push to Git -> Cloud builds and swaps the live version instantly.",
                analogy: "Instant Renovation. You snap your fingers, and the building changes.",
                vibeTip: "This loop is your superpower. The faster you can go through this cycle, the better your product becomes."
              }
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="mb-24">
      <div className="w-full bg-[#050505] border border-white/10 rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-2xl mb-8">
        {/* Visualizer Area */}
        <div
          onClick={nextStep}
          className="flex-1 relative p-8 md:p-12 min-h-[350px] flex items-center justify-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 to-transparent cursor-pointer group select-none"
        >
          {/* Helper Text */}
          <div className="absolute top-4 right-4 text-xs font-mono text-gray-400 opacity-50 group-hover:opacity-100 transition-opacity flex items-center gap-1 border border-white/10 px-2 py-1 rounded bg-black/40">
            Click to advance <ChevronRight className="w-3 h-3" />
          </div>

          {/* Connection Line */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-[2px] bg-gray-800 hidden md:block">
            <div className={`absolute top-1/2 left-0 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_white] transition-all duration-[1000ms] ease-in-out
                  ${step === 1 ? 'left-full opacity-100' : 'left-0 opacity-0'}
               `}></div>
          </div>

          <div className="relative z-10 w-full max-w-2xl flex flex-col md:flex-row items-center justify-between gap-12 md:gap-0">

            {/* LOCAL DEV */}
            <div className={`relative flex flex-col items-center transition-all duration-500 ${step === 0 ? 'scale-110 opacity-100' : 'opacity-50 blur-[1px]'}`}>
              <div className={`w-24 h-24 bg-gray-900 rounded-2xl border-2 flex items-center justify-center mb-4 transition-colors ${step === 0 ? 'border-brand-primary shadow-[0_0_20px_rgba(255,194,14,0.3)]' : 'border-gray-700'}`}>
                <Laptop className={`w-10 h-10 ${step === 0 ? 'text-brand-primary' : 'text-gray-500'}`} />
              </div>
              <div className="text-center">
                <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Local Environment</div>
                <div className="font-mono text-xs bg-gray-800 px-2 py-1 rounded text-green-400">localhost:3000</div>
              </div>
              {step === 0 && (
                <div className="absolute -right-6 -top-6 bg-brand-primary text-black text-[10px] font-bold px-2 py-1 rounded-full animate-bounce">
                  YOU ARE HERE
                </div>
              )}
            </div>

            {/* CLOUD HOSTING */}
            <div className={`relative flex flex-col items-center transition-all duration-500 ${step >= 1 ? 'scale-110 opacity-100' : 'opacity-40 blur-[2px]'}`}>
              <div className={`w-24 h-24 bg-gray-900 rounded-2xl border-2 flex items-center justify-center mb-4 transition-colors relative overflow-hidden ${step >= 1 ? 'border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'border-gray-700'}`}>
                <Cloud className={`w-10 h-10 z-10 relative ${step >= 1 ? 'text-blue-500' : 'text-gray-500'}`} />
                {step === 1 && <div className="absolute inset-0 bg-blue-500/10 animate-pulse"></div>}
              </div>
              <div className="text-center">
                <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Production Server</div>
                <div className={`font-mono text-xs px-2 py-1 rounded transition-colors ${step === 2 ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-800 text-gray-500'}`}>
                  {step === 2 ? 'https://myapp.com' : 'Disconnected'}
                </div>
              </div>
            </div>

            {/* PUBLIC USERS */}
            <div className={`relative flex flex-col items-center transition-all duration-500 ${step === 2 ? 'scale-110 opacity-100' : 'opacity-30 blur-[2px]'}`}>
              <div className="absolute -left-12 top-1/2 -translate-y-1/2 w-12 h-[2px] bg-blue-500/50 hidden md:block"></div>
              <div className={`w-24 h-24 bg-gray-900 rounded-full border-2 flex items-center justify-center mb-4 transition-colors ${step === 2 ? 'border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.3)]' : 'border-gray-700'}`}>
                <Globe className={`w-10 h-10 ${step === 2 ? 'text-green-500' : 'text-gray-500'}`} />
              </div>
              <div className="text-center">
                <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">The World</div>
                <div className="text-xs text-gray-400">Customers</div>
              </div>
            </div>

          </div>
        </div>

        {/* Desc Panel */}
        <div className="w-full md:w-80 border-t md:border-t-0 md:border-l border-white/10 bg-[#0a0a0a] p-8 flex flex-col justify-center">
          <div>
            <span className={`text-xs font-bold uppercase tracking-widest px-2 py-1 rounded mb-4 inline-block
                  ${step === 0 ? 'bg-brand-primary/20 text-brand-primary' :
                step === 1 ? 'bg-blue-500/20 text-blue-400' :
                  'bg-green-500/20 text-green-400'}
               `}>
              Phase {step + 1}
            </span>
            <h3 className="text-xl font-serif text-white mb-3 min-h-[3rem] transition-all duration-300">
              {currentPhase.label}
            </h3>
            <p className="text-gray-400 leading-relaxed min-h-[5rem] text-sm transition-all duration-300">
              {currentPhase.desc}
            </p>
          </div>

          <div className="flex items-center gap-2 mt-6">
            <button
              onClick={(e) => { e.stopPropagation(); prevStep(); }}
              className="p-2 rounded-lg hover:bg-white/10 text-white transition-colors border border-white/10"
              aria-label="Previous Step"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextStep(); }}
              className="flex-1 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-all border border-white/10 flex items-center justify-center gap-2"
            >
              {step === 2 ? 'Restart' : 'Next'} <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* DYNAMIC TOOLS GRID */}
      {renderTools()}
    </div>
  );
};

const ToolsSection: React.FC = () => {
  return (
    <div className="bg-transparent relative overflow-hidden min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-20 relative z-10">

        <div className="text-center mb-20 animate-fade-in animate-float-gentle">
          <div className="inline-block bg-white/10 text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase mb-6 border border-white/10">
            Software Fundamentals
          </div>
          <h2 className="text-4xl md:text-6xl font-serif text-white mb-6">
            How Software <span className="text-brand-primary">Works</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
            You don't need to write code — but knowing the basics helps you build better with AI.
          </p>
        </div>

        {/* SECTION 1: ANATOMY OF AN APP (Frontend vs Backend) */}
        <div className="mb-32 relative">
          <div className="flex items-center gap-3 mb-10 justify-center md:justify-start">
            <div className="p-2 bg-brand-primary rounded text-black">
              <Network className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-bold text-white">Anatomy of an Application</h3>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">

            {/* Desktop Data Connector Animation */}
            <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center z-20 pointer-events-none">
              <div className="w-32 h-[2px] bg-gradient-to-r from-pink-500/50 via-white/50 to-blue-500/50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
              <div className="bg-black border border-white/20 text-white px-4 py-1.5 rounded-full text-xs font-mono font-bold shadow-[0_0_20px_rgba(255,255,255,0.2)] flex items-center gap-2 animate-pulse relative z-10">
                <ArrowRightLeft className="w-3 h-3 text-brand-primary" /> The Conversation
              </div>
            </div>

            {/* Frontend Card */}
            <LearningCard
              item={{
                title: "The Frontend",
                icon: Layout,
                shortDesc: "What users see and interact with — buttons, layouts, animations. If it looks bad, users leave.",
                color: 'pink',
                details: {
                  howItWorks: "The browser downloads HTML (structure), CSS (style), and JavaScript (logic) files from the server. It interprets them to paint the visual interface you interact with.",
                  analogy: "The Dining Room. Customers don't see the chef; they just see the food and the decor.",
                  vibeTip: "Focus on 'Components'. Ask the AI to 'Create a Hero Component' rather than 'Write HTML'. It helps the AI structure the code better."
                }
              }}
            />

            {/* Backend Card */}
            <LearningCard
              item={{
                title: "The Backend",
                icon: Cpu,
                shortDesc: "The invisible engine — it saves data, processes payments, and handles user accounts.",
                color: 'blue',
                details: {
                  howItWorks: "A server runs logic (Node.js/Python) to process requests. It validates users, talks to the database, and securely handles payments.",
                  analogy: "The Kitchen. It takes orders from the waiters (API) and prepares the meal.",
                  vibeTip: "Think in 'Flows'. Ask the AI 'Create a flow to save user data' rather than 'Write a SQL query'."
                }
              }}
            />
          </div>

          {/* Why This Matters - Anatomy */}
          <WhyItMatters
            title="Why this matters for Vibe Coders"
            intro="Quick rule: Does your app need to remember users or save data? → You need a Backend. Just displaying info? → Frontend only."
            scenarios={[
              {
                title: "Frontend-Only Ideas",
                icon: Layout,
                desc: "Portfolios, landing pages, event sites, documentation. If you're just displaying content with no user accounts or saved data, keep it simple with a Frontend.",
                toolContexts: {
                  Lovable: "Prompt: 'Create a modern portfolio site with a hero, about, and contact section'. Lovable builds and hosts it in one step — no server config needed.",
                  Antigravity: "Build a React or HTML app locally. Deploy for free to GitHub Pages. You own the code and the hosting costs $0.",
                  Cursor: "Use Cursor's AI to scaffold a React or HTML project. Deploy free to GitHub Pages or Vercel."
                },
                details: {
                  Lovable: {
                    realWorldAnalogy: "Like printing a professional brochure — design it, distribute it, done.",
                    vibeImpact: "Ask the AI to focus on layout and styling. Don't mention databases or APIs — it'll overcomplicate your project.",
                    hostingFlag: "Hosted free on Lovable's CDN. Add a custom domain later if you want."
                  },
                  Antigravity: {
                    realWorldAnalogy: "Like building a shopfront window display — all visual, nothing behind the counter.",
                    vibeImpact: "Keep your project small. One index.html and one styles.css can go surprisingly far.",
                    hostingFlag: "GitHub Pages is free and automatic. Push code → site updates."
                  },
                  Cursor: {
                    realWorldAnalogy: "Like building in your own workshop — full tools, full freedom.",
                    vibeImpact: "Great for testing ideas locally before deploying. You own the files.",
                    hostingFlag: "Deploy to GitHub Pages (free) or Vercel (free tier)."
                  }
                }
              },
              {
                title: "Full-Stack Ideas (Frontend + Backend)",
                icon: Database,
                desc: "SaaS tools, marketplaces, apps with login/signup. If users need accounts, saved preferences, or payments — you're building a full-stack app.",
                toolContexts: {
                  Lovable: "Prompt: 'Build a task management app with user login and saved tasks'. Lovable auto-connects Supabase for your database and auth.",
                  Antigravity: "You'll need to set up a database (Supabase/Firebase) and write API routes. More work, but total control over your data.",
                  Cursor: "Set up Supabase or Firebase with Cursor's AI generating the integration code. Full control over your stack."
                },
                details: {
                  Lovable: {
                    realWorldAnalogy: "Like opening a franchise — the systems are pre-built, you just customize.",
                    vibeImpact: "Tell the AI 'Add user authentication' and it wires up the database for you. Magic, but you can't customize the plumbing.",
                    hostingFlag: "Backend runs serverless. You don't manage servers, but you're locked into their ecosystem."
                  },
                  Antigravity: {
                    realWorldAnalogy: "Like building your own restaurant — you design the kitchen, menu, and service.",
                    vibeImpact: "Paste error messages directly to the AI. Say 'This API route returns 500 — fix it' with the error log.",
                    hostingFlag: "You need a backend host (Render, Railway, Vercel). Budget ~$5-10/month for small projects."
                  },
                  Cursor: {
                    realWorldAnalogy: "Like building a custom toolkit — choose every ingredient yourself.",
                    vibeImpact: "Use Cursor's Composer to scaffold backend + frontend together. Full-stack in one IDE.",
                    hostingFlag: "Deploy backend to Render/Railway (~$5/mo), frontend to Vercel (free)."
                  }
                }
              }
            ]}
          />
        </div>

        {/* SECTION 2: LIVE ARCHITECTURE DEMO */}
        <div className="mb-32">
          <div className="flex items-center gap-3 mb-8 justify-center md:justify-start">
            <div className="p-2 bg-brand-primary rounded text-black">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-bold text-white">How it works (Live View)</h3>
          </div>
          <p className="text-gray-400 max-w-2xl mb-10 text-base">
            Watch a user action travel from screen → server → database and back.
          </p>

          <ArchitectureDemo />

          {/* Why This Matters - Architecture */}
          <WhyItMatters
            title="Why this matters for Vibe Coders"
            intro="When it breaks: is the button broken (Frontend) or is data not saving (Backend)? That one question changes everything."
            scenarios={[
              {
                title: "When Things Go Wrong (Debugging)",
                icon: MessageSquare,
                desc: "Every bug lives in one of these layers. Your job as a vibe coder is to identify which layer, then tell the AI exactly where to look.",
                toolContexts: {
                  Lovable: "Try: 'The login button doesn't respond when clicked. The console shows no errors. Check if the onClick handler is connected to the auth function.'",
                  Antigravity: "Try: 'This error appears in my terminal: [paste error]. It happens when I call /api/users. What's wrong with my backend route?'",
                  Cursor: "Try: 'The form submits but data doesn't appear. Check the API route and verify the database query matches the table schema.'"
                },
                details: {
                  Lovable: {
                    realWorldAnalogy: "Like telling a mechanic 'the car won't start' vs 'the engine turns but doesn't catch' — specificity gets faster fixes.",
                    vibeImpact: "Always mention what you SEE vs what SHOULD happen. 'Button does nothing' → Frontend. 'Data doesn't save' → Backend/DB.",
                    hostingFlag: "Lovable's built-in preview shows errors visually. Click on broken elements to debug them."
                  },
                  Antigravity: {
                    realWorldAnalogy: "Like a doctor reading lab results — the terminal error tells you exactly what organ is failing.",
                    vibeImpact: "Copy the FULL error from your browser console or terminal. Include the file name and line number. The AI can't fix what it can't see.",
                    hostingFlag: "CORS errors = Frontend can't talk to Backend. 500 errors = Backend code is crashing."
                  },
                  Cursor: {
                    realWorldAnalogy: "Like a detective's desk — all clues visible in one workspace.",
                    vibeImpact: "Use the integrated terminal for backend errors and the browser DevTools for frontend. Cmd+Shift+I opens DevTools.",
                    hostingFlag: "Cursor shows inline errors. Hover on red underlines to see what's wrong."
                  }
                }
              },
              {
                title: "Connecting to External Services (APIs)",
                icon: Cloud,
                desc: "Your app talks to external services — payments, maps, AI models. Understanding the request flow helps you wire these up without leaking secrets.",
                toolContexts: {
                  Lovable: "Try: 'Integrate Stripe payments. When a user clicks Buy, create a checkout session and redirect to the payment page.'",
                  Antigravity: "Try: 'Add a /api/checkout route that creates a Stripe session. Store the API key in .env, not in the code.'",
                  Cursor: "Try: 'Add a /api/checkout route that creates a Stripe session. Store the API key in .env, not in the code.'"
                },
                details: {
                  Lovable: {
                    realWorldAnalogy: "Like ordering through a delivery app — you describe what you want, the platform handles the kitchen.",
                    vibeImpact: "Describe the flow in plain English. Lovable handles the API wiring for you.",
                    hostingFlag: "API keys go in Lovable's settings panel. Never hardcode them in prompts."
                  },
                  Antigravity: {
                    realWorldAnalogy: "Like installing plumbing yourself — you connect each pipe from your kitchen to the water supply.",
                    vibeImpact: "Always tell the AI: 'Use environment variables for all secrets'. Create a .env file and add it to .gitignore.",
                    hostingFlag: "Set env vars on your hosting dashboard (Vercel/Render) separately from your code."
                  },
                  Cursor: {
                    realWorldAnalogy: "Like installing plumbing in your own house — you pick every pipe.",
                    vibeImpact: "Create a .env file for secrets, add it to .gitignore. Reference with process.env.KEY_NAME.",
                    hostingFlag: "Set env vars in your hosting dashboard (Vercel/Render) separately from code."
                  }
                }
              }
            ]}
          />
        </div>

        {/* SECTION 3: HOSTING (Deployment Ecosystem) */}
        {/* Formerly Section 4 */}
        <div className="mb-32">
          <div className="flex items-center gap-3 mb-8 justify-center md:justify-start">
            <div className="p-2 bg-brand-primary rounded text-black">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-bold text-white">Digital Real Estate (Hosting)</h3>
          </div>
          <p className="text-gray-400 max-w-2xl mb-10 text-base">
            Your code is just files on your laptop. Hosting = renting a cloud computer so anyone can visit your site 24/7.
          </p>

          {/* Deployment Demo Includes the Tool Grid */}
          <DeploymentDemo />

          {/* Why This Matters - Hosting */}
          <WhyItMatters
            title="Why this matters for Vibe Coders"
            intro="Choose Managed for speed, or Pro for full ownership. Both get your site live."
            scenarios={[
              {
                title: "When to Go Managed (Fast Lane)",
                icon: Box,
                desc: "Choose this when speed matters more than control. Ideal for: MVPs, demos, hackathon projects, client prototypes. You'll be live in minutes, not hours.",
                toolContexts: {
                  Lovable: "Click 'Publish' → your app is live at yourapp.lovable.app. Add a custom domain in Settings whenever you're ready.",
                  Antigravity: "Antigravity is your editor, not a host. But you can ask: 'Deploy this to Vercel with one command' and it'll set it up for you.",
                  Cursor: "Push to GitHub → connect to Vercel → your app is live at yourapp.vercel.app. Add a custom domain in Vercel settings."
                },
                details: {
                  Lovable: {
                    realWorldAnalogy: "Like a hotel — check in, use everything, no maintenance. But you can't renovate the room.",
                    vibeImpact: "Perfect when you want to show something working TODAY. Don't overthink the infrastructure.",
                    hostingFlag: "Free for prototypes. You're locked in unless you 'Eject' to GitHub."
                  },
                  Antigravity: {
                    realWorldAnalogy: "Like a concierge service — they'll arrange everything, but you tell them what you want.",
                    vibeImpact: "Ask the AI: 'Set up Vercel deployment for this project'. It'll create the config files and guide you.",
                    hostingFlag: "Vercel's free tier handles most hobby projects. Pay when you get real traffic."
                  },
                  Cursor: {
                    realWorldAnalogy: "Like a concierge service — they handle hosting, you focus on building.",
                    vibeImpact: "Ask Cursor AI: 'Set up Vercel deployment for this project'. It creates all config files.",
                    hostingFlag: "Vercel's free tier handles most hobby projects. Pay only when you scale."
                  }
                }
              },
              {
                title: "When to Go Pro (Full Ownership)",
                icon: Rocket,
                desc: "Choose this when you're serious about the product. You push code to GitHub, connect it to a host, and own everything. This is how real startups ship.",
                toolContexts: {
                  Lovable: "To migrate: 'Eject this project to GitHub'. Now it's YOUR repo. Connect it to Vercel or Netlify for hosting you control.",
                  Antigravity: "This is the default workflow: write code → push to GitHub → Vercel auto-deploys. Ask: 'Set up CI/CD with GitHub Actions'.",
                  Cursor: "This is the default: write code in Cursor → push to GitHub → Vercel auto-deploys. Ask: 'Set up CI/CD with GitHub Actions'."
                },
                details: {
                  Lovable: {
                    realWorldAnalogy: "Like buying the apartment after renting — now you choose the paint color AND the plumbing.",
                    vibeImpact: "Eject when you've validated the idea and want to scale. Before that, stay managed.",
                    hostingFlag: "After ejecting, you're responsible for deployment, domain, and SSL. Worth it for serious projects."
                  },
                  Antigravity: {
                    realWorldAnalogy: "Like building your house from blueprints — you pick every material and contractor.",
                    vibeImpact: "You own the code, the hosting, the domain. Full control = full responsibility. Budget $5-20/month.",
                    hostingFlag: "Industry standard workflow. Every startup uses GitHub → CI/CD → Cloud Host."
                  },
                  Cursor: {
                    realWorldAnalogy: "Like building your house from blueprints — you pick every material.",
                    vibeImpact: "Full ownership of code with GitHub → CI/CD → Cloud Host. Industry standard.",
                    hostingFlag: "Budget $5-20/month for hosting. Scale as traffic grows."
                  }
                }
              }
            ]}
          />

        </div>

      </div>
    </div>
  );
};

export default ToolsSection;