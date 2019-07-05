import moment from 'moment';
import {is, add, compose} from './utils';
let current = new Date();

const tz = date => {
  const tzDifference = date.getTimezoneOffset();
  return new Date(add(date.getTime())(tzDifference * 60 * 1000 * -1));
};
const toMidnight = date => new Date(date.setHours(0,0,0,0));
const isToday = date => Boolean( +compose(tz, toMidnight)(date) === +compose(tz, toMidnight)(new Date()));
const startWeek = (date = new Date()) => {
  const day = date.getDay();
  const diff = date.getDate() - day + (day == 0 ? -6 : 1);
  return compose(tz, toMidnight)(new Date(date.setDate(diff)));
};
const addDays = days => (date = new Date()) => compose(tz, toMidnight)(new Date(date.setDate(date.getDate() + days)));

const getDaysFrom =  (length = 7) => (date = new Date()) => {
  const fillDays = (_,index) => ({
    date: compose(addDays(index), startWeek)(date),
    isToday: compose(isToday, compose(addDays(index), startWeek))(date)
  });
  return Array.from({length}, fillDays);
};


export const setToday = () => {
  current = new Date();
};


export const getNextWeek = (date = new Date()) => compose(getDaysFrom(7), addDays(7))(date);
export const getPrevWeek = (current = new Date()) => {
  setCurrentDate(-7);
  return daysWeek(current);
};

export const getWeek = () => getDaysFrom()();
export const getMonthName =  (actual = new Date()) => moment(actual).format('MMMM');

