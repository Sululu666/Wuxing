import React from 'react';
import { FiveElement } from '../types';
import { ELEMENT_COLORS, ELEMENTS, ELEMENT_CN } from '../constants';

interface ElementSelectorProps {
  selectedElement: FiveElement | null;
  onSelect: (el: FiveElement | null) => void;
}

export const ElementSelector: React.FC<ElementSelectorProps> = ({ selectedElement, onSelect }) => {
  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto my-6 p-6 bg-slate-900/50 rounded-3xl border border-slate-800">
      <h3 className="text-lg font-medium text-slate-200 mb-4">五行能量模拟器</h3>
      <div className="flex flex-wrap justify-center gap-4">
        {ELEMENTS.map((el) => {
            const isSelected = selectedElement === el;
            const baseClass = ELEMENT_COLORS[el];
            
            return (
                <button
                    key={el}
                    onClick={() => onSelect(isSelected ? null : el)}
                    className={`
                        relative px-6 py-3 rounded-xl font-bold transition-all duration-300 transform font-serif
                        ${isSelected ? `scale-110 ring-4 ring-white/20 ${baseClass} text-white` : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}
                    `}
                >
                    {isSelected && (
                        <span className="absolute -top-2 -right-2 flex h-4 w-4">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-4 w-4 bg-white/50"></span>
                        </span>
                    )}
                    {ELEMENT_CN[el]}
                </button>
            )
        })}
      </div>
      <p className="mt-4 text-xs text-slate-500 text-center max-w-lg">
        点击上方五行元素，模拟将其“注入”命局。
        <br/>
        观察它如何生助喜用神，或克制忌神，从而判断该五行是否为“喜用”。
      </p>
    </div>
  );
};
