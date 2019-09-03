import {Either} from 'ramda-fantasy';
import {fromEither} from 'sanctuary';
import {Pages, Page} from './utils/page';

import {lt, add, less, not, toArray, is, prop, compose, getRighOrLeft} from './utils';
const {Right, Left}  = Either;

const Any = page => ({
  page,
  concat: a => Any(page || a.page),
});

Any.empty = () => Any([]);
const min = max => value => Math.min(max, value);


const map = fn => right => right.map(fn);
const safePage = cond => cond ? Right({}) : Left([]);

const getSize = total => limit => Math.ceil(total / limit);
const isAtEndPostion  = total => size => page => 
  compose(not, lt(page), less(total))(size);
const getCountPagination = total => size => limit => 
  compose(min(size), getSize(total))(limit);
const getStart = page => size => total => compose(min(page), less(total), add(size))(1);

const _getPages = length => Array.from({length}, (_, i) => Page(0, 0));

const getPage = page => compose(prop('value'), map(toArray), map(page), safePage);


const getPagination = (total = 0) => (size = 6) => (limit = 14) => (page = 1) => {
  const count = getCountPagination(total)(size)(limit);
  const pages = fromEither(count)(getRighOrLeft(pages < size)(getSize(total)(limit)));
  const _pages = Pages.List(_getPages(count));
  const {Page} = _pages.map((elm, index) => {
    const curpage = compose(getStart(page)(size), getSize(total))(limit) + index;
    return {
      page: curpage,
      text: String(curpage),
    };
  });
  const overFirst = [lt(1)(page)];
  const pagesOverSize = [lt(size)(pages)]; 
  const atEndPages = [compose(not, isAtEndPostion(pages)(size))(page)];
  
  return [].concat(
    compose(getPage(x => ({page: 1, text: '«'})), is)(overFirst),
    compose(getPage(x => ({page: less(page)(1), text:'‹'})), is)([...overFirst, ...pagesOverSize]),
    Page, 
    compose(getPage(x => ({page: add(page)(1), text:'›'})), is)([...pagesOverSize, ...atEndPages]),
    compose(getPage(x => ({page: pages, text:'»'})), is)([...pagesOverSize, ...atEndPages])
  );
};

export {getPagination};
