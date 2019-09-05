import {addDays} from './../kalendar';
import moment from 'moment';
import {expect} from 'chai';
import jsc from 'jsverify';

describe('KALENDAR', () => {
  it('Add XX Dayss is working fine', () => {
    const add = jsc.nat(365).generator();
    const tomorrow = addDays()(add);
    const expected  = moment().add(add, 'days').format('DD/MM/YYYY');
    expect(tomorrow.format()).to.equal(expected);
  });
});