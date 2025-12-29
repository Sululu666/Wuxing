import React, { useState, useEffect } from "react";
import { BaZiInput } from "./components/BaZiInput";
import { Visualizer } from "./components/Visualizer";
import { ElementSelector } from "./components/ElementSelector";
import { CaseSelector } from "./components/CaseSelector";
import { BaZiState, FiveElement, AIAnalysisResult } from "./types";
import { getRandomBaZi } from "./baziLogic";

const App: React.FC = () => {
  const [bazi, setBazi] = useState<BaZiState>(getRandomBaZi());
  const [simulatedElement, setSimulatedElement] = useState<FiveElement | null>(
    null
  );
  const [analysis, setAnalysis] = useState<AIAnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  // Reset analysis when bazi changes significantly
  useEffect(() => {
    setAnalysis(null);
    setSimulatedElement(null);
  }, [bazi.year.stem, bazi.month.stem, bazi.day.stem, bazi.hour.stem]);

  const handleCaseSelect = (newBazi: BaZiState) => {
    setBazi(newBazi);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 pb-20 font-sans selection:bg-indigo-500/30">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 backdrop-blur-md bg-opacity-80">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
              八
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              八字喜用 <span className="font-light opacity-70">模拟器</span>
            </h1>
          </div>
          <div>
            <button
              onClick={() => setBazi(getRandomBaZi())}
              className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 py-1.5 px-3 rounded-md transition-colors border border-slate-700"
            >
              随机排盘
            </button>
          </div>
        </div>
      </header>

      <main className="container max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Top Section: Input (Left) + Cases (Right) */}
        <section className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 bg-slate-900/30 p-6 rounded-2xl border border-slate-800/50">
            <div className="text-center mb-6">
              <h2 className="text-sm font-bold uppercase text-slate-500 tracking-widest">
                命盘构造 (BaZi Input)
              </h2>
            </div>
            <BaZiInput bazi={bazi} onChange={setBazi} />
          </div>
          <div className="lg:col-span-1 h-full min-h-[300px]">
            <CaseSelector onSelectCase={handleCaseSelect} />
          </div>
        </section>

        {/* Middle Section: Visualizer + Controls */}
        <section className="relative">
          <Visualizer bazi={bazi} simulatedElement={simulatedElement} />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-20"></div>
        </section>

        <section>
          <ElementSelector
            selectedElement={simulatedElement}
            onSelect={setSimulatedElement}
          />
        </section>
      </main>

      <footer className="text-center text-slate-600 text-sm py-8 border-t border-slate-900 mt-12">
        <p>八字喜用模拟器 &copy; {new Date().getFullYear()}</p>
        <p className="text-xs mt-2">Powered by Gemini 2.5 Flash</p>
      </footer>
    </div>
  );
};

export default App;
