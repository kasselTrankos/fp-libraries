import moment from 'moment';
let current = new Date();
const daysWeek = (actual = current) => {
  const isToday = date => Boolean(date.format('YYYY-MM-DD') === moment().format('YYYY-MM-DD'));
  const startOfWeek = moment(actual).startOf('isoWeek');
  const endOfWeek = moment(actual).endOf('isoWeek');
  const start = startOfWeek.format('DD');
  const end = endOfWeek.format('DD');
  const fillDays = (_,index) => ({
    date: moment(startOfWeek).add(index, 'days'), 
    isToday: isToday(moment(startOfWeek).add(index, 'days'))
  });
  return Array.from({length: Number(end - start) + 1}, fillDays);
};

export const getWeek = () => daysWeek();
export const setToday = () => {
  current = new Date();
};
export const getNextWeek = () => {
  current = new Date(current.setDate(current.getDate()+7));
  return daysWeek(current);
};

export const getMonthName =  (actual = current) => moment(actual).format('MMMM');

