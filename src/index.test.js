import { jsx, render, useCallback, useEffect, useState } from './index.js';

const { setTimeout } = globalThis;

const Random = () => {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (n === 1) setTimeout(() => setN(0), 5000);
  }, [n]);

  return jsx('div', {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    onmousemove: useCallback(() => setN(1)),
    style: {
      display: 'inline-block',
      cursor: 'crosshair',
      width: '30px',
      height: '30px',
      transition: n < 1 ? 'all 5s' : '',
      backgroundColor: 'blue',
      textAlign: 'center',
      verticalAlign: 'bottom',
      opacity: `${n * 100}%`
    }
  });
};

render(
  jsx('div', {
    style: { background: 'black' },
    children: Array.from({ length: 10000 }, () => jsx(Random))
  }),
  /** @type {HTMLDivElement} */ (
    globalThis.window.document.getElementById('root')
  )
);