export type fullToneName = 'C' | 'D' | 'E' | 'F' | 'G' | 'A' | 'B';
export type toneName = fullToneName | 'C#' | 'Db' | 'D#' | 'Eb' | 'E#' | 'F#' | 'Gb' | 'G#' | 'Ab' | 'A#' | 'Bb' | 'B#' | 'Cb';
export type alterToneName = toneName | '';
export type activeToneType = 'tone' | 'alterTone';

export type fullNote<T = fullToneName> = {
  tone: T
  alterTone: alterToneName
  activeTone: activeToneType
  octaveOrder: number
  index: number
  is: (tone: toneName) => boolean
  getActiveTone: (tone: toneName) => fullNote<T>['activeTone'] | null
  toString: () => fullNote<T>[fullNote<T>['activeTone']]
};
export type note = fullNote<toneName>;

export type octaveName = 'большая' | 'малая' | 'первая' | 'вторая' | 'третья';
export type octave = {
  nameRus: octaveName
  sinceNumber: number
  color: `#${string}`
  index: number
};

export enum scaleName {
  major = 'major',
  garmajor = 'garmajor',
  melmajor = 'melmajor',
  minor = 'minor',
  garminor = 'garminor',
  melminor = 'melminor',
}
export type scale = {
  name: scaleName
  notePostfix: 'm' | ''
};
export type scales = {
  [key in scaleName]: scale
};

export type repository = {
  notes: note[]
  scale: scale
  toString: () => string
};

export type gamma = repository;
type gammaStep = 3 | 2 | 1;
type gammaSteps = [gammaStep, gammaStep, gammaStep, gammaStep, gammaStep, gammaStep, gammaStep];
export type gammaStepsByScales = { [key in scaleName]: gammaSteps };
export type buildGamma = (fromNote: note, scale: scale, stepsByScale?: gammaStepsByScales) => gamma;

export type chord = repository;
type chordStep = 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type chordSteps = chordStep[];
export type buildChord = (gamma: gamma, steps?: chordSteps) => chord;

export type gnote = note & { octave: octave };
export type gstring = {
  order: number
  note: note
  octave: octave
  notes: gnote[]
};
export type tuning = Record<string, {
  strings: gstring[]
  getStringByOrder: (order: gstring['order']) => gstring
}>;

export type fret = number;
export type calcFret = (fromNote: note, string: gstring, offset?: 0 | 1) => fret;
