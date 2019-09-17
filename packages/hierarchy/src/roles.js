import {taggedSum} from 'daggy';
import {Role} from './role';
import {prop, equals, compose} from './../utils';

const Roles = taggedSum('Roles', {
  Some: ['list'],
  Nil: []
});
Roles.empty = function () {
  return Roles.Some([]);
};

Roles.prototype.filter = function (f) {
  return this.cata({
    Some: list => Roles.Some(list.filter(f)),
    Nil: () => this
  });
};

Roles.prototype.map = function (f) {
  return this.cata({
    Some: list => {
      return Roles.Some(list.map(f));
    },
    Nil: () => Roles.Nil
  });
};


Roles.prototype.concat = function(that) {
  return this.cata({
    Some: (list = []) => {
      return Roles.Some([...list, that]);
    },
    Nil: () => this
  });
};

Roles.from = function(data) {
  const id = prop('id');
  const parent = prop('parent');
  return data.reduceRight(
    (acc, x)=> acc.concat(Role(data.find(compose(equals(parent(x)) ,id)), x)), Roles.empty());
};
Roles.prototype.toArray = function () {
  return this.cata({
    Some: list => list.reduceRight((acc, x) => acc.concat(x.toObject()), []),

    Nil: () => []
  });
};

module.exports = {Roles};

