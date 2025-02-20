import type { Def, Key, Props, TagName, Type } from './index.d.ts';

export namespace JSX {
  type Element = Def;
  type ElementChildrenAttribute = { children: unknown };
  type ElementType = Type;
  type IntrinsicAttributes = { key?: Key };
  type IntrinsicElements = { [T in TagName]: IntrinsicAttributes & Props<T> };
}
