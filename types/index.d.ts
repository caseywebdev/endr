export type Recursive<T> = T | RecursiveArray<T>;
export type RecursiveArray<T> = Recursive<T>[];
export type Children = Recursive<Def | string | number | false | null | undefined | void>;
export type FC = ((props: any) => Children) & {
    memo?: (a: Props, b: Props) => boolean;
};
export type TagName = keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap;
export type Type = TagName | FC;
export type SharedElementProps<T = unknown> = {
    children?: Children;
    ref?: Ref<T | null>;
    style?: Partial<CSSStyleDeclaration> | string;
};
export type HTMLElementProps<T extends HTMLElement, Shared = SharedElementProps<T>> = Shared & Partial<Omit<T, keyof Shared>>;
export type SVGElementProps<T extends SVGElement, Shared = SharedElementProps<T>> = (Shared & Partial<Omit<T, keyof Shared>>) | {
    [K: string]: string | null | undefined;
};
export type UnknownElementProps = SharedElementProps & {
    [K: string]: unknown;
};
export type Props<T = unknown> = T extends FC ? Parameters<T>[0] extends undefined ? {} : Parameters<T>[0] : T extends keyof HTMLElementTagNameMap ? HTMLElementProps<HTMLElementTagNameMap[T]> : T extends keyof SVGElementTagNameMap ? SVGElementProps<SVGElementTagNameMap[T]> : UnknownElementProps;
export type Key = any;
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
export type Root = {
    render: (children: Children) => void;
    unmount: () => void;
};
export type Queues = {
    afterEffects: Vnode[];
    inserts: Vnode[];
    moves: Vnode[];
    nodeUpdates: Parameters<typeof updateNode>[];
    removes: (Element | Text)[];
    updates: Vnode[];
};
export type Vnode = {
    child: Vnode | null;
    contexts: Map<Context<any>, {
        deps: Set<Vnode>;
        value: any;
    }> | null;
    depth: number;
    effects: Effect[] | null;
    index: number;
    key: Key;
    lastNode: Element | Text | null;
    node: Element | Text | null;
    catch: (exception: any) => void;
    parent: Vnode | null;
    parentNode: Element;
    prevNode: Element | Text | null;
    props: Props;
    queues: Queues;
    refs: Ref<unknown>[] | null;
    sibling: Vnode | null;
    state: 0 | 1 | 2 | 3;
    type: Type;
};
export type Context<T> = ReturnType<typeof createContext<T>>;
export type ContextValue<T extends Context<unknown>> = Parameters<T>[0]["value"];
/** @template T */
export function createContext<T>(): ({ value, children }: {
    value: T;
    children?: Children;
}) => Children;
/** @param {Element} parentNode */
export function createRoot(parentNode: Element): Root;
/** @param {{ children?: Children }} props */
export function Fragment(props: {
    children?: Children;
}): Children;
/**
 * @template {Type} T
 * @param {T} type
 * @param {Props<T>} props
 * @param {Key} [key]
 */
export function jsx<T extends Type>(type: T, props?: Props<T>, key?: Key): {
    type: T;
    props: Props<T>;
    key: any;
};
/**
 * @template {Type} T
 * @param {T} type
 * @param {Props<T>} props
 * @param {Key} [key]
 */
export function jsxDEV<T extends Type>(type: T, props?: Props<T>, key?: Key): {
    type: T;
    props: Props<T>;
    key: any;
};
/**
 * @template {Type} T
 * @param {T} type
 * @param {Props<T>} props
 * @param {Key} [key]
 */
export function jsxs<T extends Type>(type: T, props?: Props<T>, key?: Key): {
    type: T;
    props: Props<T>;
    key: any;
};
/**
 * @template {Type} T
 * @param {T} type
 * @param {Props<T>} props
 * @param {Key} [key]
 */
export function jsxsDEV<T extends Type>(type: T, props?: Props<T>, key?: Key): {
    type: T;
    props: Props<T>;
    key: any;
};
/**
 * @template {FC} Component
 * @param {Component} Component
 * @param {typeof defaultMemo} [memo]
 */
export function memo<Component extends FC>(Component: Component, memo?: ((prev: Props, next: Props) => boolean) | undefined): Component;
/** @param {{ children?: Children; to: Element }} props */
export function Portal(props: {
    children?: Children;
    to: Element;
}): Children;
/** @param {{ children?: Children; catch: Vnode['catch'] }} props */
export function Try(props: {
    children?: Children;
    catch: Vnode["catch"];
}): Children;
/**
 * @template {(...args: any[]) => any} T
 * @param {T} fn
 */
export function useCallback<T extends (...args: any[]) => any>(fn: T): T;
/**
 * @template {Context<any>} T
 * @param {T} Context
 */
export function useContext<T extends Context<any>>(Context: T): ContextValue<T> | undefined;
/**
 * @param {AfterEffect} fn
 * @param {unknown[]} [deps]
 */
export function useEffect(fn: AfterEffect, deps?: unknown[] | undefined): void;
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
export function useState<T>(initial: T): [T, <T2 extends T>(next: T2) => T2];
/**
 * @template {HTMLElement | SVGElement | Text} T
 * @param {T} node
 * @param {Props<T>} prev
 * @param {Props<T>} next
 */
declare function updateNode<T extends HTMLElement | SVGElement | Text>(node: T, prev: Props<T>, next: Props<T>): void;
export {};
