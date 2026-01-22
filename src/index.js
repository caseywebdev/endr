/**
 * @template T
 * @typedef {T | RecursiveArray<T>} Recursive
 */

/**
 * @template T
 * @typedef {Recursive<T>[]} RecursiveArray
 */

/** @typedef {(...args: any[]) => unknown} AnyFunction */

/**
 * @typedef {Recursive<
 *   Def | string | number | false | null | undefined | void
 * >} Children
 */

/**
 * @typedef {((props: any) => Children) & {
 *   memo?: (a: Props, b: Props) => boolean;
 * }} Component
 */

/** @typedef {keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap} TagName */

/** @typedef {Component | TagName} Type */

/**
 * @template [T=unknown] Default is `unknown`
 * @typedef {{
 *   children?: Children;
 *   ref?: Ref<T | null> | null;
 *   style?: Partial<CSSStyleDeclaration> | string | null;
 * }} SharedElementProps
 */

/** @typedef {{ [K in `data-${string}`]?: string | null }} DataAttributes */

/**
 * @typedef {DataAttributes & {
 *   accumulate?: 'none' | 'sum' | null;
 *   additive?: 'replace' | 'sum' | null;
 *   'alignment-baseline'?: string | null;
 *   amplitude?: string | null;
 *   attributeName?: string | null;
 *   azimuth?: string | null;
 *   baseFrequency?: string | null;
 *   'baseline-shift'?: string | null;
 *   begin?: string | null;
 *   bias?: string | null;
 *   by?: string | null;
 *   calcMode?: string | null;
 *   class?: string | null;
 *   clipPathUnits?: string | null;
 *   'clip-path'?: string | null;
 *   'clip-rule'?: string | null;
 *   color?: string | null;
 *   'color-interpolation'?: 'auto' | 'sRGB' | 'linearRGB' | 'inherit' | null;
 *   'color-interpolation-filters'?: string | null;
 *   crossorigin?: string | null;
 *   cursor?: string | null;
 *   cx?: string | null;
 *   cy?: string | null;
 *   d?: string | null;
 *   decoding?: string | null;
 *   diffuseConstant?: string | null;
 *   direction?: string | null;
 *   display?: string | null;
 *   divisor?: string | null;
 *   'dominant-baseline'?: string | null;
 *   dur?: string | null;
 *   dx?: string | null;
 *   dy?: string | null;
 *   edgeMode?: string | null;
 *   elevation?: string | null;
 *   end?: string | null;
 *   exponent?: string | null;
 *   fill?: string | null;
 *   'fill-opacity'?: string | null;
 *   'fill-rule'?: 'nonzero' | 'evenodd' | 'inherit' | null;
 *   filter?: string | null;
 *   filterUnits?: string | null;
 *   'flood-color'?: string | null;
 *   'flood-opacity'?: string | null;
 *   'font-family'?: string | null;
 *   'font-size'?: string | null;
 *   'font-size-adjust'?: string | null;
 *   'font-stretch'?: string | null;
 *   'font-style'?: string | null;
 *   'font-variant'?: string | null;
 *   'font-weight'?: string | null;
 *   fr?: string | null;
 *   from?: string | null;
 *   fx?: string | null;
 *   fy?: string | null;
 *   gradientTransform?: string | null;
 *   gradientUnits?: string | null;
 *   height?: string | null;
 *   href?: string | null;
 *   hreflang?: string | null;
 *   id?: string | null;
 *   'image-rendering'?: string | null;
 *   in?: string | null;
 *   in2?: string | null;
 *   intercept?: string | null;
 *   k1?: string | null;
 *   k2?: string | null;
 *   k3?: string | null;
 *   k4?: string | null;
 *   kernelMatrix?: string | null;
 *   kernelUnitLength?: string | null;
 *   keyPoints?: string | null;
 *   keySplines?: string | null;
 *   keyTimes?: string | null;
 *   lang?: string | null;
 *   lengthAdjust?: string | null;
 *   'letter-spacing'?: string | null;
 *   'lighting-color'?: string | null;
 *   limitingConeAngle?: string | null;
 *   local?: string | null;
 *   'marker-end'?: string | null;
 *   'marker-mid'?: string | null;
 *   'marker-start'?: string | null;
 *   markerHeight?: string | null;
 *   markerUnits?: string | null;
 *   markerWidth?: string | null;
 *   mask?: string | null;
 *   maskContentUnits?: string | null;
 *   maskUnits?: string | null;
 *   max?: string | null;
 *   media?: string | null;
 *   method?: string | null;
 *   min?: string | null;
 *   mode?: string | null;
 *   numOctaves?: string | null;
 *   offset?: string | null;
 *   opacity?: string | null;
 *   operator?: string | null;
 *   order?: string | null;
 *   orient?: string | null;
 *   origin?: string | null;
 *   overflow?: string | null;
 *   'overline-position'?: string | null;
 *   'overline-thickness'?: string | null;
 *   'paint-order'?: string | null;
 *   path?: string | null;
 *   pathLength?: string | null;
 *   patternContentUnits?: string | null;
 *   patternTransform?: string | null;
 *   patternUnits?: string | null;
 *   ping?: string | null;
 *   'pointer-events'?: string | null;
 *   points?: string | null;
 *   pointsAtX?: string | null;
 *   pointsAtY?: string | null;
 *   pointsAtZ?: string | null;
 *   preserveAlpha?: string | null;
 *   preserveAspectRatio?: string | null;
 *   primitiveUnits?: string | null;
 *   r?: string | null;
 *   radius?: string | null;
 *   referrerPolicy?: string | null;
 *   refX?: string | null;
 *   refY?: string | null;
 *   rel?: string | null;
 *   'rendering-intent'?: string | null;
 *   repeatCount?: string | null;
 *   repeatDur?: string | null;
 *   requiredExtensions?: string | null;
 *   restart?: string | null;
 *   result?: string | null;
 *   rotate?: string | null;
 *   rx?: string | null;
 *   ry?: string | null;
 *   scale?: string | null;
 *   seed?: string | null;
 *   'shape-rendering'?:
 *     | 'auto'
 *     | 'optimizeSpeed'
 *     | 'crispEdges'
 *     | 'geometricPrecision'
 *     | null;
 *   side?: string | null;
 *   slope?: string | null;
 *   spacing?: string | null;
 *   specularConstant?: string | null;
 *   specularExponent?: string | null;
 *   speed?: string | null;
 *   spreadMethod?: 'pad' | 'reflect' | 'repeat' | null;
 *   startOffset?: string | null;
 *   stdDeviation?: string | null;
 *   stitchTiles?: string | null;
 *   'stop-color'?: string | null;
 *   'stop-opacity'?: string | null;
 *   'strikethrough-position'?: string | null;
 *   'strikethrough-thickness'?: string | null;
 *   stroke?: string | null;
 *   'stroke-dasharray'?: string | null;
 *   'stroke-dashoffset'?: string | null;
 *   'stroke-linecap'?: 'butt' | 'round' | 'square' | 'inherit' | null;
 *   'stroke-linejoin'?: 'miter' | 'round' | 'bevel' | 'inherit' | null;
 *   'stroke-miterlimit'?: string | null;
 *   'stroke-opacity'?: string | null;
 *   'stroke-width'?: string | null;
 *   style?: string | null;
 *   surfaceScale?: string | null;
 *   systemLanguage?: string | null;
 *   tabindex?: string | null;
 *   tableValues?: string | null;
 *   target?: string | null;
 *   targetX?: string | null;
 *   targetY?: string | null;
 *   'text-anchor'?: string | null;
 *   'text-decoration'?: string | null;
 *   'text-rendering'?: string | null;
 *   textLength?: string | null;
 *   to?: string | null;
 *   transform?: string | null;
 *   'transform-origin'?: string | null;
 *   type?: string | null;
 *   'underline-position'?: string | null;
 *   'underline-thickness'?: string | null;
 *   'unicode-bidi'?: string | null;
 *   values?: string | null;
 *   'vector-effect'?: string | null;
 *   viewBox?: string | null;
 *   visibility?: string | null;
 *   width?: string | null;
 *   'word-spacing'?: string | null;
 *   'writing-mode'?: string | null;
 *   x?: string | null;
 *   x1?: string | null;
 *   x2?: string | null;
 *   xChannelSelector?: string | null;
 *   xmlns?: string | null;
 *   y?: string | null;
 *   y1?: string | null;
 *   y2?: string | null;
 *   yChannelSelector?: string | null;
 *   z?: string | null;
 * }} SVGAttributes
 */

