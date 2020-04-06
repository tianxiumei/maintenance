const DISPOSERS = Symbol("disposers");

type IDisposer = () => void;

export default class Store {
  [DISPOSERS]: any[];

  constructor() {
    this[DISPOSERS] = [];
  }

  addDisposer(...disposers: IDisposer[]) {
    this[DISPOSERS] = this[DISPOSERS].concat(disposers);
  }

  dispose() {
    this[DISPOSERS].forEach((disposer: IDisposer) => {
      try {
        disposer();
      } catch (e) {
        /* do nothing */
      }
    });
  }
}
