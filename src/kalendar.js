import {substract, lt, add, compose, Equivalence, ToDate} from './utils';

const months = {
  es: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
}
const cast = date => +new Date(date);
const tz = date => new Date(add(date.getTime())(date.getTimezoneOffset() * 60 * 1000 * -1));
const setMidNight = date => new Date(date.setHours(0,0,0,0));

const toMidnight = ToDate(x=> new Date(x)).contramap(tz).contramap(setMidNight);
const isSame = Equivalence((x, y) => x === y).contramap(cast).contramap(toMidnight.f);
const isLower = Equivalence((x, y) =>  lt(x)(y));


const addDays = days => (date = new Date()) => 
  toMidnight.f(new Date(date.setDate(date.getDate() + days)));
const startWeek = (date = new Date()) => 
  toMidnight.f(compose(getDateFromDay(date), getStartWeek)(date));

const getStartWeek = date => date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);

const getDateFromDay = (date = new Date) => diff => new Date(date.setDate(diff));

const fillDays = (current = new Date()) => (_,index) => {
  const date = addDays(index)(current);
  const isToday = isSame.f(date, new Date())
  return { date, isToday }
};

const getDaysFrom = (length = 7) => (current = new Date()) => {
  return Array.from({length}, fillDays(current));
};
const getFullDate = date => {
  const [year, month, day] = date.day.split('-');
  return new Date(year, month - 1, day, date.hour, date.minute, 0);
}
const getDays = date => Math.abs(Math.round(date / (1000 *60*60*24)));  


export const isBeforeNow  = date => isLower.contramap(cast).contramap(tz)
.f(getFullDate(date), new Date());
export const getNextWeek = (date = new Date()) => compose(getWeek, addDays(7))(date);
export const getPrevWeek = (date = new Date()) => compose(getWeek, addDays(-7))(date);
export const getMonthName =  (date = new Date()) => months.es[date.getMonth()];
export const getWeek = (date = new Date()) => compose(getDaysFrom(7), startWeek)(date);
export const diffDays = dateA => dateB => {
  const initDate = compose(substract, cast)(dateB);
  return compose(getDays, compose(initDate, cast))(dateA);
};

//compose(getDays, compose(less(cast(dateB)), cast))(dateA);
