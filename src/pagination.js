import compose from 'lodash/fp/compose';
import {Either} from 'ramda-fantasy';

const {Right, Left}  = Either;
const safePage = cond => cond ? Right({page: 1, text: '«'}) : Left([]);
const map = fn => right => right.map(fn);
const value = right => right.value;
const add = value => value + 1; 
const less = value => value - 1; 
const toArray = x =>[x]; 
const not = value => !value;

const buildPageObject  = page => ({current: page, text: String(page)});
const getSize = total => limit => Math.ceil(total / limit);
const isLessThan = max => value => value < max; 
const isAtEndPostion  = total => size => page => compose(isLessThan(page), getBegin(size))(total);
const getBegin = size => total => total - size;
const getMaxPages = size => pages => isLessThan(size)(pages) ? pages : size; 
const getCountPagination = total => size => limit => compose(getMaxPages(size), getSize(total))(limit);
const getCountPages = total => size => limit => pages => pages < size ? pages : getSize(total)(limit);
const got = cond => cond.every(Boolean);
const getStart = page => size => total => 
  [isLessThan(total)(size), isAtEndPostion(total)(size)(page)].every(Boolean) ? total - size + 1 : page;

const getPages  = size => start => 
  Array.from({length: size}, (_, i) =>  compose(value, Right, buildPageObject)(start + i));

const getPage = page => compose(value, map(toArray), map(page), safePage);

const getPagination = (total = 0) => (size = 6) => (limit = 14) => (page = 1)  =>{
  const count = getCountPagination(total)(size)(limit);
  const pages = getCountPages(total)(size)(limit)(count);
  /// here start the tree decissor
  const overFirst = [page > 1];
  const pagesOverSize = [pages > size]; 
  const atEndPages = [compose(not, isAtEndPostion(pages)(size))(page)];
  return [].concat(
    compose(getPage(x => ({page: 1, text: '«'})), got)(overFirst),
    compose(getPage(x => ({page: less(page), text:'‹'})), got)([...overFirst, ...pagesOverSize]),
    compose(getPages(count), getStart(page)(size), getSize(total))(limit), 
    compose(getPage(x => ({page: add(page), text:'›'})), got)([...pagesOverSize, ...atEndPages]),
    compose(getPage(x => ({page: pages, text:'»'})), got)([...pagesOverSize, ...atEndPages])
  );
};



export {getPagination};
