import moment from 'moment';
const daysWeek = () => {
  const startOfWeek = moment().startOf('isoWeek');
  const endOfWeek = moment().endOf('isoWeek');
  const start = startOfWeek.format('DD');
  const end = endOfWeek.format('DD');
  const fillDays = (_,index) => ({date: moment(startOfWeek).add(index, 'days'), isToday: moment(startOfWeek).add(index, 'days') === moment()});
  return Array.from({length: Number(end - start) + 1}, fillDays);
};
export const getWeek = () => daysWeek();
export const getMonthName =  () => moment().format('MMMM');