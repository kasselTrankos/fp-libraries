import {addDays, getWeek} from './../kalendar';
import moment from 'moment';
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
    const m = new Date(2019, 8, 10,22,46,57);
    d = m;
    const days = 6;//jsc.nat(365).generator();
    const result = addDays(d)(days);
    const expected  = moment(d).add(days, 'days');
    const error = `origin: ${d} add ${days}: expected(${expected.toDate()}) but the result is ${result.value}`;
    expect(result.equals(expected.toDate()), error).to.be.true;
  });
  it('get week, ', () => {
    const result = getWeek(d);
    const expected = moment(d).startOf('week').add(1, 'days');
    // console.log(week.format(), expected, d);
    const error = `origin: ${d} then expected(${expected.toDate()}) but the result is ${result.value}`;

    expect(result.equals(expected.toDate()), error).to.be.true;
  });
  // it(`remove xx Dayss is working fine`, () => {
  //   const add = jsc.nat(365).generator();
  //   const tomorrow = addDays(d)(add * -1);
  //   const expected  = moment(d).subtract(add, 'days').format('DD/MM/YYYY');
  //   expect(tomorrow.format()).to.equal(expected);
  // });

});