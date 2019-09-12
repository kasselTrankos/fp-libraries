import {expect} from 'chai';
import jsc from 'jsverify';
import {Roles} from './../src/roles.js';

describe('ROLE', () => {

  it(`no parent`, () => {
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
});