export type Child = Def | string | number | false | null | undefined;
export type Children = Child | Child[];
export type FC = ((props: any) => Children) & {
    memo?: (a: Props, b: Props) => boolean;
};
export type TagName = keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap;
export type Type = TagName | FC;
export type SharedElementProps<T = unknown> = {
    children?: Children;
    ref?: Ref<T | null>;
    style?: Partial<CSSStyleDeclaration>;
};
export type HTMLElementProps<T extends HTMLElement> = SharedElementProps<T> & { [key in keyof T]?: key extends keyof SharedElementProps<T> ? SharedElementProps<T>[key] : T[key]; } & {
    [key: `data-${string}`]: any;
};
export type SVGElementProps<T extends SVGElement> = SharedElementProps<T> & { [key in keyof T]?: key extends keyof SharedElementProps<T> ? SharedElementProps<T>[key] : (() => any) extends T[key] ? T[key] : any; } & {
    [key: string]: any;
};
export type UnknownElementProps = SharedElementProps & {
    [key: string]: unknown;
};
export type Props<T = unknown> = T extends FC ? Parameters<T>[0] extends undefined ? {} : Parameters<T>[0] : T extends keyof HTMLElementTagNameMap ? HTMLElementProps<HTMLElementTagNameMap[T]> : T extends keyof SVGElementTagNameMap ? SVGElementProps<SVGElementTagNameMap[T]> : UnknownElementProps;
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
    children: {
        [key: string]: Vnode;
    } | null;
    contexts: Map<Context<any>, {
        deps: Set<Vnode>;
        value: any;
    }> | null;
    depth: number;
    effects: Effect[] | null;
    index: number;
    lastNode: Element | Text | null;
    node: Element | Text | null;
    parent: Vnode | null;
    parentNode: Element;
    prevNode: Element | Text | null;
    props: Props;
    refs: Ref<unknown>[] | null;
    state: number;
    type: Type;
};
export type Context<T> = ReturnType<typeof createContext<T>>;
export type ContextValue<T extends Context<unknown>> = Parameters<T>[0]["value"];
/** @template T */
export function createContext<T>(): ({ value, children }: {
    value: T;
    children?: Children;
}) => Children;
export function Fragment(props: {
    children?: Children;
}): Children;
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
 *   state: number;
 *   type: Type;
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
 *   state: number;
 *   type: Type;
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
 *   state: number;
 *   type: Type;
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
 *   state: number;
 *   type: Type;
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
 * @param {typeof defaultMemo} [memo]
 */
export function memo<Component extends FC>(Component: Component, memo?: typeof defaultMemo): Component;
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
/**
 * @template {Context<any>} T
 * @param {T} Context
 */
export function useContext<T extends Context<any>>(Context: T): ContextValue<T> | undefined;
/**
 * @param {AfterEffect} fn
 * @param {unknown[]} [deps]
 */
export function useEffect(fn: AfterEffect, deps?: unknown[]): void;
/**
 * @template T
 * @param {(...args: unknown[]) => T} fn
 * @param {unknown[]} deps
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
 * @param {Props} prev
 * @param {Props} next
 */
declare function defaultMemo(prev: Props, next: Props): boolean;
export {};
