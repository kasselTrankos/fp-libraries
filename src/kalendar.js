import moment from 'moment';
const daysWeek = () => {
  const startOfWeek = moment().startOf('isoWeek');
  const endOfWeek = moment().endOf('isoWeek');
  const start = startOfWeek.format('DD');
  const end = endOfWeek.format('DD');
  const fillDays = (_,index) => moment(startOfWeek).add(index, 'days');
  return Array.from({length: Number(end - start) + 1}, fillDays);
};
export const getWeek = () => daysWeek();