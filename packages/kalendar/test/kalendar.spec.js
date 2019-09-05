import {addDays, getWeek} from './../kalendar';
import moment from 'moment';
import {expect} from 'chai';
import jsc from 'jsverify';

describe('KALENDAR', () => {
  let d;
  before(() => {
    const now =  new Date();
    const from = new Date(now.setDate(now.getDate()-jsc.integer(0, 100).generator()))
    const to = new Date(now.setDate(now.getDate()+jsc.integer(0, 100).generator()))
    d = jsc.datetime(from, to).generator();

  });
  it(`Add Dayss is working fine`, () => {
    const add = jsc.nat(365).generator();
    const tomorrow = addDays(d)(add);
    const expected  = moment(d).add(add, 'days').format('DD/MM/YYYY');
    expect(tomorrow.format()).to.equal(expected);
  });
  it(`remove xx Dayss is working fine`, () => {
    const add = jsc.nat(365).generator();
    const tomorrow = addDays(d)(add * -1);
    const expected  = moment(d).subtract(add, 'days').format('DD/MM/YYYY');
    console.log(d, getWeek(d));
    expect(tomorrow.format()).to.equal(expected);
  });

});