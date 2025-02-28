import type { Def, Key, Props, TagName, Type } from './index.d.ts';

export namespace JSX {
  export type Element = Def;
  export type ElementChildrenAttribute = { children: unknown };
  export type ElementType = Type;
  export type IntrinsicAttributes = { key?: Key };
  export type IntrinsicElements = {
    [T in TagName]: IntrinsicAttributes & Props<T>;
  };
}
