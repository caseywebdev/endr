import {
  Portal,
  createContext,
  memo,
  render,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'endr';

const { clearTimeout, document, setTimeout, setInterval } = globalThis;

const resolution = 10;

/** @param {{ x: number; y: number }} props */
const Random = memo(({ x, y }) => {
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
    <>
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
        {now}
      </div>
      {x === 1 && y === 1 && !!(now % 5) && <Portaled />}
    </>
  );
});

const Portaled = () => {
  const now = useContext(Context);

  return (
    <Portal
      to={/** @type {HTMLDivElement} */ (document.getElementById('portal'))}
    >
      <div
        style={{
          background: '#fff9',
          borderRadius: '0.25rem',
          padding: '1rem'
        }}
      >
        Portal: {now}
      </div>
    </Portal>
  );
};

const Context = /** @type {typeof createContext<number>} */ (createContext)();

const Root = () => {
  const [now, setNow] = useState(new Date().getSeconds());

  useEffect(() => {
    setInterval(() => setNow(new Date().getSeconds()), 1000);
  });

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
          <Random key={i} x={i % resolution} y={Math.floor(i / resolution)} />
        ))}
      </div>
    </Context>
  );
};

render(
  <Root />,
  /** @type {HTMLDivElement} */ (document.getElementById('root'))
);
