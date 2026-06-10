import React, { useEffect, useRef } from 'react';
import * as Lucide from 'lucide-react';
import { Message } from '../types';
import ChatMessage from './ChatMessage';

interface ChatWindowProps {
  messages: Message[];
  inputValue: string;
  onInputChange: (val: string) => void;
  onSendMessage: (customText?: string) => void;
  isLoading: boolean;
  theme?: 'light' | 'dark';
}

export default function ChatWindow({
  messages,
  inputValue,
  onInputChange,
  onSendMessage,
  isLoading,
  theme = 'dark'
}: ChatWindowProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the newest response whenever the conversation changes.
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
    <div id="ai-chat-window" className={`flex h-full min-h-0 flex-col rounded-2xl overflow-hidden border transition-colors duration-200 ${
      theme === 'dark' ? 'bg-[#030816]/70 border-slate-800/60' : 'bg-white border-slate-200 shadow-sm'
    }`}>
      {/* Clean response area: no banners, prompt cards, or status widgets. */}
      <div
        ref={scrollContainerRef}
        className={`min-h-0 flex-1 overflow-y-auto p-4 sm:p-6 scroll-smooth ${
          theme === 'dark' ? 'bg-[#030816]/40' : 'bg-slate-50/60'
        }`}
      >
        <div className="space-y-2">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} theme={theme} />
          ))}

          {/* Loading appears only after a prompt is sent and before the backend answers. */}
          {isLoading && (
            <div className={`flex gap-4 w-full py-5 px-4 rounded-xl animate-pulse transition-colors ${
              theme === 'dark' ? 'bg-[#0f172a]/40' : 'bg-slate-100'
            }`}>
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 mt-1">
                <Lucide.Loader2 className="w-4 h-4 text-blue-450 animate-spin" />
              </div>
              <div className="flex-1">
                <span className="text-[10px] font-mono text-slate-500">
                  Waiting for backend response...
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
      </div>

      {/* Input tray stays visible so users always know where to send the next prompt. */}
      <div className={`shrink-0 p-4 border-t transition-colors duration-200 ${
        theme === 'dark' ? 'border-slate-800/60 bg-[#050a1f]/80' : 'border-slate-150 bg-white'
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
            id="chat-textarea"
          />

          <div className="absolute right-2 bottom-2 flex items-center gap-1.5 font-mono">
            {/* Simple token estimate gives learners a feel for prompt size. */}
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
              title="Send prompt"
            >
              <Lucide.Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 mt-3 px-1 font-mono text-[9px] text-slate-500">
          <span>Enter sends. Shift+Enter adds a new line.</span>
          <span>Backend route: <strong className="text-emerald-505 font-bold">/api/chat</strong></span>
        </div>
      </div>
    </div>
  );
}
