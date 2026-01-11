
import React, { useState, useRef, useEffect } from 'react';
import { Message, Language } from '../types';
import { getStudyAdvice } from '../services/geminiService';

interface Props {
  language: Language;
}

const StudyAssistant: React.FC<Props> = ({ language }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: language === Language.HINDI ? 'नमस्ते! मैं आपका स्टडीलॉक सहायक हूँ। मैं आपकी पढ़ाई में कैसे मदद कर सकता हूँ?' : 'Hello! I am your StudyLock Assistant. How can I help you focus today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const responseText = await getStudyAdvice([...messages, userMsg]);
    setMessages(prev => [...prev, { role: 'model', text: responseText || "I'm sorry, I couldn't process that." }]);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-200px)] flex flex-col glass-panel rounded-3xl overflow-hidden shadow-2xl relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-3xl pointer-events-none rounded-full"></div>
      
      <div className="p-6 border-b border-slate-800 bg-slate-800/20 flex items-center gap-4">
        <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20">
          <i className="fas fa-robot text-white text-xl"></i>
        </div>
        <div>
          <h3 className="font-bold text-lg">AI Study Assistant</h3>
          <p className="text-xs text-emerald-400 font-medium flex items-center gap-1">
             <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
             Online and ready to help
          </p>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 scroll-smooth">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] px-5 py-3 rounded-2xl text-sm leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-emerald-600 text-white rounded-tr-none shadow-lg shadow-emerald-900/20' 
                : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-tl-none'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-800 border border-slate-700 px-5 py-3 rounded-2xl rounded-tl-none flex gap-1">
              <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-100"></span>
              <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-200"></span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-slate-800/40 border-t border-slate-800">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={language === Language.HINDI ? "प्रश्न पूछें या अध्ययन योजना मांगें..." : "Ask a question or request a study plan..."}
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all placeholder:text-slate-600"
          />
          <button 
            onClick={handleSend}
            disabled={loading}
            className="bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 text-white w-12 h-12 rounded-xl flex items-center justify-center transition-all shadow-lg shadow-emerald-900/20"
          >
            <i className={`fas ${loading ? 'fa-spinner fa-spin' : 'fa-paper-plane'}`}></i>
          </button>
        </div>
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {['Give me a 2-hour study plan', 'How to stay focused?', 'Hindi study tips'].map(tip => (
             <button 
              key={tip}
              onClick={() => setInput(tip)}
              className="whitespace-nowrap px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-xs text-slate-400 hover:text-emerald-400 hover:border-emerald-500/50 transition-all"
             >
               {tip}
             </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudyAssistant;
