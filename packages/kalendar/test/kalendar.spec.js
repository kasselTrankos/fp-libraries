import {addDays, getMonday} from './../kalendar';
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
  it(`expect given any date then add days`, () => {
    // d = new Date(2019, 7, 19, 0, 38, 31);
    const days = jsc.nat(365).generator();
    const result = addDays(d)(days);
    const expected  = moment(d).add(days, 'days');
    const error = `origin: ${d} add ${days}: expected(${expected.toDate()}) but the result is ${result.value}`;
    expect(result.equals(expected.toDate()), error).to.be.true;
  });
  it('get monday of current date', () => {
    d = new Date(2019, 8, 14);
    const result = getMonday(d);
    const expected = moment(d).startOf('week').add(1, 'days');
    const error = `origin: ${d} then expected(${expected.toDate()}) but the result is ${result.value}`;
    expect(result.equals(expected.toDate()), error).to.be.true;
  });
  xit('expect given compare two dates work fine', () => {

  });
  // it(`remove xx Dayss is working fine`, () => {
  //   const add = jsc.nat(365).generator();
  //   const tomorrow = addDays(d)(add * -1);
  //   const expected  = moment(d).subtract(add, 'days').format('DD/MM/YYYY');
  //   expect(tomorrow.format()).to.equal(expected);
  // });

});