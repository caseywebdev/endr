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
 *   ref?: Ref<T | null> | null;
 *   style?: Partial<CSSStyleDeclaration> | string | null;
 * }} SharedElementProps
 */

/**
 * @typedef {{
 *   [key: `data-${string}`]: string | null | undefined;
 *   'aria-atomic'?: 'true' | 'false' | null;
 *   'aria-autocomplete'?: 'none' | 'inline' | 'list' | 'both' | null;
 *   'aria-busy'?: 'true' | 'false' | null;
 *   'aria-checked'?: 'true' | 'false' | 'mixed' | null;
 *   'aria-colcount'?: string | null;
 *   'aria-colindex'?: string | null;
 *   'aria-colspan'?: string | null;
 *   'aria-controls'?: string | null;
 *   'aria-current'?:
 *     | 'page'
 *     | 'step'
 *     | 'location'
 *     | 'date'
 *     | 'time'
 *     | 'true'
 *     | 'false'
 *     | null;
 *   'aria-describedby'?: string | null;
 *   'aria-details'?: string | null;
 *   'aria-disabled'?: 'true' | 'false' | null;
 *   'aria-errormessage'?: string | null;
 *   'aria-expanded'?: 'true' | 'false' | null;
 *   'aria-haspopup'?:
 *     | 'dialog'
 *     | 'menu'
 *     | 'listbox'
 *     | 'tree'
 *     | 'grid'
 *     | 'true'
 *     | 'false'
 *     | null;
 *   'aria-hidden'?: 'true' | 'false' | null;
 *   'aria-invalid'?: 'true' | 'false' | 'grammar' | 'spelling' | null;
 *   'aria-keyshortcuts'?: string | null;
 *   'aria-label'?: string | null;
 *   'aria-labelledby'?: string | null;
 *   'aria-level'?: string | null;
 *   'aria-live'?: 'off' | 'polite' | 'assertive' | null;
 *   'aria-modal'?: 'true' | 'false' | null;
 *   'aria-multiline'?: 'true' | 'false' | null;
 *   'aria-multiselectable'?: 'true' | 'false' | null;
 *   'aria-orientation'?: 'horizontal' | 'vertical' | null;
 *   'aria-owns'?: string | null;
 *   'aria-placeholder'?: string | null;
 *   'aria-posinset'?: string | null;
 *   'aria-pressed'?: 'true' | 'false' | 'mixed' | null;
 *   'aria-readonly'?: 'true' | 'false' | null;
 *   'aria-relevant'?: string | null;
 *   'aria-required'?: 'true' | 'false' | null;
 *   'aria-roledescription'?: string | null;
 *   'aria-rowcount'?: string | null;
 *   'aria-rowindex'?: string | null;
 *   'aria-rowspan'?: string | null;
 *   'aria-selected'?: 'true' | 'false' | null;
 *   'aria-setsize'?: string | null;
 *   'aria-sort'?: 'none' | 'ascending' | 'descending' | 'other' | null;
 *   'aria-valuemax'?: string | null;
 *   'aria-valuemin'?: string | null;
 *   'aria-valuenow'?: string | null;
 *   'aria-valuetext'?: string | null;
 *   accesskey?: string | null;
 *   autocapitalize?:
 *     | 'off'
 *     | 'none'
 *     | 'on'
 *     | 'sentences'
 *     | 'words'
 *     | 'characters'
 *     | null;
 *   autofocus?: 'true' | null;
 *   class?: string | null;
 *   contenteditable?: 'true' | 'false' | 'inherit' | null;
 *   dir?: 'ltr' | 'rtl' | 'auto' | null;
 *   draggable?: 'true' | 'false' | null;
 *   enterkeyhint?:
 *     | 'enter'
 *     | 'done'
 *     | 'go'
 *     | 'next'
 *     | 'previous'
 *     | 'search'
 *     | 'send'
 *     | null;
 *   hidden?: 'true' | null;
 *   id?: string | null;
 *   inputmode?: string | null;
 *   is?: string | null;
 *   itemid?: string | null;
 *   itemprop?: string | null;
 *   itemref?: string | null;
 *   itemscope?: 'true' | null;
 *   itemtype?: string | null;
 *   lang?: string | null;
 *   nonce?: string | null;
 *   part?: string | null;
 *   role?: string | null;
 *   spellcheck?: 'true' | 'false' | null;
 *   style?: string | null;
 *   tabindex?: string | null;
 *   title?: string | null;
 *   translate?: 'yes' | 'no' | null;
 * }} GlobalAttributes
 */

