export const allNotes = [
  // [tone, semitone]
  ['A', ''],
  ['A#', 'Bb'],
  ['B', 'Cb'],
  ['C', ''],
  ['C#', 'Db'],
  ['D', ''],
  ['D#', 'Eb'],
  ['E', ''],
  ['F', 'E#'],
  ['F#', 'Gb'],
  ['G', ''],
  ['G#', 'Ab']
];
export const fullNotes = allNotes.map(([note]) => (note.length === 1 ? note : null)).filter(n => n);

export const fullNotesCount = fullNotes.length;
export const allNotesCount = allNotes.length;

export const scales = Object.freeze({
  minor: {
    name: 'minor',
    notePostfix: 'm',
  },
  major: {
    name: 'major',
    notePostfix: '',
  },
});

export const gammaSteps = {
  [scales.minor.name]: '2122122'.split('').map(parseFloat),
  [scales.major.name]: '2212221'.split('').map(parseFloat),
};

export const chordSteps = {
  [scales.minor.name]: '23'.split('').map(parseFloat),
  [scales.major.name]: '13'.split('').map(parseFloat),
};
