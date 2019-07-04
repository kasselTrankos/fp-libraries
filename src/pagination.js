import compose from 'lodash/fp/compose';
import {Either} from 'ramda-fantasy';
import  * as utils from './utils';

const {Right, Left}  = Either;

const map = fn => right => right.map(fn);
const safePage = cond => cond ? Right({page: 1, text: '«'}) : Left([]);


const buildPageObject  = page => ({current: page, text: String(page)});
const getSize = total => limit => Math.ceil(total / limit);
const isAtEndPostion  = total => size => page => 
  compose(utils.not, utils.lt(page), getBegin(size))(total);
const getBegin = size => total => total - size;
const getMaxPages = size => pages => utils.lt(pages)(size) ? pages : size; 
const getCountPagination = total => size => limit => compose(getMaxPages(size), getSize(total))(limit);
const getCountPages = total => size => limit => pages => pages < size ? pages : getSize(total)(limit);
const getStart = page => size => total => 
  utils.is([utils.lt(size)(total), isAtEndPostion(total)(size)(page)]) ? total - size + 1 : page;

const getPages  = size => start => 
  Array.from({length: size}, (_, i) =>  compose(utils.value, Right, buildPageObject)(start + i));

const getPage = page => compose(utils.value, map(utils.toArray), map(page), safePage);

const getPagination = (total = 0) => (size = 6) => (limit = 14) => (page = 1)  =>{
  const count = getCountPagination(total)(size)(limit);
  const pages = getCountPages(total)(size)(limit)(count);
  /// here start the tree decissor
  const overFirst = [utils.lt(1)(page)];
  const pagesOverSize = [utils.lt(size)(pages)]; 
  const atEndPages = [
      compose(utils.not, isAtEndPostion(pages)(size))(page)];
  return [].concat(
    compose(getPage(x => ({page: 1, text: '«'})), utils.is)(overFirst),
    compose(getPage(x => ({page: utils.less(page), text:'‹'})), utils.is)([...overFirst, ...pagesOverSize]),
    compose(getPages(count), getStart(page)(size), getSize(total))(limit), 
    compose(getPage(x => ({page: utils.add(page), text:'›'})), utils.is)([...pagesOverSize, ...atEndPages]),
    compose(getPage(x => ({page: pages, text:'»'})), utils.is)([...pagesOverSize, ...atEndPages])
  );
};



export {getPagination};
