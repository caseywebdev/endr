import {
  Portal,
  Try,
  createContext,
  createRoot,
  memo,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'endr';

import useList from './use-list.js';

/** @import {Children} from 'endr' */

const { clearTimeout, document, setTimeout, setInterval } = globalThis;

const resolution = 10;

/** @param {{ children: Children }} props */
const Flaky = ({ children }) => {
  if (Math.random() < 0.005) throw new Error('red');

  useEffect(() => {
    if (Math.random() < 0.005) throw new Error('blue');
    return () => {
      if (Math.random() < 0.5) throw new Error('yellow');
    };
  });

  return children;
};

const Portaled = memo(() => (
  <div
    style={{ background: '#fff9', borderRadius: '0.25rem', padding: '1rem' }}
  >
    Portal: {useContext(Context)}
  </div>
));

/** @param {{ x: number; y: number }} props */
const Tile = memo(({ x, y }) => {
  const now = useContext(Context) ?? 0;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const activeColor = useMemo(
    () =>
      `rgb(${128 + ((x - y) / resolution) * 128}, ${128 + ((y - x) / resolution) * 128}, ${
        ((x + y) / resolution / 2) * 256
      })`
  );
  const timeoutRef = useRef(/** @type {number | undefined} */ (undefined));
  const [color, setColor] = useState('black');

  return (
    <Try
      catch={
        /** @param {Error} er */ er => {
          setColor(er.message);
          clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(() => setColor('black'), 5000);
        }
      }
    >
      <div
        onpointermove={() => {
          setColor(activeColor);
          clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(() => setColor('black'), 5000);
        }}
        ontouchmove={ev => ev.preventDefault()}
        style={{
          alignItems: 'center',
          backgroundColor: color,
          borderRadius: '0.25rem',
          display: 'flex',
          fontSize: '0.75rem',
          justifyContent: 'center',
          minWidth: '0',
          overflow: 'hidden',
          padding: '0.25rem',
          textAlign: 'center',
          transition: color === 'black' ? 'all 5s' : ''
        }}
      >
        {color === 'red' ? (
          'Fake Render Error'
        ) : color === 'blue' ? (
          'Fake After Effect Error'
        ) : color === 'yellow' ? (
          'Fake Before Effect Error'
        ) : (
          <Flaky>{now}</Flaky>
        )}
        {x === 0 && y === 0 && !!(now % 5) && (
          <Portal
            to={/** @type {Element} */ (document.getElementById('portal'))}
          >
            <Portaled />
          </Portal>
        )}
      </div>
    </Try>
  );
});

const Context = /** @type {typeof createContext<number>} */ (createContext)();

const Root = () => {
  const [now, setNow] = useState(new Date().getSeconds());

  useEffect(() => {
    setInterval(() => setNow(new Date().getSeconds()), 1000);
  }, []);

  const containerRef = useRef(/** @type {HTMLDivElement | null} */ (null));
  const { start, end, before, after } = useList({
    containerRef,
    length: 10000
  });

  return (
    <Context value={now}>
      <div
        style={{
          cursor: 'crosshair',
          display: 'grid',
          gap: '0.25rem',
          gridTemplate: `repeat(${resolution}, 1fr) / repeat(${resolution}, 1fr)`,
          height: '100%',
          padding: '0.25rem'
        }}
      >
        {Array.from({ length: resolution * resolution }, (_, i) => (
          <Tile key={i} x={i % resolution} y={Math.floor(i / resolution)} />
        ))}
      </div>
      <div
        ref={containerRef}
        style={{
          color: 'white',
          paddingTop: `${before}px`,
          paddingBottom: `${after}px`
        }}
      >
        {Array.from({ length: end - start }, (_, i) => (
          <div
            key={i + start}
            style={{ borderTop: '1px solid #222', padding: '1rem' }}
          >
            Item {i + start + 1}
          </div>
        ))}
      </div>
      <button
        onclick={root.unmount}
        style={{ position: 'fixed', bottom: '1rem', right: '1rem' }}
      >
        Unmount
      </button>
    </Context>
  );
};

const root = createRoot(
  /** @type {Element} */ (document.getElementById('root'))
);
root.render(<Root />);
