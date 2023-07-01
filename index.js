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
} from './constants.js';

const buildGamma = (fromNote, steps) => {
  let noteIndex = allNotes.findIndex((tones) => tones.some((tone) => (tone === fromNote)));
  if (noteIndex === -1) return null;
  const fullNoteFirstIndex = fullNotes.findIndex((note) => fromNote.includes(note)) + 1;

  const gammaNotes = [];
  for (let i = 0; i < fullNotesCount; i += 1) {
    const toneStep = steps[i];
    const fullNoteIndex = (fullNoteFirstIndex + i) % fullNotesCount;
    const fullNote = fullNotes[fullNoteIndex];
    noteIndex = (noteIndex + toneStep) % allNotesCount;
    const tones = allNotes[noteIndex];
    const note = tones.find((tone) => tone.includes(fullNote));
    gammaNotes.push(note);
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

console.log(buildChord('F', scales.major));
console.log(buildChord('F', scales.minor));
