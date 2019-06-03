class Right {
  constructor(val) {
    this._val = val;
  }
  map() {
      // Right is the sad path
      // so we do nothing
      return new Right('»');
  }
  toString() {
      const str = this._val.toString();
      return `Right(${str})`;
  }
}