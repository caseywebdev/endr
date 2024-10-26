/**
 * @template T
 * @typedef {T | RecursiveArray<T>} Recursive
 */

/**
 * @template T
 * @typedef {Recursive<T>[]} RecursiveArray
 */

/**
 * @typedef {Recursive<
 *   Def | string | number | false | null | undefined | void
 * >} Children
 */

/**
 * @typedef {((props: any) => Children) & {
 *   memo?: (a: Props, b: Props) => boolean;
 * }} FC
 */

/** @typedef {keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap} TagName */

/** @typedef {TagName | FC} Type */

/**
 * @template [T=unknown] Default is `unknown`
 * @typedef {{
 *   children?: Children;
 *   ref?: Ref<T | null>;
 *   style?: Partial<CSSStyleDeclaration> | string;
 * }} SharedElementProps
 */

/**
 * @template {HTMLElement} T
 * @template [Shared=SharedElementProps<T>] Default is `SharedElementProps<T>`
 * @typedef {Shared & Partial<Omit<T, keyof Shared>>} HTMLElementProps
 */

/**
 * @template {SVGElement} T
 * @template [Shared=SharedElementProps<T>] Default is `SharedElementProps<T>`
 * @typedef {(Shared & Partial<Omit<T, keyof Shared>>)
 *   | { [K: string]: string | null | undefined }} SVGElementProps
 */

/** @typedef {SharedElementProps & { [K: string]: unknown }} UnknownElementProps */

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

/** @typedef {any} Key */

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
 *   render: (children: Children) => void;
 *   unmount: () => void;
 * }} Root
 */

/**
 * @typedef {{
 *   afterEffects: Vnode[];
 *   inserts: Vnode[];
 *   moves: Vnode[];
 *   nodeUpdates: Parameters<typeof updateNode>[];
 *   removes: (Element | Text)[];
 *   updates: Vnode[];
 * }} Queues
 */

/**
 * @typedef {{
 *   child: Vnode | null;
 *   contexts: Map<Context<any>, { deps: Set<Vnode>; value: any }> | null;
 *   depth: number;
 *   effects: Effect[] | null;
 *   index: number;
 *   key: Key;
 *   lastNode: Element | Text | null;
 *   node: Element | Text | null;
 *   catch: (exception: any) => void;
 *   parent: Vnode | null;
 *   parentNode: Element;
 *   prevNode: Element | Text | null;
 *   props: Props;
 *   queues: Queues;
 *   refs: Ref<unknown>[] | null;
 *   sibling: Vnode | null;
 *   state: 0 | 1 | 2 | 3; // 0 = idle, 1 = needs update, 2 = child needs update, 3 = removed
 *   type: Type;
 * }} Vnode
 */

/**
 * @template T
 * @typedef {ReturnType<typeof createContext<T>>} Context
 */

/**
 * @template {Context<unknown>} T
 * @typedef {Parameters<T>[0]['value']} ContextValue
 */

const { console, document, queueMicrotask, Text } = globalThis;

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

/** @param {{ children?: Children }} props */
const Fragment = props => props.children;

/** @param {{ children?: Children; to: Element }} props */
const Portal = props => props.children;

/** @param {{ children?: Children; catch: Vnode['catch'] }} props */
const Try = props => {
  /** @type {Vnode} */ (currentVnode).catch = props.catch;
  return props.children;
};

/** @template T */
const createContext = () => {
  /** @param {{ value: T; children?: Children }} props */
  const Context = ({ value, children }) => {
    const vnode = /** @type {Vnode} */ (currentVnode);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const context = useMemo(() => {
      const context = { deps: /** @type {Set<Vnode>} */ (new Set()), value };
      vnode.contexts = new Map(vnode.contexts).set(Context, context);
      return context;
    });

    if (value !== context.value) {
      context.value = value;
      for (const dep of context.deps) {
        dep.state = 1;
        let { parent } = dep;
        while (parent && parent !== vnode && !parent.state) {
          parent.state = 2;
          ({ parent } = parent);
        }
      }
    }

    return children;
  };

  return Context;
};

/** @param {unknown} value */
const isEmpty = value => value == null || value === false || value === '';

const emptyProps = /** @type {const} */ ({});

const emptyType = /** @type {Type} */ ({});

const emptyDef = jsx(emptyType, emptyProps);

const textType = /** @type {Type} */ ({});

const emptyDeps = /** @type {unknown[]} */ ([]);

const svgNs = 'http://www.w3.org/2000/svg';

/** @type {Vnode['catch']} */
const defaultCatch = exception => console.error(exception);

