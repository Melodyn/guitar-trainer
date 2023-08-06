import { gammaSteps, scales, tunings } from '../src/constants';
import { buildGamma, buildChord, calcFret } from '../src/functions';

describe('major', () => {
  test('buildGamma Db', () => {
    expect(buildGamma('Db', gammaSteps.major)).toEqual([
      'Eb', 'F', 'Gb', 'Ab', 'Bb', 'C', 'Db'
    ]);
  });

  test('buildChord Db', () => {
    expect(buildChord('Db', scales.major)).toEqual([
      'Db', 'F', 'Ab'
    ]);
  });

  test('calcFret Db', () => {
    expect(calcFret('Db', tunings.classic.getStringByOrder(6))).toEqual(9);
  });

  // B

  test('buildGamma B', () => {
    expect(buildGamma('B', gammaSteps.major)).toEqual([
      'C#', 'D#', 'E', 'F#', 'G#', 'A#', 'B'
    ]);
  });

  test('buildChord B', () => {
    expect(buildChord('B', scales.major)).toEqual([
      'B', 'D#', 'F#'
    ]);
  });

  test('calcFret B', () => {
    expect(calcFret('B', tunings.classic.getStringByOrder(2))).toEqual(0);
  });
});

describe('minor', () => {
  test('buildGamma G', () => {
    expect(buildGamma('G', gammaSteps.minor)).toEqual([
      'A', 'Bb', 'C', 'D', 'Eb', 'F', 'G'
    ]);
  });

  test('buildChord G', () => {
    expect(buildChord('G', scales.minor)).toEqual([
      'G', 'C', 'D'
    ]);
  });

  test('calcFret G', () => {
    expect(calcFret('G', tunings.classic.getStringByOrder(5))).toEqual(10);
  });

  // E

  test('buildGamma E', () => {
    expect(buildGamma('E', gammaSteps.minor)).toEqual([
      'F#', 'G', 'A', 'B', 'C', 'D', 'E'
    ]);
  });

  test('buildChord E', () => {
    expect(buildChord('E', scales.minor)).toEqual([
      'E', 'A', 'B'
    ]);
  });

  test('calcFret E', () => {
    expect(calcFret('E', tunings.classic.getStringByOrder(3))).toEqual(9);
  });
});

const noteExpect = {
  tone: expect.any(String),
  alterTone: expect.any(String),
  octaveOrder: expect.any(Number),
  index: expect.any(Number),
  is: expect.any(Function),
  getTone: expect.any(Function)
};
const octaveExpect = {
  nameRus: expect.any(String),
  sinceNumber: expect.any(Number),
  color: expect.any(String),
  index: expect.any(Number)
};

describe('guitar classic tuning', () => {
  test('has strings', () => {
    expect(tunings.classic.notes).toEqual(expect.arrayContaining([
      {
        note: noteExpect,
        octave: octaveExpect,
        order: expect.any(Number),
        notes: expect.any(Array)
      }
    ]));
  });

  test('second string has notes', () => {
    expect(tunings.classic.notes[1].notes).toEqual(expect.arrayContaining([
      {
        ...noteExpect,
        octave: octaveExpect
      }
    ]));
  });
});
