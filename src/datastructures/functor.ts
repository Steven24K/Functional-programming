export interface Functor<F, G, a, b> {
    map: (this: F, f: (x: a) => b) => G
  }