/**
 * @param {Type} type
 * @param {Props} props
 * @param {Element} parentNode
 */
const createNode = (type, props, parentNode) => {
  if (typeof type === 'function' || type === emptyType) return null;

  if (type === textType) {
    return document.createTextNode(
      /** @type {{ nodeValue: string }} */ (props).nodeValue
    );
  }

  const node = /** @type {HTMLElement | SVGElement} */ (
    document.createElementNS(
      type === 'svg' ? svgNs : parentNode.namespaceURI,
      type
    )
  );
  updateNode(node, {}, /** @type {Props<typeof node>} */ (props));
  return node;
};

/**
 * @template {Element} Node
 * @param {Node} node
 * @param {keyof Node} key
 */
const isSimpleProperty = (node, key) =>
  key in node && (node[key] == null || typeof node[key] !== 'object');

/**
 * @param {CSSStyleDeclaration} style
 * @param {Partial<CSSStyleDeclaration>} prev
 * @param {Partial<CSSStyleDeclaration>} next
 */
const setStyle = (style, prev, next) => {
  for (const key in prev) if (!(key in next)) style[key] = '';
  for (const key in next) style[key] = next[key] ?? '';
};

/**
 * @template {HTMLElement | SVGElement | Text} T
 * @param {T} node
 * @param {Props<T>} prev
 * @param {Props<T>} next
 */
const updateNode = (node, prev, next) => {
  if (node instanceof Text) {
    node.nodeValue = /** @type {string} */ (next.nodeValue);
    return;
  }

  for (const key in prev) {
    if (key === 'children' || key in next) continue;

    if (key === 'ref') {
      if (prev.ref) prev.ref.current = null;
      // @ts-ignore
    } else if (isSimpleProperty(node, key)) node[key] = '';
    else node.removeAttribute(key);
  }

  for (const key in next) {
    if (key === 'children' || prev[key] === next[key]) continue;

    if (key === 'ref') {
      if (prev.ref) prev.ref.current = null;
      if (next.ref) next.ref.current = node;
    } else if (key === 'style' && next[key] && typeof next[key] === 'object') {
      setStyle(
        node.style,
        prev[key] && typeof prev[key] === 'object' ? prev[key] : {},
        next[key]
      );
      // @ts-ignore
    } else if (isSimpleProperty(node, key)) node[key] = next[key] ?? '';
    else if (next[key] != null) {
      node.setAttribute(key, /** @type {string} */ (next[key]));
    } else node.removeAttribute(key);
  }
};

/** @type {Vnode | null} */
let currentVnode = null;

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
  /** @type {[T, <U extends T>(value: U | ((current: T) => U)) => U]} */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const state = useMemo(() => [
    initial,
    next => {
      const value =
        typeof next === 'function'
          ? /** @type {Function} */ (next)(state[0])
          : next;
      if (value !== state[0]) {
        state[0] = value;
        queueUpdate(vnode);
      }
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
  let { length } = before;
  if (length !== after.length) return true;

  while (length--) if (before[length] !== after[length]) return true;

  return false;
};

/**
 * @template {(...args: any[]) => any} T
 * @param {T} fn
 */
const useCallback = fn => {
  const ref = useRef(fn);
  ref.current = fn;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => /** @type {T} */ ((...args) => ref.current(...args)));
};

/**
 * @param {Props} prev
 * @param {Props} next
 */
const defaultMemo = (prev, next) => {
  if (prev === next) return true;

  for (const key in prev) if (prev[key] !== next[key]) return false;

  for (const key in next) if (!(key in prev)) return false;

  return true;
};

/**
 * @template {FC} Component
 * @param {Component} Component
 * @param {typeof defaultMemo} [memo]
 */
const memo = (Component, memo = defaultMemo) => {
  Component.memo = memo;
  return Component;
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

    context.deps.add(vnode);
    return () => context.deps.delete(vnode);
  }, [context, vnode]);

  return /** @type {ContextValue<T> | undefined} */ (context?.value);
};

/**
 * @param {Vnode} a
 * @param {Vnode} b
 */
const batchComparator = (a, b) => {
  while (a.depth > b.depth) {
    a = /** @type {Vnode} */ (a.parent);
    if (a === b) return 1;
  }

  while (b.depth > a.depth) {
    b = /** @type {Vnode} */ (b.parent);
    if (b === a) return -1;
  }

  while (a.parent !== b.parent) {
    a = /** @type {Vnode} */ (a.parent);
    b = /** @type {Vnode} */ (b.parent);
  }

  return a.index - b.index;
};

