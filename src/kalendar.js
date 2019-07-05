import {add, compose, Equivalence} from './utils';

const months = {
  es: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
}
const tz = date => new Date(add(date.getTime())(date.getTimezoneOffset() * 60 * 1000 * -1));
const toMidnight = date => new Date(date.setHours(0,0,0,0));
const isSame = Equivalence((x, y)=>+x === +y).contramap(toMidnight).contramap(tz);
const startWeek = (date = new Date()) => {
  const day = date.getDay();
  const diff = date.getDate() - day + (day == 0 ? -6 : 1);
  return compose(tz, toMidnight)(new Date(date.setDate(diff)));
};
const addDays = days => (date = new Date()) => compose(tz, toMidnight)(new Date(date.setDate(date.getDate() + days)));

const getDaysFrom = (length = 7) => (current = new Date()) => {
  const fillDays = (_,index) => {
    const date = compose(addDays(index), startWeek)(current);
    
    return {
      date,
      isToday: isSame.f(date, new Date())

    }
  };
  return Array.from({length}, fillDays);
};

export const setToday = () => {
  current = new Date();
};

export const getWeek = getDaysFrom(7);
export const getNextWeek = (date = new Date()) => compose(getWeek, addDays(7))(date);
export const getPrevWeek = (date = new Date()) => compose(getWeek, addDays(-7))(date);
export const getMonthName =  (date = new Date()) => months.es[date.getMonth()];

