import { FiveElement, Stem, Branch, BaZiCharConfig } from './types';

export const ELEMENTS = [
  FiveElement.Wood,
  FiveElement.Fire,
  FiveElement.Earth,
  FiveElement.Metal,
  FiveElement.Water,
];

export const ELEMENT_CN: Record<FiveElement, string> = {
  [FiveElement.Wood]: '木',
  [FiveElement.Fire]: '火',
  [FiveElement.Earth]: '土',
  [FiveElement.Metal]: '金',
  [FiveElement.Water]: '水',
};

export const ELEMENT_COLORS: Record<FiveElement, string> = {
  [FiveElement.Wood]: 'bg-wood shadow-wood/50',
  [FiveElement.Fire]: 'bg-fire shadow-fire/50',
  [FiveElement.Earth]: 'bg-earth shadow-earth/50',
  [FiveElement.Metal]: 'bg-metal shadow-metal/50',
  [FiveElement.Water]: 'bg-water shadow-water/50',
};

export const ELEMENT_TEXT_COLORS: Record<FiveElement, string> = {
  [FiveElement.Wood]: 'text-emerald-400',
  [FiveElement.Fire]: 'text-red-400',
  [FiveElement.Earth]: 'text-amber-500',
  [FiveElement.Metal]: 'text-slate-400',
  [FiveElement.Water]: 'text-sky-400',
};

export const STEMS: Record<Stem, BaZiCharConfig> = {
  Jia: { char: '甲', pinyin: 'Jiǎ', element: FiveElement.Wood, polarity: 'Yang' },
  Yi: { char: '乙', pinyin: 'Yǐ', element: FiveElement.Wood, polarity: 'Yin' },
  Bing: { char: '丙', pinyin: 'Bǐng', element: FiveElement.Fire, polarity: 'Yang' },
  Ding: { char: '丁', pinyin: 'Dīng', element: FiveElement.Fire, polarity: 'Yin' },
  Wu: { char: '戊', pinyin: 'Wù', element: FiveElement.Earth, polarity: 'Yang' },
  Ji: { char: '己', pinyin: 'Jǐ', element: FiveElement.Earth, polarity: 'Yin' },
  Geng: { char: '庚', pinyin: 'Gēng', element: FiveElement.Metal, polarity: 'Yang' },
  Xin: { char: '辛', pinyin: 'Xīn', element: FiveElement.Metal, polarity: 'Yin' },
  Ren: { char: '壬', pinyin: 'Rén', element: FiveElement.Water, polarity: 'Yang' },
  Gui: { char: '癸', pinyin: 'Guǐ', element: FiveElement.Water, polarity: 'Yin' },
};

export const BRANCHES: Record<Branch, BaZiCharConfig> = {
  Zi: { char: '子', pinyin: 'Zǐ', element: FiveElement.Water, polarity: 'Yang', hiddenStems: ['Gui'] },
  Chou: { char: '丑', pinyin: 'Chǒu', element: FiveElement.Earth, polarity: 'Yin', hiddenStems: ['Ji', 'Gui', 'Xin'] },
  Yin: { char: '寅', pinyin: 'Yín', element: FiveElement.Wood, polarity: 'Yang', hiddenStems: ['Jia', 'Bing', 'Wu'] },
  Mao: { char: '卯', pinyin: 'Mǎo', element: FiveElement.Wood, polarity: 'Yin', hiddenStems: ['Yi'] },
  Chen: { char: '辰', pinyin: 'Chén', element: FiveElement.Earth, polarity: 'Yang', hiddenStems: ['Wu', 'Yi', 'Gui'] },
  Si: { char: '巳', pinyin: 'Sì', element: FiveElement.Fire, polarity: 'Yin', hiddenStems: ['Bing', 'Geng', 'Wu'] },
  Wu: { char: '午', pinyin: 'Wǔ', element: FiveElement.Fire, polarity: 'Yang', hiddenStems: ['Ding', 'Ji'] },
  Wei: { char: '未', pinyin: 'Wèi', element: FiveElement.Earth, polarity: 'Yin', hiddenStems: ['Ji', 'Ding', 'Yi'] },
  Shen: { char: '申', pinyin: 'Shēn', element: FiveElement.Metal, polarity: 'Yang', hiddenStems: ['Geng', 'Ren', 'Wu'] },
  You: { char: '酉', pinyin: 'Yǒu', element: FiveElement.Metal, polarity: 'Yin', hiddenStems: ['Xin'] },
  Xu: { char: '戌', pinyin: 'Xū', element: FiveElement.Earth, polarity: 'Yang', hiddenStems: ['Wu', 'Xin', 'Ding'] },
  Hai: { char: '亥', pinyin: 'Hài', element: FiveElement.Water, polarity: 'Yin', hiddenStems: ['Ren', 'Jia'] },
};

export const STEM_OPTIONS = Object.keys(STEMS) as Stem[];
export const BRANCH_OPTIONS = Object.keys(BRANCHES) as Branch[];

// Simulation Logic constants
export const BASE_OPACITY = 0.5;
export const MAX_OPACITY = 1.0;
export const MIN_OPACITY = 0.2;
