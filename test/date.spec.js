const {date} = require ('./../lib/date');
const laws = require('fantasy-laws');
const jsc = require ('jsverify');
const {expect} = require('chai');


const {identity, composition} = laws.Contravariant( (a,b ) => {
  const g = jsc.nat(100).generator();
  return a(g) === b(g);
});
const h = jsc.bless({generator: () => date(x => x)});
const testComposition = composition(
  jsc.bless({generator:() => date(x=> x +12).f}),
  jsc.bless({generator:() => x => x + 4}), 
  jsc.bless({generator:() => x => x + 4})
);
const testIdentity = identity(jsc.bless({generator:() => date(x=> x +12).f}));

describe('DATE => ',  () => {
  it('testComposition', testComposition);
  it('testIdentity', testIdentity);
});