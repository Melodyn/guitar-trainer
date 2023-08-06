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
  chordSteps
} from './constants';

export const buildGamma: t.buildGamma = (fromNote, steps) => {
  let noteIndex = allNotes.findIndex((note) => note.is(fromNote));
  const firstFullNoteOrder = fullNotes.findIndex((note) => fromNote.includes(note.tone)) + 1;

  const gamma = [];
  for (let step = 0; step < fullNotesCount; step += 1) {
    const toneStep = steps[step];
    const fullNoteIndex = (firstFullNoteOrder + step) % fullNotesCount;
    const fullNote = fullNotes[fullNoteIndex];
    noteIndex = (noteIndex + toneStep) % allNotesCount;
    const note = allNotes[noteIndex];
    const tone = note.getTone(fullNote.tone);
    if (tone === null) {
      throw new Error(`Note ${note.tone} does not contain a tone ${fullNote.tone}`);
    }
    gamma.push(tone);
  }

  return gamma as t.gamma;
};

export const buildChord: t.buildChord = (fromNote, scale) => {
  const gamma = buildGamma(fromNote, gammaSteps[scale.name]);
  const currentChordSteps = chordSteps[scale.name];
  const chordNotes = currentChordSteps.map((chordStep) => gamma[chordStep]);
  chordNotes.unshift(fromNote);

  return chordNotes as t.chord;
};

export const calcFret: t.calcFret = (fromNote, string, offset = 0) => {
  const note = u.find(allNotes, (currNote) => currNote.is(fromNote));

  const startFret = (note.index - string.note.index + allNotesCount) % allNotesCount;
  const fret = startFret + (allNotesCount * offset);

  return fret;
};
