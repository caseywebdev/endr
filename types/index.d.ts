export type Child = Def | string | number | false | null | undefined;
export type Children = Child | Child[];
export type FC = (props: any) => Children;
export type TagName = keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap;
export type Type = TagName | FC;
export type ElementProps = {
    children?: Children;
    ref?: Ref<unknown>;
    style?: Partial<CSSStyleDeclaration>;
};
export type Props<T = unknown> = T extends FC ? Parameters<T>[0] extends undefined ? {} : Parameters<T>[0] : ElementProps & (T extends keyof HTMLElementTagNameMap ? { -readonly [K in keyof Omit<HTMLElementTagNameMap[T], keyof ElementProps>]?: HTMLElementTagNameMap[T][K]; } : T extends keyof SVGElementTagNameMap ? { -readonly [K_1 in keyof Omit<SVGElementTagNameMap[T], keyof ElementProps>]?: SVGElementTagNameMap[T][K_1]; } : {
    [key: string]: unknown;
});
export type Key = string | number | boolean | undefined;
export type Def = {
    type: Type;
    props: Props;
    key: Key;
};
export type Ref<T> = {
    current: T;
};
export type BeforeEffect = (() => void | unknown) | void | undefined;
export type AfterEffect = () => BeforeEffect;
export type Effect = {
    before: BeforeEffect;
    after: AfterEffect | undefined;
    deps: unknown[] | undefined;
};
export type Vnode = {
    contexts: Map<({ value, children }: {
        value: unknown;
        children?: Children;
    }) => Children, {
        vnodes: Set<Vnode>;
        value: unknown;
    }> | null;
    child: Vnode | null;
    deleted: boolean;
    effects: Effect[] | null;
    key: Key;
    node: Element | Text | null;
    parent: Vnode | null;
    parentNode: Element | null;
    path: number[];
    prevSiblingNode: Element | Text | null;
    props: Props;
    queued: boolean;
    refs: Ref<unknown>[] | null;
    shouldUpdate: boolean | null;
    sibling: Vnode | null;
    type: Type;
    updated: boolean;
};
export function createContext(): ({ value, children }: {
    value: unknown;
    children?: Children;
}) => Children;
export function Fragment(props: {
    children?: Children;
}): Children;
/** @typedef {Def | string | number | false | null | undefined} Child */
/** @typedef {Child | Child[]} Children */
/** @typedef {(props: any) => Children} FC */
/** @typedef {keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap} TagName */
/** @typedef {TagName | FC} Type */
/**
 * @typedef {{
 *   children?: Children;
 *   ref?: Ref<unknown>;
 *   style?: Partial<CSSStyleDeclaration>;
 * }} ElementProps
 */
/**
 * @template [T=unknown] Default is `unknown`
 * @typedef {T extends FC
 *   ? Parameters<T>[0] extends undefined
 *     ? {}
 *     : Parameters<T>[0]
 *   : ElementProps &
 *       (T extends keyof HTMLElementTagNameMap
 *         ? {
 *             -readonly [K in keyof Omit<
 *               HTMLElementTagNameMap[T],
 *               keyof ElementProps
 *             >]?: HTMLElementTagNameMap[T][K];
 *           }
 *         : T extends keyof SVGElementTagNameMap
 *           ? {
 *               -readonly [K in keyof Omit<
 *                 SVGElementTagNameMap[T],
 *                 keyof ElementProps
 *               >]?: SVGElementTagNameMap[T][K];
 *             }
 *           : { [key: string]: unknown })} Props
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
export function jsx<T extends Type>(type: T, props?: Props<T>, key?: Key): {
    type: T;
    props: Props<T>;
    key: Key;
};
/** @typedef {Def | string | number | false | null | undefined} Child */
/** @typedef {Child | Child[]} Children */
/** @typedef {(props: any) => Children} FC */
/** @typedef {keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap} TagName */
/** @typedef {TagName | FC} Type */
/**
 * @typedef {{
 *   children?: Children;
 *   ref?: Ref<unknown>;
 *   style?: Partial<CSSStyleDeclaration>;
 * }} ElementProps
 */
