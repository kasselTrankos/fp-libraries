import {tagged} from 'daggy';

const Person = tagged('Person', ['id', 'parent', 'name']);
const Role = tagged('Role', ['parent', 'child']);


Role.prototype.concat = function(that) {
  return Role(this.parent, [...this.child, ...that.child]);
};
Role.empty = function () {
  return Role({}, []);
};
Role.prototype.equals = function (that) {
  this.child.id === that.child.id;
};
Role.prototype.toObject = function () {
  return {parent: this.parent, child: this.child};
};


module.exports = {Role};