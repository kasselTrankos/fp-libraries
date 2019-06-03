import Page from './page';
export default  class Left extends Page {
  constructor(page, text) {
    super(page, text);
  }
  map() {
      // Right is the sad path
      // so we do nothing
      return this;
  }
  toString() {
      return `Left(${this.page.toString()}, ${this.text.toString()})`;
  }
}