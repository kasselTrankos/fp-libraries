import {not, lt, add, compose, Equivalence, ToDate} from './utils';

const months = {
  es: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
}
const tz = date => new Date(add(date.getTime())(date.getTimezoneOffset() * 60 * 1000 * -1));
const setMidNight = date => new Date(date.setHours(0,0,0,0));
const toMidnight = ToDate(x=> new Date(x)).contramap(tz).contramap(setMidNight);
const isSame = Equivalence((x, y) => +x === +y);
const isLower = Equivalence((x, y) =>  lt(x)(y));

const startWeek = (date = new Date()) => {
  const day = date.getDay();
  const diff = date.getDate() - day + (day == 0 ? -6 : 1);
  return toMidnight.f(new Date(date.setDate(diff)));
};
const addDays = days => (date = new Date()) => toMidnight.f(new Date(date.setDate(date.getDate() + days)));

const getDaysFrom = (length = 7) => (current = new Date()) => {
  const fillDays = (_,index) => {
    const date = compose(addDays(index), startWeek)(current);
    const isToday = isSame.contramap(toMidnight.f).f(date, new Date())
    return { date, isToday }
  };
  return Array.from({length}, fillDays);
};
const getFullDate = date => {
  const [year, month, day] = date.day.split('-');
  return new Date(year, month - 1, day, date.hour, date.minute, 0);
}

const cast = date => {console.log(date);return +new Date(date)};

export const getWeek = getDaysFrom(7);
export const isBeforeNow  = date => isLower.contramap(cast).contramap(tz)
  .f(getFullDate(date), new Date());
export const getNextWeek = (date = new Date()) => compose(getWeek, addDays(7))(date);
export const getPrevWeek = (date = new Date()) => compose(getWeek, addDays(-7))(date);
export const getMonthName =  (date = new Date()) => months.es[date.getMonth()];

