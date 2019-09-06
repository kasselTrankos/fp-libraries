import {tagged} from 'daggy';
import {add, tz, monday} from './utils/date';
// import {substract, lt, compose} from './utils';
// import {cast, clone, midnight, moveToDate, toDay,
//   getDate, plusDays, timezone} from './utils/date.utils';
// import {ToDate} from './utils/toDate';
// import {Equivalence} from './utils/Equivalence';
// import { fun } from 'jsverify';


// const months = {
//   es: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
// }


const midnight = date => new Date(date.setHours(0,0,0,0));






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
  const {value} = this.concat(tz.f(this.value));
  const zero = value => value < 10 ? `0${value}`: value;
  const dayMonthYear = `${zero(value.getDate())}/${zero(value.getMonth() + 1)}/${value.getFullYear()}`;
  const hourMinuteSecond = `${zero(value.getHours())}:${zero(value.getMinutes())}:${zero(value.getSeconds())}`;
  return `${dayMonthYear} ${hourMinuteSecond}`;
};
kalendar.prototype.map = function(f) {
  return kalendar(f(this.value));
};

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
export const addDays =  (date = new Date())  => days => kalendar(date)
  .concat(add.f(days))
  // .concat(tz.f());

export const getMonday = (date = new Date()) => kalendar(date)
  .map(midnight)
  .concat(monday.f(date));
          // console.log(tz(new Date()), 'f00sdf0sdf0fds')
          // addDays(date)(firstDay(date));
          
          // export const lessDays =  (date = new Date())  => days => kalendar(date)
          //   .concat({getTime: () => days * 60 * 60 * 24 * 1000 * -1})
          //   .concat({getTime: () => new Date().getTimezoneOffset() * 60 * 1000 * -1});
          
          //  kalendar().concat({getTime: () => days * 1000 * 60 * 60 * 24});