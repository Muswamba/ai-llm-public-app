import React from 'react';
import * as Lucide from 'lucide-react';
import { FeatureItem } from '../types';

interface FeatureCardProps {
  key?: string;
  item: FeatureItem;
  onCtaClick?: () => void;
  theme?: 'light' | 'dark';
}

export default function FeatureCard({ item, onCtaClick, theme = 'dark' }: FeatureCardProps) {
  // Map string icon names to Lucide elements safely
  const getIcon = (name: string) => {
    switch (name) {
      case 'Cpu': return <Lucide.Cpu className="w-6 h-6 text-blue-500" />;
      case 'Terminal': return <Lucide.Terminal className="w-6 h-6 text-blue-500 animate-pulse" />;
      case 'Server': return <Lucide.Server className="w-6 h-6 text-blue-500" />;
      case 'Database': return <Lucide.Database className="w-6 h-6 text-cyan-500" />;
      case 'Workflow': return <Lucide.Activity className="w-6 h-6 text-purple-500" />;
      case 'Sliders': return <Lucide.Sliders className="w-6 h-6 text-amber-500" />;
      default: return <Lucide.BookOpen className="w-6 h-6 text-blue-500" />;
    }
  };

  return (
    <div 
      id={`feature-card-${item.id}`}
      className="glass-card glass-card-hover p-6 rounded-2xl flex flex-col justify-between h-full relative overflow-hidden group border transition-all duration-200"
      style={{
        borderColor: theme === 'dark' ? 'rgba(30, 41, 59, 0.7)' : 'rgba(226, 232, 240, 0.8)'
      }}
    >
      {/* Absolute top-right background ambient glow */}
      <div className={`absolute -top-12 -right-12 w-24 h-24 rounded-full blur-xl group-hover:bg-blue-500/10 transition-all duration-300 ${
        theme === 'dark' ? 'bg-blue-500/5' : 'bg-blue-500/10'
      }`} />
      
      <div>
        {/* Title row with icon bubble */}
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-3 rounded-xl border transition-all ${
            theme === 'dark' 
              ? 'bg-slate-900 border-slate-800/60 group-hover:border-blue-500/30' 
              : 'bg-slate-100 border-slate-200/80 group-hover:border-blue-500/30'
          }`}>
            {getIcon(item.iconName)}
          </div>
          <span className={`text-[10px] font-mono tracking-wider uppercase border px-2 py-0.5 rounded transition-all ${
            theme === 'dark'
              ? 'text-slate-400 bg-slate-900 border-slate-800/60'
              : 'text-slate-600 bg-slate-100 border-slate-200'
          }`}>
            {item.title}
          </span>
        </div>

        {/* Dynamic header / tagline */}
        <h3 className={`text-base font-display font-semibold tracking-tight mb-2 group-hover:text-blue-500 transition-colors ${
          theme === 'dark' ? 'text-white' : 'text-slate-850'
        }`}>
          {item.tagline}
        </h3>

        <p className={`text-xs leading-relaxed mb-6 transition-colors ${
          theme === 'dark' ? 'text-slate-400' : 'text-slate-605'
        }`}>
          {item.details}
        </p>
      </div>

      <div className={`mt-auto border-t pt-4 transition-colors ${
        theme === 'dark' ? 'border-slate-800/60' : 'border-slate-155'
      }`}>
        {/* Core learning output list description */}
        <div className="font-mono text-[10px] text-slate-500 mb-4 flex items-start gap-1.5">
          <span className="text-blue-550 font-bold shrink-0">⚡ LEARNING_OUTCOME:</span>
          <span className={`italic transition-colors ${
            theme === 'dark' ? 'text-slate-300' : 'text-slate-605'
          }`}>{item.learningOutcome}</span>
        </div>

        <button
          onClick={onCtaClick}
          className={`w-full py-2 px-4 rounded-lg text-xs font-semibold transition-all duration-300 flex items-center justify-center gap-2 group-hover:scale-[1.01] cursor-pointer ${
            theme === 'dark'
              ? 'bg-[#0e172a] border border-slate-800/60 text-white hover:bg-blue-600 hover:border-blue-500'
              : 'bg-slate-100 border border-slate-200 text-slate-800 hover:bg-blue-600 hover:text-white hover:border-blue-500'
          }`}
        >
          <span>Try Lesson Preset</span>
          <Lucide.ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
        </button>
      </div>
    </div>
  );
}
