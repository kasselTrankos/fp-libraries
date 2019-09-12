import {taggedSum, tagged} from 'daggy';
import {Role} from './role';

const Roles = taggedSum('Roles', {
  Some: [Role],
  Nil: []
});

Roles.prototype.filter = function (f) {
  return this.cata({
    Some: items => Roles.Some(items.filter(f)),
    Nil: () => this
  });
};

Roles.prototype.map = function (f) {
  return this.cata({
    Some: items => {
      return Roles.Some(items.map(f));
    },
    Nil: () => Roles.Nil
  });
};


Roles.prototype.concat = function(that) {
  return this.cata({
    Some: (items = []) => {
      const parent = items.find(item => item.equals(that)) || [];
      return Roles.Some([...items, ...parent.concat(that)]);
    },
    Nil: () => this
  });
};

Roles.from = function(data) {
  return data.reduceRight((acc, x)=> {
    const parent = data.find(y=> y.id === x.parent);
    return acc.concat(Role(parent, x));
  }, Roles.Some([]));
};
Roles.prototype.toArray = function () {
  return this.cata({
    Some: items => items.reduceRight((acc, x) => acc.concat(x.toObject()), []),

    Nil: () => []
  });
};

module.exports = {Roles};