/** @param {Vnode} vnode */
const queueUpdate = vnode => {
  if (vnode.state === 1 || vnode.state === 3) return;

  const { queues } = vnode;
  const { updates } = queues;

  if (updates.length === 0) {
    queueMicrotask(() => {
      const batch = updates.sort(batchComparator);
      queues.updates = [];
      for (let i = 0; i < batch.length; ++i) {
        const vnode = batch[i];
        if (vnode.state === 1) update(vnode);
      }
      flush(queues);
    });
  }
  updates.push(vnode);
  vnode.state = 1;
};

/** @param {Vnode} vnode */
const getDefs = vnode => {
  let { children } = vnode.props;
  if (typeof vnode.type === 'function') {
    const prev = /** @type {const} */ ([currentVnode, effectIndex, refIndex]);
    currentVnode = vnode;
    effectIndex = 0;
    refIndex = 0;
    try {
      children = vnode.type(vnode.props);
    } catch (exception) {
      children = null;
      vnode.catch(exception);
    } finally {
      [currentVnode, effectIndex, refIndex] = prev;
    }
  }
  return isEmpty(children)
    ? []
    : Array.isArray(children)
      ? children
      : [children];
};

/** @param {unknown} def */
const normalizeDef = def => {
  if (isEmpty(def)) return emptyDef;

  if (Array.isArray(def)) return jsx(Fragment, { children: def });

  if (
    def &&
    typeof def === 'object' &&
    Object.keys(def).length === 3 &&
    'type' in def &&
    (typeof def.type === 'string' || typeof def.type === 'function') &&
    'props' in def &&
    def.props &&
    typeof def.props === 'object' &&
    'key' in def
  ) {
    return /** @type {Def} */ (def);
  }

  return jsx(textType, { nodeValue: def });
};

/** @param {Vnode} vnode */
const updateChild = vnode => {
  let { child, state } = vnode;
  if (state === 1) update(vnode);
  else if (state === 2) {
    vnode.state = 0;
    for (; child; child = child.sibling) updateChild(child);
  }
};

/** @param {Vnode} vnode */
const getNodes = ({ child, node }) => {
  if (node) return [node];

  /** @type {(Element | Text)[]} */
  const nodes = [];
  for (; child; child = child.sibling) nodes.push(...getNodes(child));
  return nodes;
};

/** @param {Vnode} vnode */
const update = vnode => {
  const { depth, queues } = vnode;
  const { afterEffects, inserts, moves, nodeUpdates } = queues;

  if (vnode.effects) {
    try {
      for (let i = 0; i < vnode.effects.length; ++i) {
        const effect = vnode.effects[i];
        if (effect.after && effect.before) {
          effect.before();
          effect.before = undefined;
        }
      }
    } catch (exception) {
      vnode.catch(exception);
    }
  }

  let child = vnode.child;
  const prevChildren = child && /** @type {Map<any, Vnode>} */ (new Map());
  for (; child; child = child.sibling) {
    /** @type {NonNullable<typeof prevChildren>} */ (prevChildren).set(
      child.key ?? child.index,
      child
    );
  }
  const parentNode = /** @type {Element} */ (vnode.node ?? vnode.parentNode);
  const defs = getDefs(vnode);
  vnode.state = 0;
  vnode.child = null;
  let prevNode = vnode.node ? null : vnode.prevNode;
  for (
    let i = 0, prevChild = /** @type {Vnode | null} */ (null);
    i < defs.length;
    ++i
  ) {
    const { type, props, key } = normalizeDef(defs[i]);
    let child = prevChildren?.get(key ?? i);
    let needsMove = false;
    let nodeUpdate = null;
    let needsInsert = false;
    if (child?.type === type) {
      /** @type {NonNullable<typeof prevChildren>} */ (prevChildren).delete(
        key ?? i
      );
      child.index = i;
      child.sibling = null;
      if (
        typeof child.type !== 'function' ||
        !child.type.memo?.(child.props, props)
      ) {
        if (child.node) {
          nodeUpdate = /** @type {Parameters<typeof updateNode>} */ ([
            child.node,
            child.props,
            props
          ]);
        }
        child.props = props;
        child.state = 1;
      }
      if (
        child.parentNode === parentNode &&
        child.lastNode &&
        prevNode !== child.prevNode
      ) {
        needsMove = true;
      }
    } else {
      try {
        child = {
          catch: vnode.catch,
          child: null,
          contexts: vnode.contexts,
          depth: depth + 1,
          effects: null,
          index: i,
          key,
          lastNode: null,
          node: createNode(type, props, parentNode),
          parent: vnode,
          props,
          queues,
          refs: null,
          sibling: null,
          state: /** @type {const} */ (1),
          type,
          ...(type === Portal
            ? {
                parentNode: /** @type {Props<typeof Portal>} */ (props).to,
                prevNode: /** @type {Element} */ (
                  /** @type {Props<typeof Portal>} */ (props).to.lastChild
                )
              }
            : { parentNode, prevNode })
        };
      } catch (exception) {
        vnode.catch(exception);
        continue;
      }
      if (child.node) needsInsert = true;
    }

    if (child.parentNode === parentNode) child.prevNode = prevNode;
    if (prevChild) prevChild.sibling = child;
    else vnode.child = child;
    updateChild(child);
    if (needsMove) moves.push(child);
    if (nodeUpdate) nodeUpdates.push(nodeUpdate);
    if (needsInsert) inserts.push(child);
    if (child.parentNode === parentNode && child.lastNode) {
      prevNode = child.lastNode;
    }
    prevChild = child;
  }
  vnode.lastNode = vnode.node ?? prevNode ?? null;

  if (prevChildren) {
    for (const child of prevChildren.values()) remove(child);
  }

  if (vnode.effects) afterEffects.push(vnode);
};

