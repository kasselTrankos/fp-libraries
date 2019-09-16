import {expect} from 'chai';
import jsc from 'jsverify';
import {Roles} from './../src/roles.js';
import {compose, map, over, lensProp, add, filter,
  lt, view, equals} from './../utils';

describe('ROLE', () => {

  it(`there are 3 first level`, () => {
    const roles = [{id: 1, name: 'fullsix'},
    {id: 4, parent: 1, name: 'david'},
    {id: 2, parent: 2, name: 'fred'}, 
    {id: 3, parent: 1, name:'george'},
    {id: 5, name: 'joshua'},
    {id: 9, name: 'mick'},
    {id: 10, parent: 1, name: 'alfred'}];
    const role = Roles.from(roles);
    const parents = role.filter(x => !x.parent);
    expect(parents.toArray().length).equal(3);
  });
  it('lens', ()=> {
    const roles = [{id: 1, name: 'fullsix'},
    {id: 4, parent: 1, name: 'david'},
    {id: 2, parent: 2, name: 'fred'}, 
    {id: 3, parent: 1, name:'george'},
    {id: 5, name: 'joshua'},
    {id: 9, name: 'mick'},
    {id: 10, parent: 1, name: 'alfred'}];
    const moneyLens = lensProp('parent');
    const data = [{ money: 42 }, { money: 1024 }, { money: 1337 }];
    const fn = val => ({parent}) => equals(val)(parent);
    const r = 
      // map(console.log),
      compose(filter(equals(1)),  map(view(moneyLens)))
    (roles)
    // const r = compose(
    //   // map(over(moneyLens)(add('€ '))),
    //   filter(compose(equals(1), map(moneyLens)))
    // )(roles);
    console.log(r, filter(fn(1))(roles));
  });
});