/**
 * @template {Element} T
 * @typedef {T extends SVGElement ? SVGAttributes : DataAttributes} ElementAttributes
 */

/**
 * @template T
 * @typedef {{
 *   [K in keyof T as T[K] extends
 *     | string
 *     | number
 *     | boolean
 *     | AnyFunction
 *     | null
 *     | undefined
 *     ? K
 *     : never]?: T[K] | null;
 * }} SimpleProps
 */

/**
 * @template {Element} T
 * @template [SimpleTProps=SimpleProps<T>] Default is `SimpleProps<T>`
 * @template [SharedProps=SharedElementProps<T>] Default is
 *   `SharedElementProps<T>`
 * @template [Attributes=ElementAttributes<T>] Default is `ElementAttributes<T>`
 * @typedef {{
 *   [K in keyof SimpleTProps | keyof SharedProps | keyof Attributes]?:
 *     | (K extends keyof SimpleTProps ? SimpleTProps[K] : never)
 *     | (K extends keyof SharedProps ? SharedProps[K] : never)
 *     | (K extends keyof Attributes ? Attributes[K] : never);
 * }} ElementProps
 */

/** @typedef {SharedElementProps & { [K: string]: unknown }} UnknownElementProps */

/**
 * @template [T=unknown] Default is `unknown`
 * @typedef {T extends Component
 *   ? Parameters<T>[0] extends undefined
 *     ? Record<keyof any, never>
 *     : Parameters<T>[0]
 *   : T extends keyof HTMLElementTagNameMap
 *     ? ElementProps<HTMLElementTagNameMap[T]>
 *     : T extends keyof SVGElementTagNameMap
 *       ? ElementProps<SVGElementTagNameMap[T]>
 *       : UnknownElementProps} Props
 */