/**
 * @param {Vnode} vnode
 * @param {boolean} removeNode
 */
const remove = (vnode, removeNode = true) => {
  vnode.state = 3;

  let { effects, child, node } = vnode;

  if (effects) {
    try {
      for (let i = 0; i < effects.length; ++i) {
        const effect = effects[i];
        if (effect.before) {
          effect.before();
          effect.before = undefined;
        }
      }
    } catch (exception) {
      vnode.catch(exception);
    }
  }

  const removeChildNode = removeNode && !node;

  for (; child; child = child.sibling) {
    remove(child, removeChildNode || child.type === Portal);
  }

  if (removeNode && node) vnode.queues.removes.unshift(node);
};

/** @param {Queues} queues */
const flush = queues => {
  const { afterEffects, inserts, moves, nodeUpdates, removes } = queues;

  for (let i = removes.length - 1; i >= 0; --i) removes[i].remove();

  queues.removes = [];

  for (let i = 0; i < moves.length; ++i) {
    const vnode = moves[i];
    const { parentNode, prevNode } = vnode;
    if (prevNode) prevNode.after(...getNodes(vnode));
    else parentNode.prepend(...getNodes(vnode));
  }

  queues.moves = [];

  for (let i = 0; i < nodeUpdates.length; ++i) updateNode(...nodeUpdates[i]);

  queues.nodeUpdates = [];

  for (let i = 0; i < inserts.length; ++i) {
    const { node, parentNode, prevNode } = inserts[i];
    if (prevNode) prevNode.after(/** @type {Element} */ (node));
    else parentNode.prepend(/** @type {Element} */ (node));
  }

  queues.inserts = [];

  for (let i = 0; i < afterEffects.length; ++i) {
    const vnode = afterEffects[i];
    const effects = /** @type {NonNullable<Vnode['effects']>} */ (
      vnode.effects
    );
    try {
      for (let j = 0; j < effects.length; ++j) {
        const effect = effects[j];
        if (effect.after) {
          effect.before = effect.after();
          effect.after = undefined;
        }
      }
    } catch (exception) {
      vnode.catch(exception);
    }
  }

  queues.afterEffects = [];
};

/** @param {Element} parentNode */
const createRoot = parentNode => {
  /** @type {Queues} */
  const queues = {
    afterEffects: [],
    inserts: [],
    moves: [],
    nodeUpdates: [],
    removes: [],
    updates: []
  };

  /** @type {Vnode} */
  const vnode = {
    catch: defaultCatch,
    child: null,
    contexts: null,
    depth: 0,
    effects: null,
    index: 0,
    key: undefined,
    lastNode: null,
    node: null,
    parent: null,
    parentNode,
    prevNode: /** @type {Element} */ (parentNode.lastChild),
    props: {},
    queues,
    refs: null,
    sibling: null,
    state: /** @type {const} */ (1),
    type: Fragment
  };

  update(vnode);
  flush(queues);

  return /** @type {Root} */ ({
    render: children => {
      vnode.props = { children };
      update(vnode);
      flush(queues);
    },

    unmount: () => {
      remove(vnode);
      flush(queues);
    }
  });
};

// eslint-disable-next-line import/no-named-export
export {
  createContext,
  createRoot,
  Fragment,
  jsx,
  jsxDEV,
  jsxs,
  jsxsDEV,
  memo,
  Portal,
  Try,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
};
