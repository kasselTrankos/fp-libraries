import {substract, lt, compose, Equivalence, ToDate} from './utils';
import {cast, tz, clone, midnight, moveToDate, toDay,
  getDate, plusDays} from './utils/date.utils';

const months = {
  es: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
}



const Midnight = ToDate(x=> new Date(x))
  .contramap(tz).contramap(midnight).contramap(clone);
const isSame = Equivalence((x, y) => x === y)
  .contramap(cast).contramap(Midnight.f).contramap(clone);
const isLower = Equivalence((x, y) =>  lt(x)(y));



const startWeek = (date = new Date()) => 
  Midnight.f(compose(moveToDate(date), getStartWeek)(date));

const getStartWeek = date => date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);



const fillDays = (current = new Date()) => (_,index) => {
  const date = compose(compose(Midnight.f, plusDays(index)), clone)(current);
  const isToday = isSame.f(date, new Date())
  return { date, isToday }
};

const getDaysFrom = (length = 7) => (current = new Date()) =>
  Array.from({length}, fillDays(current));




export const isBeforeNow  = date => isLower.contramap(cast).contramap(tz)
.f(getDate(date), new Date());
export const getNextWeek = (date = new Date()) => compose(getWeek, plusDays(7))(date);
export const getPrevWeek = (date = new Date()) => compose(getWeek, plusDays(-7))(date);
export const getMonthName =  (date = new Date()) => months.es[date.getMonth()];
export const getWeek = (date = new Date()) => compose(getDaysFrom(7), startWeek)(date);
export const diffDays = dateA => dateB => {
  const initDate = compose(substract, cast)(dateB);
  return compose(toDay, compose(initDate, cast))(dateA);
};

export const getDaysBetween = dateA => dateB => {
  const getDays = compose(getDaysFrom, diffDays(dateA))(dateB);
  return compose(getDays, Midnight.f)(dateA);
}

//compose(getDays, compose(less(cast(dateB)), cast))(dateA);
