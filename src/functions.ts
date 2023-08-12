import type * as t from './types';
import {
  allNotes,
  fullNotes,
  //
  allNotesCount,
  fullNotesCount,
  //
  defaultGammaSteps,
  defaultChordSteps,
} from './constants';

export const buildGamma: t.buildGamma = (fromNote, scale, stepsByScale = defaultGammaSteps) => {
  const steps = stepsByScale[scale.name];
  let noteIndex = fromNote.index;
  let fullNoteIndex = fullNotes.findIndex((note) => fromNote[fromNote.activeTone].includes(note.tone));

  const notes: t.repository['notes'] = Array(steps.length + 1).fill(null).map((_, step) => {
    if (step === 0) {
      return {
        ...fromNote,
      };
    }

    fullNoteIndex = (fullNoteIndex + 1) % fullNotesCount;
    const fullNote = fullNotes[fullNoteIndex];
    const toneStep = steps[step - 1];
    noteIndex = (noteIndex + toneStep) % allNotesCount;
    const note = allNotes[noteIndex];
    const activeTone = note.getActiveTone(fullNote.tone);
    if (activeTone === null) {
      throw new Error(`Note ${note.tone} does not contain a tone ${fullNote.tone}`);
    }
    const newNote: t.note = {
      ...note,
      activeTone,
    };
    return newNote;
  });

  return {
    notes,
    scale,
    toString() {
      return this.notes.map((note) => note.toString()).join('');
    },
  };
};

export const buildChord: t.buildChord = (gamma, steps = defaultChordSteps) => ({
  notes: steps.map((chordStep) => gamma.notes[chordStep - 1]),
  scale: gamma.scale,
  toString() {
    return this.notes.map((note) => note.toString()).join('');
  },
});

export const calcFret: t.calcFret = (fromNote, string, offset = 0) => {
  const startFret = (fromNote.index - string.note.index + allNotesCount) % allNotesCount;
  const fret = startFret + (allNotesCount * offset);

  return fret;
};
