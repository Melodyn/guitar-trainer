import type * as t from '../types';
import * as u from '../utils';

export const generateAllNotes = (): t.note[] => {
  type notePicked = Pick<t.note, 'tone' | 'alterTone' | 'octaveOrder'>;

  const baseNotes: notePicked[] = [
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

  const notes: t.note[] = baseNotes.map((note, index) => ({
    ...note,
    activeTone: 'tone',
    index,
    is: (tone) => ((note.tone === tone) || note.alterTone === tone),
    getActiveTone: (tone) => {
      if (note.tone.includes(tone)) {
        return 'tone';
      }
      return note.alterTone.includes(tone) ? 'alterTone' : null;
    },
    toString() {
      return this[this.activeTone];
    },
  }));

  return notes;
};

export const generateOctaves = (): t.octave[] => {
  const octaves: t.octave[] = [
    { nameRus: 'большая', sinceNumber: 2, color: '#bdd6ac', index: 0 },
    { nameRus: 'малая', sinceNumber: 3, color: '#f2cca2', index: 0 },
    { nameRus: 'первая', sinceNumber: 4, color: '#a6c4e4', index: 0 },
    { nameRus: 'вторая', sinceNumber: 5, color: '#cda8bc', index: 0 },
    { nameRus: 'третья', sinceNumber: 6, color: '#edcdcc', index: 0 },
  ];

  return octaves.map((octave, index) => {
    octave.index = index;
    return octave;
  });
};

export const generateTunings = (allNotes: t.note[], octaves: t.octave[]): t.tuning => {
  const tunings: t.tuning = {
    classic: {
      notes: [
        {
          note: u.find(allNotes, ({ tone }) => (tone === 'E')),
          octave: u.find(octaves, ({ sinceNumber }) => (sinceNumber === 4)),
          order: 0,
          notes: [],
        },
        {
          note: u.find(allNotes, ({ tone }) => (tone === 'B')),
          octave: u.find(octaves, ({ sinceNumber }) => (sinceNumber === 3)),
          order: 0,
          notes: [],
        },
        {
          note: u.find(allNotes, ({ tone }) => (tone === 'G')),
          octave: u.find(octaves, ({ sinceNumber }) => (sinceNumber === 3)),
          order: 0,
          notes: [],
        },
        {
          note: u.find(allNotes, ({ tone }) => (tone === 'D')),
          octave: u.find(octaves, ({ sinceNumber }) => (sinceNumber === 3)),
          order: 0,
          notes: [],
        },
        {
          note: u.find(allNotes, ({ tone }) => (tone === 'A')),
          octave: u.find(octaves, ({ sinceNumber }) => (sinceNumber === 2)),
          order: 0,
          notes: [],
        },
        {
          note: u.find(allNotes, ({ tone }) => (tone === 'E')),
          octave: u.find(octaves, ({ sinceNumber }) => (sinceNumber === 2)),
          order: 0,
          notes: [],
        },
      ],
      getStringByOrder(order) {
        return this.notes[(order - 1) % this.notes.length];
      },
    },
  };
  Object.values(tunings).forEach((tuning) => {
    tuning.notes.forEach((string, order) => {
      string.order = order + 1;
      string.notes = [];
      let octaveIndex = string.octave.index;
      for (
        let noteOrder = string.note.index;
        noteOrder <= allNotes.length + string.note.index;
        noteOrder += 1
      ) {
        const noteIndex = noteOrder % allNotes.length;
        octaveIndex += (noteIndex === 0) ? 1 : 0;
        const octave = octaves[octaveIndex];
        const note = allNotes[noteIndex];
        const fullNote: t.gnote = { ...note, octave: { ...octave } };
        string.notes.push(fullNote);
      }
    });
  });

  return tunings;
};
