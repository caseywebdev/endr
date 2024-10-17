import {
  Try,
  createContext,
  createRoot,
  memo,
  useContext,
  useContextProxy,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'endr';

/** @import {Children} from 'endr' */

const { clearTimeout, document, setTimeout, setInterval } = globalThis;

const resolution = 10;

/** @param {{ children: Children }} props */
const Flaky = ({ children }) => {
  if (Math.random() < 0.01) throw new Error('red');

  useEffect(() => {
    if (Math.random() < 0.01) throw new Error('blue');
    return () => {
      if (Math.random() < 0.01) throw new Error('yellow');
    };
  });

  return children;
};

const PortalNow = memo(() => (
  <div
    style={{ background: '#fff9', borderRadius: '0.25rem', padding: '1rem' }}
  >
    Portal: {useContext(Context)}
  </div>
));

/** @param {{ children: Children; to: Element }} props */
const Portal = ({ children, to }) => {
  const root = useMemo(() => createRoot(to), [to]);
  useEffect(() => root.unmount, [root]);
  root.render(useContextProxy(children));
};

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
          backgroundColor: color,
          transition: color === 'black' ? 'all 5s' : '',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden'
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
            <PortalNow />
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

  return (
    <Context value={now}>
      <div
        style={{
          cursor: 'crosshair',
          display: 'grid',
          gridTemplate: `repeat(${resolution}, 1fr) / repeat(${resolution}, 1fr)`,
          height: '100%'
        }}
      >
        {Array.from({ length: resolution * resolution }, (_, i) => (
          <Tile key={i} x={i % resolution} y={Math.floor(i / resolution)} />
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
