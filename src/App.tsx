import React, { useEffect, useState } from 'react';
import * as Lucide from 'lucide-react';
import { AppView, CourseRoadmapStep, Message, PlayMode } from './types';
import { COURSE_MODULES, FEATURES, MOCK_RESPONSES, ROADMAP_STEPS } from './data';
import Header from './components/Header';
import FeatureCard from './components/FeatureCard';
import RoadmapCard from './components/RoadmapCard';
import PlaygroundSidebar from './components/PlaygroundSidebar';
import ChatWindow from './components/ChatWindow';

// Browser path router for the tutorial.
// This keeps URLs clean: http://localhost:3000/chat instead of #/chat.
const pathToView = (path: string): AppView => {
  if (path === '/chat') return 'chat';
  if (path === '/course') return 'course';
  return 'home';
};

const viewToPath: Record<AppView, string> = {
  home: '/',
  chat: '/chat',
  course: '/course'
};

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>(() => pathToView(window.location.pathname));
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [activeModuleId, setActiveModuleId] = useState('mod-1');
  const [activeMode, setActiveMode] = useState<PlayMode>('Beginner');
  const [roadmapSteps, setRoadmapSteps] = useState<CourseRoadmapStep[]>(ROADMAP_STEPS);
  const [isLoading, setIsLoading] = useState(false);

  // Dedicated light/dark visual theme state syncing automatically with localStorage.
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('smsoftware-theme');
    return saved === 'light' || saved === 'dark' ? saved : 'dark';
  });

  // Apply light/dark class tags to root document context synchronously on state changes.
  useEffect(() => {
    localStorage.setItem('smsoftware-theme', theme);
    document.documentElement.classList.toggle('light', theme === 'light');
  }, [theme]);

  // Listen for browser back/forward navigation.
  useEffect(() => {
    const syncRoute = () => setCurrentView(pathToView(window.location.pathname));
    window.addEventListener('popstate', syncRoute);
    return () => window.removeEventListener('popstate', syncRoute);
  }, []);

  const handleNavigate = (view: AppView) => {
    const nextPath = viewToPath[view];
    window.history.pushState({}, '', nextPath);
    setCurrentView(view);
  };

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Chat message submission engine.
  const handleSendMessage = (customText?: string) => {
    const query = (customText || inputValue).trim();
    if (!query || isLoading) return;

    // 1. Append the student message immediately so the UI feels responsive.
    const userMsg: Message = {
      id: `msg-user-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    // 2. Use mocked responses for the tutorial; replace this block with a real API call later.
    setTimeout(() => {
      const matchedText = MOCK_RESPONSES[query] || MOCK_RESPONSES.default;

      // Focus profiles let the same chat UI teach different audiences.
      let modifiedResponse = matchedText;
      if (activeMode === 'Beginner' && !MOCK_RESPONSES[query]) {
        modifiedResponse = `[Beginner Focus Mode enabled]\n\nLet's break this down in plain English:\n\n${matchedText}`;
      } else if (activeMode === 'Developer' && !MOCK_RESPONSES[query]) {
        modifiedResponse = `[Developer Focus Mode enabled]\n\nHere are the API and implementation details:\n\n${matchedText}`;
      } else if (activeMode === 'Product' && !MOCK_RESPONSES[query]) {
        modifiedResponse = `[Product Focus Mode enabled]\n\nHere are the product, cost, and workflow notes:\n\n${matchedText}`;
      }

      const assistantMsg: Message = {
        id: `msg-ai-${Date.now()}`,
        role: 'assistant',
        content: modifiedResponse,
        timestamp: new Date(),
        tokens: Math.floor(Math.random() * 200) + 180,
        modelName: 'smsoftware-ai-v0.1'
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setIsLoading(false);
    }, 900); // realistic typing latency delay
  };

  const handleResetChat = () => {
    setMessages([]);
    setInputValue('');
  };

  const handleStartChat = (promptText?: string) => {
    handleNavigate('chat');
    if (promptText) {
      // Small timeout lets the route paint before the starter prompt appears.
      setTimeout(() => handleSendMessage(promptText), 250);
    }
  };

  // Interactive capability: toggle roadmap lesson status.
  const handleMarkStepActive = (id: number) => {
    setRoadmapSteps((prevSteps) =>
      prevSteps.map((step) => {
        if (step.id !== id) return step;

        // Cycle status nicely for interactive tutorial testing.
        const nextStatus = step.status === 'locked'
          ? 'active'
          : step.status === 'active'
            ? 'completed'
            : 'locked';

        return { ...step, status: nextStatus };
      })
    );
  };

  return (
    <div className={`min-h-screen relative overflow-x-hidden font-sans transition-colors duration-200 ${
      theme === 'dark' ? 'bg-[#020617] text-slate-100' : 'bg-[#f8fafc] text-slate-800'
    }`}>
      {/* Shared fixed top navigation. */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Decorative background glows stay behind every route. */}
      <div className="absolute top-0 left-0 right-0 h-[520px] bg-gradient-to-b from-blue-500/10 via-transparent to-transparent pointer-events-none z-0" />
      <div className="absolute top-[12%] left-[5%] w-[420px] h-[420px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none z-0" />

      <main className="relative z-10 pt-16">
        {currentView === 'home' && (
          <section id="view-home" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 flex flex-col items-center">
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold tracking-wider mb-8 border transition-colors ${
              theme === 'dark'
                ? 'bg-blue-500/10 border-blue-500/20 text-blue-400'
                : 'bg-blue-50 border-blue-200 text-blue-600 shadow-sm'
            }`}>
              <Lucide.Sparkles className="w-3.5 h-3.5" />
              <span>AI UI/UX LAB CRASH COURSE</span>
            </div>

            <div className="text-center max-w-3xl mb-16">
              <h1 className={`text-4xl sm:text-6xl font-display font-extrabold tracking-tight mb-6 leading-[1.05] ${
                theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}>
                Build Your First <span className="gradient-text">AI Chat Experience</span>
              </h1>

              <p className={`text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mb-10 ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
              }`}>
                A simple tutorial shell for teaching LLM UI/UX, prompt examples, chat states, and model controls.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => handleStartChat('Give me a quick guided tour of this AI UI/UX Lab chat workspace.')}
                  className="w-full sm:w-auto py-3.5 px-8 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm tracking-wide transition-all cursor-pointer shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2"
                >
                  <Lucide.MessageSquare className="w-4 h-4" />
                  <span>Open /chat</span>
                </button>

                <button
                  onClick={() => handleNavigate('course')}
                  className={`w-full sm:w-auto py-3.5 px-8 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 text-sm font-semibold tracking-wide border ${
                    theme === 'dark'
                      ? 'bg-slate-900 border-slate-800/60 text-slate-300 hover:text-white'
                      : 'bg-white border-slate-200 text-slate-700 hover:text-slate-900'
                  }`}
                >
                  <Lucide.Compass className="w-4 h-4" />
                  <span>View Course Path</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full" id="landing-features-grid">
              {FEATURES.map((item) => (
                <FeatureCard
                  key={item.id}
                  item={item}
                  onCtaClick={() => handleStartChat(`Explain the essential properties of Lesson: ${item.title}`)}
                  theme={theme}
                />
              ))}
            </div>
          </section>
        )}

        {currentView === 'chat' && (
          <section id="view-chat" className="min-h-[calc(100vh-4rem)]">
            {/* Fixed left dashboard rail for desktop. It becomes a normal stacked panel on mobile. */}
            <div className={`lg:fixed lg:left-0 lg:top-16 lg:bottom-0 lg:w-[316px] lg:overflow-y-auto px-4 py-4 border-b lg:border-b-0 lg:border-r ${
              theme === 'dark' ? 'border-slate-800/60 bg-[#020617]/95' : 'border-slate-200 bg-white/95'
            }`}>
              <PlaygroundSidebar
                activeModuleId={activeModuleId}
                onSelectModule={(id) => {
                  setActiveModuleId(id);
                  const selectedModule = COURSE_MODULES.find((module) => module.id === id) || { title: 'Core Concepts' };
                  handleSendMessage(`Give me an illustrative summary on course module "${selectedModule.title}"`);
                }}
                activeMode={activeMode}
                onSelectMode={setActiveMode}
                onResetChat={handleResetChat}
                onApplyPrompt={(text) => handleSendMessage(text)}
                theme={theme}
              />
            </div>

            {/* Main chat canvas. ChatWindow already owns the input tray at the bottom. */}
            <div className="lg:ml-[316px] px-4 sm:px-6 lg:px-8 py-4">
              <div className="max-w-6xl mx-auto">
                {/* Dashboard strip: simple app status without taking attention away from the chat. */}
                <div className="mb-4 grid grid-cols-1 xl:grid-cols-[1fr_auto] gap-3 items-center">
                  <div className={`rounded-xl border px-4 py-3 ${
                    theme === 'dark' ? 'bg-slate-900/45 border-slate-800/60' : 'bg-white border-slate-200 shadow-sm'
                  }`}>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-blue-500 font-semibold">
                      http://localhost:3000/chat
                    </p>
                    <h2 className={`text-2xl font-display font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      AI Chat Workspace
                    </h2>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {[
                      ['Model', 'Mock v0.1'],
                      ['Context', '16k'],
                      ['Mode', activeMode]
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className={`rounded-xl border px-3 py-2 min-w-24 ${
                          theme === 'dark' ? 'bg-slate-900/45 border-slate-800/60' : 'bg-white border-slate-200 shadow-sm'
                        }`}
                      >
                        <p className="text-[9px] font-mono uppercase tracking-widest text-slate-500">{label}</p>
                        <p className={`text-xs font-semibold mt-0.5 ${theme === 'dark' ? 'text-slate-100' : 'text-slate-800'}`}>
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <ChatWindow
                  messages={messages}
                  inputValue={inputValue}
                  onInputChange={setInputValue}
                  onSendMessage={handleSendMessage}
                  isLoading={isLoading}
                  activeMode={activeMode}
                  onSelectMode={setActiveMode}
                  theme={theme}
                />
              </div>
            </div>
          </section>
        )}

        {currentView === 'course' && (
          <section id="view-course-roadmap" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-14 max-w-xl mx-auto">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 border shadow-lg ${
                theme === 'dark'
                  ? 'bg-blue-500/10 border-blue-500/20 shadow-blue-500/10'
                  : 'bg-blue-50 border-blue-200 shadow-blue-500/5'
              }`}>
                <Lucide.GraduationCap className="w-6 h-6 text-blue-500" />
              </div>
              <h2 className={`text-3xl font-display font-extrabold tracking-tight mb-3 ${
                theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}>
                Crash Course Roadmap
              </h2>
              <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                Follow this six-step visual syllabus to configure prompts, add retrieval context, and design useful AI workflows.
              </p>
            </div>

            <div className={`relative pl-2 md:pl-6 ml-2 md:ml-6 border-l ${
              theme === 'dark' ? 'border-slate-800/60' : 'border-slate-200'
            }`} id="course-roadmap-timeline">
              {roadmapSteps.map((step, idx) => (
                <RoadmapCard
                  key={step.id}
                  step={step}
                  index={idx}
                  totalSteps={roadmapSteps.length}
                  onActivateStep={handleMarkStepActive}
                  theme={theme}
                />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
