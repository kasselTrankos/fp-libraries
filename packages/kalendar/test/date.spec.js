const {date} = require ('./../lib/date');
const laws = require('fantasy-laws');
const jsc = require ('jsverify');


const {identity, composition} = laws.Contravariant( (a,b ) => {
  const g = jsc.nat(100).generator();
  return a.f(g) === b.f(g);
});
const testComposition = composition(
  jsc.bless({generator:() => date(x=> x +12)}),
  jsc.bless({generator:() => x => x + 4}), 
  jsc.bless({generator:() => x => x + 4})
);
const testIdentity = identity(jsc.bless({generator:() => date(x=> x +12)}));

describe('DATE LAND => ',  () => {
  it('testComposition', testComposition);
  it('testIdentity', testIdentity);
});