/** @typedef {unknown} Key */

/** @typedef {{ type: Type; props: Props; key: Key }} Def */

/**
 * @template T
 * @typedef {{ current: T }} Ref
 */

/** @typedef {(() => unknown) | void} BeforeEffect */

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
 *   afterEffects: Vnode[];
 *   inserts: Vnode[];
 *   nodeUpdates: Parameters<typeof updateNode>[];
 *   removes: (Element | Text)[];
 *   updates: Vnode[];
 * }} Queues
 */

/** @typedef {Element | ShadowRoot} ParentNode */

/**
 * @typedef {{
 *   child: Vnode | null;
 *   contexts: Map<
 *     Context<unknown>,
 *     { deps: Set<Vnode>; value: unknown }
 *   > | null;
 *   depth: number;
 *   effects: Effect[] | null;
 *   index: number;
 *   key: Key;
 *   lastNode: Element | Text | null;
 *   node: Element | Text | null;
 *   catch: (exception: unknown) => void;
 *   parent: Vnode | null;
 *   parentNode: ParentNode;
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
 * @typedef {((props: { children?: Children; value: T }) => Children) & {
 *   value: T;
 * }} Context
 */

/**
 * @template T
 * @typedef {<U extends T>(
 *   value: (T extends AnyFunction ? never : U) | ((current: T) => U)
 * ) => U} SetState
 */

/**
 * @template T
 * @typedef {[T, SetState<T>]} State
 */

const { console, Element, queueMicrotask } = globalThis;

/**
 * @template {Type} T
 * @param {T} type
 * @param {Props<T>} props
 * @param {Key} [key]
 */
export const jsx = (type, props, key) => ({ type, props, key });

export const jsxs = jsx;