/**
 * @typedef {GlobalAttributes & {
 *   'accept-charset'?: string | null;
 *   'http-equiv'?: string | null;
 *   accept?: string | null;
 *   action?: string | null;
 *   allow?: string | null;
 *   alt?: string | null;
 *   async?: 'true' | null;
 *   autocomplete?: 'on' | 'off' | string | null;
 *   autofocus?: 'true' | null;
 *   autoplay?: 'true' | null;
 *   capture?: 'true' | null;
 *   charset?: 'utf-8' | string | null;
 *   checked?: 'true' | null;
 *   cite?: string | null;
 *   cols?: string | null;
 *   colspan?: string | null;
 *   content?: string | null;
 *   controls?: 'true' | null;
 *   coords?: string | null;
 *   crossorigin?: 'anonymous' | 'use-credentials' | '' | null;
 *   datetime?: string | null;
 *   decoding?: 'auto' | 'sync' | 'async' | null;
 *   default?: 'true' | null;
 *   defer?: 'true' | null;
 *   disabled?: 'true' | null;
 *   download?: 'true' | string | null;
 *   enctype?:
 *     | 'application/x-www-form-urlencoded'
 *     | 'multipart/form-data'
 *     | 'text/plain'
 *     | null;
 *   fetchpriority?: 'auto' | 'high' | 'low' | null;
 *   for?: string | null;
 *   form?: string | null;
 *   formaction?: string | null;
 *   formenctype?:
 *     | 'application/x-www-form-urlencoded'
 *     | 'multipart/form-data'
 *     | 'text/plain'
 *     | null;
 *   formmethod?: 'get' | 'post' | 'dialog' | null;
 *   formnovalidate?: 'true' | null;
 *   formtarget?: '_self' | '_blank' | '_parent' | '_top' | string | null;
 *   headers?: string | null;
 *   height?: string | null;
 *   high?: string | null;
 *   href?: string | null;
 *   hreflang?: string | null;
 *   integrity?: string | null;
 *   ismap?: 'true' | null;
 *   kind?:
 *     | 'captions'
 *     | 'chapters'
 *     | 'descriptions'
 *     | 'metadata'
 *     | 'subtitles'
 *     | string
 *     | null;
 *   label?: string | null;
 *   list?: string | null;
 *   loading?: 'lazy' | 'eager' | 'auto' | null;
 *   loop?: 'true' | null;
 *   low?: string | null;
 *   max?: string | null;
 *   maxlength?: string | null;
 *   media?: string | null;
 *   method?: 'get' | 'post' | 'dialog' | string | null;
 *   min?: string | null;
 *   minlength?: string | null;
 *   multiple?: 'true' | null;
 *   muted?: 'true' | null;
 *   name?: string | null;
 *   nomodule?: 'true' | null;
 *   nonce?: string | null;
 *   novalidate?: 'true' | null;
 *   open?: 'true' | null;
 *   optimum?: string | null;
 *   pattern?: string | null;
 *   placeholder?: string | null;
 *   playsinline?: 'true' | null;
 *   poster?: string | null;
 *   preload?: 'none' | 'metadata' | 'auto' | '' | null;
 *   readonly?: 'true' | null;
 *   referrerpolicy?:
 *     | 'no-referrer'
 *     | 'no-referrer-when-downgrade'
 *     | 'origin'
 *     | 'origin-when-cross-origin'
 *     | 'same-origin'
 *     | 'strict-origin'
 *     | 'strict-origin-when-cross-origin'
 *     | 'unsafe-url'
 *     | null;
 *   rel?:
 *     | 'alternate'
 *     | 'author'
 *     | 'bookmark'
 *     | 'canonical'
 *     | 'dns-prefetch'
 *     | 'external'
 *     | 'help'
 *     | 'icon'
 *     | 'license'
 *     | 'manifest'
 *     | 'modulepreload'
 *     | 'next'
 *     | 'nofollow'
 *     | 'noopener'
 *     | 'noreferrer'
 *     | 'opensearch'
 *     | 'pingback'
 *     | 'preconnect'
 *     | 'prefetch'
 *     | 'preload'
 *     | 'prerender'
 *     | 'prev'
 *     | 'search'
 *     | 'shortlink'
 *     | 'stylesheet'
 *     | 'tag'
 *     | string
 *     | null;
 *   required?: 'true' | null;
 *   reversed?: 'true' | null;
 *   rows?: string | null;
 *   rowspan?: string | null;
 *   sandbox?:
 *     | 'allow-downloads'
 *     | 'allow-forms'
 *     | 'allow-modals'
 *     | 'allow-orientation-lock'
 *     | 'allow-pointer-lock'
 *     | 'allow-popups'
 *     | 'allow-popups-to-escape-sandbox'
 *     | 'allow-presentation'
 *     | 'allow-same-origin'
 *     | 'allow-scripts'
 *     | 'allow-top-navigation'
 *     | string
 *     | null;
 *   scope?: 'col' | 'colgroup' | 'row' | 'rowgroup' | null;
 *   selected?: 'true' | null;
 *   shape?: 'rect' | 'circle' | 'poly' | 'default' | null;
 *   size?: string | null;
 *   sizes?: string | null;
 *   slot?: string | null;
 *   span?: string | null;
 *   src?: string | null;
 *   srcdoc?: string | null;
 *   srclang?: string | null;
 *   srcset?: string | null;
 *   start?: string | null;
 *   step?: string | null;
 *   target?: '_self' | '_blank' | '_parent' | '_top' | string | null;
 *   type?: string | null;
 *   usemap?: string | null;
 *   value?: string | null;
 *   width?: string | null;
 *   wrap?: 'hard' | 'soft' | null;
 * }} HTMLAttributes
 */

