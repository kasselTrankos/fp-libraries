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
    expect(parents.toArray().length).equal(3);
  });
  it('with reduce and filter filter', ()=> {
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
    const parent = prop('parent');
    const id = prop('id');
    const fn = from => to => equals(parent(from))(id(to));
    const getParent = compose(find(roles), fn);
    const made = child => Role(getParent(child), child);
    const _r = roles.reduce((xs, x) => xs.concat(made(x)), Roles.empty());
    expect(roles.length === _r.list.length).to.be.true;
  });
});