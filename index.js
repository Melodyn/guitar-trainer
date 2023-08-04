import {
  allNotes,
  fullNotes,
  //
  allNotesCount,
  fullNotesCount,
  //
  gammaSteps,
  chordSteps,
} from './constants.js';

export const buildGamma = (fromNote, steps) => {
  let noteIndex = allNotes.findIndex((note) => note.is(fromNote));
  if (noteIndex === -1) return null;
  const firstFullNoteOrder = fullNotes.findIndex((note) => fromNote.includes(note.tone)) + 1;

  const gammaNotes = [];
  for (let step = 0; step < fullNotesCount; step += 1) {
    const toneStep = steps[step];
    const fullNoteIndex = (firstFullNoteOrder + step) % fullNotesCount;
    const fullNote = fullNotes[fullNoteIndex];
    noteIndex = (noteIndex + toneStep) % allNotesCount;
    const note = allNotes[noteIndex];
    const tone = note.getTone(fullNote.tone);
    if (!tone) {
      throw new Error(`Note ${note.tone} does not contain a tone ${fullNote.tone}`);
    }
    gammaNotes.push(tone);
  }

  return gammaNotes;
};

export const buildChord = (fromNote, scale) => {
  const gamma = buildGamma(fromNote, gammaSteps[scale.name]);
  const currentChordSteps = chordSteps[scale.name];
  const chordNotes = currentChordSteps.map((chordStep) => gamma[chordStep]);
  chordNotes.unshift(fromNote);

  return chordNotes;
};

export const calcFret = (fromNote, string, offset = 0) => {
  const note = allNotes.find((currNote) => currNote.is(fromNote));

  const startFret = (note.index - string.note.index + allNotesCount) % allNotesCount;
  const fret = startFret + (allNotesCount * offset);

  return fret;
};
