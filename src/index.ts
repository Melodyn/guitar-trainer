import type * as t from './types';
import {
  allNotesCount,
  tunings,
} from './constants';

const run = (): void => {
  const qs = <E extends Element>(
    selector: Parameters<typeof document.querySelector>[0],
    on: Element | Document = document,
  ): E => {
    const element = on.querySelector<E>(selector);
    if (element !== null) return element;
    throw new Error(`Not found element by selecotr "${selector}"`);
  };
  const selectTone = (note: t.gnote): t.alterToneName => note.tone.length > 1 ? '' : note.tone;
  // const qsa = (selector: string, on = document): NodeListOf<Element> => on.querySelectorAll(selector);

  const prepareArray = (plus: number = 0): number[] => Array(allNotesCount + 1).fill(0).map((_, i) => i + plus);

  const createElement = <E extends HTMLElement>(
    tagName: Parameters<typeof document.createElement>[0],
    params: {
      textContent: Node['textContent']
    } = { textContent: '' },
  ): E => {
    const element = document.createElement(tagName);
    element.textContent = params.textContent;
    return element as E;
  };

  const preaparedValues = {
    head: prepareArray(),
    body: tunings.classic.notes.map((note) => note.notes),
    foot: prepareArray(allNotesCount),
  };
  const elTable = qs<HTMLTableElement>('table');

  Object.entries(preaparedValues).forEach(([name, values]) => {
    const makeRows = (elContainer: Element, items: number[] | t.gnote[], order?: number): void => {
      const elRow = createElement<HTMLTableRowElement>('tr');
      let firstColumnTextContent = '';
      if (order !== undefined) {
        firstColumnTextContent = order?.toString();
      }
      const firstColumn = createElement<HTMLTableCellElement>('td', { textContent: firstColumnTextContent });
      elRow.append(firstColumn);
      items.forEach((value) => {
        const col = createElement<HTMLTableCellElement>('td', {
          textContent: (typeof value === 'number') ? value.toString() : selectTone(value),
        });
        elRow.append(col);
      });
      elContainer.append(elRow);
    };

    if (name === 'head') {
      makeRows(qs('thead', elTable), values as number[]);
    } else if (name === 'foot') {
      makeRows(qs('tfoot', elTable), values as number[]);
    } else {
      const elTableBody = qs('tbody', elTable);
      values.forEach((notes, index) => {
        makeRows(elTableBody, notes as t.gnote[], index + 1);
      });
    }
  });
};

document.addEventListener('DOMContentLoaded', run);
