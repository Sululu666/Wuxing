import React from 'react';
import { BaZiState, Pillar, Stem, Branch } from '../types';
import { STEMS, BRANCHES, STEM_OPTIONS, BRANCH_OPTIONS } from '../constants';

interface BaZiInputProps {
  bazi: BaZiState;
  onChange: (newBaZi: BaZiState) => void;
}

const PillarSelect: React.FC<{
  label: string;
  pillar: Pillar;
  onChange: (p: Pillar) => void;
}> = ({ label, pillar, onChange }) => {
  return (
    <div className="flex flex-col gap-1 p-2 bg-slate-800 rounded-lg border border-slate-700">
      <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">{label}</span>
      <div className="flex gap-2">
        <select
          className="bg-slate-900 text-white p-1 rounded border border-slate-600 w-full text-sm focus:border-indigo-500 outline-none font-serif"
          value={pillar.stem}
          onChange={(e) => onChange({ ...pillar, stem: e.target.value as Stem })}
        >
          {STEM_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {STEMS[s].char}
            </option>
          ))}
        </select>
        <select
          className="bg-slate-900 text-white p-1 rounded border border-slate-600 w-full text-sm focus:border-indigo-500 outline-none font-serif"
          value={pillar.branch}
          onChange={(e) => onChange({ ...pillar, branch: e.target.value as Branch })}
        >
          {BRANCH_OPTIONS.map((b) => (
            <option key={b} value={b}>
              {BRANCHES[b].char}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export const BaZiInput: React.FC<BaZiInputProps> = ({ bazi, onChange }) => {
  const updatePillar = (key: keyof BaZiState, val: Pillar) => {
    onChange({ ...bazi, [key]: val });
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl mx-auto mb-8">
      <PillarSelect label="年柱 (Year)" pillar={bazi.year} onChange={(p) => updatePillar('year', p)} />
      <PillarSelect label="月柱 (Month)" pillar={bazi.month} onChange={(p) => updatePillar('month', p)} />
      <PillarSelect label="日柱 (Day)" pillar={bazi.day} onChange={(p) => updatePillar('day', p)} />
      <PillarSelect label="时柱 (Hour)" pillar={bazi.hour} onChange={(p) => updatePillar('hour', p)} />
    </div>
  );
};
