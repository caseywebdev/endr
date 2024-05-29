import {
  jsx,
  render,
  useCallback,
  useMemo,
  useRef,
  useState
} from './index.js';

const { clearTimeout, setTimeout } = globalThis;

const resolution = 10;

/** @param {{ x: number; y: number }} props */
const Random = ({ x, y }) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const activeColor = useMemo(
    () =>
      `rgb(${128 + (Math.ceil(x - y) / resolution) * 127}, ${128 + (Math.ceil(y - x) / resolution) * 127}, ${
        128 + ((x + y) / resolution / 2) * 127
      })`
  );
  const timeoutRef = useRef(/** @type {number | undefined} */ (undefined));
  const [color, setColor] = useState('black');

  return jsx('div', {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    onmousemove: useCallback(() => {
      setColor(activeColor);
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
    children: Array.from({ length: resolution * resolution }, (_, i) =>
      jsx(Random, { x: i % resolution, y: Math.floor(i / resolution) })
    )
  }),
  /** @type {HTMLDivElement} */ (
    globalThis.window.document.getElementById('root')
  )
);
