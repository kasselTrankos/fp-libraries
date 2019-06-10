import { getWeek, getMonthName } from '../src/kalendar';
import moment from 'moment';
const expect = require('chai').expect;

describe('Kalendar spects for test', () => {
  it('When is no current date given obtains current week and start with startOf', () => {
    const startOfWeek = moment().startOf('isoWeek');
    const days = getWeek();
    expect(days[0].date.format('DD')).to.be.equal(startOfWeek.format('DD'));
  });
  it(`When is no current date given obtains current month name ${moment().format('MMMM')}`, () => {
    const monthName = moment().format('MMMM');
    expect(getMonthName()).to.be.equal(monthName);
  });
});