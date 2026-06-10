import React from 'react';
import * as Lucide from 'lucide-react';
import { CourseRoadmapStep } from '../types';

interface RoadmapCardProps {
  key?: number | string;
  step: CourseRoadmapStep;
  index: number;
  totalSteps: number;
  onActivateStep?: (id: number) => void;
  theme?: 'light' | 'dark';
}

export default function RoadmapCard({ step, index, totalSteps, onActivateStep, theme = 'dark' }: RoadmapCardProps) {
  // Styles based on lesson status
  const isCompleted = step.status === 'completed';
  const isActive = step.status === 'active';
  const isLocked = step.status === 'locked';

  return (
    <div 
      id={`roadmap-card-${step.id}`}
      className={`relative pl-8 md:pl-12 pb-12 last:pb-0 group transition-all duration-300`}
    >
      {/* Visual connection timeline vertical bar */}
      {index < totalSteps - 1 && (
        <span 
          className={`absolute left-[15px] md:left-[23px] top-8 bottom-0 w-[2px] transition-colors duration-500
            ${isCompleted ? 'bg-blue-500' : theme === 'dark' ? 'bg-slate-800/60' : 'bg-slate-200'}
          `} 
        />
      )}

      {/* Progress bullet indicator */}
      <div 
        onClick={() => onActivateStep?.(step.id)}
        className={`absolute left-0 md:left-2 top-0.5 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer border z-10
          ${isCompleted 
            ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-500/25' 
            : isActive 
              ? 'bg-cyan-550/20 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.3)] animate-pulse' 
              : theme === 'dark'
                ? 'bg-slate-900 border-slate-800/60 text-slate-600'
                : 'bg-slate-100 border-slate-200 text-slate-400 shadow-sm'
          }
        `}
      >
        {isCompleted ? (
          <Lucide.Check className="w-4 h-4 text-white font-bold" />
        ) : isActive ? (
          <Lucide.Sparkles className="w-4 h-4 text-cyan-550" />
        ) : (
          <Lucide.Lock className="w-3.5 h-3.5 text-slate-500" />
        )}
      </div>

      {/* Content wrapper */}
      <div 
        className={`glass-card p-6 rounded-2xl border transition-all duration-300 ${
          theme === 'dark' ? 'border-slate-800/60' : 'border-slate-200 shadow-sm'
        } ${
          isActive 
            ? theme === 'dark'
              ? 'border-blue-500/30 bg-blue-950/10 shadow-xl shadow-blue-500/5 ring-1 ring-blue-500/20' 
              : 'border-blue-500/40 bg-blue-50/20 shadow-xl shadow-blue-500/5 ring-1 ring-blue-500/20'
            : theme === 'dark'
              ? 'hover:border-slate-700'
              : 'hover:border-slate-300 hover:bg-white'
        }`}
      >
        {/* Card Header row */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-3">
            <span className={`text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider
              ${isCompleted 
                ? 'bg-blue-500/10 text-blue-400 border border-blue-400/20' 
                : isActive 
                  ? 'bg-cyan-400/10 text-cyan-550 border border-cyan-400/30' 
                  : theme === 'dark'
                    ? 'bg-white/5 text-slate-500'
                    : 'bg-slate-100 text-slate-500 border border-slate-200'
              }
            `}>
              {step.duration}
            </span>
            <span className="text-xs text-slate-500 font-mono">
              STAGE 0{step.id}
            </span>
          </div>

          {/* Quick interactive control to complete or unlock */}
          <button
            onClick={() => onActivateStep?.(step.id)}
            className={`text-xs px-3 py-1 rounded-lg font-semibold transition-all duration-300 cursor-pointer ${
              isCompleted 
                ? theme === 'dark'
                  ? 'bg-[#0f172a] border border-slate-800/60 text-blue-300 hover:bg-slate-900' 
                  : 'bg-slate-100 border border-slate-200 text-blue-600 hover:bg-slate-200/50'
                : isActive 
                  ? 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-[1.01]' 
                  : theme === 'dark'
                    ? 'bg-[#0f172a] border border-slate-800 text-slate-400 hover:bg-slate-900'
                    : 'bg-slate-100 border border-slate-200 text-slate-500 hover:bg-slate-200/50'
            }`}
          >
            {isCompleted ? 'Completed ✓ (Revisit)' : isActive ? 'Active Now' : 'Click to Unlock'}
          </button>
        </div>

        {/* Title */}
        <h4 className={`text-lg font-display font-bold tracking-tight mb-1 group-hover:text-blue-500 transition-colors ${
          theme === 'dark' ? 'text-white' : 'text-slate-850'
        }`}>
          {step.title}
        </h4>
        
        {/* Objective secondary subhead */}
        <p className="font-mono text-xs text-blue-500 font-semibold uppercase tracking-wider mb-3">
          🎯 Objective: {step.objective}
        </p>

        {/* Description body */}
        <p className={`text-xs leading-relaxed mb-6 transition-colors ${
          theme === 'dark' ? 'text-slate-400' : 'text-slate-605'
        }`}>
          {step.description}
        </p>

        {/* Tags metadata bottom tray */}
        <div className={`flex flex-wrap items-center gap-2 border-t pt-4 transition-colors ${
          theme === 'dark' ? 'border-slate-800/60' : 'border-slate-155'
        }`}>
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mr-1">
            EXPORTS:
          </span>
          {step.tags.map((tag) => (
            <span 
              key={tag}
              className={`text-[10px] font-mono px-2 py-0.5 rounded transition-all cursor-default border ${
                theme === 'dark'
                  ? 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800/60'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