/**
 * @template [T=unknown] Default is `unknown`
 * @typedef {T extends FC
 *   ? Parameters<T>[0] extends undefined
 *     ? {}
 *     : Parameters<T>[0]
 *   : ElementProps &
 *       (T extends keyof HTMLElementTagNameMap
 *         ? {
 *             -readonly [K in keyof Omit<
 *               HTMLElementTagNameMap[T],
 *               keyof ElementProps
 *             >]?: HTMLElementTagNameMap[T][K];
 *           }
 *         : T extends keyof SVGElementTagNameMap
 *           ? {
 *               -readonly [K in keyof Omit<
 *                 SVGElementTagNameMap[T],
 *                 keyof ElementProps
 *               >]?: SVGElementTagNameMap[T][K];
 *             }
 *           : { [key: string]: unknown })} Props
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
export function jsxDEV<T extends Type>(type: T, props?: Props<T>, key?: Key): {
    type: T;
    props: Props<T>;
    key: Key;
};
/** @typedef {Def | string | number | false | null | undefined} Child */
/** @typedef {Child | Child[]} Children */
/** @typedef {(props: any) => Children} FC */
/** @typedef {keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap} TagName */
/** @typedef {TagName | FC} Type */
/**
 * @typedef {{
 *   children?: Children;
 *   ref?: Ref<unknown>;
 *   style?: Partial<CSSStyleDeclaration>;
 * }} ElementProps
 */
/**
 * @template [T=unknown] Default is `unknown`
 * @typedef {T extends FC
 *   ? Parameters<T>[0] extends undefined
 *     ? {}
 *     : Parameters<T>[0]
 *   : ElementProps &
 *       (T extends keyof HTMLElementTagNameMap
 *         ? {
 *             -readonly [K in keyof Omit<
 *               HTMLElementTagNameMap[T],
 *               keyof ElementProps
 *             >]?: HTMLElementTagNameMap[T][K];
 *           }
 *         : T extends keyof SVGElementTagNameMap
 *           ? {
 *               -readonly [K in keyof Omit<
 *                 SVGElementTagNameMap[T],
 *                 keyof ElementProps
 *               >]?: SVGElementTagNameMap[T][K];
 *             }
 *           : { [key: string]: unknown })} Props
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
export function jsxs<T extends Type>(type: T, props?: Props<T>, key?: Key): {
    type: T;
    props: Props<T>;
    key: Key;
};
/** @typedef {Def | string | number | false | null | undefined} Child */
/** @typedef {Child | Child[]} Children */
/** @typedef {(props: any) => Children} FC */
/** @typedef {keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap} TagName */
/** @typedef {TagName | FC} Type */
/**
 * @typedef {{
 *   children?: Children;
 *   ref?: Ref<unknown>;
 *   style?: Partial<CSSStyleDeclaration>;
 * }} ElementProps
 */
/**
 * @template [T=unknown] Default is `unknown`
 * @typedef {T extends FC
 *   ? Parameters<T>[0] extends undefined
 *     ? {}
 *     : Parameters<T>[0]
 *   : ElementProps &
 *       (T extends keyof HTMLElementTagNameMap
 *         ? {
 *             -readonly [K in keyof Omit<
 *               HTMLElementTagNameMap[T],
 *               keyof ElementProps
 *             >]?: HTMLElementTagNameMap[T][K];
 *           }
 *         : T extends keyof SVGElementTagNameMap
 *           ? {
 *               -readonly [K in keyof Omit<
 *                 SVGElementTagNameMap[T],
 *                 keyof ElementProps
 *               >]?: SVGElementTagNameMap[T][K];
 *             }
 *           : { [key: string]: unknown })} Props
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
export function jsxsDEV<T extends Type>(type: T, props?: Props<T>, key?: Key): {
    type: T;
    props: Props<T>;
    key: Key;
};
/**
 * @template {FC} Component
 * @param {Component} Component
 * @param {typeof defaultIsEqual} [isEqual]
 */
export function memo<Component extends FC>(Component: Component, isEqual?: typeof defaultIsEqual): (props: Props<Component>) => {
    type: Component;
    props: Props<Component>;
    key: Key;
};
/**
 * @param {Children} children
 * @param {Element} node
 */
export function render(children: Children, node: Element): void;
/**
 * @template {(...args: unknown[]) => unknown} T
 * @param {T} fn
 */
export function useCallback<T extends (...args: unknown[]) => unknown>(fn: T): T;
/** @param {ReturnType<typeof createContext>} Context */
export function useContext(Context: ReturnType<typeof createContext>): any;
/**
 * @param {AfterEffect} fn
 * @param {unknown[]} [deps]
 */
export function useEffect(fn: AfterEffect, deps?: unknown[]): void;
/**
 * @template T
 * @param {(...args: unknown[]) => T} fn
 * @param {unknown[]} [deps]
 */
export function useMemo<T>(fn: (...args: unknown[]) => T, deps?: unknown[]): T;
/**
 * @template T
 * @param {T} initial
 */
export function useRef<T>(initial: T): Ref<T>;
/**
 * @template T
 * @param {T} initial
 */
export function useState<T>(initial: T): [T, (next: T | ((current: T) => T)) => T];
/**
 * @param {{ [key: string]: unknown }} prev
 * @param {{ [key: string]: unknown }} next
 */
declare function defaultIsEqual(prev: {
    [key: string]: unknown;
}, next: {
    [key: string]: unknown;
}): boolean;
export {};
