export const allNotes = [
  { tone: 'C', alterTone: '', octaveOrder: 1 },
  { tone: 'C#', alterTone: 'Db', octaveOrder: 2 },
  { tone: 'D', alterTone: '', octaveOrder: 3 },
  { tone: 'D#', alterTone: 'Eb', octaveOrder: 4 },
  { tone: 'E', alterTone: '', octaveOrder: 5 },
  { tone: 'F', alterTone: 'E#', octaveOrder: 6 },
  { tone: 'F#', alterTone: 'Gb', octaveOrder: 7 },
  { tone: 'G', alterTone: '', octaveOrder: 8 },
  { tone: 'G#', alterTone: 'Ab', octaveOrder: 9 },
  { tone: 'A', alterTone: '', octaveOrder: 10 },
  { tone: 'A#', alterTone: 'Bb', octaveOrder: 11 },
  { tone: 'B', alterTone: 'Cb', octaveOrder: 12 },
];
allNotes.forEach((note, index) => {
  note.index = index;
  // allNotes[note.tone.replace('#', 'd')] = note;
  // if (note.alterTone.length > 0) {
  //   allNotes[note.alterTone.replace('#', 'd')] = note;
  // }
  note.is = (tone) => ((note.tone === tone) || note.alterTone === tone);
  note.getTone = (tone) => {
    if (note.tone.includes(tone)) {
      return note.tone;
    }
    return note.alterTone.includes(tone) ? note.alterTone : null;
  };
});

export const fullNotes = allNotes
  .map((note) => (note.tone.length === 1 ? note : null))
  .filter((n) => n);

const octaves = [
  { nameRus: 'большая', sinceNumber: 2, color: '#bdd6ac' },
  { nameRus: 'малая', sinceNumber: 3, color: '#f2cca2' },
  { nameRus: 'первая', sinceNumber: 4, color: '#a6c4e4' },
  { nameRus: 'вторая', sinceNumber: 5, color: '#cda8bc' },
  { nameRus: 'третья', sinceNumber: 6, color: '#edcdcc' },
];
octaves.forEach((octave, index) => {
  octave.index = index;
});

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

export const guitarTunings = {
  classic: [
    {
      note: allNotes.find(({ tone }) => (tone === 'E')),
      octave: octaves.find(({ sinceNumber }) => (sinceNumber === 4)),
    },
    {
      note: allNotes.find(({ tone }) => (tone === 'B')),
      octave: octaves.find(({ sinceNumber }) => (sinceNumber === 3)),
    },
    {
      note: allNotes.find(({ tone }) => (tone === 'G')),
      octave: octaves.find(({ sinceNumber }) => (sinceNumber === 3)),
    },
    {
      note: allNotes.find(({ tone }) => (tone === 'D')),
      octave: octaves.find(({ sinceNumber }) => (sinceNumber === 3)),
    },
    {
      note: allNotes.find(({ tone }) => (tone === 'A')),
      octave: octaves.find(({ sinceNumber }) => (sinceNumber === 2)),
    },
    {
      note: allNotes.find(({ tone }) => (tone === 'E')),
      octave: octaves.find(({ sinceNumber }) => (sinceNumber === 2)),
    },
  ],
};
Object.values(guitarTunings).forEach((tuning) => {
  tuning.forEach((string, order) => {
    string.order = order + 1;
    string.notes = [];
    let octaveIndex = string.octave.index;
    for (let noteOrder = string.note.index; noteOrder <= allNotes.length + string.note.index; noteOrder += 1) {
      const noteIndex = noteOrder % allNotes.length;
      octaveIndex += (noteIndex === 0) ? 1 : 0;
      const octave = octaves[octaveIndex];
      const note = allNotes[noteIndex];
      string.notes.push({ ...note, octave: { ...octave } });
    }
  });
  tuning.getStringByOrder = (order) => tuning[(order - 1) % tuning.length];
});
