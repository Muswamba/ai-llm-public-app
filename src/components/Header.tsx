import React, { useState } from 'react';
import * as Lucide from 'lucide-react';
import { AppView } from '../types';

interface HeaderProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export default function Header({ currentView, onNavigate, theme, onToggleTheme }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: <Lucide.Home className="w-4 h-4" /> },
    { id: 'chat', label: 'Chat', icon: <Lucide.MessageSquare className="w-4 h-4" /> },
    { id: 'course', label: 'Roadmap', icon: <Lucide.Compass className="w-4 h-4" /> }
  ] as const;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 w-full border-b transition-colors duration-200 ${
      theme === 'dark' 
        ? 'border-slate-800/60 bg-[#020617]/90 text-white' 
        : 'border-slate-200 bg-white/90 text-slate-900'
    } backdrop-blur-md`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo Text with gradient */}
        <div 
          onClick={() => onNavigate('home')} 
          className="flex items-center gap-2.5 cursor-pointer group"
          id="branding-logo"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white italic shadow-lg shadow-blue-500/10">
            SM
          </div>
          <div className="flex flex-col">
            <span className={`font-display font-bold text-xs tracking-tight uppercase leading-none ${
              theme === 'dark' ? 'text-white' : 'text-slate-905'
            }`}>
              AI LAB <span className="text-blue-500">v0.1</span>
            </span>
            <span className="text-[9px] font-mono text-slate-500 tracking-wider font-semibold uppercase">
              AI UI/UX LAB
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className={`hidden md:flex items-center gap-1.5 p-1 rounded-full border transition-colors duration-200 ${
          theme === 'dark' 
            ? 'bg-slate-900/60 border-slate-800/60' 
            : 'bg-slate-100 border-slate-200/80'
        }`} id="nav-desktop">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer
                  ${isActive 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                    : theme === 'dark'
                      ? 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                  }
                `}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Outer Right Tray Info Button */}
        <div className="hidden md:flex items-center gap-3">
          {/* Universal theme toggle button for desktop layout */}
          <button
            onClick={onToggleTheme}
            className={`p-2 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-center ${
              theme === 'dark'
                ? 'bg-slate-900 border-slate-800/60 text-amber-400 hover:text-amber-300 hover:bg-slate-800/90 shadow'
                : 'bg-slate-150 border-slate-200 text-indigo-600 hover:text-indigo-500 hover:bg-slate-200/50 shadow-sm'
            }`}
            title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle visual theme"
          >
            {theme === 'dark' ? (
              <Lucide.Sun className="w-4 h-4 animate-spin-slow text-amber-400" />
            ) : (
              <Lucide.Moon className="w-4 h-4 text-purple-600" />
            )}
          </button>

          <div className={`font-mono text-xs px-2.5 py-1.5 rounded-lg flex items-center gap-2 border transition-colors duration-200 ${
            theme === 'dark' 
              ? 'text-slate-400 bg-slate-900 border-slate-800/60' 
              : 'text-slate-600 bg-slate-100 border-slate-200/80'
          }`}>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></span>
              <span>LAB_STAGE: <span className="text-blue-500 font-bold">INTRO_V1</span></span>
          </div>

          <button
            onClick={() => onNavigate('chat')}
            className="text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-all shadow-lg shadow-blue-500/25 cursor-pointer flex items-center gap-1.5"
          >
            <span>Open Chat</span>
            <Lucide.ArrowRight className="w-3.5 h-3.5 text-blue-200" />
          </button>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`md:hidden p-2 rounded-lg border transition-all cursor-pointer ${
            theme === 'dark'
              ? 'bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border-transparent'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-705 border-slate-200'
          }`}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <Lucide.X className="w-5 h-5" /> : <Lucide.Menu className="w-5 h-5" />}
        </button>

      </div>

      {/* Mobile Slideout Panel Overlay */}
      {mobileMenuOpen && (
        <div className={`md:hidden border-t backdrop-blur-lg px-4 py-5 space-y-4 animate-slideDown transition-colors duration-200 ${
          theme === 'dark' ? 'border-white/10 bg-slate-950/95' : 'border-slate-200 bg-white/95 text-slate-900 shadow-xl'
        }`} id="nav-mobile-panel">
          
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer
                    ${isActive 
                      ? 'bg-blue-600 text-white font-semibold shadow-lg shadow-blue-500/20' 
                      : theme === 'dark'
                        ? 'text-slate-400 hover:text-white hover:bg-white/5'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }
                  `}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-200/20 flex flex-col gap-3">
            {/* Theme selector trigger in mobile row layout */}
            <button
              onClick={() => {
                onToggleTheme();
              }}
              className={`flex items-center justify-between w-full p-3 rounded-xl border text-xs font-semibold transition-all duration-200 cursor-pointer ${
                theme === 'dark'
                  ? 'bg-slate-900 border-slate-800/60 text-amber-400 hover:text-amber-300'
                  : 'bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200/50'
              }`}
            >
              <span>{theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}</span>
              {theme === 'dark' ? <Lucide.Sun className="w-4 h-4 text-amber-400 animate-spin-slow" /> : <Lucide.Moon className="w-4 h-4 text-purple-600" />}
            </button>

            <div className={`font-mono text-xs p-3 rounded-lg flex justify-between border transition-colors duration-200 ${
              theme === 'dark' 
                ? 'text-slate-400 bg-slate-900 border-slate-800/60' 
                : 'text-slate-600 bg-slate-100 border-slate-200'
            }`}>
            <span>AI UI/UX LAB:</span>
              <span className="text-blue-500 font-bold">INTRO_V1</span>
            </div>
            
            <button
              onClick={() => {
                onNavigate('chat');
                setMobileMenuOpen(false);
              }}
              className="w-full text-center py-3 rounded-xl bg-blue-600 text-white font-semibold text-xs tracking-wider hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25 cursor-pointer"
            >
              Open Chat
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
