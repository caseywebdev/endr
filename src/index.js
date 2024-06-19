const { CSSStyleDeclaration, document, queueMicrotask, Text } = globalThis;

/** @typedef {Def | string | number | false | null | undefined} Child */

/** @typedef {Child | Child[]} Children */

/** @typedef {(props: any) => Children} FC */

/** @typedef {keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap} TagName */

/** @typedef {TagName | FC} Type */

/**
 * @template [T=unknown] Default is `unknown`
 * @typedef {{
 *   children?: Children;
 *   ref?: Ref<T | null>;
 *   style?: Partial<CSSStyleDeclaration>;
 * }} SharedElementProps
 */

/**
 * @template {HTMLElement} T
 * @typedef {SharedElementProps<T> & {
 *   [key in keyof T]?: key extends keyof SharedElementProps<T>
 *     ? SharedElementProps<T>[key]
 *     : T[key];
 * } & { [key: `data-${string}`]: any }} HTMLElementProps
 */

/**
 * @template {SVGElement} T
 * @typedef {SharedElementProps<T> & {
 *   [key in keyof T]?: key extends keyof SharedElementProps<T>
 *     ? SharedElementProps<T>[key]
 *     : (() => any) extends T[key]
 *       ? T[key]
 *       : any;
 * } & { [key: string]: any }} SVGElementProps
 */

/** @typedef {SharedElementProps & { [key: string]: unknown }} UnknownElementProps */

/**
 * @template [T=unknown] Default is `unknown`
 * @typedef {T extends FC
 *   ? Parameters<T>[0] extends undefined
 *     ? {}
 *     : Parameters<T>[0]
 *   : T extends keyof HTMLElementTagNameMap
 *     ? HTMLElementProps<HTMLElementTagNameMap[T]>
 *     : T extends keyof SVGElementTagNameMap
 *       ? SVGElementProps<SVGElementTagNameMap[T]>
 *       : UnknownElementProps} Props
 */

/** @typedef {string | number | boolean | undefined} Key */

/** @typedef {{ type: Type; props: Props; key: Key }} Def */

/**
 * @template T
 * @typedef {{ current: T }} Ref
 */

/** @typedef {(() => void | unknown) | void | undefined} BeforeEffect */

/** @typedef {() => BeforeEffect} AfterEffect */

/**
 * @typedef {{
 *   before: BeforeEffect;
 *   after: AfterEffect | undefined;
 *   deps: unknown[] | undefined;
 * }} Effect
 */

/**
 * @typedef {{
 *   contexts: Map<
 *     ReturnType<typeof createContext>,
 *     { vnodes: Set<Vnode>; value: unknown }
 *   > | null;
 *   child: Vnode | null;
 *   deleted: boolean;
 *   effects: Effect[] | null;
 *   key: Key;
 *   node: Element | Text | null;
 *   parent: Vnode | null;
 *   parentNode: Element | null;
 *   path: number[];
 *   prevSiblingNode: Element | Text | null;
 *   props: Props;
 *   queued: boolean;
 *   refs: Ref<unknown>[] | null;
 *   shouldUpdate: boolean | null;
 *   sibling: Vnode | null;
 *   type: Type;
 *   updated: boolean;
 * }} Vnode
 */

/**
 * @template {Type} T
 * @param {T} type
 * @param {Props<T>} props
 * @param {Key} [key]
 */
const jsx = (type, props = /** @type {Props<T>} */ (emptyProps), key) => ({
  type,
  props,
  key
});

const jsxs = jsx;

const jsxDEV = jsx;

const jsxsDEV = jsx;

const Fragment = /** @param {{ children?: Children }} props */ props =>
  props.children;

const createContext = () => {
  /** @param {{ value: unknown; children?: Children }} props */
  const Context = ({ value, children }) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const context = useMemo(() => {
      const context = { vnodes: /** @type {Set<Vnode>} */ (new Set()), value };
      const vnode = /** @type {Vnode} */ (currentVnode);
      vnode.contexts = new Map(vnode.contexts).set(Context, context);
      return context;
    });

    if (value !== context.value) {
      context.value = value;
      context.vnodes.forEach(vnode => {
        vnode.shouldUpdate = true;
      });
    }

    return children;
  };

  return Context;
};

/** @param {unknown} value */
const isEmpty = value => value == null || value === false || value === '';

const emptyProps = /** @type {const} */ ({});

const emptyType = /** @type {Type} */ ({});

const emptyDef = { type: emptyType, props: emptyProps, key: undefined };

const textType = /** @type {Type} */ ({});

const emptyDeps = /** @type {unknown[]} */ ([]);

