import {taggedSum, tagged} from 'daggy';

const Person = tagged('Person', ['id', 'parent', 'name']);
const Role = tagged('Role', ['parent', 'children']);
const Roles = taggedSum('Roles', {
  Some: [Role],
  Nil: []
});

Role.prototype.concat = function(that) {
  return Role(this.parent, [...this.children, ...that.children]);
};
Role.empty = function () {
  return Role({}, []);
};
Role.prototype.equals = function (that) {
  this.parent && that.parent && this.parent.id === that.parent.id;
};
Role.prototype.toObject = function () {
  console.log(this.parent);
  return {parent: this.parent, children: this.children};
}

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
    Some: items => {
      const parent = items.find && items.find(item => item.equals(that));
      return Roles.Some(parent ? parent.concat(that) : [...items, that]);
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
}

module.exports = {Roles};