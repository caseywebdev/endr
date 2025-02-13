export function jsx<T extends Type>(type: T, props?: Props<T>, key?: Key): {
    type: T;
    props: Props<T>;
    key: any;
};
export function jsxs<T extends Type>(type: T, props?: Props<T>, key?: Key): {
    type: T;
    props: Props<T>;
    key: any;
};
export function jsxDEV<T extends Type>(type: T, props?: Props<T>, key?: Key): {
    type: T;
    props: Props<T>;
    key: any;
};
export function jsxsDEV<T extends Type>(type: T, props?: Props<T>, key?: Key): {
    type: T;
    props: Props<T>;
    key: any;
};
export function Fragment(props: {
    children?: Children;
}): Children;
export function Portal(props: {
    children?: Children;
    to: ParentNode;
}): Children;
export function Try(props: {
    children?: Children;
    catch: Vnode["catch"];
}): Children;
export function createContext<T>(value: T): (({ value, children }: {
    value: T;
    children?: Children;
}) => Children) & {
    value: T;
};
export function useRef<T>(initial: T | (() => T)): Ref<T>;
export function useEffect(fn: AfterEffect, deps?: unknown[]): void;
export function useMemo<T>(fn: (...args: unknown[]) => T, deps?: unknown[]): T;
export function useState<T>(initial: T | (() => T)): State<T>;
export function useCallback<T extends (...args: any[]) => any>(fn: T): T;
export function memo<Component extends FC>(Component: Component, memo?: typeof defaultMemo): Component;
export function useContext<T extends Context<any>>(Context: T): T["value"];
export function createRoot(parentNode: ParentNode): Root;
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
    ref?: Ref<T | null> | null;
    style?: Partial<CSSStyleDeclaration> | string | null;
};
export type SimpleProps<T extends Element, Shared = SharedElementProps<T>> = { [K in keyof Shared | keyof T]?: K extends keyof Shared ? Shared[K] : K extends keyof T ? T[K] extends number | boolean | ((...args: any[]) => any) | null ? T[K] : string | null : never; };
export type UnknownElementProps = SharedElementProps & {
    [K: string]: unknown;
};
export type Props<T = unknown> = T extends FC ? Parameters<T>[0] extends undefined ? {} : Parameters<T>[0] : T extends keyof HTMLElementTagNameMap ? SimpleProps<HTMLElementTagNameMap[T]> & { [K in `data-${string}`]?: string | null; } : T extends keyof SVGElementTagNameMap ? SimpleProps<SVGElementTagNameMap[T]> & { [K in string]?: string | null; } : UnknownElementProps;
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
export type ParentNode = Element | ShadowRoot;
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
    parentNode: ParentNode;
    prevNode: Element | Text | null;
    props: Props;
    queues: Queues;
    refs: Ref<unknown>[] | null;
    sibling: Vnode | null;
    state: 0 | 1 | 2 | 3;
    type: Type;
};
export type Context<T> = ReturnType<typeof createContext<T>>;
export type SetState<T> = <U extends T>(value: (T extends Function ? never : U) | ((current: T) => U)) => U;
export type State<T> = [T, SetState<T>];
/**
 * @param {Props} prev
 * @param {Props} next
 */
declare function defaultMemo(prev: Props, next: Props): boolean;
/**
 * @template {Element | Text} T
 * @param {T} node
 * @param {Props<T>} prev
 * @param {Props<T>} next
 */
declare function updateNode<T extends Element | Text>(node: T, prev: Props<T>, next: Props<T>): void;
export {};
