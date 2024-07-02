const { CSSStyleDeclaration, document, queueMicrotask, Text } = globalThis;

/** @typedef {Def | string | number | false | null | undefined} Child */

/** @typedef {Child | Child[]} Children */

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
 *   children: { [key: string]: Vnode } | null;
 *   contexts: Map<Context<any>, { deps: Set<Vnode>; value: any }> | null;
 *   depth: number;
 *   effects: Effect[] | null;
 *   index: number;
 *   lastNode: Element | Text | null;
 *   node: Element | Text | null;
 *   parent: Vnode | null;
 *   parentNode: Element;
 *   prevNode: Element | Text | null;
 *   props: Props;
 *   refs: Ref<unknown>[] | null;
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

const Fragment = /** @param {{ children?: Children }} props */ props =>
  props.children;

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

const emptyDef = { type: emptyType, props: emptyProps, key: undefined };

const textType = /** @type {Type} */ ({});

const emptyDeps = /** @type {unknown[]} */ ([]);

const svgNs = 'http://www.w3.org/2000/svg';

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

/** @type {{ vnode: Vnode; prevProps: Props }[]} */
let nodeUpdateQueue = [];

/** @type {Vnode[]} */
let insertQueue = [];

/** @type {Effect[]} */
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
  while (a.depth < b.depth) a = /** @type {Vnode} */ (a.parent);
  while (b.depth < a.depth) b = /** @type {Vnode} */ (b.parent);
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
    children = vnode.type(vnode.props);
  }
  return isEmpty(children)
    ? []
    : Array.isArray(children)
      ? children
      : [children];
};

/** @param {unknown} def */
const normalizeDef = def =>
  isEmpty(def)
    ? emptyDef
    : Array.isArray(def)
      ? { type: Fragment, props: { children: def }, key: undefined }
      : typeof def !== 'object'
        ? { type: textType, props: { nodeValue: def }, key: undefined }
        : /** @type {Def} */ (def);

/**
 * @param {Type} type
 * @param {Props} props
 * @param {Vnode | null} parent
 * @param {Element} parentNode
 * @param {number} index
 */
const create = (type, props, parent, parentNode, index) => ({
  children: null,
  contexts: parent?.contexts ?? null,
  depth: parent ? parent.depth + 1 : 0,
  effects: null,
  index,
  lastNode: null,
  node: createNode(type, props, parentNode),
  parent,
  parentNode,
  prevNode: null,
  props: props,
  refs: null,
  state: /** @type {const} */ (1),
  type: type
});

/** @param {Vnode} child */
const updateChild = child => {
  const { state, children } = child;
  if (state === 1) update(child);
  else if (state === 2) {
    child.state = 0;
    for (const key in children) updateChild(children[key]);
  }
};

/** @param {Vnode} vnode */
const getNodes = ({ children, node }) => {
  if (node) return [node];

  /** @type {(Element | Text)[]} */
  const nodes = [];
  for (const key in children) nodes.push(...getNodes(children[key]));
  return nodes;
};

/** @param {Vnode} vnode */
const update = vnode => {
  if (vnode.effects) {
    for (let i = 0; i < vnode.effects.length; ++i) {
      const effect = vnode.effects[i];
      if (effect.after && effect.before) {
        effect.before();
        effect.before = undefined;
      }
    }
  }

  const prevChildren = vnode.children;
  const parentNode = /** @type {Element} */ (vnode.node ?? vnode.parentNode);
  const defs = getDefs(vnode);
  vnode.state = 0;
  let prevNode = vnode.node ? null : vnode.prevNode;
  if (defs.length) {
    vnode.children = {};
    for (let i = 0; i < defs.length; ++i) {
      let { type, props, key } = normalizeDef(defs[i]);
      key = key == null ? `-${i}` : `+${key}`;
      let child = prevChildren?.[key];
      let needsMove = false;
      let nodeUpdatePrevProps = null;
      let needsInsert = false;
      if (child?.type === type) {
        delete (
          /** @type {NonNullable<Vnode['children']>} */ (prevChildren)[key]
        );
        child.index = i;
        if (
          child.props !== props &&
          !(
            typeof child.type === 'function' &&
            child.type.memo?.(child.props, props)
          )
        ) {
          if (child.node) nodeUpdatePrevProps = child.props;
          child.props = props;
          child.state = 1;
        }
        if (child.lastNode && prevNode !== child.prevNode) needsMove = true;
      } else {
        child = create(type, props, vnode, parentNode, i);
        if (child.node) needsInsert = true;
      }

      child.prevNode = prevNode;
      vnode.children[key] = child;
      updateChild(child);
      if (needsMove) moveQueue.push(child);
      if (nodeUpdatePrevProps) {
        nodeUpdateQueue.push({ vnode: child, prevProps: nodeUpdatePrevProps });
      }
      if (needsInsert) insertQueue.push(child);
      if (child.lastNode) prevNode = child.lastNode;
    }
  } else vnode.children = null;
  vnode.lastNode = vnode.node ?? prevNode ?? null;

  for (const key in prevChildren) remove(prevChildren[key], true);

  if (vnode.effects) {
    for (let i = 0; i < vnode.effects.length; ++i) {
      const effect = vnode.effects[i];
      if (effect.after) afterEffectQueue.push(effect);
    }
  }
};

/**
 * @param {Vnode} vnode
 * @param {boolean} removeNode
 */
const remove = (vnode, removeNode) => {
  vnode.state = 3;

  const { effects, children, node } = vnode;

  if (effects) {
    for (let i = 0; i < effects.length; ++i) {
      const effect = effects[i];
      if (effect.before) {
        effect.before();
        effect.before = undefined;
      }
    }
  }

  const removeChildNode = removeNode && !node;

  for (const key in children) remove(children[key], removeChildNode);

  if (removeNode && node) removeQueue.unshift(node);
};

const flush = () => {
  const removes = removeQueue;
  removeQueue = [];
  const moves = moveQueue;
  moveQueue = [];
  const nodeUpdates = nodeUpdateQueue;
  nodeUpdateQueue = [];
  const inserts = insertQueue;
  insertQueue = [];
  const afterEffects = afterEffectQueue;
  afterEffectQueue = [];

  for (let i = removes.length - 1; i >= 0; --i) removes[i].remove();

  for (let i = 0; i < moves.length; ++i) {
    const vnode = moves[i];
    if (vnode.prevNode) vnode.prevNode.after(...getNodes(vnode));
    else vnode.parentNode.prepend(...getNodes(vnode));
  }

  for (let i = 0; i < nodeUpdates.length; ++i) {
    const { vnode, prevProps } = nodeUpdates[i];
    updateNode(
      /** @type {Element | Text} */ (vnode.node),
      prevProps,
      vnode.props
    );
  }

  for (let i = 0; i < inserts.length; ++i) {
    const vnode = inserts[i];
    if (vnode.prevNode) {
      vnode.prevNode.after(/** @type {Element | Text} */ (vnode.node));
    } else vnode.parentNode.prepend(/** @type {Element | Text} */ (vnode.node));
  }

  for (let i = 0; i < afterEffects.length; ++i) {
    const effect = afterEffects[i];
    effect.before = /** @type {AfterEffect} */ (effect.after)();
    effect.after = undefined;
  }
};

/**
 * @param {Children} children
 * @param {Element} node
 */
const render = (children, node) => {
  update(create(Fragment, { children }, null, node, 0));
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
  render,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
};
