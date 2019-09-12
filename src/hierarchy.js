import {taggedSum, tagged} from 'daggy';
const Any = (value) => ({
  empty: false,
  concat: () => value || false
});


const Roles = taggedSum('Roles', {
  Parent: ['id'],
  Children: ['items'],
  Nil: []
});

Roles.prototype.map = function(f) {
  return this.cata({
    Parent: id => Roles.Parent(f(id)),
    Children: items => Roles.Children(f(items)),
    None: () => Roles.Nil,
  });
};

Roles.from = function(data) {
  return data.reduceRight(
    (acc, x) => Roles.Cons(x, acc),
    Roles.Nil
  )
};


module.exports = {Any, Roles};


