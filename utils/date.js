import {tagged} from 'daggy';
const date = tagged('date', ['f']);
//TODO: need to made the IO interfaz pattern
const dateIO = value => new Date(new Date(0).setTime(value));
date.prototype.contramap =function (g) {
  return date(x => this.f(g(x)));
};
const daysToMilliseconds = days => days * 60 * 60 * 24 * 1000;

export const add = date(dateIO).contramap(daysToMilliseconds);
export const tz = date(dateIO).contramap(() => new Date().getTimezoneOffset()* 60 * 1000 * -1);
// const add = days => days * 60 * 60 * 24 * 1000;

export const monday = date(dateIO)
  .contramap(date =>{
    const d =  (date.getDay() -  (date.getDay() === 0 ? 0 : 1)) * -1;
    return daysToMilliseconds(d);
  });