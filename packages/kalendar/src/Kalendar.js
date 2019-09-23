import {kalendar} from './../lib/kalendar';
import {date} from './../lib/date';
import {compose, invert} from './../utils';
import {clone, midnight, daysUntilMonday} from './../utils/date';

const day = date => ({
  value: date,
  concat: amount => new Date(new Date(date).setDate(date.getDate() + amount)),
  empty: () => new Date(0),
});

const fillDays = length => date => Array.from({length}, (_, i) => day(date).concat(i));
const monday = kalendar(d => compose(daysUntilMonday, invert, day(d).concat)(d))
  .contramap(midnight)
  .contramap(clone);
const week = kalendar(fillDays(7))
  .contramap(monday.f);

export const addDays = date => day(date).concat;
export const getMonday = monday.f;
export const equals = dateA  => dateB => date(dateA).equals(dateB);
export const lte = dateA  => dateB => date(dateA).lte(dateB);
export const getWeek = week.f;