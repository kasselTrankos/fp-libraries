import {addDays, getWeek} from './../kalendar';
import moment from 'moment-timezone';
import {expect} from 'chai';
import jsc from 'jsverify';

describe('KALENDAR', () => {
  let d;
  before(() => {
    const now =  new Date();
    const from = new Date(now.setDate(now.getDate()-jsc.integer(0, 100).generator()));
    const to = new Date(now.setDate(now.getDate()+jsc.integer(0, 100).generator()));
    d = jsc.datetime(from, to).generator();

  });
  it(`Add Dayss is working fine`, () => {
    const days = jsc.nat(365).generator();
    const tomorrow = addDays(d)(days);
    const expected  = moment(d).add(days, 'days');
    expect(tomorrow.format()).to.equal(expected.format('DD/MM/YYYY HH:mm:ss'));
  });
  it('get week, ', () => {
    // const week = getWeek(d);

    // console.log(week, d, moment(d).startOf('week').add(1, 'days').format('DD/MM/YYYY HH:mm:ss'), new Date());
  });
  // it(`remove xx Dayss is working fine`, () => {
  //   const add = jsc.nat(365).generator();
  //   const tomorrow = addDays(d)(add * -1);
  //   const expected  = moment(d).subtract(add, 'days').format('DD/MM/YYYY');
  //   expect(tomorrow.format()).to.equal(expected);
  // });

});