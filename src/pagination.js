import compose from 'lodash/fp/compose';
import {Either} from 'ramda-fantasy';

const {Right, Left}  = Either;
const safePage = cond => cond ? Right({page: 1, text: '«'}) : Left([]);
const map = fn => right => right.map(fn);
const value = right => right.value;
const truthyEither = c => c ? Either.Right() : Either.Left();
const fromEither = real => optional => {
  const g = () => real;
  const f = () => optional;
  const either = Either.either(g, f);
  return f => {
    const is = compose(either, truthyEither);
    return cond => compose(is, f)(cond);
  }
}


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
const getStart = page => size => total => 
  [isLessThan(total)(size), isAtEndPostion(total)(size)(page)].every(Boolean) ? total - size + 1 : page;

const getPages  = size => start => 
  Array.from({length: size}, (_, i) =>  compose(value, Right, buildPageObject)(start + i));

const got = function () { return [...arguments].every(Boolean);}




const getFristPages = pages => size => page => {
  const gotPages = pages => size => page => got(pages > size, page > 1);
  
  const Page = compose(safePage, gotPages(pages)(size));
  const previousPage = compose(value, map(toArray), map(previous(page)), Page);
  return  [].concat(previousPage(page));
};

const getFirstPage = compose(value, map(toArray), safePage); 
const getPreviousPage = page => {
  const previous = page => () => ({page: --page, text:'‹'});
  return compose(value, map(toArray), map(previous(page)), safePage);
};

const getPaginationRight = pages => size => page => {
  const last = pages => () => ({page: pages, text: '»'});
  const next = page => () => ({page: ++page, text:'›'});
  const gotPaginationRight = pages => size => page => 
    got(pages > size, compose(not, isAtEndPostion(pages)(size))(page));
  
  const Page = compose(safePage, gotPaginationRight(pages)(size));
  const lastPage = compose(value, map(toArray), map(last(pages)), Page);
  const nextPage = compose(value, map(toArray), map(next(pages)), Page);
  return  [].concat(nextPage(page), lastPage(page));
};

const getPagination = (total = 0) => (size = 6) => (limit = 14) => (page = 1)  =>{
  const count = getCountPagination(total)(size)(limit);
  const pages = getCountPages(total)(size)(limit)(count);
  /// here start the tree decissor
  return [].concat(
    compose(getFirstPage, got)(pages > size, page > 1),
    compose(getPreviousPage(page), got)(pages > size, page > 1),
    compose(getPages(count), getStart(page)(size), getSize(total))(limit), 
    getPaginationRight(pages)(size)(page)
  );
};



export {getPagination};
