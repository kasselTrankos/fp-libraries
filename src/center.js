import Page from './page';
class Center {
  constructor(page, text) {
    super.constructor(page, text);
  }
  map(fn) {
    return new Center(
        fn(this._val)
    );
  }
  toString() {
      const str = this._page.toString();
      return `Page(${this._page.toString()}, ${this._text.toString()})`;
  }
}
