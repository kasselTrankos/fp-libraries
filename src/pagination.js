import compose from 'lodash/fp/compose';
import {Either} from 'ramda-fantasy';

const {Right, Left}  = Either;
const safePage = cond => cond ? Right({page: 1, text: '«'}) : Left([]);
const map = fn => right => right.map(fn);
const value = right => right.value;


console.log(safePage(true).map(x=> {x.page =100; return x;}).map(x=>[x]));


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






const getPaginationLeft = pages => size => page => {
  const previous = page => () => ({page: --page, text:'‹'});
  const gotPaginationLeft = pages => size => page => 
    [pages > size, page > 1].every(Boolean);
    
  const Page = compose(safePage, gotPaginationLeft(pages)(size));
  const firstPage = compose(value, map(toArray), Page);
  const previousPage = compose(value, map(toArray), map(previous(page)), Page);
  return  [].concat(firstPage(page), previousPage(page));
}

const getPaginationRight = pages => size => page => {
  const last = pages => () => ({page: pages, text: '»'});
  const next = page => () => ({page: ++page, text:'›'});
  const gotPaginationRight = pages => size => page =>
    [pages > size, compose(not, isAtEndPostion(pages)(size))(page)].every(Boolean);
  
  const Page = compose(safePage, gotPaginationRight(pages)(size));
    const lastPage = compose(value, map(toArray), map(last(pages)), Page);
    const nextPage = compose(value, map(toArray), map(next(pages)), Page);
    return  [].concat(nextPage(page), lastPage(page));
  }

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
