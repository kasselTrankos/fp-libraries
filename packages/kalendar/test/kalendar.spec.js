import {addDays, getMonday, equals,  getWeek} from './../kalendar';
import { addDays as  add, isMonday,
  isTuesday, isWednesday, isThursday, isFriday, isSaturday,
  isSunday } from 'date-fns';
import {expect} from 'chai';
import jsc from 'jsverify';

describe('KALENDAR', () => {
  const now =  new Date();
  const from = new Date(now.setDate(now.getDate()-jsc.integer(0, 1100).generator()));
  const to = new Date(now.setDate(now.getDate()+jsc.integer(0, 100).generator()));
  it(`addDays`, () => {
    for(let i = 0; i< 3420; i++) {
      const days = jsc.nat(365).generator();
      const d = jsc.datetime(from, to).generator();
      const result = addDays(d)(days);
      const expected  = add(d, days);

      const error = `origin: ${d} add ${days}: expected(${expected}) but the result is (${result})`;
      expect(result.getTime() === expected.getTime(), error).to.be.true;
    } 
  });
  it('getMonday', () => {
    const d = jsc.datetime(from, to).generator();
    const result = getMonday(d);
    const error = `origin: ${d}  but the result is not a monday ${result}`;

    expect(isMonday(result), error).to.be.true;
  });
  it('equals', () => {
    const d = jsc.datetime(from, to).generator();
    const error = `date ${d}  and date ${d} must be the same`;

    expect(equals(d)(d), error).to.be.true;
  });
  it(`getWeek`, () => {
    const d = jsc.datetime(from, to).generator();
    const [monday, tuesday, wednesday, thursday, friday, saturday, sunday] = getWeek(d);
    
    expect(isMonday(monday), `${monday} must be monday`).to.be.true;
    expect(isTuesday(tuesday), `${tuesday} must be tuesday`).to.be.true;
    expect(isWednesday(wednesday), `${wednesday} must be wednesday`).to.be.true;
    expect(isThursday(thursday), `${thursday} must be thursday`).to.be.true;
    expect(isFriday(friday), `${friday} must be friday`).to.be.true;
    expect(isSaturday(saturday), `${saturday} must be saturday`).to.be.true;
    expect(isSunday(sunday), `${sunday} must be sunday`).to.be.true;
  });

});