/**
 * @typedef {GlobalAttributes & {
 *   'alignment-baseline'?: string | null;
 *   'clip-path'?: string | null;
 *   'fill-opacity'?: string | null;
 *   'fill-rule'?: 'nonzero' | 'evenodd' | null;
 *   'flood-color'?: string | null;
 *   'flood-opacity'?: string | null;
 *   'font-family'?: string | null;
 *   'font-size'?: string | null;
 *   'font-weight'?: string | null;
 *   'marker-end'?: string | null;
 *   'marker-mid'?: string | null;
 *   'marker-start'?: string | null;
 *   'pointer-events'?: string | null;
 *   'stop-color'?: string | null;
 *   'stop-opacity'?: string | null;
 *   'stroke-dasharray'?: string | null;
 *   'stroke-dashoffset'?: string | null;
 *   'stroke-linecap'?: 'butt' | 'round' | 'square' | null;
 *   'stroke-linejoin'?: 'miter' | 'round' | 'bevel' | null;
 *   'stroke-miterlimit'?: string | null;
 *   'stroke-opacity'?: string | null;
 *   'stroke-width'?: string | null;
 *   'xlink:href'?: string | null;
 *   clip?: string | null;
 *   color?: string | null;
 *   cursor?: string | null;
 *   cx?: string | null;
 *   cy?: string | null;
 *   d?: string | null;
 *   display?: string | null;
 *   fill?: string | null;
 *   filter?: string | null;
 *   font?: string | null;
 *   fx?: string | null;
 *   fy?: string | null;
 *   gradientTransform?: string | null;
 *   gradientUnits?: string | null;
 *   height?: string | null;
 *   href?: string | null;
 *   mask?: string | null;
 *   offset?: string | null;
 *   opacity?: string | null;
 *   overflow?: string | null;
 *   patternUnits?: string | null;
 *   preserveAspectRatio?: string | null;
 *   r?: string | null;
 *   rx?: string | null;
 *   ry?: string | null;
 *   stroke?: string | null;
 *   textAnchor?: 'start' | 'middle' | 'end' | 'inherit' | null;
 *   transform?: string | null;
 *   viewBox?: string | null;
 *   visibility?: string | null;
 *   width?: string | null;
 *   x?: string | null;
 *   x1?: string | null;
 *   x2?: string | null;
 *   xmlns?: 'http://www.w3.org/2000/svg' | string | null;
 *   y?: string | null;
 *   y1?: string | null;
 *   y2?: string | null;
 * }} SVGAttributes
 */

/**
 * @template {Element} T
 * @typedef {T extends HTMLElement
 *   ? HTMLAttributes
 *   : T extends SVGElement
 *     ? SVGAttributes
 *     : never} ElementAttributes
 */

/**
 * @template {Element} T
 * @template [Shared=SharedElementProps<T>] Default is `SharedElementProps<T>`
 * @template [Attributes=ElementAttributes<T>] Default is `ElementAttributes<T>`
 * @typedef {{
 *   [K in keyof Shared | keyof T | keyof Attributes]?: K extends keyof Shared
 *     ? Shared[K]
 *     : K extends keyof T
 *       ? T[K] extends number | boolean | ((...args: any[]) => any) | null
 *         ? T[K]
 *         : string | null
 *       : K extends keyof Attributes
 *         ? Attributes[K]
 *         : never;
 * }} ElementProps
 */

/** @typedef {SharedElementProps & { [K: string]: unknown }} UnknownElementProps */

/**
 * @template [T=unknown] Default is `unknown`
 * @typedef {T extends FC
 *   ? Parameters<T>[0] extends undefined
 *     ? {}
 *     : Parameters<T>[0]
 *   : T extends keyof HTMLElementTagNameMap
 *     ? ElementProps<HTMLElementTagNameMap[T]>
 *     : T extends keyof SVGElementTagNameMap
 *       ? ElementProps<SVGElementTagNameMap[T]>
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

/** @typedef {{ render: (children: Children) => void; unmount: () => void }} Root */

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

