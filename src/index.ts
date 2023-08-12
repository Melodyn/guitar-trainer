import cn from 'classnames';
import type * as t from './types';
import {
  allNotes,
  allNotesCount,
  scales,
  tunings,
} from './constants';
import { buildChord, buildGamma } from './functions';
import { find } from './utils';

type qsFirstParameter = Parameters<typeof document.querySelector>[0];
type creParams = {
  textContent?: Node['textContent']
  classList?: string[]
  className?: string
};

const qs = <E extends Element>(
  selector: qsFirstParameter,
  on: Element | Document = document,
): E => {
  const element = on.querySelector<E>(selector);
  if (element !== null) return element;
  throw new Error(`Not found element by selector "${selector}"`);
};

const prepareArray = (length = allNotesCount, plus: number = 0): number[] => Array(length + 1).fill(0).map((_, i) => i + plus);

const createElement = <E extends HTMLElement>(
  tagName: qsFirstParameter,
  params: creParams = {},
): E => {
  const mergedParams: Required<creParams> = {
    textContent: '',
    classList: [],
    className: '',
    ...params,
  };
  const element = document.createElement(tagName);
  element.textContent = mergedParams.textContent;
  element.classList.add(...mergedParams.classList);
  if (mergedParams.className.length > 0) {
    element.className = mergedParams.className;
  }
  return <E>element;
};

const bgcolors = [
  '',
  '',
  'success',
  'warning',
  'primary',
  'danger',
];

const makeRowEl = (
  items: number[] | t.gnote[],
  params: { type: 'jopa' | 'lala', order: number } = { type: 'jopa', order: 0 },
): HTMLTableRowElement => {
  const elRow = createElement<HTMLTableRowElement>('tr');

  let firstColumnTextContent = '';
  if (params.type === 'lala') {
    firstColumnTextContent = params.order.toString();
  }
  const firstColumn = createElement<HTMLTableCellElement>('td', {
    textContent: firstColumnTextContent,
    classList: ['p-0', 'text-secondary'],
  });
  elRow.append(firstColumn);

  items.forEach((value, i) => {
    const bgColorNumber = (typeof value === 'number') ? 0 : value.octave.sinceNumber;
    const col = createElement<HTMLTableCellElement>('td', {
      textContent: value.toString(),
      className: cn('p-0', {
        'text-secondary': (params.type === 'jopa') || (params.type === 'lala' && i === 0),
        [`bg-${bgcolors[bgColorNumber]} bg-opacity-25`]: (bgColorNumber > 0) && (i > 0),
        'fw-medium': (bgColorNumber > 0) && (i > 0),
      }),
    });
    elRow.append(col);
  });

  return elRow;
};

const renderNotes = (elTableBody: HTMLTableSectionElement, strings: t.gstring[]): void => {
  elTableBody.innerHTML = '';
  strings.forEach((string) => {
    const elTableBodyRow = makeRowEl(string.notes, {
      type: 'lala',
      order: string.order,
    });
    elTableBody.append(elTableBodyRow);
  });
};

const buildStrings = (fromNote: t.note, scale: t.scale, isChord: boolean = false): t.gstring[] => {
  const gamma: t.gamma = buildGamma(fromNote, scale);
  const repo = isChord ? buildChord(gamma) : gamma;

  const strings = tunings.classic.strings.map((string): t.gstring => {
    const notes = string.notes.map((stringNote): t.gnote => {
      const repoNote = repo.notes.find((note) => note.is(<t.toneName>stringNote[stringNote.activeTone]));
      return (repoNote === undefined)
        ? <t.gnote>{ toString: () => '', octave: { sinceNumber: 0 } }
        : { ...repoNote, octave: stringNote.octave };
    });

    return {
      ...string,
      note: notes[0],
      notes,
    };
  });

  return strings;
};

const run = (): void => {
  const elTable = qs<HTMLTableElement>('table');
  const elTableHead = qs<HTMLTableSectionElement>('thead', elTable);
  const elTableBody = qs<HTMLTableSectionElement>('tbody', elTable);
  const elTableFoot = qs<HTMLTableSectionElement>('tfoot', elTable);
  const elTableHeadRow = makeRowEl(prepareArray());
  const elTableFootRow = makeRowEl(prepareArray(allNotesCount));
  elTableHead.append(elTableHeadRow);
  elTableFoot.append(elTableFootRow);

  const note = find(allNotes, ({ tone }) => tone === 'C');
  const strings = buildStrings(note, scales.major, false);
  renderNotes(elTableBody, strings);
};

document.addEventListener('DOMContentLoaded', run);
