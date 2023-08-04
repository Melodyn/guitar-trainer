import {
  allNotes,
  fullNotes,
  //
  allNotesCount,
  fullNotesCount,
  //
  scales,
  gammaSteps,
  chordSteps,
  //
  giutarTunings,
} from './constants.js';

const buildGamma = (fromNote, steps) => {
  let noteIndex = allNotes.findIndex((note) => note.is(fromNote));
  if (noteIndex === -1) return null;
  const fullNoteFirstIndex = fullNotes.findIndex((note) => fromNote.includes(note)) + 1;

  const gammaNotes = [];
  for (let i = 0; i < fullNotesCount; i += 1) {
    const toneStep = steps[i];
    const fullNoteIndex = (fullNoteFirstIndex + i) % fullNotesCount;
    const fullNote = fullNotes[fullNoteIndex];
    noteIndex = (noteIndex + toneStep) % allNotesCount;
    const note = allNotes[noteIndex];
    const tone = [note.tone, note.alterTone].find((tone) => tone.includes(fullNote));
    gammaNotes.push(tone);
  }

  return gammaNotes;
};

const buildChord = (fromNote, scale) => {
  const gamma = buildGamma(fromNote, gammaSteps[scale.name]);
  const currentChordSteps = chordSteps[scale.name];
  const chordNotes = currentChordSteps.map((chordStep) => gamma[chordStep]);
  chordNotes.unshift(fromNote);

  return chordNotes;
};

const calcFret = (fromNote, string, offset = 0) => {
  const note = allNotes.find((note) => note.is(fromNote));

  const startFret = (note.index - string.note.index + allNotesCount) % allNotesCount;
  const fret = startFret + (allNotesCount * offset);

  return fret;
};

console.log(buildGamma('Db', gammaSteps.major));
console.log(buildChord('Db', scales.major));
console.log(calcFret('Db', giutarTunings.classic.getStringByOrder(6)));
