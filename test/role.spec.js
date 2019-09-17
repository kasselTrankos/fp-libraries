import {expect} from 'chai';
import jsc from 'jsverify';
import {Roles} from './../src/roles.js';
import {Role} from './../src/role.js';
import {compose, map, over, lensProp, add, filter,
  lt, view, equals, find, prop} from './../utils';

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
    console.log(role);
    expect(parents.toArray().length).equal(3);
  });
  it('lens', ()=> {
    const roles = [{id: 1, name: 'fullsix'},
    {id: 4, parent: 1, name: 'david'},
    {id: 2, parent: 11, name: 'fred'}, 
    {id: 3, parent: 1, name:'george'},
    {id: 5, name: 'joshua'},
    {id: 8, parent: 2, name: 'mick'},
    {id: 7, parent: 2, name: 'ronald'},
    {id: 11, parent: 4, name: 'bruce'},
    {id: 9, name: 'mick'},
    {id: 10, parent: 1, name: 'alfred'}];
    const pure = input => [input];
    // const apply = functions => list =>
    //   [ element | function <- functions,
    //               element  <- map(function)(list)
    //   ]

    const _roles = Roles.empty();
    const parent = prop('parent');
    const id = prop('id');
    const invertFilter = list => fn => find(fn)(list);
    const fn = from => to => equals(parent(from))(id(to));
    const getParent = compose(invertFilter(roles), fn);
    const madeRole = child => Role(getParent(child), child);
    const fm = map(madeRole)(roles);
    //   // map(over(moneyLens)(add('€ '))),
    //   filter(compose(equals(1), map(moneyLens)))
    // )(roles);
    console.log(fm, _roles.concat(fm[0]).concat(fm[1]), Roles.Some(fm));
  });
});