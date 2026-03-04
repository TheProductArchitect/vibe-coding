import React, { useState } from 'react';
import {
  Cpu, Layers, Lightbulb, Zap, Rocket, CheckCircle2,
  ArrowRight, RefreshCw, Copy, Monitor, Download, Lock, MapPin,
  Code, ExternalLink, MessageSquare, Compass
} from 'lucide-react';
import { enhanceUserPrompt } from '../services/huggingface';

const STUDENT_SIGNUP_LINK = "https://one.google.com/u/3/ai-student?g1_landing_page=75&utm_source=gemini&utm_medium=web&utm_campaign=advmktgsite";

const WORKSHOP_STEPS = [
  { id: 0, title: "Navigation", icon: Compass },
  { id: 1, title: "Select Tool", icon: Cpu },
  { id: 2, title: "First Prompt", icon: Lightbulb },
  { id: 3, title: "Launch", icon: Rocket }
];

const TOOLS = [
  {
    id: 'lovable',
    name: 'Lovable',
    icon: <Rocket className="w-6 h-6" />,
    tagline: 'The Instant Builder',
    description: 'Best for: Web Apps, Dashboards. Uses Generative UI to build React apps in real-time.',
    link: 'https://lovable.dev/',
    badge: 'Browser Based'
  },
  {
    id: 'gemini',
    name: 'Google AI Studio',
    icon: <Cpu className="w-6 h-6" />,
    tagline: 'The Architect',
    description: 'Best for: Pure logic, System Design, and complex reasoning tasks.',
    link: 'https://aistudio.google.com/',
    badge: 'Browser Based'
  },
  {
    id: 'claude',
    name: 'Claude',
    icon: <MessageSquare className="w-6 h-6" />,
    tagline: 'The Writer',
    description: 'Best for: Coding, Writing, and Analysis. Known for high-quality, safe outputs.',
    link: 'https://claude.ai/',
    badge: 'Browser Based'
  }
];

