import { setToday, getWeek, getNextWeek, getMonthName, getPrevWeek } from '../src/kalendar';
import moment from 'moment';
const expect = require('chai').expect;

describe('Kalendar spects for test', () => {
  it('When is no current date given obtains current week and start with startOf', () => {
    const startOfWeek = moment().startOf('isoWeek');
    const [monday] = getWeek();
    expect(moment(monday.date).format('DD')).to.be.equal(startOfWeek.format('DD'));
  });
  // it('When is clicked once nextWeek() get next week from actual', () => {
  //   const startOfWeek = moment().add(7, 'days').startOf('isoWeek');
  //   const days = getNextWeek();
  //   expect(days[0].date.format('DD')).to.be.equal(startOfWeek.format('DD'));
  // });
  // it('When is clicked once prevWeek() get previous week from actual', () => {
  //   const startOfWeek = moment().subtract(7, 'days').startOf('isoWeek');
  //   setToday();
  //   const days = getPrevWeek();
  //   expect(days[0].date.format('DD')).to.be.equal(startOfWeek.format('DD'));
  // });
  // it('Only today has property isToday:true', () => {
  //   const now = moment();
  //   const days = getWeek();
  //   days.forEach(({date, isToday})=> {
  //     if(now.format('YYYY-MM-DD') === date.format('YYYY-MM-DD')) {
  //       expect(isToday).to.be.true;
  //     } else {
  //       expect(isToday).to.be.false;
  //     }
  //   });
  // });
  // it(`When is no current date given obtains current month name ${moment().format('MMMM')}`, () => {
  //   const monthName = moment().format('MMMM');
  //   expect(getMonthName()).to.be.equal(monthName);
  // });
  // it(`When is clicked a lot untill last week of agost`, () => {
  //   getNextWeek();
  //   getNextWeek();
  //   getNextWeek();
  //   getNextWeek();
  //   const days = getNextWeek();

  //   days.forEach(({date, isToday})=> {
  //     expect(isToday).to.be.false;
  //   });
  // });
});