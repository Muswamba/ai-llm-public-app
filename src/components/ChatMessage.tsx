import React, { useState } from 'react';
import { Message } from '../types';
import * as Lucide from 'lucide-react';

interface ChatMessageProps {
  key?: string;
  message: Message;
  theme?: 'light' | 'dark';
}

export default function ChatMessage({ message, theme = 'dark' }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Safe custom renderer to format simple markdown elements (code blocks, lists, headers)
  const formatContent = (content: string) => {
    const lines = content.split('\n');
    let inCodeBlock = false;
    let codeBuffer: string[] = [];
    const elements: React.ReactNode[] = [];

    lines.forEach((line, index) => {
      // Toggle Code Blocks
      if (line.trim().startsWith('```')) {
        if (inCodeBlock) {
          // Close Code Block
          const codeText = codeBuffer.join('\n');
          const currentCode = codeText; // capture copy context
          elements.push(
            <div key={`code-${index}`} className={`my-4 rounded-xl overflow-hidden border font-mono text-xs ${
              theme === 'dark' ? 'border-slate-800/60 bg-black/50' : 'border-slate-200 bg-slate-50/70'
            }`}>
              <div className={`px-4 py-1.5 flex items-center justify-between border-b text-[10px] ${
                theme === 'dark' ? 'bg-slate-900 border-slate-800/60 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-555'
              }`}>
                <span>TYPESCRIPT / BASH CONFIG</span>
                <button 
                  onClick={() => handleCopy(currentCode)} 
                  className={`flex items-center gap-1 transition-colors cursor-pointer font-semibold ${
                    theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {copied ? (
                    <>
                      <Lucide.Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-500 font-medium">Copied</span>
                    </>
                  ) : (
                    <>
                      <Lucide.Copy className="w-3.5 h-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>
              <pre className={`p-4 overflow-x-auto leading-relaxed font-mono whitespace-pre select-all text-[11px] ${
                theme === 'dark' ? 'text-cyan-300' : 'text-indigo-805'
              }`}>
                <code>{codeText}</code>
              </pre>
            </div>
          );
          codeBuffer = [];
          inCodeBlock = false;
        } else {
          // Start Code Block
          inCodeBlock = true;
        }
        return;
      }

      if (inCodeBlock) {
        codeBuffer.push(line);
        return;
      }

      // Headers (e.g. ### Title or #### Title)
      if (line.trim().startsWith('### ')) {
        elements.push(
          <h4 key={`h3-${index}`} className={`font-display font-semibold text-base mt-4 mb-2 first:mt-0 tracking-tight transition-colors ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            {line.replace('### ', '')}
          </h4>
        );
        return;
      }
      if (line.trim().startsWith('#### ')) {
        elements.push(
          <h5 key={`h4-${index}`} className={`font-display font-medium text-sm mt-3 mb-1.5 transition-colors ${
            theme === 'dark' ? 'text-cyan-305' : 'text-indigo-600'
          }`}>
            {line.replace('#### ', '')}
          </h5>
        );
        return;
      }

      // Bullets (e.g. - Item or * Item)
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        const rawText = line.trim().substring(2);
        // Highlight bold nested text like **Example:** text
        const parts = rawText.split('**');
        elements.push(
          <li key={`li-${index}`} className={`text-sm ml-4 list-disc mb-1 leading-relaxed transition-colors ${
            theme === 'dark' ? 'text-slate-300' : 'text-slate-655'
          }`}>
            {parts.map((p, pIndex) => 
              pIndex % 2 === 1 ? (
                <strong key={`bold-${pIndex}`} className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{p}</strong>
              ) : p
            )}
          </li>
        );
        return;
      }

      // Table formatting helper (e.g. | column | col |)
      if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
        // Skip header delimiters like | :--- | :--- |
        if (line.includes('---')) return;
        
        const cols = line.split('|').map(s => s.trim()).filter(s => s !== '');
        elements.push(
          <div key={`tr-${index}`} className={`grid grid-cols-3 gap-2 py-2 px-3 odd:bg-white/2 rounded text-xs font-mono border-b last:border-0 hover:bg-white/5 transition-colors ${
            theme === 'dark' ? 'text-slate-300 border-white/5' : 'text-slate-655 border-slate-100'
          }`}>
            {cols.map((col, colIndex) => (
              <span key={`col-${colIndex}`} className={colIndex === 0 ? (theme === 'dark' ? "font-semibold text-white" : "font-semibold text-slate-800") : ""}>
                {col}
              </span>
            ))}
          </div>
        );
        return;
      }

      // Plain paragraph text line
      if (line.trim() !== '') {
        const parts = line.split('**');
        const formattedLine = parts.map((part, pIndex) => {
          if (pIndex % 2 === 1) {
            // Check if there is nested inline code e.g. `code`
            return <strong key={pIndex} className="text-blue-550 font-semibold">{part}</strong>;
          }
          // Process backtick highlights like `code`
          const codeParts = part.split('`');
          return codeParts.map((cp, cpIdx) => {
            if (cpIdx % 2 === 1) {
              return (
                <code key={`inline-code-${cpIdx}`} className={`px-1 py-0.5 rounded text-[11px] font-mono border ${
                  theme === 'dark' ? 'bg-white/10 text-indigo-200 border-white/5' : 'bg-slate-100 text-indigo-700 border-slate-200'
                }`}>{cp}</code>
              );
            }
            return cp;
          });
        });

        elements.push(
          <p key={`p-${index}`} className={`text-sm leading-relaxed mb-3 transition-colors ${
            theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
          }`}>
            {formattedLine}
          </p>
        );
      } else {
        // Empty lines act as spacing
        elements.push(<div key={`space-${index}`} className="h-2" />);
      }
    });

    return elements;
  };

  return (
    <div 
      id={`chat-msg-${message.id}`}
      className={`flex gap-4 w-full group animate-fadeIn transition-all py-5 border-b last:border-0 ${
        theme === 'dark' ? 'border-slate-800/50' : 'border-slate-150'
      } ${
        isUser ? 'justify-end' : theme === 'dark' ? 'justify-start bg-slate-900/10 px-4 rounded-xl' : 'justify-start bg-slate-50 px-4 rounded-xl border border-slate-100'
      }`}
    >
      {/* Icon Avatar block */}
      {!isUser && (
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 self-start mt-1 shadow-md ${
          theme === 'dark' ? 'bg-blue-500/10 border border-blue-400/30' : 'bg-blue-50 border border-blue-200 shadow-sm'
        }`}>
          <Lucide.Bot className="w-4 h-4 text-blue-500" />
        </div>
      )}

      {/* Message content panel */}
      <div className={`max-w-3xl flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
        
        {/* Username and status line */}
        <div className="flex items-center gap-2 mb-1.5 text-[11px] font-mono text-slate-500">
          <span>{isUser ? 'YOU (Student)' : 'SMSOFTWARE AI'}</span>
          <span className="text-slate-400">•</span>
          <span>{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          {!isUser && (
            <>
              <span className="text-slate-400">•</span>
              <span className={`uppercase tracking-widest text-[9px] px-1.5 py-0.5 rounded border font-semibold ${
                theme === 'dark' ? 'bg-blue-900/15 border-blue-400/20 text-blue-400' : 'bg-blue-50 border-blue-200 text-blue-650'
              }`}>
                smsoftware-ai-v0.1
              </span>
            </>
          )}
        </div>

        {/* Message bubble */}
        <div className={`rounded-xl text-left ${
          isUser 
            ? 'bg-blue-600 border border-blue-500 text-white px-4 py-3 shadow-lg shadow-blue-500/20' 
            : theme === 'dark' ? 'text-slate-300 w-full' : 'text-slate-800 w-full'
        }`}>
          {isUser ? (
            <p className="text-xs font-semibold leading-relaxed whitespace-pre-wrap">{message.content}</p>
          ) : (
            <div className="space-y-1">
              {formatContent(message.content)}
            </div>
          )}
        </div>

        {/* Optional token/latency metadata diagnostics block */}
        {!isUser && (
          <div className="flex items-center gap-4 mt-3 font-mono text-[9px] text-slate-500 group-hover:text-slate-400 transition-colors">
            <span className="flex items-center gap-1">
              <Lucide.Cpu className="w-2.5 h-2.5" /> Dev-Latency: <strong className={theme === 'dark' ? 'text-slate-300 font-semibold' : 'text-slate-650 font-semibold'}>142ms</strong>
            </span>
            <span className="flex items-center gap-1">
              <Lucide.Hash className="w-2.5 h-2.5" /> Tokens: <strong className={theme === 'dark' ? 'text-slate-300 font-semibold' : 'text-slate-650 font-semibold'}>{message.tokens || 194}</strong>
            </span>
            <span className="flex items-center gap-1 cursor-pointer hover:text-blue-500" onClick={() => handleCopy(message.content)}>
              <Lucide.Copy className="w-2.5 h-2.5" /> Copy Raw Response
            </span>
          </div>
        )}
      </div>

      {isUser && (
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 self-start mt-1 border ${
          theme === 'dark' ? 'bg-slate-900 border-slate-800/60 text-blue-400' : 'bg-white border-slate-205 text-blue-500 shadow-sm'
        }`}>
          <Lucide.User className="w-4 h-4 text-blue-500" />
        </div>
      )}
    </div>
  );
}
