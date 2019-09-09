import {addDays} from './../kalendar';
import { addDays as  add, isMonday } from 'date-fns';
import {expect} from 'chai';
import jsc from 'jsverify';

describe('KALENDAR', (done) => {
  const now =  new Date();
  const from = new Date(now.setDate(now.getDate()-jsc.integer(0, 1100).generator()));
  const to = new Date(now.setDate(now.getDate()+jsc.integer(0, 100).generator()));
  it(`expect given any date then add days`, () => {
    for(let i = 0; i< 61220; i++) {
      const days = jsc.nat(365).generator();
      const d = jsc.datetime(from, to).generator();
      const result = addDays(d)(days);
      const expected  = add(d, days);

      const error = `origin: ${d} add ${days}: expected(${expected}) but the result is (${result})`;
      expect(result.getTime() === expected.getTime(), error).to.be.true;
      
    }  
    done;
  });
  // xit('get monday of current date', () => {
  //   const d = jsc.datetime(from, to).generator();
  //   const result = getMonday(d);
  //   const error = `origin: ${d}  but the result is not a monday ${result.value}`;
  //   expect(isMonday(result.value), error).to.be.true;
  // });
  xit('expect given compare two dates work fine', () => {

  });
  // it(`remove xx Dayss is working fine`, () => {
  //   const add = jsc.nat(365).generator();
  //   const tomorrow = addDays(d)(add * -1);
  //   const expected  = moment(d).subtract(add, 'days').format('DD/MM/YYYY');
  //   expect(tomorrow.format()).to.equal(expected);
  // });

});