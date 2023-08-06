export type fullToneName = 'C' | 'D' | 'E' | 'F' | 'G' | 'A' | 'B';
export type toneName = fullToneName | 'C#' | 'Db' | 'D#' | 'Eb' | 'E#' | 'F#' | 'Gb' | 'G#' | 'Ab' | 'A#' | 'Bb' | 'Cb';
export type alterToneName = toneName | '';

export interface fullNote<T = fullToneName> {
  tone: T
  alterTone: alterToneName
  octaveOrder: number
  index: number
  is: (tone: toneName) => boolean
  getTone: (tone: toneName) => alterToneName | null
}
export type note = fullNote<toneName>;

export type octaveName = 'большая' | 'малая' | 'первая' | 'вторая' | 'третья';
export interface octave {
  nameRus: octaveName
  sinceNumber: number
  color: `#${string}`
  index: number
}

export enum scaleName {
  minor = 'minor',
  major = 'major',
}
interface scale {
  name: scaleName
  notePostfix: 'm' | ''
}
export type scales = {
  [key in scaleName]: scale
};

export type gamma = [alterToneName, alterToneName, alterToneName, alterToneName, alterToneName, alterToneName, alterToneName];
type gammaStep = 2 | 1;
type gammaSteps = [gammaStep, gammaStep, gammaStep, gammaStep, gammaStep, gammaStep, gammaStep];
export type gammaStepsByScales = { [key in scaleName]: gammaSteps };
export type buildGamma = (fromNote: toneName, steps: gammaSteps) => gamma | never;

// export type chord = [alterToneName, alterToneName, alterToneName];
type chordStep = 3 | 2 | 1;
export type chord = [gamma[chordStep], gamma[chordStep], gamma[chordStep]];
type chordSteps = [chordStep, chordStep];
export type chordStepsByScales = { [key in scaleName]: chordSteps };
export type buildChord = (fromNote: toneName, scale: scale) => chord;

export type gnote = note & { octave: octave };
export interface gstring {
  order: number
  note: note
  octave: octave
  notes: gnote[]
}
export type tuning = Record<string, {
  notes: gstring[]
  getStringByOrder: (order: gstring['order']) => gstring
}>;

export type fret = number;
export type calcFret = (fromNote: toneName, string: gstring, offset?: 0 | 1) => fret;
