import compose from 'lodash/fp/compose';
import _ from 'lodash';
import {Maybe, Either} from 'ramda-fantasy';
const {Just, Nothing} = Maybe;
const {Left, Right} = Either;

const page = Just({page: 1, text: '«'});

const nothing = {value: []}

const lastPage = value => Just({page: value, text:'»'});
const firstPage = value => Just({page: 1, text: '«'});
const nextPage = value => Just({page: ++value, text: '›'});
const prevPage = value => Just({page: --value, text: '‹'});
const fromEither = optional => Either.either(Left({page: 1, text: '«'}) ,Right([]))
console.log(fromEither(false));
const not = value => !value;
const buildPageObject  = page => ({current: page, text: String(page)});
const first = page => [firstPage(page).value];
const previous = page => [prevPage(page).value];
const last = pages  => [lastPage(pages).value];
const next = page => [nextPage(page).value];
const getSize = total => limit => Math.ceil(total / limit);
const isLessThan = max => value => value < max; 
const isAtEndPostion  = total => size => page => compose(isLessThan(page), getBegin(size))(total);
const getBegin = size => total => total - size;
const getMaxPages = size => pages => isLessThan(size)(pages) ? pages : size; 
const getCountPagination = total => size => limit => compose(getMaxPages(size), getSize(total))(limit);
const getCountPages = total => size => limit => pages => pages < size ? pages : getSize(total)(limit);
const getStart = page => size => total => 
  [isLessThan(total)(size), isAtEndPostion(total)(size)(page)].every(Boolean) ? total - size + 1 : page;
const getPages  = size => start =>  Array.from({length: size}, (_, i) =>  buildPageObject(start + i));


const gotPaginationLeft = pages => size => page => 
  [pages > size, page > 1].every(Boolean);

const gotPaginationRight = pages => size => page =>
  [pages > size, compose(not, isAtEndPostion(pages)(size))(page)].every(Boolean);

const getPaginationLeft = pages => size => page => 
  gotPaginationLeft(pages)(size)(page) ? [].concat(first(page), previous(page)) : [];

const getPaginationRight = pages => size => page => 
  gotPaginationRight(pages)(size)(page) ? [].concat(next(page), last(pages)) : [];

const getPagination = (total = 0) => (size = 6) => (limit = 14) => (page = 1)  =>{
  const count = getCountPagination(total)(size)(limit);
  const pages = getCountPages(total)(size)(limit)(count);
  /// here start the tree decissor
  return [].concat(
    getPaginationLeft(pages)(size)(page),
    compose(getPages(count), getStart(page)(size), getSize(total))(limit), 
    getPaginationRight(pages)(size)(page)
  );
};



export {getPagination, first, previous, last, next};
