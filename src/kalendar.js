import moment from 'moment';
const daysWeek = () => {
  const isToday = date => Boolean(date.format('YYYY-MM-DD') === moment().format('YYYY-MM-DD'));
  const startOfWeek = moment().startOf('isoWeek');
  const endOfWeek = moment().endOf('isoWeek');
  const start = startOfWeek.format('DD');
  const end = endOfWeek.format('DD');
  const fillDays = (_,index) => ({date: moment(startOfWeek).add(index, 'days'), isToday: isToday(moment(startOfWeek).add(index, 'days'))});
  return Array.from({length: Number(end - start) + 1}, fillDays);
};
export const getWeek = () => daysWeek();
export const getMonthName =  () => moment().format('MMMM');