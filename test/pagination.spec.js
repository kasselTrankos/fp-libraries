import { getPagination} from '../src/pagination';
import jsc from 'jsverify';

const expect = require('chai').expect;
describe('pagination spects for test', () => {
  it('got first page', () => {
    const total = jsc.integer(20, 30).generator();
    const size  = jsc.integer(6, 10).generator();
    const limit  = jsc.integer(11, 18).generator();

    const pagination = getPagination(total)(size)(limit)(1);
    console.log(pagination);
  })
  // it('When form the first obtain a objet for first, previous', () => {
  //   expect(first()).to.eql([{page: 1, text: '«'}]);
  //   expect(previous(2)).to.eql([{page: 1, text: '‹'}]);
  //   expect(last(13)).to.eql([{page: 13, text: '»'}]);
  //   expect(next(13)).to.eql([{page: 14, text: '›'}]);
  // });
  // it('When size pagination is bigger than pages, then pagination ons only the pages', ()=>{
  //   const total = 40;
  //   const size = 6;
  //   const limit = 20;
  //   const page = 1;
  //   const pages =  getPagination(total)(size)(limit)(page);
  //   expect(pages).to.deep.equal([ {current: 1, text: '1'}, {current: 2, text: '2'} ]);
  // });
  // it('When is at page 2 then show navigation go first and previous', ()=>{
  //   const total = 190;
  //   const size = 6;
  //   const limit = 20;
  //   const page = 2;
  //   const pages =  getPagination(total)(size)(limit)(page);
  //   expect(pages).to.deep.equal([ 
  //     {text: '«', current: 1}, {text: '‹', current: 1}, {current: 2, text: '2'}, {current: 3, text: '3'}, 
  //     {current: 4, text: '4'}, {current: 5, text: '5'}, {current: 6, text: '6'}, {current: 7, text: '7'},
  //     {text: '›', current: 3}, {text: '»', current: 10}]);
  // });
  // it('When at the last pages then not show last and next', ()=>{
  //   const total = 300;
  //   const size = 6;
  //   const limit = 20;
  //   const page = 13;
  //   const pages =  getPagination(total)(size)(limit)(page);
  //   expect(pages).to.deep.equal([ 
  //     {text: '«', current: 1}, {text: '‹', current: 12}, {current: 10, text: '10'}, {current: 11, text: '11'}, 
  //     {text: '12', current: 12}, {current: 13, text: '13'}, {current: 14, text: '14'}, {current: 15, text: '15'}
  //     ]);
  // });
});