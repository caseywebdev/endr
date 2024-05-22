import { Key, Props, TagName } from './index.d';

export namespace JSX {
  type IntrinsicAttributes = {
    key?: Key;
  };

  type IntrinsicElements = {
    [T in TagName]: IntrinsicAttributes & Props<T>;
  };
}
