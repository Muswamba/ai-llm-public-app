import React from 'react';
import { PromptExample } from '../types';
import * as Lucide from 'lucide-react';

interface PromptCardProps {
  key?: string;
  example: PromptExample;
  onClick: (text: string) => void;
  theme?: 'light' | 'dark';
}

export default function PromptCard({ example, onClick, theme = 'dark' }: PromptCardProps) {
  return (
    <button
      id={`prompt-card-${example.id}`}
      onClick={() => onClick(example.promptText)}
      className={`glass-card text-left p-4 rounded-xl transition-all duration-200 group flex flex-col justify-between h-full hover:-translate-y-0.5 border ${
        theme === 'dark'
          ? 'border-slate-800/60 hover:border-blue-500/40 hover:bg-[#050a1f]/40'
          : 'border-slate-200 hover:border-blue-500/30 hover:bg-slate-100/50'
      }`}
    >
      <div className="flex items-center justify-between w-full mb-3">
        <span className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded border font-semibold ${
          theme === 'dark'
            ? 'bg-blue-500/10 text-blue-300 border-blue-500/20'
            : 'bg-blue-50/80 text-blue-600 border-blue-200'
        }`}>
          {example.category}
        </span>
        <Lucide.ArrowUpRight className="w-3.5 h-3.5 text-slate-505 group-hover:text-blue-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
      </div>
      
      <p className={`text-[11px] font-sans line-clamp-2 leading-relaxed font-semibold transition-colors ${
        theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
      }`}>
        "{example.promptText}"
      </p>
    </button>
  );
}
