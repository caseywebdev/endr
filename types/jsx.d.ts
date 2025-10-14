import type { Component, Def, Key, Props, TagName } from './index.d.ts';

type _IntrinsicAttributes = { key?: Key };
type _IntrinsicElements = { [T in TagName]: _IntrinsicAttributes & Props<T> };

export namespace JSX {
  interface Element extends Def {}
  interface ElementChildrenAttribute {
    children: unknown;
  }
  type ElementType = Component | string;
  interface IntrinsicAttributes extends _IntrinsicAttributes {}
  interface IntrinsicElements extends _IntrinsicElements {}
}