export const jsxDEV = jsx;

export const jsxsDEV = jsx;

const emptyObject = /** @type {const} */ ({});

const emptyType = /** @type {Type} */ ({});

const emptyDef = jsx(emptyType, emptyObject);

const emptyArray = /** @type {const} @satisfies {unknown[]} */ ([]);

const textType = /** @type {Type} */ ({});

const moveBefore =
  'moveBefore' in Element.prototype ? 'moveBefore' : 'insertBefore';

const svgNs = 'http://www.w3.org/2000/svg';

/** @type {Vnode['catch']} */
const defaultCatch = exception => console.error(exception);

/** @param {unknown} value */
const isEmpty = value => value == null || value === false || value === '';

/**
 * @param {unknown} value
 * @returns {value is AnyFunction}
 */
const isFunction = value => typeof value === 'function';

/**
 * @param {unknown} value
 * @returns {value is {[key: string]: unknown}}
 */
const isObject = value => typeof value === 'object' && value !== null;

/** @param {{ children?: Children }} props */
export const Fragment = props => props.children;

/** @param {{ children?: Children; to: ParentNode }} props */
export const Portal = props => props.children;

/** @param {{ children?: Children; catch: Vnode['catch'] }} props */
export const Try = props => {
  /** @type {Vnode} */ (currentVnode).catch = props.catch;
  return props.children;
};

/**
 * @template T
 * @param {T} value
 */
