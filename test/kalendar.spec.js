import { getWeek, getMonthName } from '../src/kalendar';
import moment from 'moment';
const expect = require('chai').expect;

describe('Kalendar spects for test', () => {
  it('When is no current date given obtains current week and start with startOf', () => {
    const startOfWeek = moment().startOf('isoWeek');
    const days = getWeek();
    expect(days[0].date.format('DD')).to.be.equal(startOfWeek.format('DD'));
  });
  it('Only today has property isToday:true', () => {
    const now = moment();
    const days = getWeek();
    days.forEach(({date, isToday})=> {
      if(now.format('YYYY-MM-DD') === date.format('YYYY-MM-DD')) {
        expect(isToday).to.be.true;
      } else {
        expect(isToday).to.be.false;
      } 

    });
  });
  it(`When is no current date given obtains current month name ${moment().format('MMMM')}`, () => {
    const monthName = moment().format('MMMM');
    expect(getMonthName()).to.be.equal(monthName);
  });
});