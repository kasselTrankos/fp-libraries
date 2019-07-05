import moment from 'moment';
import {is, add, compose} from './utils';
const tz = date => {
  const tzDifference = date.getTimezoneOffset();
  return new Date(add(date.getTime())(tzDifference * 60 * 1000 * -1));
};
const toMidnight = date => new Date(date.setHours(0,0,0,0));
const isToday = date => Boolean( +tz(date) === +compose(tz, toMidnight)(new Date()));

let current = new Date();
const daysWeek = (actual = new Date()) => {
  const startOfWeek = moment(actual).startOf('isoWeek');
  console.log('to midnight', compose(tz, toMidnight)(new Date()),' tz', tz(new Date()), new Date(), tz(startOfWeek.toDate()));
  // console.log(startOfWeek.add(5, 'days'), new Date(startOfWeek));
  const fillDays = (_,index) => ({
    date: moment(startOfWeek).add(index, 'days'), 
    isToday: isToday(moment(startOfWeek).add(index, 'days').toDate())
  });

  return Array.from({length: 7}, fillDays);
};

export const getWeek = () => daysWeek();

export const setToday = () => {
  current = new Date();
};
const setCurrentDate = offset => {
  var dateOffset = (24*60*60*1000) * offset; //5 days
  current.setTime(current.getTime() + dateOffset);
};


export const getNextWeek = (current = new Date()) => {
  setCurrentDate(7);
  return daysWeek(current);
};
export const getPrevWeek = (current = new Date()) => {
  setCurrentDate(-7);
  return daysWeek(current);
};

export const getMonthName =  (actual = new Date()) => moment(actual).format('MMMM');