/** @typedef {Element | ShadowRoot} ParentNode */

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
 * @typedef {ReturnType<typeof createContext<T>>} Context
 */

/**
 * @template T
 * @typedef {<U extends T>(
 *   value: (T extends Function ? never : U) | ((current: T) => U)
 * ) => U} SetState
 */

/**
 * @template T
 * @typedef {[T, SetState<T>]} State
 */

const { console, queueMicrotask } = globalThis;

/**
 * @template {Type} T
 * @param {T} type
 * @param {Props<T>} props
 * @param {Key} [key]
 */
export const jsx = (
  type,
  props = /** @type {Props<T>} */ (emptyProps),
  key
) => ({ type, props, key });

export const jsxs = jsx;

export const jsxDEV = jsx;

export const jsxsDEV = jsx;

const emptyProps = /** @type {const} */ ({});

const emptyType = /** @type {Type} */ ({});

const emptyDef = jsx(emptyType, emptyProps);

const textType = /** @type {Type} */ ({});

const emptyDeps = /** @type {unknown[]} */ ([]);

const svgNs = 'http://www.w3.org/2000/svg';

/** @type {Vnode['catch']} */
const defaultCatch = exception => console.error(exception);

/** @param {unknown} value */
const isEmpty = value => value == null || value === false || value === '';

/**
 * @param {unknown} value
 * @returns {value is Function}
 */
const isFunction = value => typeof value === 'function';

/**
 * @param {unknown} value
 * @returns {value is (unknown)[]}
 */
const isArray = value => Array.isArray(value);

/**
 * @param {unknown} value
 * @returns {value is {[key: string]: unknown}}
 */
const isObject = value => typeof value === 'object';

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
  const Context = Object.assign(
    /** @param {{ value: T; children?: Children }} props */
    ({ value, children }) => {
      const vnode = /** @type {Vnode} */ (currentVnode);

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
    },
    { value }
  );

  return Context;
};

/**
 * @param {Type} type
 * @param {Props} props
 * @param {ParentNode} parentNode
 */
const createNode = (type, props, parentNode) =>
  isFunction(type) || type === emptyType
    ? null
    : type === textType
      ? parentNode.ownerDocument.createTextNode(
          /** @type {{ nodeValue: string }} */ (props).nodeValue
        )
      : parentNode.ownerDocument.createElementNS(
          type === 'svg'
            ? svgNs
            : 'namespaceURI' in parentNode
              ? parentNode.namespaceURI
              : parentNode.host.namespaceURI,
          type
        );

/**
 * @param {Node} node
 * @returns {node is Text}
 */
const isText = node => node.nodeType === node.TEXT_NODE;

/**
 * @template {Element} Node
 * @param {Node} node
 * @param {keyof Node} key
 */
const isSimpleProperty = (node, key) =>
  key in node && (node[key] == null || !isObject(node[key]));

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
 * @param {Props<T>} prev
 * @param {Props<T>} next
 */
const updateNode = (node, prev, next) => {
  if (isText(node)) {
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
    } else if (key === 'style' && next[key] && isObject(next[key])) {
      setStyle(
        /** @type {HTMLElement | SVGElement} */ (node).style,
        prev[key] && isObject(prev[key]) ? prev[key] : {},
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
export const useMemo = (fn, deps = emptyDeps) => {
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
  return /** @type {State<T>} */ ([...state]);
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
 * @template {(...args: any[]) => any} T
 * @param {T} fn
 */
export const useCallback = fn => {
  const ref = useRef(() => fn);
  ref.current = fn;
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
  return isEmpty(children) ? [] : isArray(children) ? children : [children];
};

/** @param {unknown} def */
const normalizeDef = def => {
  if (isEmpty(def)) return emptyDef;

  if (Array.isArray(def)) return jsx(Fragment, { children: def });

  if (
    def &&
    isObject(def) &&
    Object.keys(def).length === 3 &&
    'type' in def &&
    (typeof def.type === 'string' || isFunction(def.type)) &&
    'props' in def &&
    def.props &&
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
  const parentNode = /** @type {ParentNode} */ (vnode.node ?? vnode.parentNode);
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

  for (let i = 0; i < inserts.length; ++i) {
    const { node, parentNode, prevNode, props } = inserts[i];
    updateNode(/** @type {Element} */ (node), emptyProps, props);
    if (prevNode) prevNode.after(/** @type {Element} */ (node));
    else parentNode.prepend(/** @type {Element} */ (node));
  }

  queues.inserts = [];

  for (let i = 0; i < nodeUpdates.length; ++i) updateNode(...nodeUpdates[i]);

  queues.nodeUpdates = [];

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

/** @param {ParentNode} parentNode */
export const createRoot = parentNode => {
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
