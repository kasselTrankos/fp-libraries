class Left {
  constructor(val) {
    this._val = val;
  }
  map() {
      // Left is the sad path
      // so we do nothing
      return new Left('»');
  }
  toString() {
      const str = this._val.toString();
      return `Left(${str})`;
  }
} 