const { console, CSSStyleDeclaration, document, queueMicrotask, Text } =
  globalThis;

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
 *   style?: Partial<CSSStyleDeclaration>;
 * }} SharedElementProps
 */

/**
 * @template {HTMLElement} T
 * @typedef {SharedElementProps<T>
 *   | { [key in Exclude<keyof T, keyof SharedElementProps<T>>]?: T[key] }} HTMLElementProps
 */

/**
 * @template {SVGElement} T
 * @typedef {SharedElementProps<T>
 *   | { [key in Exclude<keyof T, keyof SharedElementProps<T>>]?: T[key] }
 *   | { [key in string]?: string }} SVGElementProps
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
 *   refs: Ref<unknown>[] | null;
 *   sibling: Vnode | null;
 *   state: 0 | 1 | 2 | 3; // 0 = idle, 1 = needs update, 2 = child needs update, 3 = removed
 *   type: Type;
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

const emptyDef = /** @type {Def} */ ({
  type: emptyType,
  props: emptyProps,
  key: undefined
});

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

  const node = document.createElementNS(
    type === 'svg' ? svgNs : parentNode.namespaceURI,
    type
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
  for (const key in prev) if (!(key in next)) style[key] = '';
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

/** @type {Vnode | null} */
let currentVnode = null;

let effectIndex = 0;

let refIndex = 0;

/** @type {(Element | Text)[]} */
let removeQueue = [];

/** @type {Vnode[]} */
let moveQueue = [];

/** @type {Parameters<typeof updateNode>[]} */
let nodeUpdateQueue = [];

/** @type {Vnode[]} */
let insertQueue = [];

/** @type {Vnode[]} */
let afterEffectQueue = [];

/** @type {Vnode[]} */
let updateQueue = [];

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
      const value =
        typeof next === 'function'
          ? /** @type {Function} */ (next)(state[0])
          : next;
      if (value === state[0]) return value;

      state[0] = value;
      queueUpdate(vnode);
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

  if (updateQueue.length === 0) {
    queueMicrotask(() => {
      const batch = updateQueue.sort(batchComparator);
      updateQueue = [];
      for (let i = 0; i < batch.length; ++i) {
        const vnode = batch[i];
        if (vnode.state === 1) update(vnode);
      }
      flush();
    });
  }
  updateQueue.push(vnode);
  vnode.state = 1;
};

/** @param {Vnode} vnode */
const getDefs = vnode => {
  let { children } = vnode.props;
  if (typeof vnode.type === 'function') {
    currentVnode = vnode;
    effectIndex = 0;
    refIndex = 0;
    try {
      children = vnode.type(vnode.props);
    } catch (exception) {
      children = null;
      vnode.catch(exception);
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

  if (Array.isArray(def)) {
    return /** @type {Def} */ ({
      type: Fragment,
      props: { children: def },
      key: undefined
    });
  }

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

  return { type: textType, props: { nodeValue: def }, key: undefined };
};

/**
 * @param {Type} type
 * @param {Props} props
 * @param {Key} key
 * @param {Vnode | null} parent
 * @param {Element} parentNode
 * @param {number} index
 */
const create = (type, props, key, parent, parentNode, index) => ({
  child: null,
  contexts: parent?.contexts ?? null,
  depth: parent ? parent.depth + 1 : 0,
  effects: null,
  index,
  key,
  lastNode: null,
  node: createNode(type, props, parentNode),
  catch: parent?.catch ?? defaultCatch,
  parent,
  parentNode,
  prevNode: null,
  props,
  refs: null,
  sibling: null,
  state: /** @type {const} */ (1),
  type
});

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
        child = create(
          type,
          props,
          key,
          vnode,
          type === Portal
            ? /** @type {Props<typeof Portal>} */ (props).to
            : parentNode,
          i
        );
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
    if (needsMove) moveQueue.push(child);
    if (nodeUpdate) nodeUpdateQueue.push(nodeUpdate);
    if (needsInsert) insertQueue.push(child);
    if (child.parentNode === parentNode && child.lastNode) {
      prevNode = child.lastNode;
    }
    prevChild = child;
  }
  vnode.lastNode = vnode.node ?? prevNode ?? null;

  if (prevChildren) {
    for (const child of prevChildren.values()) remove(child, true);
  }

  if (vnode.effects) afterEffectQueue.push(vnode);
};

/**
 * @param {Vnode} vnode
 * @param {boolean} removeNode
 */
const remove = (vnode, removeNode) => {
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

  for (; child; child = child.sibling) remove(child, removeChildNode);

  if (removeNode && node) removeQueue.unshift(node);
};

const flush = () => {
  for (let i = removeQueue.length - 1; i >= 0; --i) removeQueue[i].remove();

  removeQueue = [];

  for (let i = 0; i < moveQueue.length; ++i) {
    const vnode = moveQueue[i];
    if (vnode.prevNode) vnode.prevNode.after(...getNodes(vnode));
    else vnode.parentNode.prepend(...getNodes(vnode));
  }

  moveQueue = [];

  for (let i = 0; i < nodeUpdateQueue.length; ++i) {
    updateNode(...nodeUpdateQueue[i]);
  }

  nodeUpdateQueue = [];

  for (let i = 0; i < insertQueue.length; ++i) {
    const vnode = insertQueue[i];
    if (vnode.prevNode) {
      vnode.prevNode.after(/** @type {Element | Text} */ (vnode.node));
    } else vnode.parentNode.prepend(/** @type {Element | Text} */ (vnode.node));
  }

  insertQueue = [];

  for (let i = 0; i < afterEffectQueue.length; ++i) {
    const vnode = afterEffectQueue[i];
    const effects = /** @type {NonNullable<Vnode['effects']>} */ (
      vnode.effects
    );
    try {
      for (let j = 0; j < effects.length; ++j) {
        const effect = effects[j];
        if (effect.after) {
          effect.before = /** @type {AfterEffect} */ (effect.after)();
          effect.after = undefined;
        }
      }
    } catch (exception) {
      vnode.catch(exception);
    }
  }

  afterEffectQueue = [];
};

/**
 * @param {Children} children
 * @param {Element} node
 */
const render = (children, node) => {
  update(create(Fragment, { children }, undefined, null, node, 0));
  flush();
};

// eslint-disable-next-line import/no-named-export
export {
  createContext,
  Fragment,
  jsx,
  jsxDEV,
  jsxs,
  jsxsDEV,
  memo,
  Portal,
  render,
  Try,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
};