const svgNs = 'http://www.w3.org/2000/svg';

/**
 * @param {Def} def
 * @param {Element} parentNode
 */
const createNode = (def, parentNode) => {
  const { type, props } = def;

  if (type === emptyType) return null;

  if (type === textType) {
    return document.createTextNode(
      /** @type {{ nodeValue: string }} */ (props).nodeValue
    );
  }

  const node = document.createElementNS(
    type === 'svg' ? svgNs : parentNode.namespaceURI,
    /** @type {string} */ (type)
  );
  updateNode(
    node,
    {},
    /** @type {Partial<Element & SharedElementProps>} */ (props)
  );
  return node;
};

/**
 * @param {Element} node
 * @param {keyof Element} key
 */
const isSimpleProperty = (node, key) =>
  key in node && (node[key] == null || typeof node[key] !== 'object');

/**
 * @param {CSSStyleDeclaration} style
 * @param {Partial<CSSStyleDeclaration>} prev
 * @param {Partial<CSSStyleDeclaration>} next
 */
const setStyle = (style, prev, next) => {
  if (prev) for (const key in prev) if (!(key in next)) style[key] = '';
  for (const key in next) style[key] = next[key] ?? '';
};

/**
 * @template {Element | Text} T
 * @param {T} node
 * @param {Partial<T & SharedElementProps>} prev
 * @param {Partial<T & SharedElementProps>} next
 */
const updateNode = (node, prev, next) => {
  if (node instanceof Text) {
    node.nodeValue = /** @type {string} */ (next.nodeValue);
    return;
  }

  for (const key in /** @type {T} */ (prev)) {
    if (key === 'children' || key in next) continue;

    if (key === 'ref') {
      if (prev.ref) prev.ref.current = null;
    } else if (node[key] instanceof CSSStyleDeclaration) {
      setStyle(
        /** @type {CSSStyleDeclaration} */ (node[key]),
        /** @type {CSSStyleDeclaration} */ (prev[key]),
        {}
      );
    } else if (isSimpleProperty(node, /** @type {keyof Element} */ (key))) {
      /** @type {{ [key: string]: unknown }} */ (/** @type {unknown} */ (node))[
        key
      ] = '';
    } else node.removeAttribute(key);
  }

  for (const key in /** @type {T} */ (next)) {
    if (key === 'children' || prev[key] === next[key]) continue;

    if (key === 'ref') {
      if (prev.ref) prev.ref.current = null;
      if (next.ref) next.ref.current = node;
    } else if (node[key] instanceof CSSStyleDeclaration) {
      setStyle(
        /** @type {CSSStyleDeclaration} */ (node[key]),
        /** @type {CSSStyleDeclaration} */ (prev[key]),
        /** @type {CSSStyleDeclaration} */ (next[key])
      );
    } else if (isSimpleProperty(node, /** @type {keyof Element} */ (key))) {
      /** @type {{ [key: string]: unknown }} */ (/** @type {unknown} */ (node))[
        key
      ] = next[key] ?? '';
    } else if (next[key] != null) {
      node.setAttribute(key, /** @type {string} */ (next[key]));
    } else node.removeAttribute(key);
  }
};

/** @param {Vnode} root */
const remove = root => {
  let vnode = root;
  /** @type {Element | Text | null} */
  let parentNode = null;
  while (true) {
    vnode.deleted = true;
    parentNode ??= vnode.node;
    if (vnode.child) vnode = vnode.child;
    else {
      while (true) {
        if (vnode.effects) {
          for (const effect of vnode.effects) {
            if (effect.before) {
              effect.before();
              effect.before = undefined;
            }
          }
        }

        if (parentNode && vnode.node === parentNode) {
          parentNode.remove();
          parentNode = null;
        }

        if (vnode === root) return;

        if (vnode.sibling) {
          vnode = vnode.sibling;
          break;
        }

        vnode = /** @type {Vnode} */ (vnode.parent);
      }
    }
  }
};

let currentVnode = /** @type {Vnode | null} */ (null);
let effectIndex = 0;
let refIndex = 0;

/**
 * @template T
 * @param {T} initial
 */
const useRef = initial => {
  const vnode = /** @type {Vnode} */ (currentVnode);
  vnode.refs ??= [];
  let ref = /** @type {undefined | Ref<T>} */ (vnode.refs[refIndex++]);
  if (!ref) {
    ref = { current: initial };
    vnode.refs.push(ref);
  }
  return ref;
};

/**
 * @param {AfterEffect} fn
 * @param {unknown[]} [deps]
 */
