import {tagged} from 'daggy';
// import {substract, lt, compose} from './utils';
// import {cast, clone, midnight, moveToDate, toDay,
//   getDate, plusDays, timezone} from './utils/date.utils';
// import {ToDate} from './utils/toDate';
// import {Equivalence} from './utils/Equivalence';
// import { fun } from 'jsverify';


// const months = {
//   es: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
// }

const date = tagged('date', ['f']);
const midnight = date => new Date(date.setHours(0,0,0,0));
date.prototype.contramap =function (g) {
  return date(x => this.f(g(x)));
};
//TODO: need to made the IO interfaz pattern
const dateIO = value => new Date(new Date(0).setTime(value));
const getDays = date(dateIO).contramap(days => days * 60 * 60 * 24 * 1000);
const getTZ = date(dateIO).contramap(() => new Date().getTimezoneOffset()* 60 * 1000 * -1);
// const getDays = days => days * 60 * 60 * 24 * 1000;

const getMonday = date(x=> ({getTime: () => x}))
  .contramap(date => {
    const day = date.getDay(),
    diff = date.getDate() - day + (day == 0 ? -6:1);
    console.log('given', date, diff, 'new', new Date(new Date(date.getTime()).setDate(diff)));
    return new Date(new Date(date.getTime()).setDate(diff));
  });

// const Midnight = ToDate(x=> new Date(x))
//   .contramap(tz).contramap(midnight).contramap(clone);
// const isSame = Equivalence((x, y) => x === y)
//   .contramap(cast).contramap(Midnight.f).contramap(clone);
// const isLower = Equivalence((x, y) => lt(x)(y))
//   .contramap(cast).contramap(tz).contramap(clone);



// const startWeek = (date = new Date()) => 
//   Midnight.f(compose(moveToDate(date), getStartWeek)(date));

// const fillDays = (current = new Date()) => (_,index) => {
  //   const date = compose(Midnight.f, plusDays(index), clone)(current);
  //   const isToday = isSame.f(date, new Date())
  //   return { date, isToday }
  // };
  // const getDaysFrom = (length = 7) => (current = new Date()) =>
  //   Array.from({length}, fillDays(current));
  
  // const diffDays = dateA => dateB => {
    //   const startDate = compose(substract, cast)(dateB);
    //   return compose(toDay, startDate, cast)(dateA);
    // };
    
    
    // export const isBeforeNow  = date => isLower.f(getDate(date), new Date());
    // export const getNextWeek = (date = new Date()) => compose(getWeek, plusDays(7))(date);
    // export const getPrevWeek = (date = new Date()) => compose(getWeek, plusDays(-7))(date);
    // export const getMonthName =  (date = new Date()) => months.es[date.getMonth()];
    // export const getWeek = (date = new Date()) => compose(getDaysFrom(7), startWeek)(date);
    
    // export const getDaysBetdateween = dateA => dateB => {
      //   const days = compose(getDaysFrom, diffDays(dateA))(dateB);
      //   return days(dateA);
      // }
const firstDay = date => {
  const d = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
  console.log(d, date, date.getDate(), date.getDay());
  return d;
};
const kalendar = tagged('kalendar', ['value']);
kalendar.prototype.concat = function(that) {
  return kalendar(new Date(this.value.getTime() + that.getTime()));
};
kalendar.empty = function() {
  return new Date(0);
};
kalendar.prototype.equals = function(that) {
  
  return this.value.getTime() === that.getTime();
};
kalendar.prototype.format = function(format) {
  const zero = value => value < 10 ? `0${value}`: value;
  const dayMonthYear = `${zero(this.value.getDate())}/${zero(this.value.getMonth() + 1)}/${this.value.getFullYear()}`;
  const hourMinuteSecond = `${zero(this.value.getUTCHours())}:${zero(this.value.getMinutes())}:${zero(this.value.getSeconds())}`;
  return `${dayMonthYear} ${hourMinuteSecond}`;
};
kalendar.prototype.map = function(f) {
  return new Date(f(this.value));
};



// function kalendar(value = new Date()) {
//   return {
//     value: value,
  
//     empty: () => kalendar(new Date(0)),
//     concat: (that) => kalendar(tz(new Date(value.getTime() + that.getTime()))),
//   }
// };
// const tz = date => kalendar(date).concat({getTime: () => date.getTimezoneOffset() * 60 * 1000 * -1})
// console.log(timezone(new Date()), '.......');

// console.log(getDate.f(1100));
export const addDays =  (date = new Date())  => days => kalendar(date)
  .concat(getDays.f(days))
  .concat(getTZ.f());
// export const getWeek = (date = new Date()) => kalendar(getMonday.f(date))
//   .map(getTZ);
// console.log(getTZ(new Date()), 'f00sdf0sdf0fds')
// addDays(date)(firstDay(date));

// export const lessDays =  (date = new Date())  => days => kalendar(date)
//   .concat({getTime: () => days * 60 * 60 * 24 * 1000 * -1})
//   .concat({getTime: () => new Date().getTimezoneOffset() * 60 * 1000 * -1});

//  kalendar().concat({getTime: () => days * 1000 * 60 * 60 * 24});