/** @import {Children} from 'endr' */

import {
  Portal,
  Try,
  createContext,
  createRoot,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'endr';

import useList from './use-list.js';

const { clearTimeout, document, setTimeout, setInterval } = globalThis;

const resolution = 10;

/** @param {{ children: Children }} props */
const Flaky = ({ children }) => {
  if (Math.random() < 0.005) throw new Error('red');

  useEffect(() => {
    if (Math.random() < 0.005) throw new Error('blue');
    return () => {
      if (Math.random() < 0.005) throw new Error('yellow');
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

const Tile = memo(
  /** @param {{ x: number; y: number }} props */
  ({ x, y }) => {
    const now = useContext(Context);

    const activeColor = useMemo(
      () =>
        `rgb(${128 + ((x - y) / resolution) * 128}, ${128 + ((y - x) / resolution) * 128}, ${
          ((x + y) / resolution / 2) * 256
        })`
    );
    const timeoutRef = useRef(/** @type {number | undefined} */ (undefined));
    const [color, setColor] = useState('black');

    const activate = useCallback(() => {
      setColor(activeColor);
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setColor('black'), 5000);
    });

    const selectLength = 1 + Math.floor(Math.random() * 10);

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
          onpointerdown={activate}
          onpointermove={activate}
          style={{
            alignItems: 'center',
            backgroundColor: color,
            borderRadius: '0.25rem',
            display: 'flex',
            fontSize: '0.75rem',
            flexDirection: 'column',
            gap: '0.25rem',
            justifyContent: 'center',
            minWidth: '0',
            overflow: 'hidden',
            padding: '0.25rem',
            textAlign: 'center',
            transition: color === 'black' ? 'all 5s' : ''
          }}
        >
          <select
            value={(Math.floor(Math.random() * selectLength) + 1).toString()}
          >
            {Array.from({ length: selectLength }, (_, i) => (
              <option key={i} value={(i + 1).toString()}>
                {i + 1}
              </option>
            ))}
          </select>
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
  }
);

const ListItem = memo(
  /** @param {{ index: number }} props */
  ({ index }) => (
    <div
      key={index}
      style={{
        borderTop: '10px solid #000',
        borderRight: '10px solid #000',
        padding: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        aspectRatio: '1',
        backgroundColor: `rgb(${(index * 13) % 128}, ${(index * 19) % 128}, ${(index * 23) % 128})`
      }}
    >
      Item {index + 1}
    </div>
  )
);

const Context = createContext(0);

const length = 10000;

const Root = () => {
  const [now, setNow] = useState(new Date().getSeconds());

  useEffect(() => {
    setInterval(() => setNow(new Date().getSeconds()), 1000);
  }, []);

  const containerRef = useRef(/** @type {HTMLDivElement | null} */ (null));
  const { start, end, before, after } = useList({ containerRef, length });

  return (
    <Context value={now}>
      <div
        style={{
          boxSizing: 'border-box',
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
      <div style={{ padding: '1rem' }}>
        <div
          style={{ color: '#fff', fontWeight: 'bold', marginBottom: '0.5rem' }}
        >
          {length} Items
        </div>
        <div
          data-list-container='true'
          ref={containerRef}
          style={{
            color: 'white',
            paddingTop: `${before}px`,
            paddingBottom: `${after}px`,
            display: 'grid',
            gridTemplateColumns: `repeat(auto-fill, minmax(min(200px, 50%), 1fr))`,
            borderLeft: '10px solid #000',
            borderBottom: '10px solid #000'
          }}
        >
          {Array.from({ length: end - start }, (_, i) => (
            <ListItem key={start + i} index={start + i} />
          ))}
        </div>
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
  /** @type {Element} */ (document.getElementById('root')).attachShadow({
    mode: 'open'
  })
);
root.render(<Root />);