const useEffect = (fn, deps) => {
  const vnode = /** @type {Vnode} */ (currentVnode);
  vnode.effects ??= [];
  const effect = vnode.effects[effectIndex++];
  if (!effect) vnode.effects.push({ before: undefined, after: fn, deps });
  else if (!effect.deps || !deps || depsChanged(effect.deps, deps)) {
    effect.after = fn;
    effect.deps = deps;
  }
};

/**
 * @template T
 * @param {(...args: unknown[]) => T} fn
 * @param {unknown[]} deps
 */
const useMemo = (fn, deps = emptyDeps) => {
  const ref = useRef(
    /** @type {{ value: T; deps: unknown[] }} */ (/** @type {unknown} */ (null))
  );
  if (!ref.current) ref.current = { value: fn(), deps };
  else if (depsChanged(ref.current.deps, deps)) {
    ref.current.value = fn();
    ref.current.deps = deps;
  }
  return ref.current.value;
};

/**
 * @template T
 * @param {T} initial
 */
const useState = initial => {
  const vnode = /** @type {Vnode} */ (currentVnode);
  /** @type {[T, (next: T | ((current: T) => T)) => T]} */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const state = useMemo(() => [
    initial,
    next => {
      const value = next instanceof Function ? next(state[0]) : next;
      if (value === state[0]) return value;

      state[0] = value;
      if (currentVnode !== vnode) queueUpdate(vnode);
      return value;
    }
  ]);
  return state;
};

/**
 * @param {unknown[]} before
 * @param {unknown[]} after
 */
const depsChanged = (before, after) => {
  if (before.length !== after.length) return true;

  for (let i = 0; i < before.length; ++i) {
    if (before[i] !== after[i]) return true;
  }

  return false;
};

/**
 * @template {(...args: unknown[]) => unknown} T
 * @param {T} fn
 */
const useCallback = fn => {
  const ref = useRef(fn);
  ref.current = fn;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => /** @type {T} */ ((...args) => ref.current(...args)));
};

/**
 * @param {{ [key: string]: unknown }} prev
 * @param {{ [key: string]: unknown }} next
 */
const defaultIsEqual = (prev, next) => {
  if (prev === next) return true;

  for (const key in prev) if (prev[key] !== next[key]) return false;

  for (const key in next) if (!(key in prev)) return false;

  return true;
};

/**
 * @template {FC} Component
 * @param {Component} Component
 * @param {typeof defaultIsEqual} [isEqual]
 */
const memo =
  (Component, isEqual = defaultIsEqual) =>
  /** @param {Props<Component>} props */
  props => {
    let [_props, setProps] = useState(props);
    if (!isEqual(props, _props)) _props = setProps(props);
    return jsx(Component, _props);
  };

/** @param {ReturnType<typeof createContext>} Context */
const useContext = Context => {
  const vnode = /** @type {Vnode} */ (currentVnode);

  const context = vnode.contexts?.get(Context);

  useEffect(() => {
    if (!context) return;

    context.vnodes.add(vnode);
    return () => context.vnodes.delete(vnode);
  }, [context, vnode]);

  return context?.value;
};

/**
 * @param {Vnode} a
 * @param {Vnode} b
 */
const batchComparator = (a, b) => {
  for (let i = 0; i < a.path.length; ++i) {
    if (i === b.path.length) return 1;

    if (a.path[i] !== b.path[i]) return a.path[i] - b.path[i];
  }
  return -1;
};

/** @type {Vnode[]} */
let updateQueue = [];

/** @param {Vnode} vnode */
const queueUpdate = vnode => {
  if (vnode.queued) return;

  if (updateQueue.length === 0) {
    queueMicrotask(() => {
      const batch = updateQueue.sort(batchComparator);
      updateQueue = [];
      for (const vnode of batch) {
        vnode.shouldUpdate = true;
        vnode.updated = false;
        vnode.queued = false;
      }
      for (const vnode of batch) {
        if (!vnode.deleted && !vnode.updated) update(vnode);
      }
    });
  }
  updateQueue.push(vnode);
  vnode.queued = true;
};

/**
 * @param {Pick<
 *   Vnode,
 *   | 'contexts'
 *   | 'key'
 *   | 'node'
 *   | 'parent'
 *   | 'parentNode'
 *   | 'path'
 *   | 'props'
 *   | 'type'
 * >} options
 */
const createVnode = ({
  contexts,
  key,
  node,
  parent,
  parentNode,
  path,
  props,
  type
}) => ({
  child: null,
  contexts,
  deleted: false,
  effects: null,
  key,
  node,
  parent,
  parentNode,
  path,
  prevSiblingNode: null,
  props,
  queued: false,
  refs: null,
  shouldUpdate: null,
  sibling: null,
  type,
  updated: false
});

