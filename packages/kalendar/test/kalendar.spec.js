import {addDays} from './../kalendar';
import moment from 'moment';
import {expect} from 'chai';

describe('KALENDAR', () => {
  it('works concat', () => {
    const tomorrow = addDays(10);
  
    console.log(tomorrow.value, new Date());
    // const week = getWeek();
    // console.log(new Date().getTimezoneOffset());
  });
});