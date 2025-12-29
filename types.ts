export enum FiveElement {
  Wood = 'Wood',
  Fire = 'Fire',
  Earth = 'Earth',
  Metal = 'Metal',
  Water = 'Water',
}

export type Stem = 'Jia' | 'Yi' | 'Bing' | 'Ding' | 'Wu' | 'Ji' | 'Geng' | 'Xin' | 'Ren' | 'Gui';
export type Branch = 'Zi' | 'Chou' | 'Yin' | 'Mao' | 'Chen' | 'Si' | 'Wu' | 'Wei' | 'Shen' | 'You' | 'Xu' | 'Hai';

export interface BaZiCharConfig {
  char: string; // Chinese character
  pinyin: string;
  element: FiveElement;
  polarity: 'Yin' | 'Yang';
  hiddenStems?: Stem[]; // Array of Stem keys
}

export interface Pillar {
  stem: Stem;
  branch: Branch;
}

export interface BaZiState {
  year: Pillar;
  month: Pillar;
  day: Pillar;
  hour: Pillar;
}

export interface ElementStrength {
  [key: string]: number; // FiveElement as key, value 0-100
}

export interface CharEnergyDetail {
  id: string; // e.g., 'year-stem'
  position: string; // e.g., 'Year Stem'
  char: string;
  element: FiveElement;
  baseScore: number;
  factors: string[];
  seasonStatus: string; // Wang/Xiang/etc.
  hiddenStems?: Stem[]; // Passed down for display
}

export type DetailedAnalysis = Record<string, CharEnergyDetail>;

export interface AIAnalysisResult {
  dayMasterStrength: string;
  pattern: string;
  favorableElements: FiveElement[];
  unfavorableElements: FiveElement[];
  analysisText: string;
  flowDescription: string;
}

export interface CaseData {
  name: string;
  bazi: BaZiState;
  note: string;
}
