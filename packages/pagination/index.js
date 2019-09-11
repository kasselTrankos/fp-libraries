import {fromEither} from 'sanctuary';
import {Page} from './utils/page';
import {lt, add, less, compose, getRighOrLeft} from './utils';


const min = max => value => Math.min(max, value);
const getSize = total => limit => Math.ceil(total / limit);
const getPages = length => current =>
  Array.from({length}, (_, i) => Page(current - i, String(current - i))).reverse();


const getPagination = (total = 0) => (size = 6) => (limit = 14) => (page = 1) => {
  const end = compose(min(page + size), getSize(total))(limit);
  const pages = compose(getPages(size), less(end))(1);
  const isOverFirstPage = lt(1)(page);
  const isLessLastPage = compose(lt(page),  getSize(total))(limit);

  return [].concat(
    fromEither([])(getRighOrLeft(isOverFirstPage)([{page: 1, text: '«'}])),
    fromEither([])(getRighOrLeft(isOverFirstPage)([{page: less(page)(1), text:'‹'}])),
    pages,
    fromEither([])(getRighOrLeft(isLessLastPage)([{page: add(page)(1), text:'›'}])),
    fromEither([])(getRighOrLeft(isLessLastPage)([{page: end, text:'»'}])));
};

export {getPagination};
