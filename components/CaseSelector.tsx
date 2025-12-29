import React from 'react';
import { CASES } from '../cases';
import { BaZiState } from '../types';

interface CaseSelectorProps {
  onSelectCase: (bazi: BaZiState) => void;
}

export const CaseSelector: React.FC<CaseSelectorProps> = ({ onSelectCase }) => {
  return (
    <div className="w-full h-full bg-slate-800/50 rounded-xl border border-slate-700 p-4 flex flex-col">
      <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-bold uppercase text-slate-500 tracking-widest">精选案例</h2>
          <span className="text-[10px] text-slate-600 bg-slate-900 px-2 py-1 rounded-full">{CASES.length}</span>
      </div>
      
      <div className="flex-grow overflow-y-auto space-y-3 pr-2 custom-scrollbar max-h-[300px] lg:max-h-[unset]">
        {CASES.map((item, index) => (
          <button
            key={index}
            onClick={() => onSelectCase(item.bazi)}
            className="w-full text-left bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-indigo-500/50 rounded-lg p-3 transition-all group"
          >
            <div className="flex justify-between items-center mb-1">
                 <span className="font-bold text-slate-200 text-sm group-hover:text-white">{item.name}</span>
                 <span className="text-[10px] text-indigo-400 font-mono bg-indigo-950/50 px-1.5 py-0.5 rounded">
                    {item.note.split(':')[1] || item.note}
                </span>
            </div>
          </button>
        ))}
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(30, 41, 59, 0.5); 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(71, 85, 105, 0.8); 
            border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(99, 102, 241, 0.5); 
        }
      `}</style>
    </div>
  );
};
