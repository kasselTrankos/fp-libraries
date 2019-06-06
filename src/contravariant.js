// a study of case fp
//based in this article https://medium.com/@drboolean/monoidal-contravariant-functors-are-actually-useful-1032211045c4
import Page from './page';
import compose from 'lodash/fp/compose';

const Pagination = page => cond  => cond ? {page} : false;
const buildPageObject = text => page => Object.assign({}, page, {text});
const not = value => !value;
const getSize =  limit => total => Math.ceil(total / limit);
const isLessThan = value => max => value < max;
const getBegin = total => size => total - size;
const getMaxPages = limit => pages => isLessThan(pages)(limit) ? pages : limit; 
const isNumber = n => typeof n === 'number';
const blueBird_ = f => f1 => f2 => a => f(f1(a))(f2(a));
const pageNumber = current => page => page + current;
const getPage = current => page => blueBird_(Pagination)(pageNumber(current))(isNumber)(page);
const demo = () => {
  const limit = 6;
  const total = 4;
  const current = 1;
  const prev = current - 1;
  const first = compose(Pagination(1), not, isLessThan(current));
  const previous = compose(Pagination(prev), not, isLessThan(prev));
  const last = compose(Pagination(current), isLessThan(current), getBegin(total), getSize(limit));//Pagination(isNumber);
  const next = compose(Pagination(current), isLessThan(current), getBegin(total), getSize(limit));
  const getPagination = getPage(current);
  // console.log(last(total), ',op', compose(getMaxPages(limit), getSize(limit))(total)); //f(f1(a))(f2(a))
  const g =  []
    .concat([compose(buildPageObject('«'), first)(1)])
    .concat([compose(buildPageObject('‹'), previous)(1)])
    .concat(Array.from({length: compose(getMaxPages(limit), getSize(limit))(total)}).map((_, page) => getPagination(page)))
    .concat([compose(buildPageObject('›'), next)(total)])
    .concat([compose(buildPageObject('»'), last)(total)]).filter(Boolean);
  console.log(g);
};

export {demo};