/** @param {Vnode} parent */
const reconcile = parent => {
  const children =
    typeof parent.type === 'function'
      ? parent.type(parent.props)
      : parent.props.children;
  const defs = isEmpty(children)
    ? []
    : Array.isArray(children)
      ? children
      : [children];
  const parentNode = /** @type {Element} */ (parent.node ?? parent.parentNode);
  /** @type {{ [key: string]: Vnode | null }} */
  const prevByKey = {};
  for (let i = 0, prev = parent.child; prev; ++i, prev = prev.sibling) {
    prevByKey[prev.key == null ? `-${i}` : `+${prev.key}`] ??= prev;
  }
  parent.child = null;

  for (
    let i = 0, prev = /** @type {Vnode | null} */ (null);
    i < defs.length;
    ++i
  ) {
    const def = isEmpty(defs[i])
      ? emptyDef
      : Array.isArray(defs[i])
        ? { type: Fragment, props: { children: defs[i] }, key: undefined }
        : typeof defs[i] !== 'object'
          ? { type: textType, props: { nodeValue: defs[i] }, key: undefined }
          : /** @type {Def} */ (defs[i]);
    const key = def.key == null ? `-${i}` : `+${def.key}`;
    let child = prevByKey[key];
    if (child && child.type === def.type) {
      prevByKey[key] = null;
      child.parent = parent;
      child.parentNode = parentNode;
      child.sibling = null;
      if (child.props === def.props) child.shouldUpdate ??= false;
      if (child.node && child.shouldUpdate !== false) {
        updateNode(child.node, child.props, def.props);
      }
      child.props = def.props;
    } else {
      child = createVnode({
        contexts: parent.contexts,
        key: def.key,
        node:
          typeof def.type === 'function' ? null : createNode(def, parentNode),
        parent,
        parentNode,
        path: parent.path.concat(i),
        props: def.props,
        type: def.type
      });
    }
    if (prev) prev.sibling = child;
    else parent.child = child;
    prev = child;
  }

  for (const key in prevByKey) {
    const vnode = prevByKey[key];
    if (vnode) remove(vnode);
  }
};

/** @param {Vnode} root */
const update = root => {
  let vnode = root;
  const nodeStack = [root.prevSiblingNode ?? null];
  while (true) {
    vnode.prevSiblingNode = /** @type {Element | Text} */ (nodeStack.at(-1));
    if (vnode.shouldUpdate !== false) {
      currentVnode = vnode;
      effectIndex = 0;
      refIndex = 0;
      reconcile(vnode);
      currentVnode = null;
      effectIndex = 0;
      refIndex = 0;
      vnode.updated = true;
    }
    vnode.shouldUpdate = null;
    if (vnode.node) nodeStack[nodeStack.length - 1] = vnode.node;

    if (vnode.child) {
      if (vnode.node) nodeStack.push(null);
      vnode = vnode.child;
    } else {
      while (true) {
        if (vnode.effects) {
          for (const effect of vnode.effects) {
            if (effect.after && effect.before) {
              effect.before();
              effect.before = undefined;
            }
          }
        }

        if (vnode.node) {
          if (vnode.prevSiblingNode) {
            if (vnode.prevSiblingNode.nextSibling !== vnode.node) {
              vnode.prevSiblingNode.after(vnode.node);
            }
          } else if (
            vnode.parentNode &&
            vnode.parentNode.firstChild !== vnode.node
          ) {
            vnode.parentNode.prepend(vnode.node);
          }
        }

        if (vnode.effects) {
          for (const effect of vnode.effects) {
            if (effect.after) {
              effect.before = effect.after();
              effect.after = undefined;
            }
          }
        }

        if (vnode === root) return;

        if (vnode.sibling) {
          vnode = vnode.sibling;
          break;
        }

        vnode = /** @type {Vnode} */ (vnode.parent);
        if (vnode.node) nodeStack.pop();
      }
    }
  }
};

/**
 * @param {Children} children
 * @param {Element} node
 */
const render = (children, node) =>
  update(
    createVnode({
      contexts: null,
      key: undefined,
      node,
      parent: null,
      parentNode: null,
      path: [],
      props: { children },
      type: /** @type {Type} */ (node.tagName.toLowerCase())
    })
  );

// eslint-disable-next-line import/no-named-export
export {
  createContext,
  Fragment,
  jsx,
  jsxDEV,
  jsxs,
  jsxsDEV,
  memo,
  render,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
};
