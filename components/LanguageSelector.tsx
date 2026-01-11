
import React from 'react';
import { Language } from '../types';

interface Props {
  onSelect: (lang: Language) => void;
}

const LanguageSelector: React.FC<Props> = ({ onSelect }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <div className="max-w-md w-full glass-panel rounded-3xl p-8 text-center shadow-2xl">
        <div className="w-20 h-20 bg-emerald-500 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/20">
          <i className="fas fa-lock text-3xl text-white"></i>
        </div>
        
        <h1 className="text-3xl font-bold mb-2">StudyLock</h1>
        <p className="text-slate-400 mb-10">Select your preferred language to continue</p>
        
        <div className="space-y-4">
          <button
            onClick={() => onSelect(Language.HINDI)}
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 transition-all rounded-xl font-semibold text-lg flex items-center justify-center gap-3 shadow-lg shadow-emerald-900/40"
          >
            हिंदी
            <i className="fas fa-arrow-right text-sm"></i>
          </button>
          
          <button
            onClick={() => onSelect(Language.ENGLISH)}
            className="w-full py-4 bg-slate-800 hover:bg-slate-700 transition-all rounded-xl font-semibold text-lg border border-slate-700 flex items-center justify-center gap-3"
          >
            English
            <i className="fas fa-arrow-right text-sm"></i>
          </button>
        </div>
        
        <p className="mt-8 text-xs text-slate-500 uppercase tracking-widest font-medium">
          Focus is the key to mastery
        </p>
      </div>
    </div>
  );
};

export default LanguageSelector;
