import { jsx, render, useCallback, useRef, useState } from './index.js';

const { clearTimeout, setTimeout } = globalThis;

const resolution = 100;

const Random = () => {
  const timeoutRef = useRef(/** @type {number | undefined} */ (undefined));
  const [color, setColor] = useState('black');

  return jsx('div', {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    onmousemove: useCallback(() => {
      if (color === 'black') {
        setColor(
          `rgb(${Array.from({ length: 3 }, () => Math.floor(Math.random() * 256)).join(',')})`
        );
      }
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setColor('black'), 5000);
    }),
    style: {
      backgroundColor: color,
      transition: color === 'black' ? 'all 5s' : ''
    }
  });
};

render(
  jsx('div', {
    style: {
      cursor: 'crosshair',
      display: 'grid',
      gridTemplate: `repeat(${resolution}, 1fr) / repeat(${resolution}, 1fr)`,
      height: '100%'
    },
    children: Array.from({ length: resolution * resolution }, () => jsx(Random))
  }),
  /** @type {HTMLDivElement} */ (
    globalThis.window.document.getElementById('root')
  )
);