export const createContext = value => {
  /** @type {Context<T>} */
  const Context = ({ value, children }) => {
    const vnode = /** @type {Vnode} */ (currentVnode);

    const context = useMemo(() => {
      const context = { deps: /** @type {Set<Vnode>} */ (new Set()), value };
      vnode.contexts = new Map(vnode.contexts).set(
        /** @type {Context<unknown>} */ (Context),
        context
      );
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

  Context.value = value;

  return Context;
};

/**
 * @param {Type} type
 * @param {Props} props
 * @param {ParentNode} parentNode
 */
const createNode = (type, props, parentNode) => {
  if (isFunction(type) || type === emptyType) return null;

  if (type === textType) {
    return parentNode.ownerDocument.createTextNode(
      /** @type {{ nodeValue: string }} */ (props).nodeValue
    );
  }

  return parentNode.ownerDocument.createElementNS(
    type === 'svg'
      ? svgNs
      : 'namespaceURI' in parentNode
        ? parentNode.namespaceURI
        : parentNode.host.namespaceURI,
    type
  );
};

/**
 * @template {Element} Node
 * @param {Node} node
 * @param {keyof Node} key
 */
const isSimpleProperty = (node, key) =>
  key in node && (node[key] == null || !isObject(node[key]));

/**
 * @template {Element | Text} T
 * @param {T} node
 * @param {Props<T>} prev
 * @param {Props<T>} next
 */
const updateNode = (node, prev, next) => {
  if (prev === next) return;

  // Element.prototype.TEXT_NODE
  if (node.nodeType === 3) {
    node.nodeValue = /** @type {string} */ (next.nodeValue);
    return;
  }

  for (const key in prev) {
    if (key === 'children' || key in next) continue;

    if (key === 'ref') {
      if (prev.ref) prev.ref.current = null;
      // @ts-expect-error assignment of a readonly property would fail
    } else if (isSimpleProperty(node, key)) node[key] = '';
    else /** @type {Element} */ (node).removeAttribute(key);
  }

  for (const key in next) {
    if (key === 'children' || prev[key] === next[key]) continue;

    if (key === 'ref') {
      if (prev.ref) prev.ref.current = null;
      if (next.ref) next.ref.current = node;
    } else if (key === 'style' && isObject(next[key])) {
      const { style } = /** @type {HTMLElement | SVGElement} */ (node);
      const prevStyle = /** @type {Partial<CSSStyleDeclaration>} */ (
        isObject(prev[key]) ? prev[key] : emptyObject
      );
      const nextStyle = /** @type {Partial<CSSStyleDeclaration>} */ (next[key]);
      for (const key in prevStyle) if (!(key in nextStyle)) style[key] = '';
      for (const key in nextStyle) style[key] = nextStyle[key] ?? '';
      // @ts-expect-error assignment of a readonly property would fail
    } else if (isSimpleProperty(node, key)) node[key] = next[key] ?? '';
    else if (next[key] != null) {
      /** @type {Element} */ (node).setAttribute(
        key,
        /** @type {string} */ (next[key])
      );
    } else /** @type {Element} */ (node).removeAttribute(key);
  }
};

/** @type {Vnode | null} */
let currentVnode = null;

let effectIndex = 0;

let refIndex = 0;

/**
 * @template T
 * @param {T | (() => T)} initial
 */
export const useRef = initial => {
  const vnode = /** @type {Vnode} */ (currentVnode);
  vnode.refs ??= [];
  let ref = /** @type {undefined | Ref<T>} */ (vnode.refs[refIndex++]);
  if (!ref) {
    ref = { current: isFunction(initial) ? initial() : initial };
    vnode.refs.push(ref);
  }
  return ref;
};

/**
 * @param {AfterEffect} fn
 * @param {unknown[]} [deps]
 */
export const useEffect = (fn, deps) => {
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
export const useMemo = (fn, deps = emptyArray) => {
  const ref = useRef(() => ({ value: fn(), deps }));
  if (depsChanged(ref.current.deps, deps)) {
    ref.current.value = fn();
    ref.current.deps = deps;
  }
  return ref.current.value;
};

/**
 * @template T
 * @param {T | (() => T)} initial
 */
export const useState = initial => {
  const vnode = /** @type {Vnode} */ (currentVnode);
  /** @type {State<T>} */
  const state = useMemo(() => [
    isFunction(initial) ? initial() : initial,
    maybeValue => {
      const value = isFunction(maybeValue) ? maybeValue(state[0]) : maybeValue;
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
  if (before === after) return false;

  let { length } = before;
  if (length !== after.length) return true;

  while (length--) if (before[length] !== after[length]) return true;

  return false;
};

/**
 * @template {AnyFunction} T
 * @param {T} fn
 */
export const useCallback = fn => {
  const ref = useRef(() => fn);
  ref.current = fn;
  return useMemo(
    () => /** @type {T} */ ((...args) => ref.current.apply(null, args))
  );
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
 * @template {Component} T
 * @param {T} Component
 * @param {typeof defaultMemo} [memo]
 */
export const memo = (Component, memo = defaultMemo) => {
  Component.memo = memo;
  return Component;
};

/**
 * @template {Context<any>} T
 * @param {T} Context
 */
export const useContext = Context => {
  const vnode = /** @type {Vnode} */ (currentVnode);

  const context = vnode.contexts?.get(Context);

  useEffect(() => {
    if (!context) return;

    context.deps.add(vnode);
    return () => context.deps.delete(vnode);
  }, [context, vnode]);

  return /** @type {T['value']} */ ((context ?? Context).value);
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
      for (const vnode of batch) if (vnode.state === 1) update(vnode);
      flush(queues);
    });
  }
  updates.push(vnode);
  vnode.state = 1;
};

/** @param {Vnode} vnode */
const getDefs = vnode => {
  let { children } = vnode.props;
  if (isFunction(vnode.type)) {
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

  if (isEmpty(children)) return emptyArray;

  if (Array.isArray(children)) return children;

  return [children];
};

/** @param {unknown} def */
const normalizeDef = def => {
  if (isEmpty(def)) return emptyDef;

  if (Array.isArray(def)) return jsx(Fragment, { children: def });

  if (
    isObject(def) &&
    (typeof def.type === 'string' || isFunction(def.type)) &&
    isObject(def.props) &&
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
const update = vnode => {
  const { depth, queues } = vnode;
  const { afterEffects, inserts, nodeUpdates } = queues;

  let child = vnode.child;
  const prevChildren = child && /** @type {Map<unknown, Vnode>} */ (new Map());
  for (; child; child = child.sibling) {
    /** @type {NonNullable<typeof prevChildren>} */ (prevChildren).set(
      child.key ?? child.index,
      child
    );
  }
  const parentNode = /** @type {ParentNode} */ (vnode.node ?? vnode.parentNode);
  const defs = getDefs(vnode);

  if (vnode.effects) {
    try {
      for (const effect of vnode.effects) {
        if (effect.after && effect.before) {
          effect.before();
          effect.before = undefined;
        }
      }
    } catch (exception) {
      vnode.catch(exception);
    }
  }

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
    /** @type {Parameters<typeof updateNode> | null} */
    let nodeUpdate = null;
    let needsInsert = false;
    if (child?.type === type) {
      /** @type {NonNullable<typeof prevChildren>} */ (prevChildren).delete(
        key ?? i
      );
      child.index = i;
      child.sibling = null;
      if (!isFunction(child.type) || !child.type.memo?.(child.props, props)) {
        if (child.node) nodeUpdate = [child.node, child.props, props];
        child.props = props;
        child.state = 1;
      }
      if (
        child.parentNode === vnode.node &&
        child.lastNode &&
        child.prevNode !== prevNode
      ) {
        needsInsert = true;
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
          parentNode: type === Portal ? props.to : parentNode,
          prevNode: type === Portal ? props.to.lastChild : prevNode,
          props,
          queues,
          refs: null,
          sibling: null,
          state: 1,
          type
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
    if (nodeUpdate) nodeUpdates.push(nodeUpdate);
    if (needsInsert) inserts.push(child);
    if (child.parentNode === parentNode && child.lastNode) {
      prevNode = child.lastNode;
    }
    prevChild = child;
  }
  vnode.lastNode = vnode.node ?? prevNode ?? null;

  if (prevChildren) for (const child of prevChildren.values()) remove(child);

  if (vnode.effects) afterEffects.push(vnode);
};

/**
 * @param {Vnode} vnode
 * @param {boolean} removeNode
 */
const remove = (vnode, removeNode = true) => {
  vnode.state = 3;

  let { effects, child, props, node } = vnode;

  if (effects) {
    try {
      for (const effect of effects) {
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

  if (node) {
    if (props.ref) props.ref.current = null;
    if (removeNode) vnode.queues.removes.push(node);
  }
};

/** @param {Queues} queues */
const flush = queues => {
  for (const node of queues.removes) node.remove();

  queues.removes = [];

  for (const vnode of queues.inserts) {
    const { parentNode, prevNode, props } = vnode;
    const before = prevNode ? prevNode.nextSibling : parentNode.firstChild;
    for (let child = /** @type {Vnode | null} */ (vnode); child; ) {
      const { node } = child;
      if (node) {
        if (!node.parentNode) {
          updateNode(node, emptyObject, props);
          parentNode.insertBefore(node, before);
          break;
        }

        if (node === before || node.nextSibling === before) break;

        // @ts-expect-error moveBefore is available on modern browsers
        parentNode[moveBefore](node, before);

        if (child === vnode) break;
      }

      if (child.child && !node) child = child.child;
      else if (child.sibling) child = child.sibling;
      else {
        while (child !== vnode && child.parent && !child.sibling) {
          child = child.parent;
        }

        if (child === vnode) break;

        child = child.sibling;
      }
    }
  }

  queues.inserts = [];

  for (const args of queues.nodeUpdates) updateNode.apply(null, args);

  queues.nodeUpdates = [];

  for (const vnode of queues.afterEffects) {
    try {
      for (const effect of /** @type {NonNullable<Vnode['effects']>} */ (
        vnode.effects
      )) {
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

/** @param {ParentNode} parentNode */
export const createRender = parentNode => {
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
    props: { children: undefined },
    queues: {
      afterEffects: [],
      inserts: [],
      nodeUpdates: [],
      removes: [],
      updates: []
    },
    refs: null,
    sibling: null,
    state: 1,
    type: Fragment
  };

  /** @param {Children} [children] */
  return children => {
    vnode.props.children = children;
    update(vnode);
    flush(vnode.queues);
  };
};
