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
 *   child: Vnode | null;
 *   childNeedsUpdate: boolean;
 *   contexts: Map<Context<any>, { value: any; vnodes: Set<Vnode> }> | null;
 *   deleted: boolean;
 *   effects: Effect[] | null;
 *   key: Key;
 *   lastNode: Element | Text | null;
 *   needsUpdate: boolean;
 *   next: Vnode | null;
 *   node: Element | Text | null;
 *   parent: Vnode | null;
 *   parentNode: Element;
 *   path: number[];
 *   prevNode: Element | Text | null;
 *   props: Props;
 *   queued: boolean;
 *   refs: Ref<unknown>[] | null;
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

/** @template T */
const createContext = () => {
  /** @param {{ value: T; children?: Children }} props */
  const Context = ({ value, children }) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const context = useMemo(() => {
      const context = { value, vnodes: /** @type {Set<Vnode>} */ (new Set()) };
      const vnode = /** @type {Vnode} */ (currentVnode);
      vnode.contexts = new Map(vnode.contexts).set(Context, context);
      return context;
    });

    if (value !== context.value) {
      context.value = value;
      context.vnodes.forEach(vnode => {
        vnode.needsUpdate = true;
        let parent = vnode.parent;
        while (parent && !parent.childNeedsUpdate && parent !== currentVnode) {
          parent.childNeedsUpdate = true;
          parent = parent.parent;
        }
      });
    }

    return children;
  };

  return Context;
};

/**
 * @template T
 * @typedef {ReturnType<typeof createContext<T>>} Context
 */

/**
 * @template {Context<unknown>} T
 * @typedef {Parameters<T>[0]['value']} ContextValue
 */

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

/**
 * @template {Context<any>} T
 * @param {T} Context
 */
const useContext = Context => {
  const vnode = /** @type {Vnode} */ (currentVnode);

  const context = vnode.contexts?.get(Context);

  useEffect(() => {
    if (!context) return;

    context.vnodes.add(vnode);
    return () => context.vnodes.delete(vnode);
  }, [context, vnode]);

  return /** @type {ContextValue<T>} */ (context?.value);
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
        vnode.needsUpdate = true;
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

/** @param {Vnode} vnode */
const getDefs = vnode => {
  currentVnode = vnode;
  effectIndex = 0;
  refIndex = 0;
  const children =
    typeof vnode.type === 'function'
      ? vnode.type(vnode.props)
      : vnode.props.children;
  currentVnode = null;
  effectIndex = 0;
  refIndex = 0;
  return (
    isEmpty(children) ? [] : Array.isArray(children) ? children : [children]
  ).map(def =>
    isEmpty(def)
      ? emptyDef
      : Array.isArray(def)
        ? { type: Fragment, props: { children: def }, key: undefined }
        : typeof def !== 'object'
          ? { type: textType, props: { nodeValue: def }, key: undefined }
          : /** @type {Def} */ (def)
  );
};

/**
 * @param {Def} def
 * @param {Vnode | null} parent
 * @param {Element} parentNode
 * @param {Element | Text | null} prevNode
 * @param {number[]} path
 */
const create = (def, parent, parentNode, prevNode, path) => {
  /** @type {Vnode} */
  const vnode = {
    child: null,
    childNeedsUpdate: false,
    contexts: parent?.contexts ?? null,
    deleted: false,
    effects: null,
    key: def.key,
    lastNode: null,
    needsUpdate: false,
    next: null,
    node: typeof def.type === 'function' ? null : createNode(def, parentNode),
    parent,
    parentNode,
    path,
    prevNode,
    props: def.props,
    queued: false,
    refs: null,
    type: def.type,
    updated: false
  };

  update(vnode);

  return vnode;
};

/** @param {Vnode} vnode */
const updateNeedsUpdateChildren = vnode => {
  for (let child = vnode.child; child; child = child.next) {
    if (child.needsUpdate) update(child);
    else if (child.childNeedsUpdate) updateNeedsUpdateChildren(child);
  }
};

/** @param {Vnode} vnode */
const getNodes = vnode => {
  if (vnode.node) return [vnode.node];

  /** @type {(Element | Text)[]} */
  const nodes = [];
  for (let child = vnode.child; child; child = child.next) {
    nodes.push(...getNodes(child));
  }
  return nodes;
};

/** @param {Vnode} vnode */
const update = vnode => {
  if (vnode.effects) {
    for (const effect of vnode.effects) {
      if (effect.after && effect.before) {
        effect.before();
        effect.before = undefined;
      }
    }
  }

  const prevByKey = new /** @type {typeof Map<string, Vnode>} */ (Map)();
  for (let i = 0, prev = vnode.child; prev; ++i, prev = prev.next) {
    prevByKey.set(prev.key == null ? `-${i}` : `+${prev.key}`, prev);
  }
  vnode.child = null;

  const defs = getDefs(vnode);
  /** @type {Vnode | null} */
  let prev = null;
  let prevNode = vnode.node ? null : vnode.prevNode;
  const parentNode = /** @type {Element} */ (vnode.node ?? vnode.parentNode);
  for (let i = 0; i < defs.length; ++i) {
    const def = defs[i];
    const key = def.key == null ? `-${i}` : `+${def.key}`;
    let child = prevByKey.get(key);
    if (child && child.type === def.type) {
      prevByKey.delete(key);
      child.next = null;
      if (prevNode !== child.prevNode) {
        child.prevNode = prevNode;
        if (child.lastNode) {
          const nodes = getNodes(child);
          if (prevNode) prevNode.after(...nodes);
          else parentNode.prepend(...nodes);
        }
      }
      if (child.props !== def.props || child.needsUpdate === true) {
        if (child.node) updateNode(child.node, child.props, def.props);
        child.props = def.props;
        update(child);
      } else if (child.childNeedsUpdate) updateNeedsUpdateChildren(child);
    } else {
      child = create(def, vnode, parentNode, prevNode, vnode.path.concat(i));
    }
    if (prev) prev.next = child;
    else vnode.child = child;
    prev = child;
    if (child.lastNode) prevNode = child.lastNode;
  }

  prevByKey.forEach(remove);

  vnode.lastNode = vnode.node ?? prev?.lastNode ?? null;

  if (vnode.node && !vnode.node.parentNode) {
    if (vnode.prevNode) vnode.prevNode.after(vnode.node);
    else vnode.parentNode.prepend(vnode.node);
  }

  if (vnode.effects) {
    for (const effect of vnode.effects) {
      if (effect.after) {
        effect.before = effect.after();
        effect.after = undefined;
      }
    }
  }

  vnode.childNeedsUpdate = false;
  vnode.needsUpdate = false;
  vnode.updated = true;
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

        if (vnode.next) {
          vnode = vnode.next;
          break;
        }

        vnode = /** @type {Vnode} */ (vnode.parent);
      }
    }
  }
};

/**
 * @param {Children} children
 * @param {Element} node
 */
const render = (children, node) =>
  create(
    { key: undefined, type: Fragment, props: { children } },
    null,
    node,
    null,
    []
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
