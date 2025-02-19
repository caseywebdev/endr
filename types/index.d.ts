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
export type DataAttributes = { [K in `data-${string}`]?: string | null; };
export type SVGAttributes = DataAttributes & {
    accumulate?: "none" | "sum" | null;
    additive?: "replace" | "sum" | null;
    "alignment-baseline?": string | null;
    amplitude?: string | null;
    attributeName?: string | null;
    azimuth?: string | null;
    baseFrequency?: string | null;
    "baseline-shift"?: string | null;
    begin?: string | null;
    bias?: string | null;
    by?: string | null;
    calcMode?: string | null;
    class?: string | null;
    clipPathUnits?: string | null;
    "clip-path"?: string | null;
    "clip-rule"?: string | null;
    color?: string | null;
    "color-interpolation"?: "auto" | "sRGB" | "linearRGB" | "inherit" | null;
    "color-interpolation-filters"?: string | null;
    crossorigin?: string | null;
    cursor?: string | null;
    cx?: string | null;
    cy?: string | null;
    d?: string | null;
    decoding?: string | null;
    diffuseConstant?: string | null;
    direction?: string | null;
    display?: string | null;
    divisor?: string | null;
    "dominant-baseline"?: string | null;
    dur?: string | null;
    dx?: string | null;
    dy?: string | null;
    edgeMode?: string | null;
    elevation?: string | null;
    end?: string | null;
    exponent?: string | null;
    fill?: string | null;
    "fill-opacity"?: string | null;
    "fill-rule"?: "nonzero" | "evenodd" | "inherit" | null;
    filter?: string | null;
    filterUnits?: string | null;
    "flood-color"?: string | null;
    "flood-opacity"?: string | null;
    "font-family"?: string | null;
    "font-size"?: string | null;
    "font-size-adjust"?: string | null;
    "font-stretch"?: string | null;
    "font-style"?: string | null;
    "font-variant"?: string | null;
    "font-weight"?: string | null;
    fr?: string | null;
    from?: string | null;
    fx?: string | null;
    fy?: string | null;
    gradientTransform?: string | null;
    gradientUnits?: string | null;
    height?: string | null;
    href?: string | null;
    hreflang?: string | null;
    id?: string | null;
    "image-rendering"?: string | null;
    in?: string | null;
    in2?: string | null;
    intercept?: string | null;
    k1?: string | null;
    k2?: string | null;
    k3?: string | null;
    k4?: string | null;
    kernelMatrix?: string | null;
    kernelUnitLength?: string | null;
    keyPoints?: string | null;
    keySplines?: string | null;
    keyTimes?: string | null;
    lang?: string | null;
    lengthAdjust?: string | null;
    "letter-spacing"?: string | null;
    "lighting-color"?: string | null;
    limitingConeAngle?: string | null;
    local?: string | null;
    "marker-end"?: string | null;
    "marker-mid"?: string | null;
    "marker-start"?: string | null;
    markerHeight?: string | null;
    markerUnits?: string | null;
    markerWidth?: string | null;
    mask?: string | null;
    maskContentUnits?: string | null;
    maskUnits?: string | null;
    max?: string | null;
    media?: string | null;
    method?: string | null;
    min?: string | null;
    mode?: string | null;
    numOctaves?: string | null;
    offset?: string | null;
    opacity?: string | null;
    operator?: string | null;
    order?: string | null;
    orient?: string | null;
    origin?: string | null;
    overflow?: string | null;
    "overline-position"?: string | null;
    "overline-thickness"?: string | null;
    "paint-order"?: string | null;
    path?: string | null;
    pathLength?: string | null;
    patternContentUnits?: string | null;
    patternTransform?: string | null;
    patternUnits?: string | null;
    ping?: string | null;
    "pointer-events"?: string | null;
    points?: string | null;
    pointsAtX?: string | null;
    pointsAtY?: string | null;
    pointsAtZ?: string | null;
    preserveAlpha?: string | null;
    preserveAspectRatio?: string | null;
    primitiveUnits?: string | null;
    r?: string | null;
    radius?: string | null;
    referrerPolicy?: string | null;
    refX?: string | null;
    refY?: string | null;
    rel?: string | null;
    "rendering-intent"?: string | null;
    repeatCount?: string | null;
    repeatDur?: string | null;
    requiredExtensions?: string | null;
    restart?: string | null;
    result?: string | null;
    rotate?: string | null;
    rx?: string | null;
    ry?: string | null;
    scale?: string | null;
    seed?: string | null;
    "shape-rendering"?: "auto" | "optimizeSpeed" | "crispEdges" | "geometricPrecision" | null;
    side?: string | null;
    slope?: string | null;
    spacing?: string | null;
    specularConstant?: string | null;
    specularExponent?: string | null;
    speed?: string | null;
    spreadMethod?: "pad" | "reflect" | "repeat" | null;
    startOffset?: string | null;
    stdDeviation?: string | null;
    stitchTiles?: string | null;
    "stop-color"?: string | null;
    "stop-opacity"?: string | null;
    "strikethrough-position"?: string | null;
    "strikethrough-thickness"?: string | null;
    stroke?: string | null;
    "stroke-dasharray"?: string | null;
    "stroke-dashoffset"?: string | null;
    "stroke-linecap"?: "butt" | "round" | "square" | "inherit" | null;
    "stroke-linejoin"?: "miter" | "round" | "bevel" | "inherit" | null;
    "stroke-miterlimit"?: string | null;
    "stroke-opacity"?: string | null;
    "stroke-width"?: string | null;
    style?: string | null;
    surfaceScale?: string | null;
    systemLanguage?: string | null;
    tabindex?: string | null;
    tableValues?: string | null;
    target?: string | null;
    targetX?: string | null;
    targetY?: string | null;
    "text-anchor"?: string | null;
    "text-decoration"?: string | null;
    "text-rendering"?: string | null;
    textLength?: string | null;
    to?: string | null;
    transform?: string | null;
    "transform-origin"?: string | null;
    type?: string | null;
    "underline-position"?: string | null;
    "underline-thickness"?: string | null;
    "unicode-bidi"?: string | null;
    values?: string | null;
    "vector-effect"?: string | null;
    viewBox?: string | null;
    visibility?: string | null;
    width?: string | null;
    "word-spacing"?: string | null;
    "writing-mode"?: string | null;
    x?: string | null;
    x1?: string | null;
    x2?: string | null;
    xChannelSelector?: string | null;
    xmlns?: string | null;
    y?: string | null;
    y1?: string | null;
    y2?: string | null;
    yChannelSelector?: string | null;
    z?: string | null;
};
export type ElementAttributes<T extends Element> = T extends SVGElement ? SVGAttributes : DataAttributes;
export type ElementProps<T extends Element, Shared = SharedElementProps<T>, Attributes = ElementAttributes<T>> = { [K in keyof Shared | keyof T | keyof Attributes]?: K extends keyof Shared ? Shared[K] : K extends keyof T ? T[K] extends string | number | boolean | ((...args: any[]) => any) | null | undefined ? T[K] | null : K extends keyof Attributes ? Attributes[K] : never : K extends keyof Attributes ? Attributes[K] : never; };
export type UnknownElementProps = SharedElementProps & {
    [K: string]: unknown;
};
export type Props<T = unknown> = T extends FC ? Parameters<T>[0] extends undefined ? {} : Parameters<T>[0] : T extends keyof HTMLElementTagNameMap ? ElementProps<HTMLElementTagNameMap[T]> : T extends keyof SVGElementTagNameMap ? ElementProps<SVGElementTagNameMap[T]> : UnknownElementProps;
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
