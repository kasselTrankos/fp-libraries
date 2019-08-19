import {map} from'fantasy-land';
import {tagged, taggedSum} from 'daggy';

const Page = tagged('Page', ['page', 'text'])
const Pages = taggedSum('Pages', {
  Empty: [],
  List: [Page],
  First: [],
  Last: [],
});
Page.prototype[map] = Page.prototype.map = function (f) {
  return f({page: this.page, text: this.text});
}

Pages.prototype[map] = Pages.prototype.map = function (f) {
  return this.cata({
    Empty: () => this,
    List: Page => Pages.List(Page.map(f)),
    First: () => this,
    Last: () => this,
  })
}

module.exports = {Pages, Page}