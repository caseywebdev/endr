# Endr
An **En**gine for **D**OM **R**ecombobulation.

```jsx
import { createRoot, useState } from 'endr';

const Root = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onclick={() => setCount(count + 1)}>This button</button>{' '}
      has been clicked {count} {count === 1 ? 'time' : 'times'}
    </div>
  );
};

createRoot(document.body).render(<Root />);
```

# Why?
Endr takes the best parts of React and ditches the rest to result in a lean and
fast virtual DOM rendering library. React is a great tool but has acquired some
baggage over its long career that it must maintain for backwards compatibility.
Endr loses the baggage and keeps the modern API.

# Config
Use `jsxImportSource: 'endr'` in your `tsconfig.json` and JSX transpiler
  (`babel`, `esbuild`, etc) to get correct autocomplete and rendered output. If
  you forget to do this you'll see errors about `React` not being found.

# Differences from React
- There are no class components.
- There are no synthetic events.
- There is no property redirection.
  - All element properties should be passed as if you were setting them directly
    on the element. For example `onclick` instead of `onClick` and `ondblclick`
    instead of `onDoubleClick`.
- `ref` is not a special property on function components (it is passed through
  without something like `ForwardRef`)
- `createContext` returns the equivalent of a React `Context.Provider`
  component.
  - There is no `Context.Consumer` component. Access context values through
    `useContext(Context)`.
- `useContextProxy` can be used to create a `ContextProxy` component that will
  pass through the context of the caller to any child components of
  `ContextProxy`.
- `useCallback` does not take any arguments and will return a constant function
  that will call the last seen function passed to `useCallback`. This is by far
  the most useful case for memoizing functions. The much less common case of
  memoizing a callback that creates a new function when dependencies change can
  be achieved with `const sumAB = useMemo(() => () => a + b, [a, b])`
- `useMemo` can be called without a second argument to default to an empty
  dependency array.
- `useState` returns the most recently set value.
- `setState` will not queue a re-render when it is called during the render
  function.
- The `jsx: 'automatic'` setting for JSX transpilers is required if using JSX.
- There is no `useLayoutEffect`.
- `useEffect` is called immediately after the DOM is reconciled.
- Exceptions thrown during render can be caught by the nearest Try component.
  - ```js
    const MyComponent () => {
      const [error, setError] = useState(undefined);

      if (error) return `An error occurred! ${error}`;

      return (
        <Try catch={setError}>
          <AllMyChildren />
        </Try>
      );
    };
    ```
    can be used, for example, to show an error message whenever rendering
    `<AllMyChildren />` or any descendents throws an exception.
  - React's `Suspense` can be recreated with `Try` by awaiting all thrown
    promises, if desired.
- There is no `Portal` component. A portal in react is very similar to simply
creating a new root somewhere in the DOM. To avoid creating duplicate APIs for
achieving the same result, endr does not implement the portal component
directly. Here's a sample implementation of `Portal`
  ```js
  import { createRoot, useContextProxy } from 'endr';

  /** @param {{ children: Children; to: Element }} props */
  const Portal = ({ children, to }) => {
    const root = useMemo(() => createRoot(to), [to]);
    useEffect(() => root.unmount, [root]);
    const ContextProxy = useContextProxy();
    root.render(<ContextProxy>{children}</ContextProxy>);
  };
  ```
