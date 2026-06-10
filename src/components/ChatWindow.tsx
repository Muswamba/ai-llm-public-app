import React, { useRef, useEffect } from 'react';
import * as Lucide from 'lucide-react';
import { Message, PlayMode } from '../types';
import ChatMessage from './ChatMessage';
import PromptCard from './PromptCard';
import { PROMPT_EXAMPLES } from '../data';

interface ChatWindowProps {
  messages: Message[];
  inputValue: string;
  onInputChange: (val: string) => void;
  onSendMessage: (customText?: string) => void;
  isLoading: boolean;
  activeMode: PlayMode;
  onSelectMode: (mode: PlayMode) => void;
  theme?: 'light' | 'dark';
}

export default function ChatWindow({
  messages,
  inputValue,
  onInputChange,
  onSendMessage,
  isLoading,
  activeMode,
  onSelectMode,
  theme = 'dark'
}: ChatWindowProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto scroll down on new messages or loading entry
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  return (
    <div id="ai-chat-window" className={`flex-1 flex flex-col glass-card rounded-2xl overflow-hidden h-[680px] lg:h-[calc(100vh-12.25rem)] min-h-[620px] relative border transition-colors duration-200 ${
      theme === 'dark' ? 'border-slate-800/60' : 'border-slate-200 shadow-sm'
    }`}>
      
      {/* Top Bar Status Strip */}
      <div className={`px-4 sm:px-6 py-3.5 border-b flex flex-wrap items-center justify-between gap-3 transition-colors duration-200 ${
        theme === 'dark' ? 'border-slate-800/60 bg-[#050a1f]/85' : 'border-slate-200 bg-white/95'
      }`}>
        {/* Model info indicators */}
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
          <div className="flex flex-col">
            <h3 className={`text-xs font-mono font-bold tracking-wide transition-colors ${
              theme === 'dark' ? 'text-white' : 'text-slate-850'
            }`}>
              Chat Session
            </h3>
            <span className="text-[10px] font-mono text-slate-500">
              smsoftware-ai-v0.1 / context window: 16k
            </span>
          </div>
        </div>

        {/* Current profile status badge controls */}
        <div className="flex items-center gap-3">
          <div className={`hidden sm:flex p-0.5 rounded-lg border items-center transition-colors ${
            theme === 'dark' ? 'bg-slate-950 border-slate-800/60' : 'bg-slate-100 border-slate-200'
          }`}>
            {(['Beginner', 'Developer', 'Product'] as PlayMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => onSelectMode(mode)}
                className={`px-2.5 py-1 text-[10px] uppercase font-mono rounded cursor-pointer transition-all duration-200
                  ${activeMode === mode 
                    ? 'bg-blue-600 font-bold text-white shadow shadow-blue-500/20' 
                    : theme === 'dark'
                      ? 'text-slate-400 hover:text-white'
                      : 'text-slate-500 hover:text-slate-800'
                  }
                `}
              >
                {mode}
              </button>
            ))}
          </div>

          <span className="text-[10px] font-mono bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2 py-0.5 rounded uppercase font-semibold">
            MOCK PREVIEW
          </span>
        </div>
      </div>

      {/* Messages Viewport */}
      <div 
        ref={scrollContainerRef}
        className={`flex-1 overflow-y-auto p-4 sm:p-6 space-y-2 scroll-smooth transition-colors ${
          theme === 'dark' ? 'bg-[#030816]/40' : 'bg-[#f8fafc]/45'
        }`}
      >
        {messages.length === 0 ? (
          /* Empty Chat Welcome Screen */
          <div className="h-full flex flex-col justify-center items-center text-center max-w-2xl mx-auto py-8">
            <div className="w-14 h-14 bg-gradient-to-tr from-blue-500/15 to-purple-500/20 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-blue-500/15 border border-blue-500/20">
              <Lucide.Sparkles className="w-7 h-7 text-blue-550" />
            </div>

            <h3 className={`text-xl font-display font-semibold tracking-tight mb-2 transition-colors ${
              theme === 'dark' ? 'text-white' : 'text-slate-850'
            }`}>
              Start a new AI chat
            </h3>
            <p className={`text-sm leading-relaxed mb-8 transition-colors ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-605'
            }`}>
              Type a prompt below or choose one of the preset examples. This is the clean UI layer you can later connect to a real model endpoint.
            </p>

            {/* Injected Prompt Examples Matrix */}
            <div className="w-full text-left space-y-3">
              <p className="text-[10px] font-mono text-slate-500 tracking-wider uppercase font-semibold text-center mb-4">
                STARTER PROMPTS
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" id="empty-chat-prompts">
                {PROMPT_EXAMPLES.map((ex) => (
                  <PromptCard 
                    key={ex.id} 
                    example={ex} 
                    onClick={(text) => onSendMessage(text)} 
                    theme={theme}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Rich Active Conversation history list */
          <div className="space-y-2">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} theme={theme} />
            ))}

            {/* Animated Smart Loading State Mock */}
            {isLoading && (
              <div className={`flex gap-4 w-full py-5 px-4 rounded-xl animate-pulse transition-colors ${
                theme === 'dark' ? 'bg-[#0f172a]/40' : 'bg-slate-100'
              }`}>
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 mt-1">
                  <Lucide.Loader2 className="w-4 h-4 text-blue-450 animate-spin" />
                </div>
                <div className="flex-1">
                  <span className="text-[10px] font-mono text-slate-500">
                    smsoftware-ai-v0.1 is computing prompt layers...
                  </span>
                  <div className="mt-2 space-y-2 max-w-md">
                    <div className={`h-2 rounded w-full ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-205'}`} />
                    <div className={`h-2 rounded w-5/6 ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-205'}`} />
                    <div className={`h-2 rounded w-2/3 ${theme === 'dark' ? 'bg-slate-800/65' : 'bg-slate-250/65'}`} />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Static quick helper keywords list above the input text field */}
      {messages.length > 0 && (
        <div className={`px-6 py-2 border-t overflow-x-auto whitespace-nowrap flex items-center gap-2 transition-colors duration-200 ${
          theme === 'dark' ? 'border-slate-800/60 bg-[#050a1f]/35' : 'border-slate-150 bg-slate-50'
        }`}>
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mr-1">
            QUICK RUNNERS:
          </span>
          {PROMPT_EXAMPLES.slice(0, 3).map((ex) => (
            <button
              key={ex.id}
              onClick={() => onSendMessage(ex.promptText)}
              className={`text-[10px] font-mono py-1 px-3 rounded-md transition-all cursor-pointer border ${
                theme === 'dark'
                  ? 'bg-[#0f172a] border-slate-800/60 hover:border-blue-400 text-slate-300 hover:text-white'
                  : 'bg-white border-slate-205 hover:border-blue-550 text-slate-605 hover:text-blue-600 hover:shadow-xs'
              }`}
            >
              {ex.label}
            </button>
          ))}
        </div>
      )}

      {/* Input Message Form Tray */}
      <div className={`p-4 border-t transition-colors duration-200 ${
        theme === 'dark' ? 'border-slate-800/60 bg-[#050a1f]/65' : 'border-slate-150 bg-white'
      }`}>
        <div className="relative flex items-end">
          <textarea
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about LLM UI, prompt design, RAG, model settings..."
            disabled={isLoading}
            className={`w-full border rounded-xl pr-16 pl-4 py-3.5 text-sm focus:outline-none focus:ring-1 resize-none h-14 focus:h-20 max-h-32 transition-all scrollbar-hide font-sans ${
              theme === 'dark'
                ? 'bg-slate-900/80 hover:bg-slate-900/95 focus:bg-slate-900 border-slate-800/60 focus:border-blue-500 text-slate-100 placeholder-slate-500 focus:ring-blue-500'
                : 'bg-slate-50 hover:bg-slate-100/50 focus:bg-white border-slate-205 focus:border-blue-400 text-slate-800 placeholder-slate-400 focus:ring-blue-500'
            }`}
            rows={1}
            id="playground-textarea"
          />
          <div className="absolute right-2 bottom-2 flex items-center gap-1.5 font-mono">
            {/* Input Character Length Diagnostic Counter */}
            <span className="text-[10px] text-slate-500 mr-2 select-none">
              {Math.ceil(inputValue.length / 4)} TOKENS
            </span>

            <button
              onClick={() => onSendMessage()}
              disabled={isLoading || !inputValue.trim()}
              className={`p-2.5 rounded-lg flex items-center justify-center transition-all cursor-pointer
                ${isLoading || !inputValue.trim()
                  ? 'bg-slate-850 text-slate-500 cursor-not-allowed border border-slate-755'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25 hover:scale-105'
                }
              `}
              id="send-message-btn"
              title="Send Prompt Query"
            >
              <Lucide.Send className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {/* Footer legalities note */}
        <div className="flex items-center justify-between gap-3 mt-3 px-1 font-mono text-[9px] text-slate-500">
          <span>Enter sends. Shift+Enter adds a new line.</span>
          <span>Security status: <strong className="text-emerald-505 font-bold">Sandboxed Local Client</strong></span>
        </div>
      </div>

    </div>
  );
}
