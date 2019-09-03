import {map} from'fantasy-land';
import {tagged} from 'daggy';

const Page = tagged('Page', ['page', 'text'])
Page.prototype[map] = Page.prototype.map = function (f) {
  return f({page: this.page, text: this.text});
}

module.exports = {Page}