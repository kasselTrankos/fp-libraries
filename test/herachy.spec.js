import { getHerachy} from '../src/herachy';
const expect = require('chai').expect;
describe('herachy spects for test', () => {
  let users;
  beforeEach( ()=> {
    users = [
      {id: 1, type: 'boss', name: 'maria'},
      {id: 2, type: 'highest', name: 'laura', parent: 1},
      {id: 3, type: 'highest', name: 'alfonso', parent: 1},
      {id: 4, type: 'highest', name: 'vernonica', parent: 1},
      {id: 5, type: 'high', name: 'pedro', parent: 3},
      {id: 6, type: 'high', name: 'alejandra', parent: 3},
      {id: 7, type: 'high', name: 'alejandra', parent: 1},
      {id: 8, type: 'boss', name: 'aleja'},
      {id: 9, type: 'highest', name: 'elisa', parent: 8},
      {id: 10, type: 'highest', name: 'leonor', parent: 8},
      {id: 11, type: 'normal', name: 'sandra', parent: 7},
      {id: 12, type: 'normal', name: 'raquel', parent: 9},
    
    ];
  });

  it('When form the first obtain a objet for first, previous', () => {
    getHerachy(users);
  });
});