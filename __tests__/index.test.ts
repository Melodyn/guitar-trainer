import { allNotes, scales, tunings } from '../src/constants';
import { buildGamma, buildChord, calcFret } from '../src/functions';
import * as u from '../src/utils';
import type * as t from '../src/types';

const genNote = (toneName: t.toneName): t.note => {
  const note = u.find(allNotes, (note) => note.is(toneName));
  return {
    ...note,
    activeTone: (note.tone === toneName) ? 'tone' : 'alterTone',
  };
};

const repositoryExpect: Record<keyof t.repository, any> = {
  notes: expect.any(Array),
  scale: expect.any(Object),
  toString: expect.any(Function),
};

describe('major', () => {
  const noteEb = genNote('Db');

  test('buildGamma Db', () => {
    const gamma = buildGamma(noteEb, scales.major);
    expect(gamma).toEqual(repositoryExpect);
    expect(gamma.toString()).toEqual([
      'Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb', 'C', 'Db',
    ].join(''));
  });

  test('buildChord Db', () => {
    const chord = buildChord(buildGamma(noteEb, scales.major));
    expect(chord).toEqual(repositoryExpect);
    expect(chord.toString()).toEqual([
      'Db', 'F', 'Ab',
    ].join(''));
  });

  test('calcFret Db', () => {
    expect(calcFret(noteEb, tunings.classic.getStringByOrder(6))).toEqual(9);
    expect(calcFret(noteEb, tunings.classic.getStringByOrder(6), 1)).toEqual(21);
  });

  // B
  const noteB = genNote('B');

  test('buildGamma B', () => {
    const gamma = buildGamma(noteB, scales.major);
    expect(gamma).toEqual(repositoryExpect);
    expect(gamma.toString()).toEqual([
      'B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#', 'B',
    ].join(''));
  });

  test('buildChord B', () => {
    const chord = buildChord(buildGamma(noteB, scales.major));
    expect(chord).toEqual(repositoryExpect);
    expect(chord.toString()).toEqual([
      'B', 'D#', 'F#',
    ].join(''));
  });

  test('calcFret B', () => {
    expect(calcFret(noteB, tunings.classic.getStringByOrder(2))).toEqual(0);
    expect(calcFret(noteB, tunings.classic.getStringByOrder(2), 1)).toEqual(12);
  });
});

describe('minor', () => {
  const noteEb = genNote('Eb');

  test('buildGamma Eb', () => {
    const gamma = buildGamma(noteEb, scales.minor);
    expect(gamma).toEqual(repositoryExpect);
    expect(gamma.toString()).toEqual([
      'Eb', 'F', 'Gb', 'Ab', 'Bb', 'Cb', 'Db', 'Eb',
    ].join(''));
  });

  test('buildChord Eb', () => {
    const chord = buildChord(buildGamma(noteEb, scales.minor));
    expect(chord).toEqual(repositoryExpect);
    expect(chord.toString()).toEqual([
      'Eb', 'Gb', 'Bb',
    ].join(''));
  });

  test('calcFret Eb', () => {
    expect(calcFret(noteEb, tunings.classic.getStringByOrder(5))).toEqual(6);
    expect(calcFret(noteEb, tunings.classic.getStringByOrder(5), 1)).toEqual(18);
  });

  // E
  const noteE = genNote('E');

  test('buildGamma E', () => {
    const gamma = buildGamma(noteE, scales.minor);
    expect(gamma).toEqual(repositoryExpect);
    expect(gamma.toString()).toEqual([
      'E', 'F#', 'G', 'A', 'B', 'C', 'D', 'E',
    ].join(''));
  });

  test('buildChord E', () => {
    const chord = buildChord(buildGamma(noteE, scales.minor));
    expect(chord).toEqual(repositoryExpect);
    expect(chord.toString()).toEqual([
      'E', 'G', 'B',
    ].join(''));
  });

  test('calcFret E', () => {
    expect(calcFret(noteE, tunings.classic.getStringByOrder(3))).toEqual(9);
    expect(calcFret(noteE, tunings.classic.getStringByOrder(3), 1)).toEqual(21);
  });
});

const noteExpect: Record<keyof t.note, any> = {
  tone: expect.any(String),
  alterTone: expect.any(String),
  activeTone: expect.any(String),
  octaveOrder: expect.any(Number),
  index: expect.any(Number),
  is: expect.any(Function),
  getActiveTone: expect.any(Function),
  toString: expect.any(Function),
};
const octaveExpect: Record<keyof t.octave, any> = {
  nameRus: expect.any(String),
  sinceNumber: expect.any(Number),
  color: expect.any(String),
  index: expect.any(Number),
};

describe('guitar classic tuning', () => {
  test('has strings', () => {
    expect(tunings.classic.strings).toEqual(expect.arrayContaining([
      expect.objectContaining({
        note: noteExpect,
        octave: octaveExpect,
        order: expect.any(Number),
        notes: expect.any(Array),
      }),
    ]));
  });

  test('second string has notes', () => {
    expect(tunings.classic.strings[1].notes).toEqual(expect.arrayContaining([
      {
        ...noteExpect,
        octave: octaveExpect,
      },
    ]));
  });
});
