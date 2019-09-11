import {add, compose} from './index';

const timezone = (date = new Date()) => date.getTimezoneOffset() * 60 * 1000 * -1;

export const midnight = date => new Date(date.setHours(0,0,0,0));
export const cast = date => +new Date(date);
export const tz = date => new Date(compose(add(date.getTime()), timezone)(date));
export const moveToDate = (date = new Date) => diff => new Date(date.setDate(diff));
export const toDay = date => Math.abs(Math.round(date / (1000 *60*60*24)));
export const clone = date => new Date(date.getTime());
export const getDate = date => {
  const [year, month, day] = date.day.split('-');
  return new Date(year, month - 1, day, date.hour, date.minute, 0);
};
export const plusDays = days => (date = new Date()) => 
  new Date(date.setDate(date.getDate() + days));