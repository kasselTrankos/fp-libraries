import {taggedSum, tagged} from 'daggy';

const Person = tagged('Person', ['parent', 'children']);


const Role = taggedSum('Role', {
  Some: ['items'],
  Nil: []
});
const List = taggedSum('List', {
  Cons: ['head', 'tail'], Nil: []
})

Role.prototype.concat = function(that) {
  return this.cata({
    Some: items => {
      console.log(items);

      return Role.Some(that);
    },
    Nil: () => this
  });
};

Role.from = function(data) {
  const parent = item => data.find(y=> y.id === item.parent);
  const concat = item => Person(parent(item), item);
  // role.concat(data.map(concat));
  const role = Role.Some([]).concat(data.map(concat));
  console.log(`${role}`);
  return Role.Some([]).concat(data[0]).concat(data[1]);
  // const els = data.reduceRight((acc, x) => Person(data.find(y=> y.id === x.parent), x), []);
  // console.log(els, 'fdkshfgksdyhidlfskyfg');
  // return Role.Some(data.reduceRight((acc, x) => Person(data.find(y=> y.id === x.parent), x), Person));
};
Role.prototype.toArray = function () {
  return this.cata({
    Some: (x, acc) => [
      x, ... acc.toArray()
    ],

    Nil: () => []
  })
}

module.exports = {Role};