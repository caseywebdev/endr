/**
 * Each scenario is a function `(endr) => string` that attaches a fresh
 * container to the live document, renders and re-renders using the given endr
 * module, and returns the rendered HTML for correctness comparison.
 */

const { document } = globalThis;

/** @returns {HTMLDivElement} */
const makeContainer = () => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  return container;
};

/**
 * @param {HTMLDivElement} container
 * @returns {string}
 */
const finish = container => {
  const html = container.innerHTML;
  container.remove();
  return html;
};

export const scenarios = {
  /** Initial render + repeated updates of a large keyed list. */
  'list-update (500 items)': endr => {
    const { jsx, createRender } = endr;
    const container = makeContainer();
    const render = createRender(container);
    const N = 500;
    const make = counter =>
      Array.from({ length: N }, (_, i) =>
        jsx(
          'li',
          {
            children: [
              jsx('span', { children: String(i) }),
              jsx('em', { children: String(i * counter) })
            ]
          },
          i
        )
      );
    render(jsx('ul', { children: make(1) }));
    for (let counter = 2; counter <= 10; counter++) {
      render(jsx('ul', { children: make(counter) }));
    }
    return finish(container);
  },

  /**
   * Deeply nested single-child tree. This is the path the workspace change
   * optimizes: no Map allocation per node when a vnode has exactly one child.
   */
  'single-child chain (depth 30)': endr => {
    const { jsx, createRender } = endr;
    const container = makeContainer();
    const render = createRender(container);
    const make = counter => {
      let tree = jsx('i', { children: String(counter) });
      for (let i = 0; i < 30; i++) tree = jsx('div', { children: tree });
      return tree;
    };
    render(make(1));
    for (let counter = 2; counter <= 10; counter++) render(make(counter));
    return finish(container);
  },

  /** Keyed reordering of a large list (heavily exercises Map diffing). */
  'list-reorder (300 items)': endr => {
    const { jsx, createRender } = endr;
    const container = makeContainer();
    const render = createRender(container);
    const N = 300;
    const items = Array.from({ length: N }, (_, i) => i);
    const make = () =>
      jsx('div', {
        children: items.map(i => jsx('div', { children: String(i) }, i))
      });
    render(make());
    for (let round = 0; round < 10; round++) {
      items.reverse();
      render(make());
    }
    return finish(container);
  },

  /** A single child that is itself a wide list of unkeyed siblings. */
  'fragment (200 siblings)': endr => {
    const { jsx, createRender, Fragment } = endr;
    const container = makeContainer();
    const render = createRender(container);
    const N = 200;
    const make = counter =>
      Array.from({ length: N }, (_, i) =>
        jsx('p', { children: String(i + counter) })
      );
    render(jsx(Fragment, { children: make(0) }));
    for (let counter = 1; counter <= 10; counter++) {
      render(jsx(Fragment, { children: make(counter) }));
    }
    return finish(container);
  },

  /** Mixed: single-child wrapper chain above a keyed list. */
  'nested list (10 rows x 50 cols)': endr => {
    const { jsx, createRender } = endr;
    const container = makeContainer();
    const render = createRender(container);
    const ROWS = 10;
    const COLS = 50;
    const make = counter => {
      const rows = [];
      for (let r = 0; r < ROWS; r++) {
        const cells = [];
        for (let c = 0; c < COLS; c++) {
          cells.push(jsx('td', { children: String(r * counter + c) }, c));
        }
        rows.push(jsx('tr', { children: cells }, r));
      }
      return rows;
    };
    const table = rows => jsx('table', { children: rows });
    render(table(make(1)));
    for (let counter = 2; counter <= 10; counter++) {
      render(table(make(counter)));
    }
    return finish(container);
  },

  /** Repeatedly insert at the start and remove from the end of a keyed list. */
  'list-insert-remove (200 items)': endr => {
    const { jsx, createRender } = endr;
    const container = makeContainer();
    const render = createRender(container);
    const items = Array.from({ length: 200 }, (_, i) => i);
    const make = () =>
      jsx('ul', {
        children: items.map(i =>
          jsx('li', { children: [jsx('span', { children: String(i) })] }, i)
        )
      });
    render(make());
    for (let round = 0; round < 10; round++) {
      items.splice(0, 20);
      const next = [...items];
      for (let i = 0; i < 20; i++) next.unshift(i);
      items.length = 0;
      items.push(...next);
      render(make());
    }
    return finish(container);
  },

  /** Every item swaps between two different element trees each round. */
  'conditional swap (100 items)': endr => {
    const { jsx, createRender } = endr;
    const container = makeContainer();
    const render = createRender(container);
    const N = 100;
    const make = parity =>
      Array.from({ length: N }, (_, i) =>
        parity === i % 2
          ? jsx('b', { children: `odd ${i}` }, i)
          : jsx('i', { children: `even ${i}` }, i)
      );
    render(jsx('div', { children: make(0) }));
    for (let round = 1; round <= 10; round++) {
      render(jsx('div', { children: make(round % 2) }));
    }
    return finish(container);
  },

  /** Sibling groups swap positions without keys (DOM moves). */
  'sibling swap (100 items)': endr => {
    const { jsx, createRender } = endr;
    const container = makeContainer();
    const render = createRender(container);
    const half = Array.from({ length: 50 }, (_, i) =>
      jsx('div', { children: String(i) })
    );
    const make = flipped =>
      jsx('div', { children: flipped ? [...half].reverse() : [...half] });
    render(make(false));
    for (let round = 1; round <= 10; round++) render(make(round % 2 === 1));
    return finish(container);
  },

  /** Many components whose effects run and clean up on every update. */
  'effects+cleanup (100)': endr => {
    const { jsx, createRender, useEffect } = endr;
    const container = makeContainer();
    const render = createRender(container);
    const Item = ({ value }) => {
      useEffect(() => {
        return () => {};
      }, [value]);
      return jsx('div', { children: String(value) });
    };
    const make = counter =>
      Array.from({ length: 100 }, (_, i) => jsx(Item, { value: i + counter }));
    render(jsx('div', { children: make(1) }));
    for (let counter = 2; counter <= 10; counter++) {
      render(jsx('div', { children: make(counter) }));
    }
    return finish(container);
  },

  /** Context value change propagating to many consumers. */
  'context (100 consumers)': endr => {
    const { jsx, createRender, createContext, useContext } = endr;
    const container = makeContainer();
    const render = createRender(container);
    const Counter = createContext(0);
    const Consumer = () =>
      jsx('span', { children: String(useContext(Counter)) });
    const make = value =>
      jsx(Counter, {
        value,
        children: Array.from({ length: 100 }, (_, i) => jsx(Consumer, {}, i))
      });
    render(make(1));
    for (let value = 2; value <= 10; value++) render(make(value));
    return finish(container);
  },

  /** Memoized rows with stable props vs a changing header (memo skip path). */
  'memoized rows (10 x 20)': endr => {
    const { jsx, createRender, memo } = endr;
    const container = makeContainer();
    const render = createRender(container);
    const Row = memo(
      ({ id }) => {
        const cells = Array.from({ length: 20 }, (_, c) =>
          jsx('td', { children: String(id * 100 + c) }, c)
        );
        return jsx('tr', { children: cells }, id);
      },
      (prev, next) => prev.id === next.id
    );
    const stableRows = Array.from({ length: 10 }, (_, i) => ({ id: i }));
    const make = header =>
      jsx('table', {
        children: [
          jsx(
            'tr',
            { children: jsx('th', { children: String(header) }) },
            'header'
          ),
          ...stableRows.map(props => jsx(Row, props))
        ]
      });
    render(make(1));
    for (let header = 2; header <= 10; header++) render(make(header));
    return finish(container);
  },

  /** Style-object updates on many elements (CSSStyleDeclaration diffing). */
  'style-object (200)': endr => {
    const { jsx, createRender } = endr;
    const container = makeContainer();
    const render = createRender(container);
    const N = 200;
    const make = counter =>
      Array.from({ length: N }, (_, i) =>
        jsx('div', {
          style: {
            color: `rgb(${i % 256}, ${counter}, ${i % 10})`,
            width: `${10 + counter}px`,
            display: counter % 2 ? 'block' : 'flex'
          },
          children: String(i)
        })
      );
    render(jsx('div', { children: make(0) }));
    for (let counter = 1; counter <= 10; counter++) {
      render(jsx('div', { children: make(counter) }));
    }
    return finish(container);
  },

  /** Many plain text nodes updating (nodeValue fast path). */
  'text nodes (200)': endr => {
    const { jsx, createRender, Fragment } = endr;
    const container = makeContainer();
    const render = createRender(container);
    const N = 200;
    const make = counter =>
      Array.from({ length: N }, (_, i) => `item ${i}:${counter}`);
    render(jsx(Fragment, { children: make(1) }));
    for (let counter = 2; counter <= 10; counter++) {
      render(jsx(Fragment, { children: make(counter) }));
    }
    return finish(container);
  }
};
