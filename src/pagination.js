import compose from 'lodash/fp/compose';
import Center from './center';
import {Either} from 'ramda-fantasy';

const {Right, Left}  = Either;
const safePage = cond => cond ? Right({page: 1, text: '«'}) : Left([]);


console.log(safePage(true).map(x=> {x.page =100; return x;}).map(x=>[x]));


const not = value => !value;
const buildPageObject  = page => ({current: page, text: String(page)});
const first = page => safePage(page > 1).map(x =>[x]).value; 
// [new Left(1, '«')];
const previous = page => [Left(--page, '‹')];
const last = pages  => [Right(pages, '»')];
const next = page => [Right(++page, '›')];
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



export {getPagination};
