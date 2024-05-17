export type Child = Def | string | number | boolean | null | undefined;
export type Children = Child | Child[];
export type FC<P = {}> = (props: P) => Children;
export type ElementProps = {
    children?: Children;
    ref?: Ref<unknown>;
    style?: Partial<CSSStyleDeclaration>;
};
export type Type = keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap | FC;
export type Props<T = unknown> = T extends FC ? Parameters<T>[0] : ElementProps & Omit<T extends keyof HTMLElementTagNameMap ? Partial<HTMLElementTagNameMap[T]> : T extends keyof SVGElementTagNameMap ? Partial<SVGElementTagNameMap[T]> : {
    [key: string]: unknown;
}, keyof ElementProps>;
export type Def = {
    type: Type;
    props: Props;
    key: unknown;
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
    key: unknown;
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
/** @typedef {Def | string | number | boolean | null | undefined} Child */
/** @typedef {Child | Child[]} Children */
/**
 * @template [P={}] Default is `{}`
 * @typedef {(props: P) => Children} FC
 */
/**
 * @typedef {{
 *   children?: Children;
 *   ref?: Ref<unknown>;
 *   style?: Partial<CSSStyleDeclaration>;
 * }} ElementProps
 */
/** @typedef {keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap | FC} Type */
/**
 * @template [T=unknown] Default is `unknown`
 * @typedef {T extends FC
 *   ? Parameters<T>[0]
 *   : ElementProps &
 *       Omit<
 *         T extends keyof HTMLElementTagNameMap
 *           ? Partial<HTMLElementTagNameMap[T]>
 *           : T extends keyof SVGElementTagNameMap
 *             ? Partial<SVGElementTagNameMap[T]>
 *             : { [key: string]: unknown },
 *         keyof ElementProps
 *       >} Props
 */
/** @typedef {{ type: Type; props: Props; key: unknown }} Def */
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
 *   key: unknown;
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
 * @param {unknown} [key]
 */
export function jsx<T extends Type>(type: T, props?: Props<T>, key?: unknown): {
    type: T;
    props: Props<T>;
    key: unknown;
};
/** @typedef {Def | string | number | boolean | null | undefined} Child */
/** @typedef {Child | Child[]} Children */
/**
 * @template [P={}] Default is `{}`
 * @typedef {(props: P) => Children} FC
 */
/**
 * @typedef {{
 *   children?: Children;
 *   ref?: Ref<unknown>;
 *   style?: Partial<CSSStyleDeclaration>;
 * }} ElementProps
 */
/** @typedef {keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap | FC} Type */
/**
 * @template [T=unknown] Default is `unknown`
 * @typedef {T extends FC
 *   ? Parameters<T>[0]
 *   : ElementProps &
 *       Omit<
 *         T extends keyof HTMLElementTagNameMap
 *           ? Partial<HTMLElementTagNameMap[T]>
 *           : T extends keyof SVGElementTagNameMap
 *             ? Partial<SVGElementTagNameMap[T]>
 *             : { [key: string]: unknown },
 *         keyof ElementProps
 *       >} Props
 */
/** @typedef {{ type: Type; props: Props; key: unknown }} Def */
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
 *   key: unknown;
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
 * @param {unknown} [key]
 */
export function jsxDEV<T extends Type>(type: T, props?: Props<T>, key?: unknown): {
    type: T;
    props: Props<T>;
    key: unknown;
};
/** @typedef {Def | string | number | boolean | null | undefined} Child */
/** @typedef {Child | Child[]} Children */
/**
 * @template [P={}] Default is `{}`
 * @typedef {(props: P) => Children} FC
 */
/**
 * @typedef {{
 *   children?: Children;
 *   ref?: Ref<unknown>;
 *   style?: Partial<CSSStyleDeclaration>;
 * }} ElementProps
 */
/** @typedef {keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap | FC} Type */
/**
 * @template [T=unknown] Default is `unknown`
 * @typedef {T extends FC
 *   ? Parameters<T>[0]
 *   : ElementProps &
 *       Omit<
 *         T extends keyof HTMLElementTagNameMap
 *           ? Partial<HTMLElementTagNameMap[T]>
 *           : T extends keyof SVGElementTagNameMap
 *             ? Partial<SVGElementTagNameMap[T]>
 *             : { [key: string]: unknown },
 *         keyof ElementProps
 *       >} Props
 */
/** @typedef {{ type: Type; props: Props; key: unknown }} Def */
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
 *   key: unknown;
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
 * @param {unknown} [key]
 */
export function jsxs<T extends Type>(type: T, props?: Props<T>, key?: unknown): {
    type: T;
    props: Props<T>;
    key: unknown;
};
/** @typedef {Def | string | number | boolean | null | undefined} Child */
/** @typedef {Child | Child[]} Children */
/**
 * @template [P={}] Default is `{}`
 * @typedef {(props: P) => Children} FC
 */
/**
 * @typedef {{
 *   children?: Children;
 *   ref?: Ref<unknown>;
 *   style?: Partial<CSSStyleDeclaration>;
 * }} ElementProps
 */
/** @typedef {keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap | FC} Type */
/**
 * @template [T=unknown] Default is `unknown`
 * @typedef {T extends FC
 *   ? Parameters<T>[0]
 *   : ElementProps &
 *       Omit<
 *         T extends keyof HTMLElementTagNameMap
 *           ? Partial<HTMLElementTagNameMap[T]>
 *           : T extends keyof SVGElementTagNameMap
 *             ? Partial<SVGElementTagNameMap[T]>
 *             : { [key: string]: unknown },
 *         keyof ElementProps
 *       >} Props
 */
/** @typedef {{ type: Type; props: Props; key: unknown }} Def */
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
 *   key: unknown;
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
 * @param {unknown} [key]
 */
export function jsxsDEV<T extends Type>(type: T, props?: Props<T>, key?: unknown): {
    type: T;
    props: Props<T>;
    key: unknown;
};
/**
 * @template {FC} Component
 * @param {Component} Component
 * @param {typeof defaultIsEqual} [isEqual]
 */
export function memo<Component extends FC<{}>>(Component: Component, isEqual?: typeof defaultIsEqual): (props: Props<Component>) => {
    type: Component;
    props: Props<Component>;
    key: unknown;
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
