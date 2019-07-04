import compose from 'lodash/fp/compose';
import {Either} from 'ramda-fantasy';

const {Right, Left}  = Either;
const safePage = cond => cond ? Right({page: 1, text: '«'}) : Left([]);
const map = fn => right => right.map(fn);
const value = right => right.value;


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
const got = function () { return [...arguments].every(Boolean);}
const getStart = page => size => total => 
  [isLessThan(total)(size), isAtEndPostion(total)(size)(page)].every(Boolean) ? total - size + 1 : page;

const getPages  = size => start => 
  Array.from({length: size}, (_, i) =>  compose(value, Right, buildPageObject)(start + i));

const firstPage = compose(value, map(toArray), safePage); 
const previousPage = page => {
  const previous = page => () => ({page: --page, text:'‹'});
  return compose(value, map(toArray), map(previous(page)), safePage);
};
const lastPage = page => {
  const last = page => () => ({page, text: '»'});
  return compose(value, map(toArray), map(last(page)), safePage);
}
const nextPage =  page => compose(value, map(toArray), map(x => ({page: ++page, text:'›'})), safePage);

const getPagination = (total = 0) => (size = 6) => (limit = 14) => (page = 1)  =>{
  const count = getCountPagination(total)(size)(limit);
  const pages = getCountPages(total)(size)(limit)(count);
  /// here start the tree decissor
  return [].concat(
    compose(firstPage, got)(pages > size, page > 1),
    compose(previousPage(page), got)(pages > size, page > 1),
    compose(getPages(count), getStart(page)(size), getSize(total))(limit), 
    compose(nextPage(page), got)(pages > size, compose(not, isAtEndPostion(pages)(size))(page)),
    compose(lastPage(pages), got)(pages > size, compose(not, isAtEndPostion(pages)(size))(page))
  );
};



export {getPagination};
