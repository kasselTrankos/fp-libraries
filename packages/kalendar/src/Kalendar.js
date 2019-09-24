import {date, diff, weeks} from './../lib/date';
import {compose, invert} from './../utils';
import {clone, midnight, daysUntilMonday} from './../utils/date';

const day = date => ({
  value: date,
  concat: amount => new Date(new Date(date).setDate(date.getDate() + amount)),
  empty: () => new Date(0),
});

const fillDays = length => date => Array.from({length}, (_, i) => day(date).concat(i));
const monday = weeks(d => compose(daysUntilMonday, invert, day(d).concat)(d))
  .contramap(midnight)
  .contramap(clone);
const week = weeks(fillDays(7))
  .contramap(monday.f);

const diffDate = diff((x, y) => x - y)
  .contramap(x=> new Date(x).getTime());
  
const toDay = val => val / (24 * 60 * 60 * 1000);

export const addDays = date => day(date).concat;
export const getMonday = monday.f;
export const equals = dateA  => dateB => date(dateA).equals(dateB);
export const lte = dateA  => dateB => date(dateA).lte(dateB);
export const getWeek = week.f;
export const diffDays = dateA => dateB => compose(toDay, Math.abs, Math.round)(diffDate.f(dateA, dateB));