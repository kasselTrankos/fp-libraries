import {tagged} from 'daggy';
import {contramap} from 'fantasy-land';
const date = tagged('date', ['f']);
//TODO: need to made the IO interfaz pattern

const dateIO = value => new Date(new Date(0).setTime(value));
date.prototype[contramap] = date.prototype.contramap = function (g) {
  return date(x => this.f(g(x)));
};
const daysToMilliseconds = days => days * 60 * 60 * 24 * 1000;

const add = date(dateIO).contramap(daysToMilliseconds);
const tz = date(dateIO).contramap(date => date.valueOf() + date.getTimezoneOffset()* 60 * 1000 * -1);
// const add = days => days * 60 * 60 * 24 * 1000;

const monday = date(dateIO)
  .contramap(date =>daysToMilliseconds(date.getDay() -  (date.getDay() === 0 ? -6 : 1)) * -1);

module.exports = {date, monday, tz, add};