import { getWeek } from '../src/kalendar';
import moment from 'moment';
const expect = require('chai').expect;

describe('Kalendar spects for test', () => {
  it('When is no week given obtains current week and start with startOf', () => {
    const startOfWeek = moment().startOf('isoWeek');
    const days = getWeek();
    expect(days[0].format('DD')).to.be.equal(startOfWeek.format('DD'));
  });
});