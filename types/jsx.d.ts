import type { Key, Props, TagName } from './index.d.ts';

export namespace JSX {
  type IntrinsicAttributes = {
    key?: Key;
  };

  type IntrinsicElements = {
    [T in TagName]: IntrinsicAttributes & Props<T>;
  };
}
