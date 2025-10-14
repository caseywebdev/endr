import 'endr/jsx-runtime';

declare module 'endr/jsx-runtime' {
  namespace JSX {
    interface IntrinsicElements {
      'my-custom-element': { myCustomProp: string };
    }
  }
}
