import {date} from './lib/date';
import {compose} from './utils';
import {Equivalence} from './lib/Equivalence';
// const addDays = value => new Date(new Date(0).setDate(new Date(0).getDate() + value));

// const tz = date(dateIO).contramap(date => date.valueOf() + date.getTimezoneOffset() * 60 * 1000 * -1);
// const monday = date(dateIO)
//   .contramap(date => daysToMilliseconds(date.getDay() - (date.getDay() === 0 ? -6 : 1)) * -1);
// import {substract, lt, compose} from './utils';
// import {cast, clone, midnight, moveToDate, toDay,
//   getDate, plusDays, timezone} from './utils/date.utils';
// import {ToDate} from './utils/toDate';
// import {Equivalence} from './utils/Equivalence';
// import { fun } from 'jsverify';


// const months = {
//   es: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
// }










// const Midnight = ToDate(x=> new Date(x))
//   .contramap(tz).contramap(midnight).contramap(clone);

// const isLower = Equivalence((x, y) => lt(x)(y))
//   .contramap(cast).contramap(tz).contramap(clone);



// const startWeek = (date = new Date()) => 
//   Midnight.f(compose(moveToDate(date), getStartWeek)(date));

// const fillDays = (current = new Date()) => (_,index) => {
  //   const date = compose(Midnight.f, plusDays(index), clone)(current);
  //   const isToday = isSame.f(date, new Date())
  //   return { date, isToday }
  // };
  // const addFrom = (length = 7) => (current = new Date()) =>
  //   Array.from({length}, fillDays(current));
  
  // const diffDays = dateA => dateB => {
    //   const startDate = compose(substract, cast)(dateB);
    //   return compose(toDay, startDate, cast)(dateA);
    // };
    
    
    // export const isBeforeNow  = date => isLower.f(getDate(date), new Date());
    // export const getNextWeek = (date = new Date()) => compose(getWeek, plusDays(7))(date);
    // export const getPrevWeek = (date = new Date()) => compose(getWeek, plusDays(-7))(date);
    // export const getMonthName =  (date = new Date()) => months.es[date.getMonth()];
    // export const getWeek = (date = new Date()) => compose(addFrom(7), startWeek)(date);
    
    // export const addBetdateween = dateA => dateB => {
      //   const days = compose(addFrom, diffDays(dateA))(dateB);
      //   return days(dateA);
      // }
      
      
      
      
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
// const midnight = date => new Date(date.setHours(0,0,0,0));
// export const isBefore = (date = new Date()) => toCompare => 
  // kalendar(date).lte(toCompare);
const days = date => ({
  value: date,
  concat: amount => new Date(new Date(date).setDate(date.getDate() + amount)),
  empty: () => new Date(0),
});
const daysUntilMonday = value => value.getDay() - (value.getDay() === 0 ? -6 : 1);
const fillDays = length => date => Array.from({length}, (_, i) => days(date).concat(i));
const midnight = date => new Date(date.setHours(0,0,0,0));
const invert = value => value * - 1;
const clone = date => new Date(date);
const monday = date(d => compose(daysUntilMonday, invert, days(d).concat)(d))
  .contramap(midnight)
  .contramap(clone);
const isEquals = Equivalence((x, y) => x === y)
  .contramap(d => d.getTime())
  .contramap(midnight)
  .contramap(clone);
const week = date(fillDays(7))
  .contramap(monday.f);

// .
// const add = days => date(d => new Date(d))
  // .contramap(d => new Date(date).setDate(d))
  // .contramap(_date => new Date(_date).setDate(_date.getDate() + days));
export const addDays = date => days(date).concat;
export const getMonday = monday.f;
export const equals = dateA => dateB => isEquals.f(dateA, dateB);
export const getWeek = week.f;

//   .map(midnight)
//   .concat(monday.f(date));
          // console.log(tz(new Date()), 'f00sdf0sdf0fds')
          // addDays(date)(firstDay(date));
          
          // export const lessDays =  (date = new Date())  => days => kalendar(date)
          //   .concat({getTime: () => days * 60 * 60 * 24 * 1000 * -1})
          //   .concat({getTime: () => new Date().getTimezoneOffset() * 60 * 1000 * -1});
          
          //  kalendar().concat({getTime: () => days * 1000 * 60 * 60 * 24});