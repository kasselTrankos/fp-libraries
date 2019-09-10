import {tagged} from 'daggy';
const date = tagged('date', ['value']);

date.prototype.equals = function(that) {
  return this.value.getTime() === that.getTime();
};
date.prototype.lte = function (that) {
  return this.value.getTime() < that.getTime();
};

module.exports = {date};
