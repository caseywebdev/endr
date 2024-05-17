export type Child = Def | string | number | boolean | null | undefined;
export type Children = Child | Child[];
export type FunctionComponent = (props: {
    [key: string]: unknown;
}) => Children;
export type SharedProps = {
    children?: Children;
    ref?: Ref<unknown>;
    style?: Partial<CSSStyleDeclaration>;
};
export type Type = keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap | FunctionComponent;
export type Props<T extends Type> = T extends FunctionComponent ? Parameters<T>[0] : Partial<SharedProps & (T extends keyof HTMLElementTagNameMap ? Omit<HTMLElementTagNameMap[T], keyof SharedProps> : T extends keyof SVGElementTagNameMap ? Omit<SVGElementTagNameMap[T], keyof SharedProps> : {
    [key: string]: unknown;
})>;
export type Def = {
    type: Type;
    props: Props<Type>;
    key: unknown;
};
export type Ref<T> = {
    current: T;
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
    effects: null | {
        before: (() => void) | undefined;
        after: (() => (() => void) | undefined) | undefined;
        deps: unknown[] | undefined;
    }[];
    key: unknown;
    node: Element | Text | null;
    parent: Vnode | null;
    parentNode: Element | null;
    path: number[];
    prevSiblingNode: Element | Text | null;
    props: {
        [key: string]: unknown;
    };
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
/** @typedef {(props: { [key: string]: unknown }) => Children} FunctionComponent */
/**
 * @typedef {{
 *   children?: Children;
 *   ref?: Ref<unknown>;
 *   style?: Partial<CSSStyleDeclaration>;
 * }} SharedProps
 */
/**
 * @typedef {keyof HTMLElementTagNameMap
 *   | keyof SVGElementTagNameMap
 *   | FunctionComponent} Type
 */
/**
 * @template {Type} T
 * @typedef {T extends FunctionComponent
 *   ? Parameters<T>[0]
 *   : Partial<
 *       SharedProps &
 *         (T extends keyof HTMLElementTagNameMap
 *           ? Omit<HTMLElementTagNameMap[T], keyof SharedProps>
 *           : T extends keyof SVGElementTagNameMap
 *             ? Omit<SVGElementTagNameMap[T], keyof SharedProps>
 *             : { [key: string]: unknown })
 *     >} Props
 */
/** @typedef {{ type: Type; props: Props<Type>; key: unknown }} Def */
/**
 * @template T
 * @typedef {{ current: T }} Ref
 */
/**
 * @typedef {{
 *   contexts: Map<
 *     ReturnType<typeof createContext>,
 *     { vnodes: Set<Vnode>; value: unknown }
 *   > | null;
 *   child: Vnode | null;
 *   deleted: boolean;
 *   effects:
 *     | null
 *     | {
 *         before: (() => void) | undefined;
 *         after: (() => (() => void) | undefined) | undefined;
 *         deps: unknown[] | undefined;
 *       }[];
 *   key: unknown;
 *   node: Element | Text | null;
 *   parent: Vnode | null;
 *   parentNode: Element | null;
 *   path: number[];
 *   prevSiblingNode: Element | Text | null;
 *   props: { [key: string]: unknown };
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
export function jsx<T extends Type>(type: T, props: Props<T>, key?: unknown): {
    type: T;
    props: Props<T>;
    key: unknown;
};
/** @typedef {Def | string | number | boolean | null | undefined} Child */
/** @typedef {Child | Child[]} Children */
/** @typedef {(props: { [key: string]: unknown }) => Children} FunctionComponent */
/**
 * @typedef {{
 *   children?: Children;
 *   ref?: Ref<unknown>;
 *   style?: Partial<CSSStyleDeclaration>;
 * }} SharedProps
 */
/**
 * @typedef {keyof HTMLElementTagNameMap
 *   | keyof SVGElementTagNameMap
 *   | FunctionComponent} Type
 */
/**
 * @template {Type} T
 * @typedef {T extends FunctionComponent
 *   ? Parameters<T>[0]
 *   : Partial<
 *       SharedProps &
 *         (T extends keyof HTMLElementTagNameMap
 *           ? Omit<HTMLElementTagNameMap[T], keyof SharedProps>
 *           : T extends keyof SVGElementTagNameMap
 *             ? Omit<SVGElementTagNameMap[T], keyof SharedProps>
 *             : { [key: string]: unknown })
 *     >} Props
 */
/** @typedef {{ type: Type; props: Props<Type>; key: unknown }} Def */
/**
 * @template T
 * @typedef {{ current: T }} Ref
 */
/**
 * @typedef {{
 *   contexts: Map<
 *     ReturnType<typeof createContext>,
 *     { vnodes: Set<Vnode>; value: unknown }
 *   > | null;
 *   child: Vnode | null;
 *   deleted: boolean;
 *   effects:
 *     | null
 *     | {
 *         before: (() => void) | undefined;
 *         after: (() => (() => void) | undefined) | undefined;
 *         deps: unknown[] | undefined;
 *       }[];
 *   key: unknown;
 *   node: Element | Text | null;
 *   parent: Vnode | null;
 *   parentNode: Element | null;
 *   path: number[];
 *   prevSiblingNode: Element | Text | null;
 *   props: { [key: string]: unknown };
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
export function jsxDEV<T extends Type>(type: T, props: Props<T>, key?: unknown): {
    type: T;
    props: Props<T>;
    key: unknown;
};
/** @typedef {Def | string | number | boolean | null | undefined} Child */
/** @typedef {Child | Child[]} Children */
/** @typedef {(props: { [key: string]: unknown }) => Children} FunctionComponent */
/**
 * @typedef {{
 *   children?: Children;
 *   ref?: Ref<unknown>;
 *   style?: Partial<CSSStyleDeclaration>;
 * }} SharedProps
 */
/**
 * @typedef {keyof HTMLElementTagNameMap
 *   | keyof SVGElementTagNameMap
 *   | FunctionComponent} Type
 */
/**
 * @template {Type} T
 * @typedef {T extends FunctionComponent
 *   ? Parameters<T>[0]
 *   : Partial<
 *       SharedProps &
 *         (T extends keyof HTMLElementTagNameMap
 *           ? Omit<HTMLElementTagNameMap[T], keyof SharedProps>
 *           : T extends keyof SVGElementTagNameMap
 *             ? Omit<SVGElementTagNameMap[T], keyof SharedProps>
 *             : { [key: string]: unknown })
 *     >} Props
 */
/** @typedef {{ type: Type; props: Props<Type>; key: unknown }} Def */
/**
 * @template T
 * @typedef {{ current: T }} Ref
 */
/**
 * @typedef {{
 *   contexts: Map<
 *     ReturnType<typeof createContext>,
 *     { vnodes: Set<Vnode>; value: unknown }
 *   > | null;
 *   child: Vnode | null;
 *   deleted: boolean;
 *   effects:
 *     | null
 *     | {
 *         before: (() => void) | undefined;
 *         after: (() => (() => void) | undefined) | undefined;
 *         deps: unknown[] | undefined;
 *       }[];
 *   key: unknown;
 *   node: Element | Text | null;
 *   parent: Vnode | null;
 *   parentNode: Element | null;
 *   path: number[];
 *   prevSiblingNode: Element | Text | null;
 *   props: { [key: string]: unknown };
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
export function jsxs<T extends Type>(type: T, props: Props<T>, key?: unknown): {
    type: T;
    props: Props<T>;
    key: unknown;
};
/** @typedef {Def | string | number | boolean | null | undefined} Child */
/** @typedef {Child | Child[]} Children */
/** @typedef {(props: { [key: string]: unknown }) => Children} FunctionComponent */
/**
 * @typedef {{
 *   children?: Children;
 *   ref?: Ref<unknown>;
 *   style?: Partial<CSSStyleDeclaration>;
 * }} SharedProps
 */
/**
 * @typedef {keyof HTMLElementTagNameMap
 *   | keyof SVGElementTagNameMap
 *   | FunctionComponent} Type
 */
/**
 * @template {Type} T
 * @typedef {T extends FunctionComponent
 *   ? Parameters<T>[0]
 *   : Partial<
 *       SharedProps &
 *         (T extends keyof HTMLElementTagNameMap
 *           ? Omit<HTMLElementTagNameMap[T], keyof SharedProps>
 *           : T extends keyof SVGElementTagNameMap
 *             ? Omit<SVGElementTagNameMap[T], keyof SharedProps>
 *             : { [key: string]: unknown })
 *     >} Props
 */
/** @typedef {{ type: Type; props: Props<Type>; key: unknown }} Def */
/**
 * @template T
 * @typedef {{ current: T }} Ref
 */
/**
 * @typedef {{
 *   contexts: Map<
 *     ReturnType<typeof createContext>,
 *     { vnodes: Set<Vnode>; value: unknown }
 *   > | null;
 *   child: Vnode | null;
 *   deleted: boolean;
 *   effects:
 *     | null
 *     | {
 *         before: (() => void) | undefined;
 *         after: (() => (() => void) | undefined) | undefined;
 *         deps: unknown[] | undefined;
 *       }[];
 *   key: unknown;
 *   node: Element | Text | null;
 *   parent: Vnode | null;
 *   parentNode: Element | null;
 *   path: number[];
 *   prevSiblingNode: Element | Text | null;
 *   props: { [key: string]: unknown };
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
export function jsxsDEV<T extends Type>(type: T, props: Props<T>, key?: unknown): {
    type: T;
    props: Props<T>;
    key: unknown;
};
/**
 * @template {FunctionComponent} Component
 * @param {Component} Component
 * @param {typeof defaultIsEqual} [isEqual]
 */
export function memo<Component extends FunctionComponent>(Component: Component, isEqual?: typeof defaultIsEqual): (props: Props<Component>) => {
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
 * @param {(
 *   ...args: unknown[]
 * ) => ((...args: unknown[]) => void) | undefined} fn
 * @param {unknown[]} [deps]
 */
export function useEffect(fn: (...args: unknown[]) => ((...args: unknown[]) => void) | undefined, deps?: unknown[]): void;
/**
 * @template T
 * @param {(...args: unknown[]) => T} fn
 * @param {unknown[]} [deps]
 */
export function useMemo<T>(fn: (...args: unknown[]) => T, deps?: unknown[]): T;
/**
 * @template T
 * @param {() => T} initial
 */
export function useRef<T>(initial: () => T): Ref<T>;
/**
 * @template T
 * @param {() => T} getInitialValue
 */
export function useState<T>(getInitialValue: () => T): [T, (getNextValue: (current: T) => T) => T];
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
