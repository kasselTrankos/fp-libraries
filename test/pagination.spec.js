import { getPagination} from '../src/pagination';
import jsc from 'jsverify';

const expect = require('chai').expect;
describe('PAGINATION', () => {
  const total = jsc.integer(1200, 2230).generator();
  const size  = jsc.integer(2, 4).generator();
  const limit  = jsc.integer(11, 18).generator();
  it('expect got first page when is current page is 2', () => {
    const [first] = getPagination(total)(size)(limit)(4);
    expect(first.text).to.be.equal('«');
  });
  it('expect dont got first page when is over 1 current page', () => {
    const [first] = getPagination(total)(size)(limit)(1);
    expect(first.text).to.not.be.equal('«');
  });
  it('expect second page is previous page', () => {
    const [first, next] = getPagination(total)(size)(limit)(4);
    expect(first.text).to.be.equal('«');
    expect(next.text).to.be.equal('‹');
  });
  it('expect last and previous page boton is', () => {
    const [last, previous] = getPagination(total)(size)(limit)(4).slice(-2);
    expect(previous.text).to.be.equal('»');
    expect(last.text).to.be.equal('›');
  });

});