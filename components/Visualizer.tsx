import React, { useMemo, useState } from 'react';
import { BaZiState, FiveElement, DetailedAnalysis, CharEnergyDetail } from '../types';
import { ELEMENT_COLORS, STEMS, ELEMENT_CN, ELEMENT_TEXT_COLORS } from '../constants';
import { calculateDetailedEnergy, getSimulationModifiers, normalizeOpacity } from '../baziLogic';

interface VisualizerProps {
  bazi: BaZiState;
  simulatedElement: FiveElement | null;
}

// Reusable Detail Modal/Panel
const DetailPanel: React.FC<{ detail: CharEnergyDetail; onClose: () => void }> = ({ detail, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose}>
      <div 
        className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full shadow-2xl p-6 relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-white"
        >
          ✕
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-3xl font-serif text-white shadow-lg ${ELEMENT_COLORS[detail.element]}`}>
            {detail.char}
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{detail.position}</h3>
            <p className="text-slate-400 text-sm">五行: {ELEMENT_CN[detail.element]}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-800/50 p-4 rounded-xl">
            <div className="flex justify-between items-center mb-2">
              <span className="text-slate-400 text-xs uppercase tracking-widest">能量状态</span>
              <span className="text-indigo-400 font-bold">{detail.seasonStatus}</span>
            </div>
            <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
               <div 
                 className={`h-full ${ELEMENT_COLORS[detail.element]}`} 
                 style={{ width: `${Math.min(100, detail.baseScore)}%` }}
               ></div>
            </div>
            <div className="text-right text-xs text-slate-500 mt-1">分数: {Math.round(detail.baseScore)}</div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white mb-2">分析详情</h4>
            <ul className="space-y-2">
              {detail.factors.map((factor, idx) => (
                <li key={idx} className="text-sm text-slate-300 flex items-start gap-2">
                  <span className="text-indigo-500 mt-1">▸</span>
                  {factor}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 text-center">
            <p className="text-xs text-slate-500">点击外部关闭</p>
        </div>
      </div>
    </div>
  );
};

const CharBox: React.FC<{
  detail: CharEnergyDetail;
  modifier: number;
  onClick: () => void;
}> = ({ detail, modifier, onClick }) => {
  
  const opacity = normalizeOpacity(detail.baseScore, modifier);
  const bgClass = ELEMENT_COLORS[detail.element];

  return (
    <div className="flex flex-col items-center justify-start relative group cursor-pointer h-40" onClick={onClick}>
        <div 
            className={`w-20 h-20 md:w-24 md:h-24 rounded-xl flex items-center justify-center text-4xl font-serif text-white shadow-lg transition-all duration-700 ease-in-out border-2 border-slate-700/50 ${bgClass} group-hover:border-white/40 group-hover:scale-105`}
            style={{ 
                opacity: opacity,
                transform: `scale(${0.8 + (opacity * 0.3)})`, 
                filter: `brightness(${0.5 + opacity})`
            }}
        >
            {detail.char}
            <span className="absolute top-1 right-1 text-[10px] opacity-70 font-sans tracking-tighter uppercase">{ELEMENT_CN[detail.element]}</span>
        </div>
        
        {/* Hidden Stems (Cang Gan) Display - Vertical and Larger */}
        {detail.hiddenStems && detail.hiddenStems.length > 0 && (
            <div className="flex flex-col gap-0.5 mt-2 items-center">
                {detail.hiddenStems.map((stemKey) => {
                    const stemConfig = STEMS[stemKey];
                    return (
                         <span key={stemKey} className={`text-sm font-serif font-bold ${ELEMENT_TEXT_COLORS[stemConfig.element]}`}>
                            {stemConfig.char}
                         </span>
                    );
                })}
            </div>
        )}

        {/* Position Label - Moved slightly to avoid overlap if stems are long, or keep as is */}
        {!detail.hiddenStems && (
           <div className="mt-2 text-xs text-slate-400 uppercase tracking-widest group-hover:text-indigo-400 transition-colors">
              {detail.position.split(' ')[0]}
           </div>
        )}
        
        {/* Hover Hint */}
        <div className="absolute -top-8 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 border border-slate-600">
           查看详情
        </div>
    </div>
  );
};

export const Visualizer: React.FC<VisualizerProps> = ({ bazi, simulatedElement }) => {
  const [selectedCharId, setSelectedCharId] = useState<string | null>(null);

  // 1. Calculate detailed energy state (Static)
  const energyDetails = useMemo(() => calculateDetailedEnergy(bazi), [bazi]);

  // 2. Get modifiers (Simulation)
  const modifiers = useMemo(() => getSimulationModifiers(simulatedElement), [simulatedElement]);

  const renderPillar = (label: string, pillarKey: 'year' | 'month' | 'day' | 'hour') => {
     const stemKey = `${pillarKey}-stem`;
     const branchKey = `${pillarKey}-branch`;
     const stemDetail = energyDetails[stemKey];
     const branchDetail = energyDetails[branchKey];

     return (
        <div className="flex flex-col gap-6 items-center p-4 bg-slate-800/50 rounded-2xl border border-slate-700 relative h-96 justify-start pt-8">
            <h3 className="absolute top-2 left-1/2 -translate-x-1/2 text-sm font-bold text-slate-300 uppercase tracking-widest">{label}</h3>
            
            <div className="mt-4">
              <CharBox 
                  detail={stemDetail} 
                  modifier={modifiers[stemDetail.element]} 
                  onClick={() => setSelectedCharId(stemKey)}
              />
            </div>
            
            <div className="-mt-8">
              <CharBox 
                  detail={branchDetail} 
                  modifier={modifiers[branchDetail.element]}
                  onClick={() => setSelectedCharId(branchKey)}
              />
            </div>
            
            {/* Visual connector line for pillar */}
            <div className="absolute top-12 bottom-12 w-0.5 bg-slate-700/30 -z-10"></div>
        </div>
     );
  };

  const selectedDetail = selectedCharId ? energyDetails[selectedCharId] : null;
  const simulatedElementCN = simulatedElement ? ELEMENT_CN[simulatedElement] : null;

  return (
    <div className="w-full max-w-4xl mx-auto my-8">
        <div className="flex flex-col items-center mb-6">
            <h2 className="text-xl font-light text-white mb-2">八字能量流转图</h2>
            <p className="text-sm text-slate-400">
                {simulatedElementCN 
                    ? `正在模拟注入 [${simulatedElementCN}] 能量... 观察八字强弱变化`
                    : "点击任意字查看详细能量状态与来源"}
            </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {renderPillar("年柱", "year")}
            {renderPillar("月柱", "month")}
            {renderPillar("日柱", "day")}
            {renderPillar("时柱", "hour")}
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-6 mt-8">
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-white opacity-100"></div>
                <span className="text-xs text-slate-400">旺 (得令/得地)</span>
            </div>
             <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-white opacity-30"></div>
                <span className="text-xs text-slate-400">弱 (泄气/受克)</span>
            </div>
        </div>

        {/* Modal */}
        {selectedDetail && (
            <DetailPanel detail={selectedDetail} onClose={() => setSelectedCharId(null)} />
        )}
    </div>
  );
};