const Curriculum: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userIdea, setUserIdea] = useState('');
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeLoopStep, setActiveLoopStep] = useState(0);
  const [loopCycle, setLoopCycle] = useState(0);

  const handleGeneratePrompt = async () => {
    if (!userIdea || !selectedTool) return;
    setIsGenerating(true);
    const toolName = TOOLS.find(t => t.id === selectedTool)?.name || 'AI';
    const result = await enhanceUserPrompt(userIdea, toolName);
    setGeneratedPrompt(result);
    setIsGenerating(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompt);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Navigation
        return (
          <div className="animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-brand-primary rounded-lg text-black">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-3xl font-serif text-white">How to Vibe Code</h3>
                <p className="text-brand-primary text-sm uppercase tracking-wider font-bold">Phase 1: Navigation</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-brand-gray border border-white/10 p-6 rounded-xl">
                <h4 className="text-lg font-bold text-white mb-4">The Core Loop</h4>
                <div className="space-y-3">
                  {[
                    { num: "1", emoji: "💬", label: "Describe", text: "Tell AI what you want in plain English." },
                    { num: "2", emoji: "⚡", label: "Generate", text: "AI writes the code for you." },
                    { num: "3", emoji: "🔄", label: "Refine", text: "Review, tweak, repeat until perfect." }
                  ].map(s => (
                    <div key={s.num} className="flex items-center gap-3 text-gray-300">
                      <span className="text-lg">{s.emoji}</span>
                      <span><strong className="text-white">{s.label}:</strong> {s.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-brand-gray border border-white/10 p-6 rounded-xl">
                <h4 className="text-lg font-bold text-white mb-4">Quick Tips</h4>
                <div className="space-y-3">
                  {[
                    { emoji: "🎯", text: "Start small — one feature at a time." },
                    { emoji: "📐", text: "Be specific — \"blue #0000FF\" beats \"blue\"." },
                    { emoji: "🐛", text: "Got an error? Paste it to AI to fix." }
                  ].map((tip, i) => (
                    <div key={i} className="flex items-center gap-3 text-gray-300">
                      <span className="text-lg">{tip.emoji}</span>
                      <span className="text-sm">{tip.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setCurrentStep(1)}
                className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold bg-brand-primary text-black hover:scale-105 shadow-lg shadow-brand-primary/20 transition-all"
              >
                Choose Your Tool <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        );

      case 1: // Tool Selection
        return (
          <div className="animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-brand-primary rounded-lg text-black">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-3xl font-serif text-white">Select Engine</h3>
                <p className="text-brand-primary text-sm uppercase tracking-wider font-bold">Phase 2: Tooling</p>
              </div>
            </div>

            <p className="text-gray-400 mb-8 text-lg">
              For your first project, we recommend starting with one of these browser-based tools. No setup required.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {TOOLS.map((tool) => (
                <div
                  key={tool.id}
                  onClick={() => setSelectedTool(tool.id)}
                  className={`p-6 rounded-xl border cursor-pointer transition-all duration-300 relative group flex flex-col overflow-hidden ${selectedTool === tool.id
                    ? 'bg-brand-primary/10 border-brand-primary shadow-[0_0_30px_rgba(255,194,14,0.2)] transform -translate-y-1'
                    : 'bg-brand-gray border-white/10 hover:border-brand-primary/50 hover:shadow-[0_0_30px_rgba(255,194,14,0.1)] hover:-translate-y-1'
                    }`}
                >
                  {/* Hover Light Effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${selectedTool === tool.id ? 'bg-brand-primary text-black' : 'bg-black text-gray-400 group-hover:text-white group-hover:bg-brand-primary/20'
                      }`}>
                      {tool.icon}
                    </div>
                    {tool.badge && (
                      <span className="text-[10px] font-bold uppercase px-2 py-1 rounded border border-white/10 text-gray-400 bg-[#111]">
                        {tool.badge}
                      </span>
                    )}
                  </div>

                  <h4 className="text-xl font-bold text-white mb-1 relative z-10">{tool.name}</h4>
                  <p className="text-xs font-mono text-brand-primary uppercase tracking-wider mb-3 relative z-10">{tool.tagline}</p>
                  <p className="text-sm text-gray-400 leading-relaxed flex-grow relative z-10">{tool.description}</p>

                  {selectedTool === tool.id && (
                    <div className="mt-4 flex items-center gap-2 text-brand-primary text-sm font-bold animate-pulse relative z-10">
                      <CheckCircle2 className="w-4 h-4" /> Selected
                    </div>
                  )}

                  <a
                    href={tool.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="mt-3 inline-flex items-center gap-1 text-xs text-gray-400 hover:text-brand-primary transition-colors relative z-10"
                  >
                    Visit {tool.name} <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <button onClick={() => setCurrentStep(0)} className="text-gray-400 hover:text-white transition-colors font-medium">
                Back
              </button>
              <button
                onClick={() => setCurrentStep(2)}
                disabled={!selectedTool}
                className={`flex items-center gap-2 px-8 py-4 rounded-xl font-bold transition-all ${!selectedTool
                  ? 'bg-gray-800 text-gray-400 cursor-not-allowed'
                  : 'bg-brand-primary text-black hover:scale-105 shadow-lg shadow-brand-primary/20'
                  }`}
              >
                Next: Create Prompt <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        );

      case 2: // First Prompt
        return (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-brand-primary rounded-lg text-black">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-3xl font-serif text-white">First Prompt</h3>
                  <p className="text-brand-primary text-sm uppercase tracking-wider font-bold">Phase 3: Intent</p>
                </div>
              </div>
            </div>

            <p className="text-gray-400 mb-6 text-lg">
              Describe what you want to build. We'll help you structure it for {TOOLS.find(t => t.id === selectedTool)?.name}.
            </p>

            <div className="bg-brand-gray border border-white/10 p-6 rounded-xl mb-8 relative group focus-within:border-brand-primary transition-colors">
              <label className="block text-brand-primary text-xs font-bold uppercase tracking-wide mb-3 flex items-center gap-2">
                <Zap className="w-3 h-3" /> Your Idea
              </label>
              <textarea
                value={userIdea}
                onChange={(e) => setUserIdea(e.target.value)}
                placeholder="e.g., I want a personal portfolio website with a dark mode toggle and a contact form..."
                className="w-full bg-black/50 border border-white/20 rounded-lg p-4 text-white placeholder-gray-600 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none h-32 resize-none transition-all font-mono text-sm"
              />
            </div>

            <div className="flex justify-between items-center">
              <button onClick={() => setCurrentStep(1)} className="text-gray-400 hover:text-white transition-colors font-medium">
                Back
              </button>
              <button
                onClick={() => {
                  handleGeneratePrompt();
                  setCurrentStep(3);
                }}
                disabled={!userIdea.trim()}
                className={`flex items-center gap-2 px-8 py-4 rounded-xl font-bold transition-all ${!userIdea.trim()
                  ? 'bg-gray-800 text-gray-400 cursor-not-allowed'
                  : 'bg-brand-primary text-black hover:scale-105 shadow-lg shadow-brand-primary/20'
                  }`}
              >
                Generate & Launch <Rocket className="w-5 h-5" />
              </button>
            </div>
          </div>
        );

      case 3: // Launch
        const tool = TOOLS.find(t => t.id === selectedTool);

        return (
          <div className="animate-fade-in text-center py-8">
            <div className="w-24 h-24 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(255,194,14,0.3)] animate-pulse-slow">
              <Rocket className="w-12 h-12 text-black ml-1" />
            </div>

            <h3 className="text-4xl font-serif text-white mb-4">Ready to Build</h3>
            <p className="text-brand-primary text-sm uppercase tracking-wider font-bold mb-8">Phase 4: Execution</p>

            <div className="bg-brand-gray border border-white/10 rounded-xl p-8 max-w-2xl mx-auto mb-12 text-left">
              <h4 className="text-brand-primary font-bold uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Your Optimized Prompt
              </h4>

              <div className="bg-black/50 border border-white/10 rounded-lg p-4 mb-6 relative group">
                <pre className="text-gray-300 font-mono text-sm whitespace-pre-wrap leading-relaxed">
                  {generatedPrompt || "Generating optimized prompt..."}
                </pre>
                <button
                  onClick={copyToClipboard}
                  className="absolute top-2 right-2 p-2 bg-white/10 rounded hover:bg-white/20 text-white transition-colors"
                  title="Copy to Clipboard"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4 border-t border-white/10 pt-6">
                <h5 className="text-white font-bold mb-2">Next Steps:</h5>
                <ol className="space-y-3 text-gray-400 text-sm list-decimal list-inside">
                  <li>Click the button below to open <strong>{tool?.name}</strong>.</li>
                  <li>Paste the optimized prompt into the chat.</li>
                  <li>Watch as your idea comes to life!</li>
                </ol>
              </div>

              <div className="mt-8 text-center">
                <a
                  href={tool?.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-10 py-4 bg-brand-primary text-black font-bold text-lg rounded-xl hover:scale-105 transition-transform shadow-xl"
                >
                  Open {tool?.name} <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div className="mt-8">
              <button onClick={() => setCurrentStep(0)} className="text-gray-400 hover:text-white underline text-sm">
                Start Over
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 min-h-screen flex flex-col">
      <div className="animate-float-gentle text-center mb-12">
        <span className="text-brand-primary font-bold text-sm tracking-widest uppercase mb-3 block">I'm New to Vibe Coding</span>
        <h2 className="text-4xl md:text-5xl font-serif text-white mb-2">Start Here</h2>
        <p className="text-gray-400 text-sm max-w-lg mx-auto">Everything you need to understand vibe coding and build your first project.</p>
      </div>

      {/* What is Vibe Coding - Interactive Auto-Advancing Loop */}
      <div className="mb-16 max-w-4xl mx-auto w-full">
        <h3 className="text-2xl font-serif text-white mb-2 text-center">What is Vibe Coding?</h3>
        <p className="text-center text-sm text-gray-400 mb-8">
          {loopCycle === 0 ? 'Drag or click "Describe" to start — watch the magic unfold!' : 'Describe your changes to start another cycle ↻'}
        </p>

        {(() => {
          const CYCLE_EXAMPLES = [
            { describe: "\"Build me a dark portfolio site with a hero section and contact form.\"", generate: "AI created a React app with a hero banner, project grid, and working contact form — 200 lines, instantly.", iterate: "\"Make the header sticky and add a gold accent color.\"" },
            { describe: "\"Add a blog section with cards that link to individual posts.\"", generate: "AI added a /blog route with responsive post cards, tags, and reading time estimates.", iterate: "\"Make the cards have a hover animation and show a preview image.\"" },
            { describe: "\"Add dark mode toggle and save the preference.\"", generate: "AI wired up a theme context with localStorage persistence and smooth CSS transitions.", iterate: "\"The toggle icon should be a sun/moon and animate when switching.\"" },
          ];
          const cycleData = CYCLE_EXAMPLES[loopCycle % CYCLE_EXAMPLES.length];

          // Phase within the manual progression: 0=waiting for Describe, 1=Describe done (waiting for Generate), 2=Generate done (waiting for Iterate), 3=Iterate done
          const currentPhase = activeLoopStep % 4;

          const advancePhase = () => {
            if (currentPhase === 3) {
              // Reset for next cycle
              setLoopCycle(prev => prev + 1);
              setActiveLoopStep(0);
            } else {
              setActiveLoopStep(prev => prev + 1);
            }
          };

          const steps = [
            { label: "Describe", icon: "💬", color: "from-blue-500 to-cyan-500", instruction: 'drag to start' },
            { label: "Generate", icon: "⚡", color: "from-purple-500 to-pink-500", instruction: 'drag to generate' },
            { label: "Iterate", icon: "🔄", color: "from-brand-primary to-orange-500", instruction: 'drag to refine' },
          ];

          return (
            <div className="flex flex-col items-center gap-6">
              {/* Step icons row */}
              <div className="flex items-center gap-3 md:gap-6">
                {steps.map((step, i) => {
                  const phaseForStep = i + 1; // Describe=1, Generate=2, Iterate=3
                  const isLit = currentPhase >= phaseForStep;
                  const canDrag = currentPhase === i;

                  return (
                    <React.Fragment key={i}>
                      <div
                        draggable={canDrag}
                        onDragStart={(e) => { if (canDrag) e.dataTransfer.setData('text/plain', i.toString()); }}
                        onClick={() => { if (canDrag) advancePhase(); }}
                        className={`relative select-none transition-all duration-500 ${canDrag ? 'cursor-grab active:cursor-grabbing scale-110 shadow-[0_0_20px_rgba(255,194,14,0.3)] bounce-gentle z-10' :
                          isLit ? 'scale-100 opacity-80' : 'opacity-40 scale-90 grayscale'
                          }`}
                        title={canDrag ? `Drag or click to ${step.label}` : ''}
                      >
                        <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${step.color} p-[1px] transition-all duration-500`}>
                          <div className="w-full h-full bg-black rounded-[15px] flex flex-col items-center justify-center gap-0.5 relative overflow-hidden">
                            {canDrag && <div className="absolute inset-0 bg-white/10 animate-pulse" />}
                            <span className="text-lg md:text-xl relative z-10">{step.icon}</span>
                            <span className="text-[9px] md:text-[10px] font-bold text-white uppercase tracking-wider relative z-10">{step.label}</span>
                          </div>
                        </div>
                        {canDrag && (
                          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-brand-primary text-[11px] font-bold whitespace-nowrap animate-pulse flex flex-col items-center">
                            ↑ {step.instruction}
                          </div>
                        )}
                        {canDrag && (
                          <div className="absolute -top-2 -right-2 w-4 h-4 bg-brand-primary text-black text-[9px] flex items-center justify-center font-bold rounded-full animate-bounce shadow-lg">
                            {i + 1}
                          </div>
                        )}
                      </div>
                      {i < 2 && (
                        <ArrowRight className={`w-4 h-4 md:w-5 md:h-5 transition-all duration-500 ${currentPhase > i ? 'text-brand-primary scale-110' : 'text-gray-700'}`} />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>

              {/* Drop Zone / Result Display */}
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const draggedIndex = parseInt(e.dataTransfer.getData('text/plain'));
                  if (draggedIndex === currentPhase) {
                    advancePhase();
                  }
                }}
                className={`w-full max-w-md mt-4 border-2 border-dashed rounded-2xl p-6 text-center transition-all min-h-[140px] flex flex-col items-center justify-center relative overflow-hidden
                  ${currentPhase === 3 ? 'border-brand-primary/40 bg-brand-primary/10 shadow-[0_0_30px_rgba(255,194,14,0.1)]' :
                    currentPhase > 0 ? 'border-brand-primary/20 bg-brand-primary/5' :
                      'border-white/10 hover:border-brand-primary/40 hover:bg-brand-primary/5'
                  }`}
              >
                {currentPhase === 0 ? (
                  <p className="text-sm text-gray-400 font-medium">Drop <span className="text-blue-400 font-bold">Describe</span> here to start your vibe coding loop ✨</p>
                ) : (
                  <div key={activeLoopStep} className="animate-fade-in space-y-4 w-full relative z-10">
                    {currentPhase >= 1 && (
                      <div className={`flex items-start gap-3 text-left transition-all duration-500 ${currentPhase === 1 ? 'opacity-100 translate-y-0' : 'opacity-70 scale-[0.98]'}`}>
                        <span className="text-blue-400 text-base mt-0.5">💬</span>
                        <p className="text-sm text-gray-300"><span className="text-blue-400 font-bold">You said:</span> <span className="font-mono text-xs bg-black/30 px-2 py-0.5 rounded text-blue-200">{cycleData.describe}</span></p>
                      </div>
                    )}

                    {currentPhase >= 2 && (
                      <div className={`flex items-start gap-3 text-left transition-all duration-500 ${currentPhase === 2 ? 'opacity-100 translate-y-0' : 'opacity-70 scale-[0.98]'}`}>
                        <span className="text-purple-400 text-base mt-0.5">⚡</span>
                        <p className="text-sm text-gray-300"><span className="text-purple-400 font-bold">AI generated:</span> <span className="text-gray-400">{cycleData.generate}</span></p>
                      </div>
                    )}

                    {currentPhase >= 3 && (
                      <div className="flex items-start gap-3 text-left animate-fade-in">
                        <span className="text-brand-primary text-base mt-0.5">🔄</span>
                        <p className="text-sm text-gray-300"><span className="text-brand-primary font-bold">You refined:</span> <span className="font-mono text-xs bg-black/30 px-2 py-0.5 rounded text-orange-200">{cycleData.iterate}</span></p>
                      </div>
                    )}

                    {currentPhase === 1 && (
                      <div className="text-purple-400 text-xs font-bold animate-bounce mt-4 pt-2 border-t border-white/5">
                        Now drag "Generate" into this box! ↓
                      </div>
                    )}

                    {currentPhase === 2 && (
                      <div className="text-brand-primary text-xs font-bold animate-bounce mt-4 pt-2 border-t border-white/5">
                        Almost done! Drag "Iterate" to refine the app ↓
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* End of cycle message */}
              <div className={`transition-all duration-500 h-10 flex items-center justify-center ${currentPhase === 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                <button
                  onClick={advancePhase}
                  className="px-6 py-2 bg-brand-primary/20 hover:bg-brand-primary text-brand-primary hover:text-black rounded-full text-sm font-bold transition-all flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" /> Repeat the process endlessly
                </button>
              </div>
            </div>
          );
        })()}

        {/* Compact info cards */}
        <div className="grid md:grid-cols-3 gap-3">
          <div className="bg-brand-gray border border-white/10 rounded-2xl p-5 hover:border-brand-primary/30 transition-colors text-center">
            <span className="text-2xl mb-2 block">🎯</span>
            <h4 className="text-sm font-bold text-white mb-1">You're the Architect</h4>
            <p className="text-xs text-gray-400">AI writes code. You direct the vision.</p>
          </div>

          <div className="bg-brand-gray border border-white/10 rounded-2xl p-5 hover:border-brand-primary/30 transition-colors text-center">
            <span className="text-2xl mb-2 block">💡</span>
            <h4 className="text-sm font-bold text-white mb-1">3 Skills That Matter</h4>
            <p className="text-xs text-gray-400">Describe clearly · Paste errors · Test everything</p>
          </div>

          <div className="bg-brand-gray border border-white/10 rounded-2xl p-5 hover:border-brand-primary/30 transition-colors text-center">
            <span className="text-2xl mb-2 block">🆓</span>
            <h4 className="text-sm font-bold text-white mb-1">Free to Start</h4>
            <p className="text-xs text-gray-400">
              <a href="https://aistudio.google.com" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">AI Studio</a>
              {" · "}
              <a href="https://cursor.sh" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">Cursor</a>
              {" · "}
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">GitHub</a>
            </p>
          </div>
        </div>
      </div>

      {/* Workshop Steps Header with context */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-serif text-white mb-2">Your First Session</h3>
        <p className="text-gray-400 text-sm max-w-lg mx-auto">
          Now that you know the loop, let's put it into practice. Pick a tool, write a prompt, and launch your first app — all in under 10 minutes.
        </p>
      </div>

      {/* Step Navigator */}
      <div className="mb-12 relative max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {WORKSHOP_STEPS.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            const StepIcon = step.icon;

            return (
              <button
                key={step.id}
                onClick={() => {
                  if (index <= currentStep) setCurrentStep(index);
                }}
                className={`
                  relative flex flex-col items-center gap-3 p-5 md:p-6 rounded-2xl border-2 transition-all duration-300 text-center group
                  ${isActive
                    ? 'bg-brand-primary/10 border-brand-primary shadow-[0_0_30px_rgba(255,194,14,0.15)] scale-[1.02]'
                    : isCompleted
                      ? 'bg-[#1a1a1a] border-brand-primary/40 hover:border-brand-primary/70 cursor-pointer'
                      : 'bg-white/[0.02] border-white/10 opacity-50 cursor-default'
                  }
                `}
              >
                {/* Step Number Badge */}
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors
                  ${isActive ? 'bg-brand-primary text-black' : isCompleted ? 'bg-brand-primary/30 text-brand-primary' : 'bg-white/10 text-gray-400'}
                `}>
                  {isCompleted ? '✓' : index + 1}
                </div>

                {/* Icon */}
                <div className={`
                  w-10 h-10 rounded-xl flex items-center justify-center transition-colors
                  ${isActive ? 'bg-brand-primary/20 text-brand-primary' : isCompleted ? 'bg-[#1a1a1a] text-brand-primary/70' : 'bg-[#111] text-gray-500'}
                `}>
                  <StepIcon className="w-5 h-5" />
                </div>

                {/* Title */}
                <span className={`
                  text-xs font-bold uppercase tracking-wider leading-tight
                  ${isActive ? 'text-brand-primary' : isCompleted ? 'text-gray-300' : 'text-gray-400'}
                `}>
                  {step.title}
                </span>

                {/* Active Indicator */}
                {isActive && (
                  <span className="text-[10px] text-brand-primary/60 font-mono">Current</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Wizard Card */}
      <div className="flex-1 glass-panel p-6 md:p-12 rounded-3xl relative overflow-hidden mt-2 min-h-[500px]">
        {renderStepContent()}
      </div>
    </div>
  );
};

export default Curriculum;