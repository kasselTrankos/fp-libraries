class Center {
  constructor(val) {
    this._val = val;
  }
  map(fn) {
      return new Center(
          fn(this._val)
      );
  }
  toString() {
      const str = this._val.toString();
      return `Center(${str})`;
  }
}