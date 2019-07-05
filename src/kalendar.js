import {add, compose} from './utils';
const months = {
  es: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
}
const tz = date => new Date(add(date.getTime())(date.getTimezoneOffset() * 60 * 1000 * -1));
const toMidnight = date => new Date(date.setHours(0,0,0,0));
const isToday = date => Boolean( +compose(tz, toMidnight)(date) === +compose(tz, toMidnight)(new Date()));
const startWeek = (date = new Date()) => {
  const day = date.getDay();
  const diff = date.getDate() - day + (day == 0 ? -6 : 1);
  return compose(tz, toMidnight)(new Date(date.setDate(diff)));
};
const addDays = days => (date = new Date()) => compose(tz, toMidnight)(new Date(date.setDate(date.getDate() + days)));

const getDaysFrom = (length = 7) => (date = new Date()) => {
  const fillDays = (_,index) => ({
    date: compose(addDays(index), startWeek)(date),
    isToday: compose(isToday, compose(addDays(index), startWeek))(date)
  });
  return Array.from({length}, fillDays);
};

export const setToday = () => {
  current = new Date();
};

export const getWeek = getDaysFrom(7);
export const getNextWeek = (date = new Date()) => compose(getWeek, addDays(7))(date);
export const getPrevWeek = (date = new Date()) => compose(getWeek, addDays(-7))(date);
export const getMonthName =  (date = new Date()) => months.es[date.getMonth()];

