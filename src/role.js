import {taggedSum, tagged} from 'daggy';

const Person = tagged('Person', ['id', 'parent', 'name']);
const Role = tagged('Role', ['parent', 'children']);


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
  return {parent: this.parent, children: this.children};
};


module.exports = {Role};