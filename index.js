import notes from './notes.js';

const fullNotes = notes.map(([note]) => (note.length === 1 ? note : null)).filter(n => n);
const fullNotesCount = 7;
const allNotesCount = 12;

const majorSteps = '2212221'.split('').map(parseFloat);
const minorSteps = '2122122'.split('').map(parseFloat);

const buildGamma = (fromNote, toneSteps) => {
  let noteIndex = notes.findIndex((tones) => tones.some((tone) => (tone === fromNote)));
  if (noteIndex === -1) return null;
  const fullNoteFirstIndex = fullNotes.findIndex((note) => fromNote.includes(note)) + 1;

  const gammaNotes = [];
  for (let i = 0; i < fullNotesCount; i += 1) {
    const toneStep = toneSteps[i];
    const fullNoteIndex = (fullNoteFirstIndex + i) % fullNotesCount;
    const fullNote = fullNotes[fullNoteIndex];
    noteIndex = (noteIndex + toneStep) % allNotesCount;
    const tones = notes[noteIndex];
    const note = tones.find((tone) => tone.includes(fullNote));
    gammaNotes.push(note);
  }

  return gammaNotes;
};

console.log(buildGamma('Bb', majorSteps));
console.log(buildGamma('G#', minorSteps));
