import moment from 'moment';
let current = new Date();
const daysWeek = (actual = current) => {
  const isToday = date => Boolean(date.format('YYYY-MM-DD') === moment().format('YYYY-MM-DD'));
  const startOfWeek = moment(actual).startOf('isoWeek');
  const fillDays = (_,index) => ({
    date: moment(startOfWeek).add(index, 'days'), 
    isToday: isToday(moment(startOfWeek).add(index, 'days'))
  });
  return Array.from({length: 7}, fillDays);
};

export const getWeek = () => daysWeek();
export const setToday = () => {
  current = new Date();
};
export const setNextWeek = () => {
  current = new Date(current.setDate(current.getDate()+7));
};
export const setPrevWeek = () => {
  current = new Date(current.setDate(current.getDate()-7));
};


export const getNextWeek = () => {
  setNextWeek();
  return daysWeek(current);
};
export const getPrevWeek = () => {
  setPrevWeek();
  return daysWeek(current);
};

export const getMonthName =  (actual = current) => moment(actual).format('MMMM');

