import React, { useState } from 'react';
import { Bot, GraduationCap, LayoutDashboard, Sparkles, BookOpen, Rocket, Hammer, Lightbulb, Globe, Code } from 'lucide-react';
import Curriculum from './components/Curriculum';
import ToolsSection from './components/ToolsSection';
import WebsiteBuilderGuide from './components/WebsiteBuilderGuide';
import { AppState } from './types';

const App: React.FC = () => {

  const [activeTab, setActiveTab] = useState<AppState>(AppState.HOME);

  const renderContent = () => {
    switch (activeTab) {
      case AppState.NEW_TO_VIBE:
        return <Curriculum />;
      case AppState.WHAT_IS_WEB_APP:
        return <ToolsSection />;
      case AppState.BUILD_WORKFLOW:
        return <WebsiteBuilderGuide />;
      case AppState.HOME:
      default:
        return (
          <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-brand-primary/10 blur-[100px] -z-10 rounded-full pointer-events-none" />

            <div className="animate-float mb-10 relative group">
              <div className="absolute inset-0 bg-brand-primary blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-brand-primary to-orange-500 p-[2px] relative z-10 shadow-2xl shadow-brand-primary/20">
                <div className="w-full h-full bg-black rounded-[22px] flex items-center justify-center border border-white/10">
                  <Code className="w-14 h-14 text-brand-primary" />
                </div>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/30 text-brand-primary text-xs font-bold tracking-widest uppercase mb-8">
              <Sparkles className="w-3 h-3" />
              The Future of Building
            </div>

            <h1 className="text-5xl md:text-7xl font-bold font-serif text-white mb-6 tracking-tight leading-tight">
              Vibe <br />
              <span className="text-brand-primary">
                Coding
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto mb-4 leading-relaxed font-light">
              Turn your ideas into live web apps instantly. <span className="text-white font-medium">Zero coding required.</span>
            </p>

            <p className="text-sm text-gray-500 max-w-lg mx-auto mb-10 leading-relaxed">
              Master the art of prompting. Learn to build, deploy, and scale real software using advanced AI tools — entirely through plain English.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setActiveTab(AppState.NEW_TO_VIBE)}
                className="px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors flex items-center gap-2 justify-center shadow-xl"
              >
                <Lightbulb className="w-5 h-5" />
                I'm New — Start Here
              </button>
              <button
                onClick={() => setActiveTab(AppState.BUILD_WORKFLOW)}
                className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold rounded-xl hover:bg-white/10 transition-colors flex items-center gap-2 justify-center"
              >
                <Rocket className="w-5 h-5" />
                Build My First App
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-brand-primary selection:text-black font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-panel border-b border-white/10 bg-black/80" aria-label="Main navigation">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div
            className="flex items-center gap-4 cursor-pointer group"
            onClick={() => setActiveTab(AppState.HOME)}
          >
            {/* Logo */}
            <div className="w-10 h-10 bg-brand-primary rounded-sm flex items-center justify-center shadow-lg transform group-hover:rotate-3 transition-transform">
              <span className="font-serif font-bold text-black text-lg">V</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-white text-sm tracking-wide group-hover:text-brand-primary transition-colors uppercase">
                Vibe Coding
              </span>
              <span className="text-xs text-gray-400 tracking-wider">Build with AI</span>
            </div>
          </div>

          <div className="flex gap-2">
            {[
              { id: AppState.HOME, label: 'Home', icon: LayoutDashboard, title: "Home" },
              { id: AppState.NEW_TO_VIBE, label: "I'm New", icon: Lightbulb, title: "I'm new to vibe coding — start here" },
              { id: AppState.WHAT_IS_WEB_APP, label: 'How Software Works', icon: Globe, title: "Understanding how software works" },
              { id: AppState.BUILD_WORKFLOW, label: 'Build', icon: Rocket, title: "Build and deploy my first app" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                title={item.title}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === item.id
                  ? 'bg-brand-primary text-black shadow-lg shadow-brand-primary/25'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
              >
                <item.icon className="w-4 h-4" />
                <span className="hidden md:inline">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-28 pb-12">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 mt-12 bg-brand-gray">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-left">
            <h2 className="text-white font-bold mb-2">Vibe Coding</h2>
            <p className="text-gray-500 text-sm">Build real products with AI — no coding experience required.</p>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <span>Copyright © 2026 Venu Gopinath. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;