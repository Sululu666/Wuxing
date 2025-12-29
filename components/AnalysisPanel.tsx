import React, { useState, useEffect } from 'react';
import { AIAnalysisResult, FiveElement, BaZiState } from '../types';
import { ELEMENT_TEXT_COLORS, ELEMENT_CN } from '../constants';
import { getBaZiDescription } from '../services/geminiService';

interface AnalysisPanelProps {
  bazi: BaZiState;
  analysis: AIAnalysisResult | null;
  loading: boolean;
  onAnalyze: (customPrompt: string) => void;
}

export const AnalysisPanel: React.FC<AnalysisPanelProps> = ({ bazi, analysis, loading, onAnalyze }) => {
  const [promptText, setPromptText] = useState("");

  // Update prompt text when BaZi changes
  useEffect(() => {
    setPromptText(getBaZiDescription(bazi).trim());
  }, [bazi]);

  const renderElementBadge = (el: FiveElement) => (
    <span key={el} className={`px-2 py-1 rounded border border-slate-700 bg-slate-900 text-xs font-bold ${ELEMENT_TEXT_COLORS[el]}`}>
      {ELEMENT_CN[el]}
    </span>
  );

  return (
    <div className="w-full max-w-6xl mx-auto mt-8 mb-16 px-4">
        <h2 className="text-xl font-light text-white mb-6 text-center">AI 命理大师分析</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left: Input/Chat Section */}
            <div className="lg:col-span-1 bg-slate-900/50 rounded-2xl border border-slate-800 p-4 flex flex-col h-full min-h-[300px]">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                    八字排盘与提问
                </label>
                <textarea 
                    value={promptText}
                    onChange={(e) => setPromptText(e.target.value)}
                    className="flex-grow bg-slate-950 text-slate-300 p-4 rounded-xl border border-slate-700 focus:border-indigo-500 outline-none resize-none font-mono text-sm leading-relaxed mb-4"
                    placeholder="在此输入或修改八字信息，并添加你的问题..."
                />
                <button 
                    onClick={() => onAnalyze(promptText)}
                    disabled={loading}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-indigo-500/30 transition-all flex items-center justify-center gap-2"
                >
                    {loading ? (
                         <>
                             <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                             </svg>
                             分析中...
                         </>
                    ) : "发送给大师"}
                </button>
            </div>

            {/* Right: Analysis Result */}
            <div className="lg:col-span-2">
                {!analysis ? (
                    <div className="h-full min-h-[300px] flex flex-col items-center justify-center bg-slate-800/30 rounded-2xl border border-slate-800 border-dashed text-slate-500 p-8 text-center">
                        <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
                            <span className="text-2xl">🤖</span>
                        </div>
                        <p>请在左侧确认八字信息，点击发送以获取详细分析。</p>
                    </div>
                ) : (
                    <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500 h-full overflow-y-auto max-h-[800px]">
                        <div className="grid md:grid-cols-2 gap-4 mb-6 border-b border-slate-700 pb-6">
                            <div>
                                <h3 className="text-slate-400 text-xs uppercase tracking-widest mb-1">日主强弱</h3>
                                <p className="text-2xl font-serif text-white">{analysis.dayMasterStrength}</p>
                            </div>
                            <div>
                                <h3 className="text-slate-400 text-xs uppercase tracking-widest mb-1">格局</h3>
                                <p className="text-2xl font-serif text-indigo-300">{analysis.pattern}</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 mb-6">
                            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
                                <h3 className="flex items-center gap-2 text-emerald-400 font-bold mb-2 text-sm">
                                    <span className="text-base">✓</span> 喜用神 (Favorable)
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {analysis.favorableElements.length > 0 ? analysis.favorableElements.map(renderElementBadge) : <span className="text-slate-500 text-sm">无明显喜用</span>}
                                </div>
                            </div>
                            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
                                <h3 className="flex items-center gap-2 text-rose-400 font-bold mb-2 text-sm">
                                    <span className="text-base">✕</span> 忌神 (Taboo)
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {analysis.unfavorableElements.length > 0 ? analysis.unfavorableElements.map(renderElementBadge) : <span className="text-slate-500 text-sm">无明显忌神</span>}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-base font-bold text-white mb-2">能量流转</h3>
                                <p className="text-slate-300 leading-relaxed text-sm">{analysis.flowDescription}</p>
                            </div>
                            <div className="bg-slate-900 p-5 rounded-xl border-l-4 border-indigo-500">
                                <h3 className="text-base font-bold text-white mb-2">大师批语</h3>
                                <p className="text-slate-300 leading-relaxed italic whitespace-pre-line">{analysis.analysisText}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};
