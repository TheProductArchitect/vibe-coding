import React, { useState } from 'react';
import { generateVibeConfig } from '../services/gemini';
import { VibeResponse } from '../types';
import { Sparkles, Loader2, ArrowRight, Paintbrush, Zap, ExternalLink } from 'lucide-react';

const STUDENT_SIGNUP_LINK = "https://one.google.com/u/3/ai-student?g1_landing_page=75&utm_source=gemini&utm_medium=web&utm_campaign=advmktgsite";

const VibeLab: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VibeResponse | null>(null);

  const handleVibeCheck = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const data = await generateVibeConfig(prompt);
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-ai-cyan to-ai-purple mb-4">
          The Vibe Lab
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto mb-6">
          Experience how "Vibe Coding" works. You describe the feeling or business intent, and the AI translates it into technical design decisions.
        </p>

        {/* Pro Tip Banner */}
        <div className="inline-flex flex-col sm:flex-row items-center gap-3 bg-cjbs-primary/20 border border-cjbs-primary/40 rounded-lg px-4 py-2 text-sm text-gray-200">
          <Zap className="w-4 h-4 text-yellow-400 fill-current" />
          <span>For best results in real coding, use Gemini Pro.</span>
          <a href={STUDENT_SIGNUP_LINK} target="_blank" rel="noopener noreferrer" className="text-ai-cyan hover:text-white font-semibold underline flex items-center gap-1">
            Get Student Free Access <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="glass-panel p-8 rounded-2xl flex flex-col justify-between min-h-[450px] border-t-4 border-t-cjbs-primary">
          <div>
            <label className="block text-lg font-serif font-medium text-white mb-2">
              What are we building today?
            </label>
            <p className="text-xs text-gray-400 mb-4">Be expressive. Focus on the user's emotion and the business goal.</p>
            <textarea
              className="w-full bg-cjbs-dark/50 border border-gray-700 rounded-xl p-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-ai-purple focus:border-transparent outline-none transition-all resize-none h-40"
              placeholder="e.g., 'A meditation app for busy CEOs that feels like a quiet Japanese garden' or 'A high-energy crypto trading dashboard for Gen Z'"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>

          <div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleVibeCheck}
                disabled={loading || !prompt}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${loading || !prompt
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-ai-purple to-ai-cyan text-white hover:scale-105 shadow-lg shadow-ai-purple/25'
                  }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin w-5 h-5" />
                    Analyzing Vibe...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Translate Vibe to Code
                  </>
                )}
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5">
              <p className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">One-click Presets</p>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => setPrompt("Minimalist luxury fashion brand based in Paris, very high end, serif fonts")} className="text-xs hover:bg-white/10 hover:text-white text-gray-400 border border-gray-700 px-3 py-1.5 rounded-full transition-colors">Luxury Fashion</button>
                <button onClick={() => setPrompt("Cyberpunk arcade game interface with neon glitches and dark mode")} className="text-xs hover:bg-white/10 hover:text-white text-gray-400 border border-gray-700 px-3 py-1.5 rounded-full transition-colors">Cyberpunk</button>
                <button onClick={() => setPrompt("Trustworthy medical portal for elderly patients, high accessibility, large text, calming blue")} className="text-xs hover:bg-white/10 hover:text-white text-gray-400 border border-gray-700 px-3 py-1.5 rounded-full transition-colors">Medical Portal</button>
              </div>
            </div>
          </div>
        </div>

        {/* Output Section */}
        <div className="relative min-h-[450px]">
          {result ? (
            <div className="glass-panel p-8 rounded-2xl h-full animate-pulse-slow border-ai-cyan/30 flex flex-col justify-between border-t-4 border-t-ai-cyan">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Paintbrush className="w-5 h-5 text-ai-cyan" />
                    Design System Spec
                  </h3>
                  <span className="text-[10px] font-mono bg-ai-purple/20 text-ai-purple px-2 py-1 rounded border border-ai-purple/30">
                    GENERATED_BY_GEMINI
                  </span>
                </div>

                <div className="space-y-6">
                  <div className="bg-white/5 p-4 rounded-lg">
                    <h4 className="text-xs text-gray-400 uppercase tracking-wider mb-2">Component Name</h4>
                    <p className="text-lg font-serif text-white">{result.uiElementName}</p>
                  </div>

                  <div>
                    <h4 className="text-xs text-gray-400 uppercase tracking-wider mb-2">AI Reasoning</h4>
                    <p className="text-gray-300 text-sm leading-relaxed italic border-l-2 border-ai-purple pl-4">
                      "{result.reasoning}"
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs text-gray-400 uppercase tracking-wider mb-2">Color Palette</h4>
                    <div className="flex gap-3">
                      {result.colorPalette.map((color, idx) => (
                        <div key={idx} className="group relative">
                          <div
                            className="w-10 h-10 rounded-lg shadow-lg border border-white/10 transition-transform hover:scale-110 cursor-pointer"
                            style={{ backgroundColor: color }}
                          />
                          <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-mono bg-black/80 px-2 py-1 rounded text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                            {color}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 p-3 rounded-lg">
                      <h4 className="text-xs text-gray-400 uppercase tracking-wider mb-1">Typography</h4>
                      <p className="text-white text-sm font-medium">{result.fontPairing}</p>
                    </div>
                    <div className="bg-white/5 p-3 rounded-lg">
                      <h4 className="text-xs text-gray-400 uppercase tracking-wider mb-1">Layout</h4>
                      <p className="text-white text-sm font-medium">{result.layoutStyle}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 text-center">
                <p className="text-sm text-gray-400 mb-3">Ready to build this in Lovable?</p>
                <a
                  href="https://lovable.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-2 bg-white text-cjbs-dark font-bold rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Launch Lovable <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ) : (
            <div className="glass-panel p-8 rounded-2xl h-full flex flex-col items-center justify-center text-center border-dashed border-2 border-gray-700">
              <div className="w-20 h-20 bg-gray-800/50 rounded-full flex items-center justify-center mb-6 animate-pulse">
                <Sparkles className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-400 mb-2">Awaiting Vibe Input</h3>
              <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
                Enter a prompt on the left to see how Generative AI translates abstract concepts into concrete design specifications.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VibeLab;