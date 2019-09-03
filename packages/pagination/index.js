import {fromEither} from 'sanctuary';
import {Page} from './utils/page';
import {lt, add, less, compose, getRighOrLeft} from './utils';

const Any = page => ({
  page,
  concat: a => Any(page || a.page),
});

Any.empty = () => Any([]);
const min = max => value => Math.min(max, value);
const getSize = total => limit => Math.ceil(total / limit);
const _getPages = length => current =>
  Array.from({length}, (_, i) => Page(current - i, String(current - i))).reverse();

<<<<<<< HEAD
=======
// get pages of component given necessary values
const getPages = length => current => 
  Array.from({length}, (_, i) => compose(getPage(x => buildPageObject(add(current)(i))), is)([true]));

const getPage = page => compose(prop('value'), map(toArray), map(page), safePage);
>>>>>>> 6d6bc47eb8df9d3acff881d52e8dfb659158c6f3

const getPagination = (total = 0) => (size = 6) => (limit = 14) => (page = 1) => {
  const end = compose(min(page + size), getSize(total))(limit);
  const pages = compose(_getPages(size), less(end))(1);
  const isOverFirstPage = lt(1)(page);
  const isLessLastPage = compose(lt(page),  getSize(total))(limit);

  return [].concat(
    fromEither([])(getRighOrLeft(isOverFirstPage)([{page: 1, text: '«'}])),
    fromEither([])(getRighOrLeft(isOverFirstPage)([{page: less(page)(1), text:'‹'}])),
    pages,
    fromEither([])(getRighOrLeft(isLessLastPage)([{page: add(page)(1), text:'›'}])),
    fromEither([])(getRighOrLeft(isLessLastPage)([{page: end, text:'»'}])),
  );
};

export {getPagination};
