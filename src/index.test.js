import {
  createContext,
  jsx,
  memo,
  render,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from './index.js';

const { clearTimeout, setTimeout, setInterval } = globalThis;

const resolution = 10;

/** @param {{ x: number; y: number }} props */
const Random = memo(({ x, y }) => {
  const now = useContext(Context);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const activeColor = useMemo(
    () =>
      `rgb(${128 + ((x - y) / resolution) * 128}, ${128 + ((y - x) / resolution) * 128}, ${
        ((x + y) / resolution / 2) * 256
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
      transition: color === 'black' ? 'all 5s' : '',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden'
    },
    children: now
  });
});

const Context = /** @type {typeof createContext<number>} */ (createContext)();

const Root = () => {
  const [now, setNow] = useState(new Date().getSeconds());

  useEffect(() => {
    setInterval(() => setNow(new Date().getSeconds()), 1000);
  });

  return jsx(Context, {
    value: now,
    children: jsx('div', {
      style: {
        cursor: 'crosshair',
        display: 'grid',
        gridTemplate: `repeat(${resolution}, 1fr) / repeat(${resolution}, 1fr)`,
        height: '100%'
      },
      children: Array.from({ length: resolution * resolution }, (_, i) =>
        jsx(Random, { x: i % resolution, y: Math.floor(i / resolution) })
      )
    })
  });
};

render(
  jsx(Root),
  /** @type {HTMLDivElement} */ (
    globalThis.window.document.getElementById('root')
  )
);
