import {expect} from 'chai';
import jsc from 'jsverify';
import {Roles} from './../src/role.js';

describe('ROLE', () => {

  it(`custom`, () => {
    const roles = [{id: 1, name: 'fullsix'},
    {id: 4, parent: 1, name: 'david'},
    {id: 2, parent: 2, name: 'fred'}, 
    {id: 3, parent: 1, name:'george'}];
    const role = Roles.from(roles);
    console.log('mmmmm', `${role}`);
  });
});