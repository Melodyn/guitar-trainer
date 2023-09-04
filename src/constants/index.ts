import * as t from '../types';
import * as u from './utils';

export const allNotes = u.generateAllNotes();
export const fullNotes = allNotes.filter((note): note is t.fullNote => (note.tone.length === 1));

export const allNotesCount = allNotes.length;
export const fullNotesCount = fullNotes.length;

export const octaves = u.generateOctaves();

export const scales: t.scales = Object.freeze({
  [t.scaleName.major]: {
    name: t.scaleName.major,
    notePostfix: '',
  },
  [t.scaleName.garmajor]: {
    name: t.scaleName.garmajor,
    notePostfix: '',
  },
  [t.scaleName.melmajor]: {
    name: t.scaleName.melmajor,
    notePostfix: '',
  },
  [t.scaleName.minor]: {
    name: t.scaleName.minor,
    notePostfix: 'm',
  },
  [t.scaleName.garminor]: {
    name: t.scaleName.garminor,
    notePostfix: 'm',
  },
  [t.scaleName.melminor]: {
    name: t.scaleName.melminor,
    notePostfix: 'm',
  },
});

export const defaultGammaSteps: t.gammaStepsByScales = {
  [t.scaleName.major]: [2, 2, 1, 2, 2, 2, 1],
  [t.scaleName.garmajor]: [2, 2, 1, 2, 1, 3, 1],
  [t.scaleName.melmajor]: [2, 2, 1, 2, 1, 2, 2],
  [t.scaleName.minor]: [2, 1, 2, 2, 1, 2, 2],
  [t.scaleName.garminor]: [2, 1, 2, 2, 1, 3, 1],
  [t.scaleName.melminor]: [2, 1, 2, 2, 2, 2, 1],
};

export const gammas = u.generateGammas();

export const defaultChordSteps: t.chordSteps = [1, 3, 5];

export const tunings = u.generateTunings(allNotes, octaves);
