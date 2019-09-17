import {taggedSum, tagged} from 'daggy';
import {Role} from './role';
import {prop, equals, compose} from './../utils';

const Roles = taggedSum('Roles', {
  Some: ['list'],
  Nil: []
});
Roles.empty = function () {
  return Roles.Some([]);
}

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
  const getId = prop('id');
  const getParent = prop('parent');
  // const isParent = ;
  return data.reduceRight(
    (acc, x)=> acc.concat(Role(data.find(compose(equals(getParent(x)) ,getId)), x)), Roles.empty());
};
Roles.prototype.toArray = function () {
  return this.cata({
    Some: list => list.reduceRight((acc, x) => acc.concat(x.toObject()), []),

    Nil: () => []
  });
};

module.exports = {Roles};

