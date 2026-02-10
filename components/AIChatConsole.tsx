
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { botAI } from '../services/geminiService';
import { Message } from '../types';

const AIChatConsole: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '1', 
      sender: 'Tlashany Bot', 
      text: 'Greetings! I am the Tlashany AI Console. Type !ai followed by your prompt to test my reasoning capabilities.', 
      timestamp: new Date(), 
      isBot: true 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'Developer',
      text: input,
      timestamp: new Date(),
      isBot: false,
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const responseText = await botAI.generateResponse(input);
    
    const botMsg: Message = {
      id: (Date.now() + 1).toString(),
      sender: 'Tlashany Bot',
      text: responseText,
      timestamp: new Date(),
      isBot: true,
    };

    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-160px)] max-w-4xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
      <div className="p-4 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
            <Bot size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-white">Gemini AI Test Environment</h3>
            <p className="text-xs text-slate-500">Connected to gemini-3-flash-preview</p>
          </div>
        </div>
        <div className="flex gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs text-slate-400">Ready</span>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-700"
      >
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-4 ${msg.isBot ? '' : 'flex-row-reverse'}`}>
            <div className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center ${msg.isBot ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-700 text-slate-300'}`}>
              {msg.isBot ? <Bot size={18} /> : <User size={18} />}
            </div>
            <div className={`max-w-[80%] space-y-1 ${msg.isBot ? 'items-start' : 'items-end'}`}>
              <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.isBot 
                  ? 'bg-slate-800 text-slate-100 rounded-tl-none' 
                  : 'bg-emerald-600 text-white rounded-tr-none'
              }`}>
                {msg.text}
              </div>
              <p className="text-[10px] text-slate-500 px-1">
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-4">
            <div className="w-8 h-8 shrink-0 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <Bot size={18} />
            </div>
            <div className="bg-slate-800 px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-2">
              <Loader2 className="w-4 h-4 text-emerald-500 animate-spin" />
              <span className="text-sm text-slate-400">Thinking...</span>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSend} className="p-4 border-t border-slate-800 bg-slate-900/50">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type !ai followed by your request..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 pr-12 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
          />
          <button 
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default AIChatConsole;
