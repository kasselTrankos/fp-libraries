import compose from 'lodash/fp/compose';
import {Either} from 'ramda-fantasy';

const {Right, Left}  = Either;


const map = fn => right => right.map(fn);
const safePage = cond => cond ? Right({page: 1, text: '«'}) : Left([]);
const value = right => right.value;
const add = value => value + 1; 
const less = value => value - 1; 
const lt = valueA => valueB => valueA < valueB;
const toArray = x =>[x]; 
const not = value => !value;
const is = cond => cond.every(Boolean);

const buildPageObject  = page => ({current: page, text: String(page)});
const getSize = total => limit => Math.ceil(total / limit);
const isAtEndPostion  = total => size => page => compose(not, lt(page), getBegin(size))(total);
const getBegin = size => total => total - size;
const getMaxPages = size => pages => lt(pages)(size) ? pages : size; 
const getCountPagination = total => size => limit => compose(getMaxPages(size), getSize(total))(limit);
const getCountPages = total => size => limit => pages => pages < size ? pages : getSize(total)(limit);
const getStart = page => size => total => 
  [lt(size)(total), isAtEndPostion(total)(size)(page)].every(Boolean) ? total - size + 1 : page;

const getPages  = size => start => 
  Array.from({length: size}, (_, i) =>  compose(value, Right, buildPageObject)(start + i));

const getPage = page => compose(value, map(toArray), map(page), safePage);

const getPagination = (total = 0) => (size = 6) => (limit = 14) => (page = 1)  =>{
  const count = getCountPagination(total)(size)(limit);
  const pages = getCountPages(total)(size)(limit)(count);
  /// here start the tree decissor
  const overFirst = [lt(1)(page)];
  const pagesOverSize = [lt(size)(pages)]; 
  const atEndPages = [compose(not, isAtEndPostion(pages)(size))(page)];
  return [].concat(
    compose(getPage(x => ({page: 1, text: '«'})), is)(overFirst),
    compose(getPage(x => ({page: less(page), text:'‹'})), is)([...overFirst, ...pagesOverSize]),
    compose(getPages(count), getStart(page)(size), getSize(total))(limit), 
    compose(getPage(x => ({page: add(page), text:'›'})), is)([...pagesOverSize, ...atEndPages]),
    compose(getPage(x => ({page: pages, text:'»'})), is)([...pagesOverSize, ...atEndPages])
  );
};



export {getPagination};
