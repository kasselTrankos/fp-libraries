import {addDays} from './../kalendar';
import { addDays as  add, isMonday } from 'date-fns';
import {expect} from 'chai';
import jsc from 'jsverify';

describe('KALENDAR', (done) => {
  const now =  new Date();
  const from = new Date(now.setDate(now.getDate()-jsc.integer(0, 1100).generator()));
  const to = new Date(now.setDate(now.getDate()+jsc.integer(0, 100).generator()));
  it(`expect given any date then add days`, () => {
    // AssertionError: origin: Tue Jan 24 2017 02:36:33 GMT+0100 (CET) add 61: expected(Sun Mar 26 2017 03:36:33 GMT+0200 (CEST)) but the result is Sun Mar 26 2017 01:36:33 GMT+0100 (CET): expected false to be true
    // const d = new Date(2017, 0, 24, 2,36,33);
    // const days = 61;
    // console.log(result)
    // const result = addDays(d)(days);
    // console.log(d, `${d} ---> 61 ${result.value}` )
    // const format = a => `${a.getUTCDate()}/${a.getMonth()}/${a.getFullYear()}`;
    // const isSame = a => b => format(a) === format(b);
    for(let i = 0; i< 46120; i++) {
      const days = jsc.nat(365).generator();
      const d = jsc.datetime(from, to).generator();
      const result = addDays(d)(days);
      const expected  = add(d, days);


      const error = `origin: ${d} add ${days}: expected(${expected}) but the result is (${result.value})`;
      expect(result.equals(expected), error).to.be.true;
      
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