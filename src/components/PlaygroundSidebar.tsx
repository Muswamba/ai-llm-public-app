import React from 'react';
import * as Lucide from 'lucide-react';
import { CourseModule, PlayMode } from '../types';
import { COURSE_MODULES } from '../data';

interface PlaygroundSidebarProps {
  activeModuleId: string;
  onSelectModule: (id: string) => void;
  activeMode: PlayMode;
  onSelectMode: (mode: PlayMode) => void;
  onResetChat: () => void;
  onApplyPrompt: (text: string) => void;
  theme?: 'light' | 'dark';
}

export default function PlaygroundSidebar({
  activeModuleId,
  onSelectModule,
  activeMode,
  onSelectMode,
  onResetChat,
  onApplyPrompt,
  theme = 'dark'
}: PlaygroundSidebarProps) {
  return (
    <aside id="playground-sidebar" className="w-full flex flex-col gap-4 shrink-0 self-stretch">
      
      {/* Primary Actions Grid */}
      <div className="flex flex-col gap-2">
        <button
          onClick={onResetChat}
          className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs tracking-wide flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shadow-lg shadow-blue-500/20"
        >
          <Lucide.PlusCircle className="w-4 h-4" />
          <span>NEW CHAT</span>
        </button>
      </div>

      {/* Model Status Card */}
      <div className={`p-4 rounded-xl border relative overflow-hidden transition-colors ${
        theme === 'dark' ? 'border-slate-800/60 bg-slate-900/55' : 'border-slate-200 bg-slate-50'
      }`}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
            MODEL STATUS
          </span>
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            READY
          </span>
        </div>

        <div className="space-y-1.5 font-mono text-[11px]">
          <div className="flex justify-between">
            <span className="text-slate-500">Instance:</span>
            <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-800'}>smsoftware-ai-v0.1</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Context:</span>
            <span className="text-blue-500 font-medium">16k tokens</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Source:</span>
            <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-800'}>Mock data</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Safety:</span>
            <span className="text-emerald-500 font-semibold">Client only</span>
          </div>
        </div>
      </div>

      {/* Mode Selector Option tabs */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest px-1">
          STUDENT FOCUS PROFILE
        </label>
        <div className={`grid grid-cols-3 gap-1 p-1 rounded-lg border transition-colors ${
          theme === 'dark' ? 'bg-slate-950 border-slate-800/60' : 'bg-slate-100 border-slate-200'
        }`}>
          {(['Beginner', 'Developer', 'Product'] as PlayMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => onSelectMode(mode)}
              className={`py-1.5 rounded text-[11px] font-semibold font-mono uppercase transition-all duration-200 cursor-pointer text-center
                ${activeMode === mode 
                  ? 'bg-blue-600 font-bold text-white shadow shadow-blue-500/20' 
                  : theme === 'dark'
                    ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white shadow-xs'
                }
              `}
            >
              {mode}
            </button>
          ))}
        </div>
        <p className={`text-[10px] leading-relaxed px-1 transition-colors ${
          theme === 'dark' ? 'text-slate-500' : 'text-slate-600'
        }`}>
          {activeMode === 'Beginner' && 'Focuses on plain language, analogies, and quick definitions.'}
          {activeMode === 'Developer' && 'Emphasizes API configuration, schema shape, and code snippets.'}
          {activeMode === 'Product' && 'Highlights business workflows, cost, safety, and launch readiness.'}
        </p>
      </div>

      {/* Course Modules Progress tracker */}
      <div className="flex flex-col gap-2.5 flex-grow overflow-y-auto lg:max-h-[calc(100vh-26rem)] pr-1">
        <div className="flex items-center justify-between px-1">
          <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
            SMSOFTWARE MODULES
          </label>
          <span className="text-[10px] font-mono text-blue-550 font-semibold animate-pulse">
            {COURSE_MODULES.filter(m => m.completed).length}/{COURSE_MODULES.length} Done
          </span>
        </div>

        <div className="space-y-1.5">
          {COURSE_MODULES.map((mod) => {
            const isSelected = activeModuleId === mod.id;
            return (
              <button
                key={mod.id}
                onClick={() => onSelectModule(mod.id)}
                className={`w-full text-left p-2.5 rounded-lg border transition-all text-xs flex gap-2.5 items-start cursor-pointer group
                  ${isSelected 
                    ? theme === 'dark'
                      ? 'bg-blue-950/20 border-blue-500/40 text-white' 
                      : 'bg-blue-50/50 border-blue-500/35 text-slate-900'
                    : theme === 'dark'
                      ? 'bg-[#0f172a]/30 border-slate-800/60 text-slate-400 hover:border-slate-705 hover:bg-[#0f172a]/70 hover:text-slate-200'
                      : 'bg-[#f8fafc]/50 border-slate-200 text-slate-600 hover:border-slate-350 hover:bg-white hover:text-slate-900 shadow-sm'
                  }
                `}
              >
                {/* Completion radio bubble */}
                <div className={`mt-0.5 rounded-full w-3.5 h-3.5 flex items-center justify-center shrink-0 border transition-all ${
                  mod.completed 
                    ? 'bg-blue-500/20 border-blue-400 text-blue-300' 
                    : theme === 'dark'
                      ? 'border-slate-800/60 group-hover:border-slate-600 text-transparent'
                      : 'border-slate-300 group-hover:border-slate-400 text-transparent'
                }`}>
                  {mod.completed && <Lucide.Check className="w-2.5 h-2.5 stroke-[3]" />}
                </div>

                {/* Module title/info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <span className={`overflow-hidden text-ellipsis whitespace-nowrap text-xs ${
                      isSelected 
                        ? 'text-blue-500 font-bold' 
                        : theme === 'dark' ? 'text-slate-200 font-semibold' : 'text-slate-800 font-semibold'
                    }`}>
                      {mod.title}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 shrink-0 capitalize">
                      {mod.duration}
                    </span>
                  </div>
                  <p className={`text-[10px] font-sans line-clamp-1 transition-colors ${
                    theme === 'dark' ? 'text-slate-500 group-hover:text-slate-400' : 'text-slate-500 group-hover:text-slate-700'
                  }`}>
                    {mod.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer support snippet */}
      <div className={`mt-auto border-t pt-3 font-mono text-[9px] text-slate-500 flex items-center justify-between transition-colors ${
        theme === 'dark' ? 'border-slate-800/60' : 'border-slate-200'
      }`}>
        <span>SMSOFTWARE AI LAB v0.1</span>
        <span>UI_PREVIEW_STAGE</span>
      </div>
    </aside>
  );
}
