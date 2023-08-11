import type * as t from './types';
import * as u from './utils';
import {
  allNotes,
  fullNotes,
  //
  allNotesCount,
  fullNotesCount,
  //
  gammaSteps,
  chordSteps,
} from './constants';

export const buildGamma: t.buildGamma = (fromNote, steps) => {
  let noteIndex = fromNote.index;
  let fullNoteIndex = fullNotes.findIndex((note) => fromNote[fromNote.activeTone].includes(note.tone));

  const notes: t.gamma['notes'] = Array(steps.length + 1).fill(null).map((_, step) => {
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
    toString() {
      return this.notes.map((note) => note.toString()).join('');
    },
  };
};

export const buildChord: t.buildChord = (fromNote, scale) => {
  const gamma = buildGamma(fromNote, gammaSteps[scale.name]);
  const currentChordSteps = chordSteps[scale.name];
  const notes = currentChordSteps.map((chordStep) => gamma.notes[chordStep - 1]);

  return {
    notes,
    toString() {
      return this.notes.map((note) => note.toString()).join('');
    },
  };
};

export const calcFret: t.calcFret = (fromNote, string, offset = 0) => {
  const startFret = (fromNote.index - string.note.index + allNotesCount) % allNotesCount;
  const fret = startFret + (allNotesCount * offset);

  return fret;
};
