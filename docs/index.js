/** @import {Children} from 'endr' */

import {
  Portal,
  Try,
  createContext,
  createRender,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'endr';

import { getRandomWord } from './get-random-word.js';
import { useList } from './use-list.js';

const { clearTimeout, clearInterval, document, setTimeout, setInterval } =
  globalThis;

const resolution = 10;

const numberFormatter = new Intl.NumberFormat();

/** @param {number} n */
const getColor = n =>
  `rgb(${32 + ((n * 12) % 128)}, ${32 + ((n * 23) % 128)}, ${32 + ((n * 56) % 128)})`;

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
        catch={er => {
          setColor(/** @type {Error} */ (er).message);
          clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(() => setColor('black'), 5000);
        }}
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
  /** @param {{ item: { color: string; name: string; words: string[] } }} props */
  ({ item: { color, name, words } }) => (
    <div
      style={{
        borderTop: '10px solid #000',
        borderRight: '10px solid #000',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        aspectRatio: '1',
        backgroundColor: color
      }}
    >
      <div style={{ fontWeight: 'bold' }}>{name}</div>
      {words.map((word, i) => (
        <div key={i}>{word}</div>
      ))}
    </div>
  )
);

const Context = createContext(0);

const length = 10000;

const Root = () => {
  const [now, setNow] = useState(new Date().getSeconds());
  const [inputs, setInputs] = useState(Array.from({ length: 9 }, (_, i) => i));
  const [query, setQuery] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(new Date().getSeconds());
      setInputs(inputs => inputs.toSorted(() => Math.random() - 0.5));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const allItems = useMemo(() =>
    Array.from({ length }, (_, i) => ({
      color: getColor(i),
      id: i + 1,
      name: `Item ${numberFormatter.format(i + 1)}`,
      words: Array.from({ length: 3 }, getRandomWord)
    }))
  );

  const items = useMemo(() => {
    if (!query) return allItems;

    const queryWords = query.toLowerCase().split(/\s+/);
    return allItems.filter(item =>
      queryWords.every(queryWord =>
        item.words.some(word => word.includes(queryWord))
      )
    );
  }, [query]);

  const containerRef = useRef(/** @type {HTMLDivElement | null} */ (null));
  const { start, end, before, after } = useList({
    containerRef,
    length: items.length
  });

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
      <div
        style={{
          boxSizing: 'border-box',
          cursor: 'crosshair',
          display: 'grid',
          gap: '0.25rem',
          gridTemplate: `repeat(3, 1fr) / repeat(3, 1fr)`,
          padding: '0.25rem'
        }}
      >
        {inputs.map(input => (
          <div
            key={input}
            style={{
              background: getColor(input),
              borderRadius: '0.25rem',
              color: 'white',
              display: 'flex',
              padding: '0.5rem'
            }}
          >
            <div style={{ flex: '1', padding: '0.5rem' }}>
              Input {input + 1}
            </div>
            <input
              style={{
                display: 'block',
                padding: '0.5rem',
                flex: '1',
                borderRadius: '0.25rem',
                border: '0'
              }}
            />
          </div>
        ))}
      </div>
      <div style={{ padding: '1rem' }}>
        <div
          style={{
            marginBottom: '0.5rem',
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ color: 'white', fontWeight: 'bold' }}>
            {numberFormatter.format(items.length)} Items
          </div>
          <input
            placeholder='Search'
            type='search'
            value={query}
            oninput={e =>
              setQuery(/** @type {HTMLInputElement} */ (e.target).value)
            }
            style={{ borderRadius: '0.25rem', border: '0', padding: '0.5rem' }}
          />
        </div>
        <div style={{ minHeight: '100vh' }}>
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
            {Array.from({ length: end - start }, (_, i) => {
              const item = items[start + i];
              return <ListItem key={item.id} item={item} />;
            })}
          </div>
        </div>
      </div>
      <button
        onclick={() =>
          render(
            <div style={{ padding: '1rem', textAlign: 'center' }}>
              <div style={{ color: 'white', marginBottom: '1rem' }}>
                Unmounted!
              </div>
              <button onclick={() => render(<Root />)}>Remount</button>
            </div>
          )
        }
        style={{ position: 'fixed', bottom: '1rem', right: '1rem' }}
      >
        Unmount
      </button>
    </Context>
  );
};

const render = createRender(
  /** @type {Element} */ (document.getElementById('root')).attachShadow({
    mode: 'open'
  })
);
render(<Root />);
